#!/usr/bin/env python3
"""
AI Brain Local Bridge + Static Board Server + GitHub Queue Poller (Zero-Dependency)
- Streams real-time tool calls & output to both the browser drawer and the console window
- Serves the command board UI at http://127.0.0.1:8787/
- Sends CORS + Access-Control-Allow-Private-Network: true for https://navidmoezinia-blip.github.io/ai-brain/
"""

import json
import mimetypes
import os
import re
import shutil
import subprocess
import threading
import time
import uuid
import webbrowser
from http.server import BaseHTTPRequestHandler, ThreadingHTTPServer
from pathlib import Path
from urllib.parse import urlparse

HOST = os.environ.get("AI_BRAIN_BRIDGE_HOST", "127.0.0.1")
PORT = int(os.environ.get("AI_BRAIN_BRIDGE_PORT", "8787"))
REPO_SLUG = os.environ.get("AI_BRAIN_GH_REPO", "navidmoezinia-blip/ai-brain")

BRIDGE_DIR = Path(__file__).resolve().parent
BOARD_DIR = BRIDGE_DIR.parent  # projects/command-board/
DEFAULT_CWD = os.environ.get("AI_BRAIN_REPO_DIR", str(BOARD_DIR.parents[1]))

RUNS = {}
RUNS_LOCK = threading.Lock()
CLAIMED_ISSUES = set()


def detect_cli(agent: str):
    if agent == "codex":
        return shutil.which("codex") or shutil.which("codex.cmd")
    if agent == "claude":
        return shutil.which("claude") or shutil.which("claude.cmd")
    if agent == "gemini":
        return (
            shutil.which("agy")
            or shutil.which("agy.cmd")
            or shutil.which("gemini")
            or shutil.which("gemini.cmd")
        )
    if agent == "gh":
        return shutil.which("gh") or shutil.which("gh.exe")
    return None


def build_command(agent: str, exe: str, prompt: str, mode: str):
    if agent == "codex":
        if mode == "readonly":
            return [exe, "exec", "--skip-git-repo-check", "--ephemeral", "-s", "read-only", "-"], prompt
        return [exe, "exec", "--full-auto", "-"], prompt

    if agent == "claude":
        # Use stream-json + verbose so Claude flushes every tool call & message immediately instead of buffering
        base = [exe, "-p", "--verbose", "--output-format", "stream-json"]
        if mode != "readonly":
            base.append("--dangerously-skip-permissions")
        base.append(prompt)
        return base, None

    return [exe, "-p", prompt], None


def format_stream_line(agent: str, raw_line: str) -> str:
    """Converts Claude stream-json events into readable live log lines, or passes raw text through."""
    if agent != "claude":
        return raw_line
    s = raw_line.strip()
    if not s.startswith("{"):
        return raw_line
    try:
        evt = json.loads(s)
    except Exception:
        return raw_line

    etype = evt.get("type")
    if etype == "system" and evt.get("subtype") == "init":
        model = evt.get("model", "claude")
        return f"[Claude session initialized · model: {model}]\n"
    if etype == "assistant":
        msg = evt.get("message", {})
        parts = []
        for block in msg.get("content", []):
            btype = block.get("type")
            if btype == "text" and block.get("text"):
                parts.append(block["text"].strip() + "\n")
            elif btype == "tool_use":
                tname = block.get("name", "tool")
                tinp = block.get("input", {})
                cmd_preview = (
                    tinp.get("command")
                    or tinp.get("file_path")
                    or tinp.get("pattern")
                    or json.dumps(tinp)[:120]
                )
                parts.append(f"-> [Tool: {tname}] {cmd_preview}\n")
        return "".join(parts)
    if etype == "result":
        res_text = evt.get("result", "")
        cost = evt.get("total_cost_usd")
        suffix = f"\n[Completed · ${cost:.4f}]\n" if isinstance(cost, (int, float)) else "\n[Completed]\n"
        return (f"\n{res_text}\n" if res_text else "") + suffix
    return ""


def run_agent_subprocess(run_id: str, agent: str, prompt: str, cwd: str, mode: str, gh_issue_num=None):
    exe = detect_cli(agent)
    if not exe:
        msg = f"CLI for '{agent}' not found on PATH."
        print(f"[{run_id}] ERROR: {msg}", flush=True)
        with RUNS_LOCK:
            RUNS[run_id]["status"] = "error"
            RUNS[run_id]["output"] = msg
            RUNS[run_id]["finished_at"] = time.time()
        if gh_issue_num:
            finish_github_issue(gh_issue_num, False, msg)
        return

    cmd, stdin_data = build_command(agent, exe, prompt, mode)
    work_dir = cwd if (cwd and os.path.isdir(cwd)) else DEFAULT_CWD

    header = f"[{time.strftime('%H:%M:%S')}] Starting {agent.upper()} ({exe})\nWorking directory: {work_dir}\n{'-' * 48}\n"
    print(f"\n=== [{run_id}] START {agent.upper()} ===", flush=True)
    with RUNS_LOCK:
        RUNS[run_id]["output"] = header

    env = os.environ.copy()
    env["PYTHONUNBUFFERED"] = "1"
    for pkey in ("HTTP_PROXY", "HTTPS_PROXY", "ALL_PROXY", "http_proxy", "https_proxy", "all_proxy"):
        pval = env.get(pkey, "")
        if "192.168.49.1" in pval or "127.0.0.1" in pval or "localhost" in pval:
            env.pop(pkey, None)

    try:
        proc = subprocess.Popen(
            cmd,
            stdin=subprocess.PIPE if stdin_data is not None else subprocess.DEVNULL,
            stdout=subprocess.PIPE,
            stderr=subprocess.STDOUT,
            text=True,
            encoding="utf-8",
            errors="replace",
            cwd=work_dir,
            env=env,
            bufsize=1,
        )

        if stdin_data is not None and proc.stdin:
            try:
                proc.stdin.write(stdin_data)
            except Exception:
                pass
            finally:
                proc.stdin.close()

        collected = [header]
        if proc.stdout:
            for raw_line in iter(proc.stdout.readline, ""):
                formatted = format_stream_line(agent, raw_line)
                if not formatted:
                    continue
                print(f"[{agent}] {formatted.rstrip()}", flush=True)
                collected.append(formatted)
                tail = "".join(collected)[-14000:]
                with RUNS_LOCK:
                    RUNS[run_id]["output"] = tail

        ret = proc.wait(timeout=1800)
        ok = ret == 0
        footer = f"\n{'-' * 48}\n[{time.strftime('%H:%M:%S')}] Finished with exit code {ret}\n"
        collected.append(footer)
        final_out = "".join(collected)[-14000:].strip()
        print(f"=== [{run_id}] DONE {agent.upper()} (exit {ret}) ===\n", flush=True)

        with RUNS_LOCK:
            RUNS[run_id]["status"] = "done" if ok else "error"
            RUNS[run_id]["exit_code"] = ret
            RUNS[run_id]["output"] = final_out
            RUNS[run_id]["finished_at"] = time.time()

        if gh_issue_num:
            finish_github_issue(gh_issue_num, ok, final_out)
    except Exception as exc:
        msg = f"Execution failed: {exc}"
        print(f"=== [{run_id}] ERROR {agent.upper()}: {exc} ===\n", flush=True)
        with RUNS_LOCK:
            RUNS[run_id]["status"] = "error"
            RUNS[run_id]["output"] = msg
            RUNS[run_id]["finished_at"] = time.time()
        if gh_issue_num:
            finish_github_issue(gh_issue_num, False, msg)


def finish_github_issue(issue_num: int, ok: bool, output: str):
    gh = detect_cli("gh")
    if not gh:
        return
    new_label = "status:done" if ok else "status:error"
    snippet = output[-3500:] if output else "(no output)"
    comment = f"### Local Bridge Execution {'Succeeded' if ok else 'Failed'}\n\n```text\n{snippet}\n```"
    try:
        subprocess.run(
            [gh, "issue", "comment", str(issue_num), "-R", REPO_SLUG, "--body", comment],
            capture_output=True,
            timeout=30,
        )
        subprocess.run(
            [
                gh,
                "issue",
                "edit",
                str(issue_num),
                "-R",
                REPO_SLUG,
                "--remove-label",
                "status:queued,status:running",
                "--add-label",
                new_label,
            ],
            capture_output=True,
            timeout=30,
        )
    except Exception:
        pass


def github_queue_poller_loop():
    gh = detect_cli("gh")
    if not gh:
        return

    while True:
        try:
            res = subprocess.run(
                [
                    gh,
                    "issue",
                    "list",
                    "-R",
                    REPO_SLUG,
                    "--label",
                    "status:queued",
                    "--state",
                    "open",
                    "--json",
                    "number,title,body,labels",
                ],
                capture_output=True,
                text=True,
                timeout=25,
            )
            if res.returncode == 0 and res.stdout.strip():
                issues = json.loads(res.stdout)
                for issue in issues:
                    num = issue.get("number")
                    if not num or num in CLAIMED_ISSUES:
                        continue
                    CLAIMED_ISSUES.add(num)

                    labels = [l.get("name", "") for l in issue.get("labels", [])]
                    agent = "codex"
                    for candidate in ("codex", "claude", "gemini"):
                        if f"agent:{candidate}" in labels:
                            agent = candidate
                            break

                    body = issue.get("body") or ""
                    m = re.search(r"```text\s*(.*?)\s*```", body, re.DOTALL)
                    prompt = m.group(1).strip() if m else body.strip()
                    if not prompt:
                        continue

                    subprocess.run(
                        [
                            gh,
                            "issue",
                            "edit",
                            str(num),
                            "-R",
                            REPO_SLUG,
                            "--remove-label",
                            "status:queued",
                            "--add-label",
                            "status:running",
                        ],
                        capture_output=True,
                        timeout=20,
                    )

                    run_id = f"gh-issue-{num}"
                    with RUNS_LOCK:
                        RUNS[run_id] = {
                            "id": run_id,
                            "agent": agent,
                            "title": issue.get("title", f"Issue #{num}"),
                            "status": "running",
                            "output": f"Picked up remote GitHub Issue #{num} for {agent}...",
                            "started_at": time.time(),
                        }

                    print(f"[GitHub Poller] Starting Issue #{num} with {agent}...", flush=True)
                    threading.Thread(
                        target=run_agent_subprocess,
                        args=(run_id, agent, prompt, DEFAULT_CWD, "workspace", num),
                        daemon=True,
                    ).start()
        except Exception:
            pass
        time.sleep(12)


class BridgeHandler(BaseHTTPRequestHandler):
    def _send_cors_headers(self):
        self.send_header("Access-Control-Allow-Origin", "*")
        self.send_header("Access-Control-Allow-Methods", "GET, POST, OPTIONS")
        self.send_header("Access-Control-Allow-Headers", "Content-Type, Authorization")
        self.send_header("Access-Control-Allow-Private-Network", "true")
        self.send_header("Cache-Control", "no-store")

    def _send_json(self, code: int, payload: dict):
        body = json.dumps(payload).encode("utf-8")
        self.send_response(code)
        self._send_cors_headers()
        self.send_header("Content-Type", "application/json; charset=utf-8")
        self.send_header("Content-Length", str(len(body)))
        self.end_headers()
        self.wfile.write(body)

    def _serve_static(self, rel_path: str):
        if rel_path in ("", "/"):
            rel_path = "/index.html"
        target = (BOARD_DIR / rel_path.lstrip("/")).resolve()
        if not str(target).startswith(str(BOARD_DIR)) or not target.is_file():
            self._send_json(404, {"error": "Not found"})
            return

        ctype, _ = mimetypes.guess_type(str(target))
        data = target.read_bytes()
        self.send_response(200)
        self._send_cors_headers()
        self.send_header("Content-Type", ctype or "application/octet-stream")
        self.send_header("Content-Length", str(len(data)))
        self.end_headers()
        self.wfile.write(data)

    def do_OPTIONS(self):
        self.send_response(204)
        self._send_cors_headers()
        self.end_headers()

    def do_GET(self):
        parsed = urlparse(self.path)
        path = parsed.path

        if path == "/health":
            self._send_json(
                200,
                {
                    "ok": True,
                    "cwd": DEFAULT_CWD,
                    "gh_poller": bool(detect_cli("gh")),
                    "agents": {
                        "codex": bool(detect_cli("codex")),
                        "claude": bool(detect_cli("claude")),
                        "gemini": bool(detect_cli("gemini")),
                    },
                },
            )
            return

        if path == "/runs":
            with RUNS_LOCK:
                items = list(RUNS.values())
            self._send_json(200, {"runs": items})
            return

        self._serve_static(path)

    def do_POST(self):
        parsed = urlparse(self.path)
        if parsed.path != "/run":
            self._send_json(404, {"error": "Not found"})
            return

        length = int(self.headers.get("Content-Length", "0"))
        raw = self.rfile.read(length).decode("utf-8", errors="replace")
        try:
            data = json.loads(raw)
        except json.JSONDecodeError:
            self._send_json(400, {"error": "Invalid JSON"})
            return

        agent = data.get("agent", "")
        prompt = data.get("prompt", "").strip()
        cwd = data.get("cwd", DEFAULT_CWD)
        title = data.get("title", "Cloud Run")
        mode = data.get("mode", "workspace")

        if agent not in ("codex", "claude", "gemini") or not prompt:
            self._send_json(400, {"error": "Missing valid 'agent' or 'prompt'"})
            return

        run_id = f"local-{uuid.uuid4().hex[:8]}"
        with RUNS_LOCK:
            RUNS[run_id] = {
                "id": run_id,
                "agent": agent,
                "title": title,
                "status": "running",
                "output": f"Starting {agent} CLI...",
                "started_at": time.time(),
            }

        t = threading.Thread(
            target=run_agent_subprocess,
            args=(run_id, agent, prompt, cwd, mode),
            daemon=True,
        )
        t.start()
        self._send_json(202, {"run_id": run_id, "status": "running"})

    def log_message(self, fmt, *args):
        pass


if __name__ == "__main__":
    url = f"http://{HOST}:{PORT}/"
    print("=" * 64)
    print(f"AI Brain Local Board + Bridge running at: {url}")
    print(f"Repo CWD: {DEFAULT_CWD}")
    print("Detected CLIs:", {a: bool(detect_cli(a)) for a in ("codex", "claude", "gemini", "gh")})
    print("=" * 64, flush=True)
    threading.Thread(target=github_queue_poller_loop, daemon=True).start()
    if os.environ.get("AI_BRAIN_NO_OPEN") != "1":
        threading.Timer(0.6, lambda: webbrowser.open(url)).start()
    ThreadingHTTPServer((HOST, PORT), BridgeHandler).serve_forever()

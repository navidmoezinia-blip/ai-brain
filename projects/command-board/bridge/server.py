#!/usr/bin/env python3
"""
AI Brain Local Bridge + Static Board Server + GitHub Queue Poller (Zero-Dependency)
- Streams real-time thinking, tool calls, tool results & output to both browser and console
- Passes multi-line prompts via stdin so Windows never truncates or hangs on newlines
- Serves the command board UI at http://127.0.0.1:8787/
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
    """
    Pipes multi-line prompts over stdin for all CLIs so Windows CreateProcess
    never chokes on newlines or quotes.
    """
    if agent == "codex":
        # Note: On Windows, `codex -s read-only` triggers 'Access is denied' on shell execution
        if mode == "readonly" and os.name != "nt":
            return [exe, "exec", "--skip-git-repo-check", "--ephemeral", "-s", "read-only", "-"], prompt
        return [exe, "exec", "--full-auto", "-"], prompt

    if agent == "claude":
        base = [exe, "-p", "--verbose", "--output-format", "stream-json"]
        if mode != "readonly":
            base.append("--dangerously-skip-permissions")
        return base, prompt

    # gemini / agy
    return [exe, "-p", prompt], None


def check_claude_settings_warnings(work_dir: str) -> str:
    """Checks ~/.claude/settings.json for stale ANTHROPIC_BASE_URL or proxy overrides that cause ConnectionRefused."""
    warnings = []
    candidates = [
        Path.home() / ".claude" / "settings.json",
        Path(work_dir) / ".claude" / "settings.json",
        Path(work_dir) / ".claude" / "settings.local.json",
    ]
    for path in candidates:
        try:
            if path.is_file():
                data = json.loads(path.read_text(encoding="utf-8", errors="replace"))
                env_block = data.get("env") if isinstance(data, dict) else None
                if isinstance(env_block, dict):
                    for key in ("ANTHROPIC_BASE_URL", "HTTP_PROXY", "HTTPS_PROXY", "ALL_PROXY"):
                        if key in env_block:
                            warnings.append(f"[Warning] {path} defines env.{key}={env_block[key]!r} (may cause ConnectionRefused)\n")
        except Exception:
            pass
    return "".join(warnings)


def format_stream_line(agent: str, raw_line: str) -> str:
    """Converts Claude stream-json events (including thinking, tool_use, tool_result, errors) into live logs."""
    if agent != "claude":
        return raw_line
    s = raw_line.strip()
    if not s:
        return ""
    if not s.startswith("{"):
        return raw_line if raw_line.endswith("\n") else raw_line + "\n"
    try:
        evt = json.loads(s)
    except Exception:
        return raw_line if raw_line.endswith("\n") else raw_line + "\n"

    etype = evt.get("type")

    if etype == "system":
        subtype = evt.get("subtype", "")
        if subtype == "init":
            model = evt.get("model", "claude")
            mcps = evt.get("mcp_servers") or []
            mcp_summary = ", ".join(
                f"{m.get('name')}({m.get('status')})" for m in mcps if isinstance(m, dict)
            )
            extra = f" | MCPs: {mcp_summary}" if mcp_summary else ""
            return f"[Claude initialized · model: {model}{extra}]\n[Thinking / working on prompt...]\n"
        return f"[System: {subtype}]\n" if subtype else ""

    if etype == "assistant":
        msg = evt.get("message", {})
        parts = []
        for block in msg.get("content", []):
            btype = block.get("type")
            if btype == "thinking":
                thought = (block.get("thinking") or "").strip()
                if thought:
                    preview = thought.replace("\n", " ")[:220]
                    parts.append(f"[Thinking] {preview}...\n")
            elif btype == "text" and block.get("text"):
                parts.append(block["text"].strip() + "\n")
            elif btype == "tool_use":
                tname = block.get("name", "tool")
                tinp = block.get("input", {})
                cmd_preview = (
                    tinp.get("command")
                    or tinp.get("file_path")
                    or tinp.get("pattern")
                    or json.dumps(tinp)[:140]
                )
                parts.append(f"-> [Tool: {tname}] {cmd_preview}\n")
        return "".join(parts)

    if etype == "user":
        msg = evt.get("message", {})
        parts = []
        for block in msg.get("content", []):
            if isinstance(block, dict) and block.get("type") == "tool_result":
                content = block.get("content", "")
                if isinstance(content, list):
                    content = " ".join(
                        c.get("text", "") for c in content if isinstance(c, dict)
                    )
                snippet = str(content).strip().replace("\n", " ")[:180]
                if snippet:
                    parts.append(f"   <- [Tool Result] {snippet}\n")
        return "".join(parts)

    if etype == "result":
        res_text = evt.get("result", "")
        is_err = evt.get("is_error", False)
        cost = evt.get("total_cost_usd")
        tag = "ERROR" if is_err else "Completed"
        suffix = f"\n[{tag} · ${cost:.4f}]\n" if isinstance(cost, (int, float)) else f"\n[{tag}]\n"
        return (f"\n{res_text}\n" if res_text else "") + suffix

    if etype == "error":
        return f"[Error] {json.dumps(evt)}\n"

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

    diag = check_claude_settings_warnings(work_dir) if agent == "claude" else ""
    header = f"[{time.strftime('%H:%M:%S')}] Starting {agent.upper()} ({exe})\nWorking directory: {work_dir}\n{diag}{'-' * 48}\n"
    print(f"\n=== [{run_id}] START {agent.upper()} ===", flush=True)
    with RUNS_LOCK:
        RUNS[run_id]["output"] = header

    env = os.environ.copy()
    env["PYTHONUNBUFFERED"] = "1"
    # 1. Strip CLAUDE_CODE_SSE_PORT and parent session vars (Claude Code issue #91904 causes 11 retries + ConnectionRefused)
    for k in list(env.keys()):
        ku = k.upper()
        if ku.startswith("CLAUDE_CODE_") or ku in ("CLAUDECODE", "CLAUDE_ENTRYPOINT"):
            env.pop(k, None)
    # 2. Strip dead local ANTHROPIC_BASE_URL (issue #87259) and proxy vars
    if "127.0.0.1" in env.get("ANTHROPIC_BASE_URL", "") or "localhost" in env.get("ANTHROPIC_BASE_URL", ""):
        env.pop("ANTHROPIC_BASE_URL", None)
    for pkey in ("HTTP_PROXY", "HTTPS_PROXY", "ALL_PROXY", "http_proxy", "https_proxy", "all_proxy"):
        env.pop(pkey, None)
    # 3. Force Bun (claude.exe on Windows) to bypass HKCU Internet Settings proxy (192.168.49.1:8282)
    env["NO_PROXY"] = "*"
    env["no_proxy"] = "*"
    env[" ANTHROPIC_BASE_URL"] = "https://api.anthropic.com"
    env.pop(" ANTHROPIC_BASE_URL", None)

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
                if not stdin_data.endswith("\n"):
                    proc.stdin.write("\n")
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

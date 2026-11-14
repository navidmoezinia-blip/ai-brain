#!/usr/bin/env python3
"""
AI Brain Local Bridge + Static Board Server (Zero-Dependency)
- Serves the command board UI directly at http://127.0.0.1:8787/ (same-origin, zero CORS/PNA blocks)
- Also sends CORS + Access-Control-Allow-Private-Network headers so https://navidmoezinia-blip.github.io/ai-brain/ works too
- Runs codex, claude, and agy/gemini CLIs on your Windows PC using your signed-in subscriptions ($0 API cost)
"""

import json
import mimetypes
import os
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

BRIDGE_DIR = Path(__file__).resolve().parent
BOARD_DIR = BRIDGE_DIR.parent  # projects/command-board/
DEFAULT_CWD = os.environ.get("AI_BRAIN_REPO_DIR", str(BOARD_DIR.parents[1]))

RUNS = {}
RUNS_LOCK = threading.Lock()


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
    return None


def build_command(agent: str, exe: str, prompt: str, mode: str):
    if agent == "codex":
        if mode == "readonly":
            return [exe, "exec", "--skip-git-repo-check", "--ephemeral", "-s", "read-only", "-"], prompt
        return [exe, "exec", "--full-auto", "-"], prompt

    if agent == "claude":
        if mode == "readonly":
            return [exe, "-p", prompt], None
        return [exe, "-p", "--dangerously-skip-permissions", prompt], None

    return [exe, "-p", prompt], None


def run_agent_subprocess(run_id: str, agent: str, prompt: str, cwd: str, mode: str):
    exe = detect_cli(agent)
    if not exe:
        with RUNS_LOCK:
            RUNS[run_id]["status"] = "error"
            RUNS[run_id]["output"] = f"CLI for '{agent}' not found on PATH."
            RUNS[run_id]["finished_at"] = time.time()
        return

    cmd, stdin_data = build_command(agent, exe, prompt, mode)
    work_dir = cwd if (cwd and os.path.isdir(cwd)) else DEFAULT_CWD

    with RUNS_LOCK:
        RUNS[run_id]["output"] = f"Running: {' '.join(cmd[:3])} in {work_dir} ...\n"

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
        )

        if stdin_data is not None and proc.stdin:
            try:
                proc.stdin.write(stdin_data)
            except Exception:
                pass
            finally:
                proc.stdin.close()

        collected = []
        if proc.stdout:
            for line in proc.stdout:
                collected.append(line)
                tail = "".join(collected)[-12000:]
                with RUNS_LOCK:
                    RUNS[run_id]["output"] = tail

        ret = proc.wait(timeout=1800)
        final_out = "".join(collected)[-12000:].strip()
        with RUNS_LOCK:
            RUNS[run_id]["status"] = "done" if ret == 0 else "error"
            RUNS[run_id]["exit_code"] = ret
            RUNS[run_id]["output"] = final_out or f"(completed with exit code {ret})"
            RUNS[run_id]["finished_at"] = time.time()
    except Exception as exc:
        with RUNS_LOCK:
            RUNS[run_id]["status"] = "error"
            RUNS[run_id]["output"] = f"Execution failed: {exc}"
            RUNS[run_id]["finished_at"] = time.time()


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
    print("=" * 60)
    print(f"AI Brain Local Board + Bridge running at: {url}")
    print(f"Repo CWD: {DEFAULT_CWD}")
    print("Detected CLIs:", {a: detect_cli(a) for a in ("codex", "claude", "gemini")})
    print("=" * 60)
    if os.environ.get("AI_BRAIN_NO_OPEN") != "1":
        threading.Timer(0.6, lambda: webbrowser.open(url)).start()
    ThreadingHTTPServer((HOST, PORT), BridgeHandler).serve_forever()

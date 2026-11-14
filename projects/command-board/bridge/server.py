#!/usr/bin/env python3
"""
AI Brain Local Bridge Server (Zero-Dependency)
Lets https://navidmoezinia-blip.github.io/ai-brain/ start Codex, Claude, and
Antigravity/Gemini CLI runs directly on your machine using your existing
signed-in subscriptions ($0 API cost).
"""

import json
import os
import shutil
import subprocess
import threading
import time
import uuid
from http.server import BaseHTTPRequestHandler, ThreadingHTTPServer
from pathlib import Path

HOST = "127.0.0.1"
PORT = int(os.environ.get("AI_BRAIN_BRIDGE_PORT", "8787"))
DEFAULT_CWD = os.environ.get("AI_BRAIN_REPO_DIR", str(Path(__file__).resolve().parents[3]))

RUNS = {}
RUNS_LOCK = threading.Lock()


def detect_cli(agent: str):
    if agent == "codex":
        return shutil.which("codex")
    if agent == "claude":
        return shutil.which("claude")
    if agent == "gemini":
        return shutil.which("agy") or shutil.which("gemini")
    return None


def run_agent_subprocess(run_id: str, agent: str, prompt: str, cwd: str):
    exe = detect_cli(agent)
    if not exe:
        with RUNS_LOCK:
            RUNS[run_id]["status"] = "error"
            RUNS[run_id]["output"] = f"CLI for '{agent}' not found on PATH."
            RUNS[run_id]["finished_at"] = time.time()
        return

    if agent == "codex":
        cmd = [exe, "exec", "--skip-git-repo-check", "--ephemeral", "-"]
        stdin_data = prompt
    elif agent == "claude":
        cmd = [exe, "-p", prompt]
        stdin_data = None
    else:
        cmd = [exe, "-p", prompt]
        stdin_data = None

    try:
        proc = subprocess.run(
            cmd,
            input=stdin_data,
            text=True,
            capture_output=True,
            cwd=cwd if os.path.isdir(cwd) else DEFAULT_CWD,
            timeout=1800,
        )
        combined = (proc.stdout or "") + ("\n" + proc.stderr if proc.stderr else "")
        with RUNS_LOCK:
            RUNS[run_id]["status"] = "done" if proc.returncode == 0 else "error"
            RUNS[run_id]["exit_code"] = proc.returncode
            RUNS[run_id]["output"] = combined[-8000:] if combined else "(no output)"
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
        self.send_header("Access-Control-Allow-Headers", "Content-Type")

    def _send_json(self, code: int, payload: dict):
        body = json.dumps(payload).encode("utf-8")
        self.send_response(code)
        self._send_cors_headers()
        self.send_header("Content-Type", "application/json")
        self.send_header("Content-Length", str(len(body)))
        self.end_headers()
        self.wfile.write(body)

    def do_OPTIONS(self):
        self.send_response(204)
        self._send_cors_headers()
        self.end_headers()

    def do_GET(self):
        if self.path == "/health":
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

        if self.path == "/runs":
            with RUNS_LOCK:
                items = list(RUNS.values())
            self._send_json(200, {"runs": items})
            return

        self._send_json(404, {"error": "Not found"})

    def do_POST(self):
        if self.path != "/run":
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
                "output": "Running locally via signed-in CLI...",
                "started_at": time.time(),
            }

        t = threading.Thread(
            target=run_agent_subprocess, args=(run_id, agent, prompt, cwd), daemon=True
        )
        t.start()
        self._send_json(202, {"run_id": run_id, "status": "running"})

    def log_message(self, format, *args):
        pass


if __name__ == "__main__":
    print(f"AI Brain Local Bridge listening on http://{HOST}:{PORT}")
    print(f"Repo CWD: {DEFAULT_CWD}")
    print("Detected CLIs:", {a: bool(detect_cli(a)) for a in ("codex", "claude", "gemini")})
    ThreadingHTTPServer((HOST, PORT), BridgeHandler).serve_forever()

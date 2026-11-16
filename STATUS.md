# STATUS.md — Cross-Agent Coordination Board

This file keeps **Codex**, **Claude**, and **Gemini / Antigravity** synchronized.
Whenever an agent imports files, adds tools/knowledge, or finishes a branch, record a brief entry here.

---

## Current Repository State

- **Repository:** `navidmoezinia-blip/ai-brain` (Public, GitHub Pages enabled: `https://navidmoezinia-blip.github.io/ai-brain/`)
- **Layout Branches:**
  - `main` — Functional / artifact-type layout (`context/`, `knowledge/`, `prompts/`, `skills/`, `projects/`)
  - `structured-by-topic` — Nested subject/content layout (`clinical/`, `research/`, `automation-and-apps/`, `personal/`, `shared/`)
- **Initialized:** 2026-11-14 by Antigravity (Gemini)

---

## Canonical Inventory (`main`)

| Directory | Current Contents | Maintained By |
| :--- | :--- | :--- |
| [`context/`](./context/) | Ready for standing user context, preferences, and house styles | All LLMs |
| [`knowledge/`](./knowledge/) | Ready for clinical references, protocols, and research syntheses | All LLMs |
| [`learning/`](./learning/) | [`learning/notebooklm/`](./learning/notebooklm/) scaffold + templates (`README.md`, `videos.md`, `audios.md`, `mindmaps.md`) | All LLMs |
| [`prompts/`](./prompts/) | Ready for system prompts, templates, and assistant instructions | All LLMs |
| [`skills/`](./skills/) | Ready for portable `SKILL.md` skills shared across agents | All LLMs |
| [`projects/`](./projects/) | [`command-board/`](./projects/command-board/) — Visual multi-LLM command board (radial infinite canvas) + zero-cost local bridge (`projects/command-board/bridge/`) | All LLMs |
| [`inbox/`](./inbox/) | Staging area for initial imports (`inbox/codex/`, `inbox/claude/`, etc.) | All LLMs |

---

## Active Tasks & Cross-Agent Handoff

- [x] **Command Board Radial Infinite Canvas:** Merged to `main` (PR #7, #9, #10, #11, #12, #13).
- [x] **Zero-Cost Local Bridge (`projects/command-board/bridge/server.py`):**
  - Serves static board at `http://127.0.0.1:8787/` (with PNA headers so Chrome never blocks localhost).
  - Multi-line prompts piped over `stdin` for `codex` and `claude`.
  - Fixed Windows `claude.exe` `ConnectionRefused` bug (strips inherited `CLAUDE_CODE_SSE_PORT`, proxy envs, and sets `NO_PROXY=*`).
  - Real-time streaming for `[Thinking]`, `-> [Tool: ...]`, and `<- [Tool Result]` in the drawer and terminal.
  - Option B GitHub queue poller enabled (`status:queued` issues).
- [ ] **Hermes Handoff:** Test / verify agent execution on user's local machine, test Option B GitHub issue queue execution, and continue populating study materials or Codex/Claude workflows.

---

## Cross-Agent Activity Log

| Date | Agent | Branch / PR | Summary |
| :--- | :--- | :--- | :--- |
| 2026-11-16 | Claude | `claude/micu-import` | Imported MICU material: `skills/micu-chart-check/`, `prompts/micu-dotflows/`, `knowledge/micu/` (prep guide, rounding columns), `projects/micu-anki/`. Note-derived MICU files held back until de-identified. |
| 2026-11-14 | Gemini / Antigravity | `gemini/fix-claude-connection` (PR #13) | Fixed `claude.EXE` `ConnectionRefused`, piped prompt on stdin, streamed live thinking/tool events. |
| 2026-11-14 | Gemini / Antigravity | `gemini/fix-bridge-toggle` (PR #11) | Fixed Bridge toggle state URL, served board directly from `http://127.0.0.1:8787/`. |
| 2026-11-14 | Gemini / Antigravity | `gemini/radial-canvas` (PR #7) | Implemented full radial infinite canvas with panning, zooming, and agent pods. |
| 2026-11-14 | Gemini / Antigravity | `gemini/learning-notebooklm` (commit `9a85c9f`) | Added `learning/notebooklm/` structure and templates. |
| 2026-11-14 | Gemini / Antigravity | `structured-by-topic` | Added subject/content-nested layout (`clinical/`, `research/`, `automation-and-apps/`, `personal/`, `shared/`). |
| 2026-11-14 | Gemini / Antigravity | `main` | Initialized `ai-brain` scaffolding (`AGENTS.md`, `CLAUDE.md`, `GEMINI.md`, `STATUS.md`, shared folder structure). |

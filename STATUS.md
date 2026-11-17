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
| [`knowledge/`](./knowledge/) | [`knowledge/micu/`](./knowledge/micu/) — Prep guide, rounding columns, Initial H&P + Progress Note playbooks (Markdown + interactive HTML), practical writing guide, manual scaffold, template/style/chart-check specs | All LLMs |
| [`learning/`](./learning/) | [`learning/notebooklm/`](./learning/notebooklm/) scaffold + templates (`README.md`, `videos.md`, `audios.md`, `mindmaps.md`) | All LLMs |
| [`prompts/`](./prompts/) | [`micu-dotflows/`](./prompts/micu-dotflows/), [`micu-doximity/`](./prompts/micu-doximity/), [`micu-progress-note-bot-and-template.md`](./prompts/micu-progress-note-bot-and-template.md), [`micu-smartphrases/`](./prompts/micu-smartphrases/), [`micu-doximity-code-scribe.md`](./prompts/micu-doximity-code-scribe.md) | All LLMs |
| [`skills/`](./skills/) | Ready for portable `SKILL.md` skills shared across agents | All LLMs |
| [`projects/`](./projects/) | [`command-board/`](./projects/command-board/) — Visual multi-LLM command board (radial infinite canvas) + zero-cost local bridge (`projects/command-board/bridge/`) | All LLMs |
| [`inbox/`](./inbox/) | Staging area for initial imports (`inbox/codex/`, `inbox/claude/`, etc.) | All LLMs |

---

## Active Tasks & Cross-Agent Handoff

- [ ] **MICU personal Epic panels:** [2026-11-16 checkpoint](projects/micu-order-panels/status-2026-11-16.md) on `codex/micu-order-panels-checkpoint`. Nine panels saved in Epic; all 11 guide templates remain incomplete. Scenarios 7–9 absent; scenario 6 contains only ABG/lactate. Nursing/monitoring, conditional items and repeat schedules remain. No patient orders placed.
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
| 2026-11-17 | Claude | `claude/micu-doximity` | Added `prompts/micu-doximity/`: the eight MICU DotFlows consolidated for Doximity as `DOX_MICU_MAIN.txt` (main instruction box, 19,830 of 20,000 characters: routing, shared rules, prep, update, note) plus five uploaded source files (H&P, check, presentation, handoff, consult). Generated from `prompts/micu-dotflows/` by `build.py`; edit the DotFlow sources, not the outputs. Not yet installed or run in Doximity. |
| 2026-11-16 | Gemini / Antigravity | `gemini/micu-antigravity-import` | Imported all remaining de-identified MICU artifacts created in Antigravity: standalone Progress Note Master Playbook (`.md` + interactive `.html`), practical note-writing guide, manual note scaffold, bot prompt + pre-cleaned Epic SmartPhrase template, `.NAVICUBASE` ICU daily checklist + SmartLists (`prompts/micu-smartphrases/`), and Doximity Scribe `ICU Code` self-auditing template (`prompts/micu-doximity-code-scribe.md`). Confirmed `Initial_HP_Master_Playbook.md` is already Sections 1–8 of `knowledge/micu/micu-hp-and-progress-playbook.md`. |
| 2026-11-16 | Codex | `codex/micu-order-panels-checkpoint` | Saved PHI-free Epic preference configuration inventory and continuation report in `projects/micu-order-panels/`. Records exact saved names, observed defaults, local catalog IDs, missing components and validation limits. Does not claim full guide implementation. |
| 2026-11-16 | Claude | `claude/micu-deid` | Added four de-identified MICU note-writing references to `knowledge/micu/` (playbook, template analysis, style spec, chart-checking guide). |
| 2026-11-16 | Claude | `claude/micu-import` | Imported MICU material: `skills/micu-chart-check/`, `prompts/micu-dotflows/`, `knowledge/micu/` (prep guide, rounding columns), `projects/micu-anki/`. Note-derived MICU files held back until de-identified. |
| 2026-11-14 | Gemini / Antigravity | `gemini/fix-claude-connection` (PR #13) | Fixed `claude.EXE` `ConnectionRefused`, piped prompt on stdin, streamed live thinking/tool events. |
| 2026-11-14 | Gemini / Antigravity | `gemini/fix-bridge-toggle` (PR #11) | Fixed Bridge toggle state URL, served board directly from `http://127.0.0.1:8787/`. |
| 2026-11-14 | Gemini / Antigravity | `gemini/radial-canvas` (PR #7) | Implemented full radial infinite canvas with panning, zooming, and agent pods. |
| 2026-11-14 | Gemini / Antigravity | `gemini/learning-notebooklm` (commit `9a85c9f`) | Added `learning/notebooklm/` structure and templates. |
| 2026-11-14 | Gemini / Antigravity | `structured-by-topic` | Added subject/content-nested layout (`clinical/`, `research/`, `automation-and-apps/`, `personal/`, `shared/`). |
| 2026-11-14 | Gemini / Antigravity | `main` | Initialized `ai-brain` scaffolding (`AGENTS.md`, `CLAUDE.md`, `GEMINI.md`, `STATUS.md`, shared folder structure). |

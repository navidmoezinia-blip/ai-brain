# STATUS.md — Cross-Agent Coordination Board

This file keeps **Codex**, **Claude**, and **Gemini / Antigravity** synchronized.
Whenever an agent imports files, adds tools/knowledge, or finishes a branch, record a brief entry here.

---

## Current Repository State

- **Repository:** `navidmoezinia-blip/ai-brain` (Private)
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
| [`prompts/`](./prompts/) | Ready for system prompts, templates, and assistant instructions | All LLMs |
| [`skills/`](./skills/) | Ready for portable `SKILL.md` skills shared across agents | All LLMs |
| [`projects/`](./projects/) | [`command-board/`](./projects/command-board/) — Visual multi-LLM cloud dispatch hub & Kanban board | All LLMs |
| [`inbox/`](./inbox/) | Staging area for initial imports (`inbox/codex/`, `inbox/claude/`, etc.) | All LLMs |

---

## Active Onboarding / Pending Imports

- [ ] **Codex (`codex/*`):** Initial upload of prepared Codex/ChatGPT workflows, context, prompts, and tools.
- [ ] **Claude (`claude/*`):** Initial upload of prepared Claude skills, research, templates, and knowledge files.
- [ ] **Consolidation:** Review and merge Codex + Claude branches onto preferred layout (`main` or `structured-by-topic`).

---

## Cross-Agent Activity Log

| Date | Agent | Branch / PR | Summary |
| :--- | :--- | :--- | :--- |
| 2026-11-14 | Gemini / Antigravity | `gemini/cloud-command-board` | Added `projects/command-board/` visual multi-LLM cloud dispatch board + GitHub Pages deploy workflow. |
| 2026-11-14 | Gemini / Antigravity | `structured-by-topic` | Added subject/content-nested layout (`clinical/`, `research/`, `automation-and-apps/`, `personal/`, `shared/`). |
| 2026-11-14 | Gemini / Antigravity | `main` | Initialized `ai-brain` scaffolding (`AGENTS.md`, `CLAUDE.md`, `GEMINI.md`, `STATUS.md`, shared folder structure). |

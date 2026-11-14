# STATUS.md — Cross-Agent Coordination Board

This file keeps **Codex**, **Claude**, and **Gemini / Antigravity** synchronized.
Whenever an agent imports files, adds tools/knowledge, or finishes a branch, record a brief entry here.

---

## Current Repository State

- **Repository:** `navidmoezinia-blip/ai-brain` (Private)
- **Default Branch:** `main`
- **Initialized:** 2026-11-14 by Antigravity (Gemini)

---

## Canonical Inventory (`main`)

| Directory | Current Contents | Maintained By |
| :--- | :--- | :--- |
| [`context/`](./context/) | `user-profile.md`, `work-style.md`, `clinical-ai-stack.md` (PR from `claude/initial-import`) | All LLMs |
| [`knowledge/`](./knowledge/) | `clinical/ed-consult-reference.md` (PR from `claude/initial-import`) | All LLMs |
| [`prompts/`](./prompts/) | `inpatient/global-ruleset.md` (PR from `claude/initial-import`) | All LLMs |
| [`skills/`](./skills/) | 11 skills from Claude: duty-hours, ed-workflow, epic-chart-collect-to-notes, inpatient-chart-check, inpatient-rounding, medspacy, openevidence-chart-check-upload, openevidence-upload-patient-docs, qgenda, qgenda-capacity-audit, self-improvement; symlinked from `.claude/skills/` and `.agents/skills/` (PR from `claude/initial-import`) | All LLMs |
| [`projects/`](./projects/) | Ready for apps, scripts, Anki builders, and pipelines | All LLMs |
| [`inbox/`](./inbox/) | `inbox/claude/`: chat-history review, 6 third-party skills, `MANIFEST.md` (PR from `claude/initial-import`) | All LLMs |

---

## Active Onboarding / Pending Imports

- [ ] **Codex (`codex/*`):** Initial upload of prepared Codex/ChatGPT workflows, context, prompts, and tools.
- [x] **Claude (`claude/*`):** Initial upload on `claude/initial-import` (PR open). Still to import: Doximity/QH/OpenEvidence prompt files from Drive and claude.ai artifacts, AHK scripts and userscripts, legacy skills (clinic-note, nbn-note, pulm-note, nephro-final). See `inbox/claude/MANIFEST.md`.
- [ ] **Consolidation (`main`):** Review and merge Codex + Claude branches into unified folders on `main`.

---

## Cross-Agent Activity Log

| Date | Agent | Branch / PR | Summary |
| :--- | :--- | :--- | :--- |
| 2026-11-14 | Gemini / Antigravity | `main` | Initialized `ai-brain` scaffolding (`AGENTS.md`, `CLAUDE.md`, `GEMINI.md`, `STATUS.md`, shared folder structure). |
| 2026-11-14 | Claude | `claude/initial-import` | Imported 11 skills (+ symlinks), user profile, work style, clinical AI stack, inpatient global ruleset, ED consult reference, chat-history review, and 6 third-party skills in inbox. No PHI; ed-workflow contains UTMB staff phone numbers and Nav's callback number (repo is private). |

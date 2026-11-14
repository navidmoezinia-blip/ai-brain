# STATUS.md — Cross-Agent Coordination Board (`structured-by-topic`)

This file keeps **Codex**, **Claude**, and **Gemini / Antigravity** synchronized on the **topic-nested** layout (`structured-by-topic`).

---

## Repository & Branch Overview

- **Repository:** `navidmoezinia-blip/ai-brain` (Private)
- **Active Layout Branch:** `structured-by-topic` (nested by subject/content domain)
- **Alternate Layout Branch:** `main` (organized by artifact type: `context/`, `knowledge/`, `prompts/`, `skills/`, `projects/`)

---

## Nested Topic Inventory

| Top-Level Domain | Subtopics Scaffolded | Contents |
| :--- | :--- | :--- |
| **[`shared/`](./shared/)** | `context/`, `skills/` | `context/user-profile.md`, `context/work-style.md`; 11 skills in `skills/` (duty-hours, ed-workflow, epic-chart-collect-to-notes, inpatient-chart-check, inpatient-rounding, medspacy, openevidence-chart-check-upload, openevidence-upload-patient-docs, qgenda, qgenda-capacity-audit, self-improvement), symlinked from `.claude/skills/` and `.agents/skills/` (Claude PR) |
| **[`clinical/`](./clinical/)** | `inpatient/`, `clinic/`, `rotations/ed-aer1/`, `study/` | `inpatient/global-ruleset.md`, `inpatient/ed-consult-reference.md`; READMEs in `inpatient/` and `rotations/ed-aer1/` point to the matching skills (Claude PR) |
| **[`research/`](./research/)** | `methodology/`, `pharmacology-compounds/`, `literature-notes/` | Systematic reviews, compound evidence tables, appraisal protocols, paper notes |
| **[`automation-and-apps/`](./automation-and-apps/)** | `residency-apps/`, `scripts/`, `ai-workflows/` | `ai-workflows/clinical-ai-stack.md`, `ai-workflows/chat-history-improvements-2026-11-14.md` (Claude PR) |
| **[`personal/`](./personal/)** | `productivity/`, `health-and-performance/`, `finance-and-admin/` | Routines, scheduling, personal health protocols, licensing & admin |
| **[`inbox/`](./inbox/)** | `codex/`, `claude/`, `gemini/` | `claude/`: 6 third-party skills pending license check, `MANIFEST.md` (Claude PR) |

---

## Active Onboarding / Pending Imports

- [ ] **Codex (`codex/*`):** Import prepared Codex/ChatGPT materials into nested topic folders.
- [x] **Claude (`claude/*`):** Initial import on `claude/by-topic` (PR to `structured-by-topic`). Still to import: Doximity/QH/OpenEvidence prompt files from Drive and claude.ai artifacts, AHK scripts and userscripts, legacy skills (clinic-note, nbn-note, pulm-note, nephro-final). See `inbox/claude/MANIFEST.md`.

---

## Cross-Agent Activity Log

| Date | Agent | Branch | Summary |
| :--- | :--- | :--- | :--- |
| 2026-11-14 | Gemini / Antigravity | `structured-by-topic` | Created nested topic/content hierarchy covering Clinical, Research, Automation & Apps, Personal, and Shared context/skills. |
| 2026-11-14 | Claude | `claude/by-topic` | Filed the Claude import into topic folders: 11 skills in `shared/skills/` (+ symlinks), profile and work style in `shared/context/`, inpatient global ruleset and ED consult reference in `clinical/inpatient/`, clinical AI stack and chat-history review in `automation-and-apps/ai-workflows/`, third-party skills in `inbox/claude/`. No PHI; ed-workflow contains UTMB staff phone numbers and Nav's callback number. Supersedes PR #1 (type layout on `main`). |

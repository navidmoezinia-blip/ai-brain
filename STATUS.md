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
| **[`shared/`](./shared/)** | `context/`, `skills/` | Global user profile/preferences & universal multi-LLM `SKILL.md` packages |
| **[`clinical/`](./clinical/)** | `inpatient/`, `clinic/`, `rotations/ed-aer1/`, `study/` | All residency prompts, guides, Epic workflows, contacts, and Anki tools grouped by clinical setting |
| **[`research/`](./research/)** | `methodology/`, `pharmacology-compounds/`, `literature-notes/` | Systematic reviews, compound evidence tables, appraisal protocols, paper notes |
| **[`automation-and-apps/`](./automation-and-apps/)** | `residency-apps/`, `scripts/`, `ai-workflows/` | Standalone bots/PWAs, utility scripts, multi-agent & MCP setups |
| **[`personal/`](./personal/)** | `productivity/`, `health-and-performance/`, `finance-and-admin/` | Routines, scheduling, personal health protocols, licensing & admin |
| **[`inbox/`](./inbox/)** | `codex/`, `claude/`, `gemini/` | Unsorted bulk imports waiting to be filed into topic folders |

---

## Active Onboarding / Pending Imports

- [ ] **Codex (`codex/*`):** Import prepared Codex/ChatGPT materials into nested topic folders.
- [ ] **Claude (`claude/*`):** Import prepared Claude materials into nested topic folders.

---

## Cross-Agent Activity Log

| Date | Agent | Branch | Summary |
| :--- | :--- | :--- | :--- |
| 2026-11-14 | Gemini / Antigravity | `structured-by-topic` | Created nested topic/content hierarchy covering Clinical, Research, Automation & Apps, Personal, and Shared context/skills. |

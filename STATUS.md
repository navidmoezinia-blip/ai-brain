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
- [x] **Claude (`claude/*`):** First import filed into topic folders on `claude/ai-brain-repo-org-36ae4a` (2026-11-14). Second pass still needed, see handoff notes.

---

## Cross-Agent Activity Log

| Date | Agent | Branch | Summary |
| :--- | :--- | :--- | :--- |
| 2026-11-14 | Gemini / Antigravity | `structured-by-topic` | Created nested topic/content hierarchy covering Clinical, Research, Automation & Apps, Personal, and Shared context/skills. |
| 2026-11-14 | Claude | `claude/ai-brain-repo-org-36ae4a` | Re-filed the `claude/initial-import` materials into the topic layout: 2 context docs, clinical AI stack, inpatient global ruleset, ED consult reference, 11 skills (symlinked into `.claude/skills` and `.agents/skills`), unsorted items in `inbox/claude/`. |
| 2026-11-16 | Claude | `claude/micu-admissions` | Added `clinical/rotations/micu/admission-thought-process.md` (consult-call questions, ED-doc questions, septic shock plan, SSC 2026). |

---

## Claude Import — Where Things Landed

| Location | Files |
| :--- | :--- |
| [`shared/context/`](./shared/context/) | `user-profile.md`, `work-style.md` |
| [`shared/skills/`](./shared/skills/) | 11 skills, indexed in [`shared/skills/README.md`](./shared/skills/README.md): `inpatient-rounding`, `inpatient-chart-check`, `epic-chart-collect-to-notes`, `openevidence-chart-check-upload`, `openevidence-upload-patient-docs`, `ed-workflow`, `medspacy`, `qgenda`, `qgenda-capacity-audit`, `duty-hours`, `self-improvement` |
| [`clinical/`](./clinical/) | `clinical-ai-stack.md` (platform limits and current setup; read before editing clinical prompts) |
| [`clinical/inpatient/`](./clinical/inpatient/) | `global-ruleset.md` |
| [`clinical/rotations/ed-aer1/`](./clinical/rotations/ed-aer1/) | `ed-consult-reference.md` |
| [`inbox/claude/`](./inbox/claude/) | `MANIFEST.md`, `chat-history-improvements-2026-11-14.md`, `third-party-skills/` (6 public skills, license check pending) |

## Handoff Notes (any agent)

- **Skills live once, in `shared/skills/`.** Topic READMEs link to them; do not copy skill files into topic folders.
- **Still empty:** `research/`, `automation-and-apps/`, `personal/`, `clinical/clinic/`, `clinical/study/`. Nothing in the Claude import belonged there.
- **Not imported yet** (listed in [`inbox/claude/MANIFEST.md`](./inbox/claude/MANIFEST.md)): Doximity/QH/OpenEvidence prompt files in Google Drive and claude.ai artifacts, AHK scripts and userscripts, older skills (`clinic-note`, `nbn-note`, `pulm-note`, `nephro-final`).
- **`claude/initial-import`** holds the same materials in the `main` by-type layout. Keep the two in sync or retire one once a layout is chosen.

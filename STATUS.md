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
| 2026-11-14 | Claude (Code, desktop) | `claude/desktop-import` | Copied the Claude Code side of the brain: 35 memory notes plus their index, filed by topic under `*/memory/`, global CLAUDE.md/AGENTS.md, 6 more skills, 3 userscripts, 9 AHK scripts, a local-transcript variant of `self-improvement`. Files are verbatim copies except one redaction. |

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

## Claude Code (desktop) Import - Where Things Landed

| Location | Files |
| :--- | :--- |
| [`shared/context/claude-code-memory/`](./shared/context/claude-code-memory/) | `MEMORY.md` (index of all 35 notes), profile, general feedback rules, `CLAUDE.global.md`, `AGENTS.home.md` |
| `clinical/inpatient/memory/`, `clinical/rotations/ed-aer1/memory/`, `clinical/study/memory/` | Clinical feedback rules, Epic quirks, rounding v8, dotflows, ED rotation notes and contacts, Anki scripting |
| `research/methodology/memory/` | Evidence tool access, UTMB library EZproxy route |
| `automation-and-apps/ai-workflows/memory/`, `automation-and-apps/residency-apps/memory/` | Multi-model bridge, Hermes verdict, Chrome/Tampermonkey notes, Epic Note Cleaner, OpenEvidence Neon |
| [`automation-and-apps/scripts/`](./automation-and-apps/scripts/) | `userscripts/` (3), `ahk/` (9) |
| `personal/productivity/memory/`, `personal/finance-and-admin/memory/` | QGenda, machine setup, GPU issue log, duty hours |
| [`shared/skills/`](./shared/skills/) | Added `ask-all`, `note-audit`, `ed-note`, `epic-chart-check-capture`, `inpatient-day-prep`, `codex-self-improvement`; `self-improvement` gained a Claude Code section and `scripts/extract_claude_code_prompts.py` |
| [`inbox/claude/`](./inbox/claude/) | `desktop-skill-variants/` (local `inpatient-chart-check` and `inpatient-rounding`, which differ from the `shared/skills/` copies), 2 more third-party skills (`goal-loop`, `de-ai-ify`) |

## Handoff Notes (any agent)

- **Skills live once, in `shared/skills/`.** Topic READMEs link to them; do not copy skill files into topic folders.
- **Still empty:** `research/`, `automation-and-apps/`, `personal/`, `clinical/clinic/`, `clinical/study/`. Nothing in the Claude import belonged there.
- **Not imported yet** (listed in [`inbox/claude/MANIFEST.md`](./inbox/claude/MANIFEST.md)): Doximity/QH/OpenEvidence prompt files in Google Drive and claude.ai artifacts, AHK scripts and userscripts, older skills (`clinic-note`, `nbn-note`, `pulm-note`, `nephro-final`).
- **`claude/initial-import`** holds the same materials in the `main` by-type layout. Keep the two in sync or retire one once a layout is chosen.
- **Desktop skill variants need a merge decision.** `inbox/claude/desktop-skill-variants/` holds the Claude Code copies of `inpatient-chart-check` (29 files, a different workflow from the shared one) and `inpatient-rounding` (older than the shared one). Nothing in `shared/skills/` was overwritten.
- **Memory notes are point-in-time copies** from `~/.claude/projects/C--Users-nav/memory/` (2026-11-14). They hold staff contacts and machine details, no patient data; one possible patient name was removed from `clinical/inpatient/memory/reference_inpatient_chart_check_epic.md`.
- **Not copied:** raw chat transcripts (they contain PHI), `EpicPatientSearch.ahk` and `power button.ahk` (not readable from this session), Epic Note Cleaner source (own repo: `moaziniya-jpg/epic-note-cleaner`).

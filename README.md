# ai-brain (`structured-by-topic` Branch)

Shared private workspace for **OpenAI Codex**, **Claude**, and **Gemini / Antigravity**, organized **hierarchically by topic & content domain** so every prompt, reference guide, dataset, and tool for a subject lives in one place.

> Compare layouts anytime:
> - **`structured-by-topic` (this branch):** Nested by subject (`clinical/inpatient/`, `clinical/clinic/`, `research/...`, `automation-and-apps/...`, `personal/...`).
> - **`main`:** Organized by file function (`context/`, `knowledge/`, `prompts/`, `skills/`, `projects/`).

---

## Nested Topic Map

- **[`shared/`](./shared/)** — Cross-cutting [`context/`](./shared/context/) (standing preferences/house rules) & universal [`skills/`](./shared/skills/) (`SKILL.md`).
- **[`clinical/`](./clinical/)** — Residency & patient-care domains (strictly zero PHI):
  - [`inpatient/`](./clinical/inpatient/) — Ward notes, rounding presentations, admissions/discharges, house style
  - [`clinic/`](./clinical/clinic/) — Outpatient workflows, preventive/guideline vigilance, quick-ask guides
  - [`rotations/ed-aer1/`](./clinical/rotations/ed-aer1/) — Rotation logistics, Epic MDM workflows, ED contacts & callbacks *(add new rotations under `clinical/rotations/<name>/`)*
  - [`study/`](./clinical/study/) — Board/ITE prep, Anki decks & deck builders, clinical pearls
- **[`research/`](./research/)** — Evidence synthesis & academic work:
  - [`methodology/`](./research/methodology/) — Systematic review protocols, appraisal checklists, grading standards
  - [`pharmacology-compounds/`](./research/pharmacology-compounds/) — Compound reviews, interaction maps, verification data
  - [`literature-notes/`](./research/literature-notes/) — Journal club, trial summaries, reading notes
- **[`automation-and-apps/`](./automation-and-apps/)** — Software & engineering projects:
  - [`residency-apps/`](./automation-and-apps/residency-apps/) — Bots, RAG services, mobile PWAs
  - [`scripts/`](./automation-and-apps/scripts/) — Standalone Python/Bash/Node utilities
  - [`ai-workflows/`](./automation-and-apps/ai-workflows/) — Multi-LLM orchestration, MCP configs, assistant specs
- **[`personal/`](./personal/)** — Life & personal operations:
  - [`productivity/`](./personal/productivity/) — Scheduling, routines, task systems
  - [`health-and-performance/`](./personal/health-and-performance/) — Fitness, nutrition, personal protocols
  - [`finance-and-admin/`](./personal/finance-and-admin/) — Licensing, credentialing, admin & finance
- **[`inbox/`](./inbox/)** — Staging drop-zone (`inbox/codex/`, `inbox/claude/`, `inbox/gemini/`) for unsorted imports.

---

## Copy-Paste Onboarding Prompts (Topic-Nested Workflow)

### Prompt for Codex
```text
Connect to my shared repo `navidmoezinia-blip/ai-brain` and check out the `structured-by-topic` branch (`git fetch origin && git checkout structured-by-topic`).
1. Read `AGENTS.md` and `STATUS.md` first so you follow our nested topic/content layout.
2. Create a new branch from `structured-by-topic` named `codex/topic-import` (or `codex/<topic>`).
3. File your prepared prompts, docs, scripts, and guides together inside their matching topic folders (`clinical/...`, `research/...`, `automation-and-apps/...`, `personal/...`, or `shared/`—and drop anything unsorted into `inbox/codex/`).
4. Update `STATUS.md`, push your branch, and open a PR targeting `structured-by-topic`.
```

### Prompt for Claude
```text
Connect to my shared repo `navidmoezinia-blip/ai-brain` and base your work on the `structured-by-topic` branch (`git fetch origin && git checkout structured-by-topic`).
1. Read `CLAUDE.md`, `AGENTS.md`, and `STATUS.md` first so you follow our nested topic/content layout.
2. Create your `claude/...` branch from `structured-by-topic`.
3. File your prepared prompts, docs, data, and tools together inside their matching topic folders (`clinical/...`, `research/...`, `automation-and-apps/...`, `personal/...`, or `shared/`—and drop anything unsorted into `inbox/claude/`).
4. Update `STATUS.md`, push your branch, and open a PR targeting `structured-by-topic`.
```

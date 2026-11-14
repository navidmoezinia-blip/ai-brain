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
| [`context/`](./context/) | Codex standing workspace conventions, clinical source fidelity and house style; profile/stack documents remain proposed in Claude PR #1 | All LLMs |
| [`knowledge/`](./knowledge/) | Prepared ED complaint/host launcher reference with source and precedence notes | All LLMs |
| [`prompts/`](./prompts/) | Two-file FM clinic system, blank deidentified previsit worksheet, current ED encounter baseline and Epic field map | All LLMs |
| [`skills/`](./skills/) | `ed-note`, `note-audit`, `ask-all`, `codex-self-improvement`; existing Claude skill proposals are tracked separately | All LLMs |
| [`projects/`](./projects/) | Six existing project/tool source catalogs plus three reusable workspace templates | All LLMs |
| [`inbox/`](./inbox/) | Codex import manifest, source-hash inventory, validation record, and 14 explicitly uninstalled inpatient reconciliation snapshots | All LLMs |

This inventory describes the proposed `codex/initial-import` contents. Until its
PR is merged, `main` retains the scaffold and the imports remain branch work.
See [the Codex manifest](./inbox/codex/MANIFEST.md) for exact source mapping,
overlap with PRs #1/#2/#4, deliberate exclusions, and installation limits.

---

## Active Onboarding / Pending Imports

- [x] **Codex (`codex/initial-import`):** Prepared context, clinic/ED prompts, four portable skill entrypoints, ED reference, project catalog/templates and inpatient reconciliation delta; PR review/merge pending.
- [ ] **Claude (`claude/*`):** PR #1 (`claude/initial-import`) targets `main`; PRs #2 (`claude/by-topic`) and #4 (`claude/desktop-import`) target `structured-by-topic`. Preserve their branches and reconcile overlapping variants deliberately.
- [ ] **Gemini (`gemini/cloud-command-board`):** PR #5 targets `main` with a separate command-board project and deployment workflow. Preserve its project and combine its status entry during review; no board code is duplicated here.
- [ ] **Consolidation:** Review and merge Codex + Claude branches onto preferred layout (`main` or `structured-by-topic`).

---

## Cross-Agent Activity Log

| Date | Agent | Branch / PR | Summary |
| :--- | :--- | :--- | :--- |
| 2026-11-14 | Codex | `codex/initial-import` -> `main` | Imported prepared Codex context, clinic/ED prompts, ED launcher knowledge, four skills, six project/tool catalogs and project templates. Isolated rounding rev 9 refinements, recorded raw-capture variant and compatibility router in `inbox/codex/reconciliation/` to avoid overwriting PR #1. Added source hashes and validation; no PHI, secrets, live clinical actions or installed-source cutover. See [manifest](./inbox/codex/MANIFEST.md). |
| 2026-11-14 | Gemini / Antigravity | `structured-by-topic` | Added subject/content-nested layout (`clinical/`, `research/`, `automation-and-apps/`, `personal/`, `shared/`). |
| 2026-11-14 | Gemini / Antigravity | `main` | Initialized `ai-brain` scaffolding (`AGENTS.md`, `CLAUDE.md`, `GEMINI.md`, `STATUS.md`, shared folder structure). |

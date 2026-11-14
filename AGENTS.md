# AGENTS.md — Shared Operating Manual (Topic-Nested Layout)

Welcome to **`ai-brain`** (`navidmoezinia-blip/ai-brain`) — **`structured-by-topic`** branch.

This repository is a **single shared workspace and knowledge hub** accessed by **OpenAI Codex**, **Claude (Claude Code / Claude Web)**, and **Gemini / Antigravity**.

> **Layout Note:**
> - **`structured-by-topic` (this branch):** Organizes files **hierarchically by subject/content domain** so all prompts, reference guides, scripts, and data for a topic live together in one folder.
> - **`main`:** Organizes files **by artifact type** (`context/`, `knowledge/`, `prompts/`, `skills/`, `projects/`).

---

## 1. Session Startup Protocol (Do This First)

1. **Sync all remote branches** so you see work from every LLM across both layouts:
   ```bash
   git fetch origin --prune
   git branch -r
   ```
   *(If `gh` CLI is available, also check `gh pr list --state open`.)*
2. **Read [`STATUS.md`](./STATUS.md)** to see what is currently tracked, what other agents have added, and any cross-agent handoff notes.
3. **Check [`shared/context/`](./shared/context/)** for global user preferences, communication defaults, and standing instructions that apply across every topic.

---

## 2. Branching & Collaboration Rules

- **Working on the topic-nested structure?** Branch off `origin/structured-by-topic`:
  - **Codex:** `codex/by-topic` or `codex/<topic>/<subtopic>` *(e.g., `codex/clinical/inpatient`)*
  - **Claude:** `claude/by-topic` or `claude/<topic>/<subtopic>` *(e.g., `claude/research/pharmacology`)*
  - **Gemini / Antigravity:** `gemini/by-topic` or `gemini/<topic>/<subtopic>`
- **Never force-push (`--force`) or overwrite another agent's active branch** unless explicitly asked by the user.
- **Update [`STATUS.md`](./STATUS.md)** whenever you import files or complete a topic update, and open a PR targeting `structured-by-topic` (or `main` if directed).

---

## 3. Nested Topic & Content Architecture

Instead of splitting a topic across separate top-level `prompts/`, `knowledge/`, and `projects/` folders, **keep everything for a subject together inside its topic directory**:

```text
ai-brain/ (structured-by-topic)
├── AGENTS.md                        # Canonical rules for ALL LLMs (Single Source of Truth)
├── CLAUDE.md                        # Claude entrypoint -> @AGENTS.md
├── GEMINI.md                        # Gemini / Antigravity entrypoint -> AGENTS.md
├── STATUS.md                        # Cross-agent coordination board & topic inventory
├── README.md                        # Overview & copy-paste onboarding prompts
│
├── shared/                          # Cross-cutting context & universal multi-topic skills
│   ├── context/                     # Global user profile, standing preferences, universal rules
│   └── skills/                      # Portable SKILL.md skills (.claude/skills & .agents/skills symlink here)
│
├── clinical/                        # 1. Clinical & Residency (Family Medicine PGY-1)
│   ├── inpatient/                   # Ward notes, rounding presentations, house style, admissions
│   ├── clinic/                      # Outpatient workflows, preventive/guideline vigilance, quick guides
│   ├── rotations/                   # Rotation-specific hubs (add new rotations as subfolders)
│   │   └── ed-aer1/                 # Shift prep, Epic MDM workflows, ED contacts & callbacks
│   └── study/                       # Board/ITE prep, Anki decks & builders, clinical pearls
│
├── research/                        # 2. Research & Evidence Reviews
│   ├── methodology/                 # Systematic review protocols, appraisal tools, grading checklists
│   ├── pharmacology-compounds/      # Compound evidence syntheses, interaction maps, datasets
│   └── literature-notes/            # Paper appraisals, journal club, clinical trial notes
│
├── automation-and-apps/             # 3. Apps, Scripts & Automation
│   ├── residency-apps/              # Bots, RAG services, PWAs, full-stack tools
│   ├── scripts/                     # Standalone utilities, converters, automation scripts
│   └── ai-workflows/                # Multi-agent setups, MCP configs, custom assistant pipelines
│
├── personal/                        # 4. Personal & Life Ops
│   ├── productivity/                # Routines, scheduling, task & calendar workflows
│   ├── health-and-performance/      # Fitness, nutrition, personal protocols
│   └── finance-and-admin/           # Admin, credentialing/licensing checklists, personal logistics
│
└── inbox/                           # Drop-zone for unsorted bulk imports (codex/, claude/, gemini/)
```

### Inside Any Topic Folder
- **Small topic:** Place Markdown guides, prompt templates, checklists, and scripts directly side-by-side with clear filenames (plus a short `README.md` index if helpful).
- **Large topic:** Add optional local subfolders (`prompts/`, `docs/`, `data/`, `tools/`) *inside* that topic directory so everything remains self-contained.
- **Portable Skills (`SKILL.md`):** Place cross-cutting skills in `shared/skills/<skill-name>/SKILL.md` (and use relative symlinks from `.claude/skills/` or `.agents/skills/` if needed).

---

## 4. Strict Safety, Privacy & Hygiene Rules

1. **ZERO PHI / HIPAA Compliance:** Never commit real patient names, initials + dates, MRNs, DOBs, contact info, or identifiable clinical notes. All templates and clinical examples must be 100% de-identified or synthetic.
2. **ZERO Secrets in Git:** Never commit `.env` files, API keys, OAuth tokens, or service account JSONs. Commit `.env.example` placeholders only.
3. **Markdown First:** Prefer `.md`, `.json`, `.csv`, and code files over duplicate `.docx`/`.pdf` binaries unless requested as final deliverables.

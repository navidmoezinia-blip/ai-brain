# AGENTS.md — Shared Operating Manual for All LLMs

Welcome to **`ai-brain`** (`navidmoezinia-blip/ai-brain`).

This repository is a **single shared workspace and knowledge hub** accessed by multiple AI agents — including **OpenAI Codex**, **Claude (Claude Code / Claude Web)**, and **Gemini / Antigravity**.

Every agent working in this repository **must** follow this file so all LLMs stay synchronized, share context seamlessly, and never overwrite each other's work.

> **Two Scaffolded Layout Branches Available:**
> - **`main` (this branch):** Organizes files **by artifact type** (`context/`, `knowledge/`, `prompts/`, `skills/`, `projects/`).
> - **`structured-by-topic` (`origin/structured-by-topic`):** Organizes files **nested by subject/content domain** (`clinical/`, `research/`, `automation-and-apps/`, `personal/`, `shared/`) so all prompts, docs, and tools for a topic stay together. Check which base branch the user specifies before importing files.

---

## 1. Session Startup Protocol (Do This First)

Whenever you start a new task or session in this repository:

1. **Sync all remote state** so you can see `main` as well as active branches from other agents:
   ```bash
   git fetch origin --prune
   git branch -r
   ```
   *(If `gh` CLI is available, also check open PRs with `gh pr list --state open` — some environments like Claude Web push branches that appear as draft/open PRs.)*
2. **Read [`STATUS.md`](./STATUS.md)** to see what is currently on `main`, what other agents have recently added or are actively working on, and any cross-agent handoff notes.
3. **Check [`context/`](./context/)** for shared user preferences, standing instructions, house styles, and workflow conventions before creating new materials.

---

## 2. Branching & Collaboration Rules

All agents share full **read** access to the entire repo (`main` + every branch), and isolate **writes** on dedicated branches before merging to `main`.

- **`main` is the canonical shared brain.** Everything merged into `main` is vetted and immediately shared by all LLMs.
- **Create your own branch for new work or file imports** using your agent prefix:
  - **Codex (OpenAI):** `codex/<short-topic>` *(e.g., `codex/initial-setup`, `codex/clinic-workflows`)*
  - **Claude (Anthropic):** `claude/<short-topic>` *(e.g., `claude/initial-import`, `claude/research-review`)*
  - **Gemini / Antigravity:** `gemini/<short-topic>` *(e.g., `gemini/repo-scaffolding`)*
- **Never force-push (`--force`) to `main` or modify another agent's active branch** unless the user explicitly instructs you to merge, rebase, or collaborate on that specific branch.
- **Open a Pull Request (or log your branch in `STATUS.md`)** when your work is ready so the user or any agent can review and merge it into `main`.

---

## 3. Shared Directory Architecture

Organize files **by function, not siloed by AI vendor**, so every LLM benefits from every resource:

```text
ai-brain/
├── AGENTS.md          # Canonical rules & architecture for ALL LLMs (Single Source of Truth)
├── CLAUDE.md          # Entrypoint for Claude -> points to AGENTS.md
├── GEMINI.md          # Entrypoint for Gemini / Antigravity -> points to AGENTS.md
├── STATUS.md          # Cross-agent coordination board, inventory & handoff log
├── README.md          # Human overview & copy-paste agent onboarding prompts
│
├── context/           # Standing user context, preferences, house styles, persona/role docs
├── knowledge/         # Domain references, clinical guides, protocols, research syntheses
├── prompts/           # Reusable system prompts, note templates, custom GPT / assistant specs
├── skills/            # Portable agent skills (<skill-name>/SKILL.md + scripts/references)
├── projects/          # Software projects, scripts, decks, apps, research pipelines
└── inbox/             # Staging drop-zone for bulk imports or unsorted files (<agent-name>/)
```

### Where Should I Put My Files?
- **Importing prepared files from another workspace or chat?**
  - Place clean, categorized items directly into `context/`, `knowledge/`, `prompts/`, `skills/`, or `projects/<project-name>/`.
  - If you have raw exports, mixed bundles, or items that need sorting later, drop them in `inbox/codex/`, `inbox/claude/`, or `inbox/gemini/` with a short manifest note.
- **Adding reusable agent skills (`SKILL.md`)?**
  - Store canonical skills in `skills/<skill-name>/SKILL.md` using standard YAML frontmatter (`name`, `description`).
  - If an environment requires tool-specific paths (such as `.claude/skills/<skill-name>` or `.agents/skills/<skill-name>`), prefer relative symlinks pointing back to `../../skills/<skill-name>` so skills never diverge.

---

## 4. Handoff & Documentation Standards

To keep every LLM on the same page:

1. **Prefer Markdown (`.md`), JSON, CSV, and plain text** as primary sources of truth. Avoid committing binary `.docx` or `.pdf` duplicates of Markdown files unless specifically requested as final deliverables.
2. **Update [`STATUS.md`](./STATUS.md)** whenever you:
   - Import a batch of files
   - Add a new skill, project, knowledge collection, or prompt
   - Leave follow-up tasks for another LLM
3. **Self-documenting folders:** When adding a new project under `projects/<name>/` or a major topic under `knowledge/<topic>/`, include a brief `README.md` explaining what it is and how to run or use it.

---

## 5. Strict Safety, Privacy & Security Rules

1. **ZERO PHI / HIPAA Compliance:**
   - **Never** commit Protected Health Information (patient names, initials + dates, MRNs, DOBs, phone numbers, addresses, or identifiable clinical encounters).
   - Templates, examples, and clinical references must always be 100% de-identified or synthetic.
2. **ZERO Secrets in Git:**
   - **Never** commit API keys, OAuth tokens, `.env` files, or service account JSONs. Use `.env.example` with placeholder keys only.
3. **Preserve Existing Work:**
   - Before reorganizing, renaming, or deleting shared files, check if other files or prompts reference them.

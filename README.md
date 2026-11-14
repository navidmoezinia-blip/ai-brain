# ai-brain

Shared private workspace, knowledge base, skill library, and project hub for all LLMs (**OpenAI Codex**, **Claude**, and **Gemini / Antigravity**).

---

## How Everything Stays Synced

Every LLM automatically reads its native instruction file on startup, and all of them point to **[`AGENTS.md`](./AGENTS.md)** as the single source of truth:

| Agent | Auto-Read Entrypoint | Branch Prefix |
| :--- | :--- | :--- |
| **OpenAI Codex** | [`AGENTS.md`](./AGENTS.md) | `codex/<topic>` |
| **Claude (Code / Web)** | [`CLAUDE.md`](./CLAUDE.md) → `AGENTS.md` | `claude/<topic>` |
| **Gemini / Antigravity** | [`GEMINI.md`](./GEMINI.md) → `AGENTS.md` | `gemini/<topic>` |

 Cross-agent updates, inventory, and handoffs are tracked in **[`STATUS.md`](./STATUS.md)**.

---

## Directory Layout

- **[`context/`](./context/)** — Standing user profile, workflow preferences, house styles, and global context.
- **[`knowledge/`](./knowledge/)** — Reference guides, clinical pearls, rotation prep, literature reviews, and protocols.
- **[`prompts/`](./prompts/)** — Reusable prompt templates, note generators, and custom assistant instructions.
- **[`skills/`](./skills/)** — Portable agent skills (`<skill-name>/SKILL.md`) usable by Codex, Claude, and Gemini.
- **[`projects/`](./projects/)** — Standalone codebases, scripts, decks, web apps, and automation pipelines.
- **[`inbox/`](./inbox/)** — Drop-zone for bulk imports (`inbox/codex/`, `inbox/claude/`, `inbox/gemini/`) before sorting.

---

## Quick Copy-Paste Prompts for Onboarding Your LLMs

Once Codex and Claude have finished preparing their files, connect them to **`navidmoezinia-blip/ai-brain`** and paste the prompt below:

### Prompt for Codex
```text
Connect to my shared repo `navidmoezinia-blip/ai-brain`.
1. First read `AGENTS.md` and `STATUS.md` so you follow our shared multi-LLM structure and rules.
2. Create a new branch named `codex/initial-import` (or `codex/<topic>`).
3. Organize your prepared files into the shared directories (`context/`, `knowledge/`, `prompts/`, `skills/`, or `projects/`—and put anything unsorted into `inbox/codex/`).
4. Update `STATUS.md` with an inventory of what you added, push your branch, and open a PR to `main`.
```

### Prompt for Claude
```text
Connect to my shared repo `navidmoezinia-blip/ai-brain`.
1. First read `CLAUDE.md`, `AGENTS.md`, and `STATUS.md` so you follow our shared multi-LLM structure and rules.
2. Create your `claude/...` branch from `main`.
3. Organize your prepared files into the shared directories (`context/`, `knowledge/`, `prompts/`, `skills/`, or `projects/`—and put anything unsorted into `inbox/claude/`). If you add `.claude/skills/`, keep the canonical skill in `skills/<name>/` and symlink to it.
4. Update `STATUS.md` with an inventory of what you added, push your branch, and open a PR to `main`.
```

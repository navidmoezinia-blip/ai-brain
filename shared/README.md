# `shared/` — Cross-Cutting Context & Portable Skills

Use `shared/` for global resources that cut across multiple topics:

- **`shared/context/`** — Global user profile, standing preferences, universal house rules, and cross-topic defaults.
- **`shared/skills/`** — Portable `SKILL.md` agent skills (`shared/skills/<skill-name>/SKILL.md`) usable across Codex, Claude, and Gemini. Symlink from `.claude/skills/` or `.agents/skills/` if an agent harness expects those paths.

## Current contents
- [`context/user-profile.md`](./context/user-profile.md) — who Nav is, working preferences
- [`context/work-style.md`](./context/work-style.md) — how Nav builds and iterates (work style and build stack)
- [`skills/README.md`](./skills/README.md) — index of all portable skills and their topic folders

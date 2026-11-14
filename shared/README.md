# `shared/` — Cross-Cutting Context & Portable Skills

Use `shared/` for global resources that cut across multiple topics:

- **`shared/context/`** — Global user profile, standing preferences, universal house rules, and cross-topic defaults.
- **`shared/skills/`** — Portable `SKILL.md` agent skills (`shared/skills/<skill-name>/SKILL.md`) usable across Codex, Claude, and Gemini. Symlink from `.claude/skills/` or `.agents/skills/` if an agent harness expects those paths.

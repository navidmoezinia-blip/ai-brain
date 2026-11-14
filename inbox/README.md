# `inbox/` — Agent Staging & Bulk Import Drop-Zone

Use `inbox/` when importing raw exports, mixed archives, or prepared files that haven't been sorted into `context/`, `knowledge/`, `prompts/`, `skills/`, or `projects/` yet.

## Subfolders by Agent
- `inbox/codex/` — Unsorted imports dropped by Codex / ChatGPT
- `inbox/claude/` — Unsorted imports dropped by Claude
- `inbox/gemini/` — Unsorted imports dropped by Gemini / Antigravity

When dropping files here, include a short `MANIFEST.md` (or note in `/STATUS.md`) describing what was added so any LLM can help organize them into canonical folders.

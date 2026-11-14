# GEMINI.md

Read and follow [`AGENTS.md`](./AGENTS.md) as the single source of truth for this branch (`structured-by-topic`), and check [`STATUS.md`](./STATUS.md) at the start of every session.

## Gemini / Antigravity Notes (`structured-by-topic` layout)

- **Sync First:** Run `git fetch origin --prune` and check open PRs (`gh pr list --state all`) to inspect both `main` (type-based) and `structured-by-topic` (content-nested) branches plus `codex/*` and `claude/*` branches.
- **Topic-First Organization:** Place related prompts, docs, data, and tools together inside their domain folder (`clinical/`, `research/`, `automation-and-apps/`, `personal/`) and universal context/skills in `shared/`.

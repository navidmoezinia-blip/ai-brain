# CLAUDE.md

@AGENTS.md

## Claude-Specific Notes (`structured-by-topic` layout)

- **Single Source of Truth:** Read and follow [`AGENTS.md`](./AGENTS.md) and [`STATUS.md`](./STATUS.md) at the start of every session.
- **Topic-First Organization:** Keep prompts, knowledge guides, data, and helper scripts for a subject together inside its nested topic directory (`clinical/...`, `research/...`, `automation-and-apps/...`, `personal/...`).
- **Skills Compatibility:** Store cross-cutting `SKILL.md` packages in [`shared/skills/`](./shared/skills/) and symlink from `.claude/skills/<skill-name>` (`../../shared/skills/<skill-name>`) rather than duplicating files.

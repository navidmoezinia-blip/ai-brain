# CLAUDE.md

@AGENTS.md

## Claude-Specific Notes

- **Single Source of Truth:** Read and follow [`AGENTS.md`](./AGENTS.md) and check [`STATUS.md`](./STATUS.md) at the start of every session.
- **Branching:** Use `claude/<topic>` branches (or your environment's auto-generated `claude/...` branch) for your changes, and update `STATUS.md` so Codex and Gemini/Antigravity know what you added.
- **Skills Compatibility:** Canonical skills live in [`skills/`](./skills/) (`skills/<skill-name>/SKILL.md`) so all LLMs can use them. If you need a skill wired into `.claude/skills/<skill-name>`, create a relative symlink to `../../skills/<skill-name>` rather than duplicating files.

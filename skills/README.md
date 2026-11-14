# `skills/` — Portable Multi-LLM Skills

Canonical directory for reusable agent skills shared across **Codex**, **Claude**, and **Gemini / Antigravity**.

## Standard Skill Layout
```text
skills/
└── <skill-name>/
    ├── SKILL.md        # Required: YAML frontmatter (name, description) + instructions
    ├── scripts/        # Optional: executable helper scripts
    ├── references/     # Optional: detailed reference docs loaded on demand
    └── assets/         # Optional: templates or static files
```

## Cross-Platform Wiring
- Keep the real files inside `skills/<skill-name>/`.
- If an agent harness looks in `.claude/skills/<skill-name>` or `.agents/skills/<skill-name>`, create a relative symlink (`../../skills/<skill-name>`) instead of copying files so updates stay in sync across all LLMs.

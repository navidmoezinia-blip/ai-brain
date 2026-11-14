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

## Codex initial import

- [ed-note](ed-note/SKILL.md): entrypoint to the prepared adult ED baseline.
- [note-audit](note-audit/SKILL.md): evidence-check workflow with separate
  proposals and a deidentified paste-mode default.
- [ask-all](ask-all/SKILL.md): same-question comparison through the prepared
  Codex CLI/Gemini configuration; check tool availability before invoking.
- [codex-self-improvement](codex-self-improvement/SKILL.md): evidence-based
  review of repeated workflows when requested.

These are source files, not a claim that host installations were changed.
The inpatient variants in [Codex reconciliation](../inbox/codex/reconciliation/README.md)
are partial review candidates and must not be installed as a complete skill set.

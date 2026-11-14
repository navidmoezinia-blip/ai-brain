# `projects/` — Shared Codebases, Tools & Pipelines

Store standalone software projects, automation scripts, deck builders, web apps, and data pipelines here.

## Conventions
Each project lives in its own subdirectory (`projects/<project-name>/`) with:
- A `README.md` explaining setup, dependencies, and commands
- `.env.example` for any required environment variables (never commit real `.env` files)

## Existing source repositories

These entries retain independent source ownership and link to the owning
repository's usage and verification instructions:

- [Epic Note Cleaner](epic-note-cleaner/README.md)
- [ITE Reasoning Deck](ite-reasoning-deck/README.md)
- [NBN Epic chart setup](nbn-epic-patient-chart-setup/README.md)
- [Local Windows Agent](local-windows-agent/README.md)
- [AI Workspace Review](ai-workspace-review/README.md)
- [OpenEvidence MCP (third-party)](openevidence-mcp/README.md)
- [Reusable project templates](workspace-templates/README.md)

# Workspace project templates

Prepared text templates used by the canonical shared workspace's [new-project.ps1](https://github.com/moaziniya-jpg/codex-shared-workspace/blob/main/scripts/new-project.ps1):

- `project-AGENTS.template.md`: project policy with `{{PROJECT_NAME}}` and `{{DESCRIPTION}}` replacement fields.
- `project-index.template.md`: GitHub/Drive/source-of-truth registry entry to fill in for a project.
- `project.gitignore`: baseline ignores for secrets, local tool state, dependencies, and generated files.

These files are portable source templates, not installed configuration. Replace their intentional placeholders when using them. The `new-project.ps1` script remains in its [owning shared workspace](https://github.com/moaziniya-jpg/codex-shared-workspace); this import does not create a second project-creation script or change installed configuration.

Source: `templates/` in `moaziniya-jpg/codex-shared-workspace`, imported 2026-11-14. The template's portable `%USERPROFILE%` paths and shared-workspace policy are retained. No secrets, patient text, or generated files are included.

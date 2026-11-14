# Local Windows Agent

Local Qwen/Ollama desktop assistant with Windows accessibility, screenshots, mouse, keyboard, and application tools. The existing project includes a native dark interface and a terminal interface.

- Authoritative code: [moaziniya-jpg/local-windows-agent](https://github.com/moaziniya-jpg/local-windows-agent).
- Setup, configuration, and limits: [owning README](https://github.com/moaziniya-jpg/local-windows-agent/blob/HEAD/README.md).
- Existing Windows launchers: **Local Windows Agent** desktop shortcut or `Start Local Agent.cmd` from the owning project.
- Existing terminal entrypoint: `.venv/Scripts/python.exe agent.py` from the configured project environment.

The launcher uses a local Ollama endpoint and local model; model weights stay in Ollama's cache. The tool can operate the desktop and run PowerShell. Its instructions require stopping for login or MFA. Read the current owning README before running or changing its configuration.

This entry catalogs the existing project rather than duplicating code, model weights, environment files, or runtime data.

Source: shared-workspace project index and owning project README, reviewed 2026-11-14. Existing README verification is historical; this import did not run the agent or establish current application reliability.

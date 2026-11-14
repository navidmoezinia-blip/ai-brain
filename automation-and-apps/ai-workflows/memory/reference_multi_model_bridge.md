---
name: reference-multi-model-bridge
description: "How ChatGPT (Codex) and Gemini are wired into Claude Code — official Codex plugin, gemini-cli MCP on agy backend, /ask-all skill (set up 11/12/2026)"
metadata:
  node_type: memory
  type: reference
  originSessionId: 292780e7-f77a-4b25-a2d8-54f3ce4f1fc6
  modified: 2026-11-13T01:47:18.468Z
---

Set up 11/12/2026 on his subscriptions; no API keys, no Claude-token proxies (he forbids CLIProxyAPI/VibeProxy-style tools).

- **ChatGPT**: Codex CLI 0.163.0 (signed in with ChatGPT). `codex mcp-server` was REMOVED in Codex 0.154 (Sept 2026), so use OpenAI's official Claude Code plugin `codex@openai-codex` (openai/codex-plugin-cc, v1.0.6): /codex:review, /codex:adversarial-review, /codex:rescue, /codex:status. Review gate OFF (it drains usage). Plain Q&A: `codex exec --skip-git-repo-check --ephemeral -s read-only -o <file> "<q>"`.
- **Gemini**: Gemini CLI 0.68.0 works via `gemini -p`. Claude Code MCP `gemini-cli` = `npx -y gemini-mcp-tool` (jamubc, v1.1.8) with env GEMINI_MCP_BACKEND=agy (experimental Antigravity backend, agy 1.4.12) — preexisting, works; tool `mcp__gemini-cli__ask-gemini`.
- **/ask-all** skill at C:\Users\nav\.claude\skills\ask-all\SKILL.md — Claude answers first, then Codex + Gemini in parallel, side by side. Every Codex/Gemini prompt = question FIRST, then a shared three-model briefing (calls are stateless). Briefing-first makes Antigravity just acknowledge and skip the question (seen 11/12/2026). Antigravity introduces itself as "Antigravity", not Gemini. No PHI to Codex/Gemini.
- **Cross-tool sync 11/12/2026** (backups in C:\Users\nav\config-backups\2026-11-12-sync): skill hub is ~/.agents/skills (Codex + agy read it; Claude does not → Claude gets junctions in ~/.claude/skills). agy SKIPS junctions — give it real copies in ~/.gemini/skills. agy's research MCPs (openevidence, biomcp, paper-search, semantic-scholar, zotero, markitdown, scholar, openalex, exa; +pubmed-cyanheads for Codex) copied to Claude user config and Codex config.toml; desktop-commander added to agy (~/.gemini/config/mcp_config.json). `claude mcp add -e` is variadic and eats the name — edit ~/.claude.json directly for env servers. `codex mcp add --url` hangs on an OAuth probe after writing. Open: biomcp works standalone (36 tools) but Codex won't load it; openalex needs sign-in everywhere; inpatient-rounding Claude v8 vs shared 11/11 version diverged (shared lacks v8 "catch what did not happen" block) — not merged.
- **OpenAlex**: official mcp.openalex.org is OAuth-only (401 without; no API key). Claude + Codex signed in via OAuth (`codex mcp login openalex`). agy OAuth sign-in via /mcp did NOT take, so agy uses `openalex-key` = `npx -y @cyanheads/openalex-mcp-server` reading user env var OPENALEX_API_KEY (he entered it himself via hidden prompt; never in config). He does not want test queries burning his free quota — ask before running model/API test calls.
- roundtable-ai rejected: last release Oct 2025 (stale).


**agy headless (print mode) MCP permissions (11/12/2026):** `--mode auto` is unavailable on this account and MCP calls are auto-denied in `-p` mode unless allow-rules are passed. Rule form is `mcp(<server>/*)` (bare `mcp(<server>)` does NOT match), session-only via `--settings <file>` with `{"permissions":{"allow":["mcp(pubmed-cyanheads/*)","mcp(openalex-key/*)"]}}`. Working call: `agy -p "Read <file> and do the task" --add-dir <dir> --sandbox --settings <file> --print-timeout 1200s`. Output streams to stdout; a full literature review took ~12 min. Codex equivalent: pipe the prompt on stdin to `codex --search exec --skip-git-repo-check --ephemeral -s read-only -o <out>` (~7 min).


Codex `-s read-only` cannot read local files on this machine (shell fails with Access is denied, 11/12/2026): embed the material in the stdin prompt. About 350k characters per run worked; splitting into parallel runs took about 3 minutes each.

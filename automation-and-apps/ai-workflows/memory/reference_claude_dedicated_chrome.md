---
name: reference-claude-dedicated-chrome
description: "Claude's own Chrome" = dedicated CDP Chrome on 127.0.0.1:9333 (not the extension, not the in-app pane); what is/isn't signed in
metadata:
  type: reference
---

When Navid says "your own Chrome profile" he means the dedicated Chrome he built on 10/31/2026, NOT Claude in Chrome (extension, drives his Default profile) and NOT the in-app Browser pane.

- Profile: %USERPROFILE%\chrome-agent\user-data\Default, CDP port 9333 (Codex's twin: codex-chrome, port 9334).
- Start: %USERPROFILE%\chrome-agent\start-agent-chrome.ps1 (forwards to Documents\codex-shared-workspace\scripts\start-claude-chrome.ps1). Launches hidden.
- Drive it with Playwright: require(%USERPROFILE%\chrome-agent\node_modules\playwright-core), chromium.connectOverCDP('http://127.0.0.1:9333'), use contexts()[0], close own tabs, browser.close() only disconnects.
- Cookies refreshed from Codex via `node scripts/sync-codex-chrome-cookies.cjs --to-claude` — only when he asks.
- Checked 10/31/2026: OpenEvidence signed in; UpToDate NOT signed in.

Related: [[reference-chrome-remote-debugging]]

---
name: reference-tampermonkey-chrome
description: "Tampermonkey 5.5 on his Chrome — global switch trap, how to install scripts by automation, what doesn't work, Voice Access dictation hazard"
metadata: 
  node_type: memory
  type: reference
  originSessionId: cbde7f6c-b8b7-4af8-b2b1-c2ab8685352c
  modified: 2026-09-03T18:03:58.793Z
---

Tampermonkey 5.5.0 (MV3) in Chrome profile "Default" (id dhdgffkkebhmkfjojejmpbldmpobfkfo). "Allow User Scripts" + file-URL access are ON.

- **Global on/off switch** (toolbar popup, first row "Enabled" with ✓/✗) was OFF on Sep 3 2026 → NO scripts ran on any site even though each script showed enabled. Check this first when a script "doesn't inject".
- **Installing by automation that works:** open `chrome-extension://dhdgffkkebhmkfjojejmpbldmpobfkfo/options.html#nav=new-user-script+editor` (typed into the omnibox via windows-automation), click in the editor, Ctrl+Home → Ctrl+Shift+End → Ctrl+V (script on clipboard via PowerShell `Set-Clipboard`) → Ctrl+S. Ctrl+A did not select all in the CodeMirror editor; the "Selection" menu has no Select All.
- **Doesn't work:** navigating to a `*.user.js` URL (localhost or file://) — TM redirects to tampermonkey.net/script_installation.php and never opens the install dialog. Claude-in-Chrome `navigate` also mangles `file://` URLs.
- Existing scripts (Sep 2026): Claude Terminal Theme (AMOLED) — disabled individually by me; UWorld Modern; several video/downloader scripts.
- **Hazard:** Windows Voice Access was on; while the TM editor had focus, dictated words got typed into the code. Check the editor before saving.
- Claude-in-Chrome screenshots time out when his Chrome window is occluded (e.g., Anki fullscreen); JS still runs. Fetches from page to 127.0.0.1 hang in background tabs (Local Network Access prompt); a top-level form POST to a local server works instead.
- Related: [[project-uworld-modern-userscript]] [[reference-machine-setup]]

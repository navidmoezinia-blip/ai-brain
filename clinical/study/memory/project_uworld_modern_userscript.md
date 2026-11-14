---
name: project-uworld-modern-userscript
description: "UWorld Modern Tampermonkey userscript (Sep 3 2026) — file location, how it's structured, how to iterate/reinstall, verified state"
metadata: 
  node_type: memory
  type: project
  originSessionId: cbde7f6c-b8b7-4af8-b2b1-c2ab8685352c
  modified: 2026-09-03T18:21:26.364Z
---

**UWorld Modern** userscript built Sep 3 2026: `C:\Users\nav\uworld-modern.user.js` (~705 lines).
Installed in Tampermonkey 5.5.0 (Chrome profile "Default") as "UWorld Modern 1.0.0", `@match https://apps.uworld.com/*`, `@run-at document-start`.

What it does: Inter typography, dark/light tokens (Auto follows Windows; his Windows is dark), remaps ~150 of UWorld's own CSS variables (body `.theme-light` defines ~790 vars; test interface uses `--primary/--font/--background` etc.), restyles sidebar/topbar/cards/tables/create-test, both test-interface skins (UWorld skin = `uworld-layout`, NBME skin = `nbme-layout` + `.nbme-left-navigator`; skin chosen in test Settings → Appearance), floating "Appearance" popover (theme/accent/font/density, on-off switch), Alt+T toggles theme. Settings persist in localStorage key `uwm.settings.v1`.

**Why:** He asked "make my UWorld look modern, complete freedom". Test interface he actually uses is the NBME skin (Step 3 QBank).

**How to apply / iterate:**
- Edit the file, then paste into Tampermonkey editor (dashboard → script → Ctrl+Home, Ctrl+Shift+End, Ctrl+V, Ctrl+S). Ctrl+A in the TM CodeMirror editor did NOT select all via automation; the .user.js URL install flow (tampermonkey.net intermediate page) never opened the install dialog — use the editor.
- Tampermonkey's GLOBAL switch was OFF (popup showed red ✗ "Enabled"); no userscripts ran anywhere until I turned it on. I then disabled his "Claude Terminal Theme (AMOLED)" script individually so claude.ai stayed as he had it. Other scripts became active again.
- Userscripts DO inject into Claude-in-Chrome CDP tabs once TM is enabled (verified).
- A fresh tab opened directly on an apps.uworld.com URL spins forever: the app needs the launch token from the account page's Launch button (www.uworld.com/account/app/v31/subscriptions). That account session expires separately from the app session.
- Verified Sep 3 2026 (v1.0.0 + footer-icon/Alt+T patch): dashboard, create test, previous tests, test interface in both skins, popover; Alt+T only fires when the page itself has focus.
- Captured UWorld DOM/CSS dumps for reference lived in the session scratchpad (not persistent): dashboard/createtest/previoustests/performance/notes/search/flashcards/notebook + testui-modern/testui-nbme/testui-settings/navigator, css-all.css.
- Related: [[reference-tampermonkey-chrome]] [[feedback-fast-browser-automation]]

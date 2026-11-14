---
name: inpatient-chart-check-epic-quirks
description: "Epic quirks found running the inpatient-chart-check skill (hover for New Results, multi-select, copy tricks, output folder)"
metadata:
  node_type: memory
  type: reference
  originSessionId: fb47b474-505b-420e-8007-e4ceafdc99c9
  modified: 2026-10-23T10:41:42.161Z
---

Output goes to C:\Users\nav\Desktop\hospital\btach 1 as a .txt opened in Notepad (no Google Drive). Paste raw.txt into the cleaner in Chrome and read its output; he wants to see that paste happen. The cleaner is served over a localhost http server because Claude in Chrome can't open file:// URLs.

- New Results (last 3H) > Lab: HOVER the link in the left sidebar (don't click); right-click the popup > Copy All. Clicking opens a flowsheet with no Copy All.
- Epic window is reached via the taskbar Epic icon (needs a File Explorer click grant); open_application "Wfica32" only shows the Citrix client help dialog.
- Multi-select in Chart Review lists: ctrl/shift-click drops selections. Click the first row, wait, then shift+Down N times, then use the Review Selected button.
- Scroll wheel is very slow in Citrix; drag the scrollbar thumb instead.
- Right-click Copy All sits about +36px x, +90px y from the click point; read the clipboard with a PowerShell Get-Clipboard retry loop (first read sometimes fails).
- He called [test patient] "the one you failed" before (batch 1 test patient); he plans thousands of runs on fake patients.

- 10/23 run ([room and name removed]): wfica32.exe needs its own request_access before the Epic taskbar click shows the window. Bookmark in Notes list = filled blue flag; confirm it before selecting (first guess was wrong, he moved it). Lab/radiology/notes Copy All can leave the clipboard stale: check the char count differs from the previous capture. Active Orders has Modify/Discontinue buttons, click only blank areas. New Note opens in the right sidebar (Pend/Sign/Cancel), Cancel then Discard. Cleaner Mode selector (11/4/2026): "Notes" default = per-note headings + Epic chrome stripped, clinical text kept; "A/P only" and "Whole text" are opt-in. He found the A/P extraction too aggressive; he only wants the boilerplate that is identical in every note removed. Chrome blocks file:// for the extension: copy cleaner to a scratch dir and serve with a small py http server (POST handler to save the Cleaned box to disk; execCommand copy is blocked).

- Per-patient run is ~25 min and scriptable: cap.ps1 in the scratchpad appends each clipboard to raw.txt and refuses stale (same-hash) captures. A chart sticky note ("My Sticky Note") can sit over the right-click spots, so right-click higher up. Epic taskbar icon minimizes Epic if it's already in front. His standing ask for later runs (10/23): capture ALL sidebar New Results (Lab and Imaging) plus all chart-review labs from the last 24h, redundant copies kept; output pt1/pt2/pt3 files in Desktop\hospital\btach 2.

**Why:** Fixing these cut a failed run to a complete one.
**How to apply:** Follow these steps in the next chart-check run.

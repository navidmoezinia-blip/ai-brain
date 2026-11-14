---
name: "epic-chart-collect-to-notes"
description: "Collect inpatient Epic chart data with the Ctrl+Alt+C macro, clean it in the note cleaner, and save it as a dated txt in the hospital folder."
---

# Epic chart collect -> clean -> save

Use when Nav asks to pull/collect an inpatient's chart. Epic runs in Citrix (Wfica32), so Epic steps need computer use. Everything after Epic uses Chrome MCP and file tools. Keep PHI out of chat; replies terse.

## Prep
- Patient chart open on Summary. Read admission date (banner: "Admitted") and patient first name.
- Macro: Ctrl+Alt+C toggles collection. Badge top-right shows "Collecting: N". While on, every copy is captured, so copy continuously without pausing.
- If Summary sub-tabs are missing, click the wrench > Add or Remove Tabs from Toolbar, and add Vitals, MAR Administrations, All Ord, Micro Summary (90 Days), I/O Detail. Accept.

## Collect (in this exact order)
Press Ctrl+Alt+C once to start. For each view: click in the pane, Ctrl+A, Ctrl+C (or right-click > Select All, then Copy All).

**Summary tab**
1. Vitals
2. MAR Administrations - scroll to bottom so all loads, then copy
3. All Ord - scroll all the way down so everything loads, then copy
4. Micro Summary (90 Days)
5. I/O Detail

**Chart Review tab**
6. Notes - set "Show notes with service dates: From" = admission date, click search/Enter, select all notes, copy. A confirmation appears eventually.
7. Labs - same From = admission date, search, then copy the detailed results/reports (select all, copy).
8. Radiology - click "Load Additional Records" if the banner shows; copy only studies from this admission (usually one or none).
9. Procedures - SKIP entirely.
10. Cardiovascular - check "important stuff" and "no scans only" (Nav reviews scans himself); check "Finalized Results"; sort by Exam. Open the latest result of each exam type (e.g. latest TTE). Copy each.
11. LDAs - open the LDA Report, select all, copy.
12. Blood - SKIP.

**Manage Orders**
13. Active tab, "Go to: Scheduled" - copy only the Scheduled section (nothing else).

Then press Ctrl+Alt+C again to turn collection OFF (badge disappears).

## Clean (Chrome MCP)
- New tab, open the note cleaner (Nav's saved tool/bookmark; ask for URL once if not found).
- Paste the collected data (Ctrl+V), run cleaning, copy the cleaned output.

## Save (file tools, not Explorer clicks)
- Path: C:\Users\nav\Desktop\hospital\<patient first name, lowercase>\<MM_DD>.txt (today's date, e.g. 10_25).
- Create the folder if missing. Write the cleaned text exactly as copied.
- Report only the path and file size.

## Notes
- If a tab fails to copy, skip it, record which one, and keep the collection running.
- Admission date anchors the Notes, Labs, and Radiology filters.
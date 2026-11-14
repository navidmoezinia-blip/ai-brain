---
name: "inpatient-chart-check"
description: Preparing an Agent-driven collection of simulated chart data for -  Summary tabs, IP Insights, new results, notes, labs, imaging, orders, dot phrase, cleaned and saved to a Google Doc. Use when asked to chart-check or pre-round a patient. will be continuously updated with more sim patients to remove mistakes to be perfected for integration into our emr
---

# Inpatient Chart-Check (agent-driven)

The agent **collects and cleans** chart text. It does not interpret, order, sign, or acknowledge. The output is decision support only, and the clinician verifies it.

dont sign, pend, modify, discontinue, Time Mark, or acknowledge anything.
- If text is image-only, not loaded, or unclear, add it to `## Manual review`. Do not guess.

## Tools
- **Epic** (Citrix, `Wfica32`): computer use only, since it has no API.
  - To capture a section: right-click → **Copy All**, then read it with the Clipboard tool.
  - Append each capture to a local `raw.txt` under a `### <Section>` header. This avoids round-tripping every capture through the cleaner UI.
- **Cleaner:** local `Epic Note Cleaner.html` in Chrome.
  - Ensure **A/P only is unchecked**.
  - Paste `raw.txt` into the top box, then read the **Cleaned** box. Use the Chrome MCP tools (`form_input`, `get_page_text`), not host clicks.
- **Output:** Google Drive MCP `create_file`, as a Google Doc (see step 8).

## 1. Open the patient
1. Start on Patient Lists → **My assignments**. A screenshot of the list is not needed.
2. Open the patient's chart.

## 2. Start AI generation first (it is slow)
1. In the right sidebar, open the **AI Hospital Course** tab.
2. Choose **Narrative** and generate.
3. Leave it running and continue with step 3.

## 3. Summary tabs (Copy All each)
| Tab | Before copying |
|---|---|
| Vitals | — |
| MAR ADMINISTRATIONS | Scroll to the bottom so all rows load |
| All Ord | Scroll to the bottom repeatedly until nothing new loads |
| Micro Summary (90 Days) | — |
| I/O Detail | Set the view to **1 hour** |

## 4. AI sidebar
1. When generation finishes, Copy All in AI Hospital Course. One copy captures IP Insights too.
2. Close the sidebar.

## 5. New results (left sidebar)
1. Under **NEW RESULTS (LAST 3H)**, click **Lab**.
2. Copy All. This is the only view sorted by update time.

## 6. Chart Review
- **Notes:**
  1. Find Nav's **bookmarked** last progress note.
  2. Click the note just after it, Shift-click the newest note, and press Enter.
  3. Copy All.
- **Labs:**
  1. Check **Exclude glucose**.
  2. Select everything from the past 24 h, plus any unique older result from this admission (e.g., lactic acid).
  3. Open the detailed report view, which shows prior values, then Copy All. Allow time for it to load.
  4. Separately, select the **latest POC glucose** and Copy All.
- **Radiology:**
  1. Select all studies from this admission, including new ones and any from the past 24 h.
  2. Copy All.
- **Procedures, Cardiovascular:** skip if nothing is new, because the prior progress note already carries the history.
  - **New admit with no prior progress note:** select the latest echo, stress test, any treatment-relevant carotid duplex, stent reports, and pending studies from this admission, then Copy All.
  - **Scans:** Ctrl+A in the viewer. If a scan has no selectable text, add it to Manual review.

## 7. Orders and dot phrase
1. **Manage Orders → Active:** Copy All is not available here.
   1. Click the top edge of the first line, scroll to the bottom, and Shift-click the last line.
   2. Press Ctrl+C.
2. **Notes → New Note:**
   1. Type the dot phrase `.ippull`.
   2. Wait for it to expand, select all, and copy.
   3. Click **Cancel → Discard**. Never Pend or Sign.

## 8. Clean and save
1. Paste `raw.txt` into the cleaner and read the Cleaned output.
2. Add a `## Manual review` section at the end, even if it says "none".
3. Create a Google Doc in the folder **Hospital Days – AI Clinical Workflow** and paste the cleaned text.
   - Doc title: `YYYY-MM-DD Chart Check`.
   - One tab per patient, named `pt1`, `pt2`, … [TODO: exact folder and doc/tab convention]
4. Delete local `raw.txt` after the Doc is confirmed.

## Done when
- Steps 2–7 are all captured or marked skipped with a reason.
- The cleaned text and the Manual review section are in the Google Doc.
- The dot-phrase note was discarded and nothing was signed or acknowledged.
- No other patient's data appears in the output.

---
name: qgenda-capacity-audit
description: Audit UTMB Family Medicine QGenda clinic schedules for over-capacity AM/PM sessions and produce a Word report. Use whenever the user asks to audit QGenda, check clinic capacity, count providers per session, find days with too many people at clinic, or run the capacity report for a block or date range — even if they just say "run the audit" or give only a date range.
---

# QGenda Clinic Capacity Audit

Audit each weekday AM and PM session at three clinics and report sessions that exceed provider limits, as a Word document mirroring the block-review format.

## Fixed rules

| QGenda prefix | Clinic name in report | Max providers per session |
|---|---|---|
| DC | Dickinson (DC Clinic) | 9 |
| IE | PCP / Island East | 9 |
| IW | West / Island West | 8 |

Count only panel-holding providers. Per session, the counted task rows are Clinic, Acute, Sports Clinic, Lifestyle Clinic, Integrative Clinic, Procedures Clinic, and Eye Clinic.

Exclude: all Attending rows (incl. Procedures/Eye Clinic Attending), Direct Teaching and Integrative Direct Teach, Tandem Clinic, Integrated Behavioral Med, Behavioral Med Clinic, Non-FM Provider, Direct Observation, Dermatology/Cardiology/Medicare rows. Deduplicate a person appearing in two counted rows of the same session.

## Workflow

1. Get the date range from the user (or the block file they upload). The QGenda schedule must be open in a shared Chrome tab (Grid: Tasks view, locations filtered to the three clinics, date range set to cover the audit period). If the tab isn't shared, ask the user to open the Claude side panel on the QGenda tab.
2. Extract the grid from the DOM — do not count from screenshots. The grid lives in three parallel tables: `#rowHeaders` (66 task rows), `#dateHeaders` (second `tr` = one cell per date), `#rows` (66 rows × N date cells; each cell's `innerText` lines are "abbrev time"). Row order can change — always map row indices by reading `#rowHeaders` text first, then select counted rows per the rules above.
3. In page JavaScript, for each weekday date column build per-site AM and PM sets: union the counted rows' name abbreviations (first token of each cell line), dedupe, count. Skip SAT/SUN columns. Return only counts plus name lists for sessions over (or at) the limit — full dumps get truncated.
4. Sanity-check a couple of computed cells against a screenshot before trusting the extraction.
5. Build the Word report with the docx skill (read its SKILL.md first), following the block-review format: title line "Block N (M/D-M/D) – Capacity Audit"; a one-line statement of limits and exclusions; then one section per week — "Week N (M/D-M/D) – " with indented site lines in order PCP:, West:, Dickinson: — listing each over-capacity session as "Day, Mon. D AM/PM: N providers" (over-by amount optional). If a site/week has none, write "No AM or PM sessions exceed the provider limit." Also flag sessions exactly at capacity as "at capacity (N of N), not over." End with a one-paragraph Result summary.
6. Deliver the .docx with SendUserFile. Keep chat text to one or two sentences.

## Notes

- Provider abbreviations are lowercase QGenda usernames (e.g., lauporte = Porterfield, jhteran = Teran, scdrobin = Robinson, semathis = Mathis, jlfuente = Fuentes, hayasin = Yasin, bathomps = Thompson, czxie = Xie, ejnicano = Nicanord, jskalath = Kalathil, juaruiz = Ruiz, mabuck = Buck, jraley = Raley, kemcampb = Campbell, zmsantia = Santiago-Delgado). Report totals; only name names when listing an over-capacity session's roster.
- If the user asks to include attendings in the headcount, add the Attending rows to the counted set and note the convention in the report.
- "Medicare", "Cardiology", "Dermatology" are placeholder/non-FM entries, never people to count.

---
name: reference-new-innovations-duty-hours
description: "New Innovations duty-hour logging — the short-break violation rule, navigation, the agreed logging method, and outstanding cleanup items"
metadata: 
  node_type: memory
  type: reference
  originSessionId: 3279ab4b-8b61-44f8-bf24-819a66a6a254
  modified: 2026-08-19T23:59:48.038Z
---

**New Innovations** — where UTMB residents log duty hours (separate from QGenda). Navigation: main menu > **Work Hours** > Log Hours / View Hours / Violations / Sign Off Hours. Login persists via his Chrome session. "View Hours" supports bulk edits: checkboxes + "Edit in Bulk" + per-row Action dropdown (e.g. Delete).

**Short-break violation rule** (per Program Coordinator Alec Hughes's email "July Duty Hour Violations | Corrections Needed", Aug 7 & 13, 2026, in Navid's Gmail): gaps between logged time blocks on the same day (e.g. 8–12 and 1–5) trigger a violation flag. Log consecutive blocks with **no gaps** (8–12 and 12–5).

Logging method used Aug 19, 2026 (not objected to; derived from the coordinator's email):
1. View Hours → find last logged date / gaps.
2. Pull the actual worked schedule for the unlogged range from QGenda (see [[reference-qgenda]]).
3. Log each worked day as contiguous blocks, no same-day gaps.
4. **Skip PTO/OOO/no-work days entirely** and leave the current in-progress day unlogged.
5. Verify entered date/time values against QGenda before saving; check the Violations page afterward.

Past incident (resolved Aug 19, 2026): two erroneous entries were created on Aug 18 — a PTO day with no work — and had to be deleted. Navid confirmed the cleanup is done. The lesson stands: never log hours on an absence day, and verify values before saving.

**Entry mechanics that work (Aug 19, 2026):** Claude-in-Chrome cannot reliably click/drag the Log Hours grid. Use the **windows-automation MCP** instead — `Move` with `from_loc` + `drag=true` performs an atomic drag on the graphical grid and lands accurately. The **Preferences** link on Log Hours opens a dialog with drag granularity (60/30/15 min — leave at 60 Min so drags snap to whole hours) and a month calendar that jumps straight to a given week, which beats clicking the week arrows. Draw the block, confirm the day's Hrs total, then Save; verify exact start/end afterward in View Hours.

**Work-type convention:** NBN/rotation days → `Rotation Hours/Shift (Regular Shift)`; DC Clinic AM on Thursdays → `Clinic`. Didactics blocks auto-populate from the Conferences module (Source = `Conf`) — do not log those by hand.

See [[user-medical-resident-utmb]]. A `duty-hours` skill exists with the operational workflow.

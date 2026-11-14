---
name: duty-hours
description: Log Navid's resident duty hours in New Innovations by cross-referencing his QGenda schedule, following UTMB's no-gap rule to avoid short-break violations. Use when the user mentions duty hours, logging hours, New Innovations, work-hour violations, or asks to "log any hours I haven't logged".
---

# Duty-hour logging (New Innovations)

UTMB residents log duty hours in **New Innovations** (separate system from QGenda). Login persists via his Chrome session — open it in Claude-in-Chrome.

## The rule that matters
**Short-break violations** (per Program Coordinator Alec Hughes's email "July Duty Hour Violations | Corrections Needed"): gaps between logged blocks on the same day trigger a violation flag. Log contiguous blocks — `8–12 and 12–5`, never `8–12 and 1–5`.

## Navigation
Main menu > **Work Hours** > Log Hours / View Hours / Violations / Sign Off Hours. Bulk edits: View Hours → checkboxes → "Edit in Bulk" → per-row Action dropdown (e.g. Delete).

## Workflow
1. **View Hours** — find the last logged date and any unlogged gaps in the target range.
2. Pull his actual worked schedule for that range from QGenda (see the `qgenda` skill; staff = namoazin) or his Google Calendar (QGenda-synced).
3. For each worked day, log hours matching the schedule as **contiguous same-day blocks with no gaps**.
4. **Skip PTO/OOO/no-work days entirely** — never log hours on an absence day. Leave the current in-progress day unlogged.
5. Verify every entered date/time against the schedule BEFORE saving — cleanup passes are worse than slow entry.
6. Check the **Violations** page afterward and report anything flagged.

## Speed
Use `read_page`/`find`/`form_input` over screenshot-click loops. A previous run of this errand took ~40 minutes and drew an explicit complaint.

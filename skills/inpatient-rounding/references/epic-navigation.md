# Epic navigation: observed shortcuts, not fixed coordinates

These lessons were observed during the 2026-11-09 and 2026-11-10 runs. Inspect the live layout
and patient header before input; tabs, scaling, previews and focus change.

- Use one active desktop controller. Read its current tool/skill instructions.
  A cropped initial Citrix view occurred with both controllers in the morning
  run; maximizing the Citrix window via its title bar recovered full context.
  Inspect window placement before attributing cropping to a controller. The
  earlier Windows Control/Windows MCP observation was not a reliability test.
- Use native desktop control for Citrix Epic. Browser tools are useful for
  public references, not a substitute for the live Epic session. Respect the
  user's real-Chrome preference and close tabs opened for reference lookups.
- **Chart Review > Notes** supports bulk row selection and **Review Selected**.
  Verify both endpoints and the resulting report before Copy All. Shift+Down
  extends a known range; Shift+PageDown may select a whole visible page, so check
  the dates. Include relevant nursing, therapy and CM entries, not just doctors.
- Preview can reshape the list after a click. Reobserve before selecting another
  row; a coordinate valid before preview may now hit a report toolbar.
- Use the actual **Copy All** control or report context menu. The adjacent
  PasteBoard control is a different function. Expand the note's collapsed
  sections when they hide the assessment/plan.
- Citrix clipboard transfer can take roughly 10-20 seconds for a large report.
  Wait for fresh, nonempty, patient-matching text; stale text and transient
  OpenClipboard/access-denied errors were observed. Retry the read after a short
  wait before recopying. Do not switch to another copy during an active transfer.
- Active-order text selection can be extended to the actual bottom using
  Ctrl+Shift+End after establishing a text selection. Verify the final rows.
  Context-menu **Copy** worked when Ctrl+C left stale clipboard data. Avoid
  Modify/Discontinue and other clinical action controls.
  Also inspect the first copied row: reaching the bottom does not prove the
  beginning was captured. A selection can start partway through an order.
  Re-read that row in the current order view for missing name/dose/route/details;
  preserve a capture gap if it remains clipped. An older note is a comparator,
  not proof of the missing current order fields.
- Read each tool result once. Store captured text in the current session and
  return bounded relevant excerpts for analysis; do not emit duplicate full
  `content` and `structuredContent` copies. No cleaner or raw-export step is needed.
- **Chart Review > Labs/Radiology/Cardiovascular/Procedures** exposes actual
  pending/final status and case-request details. A case request can say Completed
  while its requested surgery date is still future.
- For a specific lab, **Labs > Filters > Order > Order contains...** narrowed
  the list successfully in the morning run. Read the actual report/status, then
  clear the temporary filter; do not save it. Sorting only loaded rows can miss
  older tests: heed the incomplete-load warning. Distinguish needs collection,
  collected/in process, preliminary, final and older future/outpatient orders.
- For a newly assigned patient with prior care, establish the current encounter
  first, then use the Notes date range/type to retrieve the older discharge or
  relevant specialist note that answers the open question. Expand further only
  if that source leaves a consequential gap. Keep prior imaging, drug levels and
  medication plans dated; an incomplete admission draft can repeat old results.
- The right **Summary** report search can find **Vitals**: enter the report
  name, submit, then select the matching report. This provided a dated vital
  table without editing flowsheets. Saturation alone does not identify O2 flow.
- **MAR** distinguishes actual administrations from orders. Collapsing display
  details can make doses/times easier to read; never click administration cells.
- If the user switches focus to chat, reacquire Epic and verify context before
  further input. Known taskbar windows can restore focus when name-based window
  switching fails; use a fresh screenshot, not memorized screen coordinates.
- Closing patient tabs can reflow the top toolbar, and a newly opened chart or
  Manage Orders can load its panels after the first screenshot. Reobserve these
  boundaries before the next toolbar click or typing into the Summary search.
  A misplaced toolbar click opened UpToDate and a Citrix media-permission dialog
  during this run. If navigation opens an unexpected window, stop the click
  sequence and reacquire context. Follow the active controller's permission-dialog
  rules; research navigation does not require granting microphone/webcam access.

## Optional Summary report shortcuts

User-provided on 2026-11-11; controls were shown in screenshots, but whole-review
coverage and a speed improvement have not been validated. These are suggestions,
not a limit on comprehensive review or a mandatory click sequence.

- **Event Log > Time > 24 Hours**: use the user's existing filter and verify the
  actual displayed start/end dates. Read meaningful events, results, administrations,
  refusals and support changes. Filtered-out rows are not evidence of absence.
- **Event Log > Category**: inspect the Notes group and open the relevant source
  notes; review oxygen device/flow, respiratory support and other consequential
  flowsheet categories. Expand entries when the latest row hides a meaningful trend.
- **Neonatal Report > test**: the configured view is useful for the whole case,
  regardless of the report's name. Work down the relevant vitals, test results,
  I/O and clinical trends; skip repetitive nursing detail that does not change
  interpretation. Widen the bottom timeline by dragging its range handle when
  needed to expose more results, then verify the resulting dates and columns.
  Widening the display does not widen the 24-hour actionable window.
- The separate **Sepsis Report** can be inspected when relevant; no user-specific
  configuration or complete source coverage has been verified for it.
- Use current Active Orders, MAR, source notes, microbiology, imaging or other
  tabs wherever these summaries omit or contradict important data. Event Log
  administrations do not establish the complete current prescribed regimen.

Prefer the shortest path that resolves a clinical question. Batch predictable
navigation within verified stable UI state, and verify meaningful boundaries.
Do not trade identity, source freshness or current-state checks for fewer calls.

---
name: micu-chart-check
description: Capture raw adult MICU chart data from Epic, including verbatim notes and orders plus Neonatal Timeline screenshots, covering the last 24 hours or the full encounter if shorter. Use for MICU raw-data extraction, including case material prepared for OpenEvidence; does not generate clinical notes.
---

# MICU raw chart capture

Deliver the requested patient's source data, not a progress note, assessment/plan, clinical summary, or treatment recommendations. The supplied note scaffold helps identify relevant source fields; it does not change the raw-data output contract. A request to try this skill on a patient means capture that patient's raw data.

## Capture window

1. Confirm the requested patient and encounter. Record a review anchor with date, time and timezone in a separate capture-status file.
2. Capture the **24 hours ending at that anchor**. If this encounter began less than 24 hours ago, capture **the entire encounter so far, including ED data**, rather than only time in the MICU.
3. Fit the required interval across the Neonatal Timeline's available width, earliest required data at the left and latest at the right. For a new admission, remove blank pre-encounter time by moving the left range handle. Do not zoom away any required data or change the interval merely for a cleaner screenshot.
4. The screen may label a one-day preset approximately 22-23 hours. That is a display limit, not a replacement for the last-24-hour scope. Capture the omitted leading portion in an overlapping view when needed. Verify actual date/time endpoints after zooming, panning, resizing or opening sidebars.
5. Preserve current order state and pending-result status as of review. Include admission or older reference sources when requested or needed to establish the case; label their date/coverage separately rather than representing them as last-24-hour events.

## Capture route

Read [Epic navigation](references/epic-navigation.md) before operating Epic. Use verified keyboard routes with a visual check at meaningful transitions; the Citrix accessibility tree alone does not expose the chart contents. Do not blindly replay coordinates or key counts across changed layouts.

- **Chart Review > Notes:** capture the relevant source notes unchanged. Check specialty/type/date filters, selected rows and opened report. For a new admission, include the ED and admission notes. Verify first/last note headers and that the saved text contains the intended range.
- **Summary > Neonatal Report > Timeline > test:** primary visual source for objective trends, infusion rates, changes and duration. Take readable screenshots, scrolling through relevant sections with overlap so rows are not lost. Include date/time axis, row labels, units and visible values. Use Vitals, relevant labs, Ventilation, Medications, Hematology, I/O, Blood Gases and relevant Observations. The report continues well below its initial screen. The navigation reference identifies useful and low-priority sections.
- **Intake/Output:** capture detailed components, totals and their exact period. Keep completed and ongoing shift/day boundaries visible. An uncharted component is not zero; a displayed partial total is not a complete 24-hour balance.
- **Manage Orders > Active:** capture current order text and statuses unchanged, verifying actual first/last entries. Preserve discontinued, completed or expired labels if the view includes them. Orders do not establish administration.
- **Results Review, Micro Summary and original imaging/procedure reports:** capture source details missing from the Timeline, including specimen and collection/result times, preliminary/final/pending status, respiratory settings and relevant reports. Use MAR or individual administration details only when needed to resolve content not shown in the Timeline.

Choose the shortest route that completes the requested source coverage; no requirement to open every Epic tab. Skip irrelevant empty pediatric fields and redundant visual sections when selecting screenshots, but never trim or rewrite an already copied source block. Do not treat a few screenshots as proof of full chart capture.

## Raw output contract

- Preserve clipboard text exactly: no paraphrasing, cleanup, encoding repair, boilerplate removal, deduplication, unit conversion, inferred values or inserted analysis. Keep source blocks/files in their captured order. If combining files, put source labels outside the unchanged blocks.
- Screenshots are raw visual evidence and are acceptable for the Neonatal report. Do not require text extraction from its graph. Preserve the captured image; do not redraw, annotate or replace it with a summarized table.
- If the user also requires plain text from screenshot-only data, put a faithful transcription in a separate, clearly labeled file. Preserve displayed labels, times, units and values; mark unreadable content in the separate status record. Never call visual transcription a verbatim clipboard export.
- Keep charted settings, ordered settings and documented administrations as separate source facts. Gray medication bars show order duration, not proof of administration. Preserve contradictions; do not reconcile them by editing raw text. Distinguish arterial/venous gas labels and airway pressure from blood-pressure MAP.
- Deliver source files/images and a short **separate capture-status record** listing anchor, required interval, actual captured ranges, sources and any missing/truncated/unreadable sections. Do not add a clinical note or assessment. Do not claim completion until the required interval and requested sources are covered.
- Store all case text, screenshots and case-specific status outside Git and reusable memory, in a private local output directory unless the user specifies another destination. Never use patient content as skill examples or test fixtures.

## Boundaries

Chart capture is read-only. Do not create preview notes, invoke note speed buttons, pend/sign, place orders or alter care. Personal layout/phrase/order-set configuration is separate work requiring the user's setup request; it is not part of a patient capture run. In particular, **Alt+1 can open the CC note speed button and is not a safe global shortcut**.

Preparing material for OpenEvidence does not submit it. If the user separately requests submission, read the current sibling openevidence-handling skill and follow its visible Chrome workflow. Never send patient data in external search queries. Stop for an expired Epic/Duo session; the user handles login.

See [sources and validation status](references/sources-and-status.md) for provenance and remaining limits. The original inpatient-chart-check skill's bookmarked-note date rule and Hosp-chat submission are separate workflows and are not inherited here.

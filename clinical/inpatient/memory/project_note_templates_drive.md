---
name: note-templates-drive-folder
description: "Google Drive \"Note Templates\" folder (created 10/31/2026) with the A/P standard, reviewer prompt v1 and worked example; labeled-reasoning-lines proposal awaiting Navid's decision"
metadata:
  node_type: memory
  type: project
  originSessionId: 2750a39a-9405-41b8-af35-e91ce3941e55
  modified: 2026-10-31T16:33:46.563Z
---

Drive folder "Note Templates" (My Drive root, created 10/31/2026): https://drive.google.com/drive/folders/1DXMfgZ3oUcGehBJ4kG-266swq7Biq2y0
- A/P Standard - Format and Reasoning (reverse engineered from the reviewer prompt + 10/30 output): https://docs.google.com/document/d/1sdVfMT7BBFgcao10irYQqr8pGhMD6uS4s2aLxg9Suj4/edit
- A/P Reviewer Prompt v1 (source, 10/31), verbatim text: https://docs.google.com/document/d/1gkrWtdd_ODqodM-OnRH4h9CtaY2iqd5H4oCRT8piCHg/edit
- A/P Worked Example (10/30 output, raw markdown, deidentified): https://docs.google.com/document/d/14uFSxc5xCBbrMxQZujiq8oCQ4p2VHMQgztMGFCh7S6U/edit
- An older folder "Epic Note Template Versions" (7/2026) also sits at My Drive root: https://drive.google.com/drive/folders/1khARJ5ERAJR2KIioYWE8oHGG76yXrYcK

Status 10/31/2026: Navid said the reviewer prompt's A/P format is "perfect" except the italic reasoning paragraph, which runs six kinds of statement together. Standard doc section 9 proposes six labeled italic lines (Dx / Ddx / Status / Tx / Backup / Goal) with exact prompt edits; not yet approved or applied to the prompt. Section 10 lists 10 prompt-vs-output gaps (opening summary line, MONITORING AND NURSING PARAMETERS section, Code status line, "received" bullets, plain "if" bullets, graded exclusion vocabulary) awaiting his decision.

Paused 10/31/2026 (he stopped for the day): all three docs are created and their content is verified. One cosmetic fix is still open in the Standard doc. Its 6 tables are narrower than the page and their header rows are not bold. A Docs batch to widen the columns to the 468 pt page width and bold the header cells failed. The Docs API refuses `updateTableRowStyle.tableHeader` ("Unallowed field"), so leave that request out. Re-read the doc before resending, because the table indexes may have changed. He has not yet reviewed the docs or answered the section 9/10 questions.

10/31/2026 later: reconciled the A/P with the A/P section of the Qualified Health master (Downloads\Qualified_Health_Inpatient_Master.txt, 10/17), which already used separate italic labeled lines. The result is the doc "A/P Standard v2 - Reconciled with QH Master" (https://docs.google.com/document/d/1FqQ_H6NkfvHyrwla7ry2IPniNzcJXxMivpjq-Vj1bGU/edit). It has 18 decision rows, and it supersedes section 9 of the Standard doc. The six labels are Supported by / Differential / Status / Approach / Backup / Goal. The Standard header stays. Change tracking and TBD follow the mode: *** and TBD in the reviewer prompt; no markers, with gaps listed in the audit, in QH. The care labels follow the Epic template. A full copy of the master with the new section applied is saved as Downloads\Qualified_Health_Inpatient_Master_AP_reconciled.txt; the original is untouched. The reviewer prompt has not been aligned yet. He has not reviewed the decisions.

10/31/2026, in progress: walking through every section from the pre-visit guide to the presentation. Round 1 shows example layouts and he picks one; round 2 is his edits to the pick. Settled so far:
- The AI prints its own data tables; Epic SmartLinks are not used.
- The opening reads "admitted for X after presenting with Y", then "Past medical history notable for:" with dash lines carrying the diagnostic basis, treatment, or what needs to be known.
- Pre-visit guide order, his spec: patient introduction -> summary (HC) -> overnight -> orders now -> dedicated consult section -> patient update -> bedside.
- The consult section covers recs to put in plus a page block for each service: why, the pager message, and the expected questions with answers ready.
- The patient update gives status, today's plan, and what comes next.
- Draft 2 edits (10/31):
  - No contact or pager routes; he finds the person himself.
  - Each consult gets its pager message plus predicted questions with answers ready. A web lookup of what that service usually asks is enough; it does not need to be current or from OpenEvidence.
  - "Recs to put in" appear only when a service note gave recs. Consult blocks appear only when a service note or a documented plan to consult exists.
  - The patient update gives a plain-language reason for each action.
  - Each bedside question gets a follow-up question for when the answer is bad.
  - The exam is a separate section by organ system, naming the specific things to check, with *** blanks.
- He liked B's full-sentence urgent item and D's checkboxes.
- His pick for the note section order never arrived (the widget form didn't send it). Ask him to type it.
- Round 1 used a fictional patient: Rivera, 61F dysphagia case, day 2.

Other live A/P variants on disk (differ in reasoning block, differential count, change marking): shared skill Documents\codex-shared-workspace\.agents\skills\inpatient-rounding\references\02_ap.md (R29, 5-part paragraph + Course line, proposals after blank line); Downloads\DOTFLOW_ap.txt; Downloads\openevidence_AP_instructions_updated.md; Documents\hosp-templates (10/30 work: PROGRESS_NOTE_REVIEW.md, BEST_OF_FEATURES.md).

**Why:** He wants one standardized A/P across Doximity, Claude, OpenEvidence and the shared skill; the Drive folder is the home for note templates going forward ("first up is the A/P").

**How to apply:** For A/P work, read the Standard doc first and follow its conventions (escaped bullets, two trailing spaces, reasons in parentheses, \*\*\* change marks in reviewer mode). Put new note templates in this Drive folder, not local copies. If he approves the labeled lines, apply section 9e's six edits to the prompt doc in place (same link) and update 02_ap.md only if he says so (shared with Codex; leave a sticky note).

Related: [[project_ed_rotation]], [[reference_inpatient_chart_check_epic]], [[feedback_build_exactly_as_specified]]

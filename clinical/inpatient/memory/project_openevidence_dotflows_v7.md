---
name: openevidence-dotflows-v7
description: "Three OpenEvidence dot flows (.p1, .note, .ap) built 10/31/2026 from the inpatient-rounding skill v7, each under 10,000 chars, in Downloads\\dotflows-v7"
metadata:
  node_type: memory
  type: project
  originSessionId: 21110cdd-2c79-4a3f-b0c5-01b87d2ff46c
  modified: 2026-11-01T23:35:35.442Z
---

Built 10/31/2026 at Navid's request: the inpatient-rounding skill (v7, C:\Users\nav\.claude\skills\inpatient-rounding, references R1-R8) condensed into three OpenEvidence dot flows that run in phases and are meant to give the same output as the skill:
- C:\Users\nav\Downloads\dotflows-v7\DOTFLOW_v7_p1.txt (pre-visit guide: INTERVAL EVENTS, TASKS, CONSULT CALLS, PATIENT UPDATE, QUESTIONS, EXAM), 9,943 chars
- C:\Users\nav\Downloads\dotflows-v7\DOTFLOW_v7_note.txt (note body, REASON FOR ADMISSION through STUDIES, no A/P), 9,869 chars
- C:\Users\nav\Downloads\dotflows-v7\DOTFLOW_v7_ap.txt (A/P: problems, chronic, resolved, prophylaxis, barriers, appendices A-D, SUGGESTIONS), 9,954 chars
Each file = mode body + an identical CORE RULES block at the end (same convention as the older 10/28 Downloads\DOTFLOW_*.txt set, which predates v7 and still uses *** / TBD / SUGGESTED CHANGES).

Build pipeline in Downloads\dotflows-v7\build: CORE_RULES.txt + IE_BLOCK.txt (INTERVAL EVENTS spec, spliced into p1 and note at the {IE} marker) + BODY_*.txt, assembled by `python -I assemble.py .` which prints exact character counts. Edit the parts, not the assembled files. The Bash tool here cannot take heredocs containing apostrophes; use the Write tool or a script file.

Deliberate cuts vs the skill to fit 10k: no worked example beyond a few lines, no MME factor table (flow says use a current conversion reference), shorter qualifies/tracking lists, priority-trigger list only in .p1 TASKS, no R6 handoff / pres / utd / audit flows (not requested).

**Why:** He uses OpenEvidence with per-flow 10,000-character prompt limits and wants the phased workflow (p1 -> note -> ap) to match the Claude skill output.

**How to apply:** If he revises the skill, regenerate from the build parts rather than editing the assembled files, and re-run assemble.py to verify the count. Keep the three flows' CORE RULES identical. Related: [[note-templates-drive-folder]], [[feedback_build_exactly_as_specified]].

**Update 10/31/2026 (later):** Six flows now: .p1, .note, .ap, .ie (standalone full interval events w/ tracking lines + example), .consult (<=240-char page + what the service will ask), .pres (attending new vs familiar). .p1 was rebuilt to the layout of a 10/28-era guide he said he "really likes": PHASE 1 - GUIDE -> SAFETY ANCHOR (TBD allowed here only) -> SUMMARY -> INTERVAL EVENTS (condensed, inline in BODY_p1, not the shared IE block) -> TASKS (NOW: prefix, pre-rounding only, follow-up on every PLAN/SUGGESTIONS item from the latest FM note, no "continue X") -> PATIENT UPDATE -> QUESTIONS (literal bedside questions, "Reason - question / if yes: follow-up") -> RED FLAGS (trigger -> action + who) -> EXAM (exact maneuvers). CONSULT CALLS dropped from .p1 (call script in .consult); he insisted IE stay in p1 and PATIENT UPDATE follow TASKS. Time window (10/31 late): deliberately vague per his request: CORE RULES tell the model to judge the window itself from timestamps, never ask, "new = what I have not dealt with yet, usually after my latest FM note, roughly the last day, unsure -> include w/ date", and print a "Window: ..." line at top. No Anchor line anymore.

**Update 11/1/2026:** .p1 TASKS rewritten to his "patient care only" rule (see [[feedback_previsit_patient_care_only]]): connect the dots, catch what is brewing, catch what did not happen (refused/missed important meds, planned items not done, note plan vs orders/MAR mismatch); no admin; printed under **Before bedside** / **At bedside**. Now 9,961 chars. Pre-change copies: build\BODY_p1_prev_1031.txt and build\DOTFLOW_v7_p1_prev_1031.txt.

**Doximity set 11/1/2026:** he asked for the skill files for Doximity. `python -I build\build_doximity.py` regenerates C:\Users\nav\Downloads\doximity-v7 from the live skill, in his old Doximity layout:
- MASTER_INSTRUCTIONS.txt goes in the Instructions box, which has a hard 20,000 maxLength. It is R1 plus the two SKILL.md hard rules, 14,734 chars.
- Attachments: 00_shared.md (R2 plus SKILL input, conflict rules, utd, boundaries), 01_previsit.md, 02_ap.md, 03_note.md, 04_followups.md, EXAMPLE_FULL_NOTE.md.
- DOX_BASELINE.txt (R8) goes in the baseline field.
- R-numbers are rewritten to file names.
- Re-run the build after any skill edit.

**v8 set 11/2/2026:** rebuilt all six flows to skill v8 in C:\Users\nav\Downloads\dotflows-v8 (build\ parts + `python -I assemble.py .`; v7 folder untouched). Changes: 24h hard rule + "Anchor:" top line (replaces the vague "Window:" line), .p1 = v8 R3 order (SUMMARY, IE, CHECK IN CHART, ORDER NOW, LIKELY ORDERS, PATIENT UPDATE, QUESTIONS max 6 branching, RED FLAGS ICU-only, EXAM up to 5; no SAFETY ANCHOR), IE = v8 gate/cap 5/MAR+PRNs always/specialty lines, .ap italic paragraph = argument ("less likely/not established"), pending routine vs non-routine, <u> changes, every med w/ reason; .note I/O/FLUIDS never blank; .pres = decision-16 skeleton; .consult page/call = R1 v8. Sizes: p1 9,988, note 9,995, ap 9,994, ie 6,922, consult 7,045, pres 6,071. Drive: Inpatient Rounding v8 folder > "OpenEvidence Dot Flows v8 (11-02-2026)" https://drive.google.com/drive/folders/14HxnuAj8rsVUNEou9Q08QUtM9UcCtgBO (plain .txt, sizes verified equal).

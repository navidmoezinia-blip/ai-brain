---
name: project-inpatient-rounding-v8
description: "inpatient-rounding skill v8 installed 11/1/2026 from Qualified Health + Doximity feedback; platform builds (Doximity, QH, ChatGPT for Clinicians) in Drive"
metadata:
  node_type: memory
  type: project
  originSessionId: e13f9e01-2f00-4f5b-9a42-20f7086a03b6
  modified: 2026-11-02T04:00:03.023Z
---

v8 installed 11/1/2026 at C:\Users\nav\.claude\skills\inpatient-rounding (v7 backup: Downloads\qh-chats\v7-backup-live). Decisions 1-17 in Downloads\qh-chats\REWORK_DECISIONS.md, plus: every available med (PRNs too) sits in the A/P w/ a reason unless obvious, mechanistic preferred.

Platform builds: Downloads\rounding-v8-platforms (rebuild with scratchpad build_platforms.py logic: Doximity = MASTER_INSTRUCTIONS + 00-04 files, each under the 20k cap; QH = one plain-text master, instructions field uncapped; ChatGPT for Clinicians = skill zip + single-file md).
Drive: Note Templates / "Inpatient Rounding v8 (11-01-2026)" https://drive.google.com/drive/folders/14iQ__FTFjB9eAX-AQHxUvqrcnb5tt7J2

Not yet done: Codex shared copy and claude.ai-installed copy still v7; `<u>` underline rendering untested in QH/Doximity. Drive upload trick: inject a file input in the Drive page and dispatch a synthetic drop at elementFromPoint(center); Drive has no native input to target.

Related: [[project_note_templates_drive]], [[feedback_build_exactly_as_specified]]

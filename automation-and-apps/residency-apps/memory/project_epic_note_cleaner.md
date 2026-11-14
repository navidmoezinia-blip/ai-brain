---
name: project-epic-note-cleaner
description: Epic Note Cleaner HTML tool (strips repeated Epic boilerplate from pasted chart notes); canonical path, copies, default mode, his correction on aggressiveness
metadata:
  type: project
---

Epic Note Cleaner is a single-file HTML tool he pastes chart notes into. Canonical copy: C:\Users\nav\Documents\Projects\epic-note-cleaner\index.html (pushed to GitHub, 60 tests as of 11/5/2026). Copies kept in sync at Downloads\"Epic Note Cleaner (2).html" and Desktop\hospital\Epic Note Cleaner.html.

**Why:** On 11/5/2026 my first version extracted assessment/plan only and cut 1064 lines to 385. He said "You don't have to be that aggressive": the goal is removing the Epic chrome that repeats in every note (headers, share-with-patient lines, empty exam/vitals/lab tables), with note formats varying between authors. Tables of exam vitals and labs are exactly what should go.

**How to apply:** Default mode = per-note headers kept, universal boilerplate stripped, clinical text otherwise intact. A/P extraction is an opt-in checkbox, and full-text mode stays byte-identical. Edit the canonical copy, then copy to the other two locations. Ask him for another sample note before tuning rules, since he feeds examples. See [[feedback_build_exactly_as_specified]].

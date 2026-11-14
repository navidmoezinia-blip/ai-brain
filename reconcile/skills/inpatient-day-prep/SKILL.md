---
name: inpatient-day-prep
description: "Compatibility name for the merged inpatient-rounding workflow. Use when the user invokes inpatient-day-prep or asks to resume a prior evening-to-morning checkpoint."
---

# Inpatient Day Prep - merged into Inpatient Rounding

Read and follow [the canonical inpatient-rounding skill](../inpatient-rounding/SKILL.md).
It now owns read-only Epic review, evening/morning continuation, navigation
learning, bedside preparation, clinical drafts and delivery. Treat an invocation
of this older name as a review/prep request unless the user asks for another output.
Do not run a second workflow or collect the same sources again.

For testing before possible EMR LLM integration with simulated, deidentified
patients, use the canonical [simulation-testing route](../inpatient-rounding/references/simulation-testing.md).
It owns preliminary subjective blanks, unconfirmed expected exam templates and
requested Claude/Anki handoffs; do not substitute live patients or checkpoints.

Keep existing live checkpoints at `%LOCALAPPDATA%/inpatient-day-prep/latest.json`;
the simulation route uses its own isolated checkpoint.
The canonical references are in `../inpatient-rounding/references/`:
`epic-review.md`, `epic-navigation.md`, `epic-checkpoint.md` and
`workflow-learning.md`. Read them through the main skill's routing instructions.
No live chart access is authorized by skill maintenance alone.

---
name: ed-note
description: Support adult ED encounters with previsit guides, bedside integration, attending presentations, results interpretation, notes/MDM, signouts and discharge instructions from supplied clinical data. Use for explicit adult ED workflow requests or encounter data supplied within an ongoing ED session.
---

# Adult ED encounter support

Read and follow [the canonical adult ED encounter prompt](../../prompts/emergency-department/ED-Encounter-Prompt.md)
before responding. It owns the stage routing, clinical boundaries, output
layouts and evidence rules. This skill is a portable entrypoint to that
prepared prompt; maintain the clinical engine in its owning file.

- Data-only messages receive exactly `Ok.`. Produce a stage output only for an
  explicit instruction or a starter prompt carrying an instruction, as the
  canonical prompt specifies. Carry supplied chunks forward within the encounter.
- For a previsit guide, read matching entries in [the launcher library](../../knowledge/emergency-department/ED-Previsit-Launchers.md).
  Apply the canonical prompt's question style and order proposals; the library
  supplies seeds, never facts about the current patient. Its older saved ENGINE
  is preserved reference text and does not override the canonical encounter prompt.
- For Stage 5 NOTE, read [the Epic note field map](../../prompts/emergency-department/UTMB-ED-Note-Template.md)
  for free-text, filtered-history and untouched fields.

Use only supplied clinical facts, preserve source/date and uncertainty, and
keep proposals distinct from actions actually performed. Never write, sign,
pend or order in the EHR. Keep all patient-specific data and session feedback
out of this repository; only deidentified reusable corrections belong in the
owning instructions when saving rules is explicitly requested.

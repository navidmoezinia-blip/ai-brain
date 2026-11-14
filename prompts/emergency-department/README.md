# Adult emergency department documentation

Prepared adult ED encounter instructions, imported on 2026-11-14 from
`ed-hpi-templates/`. [ED-Encounter-Prompt.md](ED-Encounter-Prompt.md) is the
source's stated canonical v3 baseline. Supply deidentified encounter data in
an authorized clinical workspace outside Git, then request the relevant stage.
Data-only messages receive exactly `Ok.` per that baseline.

Use the [previsit launcher library](../../knowledge/emergency-department/ED-Previsit-Launchers.md)
for complaint and host seeds and the [Epic field map](UTMB-ED-Note-Template.md)
for Stage 5 note drafting. The field map contains SmartPhrase placeholders,
not patient records. [The portable ed-note skill](../../skills/ed-note/SKILL.md)
loads these sources without duplicating the engine. No character cap is stated
for the baseline instructions field; this is not the capped Doximity package.

The older local ed-note skill had drifted from its stated canonical prompt:
its automatic responses to chart chunks, fixed `.EDPREP` assumption, spoken
question script and presentation layout differed. The imported skill is a thin
router to the prepared canonical baseline, preserving that baseline's current
routing and formatting rather than copying conflicting instructions.

The import removed only the baseline header's machine-specific generated-package
path and regeneration command, and added relative companion links. The clinical
engine below its separator and the two supporting sources are preserved.
Generated Doximity exports and optional older prompt bundles were excluded.
This is a migration of prepared instructions, not a new clinical evidence review
or an implemented EHR integration. The files do not authorize EHR writes.

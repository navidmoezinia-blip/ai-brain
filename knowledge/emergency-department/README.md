# Emergency department previsit references

[ED-Previsit-Launchers.md](ED-Previsit-Launchers.md) is the existing prepared
complaint and host seed library from `ed-hpi-templates/`, imported on
2026-11-14. It supports [the adult ED encounter prompt](../../prompts/emergency-department/ED-Encounter-Prompt.md)
and [ed-note](../../skills/ed-note/SKILL.md). Read only the matching entries
when preparing a previsit guide; the owning prompt determines the output.
The source includes an older saved ENGINE with different formatting and
`.EDPREP` assumptions. Keep it as source context, not a competing engine; use
the complaint and host seeds under the current encounter prompt.

This library was migrated as a reusable reference and was not newly
evidence-reviewed. Its illustrative clinical phrases are not patient records,
case facts, or proof that a test, treatment or clinical action occurred.
Keep patient-specific inputs and outputs outside this repository.

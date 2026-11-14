# Family medicine clinic prompts

Prepared outpatient documentation system, imported on 2026-11-14 from
`codex-shared-workspace/prompts/` and `codex-shared-workspace/templates/`.
Source version: 2026-11-04. Only reciprocal file links changed in the two
operational files; clinical rules and the resident's layouts are preserved.

Use [the base instructions](fm-continuity-clinic-assistant.md) together with
[the templates and reference](fm-continuity-clinic-templates.md). Supply
case data only in the authorized clinical workspace, outside this repository.
The base routes previsit chart data, visit transcripts, and explicit note or
action requests; the companion supplies the exact five mode layouts and TCM
fields. These are the complete two-file system, with no third instruction file.

The base has a hard 20,000-character limit including newlines. Count both LF
and CRLF representations after edits. The companion has no character limit.
Current clinical or billing recommendations still require the primary-source
verification specified by the prompts; this import did not re-review evidence.

[The deidentified previsit worksheet](family-medicine-deidentified-previsit-brief.md)
is a separate optional blank worksheet. It accepts local labels such as
Patient A and must never be filled with patient identifiers in Git.

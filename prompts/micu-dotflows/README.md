# MICU OpenEvidence DotFlows

Eight independent flows for the resident's MICU workflow. The MICU H&P and
progress-note templates own note structure; the current inpatient-rounding skill
supplies source reconciliation, bedside preparation, clinical reasoning and
follow-through. These are prompt sources, not a chart integration.

| Flow | When to use it | Output |
| --- | --- | --- |
| `.micuprep` | Before arrival, with chart data | Chart-derived summary, changes, verification, rounds decisions, later bedside questions/exam |
| `.micuupdate` | New results, bedside findings, rounds decisions, action updates | Incorporates facts; receipt by default, delta/refresh only on request |
| `.micunote` | Daily brief progress note | MICU manual fields; also supports A/P-only and events-only |
| `.micuhp` | Initial encounter/admission/transfer | Chart-based preparation, then supplied bedside findings into exact H&P slots |
| `.micucheck` | A consequential treatment/diagnostic question or plan audit | Evidence/medication review, current plan vs proposed changes |
| `.micupres` | Spoken rounds | Brief presentation with support, active decisions and ICU barrier |
| `.micuhandoff` | Coverage or end of day | Completed work, assigned actions, pending decisions, adopted contingencies |
| `.micuconsult` | Preparing a consultant question | Short page draft, call script and decision-relevant questions |

Typical day: chart data + `.micuprep`; bedside/rounds updates + `.micuupdate`;
`.micunote`; `.micupres`; `.micuhandoff`. For an admission, `.micuhp` can first
prepare the encounter, then fill the template from supplied findings. Use
`.micucheck` and `.micuconsult` when a specific need arises. Do not run all eight
automatically. Different patient conversations remain separate. A new flow can
use the current conversation's facts; it cannot access another chat by name.

Resident voice uses Caveman's lossless compression principle and selected de-AI
editing rules: fewer stock phrases, direct shorthand, preserved clinical
qualifiers. It never fabricates human actions or asserts human authorship.
Clinical uncertainty is retained. Neither grammar destruction nor arbitrary
word caps are part of the style.

## Packaging and status

`shared-rules.txt` is appended to each file in `modes/`. Every exported
`DOTFLOW_*.txt` is self-contained. Do not paste only a mode source. `build.py`
creates eight text exports, a SHA-256/character manifest and ZIP in an explicitly
chosen directory outside Git. The 10,000-character budget comes from the user's
earlier DotFlow package; it is a packaging constraint, not a claim about today's
OpenEvidence product limit.

Read [reconciliation](reconciliation.md) for source precedence, chosen exceptions,
review findings and validation limits. Source files, exports and installation
are distinct: creating this package does not establish that any flow is saved
or successfully run in OpenEvidence. Live status is recorded there.

OpenEvidence access remains the user's PowerShell-only visible Chrome workflow.
No question is submitted by building these files. Deidentify chart material
before submission; output instructions are not a substitute for removing
identifiers from the input. Preserve meaningful clinical intervals and values.
Raw chart captures stay unchanged, outside Git; any deidentified working copy
is a separate artifact. No patient data belongs in these prompt sources.

Canonical references: [MICU playbook](../../templates/micu/micu-hp-and-progress-playbook.md),
[inpatient rounding](../../.agents/skills/inpatient-rounding/SKILL.md),
[OpenEvidence access](../../.agents/skills/openevidence-handling/SKILL.md).

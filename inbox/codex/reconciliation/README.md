# Codex reconciliation candidates

Captured 2026-11-14 for the requested `main` artifact-type layout. These are
review candidates, not an installed or merged skill set. No canonical
`skills/` files, Claude branches, or Gemini branches were replaced.

## Source and dependency

The source is the user's canonical
[codex-shared-workspace](https://github.com/moaziniya-jpg/codex-shared-workspace),
commit `4989cff62f34957c5869a7653c0d2bb0c792b28b`. Every snapshot below preserves its
source text after newline normalization. The SHA-256 column records the raw
source bytes at capture; [source-inventory.json](../source-inventory.json) also
records imported LF file checksums. There were no machine-path or
clinical-content adaptations in these snapshots.
Windows-specific locations already use `%USERPROFILE%` or `%LOCALAPPDATA%`;
the recorded screen coordinates are historical hints, not current click targets.

[Claude PR #1](https://github.com/navidmoezinia-blip/ai-brain/pull/1), inspected
at `6829d52cc3012ede83613fe6576581774b4d7dfd`, proposes the matching artifact-type `skills/` paths. These
candidates depend on its unmerged rounding entrypoint and unchanged references.
When reviewing that PR and this import, reconcile the files below deliberately
into the future canonical paths rather than creating a second installed copy.
Relative links inside these source snapshots describe that future assembled
skill; missing sibling files in this candidate folder are intentional.

## Current rounding refinements

Only nine materially different reference files are retained. The current source
is R1 rev 9; PR #1 carries rev 8. The delta covers omission/empty-section rules,
TODAY and exam formatting, diagnostic uncertainty, preserving dictated reasoning,
pending-state wording, and bounded workflow-learning updates.

The rounding `SKILL.md` frontmatter quotation difference was omitted. The
unchanged `epic-checkpoint.md`, `epic-navigation.md`, `simulation-testing.md`,
`R7_worked_example.md`, and `agents/openai.yaml` were also omitted (the last two
match after line-ending/trailing-whitespace normalization). Read those through
PR #1 during reconciliation; do not execute this partial directory as a skill.

R1's `COMMANDS` -> `Extras, only when asked` defines the `utd`/`uptodate`/
`cross-check` output: one deidentified, per-problem UpToDate AI prompt, no more
than 10,000 characters, plain text in a code block followed by `Chars: N`.
`=== OUTPUT FORMAT ===` preserves that code-block exception.

## Recorded raw export versus simulated collection

The `inpatient-chart-check` snapshot preserves only the current recorded
Notes -> Active Orders -> verbatim TXT -> separate patient cross-check chat
workflow and its two directly referenced support documents. It prohibits
cleaning or rewriting captured text and any temporary Epic note, and requires
a live authorized request before chart access. It is materially different from
PR #1's simulated multi-tab collection, cleaner, Google Doc, and `.ippull` flow.
Resolve that name collision before making either canonical; do not combine
their steps. No retired collectors, old section helpers, obsolete references,
recording media, patient captures, or generated exports were copied.

## Compatibility router

`inpatient-day-prep` is only a thin compatibility entrypoint plus display
metadata. It depends on the final canonical `inpatient-rounding` skill,
including its simulation reference, navigation, checkpoint, review, and learning
files. Do not install the router independently of that assembled dependency.

## Other pending overlap

[Claude PR #4](https://github.com/navidmoezinia-blip/ai-brain/pull/4), inspected
at `f5c5693e0e59eb46bbe96f5f7a3f1ff5c3c53673`, targets the alternative topic layout. Its
`reconcile/skills/inpatient-chart-check/` already has all 28 current source
files after newline/trailing-whitespace normalization, and its
`reconcile/skills/inpatient-day-prep/` has both router files after that
normalization. This small candidate set makes the current raw-export route
explicit for review against PR #1 without copying PR #4's retired material.
Remove redundant reconciliation copies after the preferred canonical versions
are reviewed and merged.

## Privacy and verification limits

Only reusable instructions, templates, historical navigation evidence, and
aggregate workflow records were selected. No patient records, identifiers,
case-specific exports, charts, screenshots, audio, credentials, tokens, `.env`
files, or caches were imported. Clinical examples are deidentified instructional
patterns or explicitly fictional formatting examples; they are not treatment
recommendations. Placeholder fields in instructions are not populated data.

The source text was reviewed and checked for credential and identifier patterns.
Source hashes and selected-file differences were verified. This import does not
claim live Epic validation, clinical guideline revalidation, completed chart
review, or a completed cross-check handoff.

## Exact source-to-target inventory

All source paths are relative to `codex-shared-workspace`; future canonical
paths are relative to the root of `ai-brain`. Snapshot links are relative to
this README. Promote only after resolving the dependencies and collisions above.

| Candidate snapshot | Exact source | Future canonical path | SHA-256 |
| :--- | :--- | :--- | :--- |
| [inpatient-rounding/references/R1_master_instructions.md](inpatient-rounding/references/R1_master_instructions.md) | `.agents/skills/inpatient-rounding/references/R1_master_instructions.md` | `skills/inpatient-rounding/references/R1_master_instructions.md` | `3cbc34e79a5c63a8a536c609957bb1c1974855794b4ec5e43ffcb3e0a814a909` |
| [inpatient-rounding/references/R2_shared_rules.md](inpatient-rounding/references/R2_shared_rules.md) | `.agents/skills/inpatient-rounding/references/R2_shared_rules.md` | `skills/inpatient-rounding/references/R2_shared_rules.md` | `6be6a7602ebceced4ad61eaa894e670a54da15b39fdcadd385a7de7f03ecf0ed` |
| [inpatient-rounding/references/R3_previsit_guide.md](inpatient-rounding/references/R3_previsit_guide.md) | `.agents/skills/inpatient-rounding/references/R3_previsit_guide.md` | `skills/inpatient-rounding/references/R3_previsit_guide.md` | `9f444daae621226e5ca80dc59f45b8265e14c6729d0a80466d81c8e8f074c900` |
| [inpatient-rounding/references/R4_assessment_plan.md](inpatient-rounding/references/R4_assessment_plan.md) | `.agents/skills/inpatient-rounding/references/R4_assessment_plan.md` | `skills/inpatient-rounding/references/R4_assessment_plan.md` | `9f4b6381a4744430f9428a3a7cef13f56e013f2403250d797e850ebb338d78a7` |
| [inpatient-rounding/references/R5_note_body_presentation.md](inpatient-rounding/references/R5_note_body_presentation.md) | `.agents/skills/inpatient-rounding/references/R5_note_body_presentation.md` | `skills/inpatient-rounding/references/R5_note_body_presentation.md` | `4d79e834b2fef1e774377e1d75666042e712b83cdf5315f2f5da3bd1c96fb5b2` |
| [inpatient-rounding/references/R6_followups_handoff.md](inpatient-rounding/references/R6_followups_handoff.md) | `.agents/skills/inpatient-rounding/references/R6_followups_handoff.md` | `skills/inpatient-rounding/references/R6_followups_handoff.md` | `cb51943fb6d189b4a90e7044555716118adb606b0578a46756baaec03a5b10de` |
| [inpatient-rounding/references/R8_baseline_style.md](inpatient-rounding/references/R8_baseline_style.md) | `.agents/skills/inpatient-rounding/references/R8_baseline_style.md` | `skills/inpatient-rounding/references/R8_baseline_style.md` | `0ad687905419c1c610db1a4d65ca1f74d8d261841532f02c345ad9e5f4304f1e` |
| [inpatient-rounding/references/epic-review.md](inpatient-rounding/references/epic-review.md) | `.agents/skills/inpatient-rounding/references/epic-review.md` | `skills/inpatient-rounding/references/epic-review.md` | `7d014df2078a84fba949502e94daa4649688a4920afa71686ae3c12d68b7e503` |
| [inpatient-rounding/references/workflow-learning.md](inpatient-rounding/references/workflow-learning.md) | `.agents/skills/inpatient-rounding/references/workflow-learning.md` | `skills/inpatient-rounding/references/workflow-learning.md` | `e985f58de25206804f7430c8e9853f33f2917bc84e6cb327905af728d7a45c5b` |
| [inpatient-chart-check/SKILL.md](inpatient-chart-check/SKILL.md) | `.agents/skills/inpatient-chart-check/SKILL.md` | `skills/inpatient-chart-check/SKILL.md` | `2ed2b9ffb52ac4ac9f78d707508e8bc57f9db4d67cb7bbdd560a92bbc3a1fcca` |
| [inpatient-chart-check/references/recording-verification.md](inpatient-chart-check/references/recording-verification.md) | `.agents/skills/inpatient-chart-check/references/recording-verification.md` | `skills/inpatient-chart-check/references/recording-verification.md` | `cdeb58c3ac821a81d3f5abff7809b7f9dd5b599747d6eb9ed01896a0aeca32c7` |
| [inpatient-chart-check/references/screen-hints.md](inpatient-chart-check/references/screen-hints.md) | `.agents/skills/inpatient-chart-check/references/screen-hints.md` | `skills/inpatient-chart-check/references/screen-hints.md` | `eca9d55a9308125538d84494aa78c50fb5dd64bf1a109d9173f140118d7b7d80` |
| [inpatient-day-prep/SKILL.md](inpatient-day-prep/SKILL.md) | `.agents/skills/inpatient-day-prep/SKILL.md` | `skills/inpatient-day-prep/SKILL.md` | `edbe414657a9883e1c974718041c210fab9ac5bf2acbe98051fd6522fb4122b2` |
| [inpatient-day-prep/agents/openai.yaml](inpatient-day-prep/agents/openai.yaml) | `.agents/skills/inpatient-day-prep/agents/openai.yaml` | `skills/inpatient-day-prep/agents/openai.yaml` | `196363c061a51201c1cb20de9eb59b7d2a0a7f7a2c8d944fc05e6bf8f7555c12` |

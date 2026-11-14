# Next-task model recommendations

Use these as practical starting defaults for this workflow, not clinically validated rankings or promised response times. Names refer to GPT-5.6 Sol, Terra, Luna, and GPT-6 Astra. Use the Work UI effort label `Light` (`Low` in the CLI). Recommend only; the clinician selects the model/effort.

Apply the clinician's phase preference first: use Astra for all work through completion of the initial note (or initial chart-ready MDM), including any consult requested before then. Default to Medium unless the clinician specifies another effort. Consider faster models only after that output has been produced or the clinician states the note is already written; a note request alone is not a reason to switch before producing it. Apply this preference afresh to each new patient.

| Task to be performed next | Model / effort |
| --- | --- |
| Previsit guide | Astra Medium |
| Bedside synthesis, attending presentation before the initial note | Astra Medium |
| Initial note / initial chart-ready MDM; other work before its completion | Astra Medium |
| After initial note: MDM updates, disposition reasoning, new-result interpretation/addendum, workup advice, further clinical synthesis | Sol Medium |
| After initial note: pager consult with established assessment and ask | Luna Light |
| After initial note: verbal consult, ordinary consult summary, signout, discharge instructions from an established assessment/plan | Terra Light |
| After initial note: simple wording/section rewrite without new clinical interpretation | Terra Light |
| Unusually complex unresolved synthesis, conflicting evidence, or difficult management tradeoffs | Astra Medium |

After applying the phase preference, choose by reasoning still needed, not output length. If a post-note short consult/signout needs new clinical interpretation or a material conflict resolved, recommend Sol Medium; use Astra Medium for exceptional complexity. Preserve the same factual, source, action-status, and medical-evidence requirements at every setting. Do not recommend Max/Ultra routinely for these time-sensitive outputs.

## Predict and format

- Omit model hints whenever the response includes a note or chart-ready section, including MDM, ED course, pickup notes, and automatic post-note updates. This overrides all predictions below.
- Prefer the clinician's stated next task. Otherwise predict the next substantive deliverable from the stage, skipping intervening data-only pastes. A prediction never changes encounter mode or establishes a clinical action occurred.
- After previsit: expect attending presentation, `Present: Astra Medium`.
- After presentation before the initial note: expect that note, `Note: Astra Medium`, unless a different next task is stated; retain Astra for any task before the note is complete.
- After pager draft: expect a spoken consult, `Call: Astra Medium` before the initial note or `Call: Terra Light` afterward. After a verbal consult, recommend the next stated task, or a note/update when the encounter stage supports it; do not assume the call occurred.
- After completed handoff/discharge outputs, omit the hint unless another task is indicated. If a next task is unclear, omit rather than invent a workflow step or ask a setup question.
- When eligible, emit one short bullet after the whole response. Use a one-word task label plus model and effort: `- Page: Luna Light`, `- Handoff: Terra Light`, or `- Review: Astra Medium`. Keep the text to three or four whitespace-separated words excluding the bullet marker. No explanation, citation, menu, or follow-up question accompanies the hint.
- Honor a supplied model preference or changed workflow sequence. If the clinician says an option is unavailable, use their available choices; do not assume every account exposes every model. Do not independently refresh model guidance during patient outputs just to produce the hint.

Source checked 2026-09-05: [OpenAI model guidance](https://learn.chatgpt.com/docs/models). It describes Luna for clear repeatable tasks, Terra for everyday work, Sol/Astra for deeper work, and lower reasoning effort for speed. The ED-specific mapping above is a workflow recommendation, not an OpenAI clinical endorsement. Recheck model availability/labels when the clinician requests a settings review or reports a changed picker.

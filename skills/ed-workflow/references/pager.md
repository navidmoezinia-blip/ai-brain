# Pager consult message (on request)

Use for `pager consult`, `pager message`, `360-character consult`, or an equivalent explicit request to draft the brief text for a service page. Do not append it routinely to notes, presentations, post-note updates, or ordinary consult summaries. This is a one-off output, not a change to the encounter's mode.

- Produce one single-line bullet in one fenced `text` block, with no heading, character count, or other content inside the block.
- Hard maximum: **360 characters for the entire message**, including the `- ` bullet prefix, spaces, punctuation, and callback number; code fences do not count. Count the final exact text before sending and shorten until it fits. Use ordinary ASCII punctuation and familiar ED abbreviations; do not pad to 360 or truncate a word or number.
- Content order: **chief complaint (age/sex when supplied) → relevant PMH → key presentation/findings → specific consult ask → callback number**. Keep only details that help the service understand urgency and the requested evaluation/intervention. Omit unavailable or irrelevant PMH rather than inventing a negative history. Use supplied urgency, not assumed stability.
- Default callback: **8328120338**. End every pager draft with `Callback 8328120338` unless the clinician supplies an explicit replacement. This is the clinician's interim callback number, not a verified ED-workroom number. Use it consistently until changed.
- Form the ask from the clinician's stated request or a clearly supported clinical purpose; explicit clinician wording overrides inference. Preserve uncertainty, source/timing, and actual order/treatment status while compressing. Do not invent findings, identifiers, consult acceptance, or interventions.
- If over length, remove low-value background and redundant words first. Preserve the decision-changing presentation, ask, and complete callback number. Keep necessary verification outside the message; no routine disclaimer or count after it.
- Draft only. A pager-message request does not itself authorize transmitting a page or establish that the service was contacted.

Layout example (placeholders only):

```text
- [CC, age/sex]; hx [relevant PMH]. [Key presentation/findings]. Request [specific ask]. Callback 8328120338
```

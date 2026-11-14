# Incoming shift-change pickup

Use when the clinician receives an ongoing ED encounter from another clinician. Accept the handoff, current encounter notes, results, orders, and reassessments in any format. Do not require a template or restart a comprehensive previsit interview. An incoming cue plus available patient data requests this guide unless a narrower output or hold is specified. If no patient information is available, ask only for the signout or current ED note. Bare `signout` / `handoff` still means the outgoing format unless context clearly specifies receiving care.

## Pickup guide

Produce one copyable `text` block of short bullets, usually about 150–250 words; use fewer for a simple pickup. Omit empty sections and duplicate facts. For multiple patients, keep a separate labeled block per encounter, using age/sex or a supplied nonidentifying label.

1. **WATCH / PENDING:** the first bullet must identify what still needs watching or doing, when any such item is supplied. Lead with the most urgent supplied deterioration concern, pending result, task, or reassessment. A completed result belongs in CASE SO FAR unless it creates the immediate action leading this section. Put each inherited if-then plan beside its trigger. Identify timing/ownership when supplied. Preserve whether something is ordered, collected, pending, preliminary, final, or merely planned. No invented contingency, deadline, or completed consultation.
2. **CASE SO FAR:** age/sex, reason for visit, working diagnosis and consequential uncertainty; key completed workup, treatment, and reported response. Include only what explains the remaining decisions. Attribute the outgoing assessment and earlier exam when material; last documented condition is not necessarily the condition at takeover.
3. **REASSESS / CLARIFY:** focused bedside questions and exam prompts for interval change, unresolved discriminating findings, treatment response, or readiness criteria. Prioritize what the clinician needs to establish now; do not repeat a completed HPI wholesale. Include critical clarification for the outgoing clinician when needed. Use Epic `***` only for unanswered history/exam prompts. Add a targeted chart lookup only when a missing prior study, comparator, treatment record, or consult note changes the next decision; say what it changes.
4. **DISPO:** inherited intended destination, remaining conditions, and relevant barriers. Distinguish a suggested admission from accepted admission and a proposed discharge from established readiness. If no disposition plan is supplied, state that only when it is a consequential gap; never invent one.

Label inherited plans as such. Additional recommendations or consequential disagreement belong outside the block and follow the core medical-evidence rules. A supplied result's clinical meaning can be synthesized; it must not silently become a new order, an endorsed inherited plan, or an action already taken.

## Reconcile the handoff

- Use only this encounter's attributable information. Distinguish outgoing clinician reports, earlier chart findings, current objective results, and the receiving clinician's own subsequent findings.
- Reconcile stated pending items against supplied newer results/status: an item that has resulted is no longer pending. Keep the remaining decision/reassessment visible. Use event times and explicit corrections, not paste order; flag consequential conflicts or unclear chronology.
- Check the inherited working diagnosis and disposition against the actual supplied evidence. Identify only unresolved alternatives or gaps that could change remaining care. Do not inherit reassurance merely because a handoff says `stable`, `negative workup`, or `ready for discharge`.
- Do not claim a personal interview/exam, chart review, result review, attending discussion, consultant acceptance, or handoff time unless the clinician supplied it. Prompting an action never documents completion.

## Receiving-provider note

In an established pickup context, `note`, `pickup note`, `assumption-of-care note`, or `takeover note` requests a concise chart-ready receiving-provider MDM, not a rewritten initial provider note. Explicit `full ED note` still requests the full note with the same source boundaries; a named section stays that section.

Use one copyable `text` block with this supported sequence:

- Assumption of care, with supplied transfer time only. State completed assumption only when the clinician says it occurred; otherwise describe the receiving-care context without inventing completion.
- Brief inherited presentation/evaluation and the plan or outstanding items at transfer, attributed to the outgoing clinician or prior ED documentation.
- Results, clinician reassessment, treatment response, and consult input after transfer, only as supplied. Do not convert the earlier provider's exam into the receiving clinician's exam or write `on my reassessment` without supplied reassessment.
- Current assessment, including remaining uncertainty.
- Separate `PLAN` section: tests, treatment, and reassessment in the [MDM](mdm.md) action-status/reason format: `- X ordered - brief reason`. Preserve actual status; do not nest actions under diagnoses.
- `DISPO`: disposition rationale and pending conditions. If the case remains pending, end there rather than manufacturing resolution.

Use relevant chronology; omit optional missing fields rather than inventing names, times, or findings. Put consequential documentation gaps outside the chart block. Do not append a separate ED COURSE field to this initial pickup note. Drafting this note activates POST-NOTE for subsequent data-only updates; then use the existing MDM-addendum plus one ED COURSE line, preserving attribution. An explicit output request or hold keeps its usual precedence.

Do not create additional notes, consult drafts, or outgoing signouts in the background. Preserve only the working encounter context under the core rules.

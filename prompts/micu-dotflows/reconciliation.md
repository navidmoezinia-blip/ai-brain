# Reconciliation and validation

## Sources and precedence

Compared the supplied MICU H&P/progress playbook with the canonical
inpatient-rounding SKILL.md and R1-R6/R8, and the local November 2 v8 DotFlows.
The existing six-file v8 Drive folder was confirmed; its old exports were not
overwritten. No claim of byte-for-byte identity between those Drive exports and
the local historical v8 files is needed for this revision.

1. Current user scope: before-arrival prep, updates, brief daily note, initial
   encounter to H&P; other flows are optional.
2. MICU-specific note structure, headings, manual/auto-pull boundaries and footer.
3. Current rounding source, medication, bedside provenance, reasoning and task rules.
4. Resident shorthand and lossless compression; examples never supply clinical facts.

| Topic | Reconciliation |
| --- | --- |
| Before-arrival prep | Chart synthesis now; patient questions and concrete exam targets are later tasks, not findings |
| Bedside/rounds updates | Dedicated intake flow; intentions, reported actions and adopted decisions remain distinct; no unsolicited full redraft |
| H&P vs daily note | Separate flows preserve exact distinct organ labels and footers |
| Hospitalist layout | Do not import numbered problem blocks, TODAY, forced PLAN labels, appendices or hospitalist footer into MICU |
| Missing fields | H&P required fields use `***`, confirmed inactive fields may use N/A; daily note uses blank mandatory fields and omitted optional gaps |
| Temporal scope | Daily action needs current 24h evidence, including current order/MAR state or newly returned result; dated admission/pre-transfer history remains usable in H&P/course |
| Orders vs delivery | Source role and timestamp govern; neither empty auto-pulls nor older narrative establish current infusion status |
| Pending/recommendations | Pending needs supporting evidence; consultant proposal is not adopted/ordered/done; no blanket result-chasing |
| Reasoning | Fresh assessment, calibrated diagnosis, decisive evidence/response; no forced differential or sentence quota |
| Medications | Own each supplied drug; actual PRN use, relevant high-risk monitoring and dose inputs; no default thresholds or fixed ICU MME factors |
| Events | Selective event/action/response; no old standalone Consults/MAR/Insulin/Devices blocks |
| Auto-pulls | Use for reasoning, omit duplicate tables; retain needed MICU manual gas/echo/cath exceptions |
| Suggestions | Separate from chart-ready care; accepted intent still differs from order and completion |
| Handoff | Assigned tasks only; no inferred completion, duplicate done tasks or invented rescue thresholds |
| Brevity | Compress repetition and filler, retain clinical qualifiers and management-changing details; expand for instability |
| De-AI editing | Keep clinical hedges; reject generic skill instructions to remove all hedging, add personality/errors or cite every note sentence |
| OpenEvidence delivery | Conversation output, no Page creation or claims of Epic access; no citation markers, lists or links in returned answers |
| Deidentification | Input must already be deidentified; output avoids identifiers and does not reconstruct missing dates |

## Independent review

Requested reviewers: Antigravity Gemini 4 Carbon High (highest listed Carbon
variant; max effort rejected as incompatible, using high) and Claude Fable 5.2
with max effort. Both received the same patient-free eight-mode draft and user
requirements. Carbon completed a substantive review (601 seconds reported by
its CLI). Claude Fable 5.2 completed at max effort (2,406 seconds reported
by its CLI; successful exit and model identity confirmed). Reviewer comments are treated as advice,
not automatic authority over the user's template or current instructions.

Carbon changes accepted: clear Bundle punctuation, output-flow versus update
routing, safety-critical dictation clarification, no future scheduled anchor,
actual infusion rate/time/trajectory rather than order ranges, no copying exam
findings across slots, unconfirmed ongoing care demoted to dated history,
chart-consult recommendations separated from AI suggestions, team-assigned
handoff actions versus unassigned prep checks, code/escalation limits, and no
fabricated exact character count for a consultant page.

Carbon suggestions rejected or narrowed: do not expand the supplied official
H&P with new mandatory vitals/history sections; known missing-auto-pull history
fits existing HPI/manual exceptions. Do not relax the user's 24h current-state
rule: stale items remain dated/revalidation context, with older history informing
current supported problems. Missing infusion rates never prove a stopped drip.
Do not replace missing ABG data with an absence claim. Do not insert guessed
alternative doses into a clarification. Keep native template rate/checklist
labels with supported N/A rather than redesigning the H&P.

Fable changes accepted from the returned text: explicit item-specific adoption
and modified acceptance; flag a possible patient mismatch before merging; label
late-supplied older findings separately from newly returned results; identify the
working draft and preserve its missing-field convention; keep new source gaps
and proposals outside the revised note; an order does not establish collection,
administration or a pending result; retain all adopted handoff contingencies;
label inferred I-PASS severity as proposed; critical findings can lack a documented
response without being proven untreated; omit undocumented event/action/response
links; and keep VBGs out of the ABG slot. Several other points were already
addressed by the Carbon changes.

Fable suggestions rejected or narrowed: no forced numbering of every question,
exam target or suggestion; no extra mandatory draft-status footer; no quoted
alternative dose guesses; no expanded presentation word quota (the existing
routine target already allows expansion for instability). The output begins
mid-section, so missing numbered findings/shared-block text were not reconstructed
or treated as received. Its hand-estimated overages refer to the earlier draft;
actual rebuilt files are measured below 10,000 characters. The supplied mode
structures and current source rules take precedence over compression ladders.

Both models reviewed the same earlier draft, not the final post-review export.
Their scenario discussions are reasoned walkthroughs, not observed model or
clinical tests. Neither reviewer is represented as having approved the final
version or validated it inside OpenEvidence.

## Validation status

Assembly checks passed: ASCII text, all eight standalone prompts <=10,000
characters, shared-rule inclusion, expected file count, manifest hashes and ZIP
readback. Manual review checked exact H&P checklist/organ headings, daily note
order, missing-field exceptions, task/adoption distinctions and short-note
completeness. Static checks and independent critique are not live clinical
validation. No patient case was sent to either reviewer.

OpenEvidence installation and live execution: not performed. The visible Chrome
window did not gain focus; no DotFlow was saved or clinical question submitted.
The exported files are ready for installation. Fictional-case dry runs inside
OpenEvidence remain unperformed.

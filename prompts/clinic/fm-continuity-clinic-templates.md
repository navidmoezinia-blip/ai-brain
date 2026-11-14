# FM Continuity Clinic Assistant - templates and reference

Version: 2026-11-04. Companion has no character limit.
Required base: [FM Continuity Clinic Assistant - base instructions](fm-continuity-clinic-assistant.md).

Use this companion with the base. It contains every required template and the supporting monitoring, visit-type, and coding guidance. Bracketed directions describe substitutions; do not paste template directions into a clinical artifact. Keep the intentional `***` and `[Current Rx]` placeholders where required. Examples are illustrative, not patient facts or standing orders.

## 1. PREVISIT

<previsit_skeleton>
Return TWO artifacts in one response. Label the first outside its plain-text block as NOTE SCAFFOLD. The second block begins PREVISIT ORDERS / SUGGESTIONS - NOT FOR EPIC. Do not repeat their contents elsewhere.

### Artifact 1 - NOTE SCAFFOLD

Use section 3's complete note structure, including the patient header, one-liner, Chief Complaint, ===== dividers, and section order. Populate chart facts; apply the following previsit field definitions instead of final-encounter prose. No new decisions, starts, stops, or orders enter this artifact.

- **Header/Chief Complaint:** chart identity/date; one-liner with relevant PMH/control/complications; inferred visit type + reason. Missing required identity/date -> ***. For TCM: `Chief Complaint: TCM/post-hospital follow-up - [discharge diagnosis or reason]`.
- **INTERVAL SINCE LAST PCP VISIT:** chart-derived dates, site/service, concise gist, plan changes, key values, prior-plan completion. For TCM include admission/discharge dates, facility/service, hospital reason/course, discharge diagnoses/procedures, pending results, ordered follow-up, home services/DME, discharge-med changes versus pre-admission regimen. Do not imply ordered follow-up was attended.
- **HPI:** one block per expected problem: `[Problem]: ***`, then stacked telegraphic prompts, each ending `: ***`. Include actual use/adherence per relevant med, home readings, discriminating symptoms, barriers, relevant OTC/supplement/substance use; tobacco/EtOH only when chart-relevant. Cluster all related prompts with their problem. These prompts ARE the in-room questions; no separate guide.
- **TCM HPI:** only discharge-linked diagnoses/procedures, post-discharge course/complications, completion barriers, pending-result and ordered-follow-up status, and med-change reconciliation. For each new/stopped/dose-changed or safety-relevant med include `Actually taking/use pattern: ***`, `Access/cost/transport barrier: ***`, `Adverse effects/safety concerns: ***`. Add required contact/visit fields from section 6; prefill only documented facts.
- **MEDICATIONS:** heading `MEDICATIONS - reconciliation pending` unless reconciliation completion is documented. Reproduce the supplied Epic current-outpatient-med list VERBATIM, including sigs and not-taking flags; otherwise retain `[Current Rx]`. Preserve the full list even when TCM narrative is restricted. Allergies from chart; unknown -> ***; never assume NKDA.
- **Vitals:** reproduce supplied rooming block unaltered, including repeats; absent -> `Vitals: ***`. Prior vitals are dated prior data, not today's readings.
- **Focused exam:** labeled *** fields chosen by the problems and visit requirements, not assumed normal findings. Name concrete assessments, e.g. `Back/LE strength, sensation, gait: ***`; `Diabetic foot exam: ***` when indicated. TCM focuses on discharge-relevant systems/complications.
- **LABS:** prefill dated abnormal/actionable values per section 3's table; meaningful NORMAL/STABLE summary; retain `PENDING NEW RESULTS: ***` as a previsit prompt, not a claim a draw/order exists. No recent labs -> one precise statement about the supplied review window, not normal results or automatic panels. TCM includes hospital/discharge abnormalities, pending/recommended follow-up testing, and new/changed-med monitoring relevant to discharge safety.
- **IMAGING:** date/modality and decisive finding; include older relevant studies. Put an unresolved recommended action once on the separate order sheet, not as a new scaffold plan.
- **ASSESSMENT/PLAN:** one block per expected issue passing relevance, including safety-relevant abnormalities. Status may be `status pending`. Chart-only MDM cites values/dates/trends, contributors, and risk; explicitly name the missing room information in a `... pending` sentence. One `Continue [med, supplied sig quoted verbatim], pending reconciliation` per supported current problem-tied therapy. For stopped/not-taking/superseded/duplicated or materially unsafe/unresolved regimens use source status + `Reconciliation: ***`; do not issue a fresh continuation. No new orders or decisions.
- **TCM A/P:** discharge diagnoses/procedures, discharge-med changes, pending tests, ordered follow-up, immediate safety; include section 6's documentation block with *** for required unknowns. No unrelated chronic panels or problem blocks merely because overdue.
- **HEALTH MAINTENANCE:** non-TCM chart-due items as `[item]: ***`; if required status cannot be established, `HEALTH MAINTENANCE: ***`. TCM omits unless discharge-linked/immediately safety-relevant.
- **DEFERRED/FOLLOW-UP/signature:** carry genuine chart-supported deferred work without adopting a new plan; required follow-up and attending fields remain pending. Preserve resident name. Use `Attending discussion: ***` previsit; do not assert pt was already seen/discussed.

Prompt style examples (select only applicable lines; never a stock checklist):

```text
[Problem]: ***
Actual med use/adherence, missed doses: ***
Home readings, timing, symptomatic episodes: ***
Weakness, falls, saddle anesthesia, bowel/bladder change: ***
Sweating, tremor, palpitations, confusion, loss of consciousness: ***
Cost/coverage, transport, caregiver support: ***
```

Chart-only assessment structure:

```text
#[Problem] - [acute|chronic|acute-on-chronic|administrative] - [documented status|status pending]
[Chart datum + date/trend -> supported interpretation/contributors/risk]. [Named symptom course, actual use, home readings, or exam] pending.
- Continue [current med with supplied sig verbatim], pending reconciliation.
```

Use the continuation line only when its criteria above are met. A medication list, copied plan, or scaffold label does not establish completed reconciliation or an adopted visit decision.

### Artifact 2 - PREVISIT ORDERS / SUGGESTIONS

Generate automatically for every PREVISIT. Start with concrete orders, not a long chart-review checklist. No full ACTIONS billing/administrative queue. Use only nonempty groups, in this order; within each, READY before VISIT-DEPENDENT. Repeat neither an order nor its proposal in another group.

```text
PREVISIT ORDERS / SUGGESTIONS - NOT FOR EPIC

LABS
- [ ] READY - [specific lab] - [indication]; [when]; [required known collection parameters] ([source])
- [ ] VISIT-DEPENDENT - [specific candidate lab] - [indication]; [intended timing]; need [decision/missing parameter] ([source])

IMAGING / TESTS
- [ ] [READY|VISIT-DEPENDENT] - [study, body site/laterality, contrast if relevant] - [indication]; [timing]; [dependency if any] ([source])

MEDICATIONS / REFILLS
- [ ] [READY|VISIT-DEPENDENT] - [medication/refill, dose, route, frequency, other needed sig details] - [indication]; [when]; [duration/quantity/refills if supported and needed; exact missing parameter if not] ([source])

REFERRALS
- [ ] [READY|VISIT-DEPENDENT] - [service/orderable] - [reason]; [urgency/timing]; [location/owner if known; exact dependency if any] ([source])

VACCINES / POC
- [ ] [READY|VISIT-DEPENDENT] - [specific vaccine or POC test] - [indication]; [when]; [product/dose/route/series details when required and supported; decision if needed] ([source])

DME / SUPPLIES / SERVICES
- [ ] [READY|VISIT-DEPENDENT] - [item/service and necessary specifications] - [indication]; [when]; [quantity/duration/agency if needed and known; dependency if any] ([source])

OPEN LOOPS / FOLLOW-UP
- [ ] [Complete/schedule/obtain result of existing named order] - [indication]; [when]; [documented owner or owner decision needed] ([dated order/discharge plan])

SUGGESTIONS
#[Problem]
- OFFER: [non-order treatment/counseling option to discuss] - [short why] ([source])
```

An order line must include orderable + indication + timing + necessary known parameters. Generic labels such as "routine labs," "refill meds," or "refer as needed" are insufficient. Retain ordering details even though narrative medication display is simplified. Use supported order names; do not invent a local Epic catalog code. A group or example does not require an item to be added.

READY means sufficiently supported for the resident to pend/place after review: no material unresolved indication, duplicate, safety issue, required parameter, patient preference, exam, or treatment decision. Check available allergy/contraindication, renal-function, interaction, and actual-regimen evidence when relevant. This is a preparation label, not evidence the order exists or permission for the assistant to place it.

VISIT-DEPENDENT names what would change the decision: e.g. actual use, pregnancy possibility when pertinent, pt choice, exam, contrast choice, dose, or attending adoption. Do not populate required unknown parameters from typical dosing. If only the interval/recommendation lacks verification, retain the specific candidate with `[verify interval]`/`[verify recommendation]` and the dependency; do not label READY. Missing data for one item should not obscure other ready items.

Reconcile against current/open/Future orders and recent results before listing. An adequate existing order -> one OPEN LOOPS completion step when still actionable; a pending result -> follow that result rather than repeat the test without indication. If no order-state data were supplied, say what needs checking on the affected line; do not call absence proven. A currently ordered or completed item needs no duplicate queue entry.

For non-TCM, review indicated screening, chronic monitoring, abnormal follow-through, and visit-specific tests. A missing lab window is a finding to investigate, not a blanket panel indication. Suggestions are source-tagged, typically 1-2 per problem, for untreated disease, missing disease-modifying treatment, undertitration, or another meaningful gap. If a proposed medication appears above, omit its duplicate OFFER. Target about 15 total action/suggestion lines; essential safety/discharge work takes precedence over this soft target.

TCM queue includes only discharge-linked gaps: required follow-up of hospital abnormalities/pending results, monitoring for changed discharge meds, supported access/refill needs, unfulfilled discharge referrals/therapy/home-health/DME, and immediate safety. An unrelated overdue lipid panel, routine vaccine, screening, or chronic refill does not qualify without a discharge-safety link. Do not invent all-medication renewal or a standard post-hospital panel.

If no qualifying orders remain, retain the second artifact and write `No new previsit orders identified from supplied data.` Include only meaningful non-order suggestions/open loops, if any.
</previsit_skeleton>

## 2. PRESENTATION

<presentation_skeleton>
Oral staffing aid, not an Epic note. Requires an encounter transcript or meeting summary. Render as one clearly bounded Markdown artifact with ALL-CAPS headers and blank lines. Do not put the whole presentation in a code fence: its tables must render. The following is the layout; substitute case content and remove instructional placeholders.

PRESENTATION

[One-liner: age/sex w/ relevant PMH INCLUDING current tx/interventions per problem, then reason. Example structure: T2DM on metformin/glargine, HTN on lisinopril, s/p CABG - here for F/U.]

SUBJECTIVE

- [One telegraphic thread per line: sx course, adherence/SE, self-tx, function, discriminating +/-.]

OBJECTIVE

VITALS

[One-line synthesis based on supplied values; include meaningful reassuring context.]

| Vital | Today | Prior | Trend |
| --- | --- | --- | --- |
| [Every supplied vital; repeats labeled] | [value, units/date as needed] | [dated prior if provided] | [supported direction] |

LABS

[One-line synthesis of abnormalities/trends and meaningful normal/stable panels.]

| Lab | Latest | Prior | Trend |
| --- | --- | --- | --- |
| [Abnormal/actionable, significant trend, or newly resolved abnormality] | [value (date)] | [value (date)] | [supported direction/resolution] |

EXAM

- [Actual pertinent findings as concise verdicts.]

ASSESSMENT & PLAN

#1 [Problem] - [ONE assessment line: status + case-data synthesis]

- [One discrete action per line, with accurate proposed/decided/completed status.]
- Continue [each unchanged tx actually continued for this addressed problem].
- [Problem-specific F/U if supported.]

#2 [Same structure for each addressed problem]

ASK

- [Optional crisp attending decision or explicitly labeled staffing proposal.]
</presentation_skeleton>

<presentation_constraints>
- Strict S -> O -> A/P. One-liner carries PMH + current therapies/interventions; no subjective history beyond reason. TCM centers the discharge reason, key transitions, actual regimen, post-discharge course, and safety.
- Retain SOAP section labels; omit empty optional subsections/tables. Never fill missing objective data with normals. If critical missing objective information affects staffing, identify it in ASK, not as an invented finding.
- VITALS: every supplied rooming vital, including normal values and all repeat readings; include supplied pain score/BMI/other rooming measurements. Do not replace the full table with only abnormal BP. If no priors, use exactly Vital | Today. If priors exist, use all four columns and leave genuinely unavailable individual cells blank.
- LABS: separate synthesis and four-column table. Normal/stable panels belong in synthesis, not routine normal rows. A newly resolved tracked abnormality earns a table row; old irrelevant resolved background does not. Date each value. If only normal/stable results are supplied, synthesis suffices and empty table is omitted.
- Do not merge vitals/labs or turn either into an unlabeled prose dump. Max 5 columns. Render tables normally; the Epic global-width padding rule is for PREVISIT/NOTE, not this artifact.
- Each problem gets exactly one assessment line, then each medication change, test, referral, essential counseling, and continuation on its own line. Known unchanged therapy actually continued is explicit, not silently omitted. Do not infer continuation or a new decision from a med list alone.
- Orders reflect current encounter status. A vaccine order can be called ordered, not given. Transcript action-items remain proposals unless corroborated. Useful unadopted next steps go in ASK as proposals; no decided future plan invented from silence.
- Omit incidental findings and specialist-owned issues without today's PCP decision. Hx/exam still passes relevance. Do not shrink away important reassuring context or changed risk.
</presentation_constraints>

## 3. NOTE

<note_skeleton>
Explicit request only; require encounter transcript/meeting summary. Deliver one plain-text block, with nothing non-chart-safe inside and no unsolicited appended review. Use the following structure. `======================================` separates major sections; omit an empty optional section and its extra divider. Section 1 defines how this same structure becomes a pending previsit scaffold.

```text
Patient: [name] | [age/sex] | [date]

[One-liner: age/sex w/ relevant PMH, control/complications and surgical hx when they change today's stakes.]

Chief Complaint: [reason, telegraphic]

======================================
SUBJECTIVE

INTERVAL SINCE LAST PCP VISIT
- M/DD(-DD)/YYYY Site or Specialty: [gist + key data + prior-plan completion].

======================================
HPI: [Reason-for-visit thread first.]

[Problem]: [One labeled paragraph for each other problem discussed.]

Medication use: [Actual use, not-taking reasons, quantified partial use and barriers when relevant.]

======================================
MEDICATIONS - [reconciled|reconciliation pending]

[Current Rx]

TCM MEDICATION RECONCILIATION
[TCM only: pre-admission vs discharge vs actual use; relevant changes/discrepancies and reconciliation status.]

Allergies: [agent - reaction | documented NKDA | ***]

======================================
OBJECTIVE

Vitals
[Supplied rooming-vitals block verbatim, including repeats; *** if required but unavailable.]

Focused exam
[Labeled actual findings only.]

LABS
[Plain-text table: Lab | Latest | Prior | Prior 2 | Comment.]
NORMAL/STABLE: [Meaningful supplied normal/stable data with dates.]
PENDING NEW RESULTS: [Known unresulted tests, when applicable.]

======================================
IMAGING
- M/DD/YYYY Modality: [decisive finding].

======================================
ASSESSMENT/PLAN

#[Problem] - [administrative|acute|chronic|acute-on-chronic] - [stable|improving|worsening|uncontrolled]
[2-5 lines of case-grounded MDM; first line stands alone spoken.]
- [ONE discrete documented action with needed dose/details.]
- Continue [each unchanged tx actually continued for this problem, w/ dose].

[Additional addressed problems, same format.]

[TCM only: section 6's #TCM - administrative block.]

======================================
HEALTH MAINTENANCE:
- [Actually discussed/performed item, instrument/score, acceptance/decline or disposition.]

DEFERRED / TO ADDRESS LATER:
- [Named carry-forward issue + next step.]

FOLLOW-UP: Return: [documented interval/with whom; *** if required and unresolved]

Navid Moaziniya, PGY1
Pt seen and discussed with Dr. [attending if documented; *** for name only if discussion itself is documented]
```

If attending discussion is unsupported, replace the last line with `Attending discussion: ***`; do not use a name placeholder to imply the event occurred. The resident signature text is a draft attribution, not an assertion that the EHR note was signed.
</note_skeleton>

<note_field_rules>
**Header and interval.** One-liner descriptors carry control and complications when decision-relevant, e.g. uncontrolled T2DM w/ neuropathy; pertinent surgical hx if it changes risk. INTERVAL is chart-derived only, never recreated from transcript. Include relevant ED/admissions, telephone encounters, specialist visits, new dx, dated key data, and completion of prior plans; omit if none supplied. Pt-reported interval events may enter HPI as reported, not masquerade as records reviewed.

**HPI.** First paragraph follows the visit reason; one labeled paragraph per other problem discussed. Keep change, adherence/SE/self-treatment, function, discriminating +/-, and specific barriers (cost, unfamiliarity, insurance). Med reconciliation is actual use, not a regenerated Rx list; quantify partial use when supplied. Acceptance/decline appears here and, when appropriate, in HEALTH MAINTENANCE. A raised but deferred issue gets HPI context, actual exam if examined, and a DEFERRED line, never an invented A/P block.

**TCM HPI.** First paragraph includes facility/service, admission/discharge dates, hospitalization reason, concise course, discharge condition/plan, contact date/method and timing, and days to the actual visit. Then labeled discharge-linked problems actually discussed, actual med use/access/adherence/SE, pending-result and follow-up/service status. Unknown required fields remain ***. A pt-raised unrelated issue stays deferred unless independently evaluated/managed today; faithfully document that separate work without recreating all chronic care.

**Medication block.** Reproduce the supplied Epic current-outpatient-med list VERBATIM, including sigs, flags, and formatting; do not rebuild it or substitute the discharge list silently. If absent, retain `[Current Rx]`. Use `MEDICATIONS - reconciled` only with evidence of reconciliation, otherwise `MEDICATIONS - reconciliation pending`. TCM reconciliation names only new/stopped/dose-changed, duplicated, inaccessible, not-taking, or safety-relevant meds and their actual use/reason for management. The complete Epic list still remains intact.

**Vitals and exam.** Reproduce the rooming-vitals block unaltered, including repeated readings; generated rounding does not apply. Exam contains performed/spoken findings only. An item saying "examine" is no finding. Use labeled lines; name relevant visit-required elements explicitly only if performed, otherwise *** if a required field cannot be omitted. For examined skin lesions retain supplied size, color, surface, sessile/pedunculated morphology, crust, surrounding skin. Do not invent missing descriptors or unexamined normal systems.

**Labs.** Abnormal/actionable, significant trends and newly resolved abnormalities; generally ~12 months, with older values when relevant. Exactly five columns: `Lab | Latest | Prior | Prior 2 | Comment`. Each value carries its date, e.g. `11 (8/26/2026)`; newest left. Comment gives decision-relevant interpretation, not units/boilerplate. Keep absent individual historical cells blank; do not fabricate prior results. Follow the padding recipe in section 7. Meaningful NORMAL/STABLE names supplied reassuring panels/results and dates rather than generic "all normal." If no relevant abnormal rows, omit the table and retain supported synthesis. PENDING NEW RESULTS only for known unresulted tests in final NOTE; PREVISIT's *** prompt is its explicit exception. Do not describe mere orders as collected specimens.

**Imaging.** Date + modality + decisive finding; include older studies informing today's decision, even if their recommendation was not addressed today. Dated source findings do not establish today's clinician review or completion of recommended follow-up.

**MDM.** Reason first, tagged `(reason for visit)` or `(TCM/post-hospital follow-up)`. Problem type/status, then 2-5 lines: leading diagnosis + status, case evidence, contributors, consequence/risk, and reasoning for the documented action. Use data -> interpretation -> action, not an HPI restatement. Cite supplied values/trends/dates inline. Undifferentiated/diagnostic problems name 2-3 plausible alternatives and what supports/argues against each; established chronic problems emphasize control, drivers, and complication risk. Do not overstate rule-out from limited evidence. An assessment that could be written without this chart fails the specificity test.

Illustrative reasoning patterns, only when the underlying data are supplied:

- Diagnostic: fatigue; thyroid dysfunction less likely w/ dated normal TSH, anemia less likely w/ dated normal Hgb; OSA possible with snoring/BMI and compatible course. Each alternative needs actual evidence, not a generic list.
- Established: A1c increased from dated prior despite documented regimen/adherence; complication/comorbidity data raise stakes and explain the adopted treatment choice. Do not invent adherence or call a therapy failure from an unexplained lab change alone.

**Actions/voice.** One line per started/stopped/titrated/re-prescribed med with dose, test ordered, referral placed, essential counseling, or unchanged therapy actually continued. Prefer precise verbs: Started / Re-prescribed / Continue / Ordered / Referral placed / Counseled / Discussed. Use first-person resident ownership only when supported. Transcript decisions precede proposals; current order status supersedes old plans. Future voice requires a documented decision. No silent-plan gap-filling. An unresolved required plan field gets ***; staffing proposals belong in the separate allowed proposal location, not final chart voice.

Referral syntax, when actually placed (restore these literal placeholders before filling):

```text
REFERRAL <SERVICE> Reason for referral - please evaluate and treat for: <reason>; Preferred location: <site>
```

Fill supported service/reason/location. A required unavailable location becomes ***; an optional location may be omitted rather than invented. Proposal queues may use the same order-ready string but must retain their proposal status. Mark a future referral `; Future` when actually intended, not merely because timing is unknown.

**TCM A/P.** Discharge-linked diagnoses/procedures, med changes, pending tests, ordered follow-up, complications/safety. State actual use and clinical rationale for adopted continuation/change/discontinuation, and identify the owner of each pending result/follow-up. Add the required TCM documentation block. Do not invent that the discharge summary, reconciliation, or plan was reviewed.

**Health maintenance/deferred/follow-up.** Non-TCM HEALTH MAINTENANCE is required: only actual discussion/performance (vaccines offered with accepted/declined status, screening/SDOH instruments + scores, eye/foot exam disposition). Never-raised items are not declined. If required status is unknown -> ***; `Not addressed today` only if documented. TCM omits the section unless actually addressed/needed for discharge safety. DEFERRED exists only for genuine carry-forward items and names the next step. FOLLOW-UP remains required with documented interval/clinician, or *** if unresolved. Never fabricate counseling, appointment completion, or attending review.
</note_field_rules>

## 4. GAP

<gap_skeleton>
One clearly delimited rendered artifact; no automatic table required. If a table materially helps, render standard Markdown, max 5 columns. Do not wrap rendered tables in a code fence.

```text
DRAFT PICTURE
[<=6 lines: one-liner, active regimen as documented, last plan, interval events, working frame for today.]

GAP LIST
1. [Patient-specific named chart errand, one dictated breath.]
2. [Next patient-specific missing item.]

R1. Labs resulted since last note: values and new flags.
R2. SnapShot medication doses, refill counts, and not-taking flags.
R3. Health Maintenance tab in full.
R4. Orders tab: open orders and referral status, especially Future orders never drawn.
R5. Day-of rooming vitals.
```

The R1-R5 lines are the fixed residual categories; include only still-missing relevant categories, preserving labels. Do not ask again for supplied data. Missing future rooming vitals alone is a PREVISIT placeholder, not a reason to withhold the scaffold/order pair. A confirmed absence of recent results supports review of which tests are actually due, not ordering all panels.

TCM: first request missing discharge summary/instructions, admission/discharge dates, pre-admission/discharge meds, actual contact record/attempts, pending-result and ordered-follow-up status. Scope residual labs/meds/orders to discharge/safety; omit unrelated R3 prevention. Once enough information returns, produce the PREVISIT pair with its order queue.
</gap_skeleton>

## 5. ACTIONS

<actions_skeleton>
Only on explicit request for the full work/coding queue. Resident-facing, never part of the note. One plain-text block. Flat checkbox groups; omit empty groups except required BILLING & VISIT CODE and final ATTENDING SIGN-OFF. Each line is one remaining Epic task with specific orderable, indication, timing, required known parameters, and any dependency. Do not queue completed actions again.

```text
ACTIONS - NOT FOR EPIC NOTE

ORDERS - LABS/IMAGING
- [ ] [Specific orderable] - [indication]; [timing]; [parameters/dependency].

MEDICATIONS
- [ ] [New/refill/change/stop + specific drug and supported sig] - [indication]; [timing]; [dependency].

REFERRALS
- [ ] [Section 3 referral string] - [urgency/timing + owner]; [Future when intended].

IMMUNIZATIONS / POC
- [ ] [Specific item] - [indication]; [timing]; [parameters/dependency].

DME / SUPPLIES / SERVICES
- [ ] [Specific item/service] - [indication]; [timing]; [needed specifications].

FORMS & LETTERS
- [ ] [Specific document and recipient/use].

PATIENT INSTRUCTIONS / AVS
- [ ] [Specific instruction to include; not a claim it was already counseled].

FOLLOW-UP
- [ ] [Interval + clinician/service + purpose].

INBASKET / STAFF MESSAGE
- [ ] [Intended recipient/owner + exact task + timing; proposed, not sent].

TCM DOCUMENTATION
- [ ] TCM DOCUMENTATION - admission/discharge dates; facility/service; interactive-contact date/method; within 2-business-day status; 7-day versus 14-day visit timing; discharge-med reconciliation; pending results/follow-up owners.

BILLING & VISIT CODE
Suggested code: <code> / Basis: MDM or time / Supporting: <named elements met> / Modifiers: <25, EP, none> / Documentation gaps that would not survive an audit: <named, or none> / Attending to confirm.

PENDING
- [ ] [Named result/callback/attending decision + owner/timing when known].

- [ ] ATTENDING SIGN-OFF - [one actual decision needing input; otherwise proposed-code confirmation].
```

TCM DOCUMENTATION group appears for TCM only. TCM tasks remain discharge-plan medication reconciliation/access/monitoring, pending results, ordered specialty/therapy/home-health/DME, symptom escalation, follow-up timing and documentation/coding. No unrelated preventive/chronic-care queue without an immediate safety link.

The billing string above preserves the original placeholders. Fill its basis with MDM or time for applicable office E/M; for TCM/other visit families substitute the actual governing basis (e.g. TCM criteria + MDM). If support is insufficient, `<code>` becomes `undetermined` with named gaps; never make up a code or time to fill the field. Consult section 8's authoritative lookup rules before suggesting a code. Billing and sign-off are deliberate exceptions to omitting empty groups; the code is never final.
</actions_skeleton>

## 6. TCM facts and documentation fields

These fields describe the transition, not automatic certification of billing eligibility. Use across the TCM scaffold/NOTE; the presentation synthesizes relevant known facts and explicit gaps rather than reading every administrative field aloud. ACTIONS includes the documentation task only when requested. Keep clinical scope discharge-led as defined in the base.

```text
#TCM - administrative
Admission: [M/DD/YYYY or ***] | Discharge: [M/DD/YYYY or ***] | Facility/service: [known or ***]
Discharge diagnoses/procedures: [documented or ***]
Interactive contact date/method: [documented date, method, participant, or ***]
Within 2 business days: [yes/no/*** supported by dates and contact evidence]
Contact attempts: [documented dates/methods/outcomes, if relevant]
Visit: [planned/completed] [date or ***]
F/U timing from discharge: [known or ***] days (7-day/14-day window: [within 7/within 14/outside/***])
Discharge-summary review: [documented clinician review/status or ***]
Medication reconciliation: [documented completion/date or ***]
Pending results: [test/status + owner/next step, or required unresolved ***]
Ordered follow-up/services: [service/status + owner/next step, or required unresolved ***]
```

- Prefill dates from reliable records; retain planned versus completed. Calculate elapsed calendar days only when dates are known. Assess business-day contact timing using the applicable calendar/holidays, not guessed dates. A patient-facing message must evidence an actual qualifying clinical interaction, not merely scheduling or a sent notification.
- Preserve unsuccessful attempts as attempts. Do not relabel them successful contact; section 8 addresses checking payer rules when they affect coding.
- Compare pre-admission -> intended discharge -> actual use, identifying new/stopped/dose-changed, duplicated, inaccessible, contraindicated, or not-taking meds. Do not infer adherence or a restart. Specify the reason for an adopted change from actual clinical documentation.
- Name pending-test and follow-up owners when documented. If ownership is unresolved, use a scaffold *** or a precise resident-facing ownership decision; do not assign another clinician a task as already accepted.
- `Discharge summary, medication reconciliation, pending results, and follow-up plan reviewed` is not boilerplate to autofill. Each review/completion claim needs evidence. Record an explicit absence of pending tests only when supported; otherwise preserve required uncertainty.
- An unrelated disease may affect discharge safety through interactions, renal function, bleeding/fall risk, or monitoring. State that link; do not revive routine chronic/preventive care solely because the problem list contains it.

## 7. Display, parameters, and monitoring reference

### Epic table construction

For generated PREVISIT/NOTE tables, first finalize displayed strings and dates. Find the length of the single longest cell in the WHOLE table, including headings. Right-pad every cell to that same width; join with ` | ` (optional outer pipes must be consistent). No Markdown separator/divider row. Keep empty historical cells as padded blanks. Exactly five lab columns: Lab | Latest | Prior | Prior 2 | Comment. This rule applies to generated tables, never the verbatim medication/vitals blocks. Epic font choice can affect visual alignment; the required output itself must be consistently padded plain text.

PRESENTATION uses standard rendered Markdown, separate vital/lab tables, specified four-column schemas (two columns for vitals without priors). GAP can use a rendered table only if needed. Do not turn all sections into tables.

### Protected blocks and precision

- Treat the exact supplied Epic current-med block and rooming-vitals block as protected spans in both scaffold and NOTE; preserve line breaks, sigs, brands, flags, repeat readings, units, and source precision.
- In generated narrative/queues, use generic medication names and clinical essentials. Retain formulation/concentration/device/route when it affects safety, dose meaning, compatibility, access, or duplication. Medication doses and order parameters are never rounded.
- Preserve every clinically meaningful decimal or threshold; do not round a borderline value into a different interpretation. Generated trends are newest-left with dates; words such as increased/decreased must follow chronology, not arrow direction alone.
- One queue action per line. Multiple tests may share a line only when they are one actual orderable/panel; do not hide distinct orders in a slash-separated omnibus line. Keep one mention per proposed action within the queue; chart evidence in a scaffold is not a duplicate order proposal.

### Medication monitoring cues - verify before recommending

This retains the source regimen review without treating remembered intervals as universal. For a medication actually relevant to today's care, identify the last result/change date and current primary-source recommendation before naming a test or timing. Apply stable versus initiation/titration, age, renal/hepatic function, indication, symptoms, and specialist ownership. No due date from the cue alone.

| Medication/class | Review cue | What to verify for this patient |
| --- | --- | --- |
| Statin | Lipid response; baseline/indicated hepatic testing | Initiation/change versus stable therapy; indication for repeat liver testing |
| ACEi/ARB, diuretic, spironolactone | Renal function/electrolytes | Agent-specific analytes and timing after start/change versus stable use; kidney/potassium risk |
| Metformin | Renal function; B12 context | Renal status, duration, symptoms/risk for deficiency, appropriate interval |
| Stimulant | BP/HR and relevant adverse effects | Follow-up/monitoring schedule and patient-specific risks |
| Testosterone | Testosterone, Hct; prostate-risk discussion when relevant | Formulation/timing of level, start/change versus stable use, Hct action threshold, age/risk/shared decision for PSA |
| Levothyroxine | TSH and relevant thyroid testing | Time since dose change, steady state, pregnancy/special situations, stable interval |
| SSRI/SNRI | Response, adverse effects, safety; appropriate symptom instrument | Which instrument/score and follow-up cadence are indicated; no automatic PHQ-9 at every encounter |
| Allopurinol | Urate response; renal function | Titration-to-target versus stable regimen, renal context, appropriate interval |
| Amiodarone, lithium, DMARDs | Drug-specific safety monitoring | Exact drug/protocol, last tests, responsible clinician; do not assume someone else is monitoring |

Search controlling society guidance and current official prescribing information as applicable. Screening recommendations use current USPSTF; vaccines use current CDC/ACIP; disease-specific abnormal pathways use the governing specialty guidance. Use generic clinical searches without patient identifiers or chart text. If verification cannot be completed, name the specific uncertainty on the resident-facing proposal; never convert a remembered schedule into a READY order.

### Visit-type reference

Infer the type from purpose/records and verify the required documentation for that service and payer. Do not let a visit label create unsupported routine panels. For a preventive visit or AWV, consult the current controlling program/payer elements and record only performed instruments, scores, counseling, and examination. AWV and preventive physical are distinct services; ask if the unresolved distinction changes the task. For Texas Health Steps, use current Texas HHS/DSHS/TMHP preventive requirements and document completed/deferred elements and reasons. For acute/chronic visits, prioritize the complaint, due PCP actions and safety. For TCM, apply section 6 and discharge scope. No missing visit-types file is needed.

## 8. Coding and evidence lookup

This section supplies the coding/action support within the two-file system. Do not look for a separate coding-and-actions document. Suggest a code only in requested ACTIONS/coding work, using the actual encounter, payer, patient status, documentation, and teaching setting. Never make the proposed code final or generate undocumented work to support it.

### Office E/M

Use current AMA/CPT criteria and payer rules. For MDM, evaluate problems addressed, qualifying data work, and management risk; identify the two elements supporting the level. A problem list is not addressed problems, a test result in a paste is not proof of clinician review, and a med list is not prescription management. Avoid double-counting tests/data. A single qualifying element cannot alone establish the overall level.

Orientation from the supplied prompt, to be checked against current criteria: established office 99213 = low, 99214 = moderate, 99215 = high MDM. Actual prescription management can support moderate risk; two stable chronic illnesses or a worsening chronic illness can support the moderate problem element; one stable chronic illness can support the low problem element. Use the full current definitions, including what was actually evaluated/managed, not shorthand alone. New-patient and other visit families require their own criteria.

If choosing an allowed time basis, require a documented qualifying total-time statement; never infer it from transcript length or resident effort. Verify teaching-physician rules. CMS's primary care exception uses MDM, not time; other teaching-clinic time selection uses qualifying teaching-physician time, not automatic resident-time totals. Flag an unsupported time basis and use only the supported alternative. [CMS E/M Services, May 2026](https://www.cms.gov/files/document/mln006764-evaluation-management-services.pdf)

Modifiers such as 25 or EP require actual service/payer support; never default them. Check current separate-service, preventive, procedure, teaching and payer requirements, and name the documentation gap rather than fabricate eligibility. Use the exact ACTIONS billing placeholder structure, with the governing basis adjusted for the actual service.

### TCM coding checks

Hospital follow-up is not automatically billable TCM. Verify current payer criteria. Medicare orientation: 99495 requires at least moderate MDM and a visit within 14 calendar days; 99496 requires high MDM and a visit within 7. Both require timely interactive contact; medication reconciliation/management must occur by the visit. Timing alone does not select the code. Keep unsuccessful attempts distinct and check current rules if documented timely attempts are the basis claimed. Verify eligible discharge/community transition and all remaining service requirements; do not bill the required TCM visit separately. [CMS Transitional Care Management Services](https://www.cms.gov/medicare/payment/fee-schedules/physician-fee-schedule/care-management/transitional-care-management-services)

Capture actual contact evidence and med-reconciliation status using section 6, never a prefilled assertion. If necessary evidence is missing, name it under documentation gaps and leave suggested code undetermined or explicitly contingent. Do not treat a scheduled appointment, sent message, discharge list, or proposed order as fulfillment of the associated service.

### Primary-source starting points

- [CMS E/M Services](https://www.cms.gov/files/document/mln006764-evaluation-management-services.pdf): current Medicare documentation, time/MDM, teaching-physician guidance.
- [CMS TCM Services](https://www.cms.gov/medicare/payment/fee-schedules/physician-fee-schedule/care-management/transitional-care-management-services): contact, timing, medication reconciliation, service/billing requirements.
- [AMA E/M guidelines linked by CMS](https://www.ama-assn.org/system/files/2023-e-m-descriptors-guidelines.pdf): MDM framework; check current CPT/payer updates before application. This linked edition is not a promise that all future codes/rules are unchanged.
- For other services, use current CMS/payer, AMA/CPT, or Texas HHS/DSHS/TMHP primary guidance relevant to the visit. For clinical recommendations, use section 7's disease/program source selection. No patient data in queries.

Links belong in this reusable reference, not Epic-facing artifacts. Clinical outputs use short source tags. If a lookup is unavailable, mark the proposed recommendation/code as needing verification and identify the missing criterion; do not invent a current rule.

## 9. Final artifact checks and targeted maintenance

- Correct routing: precharting plus orders still PREVISIT; transcript defaults PRESENTATION; NOTE and full ACTIONS remain explicit; incomplete chart -> GAP; patients stay separate.
- PREVISIT: exactly two artifacts, chart-only pending scaffold plus concise concrete order sheet. Current sigs/source blocks protected; prompts enumerate symptoms; no separate question guide; ready versus dependent lines, parameters, timing, indications, sources and duplicate-order reconciliation present.
- PRESENTATION: strict SOAP; therapies in one-liner; every rooming vital/repeat; separate syntheses/tables; one assessment line/problem; each action/continuation separate; proposals in ASK.
- NOTE: requested explicitly; correct header/dividers/CC/HPI; chart-derived interval; verbatim med/vital blocks; data-grounded MDM; ddx for diagnostic problems, control/drivers for established disease; documented actions/continued therapy, deferred issues, follow-up/signature. No automatic reconciliation/attending-review attestation.
- TCM: discharge focus; actual pre-admission/discharge/use reconciliation, contact evidence and timing, required fields, pending-result/follow-up owners. No unrelated routine panels or fabricated service completion.
- Sources/status: current orders supersede old suggestions; order != administration/performance/review; transcript action-items != completion; silent plan != adopted future action. Protect required unknowns instead of inventing facts.
- Display: mode-correct tables, dated values, meaningful NORMAL/STABLE, threshold-safe precision, exact protected blocks, no empty optional groups or duplicated actions.
- On end session/save rules, edit the relevant existing section. Remove superseded wording in both files, fix cross-references, count base characters including newlines and CRLF, and report what actually changed. Never grow an override appendix or retain patient-specific corrections as reusable rules.

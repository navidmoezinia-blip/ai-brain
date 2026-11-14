# ED note / chart

For a patient being picked up at shift change, an unqualified `note` requests the [receiving-provider pickup note](pickup.md). Use the full layout below when explicitly requested, preserving earlier-provider versus receiving-provider findings and actions.

Draft free-text content for the UTMB Epic ED template in telegraphic bullets; do not claim to modify Epic fields. Put the complete note in one fenced `text` block by default, with section labels inside it. Split sections into separate blocks only when I request it. Full notes use these sections in this order; omit empty sections:

- HPI: start with age, sex, and presenting reason only; put PMH in RELEVANT PMH below. Follow with chronological bullets with supplied positives/negatives and relevant dated prior-visit context. Keep the HPI focused on supplied history that changes the differential, workup, treatment, or disposition. Preserve management-driving positives, explicit pertinent negatives, timing/trajectory, risk factors, relevant prior evaluation, and treatment response; omit incidental details and repetition. Do not trim a detail that explains a management decision or move it solely to ROS. Put prior lab values and imaging/ECG findings in their objective sections below; keep only the relevant symptom/visit chronology here. Keep assessment and plan in MDM. An explicit request for all HPI details overrides brevity. Keep ambiguous transcript statements uncertain rather than resolving them into invented facts. Keep episode-specific medication use, interventions, and relevant allergies in the HPI when they explain the current story; place background conditions and their treatments in the history sections below without duplicating them. Omit routine source-prefaces; retain material attribution and uncertainty under the core fact rules.
- RELEVANT PMH: immediately after the HPI, use a bulleted list of supplied medical problems with their relevant interventions/medications grouped under the associated problem. Include only items affecting management of the current visit: differential, workup, treatment, monitoring, or disposition. Order problems by greatest impact on current management, not chronology or source order. Preserve useful dates, complications, and treatment status; do not infer diagnoses from medications. No fixed count limit.
- PAST SURGICAL HISTORY: immediately after RELEVANT PMH and before ROS, list supplied surgeries/procedures affecting current management in bullets, highest impact first. Include useful dates, revisions, altered anatomy, retained devices/hardware, and complications only when relevant. Avoid repeating the same intervention in both history lists; place surgical details here.
- ROS: only `- Positive: ...` and `- Negative: ...`, listing supplied symptoms and explicitly supplied denials. No organ-system separation, extra subheadings, or "otherwise negative." Omit an unsupported side rather than filling it with "none," an invented denial, or commentary about unasked history. Keep any consequential unanswered questions outside the note.
- PHYSICAL EXAM: preserve the current exam findings the clinician supplies. Historical normals do not become today's exam. If the clinician explicitly confirms a system is normal, use concise corresponding wording without adding unreported maneuvers. A generic exam-template request is not confirmation findings occurred; label the template accordingly.
- LABS: include management-relevant current and historical labs in concise bullets. Place dated prior values beside the corresponding current result when useful for comparison; include relevant historical results even without a current counterpart. Use specimen dates and preserve assay/unit differences; a single prior value is not automatically a baseline.
- IMAGING/ECG: include management-relevant current and historical studies, including prior echo, with study dates and concise key findings. Pair useful comparisons with the current study; retain relevant prior studies even without a current counterpart. Preserve uncertainty and consequential preliminary/final status.
- MDM: use the one-liner → DDX with reasoning → PLAN → DISPO structure in [MDM](mdm.md). Integrate relevant clinical course, confirmed procedures, and supplied event times into this section; no fabricated times or presumed event order.

Use short bullets inside every component, including the MDM one-liner. Preserve the MDM's DDX → PLAN → DISPO order within the shared note block; actions belong in PLAN. A request for one component returns only that component in one block. Place consequential unresolved issues as brief clinical questions below the block instead of filling sections with normal findings, canned discharge language, or commentary about missing inputs. Apply the core note-language rule: no chart/transcript-processing, AI, or model references. Preserve clinically meaningful attribution and dates. Other standalone sections require an explicit request; LABS and IMAGING/ECG are part of the full note whenever relevant results are supplied.

Full-note layout (placeholders only; omit unsupported items):

```text
HPI
- [Age/sex; presenting problem.]
- [Onset/trajectory.]
- [Other supplied history; one clinical point per bullet.]

RELEVANT PMH
- [Highest-impact medical problem — relevant intervention/medication.]
- [Next management-relevant problem — relevant intervention/medication.]

PAST SURGICAL HISTORY
- [Management-relevant surgery/procedure; useful date/details, highest impact first.]

ROS
- Positive: [Supplied symptoms.]
- Negative: [Explicitly denied symptoms.]

PHYSICAL EXAM
- [Clinician-supplied finding.]

LABS
- [Relevant current result; dated prior comparator, when supplied.]
- [Relevant dated historical result without a current counterpart.]

IMAGING/ECG
- [Study, date — relevant findings; dated comparison when useful.]

MDM
- [One-liner.]
DDX
- [Diagnosis; uncertainty.]
  - For: [Supplied supporting evidence.]
  - Against: [Supplied contradictory evidence.]
PLAN
- [X] ordered - [What it checks / reason in a few words.]
- [Other supplied action; actual status] - [Brief reason.]
DISPO
- [Supplied disposition; supporting reasoning or pending conditions.]
```

Do not reproduce/change autopopulated complete vitals/lab/radiology tables, ECG reference fields, order lists, calculators, prescriptions, follow-up fields, or disposition picker unless requested. Summarize relevant results in LABS and IMAGING/ECG; use MDM to explain how those findings and confirmed administrations affect decisions, without repeating the results list.

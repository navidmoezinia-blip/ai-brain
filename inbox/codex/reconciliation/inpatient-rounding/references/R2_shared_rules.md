# R2. SHARED RULES (00_shared: inpatient clinical rules)

Language, style, formatting, and routing live in R1. This section holds the clinical rules. On safety, this section wins over the others; my chat messages still override it.

TIME
- Anchor = the time I give, else the latest observed timestamp in the data. Use the anchor internally for p1 so SUMMARY opens the guide. For other modes, print it once at the top as "Anchor: MM/DD HH:MM".
- HARD RULE: "Last 24h" = the 24h before the anchor, and it is the only actionable window for every output. Data dated before it is reference and trending only (dated comparators, baselines, admission values, running-record history, day counts, appendices); it never creates or sustains an event, task, suggestion, or plan item and is never reported as current.
- If the date or encounter of a finding is ambiguous, set it aside until clarified. A later signature or a new paste alone does not establish a new clinical day.
- The anchor never makes old data current. Call something "new" or "overnight" only inside a verified window since the prior review.
- Day counts (antibiotic day, POD, device day) come from verified administration or placement, not order start dates.
- Not new does not mean resolved: a persistent issue stays in tasks and A/P while in-window data still shows it (a result, vital, exam, MAR or order status, note, or dictation) and until resolved. Its older entries are reference and trending only.
- "New patient" resets all facts. Daily updates keep dated baselines, prior studies, pending workup, and unresolved problems, revalidated against in-window data.

SOURCES
- Never invent values, doses, dates, results, exam findings, symptoms, orders, calls, consult recs, responses, or quotes as case evidence. The requested expected-exam template for simulated, deidentified testing is a limited exception governed by [simulation testing](simulation-testing.md); those labeled unconfirmed expectations are not findings supporting the A/P or completed actions.
- Use the shortest route that covers the relevant notes (consult, progress, nursing, therapy, CM/SW, dietitian), current orders, MAR and results. The report-first shortcuts in `epic-navigation.md` are optional; open underlying sources for missing coverage or discrepancies. Events and recs come from notes; prescriptions from current orders; administrations and refusals from MAR; results retain their source/date/status. A filtered event list does not prove complete current-order coverage.
- Today's clinical note TODAY and PHYSICAL EXAM come only from my current bedside findings/dictation. Reports/guides may separately show dated prior findings and reassessment targets; never promote them to today's performed exam. The labeled simulated worksheet exception above does not establish an observed finding. Objective findings come from chart data. Nursing, therapy and consultant observations retain meaningful attribution; generalized event timing is sufficient unless exact time matters. Consultant A/P lines carry the note date (M-D).
- "Pending" needs order or specimen evidence.
- Change over time is not a conflict. True conflict: show both with source and time (K 3.2 BMP 6AM vs 4.1 VBG 7AM) and make a task. Dictation vs chart: preserve what I said and flag the discrepancy. My bedside account sets what I observed or decided. Verify a conflicting measurement, medication or dose against its owning source before using it as fact. Contradictory dictation about the same symptom: keep both statements w/ their timing.
- Claim a trend only when the supplied data show it.
- A pending result shows its collection conditions and confounders on the same line ("AM cortisol pending, drawn on prednisone, may be falsely low").
- An imaging study I dictated as ordered shows as pending even before a result.
- Interrupted support and an active restriction share one line ("BiPAP off for meals; NPO except meds").
- External urinary device (PureWick, condom catheter) is not an indwelling catheter: no CAUTI logic, no removal protocol.
- Never carry forward vitals, exam, I/O, symptoms, or old labs as current. Do keep dated baselines, prior studies, and prior treatment responses.
- Unsure of a dose, threshold, or duration: check clinical search. Cite it in the chat reply, never in note text.
- A whole source missing (MAR, orders, home meds, labs, vitals, notes, dictation): print "Missing source: [name]" at top of the chat reply, never inside note text. Incomplete med sources: "MED MATCH: incomplete, [missing source]". In note text, silently omit optional lines/sub-fields lacking source coverage and leave mandatory empty headers blank beneath the heading; never write "not supplied," "not provided," "not specified," "not available," "unknown," or "N/A," and never infer no fluids, no treatment, or zero administered doses from absent evidence. R5 omits Epic-autofilled I/O; fluids belong in the owning A/P problem.
- A med started or stopped w/o an explaining note: report the fact and time. Never write "no indication", "no reason given", "not documented", "not supplied", or "indication TBD" anywhere; the med's owning problem in the A/P is its indication, and a keep-or-d/c decision is a task.

SAFETY CHECK (review silently before every output; never print as a section)
- Allergies/ADRs: agent - specific reaction - severity - verification status. NKDA only if documented.
- Code status / goals: status + limitations, documenter, MM/DD.
- Isolation and precautions: type + organism/reason when relevant and established; after the opening event line per R3.
- Weight: latest with units and MM/DD; dosing weight if different.
- Renal: latest Cr with MM/DD, baseline Cr, CrCl or eGFR (note if AKI makes it unreliable), dialysis schedule.
- Communication: language/interpreter (preserve interpreter language/ID in TODAY when used), hearing/vision/cognitive/speech barriers (state clinical barrier + collateral source in TODAY when history is limited), capacity, surrogate.

MEDICATION SAFETY
- Allergies: check allergies/ADRs (including cross-reactivity) against orders, PRNs, MAR, and plan. Unexplained conflict = priority task. Never delabel. A documented desensitization or graded challenge is not an error.
- Reporting doses: always the exact ordered or given dose. Missing or abnormal safety input (renal, hepatic, weight, level): keep the dose, make a task. Never erase an active dose.
- Proposing doses: check renal (account for AKI), hepatic, weight, age, interactions, and doses already given. Give a number only when established for the indication and inputs are verified, citing the value used. Else leave the dose out of the suggestion and make a task.
- High-alert medications retain verified dose/route/frequency and decision-relevant monitoring in their owning problem; glucose/insulin summaries follow R5. Only DVT prevention belongs in DVT PROPHYLAXIS. Missing monitoring or unintended overlap is a verification/suggestion item; distinguish deliberate combined regimens from duplication without assuming appropriateness from order status alone.
- Keep formulations distinct (KCl vs K phos, metoprolol succinate vs tartrate). Never guess one.
- Keep ordered, available, given, held, refused, stopped, completed, and omitted distinct.

BREWING CHECKS (silent; each one that fires becomes a CHECK IN CHART line in p1 and a SUGGESTIONS line in the note)
- Dose too high OR too low for current renal fx, including under-dosing as AKI recovers (renal-dosed meropenem while eGFR rises).
- Drug level vs target, timed to the next dose (vanc level below AUC target -> pharmacy before the 4PM dose).
- Infusion repeatedly stopped or paused on the MAR: full doses given? line patency?
- Disease-specific avoid lists (myasthenia: no FQ, aminoglycosides, macrolides, IV Mg).
- Allergy-driven limits on routine care (Mg allergy and repletion).
- QT stack: list each QT-prolonging drug still running, the latest QTc, K/Mg targets, and the monitoring interval.
- Other high-risk combinations (opioid + benzo, dual AV-nodal blockers, anticoag + antiplatelet): name the monitoring and the reassessment interval.
- Conflicting support orders running together (continuous CPAP + continuous HFNC).
- Inpatient vs home dose mismatch on a care-relevant drug (isosorbide 60 TID inpatient vs 40 TID home).
- New diarrhea on abx: C. diff testing, hold the laxative.
- Hgb drop after fluids: dilution likely, but name the bleeding-source check, and reassess ppx anticoag.
- Hypoglycemia risk w/ poor PO on scheduled insulin or sulfonylurea.
- Na correction: calculate the 24h change before continuing the same dose; flag overcorrection risk.
- New positive culture: consider specimen site, clinical context, possible contamination or colonization, and coverage. A new sterile-site result or bug-drug mismatch warrants timely review even without new symptoms.
- Normal SpO2 on RA but sedated w/ slow, shallow breathing: ventilation check w/ a pCO2 trigger.
- A provisional VBG read stays pending until a measured pCO2 confirms hypercapnia.
- Device w/o an exit plan.
- Med given despite an active hold or stop order.

PRIORITY TRIGGERS
Give an active priority trigger first position in the relevant previsit section, A/P or spoken rounds. State the finding, time and needed response. Reassess against the latest reliable measurement, treatment record and clinical state before describing it as resolved.
- Critical lab, imaging, path, or micro result without an adequate response. Use local critical criteria when supplied. A dangerous change from the patient's baseline can need review before a fixed cutoff is reached.
- Rapid response criteria met; new or rising pressors, O2, or ventilatory support; new hypotension, significant arrhythmia, or acute mental status/neuro change.
- Held or missed time-critical dose without coverage: anticoagulant, antiplatelet post-stent, AED, basal insulin in insulin-dependent DM, antimicrobial, immunosuppressant, Parkinson med, steroid in adrenal insufficiency. Correctional insulin held below threshold is not a missed dose.
- After a fall, procedure complication, transfer, nursing escalation or intent to leave, identify any immediate risk still unresolved and the response already documented.
- Unexplained allergy conflict.
- Code status conflicting with active orders.

DEVICES, PENDING RESULTS, CONSULTS, CONTINGENCIES
- Devices: indication/management in the owning A/P problem. Only clinically pertinent placement/removal/malfunction or access difficulty enters Interval Events. No routine device inventory in prophylaxis.
- Pending results: never a task or plan bullet to follow, chase, or check them (I get result notifications). In the A/P PLAN, a pending item sits under its owning problem:
  - Use "[test] pending ([condition/question being evaluated])"; no endpoint label or automatic follow-up task.
  - Include a material collection confounder and specialty owner when useful. Timing only when established and decision-relevant; do not invent turnaround times.
  - Owner printed only when a consult service ordered or owns it. FM is never written.
  - Results still pending at discharge go in OUTPATIENT FOLLOW-UP. They do not automatically populate the resident-written IMMEDIATE ITEMS TO FOLLOW-UP field.
- Consult recs stay "recommended" until ordered or I accept. Track recommended / ordered / done / declined (reason). A care-changing recommendation missing from complete orders warrants review. If the team explicitly declined or superseded it, record both positions and the reason if given. Do not call it a missed order.
- Every potentially life-threatening problem gets: Contingency: if [measurable trigger], [specific action]. Never "if worsens".

SILENT CHECK BEFORE EVERY OUTPUT (never print)
1. Every meaningful symptom, abnormal result, support need, and consult rec has an owning problem plus an action, monitoring, task, or suggestion. No diagnoses from isolated values.
2. Every active problem has current evidence, trajectory and today's decision; no mandatory printed endpoint.
3. Consider what response would justify continuing or changing treatment; do not print invented reassessment times, thresholds or endpoint boilerplate.
4. Med rec: home meds vs orders vs MAR vs plan; every drug has an owning problem.
5. For a priority trigger, distinguish the response still needed from treatment actually given and its documented effect.
6. When relevant: source control, nutrition/swallow, delirium, mobility vs baseline, skin, bowel/bladder, device necessity.
7. Pending workup identifies the question being evaluated and material confounders; timing/ownership only when useful and supported.
8. Discharge: medical endpoints, function, caregiver, med access, teaching, DME, follow-up.
9. Summary, tasks, exam, and plan cover the identical problem set and tell one coherent trajectory.

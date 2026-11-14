# R3. PRE-VISIT GUIDE (01_previsit)

Command: "p1", "phase 1", "guide", "previsit". A named single section = print only that section with its header.
Order: SUMMARY -> INTERVAL EVENTS -> CHECK IN CHART -> ORDER NOW -> LIKELY ORDERS -> PATIENT UPDATE -> QUESTIONS -> RED FLAGS -> EXAM.
Each header prints bold on its own line: **CHECK IN CHART**. Always print every section in full; never stop early. An empty section prints its header and its "none" line.
Private prep sheet, never note text. Brief: the whole guide fits one screen. Values allowed anywhere they save a chart click.
Never copy instruction text, labels, or placeholders from this section into the output; print only real content.
SCOPE: the guide is the daily delta. Compare the chart to my last progress note; INTERVAL EVENTS, CHECK IN CHART, ORDER NOW, LIKELY ORDERS, QUESTIONS, RED FLAGS, and EXAM cover only what is new, changed, or still unresolved, within the 24h before the anchor. HARD RULE: every item rests on data dated in that 24h window; anything older is reference and trending only (a dated comparator in parentheses), never its own item. SUMMARY covers the whole admission. Items already handled in my last note or carried in the appendices are not re-raised; the full admission history I paste is for the note's A/P running record and Appendices A-D.
PRIORITY: QUESTIONS, RED FLAGS, and EXAM follow the problem list, most problematic problem first, then down the list.
HARD RULE (SKILL.md): patient care only. Connect the dots, catch what is brewing (R2 BREWING CHECKS), and flag what did not happen. Admin and chart housekeeping never appear here; they go to `audit` only.

SUMMARY
A mini hospital course, 2-4 \- bullets: who and why admitted (age, sex, admit date, dx); how the stay has gone w/ the values that save a chart click (key trends w/ dates, current support: O2 w/ SpO2, drips w/ rate); today's main decisions last. No PMH list, no plan recap, nothing unchanged and unimportant.

INTERVAL EVENTS
What happened in the window, what other services said, and what I am tracking. Same section, rules, layout, and example in p1 and in the note. Readable, not cryptic: telegraphic, but a human reads it in 30 seconds; no more than 2 abbreviations in a row.
Sources, in this order: notes (consult, progress, nursing, therapy, CM/SW, dietitian) for events and recs; orders and MAR for med changes, refusals, and tracking; labs and imaging only when the result is decisive. Do not build this section from the MAR alone.
Layout, in this order; blank line between blocks:

Line 1, no dash: isolation and precautions ("Contact isolation (ESBL); fall precautions"). None: "No isolation or precautions".

Events, one \- bullet each, most acute first, worded event -> action -> response ("Rapid response 2AM for SBP 82/44 -> 1 L LR -> SBP 100s since, no pressors"):
- Max 5. More only when each extra bullet passes the gate (an unstable night).
- First bullet: the most acute event, or "No acute events overnight" + one status phrase ("walked in hall w/ PT") only when nursing or progress notes support it. Never manufacture a quiet night from absent entries.
- GATE, include an event only if all 3 are true: (1) new since my last note; (2) it changed management, should change today's plan, or was expected and did not happen; (3) the team would be caught off guard without hearing it on rounds. Unsure: leave it out.
- ELIGIBLE, each must still pass the gate: rapid response, hemodynamic excursions, pressor start, wean, or add; rhythm events that were sustained, symptomatic, or treated, w/ the purpose of tx ("for rate control"); transfusion (trigger, units, reaction); hypoglycemia or an insulin change beyond SSI; mental status change and what was started for it; Foley, line, tube, or drain placed, removed, or malfunctioning; diet change (NPO, advanced, held); anticoag started, stopped, held, or changed (drug, dose, indication, what it replaced); scheduled-med dose change w/ first-dose time; one-time IV or PO doses that explain an I/O or lab change (Lasix x1); consultant extending or changing a course; falls, refused care incl PT/OT, repeated refusal of an important med (Lovenox refused x2), AMA; GOC, code status, family meetings; ordered and not done (lab not drawn, study not done, ate while NPO); course-defining procedure or imaging as name + done, or skipped and why; new or final micro that changes abx.
- Electrolyte repletion: a bullet only when IV repletion was needed, the level kept falling despite repletion, or it was tied to a rhythm event ("Mg 1.8 -> 4 g IV -> 2.5"). Routine PO top-ups stay out.
- NEVER: stable or expected AM labs; abnormalities unchanged since my last note; SSI coverage; vitals at baseline or single excursions that resolved w/o intervention; scheduled meds given as ordered; routine I/O; consults w/ no new recs; results not yet due; imaging or culture impressions except their treatment consequence; basic meds (acetaminophen, topical, sleep, bowel, vitamins) unless refused in a pattern that matters.
- Values: the decisive trigger and response only.
- A newly ordered or collected lab appears only when it evaluates a new concerning finding or symptom: the finding and the test, no result (results go in INTERVAL LABS or MICRO/PATH unless they change management).
- Historical symptoms appear only when newly elicited and relevant to current care.
- Meds started or stopped w/o a note: the fact and time only. Never wording that implies missing documentation.
- Separate events, separate bullets; never combine a start and a stop.
- Discrepancy between disciplines on the same finding (RT "no cough" vs pulm "productive cough"): one bullet w/ both, role and time.

Consults, on its own line w/o a dash, then one \- bullet per service seen in the window: "\- [Service]: [the recs or finding that change management]". Rec w/ no matching order: end the bullet "(not yet ordered)". Seen w/ nothing new: "\- [Service]: no new recs". Ordered and unseen: "\- [Service]: ordered MM/DD, no note yet". Sign-off: "\- [Service]: signed off". Never restate recs already in my last note unless they changed.

Tracking, labeled lines w/o dashes, in this order:
- MAR: always printed. Each scheduled dose due in the window and not given: drug, dose, count, time, known reason. High-risk first (anticoag, abx, insulin, AEDs, steroids, cardiac). Nothing missed: "MAR: no missed doses".
- Given despite hold: drug, dose, hour, the hold or stop order it conflicts with. Only when present.
- Abx: one line per infection: drug, dose, route, freq, day X/Y, started by [service] for [infection], end MM/DD. Omit if none active and none finished in the window; finished in the window: "[drug] completed MM/DD".
- Specialty and higher-level meds, no label, one line each: chronic specialty meds (immunosuppressants, biologics, chemo, AEDs managed by a service) and short or time-limited courses (steroid course or taper, drips, anticoag bridge, PCA, TPN): drug, dose, route, freq, day X/Y or "chronic", started by [service] for [indication], end or exit plan. Never Foley, PIV, tele, or other devices here.
- Insulin: total units in 24h and BG range. Only when insulin was given.
- PRNs: always printed, grouped: "PRNs: pain: [drug dose route xN], MME X (prior day Y); nausea: [drug dose xN]; other: [drug dose xN]". An empty group reads "none". Buprenorphine: listed, not in the MME total. A PRN opioid unused 48h or more: "unused since MM/DD". "other" lists only niche PRNs (IV antihypertensives, benzodiazepines, antipsychotics, rescue inhalers); never acetaminophen, topical agents, sleep aids, or bowel meds. A long-acting or scheduled opioid regimen goes on a specialty-meds line w/ dose and start or change date.
- Devices: only when one was placed or removed in the window ("Devices: Foley placed 10/31 4AM for retention").

EXAMPLE - INTERVAL EVENTS (fictional, format only)
**INTERVAL EVENTS**  
Contact isolation (ESBL); fall precautions  

\- Rapid response 2AM for SBP 82/44 -> 1 L LR -> SBP 100s since, no pressors  
\- Metoprolol increased 25 -> 50 mg BID -> first dose 9PM, HR 70s after  
\- Lovenox 40 mg refused x2 (9AM, 9PM)  
\- Mg 1.8 -> 4 g IV -> 2.5  

Consults  
\- Pulm: prednisone 40 mg extended to 7 days, then taper (not yet ordered)  
\- PT: min assist w/ walker, rec SNF  
\- Cards: no new recs  

MAR: DuoNeb 2PM missed  
Given despite hold: metformin 500 mg 9PM (held for AKI)  
Abx: ceftriaxone 1 g IV q24h, day 3/5, started by ED for CAP, end 10/28  
Prednisone 40 mg PO daily, day 2/7 then taper, started by pulm for COPD exacerbation  
Tacrolimus 2 mg PO BID, chronic, continued per transplant  
Insulin: 16 units in 24h, BG 140-268  
PRNs: pain: oxycodone 5 mg PO x2, MME 15 (prior day 30); nausea: Zofran 4 mg x1; other: none  

CHECK IN CHART
What to verify before I see the pt. Format: "\- [what to check]: [what the data show] ([why it matters])". Max 6 unless more would change today's plan. Most urgent first, priority triggers (R2) on top w/o urgency words.
- Fixed first lines, exempt from the cap, in this order:
  - Active order vs allergy or contraindication: "\- CONFLICT: [order] vs [allergy/contraindication] ([why it matters])".
  - "\- NOT ORDERED: [service] rec [what] ([date of rec])" for every consultant rec w/ no matching order. Check each rec against the orders one by one.
  - "\- CONSULT NOT PLACED: [service] for [reason] (planned [date])" for every consult a note or plan said would be placed w/o an order or note. Ordered but no provider assigned, no note, or a procedure not scheduled counts.
- Important med held, missed, or refused w/o a known reason (anticoag, abx, insulin, AEDs, cardiac, steroids, immunosuppressants): "\- Ask RN why [drug dose] held x[n] [time] ([why it matters])". Never "reason not on MAR".
- Med gaps: unexplained home-med omission, repeated PRN use, missing high-alert monitoring (R2), missing abx duration, missing device removal plan.
- A med w/ no owning problem: "\- Keep or d/c [drug dose route freq] ([started MM/DD by service])". Never "no indication".
- Ordered and overdue: a test, procedure, or therapy past its due time and not done ("\- MBS: ordered 10/19 2PM, not done, pt strict NPO (call SLP/radiology to schedule)"). Future tests are not overdue. A pending result is never an item; I get notifications.
- Contradictions: both values w/ times, never pick a side ("\- K: 3.2 BMP 6AM vs 4.1 VBG 7AM (repletion decision)").
- Brewing: each R2 BREWING CHECK that fires, w/ its values.
- Working dx that the data no longer fit: name the dx-defining test or disease-specific tx that is missing ("\- Calciphylaxis vs soft tissue infection: no biopsy, no sodium thiosulfate (abx alone won't heal calciphylaxis)").
- Incomplete record: name the specific record to check.
- No orders pasted: one bullet saying so.
- Nothing found: "\- nothing flagged".

Every new, unresolved, or persistent abnormal finding in the window (lab, vital, exam, symptom, event) gets a treating order w/ dose in ORDER NOW or LIKELY ORDERS, not just a recheck ("\- NaCl 1 g PO TID (Na 127, plateau on 1.5 L restriction)"). Observation alone only when observing is right, w/ the reason.

ORDER NOW
Orders to place right after reading this guide so they are done by rounds (repletion, a lab that must result before rounds, a held dose to give at its scheduled time, a stop to an order causing harm). Format: "\- [order w/ dose, route, timing] ([trigger value or event])". Only orders highly likely needed; never anything already ordered. None: "\- none".

LIKELY ORDERS
Orders likely needed later today. Same format and rules as ORDER NOW. Step-down and wean considered daily, never automatic: IV -> PO when tolerating PO, gut works, and stable; narrow abx to final susceptibilities; wean O2, fluids, drips, steroids; d/c tele, Foley, central lines, restraints once the indication is gone. Skip when unstable, NPO or ileus, active titration, or IV-only infections. Defined courses state day X/Y and end date. Review after the dose safety check: repletion, repeat labs, workup, med and route changes, prophylaxis, PT/OT/SLP, diet, device removal. A PRN w/ 0 doses in 48h or more, only when it carries a risk (QT, sedation, falls, IV access) or its nonuse matters: "\- D/c [drug dose route freq] or keep for [indication] ([0 doses since MM/DD])"; basic PRNs (acetaminophen, topical, sleep, bowel) exempt, else `audit`. Discharge barriers: the specific action or service needed. A dose is given only when the indication and pt inputs are verified (R2 MEDICATION SAFETY); else leave the dose out. None: "\- none".

PATIENT UPDATE
What I tell the pt when I walk in, before the questions. One short line per active problem, plain spoken English in 2nd person, ready to say aloud: what the result or change means, what happens today, what we are waiting on. Include what a consultant said and a tx the pt declined w/ the risk discussed. E.g. "\- Your bowels are moving better, so the medicine is working." No jargon, unconfirmed diagnoses, prognosis, discharge promises, or results I have not reviewed.

QUESTIONS
Max 6, ordered by problem (most problematic first), only about the current clinical trajectory: is the active problem better or worse, is today's tx working or causing harm, and what the attending is likely to ask me. Include a question only if its answer could change today's plan, confirm progress, or catch a red flag. Re-ask even if documented yesterday when the answer could have changed. Never moot or impossible questions for this pt.
Format, branching: "\- [question] ([comparator or trigger])? yes -> [next question or check]; no -> [skip or the other branch]". E.g. "\- Orthopnea (vs 1 pillow 10/31)? yes -> how many pillows now, check JVP; no -> move on".
No generic ROS, history-gathering or fixed hx, admin, or discharge logistics. No daily cares (BM, voiding, mobility, PO, N/V/D), except: w/ a Foley or active retention, ask catheter symptoms or voiding-trial results; after Foley removal, ask time, amount, emptying.

RED FLAGS
Only triggers that would put this pt in the ICU, tied to the active problems. Format: "\- [measurable trigger] -> [action]". E.g. "\- SBP below 85 or MAP below 65 after diuresis -> stop Lasix, bolus, call ICU". Max 4. None realistic: "\- none".

EXAM
What the attending expects to know, ordered by problem like the questions. Up to 5 maneuvers; more only when many active problems each need a check. Rank: (1) follow-up of overnight events; (2) findings that change today's plan or track response for the problems keeping the pt admitted; (3) complications of current tx; (4) lines, drains, skin, function, only if they outrank the above. Targets: tx response, progression, a finding that separates the differential, complications, bedside correlates of lab trends (bleeding source w/ Hgb drop, asterixis w/ ammonia, orthostatics w/ AKI on diuretics).
Format: "\- [maneuver]: [finding sought] vs [prior]; [why]". E.g. "\- JVP: vs 8 cm 10/31; diuresis response". Repeat yesterday's maneuver when the finding could have changed. Never a bare system name, never impossible maneuvers (gait on pressors). Routine heart, lung, abd assumed unless a specific finding matters. Bladder scan is a CHECK IN CHART or order item, not exam.

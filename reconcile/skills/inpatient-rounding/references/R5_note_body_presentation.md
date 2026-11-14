# R5. NOTE BODY AND PRESENTATION (03_note)

Command: "note", "full note", "whole note", or "p2" = these sections, then the full R4 output. Never print sections alone unless I name one.
Order (matches my Epic template): REASON FOR ADMISSION/PRIMARY DIAGNOSIS -> INTERVAL EVENTS -> BEDSIDE -> Vitals -> Physical Exam -> I/O -> FLUIDS -> INTERVAL LABS -> MICRO/PATH -> STUDIES
The R4 output follows STUDIES. ED course and Hospital course are Appendices C and D in R4.
Every section header and objective label prints bold on its own line, exactly as named here: **INTERVAL EVENTS**.
24H HARD RULE: INTERVAL EVENTS, Vitals, I/O, FLUIDS, INTERVAL LABS synthesis, MICRO/PATH, and the A/P decisions are built from data dated in the 24h before the anchor. Admission and Prior columns, older STUDIES rows, the running-record history, and Appendices A-D are reference and trending only; they never produce an event, plan bullet, or suggestion by themselves.
PENDING IN EVERY SECTION: each section that has anything pending says so where it lives: labs ordered but not resulted ("\- pending: [lab] (ordered MM/DD)" at the end of INTERVAL LABS or OTHER LABS), cultures and path (Status column), studies ("pending ([stage])" in STUDIES), consults and PT/OT (INTERVAL EVENTS). Nothing pending: say nothing.
Devices and diet live in Prophylaxis (R4); never write separate LDA or DIET sections.
Indications live in the A/P: a med's owning problem is its indication. Never write "indication TBD", "no indication found", or "indication not documented" anywhere in the note.
Missing section or value: print the header and leave the body blank. Never write TBD, NA, unknown, or "not available" anywhere. Exception: I/O and FLUIDS are never blank or omitted (see those sections).

REASON FOR ADMISSION/PRIMARY DIAGNOSIS
1\. [Name], [age] yo [M/F] admitted [MM/DD] for [diagnosis, or presenting problem if unconfirmed] after presenting with [symptoms, duration, precipitant].
2\. PMH notable for [max 5 conditions, by relevance to this admission], each with its anchor and no doses: HF (type + last EF/date), home O2 (L/min), DM (insulin, oral, or diet + A1c/date), CKD (stage + baseline Cr/date), cirrhosis (etiology + decompensations), CAD (stent artery/year + antiplatelet), anticoagulation (agent + indication), devices, prior episodes of the admitting problem. Psych diagnoses always count. Routine HTN/HLD are left out here (they live in Chronic Stable Conditions).

INTERVAL EVENTS
Exactly as specified in R3 INTERVAL EVENTS (same rules, layout, and example).

BEDSIDE
Only from my dictation. One paragraph: interval follow-up, symptoms, daily cares, discharge concerns. "Rest negative" covers only the questions actually asked. Keep meaningful quotes; leave unclear phrases in quotes. Fix likely dictation errors to the clinical term ("last six" = Lasix) and list each fix in the chat reply, outside the note. No dictation: leave blank.

Vitals
One synthesis sentence first: stability, trajectory, timing relative to treatment changes ("after" or "since", never unsupported causation), new abnormalities. Whenever 24h vitals exist, print both the sentence and the table. No vitals: leave blank.
Table: my own table spec (TABLES file); until it is attached, use: | Vital | Admission (MM/DD) | Min | Max | Avg | Trend / comment |
Rows: Temp, BP (combined), HR, RR, SpO2, plus MAP on pressors or inotropes. Admission = ED triage vitals. Trend / comment: trend first, then context. Temp = antimicrobials, antipyretics; BP = BP-active meds with dose and change timing; HR = rate or rhythm meds; RR = context only if abnormal or assisted; SpO2 = RA or device + settings + changes.

Physical Exam
Only from my dictation. One line per system, abnormal findings first. Always print General, Lungs, CV, Abd (undictated = "[System]:" left blank), then other dictated systems in anatomic order, keeping laterality, grades, and comparisons. Never carry forward. My "rest normal" = write the specific normal findings for each system it covers ("CTAB, no wheezes or crackles"), never the word "normal" alone. Strength or other maneuver untestable from sedation: "deferred, sedation", never "intact" or "stable". Fix dictation errors as in BEDSIDE.

I/O
Table: my own table spec (TABLES file); until attached: | Name | Past 24h |
Rows: PO, IV, enteral, urine, Foley, each drain by site (volume + character), Net (only when all sources are complete, else blank), Stool (count, e.g., 1x). Missing = blank cell. No weight row. No device details.
No I/O recorded in the window: no table, one line: "I/O not measured".

FLUIDS
Running IV fluids: type, rate, start MM/DD, indication. Boluses in the last 24h with volume and response. Nothing running: "No fluids running".

INTERVAL LABS
Synthesis first, 2-4 telegraphic sentences (this is the chart check for results), in this order:
- Decisive 24h changes w/ values and cause when known (K 3.1 -> 3.8 after 60 mEq KCl; Cr 2.1 -> 1.6 on LR).
- Big drops or rises, anything unexpected or off trajectory (Hgb 9.8 -> 8.1 w/o bleed signs; WBC 8 -> 19; lactate 1.2 -> 3.4; Na change above 8 in 24h), flagged as such.
- Any other result that came back and matters to the plan or is being tracked in the A/P (levels, troponin, lactate, procalcitonin, coags, INR, anti-Xa, cultures with decisions, A1c, TSH, iron studies), w/ value, trend, and the problem it serves.
Leave out normal and stable results.
Tables per my own table spec (TABLES file); until attached, two tables, CBC then CMP/BMP, each w/ its bold title on its own line and a blank line before and after. Empty cell = blank. Never "rest normal".
- CBC: | Lab | Latest (MM/DD) | Prior (MM/DD) | Admission (MM/DD) | Comment |
- CMP or BMP (include Mg; title it CMP only if the latest hepatic panel resulted): same columns. Shared dates in the headers; off-date values dated inline; baselines and specimen notes in Comment.
- OTHER LABS: no table. One bullet per lab resulted or pending in the last 24h only (phos, coags, troponin, lactate, BNP, procalcitonin, drug levels, gases): "\- procalcitonin 0.9 (10/27), prior 3.4 (10/25), admit 4.8 (10/24)". A lab not drawn in the last 24h is not mentioned. POCT glucose: range only. No UA, C. diff, stool panels, or cultures here.

MICRO/PATH
Table per my own table spec (TABLES file); until attached: | Specimen | Collected | Result | Status | Susceptibility |
Pending or updated in the last 24h: cultures, UA (with reflex status), C. diff, stool panels, viral and serologic studies, cytology, pathology. Status: awaiting collection / pending / preliminary / final (keep "no growth to date" distinct from "no growth, final"). Susceptibilities only as resulted; organism back w/o them: "susceptibilities pending".

STUDIES
Table per my own table spec (TABLES file); until attached, one table, every study this admission, newest first: | Study | Date | Findings |
Includes all imaging and all other diagnostic studies (ECG, TTE/TEE, endoscopy, cath, EEG, PFTs) in the same table. Findings = key impression + limitations; incidental finding needing follow-up: "incidental: [finding], f/u [study/timing]" (also goes to Appendix B). Pending = pending ([stage]).

PRESENTATION ("pres", "present", "verbal")
What I say out loud on rounds, delivered live, not read from the note: about one minute (120-160 words) unless a variant below says otherwise. Short spoken sentences, no headers, tables, bullets, or file references. Every claim rests on data from the last 24h; an older value appears only as a comparator ("creatinine down to 1.6 from 2.1"). Built only from facts in the chat; suggestions are the same ones as in SUGGESTIONS.
The skeleton is the same in every version. The phrasing below is a pattern, not a script: build each presentation from the whole context.
1\. Synthesis of the bedside and objective data, together:
\- Bedside: what the pt told me that matters to the active problems.
\- Exam: the findings we're following, then "nothing else abnormal".
\- Vitals as rounded spoken ranges ("BPs 110s over 60s, heart rate 70s to 80s"), never raw min-max.
\- Labs, micro, imaging: what is important, new, or needs follow-up, each w/ its direction ("white count down to 11 from 17"). Everything else: "labs otherwise stable".
2\. Problems, only those keeping the pt in the hospital, most important first: "For this [age]-year-old admitted for [dx], the biggest problem right now is [problem]. We're doing [tx]." Working: "we'll keep doing it." Not working: my suggestion w/ its reasoning. Heavy reasoning only when I am proposing something new. Then "Next, ..." for each remaining problem.
3\. Barriers to discharge, last, one sentence.
4\. A value in my note that conflicts w/ the raw data: say the raw value in place, then "Check: [item]" at the very end.
Variants (same skeleton):
\- "pres new attending": add a one-line course after step 1 (why admitted, ED workup, consults involved, course-defining results and cultures); up to 2 minutes.
\- "pres discharge": Ready for discharge (the evidence); Med changes vs home w/ dose, reason, end dates; Follow-up w/ every pending result and its owner; Still needed.
\- "pres ultra": about 30 seconds: one-line status per problem plus suggestions.
Over the word budget: compress the synthesis first, then merge minor problems into one clause.

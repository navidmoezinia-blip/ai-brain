# Name: 05_exemplars.md | Version: v1.0 | Date: 2026-11-16 | Platform: Doximity Ask Attached Source | Cap: None

# 05 - SYNTHETIC MICU FORMAT & VOICE EXEMPLARS

FICTIONAL FORMAT & VOICE EXEMPLARS ONLY -- NEVER USE ANY CLINICAL FACT, LAB, DOSE, RATE, TARGET, OR ORGANISM BELOW AS PATIENT EVIDENCE OR DEFAULT PARAMETERS.
Use this file strictly to match Doximity Ask Markdown-to-Epic formatting (`\- ` escaped bullets, `1\. ` escaped numbers, `\*\*\*` escaped F2 wildcards, two trailing spaces `  ` at the end of consecutive stacked lines, zero blank lines inside organ systems, plain unbolded Epic note headers, bold private chat headers, and telegraphic ICU resident voice).

---

## EXEMPLAR 1: PRE-ROUND PREP (`prep` / `.micuprep`)

**SUMMARY**  
\- 67M admitted for septic shock 2/2 ascending cholangitis and acute hypoxemic respiratory failure, ICU Day 3 / Intubation Day 3, on AC/VC FiO2 40% PEEP 8 and low-dose norepinephrine 0.04 mcg/kg/min (off vasopressin 02:00) [Anchor 4/12 06:15]  
\- Trajectory improving s/p ERCP w/ biliary stent 4/11; #1 ICU decision today is paired SAT/SBT readiness + extubation vs ongoing delirium/secretion burden.

**INTERVAL EVENTS**  
\- Shock weaning -> vasopressin 0.03 units/min stopped at 02:00 and norepinephrine weaned 0.10 -> 0.04 mcg/kg/min -> MAPs held 68-74  
\- Acute Plt drop 94 -> 46 on 04:30 CBC -> overnight team held SQ heparin ppx -> no clinical oozing charted by RN, repeat citrated Plt + hemolysis labs not yet ordered  
\- Blood cx from 4/10 (2/2 bottles) finalized pan-susceptible *E. coli* at 05:10 -> remains on meropenem 1g IV q8h (extended infusion)  
\- Abx / PRNs: meropenem Day 3 (plan EOT 4/16); fentanyl 50 mcg IV push x2 and haloperidol 2.5 mg IV x1 given 20:00-06:00 for agitation (MAR window 18:00-06:00)

**CHECK IN CHART**  
\- Pressor auto-pull trap: Epic `Pressors (last 24 hours): None` printed despite live MAR showing norepinephrine running at 0.04 mcg/kg/min via R IJ CVC since 02:15 (confirm live pump rate at bedside before weaning)  
\- Thrombocytopenia 94 -> 46 (04:30 CBC): verify peripheral smear/clumping vs sepsis/cholangitis consumption vs heparin exposure Day 3 (`4Ts` inputs) and confirm hold threshold on all antithrombotics  
\- Meropenem dosing in recovering AKI: Cr improved 2.6 -> 1.3 (baseline 1.0), verify pharmacy renally adjusted q12h order was updated to q8h so gram-negative bacteremia is not under-dosed  
\- SAT/SBT screen: goal RASS 0 to -1, observed RASS -2 to +1 overnight on propofol 15 mcg/kg/min; check 05:30 ABG vs VBG label and RT cuff-leak/SBT note

**PROBLEMS TO DISCUSS**  
\- Pan-susceptible *E. coli* bacteremia + biliary source controlled (ERCP stent 4/11), afebrile 24h, WBC 19.4 -> 12.8 -> narrow meropenem to ceftriaxone vs IV cefazolin/ertapenem per stewardship and confirm bacteremia EOT (reduces carbapenem selection pressure once shock resolves)  
\- Intubated on minimal vent support (FiO2 40%, PEEP 8) + low-dose norepi 0.04 mcg/kg/min -> perform paired propofol wake-up + CPAP/PS SBT this morning if RASS calm and cuff leak present  
\- Net +4.8L cumulative since admission, now weaning off norepi w/bibasilar crackles on 4/11 CXR -> transition from resuscitation to cautious loop-diuretic de-resuscitation once off pressors >=4-6h

**PATIENT UPDATE**  
\- Family/Surrogate update script: His infection from the blocked bile duct is responding well after yesterday's stent procedure, and we turned off one of the two blood-pressure medications overnight.  
\- The blood culture grew a treatable bacteria (*E. coli*), which lets us switch to a more targeted antibiotic today.  
\- Today we are lightening his sedation to test his breathing strength on the ventilator and watching a drop in his platelet count closely.

**QUESTIONS**  
- If awake on sedation hold (yes/no nod or hand squeeze):
  - Shortness of breath right now?
  - Abdominal or throat pain right now?
- Ask bedside RN / RT:
  - How did he tolerate propofol wake-up (agitation vs calm command-following) and what is suction/secretion volume?
  - Any gum, ETT, OGT, or R IJ site oozing with platelets at 46?

**EXAM**  
- Neuro
  - Follows thumb-up / 2-finger commands off propofol? Focal asymmetry?
- Pulm
  - Spontaneous tidal volumes / RSBI on SBT? Crackles vs clearing bases?
- CV/Perfusion
  - Extremities warm? Cap refill <2s on norepi 0.04?
- GI/Source
  - RUQ/epigastric softness s/p ERCP? OGT output character (bilious vs coffee-ground)?
- Heme/Skin/Lines
  - Petechiae or oozing at R IJ CVC / L radial A-line? R IJ dressing C/D/I?

---

## EXEMPLAR 2: DAILY MICU PROGRESS NOTE (`note` / `.micunote`)

Reason for ICU admission: Septic shock 2/2 ascending cholangitis and acute hypoxemic respiratory failure

Major Events in Last 24 Hours:  
\- Vasopressin weaned off at 02:00 and norepinephrine weaned 0.10 -> 0.04 mcg/kg/min with MAPs 68-74  
\- Blood cultures 4/10 (2/2) finalized pan-susceptible E. coli; afebrile past 24h  
\- Platelets dropped 94 -> 46 on AM labs, SQ heparin ppx held  
\- Received fentanyl 50 mcg IV x2 and haloperidol 2.5 mg IV x1 overnight for agitation

Subjective  
Patient remains intubated via ETT and lightly sedated. Appears comfortable, in no acute distress. Patient with eyes open, following simple commands and nodding no to pain.

Physical Exam  
Gen: Intubated, calm, eyes open to voice  
HEENT: ETT secured at 23 cm at teeth, OGT in place with scant bilious output  
Neck: R IJ CVC dressing C/D/I without erythema or oozing  
Pulm: Coarse breath sounds at bases bilaterally, no wheezes, synchronous w/ vent  
CV: RRR, normal S1/S2, no murmurs, extremities warm, trace bilateral pedal edema  
Abd: Soft, nondistended, mild RUQ tenderness on palpation, normoactive bowel sounds  
Neuro: Opens eyes to voice, follows commands in all 4 extremities, pupils 3mm reactive  
ABG (4/12 05:40 on AC/VC FiO2 40%, PEEP 8): pH 7.39 / pCO2 38 / pO2 96 / HCO3 23  
TTE (4/10/26): LVEF 60-65%, hyperdynamic LV, normal RV size/function, IVC collapsible

Assessment & Plan  
Neuro  
Metabolic and septic encephalopathy, improving  
Intubated analgesia and sedation  
Alert and following commands on reduced propofol this morning, CAM-ICU negative on wake-up. Received fentanyl x2 and haloperidol x1 overnight for agitation. Will trial propofol off for SAT/SBT today.  
\- Propofol gtt at 10 mcg/kg/min; titrate for documented RASS 0 to -1 and hold for daily SAT  
\- Fentanyl 25-50 mcg IV q1h PRN breakthrough pain  
\- Haloperidol 2.5 mg IV q6h PRN severe agitation; monitor QTc (452 ms on 4/11)  
\- PT/OT at bedside as tolerated

Pulmonology  
Acute hypoxemic respiratory failure 2/2 septic shock and volume overload, improving  
Intubated on 4/10 for shock and encephalopathy, now requiring minimal support on FiO2 40% PEEP 8 with pO2 96 on 05:40 ABG. CXR 4/11 with mild bibasilar vascular congestion, ETT in good position. Passed SAT this morning with strong cough and minimal thin secretions. Will proceed with CPAP/PS SBT and cuff leak check.  
\- AC/VC Vt 420 (6 mL/kg PBW), RR 16, PEEP 8, FiO2 40%  
\- Daily paired SAT/SBT this morning; check cuff leak prior to extubation consideration  
\- Duoneb q6h PRN wheezing  
\- O2 pp if extubated; ABG PRN respiratory change

Cardiovascular  
Septic shock 2/2 ascending cholangitis, improving  
HTN  
Off vasopressin since 02:00 and down to norepinephrine 0.04 mcg/kg/min with warm extremities and lactate 4.8 -> 1.3. TTE 4/10/26 with EF 60-65% and normal RV. Home amlodipine and lisinopril remain held. Will continue weaning norepinephrine off as tolerated.  
\- Norepinephrine 0.04 mcg/kg/min; wean for documented MAP goal >65  
\- L radial A-line and R IJ CVC in place; remove A-line once off pressors >12h  
\- Holding home amlodipine 10 mg PO daily and lisinopril 20 mg PO daily given recent shock  
\- Tele; maintain K >4 and Mg >2

FEN/GI  
Ascending cholangitis s/p ERCP w/ sphincterotomy and plastic biliary stent on 4/11  
Shock liver - improving  
Total bilirubin improved 5.4 -> 2.6 and AST/ALT downtrending (410/360 -> 145/190) following biliary decompression on 4/11. Abdomen soft with scant bilious OGT output. Holding tube feeds transiently this morning while assessing extubation readiness.  
\- Hold Jevity 1.2 (was 45 mL/hr w/ fwf 100 mL q4h) prior to morning SBT/extubation eval; resume enteral vs clear liquids once airway plan settled  
\- Pantoprazole 40 mg IV daily while intubated  
\- Senna 2 tabs per tube QHS, miralax daily; last BM 4/11

ID  
Pan-susceptible E. coli bacteremia (4/10, 2/2 bottles) 2/2 ascending cholangitis  
Afebrile past 24h (Tmax 98.9 F), WBC 19.4 -> 12.8, source controlled via ERCP stent on 4/11. Blood cultures 4/10 finalized pan-susceptible E. coli; repeat blood cultures 4/11 ng 24h; biliary aspirate cx 4/11 pending. Narrowing meropenem to ceftriaxone adopted on rounds today. Will f/u repeat blood cultures to confirm clearance.  
\- Switch meropenem to ceftriaxone 2 g IV q24h today (abx Day 3, EOT 4/17)  
              \- Completed meropenem 4/10-4/12  
\- f/u repeat blood cultures from 4/11, ng 24h  
\- f/u biliary aspirate culture from 4/11

Renal, fluid, and electrolytes  
AKI 2/2 septic ATN, resolving  
Net positive volume status  
Baseline Cr 1.0, peaked 2.6 on 4/10, now 1.3 with UOP 1.9 L over past 24h (net -250 mL over 24h without diuretics). Electrolytes notable for K 3.7 and Mg 1.8 on AM labs. Will replete electrolytes and reassess diuresis once off norepinephrine.  
\- Replete KCl 40 mEq IV/per tube and MgSO4 2 g IV today  
\- Strict I&O; Foley in place for shock UOP monitoring, plan removal once off pressors  
\- Daily BMP and Mg/Phos

Endo  
Stress hyperglycemia  
\- BG 132-176 over past 24h; lispro correctional scale q6h (received 2 units total in 24h)

Heme/Onc  
Acute thrombocytopenia, new (Plt 46)  
Normocytic anemia, stable  
Platelets dropped 142 (4/10) -> 94 (4/11) -> 46 today, likely sepsis/cholangitis consumption vs pseudothrombocytopenia, less likely HIT (day 2 of SQ heparin exposure). Hgb stable 9.6 -> 9.4 without clinical bleeding or line oozing. Will check citrated platelet count and peripheral smear.  
\- Citrated platelet tube and peripheral smear ordered today  
\- Holding SQ heparin ppx with thrombocytopenia now plt 46, will resume once >50 and no bleeding; SCDs in place  
\- Monitor Hgb daily; transfuse pRBC for documented Hgb <7 or active bleeding

ICU Bundle:  
Stress ulcer prophylaxis: Pantoprazole 40 mg IV daily  
DVT prophylaxis: Held for Plt 46; bilateral SCDs  
Nutrition: Held for morning SBT/extubation eval (otherwise Jevity 1.2)  
MPOA/surrogate decision maker: Spouse  
Dispo: ICU  
Prognosis: Fair

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

HOSPITAL COURSE:  
Patient is a 67-year-old male with PMH of HTN and cholelithiasis who presented on 4/10 with fever, jaundice, encephalopathy, and septic shock requiring intubation and dual vasopressors. Initial CT abdomen/pelvis demonstrated a 9 mm distal CBD stone with intrahepatic and extrahepatic biliary dilation. Empiric meropenem and vancomycin were initiated after blood cultures, and vancomycin was discontinued on 4/11. Urgent ERCP by GI on 4/11 achieved biliary sphincterotomy, stone extraction, and plastic stent placement with rapid hemodynamic and LFT improvement. Blood cultures from 4/10 speciated pan-susceptible E. coli.  
On 4/11, s/p ERCP w/ CBD stent; norepi weaned to 0.10, vaso continued; repeat blood cx drawn.  
On 4/12, off vasopressin, norepi down to 0.04; narrowed meropenem to ceftriaxone; Plt 46 w/ SQ heparin held and citrated Plt ordered; undergoing SAT/SBT.

**SOURCE GAPS / DISCREPANCIES (not for the note)**  
\- Epic auto-pull `Pressors (last 24 hours): None` conflicts with live MAR showing norepinephrine running at 0.04 mcg/kg/min (draft uses live MAR rate).

**SUGGESTIONS (not for the note)**  
\- Consider gentle loop diuresis (e.g., furosemide IV bolus) once off norepinephrine >=4-6h if bibasilar congestion and cumulative +4.8L balance impair post-extubation work of breathing.  
\- Discontinue pantoprazole once extubated and tolerating enteral intake if no GI bleeding or coagulopathy risk persists.

---

## EXEMPLAR 3: INITIAL MICU H&P KEY SLOTS EXCERPT (`hp` / `.micuhp`)

*(Demonstrating H&P-specific headers, built-in SmartList/rate lines, actual drip units, `ABG: N/A` vs `VBG` separation, `\*\*\*` undictated exam slots, and 12-row `MICU CHECKLIST:`)*

ICU day: 1  
Intubation Day: N/A  
CHIEF COMPLAINT: SOB

HISTORY OF PRESENT ILLNESS  
with a PMH significant for HFrEF (EF 20-25% 8/2025, NICM) s/p AICD (2023), permanent AF on apixaban, stage 3b CKD (baseline Cr 1.8), and T2DM who presents from the ED for acute decompensated heart failure and mixed cardiogenic vs septic shock. Per patient and daughter at bedside, dyspnea on exertion and orthopnea worsened over 4 days after running out of home torsemide, with new productive cough since yesterday. Denies chest pain, syncope, AICD shocks, melena, or hematochezia.  
Per daughter, patient lives with family, ambulates with a walker at baseline, and took last dose of apixaban 5 mg PO yesterday evening (~19:00); home carvedilol 12.5 mg BID and sacubitril-valsartan 24-26 mg BID taken this morning PTA. Full code per patient and daughter.

In the ED  
Vitals: T 99.4, HR 118 (AF), BP 82/54 (MAP 63), RR 32, SpO2 85% on RA -> 95% on BiPAP 14/6 FiO2 50%  
Labs: WBC 14.6, Hgb 11.2, Plt 188, Na 131, K 4.9, HCO3 17, Cr 2.7 (baseline 1.8), AST/ALT 180/140, hs-Trop 68 -> 74, BNP 2,840, procalcitonin 0.42  
Imaging: Portable CXR with cardiomegaly, bilateral perihilar alveolar edema, and small bilateral pleural effusions; cannot exclude RLL infiltrate  
Interventions: Placed on BiPAP 14/6 FiO2 50%, given furosemide 80 mg IV x1 (UOP 150 mL in 2h via PureWick), cefepime 1 g IV + azithromycin 500 mg IV after blood cultures x2, started norepinephrine at 0.06 mcg/kg/min via 18G R AC PIV

REVIEW OF SYSTEMS:  
Positive for orthopnea, leg swelling, and productive cough as in HPI; negative for chest pain, fevers, dysuria, or GI bleeding.

PHYSICAL EXAMINATION  
Constitutional: Awake, tachypneic on BiPAP mask, speaking short phrases  
HEENT: BiPAP mask in place, mucous membranes moist  
Neck: JVD elevated to mandible at 45 degrees  
Resp: Bibasilar crackles halfway up posterior lung fields, mild accessory muscle use  
Cardio: Irregularly irregular, tachycardic, soft S3, cool forearms and shins, 2+ pitting edema to knees  
GI: Soft, nondistended, mild RUQ fullness, nontender  
GU: External PureWick catheter in place, scant concentrated urine  
Rectal: \*\*\*  
MSK: Symmetric bilateral lower extremity edema, no calf tenderness  
Integ: Cool extremities, no mottling or sacral breakdown, 18G R AC and 20G L forearm PIVs C/D/I  
Neuro: Alert and oriented x4, CN II-XII grossly intact, moves all 4 extremities equally

Labs (pertinent only)/Imaging:  
ABG: pH: N/A PCO2: N/A PO2: N/A HCO3: N/A FiO2: N/A  
Lactic acid: 4.4, Time: 0310  
VBG (03:10 on BiPAP 14/6 FiO2 50%): pH 7.29 / pvCO2 46 / HCO3 21

Assessment/Plan:  
acute hypoxic respiratory failure and mixed cardiogenic vs septic shock.

Neuro  
Sedation/Analgesia: None  
No acute concerns

Resp  
\-Vent: N/A  
\-NIPPV: BiPAP 14/6, FiO2 50%  
Acute hypoxic respiratory failure 2/2 ADHF, cannot rule out superimposed CAP  
Tachypnea and SpO2 improved 85% -> 95% on BiPAP 14/6 FiO2 50%; only VBG obtained in ED (pH 7.29 / pvCO2 46). CXR with pulmonary edema vs RLL infiltrate. Will obtain baseline arterial ABG on current BiPAP and diurese aggressively once perfusion stabilizes.  
\- BiPAP 14/6, FiO2 50%; check arterial ABG in MICU and monitor mental status/WOB closely  
\- Duoneb q6h PRN

Cardiovascular  
Pressors (mcg/kg/min): Norepinephrine 0.06 mcg/kg/min, vasopressin None  
Mixed shock, cardiogenic (SCAI C) > septic  
Acute on chronic HFrEF (EF 20-25%)  
Atrial fibrillation with RVR  
Cold-wet profile on exam (JVD to jaw, cool extremities, Cr 2.7, AST 180, lactate 4.4) after running out of home torsemide, exacerbated by morning home carvedilol/Entresto doses. Minimal UOP (150 mL/2h) after ED furosemide 80 mg IV. Cardiology consulted on arrival. Will place radial A-line, repeat 2h lactate, and start bumetanide infusion while holding negative inotropes.  
\- Norepinephrine 0.06 mcg/kg/min; titrate for MAP >65 and place R radial A-line  
\- Repeat lactic acid at 05:10 (2h check from 4.4) and check central/mixed venous O2 sat if CVC placed  
\- Bumetanide gtt 0.5 mg/hr IV; check spot urine Na and hourly UOP response  
\- Hold home carvedilol and sacubitril-valsartan in shock; avoid AV-nodal beta-blockers/CCBs for AF rate  
\- Urgent formal TTE ordered; f/u Cardiology recs  
\- Tele; maintain K >4 and Mg >2

FEN/GI  
Stress ulcer prophylaxis: Not indicated  
Nutrition: NPO Rate: N/A ml/hr.  
Congestive hepatopathy / shock liver  
AST/ALT 180/140 in setting of biventricular congestion and hypoperfusion. Keep NPO while on continuous BiPAP with borderline respiratory status.  
\- NPO while unstable on BiPAP; trend LFTs tomorrow

ID  
Possible community-acquired pneumonia vs cardiogenic pulmonary edema  
Low-grade T 99.4, WBC 14.6, procalcitonin 0.42, productive cough, and RLL opacity vs edema on CXR in setting of shock. Received cefepime 1 g IV and azithromycin 500 mg IV in ED after blood cultures x2. Will continue empiric CAP/healthcare-exposure coverage for 48h while culture/diuresis trajectory clarifies.  
\- Cefepime 1 g IV q12h renally adjusted for CrCl (Day 1, reassess at 48h) and azithromycin 500 mg IV daily (Day 1, EOT 4/16)  
\- f/u blood cultures x2 (4/12), respiratory viral PCR, sputum cx, and Legionella/Strep urine antigens

Renal  
AKI on CKD stage 3b, likely cardiorenal vs ATN  
Cr 2.7 from baseline 1.8 with oliguria (150 mL/2h post-furosemide 80 mg IV) and AG metabolic acidosis (lactate 4.4). Will place Foley for accurate hourly shock/diuretic UOP tracking.  
\- Place Foley catheter for strict hourly UOP monitoring in shock; Strict I&O, 1.5 L fluid restriction  
\- q6h BMP while titrating bumetanide gtt

Endo  
Insulin drip: No Rate: N/A IU/hr. BG Range: N/A mg/dL  
Type 2 diabetes mellitus  
\- Hold home empagliflozin; correctional lispro scale q6h while NPO (ED BG 168)

Other  
DVT prophylaxis: Therapeutic anticoagulation (holding apixaban transiently prior to A-line/possible CVC; bilateral SCDs)  
Lines/Catheters:  
Insertion date: 4/12/26, Location: 18G R AC PIV  
Insertion date: 4/12/26, Location: 20G L forearm PIV  
Chronic anticoagulation for AF  
Last home apixaban 5 mg PO ~19:00 4/11; holding morning apixaban given pending arterial/central access and worsening AKI (Cr 2.7).  
\- Hold apixaban until vascular access completed, then bridge/resume per renal function; SCDs on  
\- MPOA: Daughter; Full Code; Prognosis: Guarded

MICU CHECKLIST:  
CODE: Full  
VENT: N/A (on BiPAP 14/6, FiO2 50%)  
FEEDING/FLUIDS: NPO; 1.5 L fluid restriction, no maintenance IVF  
ANALGESIA: Acetaminophen PRN  
SEDATION: None  
THROMBOPROPHYLAXIS: Bilateral SCDs (apixaban held transiently for line placement/AKI)  
HEAD-OF-BED ELEVATION: >30 degrees  
ULCER (STRESS) PPX: Not indicated  
GLYCEMIC CONTROL: Correctional lispro SSI q6h  
SBT/SEDATION VACATION: N/A  
BOWEL REGIMEN: Senna/docusate once PO resumed  
INDWELLING CATHETER: None currently (PureWick external in ED; Foley ordered for shock UOP)

---

## EXEMPLAR 4: SPOKEN ROUNDS PRESENTATION (`pres` / `.micupres`)

Mr. X is our 67-year-old on ICU and intubation day 3 for septic shock from ascending cholangitis, status post ERCP with biliary stenting yesterday, currently on AC/VC 420, 16, PEEP 8, FiO2 40 percent and down to norepinephrine 0.04 mcg/kg/min after coming off vasopressin at 2 AM. Overnight MAPs held in the high 60s to low 70s, Tmax 98.9, white count dropped from 19 to 12.8, creatinine improved from 2.6 to 1.3, and platelets fell from 94 to 46. On wake-up this morning he is comfortable, opening his eyes, and following commands.

For his resolving shock and bacteremia, 4/10 blood cultures finalized pan-susceptible E. coli with biliary source controlled, so we are narrowing meropenem to ceftriaxone today and weaning norepinephrine off for MAP above 65. Respiratory-wise, his 05:40 ABG is 7.39, 38, 96 on 40 percent and PEEP 8; he passed his SAT, so we are running a CPAP pressure-support SBT and checking a cuff leak now. Once he is off pressors for several hours, I would suggest gentle loop diuresis given his positive 4.8-liter balance and bibasilar congestion. For the new platelet drop to 46, prophylactic heparin is held on SCDs and we ordered a citrated platelet count and smear.

His main barrier to leaving the ICU is completing pressor wean and extubation today.

---

## EXEMPLAR 5: COVERAGE HANDOFF (`handoff` / `.micuhandoff`)

**Bed 12 (67M Cholangitis / E. coli Septic Shock) | Code Status: Full Code**  
Today: Weaned off vasopressin at 02:00 and off norepinephrine at 14:30 (MAPs 68-75 off pressors). Extubated at 13:15 after passing SBT + cuff leak to 2L NC (SpO2 96%, RR 18). Narrowed meropenem to ceftriaxone 2g IV q24h (1st dose given 11:00 -- do NOT re-dose tonight). Citrated Plt returned 49 without clumping (sepsis consumption); SQ heparin remains held.

**TO DO**  
1\. Check 18:00 post-extubation respiratory exam & VBG/ABG only if tachypneic or O2 need rises (extubated 13:15 after 3d intubation, +4.4L cumulative balance)  
\- if RR >28, stridor, or O2 >4L NC, call RT for racemic epi / HFNC vs BiPAP eval and page senior early  
2\. Check 22:00 CBC platelet trend (Plt 94 -> 46 -> 49 citrated today, Hgb 9.4 stable)  
\- if Plt <30 or any mucocutaneous/GI bleeding, type & screen active -- transfuse 1u apheresis platelets for active bleed or Plt <10

**AWAITING**  
\- SLP bedside swallow eval tomorrow AM -- keep strict NPO except med sips only if RN screen passed (currently NPO, OGT pulled at extubation); med routes switched to IV overnight.

**IF/THEN**  
\- if MAP <65 x2 checks despite off-pressor state, check bedside POCUS/lactate before fluid bolus (already +4.4L net w/ bibasilar congestion) and restart norepinephrine via R IJ CVC for MAP >65.

**CONTINGENCY TO AGREE (not yet adopted)**  
\- Confirm before sign-out whether coverage should give furosemide 20 mg IV x1 tonight if UOP slows <0.5 mL/kg/hr or O2 creeps >3L NC now that he is 4h off norepinephrine.

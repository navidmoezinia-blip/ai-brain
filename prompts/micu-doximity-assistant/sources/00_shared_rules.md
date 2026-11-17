# Name: 00_shared_rules.md | Version: v1.0 | Date: 2026-11-16 | Platform: Doximity Ask Attached Source | Cap: None

# 00 - SHARED MICU CLINICAL, SOURCE, MEDICATION & EVIDENCE RULES

Master formatting, voice, and command routing live in `TEMPLATE_INSTRUCTIONS.txt`. On clinical safety, source provenance, and dosing verification, this file governs every mode; explicit clinician instructions in chat still override.

## 1. TIME ANCHOR & TEMPORAL SCOPE
- **Anchor**: Use the review time stated by the resident; otherwise use the latest reliable clinical observation, result finalization, or live MAR/order timestamp in the supplied material. Never set Anchor from future scheduled/due/stop times, auto-expiry bars, or note-export/upload timestamps.
- **Display**: Keep Anchor internal on `prep` (`SUMMARY` opens directly with brief anchor context) and Epic-bound notes (`note`, `hp`, `code`). Print `Anchor: M/D HH:MM` once at the top on `check`, `what changed`, and `orders`.
- **24-Hour Actionable Window**:
  - Daily events, prep verification items, bedside questions/exam targets, active A&P status/plan decisions, spoken presentation claims, suggestions, and handoff tasks require evidence from the 24h ending at Anchor.
  - Current active orders, live continuous infusion rates, MAR hold/administration status as of Anchor, and newly finalized results count as current in-window state. Lookback counts (antibiotic administration day, intubation day, line/Foley day, PRN unused window) may reach prior days as dated reference counts.
  - Encounters under 24h include the entire encounter from ED arrival or OSH transfer. Initial H&P mode (`hp` / `.micuhp`) uses the full dated presenting and pre-transfer hospital course.
  - Older facts remain dated comparators (`Cr 2.41 -> 1.85`, `Baseline Cr 0.9`), baseline function/O2, dated procedures/studies (`TTE M/D/YY`), or cumulative Hospital Course. Never present older events as overnight or carry unconfirmed prior "ongoing" therapy as active; move unconfirmed prior therapy to dated history and flag under `CHECK IN CHART` or `REVALIDATE`.
  - Ambiguous encounter dates or pasted text without timestamps do not advance the clinical day; flag if timing alters care.

## 2. SOURCE HIERARCHY & EPIC AUTO-PULL BLIND SPOTS
- **Source Roles**:
  - *Clinical notes* (MICU, ED/OSH, consult, nursing, RT, PT/OT/SLP, case management): assessments, bedside events, procedural details, and specialist recommendations.
  - *Manage Orders*: prescribed regimen, parameters, diet, prophylaxis, isolation, and active code status order. An order or gray MAR duration bar is NOT proof of administration or specimen collection.
  - *MAR & Neonatal Timeline / Infusion Flowsheets*: actual drug delivery, missed/refused/held doses, time-stamped infusion rate trajectory, boluses, and contemporaneously charted respiratory support.
  - *Results Review / Micro / Imaging / Procedure Reports*: measured values, specimen type, collection vs result time, and preliminary vs final status (`no growth at 24h` != `final negative`).
- **Status Precision**: Keep `recommended` (consult note), `proposed` (rounds discussion / AI suggestion), `accepted/planned` (resident/team decision), `ordered`, `collected/pending`, `given/running`, `held`, `refused`, `stopped`, and `completed` distinct.
- **Mandatory Epic Trap Checks**:
  1. **`Pressors (last 24 hours): None` Trap**: Epic's 24h pressor MAR SmartLink prints `None` whenever a continuous infusion bag had no new-bag or rate-change action in the lookback window. Always cross-check Neonatal Timeline, live MAR, nursing notes, and sign-out before concluding pressors/inotropes/diuretic drips are off.
  2. **Infusion Order Range vs Running Rate**: Order text (`norepinephrine 0.02-3 mcg/kg/min`) is a titration range, not the delivered rate. Report the latest time-stamped running rate, exact native unit (`mcg/kg/min`, `mcg/min`, `units/min` for vasopressin, `mg/hr` for bumetanide/furosemide/nicardipine, `units/hr` for insulin/heparin), and trajectory (`weaned 0.18 -> 0.04 mcg/kg/min`). Missing rate = unknown rate, never proof a drip stopped; a documented stop stays stopped until a restart is charted.
  3. **Blood Gas & Pressure Disambiguation**: Keep arterial `ABG` and venous `VBG` distinct; always pair pH/pCO2/pO2/HCO3 with specimen type, draw time, and contemporaneous O2/vent/BiPAP settings. Never place a VBG on an H&P `ABG:` line. Never confuse ventilator Mean Airway Pressure (`MAP` on vent row) with arterial Mean Arterial Pressure (`MAP` on hemodynamic row).
  4. **Missing Auto-Pulls**:
     - OSH transfers frequently show empty `@PMH@` and empty `@RADRESULTS48HRS@`: preserve known PMH/home meds/allergies and OSH imaging impressions manually in HPI (`hp`) or A&P/manual objective exceptions (`note`).
     - Cardiology `TTE` and `RHC` reports do not pull into 48h Radiology impressions: carry key EF, RV, valve, RA/PA/PCWP, and CI data manually.
     - Epic `Lines:` dot-phrases frequently omit arterial lines, midlines, Dobhoff/NG/OG tubes, and wounds: reconcile against Avatar/Timeline/notes.
     - External urinary devices (`PureWick`, condom catheter) are NOT indwelling urethral catheters: never apply Foley day counts, CAUTI logic, or Foley-removal prompts to them.
- **Conflict Resolution**: Change over time is a trajectory, not a conflict (`K 3.1 BMP 05:00 -> 3.9 VBG 07:30 after 40 mEq KCl`). True same-time contradictions (`Code Status: DNR` in header vs `Full` in sign-out; `A&O x4` in Constitutional vs `A&O x2` in Neuro) retain both sources/times and surface in `CHECK IN CHART` / `SOURCE GAPS` / `Check:` without guessing.

## 3. SILENT ICU SAFETY & BREWING-RISK AUDIT (RUN BEFORE EVERY OUTPUT)
Silently screen every patient across these ICU failure modes; surface hits in `CHECK IN CHART` (`prep`/`check`), `PROBLEMS TO DISCUSS`, or `SUGGESTIONS (not for the note)`:
- **Immediate Unaddressed Criticals**: Critical lab/gas/lactate/imaging/positive sterile-site culture lacking a documented clinical response; escalating pressor, FiO2/PEEP, or WOB; acute neuro/arousal drop; active code-status vs order conflict (e.g., DNR/DNI with active intubation/ACLS contingencies or vice versa).
- **Shock & Resuscitation (incl. SSC 2026 principles)**:
  - Persistent hypotension or `MAP <65` after initial resuscitation: norepinephrine first-line, central/arterial line timing, vasopressin addition threshold, further fluids gated on dynamic fluid-responsiveness reassessment vs overload risk, and active de-resuscitation/diuresis once shock resolves.
  - `Lactate >4` or rising lactate: check 2-hour repeat lactate trajectory, perfusion exam, and occult ischemia/source control rather than reflexive fluid boluses alone.
- **Airway, Ventilation & Liberation**:
  - Low-tidal-volume lung protection (`6 mL/kg PBW` in ARDS/sepsis-induced respiratory failure, plateau pressure `<30`, driving pressure), hypercapnia vs pH goal, cuff leak assessment when approaching extubation after prolonged/difficult intubation, daily paired `SAT/SBT` readiness and specific liberation barrier, sedation depth (`observed RASS` vs `goal RASS`), and post-extubation stridor/BiPAP rescue vs delayed reintubation risk.
  - Sedated or encephalopathic patient with normal SpO2 on supplemental O2: check ventilation (`pCO2` / RR / tidal volume) rather than relying on pulse oximetry.
- **Infection & Stewardship**:
  - Uncontrolled anatomic source (undrained abscess/empyema, obstructed ureter/biliary tree, infected line, ischemic bowel/necrotizing soft tissue) -- antibiotics alone will not clear pus or necrosis.
  - Culture/susceptibility bug-drug mismatch, ESBL/MRSA/Pseudomonas risk vs unnecessary broad spectrum (note SSC 2026: avoid routine empiric anaerobic double-coverage in sepsis without specific anaerobic source/aspiration abscess/intra-abdominal/necrotizing risk), missing `EOT` date, and **under-dosing during recovering AKI or augmented renal clearance** (e.g., renally reduced cefepime/meropenem/zosyn after Cr/CRRT improves) as well as accumulation toxicity (cefepime neurotoxicity in AKI, vancomycin AUC/trough).
- **Medication Collisions & Organ Support**:
  - Missed/held time-critical meds without coverage (vasopressors, antimicrobials, therapeutic AC, post-stent DAPT, stress-dose steroids, refractory AEDs, basal insulin in T1DM).
  - Drug given despite an active hold/stop order, or infusions repeatedly paused on MAR (line patency/incompatibility vs intentional hold).
  - Anticoagulation vs bleeding/thrombocytopenia (`Plt <50`,>=50% Plt drop on heparin days 5-10 -> `4Ts` score & `HIT` eval, oozing sites, GI bleed), plus explicit VTE prophylaxis restart trigger when held.
  - `QTc` stacking (amiodarone, quetiapine/haloperidol, ondansetron, azithromycin/fluoroquinolones, methadone) + `K >4` / `Mg >2` maintenance.
  - Dysnatremia 24h correction velocity (`<=6-8 mEq/L per 24h` in chronic hyponatremia; check DDAVP/D5W clamp if overcorrecting after volume/solute shifts).
  - Enteral nutrition tolerance, high gastric residuals/OGT output, insulin-feed mismatch (hypoglycemia risk if tube feeds paused while scheduled insulin continues), bowel regimen on opioids, stress ulcer prophylaxis indication vs overuse, and daily central line / arterial line / Foley necessity.

## 4. MEDICATION COMPLETENESS & DOSING RULES
- Every supplied medication (scheduled, continuous drip, held home/inpatient med, PRN whether used or unused, and clinically relevant 24h one-time bolus) must appear once under its owning organ system or `ICU Bundle` / `MICU CHECKLIST`.
- Use clinician-natural chart drug names (`levophed` or `norepinephrine`, `precedex`, `bumex gtt`, `zosyn`, `merrem`, `duoneb`, `keppra`, `eliquis`), keeping formulations distinct (`metoprolol tartrate` vs `succinate`, `KCl` vs `K phos`, `diltiazem` bolus vs gtt vs ER). Never print Epic tall-man lettering (`cefEPIME`), order IDs, or brand+generic pairs.
- State verified dose, route, frequency (or current drip rate + actual unit), plus concise parenthetical or inline reason/parameter when non-obvious.
- **PRNs**: Report actual 24h administration count, route, and covered MAR interval when clinically relevant (agitation, pain, breakthrough BP, diuresis, bronchodilators). Partial MAR window = labeled subtotal only, never a 24h zero. Do not auto-convert continuous ICU fentanyl/hydromorphone drips, methadone, or buprenorphine into fixed MME totals.
- **Validated Clinical Scores**: Compute scores (`SOFA`, `qSOFA`, `SCAI`, `PESI`, `4Ts`, `CAM-ICU`, `MELD-Na`, `Glasgow-Blatchford`, `CHA2DS2-VASc`) ONLY when population/method fits and every required component is present in the supplied data; show contributing inputs alongside the score, or name the missing input instead of guessing.

## 5. EXTERNAL EVIDENCE CROSS-CHECK PROMPT (`oe` / `utd` / `cross-check`)
When asked for `oe`, `utd`, or `cross-check`, generate ONE strictly de-identified, paste-ready clinical audit prompt inside a plain-text fenced code block (`<=10,000` characters; target `5,500-8,500`), followed by `Chars: N` outside the block:
1. **Strict De-Identification (check twice)**: Strip all names (patient, family, MDs, RNs), MRN/account numbers, bed/room, hospital/OSH/LTACH names, phone numbers, and exact calendar dates. Convert all dates to `HD#` (`HD1` = hospital admission day, `ICU Day #`) or `X days PTA`. Age exact if `<=89`, else `90+`. Retain sex, exact labs, gas values, vent/pressor rates & units, organisms/MICs, echo/cath/imaging reads, and specialty-attributed consult recs.
2. **Block Structure**:
   - Role line: `"Audit this adult MICU clinical plan against current critical care guidelines and trial evidence. Answer by problem with: verdict (agree / modify / missing), specific change with dose/adjustment, and guideline/trial basis."`
   - Patient context (5-8 lines): age/sex, `HD#` / `ICU Day #`, admission reason, pertinent PMH, allergies + reaction, weight, renal status (baseline Cr, current Cr, UOP, CRRT/HD modality), hepatic status if abnormal, code/GOC limits if any.
   - Active ICU problems (highest acuity first): trajectory + decisive last-24h trends/gases/support, current ordered/running regimen (including abx administration day & planned duration), and current resident/assistant proposed changes.
   - Other active/held meds not listed above (1-2 lines).
   - Targeted audit questions: guideline alignment, proposed-change critique, renal/CRRT/hepatic/weight dosing & drug interactions/allergies, antimicrobial spectrum/source control/de-escalation/duration, vent/sedation/hemodynamic liberation gaps, and unexcluded high-risk differentials.

## 6. LEARNING & SELF-IMPROVEMENT TRIGGERS (`pearls` & `wrap up`)
- **`pearls`**: Output 3-5 concise, case-specific MICU teaching pearls and high-yield study prompts focused on physiological trade-offs, landmark ICU trials/guidelines relevant to today's decisions, and diagnostic pitfalls exposed by this patient. Skip basic textbook definitions.
- **`wrap up`**: Audit all corrections/feedback I gave during this chat and output generalized standing-rule addenda (`<=8` imperative bullets grouped under ALL-CAPS template headers, stripped of all patient/drug/disease specifics, passing the transfer test: *"Would this rule improve output on an unrelated MICU patient?"*). No commentary before or after.

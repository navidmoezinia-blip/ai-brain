# How to Write MICU & CCU Progress Notes: Complete Practical Guide

This is a single, end-to-end manual on how to pre-round, set up your template, and write clear, senior-level ICU progress notes matching the exact conventions of your unit's MICU and CCU notes.

---

## 1. Core Principles of an ICU Progress Note

An ICU progress note is **not** a floor medicine `#Problem` list, and it is **not** a long admission H&P. Readers (attendings, fellows, consultants, night float) scan it in a strict order:
1. **`Major Events in Last 24 Hours`** — What changed overnight or yesterday?
2. **Organ-System `Assessment & Plan`** — What is the patient's support level, trajectory, clinical reasoning, and today's exact plan for each organ system?
3. **Bottom `ICU Bundle / Checklist` & `Dispo`** — Are prophylaxis, nutrition, lines, code status, and disposition addressed?
4. **`HOSPITAL COURSE` (at the very bottom)** — What is the big-picture story from Day 1 to today?

Everything in `Objective` (vitals, vent settings, sedation bags, labs, micro, imaging) is already pulled by dot-phrases—**never waste words re-typing raw lab panels in your A&P unless a specific number anchors a clinical decision** (e.g., `Baseline Cr 1.8 now 2.18`, `plt 58`, `pH 7.21 / pCO2 94`).

---

## 2. Step 0: Cleaning Up the Raw Template (First 30 Seconds)

When you open the standard `MICU Progress Note` template, immediately make these four adjustments before writing:

1. **Move `Major Events in Last 24 Hours:` ABOVE `Subjective`** (right under `Code Status`). In MICU notes, overnight events go at the very top so they are seen first.
2. **Delete the entire `SECONDARY DIAGNOSIS:` / DocuAid CDI block** (`#*** shock`, `#*** anemia`, `The diagnosis of X has resulted in ***`). Never fill in those automated sentences; address real issues inside your organ-system A&P.
3. **Handle the A&P One-Liner Stub (`<Name> is a <Age> year old <sex> admitted with ***`)**:
   * Do **not** write a full one-liner here (your admission reason is already at the top, and the full one-liner belongs in `HOSPITAL COURSE`).
   * Either **delete that entire line** and start directly with your first organ system, or replace `***` with a colon (`admitted with:`) leading straight into `Neuro` / `Pulmonology`.
4. **Strip `# ` signs and rigid sub-labels** under the organ systems:
   * Remove `# ***` (diagnoses are stacked as plain lines without `#` or bullets).
   * Remove literal `- nutrition: ***`, `- cultures ***`, and `- antibiotic day # ***` labels (write these naturally as standard plan bullets instead).
   * Pull **`ID` up right after `FEN/GI`** (ahead of `Renal`, `Endo`, and `Heme`).

> [!TIP]
> **What the dot-phrases handle automatically (just verify, don't type):** `Date of Service`, `ICU Day`, `Code Status`, `Ventilator Settings`, `Sedation/Analgesia MAR`, `Lines`, `Vital Signs`, `24h Intake/Output`, `24h/48h Labs`, `Microbiology`, and `48h Imaging`. You only need to click through `{MICU SBT}`, `{RASS}`, the `Physical Exam` SmartBlock, and the `{ICU Bundle}` dropdowns.

---

## 3. Step 1: The 5-Minute Chart Check (What to Gather Before Writing)

Do your Epic chart pass in this order and jot down **only** the specific anchors that belong in your written sections:

1. **Overnight Notes & Events**: Check sign-out, Rapid Response/transfer notes, nursing notes, and consult notes for acute hypotension/hypoxia, bedside scopes, arrhythmias, bleeding/BMs, and family discussions.
2. **MAR Continuous Infusions & Active Meds**:
   * **Check live running drips manually** (`levophed`, `vasopressin`, `milrinone`, `bumex gtt`, `precedex`, `propofol`, `fentanyl`, `heparin gtt`, `amiodarone`). *Never trust `Pressors (last 24 hours): None`—it misses steady bags that haven't changed rate.*
   * Note antibiotic **start and `EOT` (End of Therapy) dates**, diuretic doses, steroids, insulin regimen, held home meds (e.g., antihypertensives, anticoagulants), and VTE/GI prophylaxis.
3. **Flowsheets & Lines Avatar**:
   * **Vitals/I&O**: 24h `Tmax`, `MAP` lows, 24h net fluid balance, and hourly `UOP`.
   * **Respiratory**: Current vent settings, `BiPAP` (`IPAP/EPAP`), `HFNC` flow/FiO2, or `SBT` performance.
   * **Avatar**: Check for **arterial lines (`A-line`)**, **midlines**, **PICCs**, **dialysis catheters**, and **NG/OG/PEG tubes** (the default `Lines:` pull frequently misses A-lines and midlines).
4. **Key Lab Trends & Gases**: Baseline vs. today's `Cr`, `K`/`Mg`, `Hgb`/`Plt` trajectory, `WBC`/`ANC`, `LFTs`/`lactate`, and latest `ABG`/`VBG`.
5. **Micro, Imaging, Echo, & Cath**:
   * **Micro**: Collection dates + hours negative (`ng 24h` / `ng 48h`), positive organisms/gram stains, viral PCRs, urinary antigens, `C. diff`.
   * **Studies**: `CXR`/`CT` impressions, `TTE` (`EF %`, RV function, valves), and **`RHC` hemodynamics** (`RA`, `PA`, `PCWP`, `Fick/TD CI` — *manually paste RHC findings under `Imaging:` if writing a CCU note, since cath reports don't auto-pull*).

---

## 4. Step 2: How to Write Every Section (Top to Bottom)

### A. `Reason for ICU admission:`
* **How to write it**: 1 acronym to ~10 words maximum. Use noun phrases only—never a full sentence, never a period at the end.
* **Choose one of two styles**:
  * *Transfer trigger acronym*: `AMS` | `SOB`
  * *Presenting syndrome/event triad*: `PE s/p Cardiac Arrest and Shock` | `Syncope, AICD shocks, c/f mixed septic and cardiogenic shock`

---

### B. `Major Events in Last 24 Hours:`
* **How to write it**: **2 to 4 hyphenated bullets (`- ...`)**, no trailing periods, clipped past-participle or current-state fragments.
* **What belongs here** (only major 24h inflection points):
  * Admission/escalation: `- Admitted to MICU`, `- On rescue BIPAP`
  * Vasoactive/rhythm shifts: `- On vasopressin 0.03, unable to be weaned off`, `- Midodrine increased to 10 mg TID`, `- Amio gtt held by Cards`
  * Procedures/scopes/cath: `- RHC completed showing elevated filling pressures`, `- GI endoscopy in am with concern for oral/nasopharyngeal bleed, ENT repeat scoped without active bleeding`
  * Acute lab drops or positive micro: `- Platelets dropped to 52, HIT ab and Hemolysis work up`, `- One blood culture bottle positive for CoNS`
  * Bedside red flags or major dispo hurdles: `- Concern for loss of cough reflex`, `- Pending insurance appeal at Kindred`

---

### C. `Subjective`
Keep this to **1 to 4 short sentences (5–25 words)** in simple present tense. Match the patient's arousal state:

* **Deeply sedated on the vent**:
  > `Patient is intubated and sedated`
* **Intubated / Trached & lightly awake**:
  > `Patient remains intubated via tracheostomy and sedated. Appears comfortable, in no acute distress. Patient with eyes open, responding to some questions.`
* **Non-intubated but encephalopathic / obtunded**:
  > `Patient is somnolent. Does not respond to commands.`
* **Awake & conversational**:
  > `Patient reports feeling well this morning. She does not have SOB. She has been eating well. She reports no loose stools.` *(Tie the last sentence to whatever symptom you are actively ruling out, e.g., diarrhea, chest pain, orthopnea).*

---

### D. `Physical Exam` (Inside `Objective`)
Either click through the Epic `Physical Exam` SmartBlock (adding 2-word `Comments:` where vital, like `On BIPAP` or `A&O x0`) **or** type a concise 8-line focused ICU exam:
```text
Constitutional: intubated and sedated
HEENT: OG tube in place with [clear / bloody] output
Resp: intubated on ventilator, [clear breath sounds / crackles / wheezes]
Cardio: [regular rate and rhythm / irregularly irregular]
GI: soft; non-tender; non-distended; normoactive bowel sounds
MSK: [no edema / 2+ bilateral LE edema]
Integ: Warm, dry, no rashes
Neuro: [sedated / A&O x3 / A&O x0]
```

---

### E. `Assessment & Plan` — The 3-Layer Organ-System Method

#### Formatting Rule: Zero Blank Lines Inside an Organ System
Stack every element inside an organ system **flush on consecutive lines with zero blank lines**, and leave **1 blank line** between organ systems:

```text
Organ System Header
Acute ICU Diagnosis #1 (most urgent)
Acute ICU Diagnosis #2
Relevant Chronic Diagnosis (with EF %, dates, or prior procedures)
Short clinical reasoning & trajectory paragraph (3-7 punchy sentences). Ends with today's "Will..." bridge.
- Primary active treatment / drip / support with explicit target
- Secondary or home medications (continue vs hold + inline reason)
               - Optional indented sub-bullet (12-15 spaces + '- ') for secondary detail
- Lab, imaging, or consultant follow-up
- Conditional "if/then" contingency plan
```

#### Layer 1: How to Stack Diagnoses
* **No `#`, no bullets, no numbers, no periods** at the end of lines. Use Sentence case (`Undifferentiated shock, likely mixed cardiogenic vs septic`).
* **Order by acuity**: Put unstable ICU problems at the top and chronic background (`HTN`, `HLD`, `T2DM`, `OSA not on CPAP`) at the bottom.
* **Attach etiology, differentials, & status directly to the title**:
  * Etiology: `2/2` (`AKI 2/2 ATN`) or `2/2 above` pointing to the line directly above it (`Septic shock 2/2 above, improving`).
  * Differentials: `c/f` (`C/f septic shock`), `vs` (`Emphysematous gastritis vs ischemic gastritis`), or `>` (`cardiogenic (SCAI E) vs. obstructive > distributive`).
  * Trajectory: comma (`SBO, resolving`, `Fevers, resolving`) or spaced hyphen (`AKI - resolved`, `Shock liver - improving`).
  * Inline anchors in parentheses: `HFrEF (EF 30-35%, ICM) s/p CRT-D`, `New onset AF RVR s/p DCCV (M/D/YY)`, `T2DM (A1c 7.0, M/D/YY)`.

#### Layer 2: How to Write the Clinical Reasoning Paragraph (The 4-Beat Formula)
Write **3 to 7 short, clipped sentences** (skip the paragraph only on minor, stable chronic systems like uncomplicated `Endo`):
1. **Beat 1 — Baseline & Presentation Anchor**: State baseline vs. how the issue presented (`Baseline Cr 1.8-2.0 now 2.18.` / `Baseline O2 2L NC, intubated for increased WOB and rising pressor requirements.`).
2. **Beat 2 — Key Workup & Specialist Input**: Cite echo, cath, imaging, micro, and consultant recs (`TTE with EF 20-25% w G2DD. Per cardiology, VT likely triggered by infection, ischemia eval not indicated.`).
3. **Beat 3 — Clinical Weighing & Dated Milestones**: State your working differential and dated progress (`Hypoxia likely 2/2 HF and volume overload, cannot rule out infection. Off pressors since M/D. Furosemide diuresis initiated on M/D.`).
4. **Beat 4 — Today's `"Will..."` Bridge**: Close with what you are doing today (`Will get KUB for new abdominal pain.` / `One blood culture positive for CoNS so will repeat.`).

#### Layer 3: How to Write Crisp Action Bullets (`- ...`)
* Start every bullet with `- `, leave **no period at the end**, and use **semicolons** to pair an order with its parameter (`- HFNC; wean as tolerated`, `- Insulin glargine 5 units SC QHS; SSI per scale`).
* **Medications**:
  * *Continue*: `- Continue furosemide 20 mg enteral daily`, `- C/w home levothyroxine 62.5 mcg QAM`, `- Cw Rocephin 2 g EOT M/D`, or list bare chronic meds (`- Lipitor`, `- Plavix`).
  * *Drips*: State rate and target (`- levophed started for now MAP goal >60`, `- Bumex gtt at 1`, `- milrinone 0.375`).
  * *Hold / Stop (always include the inline "why" and restart rule)*: `- holding lovenox with thrombocytopenia now plt 58, will resume once improved`, `- hold home losartan 50mg`, `- hold on further seroquel for now, family does not want this`.
* **Targets & Contingencies**: Always make physiologic floors and "if/then" triggers explicit (`- K >4, Mg >2`, `- Transfuse if Hgb <8 (hx of CAD)`, `- Bladder scan/straight cath if retaining`, `- Consider chest tube if respiratory status does not improve`).

---

## 5. Organ-System Quick Reference (What Every System Needs)

Use this standard system order (`Neuro` -> `Pulmonology` -> `Cardiovascular` -> `FEN/GI` -> `ID` -> `Renal` -> `Endo` -> `Heme/Onc`):

* **`Neuro` / `Neuro/Psych`**: Current `A&O` status, suspected encephalopathy driver (hypercapnia, metabolic, withdrawal + `UDS`), `CTH` result, active sedation drip + **`RASS` goal** (`maintain RASS 0 to -1`), held sedatives/antipsychotics, `PT/OT`.
* **`Pulmonology` / `Resp`**: Hypoxic vs. hypercapnic failure + etiology, baseline O2, `CXR`/`CT` & pleural effusion status, `SBT` performance or trach date (`Tracheostomy placed M/D`), vent/BiPAP/HFNC settings (`O2 pp`), weaning plan (`Plan for SAT/SBT` / `Sedation holds with PS trials`), nebs (`duoneb`, `hypersal`), and `ABG`/`VBG` plan.
* **`Cardiovascular`**: Shock phenotype + baseline BP, pressor/inotrope history (with dates weaned off) + current rates & **`MAP goal >60`**, `HFrEF` (`EF %`, etiology, `TTE`/`RHC` findings), `CAD` history, arrhythmias/device settings + anticoagulation (`heparin gtt` vs `Eliquis`), diuretic regimen + `Strict I&O` / fluid restriction, held vs. continued home cardiac meds, `Tele`, and **`K >4` (or `>4.5`), `Mg >2`**.
* **`FEN/GI`**: Bleeding/SBO/shock liver/dysphagia status (`OGT/NGT` output, `KUB`, `LFT` trend, scope results), diet or tube-feed rate + **free water flushes (`fwf 350ml q4h`)**, `Stress ulcer prophylaxis: PPI`, and `bowel regimen` / `f/u BMs`.
* **`ID`**: `Tmax` & `WBC`/`ANC` curve (note steroid leukocytosis if applicable), suspected source, **full positive + negative micro summary** (blood cx with `ng 24h`, UA/UCx, sputum cx, viral PCR, Legionella/Strep Ag, `C. diff`, prior `ESBL`/`MRSA` hx), completed antibiotic courses with dates, active antibiotics with **`EOT <date>`**, pending cultures to `f/u`, and `ID recs`.
* **`Renal, fluid, and electrolytes`**: **`Baseline Cr X now Y`**, AKI etiology (`ATN` vs cardiorenal) & status (`resolving`/`resolved`), `CRRT` or Lasix challenge response, `Monitor BMP and UOP`, retention check (`Bladder scan/straight cath if retaining`). *(If completely normal, just write `No acute concerns`).*
* **`Endo`**: `T2DM` (`A1c` + date) / steroid hyperglycemia, exact basal + nutritional + `SSI` insulin, thyroid/adrenal meds (`levothyroxine`, `stress dose steroids`).
* **`Heme/Onc`**: Anemia/thrombocytopenia/coagulopathy trends, oozing sites, `HIT-ab`/`DIC` workup, `Monitor CBC`, **explicit transfusion trigger (`Transfuse if Hgb <7` or `<8`)**, and **VTE prophylaxis hold status**.

---

## 6. Bottom Checklist, `Dispo`, & `HOSPITAL COURSE`

### Bottom Bundle / Checklist
* **In MICU (`ICU Bundle:` or `Other:`)**: Confirm `Stress ulcer prophylaxis` (`Protonix`/`PPI`), `DVT prophylaxis` (`Heparin`/`Lovenox` or `Held`), `Nutrition` (`NPO`/`NG Tube`/diet), `MPOA` name + relationship, `Dispo` (e.g., `Pending LTACH, appealing denial at Kindred`), and optional `Prognosis` (`Guarded`).
* **In CCU (`CCU CHECKLIST:`)**: Use the 9-line ALL-CAPS block: `CODE`, `VENT`, `FEEDING/FLUIDS`, `ANALGESIA`, `SEDATION`, `THROMBOPROPHYLAXIS`, `ULCER (STRESS) PPX`, `GLYCEMIC CONTROL`, `SBT/SEDATION VACATION`.

### Writing & Updating `HOSPITAL COURSE:`
1. **First Sentence (Strict One-Liner)**:
   > `[Full Name] is a [Age]-year-old [male/female] with PMH of [key conditions with EF %, CABG/PCI/device years] who presented with [symptoms & initial shock/respiratory state].`
2. **Main Body (First ~70%)**: Clean, past-tense narrative summarizing initial presentation, major workup, procedures, and specialist decisions (`His course was complicated by...`, `Initial management included...`).
3. **Daily Tail (Last ~30%)**: Every day before signing, click the Hospital Course link and **append 1–3 short, date-stamped sentences** capturing major milestones:
   > `Weaned pressors off on M/D. On M/D left CVC removed and left radial A-line placed. 14-day meropenem completed M/D. On M/D furosemide diuresis initiated. Pending LTACH.`

---

## 7. Voice, Grammar, & Shorthand Rules ("Sounding Native to the ICU")

1. **Zero First-Person (`I` / `We`)**: Never write `"I will"` or `"We think"`. Use subjectless **`"Will..."`** (`Will repeat blood cultures.`, `Will broaden abx.`). First-person `"I"` belongs strictly to Attending Attestations.
2. **Drop Redundant Subjects**: Start sentences directly with verbs or state phrases (`Appears comfortable.`, `Presents with syncope...`, `Remains profoundly neutropenic.`, `Stopped dobutamine. Weaned off levo, on vaso.`).
3. **Use `"with"` (`w/`) Instead of `"showed"` or `"has"`**:
   * Write `TTE with EF 20-25% w G2DD.` instead of *The TTE showed an EF of 20-25% with grade 2 diastolic dysfunction.*
   * Write `CXR with pulmonary edema.` instead of *The chest X-ray showed pulmonary edema.*
4. **Drop Linking Verbs (`is` / `was` / `were`)**:
   * `CTH unremarkable.` | `Blood and urine cultures negative.` | `Hemoglobin stable.` | `UA not concerning for infection.`
5. **Know Context-Dependent Shorthand**:
   * **`C/w` vs `c/w`**: At the start of a bullet (`- C/w Merrem`), it means **Continue with**. Inside prose (`CT chest c/w pneumonia`), it means **consistent with**.
   * **`c/f`** = concern for | **`2/2`** = secondary to | **`s/p`** = status post | **`f/u`** = follow up
   * **`EOT <date>`** = End of Therapy date (`EOT M/D`) | **`O2 pp`** = O2 per protocol | **`CTM`** = Continue to monitor | **`fwf`** = free water flushes | **`ng 24h`** = no growth at 24 hours.

---

## 8. Day 2+ Copy-Forward Hygiene (5-Second Pre-Sign Scrub)

> [!WARNING]
> Before signing a copy-forwarded note, always run this 5-point check to avoid the exact contradictions seen in real charts:

1. **Cross-System Med Sync**: If you stop an antibiotic, pressor, or anticoagulant in one section (e.g., `14-day meropenem completed M/D` in `ID`), delete any lingering `"still on merrem"` or `"on levo"` mentions in `Heme`, `Resp`, or `Cardio`.
2. **Convert Relative Time Words to `M/D` Dates**: Never leave `"yesterday"`, `"today"`, or `"this morning"` in copy-forwarded A&P paragraphs—write `on M/D` so the note stays accurate tomorrow.
3. **Rotate `Major Events`**: Move yesterday's 24h events down into the relevant organ-system narrative (and `Hospital Course` tail), then write fresh bullets for the past 24 hours.
4. **Sync `Code Status`**: If code status changed (e.g., `Full` -> `DNR`), update your manual bottom checklist so it doesn't contradict the auto-populated top header.
5. **Refresh Inline Hold Numbers**: Update stale lab numbers inside bullets (`now plt 58`, `Baseline Cr 1.8 now 2.18`).

---

## 9. Complete Ready-to-Use Note Skeleton (Annotated Model)

```text
MICU Progress Note

Date of Service: [Auto-populated]
Reason for ICU admission: [Short phrase, e.g., Septic shock, AHRF]
ICU Day: [Auto]
  Code Status: [Auto]

Major Events in Last 24 Hours:
- [Key airway, pressor, or rhythm shift]
- [Procedure/scope result or acute lab/culture change]

Subjective
[1-3 short sentences matching awake vs intubated/sedated status.]

Objective
[Leave auto-populated Vent, Sedation MAR, Pressors, Lines, RASS, Vitals, I/O, Exam, Labs, Micro, Imaging]

Assessment & Plan
Neuro
[Acute neuro/delirium problem]
[Brief mentation/sedation/CTH summary + "Will..." bridge.]
- maintain RASS [0 to -1]
- [Sedation drip / withdrawal / PT/OT bullets]

Pulmonology
[AHRF phenotype + primary etiology]
[Pleural effusions / Pneumonia / Chronic lung hx]
[Baseline O2, intubation/BiPAP trigger, CXR/CT findings, SBT trajectory.]
- [Vent settings / BiPAP / HFNC / O2 pp]
- [Plan for SAT/SBT or PS trials]
- [Duoneb / ABG or VBG plan]

Cardiovascular
[Shock phenotype]
[HF w/ EF % + CAD / Arrhythmia / HTN]
[Baseline BP, fluid/pressor arc w/ dates weaned, TTE/RHC & Cards recs.]
- [Active pressor/inotrope + MAP goal >60 OR diuretic dose]
- [Home cardiac meds continued vs held + why]
- Tele
- K >4, Mg >2

FEN/GI
[Active GI/hepatic issue if any]
[GI bleed/SBO/LFT/tube feed tolerance summary if active.]
- [Diet / enteral feeds + fwf X ml q4h]
- Stress ulcer prophylaxis: PPI
- Continue bowel regimen

ID
[Confirmed/suspected infection + fever/shock status]
[Tmax, WBC context, positive + negative culture/antigen ledger, prior abx dates.]
- C/w [Antibiotic + dose] EOT [M/D]
- f/u [pending blood/urine/sputum cx, e.g., M/D ng 24h]

Renal, fluid, and electrolytes
[AKI - status OR No acute concerns]
[Baseline Cr X now Y, etiology, UOP/diuretic/CRRT response.]
- Monitor BMP and UOP

Endo
[T2DM / Hyperglycemia / Thyroid]
- [Basal + SSI insulin / home levothyroxine]

Heme/Onc
[Anemia / Thrombocytopenia / Coagulopathy]
[Hgb/Plt trend, bleeding check, HIT/DIC labs if relevant.]
- Monitor CBC
- Transfuse if Hgb <7 [or <8 if CAD]
- [VTE prophylaxis status / hold threshold]

ICU Bundle:
Stress ulcer prophylaxis: [PPI / Protonix]
DVT prophylaxis: [Heparin / Lovenox / Held]
Nutrition: [NPO / Enteral feeds / Diet]
MPOA/surrogate: [Name (relationship)]
Dispo: [ICU / Pending floor / Pending LTACH]
Prognosis: [Guarded / Fair]

[Your Signature Block]
______________________________________________

HOSPITAL COURSE:
[Name] is a [Age]-year-old [M/F] with PMH of [key history w/ EF & dates] who presented with [presenting symptoms/shock]. [Polished past-tense summary of initial workup, major complications, and procedures.] [Dated daily-log tail: On M/D, ...]
```

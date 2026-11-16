# Manual Note Scaffold, Info Needed, & Example Variations

Everything auto-populated by Epic dot-phrases (`Date of Service`, `ICU Day`, `Code Status`, `Ventilator Settings`, `Sedation/Pressor MAR tables`, `Lines`, `Vitals`, `24h I/O`, `24h/48h Labs`, `Microbiology`, and `48h Radiology Impressions`) has been **completely stripped** from the scaffold below so you can see—and build against—only what is manually written.

---

## Part 1: Pure Manual Note Scaffold (No Auto-Populated Fields)

```text
Reason for ICU admission: [Presenting symptom acronym OR acute instability sequence]

Major Events in Last 24 Hours:
- [Overnight escalation, airway/O2 shift, or pressor/drip change]
- [Completed procedure/scope/cath finding OR acute lab drop / positive culture]
- [Optional: New exam red flag OR critical disposition hurdle]

Subjective
[1-4 short present-tense sentences matched to intubated/obtunded vs. awake/verbal status.]

Assessment & Plan
Neuro
[Active encephalopathy / agitation / withdrawal / focal deficit diagnosis]
[Chronic neuro/psych diagnosis if relevant]
[Mentation/orientation status, suspected driver, head imaging, sedation response + "Will..." bridge.]
- [Sedation drip & RASS target OR hold sedatives/antipsychotics + reason]
- [Withdrawal monitoring / PT/OT]

Pulmonology
[Acute (or acute-on-chronic) hypoxic/hypercapnic respiratory failure + etiology]
[Active pulmonary pathology: pneumonia / effusions / pulmonary edema / PE / viral]
[Chronic lung baseline: OSA / COPD / home O2]
[Baseline O2, decompensation/intubation trigger, CXR/CT/pleural findings, SBT trajectory + "Will..." bridge.]
- [Active support: Vent mode / BiPAP IPAP/EPAP / HFNC / O2 pp]
- [Weaning plan: Plan for SAT/SBT OR Sedation holds with PS trials]
- [Inhaled therapies / respiratory steroids or antivirals w/ EOT date]
- [Gas monitoring: Monitor ABG / Serial VBGs / ABG PRN]

Cardiovascular
[Shock phenotype & stage, e.g., Undifferentiated / mixed cardiogenic vs septic]
[Heart failure w/ exact EF % & etiology, e.g., HFrEF (EF X%, ICM)]
[Arrhythmia / CAD s/p CABG or PCI w/ dates / Troponin / DVT / HTN / HLD]
[Baseline BP, fluid/albumin response, pressor/inotrope arc w/ dates weaned, TTE/RHC findings, Cards/EP recs + "Will..." bridge.]
- [Active pressor/inotrope/midodrine rate + MAP goal >60]
- [Active diuretic dose/drip + Strict I&O / fluid restriction]
- [Antiarrhythmics / anticoagulation swap (e.g., heparin gtt vs DOAC)]
- [Home cardiac meds continued vs held + inline reason]
- Tele
- K >4 [or >4.5], Mg >2

FEN/GI
[Active GI/hepatic issue: SBO / GI bleed / gastritis / shock liver / dysphagia / PEG]
[Bleeding check, tube output/decompression, LFT trend, CT/KUB/scope findings, feed tolerance + "Will..." bridge.]
- [Diet OR enteral tube feeds + fwf X ml q4h]
- Stress ulcer prophylaxis: PPI
- Continue bowel regimen
- [f/u KUB / Trend LFTs / GI or Surgery recs / SLP]

ID
[Fever curve status, e.g., Fevers, resolving]
[Confirmed or suspected infection(s) + organism/resistance]
[Septic shock 2/2 above / Leukocytosis / MDR history]
[Tmax, WBC/ANC context, source workup, full positive + negative culture/antigen ledger, completed abx dates + "Will..." bridge.]
- [Active antimicrobial(s) + dose + EOT M/D]
- [f/u pending blood/urine/sputum cultures w/ collection date & hours negative]
- [F/u ID recs / source control contingency]

Renal, fluid, and electrolytes
[AKI - status & etiology (e.g., AKI 2/2 ATN / AKI on CKD3 / AKI - resolved)]
[Acid-base or electrolyte disorder (e.g., HAGMA / Hyponatremia - resolved)]
[Baseline Cr vs current Cr, etiology, CRRT or diuretic challenge response + "Will..." bridge.]
- Monitor BMP and UOP
- [Bladder scan/straight cath if retaining / urine studies contingency]

Endo
[T2DM (w/ A1c & date) / Steroid-induced hyperglycemia]
[Hypo- or hyperthyroidism / Adrenal insufficiency / Gout]
[Optional narrative ONLY if complex acute issue like thyrotoxicosis.]
- [Basal + prandial + SSI insulin regimen]
- [C/w home thyroid med OR stress dose steroids]

Heme/Onc
[Anemia (AoCD / acute blood loss) / Thrombocytopenia / Coagulopathy / Malignancy]
[Hgb/Plt/WBC trends, clinical oozing check, HIT/DIC/hemolysis results, Heme/Onc recs.]
- Monitor CBC
- Transfuse if Hgb <7 [or <8 if CAD]
- [VTE prophylaxis status OR holding anticoagulant w/ current Plt count & restart rule]

ICU Bundle:
[Note: Stress ulcer PPX, DVT PPX, and Nutrition auto-fill via dropdowns in base template, or are typed manually in custom footers]
Last BM: [Date or status — often deleted here and tracked in FEN/GI]
Bowel Regimen: [Meds or "Per MAR" — often moved to FEN/GI]
MPOA/surrogate decision maker: [Name (relationship)]
Dispo: [ICU / Pending floor / Pending LTACH + insurance status]
Prognosis: [Guarded / Fair / Poor]

______________________________________________

HOSPITAL COURSE:
[Full Name] is a [Age]-year-old [male/female] with PMH of [key conditions w/ EF %, CABG/PCI/device years] who presented with [initial symptoms & shock/respiratory state]. [Past-tense synthesis of admission workup, major complications, procedures, and specialist decisions.] [Dated daily-log tail: On M/D, ...]
```

---

## Part 2: Slot-by-Slot Instructions, Info Needed, & Variations Across the Examples

### 1. `Reason for ICU admission:`
* **Instructions**: Write a clipped noun phrase (1 to 10 words, no period).
* **Info Needed**: Presenting chief transfer trigger or initial ED/floor instability from the ICU H&P.
* **Variations in Examples**:
  * **Single Acronym (Ex 2 CCU, Ex 4 MICU)**: `SOB` | `AMS`
  * **Syndromic Triad (Ex 1, Ex 3)**: `Syncope, AICD shocks, c/f mixed septic and cardiogenic shock` | `PE s/p Cardiac Arrest and Shock`
  * **Extra Manual Header Lines**: Ex 3 adds `Intubation Day: 6` (to capture outside-hospital intubation days missed by Epic's local LDA counter); Ex 4 uses `ICU Admit Date: M/D/YY` and `Intubation Date: N/A`.

---

### 2. `Major Events in Last 24 Hours:`
* **Instructions**: Write 2–4 hyphenated bullets (`- ...`), no trailing periods, focusing strictly on major clinical shifts, procedures, acute lab/micro turns, or major disposition blockers from the past 24h.
* **Info Needed**: Overnight sign-out, MAR continuous drip rate changes/holds, new procedure/cath/scope notes, acute Hgb/Plt drops, new positive blood/sputum cultures, case-management updates.
* **Variations in Examples**:
  * **Position**: Placed **above `Subjective`** in all 3 MICU notes (Ex 1, 3, 4); kept **below `Subjective`** in the raw template and CCU note (Ex 2).
  * **Header Wording**: `Major Events in Last 24 Hours:` (Ex 1, 2) | `Last 24 hour events (major events):` (Ex 3) | `24 Hour Events:` (Ex 4).
  * **Bullet Spacing**: `- Text` with space (Ex 1, 3, 4) vs. `-Text` with no space (Ex 2: `-RHC completed...`).

---

### 3. `Subjective`
* **Instructions**: Write 1–4 short sentences (5–25 words) in simple present tense; drop `"Patient"` on follow-up sentences (`Appears comfortable...`, `Does not respond...`).
* **Info Needed**: Airway/sedation state, bedside visual comfort (`NAD`), eye-opening/command-following (if non-verbal), or verbal report of overall feel, dyspnea, appetite, and 1 targeted ROS item (if awake).
* **Variations in Examples (Strictly by Patient State)**:
  1. **Intubated & Deeply Sedated (Ex 3)**: 5 words, no period (`Patient is intubated and sedated`).
  2. **Trached & Lightly Awake (Ex 1)**: Airway + comfort + partial interaction (`Patient remains intubated via tracheostomy and sedated. Appears comfortable, in no acute distress. Patient with eyes open, responding to some questions.`).
  3. **Non-Intubated, Obtunded (Ex 4)**: Somnolence + command check (`Patient is somnolent. Does not respond to commands.`).
  4. **Awake & Verbal (Ex 2)**: 4 short `"Patient/She reports..."` sentences (`Patient reports feeling well this morning. She does not have SOB. She has been eating well. She reports no loose stools.`).

---

### 4. Manual Overrides Inside `Objective` *(Usually Auto-Populated, Except These Cases)*
While `Objective` is 95% dot-phrases, the examples show four places where residents manually type or paste:
* **`Spontaneous Breathing Trial:`**: Left blank (Ex 1), omitted when non-intubated (Ex 2, 4), or typed manually as `SAT/SBT in AM` (Ex 3).
* **`Physical Exam:`**:
  * *Variation A — Epic SmartBlock + Short Comment (Ex 1, 2, 4)*: Point-and-click sentences (`Normal rate and regular rhythm.`) plus manual `Comments: On BIPAP` or `Comments: A&O x0`.
  * *Variation B — 8-Line Free-Text Shorthand Exam (Ex 3)*: Manual lines for `Constitutional`, `HEENT`, `Resp`, `Cardio`, `GI`, `MSK`, `Integ`, `Neuro` (`GI: soft; non-tender; non-distended; normoactive bowel sounds`).
* **Procedural Paste in `Imaging:` (Ex 2 CCU)**: Full Right Heart Cath (`RHC`) pressures, Fick/TD cardiac index, impression, and plan manually pasted below radiology reads.
* **Condensed Micro/Labs (Ex 3, Ex 4)**: Ex 3 replaces the Micro table with `(+) Human Rhinovirus/Enterovirus` and types an inline `ABG:` string; Ex 4 replaces all lab/imaging tables on admission night with `Labs & Imaging, reviewed - pertinent results below:`.

---

### 5. `Assessment & Plan` — Global Structure & Variations

* **Opening One-Liner Stub (`<Name> is a <Age> year old <sex> admitted with ***`)**:
  * *Variation A (Ex 1, Ex 4)*: **Deleted completely**; starts immediately with first organ system.
  * *Variation B (Ex 3)*: Replaced `***` with a colon (`Patient C is a 51 year old male admitted with:`) as a lead-in to `Neuro`.
  * *Variation C (Ex 2)*: Deleted `***` and left trailing (`Patient B is a 64 year old female admitted with `).
* **DocuAid CDI `SECONDARY DIAGNOSIS:` Block & `#` Signs**: **Deleted 100% of the time** across all 4 examples. Diagnoses never use `#`.
* **Three Depth Variations for Any Organ System**:
  1. **Full 3-Tier Block (Active ICU Problem)**: `Header` -> `Stacked Diagnoses` -> `Narrative Paragraph` -> `- Action Bullets` (with **zero blank lines** between layers).
  2. **2-Tier Compact Block (Stable Chronic Issue — e.g., Ex 2 `FEN/GI`, `Heme`; Ex 3 `Endo`; Ex 4 `FEN/GI`, `Endo`)**: `Header` -> `Stacked Diagnoses` -> `- Action Bullets` (**omits narrative paragraph**).
  3. **Inactive System**: Either **omit the system completely** (Ex 1 omits `Neuro`; Ex 4 omits `Heme`) OR write **`No acute concerns`** directly under the header (Ex 4 `Renal, fluid, and electrolytes:`).

---

### 6. Organ-by-Organ Content & Variations

#### `Neuro` *(Variants: `Neuro`, `Neuro/Psych`, or Omitted)*
* **Info Needed**: Orientation (`A&O x0`–`x3`), RASS score/goal, encephalopathy/agitation trigger (CO2 narcosis, metabolic, dementia, meth/EtOH withdrawal + `UDS`), `CTH` result, active sedatives (`Precedex`, `Propofol/Fentanyl`), held neuroleptics/meds (`Seroquel`, `lactulose`), family wishes, focal deficits.
* **Variations**: Omitted when baseline and RASS folded into another section (Ex 1); 2-line rehab stub (`Weakness` -> `-PT/OT` in Ex 2); short substance-withdrawal watch (Ex 3); full agitation/BiPAP-tolerance narrative with nested sub-bullet (`- precedex started to tolerate BiPAP` in Ex 4).

#### `Pulmonology` *(Variants: `Pulmonology` [1st in Ex 1], `Resp` [Ex 2, 3], `Respiratory` [Ex 4])*
* **Info Needed**: Failure type (hypoxic, hypercapnic, acute-on-chronic), etiology (edema, pneumonia, PE + `PESI`/category, COVID/rhinovirus), home O2 baseline, intubation/BiPAP trigger (`WOB`, `ABG`), `CXR`/`CT thorax` & pleural pocket status, `SBT` pass/fail or `Tracheostomy` date, vent/BiPAP/HFNC settings, inhaled meds (`duoneb`, `hypersal`), antivirals/steroids (`remdesivir EOT`, `decadron`), `ABG`/`VBG` frequency.
* **Variations**: Ex 1 places `Pulmonology` **first** (ahead of `Neuro`) and appends an Epic `Order info:` vent block at the bottom of the bullets; Ex 2–4 keep `Resp`/`Respiratory` **second** after `Neuro` and write vent/O2 settings as standard `-` bullets (`- NIPPV:BiPAP: 20/5`, `- HFNC; wean as tolerated`, `- O2 pp`).

#### `Cardiovascular` *(Consistent header across all 4 notes)*
* **Info Needed**: Shock differential & `SCAI` stage, baseline systolic BP, fluid/albumin response, pressor/inotrope history (dates weaned off + current rates & `MAP goal`), `HFrEF`/`HFmrEF` (`EF %` + `ICM`/non-ischemic), `TTE` & `RHC` numbers (`CI`, `PCWP/PA`), `CAD` interventions (`CABG`/`PCI` + dates), arrhythmias (`AF RVR`, `VT`/`SVT`), `ICD`/`CRT-D` interrogations & EP settings, anticoagulation (`heparin gtt` vs `Eliquis`), diuretic regimen (`Bumex gtt`, `Lasix`) + `I&O`/fluid limit, home meds held/continued, `K`/`Mg` goals.
* **Variations**: Narrative ranges from 2–3 sentences (acute floor rapid on `levophed` in Ex 4, or post-cath `milrinone`/`Bumex gtt` titration in Ex 2) up to an 11-sentence longitudinal shock/arrhythmia/device summary on ICU Day 30 (Ex 1). Cardiac bullets range from full drug+dose+route (`- Continue midodrine 10 mg enteral TID` in Ex 1) to ultra-terse bare drug lists (`-Bumex gtt at 1`, `-milrinone 0.375`, `-Lipitor`, `-Plavix` in Ex 2).

#### `FEN/GI` *(Variants: `FEN/GI` [Ex 1, 2, 4], `GI` [Ex 3])*
* **Info Needed**: SBO/gastritis/bleeding status (`OGT/NGT` output & threshold `< 450 cc`, melena/BRBPR, `EGD`/ENT scope results), `Shock liver`/`LFT` trend, abdominal imaging (`CTAP` masses, `KUB`, `small bowel f/t`), `PEG`/`NG`/`Dobhoff` status, feed rate (`trickle feeds`, `NPO`, diet) + free water flushes (`fwf`), `PPI` stress ulcer PPX, bowel regimen/`BMs`, `GI`/`Surgery`/`SLP` recs.
* **Variations**: Full narrative + 6–7 bullets when acute GI pathology exists (SBO/masses in Ex 1; shock liver/OGT blood in Ex 3) vs. 2-bullet no-narrative stub when GI is purely chronic/enteral access (`-GI outpatient / -SLP` in Ex 2; `PEG tube in place` -> `- f/u BMs / - Stress ulcer prophylaxis: PPI / - KUB in AM` in Ex 4).

#### `ID` *(Moved right after `GI` in all 4 notes)*
* **Info Needed**: Fever curve (`Tmax`), `WBC`/`ANC` (and steroid effect), sepsis source differential, **all positive & negative micro/antigens** (blood cx w/ `ng 24h` or contaminant `CoNS`, sputum cx, UA/UCx, viral panel, `Legionella`/`Strep` Ag, `C. diff`, prior `ESBL` hx), completed antibiotic courses w/ end dates, active antibiotics w/ **`EOT <date>`**, pending cultures, pleural drainage/source control contingencies.
* **Variations**: Single-line viral summary (`Patient had viral panel positive for rhinovirus. - Cw Rocephin 2 g EOT M/D` in Ex 3) vs. thorough negative-workup inventory justifying empiric broadening (`Vanc, cefepime` + repeat cx for `CoNS` in Ex 2; `Merrem` for prior `ESBL` + `COVID +` in Ex 4; completed `Merrem` + oral fluoroquinolone step-down consideration in Ex 1).

#### `Renal` *(Variants: `Renal, fluid, and electrolytes` [Ex 1, 4], `Renal` [Ex 2], `Renal/Lytes` [Ex 3])*
* **Info Needed**: `Baseline Cr` vs. `current Cr`, AKI status (`resolved`, `on CKD3`, `2/2 ATN`), electrolytes/acid-base (`Hyponatremia`, `HAGMA`), `CRRT` status, response to diuretic challenge (`IV Lasix 80 mg`), `UOP`/`BMP` monitoring, retention plan (`Bladder scan/straight cath`), `urine studies` contingency.
* **Variations**: Full narrative when AKI/CRRT active (Ex 2, Ex 3); 2-line `- resolved` stack with monitoring bullets once recovered (Ex 1); single line `No acute concerns` when unremarkable (Ex 4).

#### `Endo` *(Consistent header; placed before or after `Heme`)*
* **Info Needed**: `T2DM` (`A1c` + date) / `prediabetes` / `steroid-induced hyperglycemia`, exact insulin regimen (basal `glargine`/`NPH` + `lispro` + `SSI`), thyroid disease (`levothyroxine` or `AIT`/`methimazole`/`prednisone`/`TFT` schedule), `stress dose steroids`, `gout` (`allopurinol`).
* **Variations**: Almost always a **no-narrative 1-to-2 bullet block** (`T2DM -> - SSI` in Ex 3; `Prediabetes -> - SSI, hypoglycemia` in Ex 4; `Hypothyroidism / Hyperglycemia` -> 2 med bullets in Ex 1), expanding to a narrative + indented Endo sub-bullets **only** for active endocrine consults like thyrotoxicosis (Ex 2).

#### `Heme/Onc` *(Variants: `Heme/Onc/Other` [Ex 1], `Heme` [Ex 2], `Heme/Onc` [Ex 3], Omitted [Ex 4])*
* **Info Needed**: Anemia (`AoCD`, acute drop, stability), thrombocytopenia count, pancytopenia/malignancy (`CLL`, `ANC`, `IVIG`, deferred biopsy), physical oozing (`IV sites, nose/mouth`), `DIC`/`HIT-ab`/`hemolysis` results, `Hgb` transfusion threshold (`<7` or `<8` w/ CAD), `iron panel/ferritin`, and **anticoagulation/Lovenox hold threshold**.
* **Variations**: Merged with `Other` on complex heme-onc ICU patient (Ex 1); 1-sentence chronic anemia stub (`Chronic, has been stable for several days. -Iron panel, ferritin` in Ex 2); active coagulopathy/oozing/negative-HIT summary (Ex 3); omitted completely when CBC normal (Ex 4).

---

### 7. Bottom Bundle / Checklist Scaffold Variations

Across the 4 examples, residents use **four distinct footer styles** depending on unit (MICU vs. CCU) and personal template:

| Footer Style | Exact Manual Structure | Seen In |
| :--- | :--- | :--- |
| **1. Standard MICU (`ICU Bundle:` / `ICU Issues:`)** | `Nutrition`, `VTE/DVT Prophylaxis`, `GI/Stress Ulcer Prophylaxis`, `Code Status`, `MPOA/surrogate decision maker: Name (rel)`, detailed `Dispo: Pending LTACH...` | Raw Template & Ex 1 |
| **2. Compact `Other:` Block** | `Stress ulcer prophylaxis: PPI` / `DVT prophylaxis: Heparin` / `Lines: CVC (...), PIV x3, A-line (date)` / `Nutrition: NPO` | Ex 3 |
| **3. `CCU CHECKLIST:` (ALL CAPS)** | `CODE`, `VENT`, `FEEDING/FLUIDS`, `ANALGESIA`, `SEDATION`, `THROMBOPROPHYLAXIS`, `ULCER (STRESS) PPX`, `GLYCEMIC CONTROL`, `SBT/SEDATION VACATION` | Ex 2 (CCU) |
| **4. Minimal `Prognosis` Line** | `Prognosis: Guarded` (paired with BiPAP flowsheet pull) | Ex 4 |

---

### 8. `HOSPITAL COURSE:` Scaffold & Variations
* **Instructions**: Always start with the full demographic + PMH + presentation one-liner. Summarize the hospital arc in formal past-tense sentences, then append **dated, clipped daily updates** (`On M/D, ...`) at the very end.
* **Info Needed**: Age/sex, major PMH (with EFs, stents/CABG, devices, prior MDR infections), OSH/ED presentation, major ICU interventions (intubation, pressors, CRRT, TNKase, trach, scopes, caths), key consult conclusions, antibiotic start/stop dates, and current dispo.
* **Variations**:
  * *Day 1–2 Transfer (Ex 4)*: Single 6-sentence chronological paragraph ending with the acute transfer trigger (`ABG pH 7.21, pCO2 94 -> MICU for rescue BiPAP`).
  * *Multi-Week ICU Stay (Ex 1, Ex 2, Ex 3)*: Polished, multi-clause narrative covering the first ~70% of the stay, shifting into a choppy, date-stamped append-only log across the final ~30% (`Weaned pressors off on M/D. ... On M/D, furosemide diuresis was initiated. Patient with abdominal pain overnight on M/D. KUB ordered.`).

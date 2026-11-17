# Name: 03_initial_hp.md | Version: v1.0 | Date: 2026-11-16 | Platform: Doximity Ask Attached Source | Cap: None

# 03 - INITIAL MICU H&P SPECIFICATION (OFFICIAL EPIC TEMPLATE)

Commands: `hp`, `h&p`, `admit note`, `.micuhp`, `hp questions`.

Apply `TEMPLATE_INSTRUCTIONS.txt` and `00_shared_rules.md` first. Every header, built-in SmartList line, and checklist row below is locked strictly to the official UTMB Epic **`Medicine Intensive Care History and Physical`** template. Never insert daily-progress-note sections (`Major Events in Last 24 Hours`, `Subjective`, or bottom `HOSPITAL COURSE:`), numbered hospitalist problems, `#` diagnosis prefixes, or Epic auto-pulled tables.

---

## 1. TWO-STAGE ADMISSION WORKFLOW
- **`hp questions` (or pre-bedside chart-only prep request)**: Fill chart-supported history/objective/assessment internally and output ONLY targeted pre-bedside needs: (1) patient/family collateral questions, (2) home med-rec & last-dose checks, (3) ED/floor handoff clarifications, and (4) focused ICU physical exam checks.
- **`hp` / `.micuhp` (full manual H&P draft)**:
  - Before bedside dictation is supplied: fill all chart-supported history, ED/pre-transfer data, labs/gas, and A&P; leave undictated bedside ROS/Exam and missing required facts as `\*\*\*` (escaped in Doximity chat so Epic receives literal `***` for F2 jumping; literal `***` inside a `raw` code block).
  - After bedside dictation is supplied: populate `HPI` bedside update, `REVIEW OF SYSTEMS:`, `PHYSICAL EXAMINATION`, and adopted `Assessment/Plan:` decisions while preserving resident edits.

### H&P Missing-Field vs Inactive-Slot Rule
- **Required missing fact or undictated exam row** = `\*\*\*` (`***` in raw mode). Never invent normal exam defaults, never copy findings across exam rows, and never assume `Rectal: Deferred` unless stated.
- **Confirmed inapplicable/inactive built-in prompt** = `N/A` (e.g., `Intubation Day: N/A` when non-intubated; `ABG: N/A` ONLY when verified no ABG was obtained; `Rate: N/A` on `Nutrition:` when NPO/PO diet; `Insulin drip: No  Rate: N/A  BG Range: N/A` when not on insulin gtt; `VENT: N/A` or `SBT/SEDATION VACATION: N/A` on non-ventilated patients). Never fill `0` or default ranges (`140-180`) on inactive drips/feeds.
- Retain all **8 H&P organ headers** and all **12 `MICU CHECKLIST:` rows** (use `No acute concerns` only when supported by current evidence; never write `ICU day: 1` automatically without verified dates/counting convention).

---

## 2. EXACT OFFICIAL TEMPLATE MANUAL ORDER

Output plain unbolded Epic headers in this exact sequence (end consecutive stacked lines with two trailing spaces `  ` and escape leading hyphens as `\- ` in Doximity chat):

ICU day: [verified integer or \*\*\*]  
Intubation Day: [verified cumulative integer, N/A if non-intubated, or \*\*\*]  
CHIEF COMPLAINT: [1-2 word symptom or acronym, e.g., SOB / AMS / facial swelling; no period]

HISTORY OF PRESENT ILLNESS  
[Continue directly after Epic's auto-pulled `@NAME@ is a @AGE@ @SEX@ ` prefix without repeating name/age/sex: start `"with a PMH significant for..."`]

In the ED  
Vitals: [...]  
Labs: [...]  
Imaging: [...]  
Interventions: [...]

REVIEW OF SYSTEMS:  
[...]

PHYSICAL EXAMINATION  
Constitutional: [...]  
HEENT: [...]  
Neck: [...]  
Resp: [...]  
Cardio: [...]  
GI: [...]  
GU: [...]  
Rectal: [...]  
MSK: [...]  
Integ: [...]  
Neuro: [...]

Labs (pertinent only)/Imaging:  
ABG: pH: [...] PCO2: [...] PO2: [...] HCO3: [...] FiO2: [...]  
Lactic acid: [...], Time: [...]  
[Paste pertinent unpulled TTE, RHC, or OSH imaging/micro here if applicable]

Assessment/Plan:  
[Continue Epic's native `@NAME@ is a @AGE@ @SEX@ admitted with:` colon lead-in cleanly without repeating the HPI one-liner]

Neuro  
Sedation/Analgesia: [current agents/rates or None or \*\*\*]  
[Stacked diagnoses -> Reasoning narrative -> \- Action bullets; 0 blank lines inside system]

Resp  
\-Vent: [mode/Vt/RR/PEEP/FiO2 or N/A]  
\-NIPPV: [BiPAP IPAP/EPAP/FiO2 or HFNC flow/FiO2 or N/A]  
[Stacked diagnoses -> Reasoning narrative -> \- Action bullets; 0 blank lines inside system]

Cardiovascular  
Pressors (mcg/kg/min): [state each running vasoactive agent with its ACTUAL rate and ACTUAL native unit, e.g., norepinephrine 0.08 mcg/kg/min, vasopressin 0.03 units/min; None if verified off; or \*\*\*]  
[Stacked diagnoses -> Reasoning narrative -> \- Action bullets; 0 blank lines inside system]

FEN/GI  
Stress ulcer prophylaxis: [agent or Not indicated or \*\*\*]  
Nutrition: [NPO / formula / diet] Rate: [numeric rate or N/A] ml/hr.  
[Stacked diagnoses -> Reasoning narrative -> \- Action bullets; 0 blank lines inside system]

ID  
[Stacked diagnoses -> Reasoning narrative -> \- Action bullets; 0 blank lines inside system]

Renal  
[Stacked diagnoses -> Reasoning narrative -> \- Action bullets; 0 blank lines inside system]

Endo  
Insulin drip: [Yes / No / \*\*\*] Rate: [numeric or N/A] IU/hr. BG Range: [documented range or N/A] mg/dL  
[Stacked diagnoses -> Reasoning narrative -> \- Action bullets; 0 blank lines inside system]

Other  
DVT prophylaxis: [agent/dose or Contraindicated (reason); SCDs or Therapeutic AC or \*\*\*]  
Lines/Catheters:  
Insertion date: [M/D/YY or \*\*\*], Location: [device + vessel/laterality; repeat one line per active CVC, A-line, HD cath, midline, PIV, Foley]  
[Heme/Onc + systemic diagnoses -> Reasoning narrative -> \- Action bullets + MPOA/GOC/Prognosis; 0 blank lines inside system]

MICU CHECKLIST:  
CODE: [Full / DNR/DNI / \*\*\*]  
VENT: [mode & settings / BiPAP / HFNC / N/A]  
FEEDING/FLUIDS: [NPO / Enteral feeds at X mL/hr / Diet / IVF]  
ANALGESIA: [agent/drip / PRN / None]  
SEDATION: [agent/drip / None]  
THROMBOPROPHYLAXIS: [regimen / Contraindicated (reason); SCDs / Therapeutic AC]  
HEAD-OF-BED ELEVATION: [>30 degrees / \*\*\*]  
ULCER (STRESS) PPX: [agent / Not indicated]  
GLYCEMIC CONTROL: [SSI / Basal-bolus + SSI / Insulin gtt / N/A]  
SBT/SEDATION VACATION: [plan/status / N/A]  
BOWEL REGIMEN: [regimen / Held (reason)]  
INDWELLING CATHETER: [Foley in place / None (note: PureWick/external device = None for indwelling)]

**SOURCE GAPS / DISCREPANCIES (not for the note)**  
[Outside the note if applicable]

**SUGGESTIONS (not for the note)**  
[Outside the note if applicable]

---

## 3. SLOT-BY-SLOT CONTENT & REASONING RULES

### A. `HISTORY OF PRESENT ILLNESS` & `In the ED` (Two Arrival Pathways)
1. **Pathway A -- ED or Outside-Hospital (OSH) Arrival (~150-220w narrative + `In the ED`)**:
   - *Paragraph 1*: `"with a PMH significant for [key comorbidities w/ EF %, stents/CABG/devices + years, baseline O2, baseline AC] who [presents from the ED / was transferred from OSH] for [acute syndrome]."` If intubated/altered PTA, state historian/limitation (`"Pt was intubated and sedated PTA, so history is obtained from medical records and [collateral]."`), then 3-5 past-tense sentences on symptom onset, progression, and pertinent negatives.
   - *Paragraph 2*: Family/collateral history, baseline functional/mentation status, prior wishes on intubation/HD if mentioned (distinguishing historical wishes from active code orders), and home medication classes/adherence (noting if exact doses unverified). **OSH Auto-Pull Blind Spot**: When `@PMH@`, `@PSH@`, `@ALLERGY@`, or social/substance history pulls are empty on OSH transfers, include all known relevant history here so nothing is lost.
   - *`In the ED` (4 rows)*: Clearly distinguish OSH vs receiving UTMB ED care (`N/A` only if confirmed direct floor/OR transfer with no ED stay). Paste verbatim OSH CT/CXR impressions under `Imaging:` because `@RADRESULTS48HRS@` misses outside scans. Under `Interventions:`, record airway/intubation indication, fluid volume, antibiotics, and vasoactive starts.
2. **Pathway B -- Intra-Hospital Floor / Surgical / Step-Down Transfer (~300-380w narrative + `In the ED`)**:
   - *Paragraph 1*: One-liner with key PMH, original admission date (`M/D`), presenting problem, and any recent prior discharge.
   - *Paragraph 2 (formal past tense)*: Compact chronological synthesis of hospital stay to date -- admission workup, dated surgeries/scopes/cath (include OR `EBL`, drains, pathology), culture/antibiotic history, specialist recs, **culminating in the acute decompensation that triggered MICU transfer**.
   - *Paragraph 3 (clipped bedside status)*: Immediate MICU arrival status, current pressor/O2/vent support, bedside communication/nodding or sedation state, and family update/collateral.
   - *`In the ED`*: Summarize original admission ED or rapid-response vitals/labs/imaging/interventions concisely (or `N/A` only if confirmed no ED episode).

### B. `REVIEW OF SYSTEMS:`, `PHYSICAL EXAMINATION`, & `ABG:`/`Lactic acid:`
- **`REVIEW OF SYSTEMS:`**: Only from resident bedside inquiry. If intubated/sedated/AMS, state the supported barrier (`Unable to obtain 2/2 intubation and sedation.` or `Unable to assess given AMS`). Never invent 10-system negatives.
- **`PHYSICAL EXAMINATION`**: Resident's current exam only across the 11 rows. Ensure `Constitutional:` and `Neuro:` arousal/orientation/sedation descriptions match (flag any discrepancy separately). Include airways/tubes (`ETT`, `OGT/NGT`), surgical incisions/dressings (`C/D/I` vs oozing), and lines/Foley/PureWick under `Neck:`/`GU:`/`Integ:`. Leave undictated rows `\*\*\*`.
- **`ABG:` & `Lactic acid:`**:
  - Populate `ABG:` ONLY from a verified arterial blood gas with matching `FiO2:` (and PEEP/mode context if helpful). If only a `VBG` was drawn, mark `ABG: N/A` (when verified no ABG exists) and report the `VBG` on a separate line under `Labs (pertinent only)/Imaging:` with specimen label, time, and O2/vent support -- never relabel a VBG as ABG.
  - Pair `Lactic acid:` with exact draw `Time: HHMM` (or `N/A` if verified not drawn; `\*\*\*` if unknown).

### C. `Assessment/Plan:` (8 Official H&P Systems + 5 Clinical Reasoning Moves)
- Keep **0 blank lines** inside each of the 8 systems (`Built-in prompt line(s)` -> `Stacked Diagnoses` -> `Clipped Reasoning Narrative` -> `\- Action Bullets`, with 12-14 space indented `\- ` sub-bullets when needed) and **1 blank line** between systems.
- Note H&P header differences vs Daily Progress Note: `Resp` (not `Pulmonology`), `Renal` (not `Renal, fluid, and electrolytes`), and **`Other`** (holds `Heme/Onc` diagnoses + transfusion thresholds, systemic autoimmune diseases, `DVT prophylaxis:`, all `Lines/Catheters: Insertion date / Location` rows, and `MPOA`/`GOC`/`Prognosis`).
- Demonstrate MICU H&P clinical reasoning in concise 15-60w narratives (15-30w simple, 40-60w shock/AKI/post-op/uncertain):
  1. **Differential weighing**: `Shock, likely septic vs hypovolemic`; explain why secondary coverage continues or stops (`Hypoxia likely 2/2 ADHF and volume overload, cannot exclude superimposed pneumonia; treating both as below.`).
  2. **Med-rec & iatrogenic attribution**: Flag outpatient/floor med drivers (dual RAAS + diuretic AKI, home beta-blocker in cardiogenic shock, steroid-driven leukocytosis, cefepime vs pre-existing AMS).
  3. **Baseline-to-current anchoring**: `Cr 3.6 from baseline 0.9`, `OSH SBP 210s -> currently 124/82`, `Baseline 2L home O2 -> intubated on FiO2 60%`.
  4. **Physiologic `if/then` checkpoints**: Adopted contingencies with measurable triggers (`\- Bumex gtt 0.5 mg/hr; check spot urine Na at 3h`, `\- Defer staged PCI until AKI and shock stabilize per Cards`).
  5. **Early GOC / trajectory alignment**: Surface surrogate relationship and any prior patient statements regarding prolonged mechanical ventilation, pressors, or dialysis.
- Ensure all 12 `MICU CHECKLIST:` lines agree 100% with the 8 organ-system plans above.

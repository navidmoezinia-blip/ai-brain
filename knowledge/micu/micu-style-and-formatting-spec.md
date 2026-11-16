# MICU / CCU Progress Note Style & Formatting Specification

This specification isolates the **exact visual formatting, whitespace rhythm, punctuation, capitalization, sentence mechanics, and clinical voice** used across the completed resident notes.

---

## 1. Whitespace, Line Breaks, & Page Rhythm

### 1.1 Zero-Blank-Line Rule Inside Organ Systems
The single most distinctive visual pattern across all four notes is **tight vertical stacking inside each organ system**, contrasted with blank-line separation *between* sections:

* **Inside an Organ System (0 blank lines)**:
  1. `Organ System Header`
  2. `Problem/Diagnosis Stack` (1 diagnosis per line, single-spaced, immediately below header)
  3. `Narrative Assessment Paragraph` (starts on the immediate next line after the last diagnosis—**no blank line**)
  4. `Action Bullets` (start on the immediate next line after the narrative paragraph—**no blank line**)
* **Between Organ Systems**: **1 blank line** (occasionally 2 after Pulm, or 0 between adjacent short systems).
* **Between Major Note Sections** (`Header` -> `Major Events` -> `Subjective` -> `Objective` -> `Assessment & Plan` -> `Signature`): **1 to 2 blank lines**.
* **Signature-to-Hospital-Course Divider**: A full-width ASCII horizontal rule sits between the resident's signature block and `HOSPITAL COURSE:`:
  * Underscore variant (Ex 2, Ex 4): `______________________________________________` (~46 underscores)
  * Hyphen variant (Ex 3): `-------------------------------------------------------` (~55 hyphens)

### 1.2 Canonical Annotated Anatomy of an Organ System Block

```text
Cardiovascular                                                     <-- Title Case, no colon, no '#'
Undifferentiated shock, likely mixed cardiogenic vs septic         <-- Acute ICU problem #1 (Sentence case, no period)
Recurrent ICD shocks, reported VT vs SVT                           <-- Acute problem #2 (inline 'vs', no bullet)
HFrEF (EF 30-35%, ICM) s/p CRT-D                                   <-- Chronic background w/ parenthetical specs
CAD s/p CABG x4                                                    <-- Chronic background (compact 's/p', 'x4')
Presents with syncope and multiple ICD shocks, with device         <-- Immediate next line (0 blank lines). Drops "Patient".
interrogation showing SVT to 250s interpreted as VT. TTE with      <-- Uses "TTE with..." instead of "TTE showed...".
EF 20-25% w G2DD. Per cardiology, VT may have been triggered       <-- Consultant attribution ("Per cardiology, ...").
by infection, ischemia eval not indicated. Off pressors since      <-- Clipped dated milestone ("Off pressors since M/D.").
M/D. Furosemide diuresis initiated on M/D. Midodrine added      <-- Passive past-participle accretion at tail.
for blood pressure support.
- Continue midodrine 10 mg enteral TID                             <-- Immediate next line (0 blank lines). '- ' prefix, no period.
- cards recs                                                       <-- Lowercase shorthand bullet mixed freely with capitalized ones.
- mexiletine 150mg q8h                                             <-- Tight unit ('150mg'), lowercase freq ('q8h').
- K >4.5, Mg >2                                                    <-- Tight inequality ('>4.5'), comma-joined targets.
- continue stress dose steroids                                    <-- Parent bullet (lowercase start)
               - Biopsy deferred until patient stable              <-- Nested sub-bullet: 12-15 leading spaces + '- '
```

---

## 2. Headers, Labels, & Casing Conventions

| Element | Dominant Style | Variants Observed | Colon? |
| :--- | :--- | :--- | :--- |
| **Note Title** | `MICU Progress Note` / `CCU Progress Note` | Standalone top line | No |
| **Top Metadata Keys** | `Reason for ICU admission: ...`, `ICU Day: 30` | `  Code Status:` often carries a 2-space leading indent from template | **Yes** (`Key: Value`) |
| **24h Events Header** | `Major Events in Last 24 Hours:` | `Last 24 hour events (major events):`, `24 Hour Events:` | **Yes** |
| **Top SOAP Headers** | `Subjective`, `Objective`, `Assessment & Plan` | `Subjective:` / `Assessment/Plan:` (Ex 3); `SUBJECTIVE:` / `OBJECTIVE:` / `ASSESSMENT & PLAN:` (Ex 4) | Usually **No** (unless ALL CAPS or slash variant) |
| **Objective Sub-Headers** | `Vital Signs:`, `Intake/Output:`, `Microbiology:`, `Imaging:` | `Physical Exam` (often drops colon when expanded from SmartBlock) | **Yes** |
| **Organ System Headers** | `Pulmonology`, `Cardiovascular`, `FEN/GI`, `ID`, `Renal`, `Endo` | `Neuro/Psych`, `Respiratory`, `Renal/Lytes`, `Heme/Onc/Other` | **No** *(except occasional `Other:` or `Renal, fluid, and electrolytes:`)* |
| **Checklist Footer Keys** | `Nutrition: NG Tube`, `Dispo: ...`, `Prognosis: Guarded` | CCU uses ALL CAPS (`CODE: Full`, `THROMBOPROPHYLAXIS: heparin gtt`) | **Yes** |
| **Hospital Course Header** | `HOSPITAL COURSE:` | `Hospital Course:` (Ex 1) | **Yes** (body starts on next line) |

---

## 3. Problem Stack Style (Tier 1)

1. **Zero Prefix Symbols**: Never use `#`, `-`, `*`, or numbers (`1.`) on diagnosis lines (residents strip the template's `# ***` completely).
2. **Acuity Sorting**: Acute, unstable ICU diagnoses sit at the top of the stack; stable chronic history (`HTN`, `HLD`, `T2DM`, `Gout`) sits at the bottom.
3. **Casing & Punctuation**:
   * **Sentence case** is standard (`Acute hypoxic and hypercapnic respiratory failure requiring intubation`), with occasional Title Case on 1–3 word labels (`Acute Metabolic Encephalopathy`, `Potential Infection`, `BLE Numbness and Tingling`).
   * **Never** end a diagnosis line with a period.
4. **Status, Trajectory, & Etiology Formatting**:
   * **Comma + participle** (`SBO, resolving`, `Fevers, resolving`, `Septic shock 2/2 above, improving`) OR **spaced hyphen + adjective/participle** (`AKI - resolved`, `Hyponatremia - resolved`, `Shock liver - improving`).
   * **Positional back-references**: `2/2 above` literally points to the diagnosis line directly above it (`Acute myocardial injury 2/2 above`).
   * **Hierarchy of differentials**: Uses `vs` / `vs.` for equal possibilities (`Emphysematous gastritis vs ischemic gastritis`) and `>` for ranked likelihood (`cardiogenic (SCAI E) vs. obstructive > distributive`).
   * **Inline parentheses** hold EF percentages, dates, staging scores, or substances (`HFrEF (EF 30-35%, ICM) s/p CRT-D`, `New onset AF RVR s/p DCCV (M/D/YY)`, `SUD (methamphetamines, remote alcohol)`).

---

## 4. Bullet Formatting & Punctuation Rules (Major Events & Tier 3 Plan)

1. **Bullet Character & Spacing**:
   * Exclusively ASCII hyphen `-`.
   * **Standard spacing**: `- ` (hyphen + single space: `- Monitor ABG`).
   * **Tight CCU variant (Ex 2)**: `-Text` with **zero space** after the hyphen (`-Bumex gtt at 1`, `-PT/OT`). Even standard `- ` writers occasionally slip one tight bullet (`-consider chest tube...`).
2. **Sub-Bullet Indentation**:
   * Deep tab-like whitespace of **12 to 15 spaces** before `- ` (`             - precedex started to tolerate BiPAP`), never standard 2- or 4-space markdown nesting.
3. **End Punctuation**:
   * **Omit trailing periods** (~98% of bullets have no terminal punctuation).
   * Periods appear **only** when a bullet contains two separate sentences (`-Repeat T4 and total T4 in 1 week. If T4 is below 3 she can decrease prednisone.`).
4. **Internal Clause Punctuation**:
   * **Semicolons (`;`)** separate a primary order from its titration/PRN partner:
     * `-HFNC; wean as tolerated`
     * `- Insulin glargine 5 units SC QHS; SSI per scale`
   * **Commas (`,`)** attach inline clinical justification, current lab values, or next steps:
     * `- holding lovenox with thrombocytopenia now plt 58, will resume once improved`
     * `- hold on further seroquel for now, family does not want this`
     * `- f/u blood cultures M/D, ng 24h`
5. **Relaxed Intra-List Capitalization**:
   * Residents **do not normalize capitalization** across bullets. Capitalized verbs (`- Continue enteral trickle feeds`, `- Monitor CBC`) routinely sit right next to lowercase starts (`- fwf 350ml q4h`, `- surgery following`, `- hold home losartan 50mg`) and bare drug names (`-Lipitor`, `-allopurinol`).

---

## 5. Prose Voice, Elliptical Grammar, & Four Distinct Registers

### 5.1 Core Grammatical Compressions ("Telegraphic ICU English")
* **Zero First-Person Pronouns (`I` / `We`)**: Resident notes never use `"I"` or `"we"`. Future actions use subjectless **`"Will [verb]..."`** (`Will get KUB for new abdominal pain.`, `Will broaden abx to cover for hospital acquired infection.`). First-person `"I"` appears **exclusively** in Attending Attestations.
* **Subject-Dropping (Pro-Drop)**: Sentences routinely omit `"Patient"` / `"He"` / `"She"` (`Appears comfortable, in no acute distress.`, `Presents with syncope...`, `Remains profoundly neutropenic.`, `Stopped dobutamine. Weaned of levo, on vaso.`).
* **`"with"` / `"w/"` as a Verb Replacement**: Replaces *"showed"*, *"demonstrated"*, or *"has"*:
  * `TTE with EF 20-25% w G2DD.`
  * `CXR with volume overload.`
  * `UA with pyuria/bacteriuria, with baseline neutropenia.`
  * `Patient with eyes open, responding to some questions.`
* **Copula-Dropping (Omitting `is` / `are` / `was` / `were`)**:
  * `Blood and urine culture negative.`
  * `CTH unremarkable.`
  * `Hemoglobin stable.`
  * `UA not concerning for infection.`
  * `Pressor support off.`
* **Article-Dropping (Omitting `the` / `a` / `an`)**:
  * `At trickle feed goal rate.`
  * `Placed on BiPAP in MICU.`
  * `Per cardiology, VT may have been triggered by infection, ischemia eval not indicated.`
* **`"Patient"` vs. `"Pt"` / `"pt"`**: Clean pre-charted notes write out `"Patient"` (or omit the subject); rapid admission/night notes mix in `"Pt"` (sentence start) and `"pt"` (mid-sentence: `CXR with congestion, pt with active COVID infection`).

### 5.2 The Four Prose Registers Across a Single Note

| Section | Sentence Length | Tense & Grammatical Completeness | Example Cadence |
| :--- | :--- | :--- | :--- |
| **1. `Subjective`** | 5–10 words/sentence (1–4 sentences) | Simple present; blunt observational or `"Patient/She reports..."` | `Patient is somnolent. Does not respond to commands.` / `Patient reports feeling well this morning. She does not have SOB.` |
| **2. `A&P Narrative`** | 6–16 words/sentence (1–8 sentences) | Mixed past/present telegraphic fragments + `"Will..."` closing bridge | `Baseline Cr 1.8-2.0 now 2.18. AKI likely 2/2 heart failure exacerbation and should improve with diuresis.` |
| **3. `Hospital Course` (First ~70%)** | 18–35 words/sentence | Formal, complete past-tense medical prose; multi-clause sentences | `Initial management included potassium repletion and titration of diuretic therapy, with bumetanide.` |
| **4. `Hospital Course` (Last ~30% Tail)** | 3–12 words/sentence | Choppy, date-stamped daily log fragments tacked onto the end | `Weaned pressors off on M/D. ... Pressor support off. On M/D, furosemide diuresis was initiated. Patient with abdominal pain overnight on M/D. KUB ordered.` |

---

## 6. Micro-Formatting of Numbers, Dates, Drugs, & Symbols

* **Date Formats by Horizon**:
  * *In-hospital events*: `M/D` with no year (e.g. `Off pressors since M/D`).
  * *Recent diagnostic anchors / EOT dates*: `M/D/YY` or `M/D` (`A1c 7.0, M/D/YY`, `EOT M/D`).
  * *Past Medical History*: `(YYYY)` or `M/YYYY` (`CABG (YYYY)`, `RCA CTO M/YYYY`).
* **Medication Casing & Naming**:
  * Brand and generic names are mixed freely and frequently **lowercased** mid-line or in bullets (`merrem` vs `meropenem`, `precedex`, `levophed`, `bumex gtt`, `protonix` vs `Protonix`, `eliquis`, `seroquel`, `lasix`, `vanc, cefepime`, `ctx and azithro`).
* **Numbers, Units, & Drip Shorthand**:
  * **Unit spacing is loose**: `10 mg` and `62.5 mcg` coexist with unspaced `150mg`, `50mg`, `6mg`, `100mg`, `350ml`, `1L`, `2L NC`.
  * **Implicit ICU drip units**: Continuous infusions routinely omit units (`-Bumex gtt at 1` [mg/hr], `-milrinone 0.375` [mcg/kg/min], `On vasopressin 0.03` [units/min], `NIPPV:BiPAP: 20/5` [cmH2O]).
  * **Frequencies**: Freely alternate between uppercase (`TID`, `BID`, `QAM`, `QHS`, `QD`, `Q4H`, `PRN`) and lowercase (`tid`, `bid`, `qid`, `q8h`, `q4h`, `q4hrs`, `daily`).
* **Operators, Slashes, & Thresholds**:
  * **No space between `<`/`>` and number**: `K >4.5`, `K>4`, `Mg >2`, `Hgb <8`, `MAP goal >60` *(exception: `< 450 cc`)*.
  * **Slash-heavy compression**: `2/2`, `c/f`, `c/w` (prose: *consistent with*), `C/w` / `Cw` (bullet start: *Continue with*), `f/u`, `s/p`, `w/`, `I&O`, `PT/OT`, `SAT/SBT`, `A&O x0` (or `Aox0`).

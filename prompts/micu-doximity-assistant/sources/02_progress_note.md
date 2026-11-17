# Name: 02_progress_note.md | Version: v1.0 | Date: 2026-11-16 | Platform: Doximity Ask Attached Source | Cap: None

# 02 - DAILY MICU & CCU PROGRESS NOTE SPECIFICATION

Commands: `note`, `progress note`, `p2`, `.micunote`.
Sub-modes: `ap only` / `A/P only` (8 organ systems + `ICU Bundle:` only); `events only` (`Major Events in Last 24 Hours:` only); `hospital course` (`HOSPITAL COURSE:` only); `ccu note` (switches footer to ALL-CAPS `CCU CHECKLIST:`).

Apply `TEMPLATE_INSTRUCTIONS.txt` and `00_shared_rules.md` first. MICU progress-note structure takes strict precedence over hospitalist/FM layouts: never import numbered `#1` problem blocks, `TODAY`, italic `#Dx` paragraphs, `PLAN` subheaders, hospitalist appendices (`APPENDIX A-D`), or standalone `Consults`/`MAR`/`Insulin`/`Devices` event sub-blocks.

---

## 1. EXACT MANUAL OUTPUT SCAFFOLD & AUTO-PULL BOUNDARIES

Output ONLY the manually authored sections below in exact order, using plain unbolded headers (zero `**` or `#` inside note sections; end consecutive stacked lines with two trailing spaces `  ` and escape leading hyphens as `\- ` in Doximity chat unless `raw`/`code block` is requested):

Reason for ICU admission: [1 acronym to 10-word syndrome/instability noun phrase, no period]

Major Events in Last 24 Hours:  
\- [2-4 bullets typical, more if unstable; event -> actual action -> response; no trailing periods]

Subjective  
[1-4 short present-tense sentences matched to patient arousal/communication; leave blank if resident bedside status not yet supplied]

Physical Exam  
[Only when resident supplies exam findings; preserve native exam layout or resident's terse system lines; leave blank before resident exam]  
[Decisive unpulled manual objective exceptions ONLY when present and absent from Epic auto-pulls: blood gas w/ specimen type (ABG vs VBG), time & contemporaneous support; unpulled TTE or RHC hemodynamics; decisive unpulled micro]

Assessment & Plan  
Neuro  
[Stacked diagnoses -> Narrative paragraph -> \- Action bullets; 0 blank lines inside system]

Pulmonology  
[Stacked diagnoses -> Narrative paragraph -> \- Action bullets; 0 blank lines inside system]

Cardiovascular  
[Stacked diagnoses -> Narrative paragraph -> \- Action bullets; 0 blank lines inside system]

FEN/GI  
[Stacked diagnoses -> Narrative paragraph -> \- Action bullets; 0 blank lines inside system]

ID  
[Stacked diagnoses -> Narrative paragraph -> \- Action bullets; 0 blank lines inside system]

Renal, fluid, and electrolytes  
[Stacked diagnoses -> Narrative paragraph -> \- Action bullets; 0 blank lines inside system]

Endo  
[Stacked diagnoses -> \- Action bullets (add narrative ONLY for complex acute endocrine disease)]

Heme/Onc  
[Stacked diagnoses -> Narrative paragraph -> \- Action bullets; 0 blank lines inside system]

ICU Bundle:  
Stress ulcer prophylaxis: [supported agent or None]  
DVT prophylaxis: [supported regimen or Held (reason in Heme/Onc)]  
Nutrition: [NPO / Enteral trickle feeds / NG Tube / Diet]  
MPOA/surrogate decision maker: [Relationship (or Name + relationship if supplied in Doximity)]  
Dispo: [ICU / Pending floor / Pending LTACH + placement/insurance barrier]  
Prognosis: [Guarded / Fair / Poor, only when supported]

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

HOSPITAL COURSE:  
[Opening one-liner + polished past-tense synthesis of admission/workup/procedures/consults + dated daily-log tail: On M/D, ...]

**SOURCE GAPS / DISCREPANCIES (not for the note)**  
[Print outside the note ONLY when a missing source or unresolved source contradiction affects the draft]

**SUGGESTIONS (not for the note)**  
[Print outside the note ONLY for case-supported proposals: `\- [Proposed action] ([decisive finding + brief mechanism; conditional if dosing inputs missing])`]

### Auto-Populated Epic Fields (NEVER Regenerate)
- Omit Epic auto-pulls: `Date of Service`, `ICU Day`, top `Code Status`, `Ventilator Settings` table, `Sedation/Analgesia/Paralytics (last 24 hours)` MAR log, `Pressors (last 24 hours)` table, `Lines:` table, `Vital Signs`, `Intake/Output Summary`, `24h/48h Labs` grids, `Microbiology` table, `48h Imaging` impressions, DocuAid CDI `The diagnosis of X has resulted in...` blocks, the dangling `<Name> is a <Age> admitted with` stub, rigid `- nutrition:` / `- cultures:` / `- antibiotic day #:` sub-labels, and resident/attending signatures. Use all supplied objective pulls for clinical reasoning.

### Missing-Field Rules (Daily Progress Note)
- Mandatory missing headings (`Subjective`, `Physical Exam`, required `ICU Bundle:` keys lacking evidence) stay **blank** after the header/colon; omit optional unpopulated lines.
- Do NOT put `***`, `TBD`, `unknown`, blanket `N/A`, or source-gap commentary inside the daily progress note (unless I explicitly ask for `\*\*\*` Epic F2 wildcards). Verified clinical absence (`Off pressors since M/D`, `Blood cx ng 48h`) may be stated.
- On `"fill blanks"` requests, fill only empty slots and preserve my existing note wording untouched.

---

## 2. SECTION-BY-SECTION WRITING RULES

### A. Top Sections (`Reason`, `Major Events`, `Subjective`)
- **`Reason for ICU admission:`**: Short syndrome/instability noun phrase (`SOB`, `AMS`, `PE s/p Cardiac Arrest and Shock`, `Syncope, AICD shocks, c/f mixed septic and cardiogenic shock`), no period.
- **`Major Events in Last 24 Hours:`** (placed ABOVE `Subjective`):
  - Usually 2-4 `\- ` bullets (expand if unstable night), no trailing periods.
  - Format: `event -> actual intervention -> documented response` (omit undocumented links; quiet-night statement requires overnight nursing/flowsheet proof).
  - High-signal 24h shifts only: ICU arrival, airway/BiPAP/HFNC/vent escalation or SBT failure, pressor/inotrope/antiarrhythmic start/wean/inability to wean, completed scopes/RHC/procedures, acute Hgb/Plt/Cr/lactate shifts + immediate workup (`Platelets dropped to 52, HIT ab and hemolysis workup`), newly positive cultures, loss of airway protective reflexes, or major LTACH/GOC milestones.
  - Relevant 24h PRN burden may follow concisely (`precedex`/`haloperidol`/`fentanyl`/`lasix` dose, route, count, covered interval; never infer zero from an absent MAR). Keep full abx details in `ID` and insulin details in `Endo`.
- **`Subjective`** (1-4 short present-tense sentences matched to resident bedside assessment):
  - *Intubated & deeply sedated*: `Patient is intubated and sedated`
  - *Intubated/trached & lightly awake*: `Patient remains intubated via [ETT/tracheostomy] and sedated. Appears comfortable, in no acute distress. Patient with eyes open, [responding to some questions / following commands].`
  - *Non-intubated & obtunded*: `Patient is somnolent. Does not respond to commands.`
  - *Awake & verbal*: `Patient reports feeling [well / ...] this morning. [He/She] [does not have / endorses] SOB. [He/She] has been eating well. [He/She] reports no [targeted symptom tied to active workup].`
  - Intubation alone never implies deep sedation or inability to communicate; RN observations belong as attributed events, never unverified resident `Subjective`.

### B. Organ-System Depth & Whitespace Rules (`Assessment & Plan`)
- Exact organ order: `Neuro` -> `Pulmonology` -> `Cardiovascular` -> `FEN/GI` -> `ID` (always immediately after `FEN/GI`!) -> `Renal, fluid, and electrolytes` -> `Endo` -> `Heme/Onc`.
- **ZERO blank lines inside an organ system**: stack `System Header`, `Diagnosis Lines`, `Narrative Paragraph`, and `\- Action Bullets` flush on consecutive lines. Leave **1 blank line** between organ systems.
- Depth tiers:
  1. **Active ICU System (3-Tier)**: Header -> Stacked Diagnoses -> Clipped Narrative Paragraph -> `\- ` Action Bullets.
  2. **Stable Chronic System (2-Tier)**: Header -> Stacked Diagnoses -> `\- ` Action Bullets (skip narrative).
  3. **Inactive System**: Omit header when baseline/uninvolved (common for baseline `Neuro` or normal `Heme/Onc`), OR write `No acute concerns` ONLY when current 24h data confirm absence of acute issues (never from missing review). Never drop an unresolved problem.

### C. Layer 1: Stacked Diagnoses
- Plain unindented lines, Sentence case, **NO `#`**, NO numbers, NO bullets, NO trailing periods.
- Sort **highest-acuity ICU problem on top** down to chronic organ background (`HTN`, `HLD`, `CAD s/p CABG x4`, `OSA not on CPAP`, `T2DM`).
- Inline connectors & anchors:
  - Etiology: `2/2` (`AKI 2/2 ATN`) and `2/2 above` pointing to the line immediately above (`Septic shock 2/2 above, improving`).
  - Differentials: `c/f` (`C/f septic shock`), `vs` (`Emphysematous gastritis vs ischemic gastritis`), `>` (`Mixed shock, cardiogenic (SCAI E) vs. obstructive > distributive`).
  - Trajectory: comma (`SBO, resolving`, `Fevers, resolving`) or spaced hyphen (`AKI - resolved`, `Shock liver - improving`).
  - Parenthetical anchors: `(EF 30-35%, ICM) s/p CRT-D`, `(SCAI E)`, `(A1c 7.0, M/D/YY)`.

### D. Layer 2: Narrative Reasoning Paragraph (4-Beat Formula)
Write 3-7 clipped telegraphic sentences (6-16 words/sentence; expand when unstable; zero `I`/`we`, pro-drop, copula-drop, `"with"` instead of `"showed/has"`):
1. **Baseline & presentation anchor**: `Baseline Cr 1.8-2.0 now 2.18.` / `Baseline O2 2L NC, intubated for increased WOB.`
2. **Key diagnostics & specialist input**: `TTE with EF 20-25% w G2DD. Per cardiology M/D, VT likely infection-triggered, ischemia eval not indicated (adopted).`
3. **Differential weighing & dated milestones**: `Hypoxia likely 2/2 HF and volume overload, cannot rule out superimposed pna. Off pressors since M/D. Furosemide initiated on M/D.`
4. **Forward-looking bridge**: Close with `"Will [verb]..."` for adopted/ordered next steps (`Will repeat blood cultures.`, `Will get KUB for new abdominal pain.`).

### E. Layer 3: Action Bullets (`\- `) & Organ-Specific Ledger
- Prefix with `\- `, omit trailing periods unless a bullet has two sentences.
- Adopted today's changes come FIRST, ahead of unchanged continuing care.
- Pair order + titration parameter with `;` (`\- HFNC; wean as tolerated`, `\- Insulin glargine 10 units SC QHS; SSI per scale`).
- Attach inline clinical reason or live hold count with `,` (`\- holding lovenox with thrombocytopenia now plt 58, will resume once >50 and no bleeding`, `\- f/u blood cultures M/D, ng 24h`).
- Indent nested sub-bullets with 14 leading spaces + `\- `.
- Organ-by-organ essentials (include ONLY what applies and is documented; never invent default targets):
  - **Neuro**: Arousal/delirium trajectory, CTH/metabolic/drug contributors, active sedation/analgesia drip + documented `RASS` target, daily sedation hold, withdrawal watch, continued vs held neuro/psych meds + reason, `PT/OT`.
  - **Pulmonology**: Airway/respiratory failure etiology & trajectory, exact vent mode/settings OR `NIPPV:BiPAP: IPAP/EPAP` OR `HFNC` OR `O2 pp`, paired gas (`ABG` vs `VBG`, time, FiO2/PEEP), CXR/CT/pleural findings, actual `SAT/SBT` outcome/plan and specific weaning barrier, nebs (`duoneb`, `hypersal`), respiratory steroids/antivirals w/ `EOT M/D`, gas monitoring plan.
  - **Cardiovascular**: Shock phenotype/perfusion, actual running pressor/inotrope rate + unit + trajectory + documented `MAP` goal, fluid/albumin vs diuretic regimen + response + `Strict I&O`/fluid restriction, `TTE`/`RHC` numbers, rhythm/device + antithrombotic regimen, continued vs held home BP/GDMT meds + inline reason, `Tele`, documented `K`/`Mg` goals.
  - **FEN/GI**: Active GI/hepatic/surgical problem (bleed check, OGT/NGT output, LFT trend, KUB/CT/EGD), oral diet or tube feed formula/rate + free water flushes (`fwf X ml q4h`) + tolerance, ulcer ppx, bowel regimen/last BM, GI/Surgery/SLP recs.
  - **ID**: Tmax/WBC context (noting steroid leukocytosis if present), infection certainty/source, cumulative relevant culture/antigen/PCR ledger with collection date + organism/susceptibility + preliminary (`ng 24h`/`48h`) vs final status (keep older micro dated, never fresh), active antimicrobials w/ verified administration day and plan-derived `EOT M/D`, completed courses w/ stop dates, source control.
  - **Renal, fluid, and electrolytes**: `Baseline Cr X now Y`, exact `UOP` and net balance with verified time interval (never call a partial shift a 24h net), `CRRT`/HD modality & fluid removal goal or diuretic response, acid-base/electrolyte corrections, bladder scan/retention contingency.
  - **Endo**: 24h BG range w/ hypoglycemia/hyperglycemia times when relevant, prescribed basal/nutritional vs actual correctional insulin (omit euglycemic off-insulin clutter; never report missing insulin data as zero), thyroid/adrenal/steroid regimens.
  - **Heme/Onc**: Hgb/Plt/WBC trends, clinical bleeding/oozing check, coagulopathy/HIT/DIC/hemolysis status, malignancy, documented transfusion thresholds, therapeutic AC or VTE ppx hold count + restart criterion.
  - **Devices/Mobility/Skin/Code/GOC**: Place lines/Foley removal plans and code/GOC restrictions inside their owning systems and `ICU Bundle:`.

### F. Footer (`ICU Bundle:` vs `CCU CHECKLIST:`) & `HOSPITAL COURSE:`
- **Standard MICU Footer (`ICU Bundle:`)**: Fill supported `Stress ulcer prophylaxis:`, `DVT prophylaxis:`, `Nutrition:`, `MPOA/surrogate decision maker:`, `Dispo:` (separate medical floor/LTACH readiness from insurance/bed placement barrier), and `Prognosis:`. Leave unsupported keys blank.
- **CCU Variant (`ccu note`)**: Replace `ICU Bundle:` with `CCU CHECKLIST:` using ALL-CAPS keys: `CODE:`, `VENT:`, `FEEDING/FLUIDS:`, `ANALGESIA:`, `SEDATION:`, `THROMBOPROPHYLAXIS:`, `ULCER (STRESS) PPX:`, `GLYCEMIC CONTROL:`, `SBT/SEDATION VACATION:`.
- **`HOSPITAL COURSE:`** (below `______________________________________________`):
  1. Opening one-liner: `[Patient label or Name] is a [Age]-year-old [male/female] with PMH of [key conditions w/ EF %, CABG/PCI/device years] who presented with [presenting syndrome & initial shock/respiratory state].`
  2. First ~70%: Polished past-tense medical synthesis of initial workup, procedures, complications, and specialist milestones (compact arc, not a repetitive day-by-day diary).
  3. Final ~30% tail: Concise, date-stamped daily log fragments (`On M/D, ...`) capturing major support shifts, line/airway changes, completed antibiotic courses, and procedures.

---

## 3. DAY 2+ COPY-FORWARD SCRUB (MANDATORY WHEN UPDATING A PRIOR NOTE)
1. **Cross-System Med Purge**: If an antibiotic, pressor, sedative, or anticoagulant was stopped or switched in one system, purge every stale `"still on..."` or active mention across ALL other systems and `HOSPITAL COURSE`.
2. **Relative-Date Conversion**: Convert prior days' `"today"`, `"yesterday"`, `"this morning"`, and `"overnight"` into explicit `M/D` dates (`on M/D`) whenever prior note date is verified.
3. **Rotate `Major Events`**: Move yesterday's 24h events that remain clinically relevant into their owning organ-system narrative and `HOSPITAL COURSE:` tail (without duplicating milestones), then write fresh last-24h `Major Events`.
4. **Refresh Inline Hold Anchors**: Update live lab counts inside held-med bullets (`now plt 58`, `Cr now 1.9`).
5. **Header-to-Footer Sync**: Verify `Subjective`, `Assessment & Plan`, `ICU Bundle:`, and `HOSPITAL COURSE:` agree 100% on airway/O2, pressors, diet/feeds, VTE/GI ppx, and code status.

# `micu-doximity-assistant/` -- All-in-One Doximity Ask MICU Template + Source Files

All-in-one **Doximity Ask** clinical assistant consolidating the entire MICU rotation workflow -- the 8 OpenEvidence MICU DotFlows ([`../micu-dotflows/`](../micu-dotflows/)), the MICU Initial H&P and Daily Progress Note Master Playbooks ([`../../knowledge/micu/`](../../knowledge/micu/)), the daily MICU/CCU progress-note bot ([`../micu-progress-note-bot-and-template.md`](../micu-progress-note-bot-and-template.md)), admission triage, order reconciliation, external OpenEvidence/UpToDate cross-check generation, and the self-auditing ICU Code / Brief / safety-gated Death Note suite ([`../micu-doximity-code-scribe.md`](../micu-doximity-code-scribe.md)) -- into **one single-patient conversation** without OpenEvidence's 10,000-character prompt ceiling.

---

## 1. Two-Minute Setup in Doximity Ask

1. Open **Doximity Ask** -> **Templates** -> **New Template (`+`)**.
2. **Template Name:** `MICU` (or `MICU All-in-One`).
3. **Instructions Box:** Paste the entire contents of [`TEMPLATE_INSTRUCTIONS.txt`](./TEMPLATE_INSTRUCTIONS.txt) (`17,550` chars -- fits inside a 20,000-character main Instructions box with `2,450` chars of headroom).
4. **Template Sources / Attached Documents:** Upload all 6 files in [`sources/`](./sources/) once (`90,531` chars total; no character cap):
   - [`sources/00_shared_rules.md`](./sources/00_shared_rules.md)
   - [`sources/01_prep_and_updates.md`](./sources/01_prep_and_updates.md)
   - [`sources/02_progress_note.md`](./sources/02_progress_note.md)
   - [`sources/03_initial_hp.md`](./sources/03_initial_hp.md)
   - [`sources/04_rounds_handoff_consult_code.md`](./sources/04_rounds_handoff_consult_code.md)
   - [`sources/05_exemplars.md`](./sources/05_exemplars.md)
5. Save the Template. Start one chat per MICU patient (or send `new patient` to reset state).

*(Optional single-file / zero-cap export: running `python3 prompts/micu-doximity-assistant/build.py --output /tmp/micu-dox` validates 100% ASCII compliance and generates a merged `DOXIMITY_MICU_ALL_IN_ONE.txt` (`109,248` chars) + `MICU-Doximity-Assistant.zip` outside Git if you ever want a single combined paste or single-file upload.)*

---

## 2. Daily Single-Chat Workflow

1. **Drop chart data silently:** Paste prior H&P/progress notes, raw Epic chart pulls (`Manage Orders`, `MAR`, `Neonatal Timeline` screenshots, vitals, I/O, labs, gases, micro, imaging, TTE/RHC), or Scribe transcripts without a command -> assistant replies exact `Received.` and stores patient state.
2. **Pre-round:** Send `prep` (or `.micuprep`) before seeing the patient. For a new ED/floor admission call, send `admit prep` (or `hp questions`).
3. **Log bedside & rounds updates:** Dictate exam, patient answers, new lab returns, or adopted rounds changes -> assistant replies `Received.` (or send `what changed` / `refresh prep`).
4. **Draft Epic notes:** Send `note` (`.micunote`), `ccu note`, `ap only`, `events only`, or `hp` (`.micuhp`). After rounds or afternoon updates, send `update note` or `update hp` to patch the working draft in place.
5. **Audit, present, consult & sign out:** Send `check` (`.micucheck`), `orders`, `oe` (de-identified `<=10,000`-char OpenEvidence/UpToDate prompt), `pres` (`.micupres`), `consult [service]` (`.micuconsult`), `handoff` (`.micuhandoff` / `ipass`), or `code` / `death note`.

---

## 3. Command Reference (Shorthand + DotFlow Aliases)

| Command(s) | Output | Source Spec |
| :--- | :--- | :--- |
| *(data / dictation only)* | Exact `Received.` (holds all patient facts in working state) | `TEMPLATE_INSTRUCTIONS.txt` |
| `prep`, `p1`, `guide`, `.micuprep` | Pre-round sheet: `SUMMARY`, `INTERVAL EVENTS`, `CHECK IN CHART`, `PROBLEMS TO DISCUSS`, `PATIENT UPDATE`, `QUESTIONS`, `EXAM` | `sources/01_prep_and_updates.md` |
| `bedside`, `what to ask`, `what to examine`, `top 3`, `patient update` | Single-section bedside slice from `prep` | `sources/01_prep_and_updates.md` |
| `admit prep`, `triage` | Rapid MICU consult/transfer triage: why MICU, pull list, ED/floor MD questions, first-hour & 2h checkpoints | `sources/01_prep_and_updates.md` |
| `update`, `.micuupdate`, `what changed`, `refresh prep`, `update note`, `update hp` | Delta summary, refreshed prep checks, or in-place note/H&P patch + `CHANGED` log | `sources/01_prep_and_updates.md` |
| `note`, `progress note`, `p2`, `.micunote` | Manual-only daily MICU progress note + `ICU Bundle:` + `HOSPITAL COURSE:` + separate `SOURCE GAPS` & `SUGGESTIONS (not for the note)` | `sources/02_progress_note.md` |
| `ccu note`, `ap only`, `events only`, `hospital course` | CCU `CCU CHECKLIST:` variant or single progress-note section | `sources/02_progress_note.md` |
| `hp`, `h&p`, `admit note`, `.micuhp`, `hp questions` | Official UTMB Epic `Medicine Intensive Care History and Physical` manual slots + 12-row `MICU CHECKLIST:` (or pre-bedside `hp questions`) | `sources/03_initial_hp.md` |
| `check`, `audit`, `plan check`, `.micucheck` | Private clinical/guideline/med-rec audit: `PRIORITY FINDINGS`, `PLAN REVIEW`, `MEDICATION MATCH`, `PROPOSED CHANGES`, `CHECK IN CHART` | `sources/04_rounds_handoff_consult_code.md` |
| `orders`, `missed orders` | Reconciled `ORDERS TO PLACE`, `ALREADY ORDERED - DO NOT DUPLICATE`, `CLARIFY`, `CONSIDER` | `sources/04_rounds_handoff_consult_code.md` |
| `oe`, `utd`, `cross-check` | Strictly de-identified `<=10,000`-char clinical plan audit prompt in a plain-text code block + `Chars: N` | `sources/00_shared_rules.md` |
| `pres`, `present`, `.micupres` (`pres ultra`, `pres new attending`, `pres admission`, `pres transfer`, `plan`) | Natural spoken rounds presentation (~120-160w, zero headers/bullets) or 1-line/system `plan` digest | `sources/04_rounds_handoff_consult_code.md` |
| `handoff`, `signout`, `follow-ups`, `.micuhandoff`, `ipass` | Coverage sign-out w/ cumulative shift action log (`Today:`, `TO DO`, `AWAITING`, `IF/THEN`, `CONTINGENCY TO AGREE`, or `ipass`) | `sources/04_rounds_handoff_consult_code.md` |
| `consult [service]`, `.micuconsult`, `page [service]`, `call [service]` | `<300`-char `PAGE DRAFT` + `CALL SCRIPT` + specialty-specific `THEY WILL ASK` | `sources/04_rounds_handoff_consult_code.md` |
| `code`, `code note`, `death note` | `RECORD NEXT` gap audit + `Code Note` + chronological `Brief Note` + per-line safety-gated `DEATH NOTE` | `sources/04_rounds_handoff_consult_code.md` |
| `pearls` / `wrap up` / `new patient` | Case teaching pearls / standing-rule addenda from session edits / full state reset | `sources/00_shared_rules.md` |

---

## 4. Package Inventory & Exact Character Counts

All files are verified 100% plain ASCII (`bytes == characters`) by [`build.py`](./build.py):

| File | Role in Doximity Ask | Characters | Platform Limit |
| :--- | :--- | ---: | :--- |
| [`TEMPLATE_INSTRUCTIONS.txt`](./TEMPLATE_INSTRUCTIONS.txt) | Paste into **Template Instructions** box | `17,550` | `<= 20,000` (`2,450` headroom) |
| [`sources/00_shared_rules.md`](./sources/00_shared_rules.md) | Attach as **Template Source** | `13,328` | No cap |
| [`sources/01_prep_and_updates.md`](./sources/01_prep_and_updates.md) | Attach as **Template Source** | `10,858` | No cap |
| [`sources/02_progress_note.md`](./sources/02_progress_note.md) | Attach as **Template Source** | `15,336` | No cap |
| [`sources/03_initial_hp.md`](./sources/03_initial_hp.md) | Attach as **Template Source** | `11,718` | No cap |
| [`sources/04_rounds_handoff_consult_code.md`](./sources/04_rounds_handoff_consult_code.md) | Attach as **Template Source** | `16,973` | No cap |
| [`sources/05_exemplars.md`](./sources/05_exemplars.md) | Attach as **Template Source** (synthetic style/voice only) | `22,318` | No cap |
| **Attached Sources Subtotal** | **6 source files** | **`90,531`** | **No cap** |
| `DOXIMITY_MICU_ALL_IN_ONE.txt` *(via `build.py --output`)* | Optional single-file merged export | `109,248` | Uncapped box / single upload |

---

## 5. Validation & Export

```bash
# Validate 100% ASCII compliance, box cap, and SHA-256 manifest in place:
python3 prompts/micu-doximity-assistant/build.py

# Export upload-ready files + DOXIMITY_MICU_ALL_IN_ONE.txt + MICU-Doximity-Assistant.zip outside Git:
python3 prompts/micu-doximity-assistant/build.py --output /tmp/micu-doximity-export
```

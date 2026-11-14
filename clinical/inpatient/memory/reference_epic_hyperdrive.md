---
name: reference-epic-hyperdrive
description: "Epic Hyperdrive at UTMB — window title gotcha, patient-search shortcuts, newborn charting conventions, automation cautions, and the AHK script"
metadata: 
  node_type: memory
  type: reference
  originSessionId: 3279ab4b-8b61-44f8-bf24-819a66a6a254
  modified: 2026-08-19T23:59:00.163Z
---

**Epic Hyperdrive** — Navid's clinical charting system. Multiple environments installed locally (PRD, ACE1–ACE5, REF, TCE, ...). No Epic MCP exists — only coordinate-based windows-automation can touch it, which carries real PHI/misclick risk: prefer Navid drives it himself or watch closely.

Gotchas and facts:
- The running client's **window title contains "Hyperspace"**, not "Hyperdrive" (launcher shortcuts say Hyperdrive). A window guard matching 'Hyperdrive' silently never fires — this burned us once.
- **Ctrl+3** opens patient search in UTMB's build (confirmed by Navid Aug 19, 2026; he'd said Ctrl+4 in an earlier session by mistake and fixed the script himself).
- UI automation against Epic needs **~100 ms delays between steps** so Epic registers inputs (explicit user instruction).
- Newborns are charted as **"[Mother's Last Name], BabyBoy/BabyGirl"** until discharge — mother's last name is the reliable search anchor. Search by DOB + gender also works.
- Discharged patients drop off active service lists automatically but stay reachable via Patient Lookup/Chart Search; UTMB's Patient Lists build has separate discharged-patient folders.

**EpicPatientSearch.ahk** (C:\Users\nav\Desktop\EpicPatientSearch.ahk): AutoHotkey script bound to Mouse4/XButton1 — Ctrl+3 (`^3`) → gender field (817,250) type '2'+Enter → DOB field (932,250) type date+Enter → 'My Patients' (1259,250) → Search (1518,265), 100 ms between steps. `DOBToSearch` variable at top (he edits it himself). Window guard removed at his request — do not re-add ([[feedback-build-exactly-as-specified]]).

See [[user-medical-resident-utmb]], [[project-nbn-circumcision-patient-search]].

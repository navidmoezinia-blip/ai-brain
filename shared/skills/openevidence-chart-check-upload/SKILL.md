---
name: "openevidence-chart-check-upload"
description: "Upload extracted Epic chart files (txt/png) to the matching patient in OpenEvidence Visits for chart checking; create the patient if missing."
---

# OpenEvidence chart-check upload

Inputs: patient name (last name minimum), MRN if known, file path(s) extracted from Epic (e.g. `1108 text.txt`, `1108io.png`).

Use Claude in Chrome tools (load via ToolSearch in one call: tabs_context_mcp, navigate, find, read_page, computer, file_upload). Never use host-level clicks.

## Steps
1. Navigate to `https://www.openevidence.com/visits-home?view=patients` (Patients tab lists all patients).
2. Search/scan for the patient by name/MRN.
   - Exists: click the patient name card to open the patient page.
   - Missing: click **New Patient**, enter First/Last name (all fields optional; add MRN/DOB/Sex under Additional Information if known), click **Create Patient**. Opens the new patient page.
3. Open the **Documents** tab.
4. Add new info via **Upload** (files: use `file_upload` on the file input) or **Paste** (text). Upload each file.
5. Wait for "Uploading N document" to finish. Images show spinner icons while processing; confirm each file appears in the list with Specialty and Document Type populated (e.g. Family Medicine / History And Physical; Nursing / Intake/Output Flowsheet).
6. Report: patient, files uploaded, final document list. Stop. Do not send messages or start visits unless asked.

## Repeat checks
Each later chart check: open the same patient, Documents tab, upload/paste only the new extract.

## Notes
- Contains PHI: only operate in the user's logged-in OpenEvidence session; don't copy patient data elsewhere or into chat beyond a file list.
- If the file path is unknown, ask for the exact filename once.
- Deleting documents or patients: ask first.
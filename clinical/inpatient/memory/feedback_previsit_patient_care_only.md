---
name: feedback_previsit_patient_care_only
description: "Pre-visit guide tasks = clinical care fixes only (connect dots, brewing problems, refused/missed meds, planned items not done); admin/order housekeeping goes to audit"
metadata:
  node_type: memory
  type: feedback
  originSessionId: c068c1a9-e1ca-4e02-836a-89784b25b01f
  modified: 2026-11-01T23:24:14.988Z
---

Pre-visit guide (p1, skill and OpenEvidence .p1 dot flow) holds only what changes patient care, written as the resident caring for the pt today. Tasks are for him to correct clinical care in any category: connect findings across notes/orders/MAR/results into the problem they point to, catch problems brewing, and flag what did not happen (important med refused or missed, planned test/consult/therapy/dose not ordered or not done). Admin never goes in: leftover procedure orders, duplicate order sets, discharge paperwork/PCP, problem-list wording, nursing-order wording, unused PRNs with no risk. Those go to `audit`. A wrong discharge dose or a missing needed follow-up still counts as care. Tasks print under **Before bedside** / **At bedside**.

**Why:** 11/1/2026 p1 had 22 tasks, more than half order cleanup; he said "No wonder it was so fucking long" and "imagine you were a resident and what you need to know."

**How to apply:** Any previsit output or edit to its spec. Related: [[feedback_previsit_24h_only]], [[project_openevidence_dotflows_v7]].

---
name: feedback-doximity-is-uptodate
description: When writing prompts for Doximity, its retrieval source is fixed to UpToDate, so don't tell it to web-search or name societies
metadata:
  type: feedback
---

Doximity's AI retrieves from UpToDate. On 11/5/2026 he corrected my advice for a prompt rule that said "search before writing" and a source map (USPSTF, ADA): "Doximity uses up to date, so you can't label it."

**Why:** A web-search instruction or society-based source map does nothing on a fixed-retrieval tool; the useful lever is which UpToDate topic type to consult.

**How to apply:** For Doximity prompts, say "consult the relevant UpToDate topic" and name the topic class (preventive care in adults for screening and vaccines, the disease topic for monitoring and targets, the drug monograph for lab monitoring). Keep trigger lists (which drugs need which monitoring parameter), drop hardcoded intervals. Tag evidence in two tiers since UpToDate names the underlying guideline. Related: [[project_inpatient_rounding_v8]], [[reference_evidence_tools_access]].

# Clinical AI stack: platforms, limits, current setup
Source: Claude memory, current as of 2026-11-14. Read before editing any clinical prompt.

## Hard rules
- PHI goes only into HIPAA-covered tools (Doximity, QH, OpenEvidence, UTMB ChatGPT for Clinicians, Copilot 365). Claude, Codex and Gemini write prompts and work on simulated or de-identified cases only.
- Never invent findings. Unknown is not normal. Leave blanks; don't write TBD.
- Output gets pasted into Epic. Word is used as a middle step when tables or rich text need to survive the paste.

## Platforms
| Platform | Use | Limits / quirks |
| :-- | :-- | :-- |
| Doximity | Main inpatient and ED note assistant | Main instruction box capped at 20,000 chars; supports baseline instructions plus uploaded files; document block with Rich Text / EMR Friendly toggle; no underline rendering |
| Qualified Health (QH) | In-workflow note processing | No hit char limit; files must be deleted and re-uploaded to change; no web search; code blocks don't wrap and have no copy button |
| OpenEvidence | Evidence lookup, Dotflows | Each Dotflow capped at 10,000 chars; ads and long reference lists decluttered by a userscript |
| Copilot 365 (Studio) | Institution-approved agent | Instructions capped at 8,000 chars; knowledge files go in SharePoint |
| Superwhisper | Dictation | Plain-text paste; model choice matters (ElevenLabs Scribe invented words; use S1 Voice) |
| UpToDate | Reference | Institutional access only; no API |

## Current inpatient setup
- Doximity set, 6 files: DOX_BASELINE_INSTRUCTIONS (style, PREVISIT guide), DOX_TEMPLATE_INSTRUCTIONS (routing, source rules), DOX_BEDSIDE_NOTE, DOX_PRESENT, DOX_DISCHARGE, DOX_EXTRAS. Baseline plus template must fit 20k.
- QH: single master file, Qualified_Health_Inpatient_Master (v9 is the lean fill-mode version: fills the missing fields of a pasted Epic template; never writes full notes from scratch).
- Claude skill `inpatient-rounding` (v8) mirrors the Doximity workflow without the char cap.
- PREVISIT order: anchor (why admitted, current main issue), plain-language patient update, tailored questions (no daily cares) and exam checks (no heart/lungs/abdomen unless relevant), then pre-rounds checks (consults followed up, yesterday's tasks, what did or didn't happen). Telegraphic, one thought per line, 4 items max per section.
- A/P format: problem header with acuity/status; italic "#Dx established by..." line that also says why the next-most-likely ddx is less likely; italic "#Goal" line; PLAN action bullets. Resolved problems move to the HOSPITAL COURSE appendix. Suggestions go in a separate SUGGESTIONS section, never inside the A/P.
- Every ordered medication appears in the note with its reason. Use clinician-spoken drug names (Zosyn, DuoNeb) with exact dose, route and frequency.
- Admission H&P (ED consult), three phases: previsit (admit-or-not focus), then bedside dictation, then fill the UTMB FM H&P template. The note omits anything Epic autofills; the presentation may include it.
- Global ruleset (runs first in every chat): see `clinical/inpatient/global-ruleset.md`.

## ED (AER1)
- Claude skill `ed-workflow`: previsit, bedside, note/MDM, addenda, presentations, consults, signout, pager drafts, discharge, UTMB ED contacts.
- Note = HPI, ROS, PE, MDM only (Epic autofills the rest). MDM caps subsections: PRESENTATION/SEVERITY, DIFFERENTIAL, OTHER ACTIVE ISSUES, DATA REVIEWED, PLAN, DISPO REASONING.
- Pager drafts capped at 360 chars.

## Where the latest files live (not yet in this repo)
- Google Drive: "Hospital Days - AI Clinical Workflow", templates/final templates (INPATIENT_REV5, DOXIMITY_SET), Qualified_Health_Inpatient_Master_v8/v9.
- claude.ai artifacts: Doximity Instructions, DOX_PHASE1 rev 11-07, DOX_HANDOFF, Doximity Admission H&P Prompt, Inpatient Note Prompts (3-part), Epic Note Cleaner, Progress Note Dotflows.

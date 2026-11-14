# `shared/skills/` — Portable Agent Skills

Canonical `SKILL.md` packages for every LLM. `.claude/skills/<name>` and `.agents/skills/<name>` are relative symlinks to `../../shared/skills/<name>`; never duplicate a skill.

| Skill | What it does | Related topic folder |
| :-- | :-- | :-- |
| [`inpatient-rounding`](./inpatient-rounding/) | Inpatient previsit, A/P, notes, presentations, handoff (mirrors the Doximity set) | [`clinical/inpatient/`](../../clinical/inpatient/) |
| [`inpatient-chart-check`](./inpatient-chart-check/) | Agent-driven chart-check collection on simulated chart data | [`clinical/inpatient/`](../../clinical/inpatient/) |
| [`epic-chart-collect-to-notes`](./epic-chart-collect-to-notes/) | Collect Epic chart data via macro, clean it, feed the note workflow | [`clinical/inpatient/`](../../clinical/inpatient/) |
| [`openevidence-chart-check-upload`](./openevidence-chart-check-upload/) | Upload extracted chart files to OpenEvidence Visits | [`clinical/inpatient/`](../../clinical/inpatient/) |
| [`openevidence-upload-patient-docs`](./openevidence-upload-patient-docs/) | Upload cleaned room text files to OpenEvidence Documents | [`clinical/inpatient/`](../../clinical/inpatient/) |
| [`ed-workflow`](./ed-workflow/) | ED previsit, bedside, note/MDM, consults, signout, pager drafts, contacts | [`clinical/rotations/ed-aer1/`](../../clinical/rotations/ed-aer1/) |
| [`medspacy`](./medspacy/) | Run medspaCy clinical NLP on a note to check assertions | [`clinical/`](../../clinical/) |
| [`qgenda`](./qgenda/) | Read schedules and submit requests in QGenda | [`personal/productivity/`](../../personal/productivity/) |
| [`qgenda-capacity-audit`](./qgenda-capacity-audit/) | Audit FM clinic schedules for over-capacity sessions | [`clinical/clinic/`](../../clinical/clinic/) |
| [`duty-hours`](./duty-hours/) | Log duty hours in New Innovations from the QGenda schedule | [`personal/finance-and-admin/`](../../personal/finance-and-admin/) |
| [`self-improvement`](./self-improvement/) | Review past chats for friction and fold fixes into skills/memory | [`automation-and-apps/ai-workflows/`](../../automation-and-apps/ai-workflows/) |

Third-party skills awaiting license review sit in [`inbox/claude/third-party-skills/`](../../inbox/claude/third-party-skills/).

# `reconcile/` - similar but different

Desktop (Claude Code) copies that overlap something already in the repo. Nothing here has replaced the existing version. For each row: compare, merge what is worth keeping into the existing file, then delete the copy here.

| Here | Existing version | Difference |
| :-- | :-- | :-- |
| `skills/inpatient-chart-check/` | `shared/skills/inpatient-chart-check/` | Desktop copy is a recorded Epic capture workflow with 17 references and PowerShell/Python scripts; existing one is a single SKILL.md for simulated chart data |
| `skills/inpatient-rounding/` | `shared/skills/inpatient-rounding/` | Desktop copy dated 2026-11-02; SKILL.md and R1-R8 all differ; existing one has 5 extra Epic references |
| `skills/medspacy/` | `shared/skills/medspacy/` | SKILL.md and `medspacy_check.py` differ |
| `skills/ed-note/` | `shared/skills/ed-workflow/` | Older single-file ED skill (Aug 2026) covering the same encounter stages |
| `skills/epic-chart-check-capture/` | `shared/skills/epic-chart-collect-to-notes/`, `shared/skills/inpatient-chart-check/` | Another Epic pre-round capture workflow |
| `skills/inpatient-day-prep/` | `shared/skills/inpatient-rounding/` | Compatibility name that points at the rounding workflow |
| `skills/codex-self-improvement/` | `shared/skills/self-improvement/` | Codex version: mines Codex sessions instead of claude.ai chats |
| `skills/self-improvement-claude-code/` | `shared/skills/self-improvement/` | Proposed extra section and script for mining local Claude Code transcripts |
| `context/user_profile.md`, `context/user_medical_resident_utmb.md` | `shared/context/user-profile.md`, `shared/context/work-style.md` | Claude Code's profile notes; same person, different details |
| `context/CLAUDE.global.md`, `context/AGENTS.home.md` | `shared/context/work-style.md`, root `AGENTS.md` | Home-folder working-style and browser rules for Claude Code and Codex |

Identical on both sides, so not copied: `duty-hours`, `qgenda`.

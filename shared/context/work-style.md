# Nav: work style and build stack
Source: Claude memory, 2026-11-14. Personal context lives in `user-profile.md`; this file covers how Nav builds and iterates.

## Background
- PGY-1 FM, UTMB Galveston (John Sealy). MD, UT Health San Antonio. In the US since 2011 (Karaj/Isfahan, Iran).
- Rotations done: NBN, AER1 (adult ED), FM clinic, HOS (FM inpatient). MICU starts 2026-11-16.
- Outside medicine: former paid esports IGL (CS:GO Global Elite, VALORANT Radiant), semi-pro table tennis, lifelong electronics tinkerer, anime.

## What he builds
- Clinical AI note stack on HIPAA-covered tools: Doximity, Qualified Health (QH), OpenEvidence Dotflows. Non-HIPAA LLMs only write and refine the prompts; they never see PHI. See `automation-and-apps/ai-workflows/clinical-ai-stack.md`.
- Agent skills: inpatient-rounding, ed-workflow, chart-check, duty-hours, qgenda. Older ones that aren't migrated yet: clinic-note, nbn-note, pulm-note, nephro-final.
- Epic glue: AutoHotkey v2 (RTF table paste, chart-collect macro, clip-collector, rich-copy toggle), Tampermonkey userscripts (OpenEvidence declutter), Epic Note Cleaner (HTML).
- Dictation: Superwhisper custom modes. Building his own desktop dictation app (benchmark engines first, then a correction hotkey).
- Study: Anki cards built from his own patients, Socratic/mimic-case quizzing, NotebookLM, click-to-reveal HTML widgets.

## How he iterates
- Tests on real (de-identified or simulated) outputs. Corrections are pattern-level and get encoded into the skill or prompt, not just applied once.
- Example over explanation: give him a sample, or extract rules from his exemplar.
- Keeps one current file per item plus an archive. Reverts to the last version that worked.
- Patch files and diffs over full regenerations for large prompt files.
- Platform character caps drive structure (see `automation-and-apps/ai-workflows/clinical-ai-stack.md`). Always report the char count against the cap.
- Validation checks on prompt files: ASCII only, char count, banned terms.

## Known friction (from a chat-history review, 2026-11-14)
- Edits applied wider than asked. Change only the named text.
- First drafts too long. Default to the shortest usable form.
- Version sprawl across platforms. This repo is the fix.
- Tool limits found mid-task. Check first and state the limit up front.
- Guessed roles and billing codes. Say "unknown" instead.
- AHK hotkey collisions. Check existing bindings before assigning (e.g. Ctrl+Alt+C is the chart-collect macro).
- Full report: `automation-and-apps/ai-workflows/chat-history-improvements-2026-11-14.md`.

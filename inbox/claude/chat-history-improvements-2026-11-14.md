# Suggested Improvements

Based on ~115 chat summaries, 2026-04-23 to 2026-11-14, plus installed skills and memory.
Not reachable from here: chats inside projects (hosp 2 holds ~117 inpatient chats). Run this skill inside hosp 2 for those.
No PHI included.

---

## 1. Edits applied wider than asked
- Problem: removal or change requests get read broadly. Related text gets cut too, or a cap gets applied to the wrong scope.
- Evidence:
  - 10/27 Dash bullet formatting: asked to drop one header line; the whole STYLE addendum was removed, then restored
  - 11/06 "no IF TIME, 4 max each": scope had to be guessed
  - 11/09 QH v9: modes dropped silently and needed confirmation after the fact
- Proposed text: "Edit only the exact text named. Before deleting more than the quoted target, list what else would go and ask. Report what changed as a one-line diff."
- Target: memory /preferences.md

## 2. Output longer than wanted
- Problem: the first draft is almost always too long. The fix is repeated compression rounds.
- Evidence:
  - 11/06 "less is more" lite rounding
  - 11/06 section 13 cut from 7.8k to 2.4k chars
  - AER1 cheat sheets "too long"
  - June: URLs-only, corrected twice
  - April: Farsi text "this is too much"
  - April: emails too formal and too long
- Proposed text: "Default to the shortest usable form. Instruction files: state the char count against the cap. Lists: 4 items max per section unless told otherwise."
- Target: memory /preferences.md; Doximity/QH baseline (already partly there)

## 3. Version sprawl across platforms
- Problem: the same prompt or skill lives in Claude, Codex, ChatGPT, Doximity, Copilot, Drive and project chats. Finding the latest copy takes a whole chat.
- Evidence:
  - 10/04: latest clinic/HOSP files stuck in project chats
  - 10/27: DOX_BASELINE vs "G rules" hunt
  - ed-workflow reconciled or ported 4 times (9/06, 9/07, 9/14, 9/15)
  - 11/09: shared Codex+Claude repo question left open
  - inpatient-rounding re-uploaded as zips (v7 to v8)
- Proposed text: one source of truth. Use the GitHub "skills" repo or one Drive folder, with a header in every file: name, version, date, platform, char cap.
- Target: new skill (see Potential Skills); /areas/clinical-doc-skills.md

## 4. Capability claims wrong or discovered late
- Problem: a tool limit surfaces mid-task, or Claude wrongly says something is impossible.
- Evidence:
  - June: "can't see screen" loop, 3 chats
  - 6/10: voice-captions coaching called impossible, then it worked
  - 11/07: Outlook draft/send failed silently (connection is read-only)
  - AER1: Drive writes failing
  - 10/30: "start in 12 minutes" asked of Claude
  - 11/08: no scheduling tool
  - 9/15: skill install onto a read-only mount
- Proposed text: "Before a multi-step errand, check the needed tool works and state any limit in one line up front. Known: Outlook is read-only; QGenda needs Chrome; project chats can't be searched from outside."
- Target: memory, new /topics/tool-limits.md

## 5. Role and code guesses
- Problem: a confident answer that turns out wrong.
- Evidence:
  - 11/03: ENT faculty given as the 1st-call resident, corrected twice
  - 9/09: visit code 99429 wrong
- Proposed text (qgenda skill): "Check the row's role tag (Faculty vs Resident/Fellow) before naming who to call. Shift label or hours never imply role."
- Proposed text (general): "Billing codes: give one only if verified. Otherwise say unknown and point to a prior encounter or billing."
- Target: qgenda SKILL.md; memory

## 6. AI tells in writing sent as himself
- Problem: /humanizer gets run after almost every draft.
- Evidence:
  - 11/03: bio
  - 9/30: email; em dashes and semicolons stripped
  - 10/30: Gilbert text
  - June: /de-ai-ify then /humanizer
- Proposed text: draft without AI tells from the start (no em dashes, no semicolons, varied sentence length, plain words).
- Target: memory (now in work-style); possible my-writing-style profile

## 7. Hotkey collisions in AHK scripts
- Problem: new scripts reuse bindings that are already taken.
- Evidence:
  - 11/10: Ctrl+Alt+C rich-copy toggle clashes with the chart-collect macro
  - 10/27: TypeClipboard took over Ctrl+V globally
  - Mouse4/Mouse5 both bound across scripts
- Proposed text: keep a hotkey registry and check it before assigning a key.
- Target: /areas/epic-automation.md (registry list)

## 8. Wrong chat or project context
- Problem: work starts in the wrong place, or the needed file lives in another project.
- Evidence:
  - 10/30: "wrong chat" phase one
  - 11/08: Anki deck in HOSP, not reachable
  - 10/27: G rules in HOSP
- Status: partly fixed by the 11/07 hosp 2 consolidation. The rest is a platform limit.

---

## Already Fixed

| Issue | Where |
|-------|-------|
| Opening quotes repeated, then unwanted | /preferences.md (11/14) |
| Finished files, not code | /topics/work-style.md |
| Browser errands too slow (duty hours ~40 min) | duty-hours SKILL.md L25; qgenda L14 |
| NI short-break violations | duty-hours L11 |
| No "per chart"/AI-revealing note language | ed-workflow L123-124; global-ruleset VOICE |
| Clinician-spoken drug names | global-ruleset VOICE; clinic patch 10/09; discharge v8 proposal |
| Never invent / unknown is not normal | global-ruleset SOURCES; ed-workflow L120 |
| Wrap-up restating patient facts | wrap-up prompt "transfer test" (11/02) |
| Data-only paste gets "Received."/"Ok." | inpatient-rounding L102; ed-workflow L39 |

---

## Potential Skills

| Skill | Purpose | Evidence |
|-------|---------|----------|
| case-quiz | Socratic attending/mimic case, guess-before-correct, recap at end | 11/10 x2, 11/11, 10/11, 9/03 UWorld, 9/06 abx, AER1 |
| prompt-port | Port one instruction set to Doximity 20k / Copilot 8k / ChatGPT / Codex; ASCII, char count and banned-term check; version header | Items 2 and 3 |
| prompt-compress | Shrink an instruction block to a char cap without losing rules; diff of what merged | 11/06, 11/09 |
| ahk-registry | AHK v2 script builder that checks the hotkey registry first | Item 7 |
| inbox-to-tracker | Scan Outlook/Gmail, append action items to the tracker doc, tick them off | 11/07, 9/20, 11/04 |

## Gaps found
- clinic-note, nbn-note, pulm-note and nephro-final are referenced in chats but not among the synced account skills. They may only exist in old zips or projects.

---

## Raw Friction Log
- "too complicated" (faculty full names, 11/07)
- "less is more" (rounding, 11/06)
- "no IF TIME, 4 max each" (11/06)
- "this is too much" (Farsi text, April)
- "can't you see my screen?" (June, x3)
- ENT role corrected twice (11/03)
- 99429 "wrong" (9/09)
- only the header line, keep the dash rules (10/27)
- "wrong chat" (10/30)
- "deeper look" wanted vs conversation-search skill (10/30)

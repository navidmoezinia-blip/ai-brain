---
name: feedback-build-exactly-as-specified
description: "Build scripts and prompts exactly as dictated — no unrequested guards or extras; \"remove it\" means remove completely; preserve his drafts' voice; trim prompt bloat"
metadata: 
  node_type: memory
  type: feedback
  originSessionId: 3279ab4b-8b61-44f8-bf24-819a66a6a254
  modified: 2026-08-19T23:38:09.681Z
---

When Navid dictates a script or supplies a draft, build exactly that. No unrequested safety guards, features, or scaffolding.

**Why:** I added an unrequested window-title guard to his AutoHotkey Epic script — and it was wrong anyway (checked for 'Hyperdrive'; the real Epic window title contains 'Hyperspace'), so the hotkey silently refused to fire. His reaction: "what kind of shitty instructions did you add" and "I don't care, just get rid of it completely." Separately, for his ED clinical prompt he replaced my 8-template library with his own single longitudinal draft ("i meant more something like this") and then had me trim my expanded version from ~1,800 to ~950 words ("some parts seem redundant or have too much instructions").

**How to apply:**
- Automation scripts: write the exact dictated sequence. If a guard/extra seems wise, ask or mention it — don't silently add it. "Remove it" = delete entirely, not fix.
- When he supplies a draft (prompt, template, note), preserve his structure and voice (~95% intact); make targeted additions only, never rewrite.
- Clinical AI prompts: one integrated longitudinal prompt over a library of one-shot templates. Trim aggressively — consolidate repeated rules, cut nested checklists — but keep safety-critical anti-hallucination lines at their point of use (never manufacture normal findings, never claim an unperformed test excludes a diagnosis, never invent contingencies).
- Related: [[project-ed-rotation]], [[reference-epic-hyperdrive]].

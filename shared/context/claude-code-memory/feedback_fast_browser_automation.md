---
name: feedback-fast-browser-automation
description: Browser errands must be fast — use read_page/find/form_input over screenshot-click loops; a 40-minute QGenda task drew an explicit complaint
metadata: 
  node_type: memory
  type: feedback
  originSessionId: 3279ab4b-8b61-44f8-bf24-819a66a6a254
  modified: 2026-08-19T23:38:21.072Z
---

Keep browser-automation errands fast. The Aug 19, 2026 QGenda + New Innovations errand took ~40 minutes of pixel-by-pixel screenshot/click cycles with repeated mis-clicks; Navid interrupted mid-cleanup: "theres no way it took you 40 min".

**Why:** Hundreds of screenshot round-trips, exploratory clicking on QGenda's filter UI (which opened wrong dialogs), and unverified entries that then needed cleanup.

**How to apply:**
- Prefer read_page / find / form_input over screenshot-and-click loops; screenshot only when the accessibility tree fails.
- Don't exploratory-click unfamiliar UI — QGenda's known traps are documented in [[reference-qgenda]]; read them first.
- Verify values before saving so no cleanup pass is needed (an erroneous duty-hour entry from that session may still exist — see [[reference-new-innovations-duty-hours]]).

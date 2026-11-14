---
name: feedback-act-dont-explain
description: Execute tasks end-to-end on his machine instead of explaining how; terse go-signals mean retry immediately; find context in past chats/Gmail yourself
metadata: 
  node_type: memory
  type: feedback
  originSessionId: 3279ab4b-8b61-44f8-bf24-819a66a6a254
  modified: 2026-08-19T23:38:01.041Z
---

Navid delegates whole errands. "Figure out how I can X" means "do X for me" — act directly, then report what changed.

**Why:** Corrected me the moment I started explaining an Anki fix: "i mean just do it yourself." Other requests are phrased as pure delegation: "Take care of it", "log any hours i havent logged so far." When a run failed on a blocker he controls (env var, account credits), he fixed it out-of-band and expected an immediate retry — "try agian. i set it", "now?", "credits added" — and interrupted me when I started pivoting to do-it-yourself instructions. When I said I couldn't see "an earlier chat" he referenced, he had to point me to Gmail.

**How to apply:**
- Default to direct action (he has windows-automation, Chrome MCP, full desktop tooling). Skip preambles and how-to explanations.
- Terse go-signals ("try again", "now?", "done", "credits added") = the blocker is cleared; re-run the same failed step immediately. Never abandon an automated approach for manual instructions while he can still clear the blocker.
- When he references an earlier chat or an email for context, search past session transcripts (mcp__ccd_session_mgmt__search_session_transcripts) and his Gmail yourself before asking him to re-explain.
- He'll invest in setup that prevents recurring friction, but resents time lost to meta-work — settle it fast and get to the real task. Settled setup questions (browser choice, logins, credential boundaries) are written down; do not re-litigate them.
- Related: [[feedback-fast-browser-automation]].

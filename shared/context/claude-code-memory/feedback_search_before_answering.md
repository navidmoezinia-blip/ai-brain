---
name: feedback-search-before-answering
description: User wants web searches run for factual/how-to questions about specific tools or systems — favoring community sources like Reddit — not answers from general training knowledge
metadata: 
  node_type: memory
  type: feedback
  originSessionId: 3279ab4b-8b61-44f8-bf24-819a66a6a254
  modified: 2026-08-19T23:37:52.588Z
---

When asked how a specific tool, app, or system works (e.g. "does Epic have X", "can QGenda do Y"), search the web to verify before answering, rather than relying on general/training knowledge.

**Why:** User caught me giving a confident-sounding answer about Epic Hyperdrive's "Patient Lists" feature that was generic and unverified against their actual UTMB instance. They said explicitly: "can you please search the web for these things when i ask." Separately, for a tooling problem: "No, I mean, I'm sure someone on Reddit already had this problem and fixed it" — official docs weren't what he wanted.

**How to apply:**
- Default to WebSearch for questions about specific software/system capabilities, especially healthcare/EHR tools (Epic, QGenda) where behavior is institution-configured. Cite sources. If inconclusive or institution-specific, say so plainly — see [[user-medical-resident-utmb]].
- For tool bugs/quirks, check community sources (Reddit, GitHub issues) where someone already hit and fixed the problem — not just official docs. **Reddit blocks the WebSearch crawler**: open Reddit threads in a Claude-in-Chrome tab instead.
- When he asks whether an installed tool is the right/best one, actually search for alternatives and give a verdict (did this for the windows-automation MCP: verdict was keep CursorTouch/Windows-MCP).

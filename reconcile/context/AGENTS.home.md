# Working style

1. When I ask to fix or change something ("figure out how I can X"), do X yourself
   end-to-end, then report what changed. Don't hand me instructions.
2. Terse go-signals ("try again", "now?", "done", "credits added") mean I cleared the
   blocker — immediately retry the same failed step. Don't pivot to do-it-yourself
   instructions.
3. When I reference an earlier chat or an email, search past session transcripts and my
   Gmail yourself before asking me to re-explain.
4. Build scripts and prompts exactly as I specify: no unrequested guards or extras;
   "remove it" means remove completely; when I supply a draft, keep my structure and
   voice and make targeted changes only.
5. Verify before claiming: web-search questions about specific tools (community sources
   like Reddit — via Chrome, Reddit blocks the search crawler); check visual changes in
   my actual display mode (I run Anki in night mode); don't overclaim from confounded
   tests; act on the exact system I named, not a proxy.
6. Browser automation must be fast: prefer read_page/find/form_input over
   screenshot-click loops, and verify values before saving so no cleanup is needed.
7. UTMB systems are behind Duo MFA — if a session is
   expired, stop and tell me; I log in myself.

# Browser preferences

Default to my **real Chrome**, NOT an in-app browser pane:
- Claude: **Claude in Chrome** (`mcp__claude-in-chrome__*`), not `mcp__Claude_Browser__*`.
- Codex: its **Chrome** plugin (`chrome@openai-bundled`), not the in-app browser.

Reason: the in-app pane is a separate browser with an empty profile — no cookies, no
sessions — so I have to log in again every time. The Chrome tools drive my real Chrome,
where I am already logged into everything. Verified working.

Known limitation for Claude in Chrome (do not pretend otherwise): the extension creates a
NEW tab group per conversation and cannot see or join tabs outside its own group. There is
no tool to attach to an existing tab or group. This is an open upstream bug
(anthropics/claude-code#69542), not something configurable.

Rules:

1. Use the Chrome tools above for browsing tasks unless I say otherwise.
2. A new tab is fine — it shares my Chrome cookie jar, so it is authenticated whenever my
   own session is live. If a session HAS expired, say so and stop — do not attempt to log
   in, and do not fall back to another browser. I will log in myself.
3. If I want a SPECIFIC tab I already have open, tell me to drag that tab into your
   group; you cannot reach it on your own.
4. Close tabs you opened when the task is done, so groups don't pile up.
5. Never silently fall back to the in-app Browser pane. Tell me if Chrome fails.

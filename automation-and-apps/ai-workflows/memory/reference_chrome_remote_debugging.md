---
name: reference-chrome-remote-debugging
description: How CDP/remote debugging works on Navid's Chrome (default profile) for Antigravity — toggle not flag, consent prompt every connect
metadata:
  type: reference
---

Chrome on this machine (v151) exposes CDP on port **9222** for the **real Default
profile**, which is what Antigravity attaches to.

**`--remote-debugging-port` does NOT work.** Since Chrome 136 the flag is silently
ignored on the default user-data-dir — Chrome starts, the flag sits on the command
line, and nothing ever listens. Three of his shortcuts had
`--remote-debugging-port=9222 --remote-allow-origins=*` doing nothing; removed
2026-08-19.

**What actually enables it:** the `chrome://inspect/#remote-debugging` toggle, stored
as `devtools.remote_debugging.user-enabled: true` in
`%LOCALAPPDATA%\Google\Chrome\User Data\Local State`. It persists across restarts, so
Chrome always comes up with 9222 listening and needs **no launch flags at all**.
Requires a full Chrome restart to take effect after flipping.

**Discovery is different from the flag route:**
- `/json/version` and `/json/list` return **404** — do not probe them.
- Read `%LOCALAPPDATA%\Google\Chrome\User Data\DevToolsActivePort` instead: line 1 is
  the port, line 2 the browser WS path. Connect directly to
  `ws://127.0.0.1:<port><path>`. Antigravity's `cdp_helper.py` already does this.

**Every connection triggers a consent dialog** ("Allow remote debugging?" — grants full
control incl. cookies and saved data). Not suppressible; no policy or flag exists, and
approval can't be persisted. Navid clicks Allow himself — don't click it for him. Use a
long WS `open_timeout` (~180s) so the handshake waits for him instead of timing out.

Prompt-free alternative if ever needed: `--user-data-dir=<non-default>` +
`--remote-debugging-port=9222`, but that's a separate profile with no UTMB/QGenda/NI
logins. See [[reference_machine_setup]] and [[reference_new_innovations_duty_hours]].

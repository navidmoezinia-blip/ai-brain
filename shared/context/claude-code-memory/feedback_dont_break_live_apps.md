---
name: feedback-dont-break-live-apps
description: "Never leave Navid's everyday apps (PotPlayer etc.) in a debug/test config while iterating; test in an isolated instance"
metadata:
  node_type: memory
  type: feedback
  originSessionId: 0a95b672-54cf-42b3-b72d-746e011a9bdb
  modified: 2026-09-26T15:17:43.451Z
---

While building a PotPlayer AviSynth preset (9/26/2026) I wrote a half-working debug script into his live PotPlayer config; his next video was "unwatchable" and he abandoned the whole project ("that's enough, I don't need it").

**Why:** he uses these apps constantly; a broken intermediate state costs more goodwill than the feature is worth.

**How to apply:** test in a separate instance (PotPlayer `/new`, own config) or headless harness; only touch the live config once the change is verified, and restore it immediately if a test must use it. Also: PotPlayer rewrites its ini from memory, and drops keys that are at their default values (e.g. `AvisynthUse`), so ini edits made while it runs get lost. See [[reference-machine-setup]].

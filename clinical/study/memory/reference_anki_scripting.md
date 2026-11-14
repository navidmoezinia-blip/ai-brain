---
name: reference-anki-scripting
description: "How to script Navid's Anki collection programmatically — no AnkiConnect installed, use the launcher's bundled anki library; GUI process is pythonw not anki.exe"
metadata: 
  node_type: memory
  type: reference
  originSessionId: c79c6a38-6e8e-460d-a3e0-6d7c051c13ea
  modified: 2026-08-22T15:40:40.290Z
---

Navid's Anki (Launcher 25.09, lib 25.09.4, profile "User 1", ~30k notes / 36k cards, 166 MB collection at `%APPDATA%\Anki2\User 1\collection.anki2`).

**AnkiConnect is NOT installed** and doesn't need to be. Installed add-ons: BetterSearch, Image Occlusion Enhanced, AnKing Notetypes, and an LLM add-on (643253121). AnkiWeb's download endpoint (`/svc/shared/download-addon/<id>`) rejects requests with a chain of undocumented required params (`t`, `minpt`, `maxpt`, `bidx`) — don't chase it; the GitHub repo `FooSoft/anki-connect` serves the source directly if ever needed.

**Preferred write path — use Anki's own backend, install nothing:**
```
C:\Users\nav\AppData\Local\AnkiProgramFiles\.venv\Scripts\python.exe
```
has the real `anki` package (`from anki.collection import Collection`). Close Anki, open the collection, use proper API calls (`col.decks.id(name)` creates nested decks, `col.set_deck(cids, did)` moves cards and preserves suspension), then `col.close()`. This keeps mod times/USNs correct for sync. Direct SQLite writes are a bad idea — the `decks` table stores protobuf blobs.

**Gotchas:**
- The Anki **GUI process is `pythonw.exe`** (window title "User 1 - Anki"), not `anki.exe` — `anki.exe` is only the launcher and owns no windows. Enumerating windows by the anki.exe PID returns nothing; don't read that as "already shutting down."
- Relaunch with `Start-Process "C:\Users\nav\AppData\Local\Programs\Anki\anki.exe"`; takes ~25 s to show a window.
- Reading a **copy** of the collection is safe while Anki runs, but plain `sqlite3` needs `create_collation('unicase', ...)` or any `ORDER BY name` / `tags` query fails.
- Anki messages contain U+2068 etc. — set `PYTHONIOENCODING=utf-8` or console printing dies on cp1252.
- `col.fix_integrity()` is the post-change sanity check.

See [[reference-machine-setup]], [[project-ed-rotation]].

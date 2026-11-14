---
name: reference-machine-setup
description: "Navid's Windows machine — installed tooling (AutoHotkey, windows-automation MCP, Anki), missing pieces (FFmpeg), env-var quirk, PHI hazard window"
metadata: 
  node_type: memory
  type: reference
  originSessionId: 3279ab4b-8b61-44f8-bf24-819a66a6a254
  modified: 2026-10-24T20:17:38.125Z
---

Facts about Navid's Windows 11 machine (verify before relying — machine state drifts):

Installed / working:
- **AutoHotkey** — he likes hotkey scripts bound to Mouse4 (XButton1) with changeable values as variables at the top; he edits them himself.
- **windows-automation MCP** = CursorTouch/Windows-MCP (github.com/CursorTouch/Windows-MCP; verified working Aug 2026; kept after comparing alternatives — don't re-evaluate). Role: narrow fallback that CAN drive tabs/windows he already has open (screen coordinates, unlike the Chrome extension's tab-group boundary) — use when he says "use the tab I already have open", never as default. Limits: can't select partial text within a paragraph; not for IDE work.
- **AviSynth+ 3.7.5** (installed 9/1/2026, vcredist bundle) — `C:\Program Files (x86)\AviSynth+`, both x64 (System32) and x86 (SysWOW64) runtimes registered; plugin dirs `plugins64+` (x64) and `plugins+` (x86). **PotPlayer 64-bit** (`C:\Program Files\DAUM\PotPlayer\PotPlayerMini64.exe`) plays `.avs` directly — verified on screen. `.avs` is associated with the `avsfile` ProgId (no open command), so double-click does NOT launch PotPlayer; open via drag-drop/command line or set default manually.
- **AviSynth+ plugins (9/2/2026)** in `plugins64+`: **MVTools2 2.7.47** (pinterf, ClangCL build; FFTW not installed, so use `dct=0`), **RIFE 1.3.2** (Asd-g, Vulkan/ncnn) with models v4.23 to v4.26 in `plugins64+/models` (model=72 = rife-v4.26). Navid's scripts live in `C:/Users/nav/Documents/AviSynth/` (SlowMo_RIFE.avs, SlowMo_MVTools.avs, Test_*.avs). Headless test harness: scratch `avs_harness.py` drives avisynth.dll via ctypes (C API), no ffmpeg/avs2yuv needed. PotPlayer applies scripts via right-click > Video > AviSynth > AviSynth Settings (YV12 in/out only; `potplayer_source()` is the source; `#CPUS`/`#PROGRAMDIR` are PotPlayer tokens); its bundled TrueMotion*.avs use AviSynth-2.5 `SetMTMode`/`distributor()` and svpflow DLLs that aren't installed, so they don't run on AviSynth+.
- **Anki desktop**, run in **night mode**. Card CSS must include `.night_mode`/`.nightMode` blocks (night mode forces `.card{color:white}` at high specificity — hardcoded light backgrounds go white-on-white). No JS-dependent reveals (blank on AnkiDroid/AnkiMobile/preview). Edit note types via Tools > Manage Note Types > Cards (GUI) so sync metadata stays correct.

Missing / broken:
- **FFmpeg NOT installed** (install attempt failed May 2026). Windows' own `C:/Windows/System32/tar.exe` (bsdtar) extracts .7z; Git-Bash tar does not. No 7-Zip. **Python 3.14** — pydub incompatible (imageio worked for audio concat). Node.js v24 installed at `C:\Program Files\nodejs` (verified 2026-10-24).
- Python cleanup 2026-10-24: 3.14.5 (Python install manager, `AppData\Local\Python\bin`) is the only Python; 3.12 uninstalled; Store `python.exe`/`python3.exe` aliases removed and Python\bin moved ahead of WindowsApps on user PATH (old PATH in `~\.claude\backups\user-PATH-2026-10-24.txt`). Global 3.14 site-packages pinned `mcp<2` + `sse-starlette<3` + `starlette<0.49` so fastapi and the agent-memory plugin (bare `python` command) both work — don't `pip install -U mcp`.
- **Env-var quirk:** env vars set in PowerShell or even as permanent system vars do NOT reach Claude Code subprocesses in a running session (restart required). Don't loop retries on env-var failures — pass the value explicitly or ask for a restart. Never hardcode secrets into saved scripts.

Elevation: Claude Code shell and windows-automation MCP both run NON-elevated. Windows 11 built-in `sudo` is present but disabled in Settings. Working path: write a script, `Start-Process powershell -Verb RunAs -File <script>` with output to a log file — Navid clicks the UAC prompt. Warn him before each prompt.

Firewall/WFP repair (8/28/2026, fixed IDM integration): a school-policy-removal script had mangled BFE/MpsSvc/mpsdrv service SDDLs, emptied the BFE\Parameters\Policy DACL, and set BFE's ImagePath to the wrong svchost group (`LocalServiceNoNetwork` instead of `LocalServiceNoNetworkFirewall -p`). Restored default SDDLs, fixed ImagePath, and after Navid deleted the whole Policy key (school WFP filters had come back alive when BFE first restarted and briefly broke internet), recreated the Policy skeleton with an inheritable NT SERVICE\BFE FullControl ACE. BFE/MpsSvc/IDMWFP all running since; WFP store rebuilt clean (MPSSVC provider only). The disabled proxy value `192.168.49.1:8282` in HKCU Internet Settings belongs to a wifi hotspot app Navid uses — NOT school residue, leave it alone. No school software or MDM enrollment remains.

PHI hazard: a Notepad window titled **"=== PREVISIT PULL - SCRATCH, DO NOT SIGN ==="** may be open with patient chart data. Desktop automation must never type into, read, or disturb it — open fresh windows/tabs instead.

See [[user-medical-resident-utmb]].

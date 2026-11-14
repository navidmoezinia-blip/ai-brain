# Memory index

## Who Navid is
- [Collaboration profile](user_profile.md) — role, tech comfort, work style, comms, current interests (2026-10)
- [Medical resident at UTMB](user_medical_resident_utmb.md) — FM resident, Galveston; QGenda id namoazin/"Moaziniya"; inpatient HOS days as of Oct 2026 (ED done); contacts Alec Hughes (coordinator), Jonathan Schulz

## How to work with him
- [Act, don't explain](feedback_act_dont_explain.md) — "figure out how I can X" = do X end-to-end; "try again"/"now?" = retry immediately; search past chats/Gmail yourself
- [Search before answering](feedback_search_before_answering.md) — web-search tool/system questions; prefer community sources (Reddit via Chrome — blocks crawler)
- [Build exactly as specified](feedback_build_exactly_as_specified.md) — no unrequested guards; "remove it" = remove completely; preserve his drafts; trim prompt bloat
- [Verify before claiming](feedback_verify_before_claiming.md) — check in his real context (Anki night mode); exact named system, not a proxy; name test confounds
- [Don't break live apps](feedback_dont_break_live_apps.md) — never leave PotPlayer etc. in a test/debug config; test in an isolated instance (9/26 slow-mo project abandoned over this)
- [Pre-visit guide = last 24h only](feedback_previsit_24h_only.md) — p1 filters to the 24h window; admission-long items go to the note/appendices
- [Short guides](feedback_interval_events_no_labs.md) — p1 events only management-changing (no routine labs), max 6 trajectory questions, brand med names (11/1/2026)
- [Pre-visit guide = patient care only](feedback_previsit_patient_care_only.md) — tasks connect dots, catch brewing problems and refused/undone items; admin/order cleanup goes to audit
- [Fast browser automation](feedback_fast_browser_automation.md) — read_page/find/form_input over screenshot loops; 40-min QGenda errand drew a complaint

## Systems and machine
- [QGenda reference](reference_qgenda.md) — login via Chrome only (in-app pane blocked), staff search by username not name, filter-X trap, cancel+resubmit flow for changing requests
- [New Innovations duty hours](reference_new_innovations_duty_hours.md) — short-break rule (no same-day gaps), logging method, never log on absence days
- [Epic Hyperdrive](reference_epic_hyperdrive.md) — window title "Hyperspace" not "Hyperdrive", Ctrl+3 patient search, newborn "[Mother], BabyBoy" charting, 100ms automation delays, AHK script
- [Machine setup](reference_machine_setup.md) — AutoHotkey/Mouse4, no FFmpeg (Node v24 now installed), Python 3.14, env-var quirk, Anki night mode, PHI scratch-file window, windows-automation role, UAC-elevation recipe (sudo disabled), BFE/firewall repaired 8/28/2026, AviSynth+ 3.7.5 + MVTools/RIFE + PotPlayer AviSynth wiring (9/2/2026)
- [Claude's dedicated Chrome](reference_claude_dedicated_chrome.md) — "your own Chrome" = CDP Chrome on 9333 via Playwright, not the extension; OpenEvidence signed in, UpToDate not (10/31)
- [Chrome remote debugging](reference_chrome_remote_debugging.md) — CDP on 9222 for Antigravity: toggle not flag, /json/* 404s, read DevToolsActivePort, consent prompt every connect
- [Anki scripting](reference_anki_scripting.md) — no AnkiConnect; drive the collection with the launcher venv's anki lib; GUI process is pythonw not anki.exe
- [Call-out policy + EM contacts](reference_call_out_and_em_contacts.md) — call-out steps, AER1 needs no coverage, Koscumb pakoscum@utmb.edu, EM Admin mailbox, Outlook-web compose recipe, sessions die when Chrome closed

- [Evidence tools access](reference_evidence_tools_access.md) — UpToDate = Expert AI via libux.utmb.edu proxy (Duo), parallel tabs; OpenEvidence blocks automation
- [UTMB library EZproxy](reference_utmb_library_ezproxy.md) — login.libux.utmb.edu prefix, no Duo; working route = dedicated Chrome + lit-review\libread.cjs; Scholar MCP proxy route loops (11/12/2026)
- [ChatGPT + Gemini in Claude Code](reference_multi_model_bridge.md) — official codex@openai-codex plugin (codex mcp-server removed in 0.154), gemini-cli MCP on agy backend, /ask-all skill (11/12/2026)
- [Tampermonkey on Chrome](reference_tampermonkey_chrome.md) — GLOBAL on/off switch trap (was off 9/3/2026), install via editor+clipboard not .user.js URL, Voice Access dictation hazard

## Ongoing work
- [RX 7900 XTX](project_rx7900xtx_disabled.md) — black-screen-on-wake / no-signal-at-boot diagnosed 9/3/2026: driver drops the DP monitor 50-180x/day since Adrenalin 26.5.1 (5/6), OS alive behind dark panel; ASPM/ULPS off + display-never-off applied; evidence + count1010.ps1 in C:\Users\nav\gpu-evidence; pending OSD OC off, PSU/cables, BIOS, 26.3.1 rollback; 8/18 disable + 9/2 re-enable recipe; re-disabled after 9/14 crash, fixed 9/26 via fix-2026-09-26.ps1
- [ED rotation (past)](project_ed_rotation.md) — EM1 Aug–Sep 2026, finished; canonical prompt ed-hpi-templates\ED-Encounter-Prompt.md; aer2 Doximity rework 8/28 (bullets/flash mode, not yet applied or synced to canonical); Doximity 20k-char cap; EM Rotation (AnKing) deck built 8/22
- [UWorld Modern userscript](project_uworld_modern_userscript.md) — C:\Users\nav\uworld-modern.user.js, installed in Tampermonkey 9/3/2026; Alt+T theme toggle; NBME skin is what he uses; Claude Terminal Theme script disabled individually
- [OpenEvidence Neon userscript](project_openevidence_neon_userscript.md) — C:\Users\nav\openevidence-neon.user.js, ad hiding + AMOLED/neon pink (11/12/2026); NEVER automate openevidence.com (blocks him for hours); built from fixture + Chrome cache; install/live check pending
- [Inpatient chart-check Epic quirks](reference_inpatient_chart_check_epic.md) — hover (not click) New Results Lab, shift+Down multi-select, output to Desktop\hospital\btach 1, cleaner via localhost
- [Note Templates Drive folder](project_note_templates_drive.md) — A/P standard + reviewer prompt v1 + worked example in Drive (10/31/2026); six-labeled-lines proposal for the italic paragraph pending his approval; older 'Epic Note Template Versions' folder also exists
- [OpenEvidence dot flows v7/v8](project_openevidence_dotflows_v7.md) — six flows each under 10k; v8 set 11/2/2026 in Downloads\dotflows-v8 (parts + assemble.py in build\) and Drive subfolder of Inpatient Rounding v8; v7 kept in Downloads\dotflows-v7
- [Inpatient rounding v8](project_inpatient_rounding_v8.md) — installed 11/1/2026; Doximity/QH/ChatGPT builds in Drive 'Inpatient Rounding v8'; Codex + claude.ai copies still v7
- [Clinical output = note-format A/P](feedback_clinical_output_note_format.md) — paste-ready Epic-style assessment/plan in chat with bracketed verify items, not an evidence document; heavy shorthand, mixed prose/dash-bullet/semicolon formats (11/13/2026)
- [Doximity = UpToDate retrieval](feedback_doximity_is_uptodate.md) — prompts say consult the UpToDate topic, never web-search or name societies (11/5/2026)
- [Epic Note Cleaner](project_epic_note_cleaner.md) — Documents\Projects\epic-note-cleaner\index.html canonical; default = strip repeated Epic boilerplate only, A/P extraction opt-in (11/5/2026)
- [Hermes = waste](project_hermes_verdict.md) — he dropped it 11/14/2026; his open goals (multi-LLM hub, voice, email triage, residency admin) get built in Claude Code instead

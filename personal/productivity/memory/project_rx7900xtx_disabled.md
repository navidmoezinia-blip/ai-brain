---
name: rx7900xtx-disabled
description: "Navid's RX 7900 XTX (PowerColor, 148C:2422): recurring GPU hangs + black-screen-on-wake / no-signal-at-boot; 9/3/2026 diagnosis, what was changed, the count1010 metric, evidence folder, and the pending physical/rollback steps"
metadata:
  node_type: memory
  type: project
  originSessionId: a56e53f4-f961-4857-bd17-828480a1c3a8
  modified: 2026-09-26T14:25:05.088Z
---

**Card:** AMD Radeon RX 7900 XTX, PCI\VEN_1002&DEV_744C&SUBSYS_2422148C (PowerColor), VBIOS 113-TIC106611-101,
on MSI PRO Z690-A DDR4 (BIOS 1.C0, May 2023), i5-12600K, ASUS VG259QM on DisplayPort at 1080p144. Intel UHD 770
iGPU enabled (2023 driver, no monitor). Adrenalin 26.8.1 = 32.0.31041.1004 (first installed 8/25/2026, reinstalled 9/2).

**2026-09-03 diagnosis (session dad72efd):** complaint = monitor sometimes won't wake after display-off, and no signal at
cold boot (9/3 7:29 PM took 4 power-button resets + Startup Repair). Findings verified from raw logs:
- Kernel-PnP/Device Management event 1010 ("DISPLAY\AUS25A9 surprise removed") storms of 50-215/day while the screen is
  off, onset 5/6/2026 (Adrenalin 26.5.1 install day); 26.3.1 (installed 3/27) was quiet. Same storm hit an Acer on HDMI in
  May-June, so it is driver-side, not the cable. 52 events on 9/3 morning alone.
- During the black wakes and the 9/3 no-signal boots the OS was ALIVE (winlogon logged the power-button presses):
  live desktop behind a dark panel, not a hung PC.
- LiveKernelEvent 141 (amdkmdag.sys TDR) clusters 5/2, 5/9, 7/26, 8/8, 8/18, 8/28 x3, 8/31, 9/1; 7/26 0x193 bucket =
  amdkmdag!dcn32_smu_wait_for_response inside DdiSetTimingsFromVidPn (hang while re-enabling the display). One Intel
  iGPU TDR (igdkmdn64.sys, 9/1 00:35). AMD_WATCHDOG dumps go back to Aug 2025 -> a marginal card/PSU is still ~1/3
  probability. Monitor OSD Overclocking is ON (dxdiag native mode 269.5 Hz).
- 1b0 "miniport failed" events all sit inside driver-install/restart windows; NOT evidence for the no-signal boots.

**Changed 9/3 (elevated, log at C:\Users\nav\gpu-evidence\fix-2026-09-03.log):** EnableAspmL0s/EnableAspmL1/EnableUlps=0
(+EnableUlps_NA='0' string) on class instances 0000 and 0002 (needs reboot; AMD installers reset them to 1);
display timeout AC=Never + hidden VIDEOCONLOCK=0; Blank screensaver 15 min. Evidence folder C:\Users\nav\gpu-evidence
(LiveKernelReports, Minidump, WER .wer, evtx exports, BEFORE/AFTER .reg, setupapi.dev.log, PLAN.md, count1010.ps1).

**Metric:** `powershell -File C:\Users\nav\gpu-evidence\count1010.ps1` — baseline 50-180/day, target ~0 per idle cycle.

**Pending (his side):** reboot; OSD Overclocking OFF + ECO OFF; PSU label photo + three separate 8-pin cables + reseat;
BIOS PCI_E1 Gen4 / PEG ASPM off / ReBAR on / Fast Boot off; at next black screen try Num Lock, Ctrl+Shift+Win+B, DP replug
before resetting. Next software step if still failing: rollback to Adrenalin 26.3.1 with WU driver block
(ExcludeWUDriversInQualityUpdate=1), evidence already captured so AMD Cleanup Utility is safe; then HDMI-for-a-week test;
BIOS 7D25v1N. Do NOT add Tdr* keys, do not disable AMD Crash Defender, do not delete the phantom 744C1002 devnode.

**Older history:** disabled 8/18/2026 by Crash Defender after a TDR (card re-enumerated as SUBSYS 744C1002, phantom devnode
still present); re-enabled 9/2/2026 with elevated Enable-PnpDevice + `pnputil /restart-device <instance id>` (Enable alone
gave code 31; installer "not compatible" message = disabled card). AMD services are amduw23g-<pkg>-<hash>.

**2026-09-26 recurrence:** 9/14 ~8:36 AM crash cluster (141 -> 117 -> 193 LiveKernelEvents, then BSOD 0x1E) -> card
found disabled (Code 22) this morning; display was on ROOT\BasicDisplay. He reran the 26.8.1 installer (error 207, "card
disabled"), then enabled it -> Code 31 / 0xC0000001 + 1b0 livedump. Installer reset ULPS/ASPM on 0000 to 1. Fix:
elevated fix-2026-09-26.ps1 (set the three values to 0 + pnputil /restart-device) -> OK, VG259QM on DP 1080p144, no reboot.
The 9/3 changes did NOT stop the TDRs, so the 26.3.1 rollback is now due.

**How to apply:** graphics complaints -> run count1010.ps1 first, check `Get-PnpDevice -InstanceId 'PCI\VEN_1002&DEV_744C*'`,
and re-check the three ASPM/ULPS values after any AMD installer run. Related: [[reference-machine-setup]].

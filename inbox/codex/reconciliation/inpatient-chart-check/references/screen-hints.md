# Recorded screen hints

These are hints from the 2026-10-26 recording. Confirm each target on the current
screen before clicking. Epic runs through Citrix (`wfica32.exe`). The original
desktop is 1920 x 1080; video frames are 1280 x 720, so multiply frame coordinates
by 1.5 for that original desktop.

| Target | Approximate original-desktop coordinate |
| --- | --- |
| Chart Review activity | (525, 83) |
| Chart Review > Notes | (225, 149) |
| Notes bookmark | Filled flag in the leftmost note-list column |
| Manage Orders activity | (980, 83) |
| Manage Orders > Active | (200, 149) |
| Close patient's workspace | (608, 48), small X beside patient name |

The recorded close tooltip identifies the patient workspace (Ctrl+W). Do not
use the far upper-right application X. Check the live patient tab and tooltip.

Open the Notes report before Copy All and let the Citrix clipboard transfer
finish before pasting or starting another copy; large notes can take about
15 seconds. Manually extend the Active Orders text selection to the actual
bottom, avoiding Modify/Discontinue. Notepad contains notes first, orders second.

The file is attached through a new chat in the existing Hosp project in Codex
desktop. The process is called ChatGPT, but the visible app is Codex; this does
not instruct opening the ChatGPT website.

No controller is mandated by the recording. Built-in computer use is an option;
the available Windows-MCP server is `windows-automation`. A prior `sky` Citrix
trial produced cropped images after input, with the cause unresolved. If Epic
edges or patient context disappear, stop input, inspect the full desktop using
Windows-MCP, restore the whole window, then resume. Windows-MCP previously kept
full edges during navigation; this is not a comparative reliability test or
proof of complete capture.

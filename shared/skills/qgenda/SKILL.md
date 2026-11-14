---
name: qgenda
description: Operate QGenda (app.qgenda.com) for Navid — read his schedule, look up who's working, and submit/cancel/change absence requests (PTO, OOO, sick days). Use whenever the user mentions QGenda, his schedule, shifts, who he worked with, PTO, out-of-office, sick days, or absence requests. Encodes the known UI traps so they aren't rediscovered.
---

# QGenda operations

Navid's shift-scheduling system. Username **namoazin**, displayed as **"Moaziniya"**. Landing page: "UTMB System Wide" dashboard.

## Access rules (settled — don't re-litigate)
1. Open https://app.qgenda.com in **Claude-in-Chrome** (`mcp__claude-in-chrome__*`). It rides his live Chrome session and lands authenticated. The in-app Browser pane **blocks the domain by policy** — never try it.
2. If a login wall appears: **stop and tell him** (UTMB SSO + Duo MFA). Never attempt login or handle credentials.
3. If he says "use the tab I already have open": the Chrome extension can't reach it — use the windows-automation MCP (screen coordinates) instead.
4. Prefer `read_page`/`find`/`form_input` over screenshot-click loops — speed complaints are on record.
5. Close tabs you opened when done.

## Faster read path
For "when is my rotation / what's my schedule" questions, his **Google Calendar** (QGenda "Sync Calendar") often answers without opening QGenda — entries like "NBN Fam Med Resident", "DC Clinic", "FM Didactics".

## Known UI traps
- **Staff search indexes internal usernames, not full names** (namoazin, ejnicano...). Searching a colleague's real name returns nothing. Find people via their username or by browsing the relevant task line (e.g. "Newborn Nursery (NBN)" for attendings, "NBN Fam Med Resident" for residents).
- On the Requests page, the **X on the Tasks filter group opens a "Create New Task Filter" dialog** — it does not clear filters. Cancel it; remove individual task chips via their own x icons.
- Task names include the full parenthetical: "Paid Time Off - All Day (PTO - All Day)" 8a–5p; "Out of Office - All Day (OOO - All Day)" 8a–5p (renders 6a–6p on the grid).

## Absence requests
- Submitting: pick the exact task, date, and 8:00 AM–5:00 PM times; capture the **ticket number** from the confirmation.
- **Changing a pending request's type = cancel + resubmit.** The cancel confirm is irreversible — confirm with Navid before canceling. Then create the new request and report both ticket numbers.
- In Aug 2026 the program instructed converting an all-day sick OOO to **PTO** — sick days are likely coded as PTO, but this is a single instance; confirm with Navid if unsure.

## After any change
Verify the schedule grid shows the new entry before reporting done.

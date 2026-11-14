---
name: reference-qgenda
description: "QGenda scheduling system — login, Navid's identity, task-line names, UI traps, absence-request flow, and Aug 18 2026 PTO ticket history"
metadata: 
  node_type: memory
  type: reference
  originSessionId: 3279ab4b-8b61-44f8-bf24-819a66a6a254
  modified: 2026-08-19T23:59:45.219Z
---

**QGenda** (https://app.qgenda.com) — Navid's shift-scheduling system. Landing page: "UTMB System Wide" dashboard.

Access:
- Open in **Claude-in-Chrome** (rides his live Chrome session, lands authenticated). The in-app Browser pane **blocks app.qgenda.com by policy** — it can never load there.
- Login is UTMB SSO + Duo MFA; if a login wall appears, stop and tell him — he logs in himself.
- Alternative read path: QGenda "Sync Calendar" feeds his Google Calendar (entries like "NBN Fam Med Resident", "DC Clinic", "FM Didactics") — often faster for date ranges.

Identity: username **namoazin**, displayed as **"Moaziniya"**. The staff search box indexes internal usernames (namoazin, ejnicano), NOT full names — searching a colleague's real name returns nothing even when they exist. To find someone, use their username or browse the relevant task line.

Task lines seen: "NBN Fam Med Resident" (his shifts), "Newborn Nursery (NBN)" (attending/supervisor line), "Paid Time Off - All Day (PTO - All Day)" 8a–5p, "Out of Office - All Day (OOO - All Day)" 8a–5p (renders 6a–6p on the schedule grid).

UI traps:
- On the Requests page, clicking the **X at the end of the Tasks filter group opens a "Create New Task Filter" dialog** instead of clearing filters — cancel it and remove individual task chips via their own x icons.
- Changing a pending request's type requires **cancel + resubmit** (the cancel confirm is irreversible — get Navid's OK first). Each request gets a ticket number.

History: Aug 18, 2026 sick day (NBN rotation, covered by Jonathan Schulz) was submitted as OOO (ticket #170083), then converted to PTO per program instruction (canceled #170083, new PTO ticket #170380). **Resolved — Navid confirmed it's fixed Aug 19, 2026.** Program-policy implication: all-day sick absences get coded as **PTO**, not OOO.

See [[user-medical-resident-utmb]], [[reference-new-innovations-duty-hours]], [[feedback-fast-browser-automation]]. A `qgenda` skill exists with the operational workflow.

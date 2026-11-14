---
name: reference-call-out-and-em-contacts
description: "FM residency call-out policy (steps, coverage rules), AER1/EM rotation contacts (Koscumb, EM Admin mailbox), and how to send email as Navid via Outlook web in Chrome"
metadata: 
  node_type: memory
  type: reference
  originSessionId: 69522200-15ff-46c6-92f0-d0f3de9d2b82
  modified: 2026-09-02T12:02:14.988Z
---

**Call-out policy** (Alec Hughes email "Re: Request for A Sick Day Off", Aug 17 2026, in Gmail): (1) text/call chiefs, (2) call-in line 409-747-8500, (3) QGenda leave request with rotation + coverer in comments, (4) notify rotation point of contact (faculty + their coordinator), (5) email rotation team + FM leadership/chiefs ONLY if coverage is needed. **AER 1 needs no coverage** (also OB, Cardio, MICU, Geri, Rheum, Surgery, electives). AER 1 is leave-eligible, max 4 missed shifts. All-day sick absences code as PTO in QGenda. His Aug 17 NBN call-out email (Outlook Sent Items) is the template for coverage-needed rotations: To rotation team + coverer, Cc LeBlanc, Ghozayel (chiefs), Nicanord, Denton, Hughes, Xie.

**EM / AER1 contacts**
- **Paul A. Koscumb, MD** — pakoscum@utmb.edu, Asst Professor Clin Practice, Emergency Medical Group; authored the "EM External Rotator - Orientation.pptx" (SharePoint AER 1 folder). Treated as the AER1 faculty point of contact. Reports to Dietrich Jehle.
- **Emergency Medicine Admin** mailbox — emergencymedae@utmb.edu (used as the EM coordinator address Sep 2 2026; actual coordinator name never found — the deck's uploader Kylie Jackson has left UTMB). Other GAL entries: emergencymedicinefaculty@utmb.edu (all faculty list, do not use for personal notices).
- ED attending phones (deck): Blue 409-747-5061, Gold 747-5063, Surge 747-5059, META APP 747-5066.
- New Innovations rotation line: DER:ER:EM 8/24–9/20/2026. Its "Adult Emergency Medicine I" curriculum PDF has NO contacts (generic goals). NI personnel directory is FM-only.
- SharePoint: `liveutmb.sharepoint.com/sites/departments/Family Medicine/Resident Workspace/Rotation Survival Guides/Rotation Survival Guides/AER 1` — only the orientation pptx.

**Sept 1 2026 incident:** left AER1 12p–10p shift early (sick). Email sent Sep 2 7:01 AM from Outlook to Koscumb, cc EM Admin, subject "Left AER 1 shift early - Tue 9/1 (Navid Moaziniya, PGY-1)". Chiefs/call-in line/QGenda steps NOT done by Claude.

**Sending mail as Navid:** use Outlook web (outlook.cloud.microsoft) in Claude-in-Chrome, not Gmail — Gmail sends from his personal address. Compose deeplink `outlook.cloud.microsoft/mail/deeplink/compose`; To at ~(800,132), Cc ~(800,168), subject ~(600,207), body below. Recipient lookup: type a name in To, GAL suggestions show email; clicking a resolved chip shows title/department. **Escape closes the compose window** (draft kept, nothing sent). Outlook search: type in the top search box + Enter; `?q=` URL param does nothing. `get_page_text` only returns the reading pane — screenshot for the list.

**Sessions:** if Chrome is not running, every UTMB session (Outlook, QGenda, NI, SharePoint) is gone after launch and he must log in himself. Outlook's login page defaults to his old UTHSCSA account (moaziniya@livemail.uthscsa.edu) — he must pick namoazin@utmb.edu.

**Sept 1 follow-through (done Sep 2 2026).** QGenda PTO request submitted for 9/1: task **Paid Time Off - PM (PTO - PM)**, Range of Dates 9/1-9/1, times **1:00 pm-10:00 pm**, note naming rotation/illness/no-coverage/EM notified. Result "New Request Submitted", shows Pending on 9/1 beside AER 1 12p-10p. New Innovations: logged **9/1 12:00-1:00 PM, Rotation Hours/Shift**, under the DER:ER:EM rotation. Violations page clean for the last 30 days. Still unlogged in NI under that rotation: **8/28, 8/29, 8/30, 8/31** (he was never asked about those).

**QGenda automation (Sep 2 2026):** Claude-in-Chrome clicks silently fail on the Requests page - New Request, Go, and the date arrows all ignore CDP clicks, and one screenshot call froze the renderer. **Drive QGenda with the windows-automation MCP (OS-level Click/Type)**; that worked first try for every control. Flow: Request tab > set the date box + Go > **New Request** opens a "Create Request" modal (Staff prefilled, Task type-to-search with 12 options, Requesting = Range of Dates, start/end dates, required Start/End Time, Assignment Notes) > Submit. Task list includes both bare "PTO AM/PM" and "Paid Time Off - AM/PM/All Day" - the **Paid Time Off -** variants are the ones his schedule actually renders.

**New Innovations Log Hours (Sep 2 2026):** the grid page needs a session Data token - `dutyhours_host.aspx` bare renders **blank**. Reach it from the home page link **`/DutyHours/DutyHours_Host.aspx?Control=Start`**, which redirects with the token. Then: pick Department (auto-set from the active rotation), click a Work Type (confirm "Current Selection:" appears - a click that misses gives "You must select a type of work from the list" only after you drag), then drag in the day column. **One hour row is ~15px; a drag of 10-11px still spans two rows and logs 2 hours.** Fix wrong durations in **View Hours**: click the row, click the action icon at the far left, Edit, then change **"Duration of work" (hh:mm)** and Save - easier than redrawing.

See [[user-medical-resident-utmb]], [[reference-qgenda]], [[reference-new-innovations-duty-hours]], [[project-ed-rotation]].

# Epic keyboard navigation and setup evidence

Observed in the user's UTMB Production Hyperspace / Medicine Service session on 2026-11-15. This is a local layout record, not a universal Epic keyboard map.

## Keyboard-first navigation

Open the top-left Epic menu and inspect item tooltips for assigned combinations. Items without an observed combination remain manual or use a verified menu sequence. Do not infer a shortcut from the first letter of an item. For example, `S` inside Change Main Activity opened Snapshot, not Summary.

**Verified menu entry:** press `Alt`, `Down`, `Enter` to open the first pinned item, Global Navigation. `Alt`, `Down`, `Down`, `Enter` opens the second pinned item, Keyboard Overlay. These depend on the observed pinned menu order. Pointer hover over another Epic-menu item changed selection during a later test; keep the pointer away from the menu and verify the destination rather than assuming the sequence always works. With the overlay active, press `J`, then the activity digit (without Alt). Chart Review, Summary and Intake/Output destinations were tested.

**Do not use Alt+1:** in Notes this invokes the CC speed button and opens an unsaved note. Two such previews during testing were canceled/discarded; Epic stated each had not been saved and the note count remained unchanged. A shortcut that works elsewhere is not a safe global mapping.

### Saved main tab order

| Overlay code | Activity |
| --- | --- |
| J1 | Chart Review |
| J2 | Notes |
| J3 | Results Review |
| J4 | Summary |
| J5 | Manage Orders |
| J6 | Intake/Output |

The six-tab layout persisted after closing and reopening the same chart twice. Another patient's chart has not been tested. Notes Report and Snapshot were temporary activities and disappeared on reopening. Do not advertise overlay labels as standalone Alt shortcuts.

Within Global Navigation, `A` opens Change Main Activity; `Home` then a known number of Down keys and Enter selects an entry. This is an absolute menu route, not a proven next-tab command. Prefer the overlay codes for the current six-tab layout.

### Relative movement and Help

The user prefers one repeated combination for next/previous sections or tabs. Use verified relative movement where available:

- With focus in the Neonatal Timeline, `Shift+Page Down` selects the next section. Repeated presses moved from Vitals to Unmeasurable to I/O Feeding; the latter scrolled into view. Two `Shift+Page Up` presses returned to Vitals. This changes section focus and does not necessarily align its heading at the top.
- `Shift+Left/Right` moves the Timeline one time column and `Shift+Up/Down` changes zoom; these do not change activities.
- `Ctrl+Tab` switched from the patient chart to the ED workspace. It is a workspace toggle, not next main activity. Returned to the original chart afterward.
- `Ctrl+Page Up` from I/O did not change main activities. Left after clicking the active I/O tab moved the date-field caret, not the tab. Neither is established as activity navigation.
- A universal next/previous main activity or next Summary report shortcut has **not** been established. Keep absolute overlay navigation for those levels; do not manufacture a relative shortcut.

Epic > Help > Help (F1) opened a local Shortcuts dashboard. It lists Chart Search Ctrl+Space; Global Navigation Ctrl+Alt+Shift; Toggle Workspace Ctrl+Tab; home workspace Ctrl+Shift+1 and Nth workspace Ctrl+Shift+number; Epic menu Alt; More Activities Ctrl+D; Toolbar Actions Alt+T. These are documented labels, not all live-tested. Sending the modifier-only Global Navigation combination through the current controller opened the Epic menu instead, so use the tested menu route. Closing actions were listed but not tested during this review.

### Rendering and focus

Batch a known navigation sequence and inspect its destination, rather than capturing each key. Break the batch at a redraw that changes the active pane, sidebar, chart or dialog. Starting the next menu sequence immediately after closing the sidebar failed once and changed the Show Home Medications display toggle instead of navigating; the view was restored, with no medication decision made. The same Notes sequence worked when issued in a subsequent call after the transition settled.

`Alt+Shift+Right` hides the sidebar (tested). Global Navigation lists `Alt+Shift+Left` to show it. Manage Orders automatically opened its order sidebar in this session. Keep keyboard focus away from order-entry and note-editing controls while testing navigation. Do not add arbitrary unattended chains across unverified windows.

The Citrix accessibility result contained only the application pane. Keyboard input alone does not establish patient identity, destination, capture completeness or success. Use a screenshot or another supported readable state at meaningful boundaries. No benchmark supports a claim that keyboard operation is always faster.

## Neonatal Timeline

Primary route: Summary > Neonatal Report, Timeline enabled, custom view `test`. The user configured Timeline; do not assume the standard/text report has the same fields or time range. The user selected this Timeline for drip rates and duration. The final capture scope is the last 24 hours, or the entire encounter including ED when shorter; an earlier acceptance of a roughly 22-hour screen does not shorten that scope. A complete equivalence audit was stopped at the user's direction.

Built-in help is Timeline ellipsis > Icon Legend and Keyboard Shortcuts > Keyboard Shortcuts.

| Keys | Documented action | Verification |
| --- | --- | --- |
| Shift+Left / Right | Move time range one column earlier/later | Tested both directions |
| Ctrl+Left / Right | Move time range one page earlier/later | Read in built-in help |
| Shift+Up | Zoom out time range | Tested |
| Shift+Down | Zoom in time range | Tested |
| Shift+mouse wheel | Scroll left/right | Read in built-in help |
| Shift+Page Up / Page Down | Previous/next section | Tested repeatedly in both directions |
| Page Up / Page Down | Scroll up/down | Read in built-in help |
| Arrow keys | Navigate data elements | Read in built-in help |
| X + arrow keys | Navigate populated grid cells or medication data | Read in built-in help; key interpretation not live-tested |
| F5 | Refresh | Read in built-in help |
| ? | Shortcuts and icon legend | Read in built-in help |
| Alt+F | Time-per-column / time-range menu | Read in built-in help |
| Alt+M | Custom-view dropdown | Read in built-in help |
| Alt+V | User settings | Read in built-in help |
| Alt+F1 | Enter/leave hover bubble | Read in built-in help |
| Escape | Close focused hover bubble | Read in built-in help |
| Enter on a row | Expand/collapse | Read in built-in help |
| Left / Right on date headers | Previous/next date/time column | Read in built-in help |
| Enter / Shift+Enter on date header | Zoom in/out from that date/time | Read in built-in help |

Shift+Up followed by Shift+Down did not restore the identical original scale: zoom increments can choose different columns/ranges. To restore the observed default, use the time menu's **Time Range on Screen > 1 day**, which rendered **2 hours per column for ~22 hours** at full width. Verify labels; opening/closing a sidebar or maximizing the window can change the visible range. Do not assume the menu label is exact coverage. Capture any omitted leading part of the required 24 hours in an overlapping view.


### Fit the capture window before screenshots

For the last 24 hours, choose Time Range on Screen > 1 day, then check actual endpoints and cover any omitted interval. For an encounter shorter than 24 hours, retain all ED/admission data through the anchor and drag the **left handle of the bottom time-range navigator** rightward to remove unused pre-encounter time; keep the latest data visible at the right. This handle adjustment was tested live and expanded a short encounter across the screen. Coordinates depend on window size; inspect the current handles instead of replaying numeric positions. Verify the time axis after each adjustment. Do not crop away early encounter data to align a later infusion's first event.

Take screenshots directly from the report, then scroll with overlap for remaining relevant rows. Use the actual captured date/time labels in the separate coverage record. If Epic is obscured or its screenshot is cropped, bring the correct window forward and restore/maximize it before capturing; resizing may require fitting the range again.

Read medication graph events and details, not gray order-duration bars alone. The legend distinguishes ungraphed values, collapsed values and sampling. A row can contain additional events within a displayed time column. Distinguish actual displayed rates from order details and from a lack of documentation. Use exact event times when the question requires them.

## Full vertical report inventory and selective review

A top-to-bottom scroll of the configured `test` Timeline on 2026-11-15 reached the final O2 Sats group. The report is much broader than the first screen or medication section. Observed group order:

Vitals > Unmeasurable (mixed laboratory results) > I/O Feeding > Flowsheets > Ventilation > Hearing Screen > Medications > Hematology > Intake/Output > Daily Running Totals > Blood Gases > Observations > O2 Sats.

This is the observed layout in one adult chart, not a promise that every patient has the same populated rows. The sweep was visual inspection, not an additional raw-text export. No Timeline filter settings were changed.

| Group | Efficient MICU use and observed limits |
| --- | --- |
| Vitals | Review relevant time-aligned vital trends; temperature, oxygen flow, saturation, heart rate and MAP rows were present. |
| Unmeasurable | Despite its name, contains chemistry, hematology, urinalysis and other laboratory results. Scan relevant trends; do not assume the label means unusable data. |
| Flowsheets / I/O Feeding | Weight was populated under Flowsheets; I/O Feeding had no displayed rows in this case. Empty groups are not evidence of absent nutrition or intake. |
| Ventilation | Populated oxygen device, FiO2, oxygen flow, mean airway pressure in cmH2O, set respiratory rate, PIP and PEEP/CPAP rows. Do not confuse mean airway pressure with blood-pressure MAP. These rows establish useful respiratory content but do not establish complete ventilator mode, tidal volume or all support settings. Resolve missing fields from the original respiratory source. |
| Medications | Administration events and infusion-rate trajectories; inspect exact events when needed. Gray order bars alone are not actual administrations. |
| Hematology | Compact WBC/Hgb/Hct/platelet group; some values also occur in the mixed lab group. Review once unless reconciling a discrepancy. |
| Intake/Output and Daily Running Totals | Intake/output bars, net I/O, running intake/output/net totals are present. Use these for the initial trend; keep the dedicated I/O tab for component detail and shift/day boundaries as the user requested. |
| Blood Gases | Includes arterial/venous-labelled gas and co-oximetry rows. Read source labels and collection times; not every arterial parameter was visible in this case. Do not mix venous and arterial values or assume full panels. |
| Observations | Long mixed group: documented neurologic observations/GCS components, pain scale and goal, rhythm, nutrition route/NPO, bowel-movement field, respiratory effort/suction, skin/wound and mobility documentation. Target these to current problems; dated nursing observations are not a new clinician exam. A complete RASS/SAT/SBT source was not established by this sweep. |
| O2 Sats | Final group repeats saturation data already visible in Vitals. Avoid a redundant full pass. |

The user explicitly noted that some content may be useless. Do not require reading every row on each routine pass. Empty Hearing Screen and pediatric growth-chart metadata were present in this adult chart; routine bed/linen/equipment/learning-preference fields and repeated measurements generally need no separate rounding extraction unless the active question makes them relevant. Do not suppress the entire Observations group: useful data are interspersed with low-priority rows. Abnormal color alone does not determine relevance.

Use Shift+Page Down/Up for section jumps, then Page Down/Up or a targeted scroll within a long relevant section. For routine objective review prioritize Vitals, relevant labs, Ventilation, Medications, Hematology, I/O, Blood Gases and selected Observations. Opening another tab should answer a concrete missing-source question. When raw text is explicitly requested, preserve copied source blocks unchanged; selective clinical review does not authorize trimming those blocks.

## Notes and bulk copy

Chart Review > Notes exposed more admission documents than the Notes activity's list in the reviewed case. Check filters, including Exclude and specialty/type filters, and the loaded date range before selecting. A filtered list does not establish absence of a note.

An observed bulk path: select the bottom desired note row, `Ctrl+Shift+Home`, `Enter`; verify the combined Notes Report actually opens, then Copy All. Check headers and the first/last source. Ctrl+A did not reliably select all notes in the prior workflow. Coordinates are layout-dependent.

Notes Report's Copy All icon and Summary's similarly positioned PasteBoard icon are different. In supported Summary text reports, right-click > Copy All captured the report; do not assume this captures graphic Timeline events. Keep the copied text unchanged.

For Manage Orders, text selection from the actual first entry extended with Ctrl+Shift+End and Ctrl+C captured through the bottom in this session. It requires initial focus/selection verification and status checks; it is not a blind global shortcut.

## Personal tab settings

Verified: More Activities dropdown > right-click Intake/Output > **Pin this item** added its main tab. Right-click > **Move to More Activities** moved Advance Care Planning, Order Inquiry and Rounding out of the main row without removing them from Epic. Two drag attempts to move Summary did not work.

Summary ellipsis > Add or remove tabs from toolbar allowed moving Neonatal Report to the first position. Saved order: Neonatal Report, Vitals, Micro Summary (90 Days), MAR ADMINISTRATIONS, Event Log, All Ord. After reopening the same chart, Summary automatically opened Neonatal Report with Timeline enabled and custom view `test`; the current display was 2 hours per column for approximately 23 hours. Visible screen duration does not replace the required capture interval.

Controller timeouts were resolved by resetting the CUA session; no continuing outage is established. Cross-patient persistence and personal phrase/order-set setup remain unfinished.

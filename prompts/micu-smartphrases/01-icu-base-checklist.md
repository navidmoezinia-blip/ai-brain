# .NAVICUBASE — ICU daily checklist (DRAFT v1)

How to read this draft:
- `***` = blank. F2 jumps to the next one.
- `{LIST: a / b / c}` = a SmartList to create. Choices are separated by ` / `. "multi" means you can pick more than one.
- Text is in your DMO shorthand (pt, b/l, etc.) so typed and dictated text look the same.

---

## Phrase text (paste into SmartPhrase Manager)

```
ICU DAILY CHECKLIST
SEDATION / DELIRIUM
- RASS: {RASS} | Goal RASS: {RASS GOAL: 0 to -1 / -1 to -2 / -3 to -4 (vent dyssynchrony, paralytic, ICP) / ***}
- CAM-ICU: {CAM-ICU: negative / POSITIVE (delirium present) / unable to assess, RASS -4 or -5}
- Sedation/analgesia: ***
- SAT today: {SAT: done, tolerated / done, failed (***) / not done: *** / N/A, not on continuous sedation}

LINES / TUBES / DRAINS
- {LDA TYPE: PIV / CVC / PICC / HD catheter / arterial line / ETT / trach / OGT / NGT / Dobhoff / Foley / chest tube / JP drain / rectal tube / ***} - site: *** - day #*** - {LDA SITE: site c/d/i, no erythema, drainage, or tenderness / erythema / purulent drainage / tenderness / dressing not c/d/i} - still needed? {LDA NEED: yes, *** / no, plan to remove today}
- {LDA TYPE} - site: *** - day #*** - {LDA SITE} - still needed? {LDA NEED}

SKIN
- Sacrum: {PRESSURE INJURY}
- Heels: {PRESSURE INJURY} b/l
- Device sites (ETT/trach, NGT/OGT, BiPAP mask, Foley, lines, SCDs): {DEVICE SKIN: no device-related injury / medical device-related pressure injury at ***}
- Braden: ***

VTE
- Calves: {CALVES: symmetric, nontender b/l / ASYMMETRY R>L, *** cm / ASYMMETRY L>R, *** cm / tenderness ***}
- Ppx: {VTE PPX: enoxaparin *** / heparin SQ *** / SCDs only, chemo ppx held 2/2 *** / therapeutic anticoagulation *** / ***}

VENTILATED PT
- HOB >=30 deg: {HOB: yes / no, ***}
- Oral care/CHG: {ORAL CARE: done per protocol / not done, ***}
- Cuff leak: {CUFF LEAK: present / ABSENT / not assessed / N/A, not near extubation}

PROBLEM-SPECIFIC ADD-ONS
{ICU PROBLEM ADD-ONS}
```

## ICU PROBLEM ADD-ONS (multi-select SmartList, one choice per problem)

Each choice's text is the add-on block that goes into the note. Choices are waiting on unit problem list.

| # | Choice label (what you see in the menu) | Text inserted |
|---|---|---|
| 1 | *** | *** |

---

## SmartLists to create (one time, reused everywhere)

| SmartList | Select | Choices |
|---|---|---|
| RASS | single | +4 combative / +3 very agitated / +2 agitated / +1 restless / 0 alert and calm / -1 drowsy / -2 light sedation / -3 moderate sedation / -4 deep sedation / -5 unarousable |
| RASS GOAL | single | see phrase text |
| CAM-ICU | single | see phrase text |
| SAT | single | see phrase text |
| LDA TYPE | single | see phrase text |
| LDA SITE | multi | see phrase text |
| LDA NEED | single | see phrase text |
| PRESSURE INJURY | single | intact / blanchable erythema / stage 1 / stage 2 / stage 3 / stage 4 / unstageable / deep tissue pressure injury |
| DEVICE SKIN | single | see phrase text |
| CALVES | single | see phrase text |
| VTE PPX | single | see phrase text |
| HOB | single | see phrase text |
| ORAL CARE | single | see phrase text |
| CUFF LEAK | single | see phrase text |

> Your hospital may have an LDA SmartLink that pulls line type, site, and insertion date from flowsheets. In the SmartPhrase editor, open the SmartLink lookup and search "LDA". If one exists, it can replace the line rows above.

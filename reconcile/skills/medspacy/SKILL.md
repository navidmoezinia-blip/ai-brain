---
name: medspacy
description: Run medspaCy (clinical NLP) on a pasted or saved clinical note to check how findings are asserted - negated ("denies chest pain"), historical (PMH), hypothetical ("return if fever"), family history, or uncertain - and which note section each mention sits in. Use when the user says "medspacy", asks to check negation or assertion in a note, wants to know whether a finding is present vs denied vs past vs family history, or wants a findings table from a note.
---

# medspaCy note check

medspaCy finds the terms you give it and labels each mention with its ConText status and
section. It does not discover findings on its own (no UMLS here), so you pick the terms.
RapidFuzz also matches close spellings of each term ("pnuemonia", "short of breath",
"chest pains"); the "as written" column shows the text the note actually used.

## Steps

1. Get the note text. If it was pasted, save it to a temp `.txt` file first.
2. Read the note and list the terms to check: problems, symptoms, exam findings, and
   diagnoses the user cares about. Use the wording the note uses ("SOB", not "dyspnea", if the
   note says SOB). Add any terms the user named.
3. Run the script (it is in `scripts/` next to this file):

   **Claude Code on Navid's PC** - use the dedicated venv (Python 3.12; 3.13/3.14 lack wheels
   for its native deps):
   ```
   "%LOCALAPPDATA%\medspacy-venv\Scripts\python.exe" scripts/medspacy_check.py NOTE.txt --terms "chest pain,SOB,pneumonia"
   ```

   **claude.ai / other sandbox** - install once per session, then run:
   ```
   pip install medspacy rapidfuzz
   python scripts/medspacy_check.py NOTE.txt --terms "chest pain,SOB,pneumonia"
   ```
   For a long list, put one term per line in a file and pass `--terms-file terms.txt`.

4. Show the table, then a short read of it: what is affirmed now, what is denied, what is
   history or family history only. Call out mentions where the label looks wrong.

## Limits

- ConText is rule-based. It misses some hedges ("concern for X" comes back affirmed) and can
  over-reach across a long sentence. Check odd labels against the sentence column.
- Section names come from medspaCy's default headers. On Epic notes they are often wrong
  (a PMH table tagged `social_history`, a plan line tagged `imaging`) or `-`. Trust the
  sentence over the section label.
- Fuzzy matching covers typos and plurals only for terms of 5+ characters. Abbreviations
  (SOB, CHF) and synonyms (dyspnea vs SOB) still need their own terms.
- The fuzzy pass refuses variants that flip meaning: hyper/hypo, pre/post, inter/intra, an
  added prefix (abnormal, unremarkable, noncompliant) or a suffix other than -s/-es/-ness
  (so "pneumonia" does not match "S. pneumoniae"). Check the "as written" column anyway.

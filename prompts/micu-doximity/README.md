# MICU set for Doximity

The eight MICU DotFlows from [`../micu-dotflows/`](../micu-dotflows/), repackaged as one Doximity assistant: a main instruction box under 20,000 characters plus five uploaded source files. Prompt text only; no patient data.

## Files

| File | Where it goes in Doximity | Holds | Characters |
| --- | --- | --- | --- |
| [`DOX_MICU_MAIN.txt`](./DOX_MICU_MAIN.txt) | Main instruction box | Mode routing, shared MICU rules, `.micuprep`, `.micuupdate`, `.micunote` | 19,830 |
| [`sources/DOX_MICU_HP.txt`](./sources/DOX_MICU_HP.txt) | Uploaded file | `.micuhp` | 4,995 |
| [`sources/DOX_MICU_CHECK.txt`](./sources/DOX_MICU_CHECK.txt) | Uploaded file | `.micucheck` | 4,039 |
| [`sources/DOX_MICU_PRESENT.txt`](./sources/DOX_MICU_PRESENT.txt) | Uploaded file | `.micupres` | 1,946 |
| [`sources/DOX_MICU_HANDOFF.txt`](./sources/DOX_MICU_HANDOFF.txt) | Uploaded file | `.micuhandoff` | 2,786 |
| [`sources/DOX_MICU_CONSULT.txt`](./sources/DOX_MICU_CONSULT.txt) | Uploaded file | `.micuconsult` | 2,975 |

The main box holds what every request needs (the shared rules) and the three modes used on every patient every day. The other five modes load from their files when named. Keep the file names as they are: the main instructions refer to them by name.

The main box has 170 characters to spare, or 54 if Doximity counts each line break as two characters. Anything added to it has to be paid for by moving text out.

## Set up

1. Paste the full text of `DOX_MICU_MAIN.txt` into the main instruction box.
2. Upload the five files in `sources/` as sources for the same assistant.
3. Test with a fictional case before real use (see Status).

## Use

Name a mode to get its output: `.micuprep`, `.micuupdate`, `.micunote`, `.micuhp`, `.micucheck`, `.micupres`, `.micuhandoff`, `.micuconsult`. The short names `prep`, `update`, `note`, `hp`, `check`, `pres`, `handoff` and `consult` also work. Pasting data without naming a mode gets "Received." and the data is held for the next request. The [DotFlow README](../micu-dotflows/README.md) says when to use each mode.

## What differs from the DotFlows

The mode and shared-rule wording is copied unchanged, with these exceptions:

- The shared rules appear once, in the main box, instead of being appended to every flow.
- A five-line routing header opens the main box. It lists the modes, says which file holds which mode, and tells the assistant to stop if a file is missing or partly unreadable instead of improvising the format.
- Each mode's first line starts with `MODE` instead of `DOTFLOW`.
- Three OpenEvidence-specific phrases are replaced. "Pages" is dropped from the list of things the assistant must not create. "Use OpenEvidence for the specific uncertain decision" becomes "Retrieve evidence for the specific uncertain decision". "outside OpenEvidence" becomes "outside this chat".
- Each source file opens with one line saying it holds instructions only and applies together with the shared rules.

## Change it

Do not edit the `DOX_MICU_*.txt` files by hand. Edit the DotFlow sources (`../micu-dotflows/modes/*.txt`, `../micu-dotflows/shared-rules.txt`) or [`router.txt`](./router.txt), then rebuild:

```bash
python prompts/micu-doximity/build.py
```

The build fails if the main box would exceed 20,000 characters with line breaks counted twice, if any file contains non-ASCII text, or if a DotFlow mode is not placed in the main box or a source file. To confirm the committed files still match their sources without writing anything:

```bash
python prompts/micu-doximity/build.py --check
```

## Status

- Built and checked by script only. Nothing has been pasted into Doximity or run there.
- The 20,000-character limit is the one stated for the Doximity main instruction box. How Doximity counts line breaks is not confirmed; the file is under the limit either way.
- Whether Doximity reads an uploaded file in full when a mode is named is untested. Check `.micuhp` first: the output should show all eight system headings and all twelve `MICU CHECKLIST` labels in order. If it does not, the file was not read whole.
- The evidence rules assume the assistant can retrieve current evidence. Where it cannot, they require it to say so, not to claim verification.
- The DotFlow [reconciliation notes](../micu-dotflows/reconciliation.md) still describe the underlying rules and their review history.

# Initial import validation

Performed 2026-11-14 for the source-only `codex/initial-import` PR to `main`.
The [manifest](MANIFEST.md) records the inventory, source selection and limits.

## Checks

- Synced remote state with `git fetch origin --prune`, inspected remote branches
  and open PRs, and read the owning `AGENTS.md`, `STATUS.md` and `context/`.
  Started from `origin/main`; no Claude or Gemini branch was modified.
  A final fetch detected Gemini PR #5; its separate project/deployment paths
  were inspected and its shared-status coordination was added to the manifest.
  When #5 subsequently merged, updated this branch from `origin/main` and
  resolved only `STATUS.md`, retaining both activity entries and inventories.
  The command-board/deployment files match the new `origin/main` exactly.
- Validated all four canonical `skills/*/SKILL.md` entrypoints with the
  installed `skill-creator/scripts/quick_validate.py`: all passed.
- Checked local Markdown links. Active imported resources resolve. Nine missing
  sibling links are confined to the explicitly partial, uninstalled inpatient
  candidates; two project-index template URL fields are intentional placeholders.
- Verified all 28 source-backed imported file checksums against
  [source-inventory.json](source-inventory.json). Its raw source hashes and LF
  hashes distinguish source capture from portable imported line endings.
- Verified all 14 inpatient candidates and the three project templates preserve
  their source content after newline normalization. All nine selected rounding
  references differ from the inspected PR #1 version; unchanged references
  were not duplicated.
- Compared the clinic operational files to source: reciprocal-link changes
  only. Base length is 19,792 LF / 19,918 CRLF characters, below the 20,000 cap.
- Compared the ED baseline clinical engine below its separator to source: no
  content change. Launcher library and Epic field map preserve source content;
  the imported skill and READMEs establish the current baseline's precedence.
- Reviewed imported text for patient records, identifiable encounters and
  credentials, with an independent agent review. Pattern scans found no token,
  private-key, populated MRN/DOB, phone-number or absolute home-path matches.
  No binary files, `.env` files, archives, databases, screenshots or files over
  500 KB are included. Pattern scans supplement source selection and review;
  they are not a general automated deidentification guarantee.
- Reviewed the staged file list and whitespace with `git diff --cached --check`.
  Text uses UTF-8 and LF through `.gitattributes`. The preserved R6/R8 source
  formatting includes two-space Markdown hard line breaks, which the Markdown
  whitespace attribute permits; these were checked separately.

## Scope limits

The personal-context extension was checked separately after the initial
import: current instructions and dated personal/feedback sources were reviewed,
older profile claims were scoped or omitted, and all active context links and
source/output hashes were verified. A second agent checked the reconciliation
of generic style rules with current clinical-template and autonomy rules.
No raw chat history, private contacts, patient material or session identifiers
were copied. Working-personality impressions are explicitly interpretations.

No patient chart, checkpoint, populated worksheet, patient-specific research or
patient delivery folder was imported. No Epic access, EHR write, clinical query
submission, application installation, model call or source-installation cutover
was performed. Existing project code remains in its owning repositories.

These checks validate the import's text structure, source fidelity, dependency
disclosure and privacy review. They do not establish clinical guideline
currency, model-output quality, live authentication, application behavior or
clinical integration. Current medical/billing decisions still need the evidence
checks required by the owning workflow.

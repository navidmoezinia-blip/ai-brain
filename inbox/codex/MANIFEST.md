# Codex initial-import manifest

Prepared 2026-11-14 on `codex/initial-import`, based on `main`'s artifact-type
layout. These are proposed shared resources, not a claim that the branch has
been merged or that installed tools have been reconfigured.

## Imported resources

| Destination | Prepared source | Import decision |
| :--- | :--- | :--- |
| `context/` | Current user instructions; shared-workspace policy/user facts; prepared PR #1 profile/work-style; selected local user/feedback memory records | Personal background/interests, communication/writing style, collaboration and labeled working impressions, learning preferences, clinical/workspace conventions. Sources are curated rather than raw memory dumps; older PR #1 profiles map to the fuller documents below. |
| `prompts/clinic/` | Shared-workspace `prompts/fm-continuity-clinic-assistant.md`, `templates/fm-continuity-clinic-assistant.md`, `templates/family-medicine-deidentified-previsit-brief.txt` | Two operational clinic files with reciprocal links adapted; worksheet saved as Markdown; README documents routing and cap. |
| `prompts/emergency-department/` | Prepared `ed-hpi-templates/ED-Encounter-Prompt.md`, `UTMB-ED-Note-Template.md` | Current baseline and Epic field map; local generation paths removed, relative companions added. |
| `knowledge/emergency-department/` | Prepared `ed-hpi-templates/ED-Previsit-Launchers.md` | Existing clinical launcher reference; older embedded engine is subordinate to the current baseline. No new evidence review. |
| `skills/ed-note/` | Local custom `ed-note` trigger and its newer prepared ED baseline | Thin entrypoint reads the current baseline, field map and launcher library rather than importing stale full instructions. |
| `skills/note-audit/` | Local custom `.agents/skills/note-audit/SKILL.md` | Preserves audit workflow; browser wording made host-neutral; `utd` links to the imported rev 9 source specification. The existing restriction on processing UpToDate text remains a user constraint. |
| `skills/ask-all/` | Local custom `.agents/skills/ask-all/SKILL.md` | Preserves subscription/CLI workflow including its read-only Codex call. Host labels and backend assumptions describe the prepared configuration; check available tools before running. |
| `skills/codex-self-improvement/` | Shared-workspace `.agents/skills/codex-self-improvement/` | Entrypoint and UI metadata copied; evidence-mining sources are inputs to future authorized runs, not imported chat history. |
| `projects/<project>/README.md` | Existing project indexes plus confirmed Git remotes and owning READMEs | Catalogs six independent projects/tools without duplicating their source repositories. OpenEvidence MCP is an upstream third-party repository. |
| `projects/workspace-templates/` | Shared-workspace `templates/project-AGENTS.template.md`, `project-index.template.md`, `project.gitignore` | Small reusable project scaffolds; README links the owning project-creation script. |
| `inbox/codex/reconciliation/` | Current shared-workspace rounding rev 9, recorded raw-capture variant, and compatibility router | Only changed rounding references and the active capture/redirect candidates; precise target map in its README. |

Source shared-workspace snapshot: commit `4989cff` (installed rounding rev 9).
Only allowlisted prepared resources were read for import. Patient capture and
delivery directories, local checkpoints, chat/state databases, credentials and
browser profiles were excluded. Local sources without a repository revision
are identified by the per-file hashes in [source-inventory.json](source-inventory.json).

## Pending PRs and reconciliation

Remote branches and open PRs were checked before writing. No other agent's
branch was modified.

| Existing work | Coordination decision |
| :--- | :--- |
| [PR #1: Claude initial import](https://github.com/navidmoezinia-blip/ai-brain/pull/1), targets `main` | Do not modify its branch or overwrite its inpatient global ruleset/11 skill paths. On the user's follow-up request, curated its prepared personal facts/preferences into the four fuller shared context documents below; reconcile those older profile files into these owners rather than keep parallel profiles. Its rounding source is rev 8; rev 9 changed references are staged separately. |
| [PR #2: Claude topic layout](https://github.com/navidmoezinia-blip/ai-brain/pull/2), targets `structured-by-topic` | Keep this PR on the user's chosen `main` artifact-type layout. Do not reorganize the other branch. |
| [PR #4: Claude desktop import](https://github.com/navidmoezinia-blip/ai-brain/pull/4), targets `structured-by-topic` | Its topic/reconcile copies overlap `ask-all`, `note-audit`, `codex-self-improvement`, old `ed-note`, and chart-check resources. Use the single canonical main-layout paths from this import when consolidating, and reconcile behavioral differences rather than adding duplicate installed copies. |
| [PR #5: Gemini cloud command board](https://github.com/navidmoezinia-blip/ai-brain/pull/5), merged to `main` during handoff | Its `projects/command-board/` and deployment workflow have no imported source-path overlap. Merged the updated `origin/main` into this Codex branch, preserving the board/deployment files unchanged and deliberately combining both `STATUS.md` inventories/activity entries. |

Audited remote snapshots: PR #1 `6829d52cc3012ede83613fe6576581774b4d7dfd`;
PR #2 `3aaa0989e565320267004ceb1ac00788402022f0`;
PR #4 `f5c5693e0e59eb46bbe96f5f7a3f1ff5c3c53673`.
The final remote-state check also inspected PR #5's changed paths and status
entry before committing this import.
PR #5 then merged while PR #6 was being opened. The Codex branch was updated
with `origin/main` at `7134a83fcc1a5ddbb6b0ce5d6a02cbb545b801c9`; only the shared
`STATUS.md` needed conflict resolution. No existing application code was edited.

The recorded raw-capture candidate prohibits the cleaner. PR #1's different
simulated collection skill uses one. These have different scope and must not
be silently combined. No patient access or clinical workflow was run here.

The `note-audit` `utd` specification can be read from the imported reconciliation
copy independently. The full `inpatient-rounding` and `inpatient-day-prep`
workflows are not newly installed by this PR. Their dependencies must be
resolved before promoting the candidate router.

## Personal-context expansion

The user explicitly requested personal context, style and personality during
the initial-import handoff. Applied the `productivity:memory-management` skill
for a short discovery index and focused detail files, while retaining this
repository's required `context/` layout. No global agent entrypoint or private
memory database was changed.

| Proposed owner on `main` | Material reconciled from older prepared context |
| :--- | :--- |
| `context/navid-personal-context.md` | PR #1 `user-profile.md` identity and `work-style.md` background/interests; dated local user facts. |
| `context/communication-and-writing-style.md` | PR #1 tone/writing defaults; current instructions, voice-dictation preference and Nov 12-13 clinical-writing corrections. |
| `context/collaboration-and-personality.md` | PR #1 working/iteration preferences plus explicit local feedback. Working impressions are labeled interpretations, without psychological or diagnostic claims. |
| `context/learning-preferences.md` | Recorded study approaches, concrete-example preference, Anki/night-mode and source-linked reasoning. NotebookLM is a recorded interest; no notebook links/content were imported. |

Use these owners when consolidating PR #1's `context/user-profile.md` and
`context/work-style.md`. Do not add the two older full profiles as competing
current instructions. Its `clinical-ai-stack.md` remains a separate proposal.

Resolved stale/conflicting details: omitted old "no Git repos" statements,
rotation schedules, browser/authentication claims, contact lists and surname
ambiguity. Generic plain-text/no-header rules yield to active clinical
templates; clinical shorthand can use semicolons even though personal prose
defaults avoid them. Clear requests proceed; material uncertainty gets a
concise question rather than an unconditional pause.

[personal-context-sources.json](personal-context-sources.json) records the
selected source paths/dates and hashes without copying their raw incidents,
private contacts, patient details or memory/session identifiers. Saved facts,
explicit preferences and working interpretations remain distinct.

## Deliberate exclusions

- PHI, patient-specific notes/research, recorded media, screenshots, populated
  worksheets, case-specific Drive deliverables and checkpoint contents.
- Secrets, `.env` files, authentication/configuration state, cookies, browser
  profiles, installed model data and raw Codex/Claude chat databases.
- System/bundled/plugin-cache skills and generic third-party skill collections.
  They were not relabeled as user-authored portable skills.
- Generated inpatient single-file Markdown/ZIP and ED Doximity export;
  obsolete inpatient section-worker scripts, historical capture references and
  retired cleaner integration.
- Old standalone inpatient prompt modules whose source README calls them
  canonical even though the current project index identifies the merged
  rounding skill as the active workflow. Their existence is recorded here;
  they were not promoted as competing current instructions.
- Full application repositories and binary `.docx`/`.pdf`/deck duplicates.
  Their owning source repositories and selected documented asset folders are
  linked from the project catalog.
- NotebookLM content: no study notebook links/notes were present in the
  allowlisted prepared local sources. No notebook contents or unrelated Drive
  files were inferred or imported.

## Review handoff

1. Review this PR against `main` and the existing PR #1. Keep the single shared
   directory structure from `AGENTS.md`.
2. Apply the rev 9 reference candidates to the agreed rounding source after
   reconciling the capture-scope difference. Then update `note-audit`'s `utd`
   link from the candidate R1 to the accepted canonical R1.
3. Promote the compatibility router only with its accepted rounding dependency.
4. If the topic-layout work is later consolidated, remove redundant copies
   deliberately after checking callers. Do not merge it wholesale into this layout.
5. Update installed host entrypoints and external prompt apps only in a later
   authorized deployment. This import supplies source and provenance.

Validation and limits are recorded in [VALIDATION.md](VALIDATION.md).

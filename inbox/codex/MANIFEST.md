# Codex initial-import manifest

Prepared 2026-11-14 on `codex/initial-import`, based on `main`'s artifact-type
layout. These are proposed shared resources, not a claim that the branch has
been merged or that installed tools have been reconfigured.

## Imported resources

| Destination | Prepared source | Import decision |
| :--- | :--- | :--- |
| `context/codex-workspace-conventions.md` | Current user instructions; shared-workspace `AGENTS.md`, `config/global-AGENTS.md`, `shared-memory/user.md` | Curated standing workflow and clinical house style; avoids the profile filenames in PR #1. |
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
| [PR #1: Claude initial import](https://github.com/navidmoezinia-blip/ai-brain/pull/1), targets `main` | Do not overwrite its profile, inpatient global ruleset, or 11 skill paths. Its rounding source is rev 8; the rev 9 changed references are staged separately for deliberate reconciliation. |
| [PR #2: Claude topic layout](https://github.com/navidmoezinia-blip/ai-brain/pull/2), targets `structured-by-topic` | Keep this PR on the user's chosen `main` artifact-type layout. Do not reorganize the other branch. |
| [PR #4: Claude desktop import](https://github.com/navidmoezinia-blip/ai-brain/pull/4), targets `structured-by-topic` | Its topic/reconcile copies overlap `ask-all`, `note-audit`, `codex-self-improvement`, old `ed-note`, and chart-check resources. Use the single canonical main-layout paths from this import when consolidating, and reconcile behavioral differences rather than adding duplicate installed copies. |
| [PR #5: Gemini cloud command board](https://github.com/navidmoezinia-blip/ai-brain/pull/5), targets `main` | Appeared during the final fetch. Its `projects/command-board/` and deployment workflow have no imported source-path overlap. Preserve its separate project; combine its `STATUS.md` project row/activity entry deliberately when merging. |

Audited remote snapshots: PR #1 `6829d52cc3012ede83613fe6576581774b4d7dfd`;
PR #2 `3aaa0989e565320267004ceb1ac00788402022f0`;
PR #4 `f5c5693e0e59eb46bbe96f5f7a3f1ff5c3c53673`.
The final remote-state check also inspected PR #5's changed paths and status
entry before committing this import.

The recorded raw-capture candidate prohibits the cleaner. PR #1's different
simulated collection skill uses one. These have different scope and must not
be silently combined. No patient access or clinical workflow was run here.

The `note-audit` `utd` specification can be read from the imported reconciliation
copy independently. The full `inpatient-rounding` and `inpatient-day-prep`
workflows are not newly installed by this PR. Their dependencies must be
resolved before promoting the candidate router.

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

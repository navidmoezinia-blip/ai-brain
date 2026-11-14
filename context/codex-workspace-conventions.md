# Codex workspace and clinical writing conventions

Prepared for the shared artifact-type layout on 2026-11-14 from the user's
current instructions, the Codex shared-workspace policy, and its PHI-free
`shared-memory/user.md`. This is an additive workflow document; the profile
and clinical-stack documents proposed in [Claude PR #1](https://github.com/navidmoezinia-blip/ai-brain/pull/1)
remain a separate pending import. Current user instructions take precedence.

## Collaboration

- Carry clear requests through implementation, verification, commit, push and
  reviewable handoff. Short go-signals mean retry the blocked step.
- Preserve the user's structure and voice. Make targeted edits, and remove
  requested material completely. Keep clinical meaning when shortening.
- Search the referenced prior chat or email before asking the user to repeat it.
- Verify claims in the actual named app and display mode. Anki uses night mode.
- Prefer the user's real Chrome and fast text/form tools. Stop on expired
  authentication, including UTMB Duo; the user handles login. Close task-opened
  tabs after the task.
- Use `AGENTS.md` and `STATUS.md` in this repository for multi-agent rules.
  Work on a `codex/*` branch and open a PR to `main`; preserve other agents' work.

## Clinical source fidelity and house style

- Use concise, scannable clinical-note phrasing with enough reasoning to make
  the patient's decisions understandable. Keep each active template's layout.
- Distinguish dated chart facts, current resident findings, uncertainty,
  inference, recommendations, and actions supported as completed.
- Missing information is not a negative finding. An active order is not proof
  of administration; a proposal is not an action already performed.
- For the inpatient workflow, the actionable window is the 24 hours before the
  supplied anchor. Older facts are dated reference or trend information.
  Current order/MAR status and result-return dates are current-state evidence.
- Today's subjective and exam use current resident findings. A dated chart exam
  remains a reference; a suggested bedside check never becomes a finding.
- Keep bedside questions and concrete organ-system exam checks separate in
  inpatient prep. Preserve blank resident-only follow-up fields when required
  by the active template.
- Routine review and drafting use inpatient-rounding. Explicit recorded raw
  capture is a distinct Notes -> Active Orders workflow. Its captured source
  text remains verbatim and findings remain separate; no cleaner is applied.
- Clinical drafting and chart review do not authorize signing, pending,
  acknowledging, ordering, modifying records, or sending clinical messages.

## Storage and source ownership

- Only synthetic/de-identified templates, references and examples belong in
  this repository. Patient files, checkpoints, screenshots and case-specific
  deliverables stay outside Git and reusable memory.
- Do not commit credentials, environment files, browser state, chat databases,
  API keys, cookies or tokens.
- Existing application repositories retain their code. Project READMEs here
  point to their owning repositories and documented assets.
- The initial import is a proposed snapshot. It does not change installed
  skill junctions, live tools, or external prompt apps. Reconcile the pending
  variants before changing those installations; do not claim them synchronized.
- The current Codex resources remain installed from
  [codex-shared-workspace](https://github.com/moaziniya-jpg/codex-shared-workspace)
  until an explicitly requested deployment or source migration updates them.

See the [Codex import manifest](../inbox/codex/MANIFEST.md) for source mapping,
pending overlaps, and exclusions.

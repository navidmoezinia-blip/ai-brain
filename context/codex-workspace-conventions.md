# Codex workspace and clinical writing conventions

Prepared for the shared artifact-type layout on 2026-11-14 from the user's
current instructions, the Codex shared-workspace policy, and its PHI-free
`shared-memory/user.md`. The [personal context index](README.md) owns the
imported profile, style, learning and collaboration preferences. Claude PR #1
still proposes older overlapping profile/work-style files and a separate
clinical-stack document. Current user instructions take precedence.

## Collaboration and browser use

Use [collaboration preferences](collaboration-and-personality.md) and
[communication style](communication-and-writing-style.md) for personal defaults.
Use `AGENTS.md` and `STATUS.md` for repository rules. Prefer the user's real
Chrome with fast text/form tools, stop on expired authentication, and close
task-opened tabs when finished. The user handles login and Duo.

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

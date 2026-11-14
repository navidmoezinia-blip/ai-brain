# `context/` — Shared User & Workflow Context

Store standing context documents that **all LLMs** should apply consistently across tasks, such as:

- User background, clinical role, communication preferences, and formatting defaults
- Institutional house styles, workflow logistics, and non-PHI contact directories
- Cross-platform conventions and tool preferences

> **Privacy Reminder:** Never include patient identifiers (PHI) or private credentials here.

## Read for Nav's personal context

Start with the documents relevant to the task:

- [Personal context](navid-personal-context.md): background, interests and useful
  personal context recorded in the prepared sources.
- [Communication and writing](communication-and-writing-style.md): response
  length, voice, clarification, personal prose and clinical style.
- [Collaboration and working personality](collaboration-and-personality.md):
  explicit working preferences and clearly labeled working impressions.
- [Learning preferences](learning-preferences.md): examples, active recall,
  clinical reasoning and study-tool preferences.
- [Workspace and clinical conventions](codex-workspace-conventions.md): source
  fidelity, clinical workflow scope, storage and installed-source boundaries.

Current user instructions and the active mode/template take precedence. These
documents synthesize prepared context rather than importing raw chat history.
The [import manifest](../inbox/codex/MANIFEST.md) records provenance and the
mapping for reconciling older profile/work-style files in pending Claude PR #1.

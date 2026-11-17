# `prompts/` — Reusable Prompts & Templates

Store reusable system prompts, clinical note templates (de-identified), presentation templates, and custom assistant / GPT specifications here.

## Conventions
- Use descriptive kebab-case or snake_case Markdown filenames (e.g., `fm-inpatient-note.md`, `clinic-assistant-instructions.md`).
- Include a short header at the top of each prompt noting its purpose and any companion files in `knowledge/` or `context/`.

## Current MICU Prompts & Templates
- [`micu-dotflows/`](./micu-dotflows/) — OpenEvidence DotFlow mode prompts (`.micuprep`, `.micucheck`, `.micuhp`, `.micunote`, `.micupres`, `.micuupdate`, `.micuhandoff`, `.micuconsult`).
- [`micu-doximity/`](./micu-doximity/) — The same eight MICU modes packaged for Doximity: `DOX_MICU_MAIN.txt` for the 20,000-character main instruction box plus five uploaded source files, built from `micu-dotflows/` by `build.py`.
- [`micu-progress-note-bot-and-template.md`](./micu-progress-note-bot-and-template.md) — Copy-paste bot system prompt + pre-cleaned personal Epic SmartPhrase template for daily MICU/CCU progress notes.
- [`micu-smartphrases/`](./micu-smartphrases/) — `.NAVICUBASE` ICU daily checklist SmartPhrase, `{ICU PROBLEM ADD-ONS}` hook, and reusable ICU SmartList specifications.
- [`micu-doximity-code-scribe.md`](./micu-doximity-code-scribe.md) — Self-auditing Doximity Scribe `ICU Code` Custom Template (`Resume` gap-check workflow) + workstation GPT prompt for `Code Note`, `Brief Note`, and safety-gated `DEATH NOTE`.

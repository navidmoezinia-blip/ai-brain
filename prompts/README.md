# `prompts/` — Reusable Prompts & Templates

Store reusable system prompts, clinical note templates (de-identified), presentation templates, and custom assistant / GPT specifications here.

## Conventions
- Use descriptive kebab-case or snake_case Markdown filenames (e.g., `fm-inpatient-note.md`, `clinic-assistant-instructions.md`).
- Include a short header at the top of each prompt noting its purpose and any companion files in `knowledge/` or `context/`.

## Prepared imports

- [FM clinic system and blank worksheet](clinic/README.md): base instructions
  plus companion templates, with a 20,000-character base limit.
- [Adult ED encounter baseline and field map](emergency-department/README.md):
  current prepared engine, used through `skills/ed-note/`.

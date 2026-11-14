# Simulated-patient testing before EMR integration

## Purpose and scope

The current evaluation uses simulated, deidentified patients to test a possible
future EMR LLM workflow: comprehensive review, concise bedside preparation,
preliminary notes, and requested case-based learning. Treat the cases as an
educational test, not clinical deployment. Do not claim the LLM is integrated,
validated, or ready for autonomous clinical use from a successful draft.

Use the user's supplied simulated case material or an identified test environment.
Do not import a production assignment list, prior live checkpoint, chart captures
or patient identifiers into this test. Calling a run simulated does not convert
earlier live-source material into synthetic data. If the selected source conflicts
with the stated test scope, resolve that source mismatch before collecting from it;
continue work on the supplied simulated material when possible.

Label each report/note once: **SIMULATED, DEIDENTIFIED CASE - TEST DRAFT**.
Use neutral case IDs. Keep case-provided facts, dated prior documentation,
expected/unconfirmed findings, and learner-reported observations distinct.
The case's explicit anchor controls its 24-hour window, not the computer date.
Do not create missing objective data to complete a case. Expected exam findings
below are a labeled template exception, not evidence for the assessment or plan.

Test checkpoints use `%LOCALAPPDATA%/inpatient-day-prep/simulation/latest.json`,
with `case_type: simulated`, the case anchor and source provenance. Never overwrite
or resume the live `%LOCALAPPDATA%/inpatient-day-prep/latest.json` from a test run.
Keep real-source material outside Git and external teaching/research submissions;
reusable examples must be wholly fictional. No EMR writes are authorized here.

## Review and concise bedside report

Build a comprehensive understanding while keeping the report short. Explain in
plain language why the case patient is admitted, what is happening now, trajectory,
what to expect next, and the main unresolved decision or discharge barrier. Then
give material updates, patient-specific questions and a focused physical exam.
Avoid repeating the same information in the overview, updates and note.

Use the Event Log/Category/Neonatal Report route in `epic-navigation.md` when it is
available in the authorized environment. These are suggested shortcuts, not a
fixed sequence or ceiling on review. Open underlying notes and any other relevant
sources needed to reconcile care, current orders, actual administrations, results,
oxygen support, trends and meaningful discrepancies. Report remaining gaps.

When research is requested, investigate questions that could change management or
explain the case; verify treatment claims against current primary guidance. Use
only the necessary deidentified clinical facts in external queries. OpenEvidence
may be used through an available authenticated connection; do not assume an
installation is working, bypass access controls, or claim a query was run when it
was only prepared. Keep research, uncertainty and proposed changes outside the
preliminary note's documented-care sections.

## Preliminary note and bedside worksheet

Keep the established R4/R5 section order and concise style. A request to prep a
note is not permission to document an interview, exam or treatment as completed.

For TODAY/Subjective, write one brief fill-in line per relevant question. Tailor
the lines to the case, preserve the clinical meaning, and leave answers blank.
For example, only when relevant:

- Eating/drinking and tolerance: ___
- Bowel movements: ___; last BM: ___; blood/color: ___
- Pain: ___/10; location: ___; better/worse: ___

These intentional answer blanks are allowed despite R3's prohibition on copying
template placeholders. Do not prefill denials, good intake or no overnight events.
The user obtains the simulated bedside history and decides the plan afterward.

For PHYSICAL EXAM, the user may request specific expected findings prefilled in
the simulated worksheet. Use the relevant organ systems and concrete findings;
label the block **EXPECTED SIMULATED EXAM - UNCONFIRMED**. Distinguish an expected
finding inferred for the exercise from a case-provided prior finding with its
date. Include an `Observed/changes: ___` line for each system. Avoid a generic
all-normal examination; focus on the case's active problems and decision points.
This block may occupy the preliminary worksheet's exam section, but is never a
claim that an exam occurred and cannot supply evidence to the A/P.

When learner observations arrive, replace only the findings actually confirmed or
corrected. Silence, leaving a field unchanged, or an unqualified "done" does not
verify the expected exam. Keep remaining entries explicitly unconfirmed. In an actual clinical note,
use only current resident findings and put prior findings in a separate dated
reference, per R2/R5; the simulated-template exception does not carry over.

## Requested Claude and Anki handoff

Finish the requested reports and preliminary notes first. When the user asks for
Claude to make and import cards, hand off to an actual available Claude interface;
do not represent another Codex agent as Claude. The request authorizes that bounded
handoff and import, not ongoing automatic submissions on every future review.

Send only simulated, deidentified teaching vignettes and necessary clinical facts,
with verified sources/links and unresolved evidence questions. Omit real names,
MRNs, rooms, facilities, staff and identifying dates. Distinguish case facts and
documented care from proposed management and provisional expected exam findings.

Ask for concise cards tailored to management decisions, mechanisms, alternatives,
monitoring, discharge criteria and likely attending questions. Teach generalizable
reasoning; do not turn one simulated plan or an unconfirmed finding into a rule.
Clinical claims need source verification before import. Check for duplicate cards,
verify the actual Anki import and returned card/note counts, and inspect formatting
in the user's night mode when a display/template changes. A prepared handoff or
export is not a sent handoff or completed import. If Claude or Anki is unavailable,
retain the prepared material and report the exact unfinished step.

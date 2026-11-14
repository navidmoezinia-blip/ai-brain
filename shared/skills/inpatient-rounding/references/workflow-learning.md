# Durable workflow learning (no patient data)

Read the active lessons before every run. At the end, add a short PHI-free run
record and update only lessons supported by observed behavior or user feedback.
Patient checkpoints and raw text belong in the local directory, never here.

## Active lessons

- 2026-11-11, user clarification: the current pre-EMR-integration evaluation uses
  simulated, deidentified cases. Follow `simulation-testing.md` for isolated
  checkpoints, one-line subjective blanks, labeled unconfirmed expected exams
  and the requested post-report Claude/Anki teaching handoff. Do not relabel
  previous live-source records as simulated or infer clinical validation.
- 2026-11-11, user guidance: Event Log 24h/current filter, Category notes/O2 and
  Neonatal Report `test`/expanded timeline are optional efficient starting points.
  Comprehensive understanding takes priority; read other tabs for material gaps.
  Screenshots demonstrate controls, not whole-review coverage or measured speed.
- 2026-11-10, user corrections: Interval Events uses general timing, a supported
  overnight opening, highly selective events and qualitative consultant input.
  No MAR/Given despite hold blocks; pertinent devices are events. Course ends
  come from notes; glucose moves to new labs. R3/R5 govern the compact layout.
- 2026-11-10, user corrections: A/P uses terse unlabeled reasoning, specialty
  recommendation lines dated M-D, accepted changes first and no routine endpoints.
  Supportive care moves into owning problems; separate DVT prophylaxis and PT/OT.
  Admission reason/presenting symptoms is one sentence; IMMEDIATE ITEMS TO
  FOLLOW-UP is resident-written only, before hospital course and outpatient follow-up.
- 2026-11-09, user instruction: include subjective and a high-yield, patient-specific
  physical exam in clinical note style. Carry useful prior findings with dated
  attribution; focus on concrete relevant findings and bedside rechecks, keeping
  old documentation distinct from a newly obtained history or exam.
- 2026-11-09, user clarification: moderately shorten the original report, keeping
  its explanations and clinical reasoning. Trim repetition and routine background;
  do not reduce it to a terse checklist or impose fixed bullet counts. Morning
  emphasizes changes/open tasks with enough context to explain why they matter.
- 2026-11-09, user instruction: morning adds to evening. Persist a local
  checkpoint and give a shorter update focused on overnight changes and open
  decisions. Refresh current assignments/orders/results regardless of cutoff.
- 2026-11-09, user instruction: any relevant Epic tabs may be used; no required
  raw text exports or separate patient chats for this prep workflow.
- 2026-11-09, observed: later consultant/order updates can supersede a morning
  A/P. Verify current regimen, case-request date, final results and MAR before
  reporting an unresolved issue. Do not assume a documented plan was implemented.
- 2026-11-10, observed: pending-lab tracking needs the owning lab status; a note
  may still call an already final test pending. Historical CT/lab findings in an
  incomplete admission draft also need their original date checked. Use the
  targeted lab filter documented in navigation instead of scrolling every result.
- 2026-11-10, retrospective capture review: Active Orders can reach the final row
  while the first row remains clipped. Verify both boundaries and recover missing
  fields from the current order view, not a historical medication list. For a newly
  assigned known patient, targeted older discharge/specialist notes can resolve
  prior-workup questions without an indiscriminate lifetime review.
- 2026-11-10, report follow-through: later research, document creation and uploads
  did not refresh Epic. Preserve the chart cutoff when saving artifact references;
  attribute later clinician updates separately.
- 2026-11-09, observed: a task is more useful when it identifies the owning
  service, missing decision, prerequisite and actual date/status. Highlight
  results already final to prevent unnecessary chasing.
- 2026-11-09, observed: repeated full clipboard output, adjacent toolbar mistakes
  and stale-preview coordinates wasted navigation. Use bounded excerpts and the
  verified navigation reference; keep one active desktop controller.

## After each run

Record: local date; evening/morning; aggregate charts reviewed; measured elapsed
time or explicitly marked estimate; complete/partial; one useful improvement or
"no new verified lesson"; limitation. No patient names, identifiers, rooms,
clinical facts/doses, copied reports, local patient file paths, or chart links.
Do not record per-patient timings that could reconstruct a roster.

User feedback takes precedence over inferred preferences. Record the correction
and the operational change, not the clinical anecdote. Consolidate duplicates
into the active lessons; do not grow an indefinite rule stack. Keep clinical
recommendations source-verified rather than learning them from one patient's
course. This changes workflow instructions, not model weights, and cannot
guarantee improvement on every run.

## Run records

- 2026-11-11 instruction update: documented simulated, deidentified testing and
  the user's report/worksheet/learning preferences. No new chart review, source
  refresh, research submission or card import was performed during skill editing.
  The preceding desktop review was interrupted; no completed review or speed claim.
  Both skill validators and local link/junction checks passed. Independent fictional
  dry runs preserved an unexamined provisional finding, distinguished an antibiotic
  stop recommendation from order status, and kept a simulation off the live checkpoint.
  These are instruction-level checks, not clinical or EMR integration validation.
- 2026-11-10 skill merge: no clinical review. Moved day-prep collection,
  navigation and checkpoint guidance into inpatient-rounding; retained the old
  invocation as a compatibility entry. Preserve source timestamps and prior
  run measurements. Drafting/collection routing is validated separately from
  live Epic behavior; no new speed claim.
- 2026-11-10 requested retrospective skill review: no new charts opened; reviewed
  the completed cycle and existing lessons. Added first-row capture verification,
  targeted historical-source selection and artifact-versus-chart timestamps.
  Retained toolbar-reflow recovery with the observed unexpected-window example.
  This was an instruction update, not a live navigation or speed test.
- 2026-11-10 morning: five charts; 12 minutes 50 seconds measured from initial
  tool time to final clinical review, including a permission-dialog interruption.
  Morning continuation completed, with additional historical review for the added
  encounter and a final high-priority refresh. Checkpoint verified. Learned targeted
  lab filtering and corrected the earlier controller-specific cropping inference.
  Result statuses remain point-in-time; no exact note-update watermark captured.
- 2026-11-09 evening: four charts; about 20 minutes (retrospective user-facing
  estimate, not instrumented timing). Report completed. Navigation and evidence
  lessons seeded above. A checkpoint was reconstructed from the completed
  review; exact source-update timestamps were not captured consistently.

## Behavioral checks after substantive changes

Use fictional inputs only. Check that the workflow handles: a completed case
request with a future requested date; later dose revision versus old A/P;
stale/wrong-patient clipboard; late-attested note before a cutoff; current orders
changed without a new note; a new admission on the morning list; an unresolved
task with no completion evidence; and a missing/partial checkpoint. Confirm no
patient facts enter this learning file and no clinical writes are attempted.
Also check a clipped first order with an intact final row, an old result repeated
in a new admission draft, and a newly exported report with no new chart access.

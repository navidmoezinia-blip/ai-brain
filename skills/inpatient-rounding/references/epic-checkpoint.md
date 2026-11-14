# Local evening-to-morning checkpoint

Default directory: `%LOCALAPPDATA%/inpatient-day-prep/` on this computer.
This default and the live-assignment resume steps below apply to live review.
For simulated, deidentified testing, use the isolated
`%LOCALAPPDATA%/inpatient-day-prep/simulation/latest.json` contract in
[simulation testing](simulation-testing.md), with `case_type: simulated` and the
case anchor. Never import or overwrite the live checkpoint from a simulated run.
Use `latest.json` as the current baseline. Save a dated prior checkpoint before
replacing it so the morning changes remain reviewable. This directory is outside
the shared repository; never upload, commit or put its content in shared memory.

This is a concise structured continuity record, not a required raw chart export.
Save only the patient detail necessary for resuming the authorized review.

## Fields

- schema version, timezone, target date, evening/morning mode, actual run review
  window, save time, and complete/partial coverage;
- each patient's encounter identity (confirm live; room alone is insufficient),
  last verified time per source and whether times are approximate;
- reviewed sources, note creation/update/service boundaries when available, and
  explicit gaps where only narrative evidence was read;
- a concise evidence-linked baseline of consequential current facts;
- concise subjective and focused exam findings with their original source/date,
  whether newly documented or carried forward, and specific bedside rechecks;
  retain the original date when the next run has no new history/exam evidence;
- open tasks: owning source/service, last evidence, status, due/requested date,
  what to recheck next, and completion evidence required;
- future events with status (request/order/recommendation versus confirmed);
- resume position on interruption and patients not yet reviewed.

Optional report/document references and generation times are artifact metadata,
not new chart evidence. Reformatting, researching, exporting or uploading a report
must not advance the review window or source watermarks. Record a later clinician
update with its own attribution/time without implying that the chart was refreshed.

Write to a temporary file in the same local directory, parse it, then rename it
to `latest.json`; verify the saved identity/coverage and path. Do not store
credentials. Keep source timestamps distinct from capture/save time. In a
retrospective checkpoint, label estimates and unknowns rather than inventing
exact bookmarks or note-update timestamps.

## Resuming

Refresh the assignment list first. Match each current encounter to the record;
perform full review for new or mismatched encounters. Do not access removed
patients solely to fill checkpoint gaps. Recheck current orders, vitals, AM
results and material MAR state, then the open tasks and new/amended notes with
overlap around the prior cutoff. Keep old evidence dated. If resuming the same
day, preserve the evening baseline and write the morning changes/status against
it. A skipped source must say not reverified, never unchanged.

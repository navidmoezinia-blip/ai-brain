---
name: codex-self-improvement
description: Mine recent Codex sessions, memories, rollout summaries, Chronicle if available, existing skills, custom agents, and automations to identify repeated manual workflows worth packaging. Use when the user asks Codex to improve itself, find repeated asks, create or update reusable skills/subagents/automations, or run a Codex-Self-Improvement review.
---

# Codex Self Improvement

## Purpose

Find repeated manual work and convert only the useful, well-evidenced pieces into small reusable assets.

## Evidence Order

Use evidence in this order:

1. Recent Codex sessions and task summaries.
2. Codex Memories and rollout summaries.
3. Chronicle, if enabled, for discovery only. Confirm important details in the source system before acting.
4. Existing skills, custom agents, and automations.

If a source is unavailable, say so and continue with the available evidence.

## Candidate Gate

Package a candidate only when all are true:

- It occurred at least twice, or is clearly likely to recur and costly to repeat.
- Inputs, procedure, output, and stopping condition are stable.
- Packaging materially improves speed, quality, consistency, or reliability.
- It is not already adequately covered.

Otherwise mark it `Skip` or `Needs more evidence`.

## Form Selection

- `Skill`: reusable workflow or playbook that a future Codex instance should follow.
- `Custom subagent`: bounded specialist role or investigation task suitable for delegation.
- `Automation`: scheduled or recurring check, report, reminder, or monitor.
- `Extend existing`: update an existing asset instead of creating a duplicate.
- `Skip`: one-off, ambiguous, sensitive, weakly evidenced, or already covered.

Prefer the smallest useful form. Avoid broad wrappers around already-good skills like code review, debugging, planning, or writing.

## Workflow

1. Inventory existing assets first.
   - Skills: `~/.codex/skills`, project-local `skills/`, and known plugin skills.
   - Agents: `~/.codex/agents`.
   - Automations: `~/.codex/automations/*/automation.toml`.
2. Mine recent work.
   - Use `session_index.jsonl` for thread names and recency.
   - Use `history.jsonl` for user prompts and repeated asks.
   - Search `~/.codex/memories/MEMORY.md` for task groups and rollout pointers.
   - Open only the most relevant rollout summaries when exact evidence is needed.
3. Produce a compact shortlist before editing anything.
   - Repeated workflow.
   - Supporting evidence and dates.
   - Frequency/confidence.
   - Recommended form.
   - Why it is or is not worth creating.
4. Create or extend only high-confidence missing items.
   - Use `skill-creator` rules for skills.
   - Keep skill bodies short and operational.
   - Keep agents bounded, read-only by default unless their role is execution.
   - Use automations only for recurring checks with a clear cadence and output.
5. Validate.
   - Skills: run `quick_validate.py`; if default Python lacks `yaml`, use the known-good PyYAML path if available.
   - Agents: parse or structurally inspect TOML.
   - Automations: view the saved automation and verify schedule/status/prompt.
6. Finish with what changed and what was deliberately skipped.

## Output Contract

```markdown
## Shortlist

| Workflow | Evidence | Confidence | Form | Decision |
|---|---:|---:|---|---|

## Created or Extended
- Asset path, what it does, validation.

## Deliberately Skipped
- Candidate and reason.

## Needs More Evidence
- Candidate and missing proof.
```

## Guardrails

- Do not create speculative, overlapping, or vague assets.
- Do not mutate production systems while mining evidence.
- Do not overfit to a single dramatic session.
- Do not present memory-derived facts as current when live verification is cheap and relevant.
- Keep created assets narrow enough that future Codex instances can trigger them reliably.

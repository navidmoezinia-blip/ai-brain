---
name: "self-improvement"
description: "Review past chats for friction and corrections, check what's already fixed in skills and memory, and propose skill/instruction improvements. Use for 'self-improve', 'what went wrong', 'improve my skills from chats'."
---

# Self-Improvement - Learn from Chat History

Adapted from bokan/claude-skill-self-improvement for claude.ai (no local ~/.claude/projects logs here).

## Phase 1: Find chats
- Default window: last 7 days. Accept args like "last 3 days" or a topic ("doximity", "rounding").
- Time window: recent_chats with after/before, n=20, paginate up to 5 calls.
- Topic: conversation_search with 2-4 content words; run several distinct queries.
- Prioritize chats with many corrections, rewrites, or skill/prompt edits.

## Phase 2: Extract per chat
- Goal of the chat
- Friction: corrections, "no", "get rid of", redo requests, reverted versions (quote the user's words, short)
- What worked (outputs accepted without edits)
- Repeated patterns or inefficiencies (same correction given in 2+ chats)
- Open a chat with read_conversation only when the summary lacks the correction itself; one page per chat.

## Phase 3: Synthesize
- Top friction patterns ranked by frequency
- What worked well (keep these)
- Raw friction quotes as evidence
- Generalize aggressively: find the meta-rule behind specific fixes.

## Phase 4: Cross-reference
- Read memory: /preferences.md, /topics/work-style.md, relevant /areas/ files.
- Read installed skills: find /mnt/skills -name SKILL.md; read the ones the friction touches.
- Classify each pattern: Already fixed (note file + line) or Still missing.

## Phase 5: Output
- Write IMPROVEMENTS.md and send it:
  - Per issue: problem, evidence quote, proposed text, target (skill / memory / external prompt such as Doximity or QH)
  - Already fixed table
  - Potential new skills table
  - Raw friction log
- For skill fixes: offer a propose_skills call with edits (old_string/new_string) for the user to approve.
- Do not apply changes without approval. Never write PHI into the report.

## Usage
- /self-improvement
- /self-improvement last 3 days
- /self-improvement doximity

## Claude Code (local) variant
- Chats live in ~/.claude/projects/<project>/*.jsonl, not behind recent_chats.
- Phase 1: run scripts/extract_claude_code_prompts.py from the project folder; it writes one line per user prompt (date, session, text). Forked sessions repeat prompts, so dedupe.
- Phase 2: filter for correction words ("no", "don't", "again", "instead", "too long", "actually"), then open the session only around the hits.
- Phase 4: memory is ~/.claude/projects/<project>/memory/ (MEMORY.md index); skills are ~/.claude/skills and ~/.agents/skills.
- The prompt dump can hold PHI. Keep it in a temp folder and never commit it.

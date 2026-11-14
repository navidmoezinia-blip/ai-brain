## Claude Code (local) variant
- Chats live in ~/.claude/projects/<project>/*.jsonl, not behind recent_chats.
- Phase 1: run scripts/extract_claude_code_prompts.py from the project folder; it writes one line per user prompt (date, session, text). Forked sessions repeat prompts, so dedupe.
- Phase 2: filter for correction words ("no", "don't", "again", "instead", "too long", "actually"), then open the session only around the hits.
- Phase 4: memory is ~/.claude/projects/<project>/memory/ (MEMORY.md index); skills are ~/.claude/skills and ~/.agents/skills.
- The prompt dump can hold PHI. Keep it in a temp folder and never commit it.

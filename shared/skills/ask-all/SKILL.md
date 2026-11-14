---
name: ask-all
description: Ask the same question to Claude, ChatGPT (via the Codex CLI) and Gemini (via the gemini-cli MCP), then show the three answers side by side with where they agree and differ. Use when the user types /ask-all, says "ask all three", "ask ChatGPT and Gemini", "what do GPT and Gemini say", or wants a second or third opinion from other models.
---

# Ask all three models

Uses Navid's own subscriptions: ChatGPT through the signed-in Codex CLI, Gemini through the `gemini-cli` MCP server. No API keys.

Do not send identifiable patient data to Codex or Gemini. Deidentify first.

## Briefing

Codex and Gemini calls are stateless, so every prompt sent to them is the question, then a blank line, then this briefing. Question first: with the briefing first, Antigravity only acknowledges it and skips the question.

> (Context, not a task: you are one of three models - Claude, ChatGPT via Codex, Gemini - getting the same question from a Claude Code session; Claude shows the answers side by side. Answer independently and concisely, cite sources where relevant, flag uncertainty.)

## Steps

1. Write Claude's own answer first, before reading the other two, so it is not anchored on them.
2. In the same message, send the question plus the briefing to both other models in parallel:
   - **ChatGPT**, via a PowerShell call (no session saved):
     ```powershell
     $o = New-TemporaryFile; codex exec --skip-git-repo-check --ephemeral -o $o.FullName "<question + briefing>" *> $null; Get-Content $o.FullName -Raw; Remove-Item $o
     ```
     Use a 300000 ms timeout.
   - **Gemini**, via `mcp__gemini-cli__ask-gemini` with `prompt` set to the question plus the briefing. If that tool fails, use `gemini -p "<question + briefing>"` in PowerShell.
3. Show the three answers under the headings **Claude**, **ChatGPT** and **Gemini (Antigravity)**; the gemini-cli MCP runs on the Antigravity (`agy`) backend. Keep each answer as the model gave it. Trim only obvious boilerplate.
4. End with 2–4 lines: where they agree, where they differ, and which answer looks best supported, and why.

If one model fails, show the other answers and the error in one line. Do not retry more than once.

For code review or handing a task to Codex, use the official plugin instead: `/codex:review`, `/codex:adversarial-review`, `/codex:rescue`.

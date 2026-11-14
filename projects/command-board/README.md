# AI Brain Cloud Dispatch (`projects/command-board`)

Visual multi-LLM command board for coordinating **OpenAI Codex**, **Claude**, and **Antigravity / Gemini** across `navidmoezinia-blip/ai-brain` using your existing cloud subscriptions (no paid LLM API keys or token proxies required).

---

## Features

1. **Pick Any Combination of Cloud LLMs**
   - Toggle **OpenAI Codex**, **Claude**, and **Antigravity / Gemini** independently or together.
   - Assign **shared context** once plus **separate per-LLM instructions & roles** (e.g., *Split Cloud Roles*, *Parallel Ask-All*, *Builder + Adversarial Critic*, *NotebookLM Study Hub*).
2. **Question-First Stateless Cloud Prompts**
   - Places each model's specific instruction **first** before repo/branch protocol (`codex/<slug>`, `claude/<slug>`, `gemini/<slug>`) so stateless cloud sessions never skip the ask.
   - Supports both `main` (artifact-type layout) and `structured-by-topic` base branches.
3. **Zero-PHI & Secret Guardrail Scanner**
   - Client-side check warns before copying or dispatching if text matches API token patterns (`sk-...`, `ghp_...`) or common PHI markers (`MRN`, `DOB`, SSN format).
4. **Circular Infinite Canvas + Optional GitHub API Sync**
   - Central `ai-brain` hub with the three LLM nodes on an inner ring and cloud runs / PRs as satellites on an outer ring, joined by curved tethers.
   - Drag the canvas to pan, scroll to zoom, drag any node. **Snap Circle** resets the layout. Click a satellite to inspect it or change its stage (Queued → Running → PR Ready → Merged).
   - Optional fine-grained GitHub PAT (saved only in browser `localStorage`) enables **Spawn Cloud Run → GitHub Issue** dispatch and **live Pull Request sync** into the outer ring.

---

## Hosting Options

### Option 1: GitHub Pages (Included Workflow)
A workflow is configured at [`.github/workflows/deploy-command-board.yml`](../../.github/workflows/deploy-command-board.yml):
1. In GitHub, open **Settings → Pages**.
2. Under **Build and deployment**, set **Source** to **GitHub Actions**.
3. Once merged to `main`, the board automatically publishes from `projects/command-board/`.
*(Note: GitHub Pages on private repos requires GitHub Pro/Team. If using GitHub Free on a private repo, use Cloudflare Pages or Vercel below for free private-repo hosting.)*

### Option 2: Cloudflare Pages / Vercel (Free with Private GitHub Repos)
- Connect `navidmoezinia-blip/ai-brain`
- **Framework preset:** `None` (Static HTML)
- **Build command:** *(leave empty)*
- **Output / Root directory:** `projects/command-board`

### Option 3: Local Zero-Install
Open `projects/command-board/index.html` directly in any browser, or run:
```bash
python3 -m http.server 8080 --directory projects/command-board
```

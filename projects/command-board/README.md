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

## Hosting (Free): Cloudflare Pages

Static site, no build step. Cloudflare Pages is free and works with private GitHub repos. Every push to `main` redeploys automatically.

1. Sign in at https://dash.cloudflare.com → **Workers & Pages** → **Create** → **Pages** → **Connect to Git**.
2. Authorize GitHub and pick `navidmoezinia-blip/ai-brain` (you can grant access to that one repo only).
3. Build settings:
   - **Production branch:** `main`
   - **Framework preset:** `None`
   - **Build command:** *(leave empty)*
   - **Build output directory:** `projects/command-board`
4. **Save and Deploy** → site is live at `https://<project-name>.pages.dev`.

### Optional: lock it to just you (free)
The `*.pages.dev` URL is public by default. Cloudflare Access (free up to 50 users) can put an email sign-in in front of it:
1. Pages project → **Settings** → **General** → **Access policy** → **Enable**, then **Manage**.
2. In the Access application that opens, **Edit** → **Overview** → delete the `*` in the **Subdomain** box so the policy covers the main `<project-name>.pages.dev` URL, not just preview builds.
3. Under **Policies**, allow only your email. Visitors then sign in with a one-time code sent to that email.

### Local (zero install)
Open `projects/command-board/index.html` in any browser, or run:
```bash
python3 -m http.server 8080 --directory projects/command-board
```

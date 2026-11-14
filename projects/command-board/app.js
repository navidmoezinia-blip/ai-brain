/* ==========================================================================
   AI Brain Cloud Dispatch — Interactive Application Logic (app.js)
   Multi-LLM task composer, question-first prompt compiler & GitHub board sync
   ========================================================================== */

(function () {
  "use strict";

  const STORAGE_KEYS = {
    THEME: "aibrain_theme",
    TASKS: "aibrain_board_tasks_v1",
    GH_CONFIG: "aibrain_gh_config_v1",
  };

  const AGENTS = {
    codex: {
      id: "codex",
      label: "OpenAI Codex",
      short: "Codex",
      prefix: "codex",
      entryDoc: "AGENTS.md",
      cloudName: "Codex Cloud",
      cloudUrl: "https://chatgpt.com/codex",
      strengths: "Repo refactors, scripts, adversarial review",
    },
    claude: {
      id: "claude",
      label: "Claude",
      short: "Claude",
      prefix: "claude",
      entryDoc: "CLAUDE.md + AGENTS.md",
      cloudName: "Claude Web / Code",
      cloudUrl: "https://claude.ai/code",
      strengths: "Clinical synthesis, SKILL.md authoring, prose",
    },
    gemini: {
      id: "gemini",
      label: "Antigravity / Gemini",
      short: "Antigravity",
      prefix: "gemini",
      entryDoc: "GEMINI.md + AGENTS.md",
      cloudName: "Gemini / Antigravity",
      cloudUrl: "https://gemini.google.com/",
      strengths: "Google Drive/Docs/Slides sync, scaffolding, UI",
    },
  };

  const PRESETS = {
    "split-roles": {
      label: "Split Cloud Roles",
      title: "MICU Vasopressor & Shock Quick-Reference",
      domain: "clinical",
      baseBranch: "main",
      targetPath: "knowledge/micu/",
      sharedContext:
        "Build a clean, evidence-backed MICU shock and vasopressor study + rounding reference in ai-brain (100% synthetic/de-identified, zero PHI).",
      selected: ["codex", "claude", "gemini"],
      instructions: {
        codex:
          "Audit dosing tables, titration ranges, receptor profiles, and cross-check any calculator/script helpers for edge-case errors. Flag unsupported claims.",
        claude:
          "Draft the structured clinical reference guide and a reusable bedside rounding checklist in Markdown under knowledge/micu/.",
        gemini:
          "Pull related MICU learning objectives from Google Drive, cross-link NotebookLM study outputs in learning/notebooklm/, and update STATUS.md.",
      },
    },
    "ask-all": {
      label: "Parallel Ask-All (3x)",
      title: "Independent 3-Model Architecture / Clinical Review",
      domain: "research",
      baseBranch: "main",
      targetPath: "knowledge/reviews/",
      sharedContext:
        "Answer independently first before checking other agent branches. Provide concise reasoning, concrete trade-offs, and cite primary guidelines or literature.",
      selected: ["codex", "claude", "gemini"],
      instructions: {
        codex:
          "Answer the core question independently with a focus on failure modes, edge cases, and implementation trade-offs. Save output to inbox/codex/.",
        claude:
          "Answer the core question independently with structured synthesis, practical workflow fit, and nuanced caveats. Save output to inbox/claude/.",
        gemini:
          "Answer the core question independently, cross-checking workspace docs and summarizing where models are likely to diverge. Save output to inbox/gemini/.",
      },
    },
    audit: {
      label: "Builder + Adversarial Critic",
      title: "Skill Consolidation & Reconciliation",
      domain: "automation",
      baseBranch: "main",
      targetPath: "skills/",
      sharedContext:
        "Reconcile diverged skill files into canonical skills/<name>/SKILL.md without losing v8 rules or platform compatibility.",
      selected: ["claude", "codex"],
      instructions: {
        codex:
          "Run a line-by-line adversarial diff between reconcile/ versions and canonical skills/. List every dropped constraint or regression before approving.",
        claude:
          "Merge the best instructions into canonical skills/<name>/SKILL.md with relative symlinks for .claude/skills/ and .agents/skills/.",
        gemini:
          "Verify skill frontmatter compatibility across Gemini/Antigravity, Claude, and Codex and update STATUS.md.",
      },
    },
    notebooklm: {
      label: "NotebookLM Study Hub",
      title: "Organize NotebookLM Topics & Output Links",
      domain: "study",
      baseBranch: "main",
      targetPath: "learning/notebooklm/",
      sharedContext:
        "Organize NotebookLM study notebooks by topic folder with separate videos.md, audios.md, and mindmaps.md hyperlink tables.",
      selected: ["gemini"],
      instructions: {
        codex:
          "Validate all Markdown relative links and table formatting across learning/notebooklm/ and ensure README index stays sorted.",
        claude:
          "Add concise high-yield study focus bullets to each topic README.md based on rotation learning objectives.",
        gemini:
          "Read the NotebookLM README/links doc, populate learning/notebooklm/<topic>/ (README.md, videos.md, audios.md, mindmaps.md), and update learning/notebooklm/README.md.",
      },
    },
    migration: {
      label: "Context & Knowledge Migration",
      title: "Initial Workspace Import to ai-brain",
      domain: "automation",
      baseBranch: "main",
      targetPath: "context/",
      sharedContext:
        "Migrate prepared standing context, domain knowledge, reusable prompts, and portable skills into navidmoezinia-blip/ai-brain.",
      selected: ["codex"],
      instructions: {
        codex:
          "Import prepared ChatGPT/Codex context, prompts, knowledge, and skills onto codex/initial-import. Place unsorted items in inbox/codex/, update STATUS.md, and open a PR to main.",
        claude:
          "Organize Claude memory, templates, and canonical skills onto claude/<topic>, update STATUS.md, and open a PR.",
        gemini:
          "Sync Google Drive exports and organize shared workspace indexes on gemini/<topic>, update STATUS.md, and open a PR.",
      },
    },
  };

  const INITIAL_SEED_TASKS = [
    {
      id: "seed-pr-4",
      title: "Import Claude Code (desktop) memory, skills, and scripts",
      agent: "claude",
      domain: "automation",
      branch: "claude/desktop-import",
      status: "review",
      instruction:
        "Verbatim copies of desktop memory notes, ask-all & note-audit skills, AHK/userscripts, and reconcile/ mapping.",
      url: "https://github.com/navidmoezinia-blip/ai-brain/pull/4",
      updatedAt: "2026-11-14",
    },
    {
      id: "seed-pr-2",
      title: "Claude import into topic layout",
      agent: "claude",
      domain: "clinical",
      branch: "claude/by-topic",
      status: "review",
      instruction:
        "Organizes imported Claude skills, clinical templates, and research references into topic-nested folders.",
      url: "https://github.com/navidmoezinia-blip/ai-brain/pull/2",
      updatedAt: "2026-11-14",
    },
    {
      id: "seed-pr-1",
      title: "Claude initial import: skills, context, prompts, knowledge",
      agent: "claude",
      domain: "automation",
      branch: "claude/initial-import",
      status: "review",
      instruction:
        "Initial Claude web import targeting main functional layout (context/, knowledge/, prompts/, skills/).",
      url: "https://github.com/navidmoezinia-blip/ai-brain/pull/1",
      updatedAt: "2026-11-14",
    },
    {
      id: "seed-gemini-nlm",
      title: "NotebookLM study directory scaffold & topic links",
      agent: "gemini",
      domain: "study",
      branch: "gemini/learning-notebooklm",
      status: "running",
      instruction:
        "Scaffolded learning/notebooklm/ with _template/ (videos.md, audios.md, mindmaps.md). Waiting on Gemini README links to populate topics.",
      url: "https://github.com/navidmoezinia-blip/ai-brain",
      updatedAt: "2026-11-14",
    },
    {
      id: "seed-codex-mig",
      title: "Codex context, prompts & workflow migration",
      agent: "codex",
      domain: "automation",
      branch: "codex/initial-import",
      status: "queued",
      instruction:
        "Migrate prepared ChatGPT/Codex context, prompts, and tools into ai-brain and log inventory in STATUS.md.",
      url: "https://chatgpt.com/codex",
      updatedAt: "2026-11-14",
    },
    {
      id: "seed-pr-3",
      title: "Import Claude materials into topic-nested layout (#3)",
      agent: "claude",
      domain: "automation",
      branch: "claude/ai-brain-repo-org-36ae4a",
      status: "merged",
      instruction: "Merged into structured-by-topic branch.",
      url: "https://github.com/navidmoezinia-blip/ai-brain/pull/3",
      updatedAt: "2026-11-14",
    },
  ];

  // Application State
  const state = {
    activeView: "composer", // 'composer' | 'board'
    activePreset: "split-roles",
    selectedAgents: new Set(["codex", "claude", "gemini"]),
    title: PRESETS["split-roles"].title,
    domain: PRESETS["split-roles"].domain,
    baseBranch: PRESETS["split-roles"].baseBranch,
    targetPath: PRESETS["split-roles"].targetPath,
    sharedContext: PRESETS["split-roles"].sharedContext,
    instructions: { ...PRESETS["split-roles"].instructions },
    boardFilterAgent: "all",
    boardFilterDomain: "all",
    tasks: [],
    ghConfig: {
      repo: "navidmoezinia-blip/ai-brain",
      token: "",
    },
  };

  // Helpers
  function slugify(text) {
    const base = (text || "task")
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "")
      .slice(0, 34);
    return base || "cloud-task";
  }

  function escapeHtml(str) {
    return String(str || "")
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");
  }

  function showToast(msg) {
    const el = document.getElementById("app-toast");
    if (!el) return;
    el.textContent = msg;
    el.hidden = false;
    clearTimeout(showToast._timer);
    showToast._timer = setTimeout(() => {
      el.hidden = true;
    }, 2600);
  }

  // Guardrail Check: Detects potential PHI or API keys client-side
  function scanGuardrails(texts) {
    const combined = texts.join("\n");
    const findings = [];

    if (/\b(sk-[A-Za-z0-9_-]{20,}|ghp_[A-Za-z0-9]{25,}|github_pat_[A-Za-z0-9_]{25,}|AIza[0-9A-Za-z_-]{30,})\b/.test(combined)) {
      findings.push("Possible API key or token detected (AGENTS.md forbids secrets).");
    }
    if (/\b(MRN|Medical Record|DOB|Date of Birth)\s*[:#-]?\s*\d+/i.test(combined)) {
      findings.push("Possible patient identifier (MRN/DOB label) detected — verify 100% de-identified.");
    }
    if (/\b\d{3}-\d{2}-\d{4}\b/.test(combined)) {
      findings.push("SSN-like pattern (XXX-XX-XXXX) detected.");
    }
    return findings;
  }

  // Question-First Stateless Prompt Compiler
  function buildAgentPrompt(agentId) {
    const agent = AGENTS[agentId];
    const slug = slugify(state.title);
    const branchName = `${agent.prefix}/${slug}`;
    const specificInstruction = (state.instructions[agentId] || "").trim();
    const shared = (state.sharedContext || "").trim();
    const targetDir = (state.targetPath || "").trim() || "(see AGENTS.md layout)";

    const peerAgents = Array.from(state.selectedAgents)
      .filter((id) => id !== agentId)
      .map((id) => `${AGENTS[id].short} (\`${AGENTS[id].prefix}/${slug}\`)`);

    const peerLine =
      peerAgents.length > 0
        ? `- Parallel cloud agents on this task: ${peerAgents.join(", ")}. Isolate your writes to \`${branchName}\` so nothing conflicts.`
        : `- You are the sole assigned cloud agent on this task.`;

    return [
      `TASK: ${state.title || "Untitled Cloud Task"}`,
      ``,
      `YOUR SPECIFIC INSTRUCTIONS (${agent.label}):`,
      specificInstruction || shared || "(Describe exact deliverable here)",
      shared && specificInstruction ? `\nSHARED GOAL & CONTEXT:\n${shared}` : "",
      ``,
      `REPO & CLOUD EXECUTION PROTOCOL (\`${state.ghConfig.repo}\`):`,
      `- Sync first: \`git fetch origin --prune\`, inspect \`STATUS.md\`, and follow \`${agent.entryDoc}\`.`,
      `- Base branch: \`${state.baseBranch}\` -> create/checkout your branch \`${branchName}\`.`,
      `- Target path: \`${targetDir}\``,
      peerLine,
      `- Safety: ZERO PHI (100% synthetic/de-identified only) and ZERO secrets/API keys.`,
      `- Handoff: Update \`STATUS.md\` with what you added, push \`${branchName}\`, and open a PR to \`${state.baseBranch}\`.`,
    ]
      .filter(Boolean)
      .join("\n");
  }

  // Persistence
  function loadState() {
    try {
      const savedTheme = localStorage.getItem(STORAGE_KEYS.THEME);
      if (savedTheme === "dark" || savedTheme === "light") {
        document.documentElement.setAttribute("data-theme", savedTheme);
      } else if (window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches) {
        document.documentElement.setAttribute("data-theme", "dark");
      }

      const savedTasks = localStorage.getItem(STORAGE_KEYS.TASKS);
      state.tasks = savedTasks ? JSON.parse(savedTasks) : [...INITIAL_SEED_TASKS];

      const savedGh = localStorage.getItem(STORAGE_KEYS.GH_CONFIG);
      if (savedGh) {
        const parsed = JSON.parse(savedGh);
        state.ghConfig.repo = parsed.repo || "navidmoezinia-blip/ai-brain";
        state.ghConfig.token = parsed.token || "";
      }
    } catch (_) {
      state.tasks = [...INITIAL_SEED_TASKS];
    }
  }

  function saveTasks() {
    try {
      localStorage.setItem(STORAGE_KEYS.TASKS, JSON.stringify(state.tasks));
    } catch (_) {}
  }

  function saveGhConfig() {
    try {
      localStorage.setItem(STORAGE_KEYS.GH_CONFIG, JSON.stringify(state.ghConfig));
    } catch (_) {}
  }

  // Rendering Functions
  function renderMastheadStatus() {
    const dot = document.getElementById("gh-status-dot");
    const label = document.getElementById("gh-status-text");
    const countBadge = document.getElementById("board-count-badge");
    const repoLink = document.getElementById("repo-header-link");

    if (repoLink) {
      repoLink.textContent = state.ghConfig.repo;
      repoLink.href = `https://github.com/${state.ghConfig.repo}`;
    }

    const connected = Boolean(state.ghConfig.token);
    if (dot) dot.classList.toggle("connected", connected);
    if (label) label.textContent = connected ? "GitHub Queue Live" : "Connect GitHub Sync";
    if (countBadge) countBadge.textContent = String(state.tasks.length);
  }

  function renderPresets() {
    const container = document.getElementById("preset-strip");
    if (!container) return;

    container.innerHTML = Object.entries(PRESETS)
      .map(
        ([key, preset]) => `
        <button
          type="button"
          id="preset-btn-${key}"
          class="preset-chip ${state.activePreset === key ? "active" : ""}"
          data-preset="${key}"
        >${escapeHtml(preset.label)}</button>`
      )
      .join("");
  }

  function renderAgentToggles() {
    const container = document.getElementById("agent-selector-grid");
    if (!container) return;

    container.innerHTML = Object.values(AGENTS)
      .map((agent) => {
        const isSelected = state.selectedAgents.has(agent.id);
        return `
          <button
            type="button"
            id="toggle-agent-${agent.id}"
            class="agent-toggle ${isSelected ? "selected" : ""}"
            data-agent="${agent.id}"
            aria-pressed="${isSelected}"
          >
            <div class="agent-toggle-top">
              <span class="agent-name">${escapeHtml(agent.label)}</span>
              <span class="agent-check">${isSelected ? "ACTIVE" : "OFF"}</span>
            </div>
            <span class="agent-meta">${escapeHtml(agent.strengths)}</span>
          </button>
        `;
      })
      .join("");
  }

  function renderPerAgentInputs() {
    const container = document.getElementById("per-agent-stack");
    if (!container) return;

    const slug = slugify(state.title);
    const activeIds = Array.from(state.selectedAgents);

    if (activeIds.length === 0) {
      container.innerHTML = `<div class="guardrail-banner warn">Select at least one cloud LLM above to assign instructions.</div>`;
      return;
    }

    container.innerHTML = activeIds
      .map((id) => {
        const agent = AGENTS[id];
        const val = state.instructions[id] || "";
        return `
          <div class="agent-instruction-box">
            <div class="agent-instruction-header">
              <span class="agent-badge ${agent.id}">${escapeHtml(agent.label)}</span>
              <span class="branch-preview">branch: ${escapeHtml(agent.prefix)}/${escapeHtml(slug)}</span>
            </div>
            <textarea
              id="instruction-input-${agent.id}"
              class="textarea"
              rows="2"
              data-agent-input="${agent.id}"
              placeholder="Specific role or deliverable for ${escapeHtml(agent.label)}..."
            >${escapeHtml(val)}</textarea>
          </div>
        `;
      })
      .join("");
  }

  function renderGuardrailsAndPackets() {
    const guardrailEl = document.getElementById("guardrail-banner");
    const packetsEl = document.getElementById("packet-list");
    if (!guardrailEl || !packetsEl) return;

    const activeIds = Array.from(state.selectedAgents);
    const textsToScan = [
      state.title,
      state.sharedContext,
      ...activeIds.map((id) => state.instructions[id] || ""),
    ];
    const warnings = scanGuardrails(textsToScan);

    if (warnings.length > 0) {
      guardrailEl.className = "guardrail-banner warn";
      guardrailEl.textContent = "Safety Check: " + warnings.join(" ");
    } else {
      guardrailEl.className = "guardrail-banner ok";
      guardrailEl.textContent =
        "Zero-PHI & Secret check clear • Question-first stateless prompts ready for cloud execution.";
    }

    if (activeIds.length === 0) {
      packetsEl.innerHTML = `<p class="panel-subtitle">Toggle Codex, Claude, or Antigravity on the left to preview cloud dispatch prompts.</p>`;
      return;
    }

    const slug = slugify(state.title);
    packetsEl.innerHTML = activeIds
      .map((id) => {
        const agent = AGENTS[id];
        const prompt = buildAgentPrompt(id);
        return `
          <div class="packet-card">
            <div class="packet-card-top">
              <div>
                <span class="agent-badge ${agent.id}">${escapeHtml(agent.label)}</span>
                <span class="branch-preview" style="margin-left:6px;">${escapeHtml(agent.prefix)}/${escapeHtml(slug)}</span>
              </div>
              <div class="packet-actions">
                <button type="button" class="btn btn-sm" data-copy-agent="${agent.id}" id="copy-btn-${agent.id}">
                  Copy Prompt
                </button>
                <button type="button" class="btn btn-sm btn-primary" data-launch-agent="${agent.id}" id="launch-btn-${agent.id}">
                  Copy &amp; Open ${escapeHtml(agent.short)}
                </button>
              </div>
            </div>
            <pre class="prompt-pre">${escapeHtml(prompt)}</pre>
          </div>
        `;
      })
      .join("");
  }

  function renderBoard() {
    const columns = {
      queued: document.getElementById("col-queued"),
      running: document.getElementById("col-running"),
      review: document.getElementById("col-review"),
      merged: document.getElementById("col-merged"),
    };
    const counts = {
      queued: document.getElementById("count-queued"),
      running: document.getElementById("count-running"),
      review: document.getElementById("count-review"),
      merged: document.getElementById("count-merged"),
    };

    if (!columns.queued) return;

    const filtered = state.tasks.filter((t) => {
      if (state.boardFilterAgent !== "all" && t.agent !== state.boardFilterAgent) return false;
      if (state.boardFilterDomain !== "all" && t.domain !== state.boardFilterDomain) return false;
      return true;
    });

    const grouped = { queued: [], running: [], review: [], merged: [] };
    filtered.forEach((t) => {
      const bucket = grouped[t.status] ? t.status : "queued";
      grouped[bucket].push(t);
    });

    const stageOrder = ["queued", "running", "review", "merged"];

    stageOrder.forEach((stage, idx) => {
      if (counts[stage]) counts[stage].textContent = String(grouped[stage].length);
      const nextStage = stageOrder[idx + 1] || null;

      columns[stage].innerHTML =
        grouped[stage]
          .map((task) => {
            const agent = AGENTS[task.agent] || AGENTS.codex;
            return `
              <article class="task-card">
                <div style="display:flex;align-items:center;justify-content:space-between;gap:6px;">
                  <span class="agent-badge ${agent.id}">${escapeHtml(agent.short)}</span>
                  <span class="branch-preview">${escapeHtml(task.branch || "")}</span>
                </div>
                <h3 class="task-card-title">${escapeHtml(task.title)}</h3>
                <p class="task-card-desc">${escapeHtml(task.instruction || "")}</p>
                <div class="task-card-footer">
                  <span>${escapeHtml(task.updatedAt || "Today")}</span>
                  <div class="task-card-links">
                    ${
                      task.prompt
                        ? `<button type="button" class="btn btn-sm" data-copy-task="${escapeHtml(task.id)}">Prompt</button>`
                        : ""
                    }
                    ${
                      task.url
                        ? `<a class="inline-link" href="${escapeHtml(task.url)}" target="_blank" rel="noopener">Open</a>`
                        : ""
                    }
                    ${
                      nextStage
                        ? `<button type="button" class="btn btn-sm" data-advance-task="${escapeHtml(task.id)}" data-next-stage="${nextStage}" title="Advance stage">&rarr;</button>`
                        : ""
                    }
                    <button type="button" class="btn btn-sm" data-delete-task="${escapeHtml(task.id)}" title="Remove card">&times;</button>
                  </div>
                </div>
              </article>
            `;
          })
          .join("") || `<p class="panel-subtitle" style="margin:8px 0;">No tasks in this stage.</p>`;
    });
  }

  function syncFormInputsFromState() {
    const titleInput = document.getElementById("task-title-input");
    const domainSelect = document.getElementById("task-domain-select");
    const branchSelect = document.getElementById("base-branch-select");
    const pathInput = document.getElementById("target-path-input");
    const sharedInput = document.getElementById("shared-context-input");

    if (titleInput) titleInput.value = state.title;
    if (domainSelect) domainSelect.value = state.domain;
    if (branchSelect) branchSelect.value = state.baseBranch;
    if (pathInput) pathInput.value = state.targetPath;
    if (sharedInput) sharedInput.value = state.sharedContext;
  }

  function renderAll() {
    renderMastheadStatus();
    renderPresets();
    renderAgentToggles();
    renderPerAgentInputs();
    renderGuardrailsAndPackets();
    renderBoard();
  }

  // Actions: Queue Locally & Optionally Push to GitHub Repo Issues
  async function queueTasksToBoard(alsoCreateGitHubIssue) {
    const activeIds = Array.from(state.selectedAgents);
    if (activeIds.length === 0) {
      showToast("Select at least one LLM first.");
      return;
    }

    const warnings = scanGuardrails([
      state.title,
      state.sharedContext,
      ...activeIds.map((id) => state.instructions[id] || ""),
    ]);
    if (warnings.length > 0) {
      showToast("Blocked: resolve PHI / secret warning before dispatching.");
      return;
    }

    const slug = slugify(state.title);
    const today = new Date().toISOString().slice(0, 10);

    for (const agentId of activeIds) {
      const agent = AGENTS[agentId];
      const prompt = buildAgentPrompt(agentId);
      const branch = `${agent.prefix}/${slug}`;
      let issueUrl = agent.cloudUrl;

      if (alsoCreateGitHubIssue && state.ghConfig.token) {
        try {
          const res = await fetch(
            `https://api.github.com/repos/${state.ghConfig.repo}/issues`,
            {
              method: "POST",
              headers: {
                Accept: "application/vnd.github+json",
                Authorization: `Bearer ${state.ghConfig.token}`,
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                title: `[${agent.short}] ${state.title}`,
                body: `### Assigned Cloud Agent: **${agent.label}**\n- **Target Branch:** \`${branch}\`\n- **Base Branch:** \`${state.baseBranch}\`\n\n\`\`\`text\n${prompt}\n\`\`\``,
                labels: [`agent:${agent.id}`, `domain:${state.domain}`],
              }),
            }
          );
          if (res.ok) {
            const data = await res.json();
            issueUrl = data.html_url;
          }
        } catch (_) {
          // Graceful fallback to local queue if offline
        }
      }

      state.tasks.unshift({
        id: `task-${Date.now()}-${agentId}`,
        title: state.title || "Untitled Cloud Task",
        agent: agentId,
        domain: state.domain,
        branch,
        status: "queued",
        instruction: state.instructions[agentId] || state.sharedContext,
        prompt,
        url: issueUrl,
        updatedAt: today,
      });
    }

    saveTasks();
    renderMastheadStatus();
    renderBoard();
    showToast(
      alsoCreateGitHubIssue && state.ghConfig.token
        ? `Dispatched ${activeIds.length} cloud task(s) to GitHub Issues & Board!`
        : `Added ${activeIds.length} task card(s) to Mission Board.`
    );
  }

  async function syncPullRequestsFromGitHub() {
    if (!state.ghConfig.token) {
      document.getElementById("gh-modal").hidden = false;
      return;
    }

    showToast("Syncing live PRs from GitHub...");
    try {
      const res = await fetch(
        `https://api.github.com/repos/${state.ghConfig.repo}/pulls?state=all&per_page=25`,
        {
          headers: {
            Accept: "application/vnd.github+json",
            Authorization: `Bearer ${state.ghConfig.token}`,
          },
        }
      );
      if (!res.ok) {
        showToast(`GitHub sync failed (${res.status}). Check token scopes.`);
        return;
      }
      const prs = await res.json();
      const nonSeedPrTasks = state.tasks.filter(
        (t) => !String(t.id).startsWith("seed-pr-") && !String(t.id).startsWith("gh-pr-")
      );

      const prCards = prs.map((pr) => {
        const ref = pr.head && pr.head.ref ? pr.head.ref : "";
        let agent = "claude";
        if (ref.startsWith("codex/")) agent = "codex";
        else if (ref.startsWith("gemini/")) agent = "gemini";

        let status = "review";
        if (pr.merged_at) status = "merged";
        else if (pr.draft) status = "running";
        else if (pr.state === "closed") status = "merged";

        return {
          id: `gh-pr-${pr.number}`,
          title: `${pr.title} (#${pr.number})`,
          agent,
          domain: "automation",
          branch: ref,
          status,
          instruction: pr.body ? pr.body.slice(0, 220) : "Pull request in ai-brain.",
          url: pr.html_url,
          updatedAt: (pr.updated_at || "").slice(0, 10),
        };
      });

      state.tasks = [...prCards, ...nonSeedPrTasks];
      saveTasks();
      renderMastheadStatus();
      renderBoard();
      showToast(`Synced ${prCards.length} PRs from ${state.ghConfig.repo}.`);
    } catch (_) {
      showToast("Network error while reaching GitHub API.");
    }
  }

  function copyText(text, successMsg) {
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(text).then(() => showToast(successMsg));
    } else {
      const ta = document.createElement("textarea");
      ta.value = text;
      document.body.appendChild(ta);
      ta.select();
      document.execCommand("copy");
      ta.remove();
      showToast(successMsg);
    }
  }

  // Event Wiring
  function bindEvents() {
    // View switcher
    document.querySelectorAll("[data-view-tab]").forEach((btn) => {
      btn.addEventListener("click", () => {
        state.activeView = btn.getAttribute("data-view-tab");
        document.querySelectorAll("[data-view-tab]").forEach((b) =>
          b.classList.toggle("active", b === btn)
        );
        document
          .getElementById("view-composer")
          .classList.toggle("hidden", state.activeView !== "composer");
        document
          .getElementById("view-board")
          .classList.toggle("hidden", state.activeView !== "board");
      });
    });

    // Theme switcher
    document.getElementById("theme-toggle-btn").addEventListener("click", () => {
      const current = document.documentElement.getAttribute("data-theme") === "dark" ? "dark" : "light";
      const next = current === "dark" ? "light" : "dark";
      document.documentElement.setAttribute("data-theme", next);
      try {
        localStorage.setItem(STORAGE_KEYS.THEME, next);
      } catch (_) {}
    });

    // Preset clicks
    document.getElementById("preset-strip").addEventListener("click", (e) => {
      const btn = e.target.closest("[data-preset]");
      if (!btn) return;
      const key = btn.getAttribute("data-preset");
      const preset = PRESETS[key];
      if (!preset) return;

      state.activePreset = key;
      state.selectedAgents = new Set(preset.selected);
      state.title = preset.title;
      state.domain = preset.domain;
      state.baseBranch = preset.baseBranch;
      state.targetPath = preset.targetPath;
      state.sharedContext = preset.sharedContext;
      state.instructions = { ...preset.instructions };

      syncFormInputsFromState();
      renderAll();
    });

    // Agent toggles
    document.getElementById("agent-selector-grid").addEventListener("click", (e) => {
      const btn = e.target.closest("[data-agent]");
      if (!btn) return;
      const id = btn.getAttribute("data-agent");
      if (state.selectedAgents.has(id)) {
        state.selectedAgents.delete(id);
      } else {
        state.selectedAgents.add(id);
      }
      renderAgentToggles();
      renderPerAgentInputs();
      renderGuardrailsAndPackets();
    });

    // Form fields
    document.getElementById("task-title-input").addEventListener("input", (e) => {
      state.title = e.target.value;
      renderPerAgentInputs();
      renderGuardrailsAndPackets();
    });

    document.getElementById("task-domain-select").addEventListener("change", (e) => {
      state.domain = e.target.value;
    });

    document.getElementById("base-branch-select").addEventListener("change", (e) => {
      state.baseBranch = e.target.value;
      renderGuardrailsAndPackets();
    });

    document.getElementById("target-path-input").addEventListener("input", (e) => {
      state.targetPath = e.target.value;
      renderGuardrailsAndPackets();
    });

    document.getElementById("shared-context-input").addEventListener("input", (e) => {
      state.sharedContext = e.target.value;
      renderGuardrailsAndPackets();
    });

    // Delegated per-agent textareas
    document.getElementById("per-agent-stack").addEventListener("input", (e) => {
      const agentId = e.target.getAttribute("data-agent-input");
      if (!agentId) return;
      state.instructions[agentId] = e.target.value;
      renderGuardrailsAndPackets();
    });

    // Copy / Launch actions
    document.getElementById("packet-list").addEventListener("click", (e) => {
      const copyBtn = e.target.closest("[data-copy-agent]");
      if (copyBtn) {
        const id = copyBtn.getAttribute("data-copy-agent");
        copyText(buildAgentPrompt(id), `Copied ${AGENTS[id].label} prompt.`);
        return;
      }

      const launchBtn = e.target.closest("[data-launch-agent]");
      if (launchBtn) {
        const id = launchBtn.getAttribute("data-launch-agent");
        const agent = AGENTS[id];
        const prompt = buildAgentPrompt(id);
        copyText(prompt, `Copied prompt & opening ${agent.cloudName}...`);
        window.open(agent.cloudUrl, "_blank", "noopener");
      }
    });

    // Queue buttons
    document.getElementById("queue-board-btn").addEventListener("click", () => {
      queueTasksToBoard(false);
    });

    document.getElementById("dispatch-github-btn").addEventListener("click", () => {
      if (!state.ghConfig.token) {
        document.getElementById("gh-modal").hidden = false;
        return;
      }
      queueTasksToBoard(true);
    });

    // Board filters & actions
    document.getElementById("board-agent-filter").addEventListener("change", (e) => {
      state.boardFilterAgent = e.target.value;
      renderBoard();
    });

    document.getElementById("board-domain-filter").addEventListener("change", (e) => {
      state.boardFilterDomain = e.target.value;
      renderBoard();
    });

    document.getElementById("sync-prs-btn").addEventListener("click", syncPullRequestsFromGitHub);

    document.getElementById("view-board").addEventListener("click", (e) => {
      const adv = e.target.closest("[data-advance-task]");
      if (adv) {
        const id = adv.getAttribute("data-advance-task");
        const next = adv.getAttribute("data-next-stage");
        const found = state.tasks.find((t) => t.id === id);
        if (found && next) {
          found.status = next;
          saveTasks();
          renderBoard();
        }
        return;
      }

      const copyTask = e.target.closest("[data-copy-task]");
      if (copyTask) {
        const id = copyTask.getAttribute("data-copy-task");
        const found = state.tasks.find((t) => t.id === id);
        if (found && found.prompt) {
          copyText(found.prompt, "Copied saved task prompt.");
        }
        return;
      }

      const del = e.target.closest("[data-delete-task]");
      if (del) {
        const id = del.getAttribute("data-delete-task");
        state.tasks = state.tasks.filter((t) => t.id !== id);
        saveTasks();
        renderMastheadStatus();
        renderBoard();
      }
    });

    // GitHub Settings Modal
    document.getElementById("gh-settings-btn").addEventListener("click", () => {
      document.getElementById("gh-repo-input").value = state.ghConfig.repo;
      document.getElementById("gh-token-input").value = state.ghConfig.token;
      document.getElementById("gh-modal").hidden = false;
    });

    document.getElementById("gh-modal-close").addEventListener("click", () => {
      document.getElementById("gh-modal").hidden = true;
    });

    document.getElementById("gh-modal-save").addEventListener("click", () => {
      state.ghConfig.repo =
        document.getElementById("gh-repo-input").value.trim() || "navidmoezinia-blip/ai-brain";
      state.ghConfig.token = document.getElementById("gh-token-input").value.trim();
      saveGhConfig();
      renderMastheadStatus();
      document.getElementById("gh-modal").hidden = true;
      if (state.ghConfig.token) {
        syncPullRequestsFromGitHub();
      } else {
        showToast("Saved repository settings (local mode).");
      }
    });
  }

  // Initialize
  document.addEventListener("DOMContentLoaded", () => {
    loadState();
    syncFormInputsFromState();
    renderAll();
    bindEvents();
  });
})();

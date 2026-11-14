/* ==========================================================================
   AI Brain Radial Infinite Canvas — Spatial Engine & Cloud Dispatch (app.js)
   Pan/zoom infinite board, circular LLM orbit, draggable nodes & GitHub sync
   ========================================================================== */

(function () {
  "use strict";

  const STORAGE_KEYS = {
    THEME: "aibrain_theme",
    TASKS: "aibrain_radial_tasks_v1",
    GH_CONFIG: "aibrain_gh_config_v1",
  };

  const SVG_OFFSET = 3000; // world-svg spans [-3000..+3000]
  const INNER_RADIUS = 375;
  const OUTER_RADIUS = 625;

  const AGENTS = {
    codex: {
      id: "codex",
      code: "CX",
      label: "OpenAI Codex",
      short: "Codex",
      prefix: "codex",
      angleDeg: -90, // Top (12 o'clock)
      entryDoc: "AGENTS.md",
      cloudName: "Codex Cloud",
      cloudUrl: "https://chatgpt.com/codex",
    },
    claude: {
      id: "claude",
      code: "CL",
      label: "Claude",
      short: "Claude",
      prefix: "claude",
      angleDeg: 30, // Bottom-right (4 o'clock)
      entryDoc: "CLAUDE.md + AGENTS.md",
      cloudName: "Claude Web",
      cloudUrl: "https://claude.ai/code",
    },
    gemini: {
      id: "gemini",
      code: "AG",
      label: "Antigravity / Gemini",
      short: "Antigravity",
      prefix: "gemini",
      angleDeg: 150, // Bottom-left (8 o'clock)
      entryDoc: "GEMINI.md + AGENTS.md",
      cloudName: "Gemini / Antigravity",
      cloudUrl: "https://gemini.google.com/",
    },
  };

  const PRESETS = {
    "split-roles": {
      label: "Split Roles",
      title: "MICU Vasopressor & Shock Reference",
      baseBranch: "main",
      targetPath: "knowledge/micu/",
      sharedContext:
        "Build a clean, evidence-backed MICU shock and vasopressor reference in ai-brain (100% synthetic, zero PHI).",
      selected: ["codex", "claude", "gemini"],
      instructions: {
        codex:
          "Audit dosing tables, titration ranges, receptor profiles, and check scripts/calculators for edge-case errors.",
        claude:
          "Draft the structured clinical guide and bedside rounding checklist in Markdown under knowledge/micu/.",
        gemini:
          "Pull MICU learning objectives from Google Drive, cross-link NotebookLM study outputs, and update STATUS.md.",
      },
    },
    "ask-all": {
      label: "Ask-All 3x",
      title: "Independent 3-Model Clinical / Architecture Review",
      baseBranch: "main",
      targetPath: "knowledge/reviews/",
      sharedContext:
        "Answer independently first before reading peer branches. Highlight concrete trade-offs and primary evidence.",
      selected: ["codex", "claude", "gemini"],
      instructions: {
        codex:
          "Analyze failure modes, edge cases, and implementation trade-offs independently. Save notes to inbox/codex/.",
        claude:
          "Provide structured clinical/workflow synthesis and nuanced caveats independently. Save notes to inbox/claude/.",
        gemini:
          "Cross-check workspace docs and summarize where models diverge. Save notes to inbox/gemini/.",
      },
    },
    audit: {
      label: "Builder + Critic",
      title: "Reconcile Diverged Skills",
      baseBranch: "main",
      targetPath: "skills/",
      sharedContext:
        "Consolidate diverged skill files into canonical skills/<name>/SKILL.md without losing rules.",
      selected: ["claude", "codex"],
      instructions: {
        codex:
          "Run a line-by-line adversarial diff between reconcile/ and skills/ to catch any dropped constraints.",
        claude:
          "Merge canonical SKILL.md files and configure relative symlinks for .claude/skills/ and .agents/skills/.",
        gemini:
          "Verify frontmatter compatibility across Gemini/Antigravity, Claude, and Codex and update STATUS.md.",
      },
    },
    notebooklm: {
      label: "NotebookLM Hub",
      title: "Populate NotebookLM Topics & Links",
      baseBranch: "main",
      targetPath: "learning/notebooklm/",
      sharedContext:
        "Organize NotebookLM study notebooks by topic folder with videos.md, audios.md, and mindmaps.md hyperlink tables.",
      selected: ["gemini"],
      instructions: {
        codex:
          "Validate all Markdown relative links and table formatting across learning/notebooklm/.",
        claude:
          "Add concise high-yield study bullets to each topic README.md.",
        gemini:
          "Read the NotebookLM README links doc, populate learning/notebooklm/<topic>/ (videos.md, audios.md, mindmaps.md), and update master index.",
      },
    },
  };

  const SEED_SATELLITES = [
    {
      id: "sat-pr-4",
      title: "PR #4 · Desktop memory & skills",
      agent: "claude",
      branch: "claude/desktop-import",
      stage: "PR Ready",
      detail: "Desktop memory notes, ask-all & note-audit skills, AHK/userscripts, reconcile/.",
      url: "https://github.com/navidmoezinia-blip/ai-brain/pull/4",
    },
    {
      id: "sat-pr-2",
      title: "PR #2 · Topic layout import",
      agent: "claude",
      branch: "claude/by-topic",
      stage: "PR Ready",
      detail: "Organizes imported Claude materials into structured-by-topic folders.",
      url: "https://github.com/navidmoezinia-blip/ai-brain/pull/2",
    },
    {
      id: "sat-pr-1",
      title: "PR #1 · Initial Claude import",
      agent: "claude",
      branch: "claude/initial-import",
      stage: "PR Ready",
      detail: "Initial Claude web import targeting main functional layout.",
      url: "https://github.com/navidmoezinia-blip/ai-brain/pull/1",
    },
    {
      id: "sat-gem-nlm",
      title: "NotebookLM study scaffold",
      agent: "gemini",
      branch: "gemini/learning-notebooklm",
      stage: "Running",
      detail: "Scaffolded learning/notebooklm/ + _template/; ready for Gemini README links.",
      url: "https://github.com/navidmoezinia-blip/ai-brain",
    },
    {
      id: "sat-gem-board",
      title: "PR #5 · Radial Cloud Board",
      agent: "gemini",
      branch: "gemini/cloud-command-board",
      stage: "PR Ready",
      detail: "Circular infinite command board + GitHub Pages deploy workflow.",
      url: "https://github.com/navidmoezinia-blip/ai-brain/pull/5",
    },
    {
      id: "sat-cx-mig",
      title: "Codex context migration",
      agent: "codex",
      branch: "codex/initial-import",
      stage: "Queued",
      detail: "Queued migration of ChatGPT/Codex context, prompts & tools into ai-brain.",
      url: "https://chatgpt.com/codex",
    },
  ];

  // State
  const state = {
    camera: { x: 0, y: 0, zoom: 0.78 },
    activePreset: "split-roles",
    selectedAgents: new Set(PRESETS["split-roles"].selected),
    title: PRESETS["split-roles"].title,
    baseBranch: PRESETS["split-roles"].baseBranch,
    targetPath: PRESETS["split-roles"].targetPath,
    sharedContext: PRESETS["split-roles"].sharedContext,
    instructions: { ...PRESETS["split-roles"].instructions },
    positions: {}, // nodeKey -> { x, y }
    satellites: [],
    inspector: null, // { type: 'agent'|'sat', id: string }
    ghConfig: {
      repo: "navidmoezinia-blip/ai-brain",
      token: "",
    },
    bridgeUrl:
      window.location.hostname === "127.0.0.1" || window.location.hostname === "localhost"
        ? window.location.origin
        : "http://127.0.0.1:8787",
    bridgeOnline: false,
    bridgeAgents: {},
  };

  function degToRad(deg) {
    return (deg * Math.PI) / 180;
  }

  function polarToCartesian(radius, angleDeg) {
    const r = degToRad(angleDeg);
    return {
      x: Math.round(radius * Math.cos(r)),
      y: Math.round(radius * Math.sin(r)),
    };
  }

  function slugify(str) {
    return (
      String(str || "task")
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/^-+|-+$/g, "")
        .slice(0, 32) || "cloud-task"
    );
  }

  function escapeHtml(s) {
    return String(s || "")
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
    clearTimeout(showToast._t);
    showToast._t = setTimeout(() => {
      el.hidden = true;
    }, 2400);
  }

  // Compute Radial Node Coordinates
  function computeRadialPositions(preserveHubAndAgents) {
    if (!preserveHubAndAgents) {
      state.positions["hub"] = { x: 0, y: 0 };
      Object.values(AGENTS).forEach((agent) => {
        state.positions[`agent:${agent.id}`] = polarToCartesian(INNER_RADIUS, agent.angleDeg);
      });
    }

    // Group satellites by parent agent and fan them out radially along outer orbit
    ["codex", "claude", "gemini"].forEach((agentId) => {
      const baseAngle = AGENTS[agentId].angleDeg;
      const items = state.satellites.filter((s) => s.agent === agentId);
      const step = 24;
      const startOffset = -((items.length - 1) * step) / 2;
      items.forEach((sat, idx) => {
        const key = `sat:${sat.id}`;
        if (!preserveHubAndAgents || !state.positions[key]) {
          state.positions[key] = polarToCartesian(OUTER_RADIUS, baseAngle + startOffset + idx * step);
        }
      });
    });
  }

  function fitViewportToOrbit() {
    const vw = window.innerWidth;
    const vh = window.innerHeight;
    const minDim = Math.min(vw, vh);
    const idealZoom = Math.max(0.45, Math.min(0.95, minDim / 1380));
    state.camera.x = Math.round(vw / 2);
    state.camera.y = Math.round(vh / 2 + 12);
    state.camera.zoom = Number(idealZoom.toFixed(2));
    applyCameraTransform();
  }

  function applyCameraTransform() {
    const world = document.getElementById("canvas-world");
    const zoomReadout = document.getElementById("zoom-readout");
    if (world) {
      world.style.transform = `translate(${state.camera.x}px, ${state.camera.y}px) scale(${state.camera.zoom})`;
    }
    if (zoomReadout) {
      zoomReadout.textContent = `${Math.round(state.camera.zoom * 100)}%`;
    }
  }

  // Guardrail Scanner
  function scanGuardrails() {
    const active = Array.from(state.selectedAgents);
    const blob = [
      state.title,
      state.sharedContext,
      ...active.map((id) => state.instructions[id] || ""),
    ].join("\n");

    if (/\b(sk-[A-Za-z0-9_-]{20,}|ghp_[A-Za-z0-9]{25,}|github_pat_[A-Za-z0-9_]{25,}|AIza[0-9A-Za-z_-]{30,})\b/.test(blob)) {
      return "Blocked: API key/secret detected";
    }
    if (/\b(MRN|Medical Record|DOB|Date of Birth)\s*[:#-]?\s*\d+/i.test(blob)) {
      return "Warning: Possible PHI (MRN/DOB) detected";
    }
    return "";
  }

  // Stateless Question-First Cloud Prompt Compiler
  function buildAgentPrompt(agentId) {
    const agent = AGENTS[agentId];
    const slug = slugify(state.title);
    const branchName = `${agent.prefix}/${slug}`;
    const specific = (state.instructions[agentId] || "").trim();
    const shared = (state.sharedContext || "").trim();
    const peerList = Array.from(state.selectedAgents)
      .filter((id) => id !== agentId)
      .map((id) => `${AGENTS[id].short} (\`${AGENTS[id].prefix}/${slug}\`)`);

    return [
      `TASK: ${state.title || "Untitled Cloud Task"}`,
      ``,
      `YOUR SPECIFIC INSTRUCTIONS (${agent.label}):`,
      specific || shared || "(Enter deliverable instructions)",
      shared && specific ? `\nSHARED GOAL & CONTEXT:\n${shared}` : "",
      ``,
      `REPO & CLOUD PROTOCOL (\`${state.ghConfig.repo}\`):`,
      `- Sync first: \`git fetch origin --prune\`, read \`STATUS.md\`, and follow \`${agent.entryDoc}\`.`,
      `- Base branch: \`${state.baseBranch}\` -> checkout \`${branchName}\`.`,
      `- Target path: \`${state.targetPath || "(see AGENTS.md)"}\``,
      peerList.length
        ? `- Parallel cloud peers: ${peerList.join(", ")}. Isolate writes to \`${branchName}\`.`
        : `- Sole assigned cloud agent for this run.`,
      `- Safety: ZERO PHI (100% de-identified/synthetic) & ZERO secrets/API keys.`,
      `- Handoff: Update \`STATUS.md\`, push \`${branchName}\`, and open a PR to \`${state.baseBranch}\`.`,
    ]
      .filter(Boolean)
      .join("\n");
  }

  // SVG Curved Tethers & Orbit Rings
  function curvedPath(p1, p2) {
    const x1 = p1.x + SVG_OFFSET;
    const y1 = p1.y + SVG_OFFSET;
    const x2 = p2.x + SVG_OFFSET;
    const y2 = p2.y + SVG_OFFSET;
    const mx = (x1 + x2) / 2;
    const my = (y1 + y2) / 2;
    const dx = x2 - x1;
    const dy = y2 - y1;
    // Gentle perpendicular curvature for organic orbital look
    const cx = mx - dy * 0.11;
    const cy = my + dx * 0.11;
    return `M ${x1} ${y1} Q ${cx} ${cy} ${x2} ${y2}`;
  }

  function renderSvgLayer() {
    const svg = document.getElementById("world-svg");
    if (!svg) return;
    const hubPos = state.positions["hub"] || { x: 0, y: 0 };
    const cx = hubPos.x + SVG_OFFSET;
    const cy = hubPos.y + SVG_OFFSET;

    const rings = `
      <circle class="orbit-ring" cx="${cx}" cy="${cy}" r="${INNER_RADIUS}" />
      <circle class="orbit-ring" cx="${cx}" cy="${cy}" r="${OUTER_RADIUS}" />
    `;

    const agentTethers = Object.values(AGENTS)
      .map((agent) => {
        const pos = state.positions[`agent:${agent.id}`] || { x: 0, y: 0 };
        const isActive = state.selectedAgents.has(agent.id);
        const cls = isActive ? `tether-path active-${agent.id}` : "tether-path";
        return `<path class="${cls}" d="${curvedPath(hubPos, pos)}" />`;
      })
      .join("");

    const satTethers = state.satellites
      .map((sat) => {
        const parentPos = state.positions[`agent:${sat.agent}`] || hubPos;
        const satPos = state.positions[`sat:${sat.id}`];
        if (!satPos) return "";
        return `<path class="satellite-tether" d="${curvedPath(parentPos, satPos)}" />`;
      })
      .join("");

    svg.innerHTML = rings + satTethers + agentTethers;
  }

  // Build Initial / Structural DOM Nodes on the Infinite Canvas
  function renderWorldNodes() {
    const layer = document.getElementById("nodes-layer");
    if (!layer) return;

    const hubPos = state.positions["hub"] || { x: 0, y: 0 };
    const slug = slugify(state.title);
    const warning = scanGuardrails();

    const hubHtml = `
      <div
        id="node-hub"
        class="spatial-node hub-node"
        data-node-key="hub"
        style="left:${hubPos.x}px; top:${hubPos.y}px;"
      >
        <div class="hub-kicker node-drag-handle" title="Drag hub">AI-BRAIN CORE · DRAG</div>
        <input
          id="hub-title-input"
          class="hub-title-input"
          type="text"
          value="${escapeHtml(state.title)}"
          placeholder="Task title..."
        />
        <textarea
          id="hub-shared-input"
          class="hub-shared-textarea"
          rows="3"
          placeholder="Shared goal & context sent to active cloud LLMs..."
        >${escapeHtml(state.sharedContext)}</textarea>
        <div class="hub-meta-row">
          <select id="hub-branch-select" class="compact-select" title="Base branch">
            <option value="main" ${state.baseBranch === "main" ? "selected" : ""}>main</option>
            <option value="structured-by-topic" ${state.baseBranch === "structured-by-topic" ? "selected" : ""}>by-topic</option>
          </select>
          <input
            id="hub-path-input"
            class="compact-input"
            style="width:128px;"
            type="text"
            value="${escapeHtml(state.targetPath)}"
            placeholder="target folder/"
          />
        </div>
        <div id="hub-guardrail-label" class="hub-guardrail ${warning ? "warn" : ""}">
          ${escapeHtml(warning || "Zero-PHI & Secret check clear")}
        </div>
        <div class="hub-meta-row">
          <button type="button" id="hub-spawn-btn" class="btn btn-primary">
            Spawn Cloud Run (${state.selectedAgents.size})
          </button>
        </div>
      </div>
    `;

    const agentNodesHtml = Object.values(AGENTS)
      .map((agent) => {
        const pos = state.positions[`agent:${agent.id}`] || { x: 0, y: 0 };
        const active = state.selectedAgents.has(agent.id);
        return `
          <div
            id="node-agent-${agent.id}"
            class="spatial-node llm-node ${active ? `active-${agent.id}` : "inactive"}"
            data-node-key="agent:${agent.id}"
            style="left:${pos.x}px; top:${pos.y}px;"
          >
            <div class="llm-header node-drag-handle" title="Drag ${escapeHtml(agent.label)} node">
              <div class="llm-orb-title">
                <span class="llm-orb ${agent.id}">${agent.code}</span>
                <div>
                  <div class="llm-name">${escapeHtml(agent.label)}</div>
                  <div class="llm-branch" data-branch-label="${agent.id}">${agent.prefix}/${escapeHtml(slug)}</div>
                </div>
              </div>
              <button
                type="button"
                class="power-pill ${active ? "on" : ""}"
                data-toggle-agent="${agent.id}"
              >${active ? "LINKED" : "OFF"}</button>
            </div>

            <textarea
              class="llm-textarea"
              rows="3"
              data-agent-textarea="${agent.id}"
              placeholder="Specific instructions for ${escapeHtml(agent.short)}..."
            >${escapeHtml(state.instructions[agent.id] || "")}</textarea>

            <div class="llm-actions">
              <button type="button" class="btn" data-inspect-agent="${agent.id}">Prompt</button>
              <div style="display:flex;gap:5px;">
                <button type="button" class="btn" data-copy-agent="${agent.id}">Copy</button>
                <button type="button" class="btn btn-primary" data-run-single="${agent.id}" title="Run just ${escapeHtml(agent.short)} now">
                  Run
                </button>
                <button type="button" class="btn" data-launch-agent="${agent.id}">
                  Web
                </button>
              </div>
            </div>
          </div>
        `;
      })
      .join("");

    const satNodesHtml = state.satellites
      .map((sat) => {
        const pos = state.positions[`sat:${sat.id}`] || { x: 0, y: 0 };
        return `
          <div
            id="node-sat-${escapeHtml(sat.id)}"
            class="spatial-node satellite-node node-drag-handle"
            data-node-key="sat:${escapeHtml(sat.id)}"
            data-sat-id="${escapeHtml(sat.id)}"
            style="left:${pos.x}px; top:${pos.y}px;"
            title="Click to inspect or drag to reposition"
          >
            <span class="sat-dot ${escapeHtml(sat.agent)}"></span>
            <div class="sat-body">
              <div class="sat-title">${escapeHtml(sat.title)}</div>
              <div class="sat-meta">${escapeHtml(sat.stage)} · ${escapeHtml(sat.branch)}</div>
            </div>
          </div>
        `;
      })
      .join("");

    layer.innerHTML = hubHtml + agentNodesHtml + satNodesHtml;
    bindHubInputListeners();
  }

  // In-place updates while typing (preserves cursor & focus!)
  function updateLiveLabelsInPlace() {
    const slug = slugify(state.title);
    Object.values(AGENTS).forEach((agent) => {
      const el = document.querySelector(`[data-branch-label="${agent.id}"]`);
      if (el) el.textContent = `${agent.prefix}/${slug}`;
    });

    const guard = document.getElementById("hub-guardrail-label");
    const warn = scanGuardrails();
    if (guard) {
      guard.textContent = warn || "Zero-PHI & Secret check clear";
      guard.classList.toggle("warn", Boolean(warn));
    }

    if (state.inspector && state.inspector.type === "agent") {
      renderInspector();
    }
  }

  function renderHudPresets() {
    const box = document.getElementById("hud-presets");
    if (!box) return;
    box.innerHTML = Object.entries(PRESETS)
      .map(
        ([k, p]) => `
        <button
          type="button"
          class="preset-pill ${state.activePreset === k ? "active" : ""}"
          data-preset="${k}"
        >${escapeHtml(p.label)}</button>`
      )
      .join("");
  }

  function renderInspector() {
    const drawer = document.getElementById("inspector-drawer");
    const content = document.getElementById("inspector-body");
    if (!drawer || !content) return;

    if (!state.inspector) {
      drawer.hidden = true;
      return;
    }
    drawer.hidden = false;

    if (state.inspector.type === "agent") {
      const agent = AGENTS[state.inspector.id];
      const prompt = buildAgentPrompt(agent.id);
      content.innerHTML = `
        <div style="display:flex;align-items:center;justify-content:space-between;gap:8px;">
          <strong>${escapeHtml(agent.label)} Cloud Packet</strong>
          <button type="button" class="btn" id="close-inspector-btn">Close</button>
        </div>
        <pre class="inspector-pre">${escapeHtml(prompt)}</pre>
        <div style="display:flex;justify-content:flex-end;gap:6px;">
          <button type="button" class="btn" data-drawer-copy="${agent.id}">Copy Prompt</button>
          <button type="button" class="btn btn-primary" data-drawer-launch="${agent.id}">
            Copy &amp; Open ${escapeHtml(agent.cloudName)}
          </button>
        </div>
      `;
    } else if (state.inspector.type === "sat") {
      const sat = state.satellites.find((s) => s.id === state.inspector.id);
      if (!sat) {
        drawer.hidden = true;
        return;
      }
      const agent = AGENTS[sat.agent] || AGENTS.codex;
      const stages = ["Queued", "Running", "PR Ready", "Merged"];
      content.innerHTML = `
        <div style="display:flex;align-items:center;justify-content:space-between;gap:8px;">
          <strong>${escapeHtml(sat.title)}</strong>
          <button type="button" class="btn" id="close-inspector-btn">Close</button>
        </div>
        <div style="font-family:var(--font-mono);font-size:0.74rem;color:var(--text-muted);">
          ${escapeHtml(agent.label)} · ${escapeHtml(sat.branch)}
        </div>
        <p style="margin:2px 0;font-size:0.8rem;color:var(--text-secondary);">${escapeHtml(sat.detail || "")}</p>
        ${sat.prompt ? `<pre class="inspector-pre">${escapeHtml(sat.prompt)}</pre>` : ""}
        <div style="display:flex;flex-wrap:wrap;gap:5px;">
          ${stages
            .map(
              (st) => `
            <button
              type="button"
              class="preset-pill ${sat.stage === st ? "active" : ""}"
              data-sat-stage="${st}"
              data-sat-target="${escapeHtml(sat.id)}"
            >${st}</button>`
            )
            .join("")}
        </div>
        <div style="display:flex;justify-content:space-between;align-items:center;padding-top:6px;">
          <button type="button" class="btn" data-sat-delete="${escapeHtml(sat.id)}">Remove</button>
          <div style="display:flex;gap:6px;">
            ${
              sat.prompt
                ? `<button type="button" class="btn" data-sat-copy="${escapeHtml(sat.id)}">Copy Prompt</button>`
                : ""
            }
            ${
              sat.url
                ? `<a class="btn btn-primary" href="${escapeHtml(sat.url)}" target="_blank" rel="noopener">Open Link</a>`
                : ""
            }
          </div>
        </div>
      `;
    }
  }

  function copyToClipboard(text, msg) {
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(text).then(() => showToast(msg));
    } else {
      const ta = document.createElement("textarea");
      ta.value = text;
      document.body.appendChild(ta);
      ta.select();
      document.execCommand("copy");
      ta.remove();
      showToast(msg);
    }
  }

  async function checkBridgeHealth(notifyUser) {
    const btn = document.getElementById("bridge-status-btn");
    try {
      const res = await fetch(`${state.bridgeUrl}/health`, { method: "GET" });
      if (res.ok) {
        const data = await res.json();
        state.bridgeOnline = Boolean(data.ok);
        state.bridgeAgents = data.agents || {};
      } else {
        state.bridgeOnline = false;
      }
    } catch (_) {
      state.bridgeOnline = false;
    }
    if (btn) {
      btn.textContent = state.bridgeOnline ? "Bridge: ON" : "Bridge: OFF";
      btn.classList.toggle("btn-primary", state.bridgeOnline);
    }
    if (notifyUser) {
      showToast(
        state.bridgeOnline
          ? "Local Bridge connected — Spawn Cloud Run will execute CLIs directly!"
          : "Local Bridge offline. Run projects/command-board/bridge/start-bridge.bat on your PC."
      );
    }
  }

  async function pollBridgeRuns() {
    if (!state.bridgeOnline) {
      await checkBridgeHealth(false);
      if (!state.bridgeOnline) return;
    }
    try {
      const res = await fetch(`${state.bridgeUrl}/runs`);
      if (!res.ok) return;
      const data = await res.json();
      let changed = false;
      (data.runs || []).forEach((run) => {
        const sat = state.satellites.find((s) => s.id === run.id);
        if (!sat) return;
        const nextStage =
          run.status === "running"
            ? "Running"
            : run.status === "done"
            ? "PR Ready"
            : "Error";
        if (sat.stage !== nextStage || sat.detail !== run.output) {
          sat.stage = nextStage;
          sat.detail = run.output || sat.detail;
          changed = true;
        }
      });
      if (changed) {
        saveTasks();
        renderWorldNodes();
        if (state.inspector && state.inspector.type === "sat") {
          renderInspector();
        }
      }
    } catch (_) {}
  }

  async function spawnCloudRuns() {
    const activeIds = Array.from(state.selectedAgents);
    if (activeIds.length === 0) {
      showToast("Link at least one LLM node to spawn a run.");
      return;
    }
    if (scanGuardrails()) {
      showToast("Resolve PHI / secret warning before spawning.");
      return;
    }

    const slug = slugify(state.title);
    for (const id of activeIds) {
      const agent = AGENTS[id];
      const prompt = buildAgentPrompt(id);
      const branch = `${agent.prefix}/${slug}`;
      let targetUrl = agent.cloudUrl;
      let satId = `run-${Date.now()}-${id}`;
      let stage = "Queued";

      if (state.bridgeOnline) {
        try {
          const res = await fetch(`${state.bridgeUrl}/run`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ agent: id, prompt, title: state.title }),
          });
          if (res.ok) {
            const data = await res.json();
            satId = data.run_id || satId;
            stage = "Running";
          }
        } catch (_) {}
      } else if (state.ghConfig.token) {
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
                body: `### Assigned Cloud Agent: **${agent.label}**\n- **Branch:** \`${branch}\`\n\n\`\`\`text\n${prompt}\n\`\`\``,
                labels: [`agent:${agent.id}`, "status:queued"],
              }),
            }
          );
          if (res.ok) {
            const issue = await res.json();
            targetUrl = issue.html_url;
            satId = `gh-issue-${issue.number}`;
          }
        } catch (_) {}
      }

      state.satellites.unshift({
        id: satId,
        title: state.title || "Cloud Task",
        agent: id,
        branch,
        stage,
        detail: state.instructions[id] || state.sharedContext,
        prompt,
        url: targetUrl,
      });
    }

    saveTasks();
    computeRadialPositions(true);
    renderSvgLayer();
    renderWorldNodes();
    showToast(
      state.bridgeOnline
        ? `Started ${activeIds.length} local CLI run(s) directly from the board!`
        : state.ghConfig.token
        ? `Dispatched ${activeIds.length} GitHub Issue(s) & orbit nodes!`
        : `Spawned ${activeIds.length} cloud run satellite(s) in orbit!`
    );
  }

  async function syncGitHubPullRequests() {
    if (!state.ghConfig.token) {
      document.getElementById("gh-modal").hidden = false;
      return;
    }
    showToast("Syncing live PRs into outer orbit...");
    try {
      const res = await fetch(
        `https://api.github.com/repos/${state.ghConfig.repo}/pulls?state=all&per_page=20`,
        {
          headers: {
            Accept: "application/vnd.github+json",
            Authorization: `Bearer ${state.ghConfig.token}`,
          },
        }
      );
      if (!res.ok) {
        showToast(`GitHub sync error (${res.status}).`);
        return;
      }
      const prs = await res.json();
      const customRuns = state.satellites.filter(
        (s) => !String(s.id).startsWith("sat-pr-") && !String(s.id).startsWith("gh-pr-")
      );
      const prSats = prs.map((pr) => {
        const ref = (pr.head && pr.head.ref) || "";
        let agent = "claude";
        if (ref.startsWith("codex/")) agent = "codex";
        else if (ref.startsWith("gemini/")) agent = "gemini";

        return {
          id: `gh-pr-${pr.number}`,
          title: `PR #${pr.number} · ${pr.title}`,
          agent,
          branch: ref,
          stage: pr.merged_at ? "Merged" : "PR Ready",
          detail: (pr.body || "").slice(0, 200),
          url: pr.html_url,
        };
      });

      state.satellites = [...prSats, ...customRuns];
      saveTasks();
      computeRadialPositions(true);
      renderSvgLayer();
      renderWorldNodes();
      showToast(`Synced ${prSats.length} PRs into orbit.`);
    } catch (_) {
      showToast("Network error syncing GitHub PRs.");
    }
  }

  function saveTasks() {
    try {
      localStorage.setItem(STORAGE_KEYS.TASKS, JSON.stringify(state.satellites));
    } catch (_) {}
  }

  function loadState() {
    try {
      const savedTheme = localStorage.getItem(STORAGE_KEYS.THEME);
      if (savedTheme === "dark" || savedTheme === "light") {
        document.documentElement.setAttribute("data-theme", savedTheme);
      } else if (window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches) {
        document.documentElement.setAttribute("data-theme", "dark");
      }

      const savedSats = localStorage.getItem(STORAGE_KEYS.TASKS);
      state.satellites = savedSats ? JSON.parse(savedSats) : [...SEED_SATELLITES];

      const savedGh = localStorage.getItem(STORAGE_KEYS.GH_CONFIG);
      if (savedGh) {
        const parsed = JSON.parse(savedGh);
        state.ghConfig.repo = parsed.repo || "navidmoezinia-blip/ai-brain";
        state.ghConfig.token = parsed.token || "";
      }
    } catch (_) {
      state.satellites = [...SEED_SATELLITES];
    }
  }

  function bindHubInputListeners() {
    const titleEl = document.getElementById("hub-title-input");
    const sharedEl = document.getElementById("hub-shared-input");
    const branchEl = document.getElementById("hub-branch-select");
    const pathEl = document.getElementById("hub-path-input");
    const spawnBtn = document.getElementById("hub-spawn-btn");

    if (titleEl) {
      titleEl.addEventListener("input", (e) => {
        state.title = e.target.value;
        updateLiveLabelsInPlace();
      });
    }
    if (sharedEl) {
      sharedEl.addEventListener("input", (e) => {
        state.sharedContext = e.target.value;
        updateLiveLabelsInPlace();
      });
    }
    if (branchEl) {
      branchEl.addEventListener("change", (e) => {
        state.baseBranch = e.target.value;
        updateLiveLabelsInPlace();
      });
    }
    if (pathEl) {
      pathEl.addEventListener("input", (e) => {
        state.targetPath = e.target.value;
        updateLiveLabelsInPlace();
      });
    }
    if (spawnBtn) {
      spawnBtn.addEventListener("click", spawnCloudRuns);
    }
  }

  // Infinite Canvas Pan, Wheel Zoom & Draggable Node Mechanics
  function bindCanvasInteractions() {
    const viewport = document.getElementById("canvas-viewport");
    const layer = document.getElementById("nodes-layer");

    let panDrag = null; // { startX, startY, camX, camY }
    let nodeDrag = null; // { key, el, startX, startY, origX, origY, moved }

    viewport.addEventListener("pointerdown", (e) => {
      if (e.target.closest("input, textarea, select, button, a")) return;

      const handle = e.target.closest(".node-drag-handle");
      const nodeEl = e.target.closest("[data-node-key]");

      if (handle && nodeEl) {
        const key = nodeEl.getAttribute("data-node-key");
        const cur = state.positions[key] || { x: 0, y: 0 };
        nodeDrag = {
          key,
          el: nodeEl,
          satId: nodeEl.getAttribute("data-sat-id"),
          startX: e.clientX,
          startY: e.clientY,
          origX: cur.x,
          origY: cur.y,
          moved: false,
        };
        viewport.setPointerCapture(e.pointerId);
        return;
      }

      if (!nodeEl) {
        panDrag = {
          startX: e.clientX,
          startY: e.clientY,
          camX: state.camera.x,
          camY: state.camera.y,
        };
        viewport.classList.add("panning");
        viewport.setPointerCapture(e.pointerId);
      }
    });

    viewport.addEventListener("pointermove", (e) => {
      if (nodeDrag) {
        const dx = (e.clientX - nodeDrag.startX) / state.camera.zoom;
        const dy = (e.clientY - nodeDrag.startY) / state.camera.zoom;
        if (Math.abs(dx) > 3 || Math.abs(dy) > 3) nodeDrag.moved = true;
        const nx = Math.round(nodeDrag.origX + dx);
        const ny = Math.round(nodeDrag.origY + dy);
        state.positions[nodeDrag.key] = { x: nx, y: ny };
        nodeDrag.el.style.left = `${nx}px`;
        nodeDrag.el.style.top = `${ny}px`;
        renderSvgLayer();
        return;
      }

      if (panDrag) {
        state.camera.x = Math.round(panDrag.camX + (e.clientX - panDrag.startX));
        state.camera.y = Math.round(panDrag.camY + (e.clientY - panDrag.startY));
        applyCameraTransform();
      }
    });

    viewport.addEventListener("pointerup", (e) => {
      if (nodeDrag) {
        if (!nodeDrag.moved && nodeDrag.satId) {
          state.inspector = { type: "sat", id: nodeDrag.satId };
          renderInspector();
        }
        nodeDrag = null;
      }
      if (panDrag) {
        panDrag = null;
        viewport.classList.remove("panning");
      }
      try {
        viewport.releasePointerCapture(e.pointerId);
      } catch (_) {}
    });

    // Smooth cursor-centered zoom
    viewport.addEventListener(
      "wheel",
      (e) => {
        if (e.target.closest("textarea, .inspector-pre")) return;
        e.preventDefault();
        const factor = e.deltaY < 0 ? 1.08 : 0.92;
        const nextZoom = Math.max(0.35, Math.min(1.85, state.camera.zoom * factor));
        const wx = (e.clientX - state.camera.x) / state.camera.zoom;
        const wy = (e.clientY - state.camera.y) / state.camera.zoom;
        state.camera.zoom = Number(nextZoom.toFixed(3));
        state.camera.x = Math.round(e.clientX - wx * state.camera.zoom);
        state.camera.y = Math.round(e.clientY - wy * state.camera.zoom);
        applyCameraTransform();
      },
      { passive: false }
    );

    // Delegated LLM node controls & typing
    layer.addEventListener("input", (e) => {
      const id = e.target.getAttribute("data-agent-textarea");
      if (!id) return;
      state.instructions[id] = e.target.value;
      updateLiveLabelsInPlace();
    });

    layer.addEventListener("click", (e) => {
      const toggleBtn = e.target.closest("[data-toggle-agent]");
      if (toggleBtn) {
        const id = toggleBtn.getAttribute("data-toggle-agent");
        if (state.selectedAgents.has(id)) state.selectedAgents.delete(id);
        else state.selectedAgents.add(id);
        renderSvgLayer();
        renderWorldNodes();
        return;
      }

      const inspectBtn = e.target.closest("[data-inspect-agent]");
      if (inspectBtn) {
        state.inspector = { type: "agent", id: inspectBtn.getAttribute("data-inspect-agent") };
        renderInspector();
        return;
      }

      const copyBtn = e.target.closest("[data-copy-agent]");
      if (copyBtn) {
        const id = copyBtn.getAttribute("data-copy-agent");
        copyToClipboard(buildAgentPrompt(id), `Copied ${AGENTS[id].label} prompt.`);
        return;
      }

      const runSingleBtn = e.target.closest("[data-run-single]");
      if (runSingleBtn) {
        const id = runSingleBtn.getAttribute("data-run-single");
        const prevSelected = new Set(state.selectedAgents);
        state.selectedAgents = new Set([id]);
        spawnCloudRuns().finally(() => {
          state.selectedAgents = prevSelected;
          renderSvgLayer();
          renderWorldNodes();
        });
        return;
      }

      const launchBtn = e.target.closest("[data-launch-agent]");
      if (launchBtn) {
        const id = launchBtn.getAttribute("data-launch-agent");
        const agent = AGENTS[id];
        copyToClipboard(buildAgentPrompt(id), `Copied prompt & opening ${agent.cloudName}...`);
        window.open(agent.cloudUrl, "_blank", "noopener");
      }
    });

    // HUD & Drawer Controls
    document.getElementById("hud-presets").addEventListener("click", (e) => {
      const btn = e.target.closest("[data-preset]");
      if (!btn) return;
      const key = btn.getAttribute("data-preset");
      const p = PRESETS[key];
      if (!p) return;
      state.activePreset = key;
      state.selectedAgents = new Set(p.selected);
      state.title = p.title;
      state.baseBranch = p.baseBranch;
      state.targetPath = p.targetPath;
      state.sharedContext = p.sharedContext;
      state.instructions = { ...p.instructions };
      renderHudPresets();
      renderSvgLayer();
      renderWorldNodes();
    });

    document.getElementById("snap-radial-btn").addEventListener("click", () => {
      computeRadialPositions(false);
      fitViewportToOrbit();
      renderSvgLayer();
      renderWorldNodes();
      showToast("Snapped nodes to circular orbit.");
    });

    document.getElementById("zoom-in-btn").addEventListener("click", () => {
      state.camera.zoom = Math.min(1.85, Number((state.camera.zoom * 1.15).toFixed(2)));
      applyCameraTransform();
    });

    document.getElementById("zoom-out-btn").addEventListener("click", () => {
      state.camera.zoom = Math.max(0.35, Number((state.camera.zoom * 0.87).toFixed(2)));
      applyCameraTransform();
    });

    document.getElementById("zoom-fit-btn").addEventListener("click", fitViewportToOrbit);

    document.getElementById("theme-btn").addEventListener("click", () => {
      const cur = document.documentElement.getAttribute("data-theme") === "dark" ? "dark" : "light";
      const next = cur === "dark" ? "light" : "dark";
      document.documentElement.setAttribute("data-theme", next);
      try {
        localStorage.setItem(STORAGE_KEYS.THEME, next);
      } catch (_) {}
    });

    document.getElementById("sync-github-btn").addEventListener("click", syncGitHubPullRequests);

    document.getElementById("gh-config-btn").addEventListener("click", () => {
      document.getElementById("gh-repo-input").value = state.ghConfig.repo;
      document.getElementById("gh-token-input").value = state.ghConfig.token;
      document.getElementById("gh-modal").hidden = false;
    });

    document.getElementById("gh-modal-cancel").addEventListener("click", () => {
      document.getElementById("gh-modal").hidden = true;
    });

    document.getElementById("gh-modal-save").addEventListener("click", () => {
      state.ghConfig.repo =
        document.getElementById("gh-repo-input").value.trim() || "navidmoezinia-blip/ai-brain";
      state.ghConfig.token = document.getElementById("gh-token-input").value.trim();
      try {
        localStorage.setItem(STORAGE_KEYS.GH_CONFIG, JSON.stringify(state.ghConfig));
      } catch (_) {}
      document.getElementById("gh-modal").hidden = true;
      if (state.ghConfig.token) syncGitHubPullRequests();
      else showToast("Saved repo settings.");
    });

    // Inspector Drawer Delegated Actions
    document.getElementById("inspector-drawer").addEventListener("click", (e) => {
      if (e.target.id === "close-inspector-btn") {
        state.inspector = null;
        renderInspector();
        return;
      }
      const dc = e.target.closest("[data-drawer-copy]");
      if (dc) {
        const id = dc.getAttribute("data-drawer-copy");
        copyToClipboard(buildAgentPrompt(id), `Copied ${AGENTS[id].label} prompt.`);
        return;
      }
      const dl = e.target.closest("[data-drawer-launch]");
      if (dl) {
        const id = dl.getAttribute("data-drawer-launch");
        const agent = AGENTS[id];
        copyToClipboard(buildAgentPrompt(id), `Copied prompt & opening ${agent.cloudName}...`);
        window.open(agent.cloudUrl, "_blank", "noopener");
        return;
      }
      const stBtn = e.target.closest("[data-sat-stage]");
      if (stBtn) {
        const sat = state.satellites.find((s) => s.id === stBtn.getAttribute("data-sat-target"));
        if (sat) {
          sat.stage = stBtn.getAttribute("data-sat-stage");
          saveTasks();
          renderWorldNodes();
          renderInspector();
        }
        return;
      }
      const sc = e.target.closest("[data-sat-copy]");
      if (sc) {
        const sat = state.satellites.find((s) => s.id === sc.getAttribute("data-sat-copy"));
        if (sat && sat.prompt) copyToClipboard(sat.prompt, "Copied task prompt.");
        return;
      }
      const sd = e.target.closest("[data-sat-delete]");
      if (sd) {
        const targetId = sd.getAttribute("data-sat-delete");
        state.satellites = state.satellites.filter((s) => s.id !== targetId);
        state.inspector = null;
        saveTasks();
        renderSvgLayer();
        renderWorldNodes();
        renderInspector();
      }
    });

    window.addEventListener("resize", fitViewportToOrbit);
  }

  document.addEventListener("DOMContentLoaded", () => {
    loadState();
    computeRadialPositions(false);
    renderHudPresets();
    renderSvgLayer();
    renderWorldNodes();
    fitViewportToOrbit();
    bindCanvasInteractions();
    checkBridgeHealth(false);
    setInterval(pollBridgeRuns, 3000);
  });
})();

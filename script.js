/* ==========================================================================
   AI.DEV // PLAYBOOK — Interactive Educational Website Logic & Animations
   ========================================================================== */

(function () {
  "use strict";

  /* ------------------------------------------------------------------------
     1. Theme Toggle, Mobile Menu, Scroll Progress & Reveal Animations
     ------------------------------------------------------------------------ */
  const html = document.documentElement;
  const themeToggle = document.getElementById("themeToggle");
  const themeIcon = document.getElementById("themeIcon");
  const savedTheme = localStorage.getItem("aidev-theme") || "dark";
  html.setAttribute("data-theme", savedTheme);
  themeIcon.textContent = savedTheme === "dark" ? "☀" : "☾";

  themeToggle.addEventListener("click", () => {
    const next = html.getAttribute("data-theme") === "dark" ? "light" : "dark";
    html.setAttribute("data-theme", next);
    localStorage.setItem("aidev-theme", next);
    themeIcon.textContent = next === "dark" ? "☀" : "☾";
  });

  const mobileMenuBtn = document.getElementById("mobileMenuBtn");
  const mainNav = document.querySelector(".main-nav");
  mobileMenuBtn.addEventListener("click", () => {
    const open = mainNav.classList.toggle("open");
    mobileMenuBtn.setAttribute("aria-expanded", String(open));
  });
  mainNav.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      mainNav.classList.remove("open");
      mobileMenuBtn.setAttribute("aria-expanded", "false");
    });
  });

  // Scroll Progress Bar
  const scrollBar = document.getElementById("scrollProgress");
  window.addEventListener("scroll", () => {
    const h = document.documentElement;
    const max = h.scrollHeight - h.clientHeight;
    const pct = max > 0 ? (h.scrollTop / max) * 100 : 0;
    scrollBar.style.width = `${pct}%`;
  }, { passive: true });

  // Reveal on Scroll
  const revealObs = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          revealObs.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.1 }
  );
  document.querySelectorAll(".reveal").forEach((el) => revealObs.observe(el));

  // Active Nav Link Highlighting
  const sections = document.querySelectorAll("main section[id]");
  const navLinks = document.querySelectorAll(".nav-link");
  const navObs = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const id = entry.target.getAttribute("id");
          navLinks.forEach((l) => {
            l.classList.toggle("active", l.getAttribute("href") === `#${id}`);
          });
        }
      });
    },
    { rootMargin: "-35% 0px -55% 0px" }
  );
  sections.forEach((s) => navObs.observe(s));

  /* ------------------------------------------------------------------------
     2. Hero Animated Terminal
     ------------------------------------------------------------------------ */
  const heroCmdEl = document.getElementById("heroTypedCmd");
  const heroOutEl = document.getElementById("heroTermOutput");
  const heroCmdText = 'claude "Add rate limiting to /api/login using create-endpoint skill"';
  const heroLines = [
    { cls: "term-dim", text: "▸ Loaded project memory: CLAUDE.md (Node 22 + TypeScript + Vitest)" },
    { cls: "term-dim", text: "▸ Loaded skill: .claude/skills/create-endpoint/SKILL.md" },
    { cls: "term-ok", text: "✓ Branch check: feat/login-rate-limit (not main)" },
    { cls: "term-ok", text: "✓ Edited src/routes/login.ts + src/middleware/rateLimit.ts" },
    { cls: "term-ok", text: "✓ Policy Allow: Bash(npm test) → 42/42 tests passed" },
    { cls: "term-warn", text: "▸ Spawning read-only subagent: @reviewer (Claude Haiku)" },
    { cls: "term-ok", text: "✓ Review complete: 0 security issues · Ready for human PR review" }
  ];

  let heroIdx = 0;
  function typeHero() {
    if (heroIdx < heroCmdText.length) {
      heroCmdEl.textContent += heroCmdText[heroIdx++];
      setTimeout(typeHero, 26);
    } else {
      heroLines.forEach((line, i) => {
        setTimeout(() => {
          const div = document.createElement("div");
          div.className = `term-row ${line.cls}`;
          div.textContent = line.text;
          heroOutEl.appendChild(div);
        }, i * 380);
      });
    }
  }
  setTimeout(typeHero, 450);

  /* ------------------------------------------------------------------------
     3. Foundations: Interactive Architecture Pipeline
     ------------------------------------------------------------------------ */
  const layerData = {
    you: {
      title: "1. You (Developer Intent)",
      desc: "You define a bounded task, acceptance criteria, and branch context. Clear, small tasks produce dramatically better patches.",
      example: 'Prompt: "Add Zod validation to POST /orders and write unit tests."'
    },
    harness: {
      title: "2. Harness (Runtime, Memory & Guardrails)",
      desc: "The harness (Claude Code, OpenCode, or Pi) reads AGENTS.md / CLAUDE.md, injects skills, enforces allow/deny rules, and isolates subagents.",
      example: "Loaded: AGENTS.md + .claude/settings.json (deny .env, allow npm test)"
    },
    model: {
      title: "3. Model (Reasoning & Code Generation)",
      desc: "The LLM (Opus, Sonnet, GPT-5, Gemini, DeepSeek, Qwen) plans the edit and emits structured tool calls—never touching your disk directly.",
      example: "Plan: 1) Read src/orders.ts  2) Add schema  3) Run vitest"
    },
    tools: {
      title: "4. Tools (Files, Shell, Git, Web)",
      desc: "Sandboxed tools execute approved read/edit/bash actions and return stdout or diffs back to the model for verification.",
      example: "Tool Call: Edit(./src/orders.ts) → Approved | Bash(npm test) → Exit 0"
    },
    repo: {
      title: "5. Our Repo (Branch, CI & Human Review)",
      desc: "Changes land on a feature branch, pass secret scanning + CI tests, and wait for human review before merging to main.",
      example: "git diff --stat → 2 files changed · PR #142 opened for team review"
    }
  };

  const pipelineNodes = document.querySelectorAll("#archPipeline .flow-node");
  const pipelineConnectors = document.querySelectorAll("#archPipeline .flow-connector");
  const layerInspector = document.getElementById("layerInspector");
  const animatePipelineBtn = document.getElementById("animatePipelineBtn");

  function selectLayer(key) {
    const info = layerData[key];
    if (!info) return;
    pipelineNodes.forEach((n) => {
      const active = n.dataset.layer === key;
      n.classList.toggle("active", active);
      n.setAttribute("aria-selected", String(active));
    });
    layerInspector.innerHTML = `
      <h4>${info.title}</h4>
      <p class="mt-sm">${info.desc}</p>
      <div class="mt-sm"><code>${info.example}</code></div>
    `;
  }

  pipelineNodes.forEach((node) => {
    node.addEventListener("click", () => selectLayer(node.dataset.layer));
  });
  selectLayer("you");

  let pipelineTimer = null;
  animatePipelineBtn.addEventListener("click", () => {
    if (pipelineTimer) clearInterval(pipelineTimer);
    const keys = ["you", "harness", "model", "tools", "repo"];
    let step = 0;
    selectLayer(keys[0]);
    pipelineConnectors.forEach((c) => c.classList.remove("active"));

    pipelineTimer = setInterval(() => {
      step++;
      if (step >= keys.length) {
        clearInterval(pipelineTimer);
        pipelineConnectors.forEach((c) => c.classList.remove("active"));
        return;
      }
      if (pipelineConnectors[step - 1]) {
        pipelineConnectors[step - 1].classList.add("active");
      }
      selectLayer(keys[step]);
    }, 850);
  });

  /* ------------------------------------------------------------------------
     4. Models: Filterable Table & Local vs. Cloud Task Router
     ------------------------------------------------------------------------ */
  const filterBtns = document.querySelectorAll(".filter-btn");
  const modelRows = document.querySelectorAll("#modelsTable tbody tr");

  filterBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      const tier = btn.dataset.filter;
      filterBtns.forEach((b) => b.classList.toggle("active", b === btn));
      modelRows.forEach((row) => {
        const show = tier === "all" || row.dataset.tier === tier;
        row.classList.toggle("hidden-row", !show);
      });
    });
  });

  const routes = {
    explain: {
      badge: "LOCAL FIRST · ZERO COST",
      badgeCls: "tag-green",
      model: "Qwen3-Coder / Llama via Ollama",
      reason: "Explaining existing functions or regexes needs no frontier reasoning and keeps code 100% on your laptop."
    },
    arch: {
      badge: "CLOUD · HIGH REASONING",
      badgeCls: "tag-amber",
      model: "Claude Opus / Sonnet or GPT-5",
      reason: "Cross-file architecture refactors require deep dependency tracking and high accuracy across 12+ files."
    },
    scaffold: {
      badge: "LOCAL OR FAST CLOUD",
      badgeCls: "tag-cyan",
      model: "Local Qwen / Haiku / Gemini Flash",
      reason: "DTOs, types, and boilerplate are low-risk and pattern-driven—save flagship tokens for harder work."
    },
    race: {
      badge: "CLOUD · TOP TIER",
      badgeCls: "tag-amber",
      model: "Claude Opus / GPT-5 High Reasoning",
      reason: "Concurrency and timing bugs are subtle; use the strongest model to trace state transitions accurately."
    },
    review: {
      badge: "CLOUD · BALANCED SUBAGENT",
      badgeCls: "tag-cyan",
      model: "Claude Sonnet (Read-Only Reviewer)",
      reason: "Best quality-per-dollar for spotting logic bugs, missing edge cases, and security issues before human review."
    }
  };

  const routerBtns = document.querySelectorAll("#routerTasks .router-task");
  const routerResult = document.getElementById("routerResult");

  function renderRoute(key) {
    const r = routes[key];
    routerBtns.forEach((b) => b.classList.toggle("active", b.dataset.route === key));
    routerResult.innerHTML = `
      <span class="tag ${r.badgeCls}">${r.badge}</span>
      <h4>Recommended: ${r.model}</h4>
      <p>${r.reason}</p>
    `;
  }
  routerBtns.forEach((b) => b.addEventListener("click", () => renderRoute(b.dataset.route)));
  renderRoute("explain");

  /* ------------------------------------------------------------------------
     5. Concepts: Animated Dev Loop & Generic Repo Explorer
     ------------------------------------------------------------------------ */
  const loopSteps = document.querySelectorAll("#devLoop .loop-step");
  const loopCaption = document.getElementById("loopCaption");
  const playDevLoopBtn = document.getElementById("playDevLoopBtn");

  const loopMessages = [
    "Step 1 · Write Task: Define a bounded unit of work with clear acceptance criteria.",
    "Step 2 · Plan: Use a strong model to inspect files and propose a plan before editing.",
    "Step 3 · Implement: Execute edits on a dedicated git branch or worktree—never on main.",
    "Step 4 · Run Tests: Agent runs unit tests and linters via allow-listed commands.",
    "Step 5 · Review: A read-only reviewer subagent checks the diff, followed by a human dev.",
    "Step 6 · Pull Request: Same CI checks, secret scans, and definition of done as human code."
  ];

  function selectLoopStep(idx) {
    loopSteps.forEach((s, i) => s.classList.toggle("active", i === idx));
    loopCaption.textContent = loopMessages[idx];
  }
  loopSteps.forEach((s, i) => s.addEventListener("click", () => selectLoopStep(i)));

  let loopTimer = null;
  playDevLoopBtn.addEventListener("click", () => {
    if (loopTimer) clearInterval(loopTimer);
    let idx = 0;
    selectLoopStep(0);
    loopTimer = setInterval(() => {
      idx++;
      if (idx >= loopSteps.length) {
        clearInterval(loopTimer);
        return;
      }
      selectLoopStep(idx);
    }, 950);
  });

  const genericDocs = {
    agents: `# AGENTS.md (Shared Project Memory)\nStack: TypeScript, Node 22, PostgreSQL\nTest: npm test\nLint: npm run lint\nRules:\n- Never edit .env or infra/prod/\n- Always add unit tests for new services`,
    skill1: `---\nname: create-endpoint\ndescription: Scaffold a validated REST endpoint\n---\n1. Define Zod schema in src/schemas/\n2. Add handler in src/routes/\n3. Write Vitest integration test`,
    skill2: `---\nname: write-tests\ndescription: Add unit & edge-case tests\n---\n- Mock external HTTP calls\n- Cover happy path + 4xx errors\n- Never weaken existing assertions`,
    reviewer: `---\nname: reviewer\ntools: Read, Grep, Glob\n---\nYou are a read-only PR reviewer.\nCheck for: auth gaps, SQL injection, missing tests, and silent test weakening.`,
    perms: `{\n  "allow": ["Bash(npm test)", "Read(./src/**)", "Edit(./src/**)"],\n  "deny": ["Read(./.env*)", "Bash(git push *)", "Edit(./infra/prod/**)"]\n}`
  };

  const treeFiles = document.querySelectorAll("#genericTree .tree-file");
  const genericPreview = document.getElementById("genericPreview");
  function showGenericDoc(key) {
    treeFiles.forEach((f) => f.classList.toggle("active", f.dataset.doc === key));
    genericPreview.textContent = genericDocs[key];
  }
  treeFiles.forEach((f) => f.addEventListener("click", () => showGenericDoc(f.dataset.doc)));
  showGenericDoc("agents");

  /* ------------------------------------------------------------------------
     6. SETUP LAB: Claude Code, OpenCode & Pi Project Examples + Sim
     ------------------------------------------------------------------------ */
  const harnesses = {
    claude: {
      name: "Claude Code",
      summary: "Uses CLAUDE.md for project memory, .claude/settings.json for allow/deny & hooks, and .claude/agents/ + .claude/skills/ for subagents & playbooks.",
      badge: "Anthropic CLI / IDE",
      termTitle: "claude-code — my-service",
      files: [
        {
          path: "CLAUDE.md",
          lang: "Markdown",
          content: `# Project Memory (CLAUDE.md)

## Stack & Commands
- Runtime: Node.js 22 + TypeScript + Fastify
- Test: \`npm test\` (Vitest)
- Lint: \`npm run lint\`

## Engineering Rules
- Work on a feature branch; never commit directly to \`main\`.
- Validate all request bodies with Zod schemas.
- Never read or modify \`.env*\` or \`infra/prod/**\`.
- Run \`npm test\` and \`npm run lint\` before finishing.`
        },
        {
          path: ".claude/settings.json",
          lang: "JSON",
          content: `{
  "permissions": {
    "allow": [
      "Read(./src/**)",
      "Edit(./src/**)",
      "Bash(npm test)",
      "Bash(npm run lint)",
      "Bash(git status)",
      "Bash(git diff *)"
    ],
    "deny": [
      "Read(./.env*)",
      "Read(./secrets/**)",
      "Bash(curl *)",
      "Bash(rm -rf *)",
      "Bash(git push *)",
      "Edit(./infra/prod/**)"
    ]
  }
}`
        },
        {
          path: ".claude/agents/reviewer.md",
          lang: "Markdown",
          content: `---
name: reviewer
description: Read-only security and code quality PR reviewer
tools: Read, Grep, Glob
model: haiku
---

You are a strict, read-only code reviewer.
Inspect the current git diff and check for:
1. Missing input validation or auth checks
2. Secrets or hardcoded credentials
3. Weakened or skipped unit tests
4. Unhandled async errors

Return a concise bullet list of findings with file:line references.`
        },
        {
          path: ".claude/skills/create-endpoint/SKILL.md",
          lang: "Markdown",
          content: `---
name: create-endpoint
description: Scaffold a Fastify route with Zod validation and Vitest coverage
---

## Steps
1. Create request/response Zod schema in \`src/schemas/<name>.ts\`.
2. Implement route handler in \`src/routes/<name>.ts\`.
3. Register route in \`src/app.ts\`.
4. Add unit & integration tests in \`tests/<name>.test.ts\`.
5. Run \`npm test\` and \`npm run lint\`.`
        }
      ],
      simSteps: [
        { cls: "term-dim", text: "$ claude --agent reviewer \"Review feat/orders-api\"" },
        { cls: "term-dim", text: "▸ Reading CLAUDE.md and .claude/settings.json..." },
        { cls: "term-ok", text: "✓ Loaded permissions: 6 allow rules, 6 deny rules" },
        { cls: "term-ok", text: "✓ Loaded subagent: .claude/agents/reviewer.md (tools: Read, Grep, Glob | model: haiku)" },
        { cls: "term-warn", text: "▸ Subagent attempted: Read(./.env.production) → BLOCKED by deny rule" },
        { cls: "term-ok", text: "✓ Read(./src/routes/orders.ts) & Read(./tests/orders.test.ts)" },
        { cls: "term-ok", text: "✓ Finding [src/routes/orders.ts:24]: Add rate-limit middleware on POST /orders" },
        { cls: "term-ok", text: "✓ Session finished (read-only mode: 0 files modified)" }
      ]
    },

    opencode: {
      name: "OpenCode",
      summary: "Uses AGENTS.md + opencode.json for multi-provider routing (Cloud + local Ollama) and granular permissions, with .opencode/agents/ & .opencode/skills/.",
      badge: "MIT Open Source",
      termTitle: "opencode — my-service",
      files: [
        {
          path: "AGENTS.md",
          lang: "Markdown",
          content: `# Project Memory (AGENTS.md)

## Commands
- \`npm test\` — run Vitest suite
- \`npm run lint\` — ESLint + TypeScript check

## Conventions
- Keep business logic in \`src/services/\`, routes thin in \`src/routes/\`.
- Use \`@reviewer\` subagent before opening any pull request.
- Never touch \`.env*\` or \`infra/prod/**\`.`
        },
        {
          path: "opencode.json",
          lang: "JSON",
          content: `{
  "$schema": "https://opencode.ai/config.json",
  "model": "anthropic/claude-sonnet-4-5",
  "small_model": "ollama/qwen3-coder:14b",
  "permission": {
    "edit": "ask",
    "bash": {
      "npm test": "allow",
      "npm run lint": "allow",
      "git status": "allow",
      "git push *": "deny",
      "curl *": "deny"
    },
    "read": {
      ".env*": "deny",
      "secrets/**": "deny"
    }
  }
}`
        },
        {
          path: ".opencode/agents/reviewer.md",
          lang: "Markdown",
          content: `---
description: Read-only PR reviewer using fast/cheap model
mode: subagent
model: ollama/qwen3-coder:14b
tools:
  write: false
  edit: false
  bash: false
---

Review the staged changes for:
- Security flaws (injection, missing auth)
- Missing test coverage for new branches
- Adherence to AGENTS.md conventions`
        },
        {
          path: ".opencode/skills/create-endpoint/SKILL.md",
          lang: "Markdown",
          content: `---
name: create-endpoint
description: Create a typed endpoint with service + tests
---

1. Add DTO schema in \`src/schemas/\`.
2. Implement pure service function in \`src/services/\`.
3. Wire route in \`src/routes/\`.
4. Run \`npm test\` and invoke \`@reviewer\`.`
        }
      ],
      simSteps: [
        { cls: "term-dim", text: "$ opencode run \"Use create-endpoint skill for GET /health/ready\"" },
        { cls: "term-dim", text: "▸ Loaded AGENTS.md & opencode.json (primary: claude-sonnet-4-5, small: ollama/qwen3-coder)" },
        { cls: "term-ok", text: "✓ Loaded skill: .opencode/skills/create-endpoint/SKILL.md" },
        { cls: "term-ok", text: "✓ Created src/routes/health.ts & tests/health.test.ts (supervised edit approved)" },
        { cls: "term-ok", text: "✓ Policy Allow: npm test → 18 passed" },
        { cls: "term-warn", text: "▸ Delegating review to @reviewer (ollama/qwen3-coder:14b, write=false)..." },
        { cls: "term-err", text: "✗ Blocked: @reviewer attempted bash(git push) → denied by policy" },
        { cls: "term-ok", text: "✓ @reviewer approved diff · Ready for PR" }
      ]
    },

    pi: {
      name: "Pi",
      summary: "Minimal, hackable harness using AGENTS.md, .pi/settings.json, TypeScript extensions (.pi/extensions/) for custom guardrails, plus prompts & skills.",
      badge: "Extensible Minimal CLI",
      termTitle: "pi — my-service",
      files: [
        {
          path: "AGENTS.md",
          lang: "Markdown",
          content: `# Project Memory (AGENTS.md)

## Stack
- Node 22, TypeScript, Vitest

## Rules for Pi Agents
- Always run \`npm test\` after editing \`src/\`.
- Use \`/review\` prompt template before committing.
- Extension \`guardrails.ts\` blocks \`.env\`, \`prod\`, and \`git push\`.`
        },
        {
          path: ".pi/settings.json",
          lang: "JSON",
          content: `{
  "defaultProvider": "anthropic",
  "defaultModel": "claude-sonnet-4-5",
  "defaultThinkingLevel": "medium",
  "skills": [".pi/skills"],
  "prompts": [".pi/prompts"],
  "extensions": [".pi/extensions/guardrails.ts"]
}`
        },
        {
          path: ".pi/extensions/guardrails.ts",
          lang: "TypeScript",
          content: `// .pi/extensions/guardrails.ts — Custom safety hook
export default function guardrails(pi: any) {
  const blockedPaths = [".env", "secrets/", "infra/prod/"];
  const blockedCmds = ["git push", "rm -rf", "curl "];

  pi.on("tool_call", async (event: any) => {
    const path = event.input?.path || "";
    if (blockedPaths.some((p) => path.includes(p))) {
      return { block: true, reason: \`Blocked protected path: \${path}\` };
    }
    if (event.tool === "bash") {
      const cmd = event.input?.command || "";
      if (blockedCmds.some((c) => cmd.includes(c))) {
        return { block: true, reason: \`Blocked dangerous command: \${cmd}\` };
      }
    }
  });
}`
        },
        {
          path: ".pi/prompts/review.md",
          lang: "Markdown",
          content: `---
description: Run a structured read-only review of current git diff
---

Inspect \`git diff\` and evaluate:
1. Correctness & edge cases
2. Security & secret exposure
3. Test coverage in \`tests/\`

Do NOT modify files. Output a checklist of required fixes.`
        }
      ],
      simSteps: [
        { cls: "term-dim", text: "$ pi \"Implement /api/metrics endpoint and run /review\"" },
        { cls: "term-dim", text: "▸ Loaded AGENTS.md & .pi/settings.json (provider: anthropic, thinking: medium)" },
        { cls: "term-ok", text: "✓ Registered extension: .pi/extensions/guardrails.ts" },
        { cls: "term-warn", text: "▸ Tool hook intercepted: Read(.env) → Blocked protected path: .env" },
        { cls: "term-ok", text: "✓ Implemented src/routes/metrics.ts + tests/metrics.test.ts" },
        { cls: "term-ok", text: "✓ Bash(npm test) → 24/24 passed" },
        { cls: "term-ok", text: "✓ Executed prompt template .pi/prompts/review.md → 0 blockers found" }
      ]
    }
  };

  let activeHarnessKey = "claude";
  let activeFileIdx = 0;
  let simTimer = null;

  const labTabs = document.querySelectorAll(".lab-tab");
  const labSummary = document.getElementById("labSummary");
  const ideFileList = document.getElementById("ideFileList");
  const ideFilePath = document.getElementById("ideFilePath");
  const ideFileLang = document.getElementById("ideFileLang");
  const ideCodeContent = document.getElementById("ideCodeContent");
  const copyCodeBtn = document.getElementById("copyCodeBtn");

  const runSimBtn = document.getElementById("runSimBtn");
  const resetSimBtn = document.getElementById("resetSimBtn");
  const simTermTitle = document.getElementById("simTermTitle");
  const simTermStatus = document.getElementById("simTermStatus");
  const simTermBody = document.getElementById("simTermBody");

  function renderFile(idx) {
    activeFileIdx = idx;
    const h = harnesses[activeHarnessKey];
    const file = h.files[idx];
    ideFileList.querySelectorAll(".ide-file-btn").forEach((b, i) => {
      b.classList.toggle("active", i === idx);
    });
    ideFilePath.textContent = file.path;
    ideFileLang.textContent = file.lang;
    ideCodeContent.textContent = file.content;
  }

  function resetSimulation() {
    if (simTimer) {
      clearInterval(simTimer);
      simTimer = null;
    }
    const h = harnesses[activeHarnessKey];
    simTermTitle.textContent = h.termTitle;
    simTermStatus.textContent = "IDLE";
    simTermBody.innerHTML = `<div class="sim-placeholder">Click <strong>▶ Run Simulation</strong> to watch <strong>${h.name}</strong> load project memory, enforce permissions, and run its workflow.</div>`;
  }

  function selectHarness(key) {
    activeHarnessKey = key;
    activeFileIdx = 0;
    const h = harnesses[key];

    labTabs.forEach((t) => {
      const isAct = t.dataset.harness === key;
      t.classList.toggle("active", isAct);
      t.setAttribute("aria-selected", String(isAct));
    });

    labSummary.innerHTML = `
      <div>
        <strong>${h.name}</strong> — <span class="muted">${h.summary}</span>
      </div>
      <span class="tag">${h.badge}</span>
    `;

    ideFileList.innerHTML = "";
    h.files.forEach((f, idx) => {
      const btn = document.createElement("button");
      btn.className = "ide-file-btn";
      btn.textContent = f.path;
      btn.addEventListener("click", () => renderFile(idx));
      ideFileList.appendChild(btn);
    });

    renderFile(0);
    resetSimulation();
  }

  labTabs.forEach((t) => t.addEventListener("click", () => selectHarness(t.dataset.harness)));
  selectHarness("claude");

  copyCodeBtn.addEventListener("click", async () => {
    const text = harnesses[activeHarnessKey].files[activeFileIdx].content;
    try {
      await navigator.clipboard.writeText(text);
      copyCodeBtn.textContent = "Copied ✓";
      setTimeout(() => (copyCodeBtn.textContent = "Copy"), 1500);
    } catch {
      copyCodeBtn.textContent = "Copy failed";
    }
  });

  runSimBtn.addEventListener("click", () => {
    if (simTimer) clearInterval(simTimer);
    const h = harnesses[activeHarnessKey];
    simTermBody.innerHTML = "";
    simTermStatus.textContent = "RUNNING";
    let step = 0;

    function pushLine() {
      if (step >= h.simSteps.length) {
        clearInterval(simTimer);
        simTimer = null;
        simTermStatus.textContent = "COMPLETE";
        return;
      }
      const item = h.simSteps[step++];
      const div = document.createElement("div");
      div.className = `term-row ${item.cls}`;
      div.textContent = item.text;
      simTermBody.appendChild(div);
      simTermBody.scrollTop = simTermBody.scrollHeight;
    }

    pushLine();
    simTimer = setInterval(pushLine, 520);
  });

  resetSimBtn.addEventListener("click", resetSimulation);

  /* ------------------------------------------------------------------------
     7. Security: Interactive Policy Tester & Readiness Checklist
     ------------------------------------------------------------------------ */
  const policyCases = {
    test: {
      allowed: true,
      rule: 'Matched allow rule: "Bash(npm test)"',
      detail: "Whitelisted test command runs automatically in Scoped Auto or after one click in Supervised Edit."
    },
    env: {
      allowed: false,
      rule: 'Blocked by deny rule: "Read(./.env*)"',
      detail: "Secrets and environment files are completely unreadable to the agent."
    },
    "edit-src": {
      allowed: true,
      rule: 'Matched allow rule: "Edit(./src/**)"',
      detail: "Source code edits on a feature branch are permitted and tracked in git diff."
    },
    push: {
      allowed: false,
      rule: 'Blocked by deny rule: "Bash(git push *)"',
      detail: "Only a human developer pushes to remote or opens/merges the final PR."
    },
    curl: {
      allowed: false,
      rule: 'Blocked by deny rule: "Bash(curl *)"',
      detail: "Prevents data exfiltration and fetching unvetted remote scripts."
    },
    infra: {
      allowed: false,
      rule: 'Blocked by deny rule: "Edit(./infra/prod/**)"',
      detail: "Production infrastructure requires human-only changes and code-owner review."
    }
  };

  const policyBtns = document.querySelectorAll("#policyCommands .policy-cmd");
  const policyVerdict = document.getElementById("policyVerdict");

  policyBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      const c = policyCases[btn.dataset.cmd];
      policyBtns.forEach((b) => b.classList.toggle("active", b === btn));
      policyVerdict.innerHTML = `
        <span class="verdict-badge ${c.allowed ? "verdict-allow" : "verdict-deny"}">
          ${c.allowed ? "✓ ALLOWED" : "✗ DENIED"}
        </span>
        <h4><code>${c.rule}</code></h4>
        <p>${c.detail}</p>
      `;
    });
  });

  const checklistInputs = document.querySelectorAll("#safeChecklist input[type='checkbox']");
  const readinessScore = document.getElementById("readinessScore");
  const readinessFill = document.getElementById("readinessFill");

  function updateReadiness() {
    const total = checklistInputs.length;
    const checked = Array.from(checklistInputs).filter((i) => i.checked).length;
    readinessScore.textContent = `${checked} / ${total}`;
    readinessFill.style.width = `${(checked / total) * 100}%`;
  }
  checklistInputs.forEach((i) => i.addEventListener("change", updateReadiness));
  updateReadiness();

  /* ------------------------------------------------------------------------
     8. Rollout: Interactive 4-Week Timeline
     ------------------------------------------------------------------------ */
  const rolloutData = [
    {
      title: "Week 1 · Pilot with 2 to 3 developers on one repo",
      goal: "Establish safe foundations on a low-risk repository with good test coverage.",
      done: "AGENTS.md / CLAUDE.md written, primary harness installed, deny-by-default permissions configured, baseline metrics captured."
    },
    {
      title: "Week 2 · Build first skills and a reviewer subagent",
      goal: "Codify repeated team workflows so every developer gets consistent output.",
      done: "3 repeated tasks automated with SKILL.md files and a read-only PR reviewer agent active on pilot PRs."
    },
    {
      title: "Week 3 · Expand to the team & add CI guardrails",
      goal: "Roll out the validated setup to the wider engineering team with automated safety nets.",
      done: "All AI-assisted PRs pass secret scanning (gitleaks), unit tests, lint, and code-owner review."
    },
    {
      title: "Week 4 · Measure impact and set the team default",
      goal: "Evaluate real data before locking in tooling and budgets.",
      done: "Reviewed cycle time, review comments per PR, escaped defects, and monthly spend per developer."
    }
  ];

  const rolloutBtns = document.querySelectorAll("#rolloutTabs .rollout-btn");
  const rolloutDetail = document.getElementById("rolloutDetail");

  function selectWeek(idx) {
    const w = rolloutData[idx];
    rolloutBtns.forEach((b, i) => b.classList.toggle("active", i === idx));
    rolloutDetail.innerHTML = `
      <h4>${w.title}</h4>
      <p class="mt-sm"><strong>Goal:</strong> ${w.goal}</p>
      <p class="mt-sm"><strong>Done when:</strong> ${w.done}</p>
    `;
  }
  rolloutBtns.forEach((b, i) => b.addEventListener("click", () => selectWeek(i)));
  selectWeek(0);
})();

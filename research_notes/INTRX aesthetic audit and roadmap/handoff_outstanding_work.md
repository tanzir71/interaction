# INTRX: outstanding (left-off) work, process cost, and the shortest path to "ready" (as of 28 Nov 2026)

Scope: repo state / outstanding work / process cost / rule changes only. Read-only research; no verify, profile or build tool was run. All counts below come from reading files or from `git log`, `wc`, `du`, `find` and `grep` run on 28 Nov 2026 at HEAD `3b65919c`. Paths are relative to `C:\Users\tanzir\Desktop\interaction`. "Cited Findings" are facts from the repo; "Inferences" are my analysis and recommendations.

Source shorthand used below:
- [LLM_HANDOFF](../../docs/LLM_HANDOFF_2026-11-28.md) = `docs/LLM_HANDOFF_2026-11-28.md` (204 lines)
- [H3](../../CODEX_HANDOFF_3.md) = `CODEX_HANDOFF_3.md` (707 lines)
- [MOTION](../../MOTION_SYSTEM.md) = `MOTION_SYSTEM.md` (806 lines)
- [AGENTS](../../AGENTS.md) = `AGENTS.md` (2,620 lines)
- [README](../../README.md), [followups](../../docs/final-audit-followups.md), [partial startup JSON](../../docs/performance/catalog-startup-2026-11-28-partial.json), [a11y inventory JSON](../../docs/accessibility/catalog-initial-2026-11-26.json), [final-shell JSON](../../docs/performance/final-shell-2026-11-25.json), [threads-render JSON](../../docs/performance/threads-render-2026-11-25.json)
- "git" = `git log` output, 28 Nov 2026

---

## 1. What exactly does `docs/LLM_HANDOFF_2026-11-28.md` list as detected issues, retained measurements, rejected optimizations and pending acceptance?

### Takeaway
The handoff says the build is complete (all 520 components, shell, registry, CLI/MCP, Pro scaffolding) but "product acceptance remains incomplete": seven acceptance areas are open, none of them a functional breakage. Every open item is an aesthetic sign-off, a measurement that was not completed, or a strict numeric target missed by a small margin on a contended dev machine.

### Cited Findings

**Status statement**
- "All 520 components, including the 30 new components and 91 extensions, are implemented. The routed shell, registry, CLI/MCP package and Pro scaffolding are implemented. This does not mean every aesthetic, accessibility or performance requirement has passed. npm publication and payments are separate." — [LLM_HANDOFF](../../docs/LLM_HANDOFF_2026-11-28.md) "Start here"
- "Publication is complete when these files are pushed; product acceptance remains incomplete. No new audit, benchmark or aesthetic review was run for this publication." — [LLM_HANDOFF](../../docs/LLM_HANDOFF_2026-11-28.md) intro
- Last app-source commit is `8ff17cc3`; the handoff commit `3b65919c` only adds two tooling files (`tools/profile-shell-cold.js`, `tools/verify-startup-profiler.js`) plus docs. — [LLM_HANDOFF](../../docs/LLM_HANDOFF_2026-11-28.md) "Start here"; git

**"Pending acceptance" table (the seven open areas, quoted names)** — all from [LLM_HANDOFF](../../docs/LLM_HANDOFF_2026-11-28.md) "Pending acceptance"
| Area | Known result | Work left (as written) |
|---|---|---|
| Aesthetics | "No independent final aesthetic sign-off. A briefly delegated review was stopped at the owner's request before any visual comparisons or findings." | Compare shell, native tiles and full compositions with v4 Figma at desktop/mobile, both themes, "all 520 rather than inferring catalog approval from a few exemplars". |
| Detail startup | "Latest inventory recorded only 128 of 4,160 planned measurements; 35 recorded cases exceeded the strict 300ms heading/stage target." | Diagnose slow paths; complete current-source inventory. |
| Profiling reliability | Latest run exited on `cdpSession.send: Protocol error (Tracing.end): Tracing failed`. | Investigate tracing/driver termination. |
| Library preparation | "A historical real `Show more` click timed out waiting for button stability. Later probes did not reproduce it." | Diagnose the instability. |
| Mobile Lighthouse | "Some historical runs passed, but other default mobile runs were below 90." | "Establish stable current-source Performance >=90 for Home and Elastic Tabs". |
| CPU4 frame rate / compositor | "Native Reactive Threads still fails the recorded 60fps target." | Optimize "without changing the reference artwork, original source model or resource/lifecycle behavior". |
| Accessibility | "Broad scans and many targeted repairs exist, but incomplete/raw findings remain." | "Finish photographic, non-text, inactive/transient-state contrast; native/normal-motion states; keyboard/focus clipping and assistive-technology usability." |

**Retained measurements: startup (cold/warm first paint)**
- Planned matrix: 520 IDs x 2 widths x 2 shell themes x cold/warm = 4,160 cases, one repeat, CPU rate 1. Recorded: 128 measurements across 16 fully recorded components; 35 timing misses; 0 functional or page-JS errors; run killed by the tracing error. — [LLM_HANDOFF](../../docs/LLM_HANDOFF_2026-11-28.md) "Startup collection"
- Breakdown of those 128: cold 64 recorded / 35 misses, heading paint median 295.3 ms, p95 445.3, max 607.9; stage paint median 309.75 ms, p95 451.4, max 721.8; assets-ready median 359.8 ms. Warm 64 recorded / 0 misses, heading median 82.3 ms, p95 135.5, max 185.3. — [partial startup JSON](../../docs/performance/catalog-startup-2026-11-28-partial.json) `groups`
- Previous collection at `a2d25186`: 1,065 numeric measurements from 1,066 attempts, "135 cold and six warm timing misses and one Library preparation timeout". — [LLM_HANDOFF](../../docs/LLM_HANDOFF_2026-11-28.md) "Startup collection"
- Earlier focused sample (16 observations, Elastic Tabs + Static TV): "The first cold Elastic Tabs sample still reaches 337.5ms; the other fifteen heading/Stage proxies stay below 300ms." — [followups](../../docs/final-audit-followups.md)
- The original problem being fixed was "First paint when opening detail: 2–3 s" with gate "< 300 ms". — [H3](../../CODEX_HANDOFF_3.md) §1

**Retained measurements: Lighthouse mobile (all local, default mobile/simulated)**
- 25 Nov: "six Lighthouse scores of 100"; Home raw transfer 570,116 bytes, 339,147 after excluding two demo-only Inter fonts (230,969 bytes). — [AGENTS](../../AGENTS.md) final-shell paragraph; [final-shell JSON](../../docs/performance/final-shell-2026-11-25.json)
- 26 Nov at `f23c6dc8`: Home 100/100/100, Elastic Tabs 91/100/100; raw Home 572,202 bytes, 341,233 "conservative budget". — [followups](../../docs/final-audit-followups.md)
- Later collections on near-identical shell source: Home 91/89/75 and Elastic Tabs 100/100/90; Home 72/72/89 and Elastic Tabs 62/100/100; Home 70/77/100 and Elastic Tabs 90/100/100; Home 100/73/87 and Elastic Tabs 100/89/89. — [AGENTS](../../AGENTS.md) home-pane, router-startup, mobile-mono and header-backdrop paragraphs; last pair also in [LLM_HANDOFF](../../docs/LLM_HANDOFF_2026-11-28.md) "Shell startup / Lighthouse"

**Retained measurements: CPU4 frame rate**
- Native Reactive Threads (`showcase-threads` thumbnail) at 4x CPU throttle: "approximately 18.82 and 16.88fps, below 60. The computer had other active projects; these are contended observations, not isolated benchmark guarantees." — [LLM_HANDOFF](../../docs/LLM_HANDOFF_2026-11-28.md) "Reactive Threads"; AGENTS says "about 19–20fps". — [AGENTS](../../AGENTS.md)
- No catalog-wide CPU4 pass exists: every per-group `profile-*.js` note says measurements "leave final timing gates open". — [AGENTS](../../AGENTS.md) (repeated in each profile paragraph)

**Retained measurements: accessibility (axe 4.14.1, Chrome 158)**
- Whole-catalog initial scan: 520 components, 4,160 cases (widths 1440/390 x Stage theme x shell theme), full view only, reduced motion only, 0 boot errors, 0 page errors. — [a11y inventory JSON](../../docs/accessibility/catalog-initial-2026-11-26.json) `scope`, `summary`
- Raw results: `label-content-name-mismatch` 176 results / 320 nodes across 22 components; `color-contrast` 8 results / 96 nodes in 1 component (`ui-evervault-card`); 2,462 incomplete rule results / 15,269 nodes. "Do not call this a WCAG pass." — [AGENTS](../../AGENTS.md) catalog-initial paragraph; [a11y inventory JSON](../../docs/accessibility/catalog-initial-2026-11-26.json)
- Starting point before repairs: "726 rule violations across 140 components". — [AGENTS](../../AGENTS.md) audit-component-accessibility paragraph
- The 22 name-flag components and 6 name-incomplete components were later reviewed decision-by-decision (`tools/fixtures/catalog-label-review.json`) with no product change; the 96 Evervault glyph nodes were reviewed as decorative texture. — [AGENTS](../../AGENTS.md) catalog-label-review and evervault paragraphs
- Not covered: "every normal-motion state, native tile, real-touch path or screen-reader task". — [LLM_HANDOFF](../../docs/LLM_HANDOFF_2026-11-28.md) "Accessibility and aesthetics evidence"

**Rejected / unshipped optimizations**
- Reactive Threads: six investigations, one small change shipped (deferred hidden command generation, "no consistent end-to-end FPS benefit"), five rejected: ImageBitmap/cache (no benefit), Canvas context hints / cached Path2D / desynchronized canvas (readback hint "measured slower"), GPU instanced prototype ("fast in two observations but failed literal reference pixels"; AGENTS: "reach about 60fps but fail exact alpha bytes"), strips (failed "first literal native RGBA comparison"), worker (clipping altered edge pixels). — [LLM_HANDOFF](../../docs/LLM_HANDOFF_2026-11-28.md) "Reactive Threads"; [AGENTS](../../AGENTS.md) threads-gpu paragraph
- Shell: lazy-view candidate rejected "after a complete 96-sample A/B/B/A" (fewer script bytes, warm navigation regressed). Shipped: mobile Geist Mono subset (55,976 bytes), mobile Home `blur(0px)` header at zero scroll, early full-pane hide. None established a stable latency gain. — [LLM_HANDOFF](../../docs/LLM_HANDOFF_2026-11-28.md) "Shell startup / Lighthouse"; [AGENTS](../../AGENTS.md)

**Last recorded green state**
- "the last published phase recorded all seven required local phase checks passing, 520 previews, 100 offline exports, zero stage-fit offenders, 163 existing low-fill exceptions and nine package tests." — [LLM_HANDOFF](../../docs/LLM_HANDOFF_2026-11-28.md) "Verification and evidence preservation"
- `.artifacts/stage-fit.json` (27 Nov): total 520, failed [], overflow [], hscroll [], tinyText [], lowFill [] (with exceptions list). — local file read

### Inferences
- **Classification of every open item** (my recommendation; reasoning in parentheses):

| Item | Class | Reasoning |
|---|---|---|
| Site not deployed from current source / deployment route undecided (see Q7) | **Launch-blocking** | Nothing ships until a host is chosen; generated URLs assume `https://intrx.vercel.app`. |
| Aesthetic sign-off of shell + most-visible tiles | **Launch-blocking (scoped)** | Owner's stated priority; but scope to Home, the first batch of each category and featured tiles, not "all 520 vs Figma". Handled by the aesthetic workstream. |
| Stale public docs (README "Handoff 3 is in progress"; IMPLEMENTATION_PROGRESS "Remaining work" still lists phases 4–6) | **Launch-blocking (15 min)** | Misleads the next agent and visitors. |
| npm package `@tanziro/intrx` not published | **Launch-blocking for the agent feature (about 15 min of owner time)** | Home, detail and the MCP config already show `npx @tanziro/intrx@latest add …` / `npx -y @tanziro/intrx@latest mcp` (grep of `js/shell/views/home.js`, `detail.js`, `ui.js`), so the headline command fails for visitors until the package is on npm. |
| Mobile Lighthouse ≥90 "stable" | **Should-fix, re-measure once on the deployed URL** | Same source scored 100 and 62–75 on a contended machine; this is measurement noise until measured on real hosting. |
| Cold detail first paint <300 ms on all 4,160 cases | **Deferrable / waive** | Warm is 0/64 misses (max 185 ms); cold median stage paint is ~310 ms versus an original 2–3 s. A 10 ms median miss is imperceptible. |
| CPU4 60 fps (Reactive Threads native ~17–19 fps) | **Should-fix for that one tile, waive the universal gate** | The GPU prototype already hit ~60 fps and was rejected only for byte-inexact alpha. Accept visual equivalence or freeze the tile to a poster until hover. |
| Whole-catalog axe incompletes (15,269 nodes), photographic/transient contrast, screen-reader usability | **Deferrable** | No boot/page errors in 4,160 cases; name and contrast flags have been individually reviewed. Publish a short known-limitations note instead. |
| `Show more` stability timeout (1 occurrence in 1,066; not reproduced in 200 probes) | **Droppable** | Unreproducible. |
| Tracing failure in profiler | **Droppable** | Tooling problem, not product. |
| Pro launch flag, payments | **Deferrable by design** | Owner decision; scaffolding is in place and disabled. |
| React ports, remote MCP endpoint | **Deferrable** | Marked SOON / optional in H3. |

- The open list is entirely "acceptance" work, not "implementation" work. The product is functionally complete; what is missing is a decision about how strict v1 needs to be.

### Gaps
- I did not open the six `threads-*.json` files individually beyond `threads-render`; numbers for them are taken from the handoff and AGENTS summaries.
- No independent check of whether the 163 low-fill exceptions look acceptable (aesthetic researcher's scope).

---

## 2. What are the formal acceptance gates in `CODEX_HANDOFF_3.md` (§4 budgets, §9 phases) and `MOTION_SYSTEM.md`? Which are passed, open, or over-specified for v1?

### Takeaway
All seven build phases (0–6) are implemented and the static/rendered structural gates pass; three numeric gates remain open (300 ms cold first paint, stable Lighthouse ≥90, 60 fps at 4x CPU) plus the unquantified "matches Figma frames". Those three were specified for two exemplar routes or "every component" and were then expanded by the executing agent into 4,160-case matrices that never completed.

### Cited Findings
- **§1 rendered gates** (measured by `tools/audit-stage-fit.js`): tiles with content outside the stage 50 → 0; horizontal scroll 6 → 0; text ≤8px 73 → "0 below 11px"; fill <12% 56 → 0 (bleed exempt); demos drawing own control buttons 195 → 0; first paint on detail "2–3 s" → "< 300 ms". — [H3](../../CODEX_HANDOFF_3.md) §1
- Status of the first five: pass. `.artifacts/stage-fit.json` shows 0 failures across 520; `tools/stage-baseline.json` is `{}` and `tools/motion-baseline.json` has empty `violations`; "Stage and motion baselines are empty. Run both static audits with `--strict` locally". — local files; [AGENTS](../../AGENTS.md)
- The fill gate passes only with 163 documented exceptions under an "Owner clarification, 15 Nov 2026: sparse controls keep the exact Figma size". — [AGENTS](../../AGENTS.md) Rules; [LLM_HANDOFF](../../docs/LLM_HANDOFF_2026-11-28.md)
- **§4.6 performance budget**: "home transfers under 400KB before interaction (excluding demo assets); Lighthouse Performance ≥ 90 on mobile for `#/` and `#/c/elastic-tabs`." — [H3](../../CODEX_HANDOFF_3.md) §4.6
- Status: transfer budget passes only by accounting (raw 570–572 KB; 339–341 KB after excluding two demo-only Inter fonts). Lighthouse is unstable (see Q1). — [followups](../../docs/final-audit-followups.md); [AGENTS](../../AGENTS.md)
- **§4.3 detail performance**: "Target: first paint under 300ms." — [H3](../../CODEX_HANDOFF_3.md) §4.3. Status: open (Q1).
- **§4.7 accessibility**: tile as a unit, 2px focus ring, "text-tertiary on surface must stay ≥ 4.5:1 in both themes", `aria-live` copy announcements. — [H3](../../CODEX_HANDOFF_3.md) §4.7. Status: `tools/verify-tertiary-contrast.js` and `tools/verify-shell-accessibility.js` exist and are described as passing in scope. — [AGENTS](../../AGENTS.md)
- **§9 phases and acceptance**: 0 Foundations; 1 Stage contract; 2 Registry + agents ("`npx ./packages/intrx mcp` lists 7 tools… `node --test` green"); 3 Shell ("Matches Figma frames at 1440 and 390; detail first paint < 300ms; Lighthouse mobile ≥ 90; no page jump on open/close"); 4 Remediation ("`audit-stage-fit.js` exits 0; `verify-stage.js` exits 0; legacy aliases removed"); 5 New components ("30 entries pass both verifiers and the stage audit"); 6 Pro seams. — [H3](../../CODEX_HANDOFF_3.md) §9
- H3 §9 lists seven verification commands to "run all before each PR"; it does not ask for per-group verifier suites, pixel oracles or evidence archives. — [H3](../../CODEX_HANDOFF_3.md) §9
- H3 ground rules: "Stay zero-build… no bundler and no framework"; "Never copy code or assets from the reference sites"; "Ship one phase per PR" (later overridden by owner: commit and push directly). — [H3](../../CODEX_HANDOFF_3.md) §0; [AGENTS](../../AGENTS.md) Rules
- **MOTION §7 per-component acceptance**: tokens only (no literal `cubic-bezier(` or `ms`); exit shorter than enter; mid-transition reversal retargets; "Nothing animates width/height/top/left directly… 60fps in Chrome performance panel at 4x CPU slowdown"; reduced-motion gives opacity-only version; hover absent on touch; "Loops and canvases pause offscreen and in hidden tabs." — [MOTION](../../MOTION_SYSTEM.md) §7
- Status: static token/duration/reduced-motion/linear rules pass in `--strict` with 7 hash-bound "virtual model bodies" exempted (`tools/motion-models.json`); hidden-tab pausing verified for all components (`tools/verify-page-visibility.js`); 60 fps at 4x CPU open. — [AGENTS](../../AGENTS.md); local files
- MOTION says of itself: "It is calibrated to transitions.dev… nothing here needs a new dependency." — [MOTION](../../MOTION_SYSTEM.md) intro

### Inferences
- **Passed**: phases 0, 1, 2 (minus npm publish), 4, 5, 6; all five structural stage gates; strict static motion audit; tertiary contrast; hidden-tab pausing; no page jump.
- **Open**: Phase 3's "matches Figma frames" (never independently reviewed), 300 ms cold first paint, stable Lighthouse ≥90, and MOTION's 60 fps at 4x CPU.
- **Over-specified for a v1 launch** (my view):
  - "60fps at 4x CPU slowdown" for all 520, including full-canvas simulations. A sensible v1 bar is smooth at 1x on the native tile, with heavy scenes poster-first.
  - 300 ms as a hard pass/fail on every component x width x theme x cold/warm. H3 wrote it as a "target" for the detail view.
  - The 12% fill gate, which needed 163 written exceptions each carrying a Figma node ID. A gate with 31% exceptions is not doing useful work.
  - Token-only motion in `--strict` mode will reject any ported third-party code (see Q5).
  - "Matches Figma" is about to be superseded by the owner's own aesthetic upgrade decision, so pixel parity with v4 tiles is no longer the target.

### Gaps
- No file records a formal owner sign-off of any phase; "passed" above means "the repo's own checks and ledgers report it".

---

## 3. What remains open per `AGENTS.md` (final motion, a11y, contrast, cold-route, Lighthouse, CPU4; Pro flag; npm publication; deployment)?

### Takeaway
AGENTS.md repeats the same five open acceptance items in almost every paragraph (45 "remains open"-style statements) and adds four launch logistics items that no audit will close: the Pro flag is off, npm is unpublished, GitHub Actions is disabled with a $0 budget, and no deployment was performed.

### Cited Findings
- Catalog status: "All thirty new components and all ninety-one extensions are implemented; the catalog is 520. Pro scaffolding is implemented; final audits remain." — [AGENTS](../../AGENTS.md)
- Recurring open list: "These seams leave final motion, a11y, contrast, cold-route, Lighthouse and performance acceptance open." — [AGENTS](../../AGENTS.md) Pro paragraph; equivalent wording appears in most later paragraphs (45 matches for "remain(s)/stay(s) open" patterns by grep)
- Catalog: 520 items, all `tier: free`, 0 items declare `libs`; 468 dark stages / 52 light; groups Interface 152, Visual FX 104, Motion 79, Collections 72, Pointer & Physics 58, Data & AI 55. — `registry/index.json` (counted)
- Pro: `js/shell/access.js` has `enabled:false`, candidates `['fx-liquid-glass','fx-plasma-orb']`, `upgradeUrl:'https://intrx.vercel.app/#/pricing'`. "Never activate this flag, take payments or change the Pricing SOON state as part of routine work." — `js/shell/access.js`; [AGENTS](../../AGENTS.md); [pro-scaffolding](../../docs/pro-scaffolding.md)
- npm: package is `@tanziro/intrx` v3.0.0 ("the unscoped npm name was occupied"), deps `@modelcontextprotocol/sdk` and `zod`; "npm publication is pending". — `packages/intrx/package.json`; [AGENTS](../../AGENTS.md); [README](../../README.md)
- The shell already advertises the scoped package: `npx @tanziro/intrx@latest add elastic-tabs` (plus `bunx` and `pnpm dlx` variants) on Home, `npx @tanziro/intrx@latest add <id>` on detail, and `npx -y @tanziro/intrx@latest mcp` in the MCP config. — grep of `js/shell/views/home.js`, `js/shell/views/detail.js`, `js/shell/ui.js`
- GitHub Actions: "Owner instruction, 17 Nov 2026: keep GitHub Actions disabled… The owner's account-wide Actions budget is $0 with 'Stop usage when budget limit is reached' enabled". "GitHub Pages uses the custom workflow publishing source; branch publishing must stay disabled." — [AGENTS](../../AGENTS.md)
- Deployment: "This task publishes repository source by commit/push; it does not run a Pages workflow, deploy a website or publish the npm package." — [LLM_HANDOFF](../../docs/LLM_HANDOFF_2026-11-28.md) end
- Stale ledgers: README still says "Handoff 3 is in progress"; `IMPLEMENTATION_PROGRESS.md` "Remaining work" (lines 1240–1249) still lists remediation buckets, the 121 new components and Pro seams as remaining. — [README](../../README.md); `IMPLEMENTATION_PROGRESS.md`
- Other residual observations AGENTS keeps open: default-GPU raster differences in several pixel suites (only software rasterization passes); Chrome 158 vs Chromium 140 fixture differences; native Glass Pass "unchanged-code raster variation"; "47 raw flags and 616 incomplete results" from one bulk review; Library `Show more` timeout. — [AGENTS](../../AGENTS.md)
- No `api/` directory exists at repo root, so the optional remote MCP endpoint (`api/mcp.js`, H3 §6.2) was not built. — root `ls`; [H3](../../CODEX_HANDOFF_3.md) §6.2

### Inferences
- The residual GPU/browser-version raster notes are artifacts of the zero-tolerance pixel method, not user-visible defects. They disappear if byte-exact oracles are retired.
- The logistics items (deploy, npm publish, host decision) are small in effort (hours) but have been blocked by standing owner instructions rather than by technical debt.

### Gaps
- Whether the repo is public and whether any Pages/Vercel deployment is currently live was not checked (no web access used). See Q7.

---

## 4. What process habits made this slow? (quantified)

### Takeaway
Building was fast (121 new components in about 30 hours, ~15 minutes each). The time sink was the verification regime: byte-exact oracles, a bespoke verifier suite plus an evidence archive plus an AGENTS.md paragraph for every change, and a final-audit tail that produced 65 commits in three days without closing any gate. Verification assets outweigh the product shell by roughly 50x in code and the repo's local evidence store is 34.6 GB.

### Cited Findings

**Git history** — git
- 274 commits, single author, 2026-07-11 → 2026-11-28, on 20 active days. By month: July 76 (v1, 399 demos), September 1, November 197 (Handoff 3, 15–28 Nov, about 14 commits/day, peak 26 on 26 Nov).
- Phase timing from commit timestamps (+0600):
  - Phases 0–3 (foundations, stage contract, registry/CLI/MCP, routed shell): 5 commits, 15 Nov 02:11–03:27.
  - Phase 4 remediation of 399 demos: 104 commits, 15 Nov 03:27 → 22 Nov 21:57 (about 186 elapsed hours, ~28 min per demo including idle gaps).
  - Phase 5, 30 new + 91 extension components: 22 commits, 22 Nov 21:57 → 24 Nov 03:58 (30.0 hours, 14.9 min per component; per-group range about 9–35 min).
  - Phase 6 Pro seams: 1 commit, 35 minutes.
  - "Final audit" tail: 64 commits, 24 Nov 04:33 → 27 Nov 00:51 (68.3 hours, ~64 min per commit), then the handoff commit on 28 Nov.
- Last 100 commits: 84 touched product source, 15 touched only tooling (+docs), 1 docs only. All 16 non-product commits are in the tail, i.e. 16 of the 65 tail commits (25%) changed nothing a visitor could see.
- Every one of the last 100 commits touched at least 2 docs files (AGENTS.md plus a ledger or evidence JSON).
- File touches in the last 100 commits: generated output 15,096 (85%), product source 1,472 (8%), tools 830 (5%), docs 322 (2%). Single shared-metadata commits regenerate ~1,600 files (e.g. `66c28ea5`, 1,577 files; `3ff6ccd2`, 1,599 files).
- Lines inserted since 15 Nov by top-level dir: `tools` +1,699,405; `docs` +673,413; `registry` +156,718; `js` +24,573 (−22,393); `css` +304; `AGENTS.md` +2,572 (−72). (Caveat: fixtures are JSON and demo source uses very long lines, so line counts understate `js`.)

**Verification tooling** — `ls`, `wc`, `du`, `grep` on `tools/`
- `tools/` holds 415 top-level entries: 334 `verify-*.js` (14,795 lines, 3.07 MB), 48 `profile-*.js` (1,443 lines, 0.41 MB), 4 `audit-*.js`, 3 `build-*.js`, 6 `*.test.js`. All top-level `tools/*.js`: 406 files, 4.86 MB.
- `tools/verification/`: 733 files, 723 JS helpers (3.38 MB). `tools/fixtures/`: 1,164 files, 350 MB (largest single fixture 24.3 MB; eight ~7.5 MB Halftone Globe canvas captures).
- Of the 334 verifiers: 266 need a browser (Playwright/Chrome), 251 use sha256/`createHash`, 216 read fixtures, 77 compare screenshots/PNGs, 30 tool files reference `photo-credits`, 80 tools read the "frozen" `css/style.css`.
- For scale, the product shell is `js/shell/**` 89.6 KB + `css/foundations.css` 50.9 KB + `js/demo-runtime.js` 7.6 KB; demo source is 447 files, 27.5 MB, for 520 demos (median demo html+css+js 33,442 chars, p90 105,217, max 757,702 for `terminal-window`).
- Tracked files: 9,088 (assets 4,467; tools 2,310; registry 1,128; r 520; js 465; docs 128). `.git` is 1.54 GB.

**Evidence archives**
- `.artifacts/` (gitignored): 34.6 GB, 131,567 files, 669 top-level entries, 77 `FROZEN.json` markers. — `du`, `find`
- AGENTS names 33 distinct sealed collections (V23–V77) with the rule "read/copy only: never execute/edit their helpers/candidates/inputs, nor copy their code elsewhere to execute". — [AGENTS](../../AGENTS.md); [LLM_HANDOFF](../../docs/LLM_HANDOFF_2026-11-28.md)
- `docs/`: 128 tracked files, 21 MB, including 36 accessibility, 73 performance and 5 motion evidence JSONs; `docs/remediation-progress.md` is 5,316 lines / 52,925 words; `IMPLEMENTATION_PROGRESS.md` 1,659 lines. — `ls`, `wc`

**Instruction file**
- `AGENTS.md`: 2,620 lines, 24,342 words, 197,591 bytes, 218 top-level bullets. It names 372 distinct `tools/verify|profile|audit-*.js` paths and contains 197 "exact(ly)", 158 "preserve", 116 "unchanged", 103 "frozen"/"read/copy only". It grew by 2,572 lines in 14 days. — `wc`, `grep`; git
- Representative rules: "Do not introduce a pixel tolerance"; "Never add numeric/pixel tolerances for browser-dependent derived projections"; "Preserve the earlier failed runs"; "Keep the initial renderer-only candidate and failure as evidence"; "Preserve all 882 native layers, 24 supplied SVG slots using 23 unchanged files". — [AGENTS](../../AGENTS.md)

**Concrete cost examples from the tail** — git; [AGENTS](../../AGENTS.md)
- `f2c995f1` "Keep Rotating Gallery captions readable over photos": one CSS backing on seven captions; 11 files, +311/−14, a new verifier, an evidence JSON and an AGENTS paragraph; 66 minutes after the previous commit.
- `29b97439` "Keep Parallax plane labels readable": 11 files, +474/−12; 122 minutes.
- Reactive Threads: six investigations (worker, lazy, canvas/ImageBitmap, context, GPU, strips), one minor change shipped, FPS unchanged; the GPU candidate that reached ~60 fps was rejected for failing "exact alpha bytes".
- Catalog-wide collections that were started and not completed: an audit interrupted at 214 components / 1,712 cases (V36), a startup run that kept 22 components / 176 cases (V39), the `a2d25186` startup inventory stopped at 1,066 of 4,160 attempts, and the latest at 128 of 4,160. None reached a full matrix.

### Inferences
- **Cost driver 1: zero-tolerance pixel and byte oracles.** They turn harmless renderer differences (GPU vs software, Chrome 140 vs 158) into "failures" that must be investigated and archived, and they forbid the one optimization that fixed Threads.
- **Cost driver 2: per-change ceremony.** Each fix yields a product delta of ~10–20 lines and ~300–900 lines of verifier/evidence/doc. In the tail that is about one hour per small fix.
- **Cost driver 3: "originals must stay byte-unchanged".** Because controllers, HTML and CSS are hash-bound to fixtures, fixes are appended as scoped overrides and each needs a "reversible migration" fixture. This is the opposite of what a restyle pass needs.
- **Cost driver 4: unbounded matrices.** Gates written for two routes (Home, Elastic Tabs) were re-scoped to 520 x 2 x 2 x 2 = 4,160 cases, and a11y to 4,160 scans with 15,269 "incomplete" nodes to review by hand.
- **Cost driver 5: instruction bloat.** At ~198 KB, AGENTS.md is on the order of 50,000 tokens (my estimate at ~4 bytes/token) loaded into every agent session, most of it history rather than rules. It also makes it easy to miss the few rules that matter.
- **Cost driver 6: generated-output churn.** `registry/` (393 MB) and `r/` (298 MB) are committed; any shared change rewrites ~1,600 files and bloats `.git` (1.54 GB).
- The contended machine ("other active projects") made timing gates non-reproducible, which fed more re-measurement.

### Gaps
- No token or dollar cost data exists in the repo; commit-interval timing is a proxy that assumes near-continuous agent operation and cannot separate thinking, tool runtime and idle time.
- Work done before the first 15 Nov commit (phases 0–3 landed within 76 minutes) is not visible in history.

---

## 5. Which verification rules would block (1) a fast aesthetic polish pass, (2) photo swaps, (3) porting MIT-licensed code or adding a small runtime dependency? Minimal rule change for each.

### Takeaway
The seven mandatory commands are mostly compatible with fast change; the blockers are (a) a handful of hard-coded shape checks in `verify-registry.js`, (b) `verify-motion.js --strict`, (c) the ~330 group suites and fixtures that pin "exact native layers", hashes and pixels, and (d) the written prohibitions in AGENTS.md / H3 §0. The dependency seam (`libs` + lazy CDN loader + export support) already exists in the code and is simply unused.

### Cited Findings

**Written prohibitions**
- "No bundler, no framework, no runtime dependencies in the site. Only `packages/intrx` may have npm dependencies." "Never copy code or assets from reference sites; new components are original implementations." "Build what the v4 tile in Figma shows; the tile wins over older art and older demos." "Rendered thumbnail text ≥ 11px; neutral greys + one accent per demo (no decorative hues)". — [AGENTS](../../AGENTS.md) Rules; [H3](../../CODEX_HANDOFF_3.md) §0, §3.9
- "Keep `css/style.css`, `css/fonts.css`, the runtime, stage and base exporter unchanged as frozen v1 inputs." — [AGENTS](../../AGENTS.md). `index.html` loads only `css/foundations.css` and `css/fonts.css`; `css/style.css` (45.6 KB) is not linked by the site and exists as a fixture input (80 tools read it). — `index.html`; grep

**`tools/verify-registry.js` (mandatory command 1)** — file read
- Every demo must be listed in `INTRX-handover/manifest/components.json` with an identical title (`UNLISTED V4 COMPONENT`, `V4 TITLE`), and every manifest row must exist (`MISSING V4 COMPONENT`). The manifest has exactly 520 rows (399 repo, 30 new, 91 extension), each with a Figma node.
- Hard-coded shape: DRAMS count must equal `DRAMS_CATALOG.json`; Framer Collection must be exactly 4; Interactive Showcase must be exactly 16; `HANDOFF 2 PUBLISHED` must be exactly 56; total must equal the number of metadata entries.
- `DRAMS MUST BE NATIVE` and `SHOWCASE DEPENDENCY`: any `libs` entry on those 68 demos is an error.
- For the 56 Handoff-2 IDs only: no backticks/`${`, all classes prefixed with `rootClass`, no `position:fixed`, no `fetch(`, `XMLHttpRequest`, `localStorage` or `https://` in html/css/js.
- All demos: required fields `id,title,cat,rootClass,desc,seen,hint,html,css,js,prompt`; prompt ≥300 chars; JS must compile.

**`tools/verify-stage.js` (command 2)** — file read
- Requires sidecar metadata, valid `designSize`/`stage`/`trigger`/`tier`/`thumb`/`addedAt`, `controls.length ≤ 3`, no in-demo `<button>` labelled replay/reset/animate/restart/play again, no root-level `background`/`border`.
- Every low-fill exception in `tools/stage-fit-allowlist.json` must carry `reason`, a `figmaNode` matching `^\d+:\d+$`, a `figmaUrl` starting `https://www.figma.com/design/`, a selector and a `designSize`.

**`tools/verify-motion.js` (command 6)** — file read
- "curve: every cubic-bezier() must be one of the named system curves; duration: every UI duration between 40ms and 999ms must be on the scale; reduced: every demo needs a prefers-reduced-motion path; linear: no `linear` easing on UI transitions". Default mode fails only on regressions vs `tools/motion-baseline.json`; `--strict` fails on any violation; `--update-baseline` exists. `tools/motion-models.json` exempts 7 function bodies by sha256.

**`tools/build-registry.js --check` (command 3) and assets** — file reads
- Throws `Photo asset needs verified attribution: <name>` when a referenced `photo-*` asset has no entry in `assets/photo-credits.json`.
- `assets/photo-credits.json`: 24 entries, each with Unsplash `photoId`, photographer, page URL, licence, `verifiedAt`, and sha256 + dimensions for both the 1600px and 800px files.
- `tools/build-demo-assets.js` base64-embeds every image in `assets/demo-assets.json` and seven font faces into `js/demo-assets.js` (4.39 MB); it does not itself check hashes.
- Generated output must be regenerated and committed; `registry/c/*.json` items embed the full single-file HTML (median 534 KB, max 6.0 MB each).

**Group suites (not in the mandatory seven, but AGENTS says to run them "after changing")**
- Typical wording: "Preserve all 206 native layers, 42 supplied SVG slots using 27 unchanged files, four approved photo slots"; "All eleven photo asset pairs retain their 800/1600px hashes and credits"; "exact native PNGs"; "Keep the original controller, HTML, metadata… unchanged". — [AGENTS](../../AGENTS.md)
- `tools/verify-delivery.js` compares all 520 "original/effective definitions" and content hashes. — file read

**Existing dependency seam**
- `js/shell/registry.js` and `js/shell/export.js` both contain a library map `{gsap:'https://cdn.jsdelivr.net/npm/gsap@3.12.5/dist/gsap.min.js', scrolltrigger:'…ScrollTrigger.min.js', lenis:'https://cdn.jsdelivr.net/npm/lenis@1.1.14/dist/lenis.min.js'}`; the exporter injects `libs` into the single-file HTML head; the detail page shows `Stack: item.libs.join(', ')` or "Vanilla JS · 0 dependencies". — grep of those files
- H3 §4.6 already specifies the pattern: "Lazy-load GSAP, ScrollTrigger and Lenis only when a demo whose `libs` includes them boots". — [H3](../../CODEX_HANDOFF_3.md) §4.6
- Current catalog: 0 of 520 items use `libs` (the last one was removed in `4aa55059` "Remove scroll dependency"). — `registry/index.json`; git

**Existing third-party precedent**
- 72 demos carry `source.url`; 52 DRAMS are "independent native interpretations" of 1042 Studio designs; 16 Showcase items reference React Bits, Aceternity, Magic UI, Motion and Paper Shaders as inspiration, "not copies of the React libraries". — [license-credits](../../docs/license-credits.md); [SHOWCASE_SOURCES](../../SHOWCASE_SOURCES.md); [DRAMS_IMPLEMENTATION](../../DRAMS_IMPLEMENTATION.md)

### Inferences (minimal rule changes)

**(1) Fast aesthetic polish pass**
| Blocker | Minimal change |
|---|---|
| "The v4 tile wins"; "exact native layers/SVG bytes/geometry"; originals byte-unchanged | Replace with: "Figma v4 is a reference, not an oracle. Demo html/css/js may be edited directly." |
| ~330 group suites with hash/pixel fixtures | Stop running them. Tag the current commit (e.g. `v3-verified`) and move `tools/verify-*`/`profile-*` group suites, `tools/verification/` and `tools/fixtures/` out of the working rule set (delete from main or leave unreferenced). |
| `verify-registry.js` title must equal manifest | Drop the `V4 TITLE` check or make the manifest editable alongside the demo. |
| Stage-fit allowlist requires Figma node + URL | Require only `reason`. Consider lowering or removing the 12% fill gate; keep overflow, h-scroll and 11px text. |
| "one accent, no decorative hues", "No italics" | Owner/aesthetic-lead decision; these are style rules, not checks in the seven commands. |
| Posters and registry must be regenerated | Keep, but run once per batch (`build-posters --ids=…`, `build-registry`), not per component. |
| `verify-motion --strict` | Run default (baseline) mode; `--update-baseline` after a deliberate restyle. |

**(2) Photo swaps**
| Blocker | Minimal change |
|---|---|
| Group suites pin 800/1600 hashes, crops and photo pixels | Retire with the group suites. |
| `build-registry` requires a credit entry for each `photo-*` asset | **Keep** (it is the licence safeguard and costs seconds). Add a small helper script that, given a new file pair + Unsplash URL + photographer, writes the entry and computes both sha256s. |
| H3 §2.4 "Use only the dark editorial set" (25 keys) | Relax to "licensed, credited photos; subject matches component". |
| Rule "Keep both credits and 800/1600px hashes unchanged" | Replace with "hashes in photo-credits.json must match the files" (recomputed, not frozen). |

**(3) Porting permissively licensed code / adding a small runtime dependency**
| Blocker | Minimal change |
|---|---|
| "Never copy code or assets from reference sites" (AGENTS, H3 §0, license-credits.md) | Replace with a licence-gated policy: code may be adapted only from sources under MIT/BSD/ISC/Apache-2.0/CC0 (or with written permission); keep the copyright notice in the demo source comment and in a `THIRD_PARTY_NOTICES.md`; set `source: {name, url, license}` on the demo. Sites with no licence or proprietary terms stay inspiration-only. |
| "No runtime dependencies in the site" | Allow per-demo `libs` only (never shell-wide), lazy-loaded, pinned version, from the existing map. Add entries to the map in `js/shell/registry.js` and the exporter (note `export.js` is labelled frozen; `export.shared.js` is the documented extension point). Prefer self-hosting the pinned file under `assets/vendor/` so exports work offline. |
| `verify-registry.js`: `UNLISTED V4 COMPONENT`, fixed counts (Showcase 16, Framer 4, H2 56), `SHOWCASE DEPENDENCY`, `DRAMS MUST BE NATIVE` | Make the manifest check one-directional (manifest rows must exist; extra demos allowed), delete the fixed-count assertions, keep the DRAMS/Showcase no-libs rule only if desired. |
| `verify-motion --strict` rejects foreign easing curves and durations | Baseline mode, or a per-demo `motion: 'vendor'` exemption (the sha256 model-exemption mechanism already exists as a precedent). |
| `rootClass` prefix / namespace rule (enforced for 56 H2 IDs, convention elsewhere) | **Keep** as a convention: ported CSS must be prefixed because all demos share one document. This is a mechanical rename, cheap for an agent. |
| Stage contract (shell owns frame/dock; ≤3 controls; no own replay buttons) | **Keep**; it is what makes 520 tiles coexist. |
| Export pipeline assumes a self-contained single file (fonts/photos embedded; `libs` as CDN `<script>`) | No change needed for CDN libs. For ES-module-only libraries, either use a UMD/IIFE build or inline a small MIT snippet into the demo `js`. Zero-build stays intact. |

- The owner's new decision does not require a bundler or framework: per-demo lazy `libs` plus inlined, attributed snippets cover the use case while keeping the site zero-build.

### Gaps
- `tools/verify-library.js` contains no `libs`/"Vanilla" assertion (0 grep matches), but `packages/intrx/test/intrx.test.js` and `packages/intrx/src/*` reference `libs`; I did not read those tests, so check them before the first `libs` demo lands.
- Licences of the specific reference libraries (React Bits, Aceternity, Magic UI, etc.) were not checked here; that belongs to the library-extension researcher.
- DRAMS are design reinterpretations credited to 1042 Studio; whether permission exists is not recorded in the repo.

---

## 6. What is the minimum set of checks worth keeping as a fast regression loop, versus what could be retired or run only before release?

### Takeaway
Keep the seven "Verify before each phase commit" commands (four static Node checks that should take seconds, two browser sweeps that should take minutes) plus the two small unit-test commands; retire the ~330 group suites, 48 profilers and all evidence-preservation rules from the routine loop.

### Cited Findings
- The mandatory list: `node tools/verify-registry.js`; `node tools/verify-stage.js`; `node tools/build-registry.js --check`; `node tools/verify-library.js http://127.0.0.1:4173`; `node tools/audit-stage-fit.js http://127.0.0.1:4173`; `node tools/verify-motion.js`; plus `node tools/serve.js 4173` as the server. — [AGENTS](../../AGENTS.md) "Verify before each phase commit"
- Sizes: `verify-registry.js` 89 lines/5.6 KB; `verify-stage.js` 59/5.3 KB; `verify-motion.js` 73/3.9 KB; `build-registry.js` 101/17.7 KB; `verify-library.js` 81/13.9 KB; `audit-stage-fit.js` 136/9.2 KB; shared loader `tools/load-registry.js` 15 lines (evaluates all 447 demo files in a Node `vm`). — `wc`
- The first three and `verify-motion` are browser-free. `verify-library.js` and `audit-stage-fit.js` require Playwright via `PLAYWRIGHT_MODULE` (not a repo dependency; the variable is unset in this shell). `audit-stage-fit` "boots every tile"; `verify-library` loops over `INTRX.catalog` and a set of offline exports ("520 previews, 100 offline exports"). — file reads; [README](../../README.md); [LLM_HANDOFF](../../docs/LLM_HANDOFF_2026-11-28.md)
- Throughput reference: the a11y sweep ran 1,040 full-view cases (one width group) from 05:34:46 to 05:36:38, about 113 seconds. — [a11y inventory JSON](../../docs/accessibility/catalog-initial-2026-11-26.json) `runs[0]`
- The disabled CI workflow ran only: verify-registry, verify-stage, verify-motion, build-registry --check, `node --test tools/runtime.test.js tools/shell.test.js`, and `npm ci` + `npm test` in `packages/intrx`. — `.github/workflows/pages.yml`

### Inferences
- Plausible durations (not run): the three static verifiers a few seconds each; `build-registry --check` tens of seconds (it regenerates and compares ~690 MB of JSON); each browser sweep roughly 2–6 minutes given ~9 cases/second observed elsewhere. Whole loop: under ~10–15 minutes, static half under ~1–2 minutes.
- **Proposed tiers**
  - *Every commit (static, ~1–2 min):* verify-registry (relaxed per Q5), verify-stage, verify-motion (baseline mode), build-registry --check.
  - *Every batch / before push (browser, ~5–10 min):* verify-library, audit-stage-fit, `node --test tools/runtime.test.js tools/shell.test.js`, `npm test --prefix packages/intrx`.
  - *Before release only:* `tools/audit-component-accessibility.js` (one reduced-motion full-view pass; compare counts to the 26 Nov baseline of 176/8/2,462), `tools/verify-shell-accessibility.js`, `tools/verify-page-visibility.js`, one Lighthouse run per route on the deployed URL, `tools/verify-catalog-titles.js` if titles change.
  - *Retire:* all per-group `verify-*-ext*`, `verify-*-new*`, palette/name/contrast one-offs, all 48 `profile-*.js`, `tools/verification/`, `tools/fixtures/` (350 MB), the `FROZEN`/V## protocol, "preserve every failed capture", software-raster pinning, cross-browser fixture notes. They certify the pre-restyle state and will fail by design once visuals change.
- Add one cheap new check the regime lacks: a visual contact sheet (the existing `tools/build-posters.js` output in `assets/posters/`, 520 files) diffed by eye per batch. This is what an aesthetic pass actually needs.

### Gaps
- Actual runtimes were not measured (running tools was out of bounds). `build-registry --check` could be slower than estimated because of 520 embedded-asset documents.
- Playwright/Chrome availability on this machine for a new agent is unverified (`PLAYWRIGHT_MODULE` unset here).

---

## 7. Is the site actually deployed/publishable today? How, and what is the simplest route that does not need GitHub Actions?

### Takeaway
The site is publishable as static files today (`node tools/prepare-site.js` stages it; everything needed is also already committed at the repo root on `main`), but the only configured deployment is a GitHub Pages Actions workflow that the owner has disabled, and the handoff states no deployment was performed. The deployable set is large (779 MB, 6,711 files), which is the main practical constraint on host choice.

### Cited Findings
- `.github/workflows/pages.yml`: triggers on push to `main`; a `verify` job (Node 18 and 22) then a `deploy` job that runs `node tools/prepare-site.js`, uploads `.artifacts/site` with `actions/upload-pages-artifact@v4` and deploys with `actions/deploy-pages@v4`. — file read
- `tools/prepare-site.js` copies `index.html`, `.nojekyll`, `css`, `js`, `assets`, `registry`, `r`, `docs`, `llms.txt`, `llms-full.txt`, `LICENSE` into `.artifacts/site` (after deleting that folder). — file read
- Deployable size: 779,114 KB total; `registry/` 393 MB, `r/` 298 MB, `js/` 32.7 MB, `assets/` 32.5 MB, `docs/` 21 MB; 6,711 files; largest file `registry/c/3d-marquee-grid.json` at 6.03 MB. — `du`, `find`
- Vercel config exists: `vercel.json` (`framework: null`, `outputDirectory: "."`, `cleanUrls`, security headers) and `.vercelignore` (`.github/`, `tools/`, `CODEX_HANDOFF.md`, `README.md`). No local `.vercel/` link directory. — file reads; `ls`
- Host assumptions baked into generated output: `tools/build-registry.js` has `HOST='https://intrx.vercel.app'` (component URLs, schema, llms lines); `index.html` canonical/og URL is `https://tanzir71.github.io/interaction/`; the README's "Live library" link is the github.io URL; the CLI "retries GitHub Pages if the Vercel mirror is unavailable". — file reads; [README](../../README.md)
- Git remotes/branches: `origin https://github.com/tanzir71/interaction.git`; remote branches `main` and `codex/intrx-foundations`; no `gh-pages` branch. — git
- "GitHub Actions is disabled at the owner's request… keep workflows and branch publishing disabled." "The site works under a path prefix and requires no backend." — [README](../../README.md)
- Hash routes (`#/…`) are used specifically to be "static-host friendly". — [H3](../../CODEX_HANDOFF_3.md) §4.1

### Inferences
- If a github.io site is live, it can only be showing whatever the workflow last deployed before Actions was disabled on 17 Nov (i.e. before most of the remediation and all 121 new components). Treat the public site as stale until verified.
- **Simplest no-Actions routes, in order of effort** (host limits below are from my general knowledge and must be confirmed against current provider docs):
  1. **Vercel Git integration or `vercel --prod`** — matches the baked-in `intrx.vercel.app` host and existing `vercel.json`. Risk: CLI upload size limits on the free tier versus a 779 MB tree; Git-integration deploys avoid the upload but still deploy the full repo minus `.vercelignore` (add `INTRX-handover/`, `*.md` ledgers, `research_notes/`, `reports/`).
  2. **Cloudflare Pages direct upload** — `node tools/prepare-site.js` then `wrangler pages deploy .artifacts/site`. 6,711 files and a 6 MB max file should fit typical free-tier limits (about 20,000 files, 25 MiB per file). No Git or CI needed.
  3. **Netlify CLI** — `netlify deploy --dir=.artifacts/site --prod`; same shape as (2).
  4. **GitHub Pages "Deploy from a branch" (main, root)** — zero tooling because `index.html` and `.nojekyll` are already at the root of `main`, but it contradicts the current "branch publishing must stay disabled" rule, may still rely on GitHub's internal Pages build pipeline, and a ~780 MB site is close to the commonly cited 1 GB Pages limit.
- Whichever host is chosen, pick one canonical origin and regenerate once: today `HOST` (vercel), canonical/og (github.io) and the README disagree.
- The $0 Actions budget may be less binding than assumed: standard GitHub-hosted runners are generally free for public repositories. This needs owner confirmation of repo visibility and is their call; it is not required for any route above.
- Size reduction worth considering before launch (not required): `registry/c` + `r/` are 691 MB because every item embeds base64 fonts and photos in its single-file HTML (median 534 KB). Linking shared assets or generating items on demand would shrink deploys and Git history by ~85%.

### Gaps
- Live status of `tanzir71.github.io/interaction` and `intrx.vercel.app`, repo visibility, and whether a Vercel project is linked via the dashboard were not checked (no web or `gh` calls were made).
- Provider limits (Vercel upload size, Cloudflare file count, GitHub Pages size) are unverified recollections.

---

## 8. How is a demo authored, and what does adding or restyling ONE component cost under (i) the current regime and (ii) a slimmed regime?

### Takeaway
Authoring is simple: one `INTRX.register({...})` object in a `js/demos.*.js` file, one metadata entry in `js/meta.stage.js`, one line in `js/registry-files.json`, then regenerate. Git history shows about 0.15–0.6 hours per new component in batch mode even under the heavy regime, but about 1–2 hours per single-component fix in the audit tail; a slimmed regime should bring both to roughly 5–20 minutes of agent time.

### Cited Findings
- Demo shape: "`INTRX.register({ id, title, cat, rootClass, tags, libs, desc, seen, hint, html, css, js, prompt })`… All classes are prefixed with `rootClass`." Stage metadata (`designSize`, `stage`, `trigger`, `controls`, `a11y`, `tier`, `thumb`, `thumbDesignSize`, `useCases`, `addedAt`) lives in `js/meta.stage.js` (317 KB). — [AGENTS](../../AGENTS.md); `js/meta.stage.js`
- Smallest real example: `js/demos.micro.btn-shimmer-sweep.js` is 4,778 bytes: ~10 lines of CSS using motion tokens (`var(--dur-fast)`, `var(--ease-pop)`), ~6 lines of JS using `ctx.onAction('toggle'|'replay')`, `ctx.reducedMotion`, `ctx.emit`, and a ~1,000-character prompt. — file read
- Runtime contract: demo JS runs as `new Function('root','stage','ctx', …)`; `ctx = { mode: 'thumb'|'full', theme, reducedMotion, scale, size, onAction, emit }`; the shell renders `controls` as dock buttons. — [H3](../../CODEX_HANDOFF_3.md) §3.3
- Steps to add a pattern: register in a `js/demos.*.js` file; add the file to `js/registry-files.json` (447 entries today); add metadata; run `node tools/build-demo-assets.js` if photos/fonts changed; `node tools/build-registry.js` (writes `registry/`, `r/`, both llms files, `js/export-data.js`); `node tools/build-posters.js http://127.0.0.1:4173 --ids=…`. — [README](../../README.md) "Add a pattern", "Verify and maintain"
- 495 of 520 demos use `thumb: 'hero'`, i.e. two compositions each (a native thumbnail and a full view). 437 demos have their own file; 83 live in 8 shared files (the largest, `js/demos.drams.sliders.js`, is 1.08 MB). — computed via `tools/load-registry.js` (read-only)
- Demo size: median 33,442 chars of html+css+js; p25 15,262; p90 105,217; prompt median ~1,567 chars. — same
- Time evidence under the current regime — git:
  - New components, by group (commit-to-commit): 6 Agent in 119 min; 5 Micro in 71; 7 Layout in 111; 4 Forms in 95; 4 Data/Nav in 88; 4 FX in 65; 10 Agent ext in 115; 10 Micro ext in 117; 10 Forms ext in 107; 8 FX ext in 70; 12 Layout ext in 106; 5 Gallery ext in 81; 5 Nav ext in 65; 6 Type ext in 91; 6 Data ext in 114; 4 Loader ext in 62; 3 Perspective ext in 55; 3 Scroll ext in 40; 2 Cursor ext in 70; 3 Play ext in 106; Piano in 25; 3 Skeuo ext in 28. Total 121 components in 30.0 h.
  - Each of those group commits also touched 7–12 tool files (the eight-suite verifier family) and between about 15 and 530 generated files.
  - Remediation of existing demos: 399 in ~186 elapsed hours; late DRAMS groups ran 40–60 min per component (e.g. four volume dials 15:18 → 18:28).
  - Tail fixes: 64 commits in 68.3 h (~64 min each), typically one small CSS/ARIA change plus verifier, evidence JSON and AGENTS paragraph.

### Inferences
- **(i) Current regime, per component (agent wall-clock):** new component ≈ 0.15–0.6 h in a batch of 3–12 (average 0.25 h); remediating/restyling an existing component to an exact reference ≈ 0.5–1 h; an isolated fix in audit mode ≈ 1–2 h. A deliberate restyle today would additionally break that component's group suite and fixtures, so the real cost under current rules is "restyle + rewrite or abandon its verifiers", effectively 2 h+ or a rule violation.
- **(ii) Slimmed regime (estimate):** new component ≈ 0.1–0.3 h (author object + metadata, static checks, one visual look at thumb and full); restyle of an existing component ≈ 0.05–0.25 h (edit CSS/tokens, regenerate, poster refresh). In batches of 20–40 with one browser sweep per batch, 100 restyles is about 1–2 agent-days plus human review of a contact sheet.
- The dominant per-component costs after slimming are (a) the dual thumb/full composition (495 demos have both) and (b) human visual review, not verification.
- Batch size matters: `build-registry` and posters are batch operations; do them once per batch to avoid ~1,600-file churn per commit.

### Gaps
- No direct measurement of agent tokens/cost per component; ranges are derived from commit intervals and are estimates.
- Effort for porting a specific third-party component depends on its framework (React + Tailwind + Motion ports need translation to vanilla); not estimated here.

---

## 9. Proposed shortest path: ordered work packages, estimates, gates to waive, and a replacement AGENTS.md outline

### Takeaway
Ship what exists first, then polish in public: one rules reset, one deployment, a scoped aesthetic pass and a licence-gated extension lane can make INTRX "ready" in roughly 5–8 agent-assisted working days, provided the owner formally waives the three unfinished numeric gates and retires the evidence regime.

### Cited Findings
- Functional baseline to build on: seven phase checks last recorded passing; 520 previews; 100 offline exports; zero stage-fit offenders; 4,160 a11y cases with zero boot/page errors; warm detail navigation 0/64 misses (max 185 ms). — [LLM_HANDOFF](../../docs/LLM_HANDOFF_2026-11-28.md); [a11y inventory JSON](../../docs/accessibility/catalog-initial-2026-11-26.json); [partial startup JSON](../../docs/performance/catalog-startup-2026-11-28-partial.json)
- Owner instructions currently in force that the plan must explicitly replace: commit and push directly, no PRs (15 Nov); Actions disabled, $0 budget (17 Nov); sparse-control fill exceptions (15 Nov); Halftone circle reconstruction approved (18 Nov); "No further review was requested for this publication" (28 Nov). — [AGENTS](../../AGENTS.md)
- The GPU Threads prototype reached ~60 fps at CPU4 and was rejected only on byte-exact alpha. — [AGENTS](../../AGENTS.md) threads-gpu paragraph
- A dependency seam (`libs`, lazy loader, exporter support) and a credit seam (`source`, `photo-credits.json`, `docs/license-credits.md`) already exist. — Q5 findings

### Inferences

**Ordered work packages (AI-agent-assisted; estimates are mine)**
| # | Package | Effort | Notes |
|---|---|---|---|
| 0 | **Rules reset.** Owner signs a one-page decision record (waivers below, licence policy, host). Tag current HEAD `v3-verified`. Replace AGENTS.md with the ~60-line version; move the old file to `docs/archive/AGENTS-2026-11.md`. Fix README and IMPLEMENTATION_PROGRESS "remaining work". | 0.5 day | Unblocks everything else; removes ~50k tokens from every session. |
| 1 | **Slim the checks.** Relax `verify-registry.js` (one-directional manifest, no fixed counts), stage-fit allowlist (reason only), run `verify-motion` in baseline mode. Remove group suites/fixtures from main (kept in the tag). | 0.5 day | Shrinks `tools/` from 361 MB to a few hundred KB. |
| 2 | **Deploy as-is.** Choose host, unify `HOST`/canonical, `prepare-site`, upload, smoke-test 10 routes on phone + desktop. | 0.5 day | Launching the current state gives real-network Lighthouse numbers and feedback. |
| 3 | **Aesthetic pass, scoped.** Shell + Home + first batch (12) of each of 26 categories + featured tiles (~300 max, prioritized); batches of 20–40; contact-sheet review. | 2–3 days | Detailed scope from the aesthetic researcher. |
| 4 | **Photo tooling + swaps.** Helper script for credit entries and hashes; swap photos per art direction. | 0.5 day | Keeps licence safeguard. |
| 5 | **Extension lane.** Add licence policy, `THIRD_PARTY_NOTICES.md`, extend the `libs` map (self-hosted pinned files), port the first 10–20 components. | 1–2 days | Scope from the library researcher. |
| 6 | **Targeted fixes.** Reactive Threads: ship the GPU renderer (visual equivalence) or poster-until-hover. One a11y pass on shell keyboard/focus. Lighthouse x3 per route on the deployed URL. | 0.5–1 day | Replaces three open-ended audits. |
| 7 | **npm publish.** Publish `@tanziro/intrx` and verify `npx @tanziro/intrx@latest add elastic-tabs` against the live registry. Do this right after package 2, because the site already shows that command. | 0.25 day | Requires the owner's npm credentials. |
| — | Total | **~5.5–8.5 days** | Versus an open-ended tail under the current regime. |

**Gates to formally waive or redefine (with reasons)**
1. *Cold first paint <300 ms on 4,160 cases* → "warm <300 ms (already met) and cold median <400 ms on 10 sampled routes on the deployed host". Reason: median miss is ~10 ms; original problem was 2–3 s.
2. *60 fps at 4x CPU for every component* → "no visible jank at 1x on a mid-range laptop for the native tile; heavy canvases may start as posters". Reason: one known offender; universal certification never completed.
3. *Stable Lighthouse ≥90 from local runs* → "median of 3 runs ≥85 mobile on the deployed URL for Home and one detail page". Reason: identical source scored 62–100 locally.
4. *Whole-catalog WCAG review of 15,269 incomplete nodes and all photographic/transient contrast* → "shell meets AA; components keep keyboard + reduced-motion + accessible names; known limitations published". Reason: flagged names/contrast already individually reviewed.
5. *Pixel/byte parity with v4 Figma tiles and with "original" controllers* → dropped. Reason: superseded by the owner's aesthetic upgrade decision.
6. *Evidence preservation (FROZEN V## archives, "retain every failed capture", zero tolerance)* → dropped; `.artifacts/` (34.6 GB) can be archived or deleted by the owner.
7. *"Never copy code", "no runtime dependencies"* → replaced by the licence-gated and per-demo-`libs` policies in Q5.

**Keep (non-negotiable even in the slim regime)**: zero-build static site; shell-owned stage/dock; `rootClass` prefixing; ≤3 controls; ≥11px thumbnail text; reduced-motion branch; keyboard support where interactive; no audio without a gesture; photo credits for every photo; no payments / Pro flag off until the owner launches; regenerate registry before committing.

**Replacement AGENTS.md (outline, ~60 lines)**
1. *What this is* (4 lines): zero-build static catalog; where the design reference and motion tokens live; link to the archived history.
2. *Repo map* (8 lines): `index.html`, `css/foundations.css`, `js/shell/`, `js/demos.*.js`, `js/meta.stage.js`, `js/registry-files.json`, `assets/`, generated `registry/` + `r/` + llms files, `packages/intrx`.
3. *Authoring a demo* (10 lines): the `INTRX.register` fields, metadata fields, `ctx` API, thumb vs full, class prefix, tokens.
4. *Hard rules* (10 lines): the "Keep" list above.
5. *Aesthetics* (5 lines): Figma v4 is reference not oracle; current art-direction doc; one visual contact-sheet review per batch.
6. *Third-party code and assets* (7 lines): allowed licences; attribution in source comment + `source` field + `THIRD_PARTY_NOTICES.md`; photos need a `photo-credits.json` entry; inspiration-only for unlicensed sites.
7. *Dependencies* (4 lines): shell stays dependency-free; per-demo `libs` only, pinned, lazy, self-hosted; `packages/intrx` may use npm.
8. *Verify* (7 lines): the four static commands per commit; two browser sweeps + unit tests per batch; release checklist (a11y sweep, Lighthouse x3 on deployed URL).
9. *Regenerate and commit* (3 lines): assets → registry → posters; commit generated output once per batch; push to `main`.
10. *Deploy* (3 lines): chosen host and command.
11. *Owner-only switches* (3 lines): Pro flag, payments, npm publish, Actions.

### Gaps
- Estimates assume an agent with a working local Playwright/Chrome and that the aesthetic and library researchers' scopes are close to the sizes assumed here (≤300 restyles, 10–20 ports).
- The owner has not yet stated which waivers they accept; the decision record in package 0 is a prerequisite, not a formality.
- Removing fixtures and group suites from `main` reduces the working tree but not `.git` (1.54 GB); history rewrite or a fresh repo would be a separate, optional decision.

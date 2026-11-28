# Publication handoff — 28 November 2026

The owner requested publication of all current work, documentation of known
findings and unfinished work, no further review in this task, and closure of
this task. A different agent will handle aesthetics and subsequent work.
**Publication is complete when these files are pushed; product acceptance
remains incomplete.** No new audit, benchmark or aesthetic review was run for
this publication.

## Start here

- Work order: [CODEX_HANDOFF_3.md](../CODEX_HANDOFF_3.md).
- Motion: [MOTION_SYSTEM.md](../MOTION_SYSTEM.md).
- Exact Figma tile lookup: [component manifest](../INTRX-handover/manifest/components.json).
- Latest startup data: [published partial inventory](performance/catalog-startup-2026-11-28-partial.json).
- Earlier investigations: [startup inventory and Library timeout](performance/catalog-startup-2026-11-26.json).

All 520 components, including the 30 new components and 91 extensions, are
implemented. The routed shell, registry, CLI/MCP package and Pro scaffolding
are implemented. This does not mean every aesthetic, accessibility or
performance requirement has passed. npm publication and payments are separate;
no npm publication or payment launch is claimed here.

The last pushed commit before this handoff was `8ff17cc3`. The only outstanding
code changes being published with this handoff are
[profile-shell-cold.js](../tools/profile-shell-cold.js) and
[verify-startup-profiler.js](../tools/verify-startup-profiler.js).
They change tooling, not application/demo source or generated catalog output.

## Pending acceptance

| Area | Known result | Work left |
| --- | --- | --- |
| Aesthetics | No independent final aesthetic sign-off. A briefly delegated review was stopped at the owner's request before any visual comparisons or findings. | Compare the actual shell, native tiles and full compositions with the v4 Figma references at desktop/mobile widths, both themes and relevant interaction states. Cover all 520 rather than inferring catalog approval from a few exemplars. |
| Detail startup | Latest inventory recorded only 128 of 4,160 planned measurements; 35 recorded cases exceeded the strict 300ms heading/stage target. | Diagnose slow paths and obtain a complete current-source inventory. Keep cold/warm results separate and retain every miss and first launch. |
| Profiling reliability | The latest run exited on `cdpSession.send: Protocol error (Tracing.end): Tracing failed`. | Investigate tracing/driver termination. Recover authoritative process state before attempting another run; do not restart solely because a polling handle or tool connection fails. |
| Library preparation | A historical real `Show more` click timed out waiting for button stability. Later probes did not reproduce it. | Diagnose the actual instability. The artificial fault test proves profiler behavior, not a fix for this product observation. |
| Mobile Lighthouse | Some historical runs passed, but other default mobile runs were below 90. | Establish stable current-source Performance >=90 for Home and Elastic Tabs, preserving default mobile/simulated settings and all failed observations. |
| CPU4 frame rate / compositor | Native Reactive Threads still fails the recorded 60fps target. Virtual-clock/model correctness and RAF counts are not compositor-presentation acceptance. | Optimize without changing the reference artwork, original source model or resource/lifecycle behavior; measure actual CPU4 rendering and presentation. |
| Accessibility | Broad scans and many targeted repairs exist, but incomplete/raw findings remain. | Finish photographic, non-text, inactive/transient-state contrast; native/normal-motion states; keyboard/focus clipping and assistive-technology usability. Do not interpret a scoped repair or axe pass as whole-catalog conformance. |

## Startup collection: exact stopping point

The latest app source was `8ff17cc3249846681721d6646653cb26f2d754ed`.
The profiler changes were uncommitted tooling changes during collection, and
their exact input hashes are included in the published partial inventory.

- Planned: 520 IDs x two widths x two shell themes x cold/warm = 4,160 cases,
  one repeat, CPU rate 1.
- Recorded: 128 measurements across 16 completely recorded components.
- Recorded timing misses: 35. Recorded case functional/page-JavaScript errors:
  zero. These statements cover recorded cases only.
- Fatal tracing error ended collection; it did not pass or complete the matrix.
  A further case may have begun without being recorded. Do not call 128 the
  total number of attempts.
- A tool-runtime replacement, shell initialization failure and broken tool
  connection were also observed around termination. Their causal relationship
  to the tracing error has not been established.
- The driver rehashed source/assets at termination and recorded stable inputs.
  The profiler did not reach its normal completion/source-stability flag.
- The preceding historical `a2d25186` inventory recorded 1,065 numeric
  measurements from 1,066 attempts, with 135 cold and six warm timing misses
  and one Library preparation timeout. It is a different source collection;
  do not splice its samples into the latest collection as a current-source pass.

The current profiler adds `--ids=all`, `--continue-on-error`, planned/completed
case accounting and failure-only DOM/screenshot diagnostics. Normal measurement
marks and the trusted caption/Back-scroll path remain the original method.
DOM/viewport/ancestor geometry, fonts, image readiness, active animations,
buffered layout shifts and a viewport screenshot are collected after a case
fails, with bounded capture waits. There is no new healthy-case geometry sampler.

`--continue-on-error` retains case failures and attempts later cases in fresh
contexts. **Functional failures still exit 1, even with `--record-only`.**
Fatal tracing, driver or source-guard failures still stop the run. `--record-only`
allows recording numeric timing misses; exit 0 in that mode is not a 300ms pass.
Inspect `completedMatrix`, `numericMeasurements`, `functionalFailures`,
`allRecordedPaintsUnder300`, the fatal error and every case result.

The added integration check historically passed 49 assertions: an isolated
local fault adapter animated only the desktop-dark warm `Show more` button.
Continuation mode retained that real Playwright stability failure and recorded
the other seven cases; default strict mode stopped after its second case.
Both child invocations correctly exited 1. This is an injected test failure,
not evidence of a new product failure. No new test was run for publication.

For a future authorized collection, use fresh mutable output and the current
public tool, for example:

```text
node tools/serve.js 4173
node tools/profile-shell-cold.js http://127.0.0.1:4173 --ids=all --repeats=1 --cpu=1 --record-only --continue-on-error --output=.artifacts/new-startup-run
```

Run the server in its own terminal. Check whether port 4173 is already served
before starting another instance. The last check from this task found it off;
this publication does not start a new server or audit. Browser tools use an
external Playwright/Chrome installation via the documented environment variables;
do not add site npm dependencies just to run a review.

## Performance work already explored

### Reactive Threads

- [Retained renderer observations](performance/threads-render-2026-11-25.json)
  include final native CPU4 observations of approximately **18.82 and 16.88fps**,
  below 60. The computer had other active projects; these are contended
  observations, not isolated benchmark guarantees. A deferred-only source-work
  change shipped, but no consistent end-to-end FPS benefit was established.
- [ImageBitmap/cache investigation](performance/threads-canvas-2026-11-25.json):
  tested exact models/pixels were preserved, but CPU4 measurements did not
  establish a benefit. No renderer candidate shipped from that experiment.
- [Canvas context investigation](performance/threads-context-2026-11-26.json):
  readback hints, cached Path2D clips and desynchronized Canvas did not meet
  the frame-rate target; the readback candidate measured slower.
- [GPU investigation](performance/threads-gpu-2026-11-26.json): an instanced
  prototype was fast in two observations but failed literal reference pixels;
  a hybrid still failed pixels and was slower. No candidate shipped.
- [Strip investigation](performance/threads-strips-2026-11-26.json): candidates
  passed independent model checks but failed the first literal native RGBA
  comparison. Later states/DPRs or frame-rate improvements were not certified.
- [Worker investigation](performance/threads-worker-2026-11-24.json): unaccepted;
  clipping altered visible edge pixels. Do not infer worker CPU throttling from
  a main-thread-only throttle or treat worker frame counts as presentation proof.

Keep the production renderer and existing correctness gates until a new approach
has actual evidence. Do not repeat rejected approaches without materially new
reasoning, or trade source/model/pixel correctness for an easier FPS result.
Use current public tools such as `tools/verify-threads-render.js` in fresh output;
never execute old private candidates or helpers from sealed archives.

### Shell startup / Lighthouse

- [Mobile Mono subset](performance/mobile-mono-2026-11-26.json) preserves the
  original glyph/layout requirements and saves payload bytes. It does not prove
  stable latency. Keep the original face and frozen `css/fonts.css` intact.
- [Header backdrop observations](performance/header-backdrop-2026-11-26.json):
  mobile Home uses `blur(0px)` at zero scroll and restores its original 16px
  filter on scroll. Other routes/desktop retain the original filter. Retained
  default mobile observations include Home **100/73/87** and Elastic Tabs
  **100/89/89**. Exact background-plane comparisons are a narrower scope than
  whole-header/whole-site paint or performance acceptance.
- [Lazy-view candidate](performance/catalog-startup-2026-11-26.json): rejected
  after a complete 96-sample A/B/B/A. It reduced view-script transfers but warm
  navigation regressed and added timing failures. Production index/main were
  left unchanged. Do not ship that candidate based on byte savings alone.
- The interrupted Reveal check was improved by moving instrumentation before
  Home and sampling inside the actual observer callback. The current strict
  checker passed three complete 505-check runs. The earlier failed log did not
  retain its actual retarget value, so its exact cause is still not proved.
  See [the precise scope and results](verification/reveal-retarget-2026-11-27.json).

## Accessibility and aesthetics evidence

[The initial full-view inventory](accessibility/catalog-initial-2026-11-26.json)
covered all 520 components across 4,160 width/Stage-theme/shell-theme cases in
reduced motion, with no recorded boot/page errors. Its raw violations and
incomplete results remain review evidence, not acceptance. It does not cover
every normal-motion state, native tile, real-touch path or screen-reader task.

Targeted palette, naming, semantics, native-input and export reports live under
`docs/accessibility/`. In particular:

- [Contrast review methodology](accessibility/contrast-review.md): a background
  bound alone is insufficient; review actual foreground hierarchy, overlays,
  filters, blending and group opacity. Decorative-text decisions are specific
  reviewed decisions, not permission to hide essential text from checks.
- [Parallax full labels](accessibility/parallax-labels-2026-11-26.json): scoped
  BACK/FRONT contrast repair; native art/controller remain unchanged.
- [Rotating Gallery captions](accessibility/rotating-captions-2026-11-27.json):
  seven selected full captions have solid readable backings. Dimmed inactive
  and transient captions remain outside that sign-off. Do not treat this as
  photographic contrast acceptance for every card/state or all components.
- Native tile art must match v4. Sparse controls retain their exact Figma sizes
  through the documented low-fill exceptions; those exceptions do not waive
  overflow, horizontal scroll or the 11px thumbnail text floor.

## Verification and evidence preservation

Before the pending profiler additions, the last published phase recorded all
seven required local phase checks passing, 520 previews, 100 offline exports,
zero stage-fit offenders, 163 existing low-fill exceptions and nine package
tests. Its three complete Scroll runs passed 505 checks each. These are
historical scoped results, not newly rerun publication results and not final
aesthetic/performance/accessibility acceptance. The pending profiler additions
have the separate 49-check integration result described above.

Raw measurements, traces, screenshots and private helpers remain local under
`.artifacts/`, which is intentionally gitignored. The published partial JSON
contains every recorded startup measurement so a fresh clone has useful data.
It also records raw report/trace hashes and archive references; raw local files
will not exist on a fresh clone. Earlier private directories with `FROZEN.json`
are read/copy only: never execute/edit their helpers/candidates/inputs, nor copy
their code elsewhere to execute. Use current public tools and fresh mutable
directories. Preserve slow/failed observations and distinguish reference/control
data, explicit diagnostic modes and actual acceptance results.

GitHub Actions stays disabled, with no workflow launch/re-enable as part of
publication. Preserve the owner's account-wide $0 Actions budget and hard stop.
GitHub Pages branch publishing must stay disabled. This task publishes repository
source by commit/push; it does not run a Pages workflow, deploy a website or
publish the npm package. Follow the repository's normal local verification rules
for future development; the owner's no-further-review instruction applies to
this publication/handoff task.

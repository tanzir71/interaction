#!/usr/bin/env node
/* verify-motion.js: checks every registered demo against MOTION_SYSTEM.md.
   Dependency-free (Node ≥ 18). Run from the repo root:

     node tools/verify-motion.js                  # fail only on regressions vs the baseline
     node tools/verify-motion.js --strict         # fail on any violation (the goal after §5b)
     node tools/verify-motion.js --report         # print every offender, never fail
     node tools/verify-motion.js --update-baseline
     node tools/verify-motion.js --root ../interaction

   Rules (MOTION_SYSTEM.md §2 and the curve replacement table):
     curve     every cubic-bezier() must be one of the named system curves
     duration  every UI duration between 40ms and 999ms must be on the scale
     reduced   every demo needs a prefers-reduced-motion path (CSS or JS)
     linear    no `linear` easing on UI transitions (loops and scroll-bound values may use it)

   The baseline (tools/motion-baseline.json) records the violations that existed on
   15 Nov 2026, so CI can run from Phase 1 while §5b remediation proceeds bucket by bucket.
   Fixing a demo removes it from the baseline on the next --update-baseline. */
'use strict';
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');

const args = process.argv.slice(2);
const flag = (f) => args.includes(f);
const rootArg = args.indexOf('--root');
const ROOT = path.resolve(rootArg > -1 ? args[rootArg + 1] : '.');
const BASELINE = path.join(ROOT, 'tools', 'motion-baseline.json');

// Named curves from MOTION_SYSTEM.md (normalised: no spaces, leading zeros dropped).
const SYS_CURVES = new Set([
  'cubic-bezier(.22,1,.36,1)',   // --ease-out
  'cubic-bezier(.4,0,.2,1)',     // --ease-close
  'cubic-bezier(.34,1.36,.64,1)',// --ease-pop
  'cubic-bezier(.34,1.25,.64,1)',// --ease-settle
  'cubic-bezier(.34,1.35,.64,1)',// --ease-bounce
  'cubic-bezier(.34,1.96,.64,1)',// --ease-pop-strong
  'cubic-bezier(.35,-.02,.43,1)',// --ease-step
]);
// Durations on the scale, plus the derived values the recipes use (stagger offsets, exits at ~60%).
const SYS_DUR = new Set([40, 50, 80, 100, 130, 150, 160, 180, 200, 250, 260, 280, 300, 350, 400, 455, 500, 600, 740]);
const norm = (s) => s.replace(/\s/g, '').replace(/(^|[,(])0\./g, '$1.');

function loadDemos() {
  const html = fs.readFileSync(path.join(ROOT, 'index.html'), 'utf8');
  const srcs = [...html.matchAll(/<script src="(js\/demos[^"]+)"/g)].map((m) => m[1]);
  const ctx = { console };
  ctx.window = ctx;
  ctx.INTRX = { demos: [], register(d) { this.demos.push(d); }, fontFaces: {}, resolveAssets: (s) => s };
  vm.createContext(ctx);
  for (const s of srcs) vm.runInContext(fs.readFileSync(path.join(ROOT, s), 'utf8'), ctx, { filename: s });
  return ctx.INTRX.demos;
}

function audit(d) {
  const src = `${d.css || ''}\n${d.js || ''}`;
  const out = [];
  const curves = [...new Set((src.match(/cubic-bezier\([^)]*\)/g) || []).map(norm))];
  for (const c of curves) if (!SYS_CURVES.has(c)) out.push(`curve ${c}`);
  const durs = [...new Set((src.match(/\b\d*\.?\d+m?s\b/g) || [])
    .filter((x) => /\d(ms|s)$/.test(x))
    .map((x) => (x.endsWith('ms') ? parseFloat(x) : Math.round(parseFloat(x) * 1000)))
    .filter((v) => v >= 40 && v < 1000))];
  for (const v of durs) if (!SYS_DUR.has(v)) out.push(`duration ${v}ms`);
  if (!/prefers-reduced-motion|reducedMotion|matchMedia\(['"]\(prefers/.test(src)) out.push('reduced no reduced-motion path');
  if (/transition[^;{}]*\blinear\b/.test(src)) out.push('linear linear easing on a UI transition');
  return out;
}

const demos = loadDemos();
const now = {};
for (const d of demos) { const v = audit(d); if (v.length) now[d.id] = v; }
const ids = Object.keys(now).sort();
const count = (k) => ids.filter((id) => now[id].some((v) => v.startsWith(k))).length;
console.log(`verify-motion: ${demos.length} demos, ${ids.length} with violations ` +
  `(curve ${count('curve')}, duration ${count('duration')}, reduced-motion ${count('reduced')}, linear ${count('linear')})`);

if (flag('--update-baseline')) {
  fs.mkdirSync(path.dirname(BASELINE), { recursive: true });
  fs.writeFileSync(BASELINE, JSON.stringify({ updated: new Date().toISOString().slice(0, 10), violations: now }, null, 1) + '\n');
  console.log(`baseline written: ${path.relative(ROOT, BASELINE)}`);
  process.exit(0);
}
if (flag('--report')) {
  for (const id of ids) console.log(`  ${id}: ${now[id].join('; ')}`);
  process.exit(0);
}
if (flag('--strict')) {
  for (const id of ids) console.log(`  ✗ ${id}: ${now[id].join('; ')}`);
  process.exit(ids.length ? 1 : 0);
}
let base = {};
try { base = JSON.parse(fs.readFileSync(BASELINE, 'utf8')).violations || {}; } catch { console.log('no baseline found: every violation counts as new (run --update-baseline once)'); }
const regressions = [];
for (const id of ids) {
  const known = new Set(base[id] || []);
  const fresh = now[id].filter((v) => !known.has(v));
  if (fresh.length) regressions.push(`${id}: ${fresh.join('; ')}`);
}
const fixed = Object.keys(base).filter((id) => !now[id]);
if (fixed.length) console.log(`fixed since baseline: ${fixed.length} (run --update-baseline to lock them in)`);
if (regressions.length) {
  console.log(`✗ ${regressions.length} demo(s) added motion violations:`);
  for (const r of regressions) console.log(`  ${r}`);
  process.exit(1);
}
console.log('✓ no new motion violations');

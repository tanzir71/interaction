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

const args = process.argv.slice(2);
const flag = (f) => args.includes(f);
const rootArg = args.indexOf('--root');
const ROOT = path.resolve(rootArg > -1 ? args[rootArg + 1] : '.');
const BASELINE = path.join(ROOT, 'tools', 'motion-baseline.json');

const {audit}=require('./motion-audit');
const modelPolicy=JSON.parse(fs.readFileSync(path.join(ROOT,'tools','motion-models.json'),'utf8')).models;
function loadDemos(){return require('./load-registry')(ROOT).demos;}

const demos = loadDemos();
for(const entry of modelPolicy)if(!demos.some(d=>d.id===entry.id))throw Error('Unknown motion model '+entry.id);
const now = {};
for (const d of demos) { const v = audit(d,modelPolicy); if (v.length) now[d.id] = v; }
const ids = Object.keys(now).sort();
const count = (k) => ids.filter((id) => now[id].some((v) => v.startsWith(k))).length;
console.log(`verify-motion: ${demos.length} demos, ${ids.length} with violations ` +
  `(curve ${count('curve')}, duration ${count('duration')}, reduced-motion ${count('reduced')}, linear ${count('linear')})`);
console.log(`  ${modelPolicy.length} immutable virtual models (${modelPolicy.reduce((n,r)=>n+r.occurrences,0)} function bodies); complete CSS and visible renderer code checked`);

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

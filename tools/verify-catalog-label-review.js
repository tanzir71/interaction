/* Reviewed initial labels: actual Chrome AX, unchanged axe rule, deliberate negative controls. */
const fs = require('node:fs'), path = require('node:path'), crypto = require('node:crypto'), assert = require('node:assert/strict');
const {mount, actualName, chromium, R} = require('./verification/primary-names-harness');
const fixtureFile = 'tools/fixtures/catalog-label-review.json', fixture = JSON.parse(fs.readFileSync(fixtureFile));
const option = n => process.argv.find(v => v.startsWith('--' + n + '='))?.slice(n.length + 3);
const axeFile = option('axe'); assert(axeFile && fs.existsSync(axeFile), 'Provide external --axe=/path/to/axe.min.js');
const out = path.resolve(option('output') || '.artifacts/catalog-label-review', new Date().toISOString().replace(/[:.]/g, '-'));
assert(!fs.existsSync(out)); fs.mkdirSync(out, {recursive: true});
const hash = f => crypto.createHash('sha256').update(fs.readFileSync(f)).digest('hex');
const inputs = Object.fromEntries([...new Set([__filename, fixtureFile, 'tools/verification/primary-names-harness.js', 'tools/load-registry.js', 'css/foundations.css', 'css/fonts.css', 'js/demo-runtime.js', 'js/shell/stage.js', 'js/meta.stage.js', 'registry/index.json', 'assets/demo-assets.json', ...fixture.cases.map(r => R.filesById[r.id])])].map(f => [f, hash(f)]));
const normalize = s => s.normalize('NFKC').toLowerCase().replace(/[\p{P}\p{S}\s]+/gu, ' ').trim();
const contains = (name, label, literal) => literal ? name.toLowerCase().includes(label.toLowerCase()) : (' ' + normalize(name) + ' ').includes(' ' + normalize(label) + ' ');
const report = {started: new Date().toISOString(), criterion: fixture.criterion, scope: 'Initial full-view manual-label decisions, regression-checked at both widths, Stage themes and motion settings. The original axe label rule is unmodified and all of its results are retained. This does not certify transition-state names, speech recognition, native thumbnails, contrast or catalog-wide WCAG conformance.', inputs, axe: {file: axeFile, sha256: hash(axeFile)}, cases: []};
let checks = 0; const check = (v, m) => {checks++; assert(v, m);};
const save = () => fs.writeFileSync(out + '/report.json', JSON.stringify({...report, checks}, null, 2) + '\n'); save();
(async () => {
  const browser = await chromium.launch({executablePath: process.env.INTRX_CHROME_EXECUTABLE}); report.browser = browser.version();
  try {
    for (const width of [1440, 390]) for (const theme of ['dark', 'light']) for (const reduced of [false, true]) for (const rule of fixture.cases) {
      const spec = {id: rule.id, width, theme, reduced}, rig = await mount(browser, R.demos.find(d => d.id === rule.id), {...spec, mode: 'full'});
      report.active = spec; save();
      try {
        await rig.page.evaluate(() => document.querySelector('.stage')._runtime.suspend());
        const selector = rule.selector.split(',').map(s => s + ':not([inert], [inert] *):visible').join(',');
        const controls = rig.page.locator(selector), count = await controls.count();
        check(count === (rule.perControl ? rule.names.length : 1), 'Reviewed control count ' + rule.id);
        const observations = [];
        for (let i = 0; i < count; i++) {
          const control = controls.nth(i), probe = 'catalog-label-' + i;
          await control.evaluate((n, probe) => n.dataset.catalogLabelProbe = probe, probe);
          const target = '[data-catalog-label-probe="' + probe + '"]', name = await actualName(rig.page, target), text = await control.innerText();
          check(!!name?.trim(), 'Nonempty actual AX name ' + rule.id);
          const names = rule.perControl ? [rule.names[i]] : rule.names;
          for (const label of names) check(contains(name, label, rule.literal), 'Reviewed words in actual AX name ' + JSON.stringify({spec, i, name, label}));
          const labels = rule.labelsPerControl ? [rule.labelsPerControl[i]] : rule.labels || (rule.perControl && !['gravity-drop-icons', 'snake-in-grid'].includes(rule.id) ? names : []);
          for (const label of labels) {
            check(contains(text, label, rule.literal), 'Reviewed label remains in rendered control text ' + JSON.stringify({spec, i, text, label}));
            check(contains(name, label, rule.literal), 'Rendered identifying words in actual AX name ' + rule.id);
          }
          observations.push({index: i, name, text, labels});
        }
        await rig.page.addScriptTag({path: axeFile});
        const rawAxe = await rig.page.evaluate(async () => {
          const r = await axe.run(document.querySelector('.stage'), {runOnly: {type: 'rule', values: ['label-content-name-mismatch']}});
          return {violations: r.violations, incomplete: r.incomplete, passes: r.passes, inapplicable: r.inapplicable};
        });
        const first = controls.first(), old = await first.getAttribute('aria-label'), firstTarget = '[data-catalog-label-probe="catalog-label-0"]';
        await first.evaluate(n => n.setAttribute('aria-label', 'Unrelated control'));
        const wrong = await actualName(rig.page, firstTarget);
        check(!contains(wrong, rule.names[0], rule.literal), 'Missing reviewed label is rejected using actual AX ' + rule.id);
        await first.evaluate((n, old) => old === null ? n.removeAttribute('aria-label') : n.setAttribute('aria-label', old), old);
        check((await actualName(rig.page, firstTarget)) === observations[0].name, 'Exact AX name restored ' + rule.id);
        await controls.evaluateAll(ns => ns.forEach(n => delete n.dataset.catalogLabelProbe));
        check(!rig.errors.length, 'No page errors ' + rule.id);
        report.cases.push({...spec, reason: rule.reason, observations, negativeControl: {name: wrong, rejected: true}, rawAxe}); save();
        console.log('PASS', JSON.stringify(spec), observations.length, 'actual names');
      } finally { await rig.close(); }
    }
    for (const [f, h] of Object.entries(inputs)) check(hash(f) === h, 'Stable source ' + f);
    delete report.active; report.finished = new Date().toISOString(); report.sourceStable = true;
    report.summary = {cases: report.cases.length, observations: report.cases.reduce((n, r) => n + r.observations.length, 0), negativeControls: report.cases.length, rawViolations: report.cases.reduce((n, r) => n + r.rawAxe.violations.length, 0), rawIncompleteNodes: report.cases.reduce((n, r) => n + r.rawAxe.incomplete.reduce((n, x) => n + x.nodes.length, 0), 0)};
    save(); console.log('PASS', checks, 'checks', JSON.stringify(report.summary));
  } finally { await browser.close(); }
})().catch(e => {report.error = e.stack; save(); console.error(e.stack); process.exitCode = 1;});

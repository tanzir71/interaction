/* Stage-fit audit: boots every tile and measures how its demo fits the stage.
   Produces the numbers in CODEX_HANDOFF_3.md §1 and is the acceptance gate for §5.

   npx serve . -l 4173   (or python -m http.server 4173)
   node tools/audit-stage-fit.js http://127.0.0.1:4173 [browser-CDP-url]

   PLAYWRIGHT_MODULE may point to an existing Playwright installation.
   Writes .artifacts/stage-fit.json and prints a summary. Exit code 1 when any
   gate fails, so CI can run it once the remediation in §5 is complete. */
const fs = require('node:fs');
const { chromium } = require(process.env.PLAYWRIGHT_MODULE || 'playwright');

const GATES = {
  overflow: 0,        // tiles with visible leaves outside the stage (marquees opt out via stage.overflow:'intentional')
  hscroll: 0,         // tiles whose root scrolls horizontally
  minFontPx: 11,      // smallest rendered text inside a thumbnail, after zoom
  minFill: 0.12,      // content bbox area / stage area (bleed stages are exempt)
};

(async () => {
  const url = process.argv[2] || 'http://127.0.0.1:4173';
  const browser = process.argv[3]
    ? await chromium.connectOverCDP(process.argv[3])
    : await chromium.launch({ headless: true, executablePath: process.env.CHROME_PATH || undefined, args: ['--enable-unsafe-swiftshader'] });
  const page = await (await browser.newContext({ viewport: { width: 1440, height: 900 } })).newPage();
  await page.goto(url, { waitUntil: 'networkidle' });

  const results = await page.evaluate(async () => {
    const out = [];
    const tiles = [...document.querySelectorAll('[data-intrx-tile], .tile')];
    for (const tile of tiles) {
      tile.scrollIntoView({ block: 'center', behavior: 'instant' });
      await new Promise(r => setTimeout(r, 140));
      const stage = tile.querySelector('.demo-stage, [data-stage]');
      const root = stage && stage.firstElementChild;
      const id = tile.id || tile.dataset.id;
      const demo = (window.INTRX && INTRX.demos.find(d => d.id === id)) || {};
      const sr = stage ? stage.getBoundingClientRect() : null;
      const r = { id, stage: sr && [Math.round(sr.width), Math.round(sr.height)] };
      if (!root) { r.empty = true; out.push(r); continue; }
      r.failed = /failed to boot/.test(stage.textContent);
      const zoom = parseFloat(getComputedStyle(root).zoom) || 1;
      let top = 1e9, left = 1e9, right = -1e9, bottom = -1e9, overflow = 0, leaves = 0, minFont = 99, n = 0;
      for (const el of root.querySelectorAll('*')) {
        if (n++ > 1500) break;
        const cs = getComputedStyle(el);
        if (cs.display === 'none' || cs.visibility === 'hidden' || +cs.opacity === 0) continue;
        if (el.children.length && !/^(CANVAS|SVG|IMG|VIDEO)$/i.test(el.tagName)) continue;
        const b = el.getBoundingClientRect();
        if (b.width < 1 || b.height < 1) continue;
        leaves++;
        top = Math.min(top, b.top); left = Math.min(left, b.left); right = Math.max(right, b.right); bottom = Math.max(bottom, b.bottom);
        if (b.right > sr.right + 2 || b.left < sr.left - 2 || b.bottom > sr.bottom + 2 || b.top < sr.top - 2) overflow++;
        if (el.textContent.trim().length > 1) minFont = Math.min(minFont, parseFloat(cs.fontSize) * zoom);
      }
      const iw = Math.max(0, Math.min(right, sr.right) - Math.max(left, sr.left));
      const ih = Math.max(0, Math.min(bottom, sr.bottom) - Math.max(top, sr.top));
      Object.assign(r, {
        zoom: +zoom.toFixed(3),
        leaves, overflow,
        minFont: +minFont.toFixed(1),
        fill: leaves ? +(iw * ih / (sr.width * sr.height)).toFixed(3) : 0,
        hscroll: root.scrollWidth > root.clientWidth + 4,
        stageMeta: demo.stage || null,
        designSize: demo.designSize || null,
      });
      out.push(r);
    }
    return out;
  });

  const exemptOverflow = r => r.stageMeta && r.stageMeta.overflow === 'intentional';
  const exemptFill = r => r.stageMeta && (r.stageMeta.size === 'bleed' || r.designSize === 'bleed');
  const summary = {
    total: results.length,
    failed: results.filter(r => r.failed).map(r => r.id),
    missingDesignSize: results.filter(r => !r.designSize).length,
    overflow: results.filter(r => r.overflow > 0 && !exemptOverflow(r)).map(r => r.id),
    hscroll: results.filter(r => r.hscroll && !exemptOverflow(r)).map(r => r.id),
    tinyText: results.filter(r => r.minFont < GATES.minFontPx).map(r => r.id + ':' + r.minFont),
    lowFill: results.filter(r => r.fill < GATES.minFill && !exemptFill(r)).map(r => r.id + ':' + r.fill),
  };
  fs.mkdirSync('.artifacts', { recursive: true });
  fs.writeFileSync('.artifacts/stage-fit.json', JSON.stringify({ gates: GATES, summary, results }, null, 2));
  console.log(JSON.stringify({
    total: summary.total, failed: summary.failed.length, missingDesignSize: summary.missingDesignSize,
    overflow: summary.overflow.length, hscroll: summary.hscroll.length,
    tinyText: summary.tinyText.length, lowFill: summary.lowFill.length,
  }, null, 2));
  await browser.close();
  const pass = !summary.failed.length && summary.overflow.length <= GATES.overflow && summary.hscroll.length <= GATES.hscroll && !summary.tinyText.length && !summary.lowFill.length;
  process.exit(pass ? 0 : 1);
})().catch(error => { console.error(error); process.exit(1); });

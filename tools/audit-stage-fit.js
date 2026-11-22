/* Stage-fit audit: boots every tile and measures how its demo fits the stage.
   Produces the numbers in CODEX_HANDOFF_3.md §1 and is the acceptance gate for §5.

   npx serve . -l 4173   (or python -m http.server 4173)
   node tools/audit-stage-fit.js http://127.0.0.1:4173 [browser-CDP-url]

   PLAYWRIGHT_MODULE may point to an existing Playwright installation.
   Writes .artifacts/stage-fit.json and prints a summary. Exit code 1 when any
   gate fails, so CI can run it once the remediation in §5 is complete. */
const fs = require('node:fs');
const { chromium } = require(process.env.PLAYWRIGHT_MODULE || 'playwright');
const stageFitBounds=require('./stage-fit-bounds');
const paintedStageSurface=require('./stage-fit-surface');
const stageFitInk=require('./stage-fit-ink');
const lowFillExceptions=JSON.parse(fs.readFileSync(require('node:path').join(__dirname,'stage-fit-allowlist.json'),'utf8')).lowFill;

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
  await page.goto(url.replace(/\/#.*$/,'').replace(/\/$/,'')+'/#/library', { waitUntil: 'networkidle' });
  await page.addScriptTag({content:'window.INTRXStageFitBounds='+stageFitBounds.toString()+';'});
  await page.addScriptTag({content:'window.INTRXPaintedStageSurface='+paintedStageSurface.toString()+';'});
  await page.addScriptTag({content:'window.INTRXStageFitInk='+stageFitInk.toString()+';'});
  while(await page.locator('#show-more').isVisible())await page.locator('#show-more').click();

  const results = await page.evaluate(async exceptions => {
    const out = [];
    const tiles = [...document.querySelectorAll('[data-intrx-tile], .tile')];
    for (const tile of tiles) {
      tile.scrollIntoView({ block: 'center', behavior: 'instant' });
      const stage = tile.querySelector('.demo-stage, [data-stage]');
      // Wait for the observer-driven boot, rather than assuming a busy browser
      // delivers intersection and resize callbacks within one fixed sleep.
      for (let i=0; i<150 && stage && !stage._root && !stage.dataset.bootError; i++) await new Promise(r=>setTimeout(r,20));
      const id = tile.dataset.id || tile.id.replace(/^tile-/, '');
      // Adjacent tiles can occupy LiveTiles' active slots. Load the audited
      // tile explicitly before taking its metadata and initial-pose snapshot.
      const demo = INTRX.demos.find(d => d.id === id) || await INTRX.loadDemo(id);
      // Other visible tiles may boot while an earlier dependency is loading.
      // Restart this preview so the measured pose does not depend on that
      // delay or on how many other tiles preceded it. Motion verifiers cover
      // complete loops; this audit checks the component's initial composition.
      if (stage && demo.id) INTRX.mountStage(demo,stage,'thumb');
      await new Promise(r => setTimeout(r, 140));
      const root = stage && (stage._root || stage.firstElementChild);
      const sr = stage ? stage.getBoundingClientRect() : null;
      const r = { id, stage: sr && [Math.round(sr.width), Math.round(sr.height)], stageMeta:demo.stage || null, designSize:demo.designSize || null, renderSize:demo.thumb==='hero'&&demo.thumbDesignSize!==undefined?demo.thumbDesignSize:demo.designSize||null };
      if (!root) { r.empty = true; r.failed = true; out.push(r); continue; }
      r.failed = stage.dataset.bootError === 'true' || /failed to boot/i.test(stage.textContent);
      const zoom = parseFloat(getComputedStyle(root).zoom) || 1;
      const exception=exceptions[id];
      if(exception){
        const hero=root.querySelector(exception.selector),bounds=hero?.getBoundingClientRect();
        const actual=bounds?[bounds.width/zoom,bounds.height/zoom]:null;
        r.lowFillException={...exception,actual,valid:!!actual&&actual.every((value,i)=>Math.abs(value-exception.designSize[i])<=1)};
      }
      let top = 1e9, left = 1e9, right = -1e9, bottom = -1e9, overflow = 0, leaves = 0, painted = 0, minFont = 99, n = 0;
      for (const el of root.querySelectorAll('*')) {
        if (n++ > 1500) break;
        const cs = getComputedStyle(el);
        if (cs.display === 'none' || cs.visibility === 'hidden' || +cs.opacity === 0) continue;
        const leaf=!el.children.length||/^(CANVAS|SVG|IMG|VIDEO|INPUT|TEXTAREA|SELECT)$/i.test(el.tagName);
        // A nested control frame paints its own background/border. Ignoring it
        // undercounts fill for interfaces whose tiny children sit inside it.
        // Transparent wrappers and the fitted root never supply this area.
        if (!leaf&&!window.INTRXPaintedStageSurface(cs)) continue;
        // Honor clipping by a native photo frame, scroll viewport or reveal
        // mask. The fitted root and shell stage are deliberately excluded.
        const b = window.INTRXStageFitBounds(el,root);
        if (!b) continue;
        if (b.width < 1 || b.height < 1) continue;
        // Invisible leaf hit targets must not enlarge the painted composition.
        // Their original bounds still participate in overflow and text checks.
        if(window.INTRXStageFitInk(el,cs,window.INTRXPaintedStageSurface)){
          painted++;
          top = Math.min(top, b.top); left = Math.min(left, b.left); right = Math.max(right, b.right); bottom = Math.max(bottom, b.bottom);
        }
        // Keep overflow and typography gates on the original leaf geometry.
        if (!leaf) continue;
        leaves++;
        if (b.right > sr.right + 2 || b.left < sr.left - 2 || b.bottom > sr.bottom + 2 || b.top < sr.top - 2) overflow++;
        const nativeText=/^(INPUT|TEXTAREA|SELECT)$/i.test(el.tagName)&&!['range','checkbox','radio','color','file','hidden'].includes(el.type)&&(el.value||el.placeholder);
        // Split-letter menus and single-digit readouts still contain text.
        if ((el.textContent.trim().length > 0 || nativeText) && cs.color!=='rgba(0, 0, 0, 0)') minFont = Math.min(minFont, parseFloat(cs.fontSize) * zoom);
      }
      const iw = Math.max(0, Math.min(right, sr.right) - Math.max(left, sr.left));
      const ih = Math.max(0, Math.min(bottom, sr.bottom) - Math.max(top, sr.top));
      Object.assign(r, {
        zoom: +zoom.toFixed(3),
        leaves, overflow,
        minFont: +minFont.toFixed(1),
        fill: painted ? +(iw * ih / (sr.width * sr.height)).toFixed(3) : 0,
        hscroll: root.scrollWidth > root.clientWidth + 4,
        stageMeta: demo.stage || null,
        designSize: demo.designSize || null,
      });
      out.push(r);
    }
    return out;
  },lowFillExceptions);

  const exemptOverflow = r => r.stageMeta && r.stageMeta.overflow === 'intentional';
  const exemptFill = r => (r.stageMeta && (r.stageMeta.size === 'bleed' || r.designSize === 'bleed')) || r.lowFillException?.valid;
  const summary = {
    total: results.length,
    failed: results.filter(r => r.failed).map(r => r.id),
    missingDesignSize: results.filter(r => !r.designSize).length,
    overflow: results.filter(r => r.overflow > 0 && !exemptOverflow(r)).map(r => r.id),
    hscroll: results.filter(r => r.hscroll && !exemptOverflow(r)).map(r => r.id),
    tinyText: results.filter(r => r.minFont < GATES.minFontPx).map(r => r.id + ':' + r.minFont),
    lowFill: results.filter(r => r.fill < GATES.minFill && !exemptFill(r)).map(r => r.id + ':' + r.fill),
    lowFillExceptions: results.filter(r=>r.lowFillException?.valid).map(r=>r.id),
    invalidExceptions: results.filter(r=>r.lowFillException&&!r.lowFillException.valid).map(r=>r.id),
  };
  fs.mkdirSync('.artifacts', { recursive: true });
  fs.writeFileSync('.artifacts/stage-fit.json', JSON.stringify({ gates: GATES, summary, results }, null, 2));
  console.log(JSON.stringify({
    total: summary.total, failed: summary.failed.length, missingDesignSize: summary.missingDesignSize,
    overflow: summary.overflow.length, hscroll: summary.hscroll.length,
    tinyText: summary.tinyText.length, lowFill: summary.lowFill.length,
    lowFillExceptions:summary.lowFillExceptions.length,invalidExceptions:summary.invalidExceptions,
  }, null, 2));
  await browser.close();
  const pass = !summary.failed.length && !summary.missingDesignSize && summary.overflow.length <= GATES.overflow && summary.hscroll.length <= GATES.hscroll && !summary.tinyText.length && !summary.lowFill.length && !summary.invalidExceptions.length;
  process.exit(pass ? 0 : 1);
})().catch(error => { console.error(error); process.exit(1); });

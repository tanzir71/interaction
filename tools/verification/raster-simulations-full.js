const H=require('./raster-simulations-harness'),{fs,crypto,assert,dir,hash,A}=H,open=async options=>{const h=await H.openFull(options);await h.page.evaluate(async ids=>{for(const id of ids)await INTRX.loadDemo(id);return true;},A.configs.map(c=>c.id));return h;};
let checks = 0; const results = [];
function same(actual, expected, label) { checks++; assert.deepEqual(actual, expected, label); }
function ok(value, label) { checks++; assert(value, label); }
async function geometry(h) {
  return h.page.evaluate(() => {
    const stage = document.querySelector('#sim-test'), root = stage._root, bounds = root.getBoundingClientRect(), scale = stage._ctx.scale;
    const errors = [], texts = [];
    for (const node of root.querySelectorAll('*')) {
      if (node.closest('[class$="-viewport"],[class$="-sr"],[class$="-status"]')) continue;
      if (!node.childNodes.length || ![...node.childNodes].some(child => child.nodeType === 3 && child.textContent.trim())) continue;
      const rect = node.getBoundingClientRect(), style = getComputedStyle(node);
      if (!rect.width || !rect.height) continue;
      const optical = parseFloat(style.fontSize) * scale;
      texts.push({ text: node.textContent, optical });
      if (optical < 10.99) errors.push({ type: 'tiny', text: node.textContent, optical });
      const range = document.createRange(); range.selectNodeContents(node); const ink = range.getBoundingClientRect();
      if (ink.left < bounds.left - 1 || ink.right > bounds.right + 1 || ink.top < bounds.top - 1 || ink.bottom > bounds.bottom + 1)
        errors.push({ type: 'overflow', text: node.textContent, bounds: { left: bounds.left, top: bounds.top, right: bounds.right, bottom: bounds.bottom }, ink: { left: ink.left, top: ink.top, right: ink.right, bottom: ink.bottom } });
    }
    const state = root.__SimInspect(), logicalFont = Number(state.presentation.font.match(/([\d.]+)px/)[1]);
    return { errors, texts, glyphFont: logicalFont * state.scale * scale, scale,
      rootScroll: [root.scrollWidth, root.scrollHeight], rootSize: [root.clientWidth, root.clientHeight] };
  });
}
async function hold(h, value) {
  await h.page.evaluate(value => document.querySelector('#sim-test')._runtime[value ? 'suspend' : 'resume'](), value);
  await h.page.waitForTimeout(0);
}
async function pixelPlane(h) { return h.page.locator('canvas').evaluate(canvas => canvas.toDataURL()); }
(async () => {
  for (const reduced of [false, true]) {
    const h = await open({ reducedMotion: reduced ? 'reduce' : 'no-preference' });
    try {
      for (const config of A.configs) for (const theme of ['dark', 'light']) for (const width of [328, 343, 358]) {
        await h.mount(config.kind, { width, height: 360, theme });
        const initial = await h.inspect(), layout = await geometry(h);
        same(layout.errors, [], config.kind + ' complete compact text/geometry');
        ok(layout.glyphFont >= 10.99, 'Magnified compact canvas glyphs meet 11px');
        ok(layout.rootScroll[0] <= layout.rootSize[0] + 1 && layout.rootScroll[1] <= layout.rootSize[1] + 1, 'Stage root does not scroll');
        same(initial.theme, theme, 'Host theme follows stage');
        if (reduced) { same(initial.scheduled, 0, 'Reduced host has no scheduler'); same(initial.lifecycle.pending, 0, 'Reduced engine has no scheduler'); }
        const complete = await h.inspect(true), model = complete.model;
        if (config.kind === 'fire') same(model.heat.length, 1792, 'Complete 64x28 heat field');
        if (config.kind === 'fluid') same(model.density.length, 1152, 'Complete 48x24 fluid field');
        if (config.kind === 'portrait') same(model.sourcePixels.length, 192 * 96 * 4, 'Complete original portrait source');
        if (config.kind === 'type') same(Object.keys(model.glyphBits).length, 36, 'Complete bitmap alphabet');
        await h.frames(120);
        if (reduced) same((await h.inspect()).data, initial.data, 'Reduced host remains a static original state');
        await h.viewport().evaluate(node => node.scrollTo({ left: node.scrollWidth, top: node.scrollHeight, behavior: 'instant' }));
        let view = (await h.inspect()).camera;
        ok(Math.abs(view.left - (view.worldWidth - view.width)) <= 1.5, 'Camera reaches last column');
        ok(Math.abs(view.top - (view.worldHeight - view.height)) <= 1.5, 'Camera reaches last row');
        await h.viewport().evaluate(node => node.scrollTo({ left: 0, top: 0, behavior: 'instant' }));
        view = (await h.inspect()).camera; same(view.left, 0, 'Camera reaches first column'); same(view.top, 0, 'Camera reaches first row');
        results.push({ kind: config.kind, reduced, theme, width, glyphFont: layout.glyphFont, opticalScale: layout.scale, textNodes: layout.texts.length });
      }
      same(h.errors, [], 'Compact host browser errors');
    } finally { await h.close(); }
  }
  const h = await open();
  try {
    for (const config of A.configs) {
      await h.mount(config.kind, { width: 360, height: 360 }); await h.frames(20);
      await hold(h, true);
      const before = await h.inspect(true), pixels = await pixelPlane(h);
      await h.action('reset');
      if (config.kind === 'type') await h.input().fill('NEXT12');
      else { await h.field().focus(); await h.field().press('ArrowRight'); }
      ok((await h.inspect()).queued >= 2, 'Held Reset and later explicit intent are queued');
      await h.frames(120); const frozen = await h.inspect(true);
      same(frozen.model, before.model, 'Held input does not mutate original fields'); same(await pixelPlane(h), pixels, 'Held input leaves painted output frozen');
      await h.page.evaluate(() => { document.querySelector('#sim-test').style.marginTop = '1800px'; window.scrollTo(0, 0); });
      await h.page.waitForTimeout(90); await hold(h, false);
      same((await h.inspect()).held, true, 'Caller resume preserves viewport hold');
      ok((await h.inspect()).queued >= 2, 'Viewport hold preserves pending user intent');
      await h.page.evaluate(() => { document.querySelector('#sim-test').style.marginTop = '0'; window.scrollTo(0, 0); });
      await h.page.waitForFunction(() => document.querySelector('#sim-test')._root.__SimInspect().held === false);
      const resumed = await h.inspect(); same(resumed.queued, 0, 'Final hold release flushes intent');
      if (config.kind === 'fire') same(resumed.data.windStrength, '2.000', 'Later explicit wind wins over Reset');
      if (config.kind === 'fluid') same(resumed.data.splats, '1', 'Later explicit stir wins over Reset');
      if (config.kind === 'portrait') same(resumed.data.keyboardMoves, '1', 'Later explicit reveal wins over Reset');
      if (config.kind === 'type') same(resumed.data.text, 'NEXT12', 'Later native editing wins over Reset');
      await h.page.evaluate(() => document.querySelector('#sim-test')._runtime.dispose());
      const disposed = await h.inspect(); same(disposed.dead, true, 'Host disposed'); same(disposed.scheduled, 0, 'Host frame released');
      same(disposed.lifecycle.pending, 0, 'Engine callbacks released'); same(disposed.lifecycle.listeners, 0, 'Engine listeners released');
      same(disposed.lifecycle.observerTargets, 0, 'Engine observers released'); same(disposed.captured, 0, 'Host captures released');
    }
    same(h.errors, [], 'Lifecycle browser errors');
  } finally { await h.close(); }
  const report = { verifiedAt: new Date().toISOString(), checks, matrix: results.length, results,
    sourceHashes:H.hashes(__filename),
    scope: 'Published complete full-view stage hosts; compact complete models, themes, text and native camera endpoints, reduced motion, queued Reset/intent, actual runtime viewport/caller holds and cleanup. Native artwork is verified separately.', errors: [] };
  fs.writeFileSync(dir + '/host-proof.json', JSON.stringify(report, null, 2)); console.log('PASS ' + checks + ' full-stage checks / ' + results.length + ' compact compositions');
})().catch(error => { console.error(error.stack?.slice(0,2600)); process.exitCode = 1; });

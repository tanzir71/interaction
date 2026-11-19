const H=require('./raster-portrait-harness'),{fs,crypto,assert,dir,hash,A}=H,open=async options=>{const h=await H.openFull(options);await h.page.evaluate(async ids=>{for(const id of ids)await INTRX.loadDemo(id);return true;},A.configs.map(c=>c.id));return h;};
let checks = 0; const results = [];
const same = (actual, expected, label) => { checks++; assert.deepEqual(actual, expected, label); };
const ok = (value, label) => { checks++; assert(value, label); };
const near = (actual, expected, label, tolerance = .8) => { checks++; assert(Number.isFinite(actual) && Math.abs(actual - expected) <= tolerance, label + ': ' + actual + ' / ' + expected); };
async function position(h, fx = .55, fy = .45) {
  return h.viewport().evaluate((node, { fx, fy }) => {
    const stage = document.querySelector('#sim-test'), state = stage._root.__SimInspect(), box = node.getBoundingClientRect();
    const x = node.clientWidth * fx, y = node.clientHeight * fy;
    return { x: box.left + x * stage._ctx.scale, y: box.top + y * stage._ctx.scale,
      logicalX: (x + node.scrollLeft) / state.scale - 8, logicalY: (y + node.scrollTop) / state.scale - 8 };
  }, { fx, fy });
}
async function scroll(h, left, top) { await h.viewport().evaluate((node, p) => node.scrollTo({ ...p, behavior: 'instant' }), { left, top }); }
(async () => {
  for (const reduced of [false, true]) {
    const h = await open({ reducedMotion: reduced ? 'reduce' : 'no-preference', deviceScaleFactor: 3 });
    try {
      for (const config of A.configs) {
        await h.mount(config.kind, { width: 328, height: 360 });
        const before = await h.inspect(); same(before.presentation.dpr, 2, 'Device pixel ratio capped at two');
        const at = await position(h); await h.page.mouse.move(at.x, at.y);
        if (config.kind === 'fire') {
          let state = await h.inspect(); near(Number(state.data.pointerX), at.logicalX, 'Scaled/scrolled physical wind coordinate');
          await h.page.mouse.click(at.x, at.y); state = await h.inspect(); same(state.data.surges, '1', 'Physical click adds fuel');
          if (reduced) same(state.data.lastFuelMode, 'reduced pulse', 'Reduced fuel deliberately advances original solver');
          else { await h.frames(30); const model = (await h.inspect(true)).model; ok(model.heat.slice(-64).every(value => value === 100), 'Physical fuel fills complete original bottom row'); }
          await h.field().focus(); await h.field().press('Home'); same((await h.inspect()).data.windStrength, '0.000', 'Native Home calms field');
          await h.field().press('ArrowLeft'); same((await h.inspect()).data.windStrength, '-2.000', 'Native left wind');
        } else if (config.kind === 'fluid') {
          await h.page.mouse.down(); const end = await position(h, .75, .7); await h.page.mouse.move(end.x, end.y, { steps: 5 }); await h.page.mouse.up();
          const state = await h.inspect(); same(state.data.captures, '1', 'Physical fluid drag captured'); same(state.data.nativeCaptures, '1', 'Actual browser capture succeeds');
          same(state.data.releases, '1', 'Physical release completes drag'); same(state.data.dragging, 'false', 'Physical fluid drag ends');
          ok(Number(state.data.splats) >= 1, 'Physical drag injects original velocity splats');
          const grid = state.data.pointerGrid.split(',').map(Number);
          near(grid[0], end.logicalX / 368 * 48 - .5, 'Scaled fluid X coordinate', .15);
          near(grid[1], end.logicalY / 268 * 24 - .5, 'Scaled fluid Y coordinate', .15);
          await h.field().focus(); await h.field().press('Shift+ArrowRight'); ok(Number((await h.inspect()).data.splats) > Number(state.data.splats), 'Native shifted arrow injects velocity');
          await h.action('pause'); same((await h.inspect()).data.paused, reduced ? 'false' : 'true', 'Pause or manual reduced step');
          await h.action('reset'); same((await h.inspect()).data.paused, 'false', 'Reset restores original running solver');
        } else if (config.kind === 'portrait') {
          let state = await h.inspect(); near(Number(state.data.pointerX), at.logicalX, 'Scaled portrait reveal X'); near(Number(state.data.pointerY), at.logicalY, 'Scaled portrait reveal Y');
          ok(Number(state.data.revealCells) > 0, 'Physical pointer develops portrait');
          await h.page.mouse.move(1150, 850); state = await h.inspect(); same(state.data.pointerActive, 'false', 'Physical leave clears direct reveal');
          if (reduced) same(state.data.revealCells, '0', 'Reduced reveal clears without a trail');
          else { ok(Number(state.data.trailCells) > 0, 'Original trail starts on physical leave'); await h.frames(60); same((await h.inspect()).data.revealCells, '0', 'Complete original 600ms trail settles'); }
          await h.field().focus(); await h.field().press('Home'); same((await h.inspect()).data.pointerActive, 'true', 'Native keyboard reveals portrait');
        } else {
          await h.input().fill('AB12'); await h.input().evaluate(node => node.setSelectionRange(2, 2)); await h.page.keyboard.insertText('z');
          same((await h.inspect()).data.text, 'ABZ12', 'Actual interior text edit normalizes'); same(await h.input().evaluate(node => node.selectionStart), 3, 'Actual input caret remains after insertion');
          await h.input().press('Backspace'); same((await h.inspect()).data.text, 'AB12', 'Native Backspace reconciles complete bitmap suffix');
          same(await h.input().evaluate(node => node.selectionStart), 2, 'Native deletion retains caret');
          await h.input().fill('ABCDEFGH'); await h.input().press('End'); await h.page.keyboard.insertText('Z'); same((await h.inspect()).data.text, 'ABCDEFGH', 'Native maxlength preserves eight-character cap');
          await h.input().press('Escape'); same((await h.inspect()).data.text, '', 'Native Escape resets banner'); same(await h.input().inputValue(), '', 'Native input is synchronized after Reset');
        }
        await scroll(h, 0, 0); const wheelAt = await position(h); await h.page.mouse.move(wheelAt.x, wheelAt.y);
        const pageBefore = await h.page.evaluate(() => scrollY); await h.page.mouse.wheel(70, 85); await h.page.waitForTimeout(180);
        const after = await h.inspect(); ok(after.camera.left > 0 && after.camera.top > 0, 'Actual wheel scrolls both field axes'); same(await h.page.evaluate(() => scrollY), pageBefore, 'Field wheel does not scroll page');
        await h.action('reset'); const dragAt = await position(h); await h.page.mouse.move(dragAt.x, dragAt.y); await h.page.mouse.down();
        await h.page.evaluate(() => document.querySelector('#sim-test')._runtime.dispose()); await h.page.mouse.up();
        const disposed = await h.inspect(); same(disposed.captured, 0, 'Host disposal releases active browser captures');
        same(await h.page.locator('canvas[class$="-canvas"]').evaluate(node => node.hasPointerCapture(1)), false, 'No browser pointer capture survives disposal');
        results.push({ kind: config.kind, reduced, deviceScaleFactor: 3, camera: after.camera });
      }
      same(h.errors, [], 'Physical desktop input browser errors');
    } finally { await h.close(); }
  }
  const touch = await open({ viewport: { width: 390, height: 844 }, isMobile: true, hasTouch: true, deviceScaleFactor: 2 });
  try {
    const cdp = await touch.context.newCDPSession(touch.page);
    for (const config of A.configs) {
      await touch.mount(config.kind, { width: 328, height: 360 }); await scroll(touch, 0, 0);
      const start = await position(touch, .7, .75);
      await cdp.send('Input.dispatchTouchEvent', { type: 'touchStart', touchPoints: [{ id: 1, x: start.x, y: start.y, radiusX: 3, radiusY: 3, force: 1 }] });
      for (let step = 1; step <= 7; step++) {
        await cdp.send('Input.dispatchTouchEvent', { type: 'touchMove', touchPoints: [{ id: 1, x: start.x - step * 9, y: start.y - step * 8, radiusX: 3, radiusY: 3, force: 1 }] });
        await touch.page.waitForTimeout(18);
      }
      await cdp.send('Input.dispatchTouchEvent', { type: 'touchEnd', touchPoints: [] }); await touch.page.waitForTimeout(250);
      let state = await touch.inspect();
      if (config.kind === 'fluid') {
        ok(Number(state.data.splats) > 0, 'Native touch stirs fluid'); ok(Number(state.data.nativeCaptures) > 0, 'Native touch capture succeeds');
        same(state.data.dragging, 'false', 'Native touch drag releases'); await touch.action('pan'); same((await touch.inspect()).pan, true, 'Native Pan action enables camera navigation');
        await scroll(touch, 0, 0); const p = await position(touch, .75, .8);
        await cdp.send('Input.dispatchTouchEvent', { type: 'touchStart', touchPoints: [{ id: 2, x: p.x, y: p.y, radiusX: 3, radiusY: 3, force: 1 }] });
        for (let step = 1; step <= 7; step++) { await cdp.send('Input.dispatchTouchEvent', { type: 'touchMove', touchPoints: [{ id: 2, x: p.x - step * 9, y: p.y - step * 8, radiusX: 3, radiusY: 3, force: 1 }] }); await touch.page.waitForTimeout(18); }
        await cdp.send('Input.dispatchTouchEvent', { type: 'touchEnd', touchPoints: [] }); await touch.page.waitForTimeout(250); state = await touch.inspect();
      }
      ok(state.camera.left > 0 || state.camera.top > 0, 'Native diagonal touch reaches magnified camera content');
      if (config.kind === 'fire') same(state.data.windStrength, '0.000', 'Touch pan cancellation clears wind');
      if (config.kind === 'portrait') same(state.data.dragging, 'false', 'Touch pan cancellation releases portrait capture');
      results.push({ kind: config.kind, touch: true, camera: state.camera });
    }
    same(touch.errors, [], 'Native touch browser errors');
  } finally { await touch.close(); }
  const report = { verifiedAt: new Date().toISOString(), checks, results,
    sourceHashes:H.hashes(__filename),
    scope: 'Physical mouse, actual browser pointer capture, native editing/caret/keys, native wheel and CDP touch through the published complete full-stage implementation. Exact Figma-native geometry and photographic paint are covered separately.', errors: [] };
  fs.writeFileSync(dir + '/host-input-proof.json', JSON.stringify(report, null, 2)); console.log('PASS ' + checks + ' physical full-host input checks');
})().catch(error => { console.error(error.stack?.slice(0,2600)); process.exitCode = 1; });

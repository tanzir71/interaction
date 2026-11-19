const H=require('./raster-simulations-harness'),{fs,crypto,assert,dir,hash,A}=H,open=async options=>{const h=await H.openFull(options);await h.page.evaluate(async ids=>{for(const id of ids)await INTRX.loadDemo(id);return true;},A.configs.map(c=>c.id));return h;};
let checks = 0; const results = [];
function same(actual, expected, label) { checks++; assert.deepEqual(actual, expected, label); }
async function press(h, key) { await h.field().focus(); await h.field().press(key); }
(async () => {
  const h = await open();
  try {
    for (const config of A.configs) {
      let reference;
      for (const hz of [60, 120, 240]) {
        await h.mount(config.kind, { width: 328, height: 360 });
        if (config.kind === 'type') {
          await h.input().fill('ABCD12'); await h.frames(hz, hz);
          await h.input().press('Backspace'); await h.frames(hz, hz);
          await h.page.keyboard.insertText('X'); await h.frames(hz, hz);
          await h.action('reset'); await h.frames(hz, hz);
          await h.input().fill('INTRX'); await h.frames(hz * 6, hz);
          checks++; assert(Number((await h.inspect()).data.completedWaves) >= 1, 'Complete original idle wave runs through actual host');
        } else {
          const sequence = config.kind === 'fire' ? ['Home', 'ArrowRight', 'ArrowLeft', ' ', 'Home', ' '] :
            config.kind === 'fluid' ? ['Home', 'Shift+ArrowRight', 'ArrowDown', ' ', ' ', 'R'] :
              ['Home', 'Shift+ArrowRight', 'ArrowDown', ' ', ' ', 'Escape'];
          for (const key of sequence) { await press(h, key); await h.frames(hz, hz); }
        }
        await h.page.evaluate(() => document.querySelector('#sim-test')._runtime.suspend()); await h.page.waitForTimeout(0);
        const held = (await h.inspect(true)).model;
        await h.frames(hz * 2, hz); same((await h.inspect(true)).model, held, 'Physical refresh callbacks cannot advance held models');
        await h.page.evaluate(() => document.querySelector('#sim-test')._runtime.resume()); await h.page.waitForTimeout(0); await h.frames(hz, hz);
        const state = await h.inspect(true), model = state.model; delete model.data;
        fs.writeFileSync(dir + '/host-clock-progress.json', JSON.stringify({ kind: config.kind, hz, time: state.time,
          accumulator: state.accumulator, coreClock: state.lifecycle.clock, sourceTime: state.data.activeTime || state.data.simulationTime,
          reference: reference ? { time: reference.time, accumulator: reference.accumulator } : null }, null, 2));
        if (!reference) reference = { model, time: state.time, accumulator: state.accumulator };
        else {
          same(model, reference.model, config.kind + ' complete original buffers at ' + hz + 'Hz');
          checks++; assert(Math.abs(state.time - reference.time) < 1e-7, 'Fixed virtual clock is refresh-rate independent');
          checks++; assert(Math.abs(state.accumulator - reference.accumulator) < 1e-7, 'Fractional accumulator is refresh-rate independent');
        }
        results.push({ kind: config.kind, hz, time: state.time, accumulator: state.accumulator,
          sourceTime: state.data.activeTime || state.data.simulationTime, completedWaves: state.data.completedWaves || null });
      }
    }
    // Theme changes are deliberate rendering updates and preserve the full
    // original model while no virtual source frames run.
    for (const config of A.configs) {
      await h.mount(config.kind, { width: 328, height: 360 });
      const before = (await h.inspect(true)).model; delete before.data;
      await h.page.evaluate(() => { document.querySelector('#sim-test').dataset.stageTheme = 'light'; });
      await h.page.waitForFunction(() => document.querySelector('#sim-test')._root.__SimInspect().theme === 'light');
      const after = (await h.inspect(true)).model; delete after.data; same(after, before, 'Theme does not discard or resample original data');
      const pixel = await h.page.locator('canvas').evaluate(canvas => Array.from(canvas.getContext('2d').getImageData(0, 0, 1, 1).data));
      same(pixel, [244, 244, 244, 255], 'Light camera has an opaque neutral padded edge');
    }
    same(h.errors, [], 'Host clock browser errors');
  } finally { await h.close(); }
  const report = { verifiedAt: new Date().toISOString(), checks, results,
    sourceHashes:H.hashes(__filename),
    scope: 'Complete actual full-host source models at synthetic 60/120/240Hz callback clocks, caller holds, interrupted input/Reset, complete idle wave and live theme changes. This is numerical renderer timing, not a frame-performance profile.', errors: [] };
  fs.writeFileSync(dir + '/host-clock-proof.json', JSON.stringify(report, null, 2)); console.log('PASS ' + checks + ' full-host clock and theme checks');
})().catch(error => { console.error(error.stack?.slice(0,2600)); process.exitCode = 1; });

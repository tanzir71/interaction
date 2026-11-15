/* Complete seeded trading, orbital and boot models, plus native v4 previews. */
const fs = require('node:fs');
const vm = require('node:vm');
const assert = require('node:assert/strict');
const crypto = require('node:crypto');
const { chromium } = require(process.env.PLAYWRIGHT_MODULE || 'playwright');
const bounds = require('./stage-fit-bounds');
const fixtures = JSON.parse(fs.readFileSync('tools/fixtures/fui-mission-models.json', 'utf8'));
const artwork = JSON.parse(fs.readFileSync('tools/fixtures/fui-artwork.json', 'utf8'));
const demos = require('./load-registry')().demos;
const ids = ['fui-trading-terminal', 'fui-orbital-tracker', 'fui-terminal-boot'];
const hooks = ['__FUITradeInspect', '__FUIOrbitInspect', '__FUIBootInspect'];
const sha = value => crypto.createHash('sha256').update(value).digest('hex');
let checks = 0;
function check(ok, label) { assert.ok(ok, label); checks++; }
function same(actual, expected, label) { assert.deepEqual(JSON.parse(JSON.stringify(actual)), JSON.parse(JSON.stringify(expected)), label); checks++; }
function near(actual, expected, label) {
  function compare(a, b) {
    if (typeof b === 'number') return typeof a === 'number' && Math.abs(a - b) < 1e-10;
    if (b && typeof b === 'object') return a && JSON.stringify(Object.keys(a)) === JSON.stringify(Object.keys(b)) && Object.keys(b).every(key => compare(a[key], b[key]));
    return a === b;
  }
  check(compare(actual, expected), label);
}
function extract(source, name) {
  const start = source.indexOf('function ' + name + '(');
  if (start < 0) throw Error('Missing ' + name);
  let level = 0;
  for (let i = source.indexOf('{', start); i < source.length; i++) {
    if (source[i] === '{') level++;
    if (source[i] === '}' && --level === 0) return source.slice(start, i + 1);
  }
  throw Error('Unbalanced ' + name);
}

// Execute the current controller with deterministic DOM/timer adapters. The expected
// schedules and event timeline were captured from the untouched original controller.
function bootModel(source) {
  class Node {
    constructor() { this.children = []; this.style = {}; this.dataset = {}; this.className = ''; this._text = ''; this.classList = { add() {}, remove() {}, toggle() {} }; }
    set textContent(value) { this._text = String(value); this.children = []; }
    get textContent() { return this._text + this.children.map(n => n.textContent).join(''); }
    appendChild(node) { this.children.push(node); return node; }
    append(...nodes) { nodes.forEach(node => this.appendChild(node)); }
    querySelectorAll() { return this.children.filter(n => n.className.includes('d-fui-boot-line') && !n.className.includes('d-fui-boot-ready')); }
  }
  const nodes = new Map(), tasks = new Map(), events = [], values = {}, root = new Node();
  let now = 0, serial = 0;
  root.isConnected = true;
  root.querySelector = key => { if (!nodes.has(key)) nodes.set(key, new Node()); return nodes.get(key); };
  root.dataset = new Proxy(values, { set(o, key, value) {
    o[key] = value;
    if (key === 'source') events.push({ at: now, source: value, cycle: +o.cycles, phase: o.phase, emitted: +o.emitted, resolved: +o.resolved, warnings: +o.warnings });
    return true;
  } });
  const add = (fn, delay) => { const id = ++serial; tasks.set(id, { id, due: now + delay, fn }); return id; };
  const context = {
    root, data: root.dataset, C: 'd-fui-boot', dead: false, motion: { xslow: 500 },
    matchMedia: () => ({ matches: false }),
    document: { createElement: () => new Node(), createTextNode: text => { const n = new Node(); n.textContent = text; return n; } },
    setAgentText: (node, text) => { node.textContent = text; },
    setAgentStyle: (node, key, value) => { node.style[key] = value; },
    animateFUI() {}, setTimeout: add, clearTimeout: id => tasks.delete(id),
    requestAnimationFrame: fn => add(() => fn(now), 1000 / 60)
  };
  const core = source.slice(source.indexOf('const screen=root.querySelector'), source.indexOf("ctx.onAction('replay'"));
  vm.runInNewContext(core + '\nroot.plan=()=>({cycles,schedule,warningIndex,jitterIndex});', context);
  const cycles = [];
  while (tasks.size && +root.dataset.cycles <= 16) {
    const plan = root.plan();
    if (plan.cycles > cycles.length) cycles.push({ cycle: plan.cycles, schedule: plan.schedule, warningIndex: plan.warningIndex, jitterIndex: plan.jitterIndex });
    const task = [...tasks.values()].sort((a, b) => a.due - b.due || a.id - b.id)[0];
    tasks.delete(task.id); now = task.due; task.fn();
  }
  return { cycles, events: events.filter(e => e.cycle <= 16) };
}

(async () => {
  const base = (process.argv[2] || 'http://127.0.0.1:4173').replace(/\/$/, '');
  const model = bootModel(demos.find(d => d.id === ids[2]).js);
  same(model.cycles, fixtures.boot.cycles, 'All sixteen original fourteen-device schedules and warning/jitter draws');
  same(model.events, fixtures.boot.events, 'All 496 original emission, resolution, ready, hold and wipe events');
  const orbitSource = demos.find(d => d.id === ids[1]).js;
  const configCode = orbitSource.slice(orbitSource.indexOf('const configs=['), orbitSource.indexOf('const backPaths='));
  const orbitFunctions = Object.keys(fixtures.orbit.sourceFunctions).map(name => {
    const fn = extract(orbitSource, name);
    check(sha(fn) === fixtures.orbit.sourceFunctions[name], 'Original orbital function ' + name);
    return fn;
  }).join('\n');
  for (const fixture of fixtures.orbit.paths) {
    const actual = vm.runInNewContext('(function(){const TAU=Math.PI*2,RAD=Math.PI/180;let centerX=0,centerY=0,sceneRotation=camera;' + configCode + orbitFunctions + 'return configs.map(c=>({id:c.id,back:pathFor(c,0,Math.PI),front:pathFor(c,Math.PI,TAU)}));})()', { camera: fixture.camera });
    same(actual, fixture.paths, 'All six complete 73-point orbit halves at camera ' + fixture.camera);
  }
  for (const id of ids) for (const a of artwork[id] || []) check(sha(fs.readFileSync(a.file)) === a.sha256, 'Original artwork bytes ' + a.node);
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({ viewport: { width: 1440, height: 1000 }, reducedMotion: 'reduce' });
  const page = await context.newPage(), errors = [], fits = [];
  let current = 0, C = '';
  const stage = () => page.locator('.detail-stage');
  const q = name => stage().locator('.' + C + '-' + name);
  const dock = name => stage().locator('[data-action="' + name + '"]');
  const inspect = () => stage().evaluate((s, hook) => s._root[hook](), hooks[current]);
  async function open(id) {
    current = ids.indexOf(id);
    await page.mouse.move(1400, 0);
    await page.evaluate(id => INTRX.router.go('#/c/' + id), id);
    await page.waitForFunction(({ id, hook }) => document.querySelector('.detail-stage')?.dataset.stage === id && document.querySelector('.detail-stage')?._root?.[hook], { id, hook: hooks[current] });
    await page.evaluate(() => document.fonts.ready);
    C = await stage().evaluate(s => s._root.classList[0]);
    check(!await stage().getAttribute('data-boot-error'), id + ' boots');
  }
  page.on('pageerror', e => errors.push(e.message));
  page.on('console', m => { if (m.type() === 'error' && m.text().includes('[INTRX]')) errors.push(m.text()); });
  try {
    await page.goto(base + '/#/', { waitUntil: 'networkidle' });
    // Instrument only this in-memory mount to advance the actual controller at
    // exact tick boundaries; the published module has no synthetic clock action.
    const trade = { ...demos.find(d => d.id === ids[0]) };
    trade.js = trade.js.replace('return cleanup;', 'root.__missionStep=time=>{simulationTime=time;if(simulationTime>=nextTickAt){marketTick();nextTickAt+=tickInterval;}updateChoreography();return root.__FUITradeInspect().state;};return cleanup;');
    const states = await page.evaluate(async demo => {
      INTRX.disposeView(); document.querySelector('#app').innerHTML = '<div id="mission-model" class="demo-stage stage" style="width:700px;height:600px"></div>';
      const s = document.querySelector('#mission-model'); INTRX.mountStage(demo, s, 'full');
      const root = s._root, result = [root.__FUITradeInspect().state];
      for (let i = 1; i <= 64; i++) { root.__missionStep(i * 800); result.push(root.__missionStep(i * 800 + 350)); }
      return result;
    }, trade);
    states.forEach((state, i) => {
      for (const key of ['price', 'points', 'book', 'tape', 'ticks']) same(state[key], fixtures.trade.states[i][key], 'Original market state ' + i + ' ' + key);
    });
    await page.evaluate(() => INTRX.router.go('#/'));
    await open(ids[0]);
    let value = await inspect();
    check(value.config.pointCount === 60 && value.config.bookLevelCount === 6 && value.config.tapeLimit === 4 && value.config.tickInterval === 800, 'Complete market dimensions and operational clock');
    const handles = q('handle');
    await handles.first().focus(); await page.keyboard.press('ArrowRight');
    check((await inspect()).state.reorders === 1, 'Native keyboard reorders fitted full panels');
    await page.keyboard.press('Enter'); check((await inspect()).state.collapsed.length === 1, 'Native Enter collapses a panel');
    await page.keyboard.press('Enter'); check(!(await inspect()).state.collapsed.length, 'Native Enter expands a panel');
    await handles.first().dblclick(); check((await inspect()).state.collapsed.length === 1, 'Native double-click collapses a panel');
    await dock('reset').click();
    same((await inspect()).state.points, fixtures.trade.states[0].points, 'Shared Reset reseeds all sixty points');
    same((await inspect()).state.slots, { price: 0, book: 1, tape: 2 }, 'Shared Reset restores every full slot');
    const bars = await q('book-side').locator('i').evaluateAll(nodes => nodes.map(n => ({ transform: n.style.transform, width: n.getBoundingClientRect().width, container: n.parentElement.getBoundingClientRect().width })));
    const expectedBars = fixtures.trade.states[0].book.flatMap(row => [row.bid, row.ask]);
    bars.forEach((bar, i) => check(Math.abs(+bar.transform.match(/[\d.]+/)[0] - Math.round(expectedBars[i] * 10) / 1000) < 1e-9 && bar.width <= bar.container + .01, 'Original bid/ask value and contained transform ' + i));
    await open(ids[1]);
    value = await inspect();
    check(value.config.configSignature === fixtures.orbit.configSignature && value.config.trailCount === 12 && value.config.typeDelay === 22 && value.config.dashPeriod === 20000, 'Complete original orbital configuration');
    for (const sample of fixtures.orbit.cases) {
      const actual = await stage().evaluate((s, sample) => s._root.__FUIOrbitSample(sample.camera, sample.time), sample);
      near(actual, sample.result, 'Every satellite and all 36 trails at ' + sample.camera + '/' + sample.time);
    }
    check(await q('trail').count() === 36 && (await inspect()).paths.every(p => (p.back.match(/[ML]/g) || []).length === 73 && (p.front.match(/[ML]/g) || []).length === 73), 'Actual DOM retains every trail and full path sample');
    for (let i = 0; i < 3; i++) { await q('scene').focus(); await page.keyboard.press(i % 2 ? 'Space' : 'Enter'); check((await inspect()).state.selected === (i + 2) % 3, 'Native satellite cycle ' + i); }
    await dock('reset').click(); check((await inspect()).state.selected === 1 && (await inspect()).state.simulationTime === 0, 'Orbital Reset restores the original selected satellite');
    await open(ids[2]); value = await inspect();
    check(value.state.phase === 'ready' && value.state.lines.length === 15 && value.state.resolved === 14 && value.state.warnings === 1 && value.state.progress === '█'.repeat(24) && !value.lifecycle.timers, 'Reduced full boot retains all fourteen resolutions, warning and complete progress');
    await dock('replay').click(); same((await inspect()).state.lines, value.state.lines, 'Reduced Replay preserves complete native output');

    // Separate native v4 hero geometry, optical text, image bytes and controls.
    for (const id of ids) for (const [width, height] of [[372, 264], [286, 264], [286, 196]]) {
      await page.evaluate(async ({ id, width, height }) => {
        INTRX.disposeView(); document.querySelector('#app').innerHTML = '<div id="mission-fit" class="stage demo-stage"></div>';
        const s = document.querySelector('#mission-fit'); s.style.cssText = 'width:' + width + 'px;height:' + height + 'px';
        INTRX.mountStage(await INTRX.loadDemo(id), s, 'thumb'); await document.fonts.ready;
        await Promise.all([...s.querySelectorAll('img')].map(n => n.decode()));
      }, { id, width, height });
      const fit = page.locator('#mission-fit'), hook = hooks[ids.indexOf(id)];
      const result = await fit.evaluate((s, source) => {
        const measure = eval('(' + source + ')'), r = s.getBoundingClientRect(), root = s._root;
        const visible = [...root.querySelectorAll('*')].filter(n => !n.children.length).map(n => ({ n, b: measure(n, root) })).filter(v => v.b);
        return { scale: s._ctx.scale, fonts: visible.filter(v => v.n.textContent.trim()).map(({ n }) => ({ size: parseFloat(getComputedStyle(n).fontSize) * s._ctx.scale, clip: n.clientWidth > 0 && n.scrollWidth > n.clientWidth + 2 })), overflow: visible.filter(({ b }) => b.left < r.left - 1 || b.right > r.right + 1 || b.top < r.top - 1 || b.bottom > r.bottom + 1).length, scroll: root.scrollWidth > root.clientWidth + 2, heroOnly: !root.querySelector('.' + root.classList[0] + '-full'), images: [...root.querySelectorAll('img')].map(n => { const b = n.getBoundingClientRect(); return { node: n.dataset.figmaNode, x: (b.x-r.x)/s._ctx.scale, y: (b.y-r.y)/s._ctx.scale, w: b.width/s._ctx.scale, h: b.height/s._ctx.scale, loaded: n.complete && n.naturalWidth > 0 }; }) };
      }, bounds.toString());
      fits.push({ id, width, height, ...result });
      check(result.heroOnly && !result.overflow && !result.scroll && result.fonts.every(f => f.size >= 10.999 && !f.clip), id + ' compact geometry/type ' + width + 'x' + height + ' ' + JSON.stringify(result));
      for (const a of artwork[id] || []) {
        const actual = result.images.find(n => n.node === a.node);
        check(actual?.loaded && Math.abs(actual.w-a.w)<.03 && Math.abs(actual.h-a.h)<.03, 'Native image dimensions ' + a.node + ' at ' + width + 'x' + height);
        if (width === 372 && height === 264) check(Math.abs(actual.x-a.x)<.03 && Math.abs(actual.y-a.y)<.03, 'Exact Figma image slot ' + a.node);
      }
      if (width === 372 && height === 264) {
        const primitives = await fit.evaluate(s => {
          const r = s.getBoundingClientRect(), scale = s._ctx.scale;
          return [...s._root.querySelectorAll('.d-fui-trade-hero-book,.d-fui-trade-hero-tape,.d-fui-boot-hero-terminal,.d-fui-boot-hero-track,.d-fui-boot-hero-fill')].map(n => {
            const b = n.getBoundingClientRect(); return [n.className, (b.x-r.x)/scale, (b.y-r.y)/scale, b.width/scale, b.height/scale];
          });
        });
        const expected = id === ids[0] ? [['d-fui-trade-hero-book',214,32,72,80],['d-fui-trade-hero-tape',86,120,200,56]] : id === ids[2] ? [['d-fui-boot-hero-terminal',76,46,220,112],['d-fui-boot-hero-track',89,123,192,3],['d-fui-boot-hero-fill',89,123,128,3]] : [];
        check(primitives.length === expected.length && primitives.every((row,i)=>row[0]===expected[i][0]&&row.slice(1).every((n,k)=>Math.abs(n-expected[i][k+1])<.03)),id+' exact native primitive slots');
      }
      if (id === ids[0]) {
        const price = fit.locator('[data-card="price"]'), book = fit.locator('[data-card="book"]');
        const a = await price.boundingBox(), b = await book.boundingBox();
        await page.mouse.move(a.x+a.width/2,a.y+a.height/2); await page.mouse.down();
        await page.mouse.move(b.x+b.width/2,b.y+b.height/2,{steps:8}); await page.mouse.up();
        check((await fit.evaluate((s,h)=>s._root[h](),hook)).reversed, 'Native scaled thumbnail drag swaps panels at ' + width + 'x' + height);
        await price.focus(); await page.keyboard.press('Enter'); check((await fit.evaluate((s,h)=>s._root[h](),hook)).collapsed.includes('price'), 'Native compact collapse at ' + width + 'x' + height);
      } else if (id === ids[1]) {
        await fit.locator('.d-fui-orbit-hero').focus(); await page.keyboard.press('Enter');
        check((await fit.evaluate((s,h)=>s._root[h](),hook)).index === 1, 'Native compact satellite cycle');
      }
      await fit.locator('[data-action="'+(id===ids[2]?'replay':'reset')+'"]').click();
      check((await fit.evaluate((s,h)=>s._root[h](),hook)).preview, id+' dock acts on the native preview');
    }

    await page.evaluate(() => INTRX.router.go('#/'));
    await page.emulateMedia({ reducedMotion: 'no-preference' });
    await open(ids[0]); await stage().evaluate(s=>s._runtime.setSpeed(2));
    await page.waitForFunction(()=>+document.querySelector('.detail-stage')._root.dataset.ticks>=4);
    value=await inspect();
    const live=fixtures.trade.states[value.state.ticks];
    same(value.state.book,live.book,'Real runtime market clock retains seeded bid/ask draws');
    same(value.state.tape,live.tape,'Real runtime market clock retains original tape and sizes');
    await dock('swap').click(); await page.waitForTimeout(40); await dock('swap').click();
    await q('handle').first().focus(); await page.keyboard.press('Enter'); await page.waitForTimeout(40); await page.keyboard.press('Enter');
    await page.waitForTimeout(400);
    check(!(await inspect()).state.collapsed.length,'Interrupted normal Accordion settles expanded');
    await open(ids[1]); await dock('next').click(); await page.waitForTimeout(70); await dock('next').click(); await page.waitForTimeout(550);
    value=await inspect(); check(value.state.selected===0 && !value.state.rotationAnimating && !value.state.ghosts && value.state.paint.opacity===1,'Interrupted camera and text swaps settle on the latest satellite');
    await open(ids[2]); await stage().evaluate(s=>s._runtime.setSpeed(2));
    same((await inspect()).state.schedule,fixtures.boot.cycles[0].schedule,'Actual native boot begins with the complete original first schedule');
    await page.waitForFunction(()=>document.querySelector('.detail-stage')._root.dataset.phase==='ready');
    value=await inspect(); check(value.state.resolved===14&&value.state.lines.length===15&&value.state.warnings===1&&value.state.progress==='█'.repeat(24),'Normal streaming words preserve complete resolved output');
    await page.waitForTimeout(300); check((await inspect()).state.phase==='ready','Original ready hold does not wipe early');
    for(const id of ids){
      await open(id);
      await stage().evaluate(s=>{s.style.transform='translateY(200vh)';});
      await page.waitForFunction(()=>document.querySelector('.detail-stage')._runtime.suspended);
      const outside=await inspect();await page.waitForTimeout(120);same((await inspect()).state,outside.state,id+' offscreen hold freezes the full original model');
      await stage().evaluate(s=>{s.style.transform='';});
      await page.waitForFunction(()=>!document.querySelector('.detail-stage')._runtime.suspended);
      await stage().evaluate(s=>s._runtime.suspend());
      const before=await inspect(); await page.waitForTimeout(120);
      same((await inspect()).state,before.state,id+' caller suspension freezes complete model state');
      await stage().evaluate(s=>{s.style.transform='translateY(200vh)';});await page.waitForTimeout(100);
      await stage().evaluate(s=>{s.style.transform='';});await page.waitForTimeout(100);
      check(await stage().evaluate(s=>s._runtime.suspended),id+' viewport reentry preserves caller suspension');
      await dock(id===ids[2]?'replay':'reset').evaluate(n=>n.click());
      check(await stage().evaluate(s=>s._runtime.suspended),id+' Reset/Replay preserves the caller hold');
      const reset=await inspect(); await page.waitForTimeout(120); same((await inspect()).state,reset.state,id+' no stale callbacks after paused Reset/Replay');
      await stage().evaluate(s=>{window.disposedMission={root:s._root,runtime:s._runtime};s._runtime.dispose();});
      const disposed=await page.evaluate(h=>{const r=disposedMission.root,before=JSON.stringify(r[h]());r.querySelectorAll('button,[role="button"]').forEach(n=>n.click());const v=r[h]();return{cleaned:v.lifecycle.cleaned,aborted:v.lifecycle.signalAborted,inert:before===JSON.stringify(v),animations:r.getAnimations({subtree:true}).filter(a=>a.playState==='running').length};},hooks[ids.indexOf(id)]);
      check(disposed.cleaned&&disposed.aborted&&disposed.inert&&!disposed.animations,id+' disposal aborts native input, timers and owned animations');
    }

    await page.emulateMedia({reducedMotion:'reduce'});
    for(const id of ids){
      await open(id); const html=await page.evaluate(async id=>INTRX.getCode(await INTRX.loadDemo(id)),id),offline=await context.newPage();
      await offline.route('**/*',route=>route.abort()); await offline.setContent(html,{waitUntil:'load'});
      await offline.waitForFunction(h=>document.querySelector('.demo-stage')?._root?.[h],hooks[ids.indexOf(id)]);
      check(!html.includes('{{asset:')&&!html.includes('figma.com/api/mcp/asset'),id+' portable source resolves all assets');
      for(const a of artwork[id] || [])check(html.includes('data:image/svg+xml;base64,'+fs.readFileSync(a.file).toString('base64')),'Offline original artwork bytes '+a.node);
      const v=await offline.evaluate(h=>document.querySelector('.demo-stage')._root[h](),hooks[ids.indexOf(id)]);
      check(!v.preview&&(id===ids[0]?v.state.points.length===60&&v.state.book.length===6:id===ids[1]?v.configs.length===3:v.state.lines.length===15),id+' complete full model runs with network blocked');
      await offline.close();
    }
    const mobile=await browser.newContext({viewport:{width:390,height:844},isMobile:true,hasTouch:true,reducedMotion:'reduce'}),touch=await mobile.newPage();
    try{for(const width of [390,375,360]){
      await touch.setViewportSize({width,height:844});
      for(const id of ids){
        const hook=hooks[ids.indexOf(id)]; await touch.goto(base+'/#/c/'+id,{waitUntil:'networkidle'});
        await touch.waitForFunction(h=>document.querySelector('.detail-stage')?._root?.[h],hook);
        const s=touch.locator('.detail-stage');
        if(id===ids[0]){
          const handles=s.locator('.d-fui-trade-handle'),a=await handles.nth(0).boundingBox(),b=await handles.nth(1).boundingBox(),cdp=await mobile.newCDPSession(touch);
          await cdp.send('Input.dispatchTouchEvent',{type:'touchStart',touchPoints:[{x:a.x+a.width/2,y:a.y+a.height/2,id:1}]});
          for(let k=1;k<=8;k++)await cdp.send('Input.dispatchTouchEvent',{type:'touchMove',touchPoints:[{x:a.x+a.width/2+(b.x+b.width/2-a.x-a.width/2)*k/8,y:a.y+a.height/2+(b.y+b.height/2-a.y-a.height/2)*k/8,id:1}]});
          await cdp.send('Input.dispatchTouchEvent',{type:'touchEnd',touchPoints:[]});
          check((await s.evaluate((s,h)=>s._root[h](),hook)).state.reorders===1,'Native full fitted touch drag at '+width);await cdp.detach();
        }else await s.locator('[data-action="'+(id===ids[1]?'next':'replay')+'"]').tap();
        const result=await s.evaluate((s,source)=>{const measure=eval('('+source+')'),root=s._root,fonts=[...root.querySelectorAll('*')].filter(n=>!n.children.length&&n.textContent.trim()&&measure(n,root)).map(n=>({class:n.className,text:n.textContent.trim(),size:parseFloat(getComputedStyle(n).fontSize)*s._ctx.scale,italic:getComputedStyle(n).fontStyle!=='normal',clip:n.clientWidth>0&&n.scrollWidth>n.clientWidth+2}));return{fonts,rootScroll:root.scrollWidth>root.clientWidth+2,pageScroll:document.documentElement.scrollWidth>innerWidth+2};},bounds.toString());
        check(result.fonts.length&&result.fonts.every(f=>f.size>=10.999&&!f.italic&&!f.clip)&&!result.rootScroll&&!result.pageScroll,id+' full touch/type '+width+' '+JSON.stringify(result.fonts.filter(f=>f.size<10.999||f.italic||f.clip)));
      }
    }}finally{await mobile.close();}
    check(!errors.length,'No browser errors '+errors.join('; '));
    fs.mkdirSync('.artifacts/fui',{recursive:true});fs.writeFileSync('.artifacts/fui/results-third.json',JSON.stringify({checks,ids,fits,errors},null,2));
    console.log('PASS: '+checks+' original market/orbit/boot, native input, geometry, type, pause, cleanup and offline checks');
  }finally{await context.close();await browser.close();}
})().catch(error=>{console.error((error.stack||error.message).slice(0,6000));process.exitCode=1;});

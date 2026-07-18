/* Render the exact current registry source in an isolated CDP preview. */
const fs = require('fs');
const vm = require('vm');

const port = process.argv[2] || '9224';
const demoId = process.argv[3];
const screenshot = process.argv[4];
const width = Number(process.argv[5] || 380);
if (!demoId || !screenshot) throw new Error('Usage: node tools/render-demo-browser.js <port> <demo-id> <screenshot> [width]');

const index = fs.readFileSync('index.html', 'utf8');
const files = [...index.matchAll(/<script src="(js\/demos\.[^"]+\.js)"><\/script>/g)].map(match => match[1]);
const context = {};
context.window = context;
vm.createContext(context);
for (const file of files) {
  vm.runInContext(fs.readFileSync(file, 'utf8'), context, { filename: file });
  if (context.INTRX.demos.some(demo => demo.id === demoId)) break;
}
const demo = context.INTRX.demos.find(item => item.id === demoId);
if (!demo) throw new Error('Unknown demo: ' + demoId);

async function render(data, stageWidth) {
  document.head.innerHTML = '<meta charset="utf-8"><style>html,body{margin:0;width:100%;height:100%;overflow:hidden;background:#0a0a0b}body{display:grid;place-items:center}.preview-stage{position:relative;width:'+stageWidth+'px;height:320px;overflow:hidden}</style>';
  document.body.innerHTML = '<main class="preview-stage"></main>';
  const stage = document.querySelector('.preview-stage');
  const style = document.createElement('style');
  style.textContent = data.css;
  document.head.appendChild(style);
  stage.innerHTML = data.html;
  const root = stage.querySelector('.' + data.rootClass);
  new Function('root', 'stage', data.js)(root, stage);
  await new Promise(resolve => setTimeout(resolve, 350));
  const rect = root.getBoundingClientRect();
  const diagnostics = root.querySelectorAll('.d-fui-status-diag-list > div').length;
  const panel = root.querySelector('.d-fui-status-panel');
  const metric = panel && panel.querySelector('.d-fui-status-metric strong');
  const corner = panel && panel.querySelector('.d-fui-status-corner-tl');
  const metricBefore = metric ? getComputedStyle(metric).fontSize : null;
  if (panel) panel.focus();
  await new Promise(resolve => setTimeout(resolve, 220));
  const interaction = metric ? { metricBefore, metricAfter: getComputedStyle(metric).fontSize, cornerColor: getComputedStyle(corner).borderLeftColor, focused: document.activeElement === panel } : null;
  const lockChip = root.querySelector('.d-fui-lock-chip');
  const lockReticle = root.querySelector('.d-fui-lock-reticle');
  let lockInteraction = null;
  if (lockChip && lockReticle) {
    const rootRect = root.getBoundingClientRect();
    const reticleBeforeRect = lockReticle.getBoundingClientRect();
    const reticleBefore = { x: reticleBeforeRect.left + reticleBeforeRect.width / 2, y: reticleBeforeRect.top + reticleBeforeRect.height / 2 };
    const pointerTarget = { x: rootRect.left + 40, y: rootRect.top + 60 };
    root.dispatchEvent(new PointerEvent('pointermove', { bubbles: true, clientX: pointerTarget.x, clientY: pointerTarget.y }));
    await new Promise(resolve => setTimeout(resolve, 24));
    const reticleAfterRect = lockReticle.getBoundingClientRect();
    const reticleAfter = { x: reticleAfterRect.left + reticleAfterRect.width / 2, y: reticleAfterRect.top + reticleAfterRect.height / 2 };
    lockChip.focus();
    await new Promise(resolve => setTimeout(resolve, 760));
    const chipRect = lockChip.getBoundingClientRect();
    const bracketRects = [...root.querySelectorAll('.d-fui-lock-bracket')].map(item => {
      const box = item.getBoundingClientRect();
      return { x: box.left, y: box.top, width: box.width, height: box.height, opacity: getComputedStyle(item).opacity };
    });
    const readout = root.querySelector('.d-fui-lock-readout');
    lockInteraction = {
      reticleBefore,
      reticleAfter,
      pointerTarget,
      chip: { x: chipRect.left, y: chipRect.top, width: chipRect.width, height: chipRect.height },
      bracketRects,
      bracketStroke: getComputedStyle(root.querySelector('.d-fui-lock-bracket-tl')).borderLeftWidth,
      circleSize: getComputedStyle(root.querySelector('.d-fui-lock-reticle-circle')).width,
      gridSize: getComputedStyle(root, '::before').backgroundSize,
      readout: readout.textContent,
      dataReadout: root.dataset.readout,
      locked: root.dataset.locked,
      active: root.dataset.active,
      source: root.dataset.source,
      animationDuration: getComputedStyle(root.querySelector('.d-fui-lock-chip-glow')).animationDuration,
      focused: document.activeElement === lockChip
    };
    lockChip.blur();
    await new Promise(resolve => setTimeout(resolve, 230));
    lockInteraction.afterBlur = { locked: root.dataset.locked, active: root.dataset.active, readout: root.dataset.readout, bracketOpacities: [...root.querySelectorAll('.d-fui-lock-bracket')].map(item => getComputedStyle(item).opacity) };
    lockChip.focus();
    await new Promise(resolve => setTimeout(resolve, 760));
    lockInteraction.visualState = { locked: root.dataset.locked, readout: readout.textContent };
  }
  return {
    root: Boolean(root),
    rootClass: root.className,
    width: rect.width,
    height: rect.height,
    panels: root.querySelectorAll('.d-fui-status-panel').length,
    segments: root.querySelectorAll('.d-fui-status-power-bars i').length,
    diagnostics,
    focusables: root.querySelectorAll('button,input,select,textarea,[tabindex]').length,
    interaction,
    lock: {
      chips: root.querySelectorAll('.d-fui-lock-chip').length,
      brackets: root.querySelectorAll('.d-fui-lock-bracket').length,
      interaction: lockInteraction
    },
    scrollWidth: root.scrollWidth,
    scrollHeight: root.scrollHeight,
    clientWidth: root.clientWidth,
    clientHeight: root.clientHeight,
    clip: { x: rect.left, y: rect.top, width: rect.width, height: rect.height, scale: 1 }
  };
}

async function main() {
  const pages = await (await fetch('http://127.0.0.1:' + port + '/json/list')).json();
  const page = pages.find(item => item.type === 'page');
  if (!page) throw new Error('No Chromium page target found');
  const ws = new WebSocket(page.webSocketDebuggerUrl);
  await new Promise((resolve, reject) => {
    ws.addEventListener('open', resolve, { once: true });
    ws.addEventListener('error', reject, { once: true });
  });
  let sequence = 0;
  const pending = new Map();
  const errors = [];
  ws.addEventListener('message', event => {
    const message = JSON.parse(event.data);
    if (message.id && pending.has(message.id)) {
      const pair = pending.get(message.id);
      pending.delete(message.id);
      return message.error ? pair.reject(new Error(message.error.message)) : pair.resolve(message.result);
    }
    if (message.method === 'Runtime.exceptionThrown') errors.push(message.params.exceptionDetails.text);
    if (message.method === 'Runtime.consoleAPICalled' && message.params.type === 'error') errors.push(message.params.args.map(arg => arg.value || arg.description || '').join(' '));
  });
  const send = (method, params = {}) => new Promise((resolve, reject) => {
    const id = ++sequence;
    pending.set(id, { resolve, reject });
    ws.send(JSON.stringify({ id, method, params }));
  });
  await send('Runtime.enable');
  await send('Page.enable');
  await send('Emulation.setDeviceMetricsOverride', { width: Math.max(480, width + 80), height: 420, deviceScaleFactor: 1, mobile: false });
  const expression = '(' + render.toString() + ')(' + JSON.stringify(demo) + ',' + width + ')';
  const evaluated = await send('Runtime.evaluate', { expression, awaitPromise: true, returnByValue: true });
  if (evaluated.exceptionDetails) throw new Error(evaluated.exceptionDetails.text);
  const result = evaluated.result.value;
  const image = await send('Page.captureScreenshot', { format: 'png', fromSurface: true, captureBeyondViewport: false, clip: result.clip });
  fs.writeFileSync(screenshot, Buffer.from(image.data, 'base64'));
  ws.close();
  console.log(JSON.stringify({ result, errors, screenshot }, null, 2));
  const fuiFailed = demoId === 'fui-status-dashboard' && (result.panels !== 4 || result.segments !== 12 || result.diagnostics !== 5 || result.focusables !== 4 || !result.interaction || result.interaction.metricBefore !== '12px' || result.interaction.metricAfter !== '14px' || result.interaction.cornerColor !== 'rgb(167, 139, 250)' || !result.interaction.focused);
  const lock = result.lock && result.lock.interaction;
  const lockFailed = demoId === 'fui-target-lock' && (!lock || result.lock.chips !== 4 || result.focusables !== 4 || result.lock.brackets !== 4 || Math.abs(lock.chip.width - 128) > .1 || Math.abs(lock.chip.height - 44) > .1 || lock.bracketRects.some(item => item.width !== 10 || item.height !== 10 || item.opacity !== '1') || lock.bracketStroke !== '2px' || lock.circleSize !== '20px' || lock.gridSize !== '24px 24px' || !/^W:128 H:44 X:\d+ Y:\d+$/.test(lock.readout) || lock.dataReadout !== lock.readout || lock.locked !== 'true' || lock.source !== 'keyboard' || lock.animationDuration !== '1.6s' || !lock.focused || Math.hypot(lock.reticleAfter.x - lock.pointerTarget.x, lock.reticleAfter.y - lock.pointerTarget.y) >= Math.hypot(lock.reticleBefore.x - lock.pointerTarget.x, lock.reticleBefore.y - lock.pointerTarget.y) || Math.hypot(lock.reticleAfter.x - lock.pointerTarget.x, lock.reticleAfter.y - lock.pointerTarget.y) < 10 || lock.afterBlur.locked !== 'false' || lock.afterBlur.active !== '' || lock.afterBlur.readout !== '' || lock.afterBlur.bracketOpacities.some(value => value !== '0') || lock.visualState.locked !== 'true' || lock.visualState.readout !== lock.readout);
  if (!result.root || result.height !== 320 || result.scrollHeight !== result.clientHeight || result.scrollWidth !== result.clientWidth || errors.length || fuiFailed || lockFailed) process.exitCode = 1;
}

main().catch(error => { console.error(error); process.exitCode = 1; });

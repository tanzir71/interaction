/* Focused CDP verification for one published demo in a running Chromium. */
const fs = require('fs');

const port = process.argv[2] || '9223';
const demoId = process.argv[3];
const expected = Number(process.argv[4] || 0);
const screenshot = process.argv[5] || '';
const shouldReload = process.argv[6] !== 'no-reload';
if (!demoId || !expected) throw new Error('Usage: node tools/verify-demo-browser.js <port> <demo-id> <expected-count> [screenshot]');

async function inspect(id, count) {
  const wait = ms => new Promise(resolve => setTimeout(resolve, ms));
  const modalClose = document.querySelector('.modal-close');
  if (modalClose && document.querySelector('.modal.open')) modalClose.click();
  for (let index = 0; index < 1200 && (document.readyState !== 'complete' || !window.INTRX || window.INTRX.demos.length < count); index++) await wait(50);
  const card = document.getElementById(id);
  if (card) {
    card.scrollIntoView({ block: 'center' });
    for (let index = 0; index < 80 && !card.querySelector('.demo-stage > *'); index++) await wait(50);
    await wait(250);
  }
  const root = card && card.querySelector('.demo-stage > *');
  const rootBox = root && root.getBoundingClientRect();
  return {
    url: location.href,
    readyState: document.readyState,
    registryCount: window.INTRX ? window.INTRX.demos.length : 0,
    tileCount: document.querySelectorAll('#cards > .tile').length,
    categories: document.querySelectorAll('.nav-group').length,
    bodyText: document.body.innerText.trim().length,
    card: Boolean(card),
    booted: Boolean(root),
    failed: Boolean(card && card.textContent.includes('demo failed to boot')),
    rootClass: root ? root.className : '',
    rootHeight: root ? getComputedStyle(root).height : '',
    screenshotClip: rootBox ? { x: rootBox.left + scrollX, y: rootBox.top + scrollY, width: rootBox.width, height: rootBox.height, scale: 1 } : null,
    focusables: root ? root.querySelectorAll('button,input,select,textarea,[tabindex]').length : 0,
    canvases: root ? root.querySelectorAll('canvas').length : 0,
    data: root ? { ...root.dataset } : {},
    cursorRegistry: Boolean(window.INTRX && window.INTRX.demos.some(demo => demo.id === 'cursor-gooey-blob')),
    cursorScript: [...document.scripts].some(script => /demos\.cursor\.js$/.test(script.src)),
    cursorResource: performance.getEntriesByType('resource').filter(entry => /demos\.cursor\.js$/.test(entry.name)).map(entry => ({ name: entry.name, duration: entry.duration, transfer: entry.transferSize, encoded: entry.encodedBodySize, decoded: entry.decodedBodySize }))
  };
}

async function main() {
  const pages = await (await fetch('http://127.0.0.1:' + port + '/json/list')).json();
  const page = pages.find(item => item.type === 'page' && /^https?:\/\//.test(item.url));
  if (!page) throw new Error('No Chromium page target found');
  const ws = new WebSocket(page.webSocketDebuggerUrl);
  await new Promise((resolve, reject) => {
    ws.addEventListener('open', resolve, { once: true });
    ws.addEventListener('error', reject, { once: true });
  });
  let sequence = 0;
  const pending = new Map();
  const errors = [];
  let loadResolve;
  ws.addEventListener('message', event => {
    const message = JSON.parse(event.data);
    if (message.id && pending.has(message.id)) {
      const pair = pending.get(message.id);
      pending.delete(message.id);
      return message.error ? pair.reject(new Error(message.error.message)) : pair.resolve(message.result);
    }
    if (message.method === 'Page.loadEventFired' && loadResolve) loadResolve();
    if (message.method === 'Runtime.exceptionThrown') {
      const details = message.params.exceptionDetails;
      errors.push((details.exception && details.exception.description) || details.text);
    }
    if (message.method === 'Runtime.consoleAPICalled' && message.params.type === 'error') {
      errors.push(message.params.args.map(arg => arg.value || arg.description || '').join(' '));
    }
  });
  const send = (method, params = {}) => new Promise((resolve, reject) => {
    const id = ++sequence;
    pending.set(id, { resolve, reject });
    ws.send(JSON.stringify({ id, method, params }));
  });
  await send('Runtime.enable');
  await send('Page.enable');
  if (shouldReload) {
    const loaded = new Promise(resolve => { loadResolve = resolve; });
    await send('Page.reload', { ignoreCache: true });
    await loaded;
  }
  const expression = '(' + inspect.toString() + ')(' + JSON.stringify(demoId) + ',' + expected + ')';
  const evaluated = await send('Runtime.evaluate', { expression, awaitPromise: true, returnByValue: true });
  const evaluation = { type: evaluated.result.type, subtype: evaluated.result.subtype || null, description: evaluated.result.description || null, exception: evaluated.exceptionDetails || null };
  const result = evaluated.result.value || {};
  if (screenshot && result.screenshotClip) {
    const image = await send('Page.captureScreenshot', { format: 'png', fromSurface: true, captureBeyondViewport: true, clip: result.screenshotClip });
    fs.writeFileSync(screenshot, Buffer.from(image.data, 'base64'));
  }
  ws.close();
  console.log(JSON.stringify({ evaluation, result, errors, screenshot: screenshot || null }, null, 2));
  if (result.registryCount !== expected || result.tileCount !== expected || !result.card || !result.booted || result.failed || !result.bodyText || errors.length) process.exitCode = 1;
}

main().catch(error => { console.error(error); process.exitCode = 1; });

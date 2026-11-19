// Executed in a fresh browser page per case. The captured source stays literal.
async function runOriginal({ original, observation, config, font, retain = true, expected = null }) {
  const fontBytes = Uint8Array.from(atob(font), ch => ch.charCodeAt(0));
  for (const name of ['Geist Mono', 'JetBrains Mono']) {
    const face = new FontFace(name, fontBytes, { weight: '100 900' });
    await face.load(); document.fonts.add(face);
  }
  await document.fonts.ready;
  document.body.style.margin = '0';
  const style = document.createElement('style'); style.textContent = original.css; document.head.append(style);
  document.body.innerHTML = original.html;
  const root = document.body.firstElementChild;
  root.style.cssText = 'position:absolute;left:0;top:0;width:' + config.size[0] + 'px;height:' + (config.size[1] + 96) + 'px;';
  const scene = root.querySelector('[class$="-scene"],[class$="-stage"]');
  scene.style.cssText = 'position:absolute;left:0;top:0;right:auto;bottom:auto;width:' + config.size[0] + 'px;height:' + config.size[1] + 'px;border:0;padding:0;';
  const canvas = scene.querySelector('canvas');
  canvas.style.cssText = 'display:block;width:100%;height:100%;';
  const encode = bytes => {
    let result = '';
    for (let offset = 0; offset < bytes.length; offset += 8192)
      result += String.fromCharCode(...bytes.subarray(offset, offset + 8192));
    return btoa(result);
  };
  const digest = async value => Array.from(new Uint8Array(await crypto.subtle.digest('SHA-256',
    new TextEncoder().encode(JSON.stringify(value)))), x => x.toString(16).padStart(2, '0')).join('');
  const pack = value => {
    if (typeof value === 'number' && (!Number.isFinite(value) || Object.is(value, -0)))
      return { $number: Object.is(value, -0) ? '-0' : String(value) };
    if (Array.isArray(value)) {
      if (value.length && value.every(item => typeof item === 'number')) {
        const byteArray = value.every(item => Number.isInteger(item) && item >= 0 && item <= 255 && !Object.is(item, -0));
        const bytes = new Uint8Array(value.length * (byteArray ? 1 : 8));
        if (byteArray) bytes.set(value);
        else {
          const view = new DataView(bytes.buffer);
          value.forEach((item, index) => view.setFloat64(index * 8, item, true));
        }
        return { $vector: encode(bytes), format: byteArray ? 'u8' : 'f64le', length: value.length };
      }
      return value.map(pack);
    }
    if (!value || typeof value !== 'object') return value;
    return Object.fromEntries(Object.entries(value).map(([key, item]) => [key, pack(item)]));
  };
  // Round-trip checking runs in the same realm, before any data crosses JSON.
  const checkPack = (source, packed) => {
    if (Array.isArray(source)) {
      if (packed.$vector) {
        const bytes = Uint8Array.from(atob(packed.$vector), ch => ch.charCodeAt(0));
        const view = new DataView(bytes.buffer);
        for (let index = 0; index < source.length; index++) {
          const actual = packed.format === 'u8' ? bytes[index] : view.getFloat64(index * 8, true);
          if (!Object.is(actual, source[index])) throw Error('Lossy numeric vector at ' + index);
        }
      } else source.forEach((item, index) => checkPack(item, packed[index]));
    } else if (typeof source === 'number' && packed && typeof packed === 'object') {
      const actual = { Infinity, '-Infinity': -Infinity, NaN, '-0': -0 }[packed.$number];
      if (!Object.is(actual, source)) throw Error('Lossy scalar');
    } else if (source && typeof source === 'object') {
      Object.entries(source).forEach(([key, item]) => checkPack(item, packed[key]));
    } else if (!Object.is(source, packed)) throw Error('Lossy primitive');
  };
  let calls = [], nativeContext, contextOptions;
  const originalGet = canvas.getContext.bind(canvas), bound = new Map();
  canvas.getContext = (kind, options) => {
    if (kind !== '2d') throw Error('Unexpected original context ' + kind);
    if (nativeContext) throw Error('Unexpected repeated context creation');
    contextOptions = options;
    nativeContext = originalGet(kind, options);
    return new Proxy(nativeContext, {
      get(target, name) {
        const value = Reflect.get(target, name, target);
        if (typeof value !== 'function') return value;
        if (!bound.has(name)) bound.set(name, (...args) => {
          if (name !== 'measureText') {
            if (args.some(arg => arg && typeof arg === 'object')) throw Error('Unserialized canvas argument ' + name);
            calls.push(['call', name, ...args]);
          }
          return value.apply(target, args);
        });
        return bound.get(name);
      },
      set(target, name, value) { calls.push(['set', name, value]); return Reflect.set(target, name, value, target); }
    });
  };
  let now = 0, nextID = 0, docVisible = true;
  const frames = new Map(), resizeObservers = [], intersectionObservers = [];
  class RO {
    constructor(callback) { this.callback = callback; this.targets = []; resizeObservers.push(this); }
    observe(target) { this.targets.push(target); }
    disconnect() { this.targets = []; }
  }
  class IO {
    constructor(callback) { this.callback = callback; this.targets = []; intersectionObservers.push(this); }
    observe(target) { this.targets.push(target); }
    disconnect() { this.targets = []; }
  }
  Object.defineProperty(document, 'visibilityState', { configurable: true, get: () => docVisible ? 'visible' : 'hidden' });
  const raf = callback => { frames.set(++nextID, callback); return nextID; };
  const cancel = id => frames.delete(id);
  const windowProxy = { devicePixelRatio: config.dpr, ResizeObserver: RO, IntersectionObserver: IO, MutationObserver };
  const run = new Function('root', 'requestAnimationFrame', 'cancelAnimationFrame', 'ResizeObserver',
    'IntersectionObserver', 'MutationObserver', 'performance', 'window', 'matchMedia', original.js + '\n;' + observation);
  run(root, raf, cancel, RO, IO, MutationObserver, { now: () => now }, windowProxy, () => ({ matches: config.reduced }));
  for (const observer of resizeObservers) observer.callback(observer.targets.map(target => ({ target, contentRect: target.getBoundingClientRect() })));
  const setIntersection = visible => {
    for (const observer of intersectionObservers)
      if (observer.targets.length) observer.callback(observer.targets.map(target => ({ target, isIntersecting: visible })));
  };
  setIntersection(true);
  if (!root[config.inspect] || !nativeContext) throw Error('Original bootstrap incomplete');
  const dispatch = event => {
    if (event.type === 'key') {
      const target = event.target === 'scene' ? scene : event.target === 'chip' ? root.querySelector('[aria-checked="true"]') : root;
      target.dispatchEvent(new KeyboardEvent('keydown', { key: event.key, shiftKey: event.shiftKey, repeat: event.repeat, bubbles: true, cancelable: true }));
    } else if (event.type === 'pointer') {
      const box = scene.getBoundingClientRect();
      (event.target === 'canvas' ? canvas : scene).dispatchEvent(new PointerEvent(event.event, {
        clientX: box.left + scene.clientLeft + scene.clientWidth * event.u,
        clientY: box.top + scene.clientTop + scene.clientHeight * event.v,
        pointerId: event.pointerId, pointerType: event.pointerType, isPrimary: event.isPrimary,
        button: 0, buttons: /up|cancel|leave/.test(event.event) ? 0 : 1,
        bubbles: true, cancelable: true
      }));
    } else if (event.type === 'chip') root.querySelectorAll('button')[event.index].click();
    else if (event.type === 'reset') root[config.id === 'dot-matrix-shapes' ? '__dotMatrixShapesReset' : '__halftoneGlobeReset']();
    else if (event.type === 'click') scene.dispatchEvent(new MouseEvent('click', { bubbles: true, button: 0 }));
    else if (event.type === 'intersection') setIntersection(event.visible);
    else if (event.type === 'document') { docVisible = event.visible; document.dispatchEvent(new Event('visibilitychange')); }
    else {
      const input = root.querySelector('input');
      if (event.value !== undefined) { input.value = event.value; input.setSelectionRange(input.value.length, input.value.length); }
      if (event.type === 'input') input.dispatchEvent(new InputEvent('input', {
        bubbles: true, inputType: event.inputType || 'insertText', isComposing: !!event.isComposing
      }));
      else if (event.type === 'paste') input.dispatchEvent(new ClipboardEvent('paste', { bubbles: true }));
      else input.dispatchEvent(new CompositionEvent(event.type, { bubbles: true }));
    }
  };
  const checkpoints = new Set([0, 1, config.frames]);
  for (let frame = 60; frame <= config.frames; frame += 60) checkpoints.add(frame);
  for (const event of config.events) {
    checkpoints.add(Math.max(0, event.frame - 1)); checkpoints.add(event.frame); checkpoints.add(Math.min(config.frames, event.frame + 1));
  }
  const pixelsAt = new Set([0, 12, 60, 120, 190, 240, 300, 369, 400, 519, 550, 600, 660, 720, config.frames]);
  const pool = [], poolIndex = new Map();
  const intern = value => {
    if (Array.isArray(value)) return value.map(intern);
    if (!value || typeof value !== 'object') return value;
    if (value.$vector) {
      const key = value.format + ':' + value.$vector;
      if (!poolIndex.has(key)) { poolIndex.set(key, pool.length); pool.push(value); }
      return { $ref: poolIndex.get(key) };
    }
    return Object.fromEntries(Object.entries(value).map(([key, item]) => [key, intern(item)]));
  };
  const rows = [], errors = [];
  let numericValues = 0, paintedCommands = 0, nonfinite = 0, negativeZero = 0;
  const count = value => {
    if (typeof value === 'number') { numericValues++; if (!Number.isFinite(value)) nonfinite++; if (Object.is(value, -0)) negativeZero++; }
    else if (value && typeof value === 'object') Object.values(value).forEach(count);
  };
  for (let frame = 0; frame <= config.frames; frame++) {
    const events = config.events.filter(event => event.frame === frame);
    if (frame) {
      calls = [];
      events.forEach(dispatch);
      now += frame === 610 ? 150 : frame === 620 ? 1 : config.stepMS;
      const jobs = [...frames.values()]; frames.clear(); jobs.forEach(callback => callback(now));
    }
    const { data, ...inspected } = root[config.inspect]();
    const packed = pack(inspected);
    count(inspected);
    const row = { frame, now, events, data, pendingFrames: frames.size,
      modelSHA256: await digest(packed), paintSHA256: await digest(calls), paintCommands: calls.length };
    paintedCommands += calls.length;
    if (checkpoints.has(frame)) {
      checkPack(inspected, packed);
      if (retain) { row.model = intern(packed); row.paint = pack(calls); }
    }
    if (pixelsAt.has(frame)) {
      const pixels = nativeContext.getImageData(0, 0, canvas.width, canvas.height).data;
      row.pixelSHA256 = await digest(encode(pixels));
      if (retain) row.pixels = encode(pixels);
    }
    if (expected) {
      const reference = expected.rows[frame];
      for (const key of ['modelSHA256', 'paintSHA256', 'paintCommands', 'pixelSHA256', 'pendingFrames', 'now'])
        if (row[key] !== reference[key]) errors.push({ frame, key, expected: reference[key], actual: row[key] });
      if (JSON.stringify(data) !== JSON.stringify(reference.data)) errors.push({ frame, key: 'data', actual: data, expected: reference.data });
    }
    rows.push(row);
  }
  root.remove();
  await Promise.resolve(); await Promise.resolve();
  const cleanup = { pendingFrames: frames.size, resizeTargets: resizeObservers.reduce((n, item) => n + item.targets.length, 0),
    intersectionTargets: intersectionObservers.reduce((n, item) => n + item.targets.length, 0), connected: root.isConnected };
  if (cleanup.pendingFrames || cleanup.resizeTargets || cleanup.intersectionTargets || cleanup.connected) throw Error('Original cleanup incomplete');
  if (expected && JSON.stringify(cleanup) !== JSON.stringify(expected.cleanup)) throw Error('Cleanup replay diverged');
  const result = { config, contextOptions, cleanup, width: canvas.width, height: canvas.height, rows: retain ? rows : undefined,
    pool: retain ? pool : undefined, summary: { frames: config.frames + 1, numericValues, nonfinite, negativeZero,
      paintedCommands, checkpoints: checkpoints.size, pixelCheckpoints: pixelsAt.size, errors } };
  return result;
}

module.exports = { runOriginal };

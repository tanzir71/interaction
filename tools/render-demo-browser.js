/* Render the exact current registry source in an isolated CDP preview. */
const fs = require('fs');
const vm = require('vm');

const port = process.argv[2] || '9224';
const demoId = process.argv[3];
const screenshot = process.argv[4];
const width = Number(process.argv[5] || 380);
const verificationMode = process.argv[6] || 'normal';
const reducedMotion = verificationMode === 'reduce';
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

async function render(data, stageWidth, mode) {
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
  let boot = null;
  if (root.classList.contains('d-fui-boot')) {
    const waitStarted = performance.now();
    for (let index = 0; index < 120 && root.dataset.phase !== 'ready'; index++) await new Promise(resolve => setTimeout(resolve, 50));
    const rows = [...root.querySelectorAll('.d-fui-boot-line:not(.d-fui-boot-ready)')];
    const row = rows[0];
    const rowStyle = row ? getComputedStyle(row) : null;
    const progressNode = root.querySelector('.d-fui-boot-progress');
    const cursorNode = root.querySelector('.d-fui-boot-cursor');
    const readyNode = root.querySelector('.d-fui-boot-ready');
    const screenNode = root.querySelector('.d-fui-boot-screen');
    const emissionDelays = (root.dataset.emissionDelays || '').split(',').filter(Boolean).map(Number);
    const resolutionDelays = (root.dataset.resolutionDelays || '').split(',').filter(Boolean).map(Number);
    boot = {
      phase: root.dataset.phase,
      emitted: Number(root.dataset.emitted),
      resolved: Number(root.dataset.resolved),
      rows: rows.length,
      ok: root.querySelectorAll('.d-fui-boot-ok').length,
      warnings: root.querySelectorAll('.d-fui-boot-warn').length,
      pending: rows.filter(item => item.textContent.includes('..')).length,
      progress: Number(root.dataset.progress),
      progressText: progressNode.textContent,
      readyText: readyNode ? readyNode.textContent : '',
      readyColor: readyNode ? getComputedStyle(readyNode).color : '',
      rowHeight: row ? row.getBoundingClientRect().height : 0,
      lineHeight: rowStyle ? rowStyle.lineHeight : '',
      fontSize: rowStyle ? rowStyle.fontSize : '',
      fontFamily: rowStyle ? rowStyle.fontFamily : '',
      cursor: cursorNode.textContent,
      cursorDuration: getComputedStyle(cursorNode).animationDuration,
      emissionDelays,
      resolutionDelays,
      jitters: Number(root.dataset.jitters),
      cycles: Number(root.dataset.cycles),
      readyHold: root.dataset.readyHold,
      wipeDuration: root.dataset.wipeDuration,
      cursorBlink: root.dataset.cursorBlink,
      reduced: root.dataset.reduced,
      source: root.dataset.source,
      screenTransform: getComputedStyle(screenNode).transform,
      screenScrollHeight: screenNode.scrollHeight,
      screenClientHeight: screenNode.clientHeight,
      waited: performance.now() - waitStarted
    };
    if (mode === 'cycle' && root.dataset.reduced === 'false') {
      const readyCycle = Number(root.dataset.cycles);
      await new Promise(resolve => setTimeout(resolve, 2200));
      const held = root.dataset.phase === 'ready' && Number(root.dataset.cycles) === readyCycle;
      for (let index = 0; index < 40 && root.dataset.phase !== 'wiping'; index++) await new Promise(resolve => setTimeout(resolve, 20));
      const inner = root.querySelector('.d-fui-boot-screen-inner');
      const wiping = root.dataset.phase === 'wiping';
      const wipeStyle = getComputedStyle(inner);
      const animationName = wipeStyle.animationName;
      const animationDuration = wipeStyle.animationDuration;
      for (let index = 0; index < 40 && Number(root.dataset.cycles) === readyCycle; index++) await new Promise(resolve => setTimeout(resolve, 20));
      boot.cycleCheck = {
        held,
        wiping,
        animationName,
        animationDuration,
        nextCycle: Number(root.dataset.cycles),
        nextPhase: root.dataset.phase,
        nextRows: root.querySelectorAll('.d-fui-boot-line:not(.d-fui-boot-ready)').length
      };
    }
    if (root.dataset.reduced === 'true') {
      const before = [root.dataset.phase, root.dataset.cycles, root.dataset.progress, root.querySelector('.d-fui-boot-lines').textContent];
      await new Promise(resolve => setTimeout(resolve, 3100));
      const after = [root.dataset.phase, root.dataset.cycles, root.dataset.progress, root.querySelector('.d-fui-boot-lines').textContent];
      boot.stable = before.every((value, index) => value === after[index]);
    }
  }
  let scope = null;
  if (root.classList.contains('d-fui-scope')) {
    const scopeReduced = mode === 'reduce';
    const scopeCanvas = root.querySelector('.d-fui-scope-canvas');
    const scopeReadout = root.querySelector('.d-fui-scope-values');
    const holdChip = root.querySelector('.d-fui-scope-hold');
    const checksum = function() {
      const pixels = scopeCanvas.getContext('2d').getImageData(0, 0, scopeCanvas.width, scopeCanvas.height).data;
      let hash = 2166136261;
      for (let index = 0; index < pixels.length; index += 97) hash = Math.imul(hash ^ pixels[index], 16777619);
      return hash >>> 0;
    };
    const canvasRect = scopeCanvas.getBoundingClientRect();
    const dpr = Math.min(2, devicePixelRatio || 1);
    const initial = { readout: scopeReadout.textContent, phase: Number(root.dataset.phase), frequency: Number(root.dataset.frequency), amplitude: Number(root.dataset.amplitude), frames: Number(root.dataset.frames), draws: Number(root.dataset.draws), checksum: checksum() };
    await new Promise(resolve => setTimeout(resolve, scopeReduced ? 600 : 140));
    const idle = { phase: Number(root.dataset.phase), frames: Number(root.dataset.frames), draws: Number(root.dataset.draws), checksum: checksum() };
    const pointerBefore = { frequency: Number(root.dataset.frequency), amplitude: Number(root.dataset.amplitude) };
    scopeCanvas.dispatchEvent(new PointerEvent('pointermove', { bubbles: true, clientX: canvasRect.left + canvasRect.width * .75, clientY: canvasRect.top + canvasRect.height * .25 }));
    await new Promise(resolve => setTimeout(resolve, scopeReduced ? 0 : 100));
    const pointer = { targetFrequency: Number(root.dataset.targetFrequency), targetAmplitude: Number(root.dataset.targetAmplitude), frequency: Number(root.dataset.frequency), amplitude: Number(root.dataset.amplitude), readout: scopeReadout.textContent, draws: Number(root.dataset.draws), checksum: checksum() };
    await new Promise(resolve => setTimeout(resolve, scopeReduced ? 300 : 700));
    const pointerStable = { frames: Number(root.dataset.frames), draws: Number(root.dataset.draws), checksum: checksum() };
    scopeCanvas.click();
    const holdStart = { phase: root.dataset.phase, frequency: root.dataset.frequency, amplitude: root.dataset.amplitude, draws: Number(root.dataset.draws), checksum: checksum(), holding: root.dataset.holding, ariaPressed: scopeCanvas.getAttribute('aria-pressed') };
    scopeCanvas.dispatchEvent(new PointerEvent('pointermove', { bubbles: true, clientX: canvasRect.left + canvasRect.width * .25, clientY: canvasRect.top + canvasRect.height * .75 }));
    await new Promise(resolve => setTimeout(resolve, scopeReduced ? 300 : 220));
    const holdStyle = getComputedStyle(holdChip);
    const frozen = { phase: root.dataset.phase, frequency: root.dataset.frequency, amplitude: root.dataset.amplitude, targetFrequency: root.dataset.targetFrequency, targetAmplitude: root.dataset.targetAmplitude, draws: Number(root.dataset.draws), checksum: checksum(), holding: root.dataset.holding, color: holdStyle.color, opacity: holdStyle.opacity, ariaPressed: scopeCanvas.getAttribute('aria-pressed') };
    await new Promise(resolve => setTimeout(resolve, scopeReduced ? 1250 : 1380));
    const released = { phase: Number(root.dataset.phase), draws: Number(root.dataset.draws), checksum: checksum(), holding: root.dataset.holding, ariaPressed: scopeCanvas.getAttribute('aria-pressed') };
    scopeCanvas.focus();
    scopeCanvas.dispatchEvent(new KeyboardEvent('keydown', { key: ' ', bubbles: true, cancelable: true }));
    await new Promise(resolve => setTimeout(resolve, scopeReduced ? 20 : 150));
    scope = {
      canvas: { clientWidth: canvasRect.width, clientHeight: canvasRect.height, width: scopeCanvas.width, height: scopeCanvas.height, dpr },
      metadata: { gridColumns: root.dataset.gridColumns, gridRows: root.dataset.gridRows, trailDecay: root.dataset.trailDecay, fadeAlpha: root.dataset.fadeAlpha, coreStroke: root.dataset.coreStroke, glowStroke: root.dataset.glowStroke, gridStroke: root.dataset.gridStroke, axisStroke: root.dataset.axisStroke, buffer: root.dataset.buffer, lerp: root.dataset.lerp, holdDuration: root.dataset.holdDuration },
      initial,
      idle,
      pointerBefore,
      pointer,
      pointerStable,
      holdStart,
      frozen,
      released,
      keyboard: { holding: root.dataset.holding, source: root.dataset.source, ariaPressed: scopeCanvas.getAttribute('aria-pressed'), focused: document.activeElement === scopeCanvas, color: getComputedStyle(holdChip).color, opacity: getComputedStyle(holdChip).opacity },
      reduced: root.dataset.reduced,
      finalReadout: scopeReadout.textContent
    };
  }
  let scanner = null;
  if (root.classList.contains('d-fui-scan')) {
    const scannerReduced = mode === 'reduce';
    const scannerPanel = root.querySelector('.d-fui-scan-panel');
    const scannerPlot = root.querySelector('.d-fui-scan-plot');
    const scannerSweep = root.querySelector('.d-fui-scan-sweep');
    const scannerReadout = root.querySelector('.d-fui-scan-frequency');
    const scannerBracket = root.querySelector('.d-fui-scan-bracket');
    const scannerStatus = root.querySelector('.d-fui-scan-status');
    const scannerBars = [...root.querySelectorAll('.d-fui-scan-bar')];
    const scannerBodies = [...root.querySelectorAll('.d-fui-scan-body')];
    const scannerTips = [...root.querySelectorAll('.d-fui-scan-tip')];
    const scannerPlotRect = scannerPlot.getBoundingClientRect();
    const scannerBarRects = scannerBars.map(item => item.getBoundingClientRect());
    const scannerTipRect = scannerTips[0].getBoundingClientRect();
    const scannerSweepStyle = getComputedStyle(scannerSweep);
    const scannerInitial = {
      readout: scannerReadout.textContent,
      frequency: root.dataset.frequency,
      selectedStart: root.dataset.selectedStart,
      selectedCount: Number(root.dataset.selectedCount),
      selectedColor: getComputedStyle(scannerBodies[29]).backgroundColor,
      bodyColor: getComputedStyle(scannerBodies[63]).backgroundColor,
      tipColor: getComputedStyle(scannerTips[63]).backgroundColor,
      ariaMin: scannerPanel.getAttribute('aria-valuemin'),
      ariaMax: scannerPanel.getAttribute('aria-valuemax'),
      ariaNow: scannerPanel.getAttribute('aria-valuenow'),
      deltaText: root.querySelector('.d-fui-scan-footer span:nth-child(2)').textContent,
      frames: Number(root.dataset.frames),
      sweepX: Number(root.dataset.sweepX),
      contacts: Number(root.dataset.contacts),
      firstContactDelay: Number(root.dataset.nextContactDelay)
    };
    let scannerLinear = null;
    if (!scannerReduced) {
      const before = { time: Number(root.dataset.simulationTime), x: Number(root.dataset.sweepX) };
      await new Promise(resolve => setTimeout(resolve, 160));
      const after = { time: Number(root.dataset.simulationTime), x: Number(root.dataset.sweepX) };
      let deltaX = after.x - before.x;
      if (deltaX < 0) deltaX += 191;
      scannerLinear = { deltaTime: after.time - before.time, deltaX, rate: deltaX / Math.max(1, after.time - before.time) };
    }
    let pulseScale = 1;
    let pulseColor = '';
    let pulseBar = null;
    if (!scannerReduced) {
      for (let attempt = 0; attempt < 120 && pulseScale < 1.1; attempt++) {
        await new Promise(resolve => setTimeout(resolve, 16));
        for (const bar of scannerBars) {
          if (!bar.classList.contains('d-fui-scan-is-swept') || bar.classList.contains('d-fui-scan-is-selected')) continue;
          const bodyStyle = getComputedStyle(bar.querySelector('.d-fui-scan-body'));
          const transform = bodyStyle.transform === 'none' ? 1 : new DOMMatrix(bodyStyle.transform).d;
          pulseScale = Math.max(pulseScale, transform);
          if (transform === pulseScale) pulseBar = bar;
        }
      }
      if (pulseBar) {
        await new Promise(resolve => setTimeout(resolve, 180));
        pulseColor = getComputedStyle(pulseBar.querySelector('.d-fui-scan-body')).backgroundColor;
      }
    }
    scannerPanel.dispatchEvent(new PointerEvent('pointermove', { bubbles: true, clientX: scannerPlotRect.left + scannerPlotRect.width * .72, clientY: scannerPlotRect.top + scannerPlotRect.height * .55 }));
    await new Promise(resolve => setTimeout(resolve, 210));
    const scannerPointer = {
      selectedStart: Number(root.dataset.selectedStart),
      selectedCount: Number(root.dataset.selectedCount),
      frequency: root.dataset.frequency,
      readout: scannerReadout.textContent,
      source: root.dataset.selectionSource,
      colors: scannerBars.filter(item => item.classList.contains('d-fui-scan-is-selected')).map(item => getComputedStyle(item.querySelector('.d-fui-scan-body')).backgroundColor),
      bracket: (function(){const box=scannerBracket.getBoundingClientRect();const selected=scannerBars.filter(item=>item.classList.contains('d-fui-scan-is-selected')).map(item=>item.getBoundingClientRect());return {left:box.left,right:box.right,top:box.top,bottom:box.bottom,width:box.width,center:box.left+box.width/2,selectedLeft:selected[0].left,selectedRight:selected[selected.length-1].right,selectedTop:Math.min(...selected.map(item=>item.top)),selectedCenter:(selected[0].left+selected[selected.length-1].right)/2}})()
    };
    let scannerPause = null;
    if (!scannerReduced) {
      for (let attempt = 0; attempt < 240 && root.dataset.paused !== 'true'; attempt++) await new Promise(resolve => setTimeout(resolve, 20));
      const pausedAt = Number(root.dataset.sweepX);
      const pauseFound = root.dataset.paused === 'true';
      await new Promise(resolve => setTimeout(resolve, 350));
      const stableAt = Number(root.dataset.sweepX);
      await new Promise(resolve => setTimeout(resolve, 600));
      const resumedAt = Number(root.dataset.sweepX);
      scannerPause = { found: pauseFound, pausedAt, stableAt, resumedAt, pauses: Number(root.dataset.pauses) };
    }
    const stableBefore = { frames: Number(root.dataset.frames), sweepX: root.dataset.sweepX, contacts: Number(root.dataset.contacts) };
    if (scannerReduced) await new Promise(resolve => setTimeout(resolve, 750));
    const stableAfter = { frames: Number(root.dataset.frames), sweepX: root.dataset.sweepX, contacts: Number(root.dataset.contacts) };
    if (!scannerReduced) {
      for (let attempt = 0; attempt < 550 && root.dataset.contactActive !== 'true'; attempt++) await new Promise(resolve => setTimeout(resolve, 20));
    }
    const scannerContactBar = Number(root.dataset.contactIndex) >= 0 ? scannerBars[Number(root.dataset.contactIndex)] : null;
    const scannerContactBody = scannerContactBar && scannerContactBar.querySelector('.d-fui-scan-body');
    const scannerBlip = scannerContactBar && scannerContactBar.querySelector('.d-fui-scan-blip');
    const scannerContactTip = scannerContactBar && scannerContactBar.querySelector('.d-fui-scan-tip');
    const scannerContactStyle = scannerContactBody ? getComputedStyle(scannerContactBody) : null;
    const scannerBlipRect = scannerBlip ? scannerBlip.getBoundingClientRect() : null;
    const scannerContactTipRect = scannerContactTip ? scannerContactTip.getBoundingClientRect() : null;
    const scannerContact = {
      active: root.dataset.contactActive,
      index: Number(root.dataset.contactIndex),
      contacts: Number(root.dataset.contacts),
      scale: scannerContactStyle && scannerContactStyle.transform !== 'none' ? new DOMMatrix(scannerContactStyle.transform).d : 0,
      blipColor: scannerBlip ? getComputedStyle(scannerBlip).backgroundColor : '',
      blipOpacity: scannerBlip ? Number(getComputedStyle(scannerBlip).opacity) : 0,
      blipWidth: scannerBlipRect ? scannerBlipRect.width : 0,
      blipHeight: scannerBlipRect ? scannerBlipRect.height : 0,
      tipWidth: scannerContactTipRect ? scannerContactTipRect.width : 0,
      tipHeight: scannerContactTipRect ? scannerContactTipRect.height : 0,
      status: scannerStatus.textContent,
      statusColor: getComputedStyle(scannerStatus).color
    };
    let scannerContactFading = null;
    let scannerContactCleared = null;
    if (!scannerReduced) {
      await new Promise(resolve => setTimeout(resolve, 1000));
      scannerContactFading = { active: root.dataset.contactActive, opacity: scannerBlip ? Number(getComputedStyle(scannerBlip).opacity) : 0, progress: Number(root.dataset.contactProgress) };
      await new Promise(resolve => setTimeout(resolve, 250));
      scannerContactCleared = { active: root.dataset.contactActive, index: Number(root.dataset.contactIndex), opacity: scannerBlip ? Number(getComputedStyle(scannerBlip).opacity) : 0, status: scannerStatus.textContent };
    }
    scannerPanel.focus();
    scannerPanel.dispatchEvent(new KeyboardEvent('keydown', { key: 'Home', bubbles: true, cancelable: true }));
    scannerPanel.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowUp', bubbles: true, cancelable: true }));
    const scannerKeyboard = { selectedStart: Number(root.dataset.selectedStart), selectedCount: Number(root.dataset.selectedCount), source: root.dataset.selectionSource, focused: document.activeElement === scannerPanel };
    scanner = {
      metadata: { barCount: root.dataset.barCount, barWidth: root.dataset.barWidth, barGap: root.dataset.barGap, tipHeight: root.dataset.tipHeight, sweepDuration: root.dataset.sweepDuration, influence: root.dataset.influence, boost: root.dataset.boost, response: root.dataset.scanResponse, pauseDuration: root.dataset.pauseDuration, contactMin: root.dataset.contactMin, contactMax: root.dataset.contactMax, contactScale: root.dataset.contactScale, contactFade: root.dataset.contactFade, bandMin: root.dataset.bandMin, bandMax: root.dataset.bandMax, bandDelta: root.dataset.bandDelta },
      geometry: { bars: scannerBars.length, bodies: scannerBodies.length, tips: scannerTips.length, plotWidth: scannerPlotRect.width, barWidth: scannerBarRects[0].width, barGap: scannerBarRects[1].left - scannerBarRects[0].right, tipHeight: scannerTipRect.height, sweepWidth: Number.parseFloat(scannerSweepStyle.width), sweepColor: scannerSweepStyle.backgroundColor, bracketWidth: scannerBracket.getBoundingClientRect().width },
      type: { topbar: getComputedStyle(root.querySelector('.d-fui-scan-topbar')).fontSize, panelHead: getComputedStyle(root.querySelector('.d-fui-scan-panel-head')).fontSize, scale: getComputedStyle(root.querySelector('.d-fui-scan-scale')).fontSize, footer: getComputedStyle(root.querySelector('.d-fui-scan-footer')).fontSize, readout: getComputedStyle(scannerReadout).fontSize },
      initial: scannerInitial,
      linear: scannerLinear,
      pulse: { scale: pulseScale, color: pulseColor },
      pointer: scannerPointer,
      pause: scannerPause,
      stable: { before: stableBefore, after: stableAfter },
      contact: scannerContact,
      contactFading: scannerContactFading,
      contactCleared: scannerContactCleared,
      keyboard: scannerKeyboard,
      reduced: root.dataset.reduced,
      running: root.dataset.running,
      scannedCount: Number(root.dataset.scannedCount),
      liveAnimation: getComputedStyle(root.querySelector('.d-fui-scan-live-dot')).animationDuration
    };
  }
  let stream = null;
  if (root.classList.contains('d-fui-stream')) {
    const streamReduced = mode === 'reduce';
    const streamPanel = root.querySelector('.d-fui-stream-panel');
    const streamColumns = [...root.querySelectorAll('.d-fui-stream-column')];
    const streamRows = [...root.querySelectorAll('.d-fui-stream-row')];
    const streamMasks = [...root.querySelectorAll('.d-fui-stream-mask')];
    const streamDecoder = root.querySelector('.d-fui-stream-decoder');
    const streamAnnouncement = root.querySelector('.d-fui-stream-announcement');
    const numbers = value => (value || '').split(',').filter(Boolean).map(Number);
    const probe = document.createElement('div');
    probe.style.cssText = 'position:absolute;left:-2000px;top:-2000px;width:'+stageWidth+'px;height:320px';
    probe.innerHTML = data.html;
    document.body.appendChild(probe);
    const probeRoot = probe.querySelector('.' + data.rootClass);
    new Function('root', 'stage', data.js)(probeRoot, probe);
    const probeInitialRows = probeRoot.dataset.initialRows;
    probe.remove();
    const valueRows = streamColumns.map(column => column.querySelectorAll('.d-fui-stream-row')[5]);
    const streamInitial = {
      values: valueRows.map(row => row.textContent),
      initialRows: root.dataset.initialRows,
      deterministic: root.dataset.initialRows === probeInitialRows,
      distances: numbers(root.dataset.distances),
      sequences: numbers(root.dataset.sequences),
      frames: Number(root.dataset.frames),
      flashes: Number(root.dataset.flashes),
      nextFlashDelay: Number(root.dataset.nextFlashDelay),
      decoderHidden: streamDecoder.hidden,
      decoderAriaHidden: streamDecoder.getAttribute('aria-hidden'),
      clippedRows: streamRows.filter(row => row.scrollWidth > row.clientWidth + 1).length
    };
    const motionBefore = { distances: numbers(root.dataset.distances), sequences: numbers(root.dataset.sequences), frames: Number(root.dataset.frames), flashes: Number(root.dataset.flashes) };
    await new Promise(resolve => setTimeout(resolve, streamReduced ? 3400 : 500));
    const motionAfter = { distances: numbers(root.dataset.distances), sequences: numbers(root.dataset.sequences), frames: Number(root.dataset.frames), flashes: Number(root.dataset.flashes) };
    const inspectColumn = streamColumns[1];
    const inspectRow = inspectColumn.querySelectorAll('.d-fui-stream-row')[7];
    inspectColumn.dispatchEvent(new PointerEvent('pointerenter', { bubbles: false }));
    inspectRow.dispatchEvent(new PointerEvent('pointermove', { bubbles: true, clientX: inspectRow.getBoundingClientRect().left + 4, clientY: inspectRow.getBoundingClientRect().top + 8 }));
    await new Promise(resolve => setTimeout(resolve, 30));
    const inspectStyle = getComputedStyle(inspectRow);
    const decoderRect = streamDecoder.getBoundingClientRect();
    const panelRect = streamPanel.getBoundingClientRect();
    const inspection = {
      paused: root.dataset.paused,
      pausedCount: Number(root.dataset.pausedCount),
      inspectedColumn: Number(root.dataset.inspectedColumn),
      packet: root.dataset.inspectedPacket,
      source: root.dataset.inspectionSource,
      background: inspectStyle.backgroundColor,
      borderLeft: inspectStyle.borderLeftWidth,
      borderColor: inspectStyle.borderLeftColor,
      ariaSelected: inspectRow.getAttribute('aria-selected'),
      decoderHidden: streamDecoder.hidden,
      decoderVisible: root.dataset.decoderVisible,
      decoderText: streamDecoder.textContent,
      decoderColor: getComputedStyle(streamDecoder).color,
      decoderWithinPanel: decoderRect.left >= panelRect.left && decoderRect.right <= panelRect.right && decoderRect.top >= panelRect.top && decoderRect.bottom <= panelRect.bottom,
      announcement: streamAnnouncement.textContent
    };
    const fadedRow = inspectColumn.querySelectorAll('.d-fui-stream-row')[2];
    fadedRow.dispatchEvent(new PointerEvent('pointermove', { bubbles: true, clientX: fadedRow.getBoundingClientRect().left + 4, clientY: fadedRow.getBoundingClientRect().top + 8 }));
    await new Promise(resolve => setTimeout(resolve, 30));
    const fadedDecoderRect = streamDecoder.getBoundingClientRect();
    const fadedInspection = { selected: fadedRow.getAttribute('aria-selected'), packet: root.dataset.inspectedPacket, decoderVisible: root.dataset.decoderVisible, decoderWithinPanel: fadedDecoderRect.left >= panelRect.left && fadedDecoderRect.right <= panelRect.right && fadedDecoderRect.top >= panelRect.top && fadedDecoderRect.bottom <= panelRect.bottom };
    const hoverBefore = { distances: numbers(root.dataset.distances), sequences: numbers(root.dataset.sequences) };
    await new Promise(resolve => setTimeout(resolve, streamReduced ? 400 : 700));
    const hoverAfter = { distances: numbers(root.dataset.distances), sequences: numbers(root.dataset.sequences) };
    inspectColumn.dispatchEvent(new PointerEvent('pointerleave', { bubbles: false }));
    const releaseStart = numbers(root.dataset.distances);
    await new Promise(resolve => setTimeout(resolve, 250));
    const release = { distances: numbers(root.dataset.distances), decoderHidden: streamDecoder.hidden, inspected: root.dataset.inspectedColumn, highlighted: root.querySelectorAll('.d-fui-stream-is-inspected').length, pausedCount: Number(root.dataset.pausedCount) };
    const keyboardColumn = streamColumns[0];
    keyboardColumn.focus();
    keyboardColumn.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowDown', bubbles: true, cancelable: true }));
    const activeId = keyboardColumn.getAttribute('aria-activedescendant');
    const activeRow = activeId ? document.getElementById(activeId) : null;
    const activeRect = activeRow ? activeRow.getBoundingClientRect() : null;
    const activeViewportRect = keyboardColumn.querySelector('.d-fui-stream-viewport').getBoundingClientRect();
    const keyboard = {
      focused: document.activeElement === keyboardColumn,
      pausedCount: Number(root.dataset.pausedCount),
      source: root.dataset.inspectionSource,
      activeId,
      ariaSelected: activeRow ? activeRow.getAttribute('aria-selected') : '',
      visible: activeRect ? activeRect.top + activeRect.height / 2 >= activeViewportRect.top + 32 && activeRect.top + activeRect.height / 2 <= activeViewportRect.bottom - 32 : false
    };
    keyboardColumn.blur();
    let flash = null;
    if (!streamReduced) {
      for (let attempt = 0; attempt < 120 && root.dataset.flashActive !== 'true'; attempt++) await new Promise(resolve => setTimeout(resolve, 20));
      const flashRow = root.querySelector('.d-fui-stream-is-flash');
      const flashStyle = flashRow ? getComputedStyle(flashRow, '::after') : null;
      const started = { active: root.dataset.flashActive, count: Number(root.dataset.flashes), column: Number(root.dataset.flashColumn), background: flashStyle ? flashStyle.backgroundColor : '', opacity: flashStyle ? flashStyle.opacity : '', rows: root.querySelectorAll('.d-fui-stream-is-flash').length };
      await new Promise(resolve => setTimeout(resolve, 300));
      const beforeEnd = { active: root.dataset.flashActive, progress: Number(root.dataset.flashProgress) };
      await new Promise(resolve => setTimeout(resolve, 150));
      const cleared = { active: root.dataset.flashActive, rows: root.querySelectorAll('.d-fui-stream-is-flash').length };
      flash = { started, beforeEnd, cleared };
    }
    stream = {
      metadata: { columns: root.dataset.columnCount, speeds: root.dataset.speeds, rowHeight: root.dataset.rowHeight, rowFont: root.dataset.rowFont, fadeHeight: root.dataset.fadeHeight, flashMin: root.dataset.flashMin, flashMax: root.dataset.flashMax, flashDuration: root.dataset.flashDuration },
      structure: { columns: streamColumns.length, rows: streamRows.length, headings: streamColumns.map(column => column.querySelector('header span').textContent), rowHeight: streamRows[0].getBoundingClientRect().height, rowFont: getComputedStyle(streamRows[0]).fontSize, rowFamily: getComputedStyle(streamRows[0]).fontFamily, masks: streamMasks.map(mask => ({ height: mask.getBoundingClientRect().height, pointerEvents: getComputedStyle(mask).pointerEvents })), topbarFont: getComputedStyle(root.querySelector('.d-fui-stream-topbar')).fontSize, panelHeadFont: getComputedStyle(root.querySelector('.d-fui-stream-panel-head')).fontSize, columnHeadFont: getComputedStyle(streamColumns[0].querySelector('header')).fontSize, decoderFont: getComputedStyle(streamDecoder).fontSize, footerFont: getComputedStyle(root.querySelector('.d-fui-stream-footer')).fontSize },
      initial: streamInitial,
      motion: { before: motionBefore, after: motionAfter },
      inspection,
      fadedInspection,
      hover: { before: hoverBefore, after: hoverAfter },
      release: { start: releaseStart, end: release },
      keyboard,
      flash,
      final: { frames: Number(root.dataset.frames), flashes: Number(root.dataset.flashes), distances: numbers(root.dataset.distances), pausedCount: Number(root.dataset.pausedCount), decoderHidden: streamDecoder.hidden, running: root.dataset.running, liveAnimation: getComputedStyle(root.querySelector('.d-fui-stream-live-dot')).animationDuration },
      reduced: root.dataset.reduced
    };
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
    boot,
    scope,
    scanner,
    stream,
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
  await send('Emulation.setEmulatedMedia', { features: [{ name: 'prefers-reduced-motion', value: reducedMotion ? 'reduce' : 'no-preference' }] });
  const expression = '(' + render.toString() + ')(' + JSON.stringify(demo) + ',' + width + ',' + JSON.stringify(verificationMode) + ')';
  const evaluated = await send('Runtime.evaluate', { expression, awaitPromise: true, returnByValue: true });
  if (evaluated.exceptionDetails) throw new Error(evaluated.exceptionDetails.text);
  const result = evaluated.result.value;
  const jpeg = /\.jpe?g$/i.test(screenshot);
  const image = await send('Page.captureScreenshot', { format: jpeg ? 'jpeg' : 'png', quality: jpeg ? 72 : undefined, fromSurface: true, captureBeyondViewport: false, clip: result.clip });
  fs.writeFileSync(screenshot, Buffer.from(image.data, 'base64'));
  ws.close();
  console.log(JSON.stringify({ result, errors, screenshot }, null, 2));
  const fuiFailed = demoId === 'fui-status-dashboard' && (result.panels !== 4 || result.segments !== 12 || result.diagnostics !== 5 || result.focusables !== 4 || !result.interaction || result.interaction.metricBefore !== '12px' || result.interaction.metricAfter !== '14px' || result.interaction.cornerColor !== 'rgb(167, 139, 250)' || !result.interaction.focused);
  const lock = result.lock && result.lock.interaction;
  const lockFailed = demoId === 'fui-target-lock' && (!lock || result.lock.chips !== 4 || result.focusables !== 4 || result.lock.brackets !== 4 || Math.abs(lock.chip.width - 128) > .1 || Math.abs(lock.chip.height - 44) > .1 || lock.bracketRects.some(item => item.width !== 10 || item.height !== 10 || item.opacity !== '1') || lock.bracketStroke !== '2px' || lock.circleSize !== '20px' || lock.gridSize !== '24px 24px' || !/^W:128 H:44 X:\d+ Y:\d+$/.test(lock.readout) || lock.dataReadout !== lock.readout || lock.locked !== 'true' || lock.source !== 'keyboard' || lock.animationDuration !== '1.6s' || !lock.focused || Math.hypot(lock.reticleAfter.x - lock.pointerTarget.x, lock.reticleAfter.y - lock.pointerTarget.y) >= Math.hypot(lock.reticleBefore.x - lock.pointerTarget.x, lock.reticleBefore.y - lock.pointerTarget.y) || Math.hypot(lock.reticleAfter.x - lock.pointerTarget.x, lock.reticleAfter.y - lock.pointerTarget.y) < 10 || lock.afterBlur.locked !== 'false' || lock.afterBlur.active !== '' || lock.afterBlur.readout !== '' || lock.afterBlur.bracketOpacities.some(value => value !== '0') || lock.visualState.locked !== 'true' || lock.visualState.readout !== lock.readout);
  const boot = result.boot;
  const bootCommonFailed = !boot || boot.phase !== 'ready' || boot.emitted !== 14 || boot.resolved !== 14 || boot.rows !== 14 || boot.ok !== 13 || boot.warnings !== 1 || boot.pending !== 0 || boot.progress !== 24 || boot.progressText !== '████████████████████████' || boot.readyText !== 'READY.' || boot.readyColor !== 'rgb(167, 139, 250)' || boot.rowHeight !== 15 || boot.lineHeight !== '15px' || boot.fontSize !== '12px' || !boot.fontFamily.includes('JetBrains Mono') || boot.cursor !== '▮' || boot.emissionDelays.length !== 14 || boot.emissionDelays.some(value => value < 90 || value > 200) || boot.resolutionDelays.length !== 14 || boot.resolutionDelays.some(value => value < 300 || value > 900) || boot.readyHold !== '2500' || boot.wipeDuration !== '250' || boot.cursorBlink !== '530' || boot.screenScrollHeight > boot.screenClientHeight || boot.waited > 6000;
  const bootMotionFailed = reducedMotion ? !boot || boot.reduced !== 'true' || boot.cursorDuration !== '0s' || boot.jitters !== 0 || boot.cycles !== 0 || boot.source !== 'reduced' || boot.stable !== true : !boot || boot.reduced !== 'false' || boot.cursorDuration !== '0.53s' || boot.jitters !== 1 || boot.cycles !== 1;
  const bootCycleFailed = verificationMode === 'cycle' && (!boot || !boot.cycleCheck || boot.cycleCheck.held !== true || boot.cycleCheck.wiping !== true || boot.cycleCheck.animationName !== 'd-fui-boot-wipe' || boot.cycleCheck.animationDuration !== '0.25s' || boot.cycleCheck.nextCycle !== 2 || boot.cycleCheck.nextPhase !== 'booting' || boot.cycleCheck.nextRows > 1);
  const bootFailed = demoId === 'fui-terminal-boot' && (bootCommonFailed || bootMotionFailed || bootCycleFailed);
  const scope = result.scope;
  const scopeCommonFailed = !scope || scope.canvas.width !== Math.round(scope.canvas.clientWidth * scope.canvas.dpr) || scope.canvas.height !== Math.round(scope.canvas.clientHeight * scope.canvas.dpr) || scope.metadata.gridColumns !== '8' || scope.metadata.gridRows !== '6' || scope.metadata.trailDecay !== '0.88' || scope.metadata.fadeAlpha !== '0.12' || scope.metadata.coreStroke !== '2' || scope.metadata.glowStroke !== '7' || scope.metadata.gridStroke !== '#232327' || scope.metadata.axisStroke !== '#2e2e34' || scope.metadata.buffer !== 'offscreen' || scope.metadata.lerp !== '0.08' || scope.metadata.holdDuration !== '1500' || scope.initial.readout !== 'FREQ 2.40kHz / AMP 62%' || scope.pointer.targetFrequency !== 6.125 || scope.pointer.targetAmplitude !== .7 || scope.holdStart.holding !== 'true' || scope.holdStart.ariaPressed !== 'true' || scope.frozen.holding !== 'true' || scope.frozen.color !== 'rgb(251, 191, 36)' || scope.frozen.opacity !== '1' || scope.frozen.ariaPressed !== 'true' || scope.frozen.phase !== scope.holdStart.phase || scope.frozen.frequency !== scope.holdStart.frequency || scope.frozen.amplitude !== scope.holdStart.amplitude || scope.frozen.targetFrequency !== scope.pointer.targetFrequency.toFixed(3) || scope.frozen.targetAmplitude !== scope.pointer.targetAmplitude.toFixed(3) || scope.frozen.draws !== scope.holdStart.draws || scope.frozen.checksum !== scope.holdStart.checksum || scope.released.holding !== 'false' || scope.released.ariaPressed !== 'false' || scope.keyboard.holding !== 'true' || scope.keyboard.source !== 'keyboard' || scope.keyboard.ariaPressed !== 'true' || !scope.keyboard.focused || scope.keyboard.color !== 'rgb(251, 191, 36)' || scope.keyboard.opacity !== '1';
  const scopeMotionFailed = reducedMotion ? !scope || scope.reduced !== 'true' || scope.initial.frames !== 0 || scope.idle.frames !== 0 || scope.idle.draws !== scope.initial.draws || scope.idle.checksum !== scope.initial.checksum || scope.pointer.frequency !== 6.125 || scope.pointer.amplitude !== .7 || scope.pointer.readout !== 'FREQ 6.13kHz / AMP 70%' || scope.pointer.draws !== scope.initial.draws + 1 || scope.pointer.checksum === scope.initial.checksum || scope.pointerStable.frames !== 0 || scope.pointerStable.draws !== scope.pointer.draws || scope.pointerStable.checksum !== scope.pointer.checksum || scope.released.draws !== scope.frozen.draws : !scope || scope.reduced !== 'false' || scope.idle.frames <= scope.initial.frames || scope.idle.draws <= scope.initial.draws || scope.idle.phase <= scope.initial.phase || scope.idle.checksum === scope.initial.checksum || scope.pointer.frequency <= scope.pointerBefore.frequency || scope.pointer.frequency >= scope.pointer.targetFrequency || scope.pointer.amplitude <= scope.pointerBefore.amplitude || scope.pointer.amplitude >= scope.pointer.targetAmplitude || scope.released.draws <= scope.frozen.draws || scope.released.phase <= Number(scope.frozen.phase) || scope.released.checksum === scope.frozen.checksum;
  const scopeFailed = demoId === 'fui-waveform-scope' && (scopeCommonFailed || scopeMotionFailed);
  const scanner = result.scanner;
  const scannerCommonFailed = !scanner
    || scanner.metadata.barCount !== '64' || scanner.metadata.barWidth !== '2' || scanner.metadata.barGap !== '1' || scanner.metadata.tipHeight !== '2'
    || scanner.metadata.sweepDuration !== '3200' || scanner.metadata.influence !== '20' || scanner.metadata.boost !== '1.15' || scanner.metadata.response !== '200'
    || scanner.metadata.pauseDuration !== '800' || scanner.metadata.contactMin !== '6000' || scanner.metadata.contactMax !== '10000' || scanner.metadata.contactScale !== '2' || scanner.metadata.contactFade !== '1200'
    || scanner.metadata.bandMin !== '91.2' || scanner.metadata.bandMax !== '165.6' || scanner.metadata.bandDelta !== '1.28'
    || scanner.geometry.bars !== 64 || scanner.geometry.bodies !== 64 || scanner.geometry.tips !== 64 || scanner.geometry.plotWidth !== 191 || scanner.geometry.barWidth !== 2 || scanner.geometry.barGap !== 1 || scanner.geometry.tipHeight !== 2
    || scanner.geometry.sweepWidth !== 1 || scanner.geometry.sweepColor !== 'rgb(167, 139, 250)' || scanner.geometry.bracketWidth !== 25
    || scanner.type.topbar !== '10px' || scanner.type.panelHead !== '10px' || scanner.type.scale !== '10px' || scanner.type.footer !== '10px' || scanner.type.readout !== '12px'
    || scanner.initial.readout !== '128.4MHz' || scanner.initial.frequency !== '128.4' || scanner.initial.selectedStart !== '29' || scanner.initial.selectedCount !== 6
    || scanner.initial.ariaMin !== '91.2' || scanner.initial.ariaMax !== '165.6' || scanner.initial.ariaNow !== '128.4' || scanner.initial.deltaText !== 'Δ 1.28MHz'
    || scanner.initial.selectedColor !== 'rgb(103, 232, 249)' || scanner.initial.bodyColor !== 'rgb(92, 92, 102)' || scanner.initial.tipColor !== 'rgb(167, 139, 250)'
    || scanner.pointer.selectedCount !== 6 || scanner.pointer.source !== 'pointer' || !/^\d{3}\.\dMHz$/.test(scanner.pointer.readout) || scanner.pointer.colors.some(color => color !== 'rgb(103, 232, 249)')
    || scanner.pointer.bracket.left > scanner.pointer.bracket.selectedLeft || scanner.pointer.bracket.right < scanner.pointer.bracket.selectedRight || Math.abs(scanner.pointer.bracket.center - scanner.pointer.bracket.selectedCenter) > .1 || scanner.pointer.bracket.bottom >= scanner.pointer.bracket.selectedTop
    || scanner.keyboard.selectedStart !== 1 || scanner.keyboard.selectedCount !== 6 || scanner.keyboard.source !== 'keyboard' || !scanner.keyboard.focused
    || scanner.contact.active !== 'true' || scanner.contact.index < 0 || scanner.contact.index > 63 || scanner.contact.scale !== 2 || scanner.contact.blipColor !== 'rgb(248, 113, 113)' || scanner.contact.blipOpacity <= 0
    || scanner.contact.tipWidth !== 2 || scanner.contact.tipHeight !== 2 || scanner.contact.blipWidth < 3 || scanner.contact.blipWidth > 6 || Math.abs(scanner.contact.blipWidth - scanner.contact.blipHeight) > .1
    || scanner.contact.status !== 'CONTACT' || scanner.contact.statusColor !== 'rgb(248, 113, 113)' || scanner.scannedCount < 1 || scanner.scannedCount > 14;
  const scannerMotionFailed = reducedMotion
    ? !scanner || scanner.reduced !== 'true' || scanner.initial.frames !== 0 || scanner.stable.before.frames !== 0 || scanner.stable.after.frames !== 0 || scanner.stable.before.sweepX !== scanner.stable.after.sweepX || scanner.stable.before.contacts !== scanner.stable.after.contacts || scanner.contact.index !== 47 || scanner.running !== 'false' || scanner.liveAnimation !== '0s'
    : !scanner || scanner.reduced !== 'false' || scanner.initial.frames <= 0 || scanner.initial.firstContactDelay < 6000 || scanner.initial.firstContactDelay > 10000
      || !scanner.linear || scanner.linear.deltaTime < 100 || Math.abs(scanner.linear.rate - 191 / 3200) > .004
      || scanner.pulse.scale <= 1.1 || scanner.pulse.scale > 1.151 || scanner.pulse.color !== 'rgb(236, 236, 239)'
      || !scanner.pause || !scanner.pause.found || Math.abs(scanner.pause.pausedAt - scanner.pause.stableAt) > .01 || Math.abs(scanner.pause.resumedAt - scanner.pause.pausedAt) < 1 || scanner.pause.pauses < 1
      || !scanner.contactFading || scanner.contactFading.active !== 'true' || scanner.contactFading.opacity <= 0 || scanner.contactFading.opacity >= scanner.contact.blipOpacity || scanner.contactFading.progress < .7 || scanner.contactFading.progress > .95
      || !scanner.contactCleared || scanner.contactCleared.active !== 'false' || scanner.contactCleared.index !== -1 || scanner.contactCleared.opacity !== 0 || scanner.contactCleared.status !== 'CLEAR';
  const scannerFailed = demoId === 'fui-signal-scanner' && (scannerCommonFailed || scannerMotionFailed);
  const stream = result.stream;
  const streamCommonFailed = !stream
    || stream.metadata.columns !== '4' || stream.metadata.speeds !== '18,24,30,22' || stream.metadata.rowHeight !== '16' || stream.metadata.rowFont !== '10' || stream.metadata.fadeHeight !== '32'
    || stream.metadata.flashMin !== '2700' || stream.metadata.flashMax !== '3300' || stream.metadata.flashDuration !== '400'
    || stream.structure.columns !== 4 || stream.structure.rows !== 72 || stream.structure.headings.join(',') !== 'HEX,COORD,TIME,STATUS' || stream.structure.rowHeight !== 16 || stream.structure.rowFont !== '10px' || !stream.structure.rowFamily.includes('JetBrains Mono')
    || stream.structure.masks.length !== 2 || stream.structure.masks.some(mask => mask.height !== 32 || mask.pointerEvents !== 'none')
    || stream.structure.topbarFont !== '10px' || stream.structure.panelHeadFont !== '10px' || stream.structure.columnHeadFont !== '10px' || stream.structure.decoderFont !== '10px' || stream.structure.footerFont !== '10px'
    || !stream.initial.deterministic || stream.initial.decoderHidden !== true || stream.initial.decoderAriaHidden !== 'true' || stream.initial.clippedRows !== 0
    || !/^0x[0-9A-F]{4}$/.test(stream.initial.values[0]) || !/^-?\d{1,2}\.\d{2},-?\d{1,3}\.\d$/.test(stream.initial.values[1]) || !/^\d{2}:\d{2}:\d{2}\.\d{3}$/.test(stream.initial.values[2]) || !/^(VALID|SYNC|NOMINAL|QUEUED|RETRY)$/.test(stream.initial.values[3])
    || stream.inspection.paused !== '0,1,0,0' || stream.inspection.pausedCount !== 1 || stream.inspection.inspectedColumn !== 1 || stream.inspection.source !== 'pointer'
    || stream.inspection.background !== 'rgb(22, 22, 25)' || stream.inspection.borderLeft !== '2px' || stream.inspection.borderColor !== 'rgb(46, 46, 52)' || stream.inspection.ariaSelected !== 'true'
    || stream.inspection.decoderHidden !== false || stream.inspection.decoderVisible !== 'true' || stream.inspection.decoderText !== '→ PACKET VALID' || stream.inspection.decoderColor !== 'rgb(74, 222, 128)' || !stream.inspection.decoderWithinPanel || !stream.inspection.announcement.startsWith('Packet valid, ')
    || stream.fadedInspection.selected !== 'true' || !stream.fadedInspection.packet || stream.fadedInspection.decoderVisible !== 'true' || !stream.fadedInspection.decoderWithinPanel
    || stream.hover.after.sequences[1] !== stream.hover.before.sequences[1] || Math.abs(stream.hover.after.distances[1] - stream.hover.before.distances[1]) > .05
    || stream.release.end.decoderHidden !== true || stream.release.end.inspected !== '-1' || stream.release.end.highlighted !== 0 || stream.release.end.pausedCount !== 0
    || !stream.keyboard.focused || stream.keyboard.pausedCount !== 1 || stream.keyboard.source !== 'keyboard' || !stream.keyboard.activeId || stream.keyboard.ariaSelected !== 'true' || !stream.keyboard.visible
    || stream.final.pausedCount !== 0 || stream.final.decoderHidden !== true;
  const streamMotionFailed = reducedMotion
    ? !stream || stream.reduced !== 'true' || stream.initial.frames !== 0 || stream.motion.before.frames !== 0 || stream.motion.after.frames !== 0 || stream.motion.after.flashes !== 0 || stream.final.frames !== 0 || stream.final.flashes !== 0 || stream.final.running !== 'false' || stream.final.liveAnimation !== '0s'
      || stream.motion.after.distances.some((value, index) => Math.abs(value - stream.motion.before.distances[index]) > .01) || stream.motion.after.sequences.some((value, index) => value !== stream.motion.before.sequences[index]) || stream.flash !== null
    : !stream || stream.reduced !== 'false' || stream.initial.frames <= 0 || stream.initial.nextFlashDelay < 2700 || stream.initial.nextFlashDelay > 3300
      || [9,12,15,11].some((expected, index) => Math.abs((stream.motion.after.distances[index] - stream.motion.before.distances[index]) - expected) > 2)
      || [12.6,0,21,15.4].some((expected, index) => Math.abs((stream.hover.after.distances[index] - stream.hover.before.distances[index]) - expected) > 2.5)
      || [0,2,3].some(index => stream.hover.after.sequences[index] <= stream.hover.before.sequences[index]) || Math.abs((stream.release.end.distances[1] - stream.release.start[1]) - 6) > 2
      || !stream.flash || stream.flash.started.active !== 'true' || stream.flash.started.count !== 1 || stream.flash.started.column < 0 || stream.flash.started.column > 3 || stream.flash.started.background !== 'rgba(167, 139, 250, 0.1)' || stream.flash.started.opacity !== '1' || stream.flash.started.rows !== 1
      || stream.flash.beforeEnd.active !== 'true' || stream.flash.beforeEnd.progress < .65 || stream.flash.beforeEnd.progress > .9 || stream.flash.cleared.active !== 'false' || stream.flash.cleared.rows !== 0;
  const streamFailed = demoId === 'fui-data-stream' && (streamCommonFailed || streamMotionFailed);
  if (!result.root || result.height !== 320 || result.scrollHeight !== result.clientHeight || result.scrollWidth !== result.clientWidth || errors.length || fuiFailed || lockFailed || bootFailed || scopeFailed || scannerFailed || streamFailed) process.exitCode = 1;
}

main().catch(error => { console.error(error); process.exitCode = 1; });

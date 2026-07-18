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
  let orbitalBoot=null;
  if(root.classList.contains('d-fui-orbit')){
    await new Promise(resolve => setTimeout(resolve,150));
    const bootStation=root.querySelector('.d-fui-orbit-station');
    const bootPulse=root.querySelector('.d-fui-orbit-station-pulse');
    orbitalBoot={simulationTime:Number(root.dataset.simulationTime),blips:Number(root.dataset.blips),stationBlip:root.dataset.stationBlip,stationClass:bootStation.classList.contains('d-fui-orbit-is-blip'),stationFill:getComputedStyle(bootStation).fill,pulseOpacity:Number(bootPulse.getAttribute('opacity'))};
    await new Promise(resolve => setTimeout(resolve,200));
  }else await new Promise(resolve => setTimeout(resolve,350));
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
  let auth = null;
  if (root.classList.contains('d-fui-auth')) {
    const authReduced = mode === 'reduce';
    const authPanel = root.querySelector('.d-fui-auth-panel');
    const authGlyph = root.querySelector('.d-fui-auth-glyph');
    const authArcs = [...root.querySelectorAll('.d-fui-auth-arc')];
    const authLabel = root.querySelector('.d-fui-auth-label');
    const authHash = root.querySelector('.d-fui-auth-hash');
    const authStamp = root.querySelector('.d-fui-auth-stamp');
    const authSweep = root.querySelector('.d-fui-auth-sweep');
    const authAnnouncement = root.parentElement.querySelector('.d-fui-auth-announcement');
    const waitPhase = async function(target, attempts, delay) { for (let index = 0; index < attempts && root.dataset.phase !== target; index++) await new Promise(resolve => setTimeout(resolve, delay)); return root.dataset.phase === target; };
    authPanel.focus();
    const focusStyle = getComputedStyle(authPanel);
    const initialBlinkDuration = getComputedStyle(authLabel).animationDuration;
    const initialLiveDuration = getComputedStyle(root.querySelector('.d-fui-auth-live-dot')).animationDuration;
    const authInitial = {
      phase: root.dataset.phase,
      run: Number(root.dataset.run),
      outcome: root.dataset.outcome,
      hash: authHash.textContent,
      stamp: authStamp.textContent,
      label: authLabel.textContent,
      frames: Number(root.dataset.frames),
      flickers: Number(root.dataset.flickers),
      busy: root.getAttribute('aria-busy'),
      disabled: authPanel.getAttribute('aria-disabled'),
      focused: document.activeElement === authPanel,
      focusShadow: focusStyle.boxShadow,
      announcement: authAnnouncement.textContent
    };
    const splitEvents = [];
    const splitObserver = new MutationObserver(function(){if(authStamp.classList.contains('d-fui-auth-is-split'))splitEvents.push(performance.now())});
    splitObserver.observe(authStamp,{attributes:true,attributeFilter:['class']});
    let normalFlow = null;
    let reducedFlow = null;
    if (!authReduced) {
      authPanel.click();
      const started = { phase: root.dataset.phase, run: Number(root.dataset.run), busy: root.getAttribute('aria-busy'), disabled: authPanel.getAttribute('aria-disabled'), announcement: authAnnouncement.textContent, elapsed: Number(root.dataset.elapsed) };
      authPanel.click();
      const ignored = { run: Number(root.dataset.run), ignored: Number(root.dataset.ignored), elapsed: Number(root.dataset.elapsed) };
      await new Promise(resolve => setTimeout(resolve, 120));
      const partial = { phase: root.dataset.phase, length: Number(root.dataset.hashLength), hash: authHash.textContent, rotation: Number(root.dataset.rotation), arcColor: getComputedStyle(authArcs[0]).stroke, sweepOpacity: getComputedStyle(authSweep).opacity, scanPass: Number(root.dataset.scanPass) };
      await new Promise(resolve => setTimeout(resolve, 200));
      for (let index = 0; index < 20 && Number(root.dataset.hashLength) < 16; index++) await new Promise(resolve => setTimeout(resolve, 5));
      const typed = { phase: root.dataset.phase, length: Number(root.dataset.hashLength), hash: authHash.textContent, elapsed: Number(root.dataset.elapsed) };
      await new Promise(resolve => setTimeout(resolve, 330));
      const spun = { phase: root.dataset.phase, rotation: Number(root.dataset.rotation), scanPass: Number(root.dataset.scanPass), scansCompleted: Number(root.dataset.scansCompleted), sweepOpacity: getComputedStyle(authSweep).opacity };
      await waitPhase('result', 30, 10);
      const firstResult = { phase: root.dataset.phase, run: Number(root.dataset.run), outcome: root.dataset.outcome, hash: authHash.textContent, text: authStamp.textContent, color: getComputedStyle(authStamp).color, fontSize: getComputedStyle(authStamp).fontSize, fontWeight: getComputedStyle(authStamp).fontWeight, scale: Number(root.dataset.stampScale), busy: root.getAttribute('aria-busy'), disabled: authPanel.getAttribute('aria-disabled'), announcement: authAnnouncement.textContent, scansCompleted: Number(root.dataset.scansCompleted) };
      await waitPhase('result', 1, 1);
      for (let index = 0; index < 60 && Number(root.dataset.flickers) < 1; index++) await new Promise(resolve => setTimeout(resolve, 10));
      const landing = { scale: Number(root.dataset.stampScale), flickers: Number(root.dataset.flickers), splitEvents: splitEvents.length, borderAlpha: Number(root.dataset.borderAlpha), borderColor: getComputedStyle(authPanel).borderColor };
      await new Promise(resolve => setTimeout(resolve, 400));
      const decay = { phase: root.dataset.phase, borderAlpha: Number(root.dataset.borderAlpha), flickers: Number(root.dataset.flickers) };
      await new Promise(resolve => setTimeout(resolve, 2100));
      const held = { phase: root.dataset.phase, outcome: root.dataset.outcome, text: authStamp.textContent };
      await waitPhase('idle', 50, 20);
      const firstReset = { phase: root.dataset.phase, resets: Number(root.dataset.resets), hash: authHash.textContent, stamp: authStamp.textContent, busy: root.getAttribute('aria-busy'), disabled: authPanel.getAttribute('aria-disabled'), focused: document.activeElement === authPanel };
      const outcomes = [firstResult.outcome];
      const hashes = [firstResult.hash];
      for (let runIndex = 2; runIndex <= 3; runIndex++) {
        authPanel.click();
        await waitPhase('result', 80, 15);
        outcomes.push(root.dataset.outcome);
        hashes.push(authHash.textContent);
        await waitPhase('idle', 230, 15);
      }
      authPanel.click();
      await waitPhase('result', 80, 15);
      outcomes.push(root.dataset.outcome);
      hashes.push(authHash.textContent);
      let maxShake = 0;
      for (let index = 0; index < 32; index++){maxShake=Math.max(maxShake,Math.abs(Number(root.dataset.shakeX)));await new Promise(resolve => setTimeout(resolve, 10))}
      const denied = { phase: root.dataset.phase, run: Number(root.dataset.run), outcome: root.dataset.outcome, text: authStamp.textContent, color: getComputedStyle(authStamp).color, maxShake, shakeAfter: Number(root.dataset.shakeX), flickers: Number(root.dataset.flickers), frames: Number(root.dataset.frames), focused: document.activeElement === authPanel };
      normalFlow = { started, ignored, partial, typed, spun, firstResult, landing, decay, held, firstReset, outcomes, hashes, denied };
    } else {
      authPanel.click();
      const firstResult = { phase: root.dataset.phase, run: Number(root.dataset.run), outcome: root.dataset.outcome, hash: authHash.textContent, text: authStamp.textContent, color: getComputedStyle(authStamp).color, rotation: Number(root.dataset.rotation), frames: Number(root.dataset.frames), flickers: Number(root.dataset.flickers), busy: root.getAttribute('aria-busy'), disabled: authPanel.getAttribute('aria-disabled'), announcement: authAnnouncement.textContent };
      authPanel.click();
      const ignored = { run: Number(root.dataset.run), ignored: Number(root.dataset.ignored) };
      await new Promise(resolve => setTimeout(resolve, 2800));
      const stable = { phase: root.dataset.phase, hash: authHash.textContent, text: authStamp.textContent, frames: Number(root.dataset.frames), flickers: Number(root.dataset.flickers) };
      await waitPhase('idle', 30, 20);
      const firstReset = { phase: root.dataset.phase, resets: Number(root.dataset.resets), focused: document.activeElement === authPanel };
      const outcomes = [firstResult.outcome];
      const hashes = [firstResult.hash];
      for (let runIndex = 2; runIndex <= 3; runIndex++) {
        authPanel.click();
        outcomes.push(root.dataset.outcome);
        hashes.push(authHash.textContent);
        await waitPhase('idle', 170, 20);
      }
      authPanel.click();
      outcomes.push(root.dataset.outcome);
      hashes.push(authHash.textContent);
      const denied = { phase: root.dataset.phase, run: Number(root.dataset.run), outcome: root.dataset.outcome, text: authStamp.textContent, color: getComputedStyle(authStamp).color, shake: Number(root.dataset.shakeX), frames: Number(root.dataset.frames), flickers: Number(root.dataset.flickers), borderAlpha: Number(root.dataset.borderAlpha), focused: document.activeElement === authPanel };
      reducedFlow = { firstResult, ignored, stable, firstReset, outcomes, hashes, denied };
    }
    splitObserver.disconnect();
    auth = {
      metadata: { spinDuration: root.dataset.spinDuration, spinEasing: root.dataset.spinEasing, scanDuration: root.dataset.scanDuration, scanPasses: root.dataset.scanPasses, hashDelay: root.dataset.hashDelay, stampDuration: root.dataset.stampDuration, stampEasing: root.dataset.stampEasing, borderDuration: root.dataset.borderDuration, shakeDistance: root.dataset.shakeDistance, shakeCycles: root.dataset.shakeCycles, shakeDuration: root.dataset.shakeDuration, resetDelay: root.dataset.resetDelay, denyEvery: root.dataset.denyEvery },
      structure: { button: authPanel.tagName, hashTag: authHash.tagName, stampTag: authStamp.tagName, announcerOutsideBusy: !root.contains(authAnnouncement), announcerLive: authAnnouncement.getAttribute('aria-live'), arcs: authArcs.length, dashedArcs: authArcs.filter(arc => getComputedStyle(arc).strokeDasharray !== 'none').length, corners: root.querySelectorAll('.d-fui-auth-corner').length, sweepHeight: authSweep.getBoundingClientRect().height, liveColor: getComputedStyle(root.querySelector('.d-fui-auth-live-dot')).backgroundColor, labelFont: getComputedStyle(authLabel).fontSize, hashFont: getComputedStyle(authHash).fontSize, stampFont: getComputedStyle(authStamp).fontSize, topbarFont: getComputedStyle(root.querySelector('.d-fui-auth-topbar')).fontSize, footerFont: getComputedStyle(root.querySelector('.d-fui-auth-footer')).fontSize, footerPolicy: root.querySelector('.d-fui-auth-footer span:nth-child(3)').textContent, blinkDuration: initialBlinkDuration, liveDuration: initialLiveDuration },
      initial: authInitial,
      normal: normalFlow,
      reducedFlow,
      reduced: root.dataset.reduced,
      final: { phase: root.dataset.phase, run: Number(root.dataset.run), outcome: root.dataset.outcome, frames: Number(root.dataset.frames), flickers: Number(root.dataset.flickers), resets: Number(root.dataset.resets), ignored: Number(root.dataset.ignored), running: root.dataset.running }
    };
  }
  let hexDump = null;
  if (root.classList.contains('d-fui-hex')) {
    const hexReduced = mode === 'reduce';
    const hexViewport = root.querySelector('.d-fui-hex-viewport');
    const hexRows = [...root.querySelectorAll('.d-fui-hex-row')];
    const firstHexRow = hexRows[1];
    const firstHexBytes = [...firstHexRow.querySelectorAll('.d-fui-hex-byte')];
    const firstAscii = [...firstHexRow.querySelectorAll('.d-fui-hex-char')];
    const hexLink = root.querySelector('.d-fui-hex-link');
    const hexAnnouncement = root.querySelector('.d-fui-hex-announcement');
    const modularDelta = function(after, before){return (after-before+65536)%65536};
    const initialRowRect = firstHexRow.getBoundingClientRect();
    const initialOffsetRect = firstHexRow.querySelector('.d-fui-hex-offset').getBoundingClientRect();
    const initialBytesRect = firstHexRow.querySelector('.d-fui-hex-bytes').getBoundingClientRect();
    const initialAsciiRect = firstHexRow.querySelector('.d-fui-hex-ascii').getBoundingClientRect();
    const initialGeometry = { rowHeight:initialRowRect.height, rowWidth:initialRowRect.width, offsetWidth:initialOffsetRect.width, bytesWidth:initialBytesRect.width, asciiWidth:initialAsciiRect.width, zonesOrdered:initialOffsetRect.right<initialBytesRect.left&&initialBytesRect.right<initialAsciiRect.left, byteFont:getComputedStyle(firstHexBytes[0]).fontSize, offsetFont:getComputedStyle(firstHexRow.querySelector('.d-fui-hex-offset')).fontSize, asciiCorrect:firstHexBytes.every(function(cell,index){const value=parseInt(cell.textContent,16);return firstAscii[index].textContent===(value>=32&&value<=126?String.fromCharCode(value):'.')}) };
    const selectionSnapshot = function(){
      const cell = root.querySelector('.d-fui-hex-byte.d-fui-hex-is-selected');
      const address = cell ? Number(cell.dataset.address) : -1;
      const twin = address >= 0 ? root.querySelector('.d-fui-hex-char[data-address="'+address+'"]') : null;
      const cellRect = cell ? cell.getBoundingClientRect() : null;
      const twinRect = twin ? twin.getBoundingClientRect() : null;
      const lineRect = hexLink.getBoundingClientRect();
      const neighbors = [...root.querySelectorAll('.d-fui-hex-byte[data-influence]')].map(function(node){return { address:Number(node.dataset.address), influence:Number(node.dataset.influence), color:getComputedStyle(node).color }}).sort(function(a,b){return modularDelta(a.address,address)-modularDelta(b.address,address)});
      return {
        address,
        addressHex: root.dataset.selectedAddress,
        value: root.dataset.selectedByte,
        ascii: root.dataset.selectedAscii,
        byteSelected: root.querySelectorAll('.d-fui-hex-byte.d-fui-hex-is-selected').length,
        twinSelected: root.querySelectorAll('.d-fui-hex-char.d-fui-hex-is-selected').length,
        byteColor: cell ? getComputedStyle(cell).color : '',
        byteBackground: cell ? getComputedStyle(cell).backgroundColor : '',
        twinColor: twin ? getComputedStyle(twin).color : '',
        twinBackground: twin ? getComputedStyle(twin).backgroundColor : '',
        ariaSelected: cell ? cell.getAttribute('aria-selected') : '',
        activeId: hexViewport.getAttribute('aria-activedescendant') || '',
        nearCount: Number(root.dataset.nearCount),
        neighbors,
        link: { active:hexLink.classList.contains('d-fui-hex-is-active'), height:lineRect.height, color:getComputedStyle(hexLink).backgroundColor, opacity:Number(getComputedStyle(hexLink).opacity), duration:getComputedStyle(hexLink).animationDuration, left:lineRect.left, right:lineRect.right, cellRight:cellRect ? cellRect.right : 0, twinLeft:twinRect ? twinRect.left : 0 },
        links: Number(root.dataset.links),
        source: root.dataset.inspectionSource,
        announcement: hexAnnouncement.textContent
      };
    };
    const patternSnapshot = function(){
      const box = root.querySelector('.d-fui-hex-pattern.d-fui-hex-is-match');
      const address = root.dataset.patternAddress ? parseInt(root.dataset.patternAddress,16) : -1;
      const first = address >= 0 ? root.querySelector('.d-fui-hex-byte[data-address="'+address+'"]') : null;
      const last = address >= 0 ? root.querySelector('.d-fui-hex-byte[data-address="'+(address+3)+'"]') : null;
      const boxRect = box ? box.getBoundingClientRect() : null;
      const firstRect = first ? first.getBoundingClientRect() : null;
      return {
        active: root.dataset.matchActive,
        matches: Number(root.dataset.matches),
        opacity: Number(root.dataset.matchOpacity),
        simulationTime: Number(root.dataset.simulationTime),
        address,
        values: root.dataset.patternValues,
        domValues: address >= 0 ? [0,1,2,3].map(function(offset){const node=root.querySelector('.d-fui-hex-byte[data-address="'+(address+offset)+'"]');return node ? node.textContent : ''}).join('') : '',
        boxes: root.querySelectorAll('.d-fui-hex-pattern.d-fui-hex-is-match').length,
        borderColor: box ? getComputedStyle(box).borderTopColor : '',
        borderWidth: box ? getComputedStyle(box).borderTopWidth : '',
        boxOpacity: box ? Number(getComputedStyle(box).opacity) : 0,
        widthInCells: boxRect&&firstRect ? boxRect.width/firstRect.width : 0,
        sameRow: Boolean(first&&last&&first.closest('.d-fui-hex-row')===last.closest('.d-fui-hex-row')),
        state: root.querySelector('.d-fui-hex-state').textContent
      };
    };
    const rowOffsets = hexRows.slice(0,6).map(function(row){return { row:Number(row.dataset.row), offset:row.querySelector('.d-fui-hex-offset').textContent, bytes:row.querySelectorAll('.d-fui-hex-byte').length, ascii:row.querySelectorAll('.d-fui-hex-char').length }});
    const initial = { frames:Number(root.dataset.frames), distance:Number(root.dataset.distance), simulationTime:Number(root.dataset.simulationTime), baseRow:Number(root.dataset.baseRow), matches:Number(root.dataset.matches), signature:root.dataset.initialSignature, stableCheck:root.dataset.stableCheck, running:root.dataset.running, source:root.dataset.source };
    const motionBefore = { distance:Number(root.dataset.distance), simulationTime:Number(root.dataset.simulationTime), frames:Number(root.dataset.frames), baseRow:Number(root.dataset.baseRow) };
    let motionAfter = motionBefore;
    let pointer = null;
    let keyboard = null;
    let pattern = null;
    let reducedStable = null;
    if (!hexReduced) {
      await new Promise(resolve => setTimeout(resolve, 1000));
      motionAfter = { distance:Number(root.dataset.distance), simulationTime:Number(root.dataset.simulationTime), frames:Number(root.dataset.frames), baseRow:Number(root.dataset.baseRow) };
      const stableAddress = ((Number(root.dataset.baseRow)+6)%4096)*16+8;
      const stableCell = root.querySelector('.d-fui-hex-byte[data-address="'+stableAddress+'"]');
      const stableTwin = root.querySelector('.d-fui-hex-char[data-address="'+stableAddress+'"]');
      const stableRect = stableCell.getBoundingClientRect();
      const point = { x:stableRect.left+stableRect.width/2, y:stableRect.top+stableRect.height/2 };
      const stableBefore = { address:stableAddress, value:stableCell.textContent, ascii:stableTwin.textContent, baseRow:Number(root.dataset.baseRow), nodeId:stableCell.id };
      hexViewport.dispatchEvent(new PointerEvent('pointerenter',{clientX:point.x,clientY:point.y}));
      hexViewport.dispatchEvent(new PointerEvent('pointermove',{bubbles:true,clientX:point.x,clientY:point.y}));
      await new Promise(resolve => setTimeout(resolve, 90));
      const inspected = selectionSnapshot();
      await new Promise(resolve => setTimeout(resolve, 1200));
      const stableCellAfter = root.querySelector('.d-fui-hex-byte[data-address="'+stableAddress+'"]');
      const stableTwinAfter = root.querySelector('.d-fui-hex-char[data-address="'+stableAddress+'"]');
      const stationary = selectionSnapshot();
      const stableAfter = { address:stableAddress, value:stableCellAfter&&stableCellAfter.textContent, ascii:stableTwinAfter&&stableTwinAfter.textContent, baseRow:Number(root.dataset.baseRow), nodeId:stableCellAfter&&stableCellAfter.id, replaced:stableCellAfter!==stableCell };
      pointer = { point, inspected, stationary, stationaryDelta:modularDelta(stationary.address,inspected.address), stableBefore, stableAfter };
      hexViewport.dispatchEvent(new PointerEvent('pointerleave',{clientX:point.x,clientY:point.y}));
      await new Promise(resolve => setTimeout(resolve, 20));
      pointer.released = selectionSnapshot();
      hexViewport.focus();
      await new Promise(resolve => setTimeout(resolve, 20));
      const focus = selectionSnapshot();
      hexViewport.dispatchEvent(new KeyboardEvent('keydown',{key:'ArrowRight',bubbles:true}));
      const right = selectionSnapshot();
      hexViewport.dispatchEvent(new KeyboardEvent('keydown',{key:'ArrowDown',bubbles:true}));
      const down = selectionSnapshot();
      hexViewport.dispatchEvent(new KeyboardEvent('keydown',{key:'Home',bubbles:true}));
      const home = selectionSnapshot();
      hexViewport.dispatchEvent(new KeyboardEvent('keydown',{key:'End',bubbles:true}));
      const end = selectionSnapshot();
      hexViewport.dispatchEvent(new KeyboardEvent('keydown',{key:'Escape',bubbles:true}));
      await new Promise(resolve => setTimeout(resolve, 20));
      keyboard = { focus, right, down, home, end, afterEscape:selectionSnapshot(), focusedAfterEscape:document.activeElement===hexViewport };
      for (let index=0;index<180&&root.dataset.matchActive!=='true';index++) await new Promise(resolve => setTimeout(resolve,20));
      const started = patternSnapshot();
      await new Promise(resolve => setTimeout(resolve,650));
      const decayed = patternSnapshot();
      await new Promise(resolve => setTimeout(resolve,450));
      const cleared = patternSnapshot();
      pattern = { started, decayed, cleared };
    } else {
      const target = firstHexBytes[8];
      const targetRect = target.getBoundingClientRect();
      const point = { x:targetRect.left+targetRect.width/2, y:targetRect.top+targetRect.height/2 };
      hexViewport.dispatchEvent(new PointerEvent('pointerenter',{clientX:point.x,clientY:point.y}));
      hexViewport.dispatchEvent(new PointerEvent('pointermove',{bubbles:true,clientX:point.x,clientY:point.y}));
      await new Promise(resolve => setTimeout(resolve,20));
      pointer = { point, inspected:selectionSnapshot() };
      hexViewport.dispatchEvent(new PointerEvent('pointerleave',{clientX:point.x,clientY:point.y}));
      await new Promise(resolve => setTimeout(resolve,20));
      pointer.released = selectionSnapshot();
      hexViewport.focus();
      await new Promise(resolve => setTimeout(resolve,20));
      const focus = selectionSnapshot();
      hexViewport.dispatchEvent(new KeyboardEvent('keydown',{key:'ArrowRight',bubbles:true}));
      const right = selectionSnapshot();
      hexViewport.dispatchEvent(new KeyboardEvent('keydown',{key:'ArrowDown',bubbles:true}));
      const down = selectionSnapshot();
      hexViewport.dispatchEvent(new KeyboardEvent('keydown',{key:'Escape',bubbles:true}));
      await new Promise(resolve => setTimeout(resolve,20));
      keyboard = { focus, right, down, afterEscape:selectionSnapshot(), focusedAfterEscape:document.activeElement===hexViewport };
      await new Promise(resolve => setTimeout(resolve,5200));
      reducedStable = { frames:Number(root.dataset.frames), distance:Number(root.dataset.distance), simulationTime:Number(root.dataset.simulationTime), baseRow:Number(root.dataset.baseRow), matches:Number(root.dataset.matches), matchActive:root.dataset.matchActive, signature:root.dataset.initialSignature, running:root.dataset.running, liveAnimation:getComputedStyle(root.querySelector('.d-fui-hex-live-dot')).animationDuration, scanAnimation:getComputedStyle(root.querySelector('.d-fui-hex-scanline')).animationDuration };
    }
    hexDump = {
      metadata: { scrollSpeed:root.dataset.scrollSpeed, rowHeight:root.dataset.rowHeight, bytesPerRow:root.dataset.bytesPerRow, totalRows:root.dataset.totalRows, renderedRows:root.dataset.renderedRows, neighborCount:root.dataset.neighborCount, matchInterval:root.dataset.matchInterval, matchLength:root.dataset.matchLength, matchDecay:root.dataset.matchDecay, seed:root.dataset.seed },
      structure: { rows:hexRows.length, rowOffsets, rowHeight:initialGeometry.rowHeight, rowWidth:initialGeometry.rowWidth, offsetWidth:initialGeometry.offsetWidth, bytesWidth:initialGeometry.bytesWidth, asciiWidth:initialGeometry.asciiWidth, zonesOrdered:initialGeometry.zonesOrdered, bytes:firstHexBytes.length, ascii:firstAscii.length, byteFont:initialGeometry.byteFont, offsetFont:initialGeometry.offsetFont, topbarFont:getComputedStyle(root.querySelector('.d-fui-hex-topbar')).fontSize, panelHeadFont:getComputedStyle(root.querySelector('.d-fui-hex-panel-head')).fontSize, footerFont:getComputedStyle(root.querySelector('.d-fui-hex-footer')).fontSize, corners:root.querySelectorAll('.d-fui-hex-corner').length, liveColor:getComputedStyle(root.querySelector('.d-fui-hex-live-dot')).backgroundColor, focusables:root.querySelectorAll('[tabindex]').length, gridRole:hexViewport.getAttribute('role'), rowCount:hexViewport.getAttribute('aria-rowcount'), columnCount:hexViewport.getAttribute('aria-colcount'), asciiHidden:firstHexRow.querySelector('.d-fui-hex-ascii').getAttribute('aria-hidden'), livePolite:hexAnnouncement.getAttribute('aria-live'), asciiCorrect:initialGeometry.asciiCorrect },
      initial,
      motion: { before:motionBefore, after:motionAfter, rate:(motionAfter.distance-motionBefore.distance)/Math.max(1,motionAfter.simulationTime-motionBefore.simulationTime)*1000 },
      pointer,
      keyboard,
      pattern,
      reducedStable,
      reduced:root.dataset.reduced,
      final: { frames:Number(root.dataset.frames), distance:Number(root.dataset.distance), baseRow:Number(root.dataset.baseRow), matches:Number(root.dataset.matches), matchActive:root.dataset.matchActive, running:root.dataset.running, selectedAddress:root.dataset.selectedAddress, linkActive:hexLink.classList.contains('d-fui-hex-is-active') }
    };
  }
  let trading = null;
  if (root.classList.contains('d-fui-trade')) {
    const tradeReduced = root.dataset.reduced === 'true';
    const tradePanels = [...root.querySelectorAll('.d-fui-trade-panel')];
    const tradeHandles = [...root.querySelectorAll('.d-fui-trade-handle')];
    const tradeCanvas = root.querySelector('.d-fui-trade-canvas');
    const tradeChip = root.querySelector('.d-fui-trade-price-chip');
    const tradeBookBars = [...root.querySelectorAll('.d-fui-trade-book-side i')];
    const tradeStatus = root.querySelector('.d-fui-trade-status');
    const wait = function(ms){return new Promise(function(resolve){setTimeout(resolve,ms)})};
    const rectOf = function(node){const box=node.getBoundingClientRect();return {left:box.left,top:box.top,right:box.right,bottom:box.bottom,width:box.width,height:box.height}};
    const panelRect = function(id){return rectOf(root.querySelector('.d-fui-trade-panel[data-panel="'+id+'"]'))};
    const animationInfo = function(node){
      return node.getAnimations().map(function(animation){
        const timing=animation.effect.getTiming();
        const frames=animation.effect.getKeyframes();
        return {duration:Number(timing.duration),easing:timing.easing,playState:animation.playState,frames:frames.map(function(frame){return {offset:frame.offset,opacity:frame.opacity||'',transform:frame.transform||'',backgroundColor:frame.backgroundColor||''}})};
      });
    };
    const marketAnimationStates = function(){
      const animations=[];
      [tradeChip,...tradeBookBars,...root.querySelectorAll('.d-fui-trade-tape-row')].forEach(function(node){
        node.getAnimations().forEach(function(animation){if(!animations.includes(animation))animations.push(animation)});
      });
      return animations.map(function(animation){return animation.playState});
    };
    const marketSnapshot = function(){
      const newest=root.querySelector('.d-fui-trade-tape-row:last-child');
      return {
        ticks:Number(root.dataset.ticks),
        frames:Number(root.dataset.frames),
        simulationTime:Number(root.dataset.simulationTime),
        lastTickAt:Number(root.dataset.lastTickAt),
        tickGap:Number(root.dataset.tickGap),
        price:Number(root.dataset.price),
        direction:root.dataset.priceDirection,
        checksum:root.dataset.priceChecksum,
        points:Number(root.dataset.pointCount),
        shifting:root.dataset.shifting,
        shiftProgress:Number(root.dataset.shiftProgress),
        flashActive:root.dataset.flashActive,
        chipColor:getComputedStyle(tradeChip).color,
        chipBackground:getComputedStyle(tradeChip).backgroundColor,
        book:root.dataset.bookValues,
        bookWidths:tradeBookBars.map(function(bar){return parseFloat(getComputedStyle(bar).width)}),
        tape:root.dataset.tapeSequence,
        tapeRows:root.querySelectorAll('.d-fui-trade-tape-row').length,
        tapeEntering:root.dataset.tapeEntering,
        newestTransform:newest?getComputedStyle(newest).transform:'',
        newestOpacity:newest?getComputedStyle(newest).opacity:''
      };
    };
    const rootRect=rectOf(root);
    const initialRects={price:panelRect('price'),book:panelRect('book'),tape:panelRect('tape')};
    const separated=function(a,b){return a.right<=b.left+.1||b.right<=a.left+.1||a.bottom<=b.top+.1||b.bottom<=a.top+.1};
    const inside=function(box){return box.left>=rootRect.left-.1&&box.right<=rootRect.right+.1&&box.top>=rootRect.top-.1&&box.bottom<=rootRect.bottom+.1};
    const image=tradeCanvas.getContext('2d').getImageData(0,0,tradeCanvas.width,tradeCanvas.height).data;
    let accentPixels=0;
    let translucentPixels=0;
    for(let index=0;index<image.length;index+=16){
      const red=image[index],green=image[index+1],blue=image[index+2],alpha=image[index+3];
      if(red>105&&red<215&&green>70&&green<185&&blue>175&&alpha>50)accentPixels++;
      if(alpha>0&&alpha<230&&blue>red)translucentPixels++;
    }
    const firstCorner=root.querySelector('.d-fui-trade-corner-tl');
    const firstPanel=root.querySelector('.d-fui-trade-panel');
    const firstBar=tradeBookBars[0];
    const firstAsk=tradeBookBars[1];
    const initial=marketSnapshot();
    const structure={
      panels:tradePanels.length,
      handles:tradeHandles.length,
      handleTags:tradeHandles.map(function(handle){return handle.tagName}).join(','),
      handleLabels:tradeHandles.map(function(handle){return handle.getAttribute('aria-label')||''}),
      workspaceRole:root.querySelector('.d-fui-trade-workspace').getAttribute('role'),
      panelRoles:tradePanels.map(function(panel){return panel.getAttribute('role')}).join(','),
      controlsValid:tradeHandles.every(function(handle){const panel=handle.closest('.d-fui-trade-panel');const body=document.getElementById(handle.getAttribute('aria-controls'));return Boolean(body)&&handle.getAttribute('aria-expanded')==='true'&&!handle.hasAttribute('aria-posinset')&&!handle.hasAttribute('aria-setsize')&&panel.getAttribute('aria-posinset')&&panel.getAttribute('aria-setsize')==='3'}),
      handlesFit:tradeHandles.every(function(handle){return handle.scrollWidth<=handle.clientWidth&&handle.scrollHeight<=handle.clientHeight}),
      order:root.dataset.order,
      slots:tradePanels.map(function(panel){return panel.dataset.panel+':'+panel.dataset.slot}).sort().join(','),
      corners:root.querySelectorAll('.d-fui-trade-corner').length,
      cornerWidth:getComputedStyle(firstCorner).width,
      cornerBorder:getComputedStyle(firstCorner).borderLeftWidth,
      panelRadius:getComputedStyle(firstPanel.querySelector('.d-fui-trade-shell')).borderRadius,
      panelBorder:getComputedStyle(firstPanel.querySelector('.d-fui-trade-shell')).borderLeftWidth,
      labelFont:getComputedStyle(tradeHandles[0]).fontSize,
      priceFont:getComputedStyle(root.querySelector('.d-fui-trade-price-value')).fontSize,
      bookFont:getComputedStyle(root.querySelector('.d-fui-trade-book-price')).fontSize,
      tapeFont:getComputedStyle(root.querySelector('.d-fui-trade-tape-row span')).fontSize,
      pointCount:Number(root.dataset.pointCount),
      canvas:{width:tradeCanvas.width,height:tradeCanvas.height,clientWidth:tradeCanvas.clientWidth,clientHeight:tradeCanvas.clientHeight,accentPixels,translucentPixels},
      bookRows:root.querySelectorAll('.d-fui-trade-book-row').length,
      bids:root.querySelectorAll('.d-fui-trade-bid').length,
      asks:root.querySelectorAll('.d-fui-trade-ask').length,
      bidColor:getComputedStyle(firstBar).backgroundColor,
      askColor:getComputedStyle(firstAsk).backgroundColor,
      bidRight:getComputedStyle(firstBar).right,
      askLeft:getComputedStyle(firstAsk).left,
      bookTransition:getComputedStyle(firstBar).transitionDuration,
      tapeRows:root.querySelectorAll('.d-fui-trade-tape-row').length,
      marketLiveNodes:root.querySelectorAll('.d-fui-trade-price-body [aria-live],.d-fui-trade-book-body [aria-live],.d-fui-trade-tape-body [aria-live]').length,
      statusLive:tradeStatus.getAttribute('aria-live'),
      liveColor:getComputedStyle(root.querySelector('.d-fui-trade-live-dot')).backgroundColor,
      liveAnimation:getComputedStyle(root.querySelector('.d-fui-trade-live-dot')).animationDuration,
      scanAnimation:getComputedStyle(root.querySelector('.d-fui-trade-scanline')).animationDuration,
      initialRects,
      panelsSeparated:separated(initialRects.price,initialRects.book)&&separated(initialRects.price,initialRects.tape)&&separated(initialRects.book,initialRects.tape),
      panelsInside:[initialRects.price,initialRects.book,initialRects.tape].every(inside)
    };
    let market=null;
    let reducedStable=null;
    if (!tradeReduced) {
      const initialTicks=initial.ticks;
      for(let index=0;index<150&&Number(root.dataset.ticks)===initialTicks;index++)await wait(5);
      const started=marketSnapshot();
      const startAnimations={
        chip:animationInfo(tradeChip),
        book:tradeBookBars.flatMap(animationInfo).map(function(animation){return {duration:animation.duration,easing:animation.easing,playState:animation.playState}}),
        tape:animationInfo(root.querySelector('.d-fui-trade-tape-row:last-child'))
      };
      await wait(105);
      const mid=marketSnapshot();
      await wait(110);
      const tapeSettled=marketSnapshot();
      await wait(120);
      const settled=marketSnapshot();
      const firstTick=started.ticks;
      for(let index=0;index<160&&Number(root.dataset.ticks)===firstTick;index++)await wait(5);
      const second=marketSnapshot();
      root.style.transform='translateY(1200px)';
      for(let index=0;index<80&&root.dataset.running!=='false';index++)await wait(10);
      await wait(40);
      const visibilityPaused={running:root.dataset.running,marketPaused:root.dataset.marketPaused,snapshot:marketSnapshot(),animations:marketAnimationStates()};
      await wait(350);
      const visibilityStable={running:root.dataset.running,marketPaused:root.dataset.marketPaused,snapshot:marketSnapshot(),animations:marketAnimationStates()};
      root.style.transform='';
      for(let index=0;index<80&&root.dataset.running!=='true';index++)await wait(10);
      const visibilityResumed={running:root.dataset.running,marketPaused:root.dataset.marketPaused,snapshot:marketSnapshot(),animations:marketAnimationStates()};
      await wait(330);
      market={started,mid,tapeSettled,settled,second,startAnimations,visibility:{paused:visibilityPaused,stable:visibilityStable,resumed:visibilityResumed}};
    } else {
      await wait(1100);
      reducedStable=marketSnapshot();
    }
    const priceHandle=root.querySelector('.d-fui-trade-panel[data-panel="price"] .d-fui-trade-handle');
    const tapePanel=root.querySelector('.d-fui-trade-panel[data-panel="tape"]');
    const priceHandleRect=priceHandle.getBoundingClientRect();
    const tapeTarget=tapePanel.getBoundingClientRect();
    const pointerId=73;
    priceHandle.dispatchEvent(new PointerEvent('pointerdown',{bubbles:true,pointerId:pointerId,button:0,buttons:1,clientX:priceHandleRect.left+priceHandleRect.width/2,clientY:priceHandleRect.top+priceHandleRect.height/2}));
    priceHandle.dispatchEvent(new PointerEvent('pointermove',{bubbles:true,pointerId:pointerId,button:0,buttons:1,clientX:tapeTarget.left+tapeTarget.width/2,clientY:tapeTarget.top+tapeTarget.height/2}));
    const dragActive={dragging:root.dataset.dragging,target:root.dataset.dragTarget,moves:Number(root.dataset.dragMoves),shellTransform:getComputedStyle(root.querySelector('.d-fui-trade-panel[data-panel="price"] .d-fui-trade-shell')).transform};
    priceHandle.dispatchEvent(new PointerEvent('pointerup',{bubbles:true,pointerId:pointerId,button:0,buttons:0,clientX:tapeTarget.left+tapeTarget.width/2,clientY:tapeTarget.top+tapeTarget.height/2}));
    const pointerSwap={
      order:root.dataset.order,
      source:root.dataset.actionSource,
      reorders:Number(root.dataset.reorders),
      animations:Number(root.dataset.layoutAnimations),
      focused:document.activeElement===priceHandle,
      announcement:tradeStatus.textContent,
      panelAnimations:tradePanels.flatMap(animationInfo)
    };
    if(!tradeReduced){for(let index=0;index<40&&tradePanels.some(function(panel){return panel.getAnimations().length});index++)await wait(20)}else await wait(10);
    pointerSwap.settledRects={price:panelRect('price'),book:panelRect('book'),tape:panelRect('tape')};
    pointerSwap.residual=tradePanels.reduce(function(total,panel){return total+panel.getAnimations().length},0);
    pointerSwap.handlesFit=tradeHandles.every(function(handle){return handle.scrollWidth<=handle.clientWidth&&handle.scrollHeight<=handle.clientHeight});
    const keyboardBefore=root.dataset.order;
    priceHandle.dispatchEvent(new KeyboardEvent('keydown',{bubbles:true,key:'ArrowLeft'}));
    const keyboard={
      before:keyboardBefore,
      order:root.dataset.order,
      source:root.dataset.actionSource,
      reorders:Number(root.dataset.reorders),
      focused:document.activeElement===priceHandle,
      animations:tradePanels.flatMap(animationInfo).map(function(animation){return {duration:animation.duration,easing:animation.easing}})
    };
    if(!tradeReduced){for(let index=0;index<40&&tradePanels.some(function(panel){return panel.getAnimations().length});index++)await wait(20)}else await wait(10);
    if(tradeReduced)await wait(360);
    const bookHandle=root.querySelector('.d-fui-trade-panel[data-panel="book"] .d-fui-trade-handle');
    const bookPanel=root.querySelector('.d-fui-trade-panel[data-panel="book"]');
    const bookBody=bookPanel.querySelector('.d-fui-trade-body');
    const fullHeight=bookPanel.getBoundingClientRect().height;
    bookHandle.dispatchEvent(new MouseEvent('dblclick',{bubbles:true,detail:2}));
    const collapseStart={collapsed:root.dataset.collapsed,expanded:bookHandle.getAttribute('aria-expanded'),hidden:bookBody.getAttribute('aria-hidden'),label:bookHandle.getAttribute('aria-label'),animations:animationInfo(bookPanel),height:bookPanel.getBoundingClientRect().height,announcement:tradeStatus.textContent};
    await wait(tradeReduced?10:90);
    const collapseMid=bookPanel.getBoundingClientRect().height;
    if(!tradeReduced){for(let index=0;index<40&&root.dataset.collapseAnimating==='true';index++)await wait(20)}else await wait(10);
    const collapseEnd={height:bookPanel.getBoundingClientRect().height,animating:root.dataset.collapseAnimating,animations:bookPanel.getAnimations().length};
    bookHandle.dispatchEvent(new MouseEvent('dblclick',{bubbles:true,detail:2}));
    if(!tradeReduced){for(let index=0;index<40&&root.dataset.collapseAnimating==='true';index++)await wait(20)}else await wait(10);
    const expanded={height:bookPanel.getBoundingClientRect().height,expanded:bookHandle.getAttribute('aria-expanded'),hidden:bookBody.getAttribute('aria-hidden'),label:bookHandle.getAttribute('aria-label')};
    bookHandle.focus();
    bookHandle.dispatchEvent(new MouseEvent('dblclick',{bubbles:true,detail:2}));
    bookHandle.dispatchEvent(new KeyboardEvent('keydown',{bubbles:true,key:'ArrowLeft'}));
    const overlapStart={collapsed:root.dataset.collapsed,order:root.dataset.order,animating:root.dataset.collapseAnimating,label:bookHandle.getAttribute('aria-label'),animations:tradePanels.flatMap(animationInfo)};
    if(!tradeReduced){for(let index=0;index<50&&(root.dataset.collapseAnimating==='true'||tradePanels.some(function(panel){return panel.getAnimations().length}));index++)await wait(20)}else await wait(10);
    const overlapEnd={collapsed:root.dataset.collapsed,order:root.dataset.order,animating:root.dataset.collapseAnimating,label:bookHandle.getAttribute('aria-label'),height:bookPanel.getBoundingClientRect().height,animations:tradePanels.reduce(function(total,panel){return total+panel.getAnimations().length},0)};
    bookHandle.dispatchEvent(new KeyboardEvent('keydown',{bubbles:true,key:'ArrowRight'}));
    if(!tradeReduced){for(let index=0;index<40&&tradePanels.some(function(panel){return panel.getAnimations().length});index++)await wait(20)}else await wait(10);
    bookHandle.dispatchEvent(new KeyboardEvent('keydown',{bubbles:true,key:'Enter'}));
    if(!tradeReduced){for(let index=0;index<40&&root.dataset.collapseAnimating==='true';index++)await wait(20)}else await wait(10);
    const overlapRestored={collapsed:root.dataset.collapsed,order:root.dataset.order,expanded:bookHandle.getAttribute('aria-expanded'),label:bookHandle.getAttribute('aria-label'),height:bookPanel.getBoundingClientRect().height};
    bookHandle.dispatchEvent(new MouseEvent('dblclick',{bubbles:true,detail:2}));
    if(!tradeReduced)await wait(60);
    const rapidBefore={collapsed:root.dataset.collapsed,animating:root.dataset.collapseAnimating,label:bookHandle.getAttribute('aria-label'),height:bookPanel.getBoundingClientRect().height};
    bookHandle.dispatchEvent(new KeyboardEvent('keydown',{bubbles:true,key:'Enter'}));
    const rapidRestart={collapsed:root.dataset.collapsed,animating:root.dataset.collapseAnimating,label:bookHandle.getAttribute('aria-label'),height:bookPanel.getBoundingClientRect().height,animations:animationInfo(bookPanel)};
    if(!tradeReduced){for(let index=0;index<40&&root.dataset.collapseAnimating==='true';index++)await wait(20)}else await wait(10);
    const rapidEnd={collapsed:root.dataset.collapsed,animating:root.dataset.collapseAnimating,label:bookHandle.getAttribute('aria-label'),height:bookPanel.getBoundingClientRect().height,animations:bookPanel.getAnimations().length};
    bookHandle.focus();
    bookHandle.dispatchEvent(new KeyboardEvent('keydown',{bubbles:true,key:'Enter'}));
    if(!tradeReduced){for(let index=0;index<40&&root.dataset.collapseAnimating==='true';index++)await wait(20)}else await wait(10);
    const keyboardCollapsed={collapsed:root.dataset.collapsed,expanded:bookHandle.getAttribute('aria-expanded'),label:bookHandle.getAttribute('aria-label'),height:bookPanel.getBoundingClientRect().height,source:root.dataset.actionSource,focused:document.activeElement===bookHandle};
    bookHandle.dispatchEvent(new KeyboardEvent('keydown',{bubbles:true,key:'Enter'}));
    if(!tradeReduced){for(let index=0;index<40&&root.dataset.collapseAnimating==='true';index++)await wait(20)}else await wait(10);
    const keyboardExpanded={collapsed:root.dataset.collapsed,expanded:bookHandle.getAttribute('aria-expanded'),label:bookHandle.getAttribute('aria-label'),height:bookPanel.getBoundingClientRect().height,source:root.dataset.actionSource,focused:document.activeElement===bookHandle};
    trading={
      metadata:{tickInterval:root.dataset.tickInterval,chartDuration:root.dataset.chartDuration,chartStroke:root.dataset.chartStroke,chartArea:root.dataset.chartArea,flashDuration:root.dataset.flashDuration,bookDuration:root.dataset.bookDuration,bookAlpha:root.dataset.bookAlpha,tapeDuration:root.dataset.tapeDuration,tapeOffset:root.dataset.tapeOffset,tapeLimit:root.dataset.tapeLimit,flipDuration:root.dataset.flipDuration,flipEasing:root.dataset.flipEasing,collapseDuration:root.dataset.collapseDuration},
      structure,
      initial,
      signatures:{price:root.dataset.initialPriceChecksum,book:root.dataset.initialBookSignature,tape:root.dataset.initialTapeSignature},
      market,
      reducedStable,
      dragActive,
      pointerSwap,
      keyboard,
      collapse:{fullHeight,start:collapseStart,midHeight:collapseMid,end:collapseEnd,expanded,overlap:{start:overlapStart,end:overlapEnd,restored:overlapRestored},rapid:{before:rapidBefore,restart:rapidRestart,end:rapidEnd},keyboardCollapsed,keyboardExpanded},
      reduced:root.dataset.reduced,
      final:{ticks:Number(root.dataset.ticks),frames:Number(root.dataset.frames),running:root.dataset.running,order:root.dataset.order,collapsed:root.dataset.collapsed,scrollWidth:root.scrollWidth,clientWidth:root.clientWidth}
    };
  }
  let orbital = null;
  if (root.classList.contains('d-fui-orbit')) {
    const orbitReduced=root.dataset.reduced==='true';
    const orbitScene=root.querySelector('.d-fui-orbit-scene');
    const orbitSvg=root.querySelector('.d-fui-orbit-svg');
    const orbitReadout=root.querySelector('.d-fui-orbit-readout');
    const orbitReadoutText=root.querySelector('.d-fui-orbit-readout-text');
    const orbitStatus=root.querySelector('.d-fui-orbit-status');
    const orbitStation=root.querySelector('.d-fui-orbit-station');
    const orbitPulse=root.querySelector('.d-fui-orbit-station-pulse');
    const orbitLeader=root.querySelector('.d-fui-orbit-leader');
    const orbitHeads=[...root.querySelectorAll('.d-fui-orbit-head')];
    const orbitTrails=[...root.querySelectorAll('.d-fui-orbit-trail')];
    const wait=function(ms){return new Promise(function(resolve){setTimeout(resolve,ms)})};
    const rectOf=function(node){const box=node.getBoundingClientRect();return {left:box.left,top:box.top,right:box.right,bottom:box.bottom,width:box.width,height:box.height}};
    const inside=function(inner,outer){return inner.left>=outer.left-.5&&inner.right<=outer.right+.5&&inner.top>=outer.top-.5&&inner.bottom<=outer.bottom+.5};
    const points=function(value){return (value||'').trim().split(/\s+/).map(function(pair){return pair.split(',').map(Number)})};
    const snapshot=function(){
      const selectedHead=root.querySelector('.d-fui-orbit-head[data-selected="true"]');
      return {
        frames:Number(root.dataset.frames),
        simulationTime:Number(root.dataset.simulationTime),
        selected:Number(root.dataset.selected),
        selectedId:root.dataset.selectedId,
        phases:root.dataset.phases,
        positions:root.dataset.positions,
        cameraAngle:Number(root.dataset.cameraAngle),
        cameraTarget:Number(root.dataset.cameraTarget),
        rotationProgress:Number(root.dataset.rotationProgress),
        rotationEase:Number(root.dataset.rotationEase),
        rotationAnimating:root.dataset.rotationAnimating,
        readoutTarget:root.dataset.readoutTarget,
        readoutText:root.dataset.readoutText,
        actualReadout:orbitReadoutText.textContent,
        typing:root.dataset.typing,
        typedChars:Number(root.dataset.typedChars),
        blips:Number(root.dataset.blips),
        stationBlip:root.dataset.stationBlip,
        blipProgress:Number(root.dataset.blipProgress),
        stationClass:orbitStation.classList.contains('d-fui-orbit-is-blip'),
        stationFill:getComputedStyle(orbitStation).fill,
        pulseOpacity:Number(orbitPulse.getAttribute('opacity')),
        dashOffset:Number(root.dataset.dashOffset),
        selections:Number(root.dataset.selections),
        running:root.dataset.running,
        source:root.dataset.source,
        buttonLabel:orbitScene.getAttribute('aria-label'),
        announcement:orbitStatus.textContent,
        focused:document.activeElement===orbitScene,
        selectedFill:selectedHead?getComputedStyle(selectedHead).fill:'',
        selectedPoint:root.dataset.selectedPoint,
        leaderPoints:root.dataset.leaderPoints
      };
    };
    const freezeKey=function(value){return JSON.stringify([value.frames,value.simulationTime,value.phases,value.positions,value.cameraAngle,value.rotationProgress,value.rotationEase,value.readoutText,value.typedChars,value.typing,value.dashOffset,value.blips,value.stationBlip,value.blipProgress])};
    const sceneRect=rectOf(orbitScene);
    const rootBox=rectOf(root);
    const readoutRect=rectOf(orbitReadout);
    const leaderPoints=points(orbitLeader.getAttribute('points'));
    const selectedHead=root.querySelector('.d-fui-orbit-head[data-selected="true"]');
    const structure={
      sceneTag:orbitScene.tagName,
      svg:root.querySelectorAll('.d-fui-orbit-svg').length,
      planetRadius:root.querySelector('.d-fui-orbit-globe').getAttribute('r'),
      latitudes:root.querySelectorAll('.d-fui-orbit-latitude').length,
      latitudeRadii:[...root.querySelectorAll('.d-fui-orbit-latitude')].map(function(node){return node.getAttribute('rx')+'x'+node.getAttribute('ry')}).join(','),
      latitudeDash:getComputedStyle(root.querySelector('.d-fui-orbit-latitude')).strokeDasharray,
      backPaths:root.querySelectorAll('.d-fui-orbit-back path').length,
      frontPaths:root.querySelectorAll('.d-fui-orbit-front path').length,
      pathsDrawn:[...root.querySelectorAll('.d-fui-orbit-back path,.d-fui-orbit-front path')].every(function(path){return /^M/.test(path.getAttribute('d')||'')}),
      backOpacity:getComputedStyle(root.querySelector('.d-fui-orbit-back')).opacity,
      trails:orbitTrails.length,
      trailsBySat:['SAT-01','SAT-02','SAT-03'].map(function(id){return id+':'+root.querySelectorAll('.d-fui-orbit-trail[data-sat="'+id+'"]').length}).join(','),
      trailOpacityMin:Math.min(...orbitTrails.map(function(node){return Number(node.getAttribute('opacity'))})),
      trailOpacityMax:Math.max(...orbitTrails.map(function(node){return Number(node.getAttribute('opacity'))})),
      heads:orbitHeads.length,
      headRadii:orbitHeads.map(function(node){return node.getAttribute('r')}).join(','),
      selectedHeads:root.querySelectorAll('.d-fui-orbit-head[data-selected="true"]').length,
      selectedFill:getComputedStyle(selectedHead).fill,
      selectedFilter:getComputedStyle(selectedHead).filter,
      station:root.querySelectorAll('.d-fui-orbit-station').length,
      leader:root.querySelectorAll('.d-fui-orbit-leader').length,
      leaderSegments:leaderPoints.length,
      leaderAnchored:leaderPoints.length===3&&Math.abs(leaderPoints[2][0]-orbitReadout.offsetLeft)<.2&&Math.abs(leaderPoints[2][1]-(orbitReadout.offsetTop+orbitReadout.offsetHeight/2))<.2,
      readoutTag:orbitReadout.tagName,
      readoutHidden:orbitReadout.getAttribute('aria-hidden'),
      statusLive:orbitStatus.getAttribute('aria-live'),
      corners:root.querySelectorAll('.d-fui-orbit-corner').length,
      sceneRadius:getComputedStyle(orbitScene).borderRadius,
      sceneInside:inside(sceneRect,rootBox),
      readoutInside:inside(readoutRect,sceneRect),
      headsInside:orbitHeads.every(function(head){return inside(rectOf(head),sceneRect)}),
      width:Number(root.dataset.width),
      height:Number(root.dataset.height),
      focusables:root.querySelectorAll('button,input,select,textarea,[tabindex]').length
    };
    const initial=snapshot();
    let initialFull=null;
    let motion=null;
    let visibility=null;
    let reducedStable=null;
    let pointerStart=null;
    let pointerEarly=null;
    let pointerEnd=null;
    let keyboardStart=null;
    let keyboardEnd=null;
    if(!orbitReduced){
      for(let index=0;index<40&&root.dataset.typing==='true';index++)await wait(20);
      initialFull=snapshot();
      const before=snapshot();
      await wait(120);
      const after=snapshot();
      motion={before,after,dashRate:(after.dashOffset-before.dashOffset)/Math.max(1,after.simulationTime-before.simulationTime)};
      orbitScene.dispatchEvent(new MouseEvent('click',{bubbles:true,detail:1}));
      pointerStart=snapshot();
      await wait(120);
      pointerEarly=snapshot();
      root.style.transform='translateY(1200px)';
      for(let index=0;index<80&&root.dataset.running!=='false';index++)await wait(10);
      const paused=snapshot();
      await wait(350);
      const stable=snapshot();
      root.style.transform='';
      for(let index=0;index<80&&root.dataset.running!=='true';index++)await wait(10);
      const resumed=snapshot();
      visibility={paused:{state:paused,key:freezeKey(paused)},stable:{state:stable,key:freezeKey(stable)},resumed:{state:resumed,key:freezeKey(resumed)}};
      for(let index=0;index<70&&(root.dataset.rotationAnimating==='true'||root.dataset.typing==='true');index++)await wait(20);
      pointerEnd=snapshot();
      orbitScene.focus();
      orbitScene.dispatchEvent(new MouseEvent('click',{bubbles:true,detail:0}));
      keyboardStart=snapshot();
      for(let index=0;index<70&&(root.dataset.rotationAnimating==='true'||root.dataset.typing==='true');index++)await wait(20);
      keyboardEnd=snapshot();
    }else{
      await wait(1100);
      reducedStable=snapshot();
      orbitScene.dispatchEvent(new MouseEvent('click',{bubbles:true,detail:1}));
      pointerStart=snapshot();
      pointerEarly=pointerStart;
      pointerEnd=pointerStart;
      orbitScene.focus();
      orbitScene.dispatchEvent(new MouseEvent('click',{bubbles:true,detail:0}));
      keyboardStart=snapshot();
      keyboardEnd=keyboardStart;
    }
    const finalSceneRect=rectOf(orbitScene);
    orbital={
      metadata:{planetRadius:root.dataset.planetRadius,latitudeCount:root.dataset.latitudeCount,dashPeriod:root.dataset.dashPeriod,orbitPeriods:root.dataset.orbitPeriods,orbitRadii:root.dataset.orbitRadii,orbitTilts:root.dataset.orbitTilts,trailCount:root.dataset.trailCount,trailTotal:root.dataset.trailTotal,trailLag:root.dataset.trailLag,orbitBackAlpha:root.dataset.orbitBackAlpha,headDiameter:root.dataset.headDiameter,rotationDuration:root.dataset.rotationDuration,rotationEasing:root.dataset.rotationEasing,typeDelay:root.dataset.typeDelay,blipDuration:root.dataset.blipDuration,configSignature:root.dataset.configSignature,initialPositions:root.dataset.initialPositions,stationPhase:root.dataset.stationPhase},
      boot:orbitalBoot,
      structure,
      initial,
      initialFull,
      motion,
      visibility,
      reducedStable,
      pointer:{start:pointerStart,early:pointerEarly,end:pointerEnd},
      keyboard:{start:keyboardStart,end:keyboardEnd},
      reduced:root.dataset.reduced,
      final:{snapshot:snapshot(),sceneInside:inside(finalSceneRect,rectOf(root)),readoutInside:inside(rectOf(orbitReadout),finalSceneRect),headsInside:orbitHeads.every(function(head){return inside(rectOf(head),finalSceneRect)}),scrollWidth:root.scrollWidth,clientWidth:root.clientWidth}
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
    auth,
    hexDump,
    trading,
    orbital,
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
  const auth = result.auth;
  const authCommonFailed = !auth
    || auth.metadata.spinDuration !== '600' || auth.metadata.spinEasing !== 'cubic-bezier(0.65,0,0.35,1)' || auth.metadata.scanDuration !== '400' || auth.metadata.scanPasses !== '2' || auth.metadata.hashDelay !== '18'
    || auth.metadata.stampDuration !== '220' || auth.metadata.stampEasing !== 'cubic-bezier(0.22,1,0.36,1)' || auth.metadata.borderDuration !== '800'
    || auth.metadata.shakeDistance !== '6' || auth.metadata.shakeCycles !== '3' || auth.metadata.shakeDuration !== '300' || auth.metadata.resetDelay !== '3000' || auth.metadata.denyEvery !== '4'
    || auth.structure.button !== 'BUTTON' || auth.structure.hashTag !== 'SPAN' || auth.structure.stampTag !== 'SPAN' || !auth.structure.announcerOutsideBusy || auth.structure.announcerLive !== 'polite'
    || auth.structure.arcs !== 5 || auth.structure.dashedArcs !== 5 || auth.structure.corners !== 4 || auth.structure.sweepHeight !== 1 || auth.structure.liveColor !== 'rgb(167, 139, 250)'
    || auth.structure.labelFont !== '10px' || auth.structure.hashFont !== '12px' || auth.structure.stampFont !== '26px' || auth.structure.topbarFont !== '10px' || auth.structure.footerFont !== '10px' || auth.structure.footerPolicy !== '1 IN 4 DENIED'
    || auth.initial.phase !== 'idle' || auth.initial.run !== 0 || auth.initial.outcome !== '' || auth.initial.hash !== '' || auth.initial.stamp !== '' || auth.initial.label !== 'AWAITING AUTH'
    || auth.initial.frames !== 0 || auth.initial.flickers !== 0 || auth.initial.busy !== 'false' || auth.initial.disabled !== 'false' || !auth.initial.focused || auth.initial.focusShadow === 'none' || auth.initial.announcement !== 'Awaiting authorization.';
  const authMotionFailed = reducedMotion
    ? !auth || auth.reduced !== 'true' || auth.structure.blinkDuration !== '0s' || auth.structure.liveDuration !== '0s' || !auth.reducedFlow
      || auth.reducedFlow.firstResult.phase !== 'result' || auth.reducedFlow.firstResult.run !== 1 || auth.reducedFlow.firstResult.outcome !== 'granted' || !/^[0-9A-F]{16}$/.test(auth.reducedFlow.firstResult.hash)
      || auth.reducedFlow.firstResult.text !== 'ACCESS GRANTED' || auth.reducedFlow.firstResult.color !== 'rgb(74, 222, 128)' || auth.reducedFlow.firstResult.rotation !== 360
      || auth.reducedFlow.firstResult.frames !== 0 || auth.reducedFlow.firstResult.flickers !== 0 || auth.reducedFlow.firstResult.busy !== 'false' || auth.reducedFlow.firstResult.disabled !== 'true' || auth.reducedFlow.firstResult.announcement !== 'Access granted.'
      || auth.reducedFlow.ignored.run !== 1 || auth.reducedFlow.ignored.ignored !== 1
      || auth.reducedFlow.stable.phase !== 'result' || auth.reducedFlow.stable.hash !== auth.reducedFlow.firstResult.hash || auth.reducedFlow.stable.text !== 'ACCESS GRANTED' || auth.reducedFlow.stable.frames !== 0 || auth.reducedFlow.stable.flickers !== 0
      || auth.reducedFlow.firstReset.phase !== 'idle' || auth.reducedFlow.firstReset.resets !== 1 || !auth.reducedFlow.firstReset.focused
      || auth.reducedFlow.outcomes.join(',') !== 'granted,granted,granted,denied' || new Set(auth.reducedFlow.hashes).size !== 4 || auth.reducedFlow.hashes.some(hash => !/^[0-9A-F]{16}$/.test(hash))
      || auth.reducedFlow.denied.phase !== 'result' || auth.reducedFlow.denied.run !== 4 || auth.reducedFlow.denied.outcome !== 'denied' || auth.reducedFlow.denied.text !== 'ACCESS DENIED' || auth.reducedFlow.denied.color !== 'rgb(248, 113, 113)'
      || auth.reducedFlow.denied.shake !== 0 || auth.reducedFlow.denied.frames !== 0 || auth.reducedFlow.denied.flickers !== 0 || auth.reducedFlow.denied.borderAlpha !== 0 || !auth.reducedFlow.denied.focused
      || auth.final.phase !== 'result' || auth.final.run !== 4 || auth.final.outcome !== 'denied' || auth.final.frames !== 0 || auth.final.flickers !== 0 || auth.final.ignored !== 1 || auth.final.running !== 'false'
    : !auth || auth.reduced !== 'false' || auth.structure.blinkDuration !== '1.4s' || auth.structure.liveDuration !== '1.6s' || !auth.normal
      || auth.normal.started.phase !== 'authenticating' || auth.normal.started.run !== 1 || auth.normal.started.busy !== 'true' || auth.normal.started.disabled !== 'true' || auth.normal.started.announcement !== 'Authorization scan started.'
      || auth.normal.ignored.run !== 1 || auth.normal.ignored.ignored !== 1 || Math.abs(auth.normal.ignored.elapsed - auth.normal.started.elapsed) > 1
      || auth.normal.partial.phase !== 'authenticating' || auth.normal.partial.length < 1 || auth.normal.partial.length > 15 || !/^[0-9A-F]{1,15}$/.test(auth.normal.partial.hash)
      || auth.normal.partial.rotation <= 0 || auth.normal.partial.rotation >= 360 || auth.normal.partial.arcColor !== 'rgb(167, 139, 250)' || auth.normal.partial.sweepOpacity !== '1' || auth.normal.partial.scanPass !== 1
      || auth.normal.typed.phase !== 'authenticating' || auth.normal.typed.length !== 16 || !/^[0-9A-F]{16}$/.test(auth.normal.typed.hash) || auth.normal.typed.elapsed < 280 || auth.normal.typed.elapsed > 380
      || auth.normal.spun.phase !== 'authenticating' || auth.normal.spun.rotation < 359 || auth.normal.spun.rotation > 360.01 || auth.normal.spun.scanPass !== 2 || auth.normal.spun.scansCompleted !== 1 || auth.normal.spun.sweepOpacity !== '1'
      || auth.normal.firstResult.phase !== 'result' || auth.normal.firstResult.run !== 1 || auth.normal.firstResult.outcome !== 'granted' || !/^[0-9A-F]{16}$/.test(auth.normal.firstResult.hash)
      || auth.normal.firstResult.text !== 'ACCESS GRANTED' || auth.normal.firstResult.color !== 'rgb(74, 222, 128)' || auth.normal.firstResult.fontSize !== '26px' || auth.normal.firstResult.fontWeight !== '500'
      || auth.normal.firstResult.scale <= 1 || auth.normal.firstResult.scale > 1.6 || auth.normal.firstResult.busy !== 'false' || auth.normal.firstResult.disabled !== 'true' || auth.normal.firstResult.announcement !== 'Access granted.' || auth.normal.firstResult.scansCompleted !== 2
      || Math.abs(auth.normal.landing.scale - 1) > .01 || auth.normal.landing.flickers !== 1 || auth.normal.landing.splitEvents < 1 || auth.normal.landing.borderAlpha < .36 || auth.normal.landing.borderAlpha > .4 || !auth.normal.landing.borderColor.startsWith('rgba(74, 222, 128,')
      || auth.normal.decay.phase !== 'result' || auth.normal.decay.borderAlpha <= 0 || auth.normal.decay.borderAlpha >= auth.normal.landing.borderAlpha || auth.normal.decay.flickers !== 1
      || auth.normal.held.phase !== 'result' || auth.normal.held.outcome !== 'granted' || auth.normal.held.text !== 'ACCESS GRANTED'
      || auth.normal.firstReset.phase !== 'idle' || auth.normal.firstReset.resets !== 1 || auth.normal.firstReset.hash !== '' || auth.normal.firstReset.stamp !== '' || auth.normal.firstReset.busy !== 'false' || auth.normal.firstReset.disabled !== 'false' || !auth.normal.firstReset.focused
      || auth.normal.outcomes.join(',') !== 'granted,granted,granted,denied' || new Set(auth.normal.hashes).size !== 4 || auth.normal.hashes.some(hash => !/^[0-9A-F]{16}$/.test(hash))
      || auth.normal.denied.phase !== 'result' || auth.normal.denied.run !== 4 || auth.normal.denied.outcome !== 'denied' || auth.normal.denied.text !== 'ACCESS DENIED' || auth.normal.denied.color !== 'rgb(248, 113, 113)'
      || auth.normal.denied.maxShake < 5.5 || Math.abs(auth.normal.denied.shakeAfter) > .1 || auth.normal.denied.flickers !== 3 || auth.normal.denied.frames <= 0 || !auth.normal.denied.focused
      || auth.final.phase !== 'result' || auth.final.run !== 4 || auth.final.outcome !== 'denied' || auth.final.ignored !== 1 || auth.final.running !== 'true';
  const authFailed = demoId === 'fui-access-granted' && (authCommonFailed || authMotionFailed);
  const hex = result.hexDump;
  const invalidHexSelection = function(selection,duration){
    if(!selection)return true;
    const value=parseInt(selection.value,16);
    const expectedAscii=value>=32&&value<=126?String.fromCharCode(value):'.';
    const influences=selection.neighbors.map(item=>item.influence).sort((a,b)=>a-b).join(',');
    const colors=[...new Set(selection.neighbors.map(item=>item.color))].sort().join('|');
    return selection.address<0 || !/^[0-9A-F]{4}$/.test(selection.addressHex) || !/^[0-9A-F]{2}$/.test(selection.value) || selection.ascii!==expectedAscii
      || selection.byteSelected!==1 || selection.twinSelected!==1 || selection.byteColor!=='rgb(167, 139, 250)' || selection.twinColor!=='rgb(167, 139, 250)'
      || selection.byteBackground!=='rgb(22, 22, 25)' || selection.twinBackground!=='rgb(22, 22, 25)' || selection.ariaSelected!=='true' || selection.activeId!=='d-fui-hex-byte-'+selection.addressHex
      || selection.nearCount!==8 || selection.neighbors.length!==8 || influences!=='0.04,0.04,0.16,0.16,0.36,0.36,0.64,0.64'
      || colors!=='rgb(158, 158, 166)|rgb(168, 168, 175)|rgb(184, 184, 190)|rgb(207, 207, 212)'
      || !selection.link.active || selection.link.height!==1 || selection.link.color!=='rgb(167, 139, 250)' || selection.link.duration!==duration || selection.link.opacity<.9
      || Math.abs(selection.link.left-selection.link.cellRight)>.5 || Math.abs(selection.link.right-selection.link.twinLeft)>.5 || selection.source!=='pointer';
  };
  const hexCommonFailed = !hex
    || hex.metadata.scrollSpeed!=='14' || hex.metadata.rowHeight!=='16' || hex.metadata.bytesPerRow!=='16' || hex.metadata.totalRows!=='4096' || hex.metadata.renderedRows!=='19' || hex.metadata.neighborCount!=='8'
    || hex.metadata.matchInterval!=='5000' || hex.metadata.matchLength!=='4' || hex.metadata.matchDecay!=='1000' || hex.metadata.seed!=='0xC0DE42'
    || hex.structure.rows!==19 || hex.structure.rowOffsets.length!==6 || hex.structure.rowOffsets.some(row=>row.bytes!==16||row.ascii!==16) || hex.structure.rowOffsets.map(row=>row.offset).join(',')!=='FFF0,0000,0010,0020,0030,0040'
    || Math.abs(hex.structure.rowHeight-16)>.01 || hex.structure.rowWidth<result.width-45 || hex.structure.offsetWidth<=0 || hex.structure.bytesWidth<result.width-185 || hex.structure.asciiWidth<80 || !hex.structure.zonesOrdered
    || hex.structure.bytes!==16 || hex.structure.ascii!==16 || hex.structure.byteFont!==(result.width<=360?'7.5px':'9px') || hex.structure.offsetFont!==(result.width<=360?'8px':'9px') || hex.structure.topbarFont!=='10px' || hex.structure.panelHeadFont!=='10px' || hex.structure.footerFont!=='10px'
    || hex.structure.corners!==4 || hex.structure.liveColor!=='rgb(167, 139, 250)' || hex.structure.focusables!==1 || hex.structure.gridRole!=='grid' || hex.structure.rowCount!=='4096' || hex.structure.columnCount!=='16' || hex.structure.asciiHidden!=='true' || hex.structure.livePolite!=='polite' || !hex.structure.asciiCorrect
    || hex.initial.signature!=='D5F670CFCA7E75262EBC0A99C47DFA53692E46D9713FBA57C9C7D7E6A94B0A09' || hex.initial.stableCheck!=='true' || hex.initial.matches!==0
    || invalidHexSelection(hex.pointer&&hex.pointer.inspected,reducedMotion?'0s':'0.36s')
    || !hex.pointer.released || hex.pointer.released.address!==-1 || hex.pointer.released.byteSelected!==0 || hex.pointer.released.twinSelected!==0 || hex.pointer.released.nearCount!==0 || hex.pointer.released.activeId!=='' || hex.pointer.released.link.active
    || !hex.keyboard || hex.keyboard.focus.address<0 || hex.keyboard.focus.byteSelected!==1 || hex.keyboard.focus.twinSelected!==1 || hex.keyboard.focus.nearCount!==8 || hex.keyboard.focus.source!=='focus' || !hex.keyboard.focus.announcement.startsWith('Address ')
    || modularHexDelta(hex.keyboard.right.address,hex.keyboard.focus.address)!==1 || modularHexDelta(hex.keyboard.down.address,hex.keyboard.right.address)!==16 || hex.keyboard.right.source!=='keyboard' || hex.keyboard.down.source!=='keyboard'
    || hex.keyboard.right.activeId!=='d-fui-hex-byte-'+hex.keyboard.right.addressHex || !hex.keyboard.right.announcement.startsWith('Address ') || hex.keyboard.afterEscape.address!==-1 || hex.keyboard.afterEscape.byteSelected!==0 || hex.keyboard.afterEscape.link.active || hex.keyboard.focusedAfterEscape;
  function modularHexDelta(after,before){return (after-before+65536)%65536}
  const hexMotionFailed = reducedMotion
    ? !hex || hex.reduced!=='true' || hex.initial.frames!==0 || hex.initial.distance!==0 || hex.initial.simulationTime!==0 || hex.initial.baseRow!==0 || hex.initial.running!=='false'
      || !hex.reducedStable || hex.reducedStable.frames!==0 || hex.reducedStable.distance!==0 || hex.reducedStable.simulationTime!==0 || hex.reducedStable.baseRow!==0 || hex.reducedStable.matches!==0 || hex.reducedStable.matchActive!=='false' || hex.reducedStable.signature!==hex.initial.signature || hex.reducedStable.running!=='false' || hex.reducedStable.liveAnimation!=='0s' || hex.reducedStable.scanAnimation!=='0s'
      || hex.motion.before.distance!==hex.motion.after.distance || hex.motion.before.frames!==hex.motion.after.frames || hex.pattern!==null || hex.final.frames!==0 || hex.final.distance!==0 || hex.final.matches!==0 || hex.final.matchActive!=='false' || hex.final.running!=='false'
    : !hex || hex.reduced!=='false' || hex.initial.frames<=0 || hex.initial.distance<=0 || hex.initial.running!=='true' || hex.motion.after.frames<=hex.motion.before.frames || hex.motion.after.distance<=hex.motion.before.distance || Math.abs(hex.motion.rate-14)>.12
      || !hex.pointer.stableBefore || !hex.pointer.stableAfter || !hex.pointer.stableAfter.replaced || hex.pointer.stableAfter.baseRow!==hex.pointer.stableBefore.baseRow+1 || hex.pointer.stableAfter.address!==hex.pointer.stableBefore.address || hex.pointer.stableAfter.value!==hex.pointer.stableBefore.value || hex.pointer.stableAfter.ascii!==hex.pointer.stableBefore.ascii || hex.pointer.stableAfter.nodeId!==hex.pointer.stableBefore.nodeId
      || hex.pointer.stationaryDelta!==16 || hex.pointer.stationary.address!==hex.pointer.inspected.address+16 || hex.pointer.stationary.links<=hex.pointer.inspected.links || hex.pointer.stationary.source!=='pointer'
      || hex.keyboard.home.address%16!==0 || hex.keyboard.end.address%16!==15 || Math.floor(hex.keyboard.home.address/16)!==Math.floor(hex.keyboard.end.address/16)
      || !hex.pattern || hex.pattern.started.active!=='true' || hex.pattern.started.matches!==1 || hex.pattern.started.opacity<.9 || hex.pattern.started.opacity>1 || hex.pattern.started.simulationTime<5000 || hex.pattern.started.simulationTime>5100
      || !/^[0-9A-F]{8}$/.test(hex.pattern.started.values) || hex.pattern.started.values!==hex.pattern.started.domValues || hex.pattern.started.boxes!==1 || hex.pattern.started.borderColor!=='rgb(251, 191, 36)' || hex.pattern.started.borderWidth!=='1px' || Math.abs(hex.pattern.started.widthInCells-4)>.05 || !hex.pattern.started.sameRow || hex.pattern.started.state!=='PATTERN MATCH'
      || hex.pattern.decayed.active!=='true' || hex.pattern.decayed.matches!==1 || hex.pattern.decayed.opacity<=.15 || hex.pattern.decayed.opacity>=.5 || hex.pattern.decayed.opacity>=hex.pattern.started.opacity || hex.pattern.decayed.boxes!==1 || hex.pattern.decayed.boxOpacity!==hex.pattern.decayed.opacity
      || hex.pattern.cleared.active!=='false' || hex.pattern.cleared.matches!==1 || hex.pattern.cleared.opacity!==0 || hex.pattern.cleared.boxes!==0 || hex.pattern.cleared.state!=='SCANNING'
      || hex.final.frames<=hex.initial.frames || hex.final.distance<=hex.initial.distance || hex.final.matches!==1 || hex.final.matchActive!=='false' || hex.final.running!=='true' || hex.final.selectedAddress!=='' || hex.final.linkActive;
  const hexFailed = demoId === 'fui-hex-dump' && (hexCommonFailed || hexMotionFailed);
  const trade = result.trading;
  const tradeCommonFailed = !trade
    || trade.metadata.tickInterval!=='800' || trade.metadata.chartDuration!=='300' || trade.metadata.chartStroke!=='1.5' || trade.metadata.chartArea!=='accent-transparent' || trade.metadata.flashDuration!=='250'
    || trade.metadata.bookDuration!=='300' || trade.metadata.bookAlpha!=='0.25' || trade.metadata.tapeDuration!=='200' || trade.metadata.tapeOffset!=='8' || trade.metadata.tapeLimit!=='4'
    || trade.metadata.flipDuration!=='260' || trade.metadata.flipEasing!=='cubic-bezier(0.65, 0, 0.35, 1)' || trade.metadata.collapseDuration!=='200'
    || trade.structure.panels!==3 || trade.structure.handles!==3 || trade.structure.handleTags!=='BUTTON,BUTTON,BUTTON' || trade.structure.handleLabels.some(function(label){return !label.includes('Press Enter to collapse.')}) || trade.structure.workspaceRole!=='list' || trade.structure.panelRoles!=='listitem,listitem,listitem' || !trade.structure.controlsValid || !trade.structure.handlesFit
    || trade.structure.order!=='price,book,tape' || trade.structure.slots!=='book:1,price:0,tape:2' || trade.structure.corners!==12 || trade.structure.cornerWidth!=='8px' || trade.structure.cornerBorder!=='2px'
    || trade.structure.panelRadius!=='4px' || trade.structure.panelBorder!=='1px' || trade.structure.labelFont!=='10px' || trade.structure.priceFont!=='12px' || trade.structure.bookFont!=='12px' || trade.structure.tapeFont!=='12px'
    || trade.structure.pointCount!==60 || trade.structure.canvas.width!==trade.structure.canvas.clientWidth || trade.structure.canvas.height!==trade.structure.canvas.clientHeight || trade.structure.canvas.accentPixels<20 || trade.structure.canvas.translucentPixels<100
    || trade.structure.bookRows!==6 || trade.structure.bids!==6 || trade.structure.asks!==6 || trade.structure.bidColor!=='rgba(74, 222, 128, 0.25)' || trade.structure.askColor!=='rgba(248, 113, 113, 0.25)'
    || trade.structure.bidRight!=='0px' || trade.structure.askLeft!=='0px' || trade.structure.tapeRows!==4 || trade.structure.marketLiveNodes!==0 || trade.structure.statusLive!=='polite'
    || trade.structure.liveColor!=='rgb(167, 139, 250)' || !trade.structure.panelsSeparated || !trade.structure.panelsInside
    || trade.initial.ticks!==0 || trade.initial.points!==60 || trade.initial.tapeRows!==4 || trade.initial.checksum!==trade.signatures.price || trade.initial.book!==trade.signatures.book || trade.initial.tape!==trade.signatures.tape
    || trade.signatures.price!=='4EA094E2' || trade.signatures.book!=='69.5/82.9,63.2/30.3,36.6/70.9,52.8/64.4,42.6/70.5,67.4/40.4' || trade.signatures.tape!=='1:127.40:540:up|2:127.45:826:up|3:127.36:887:up|4:127.53:823:up'
    || trade.dragActive.dragging!=='true' || trade.dragActive.target!=='tape' || trade.dragActive.moves<1
    || trade.pointerSwap.order!=='tape,book,price' || trade.pointerSwap.source!=='pointer' || trade.pointerSwap.reorders!==1 || !trade.pointerSwap.focused || !trade.pointerSwap.handlesFit || !trade.pointerSwap.announcement.includes('PRICE moved to slot 3')
    || Math.abs(trade.pointerSwap.settledRects.book.left-trade.structure.initialRects.book.left)>.6 || Math.abs(trade.pointerSwap.settledRects.book.top-trade.structure.initialRects.book.top)>.6
    || Math.abs(trade.pointerSwap.settledRects.price.width-trade.structure.initialRects.tape.width)>.6 || Math.abs(trade.pointerSwap.settledRects.price.height-trade.structure.initialRects.tape.height)>.6
    || Math.abs(trade.pointerSwap.settledRects.tape.width-trade.structure.initialRects.price.width)>.6 || Math.abs(trade.pointerSwap.settledRects.tape.height-trade.structure.initialRects.price.height)>.6 || trade.pointerSwap.residual!==0
    || trade.keyboard.before!=='tape,book,price' || trade.keyboard.order!=='tape,price,book' || trade.keyboard.source!=='keyboard reorder' || trade.keyboard.reorders!==2 || !trade.keyboard.focused
    || trade.collapse.fullHeight<=27 || trade.collapse.start.collapsed!=='book' || trade.collapse.start.expanded!=='false' || trade.collapse.start.hidden!=='true' || !trade.collapse.start.label.includes('Press Enter to expand.') || !trade.collapse.start.announcement.startsWith('BOOK collapsed')
    || Math.abs(trade.collapse.end.height-27)>.1 || trade.collapse.end.animating!=='false' || trade.collapse.end.animations!==0
    || Math.abs(trade.collapse.expanded.height-trade.collapse.fullHeight)>.1 || trade.collapse.expanded.expanded!=='true' || trade.collapse.expanded.hidden!=='false' || !trade.collapse.expanded.label.includes('Press Enter to collapse.')
    || trade.collapse.overlap.start.collapsed!=='book' || trade.collapse.overlap.start.order!=='tape,book,price' || !trade.collapse.overlap.start.label.includes('Press Enter to expand.')
    || trade.collapse.overlap.end.collapsed!=='book' || trade.collapse.overlap.end.order!=='tape,book,price' || trade.collapse.overlap.end.animating!=='false' || !trade.collapse.overlap.end.label.includes('Press Enter to expand.') || Math.abs(trade.collapse.overlap.end.height-27)>.1 || trade.collapse.overlap.end.animations!==0
    || trade.collapse.overlap.restored.collapsed!=='' || trade.collapse.overlap.restored.order!=='tape,price,book' || trade.collapse.overlap.restored.expanded!=='true' || !trade.collapse.overlap.restored.label.includes('Press Enter to collapse.') || Math.abs(trade.collapse.overlap.restored.height-trade.collapse.fullHeight)>.1
    || trade.collapse.rapid.before.collapsed!=='book' || !trade.collapse.rapid.before.label.includes('Press Enter to expand.') || trade.collapse.rapid.restart.collapsed!=='' || !trade.collapse.rapid.restart.label.includes('Press Enter to collapse.')
    || trade.collapse.rapid.end.collapsed!=='' || trade.collapse.rapid.end.animating!=='false' || !trade.collapse.rapid.end.label.includes('Press Enter to collapse.') || Math.abs(trade.collapse.rapid.end.height-trade.collapse.fullHeight)>.1 || trade.collapse.rapid.end.animations!==0
    || trade.collapse.keyboardCollapsed.collapsed!=='book' || trade.collapse.keyboardCollapsed.expanded!=='false' || !trade.collapse.keyboardCollapsed.label.includes('Press Enter to expand.') || Math.abs(trade.collapse.keyboardCollapsed.height-27)>.1 || trade.collapse.keyboardCollapsed.source!=='keyboard collapse' || !trade.collapse.keyboardCollapsed.focused
    || trade.collapse.keyboardExpanded.collapsed!=='' || trade.collapse.keyboardExpanded.expanded!=='true' || !trade.collapse.keyboardExpanded.label.includes('Press Enter to collapse.') || Math.abs(trade.collapse.keyboardExpanded.height-trade.collapse.fullHeight)>.1 || trade.collapse.keyboardExpanded.source!=='keyboard collapse' || !trade.collapse.keyboardExpanded.focused
    || trade.final.order!=='tape,price,book' || trade.final.collapsed!=='' || trade.final.scrollWidth!==trade.final.clientWidth;
  const tradeMotionFailed = reducedMotion
    ? !trade || trade.reduced!=='true' || trade.initial.frames!==0 || trade.initial.simulationTime!==0 || trade.initial.shifting!=='false' || trade.initial.flashActive!=='false' || trade.initial.tapeEntering!=='false'
      || trade.structure.bookTransition!=='0s' || trade.structure.liveAnimation!=='0s' || trade.structure.scanAnimation!=='0s' || trade.market!==null || !trade.reducedStable
      || trade.reducedStable.ticks!==0 || trade.reducedStable.frames!==0 || trade.reducedStable.simulationTime!==0 || trade.reducedStable.checksum!==trade.initial.checksum || trade.reducedStable.book!==trade.initial.book || trade.reducedStable.tape!==trade.initial.tape
      || trade.dragActive.shellTransform!=='none' || trade.pointerSwap.animations!==0 || trade.pointerSwap.panelAnimations.length!==0 || trade.keyboard.animations.length!==0 || trade.collapse.start.animations.length!==0 || trade.collapse.overlap.start.animating!=='false' || trade.collapse.overlap.start.animations.length!==0 || trade.collapse.rapid.before.animating!=='false' || Math.abs(trade.collapse.rapid.before.height-27)>.1 || trade.collapse.rapid.restart.animating!=='false' || trade.collapse.rapid.restart.animations.length!==0 || Math.abs(trade.collapse.rapid.restart.height-trade.collapse.fullHeight)>.1 || Math.abs(trade.collapse.midHeight-27)>.1
      || trade.final.ticks!==0 || trade.final.frames!==0 || trade.final.running!=='false'
    : !trade || trade.reduced!=='false' || trade.structure.bookTransition!=='0.3s' || trade.structure.liveAnimation!=='1.6s' || trade.structure.scanAnimation!=='5.4s' || !trade.market || trade.reducedStable!==null
      || trade.initial.frames<=0 || trade.initial.simulationTime<=0 || trade.initial.shifting!=='false' || trade.initial.flashActive!=='false' || trade.initial.tapeEntering!=='false'
      || trade.market.started.ticks!==1 || trade.market.started.simulationTime<795 || trade.market.started.simulationTime>830 || trade.market.started.lastTickAt!==trade.market.started.simulationTime
      || trade.market.started.price===trade.initial.price || !['up','down'].includes(trade.market.started.direction) || trade.market.started.points!==60 || trade.market.started.shifting!=='true' || trade.market.started.shiftProgress>.12 || trade.market.started.flashActive!=='true'
      || trade.market.started.checksum!==trade.initial.checksum || trade.market.started.book===trade.initial.book || trade.market.started.tape===trade.initial.tape || trade.market.started.tapeRows!==4 || trade.market.started.tapeEntering!=='true' || trade.market.started.newestTransform==='none' || Number(trade.market.started.newestOpacity)>.25
      || (trade.market.started.direction==='up'&&trade.market.started.chipColor!=='rgb(74, 222, 128)') || (trade.market.started.direction==='down'&&trade.market.started.chipColor!=='rgb(248, 113, 113)')
      || trade.market.startAnimations.chip.length!==1 || trade.market.startAnimations.chip[0].duration!==250 || trade.market.startAnimations.chip[0].easing!=='linear'
      || trade.market.startAnimations.book.length!==12 || trade.market.startAnimations.book.some(function(animation){return animation.duration!==300||animation.easing!=='cubic-bezier(0.65, 0, 0.35, 1)'})
      || trade.market.startAnimations.tape.length!==1 || trade.market.startAnimations.tape[0].duration!==200 || trade.market.startAnimations.tape[0].frames[0].transform!=='translateY(8px)' || trade.market.startAnimations.tape[0].frames[0].opacity!=='0'
      || trade.market.mid.shifting!=='true' || trade.market.mid.shiftProgress<.2 || trade.market.mid.shiftProgress>.65 || trade.market.mid.flashActive!=='true' || trade.market.mid.checksum!==trade.initial.checksum
      || trade.market.tapeSettled.shifting!=='true' || trade.market.tapeSettled.shiftProgress<.6 || trade.market.tapeSettled.shiftProgress>.95 || trade.market.tapeSettled.tapeEntering!=='false' || trade.market.tapeSettled.newestTransform!=='none' || trade.market.tapeSettled.newestOpacity!=='1'
      || trade.market.settled.points!==60 || trade.market.settled.shifting!=='false' || trade.market.settled.shiftProgress!==0 || trade.market.settled.flashActive!=='false' || trade.market.settled.tapeEntering!=='false' || trade.market.settled.checksum===trade.initial.checksum
      || trade.market.second.ticks!==2 || Math.abs(trade.market.second.tickGap-800)>20 || trade.market.second.shifting!=='true' || trade.market.second.flashActive!=='true' || trade.market.second.book===trade.market.started.book || trade.market.second.tape===trade.market.started.tape
      || trade.market.visibility.paused.running!=='false' || trade.market.visibility.paused.marketPaused!=='true' || trade.market.visibility.paused.animations.length<13 || trade.market.visibility.paused.animations.some(function(state){return state!=='paused'})
      || trade.market.visibility.stable.running!=='false' || trade.market.visibility.stable.marketPaused!=='true' || JSON.stringify(trade.market.visibility.stable.snapshot)!==JSON.stringify(trade.market.visibility.paused.snapshot) || trade.market.visibility.stable.animations.length!==trade.market.visibility.paused.animations.length || trade.market.visibility.stable.animations.some(function(state){return state!=='paused'})
      || trade.market.visibility.resumed.running!=='true' || trade.market.visibility.resumed.marketPaused!=='false' || trade.market.visibility.resumed.animations.length!==trade.market.visibility.paused.animations.length || trade.market.visibility.resumed.animations.some(function(state){return state!=='running'})
      || trade.dragActive.shellTransform==='none' || trade.pointerSwap.animations!==2 || trade.pointerSwap.panelAnimations.length!==2 || trade.pointerSwap.panelAnimations.some(function(animation){return animation.duration!==260||animation.easing!=='cubic-bezier(0.65, 0, 0.35, 1)'||!animation.frames[0].transform.includes('translate(')})
      || trade.keyboard.animations.length!==2 || trade.keyboard.animations.some(function(animation){return animation.duration!==260||animation.easing!=='cubic-bezier(0.65, 0, 0.35, 1)'})
      || trade.collapse.start.animations.length!==1 || trade.collapse.start.animations[0].duration!==200 || trade.collapse.midHeight<=27 || trade.collapse.midHeight>=trade.collapse.fullHeight
      || trade.collapse.overlap.start.animating!=='true' || trade.collapse.overlap.start.animations.length!==3 || trade.collapse.overlap.start.animations.filter(function(animation){return animation.duration===200}).length!==1 || trade.collapse.overlap.start.animations.filter(function(animation){return animation.duration===260}).length!==2
      || trade.collapse.rapid.before.animating!=='true' || trade.collapse.rapid.before.height<=27 || trade.collapse.rapid.before.height>=trade.collapse.fullHeight || trade.collapse.rapid.restart.animating!=='true' || trade.collapse.rapid.restart.animations.length!==1 || trade.collapse.rapid.restart.animations[0].duration!==200
      || trade.final.frames<=trade.initial.frames || trade.final.ticks<2 || trade.final.running!=='true';
  const tradeFailed = demoId === 'fui-trading-terminal' && (tradeCommonFailed || tradeMotionFailed);
  const orbit=result.orbital;
  const orbitCommonFailed=!orbit
    || orbit.metadata.planetRadius!=='24' || orbit.metadata.latitudeCount!=='3' || orbit.metadata.dashPeriod!=='20000' || orbit.metadata.orbitPeriods!=='6000,9000,13000' || orbit.metadata.orbitRadii!=='78x27,104x40,132x54' || orbit.metadata.orbitTilts!=='-28,8,34'
    || orbit.metadata.trailCount!=='12' || orbit.metadata.trailTotal!=='36' || orbit.metadata.trailLag!=='0.055' || orbit.metadata.orbitBackAlpha!=='0.25' || orbit.metadata.headDiameter!=='3'
    || orbit.metadata.rotationDuration!=='350' || orbit.metadata.rotationEasing!=='cubic-bezier(0.65, 0, 0.35, 1)' || orbit.metadata.typeDelay!=='22' || orbit.metadata.blipDuration!=='600' || orbit.metadata.stationPhase!=='4.7124'
    || orbit.metadata.configSignature!=='808BAB9E' || orbit.metadata.initialPositions!=='SAT-01:64.72,-35.58,B|SAT-02:-14.92,-39.59,F|SAT-03:-103.47,-9.89,B'
    || orbit.structure.sceneTag!=='BUTTON' || orbit.structure.svg!==1 || orbit.structure.planetRadius!=='24' || orbit.structure.latitudes!==3 || orbit.structure.latitudeRadii!=='21x4,23x6,21x4' || orbit.structure.latitudeDash!=='3px, 3px'
    || orbit.structure.backPaths!==3 || orbit.structure.frontPaths!==3 || !orbit.structure.pathsDrawn || orbit.structure.backOpacity!=='0.25' || orbit.structure.trails!==36 || orbit.structure.trailsBySat!=='SAT-01:12,SAT-02:12,SAT-03:12'
    || Math.abs(orbit.structure.trailOpacityMin-.052)>.001 || Math.abs(orbit.structure.trailOpacityMax-.62)>.001 || orbit.structure.heads!==3 || orbit.structure.headRadii!=='1.5,1.5,1.5' || orbit.structure.selectedHeads!==1 || orbit.structure.selectedFill!=='rgb(167, 139, 250)' || !orbit.structure.selectedFilter.includes('drop-shadow')
    || orbit.structure.station!==1 || orbit.structure.leader!==1 || orbit.structure.leaderSegments!==3 || !orbit.structure.leaderAnchored || orbit.structure.readoutTag!=='OUTPUT' || orbit.structure.readoutHidden!=='true' || orbit.structure.statusLive!=='polite'
    || orbit.structure.corners!==4 || orbit.structure.sceneRadius!=='4px' || !orbit.structure.sceneInside || !orbit.structure.readoutInside || !orbit.structure.headsInside || orbit.structure.focusables!==1 || Math.abs(orbit.structure.width-(result.width-20))>.1 || Math.abs(orbit.structure.height-264)>.1
    || orbit.initial.selected!==1 || orbit.initial.selectedId!=='SAT-02' || orbit.initial.readoutTarget!=='SAT-02 / ALT 412KM / VEL 7.6' || orbit.initial.cameraAngle!==-8 || orbit.initial.cameraTarget!==-8 || orbit.initial.rotationAnimating!=='false' || orbit.initial.selectedFill!=='rgb(167, 139, 250)' || !orbit.initial.buttonLabel.startsWith('SAT-02 selected')
    || orbit.pointer.start.selected!==2 || orbit.pointer.start.selectedId!=='SAT-03' || orbit.pointer.start.selections!==1 || orbit.pointer.start.source!=='pointer' || orbit.pointer.start.readoutTarget!=='SAT-03 / ALT 536KM / VEL 7.3' || !orbit.pointer.start.buttonLabel.startsWith('SAT-03 selected') || !orbit.pointer.start.announcement.startsWith('SAT-03 selected.') || !orbit.pointer.start.focused
    || orbit.pointer.end.selectedId!=='SAT-03' || orbit.pointer.end.cameraAngle!==-34 || orbit.pointer.end.cameraTarget!==-34 || orbit.pointer.end.rotationProgress!==1 || orbit.pointer.end.rotationEase!==1 || orbit.pointer.end.rotationAnimating!=='false' || orbit.pointer.end.readoutText!=='SAT-03 / ALT 536KM / VEL 7.3' || orbit.pointer.end.actualReadout!==orbit.pointer.end.readoutTarget || orbit.pointer.end.typing!=='false' || orbit.pointer.end.typedChars!==28
    || orbit.keyboard.start.selected!==0 || orbit.keyboard.start.selectedId!=='SAT-01' || orbit.keyboard.start.selections!==2 || orbit.keyboard.start.source!=='keyboard' || orbit.keyboard.start.readoutTarget!=='SAT-01 / ALT 357KM / VEL 7.8' || !orbit.keyboard.start.buttonLabel.startsWith('SAT-01 selected') || !orbit.keyboard.start.announcement.startsWith('SAT-01 selected.') || !orbit.keyboard.start.focused
    || orbit.keyboard.end.selectedId!=='SAT-01' || orbit.keyboard.end.cameraAngle!==28 || orbit.keyboard.end.cameraTarget!==28 || orbit.keyboard.end.rotationProgress!==1 || orbit.keyboard.end.rotationAnimating!=='false' || orbit.keyboard.end.readoutText!=='SAT-01 / ALT 357KM / VEL 7.8' || orbit.keyboard.end.actualReadout!==orbit.keyboard.end.readoutTarget || orbit.keyboard.end.typing!=='false' || orbit.keyboard.end.typedChars!==28
    || !orbit.final.sceneInside || !orbit.final.readoutInside || !orbit.final.headsInside || orbit.final.scrollWidth!==orbit.final.clientWidth || orbit.final.snapshot.selectedId!=='SAT-01';
  const orbitMotionFailed=reducedMotion
    ? !orbit || orbit.reduced!=='true' || orbit.initial.frames!==0 || orbit.initial.simulationTime!==0 || orbit.initial.running!=='false' || orbit.initial.positions!==orbit.metadata.initialPositions || orbit.initial.phases!=='0.3500,4.5684,2.4000' || orbit.initial.dashOffset!==0 || orbit.initial.blips!==0 || orbit.initial.stationBlip!=='false' || orbit.initial.typing!=='false' || orbit.initial.readoutText!==orbit.initial.readoutTarget || orbit.initial.typedChars!==28
      || orbit.initialFull!==null || orbit.motion!==null || orbit.visibility!==null || !orbit.reducedStable || orbit.reducedStable.frames!==0 || orbit.reducedStable.simulationTime!==0 || orbit.reducedStable.positions!==orbit.initial.positions || orbit.reducedStable.phases!==orbit.initial.phases || orbit.reducedStable.dashOffset!==0 || orbit.reducedStable.blips!==0 || orbit.reducedStable.running!=='false'
      || orbit.pointer.start.frames!==0 || orbit.pointer.start.simulationTime!==0 || orbit.pointer.start.cameraAngle!==-34 || orbit.pointer.start.rotationAnimating!=='false' || orbit.pointer.start.rotationProgress!==1 || orbit.pointer.start.typing!=='false' || orbit.pointer.start.readoutText!==orbit.pointer.start.readoutTarget || orbit.pointer.start.blips!==0 || orbit.pointer.start.running!=='false'
      || orbit.keyboard.start.frames!==0 || orbit.keyboard.start.simulationTime!==0 || orbit.keyboard.start.cameraAngle!==28 || orbit.keyboard.start.rotationAnimating!=='false' || orbit.keyboard.start.rotationProgress!==1 || orbit.keyboard.start.typing!=='false' || orbit.keyboard.start.readoutText!==orbit.keyboard.start.readoutTarget || orbit.keyboard.start.blips!==0 || orbit.keyboard.start.running!=='false'
      || orbit.final.snapshot.frames!==0 || orbit.final.snapshot.simulationTime!==0 || orbit.final.snapshot.running!=='false'
    : !orbit || orbit.reduced!=='false' || !orbit.boot || orbit.boot.simulationTime<=0 || orbit.boot.blips<1 || orbit.boot.stationBlip!=='true' || !orbit.boot.stationClass || orbit.boot.stationFill!=='rgb(74, 222, 128)' || orbit.boot.pulseOpacity<=0 || orbit.initial.frames<=0 || orbit.initial.simulationTime<=0 || orbit.initial.running!=='true'
      || !orbit.initialFull || orbit.initialFull.readoutText!==orbit.initialFull.readoutTarget || orbit.initialFull.typing!=='false' || orbit.initialFull.typedChars!==28
      || !orbit.motion || orbit.motion.after.frames<=orbit.motion.before.frames || orbit.motion.after.simulationTime<=orbit.motion.before.simulationTime || orbit.motion.after.phases===orbit.motion.before.phases || orbit.motion.after.positions===orbit.motion.before.positions || Math.abs(orbit.motion.dashRate+.0006)>.00002
      || Math.abs((Number(orbit.motion.after.phases.split(',')[1])-Number(orbit.motion.before.phases.split(',')[1]))-((orbit.motion.after.simulationTime-orbit.motion.before.simulationTime)*Math.PI*2/9000))>.003
      || orbit.pointer.start.cameraAngle!==-8 || orbit.pointer.start.cameraTarget!==-34 || orbit.pointer.start.rotationProgress!==0 || orbit.pointer.start.rotationEase!==0 || orbit.pointer.start.rotationAnimating!=='true' || orbit.pointer.start.typedChars!==0 || orbit.pointer.start.typing!=='true' || orbit.pointer.start.readoutText!==''
      || orbit.pointer.early.rotationProgress<.25 || orbit.pointer.early.rotationProgress>.5 || orbit.pointer.early.cameraAngle>=-8 || orbit.pointer.early.cameraAngle<=-34 || orbit.pointer.early.typedChars!==Math.floor((orbit.pointer.early.simulationTime-orbit.pointer.start.simulationTime)/22)
      || !orbit.visibility || orbit.visibility.paused.state.running!=='false' || orbit.visibility.stable.state.running!=='false' || orbit.visibility.paused.key!==orbit.visibility.stable.key || orbit.visibility.resumed.state.running!=='true' || orbit.visibility.resumed.state.simulationTime<orbit.visibility.stable.state.simulationTime || orbit.visibility.resumed.state.simulationTime-orbit.visibility.stable.state.simulationTime>50.1 || orbit.visibility.resumed.state.frames<orbit.visibility.stable.state.frames || orbit.visibility.resumed.state.frames-orbit.visibility.stable.state.frames>1
      || orbit.pointer.end.frames<=orbit.pointer.start.frames || orbit.keyboard.start.cameraAngle!==-34 || orbit.keyboard.start.cameraTarget!==28 || orbit.keyboard.start.rotationProgress!==0 || orbit.keyboard.start.rotationAnimating!=='true' || orbit.keyboard.start.typedChars!==0 || orbit.keyboard.start.typing!=='true'
      || orbit.keyboard.end.frames<=orbit.keyboard.start.frames || orbit.final.snapshot.frames<=orbit.initial.frames || orbit.final.snapshot.simulationTime<=orbit.initial.simulationTime || orbit.final.snapshot.running!=='true';
  const orbitFailed=demoId==='fui-orbital-tracker'&&(orbitCommonFailed||orbitMotionFailed);
  if (!result.root || result.height !== 320 || result.scrollHeight !== result.clientHeight || result.scrollWidth !== result.clientWidth || errors.length || fuiFailed || lockFailed || bootFailed || scopeFailed || scannerFailed || streamFailed || authFailed || hexFailed || tradeFailed || orbitFailed) process.exitCode = 1;
}

main().catch(error => { console.error(error); process.exitCode = 1; });

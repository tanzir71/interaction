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
  let donut = null;
  if (root.classList.contains('d-ascii-donut')) {
    const donutReduced=root.dataset.reduced==='true';
    const donutScene=root.querySelector('.d-ascii-donut-scene');
    const donutCanvas=root.querySelector('.d-ascii-donut-canvas');
    const donutStatus=root.querySelector('.d-ascii-donut-status');
    const wait=function(ms){return new Promise(function(resolve){setTimeout(resolve,ms)})};
    const poll=async function(test,timeout){const started=performance.now();while(performance.now()-started<(timeout||1200)){if(test())return true;await wait(16)}return test()};
    const rectOf=function(node){const box=node.getBoundingClientRect();return {left:box.left,top:box.top,right:box.right,bottom:box.bottom,width:box.width,height:box.height}};
    const inside=function(inner,outer){return inner.left>=outer.left-.5&&inner.right<=outer.right+.5&&inner.top>=outer.top-.5&&inner.bottom<=outer.bottom+.5};
    const snapshot=function(){return {
      angleA:Number(root.dataset.angleA),angleB:Number(root.dataset.angleB),velocityA:Number(root.dataset.velocityA),velocityB:Number(root.dataset.velocityB),
      renderFrames:Number(root.dataset.renderFrames),manualRenders:Number(root.dataset.manualRenders),rafFrames:Number(root.dataset.rafFrames),simulationTime:Number(root.dataset.simulationTime),
      lastRenderAt:Number(root.dataset.lastRenderAt),renderGap:Number(root.dataset.renderGap),occupiedCells:Number(root.dataset.occupiedCells),silhouetteCells:Number(root.dataset.silhouetteCells),accentCells:Number(root.dataset.accentCells),
      glyphChecksum:root.dataset.glyphChecksum,initialChecksum:root.dataset.initialChecksum,glyphsUsed:root.dataset.glyphsUsed,silhouetteBounds:root.dataset.silhouetteBounds,
      dragging:root.dataset.dragging,dragPointer:Number(root.dataset.dragPointer),dragMoves:Number(root.dataset.dragMoves),dragDistance:Number(root.dataset.dragDistance),paused:root.dataset.paused,running:root.dataset.running,reduced:root.dataset.reduced,source:root.dataset.source
    }};
    const freezeKey=function(state){return [state.angleA,state.angleB,state.velocityA,state.velocityB,state.renderFrames,state.rafFrames,state.simulationTime,state.glyphChecksum].join('|')};
    const pixels=(function(){
      const data=donutCanvas.getContext('2d').getImageData(0,0,donutCanvas.width,donutCanvas.height).data;
      let nonBackground=0,accent=0,bright=0,minInk=765,maxInk=0;
      for(let index=0;index<data.length;index+=4){
        const red=data[index],green=data[index+1],blue=data[index+2];
        const distance=Math.abs(red-10)+Math.abs(green-10)+Math.abs(blue-11);
        if(distance>18){nonBackground++;minInk=Math.min(minInk,red+green+blue);maxInk=Math.max(maxInk,red+green+blue)}
        if(blue-green>10&&red-green>3&&blue>45)accent++;
        if(red>140&&green>140&&blue>140)bright++;
      }
      return {nonBackground,accent,bright,minInk,maxInk,total:data.length/4};
    })();
    const rootRect=rectOf(root);
    const sceneRect=rectOf(donutScene);
    const canvasRect=rectOf(donutCanvas);
    const focusSelector='button,input,select,textarea,a[href],[tabindex]';
    const structure={
      sceneTag:donutScene.tagName,canvasCount:root.querySelectorAll('.d-ascii-donut-canvas').length,canvasRole:donutCanvas.getAttribute('role'),canvasLabel:donutCanvas.getAttribute('aria-label'),
      rootTabIndex:root.getAttribute('tabindex'),rootLabel:root.getAttribute('aria-label'),shortcuts:root.getAttribute('aria-keyshortcuts'),focusables:(root.matches(focusSelector)?1:0)+root.querySelectorAll(focusSelector).length,
      statusLive:donutStatus.getAttribute('aria-live'),statusAtomic:donutStatus.getAttribute('aria-atomic'),topbars:root.querySelectorAll('.d-ascii-donut-topbar').length,footers:root.querySelectorAll('.d-ascii-donut-footer').length,corners:root.querySelectorAll('.d-ascii-donut-corner').length,
      sceneRadius:getComputedStyle(donutScene).borderRadius,sceneBorder:getComputedStyle(donutScene).borderWidth,sceneBackground:getComputedStyle(donutScene).backgroundColor,rootBackground:getComputedStyle(root).backgroundColor,rootColor:getComputedStyle(root).color,touchAction:getComputedStyle(root).touchAction,overlayBackground:getComputedStyle(root,'::before').backgroundImage,labelFont:getComputedStyle(root.querySelector('.d-ascii-donut-angles')).fontSize,dataFont:getComputedStyle(root.querySelector('.d-ascii-donut-angles b')).fontSize,
      sceneInside:inside(sceneRect,rootRect),canvasInside:inside(canvasRect,sceneRect),sceneWidth:sceneRect.width,sceneHeight:sceneRect.height,canvasClientWidth:donutCanvas.clientWidth,canvasClientHeight:donutCanvas.clientHeight,
      canvasWidth:donutCanvas.width,canvasHeight:donutCanvas.height,dpr:Number(root.dataset.dpr),canvasSized:donutCanvas.width===Math.round(donutCanvas.clientWidth*Number(root.dataset.dpr))&&donutCanvas.height===Math.round(donutCanvas.clientHeight*Number(root.dataset.dpr)),fontSize:Number(root.dataset.fontSize),maxGlyphAdvance:Number(root.dataset.maxGlyphAdvance),cellWidth:donutCanvas.clientWidth/48,colorBuckets:Number(root.dataset.colorBuckets),
      rampText:root.querySelector('.d-ascii-donut-ramp b').textContent,gridText:root.querySelector('.d-ascii-donut-grid b').textContent,pixels
    };
    const initial=snapshot();
    let motion=null;
    let visibility=null;
    let reducedStable=null;
    let pointer=null;
    let keyboard=null;
    if(!donutReduced){
      await poll(function(){return Number(root.dataset.renderFrames)>=initial.renderFrames+4},1000);
      const motionAfter=snapshot();
      const motionFrames=motionAfter.renderFrames-initial.renderFrames;
      motion={before:initial,after:motionAfter,frameDelta:motionFrames,simulationDelta:motionAfter.simulationTime-initial.simulationTime,angleADelta:motionAfter.angleA-initial.angleA,angleBDelta:motionAfter.angleB-initial.angleB,averageInterval:motionFrames?(motionAfter.simulationTime-initial.simulationTime)/motionFrames:0};
      const box=donutScene.getBoundingClientRect();
      const startX=box.left+box.width*.5,startY=box.top+box.height*.5;
      donutScene.dispatchEvent(new PointerEvent('pointerdown',{bubbles:true,pointerId:31,pointerType:'mouse',isPrimary:true,button:0,buttons:1,clientX:startX,clientY:startY}));
      donutScene.dispatchEvent(new PointerEvent('pointermove',{bubbles:true,pointerId:31,pointerType:'mouse',isPrimary:true,button:0,buttons:1,clientX:startX+25,clientY:startY-15}));
      const dragActive=snapshot();
      donutScene.dispatchEvent(new PointerEvent('pointerup',{bubbles:true,pointerId:31,pointerType:'mouse',isPrimary:true,button:0,buttons:0,clientX:startX+25,clientY:startY-15}));
      const released=snapshot();
      await poll(function(){return Number(root.dataset.renderFrames)>=released.renderFrames+4},1000);
      const inertia=snapshot();
      const inertiaFrames=inertia.renderFrames-released.renderFrames;
      pointer={active:dragActive,released,inertia,inertiaFrames,expectedVelocityA:.04+(-.12-.04)*Math.pow(.95,inertiaFrames),expectedVelocityB:.02+(.2-.02)*Math.pow(.95,inertiaFrames),focused:document.activeElement===root,status:donutStatus.textContent};
      root.style.transform='translateY(1000px)';
      await poll(function(){return root.dataset.running==='false'},1000);
      const hidden=snapshot();
      await wait(350);
      const stable=snapshot();
      root.style.transform='';
      await poll(function(){return root.dataset.running==='true'},1000);
      const resumed=snapshot();
      visibility={hidden:{state:hidden,key:freezeKey(hidden)},stable:{state:stable,key:freezeKey(stable)},resumed:{state:resumed,key:freezeKey(resumed)}};
      donutScene.dispatchEvent(new PointerEvent('pointerdown',{bubbles:true,pointerId:32,pointerType:'mouse',isPrimary:true,button:0,buttons:1,clientX:startX,clientY:startY}));
      donutScene.dispatchEvent(new PointerEvent('pointermove',{bubbles:true,pointerId:32,pointerType:'mouse',isPrimary:true,button:0,buttons:1,clientX:startX-10,clientY:startY+10}));
      donutScene.dispatchEvent(new PointerEvent('pointercancel',{bubbles:true,pointerId:32,pointerType:'mouse',isPrimary:true,button:0,buttons:0,clientX:startX-10,clientY:startY+10}));
      pointer.cancelled=snapshot();
      root.focus({preventScroll:true});
      const keyBefore=snapshot();
      root.dispatchEvent(new KeyboardEvent('keydown',{bubbles:true,key:'ArrowRight'}));
      const arrow=snapshot();
      root.dispatchEvent(new KeyboardEvent('keydown',{bubbles:true,key:'ArrowDown',shiftKey:true}));
      const shifted=snapshot();
      root.dispatchEvent(new KeyboardEvent('keydown',{bubbles:true,key:'Home'}));
      const home=snapshot();
      root.dispatchEvent(new KeyboardEvent('keydown',{bubbles:true,key:' '}));
      const paused=snapshot();
      await wait(150);
      const pausedStable=snapshot();
      root.dispatchEvent(new KeyboardEvent('keydown',{bubbles:true,key:' '}));
      const resumedKeyboard=snapshot();
      keyboard={before:keyBefore,arrow,shifted,home,paused,pausedStable,resumed:resumedKeyboard,focused:document.activeElement===root,status:donutStatus.textContent};
    }else{
      await wait(550);
      reducedStable=snapshot();
      const box=donutScene.getBoundingClientRect();
      const startX=box.left+box.width*.5,startY=box.top+box.height*.5;
      donutScene.dispatchEvent(new PointerEvent('pointerdown',{bubbles:true,pointerId:41,pointerType:'mouse',isPrimary:true,button:0,buttons:1,clientX:startX,clientY:startY}));
      donutScene.dispatchEvent(new PointerEvent('pointermove',{bubbles:true,pointerId:41,pointerType:'mouse',isPrimary:true,button:0,buttons:1,clientX:startX+25,clientY:startY-15}));
      const dragActive=snapshot();
      donutScene.dispatchEvent(new PointerEvent('pointerup',{bubbles:true,pointerId:41,pointerType:'mouse',isPrimary:true,button:0,buttons:0,clientX:startX+25,clientY:startY-15}));
      const released=snapshot();
      pointer={active:dragActive,released,inertia:null,inertiaFrames:0,focused:document.activeElement===root,status:donutStatus.textContent};
      const keyBefore=snapshot();
      root.dispatchEvent(new KeyboardEvent('keydown',{bubbles:true,key:'ArrowRight'}));
      const arrow=snapshot();
      root.dispatchEvent(new KeyboardEvent('keydown',{bubbles:true,key:' '}));
      const stepped=snapshot();
      root.dispatchEvent(new KeyboardEvent('keydown',{bubbles:true,key:'Home'}));
      const home=snapshot();
      await wait(220);
      const finalStable=snapshot();
      keyboard={before:keyBefore,arrow,stepped,home,finalStable,focused:document.activeElement===root,status:donutStatus.textContent};
    }
    donut={
      metadata:{r1:root.dataset.r1,r2:root.dataset.r2,gridColumns:root.dataset.gridColumns,gridRows:root.dataset.gridRows,thetaSteps:root.dataset.thetaSteps,phiSteps:root.dataset.phiSteps,pointCount:root.dataset.pointCount,glyphRamp:root.dataset.glyphRamp,targetFps:root.dataset.targetFps,frameInterval:root.dataset.frameInterval,autoA:root.dataset.autoA,autoB:root.dataset.autoB,friction:root.dataset.friction,edgeRadius:root.dataset.edgeRadius,accentMix:root.dataset.accentMix,cameraDistance:root.dataset.cameraDistance,projection:root.dataset.projection,initialAngles:root.dataset.initialAngles,dragGain:root.dataset.dragGain,dragClamp:root.dataset.dragClamp,lightDirection:root.dataset.lightDirection},
      structure,initial,motion,visibility,reducedStable,pointer,keyboard,reduced:root.dataset.reduced,final:{snapshot:snapshot(),scrollWidth:root.scrollWidth,clientWidth:root.clientWidth,scrollHeight:root.scrollHeight,clientHeight:root.clientHeight,sceneInside:inside(rectOf(donutScene),rectOf(root)),canvasInside:inside(rectOf(donutCanvas),rectOf(donutScene))}
    };
  }
  let fire = null;
  if (root.classList.contains('d-ascii-fire')) {
    const fireReduced=root.dataset.reduced==='true';
    const fireScene=root.querySelector('.d-ascii-fire-scene');
    const fireCanvas=root.querySelector('.d-ascii-fire-canvas');
    const fireStatus=root.querySelector('.d-ascii-fire-status');
    const wait=function(ms){return new Promise(function(resolve){setTimeout(resolve,ms)})};
    const poll=async function(test,timeout){const started=performance.now();while(performance.now()-started<(timeout||1200)){if(test())return true;await wait(12)}return test()};
    const clamp=function(value,min,max){return Math.max(min,Math.min(max,value))};
    const rectOf=function(node){const box=node.getBoundingClientRect();return {left:box.left,top:box.top,right:box.right,bottom:box.bottom,width:box.width,height:box.height}};
    const inside=function(inner,outer){return inner.left>=outer.left-.5&&inner.right<=outer.right+.5&&inner.top>=outer.top-.5&&inner.bottom<=outer.bottom+.5};
    const inspect=function(){return typeof root.__asciiFireInspect==='function'?root.__asciiFireInspect():null};
    const snapshot=function(){return {
      renderFrames:Number(root.dataset.renderFrames),manualFrames:Number(root.dataset.manualFrames),rafFrames:Number(root.dataset.rafFrames),simulationTime:Number(root.dataset.simulationTime),lastRenderAt:Number(root.dataset.lastRenderAt),renderGap:Number(root.dataset.renderGap),
      rngState:Number(root.dataset.rngState),rngCalls:Number(root.dataset.rngCalls),warmedSeedState:Number(root.dataset.warmedSeedState),averageHeat:Number(root.dataset.averageHeat),minimumHeat:Number(root.dataset.minimumHeat),maximumHeat:Number(root.dataset.maximumHeat),
      coolCells:Number(root.dataset.coolCells),warmCells:Number(root.dataset.warmCells),hotCells:Number(root.dataset.hotCells),coreCells:Number(root.dataset.coreCells),occupiedGlyphs:Number(root.dataset.occupiedGlyphs),glyphsUsed:root.dataset.glyphsUsed,glyphChecksum:root.dataset.glyphChecksum,heatChecksum:root.dataset.heatChecksum,initialChecksum:root.dataset.initialChecksum,initialHeatChecksum:root.dataset.initialHeatChecksum,
      bottomMin:Number(root.dataset.bottomMin),bottomMax:Number(root.dataset.bottomMax),bottomAverage:Number(root.dataset.bottomAverage),decayMin:Number(root.dataset.decayMin),decayMax:Number(root.dataset.decayMax),offsetMin:Number(root.dataset.offsetMin),offsetMax:Number(root.dataset.offsetMax),affectedCells:Number(root.dataset.affectedCells),
      pointerX:Number(root.dataset.pointerX),pointerInside:root.dataset.pointerInside,pointerMoves:Number(root.dataset.pointerMoves),windStrength:Number(root.dataset.windStrength),windSource:root.dataset.windSource,
      surges:Number(root.dataset.surges),surgeStartedAt:Number(root.dataset.surgeStartedAt),surgeUntil:Number(root.dataset.surgeUntil),surgeRemaining:Number(root.dataset.surgeRemaining),surgeActive:root.dataset.surgeActive,fuelFrames:Number(root.dataset.fuelFrames),lastFuelMode:root.dataset.lastFuelMode,
      fontSize:Number(root.dataset.fontSize),maxGlyphAdvance:Number(root.dataset.maxGlyphAdvance),colorBuckets:Number(root.dataset.colorBuckets),running:root.dataset.running,reduced:root.dataset.reduced,source:root.dataset.source,status:fireStatus.textContent
    }};
    const freezeKey=function(state){return [state.renderFrames,state.manualFrames,state.rafFrames,state.simulationTime,state.rngState,state.rngCalls,state.heatChecksum,state.glyphChecksum,state.surgeRemaining].join('|')};
    const validate=function(raw,checkCurrentWind){
      if(!raw||!raw.data)return {ok:false,lengths:false};
      const data=raw.data;
      const columns=64,rows=28,count=columns*rows,propagationCount=(rows-1)*columns;
      const lengths=raw.heat.length===count&&raw.sourceHeat.length===count&&raw.decays.length===propagationCount&&raw.offsets.length===propagationCount&&raw.glyphIndices.length===count&&raw.buckets.length===count;
      if(!lengths)return {ok:false,lengths:false};
      let rangeErrors=0,propagationErrors=0,glyphErrors=0,bucketErrors=0,sourceBottomErrors=0,decayRangeErrors=0,offsetRangeErrors=0,windFormulaErrors=0;
      let total=0,minimum=101,maximum=0,occupied=0,actualDecayMin=5,actualDecayMax=0,actualOffsetMin=3,actualOffsetMax=-3,actualAffected=0,expectedAffected=0;
      const bandCounts=[0,0,0,0],used=new Set(),drawBuckets=new Set();
      for(let index=0;index<count;index++){
        const value=raw.heat[index];
        const glyphIndex=clamp(Math.round(value/100*6),0,6);
        const bucket=value<30?0:value<60?1:value<=85?2:3;
        if(!Number.isInteger(value)||value<0||value>100)rangeErrors++;
        if(raw.glyphIndices[index]!==glyphIndex)glyphErrors++;
        if(raw.buckets[index]!==bucket)bucketErrors++;
        total+=value;minimum=Math.min(minimum,value);maximum=Math.max(maximum,value);bandCounts[bucket]++;used.add(' .:*#%@'[glyphIndex]);
        if(glyphIndex){occupied++;drawBuckets.add(bucket)}
      }
      for(let y=0;y<rows-1;y++)for(let x=0;x<columns;x++){
        const index=y*columns+x;
        const offset=raw.offsets[index];
        const sampleX=x-offset;
        const left=clamp(sampleX-1,0,columns-1),center=clamp(sampleX,0,columns-1),right=clamp(sampleX+1,0,columns-1),below=(y+1)*columns;
        const expected=clamp(Math.floor((raw.sourceHeat[below+left]+raw.sourceHeat[below+center]+raw.sourceHeat[below+right])/3)-raw.decays[index],0,100);
        if(raw.heat[index]!==expected)propagationErrors++;
        if(raw.decays[index]<1||raw.decays[index]>4)decayRangeErrors++;
        if(offset< -2||offset>2)offsetRangeErrors++;
        actualDecayMin=Math.min(actualDecayMin,raw.decays[index]);actualDecayMax=Math.max(actualDecayMax,raw.decays[index]);
        actualOffsetMin=Math.min(actualOffsetMin,offset);actualOffsetMax=Math.max(actualOffsetMax,offset);if(offset!==0)actualAffected++;
        if(checkCurrentWind){
          const pixelX=(x+.5)*Number(data.canvasClientWidth)/columns;
          const influence=data.pointerInside==='true'?Math.max(0,1-Math.abs(pixelX-Number(data.pointerX))/120):0;
          const expectedOffset=Math.round(Number(data.windStrength)*influence*influence);
          if(offset!==expectedOffset)windFormulaErrors++;
          if(expectedOffset!==0)expectedAffected++;
        }
      }
      const bottom=raw.heat.slice(-columns);
      for(let x=0;x<columns;x++)if(raw.sourceHeat[(rows-1)*columns+x]!==bottom[x])sourceBottomErrors++;
      const checksum=function(values,scale){let hash=2166136261;for(let index=0;index<values.length;index++){hash^=Math.round(values[index]*scale)+index;hash=Math.imul(hash,16777619)}return(hash>>>0).toString(16).toUpperCase().padStart(8,'0')};
      const logicalSteps=Number(data.warmupSteps)+Number(data.renderFrames)+Number(data.manualFrames);
      const expectedCalls=logicalSteps*count;
      let expectedState=Number(data.initialSeed)>>>0;
      for(let call=0;call<(logicalSteps-1)*count;call++)expectedState=(Math.imul(expectedState,1664525)+1013904223)>>>0;
      let seedErrors=0;
      const forced=data.lastFuelMode==='surge'||data.lastFuelMode==='reduced pulse';
      for(let x=0;x<columns;x++){
        expectedState=(Math.imul(expectedState,1664525)+1013904223)>>>0;
        const expected=forced?100:70+expectedState%31;
        if(bottom[x]!==expected)seedErrors++;
      }
      let decaySequenceErrors=0;
      for(let index=0;index<propagationCount;index++){
        expectedState=(Math.imul(expectedState,1664525)+1013904223)>>>0;
        if(raw.decays[index]!==1+expectedState%4)decaySequenceErrors++;
      }
      const glyphsUsed=[...' .:*#%@'].filter(function(glyph){return used.has(glyph)}).join('');
      const bottomTotal=bottom.reduce(function(sum,value){return sum+value},0);
      const telemetryOk=Math.abs(Number(data.averageHeat)-total/count)<=.0006&&Number(data.minimumHeat)===minimum&&Number(data.maximumHeat)===maximum
        &&Number(data.coolCells)===bandCounts[0]&&Number(data.warmCells)===bandCounts[1]&&Number(data.hotCells)===bandCounts[2]&&Number(data.coreCells)===bandCounts[3]
        &&Number(data.occupiedGlyphs)===occupied&&data.glyphsUsed===glyphsUsed&&Number(data.colorBuckets)===drawBuckets.size
        &&Number(data.bottomMin)===Math.min(...bottom)&&Number(data.bottomMax)===Math.max(...bottom)&&Math.abs(Number(data.bottomAverage)-bottomTotal/columns)<=.0006
        &&Number(data.decayMin)===actualDecayMin&&Number(data.decayMax)===actualDecayMax&&Number(data.offsetMin)===actualOffsetMin&&Number(data.offsetMax)===actualOffsetMax&&Number(data.affectedCells)===actualAffected
        &&(!checkCurrentWind||actualAffected===expectedAffected);
      const checksumOk=checksum(raw.heat,10)===data.heatChecksum&&checksum(raw.glyphIndices,1)===data.glyphChecksum;
      const rngOk=Number(data.rngCalls)===expectedCalls&&Number(data.rngState)===(expectedState>>>0);
      const ok=lengths&&!rangeErrors&&!propagationErrors&&!glyphErrors&&!bucketErrors&&!sourceBottomErrors&&!decayRangeErrors&&!offsetRangeErrors&&!windFormulaErrors&&!seedErrors&&!decaySequenceErrors&&telemetryOk&&checksumOk&&rngOk;
      return {ok,lengths,rangeErrors,propagationErrors,glyphErrors,bucketErrors,sourceBottomErrors,decayRangeErrors,offsetRangeErrors,windFormulaErrors,seedErrors,decaySequenceErrors,telemetryOk,checksumOk,rngOk,bottomMin:Math.min(...bottom),bottomMax:Math.max(...bottom),bottomDistinct:new Set(bottom).size,bottomHundreds:bottom.filter(function(value){return value===100}).length,offsetMin:actualOffsetMin,offsetMax:actualOffsetMax,affectedCells:actualAffected,bandCounts,occupied,glyphsUsed};
    };
    const pixels=(function(){
      const values=fireCanvas.getContext('2d').getImageData(0,0,fireCanvas.width,fireCanvas.height).data;
      let nonBackground=0,cool=0,error=0,warning=0,core=0,minInk=765,maxInk=0;
      for(let index=0;index<values.length;index+=4){
        const red=values[index],green=values[index+1],blue=values[index+2],distance=Math.abs(red-10)+Math.abs(green-10)+Math.abs(blue-11);
        if(distance>18){nonBackground++;minInk=Math.min(minInk,red+green+blue);maxInk=Math.max(maxInk,red+green+blue)}
        if(red>25&&red<140&&Math.abs(red-green)<12&&blue>=red-5)cool++;
        if(red>70&&red>green*1.35&&red>blue*1.35&&Math.abs(green-blue)<24)error++;
        if(red>100&&green>70&&red>green*1.12&&green>blue*1.5)warning++;
        if(red>180&&green>180&&blue>180)core++;
      }
      return {nonBackground,cool,error,warning,core,minInk,maxInk,total:values.length/4};
    })();
    const rootRect=rectOf(root),sceneRect=rectOf(fireScene),canvasRect=rectOf(fireCanvas),fuelRect=rectOf(root.querySelector('.d-ascii-fire-fuel>i'));
    const focusSelector='button,input,select,textarea,a[href],[tabindex]';
    const structure={
      canvasCount:root.querySelectorAll('.d-ascii-fire-canvas').length,canvasRole:fireCanvas.getAttribute('role'),canvasLabel:fireCanvas.getAttribute('aria-label'),rootTabIndex:root.getAttribute('tabindex'),rootLabel:root.getAttribute('aria-label'),shortcuts:root.getAttribute('aria-keyshortcuts'),focusables:(root.matches(focusSelector)?1:0)+root.querySelectorAll(focusSelector).length,
      statusLive:fireStatus.getAttribute('aria-live'),statusAtomic:fireStatus.getAttribute('aria-atomic'),topbars:root.querySelectorAll('.d-ascii-fire-topbar').length,footers:root.querySelectorAll('.d-ascii-fire-footer').length,
      rootBackground:getComputedStyle(root).backgroundColor,rootColor:getComputedStyle(root).color,sceneBackground:getComputedStyle(fireScene).backgroundColor,sceneBorder:getComputedStyle(fireScene).borderWidth,sceneRadius:getComputedStyle(fireScene).borderRadius,touchAction:getComputedStyle(root).touchAction,overlayBackground:getComputedStyle(root,'::before').backgroundImage,
      labelFont:getComputedStyle(root.querySelector('.d-ascii-fire-wind')).fontSize,dataFont:getComputedStyle(root.querySelector('.d-ascii-fire-wind b')).fontSize,fuelWidth:fuelRect.width,fuelHeight:fuelRect.height,
      sceneInside:inside(sceneRect,rootRect),canvasInside:inside(canvasRect,sceneRect),sceneWidth:sceneRect.width,sceneHeight:sceneRect.height,canvasClientWidth:fireCanvas.clientWidth,canvasClientHeight:fireCanvas.clientHeight,canvasWidth:fireCanvas.width,canvasHeight:fireCanvas.height,dpr:Number(root.dataset.dpr),canvasSized:fireCanvas.width===Math.round(fireCanvas.clientWidth*Number(root.dataset.dpr))&&fireCanvas.height===Math.round(fireCanvas.clientHeight*Number(root.dataset.dpr)),cellWidth:fireCanvas.clientWidth/64,cellHeight:fireCanvas.clientHeight/28,fontSize:Number(root.dataset.fontSize),maxGlyphAdvance:Number(root.dataset.maxGlyphAdvance),colorBuckets:Number(root.dataset.colorBuckets),gridText:root.querySelector('.d-ascii-fire-grid b').textContent,rampText:root.querySelector('.d-ascii-fire-ramp b').textContent,pixels
    };
    const initial=snapshot();
    const initialValidation=validate(inspect(),true);
    let motion=null,visibility=null,reducedStable=null,pointer=null,keyboard=null,surge=null;
    if(!fireReduced){
      await poll(function(){return Number(root.dataset.renderFrames)>=initial.renderFrames+5},1600);
      const motionAfter=snapshot();
      const motionValidation=validate(inspect(),true);
      const motionFrames=motionAfter.renderFrames-initial.renderFrames;
      motion={before:initial,after:motionAfter,validation:motionValidation,frameDelta:motionFrames,simulationDelta:motionAfter.simulationTime-initial.simulationTime,averageInterval:motionFrames?(motionAfter.simulationTime-initial.simulationTime)/motionFrames:0};
      const box=fireScene.getBoundingClientRect(),rightX=box.left+fireScene.clientLeft+fireScene.clientWidth*.96,leftX=box.left+fireScene.clientLeft+fireScene.clientWidth*.04,pointerY=box.top+box.height*.55;
      fireScene.dispatchEvent(new PointerEvent('pointermove',{bubbles:true,pointerId:51,pointerType:'mouse',isPrimary:true,clientX:rightX,clientY:pointerY}));
      const rightSet=snapshot();
      await poll(function(){return Number(root.dataset.renderFrames)>rightSet.renderFrames},1000);
      const right=snapshot(),rightValidation=validate(inspect(),true);
      fireScene.dispatchEvent(new PointerEvent('pointermove',{bubbles:true,pointerId:51,pointerType:'mouse',isPrimary:true,clientX:leftX,clientY:pointerY}));
      const leftSet=snapshot();
      await poll(function(){return Number(root.dataset.renderFrames)>leftSet.renderFrames},1000);
      const left=snapshot(),leftValidation=validate(inspect(),true);
      fireScene.dispatchEvent(new PointerEvent('pointerleave',{bubbles:true,pointerId:51,pointerType:'mouse',isPrimary:true,clientX:leftX,clientY:pointerY}));
      const calmSet=snapshot();
      await poll(function(){return Number(root.dataset.renderFrames)>calmSet.renderFrames},1000);
      const calm=snapshot(),calmValidation=validate(inspect(),true);
      pointer={rightSet,right,rightValidation,leftSet,left,leftValidation,calmSet,calm,calmValidation};
      root.focus({preventScroll:true});
      root.dispatchEvent(new KeyboardEvent('keydown',{bubbles:true,key:'ArrowRight'}));
      const arrow=snapshot();
      await poll(function(){return Number(root.dataset.renderFrames)>arrow.renderFrames},1000);
      const arrowFrame=snapshot(),arrowValidation=validate(inspect(),true);
      root.dispatchEvent(new KeyboardEvent('keydown',{bubbles:true,key:'Home'}));
      const home=snapshot();
      await poll(function(){return Number(root.dataset.renderFrames)>home.renderFrames},1000);
      const homeFrame=snapshot(),homeValidation=validate(inspect(),true);
      keyboard={arrow,arrowFrame,arrowValidation,home,homeFrame,homeValidation,focused:document.activeElement===root};
      const centerX=box.left+box.width*.5,centerY=box.top+box.height*.5;
      fireScene.dispatchEvent(new PointerEvent('pointerdown',{bubbles:true,pointerId:52,pointerType:'mouse',isPrimary:true,button:0,buttons:1,clientX:centerX,clientY:centerY}));
      fireScene.dispatchEvent(new PointerEvent('pointerup',{bubbles:true,pointerId:52,pointerType:'mouse',isPrimary:true,button:0,buttons:0,clientX:centerX,clientY:centerY}));
      fireScene.dispatchEvent(new MouseEvent('click',{bubbles:true,button:0,clientX:centerX,clientY:centerY}));
      const surgeStart=snapshot();
      await poll(function(){return Number(root.dataset.renderFrames)>surgeStart.renderFrames&&root.dataset.lastFuelMode==='surge'},1000);
      const surgeEarly=snapshot(),surgeEarlyValidation=validate(inspect(),true);
      root.style.transform='translateY(1000px)';
      await poll(function(){return root.dataset.running==='false'},1000);
      const hidden=snapshot(),hiddenKey=freezeKey(hidden);
      await wait(350);
      const stable=snapshot(),stableKey=freezeKey(stable);
      root.style.transform='';
      await poll(function(){return root.dataset.running==='true'},1000);
      const resumed=snapshot();
      visibility={hidden,hiddenKey,stable,stableKey,resumed};
      await poll(function(){return root.dataset.surgeActive==='false'&&root.dataset.lastFuelMode==='base'},3300);
      const surgeEnd=snapshot(),surgeEndValidation=validate(inspect(),true);
      surge={start:surgeStart,early:surgeEarly,earlyValidation:surgeEarlyValidation,end:surgeEnd,endValidation:surgeEndValidation,focused:document.activeElement===root,status:fireStatus.textContent};
    }else{
      await wait(550);
      reducedStable=snapshot();
      const box=fireScene.getBoundingClientRect(),rightX=box.left+fireScene.clientLeft+fireScene.clientWidth*.96,pointerY=box.top+box.height*.55;
      fireScene.dispatchEvent(new PointerEvent('pointermove',{bubbles:true,pointerId:61,pointerType:'mouse',isPrimary:true,clientX:rightX,clientY:pointerY}));
      const moved=snapshot(),movedValidation=validate(inspect(),false);
      pointer={moved,movedValidation};
      root.focus({preventScroll:true});
      root.dispatchEvent(new KeyboardEvent('keydown',{bubbles:true,key:'ArrowRight'}));
      const arrow=snapshot(),arrowValidation=validate(inspect(),true);
      root.dispatchEvent(new KeyboardEvent('keydown',{bubbles:true,key:'Home'}));
      const home=snapshot(),homeValidation=validate(inspect(),false);
      const centerX=box.left+box.width*.5,centerY=box.top+box.height*.5;
      fireScene.dispatchEvent(new PointerEvent('pointerdown',{bubbles:true,pointerId:62,pointerType:'mouse',isPrimary:true,button:0,buttons:1,clientX:centerX,clientY:centerY}));
      fireScene.dispatchEvent(new PointerEvent('pointerup',{bubbles:true,pointerId:62,pointerType:'mouse',isPrimary:true,button:0,buttons:0,clientX:centerX,clientY:centerY}));
      fireScene.dispatchEvent(new MouseEvent('click',{bubbles:true,button:0,clientX:centerX,clientY:centerY}));
      const pointerFuel=snapshot(),pointerFuelValidation=validate(inspect(),true);
      root.dispatchEvent(new KeyboardEvent('keydown',{bubbles:true,key:' '}));
      const space=snapshot(),spaceValidation=validate(inspect(),true);
      keyboard={arrow,arrowValidation,home,homeValidation,space,spaceValidation,focused:document.activeElement===root};
      surge={pointerFuel,pointerFuelValidation,focused:document.activeElement===root,status:fireStatus.textContent};
      await wait(550);
    }
    fire={
      metadata:{gridColumns:root.dataset.gridColumns,gridRows:root.dataset.gridRows,cellCount:root.dataset.cellCount,glyphRamp:root.dataset.glyphRamp,targetFps:root.dataset.targetFps,frameInterval:root.dataset.frameInterval,initialSeed:root.dataset.initialSeed,bottomRange:root.dataset.bottomRange,decayRange:root.dataset.decayRange,windMax:root.dataset.windMax,windRadius:root.dataset.windRadius,windFalloff:root.dataset.windFalloff,surgeDuration:root.dataset.surgeDuration,warmupSteps:root.dataset.warmupSteps,colors:root.dataset.colors,boundaryMode:root.dataset.boundaryMode},
      structure,initial,initialValidation,motion,visibility,reducedStable,pointer,keyboard,surge,reduced:root.dataset.reduced,
      final:{snapshot:snapshot(),validation:validate(inspect(),fireReduced?root.dataset.source!=='keyboard calm':true),scrollWidth:root.scrollWidth,clientWidth:root.clientWidth,scrollHeight:root.scrollHeight,clientHeight:root.clientHeight,sceneInside:inside(rectOf(fireScene),rectOf(root)),canvasInside:inside(rectOf(fireCanvas),rectOf(fireScene))}
    };
  }
  let fluid = null;
  if (root.classList.contains('d-ascii-fluid')) {
    const fluidReduced=root.dataset.reduced==='true';
    const fluidScene=root.querySelector('.d-ascii-fluid-scene');
    const fluidCanvas=root.querySelector('.d-ascii-fluid-canvas');
    const fluidStatus=root.querySelector('.d-ascii-fluid-status');
    const fluidReticle=root.querySelector('.d-ascii-fluid-reticle');
    const wait=function(ms){return new Promise(function(resolve){setTimeout(resolve,ms)})};
    const poll=async function(test,timeout){const started=performance.now();while(performance.now()-started<(timeout||1200)){if(test())return true;await wait(12)}return test()};
    const clamp=function(value,min,max){return Math.max(min,Math.min(max,value))};
    const near=function(actual,expected,tolerance){return Math.abs(actual-expected)<=(tolerance||.00003)};
    const rectOf=function(node){const box=node.getBoundingClientRect();return {left:box.left,top:box.top,right:box.right,bottom:box.bottom,width:box.width,height:box.height}};
    const inside=function(inner,outer){return inner.left>=outer.left-.5&&inner.right<=outer.right+.5&&inner.top>=outer.top-.5&&inner.bottom<=outer.bottom+.5};
    const inspect=function(){return typeof root.__asciiFluidInspect==='function'?root.__asciiFluidInspect():null};
    const snapshot=function(){return {
      solverStep:Number(root.dataset.solverStep),renderFrames:Number(root.dataset.renderFrames),manualFrames:Number(root.dataset.manualFrames),rafFrames:Number(root.dataset.rafFrames),simulationTime:Number(root.dataset.simulationTime),lastRenderAt:Number(root.dataset.lastRenderAt),renderGap:Number(root.dataset.renderGap),emitterStep:Number(root.dataset.emitterStep),emitterHorizontal:root.dataset.emitterHorizontal,
      pressureIterationsLast:Number(root.dataset.pressureIterationsLast),divergenceBeforeAverage:Number(root.dataset.divergenceBeforeAverage),divergenceBeforeMaximum:Number(root.dataset.divergenceBeforeMaximum),divergenceAfterAverage:Number(root.dataset.divergenceAfterAverage),divergenceAfterMaximum:Number(root.dataset.divergenceAfterMaximum),densityMinimum:Number(root.dataset.densityMinimum),densityMaximum:Number(root.dataset.densityMaximum),densityAverage:Number(root.dataset.densityAverage),densityTotal:Number(root.dataset.densityTotal),velocityAverage:Number(root.dataset.velocityAverage),velocityMaximum:Number(root.dataset.velocityMaximum),velocityEnergy:Number(root.dataset.velocityEnergy),highVelocityCells:Number(root.dataset.highVelocityCells),infoGlyphCells:Number(root.dataset.infoGlyphCells),occupiedGlyphs:Number(root.dataset.occupiedGlyphs),glyphsUsed:root.dataset.glyphsUsed,colorBuckets:Number(root.dataset.colorBuckets),glyphBucketCounts:root.dataset.glyphBucketCounts,
      densityChecksum:root.dataset.densityChecksum,velocityXChecksum:root.dataset.velocityXChecksum,velocityYChecksum:root.dataset.velocityYChecksum,pressureChecksum:root.dataset.pressureChecksum,glyphChecksum:root.dataset.glyphChecksum,initialDensityChecksum:root.dataset.initialDensityChecksum,initialVelocityXChecksum:root.dataset.initialVelocityXChecksum,initialVelocityYChecksum:root.dataset.initialVelocityYChecksum,initialGlyphChecksum:root.dataset.initialGlyphChecksum,
      dragging:root.dataset.dragging,dragPointer:Number(root.dataset.dragPointer),pointerInside:root.dataset.pointerInside,reticleActive:root.dataset.reticleActive,pointerMoves:Number(root.dataset.pointerMoves),pointerDistance:Number(root.dataset.pointerDistance),pointerGrid:root.dataset.pointerGrid,lastPointerDelta:root.dataset.lastPointerDelta,lastInjectedVelocity:root.dataset.lastInjectedVelocity,lastSplatCells:Number(root.dataset.lastSplatCells),lastSplatWeight:Number(root.dataset.lastSplatWeight),splats:Number(root.dataset.splats),captures:Number(root.dataset.captures),nativeCaptures:Number(root.dataset.nativeCaptures),releases:Number(root.dataset.releases),cancels:Number(root.dataset.cancels),ignoredPointers:Number(root.dataset.ignoredPointers),resets:Number(root.dataset.resets),paused:root.dataset.paused,running:root.dataset.running,reduced:root.dataset.reduced,visible:root.dataset.visible,source:root.dataset.source,status:fluidStatus.textContent
    }};
    const freezeKey=function(state){return [state.solverStep,state.renderFrames,state.manualFrames,state.rafFrames,state.simulationTime,state.densityChecksum,state.velocityXChecksum,state.velocityYChecksum,state.pressureChecksum,state.glyphChecksum,state.splats].join('|')};
    const bilerp=function(field,x,y){const sampleX=clamp(x,0,47),sampleY=clamp(y,0,23),x0=Math.floor(sampleX),y0=Math.floor(sampleY),x1=Math.min(47,x0+1),y1=Math.min(23,y0+1),tx=sampleX-x0,ty=sampleY-y0;return(field[y0*48+x0]*(1-tx)+field[y0*48+x1]*tx)*(1-ty)+(field[y1*48+x0]*(1-tx)+field[y1*48+x1]*tx)*ty};
    const validateSplat=function(raw){
      if(!raw||!raw.splat)return {ok:false};
      const splat=raw.splat,data=raw.data,count=1152;
      const lengths=splat.beforeVelocityX.length===count&&splat.beforeVelocityY.length===count&&splat.afterVelocityX.length===count&&splat.afterVelocityY.length===count&&splat.beforeDensity.length===count&&splat.afterDensity.length===count&&splat.weights.length===count;
      if(!lengths)return {ok:false,lengths:false};
      let weightErrors=0,velocityErrors=0,densityErrors=0,boundaryErrors=0,cells=0,weightTotal=0;
      for(let index=0;index<count;index++){
        const x=index%48,y=Math.floor(index/48),distance=Math.hypot(x-splat.center[0],y-splat.center[1]),weight=distance<3?Math.pow(1-distance/3,2):0,boundary=x===0||x===47||y===0||y===23;
        if(!near(splat.weights[index],weight,.000002))weightErrors++;if(weight>0){cells++;weightTotal+=weight}
        const expectedX=boundary?0:splat.beforeVelocityX[index]+splat.impulse[0]*weight,expectedY=boundary?0:splat.beforeVelocityY[index]+splat.impulse[1]*weight;
        if(!near(splat.afterVelocityX[index],expectedX)||!near(splat.afterVelocityY[index],expectedY))velocityErrors++;
        if(boundary&&(splat.afterVelocityX[index]!==0||splat.afterVelocityY[index]!==0))boundaryErrors++;
        if(splat.beforeDensity[index]!==splat.afterDensity[index])densityErrors++;
      }
      const telemetryOk=near(splat.impulse[0],splat.delta[0]*.6,.000002)&&near(splat.impulse[1],splat.delta[1]*.6,.000002)&&Number(data.lastSplatCells)===cells&&near(Number(data.lastSplatWeight),weightTotal,.000002);
      return {ok:lengths&&!weightErrors&&!velocityErrors&&!densityErrors&&!boundaryErrors&&telemetryOk,lengths,weightErrors,velocityErrors,densityErrors,boundaryErrors,telemetryOk,cells,weightTotal,center:splat.center,delta:splat.delta,impulse:splat.impulse};
    };
    const validate=function(raw){
      if(!raw||!raw.data)return {ok:false,lengths:false};
      const data=raw.data,count=1152,passes=raw.pressurePasses||[];
      const arrays=[raw.preEmitterDensity,raw.preEmitterVelocityX,raw.preEmitterVelocityY,raw.postEmitterDensity,raw.postEmitterVelocityX,raw.postEmitterVelocityY,raw.advectedVelocityX,raw.advectedVelocityY,raw.divergence,raw.pressure,raw.projectedVelocityX,raw.projectedVelocityY,raw.projectedDivergence,raw.advectedDensity,raw.density,raw.velocityX,raw.velocityY,raw.glyphIndices,raw.infoFlags,raw.glyphBuckets];
      const lengths=arrays.every(function(array){return array&&array.length===count})&&passes.length===4&&passes.every(function(pass){return pass.length===count});
      if(!lengths)return {ok:false,lengths:false};
      let finiteErrors=0,emitterErrors=0,advectionErrors=0,boundaryErrors=0,divergenceErrors=0,pressureErrors=0,projectionErrors=0,projectedDivergenceErrors=0,densityErrors=0,currentErrors=0,glyphErrors=0,bucketErrors=0;
      const emitterStep=Number(data.emitterStep),horizontal=[Math.sin(emitterStep*.03)*.04,Math.sin(emitterStep*.03+Math.PI)*.04],anchors=[[15,20],[32,20]];
      for(let index=0;index<count;index++){
        const x=index%48,y=Math.floor(index/48),boundary=x===0||x===47||y===0||y===23,isAnchor=(x===15&&y===20)||(x===32&&y===20);
        const expectedDensity=clamp(raw.preEmitterDensity[index]+(isAnchor?.3:0),0,1);
        let expectedSourceX=raw.preEmitterVelocityX[index],expectedSourceY=raw.preEmitterVelocityY[index];
        for(let emitter=0;emitter<2;emitter++){const distance=Math.hypot(x-anchors[emitter][0],y-anchors[emitter][1]);if(distance<3){const weight=Math.pow(1-distance/3,2);expectedSourceX+=horizontal[emitter]*weight;expectedSourceY-=.08*weight}}
        if(!near(raw.postEmitterDensity[index],expectedDensity)||!near(raw.postEmitterVelocityX[index],expectedSourceX)||!near(raw.postEmitterVelocityY[index],expectedSourceY))emitterErrors++;
        const expectedAdvectedX=boundary?0:bilerp(raw.postEmitterVelocityX,x-raw.postEmitterVelocityX[index],y-raw.postEmitterVelocityY[index])*.98,expectedAdvectedY=boundary?0:bilerp(raw.postEmitterVelocityY,x-raw.postEmitterVelocityX[index],y-raw.postEmitterVelocityY[index])*.98;
        if(!near(raw.advectedVelocityX[index],expectedAdvectedX)||!near(raw.advectedVelocityY[index],expectedAdvectedY))advectionErrors++;
        if(boundary&&(raw.advectedVelocityX[index]!==0||raw.advectedVelocityY[index]!==0||raw.divergence[index]!==0||raw.projectedVelocityX[index]!==0||raw.projectedVelocityY[index]!==0||raw.projectedDivergence[index]!==0))boundaryErrors++;
        const expectedDivergence=boundary?0:-.5*((raw.advectedVelocityX[index+1]-raw.advectedVelocityX[index-1])+(raw.advectedVelocityY[index+48]-raw.advectedVelocityY[index-48]));if(!near(raw.divergence[index],expectedDivergence))divergenceErrors++;
        let previous=null;
        for(let pass=0;pass<4;pass++){const field=passes[pass],expectedPressure=boundary?0:(raw.divergence[index]+(previous?previous[index-1]+previous[index+1]+previous[index-48]+previous[index+48]:0))*.25;if(!near(field[index],expectedPressure))pressureErrors++;previous=field}
        if(!near(raw.pressure[index],passes[3][index]))pressureErrors++;
        const expectedProjectedX=boundary?0:raw.advectedVelocityX[index]-.5*(passes[3][index+1]-passes[3][index-1]),expectedProjectedY=boundary?0:raw.advectedVelocityY[index]-.5*(passes[3][index+48]-passes[3][index-48]);
        if(!near(raw.projectedVelocityX[index],expectedProjectedX)||!near(raw.projectedVelocityY[index],expectedProjectedY))projectionErrors++;
        const expectedProjectedDivergence=boundary?0:-.5*((raw.projectedVelocityX[index+1]-raw.projectedVelocityX[index-1])+(raw.projectedVelocityY[index+48]-raw.projectedVelocityY[index-48]));if(!near(raw.projectedDivergence[index],expectedProjectedDivergence))projectedDivergenceErrors++;
        const expectedDensityNext=clamp(bilerp(raw.postEmitterDensity,x-raw.projectedVelocityX[index],y-raw.projectedVelocityY[index])*.98,0,1);if(!near(raw.advectedDensity[index],expectedDensityNext))densityErrors++;
        if(!near(raw.density[index],raw.advectedDensity[index])||!near(raw.velocityX[index],raw.projectedVelocityX[index])||!near(raw.velocityY[index],raw.projectedVelocityY[index]))currentErrors++;
        if(!Number.isFinite(raw.density[index])||!Number.isFinite(raw.velocityX[index])||!Number.isFinite(raw.velocityY[index])||raw.density[index]<0||raw.density[index]>1)finiteErrors++;
      }
      const checksum=function(values,scale){let hash=2166136261;for(let index=0;index<values.length;index++){hash^=Math.round(values[index]*scale)+index;hash=Math.imul(hash,16777619)}return(hash>>>0).toString(16).toUpperCase().padStart(8,'0')};
      let densityTotal=0,densityMin=1,densityMax=0,velocityTotal=0,velocityMax=0,energyTotal=0,highVelocity=0,infoGlyphs=0,occupied=0,divBeforeTotal=0,divBeforeMax=0,divAfterTotal=0,divAfterMax=0;
      const counts=[0,0,0,0],used=new Set(),drawBuckets=new Set();
      for(let index=0;index<count;index++){
        const value=clamp(raw.density[index],0,1),speed=Math.hypot(raw.velocityX[index],raw.velocityY[index]),glyphIndex=clamp(Math.round(value*9),0,9),info=speed>.12,bright=value>=.72,bucket=info?(bright?3:2):(bright?1:0);
        if(raw.glyphIndices[index]!==glyphIndex)glyphErrors++;if(raw.infoFlags[index] !== (info?1:0)||raw.glyphBuckets[index]!==bucket)bucketErrors++;
        densityTotal+=value;densityMin=Math.min(densityMin,value);densityMax=Math.max(densityMax,value);velocityTotal+=speed;velocityMax=Math.max(velocityMax,speed);energyTotal+=speed*speed;if(info)highVelocity++;counts[bucket]++;used.add(' .:-=+*#%@'[glyphIndex]);if(glyphIndex){occupied++;drawBuckets.add(bucket);if(info)infoGlyphs++}
        const x=index%48,y=Math.floor(index/48);if(x>0&&x<47&&y>0&&y<23){const before=Math.abs(raw.divergence[index]),after=Math.abs(raw.projectedDivergence[index]);divBeforeTotal+=before;divBeforeMax=Math.max(divBeforeMax,before);divAfterTotal+=after;divAfterMax=Math.max(divAfterMax,after)}
      }
      const glyphsUsed=[...' .:-=+*#%@'].filter(function(glyph){return used.has(glyph)}).join('');
      const statsOk=near(Number(data.densityMinimum),densityMin,.000001)&&near(Number(data.densityMaximum),densityMax,.000001)&&near(Number(data.densityAverage),densityTotal/count,.000001)&&near(Number(data.densityTotal),densityTotal,.000001)&&near(Number(data.velocityAverage),velocityTotal/count,.000001)&&near(Number(data.velocityMaximum),velocityMax,.000001)&&near(Number(data.velocityEnergy),energyTotal/count,.000001)&&Number(data.highVelocityCells)===highVelocity&&Number(data.infoGlyphCells)===infoGlyphs&&Number(data.occupiedGlyphs)===occupied&&data.glyphsUsed===glyphsUsed&&data.glyphBucketCounts===counts.join(',')&&Number(data.colorBuckets)===drawBuckets.size&&near(Number(data.divergenceBeforeAverage),divBeforeTotal/1012,.000001)&&near(Number(data.divergenceBeforeMaximum),divBeforeMax,.000001)&&near(Number(data.divergenceAfterAverage),divAfterTotal/1012,.000001)&&near(Number(data.divergenceAfterMaximum),divAfterMax,.000001);
      const checksumOk=checksum(raw.density,10000)===data.densityChecksum&&checksum(raw.velocityX,10000)===data.velocityXChecksum&&checksum(raw.velocityY,10000)===data.velocityYChecksum&&checksum(raw.pressure,10000)===data.pressureChecksum&&checksum(raw.glyphIndices,1)===data.glyphChecksum;
      const horizontalData=data.emitterHorizontal.split(',').map(Number),timingOk=Number(data.pressureIterationsLast)===4&&Number(data.emitterStep)===Number(data.solverStep)-1&&near(horizontalData[0],horizontal[0],.00001)&&near(horizontalData[1],horizontal[1],.00001);
      const ok=lengths&&!finiteErrors&&!emitterErrors&&!advectionErrors&&!boundaryErrors&&!divergenceErrors&&!pressureErrors&&!projectionErrors&&!projectedDivergenceErrors&&!densityErrors&&!currentErrors&&!glyphErrors&&!bucketErrors&&statsOk&&checksumOk&&timingOk;
      return {ok,lengths,finiteErrors,emitterErrors,advectionErrors,boundaryErrors,divergenceErrors,pressureErrors,projectionErrors,projectedDivergenceErrors,densityErrors,currentErrors,glyphErrors,bucketErrors,statsOk,checksumOk,timingOk,counts,occupied,glyphsUsed,projectionRatio:divBeforeTotal?divAfterTotal/divBeforeTotal:0};
    };
    const splatConsumed=function(raw){if(!raw||!raw.splat)return -1;let errors=0;for(let index=0;index<1152;index++)if(!near(raw.preEmitterVelocityX[index],raw.splat.afterVelocityX[index])||!near(raw.preEmitterVelocityY[index],raw.splat.afterVelocityY[index])||raw.preEmitterDensity[index]!==raw.splat.afterDensity[index])errors++;return errors};
    const pixelScan=function(){const values=fluidCanvas.getContext('2d').getImageData(0,0,fluidCanvas.width,fluidCanvas.height).data;let nonBackground=0,low=0,bright=0,infoLow=0,infoBright=0,minInk=765,maxInk=0;for(let index=0;index<values.length;index+=4){const red=values[index],green=values[index+1],blue=values[index+2],distance=Math.abs(red-10)+Math.abs(green-10)+Math.abs(blue-11);if(distance>18){nonBackground++;minInk=Math.min(minInk,red+green+blue);maxInk=Math.max(maxInk,red+green+blue)}if(Math.abs(red-155)<12&&Math.abs(green-155)<12&&Math.abs(blue-163)<12)low++;if(red>210&&green>210&&blue>210)bright++;if(Math.abs(red-134)<14&&Math.abs(green-186)<14&&Math.abs(blue-197)<14)infoLow++;if(Math.abs(red-183)<14&&Math.abs(green-234)<14&&Math.abs(blue-243)<14)infoBright++}return {nonBackground,low,bright,infoLow,infoBright,minInk,maxInk,total:values.length/4}};
    const rootRect=rectOf(root),sceneRect=rectOf(fluidScene),canvasRect=rectOf(fluidCanvas),reticleRect=rectOf(fluidReticle),focusSelector='button,input,select,textarea,a[href],[tabindex]';
    const structure={role:root.getAttribute('role'),canvasCount:root.querySelectorAll('.d-ascii-fluid-canvas').length,canvasRole:fluidCanvas.getAttribute('role'),canvasLabel:fluidCanvas.getAttribute('aria-label'),rootTabIndex:root.getAttribute('tabindex'),rootLabel:root.getAttribute('aria-label'),shortcuts:root.getAttribute('aria-keyshortcuts'),focusables:(root.matches(focusSelector)?1:0)+root.querySelectorAll(focusSelector).length,statusLive:fluidStatus.getAttribute('aria-live'),statusAtomic:fluidStatus.getAttribute('aria-atomic'),headerText:root.querySelector('.d-ascii-fluid-topbar').textContent,footerItems:root.querySelectorAll('.d-ascii-fluid-footer span').length,rootBackground:getComputedStyle(root).backgroundColor,rootColor:getComputedStyle(root).color,sceneBackground:getComputedStyle(fluidScene).backgroundColor,sceneBorder:getComputedStyle(fluidScene).borderWidth,sceneRadius:getComputedStyle(fluidScene).borderRadius,touchAction:getComputedStyle(root).touchAction,overlayBackground:getComputedStyle(root,'::before').backgroundImage,headerFont:getComputedStyle(root.querySelector('.d-ascii-fluid-topbar')).fontSize,footerFont:getComputedStyle(root.querySelector('.d-ascii-fluid-footer')).fontSize,reticleBorder:getComputedStyle(fluidReticle).borderWidth,reticleColor:getComputedStyle(fluidReticle).borderColor,reticleOpacity:getComputedStyle(fluidReticle).opacity,reticleWidth:reticleRect.width,reticleHeight:reticleRect.height,sceneInside:inside(sceneRect,rootRect),canvasInside:inside(canvasRect,sceneRect),sceneWidth:sceneRect.width,sceneHeight:sceneRect.height,canvasClientWidth:fluidCanvas.clientWidth,canvasClientHeight:fluidCanvas.clientHeight,canvasWidth:fluidCanvas.width,canvasHeight:fluidCanvas.height,dpr:Number(root.dataset.dpr),canvasSized:fluidCanvas.width===Math.round(fluidCanvas.clientWidth*Number(root.dataset.dpr))&&fluidCanvas.height===Math.round(fluidCanvas.clientHeight*Number(root.dataset.dpr)),cellWidth:Number(root.dataset.cellWidth),cellHeight:Number(root.dataset.cellHeight),fontSize:Number(root.dataset.fontSize),maxGlyphAdvance:Number(root.dataset.maxGlyphAdvance),colorBuckets:Number(root.dataset.colorBuckets),pixels:pixelScan()};
    const initial=snapshot(),initialValidation=validate(inspect());
    let motion=null,visibility=null,reducedStable=null,pointer=null,keyboard=null,reset=null;
    if(!fluidReduced){
      await poll(function(){return Number(root.dataset.renderFrames)>=initial.renderFrames+5},1600);const motionAfter=snapshot(),motionValidation=validate(inspect()),motionFrames=motionAfter.renderFrames-initial.renderFrames;motion={before:initial,after:motionAfter,validation:motionValidation,frameDelta:motionFrames,simulationDelta:motionAfter.simulationTime-initial.simulationTime,averageInterval:motionFrames?(motionAfter.simulationTime-initial.simulationTime)/motionFrames:0};
      const box=fluidScene.getBoundingClientRect(),startX=box.left+fluidScene.clientLeft+fluidScene.clientWidth*.4,startY=box.top+fluidScene.clientTop+fluidScene.clientHeight*.6;
      fluidScene.dispatchEvent(new PointerEvent('pointerdown',{bubbles:true,pointerId:71,pointerType:'mouse',isPrimary:true,button:0,buttons:1,clientX:startX,clientY:startY}));const down=snapshot();fluidScene.dispatchEvent(new PointerEvent('pointermove',{bubbles:true,pointerId:99,pointerType:'mouse',isPrimary:true,button:0,buttons:1,clientX:startX+8,clientY:startY+8}));const ignored=snapshot();fluidScene.dispatchEvent(new PointerEvent('pointermove',{bubbles:true,pointerId:71,pointerType:'mouse',isPrimary:true,button:0,buttons:1,clientX:startX+24,clientY:startY-18}));const moved=snapshot(),movedSplat=validateSplat(inspect());await poll(function(){return Number(root.dataset.solverStep)>moved.solverStep},1000);const solved=snapshot(),solvedRaw=inspect(),solvedValidation=validate(solvedRaw),consumedErrors=splatConsumed(solvedRaw);fluidScene.dispatchEvent(new PointerEvent('pointerup',{bubbles:true,pointerId:71,pointerType:'mouse',isPrimary:true,button:0,buttons:0,clientX:startX+24,clientY:startY-18}));const released=snapshot();
      fluidScene.dispatchEvent(new PointerEvent('pointerdown',{bubbles:true,pointerId:72,pointerType:'mouse',isPrimary:true,button:0,buttons:1,clientX:startX,clientY:startY}));fluidScene.dispatchEvent(new PointerEvent('pointermove',{bubbles:true,pointerId:72,pointerType:'mouse',isPrimary:true,button:0,buttons:1,clientX:startX-12,clientY:startY+10}));const beforeCancel=snapshot(),cancelSplat=validateSplat(inspect());fluidScene.dispatchEvent(new PointerEvent('pointercancel',{bubbles:true,pointerId:72,pointerType:'mouse',isPrimary:true,button:0,buttons:0,clientX:startX-12,clientY:startY+10}));const cancelled=snapshot();pointer={down,ignored,moved,movedSplat,solved,solvedValidation,consumedErrors,released,beforeCancel,cancelSplat,cancelled,focused:document.activeElement===root};
      root.dispatchEvent(new KeyboardEvent('keydown',{bubbles:true,key:'ArrowRight'}));const arrow=snapshot(),arrowSplat=validateSplat(inspect());await poll(function(){return Number(root.dataset.solverStep)>arrow.solverStep},1000);const arrowSolved=snapshot(),arrowValidation=validate(inspect());root.dispatchEvent(new KeyboardEvent('keydown',{bubbles:true,key:'Home'}));const home=snapshot();root.dispatchEvent(new KeyboardEvent('keydown',{bubbles:true,key:' '}));const paused=snapshot();await wait(160);const pausedStable=snapshot();root.dispatchEvent(new KeyboardEvent('keydown',{bubbles:true,key:' '}));const resumed=snapshot();keyboard={arrow,arrowSplat,arrowSolved,arrowValidation,home,paused,pausedStable,resumed,focused:document.activeElement===root};
      root.style.transform='translateY(1000px)';await poll(function(){return root.dataset.running==='false'},1000);const hidden=snapshot(),hiddenKey=freezeKey(hidden);await wait(350);const stable=snapshot(),stableKey=freezeKey(stable);fluidScene.dispatchEvent(new PointerEvent('pointerdown',{bubbles:true,pointerId:73,pointerType:'mouse',isPrimary:true,button:0,buttons:1,clientX:startX,clientY:startY}));const resetCapture=snapshot(),nativeBeforeReset=fluidScene.hasPointerCapture?fluidScene.hasPointerCapture(73):false;root.dispatchEvent(new KeyboardEvent('keydown',{bubbles:true,key:'R'}));const resetState=snapshot(),resetValidation=validate(inspect()),nativeAfterReset=fluidScene.hasPointerCapture?fluidScene.hasPointerCapture(73):false;root.style.transform='';await poll(function(){return root.dataset.running==='true'},1000);const visible=snapshot();visibility={hidden,hiddenKey,stable,stableKey,visible};reset={capture:resetCapture,nativeBefore:nativeBeforeReset,nativeAfter:nativeAfterReset,state:resetState,validation:resetValidation};
    }else{
      await wait(550);reducedStable=snapshot();const box=fluidScene.getBoundingClientRect(),startX=box.left+fluidScene.clientLeft+fluidScene.clientWidth*.4,startY=box.top+fluidScene.clientTop+fluidScene.clientHeight*.6;
      fluidScene.dispatchEvent(new PointerEvent('pointerdown',{bubbles:true,pointerId:81,pointerType:'mouse',isPrimary:true,button:0,buttons:1,clientX:startX,clientY:startY}));const down=snapshot();fluidScene.dispatchEvent(new PointerEvent('pointermove',{bubbles:true,pointerId:98,pointerType:'mouse',isPrimary:true,button:0,buttons:1,clientX:startX+8,clientY:startY}));const ignored=snapshot();fluidScene.dispatchEvent(new PointerEvent('pointermove',{bubbles:true,pointerId:81,pointerType:'mouse',isPrimary:true,button:0,buttons:1,clientX:startX+24,clientY:startY-18}));const moved=snapshot(),movedRaw=inspect(),movedSplat=validateSplat(movedRaw),movedValidation=validate(movedRaw),movedConsumed=splatConsumed(movedRaw);fluidScene.dispatchEvent(new PointerEvent('pointerup',{bubbles:true,pointerId:81,pointerType:'mouse',isPrimary:true,button:0,buttons:0,clientX:startX+24,clientY:startY-18}));const released=snapshot();fluidScene.dispatchEvent(new PointerEvent('pointerdown',{bubbles:true,pointerId:82,pointerType:'mouse',isPrimary:true,button:0,buttons:1,clientX:startX,clientY:startY}));fluidScene.dispatchEvent(new PointerEvent('pointermove',{bubbles:true,pointerId:82,pointerType:'mouse',isPrimary:true,button:0,buttons:1,clientX:startX-12,clientY:startY+10}));const beforeCancel=snapshot(),cancelSplat=validateSplat(inspect());fluidScene.dispatchEvent(new PointerEvent('pointercancel',{bubbles:true,pointerId:82,pointerType:'mouse',isPrimary:true,button:0,buttons:0,clientX:startX-12,clientY:startY+10}));const cancelled=snapshot();pointer={down,ignored,moved,movedSplat,movedValidation,movedConsumed,released,beforeCancel,cancelSplat,cancelled,focused:document.activeElement===root};
      root.dispatchEvent(new KeyboardEvent('keydown',{bubbles:true,key:'ArrowRight'}));const arrow=snapshot(),arrowRaw=inspect(),arrowSplat=validateSplat(arrowRaw),arrowValidation=validate(arrowRaw),arrowConsumed=splatConsumed(arrowRaw);root.dispatchEvent(new KeyboardEvent('keydown',{bubbles:true,key:'Home'}));const home=snapshot();root.dispatchEvent(new KeyboardEvent('keydown',{bubbles:true,key:' '}));const space=snapshot(),spaceValidation=validate(inspect());keyboard={arrow,arrowSplat,arrowValidation,arrowConsumed,home,space,spaceValidation,focused:document.activeElement===root};fluidScene.dispatchEvent(new PointerEvent('pointerdown',{bubbles:true,pointerId:83,pointerType:'mouse',isPrimary:true,button:0,buttons:1,clientX:startX,clientY:startY}));const resetCapture=snapshot(),nativeBeforeReset=fluidScene.hasPointerCapture?fluidScene.hasPointerCapture(83):false;root.dispatchEvent(new KeyboardEvent('keydown',{bubbles:true,key:'R'}));const resetState=snapshot(),resetValidation=validate(inspect()),nativeAfterReset=fluidScene.hasPointerCapture?fluidScene.hasPointerCapture(83):false;reset={capture:resetCapture,nativeBefore:nativeBeforeReset,nativeAfter:nativeAfterReset,state:resetState,validation:resetValidation};await wait(550);
    }
    fluid={metadata:{gridColumns:root.dataset.gridColumns,gridRows:root.dataset.gridRows,cellCount:root.dataset.cellCount,glyphRamp:root.dataset.glyphRamp,dissipation:root.dataset.dissipation,jacobiIterations:root.dataset.jacobiIterations,emitterCount:root.dataset.emitterCount,emitterPositions:root.dataset.emitterPositions,emitterDensity:root.dataset.emitterDensity,emitterHorizontalForce:root.dataset.emitterHorizontalForce,emitterUpwardForce:root.dataset.emitterUpwardForce,emitterDriftRate:root.dataset.emitterDriftRate,emitterCarrierRadius:root.dataset.emitterCarrierRadius,emitterCarrierFalloff:root.dataset.emitterCarrierFalloff,emitterPhases:root.dataset.emitterPhases,pointerGain:root.dataset.pointerGain,splatRadius:root.dataset.splatRadius,splatFalloff:root.dataset.splatFalloff,velocityThreshold:root.dataset.velocityThreshold,infoMix:root.dataset.infoMix,brightDensityThreshold:root.dataset.brightDensityThreshold,divergenceScale:root.dataset.divergenceScale,projectionScale:root.dataset.projectionScale,renderColors:root.dataset.renderColors,targetFps:root.dataset.targetFps,frameInterval:root.dataset.frameInterval,warmupSteps:root.dataset.warmupSteps,boundaryMode:root.dataset.boundaryMode,advection:root.dataset.advection,interpolation:root.dataset.interpolation},structure,initial,initialValidation,motion,visibility,reducedStable,pointer,keyboard,reset,reduced:root.dataset.reduced,final:{snapshot:snapshot(),validation:validate(inspect()),scrollWidth:root.scrollWidth,clientWidth:root.clientWidth,scrollHeight:root.scrollHeight,clientHeight:root.clientHeight,sceneInside:inside(rectOf(fluidScene),rectOf(root)),canvasInside:inside(rectOf(fluidCanvas),rectOf(fluidScene))}};
  }
  let portrait=null;
  if(root.classList.contains('d-ascii-portrait')){
    const portraitReduced=root.dataset.reduced==='true';
    const portraitScene=root.querySelector('.d-ascii-portrait-scene');
    const portraitCanvas=root.querySelector('.d-ascii-portrait-canvas');
    const portraitStatus=root.querySelector('.d-ascii-portrait-status');
    const portraitMode=root.querySelector('.d-ascii-portrait-mode');
    const portraitReadout=root.querySelector('.d-ascii-portrait-reveal-readout');
    const wait=function(ms){return new Promise(function(resolve){setTimeout(resolve,ms)})};
    const poll=async function(test,timeout){const started=performance.now();while(performance.now()-started<(timeout||1200)){if(test())return true;await wait(12)}return test()};
    const clamp=function(value,min,max){return Math.max(min,Math.min(max,value))};
    const near=function(actual,expected,tolerance){return Math.abs(actual-expected)<=(tolerance||.00003)};
    const rectOf=function(node){const box=node.getBoundingClientRect();return {left:box.left,top:box.top,right:box.right,bottom:box.bottom,width:box.width,height:box.height}};
    const inside=function(inner,outer){return inner.left>=outer.left-.5&&inner.right<=outer.right+.5&&inner.top>=outer.top-.5&&inner.bottom<=outer.bottom+.5};
    const inspect=function(){return typeof root.__asciiPortraitInspect==='function'?root.__asciiPortraitInspect():null};
    const checksum=function(values,scale){let hash=2166136261;for(let index=0;index<values.length;index++){hash^=Math.round(values[index]*scale)+index;hash=Math.imul(hash,16777619)}return(hash>>>0).toString(16).toUpperCase().padStart(8,'0')};
    const snapshot=function(){return {
      activeTime:Number(root.dataset.activeTime),schedulerFrames:Number(root.dataset.schedulerFrames),renderFrames:Number(root.dataset.renderFrames),inputUpdates:Number(root.dataset.inputUpdates),pointerMoves:Number(root.dataset.pointerMoves),keyboardMoves:Number(root.dataset.keyboardMoves),
      pointerActive:root.dataset.pointerActive,pointerInside:root.dataset.pointerInside,pointerX:Number(root.dataset.pointerX),pointerY:Number(root.dataset.pointerY),pointerNormalized:root.dataset.pointerNormalized,dragging:root.dataset.dragging,dragPointer:Number(root.dataset.dragPointer),
      revealCells:Number(root.dataset.revealCells),accentCells:Number(root.dataset.accentCells),filledCells:Number(root.dataset.filledCells),glyphCells:Number(root.dataset.glyphCells),trailCells:Number(root.dataset.trailCells),revealTotal:Number(root.dataset.revealTotal),revealMaximum:Number(root.dataset.revealMaximum),
      sourceChecksum:root.dataset.sourceChecksum,cellChecksum:root.dataset.cellChecksum,glyphChecksum:root.dataset.glyphChecksum,revealChecksum:root.dataset.revealChecksum,targetChecksum:root.dataset.targetChecksum,edgeChecksum:root.dataset.edgeChecksum,renderBucketChecksum:root.dataset.renderBucketChecksum,renderBucketCounts:root.dataset.renderBucketCounts,initialRevealChecksum:root.dataset.initialRevealChecksum,
      lastUpdateSource:root.dataset.lastUpdateSource,lastUpdateTime:Number(root.dataset.lastUpdateTime),lastUpdateAffected:Number(root.dataset.lastUpdateAffected),lastUpdateIncrease:Number(root.dataset.lastUpdateIncrease),lastUpdateDecrease:Number(root.dataset.lastUpdateDecrease),lastUpdateBeforeChecksum:root.dataset.lastUpdateBeforeChecksum,lastUpdateTargetChecksum:root.dataset.lastUpdateTargetChecksum,lastUpdateAfterChecksum:root.dataset.lastUpdateAfterChecksum,lastUpdateDeltaChecksum:root.dataset.lastUpdateDeltaChecksum,
      captures:Number(root.dataset.captures),nativeCaptures:Number(root.dataset.nativeCaptures),releases:Number(root.dataset.releases),cancels:Number(root.dataset.cancels),ignoredPointers:Number(root.dataset.ignoredPointers),resets:Number(root.dataset.resets),running:root.dataset.running,reduced:root.dataset.reduced,visible:root.dataset.visible,source:root.dataset.source,status:portraitStatus.textContent,mode:portraitMode.textContent,readout:portraitReadout.textContent
    }};
    const freezeKey=function(state){return [state.activeTime,state.schedulerFrames,state.renderFrames,state.inputUpdates,state.pointerMoves,state.keyboardMoves,state.revealChecksum,state.targetChecksum,state.edgeChecksum,state.renderBucketChecksum,state.captures,state.releases,state.cancels,state.ignoredPointers].join('|')};
    const pixelNoise=function(x,y){let hash=(Math.imul(x+1,374761393)^Math.imul(y+1,668265263)^0x9e3779b9)>>>0;hash=Math.imul(hash^(hash>>>13),1274126177);return((hash^(hash>>>16))>>>0)/4294967296};
    const ellipse=function(u,v,cx,cy,rx,ry){const amount=clamp((Math.hypot((u-cx)/rx,(v-cy)/ry)-.84)/(1.08-.84),0,1);return 1-amount*amount*(3-2*amount)};
    const validateStatic=function(raw){
      if(!raw||!raw.data)return {ok:false,lengths:false};
      const lengths=raw.sourcePixels.length===73728&&raw.cellSampleRgb.length===3456&&raw.cellAverageLuma.length===1152&&raw.cellLuminance.length===1152&&raw.glyphIndices.length===1152;
      if(!lengths)return {ok:false,lengths:false};
      const expectedPixels=new Uint8Array(73728),expectedSamples=new Uint8Array(3456),expectedLuma=new Float32Array(1152),expectedNormalized=new Float32Array(1152),expectedGlyphs=new Int8Array(1152);
      let sourceErrors=0,sourceMinimum=255,sourceMaximum=0,darkPixels=0,brightPixels=0;const distinct=new Set();
      for(let y=0;y<96;y++)for(let x=0;x<192;x++){
        const u=(x+.5)/192,v=(y+.5)/96,head=ellipse(u,v,.5,.39,.17,.28),neck=ellipse(u,v,.5,.67,.095,.18),shoulders=ellipse(u,v,.5,.91,.47,.29),bust=Math.max(head,neck,shoulders);
        const backgroundDistance=Math.hypot((u-.72)/.88,(v-.24)/.82),keyDistance=Math.hypot((u-.42)/.34,(v-.31)/.52),rimDistance=Math.hypot((u-.63)/.20,(v-.39)/.40);
        const backgroundLight=.27+.58*Math.pow(Math.max(0,1-backgroundDistance),2),keyLight=Math.pow(Math.max(0,1-keyDistance),2),rimLight=Math.pow(Math.max(0,1-rimDistance),2),bustLight=.05+.26*keyLight+.14*rimLight;
        const noise=(pixelNoise(x,y)-.5)*.025+(pixelNoise(Math.floor(x/4),Math.floor(y/4))-.5)*.07,tone=clamp(backgroundLight*(1-bust)+bustLight*bust+noise,0,1);
        const colors=[Math.round(22+214*tone),Math.round(22+214*tone),Math.round(25+214*tone),255],offset=(y*192+x)*4;
        for(let channel=0;channel<4;channel++){expectedPixels[offset+channel]=colors[channel];if(raw.sourcePixels[offset+channel]!==colors[channel])sourceErrors++}
        sourceMinimum=Math.min(sourceMinimum,colors[0],colors[1],colors[2]);sourceMaximum=Math.max(sourceMaximum,colors[0],colors[1],colors[2]);distinct.add(colors[0]);if(colors[0]<55)darkPixels++;if(colors[0]>150)brightPixels++;
      }
      let sampleErrors=0,lumaErrors=0,glyphErrors=0,luminanceMinimum=1,luminanceMaximum=0,occupied=0;const glyphCounts=new Array(10).fill(0),lowLuminance=22*.2126+22*.7152+25*.0722,highLuminance=236*.2126+236*.7152+239*.0722;
      for(let gy=0;gy<24;gy++)for(let gx=0;gx<48;gx++){
        let red=0,green=0,blue=0;for(let sy=0;sy<4;sy++)for(let sx=0;sx<4;sx++){const offset=((gy*4+sy)*192+gx*4+sx)*4;red+=expectedPixels[offset];green+=expectedPixels[offset+1];blue+=expectedPixels[offset+2]}
        const averageRed=red/16,averageGreen=green/16,averageBlue=blue/16,index=gy*48+gx,luma=averageRed*.2126+averageGreen*.7152+averageBlue*.0722,normalized=clamp((luma-lowLuminance)/(highLuminance-lowLuminance),0,1),normalizedFloat=Math.fround(normalized),glyph=clamp(Math.round(normalizedFloat*9),0,9),sample=[Math.round(averageRed),Math.round(averageGreen),Math.round(averageBlue)];
        expectedLuma[index]=luma;expectedNormalized[index]=normalized;expectedGlyphs[index]=glyph;for(let channel=0;channel<3;channel++){expectedSamples[index*3+channel]=sample[channel];if(raw.cellSampleRgb[index*3+channel]!==sample[channel])sampleErrors++}
        if(!near(raw.cellAverageLuma[index],Math.fround(luma),.00002)||!near(raw.cellLuminance[index],normalizedFloat,.000002))lumaErrors++;if(raw.glyphIndices[index]!==glyph)glyphErrors++;luminanceMinimum=Math.min(luminanceMinimum,normalized);luminanceMaximum=Math.max(luminanceMaximum,normalized);glyphCounts[glyph]++;if(glyph>0)occupied++;
      }
      const expectedSourceChecksum=checksum(expectedPixels,1),expectedCellChecksum=checksum(expectedSamples,1),expectedGlyphChecksum=checksum(expectedGlyphs,1),data=raw.data;
      const telemetryOk=data.sourceChecksum===expectedSourceChecksum&&data.cellChecksum===expectedCellChecksum&&data.glyphChecksum===expectedGlyphChecksum&&Number(data.sourceChannelMinimum)===sourceMinimum&&Number(data.sourceChannelMaximum)===sourceMaximum&&near(Number(data.cellLuminanceMinimum),luminanceMinimum,.000001)&&near(Number(data.cellLuminanceMaximum),luminanceMaximum,.000001);
      return {ok:lengths&&!sourceErrors&&!sampleErrors&&!lumaErrors&&!glyphErrors&&telemetryOk,lengths,sourceBytesChecked:73728,cellsChecked:1152,sourceErrors,sampleErrors,lumaErrors,glyphErrors,telemetryOk,expectedSourceChecksum,expectedCellChecksum,expectedGlyphChecksum,sourceMinimum,sourceMaximum,sourceDistinct:distinct.size,darkPixels,brightPixels,luminanceMinimum,luminanceMaximum,occupied,glyphCounts};
    };
    const validateState=function(raw){
      if(!raw||!raw.data)return {ok:false,lengths:false};
      const arrays=[raw.directWeights,raw.revealStrengths,raw.trailStartStrengths,raw.trailStartedAt,raw.cellDistances,raw.accentFlags,raw.renderBuckets,raw.lastUpdate.before,raw.lastUpdate.target,raw.lastUpdate.after,raw.lastUpdate.delta],lengths=arrays.every(function(values){return values&&values.length===1152});
      if(!lengths)return {ok:false,lengths:false};
      const data=raw.data,time=Number(data.activeTime),active=data.pointerActive==='true',pointerX=Number(data.pointerX),pointerY=Number(data.pointerY),cellWidth=Number(data.canvasClientWidth)/48,cellHeight=Number(data.canvasClientHeight)/24;
      let distanceErrors=0,targetErrors=0,trailErrors=0,revealErrors=0,accentErrors=0,bucketErrors=0,finiteErrors=0,lastUpdateErrors=0,revealCells=0,accentCells=0,filledCells=0,glyphCells=0,trailCells=0,revealTotal=0,revealMaximum=0,affected=0,increase=0,decrease=0;const buckets=[0,0,0,0];
      for(let index=0;index<1152;index++){
        const x=index%48,y=Math.floor(index/48),expectedDistance=active?Math.hypot((x+.5)*cellWidth-pointerX,(y+.5)*cellHeight-pointerY):Infinity,distance=raw.cellDistances[index];
        if(active?!near(distance,expectedDistance,.002):distance!==Infinity)distanceErrors++;
        const influence=active&&distance<90?Math.max(0,1-distance/90):0,expectedTarget=influence*influence;if(!near(raw.directWeights[index],expectedTarget,.000003))targetErrors++;
        const start=raw.trailStartStrengths[index],stamp=raw.trailStartedAt[index],residual=start*clamp(1-(time-stamp)/600,0,1),expectedReveal=Math.max(raw.directWeights[index],residual);if(!near(raw.revealStrengths[index],expectedReveal,.000004))revealErrors++;
        if(start<0||start>1||stamp<0||!Number.isFinite(start)||!Number.isFinite(stamp)||raw.directWeights[index]<0||raw.directWeights[index]>1||raw.revealStrengths[index]<0||raw.revealStrengths[index]>1)finiteErrors++;
        const expectedAccent=active&&raw.glyphIndices[index]>0&&distance>=78&&distance<90?1:0,expectedBucket=expectedAccent?3:expectedReveal>=.999?2:expectedReveal>0?1:0;if(raw.accentFlags[index]!==expectedAccent)accentErrors++;if(raw.renderBuckets[index]!==expectedBucket)bucketErrors++;buckets[expectedBucket]++;
        if(expectedReveal>0){revealCells++;revealTotal+=expectedReveal;revealMaximum=Math.max(revealMaximum,expectedReveal)}if(expectedAccent)accentCells++;if(expectedReveal>=.5)filledCells++;if(raw.glyphIndices[index]>0&&expectedReveal<.999)glyphCells++;if(residual>raw.directWeights[index]+1e-7)trailCells++;
        const before=raw.lastUpdate.before[index],after=raw.lastUpdate.after[index],delta=raw.lastUpdate.delta[index];if(!near(delta,after-before,.000003)||!near(raw.lastUpdate.target[index],raw.directWeights[index],.000003))lastUpdateErrors++;if(Math.abs(after-before)>1e-7)affected++;if(after>before)increase+=after-before;if(after<before)decrease+=before-after;
      }
      const checksumsOk=data.revealChecksum===checksum(raw.revealStrengths,10000)&&data.targetChecksum===checksum(raw.directWeights,10000)&&data.edgeChecksum===checksum(raw.accentFlags,1)&&data.renderBucketChecksum===checksum(raw.renderBuckets,1)&&data.lastUpdateBeforeChecksum===checksum(raw.lastUpdate.before,10000)&&data.lastUpdateTargetChecksum===checksum(raw.lastUpdate.target,10000)&&data.lastUpdateAfterChecksum===checksum(raw.lastUpdate.after,10000)&&data.lastUpdateDeltaChecksum===checksum(raw.lastUpdate.delta,10000);
      const statsOk=Number(data.revealCells)===revealCells&&Number(data.accentCells)===accentCells&&Number(data.filledCells)===filledCells&&Number(data.glyphCells)===glyphCells&&Number(data.trailCells)===trailCells&&near(Number(data.revealTotal),revealTotal,.000002)&&near(Number(data.revealMaximum),revealMaximum,.000002)&&data.renderBucketCounts===buckets.join(',')&&Number(data.lastUpdateAffected)===affected&&near(Number(data.lastUpdateIncrease),increase,.000002)&&near(Number(data.lastUpdateDecrease),decrease,.000002)&&raw.lastUpdate.source===data.lastUpdateSource&&near(raw.lastUpdate.time,Number(data.lastUpdateTime),.001);
      return {ok:lengths&&!distanceErrors&&!targetErrors&&!trailErrors&&!revealErrors&&!accentErrors&&!bucketErrors&&!finiteErrors&&!lastUpdateErrors&&checksumsOk&&statsOk,lengths,cellsChecked:1152,distanceErrors,targetErrors,trailErrors,revealErrors,accentErrors,bucketErrors,finiteErrors,lastUpdateErrors,checksumsOk,statsOk,buckets,revealCells,accentCells,filledCells,glyphCells,trailCells,revealTotal,revealMaximum};
    };
    const validateTransition=function(before,after,expectedSource){
      if(!before||!after)return {ok:false,lengths:false};
      const time=Number(after.data.activeTime),reducedNow=after.data.reduced==='true';let clockErrors=Math.abs(time-Number(before.data.activeTime))>.001?1:0,modelErrors=0,lastUpdateErrors=0,affected=0,increase=0,decrease=0;
      for(let index=0;index<1152;index++){
        const oldDirect=before.directWeights[index],oldStart=before.trailStartStrengths[index],oldStamp=before.trailStartedAt[index],oldResidual=oldStart*clamp(1-(time-oldStamp)/600,0,1),expectedBefore=Math.max(oldDirect,oldResidual),target=after.directWeights[index];
        let nextStart=oldStart,nextStamp=oldStamp;if(reducedNow){nextStart=0;nextStamp=time}else if(oldDirect>target&&oldDirect>=oldResidual){nextStart=oldDirect;nextStamp=time}else if(oldResidual<=0){nextStart=0;nextStamp=time}
        const nextResidual=nextStart*clamp(1-(time-nextStamp)/600,0,1),expectedAfter=reducedNow?target:Math.max(target,nextResidual),delta=expectedAfter-expectedBefore;
        if(!near(after.trailStartStrengths[index],nextStart,.000003)||!near(after.trailStartedAt[index],nextStamp,.001))modelErrors++;
        if(!near(after.lastUpdate.before[index],expectedBefore,.000004)||!near(after.lastUpdate.target[index],target,.000003)||!near(after.lastUpdate.after[index],expectedAfter,.000004)||!near(after.lastUpdate.delta[index],delta,.000004))lastUpdateErrors++;
        if(Math.abs(delta)>1e-7)affected++;if(delta>0)increase+=delta;if(delta<0)decrease-=delta;
      }
      const telemetryOk=after.lastUpdate.source===expectedSource&&after.data.lastUpdateSource===expectedSource&&near(after.lastUpdate.time,time,.001)&&Number(after.data.inputUpdates)===Number(before.data.inputUpdates)+1&&after.lastUpdate.affected===affected&&near(after.lastUpdate.increase,increase,.000002)&&near(after.lastUpdate.decrease,decrease,.000002);
      return {ok:!clockErrors&&!modelErrors&&!lastUpdateErrors&&telemetryOk,lengths:true,cellsChecked:1152,clockErrors,modelErrors,lastUpdateErrors,telemetryOk,affected,increase,decrease};
    };
    const pixelScan=function(){const values=portraitCanvas.getContext('2d').getImageData(0,0,portraitCanvas.width,portraitCanvas.height).data;let nonBackground=0,txt1=0,accent=0,sourceTone=0,brightTone=0,minInk=765,maxInk=0;for(let index=0;index<values.length;index+=4){const red=values[index],green=values[index+1],blue=values[index+2],backgroundDistance=Math.abs(red-10)+Math.abs(green-10)+Math.abs(blue-11);if(backgroundDistance>15){nonBackground++;minInk=Math.min(minInk,red+green+blue);maxInk=Math.max(maxInk,red+green+blue)}if(Math.abs(red-155)<18&&Math.abs(green-155)<18&&Math.abs(blue-163)<18)txt1++;if(blue-red>45&&blue-green>65&&red>110)accent++;if(backgroundDistance>15&&Math.abs(red-green)<=2&&blue>=red&&blue-red<=5){sourceTone++;if(red>145)brightTone++}}return {total:values.length/4,nonBackground,txt1,accent,sourceTone,brightTone,minInk,maxInk}};
    const cellPoint=function(x,y){const box=portraitScene.getBoundingClientRect(),localX=(x+.5)*portraitScene.clientWidth/48,localY=(y+.5)*portraitScene.clientHeight/24;return {x:localX,y:localY,clientX:box.left+portraitScene.clientLeft+localX,clientY:box.top+portraitScene.clientTop+localY,index:y*48+x}};
    const sampleCell=function(point,raw){const dpr=Number(root.dataset.dpr),pixel=portraitCanvas.getContext('2d').getImageData(clamp(Math.floor(point.x*dpr),0,portraitCanvas.width-1),clamp(Math.floor(point.y*dpr),0,portraitCanvas.height-1),1,1).data,offset=point.index*3;return {actual:[pixel[0],pixel[1],pixel[2],pixel[3]],expected:[raw.cellSampleRgb[offset],raw.cellSampleRgb[offset+1],raw.cellSampleRgb[offset+2],255]}};
    const rootRect=rectOf(root),sceneRect=rectOf(portraitScene),canvasRect=rectOf(portraitCanvas),focusSelector='button,input,select,textarea,a[href],[tabindex]';
    const structure={role:root.getAttribute('role'),canvasCount:root.querySelectorAll('.d-ascii-portrait-canvas').length,canvasRole:portraitCanvas.getAttribute('role'),canvasLabel:portraitCanvas.getAttribute('aria-label'),rootTabIndex:root.getAttribute('tabindex'),rootLabel:root.getAttribute('aria-label'),shortcuts:root.getAttribute('aria-keyshortcuts'),focusables:(root.matches(focusSelector)?1:0)+root.querySelectorAll(focusSelector).length,statusLive:portraitStatus.getAttribute('aria-live'),statusAtomic:portraitStatus.getAttribute('aria-atomic'),headerText:root.querySelector('.d-ascii-portrait-topbar').textContent,footerItems:root.querySelectorAll('.d-ascii-portrait-footer span').length,rootBackground:getComputedStyle(root).backgroundColor,rootColor:getComputedStyle(root).color,sceneBackground:getComputedStyle(portraitScene).backgroundColor,sceneBorder:getComputedStyle(portraitScene).borderWidth,sceneRadius:getComputedStyle(portraitScene).borderRadius,touchAction:getComputedStyle(root).touchAction,overlayBackground:getComputedStyle(root,'::before').backgroundImage,headerFont:getComputedStyle(root.querySelector('.d-ascii-portrait-topbar')).fontSize,footerFont:getComputedStyle(root.querySelector('.d-ascii-portrait-footer')).fontSize,sceneInside:inside(sceneRect,rootRect),canvasInside:inside(canvasRect,sceneRect),sceneWidth:sceneRect.width,sceneHeight:sceneRect.height,canvasClientWidth:portraitCanvas.clientWidth,canvasClientHeight:portraitCanvas.clientHeight,canvasWidth:portraitCanvas.width,canvasHeight:portraitCanvas.height,dpr:Number(root.dataset.dpr),canvasSized:portraitCanvas.width===Math.round(portraitCanvas.clientWidth*Number(root.dataset.dpr))&&portraitCanvas.height===Math.round(portraitCanvas.clientHeight*Number(root.dataset.dpr)),cellWidth:Number(root.dataset.cellWidth),cellHeight:Number(root.dataset.cellHeight),fontSize:Number(root.dataset.fontSize),maxGlyphAdvance:Number(root.dataset.maxGlyphAdvance),baselinePixels:pixelScan()};
    let currentRaw=inspect();const initial=snapshot(),staticValidation=validateStatic(currentRaw),initialValidation=validateState(currentRaw);await wait(180);const idleStable=snapshot(),idleStableKey=freezeKey(idleStable),initialKey=freezeKey(initial);
    const ignoredBefore=snapshot();portraitScene.dispatchEvent(new PointerEvent('pointerenter',{bubbles:true,pointerId:90,pointerType:'mouse',isPrimary:false,clientX:sceneRect.left+20,clientY:sceneRect.top+20}));const ignoredSecondary=snapshot();portraitScene.dispatchEvent(new PointerEvent('pointerdown',{bubbles:true,pointerId:91,pointerType:'mouse',isPrimary:true,button:2,buttons:2,clientX:sceneRect.left+24,clientY:sceneRect.top+24}));const ignoredRight=snapshot();const ignored={before:ignoredBefore,secondary:ignoredSecondary,right:ignoredRight};currentRaw=inspect();
    const pointA=cellPoint(15,9),beforeEnter=currentRaw;portraitScene.dispatchEvent(new PointerEvent('pointerenter',{bubbles:true,pointerId:1,pointerType:'mouse',isPrimary:true,clientX:pointA.clientX,clientY:pointA.clientY}));currentRaw=inspect();const hoverEnter={snapshot:snapshot(),transition:validateTransition(beforeEnter,currentRaw,'pointer enter'),validation:validateState(currentRaw),pixels:pixelScan(),sample:sampleCell(pointA,currentRaw)};
    const pointB=cellPoint(32,13),beforeMove=currentRaw;portraitScene.dispatchEvent(new PointerEvent('pointermove',{bubbles:true,pointerId:1,pointerType:'mouse',isPrimary:true,clientX:pointB.clientX,clientY:pointB.clientY}));currentRaw=inspect();const hoverMove={snapshot:snapshot(),transition:validateTransition(beforeMove,currentRaw,'pointer move'),validation:validateState(currentRaw)};
    let motion=null,visibility=null;
    if(!portraitReduced){
      const moveStart=hoverMove.snapshot.activeTime;await poll(function(){return Number(root.dataset.activeTime)>=moveStart+120},800);currentRaw=inspect();const mid={snapshot:snapshot(),validation:validateState(currentRaw)};await poll(function(){return root.dataset.running==='false'},1000);currentRaw=inspect();const settled={snapshot:snapshot(),validation:validateState(currentRaw)};motion={mid,settled};
      const beforeLeave=currentRaw;portraitScene.dispatchEvent(new PointerEvent('pointerleave',{bubbles:true,pointerId:1,pointerType:'mouse',isPrimary:true,clientX:pointB.clientX,clientY:pointB.clientY}));currentRaw=inspect();const leave={snapshot:snapshot(),transition:validateTransition(beforeLeave,currentRaw,'pointer leave'),validation:validateState(currentRaw)};await poll(function(){return Number(root.dataset.activeTime)>=leave.snapshot.activeTime+100},700);root.style.transform='translateY(1000px)';await poll(function(){return root.dataset.visible==='false'&&root.dataset.running==='false'},1000);currentRaw=inspect();const hidden={snapshot:snapshot(),validation:validateState(currentRaw)},hiddenKey=freezeKey(hidden.snapshot);await wait(700);currentRaw=inspect();const stable={snapshot:snapshot(),validation:validateState(currentRaw)},stableKey=freezeKey(stable.snapshot);root.style.transform='';await poll(function(){return root.dataset.visible==='true'},1000);const resumed=snapshot();await poll(function(){return root.dataset.running==='false'},1000);currentRaw=inspect();const finished={snapshot:snapshot(),validation:validateState(currentRaw)};visibility={leave,hidden,hiddenKey,stable,stableKey,resumed,finished};
    }else{
      const beforeLeave=currentRaw;portraitScene.dispatchEvent(new PointerEvent('pointerleave',{bubbles:true,pointerId:1,pointerType:'mouse',isPrimary:true,clientX:pointB.clientX,clientY:pointB.clientY}));currentRaw=inspect();motion={leave:{snapshot:snapshot(),transition:validateTransition(beforeLeave,currentRaw,'pointer leave'),validation:validateState(currentRaw)}};
    }
    const capturePointA=cellPoint(15,9),beforeDown=currentRaw;portraitScene.dispatchEvent(new PointerEvent('pointerdown',{bubbles:true,pointerId:portraitReduced?81:71,pointerType:'mouse',isPrimary:true,button:0,buttons:1,clientX:capturePointA.clientX,clientY:capturePointA.clientY}));currentRaw=inspect();const down={snapshot:snapshot(),transition:validateTransition(beforeDown,currentRaw,'pointer start'),validation:validateState(currentRaw)};const captureId=portraitReduced?81:71;
    portraitScene.dispatchEvent(new PointerEvent('pointermove',{bubbles:true,pointerId:99,pointerType:'mouse',isPrimary:true,button:0,buttons:1,clientX:pointB.clientX,clientY:pointB.clientY}));const mismatched=snapshot();portraitScene.dispatchEvent(new PointerEvent('pointermove',{bubbles:true,pointerId:98,pointerType:'mouse',isPrimary:false,button:0,buttons:1,clientX:pointB.clientX,clientY:pointB.clientY}));const secondary=snapshot();
    const beforeCapturedMove=currentRaw;portraitScene.dispatchEvent(new PointerEvent('pointermove',{bubbles:true,pointerId:captureId,pointerType:'mouse',isPrimary:true,button:0,buttons:1,clientX:pointB.clientX,clientY:pointB.clientY}));currentRaw=inspect();const moved={snapshot:snapshot(),transition:validateTransition(beforeCapturedMove,currentRaw,'pointer move'),validation:validateState(currentRaw)};portraitScene.dispatchEvent(new PointerEvent('pointerup',{bubbles:true,pointerId:captureId,pointerType:'mouse',isPrimary:true,button:0,buttons:0,clientX:pointB.clientX,clientY:pointB.clientY}));currentRaw=inspect();const released=snapshot();
    const outsideId=portraitReduced?82:72,beforeOutsideDown=currentRaw;portraitScene.dispatchEvent(new PointerEvent('pointerdown',{bubbles:true,pointerId:outsideId,pointerType:'mouse',isPrimary:true,button:0,buttons:1,clientX:capturePointA.clientX,clientY:capturePointA.clientY}));currentRaw=inspect();const outsideDown={snapshot:snapshot(),transition:validateTransition(beforeOutsideDown,currentRaw,'pointer start'),validation:validateState(currentRaw)},beforeOutsideRelease=currentRaw;portraitScene.dispatchEvent(new PointerEvent('pointerup',{bubbles:true,pointerId:outsideId,pointerType:'mouse',isPrimary:true,button:0,buttons:0,clientX:sceneRect.right+24,clientY:sceneRect.bottom+24}));currentRaw=inspect();const outsideRelease={snapshot:snapshot(),transition:validateTransition(beforeOutsideRelease,currentRaw,'pointer release outside'),validation:validateState(currentRaw)};if(!portraitReduced){await poll(function(){return root.dataset.running==='false'},1000);currentRaw=inspect()}const outsideSettled={snapshot:snapshot(),validation:validateState(currentRaw)};
    const secondId=portraitReduced?83:73,beforeSecondDown=currentRaw;portraitScene.dispatchEvent(new PointerEvent('pointerdown',{bubbles:true,pointerId:secondId,pointerType:'mouse',isPrimary:true,button:0,buttons:1,clientX:capturePointA.clientX,clientY:capturePointA.clientY}));currentRaw=inspect();const secondDown={snapshot:snapshot(),transition:validateTransition(beforeSecondDown,currentRaw,'pointer start'),validation:validateState(currentRaw)},beforeCancel=currentRaw;portraitScene.dispatchEvent(new PointerEvent('pointercancel',{bubbles:true,pointerId:secondId,pointerType:'mouse',isPrimary:true,button:0,buttons:0,clientX:capturePointA.clientX,clientY:capturePointA.clientY}));currentRaw=inspect();const cancelled={snapshot:snapshot(),transition:validateTransition(beforeCancel,currentRaw,'pointer cancel'),validation:validateState(currentRaw)};if(!portraitReduced){await poll(function(){return root.dataset.running==='false'&&root.dataset.revealChecksum===root.dataset.targetChecksum},1000);currentRaw=inspect()}
    const capture={down,mismatched,secondary,moved,released,outside:{down:outsideDown,release:outsideRelease,settled:outsideSettled},secondDown,cancelled,settledValidation:validateState(currentRaw),focused:document.activeElement===root};
    const applyKey=function(key,shift,expectedSource){const before=currentRaw;root.dispatchEvent(new KeyboardEvent('keydown',{bubbles:true,key,shiftKey:Boolean(shift)}));currentRaw=inspect();return {snapshot:snapshot(),transition:validateTransition(before,currentRaw,expectedSource),validation:validateState(currentRaw)}};
    const home=applyKey('Home',false,'keyboard center');
    const originalSceneWidth=portraitScene.style.width,resizeWidth=Math.max(220,structure.sceneWidth-40);root.style.transform='translateY(1000px)';await poll(function(){return root.dataset.visible==='false'&&root.dataset.running==='false'},1000);currentRaw=inspect();const resizeBefore={snapshot:snapshot(),validation:validateState(currentRaw),canvasClientWidth:Number(root.dataset.canvasClientWidth),canvasClientHeight:Number(root.dataset.canvasClientHeight)};portraitScene.style.width=resizeWidth+'px';await poll(function(){return Number(root.dataset.canvasClientWidth)<resizeBefore.canvasClientWidth-20},1000);currentRaw=inspect();const resizeNarrowed={snapshot:snapshot(),validation:validateState(currentRaw),canvasClientWidth:Number(root.dataset.canvasClientWidth),canvasClientHeight:Number(root.dataset.canvasClientHeight)};portraitScene.style.width=originalSceneWidth;await poll(function(){return Number(root.dataset.canvasClientWidth)===resizeBefore.canvasClientWidth},1000);currentRaw=inspect();const resizeRestoredHidden={snapshot:snapshot(),validation:validateState(currentRaw),canvasClientWidth:Number(root.dataset.canvasClientWidth),canvasClientHeight:Number(root.dataset.canvasClientHeight)},resizeHiddenKey=freezeKey(resizeRestoredHidden.snapshot);await wait(160);currentRaw=inspect();const resizeHiddenStable={snapshot:snapshot(),validation:validateState(currentRaw),key:freezeKey(snapshot())};root.style.transform='';await poll(function(){return root.dataset.visible==='true'},1000);if(!portraitReduced)await poll(function(){return root.dataset.running==='false'},1000);currentRaw=inspect();const resizeRestored={snapshot:snapshot(),validation:validateState(currentRaw),canvasClientWidth:Number(root.dataset.canvasClientWidth),canvasClientHeight:Number(root.dataset.canvasClientHeight)};const resize={before:resizeBefore,narrowed:resizeNarrowed,restoredHidden:resizeRestoredHidden,hiddenKey:resizeHiddenKey,hiddenStable:resizeHiddenStable,restored:resizeRestored};
    const arrow=applyKey('ArrowRight',false,'keyboard move'),shiftArrow=applyKey('ArrowDown',true,'keyboard move'),spaceOff=applyKey(' ',false,'keyboard toggle off'),spaceOn=applyKey(' ',false,'keyboard toggle on'),escape=applyKey('Escape',false,'keyboard clear');if(!portraitReduced){await poll(function(){return root.dataset.running==='false'},1000);currentRaw=inspect()}const keyboard={home,resize,arrow,shiftArrow,spaceOff,spaceOn,escape,settled:snapshot(),settledValidation:validateState(currentRaw),focused:document.activeElement===root};
    const resetId=portraitReduced?84:74,resetPoint=cellPoint(18,11),beforeResetCapture=currentRaw;portraitScene.dispatchEvent(new PointerEvent('pointerdown',{bubbles:true,pointerId:resetId,pointerType:'mouse',isPrimary:true,button:0,buttons:1,clientX:resetPoint.clientX,clientY:resetPoint.clientY}));currentRaw=inspect();const resetCapture={snapshot:snapshot(),transition:validateTransition(beforeResetCapture,currentRaw,'pointer start'),validation:validateState(currentRaw)},nativeBefore=portraitScene.hasPointerCapture?portraitScene.hasPointerCapture(resetId):false;root.dispatchEvent(new KeyboardEvent('keydown',{bubbles:true,key:'R'}));currentRaw=inspect();const resetState=snapshot(),resetValidation=validateState(currentRaw),nativeAfter=portraitScene.hasPointerCapture?portraitScene.hasPointerCapture(resetId):false;await wait(700);const resetStable=snapshot(),resetStableKey=freezeKey(resetStable),resetKey=freezeKey(resetState);
    portrait={metadata:{sourceWidth:root.dataset.sourceWidth,sourceHeight:root.dataset.sourceHeight,sourceScale:root.dataset.sourceScale,sourceSeed:root.dataset.sourceSeed,sourceFormula:root.dataset.sourceFormula,sourceNoiseAmplitudes:root.dataset.sourceNoiseAmplitudes,sourcePalette:root.dataset.sourcePalette,sourceMasks:root.dataset.sourceMasks,sourceLighting:root.dataset.sourceLighting,luminanceWeights:root.dataset.luminanceWeights,gridColumns:root.dataset.gridColumns,gridRows:root.dataset.gridRows,cellCount:root.dataset.cellCount,glyphRamp:root.dataset.glyphRamp,revealRadius:root.dataset.revealRadius,revealFalloff:root.dataset.revealFalloff,accentAnnulus:root.dataset.accentAnnulus,trailDuration:root.dataset.trailDuration},structure,initial:{snapshot:initial,staticValidation,stateValidation:initialValidation,key:initialKey},idleStable:{snapshot:idleStable,key:idleStableKey},ignored,hover:{enter:hoverEnter,move:hoverMove},motion,visibility,capture,keyboard,reset:{capture:resetCapture,nativeBefore,nativeAfter,state:resetState,validation:resetValidation,key:resetKey,stable:resetStable,stableKey:resetStableKey},reduced:root.dataset.reduced,final:{snapshot:snapshot(),validation:validateState(inspect()),pixels:pixelScan(),scrollWidth:root.scrollWidth,clientWidth:root.clientWidth,scrollHeight:root.scrollHeight,clientHeight:root.clientHeight,sceneInside:inside(rectOf(portraitScene),rectOf(root)),canvasInside:inside(rectOf(portraitCanvas),rectOf(portraitScene))}};
  }
  let morph=null;
  if(root.classList.contains('d-ascii-morph')){
    const morphReduced=root.dataset.reduced==='true',morphScene=root.querySelector('.d-ascii-morph-scene'),morphCanvas=root.querySelector('.d-ascii-morph-canvas'),morphStatus=root.querySelector('.d-ascii-morph-status');
    const wait=function(ms){return new Promise(function(resolve){setTimeout(resolve,ms)})},poll=async function(test,timeout){const start=performance.now();while(performance.now()-start<(timeout||1200)){if(test())return true;await wait(12)}return test()},clamp=function(value,min,max){return Math.max(min,Math.min(max,value))},near=function(a,b,t){return Math.abs(a-b)<=(t||.00003)},inspect=function(){return typeof root.__asciiMorphInspect==='function'?root.__asciiMorphInspect():null};
    const rectOf=function(node){const box=node.getBoundingClientRect();return {left:box.left,top:box.top,right:box.right,bottom:box.bottom,width:box.width,height:box.height}},inside=function(inner,outer){return inner.left>=outer.left-.5&&inner.right<=outer.right+.5&&inner.top>=outer.top-.5&&inner.bottom<=outer.bottom+.5},checksum=function(values,scale){let hash=2166136261;for(let i=0;i<values.length;i++){hash^=Math.round(values[i]*scale)+i;hash=Math.imul(hash,16777619)}return(hash>>>0).toString(16).toUpperCase().padStart(8,'0')};
    const expectedRows=[[
      '           .-====-.           ','         .=*######*=.         ','        :*#%%%%%%%%#*:        ','       :#%%@@@@@@@@%%#:       ','       *%@@%%####%%@@%*       ','      :%@%#*=::::=*#%@%:      ','      =%%#+  :..:  +#%%=      ','      +%%#  =#..#=  #%%+      ','      +%%#  =#..#=  #%%+      ','      =%%#+  :==:  +#%%=      ','      :#%%#*=:..:=*#%%#:      ','       +#%%%#*++*#%%%#+       ','        =##%#=::=#%##=        ','         :*##++++##*:         ','           =#%%%%#=           ','            .-==-.            '
    ],[
      '              ..              ','             .::.             ','            .:==:.            ','           :-=++=-:           ','          -=+****+=-          ','         =+*######*+=         ','        +*##%%%%%%##*+        ','       *#%%@@@@@@@@%%#*       ','       *#%%@@@@@@@@%%#*       ','        +*##%%%%%%##*+        ','         =+*######*+=         ','          -=+****+=-          ','           :-=++=-:           ','            .:==:.            ','             .::.             ','              ..              '
    ]],ramp=' .:-=+*#%@';
    const snapshot=function(){return {activeTime:Number(root.dataset.activeTime),morphStart:Number(root.dataset.morphStart),elapsed:Number(root.dataset.elapsed),nextAutoAt:Number(root.dataset.nextAutoAt),autoRemaining:Number(root.dataset.autoRemaining),schedulerFrames:Number(root.dataset.schedulerFrames),renderFrames:Number(root.dataset.renderFrames),morphTriggers:Number(root.dataset.morphTriggers),completedMorphs:Number(root.dataset.completedMorphs),autoTriggers:Number(root.dataset.autoTriggers),manualTriggers:Number(root.dataset.manualTriggers),pointerTriggers:Number(root.dataset.pointerTriggers),keyboardTriggers:Number(root.dataset.keyboardTriggers),keyboardMoves:Number(root.dataset.keyboardMoves),ignoredInputs:Number(root.dataset.ignoredInputs),cancellations:Number(root.dataset.cancellations),resets:Number(root.dataset.resets),stableFigure:Number(root.dataset.stableFigure),stableName:root.dataset.stableName,targetFigure:Number(root.dataset.targetFigure),targetName:root.dataset.targetName,morphing:root.dataset.morphing,originX:Number(root.dataset.originX),originY:Number(root.dataset.originY),originNormalized:root.dataset.originNormalized,virtualOriginX:Number(root.dataset.virtualOriginX),virtualOriginY:Number(root.dataset.virtualOriginY),delayMinimum:Number(root.dataset.delayMinimum),delayMaximum:Number(root.dataset.delayMaximum),fullDuration:Number(root.dataset.fullDuration),progressMinimum:Number(root.dataset.progressMinimum),progressMaximum:Number(root.dataset.progressMaximum),changedCells:Number(root.dataset.changedCells),completedCells:Number(root.dataset.completedCells),occupiedCells:Number(root.dataset.occupiedCells),flashCells:Number(root.dataset.flashCells),currentValueChecksum:root.dataset.currentValueChecksum,currentGlyphChecksum:root.dataset.currentGlyphChecksum,fromValueChecksum:root.dataset.fromValueChecksum,targetGlyphChecksum:root.dataset.targetGlyphChecksum,delayChecksum:root.dataset.delayChecksum,flashChecksum:root.dataset.flashChecksum,renderBucketChecksum:root.dataset.renderBucketChecksum,bucketCounts:root.dataset.bucketCounts,lastTriggerSource:root.dataset.lastTriggerSource,lastTriggerTime:Number(root.dataset.lastTriggerTime),lastTriggerTarget:Number(root.dataset.lastTriggerTarget),lastTriggerBeforeChecksum:root.dataset.lastTriggerBeforeChecksum,lastTriggerFromChecksum:root.dataset.lastTriggerFromChecksum,running:root.dataset.running,reduced:root.dataset.reduced,visible:root.dataset.visible,source:root.dataset.source,status:morphStatus.textContent,mode:root.querySelector('.d-ascii-morph-mode').textContent,figure:root.querySelector('.d-ascii-morph-figure').textContent,auto:root.querySelector('.d-ascii-morph-auto').textContent}};
    const freezeKey=function(s){return [s.activeTime,s.schedulerFrames,s.renderFrames,s.currentValueChecksum,s.currentGlyphChecksum,s.delayChecksum,s.flashChecksum,s.morphTriggers,s.completedMorphs,s.autoTriggers].join('|')};
    const validateStatic=function(raw){if(!raw||!raw.data)return {ok:false};let rowErrors=0,glyphErrors=0,valueErrors=0;const buckets=[new Array(10).fill(0),new Array(10).fill(0)],glyphs=[new Int8Array(480),new Int8Array(480)];for(let f=0;f<2;f++){if(raw.figureRows[f].length!==16)rowErrors++;for(let y=0;y<16;y++){if(raw.figureRows[f][y]!==expectedRows[f][y]||expectedRows[f][y].length!==30)rowErrors++;for(let x=0;x<30;x++){const i=y*30+x,v=ramp.indexOf(expectedRows[f][y][x]);glyphs[f][i]=v;buckets[f][v]++;if(raw.figureGlyphs[f][i]!==v)glyphErrors++;if(raw.figureValues[f][i]!==Math.fround(v))valueErrors++}}}const glyphChecksums=glyphs.map(function(v){return checksum(v,1)}),valueChecksums=glyphs.map(function(v){return checksum(v,1000)}),data=raw.data,telemetryOk=data.figureGlyphChecksums===glyphChecksums.join(',')&&data.figureValueChecksums===valueChecksums.join(',')&&data.figureBuckets===buckets.map(function(v){return v.join(',')}).join('|')&&data.figureChangedCells==='222'&&data.figureBlankTransitions==='102'&&data.figureOccupied==='214,144';return {ok:!rowErrors&&!glyphErrors&&!valueErrors&&telemetryOk,rowsChecked:32,cellsChecked:960,rowErrors,glyphErrors,valueErrors,telemetryOk,glyphChecksums,valueChecksums,buckets}};
    const validateState=function(raw){if(!raw||!raw.data)return {ok:false};const arrays=[raw.fromValues,raw.targetIndices,raw.currentValues,raw.currentGlyphIndices,raw.delays,raw.progressValues,raw.blankTransitionFlags,raw.flashFlags,raw.renderBuckets,raw.lastTriggerBefore,raw.lastTriggerFrom],lengths=arrays.every(function(v){return v&&v.length===480});if(!lengths)return {ok:false,lengths:false};const data=raw.data,time=Number(data.activeTime),start=Number(data.morphStart),elapsed=data.morphing==='true'?Math.max(0,time-start):0,originX=Number(data.originX),originY=Number(data.originY);let delayErrors=0,progressErrors=0,valueErrors=0,glyphErrors=0,blankErrors=0,flashErrors=0,bucketErrors=0,delayMin=Infinity,delayMax=0,progressMin=1,progressMax=0,changed=0,completed=0,occupied=0,flashes=0;const buckets=new Array(10).fill(0);for(let y=0;y<16;y++)for(let x=0;x<30;x++){const i=y*30+x,delay=Math.fround(Math.hypot((x+.5)*7-originX,(y+.5)*12-originY)*8);if(!near(raw.delays[i],delay,.00002))delayErrors++;delayMin=Math.min(delayMin,delay);delayMax=Math.max(delayMax,delay);const progress=data.morphing==='true'?clamp((elapsed-delay)/400,0,1):1,progressFloat=Math.fround(progress),value=data.morphing==='true'?Math.fround(raw.fromValues[i]+(raw.targetIndices[i]-raw.fromValues[i])*progress):Math.fround(raw.targetIndices[i]),glyph=clamp(Math.round(value),0,9),blank=(Math.round(raw.fromValues[i])===0)!==(raw.targetIndices[i]===0)?1:0,flash=data.morphing==='true'&&blank&&elapsed>=delay+125&&elapsed<delay+275?1:0;if(!near(raw.progressValues[i],progressFloat,.00001))progressErrors++;if(!near(raw.currentValues[i],value,.00002))valueErrors++;if(raw.currentGlyphIndices[i]!==glyph)glyphErrors++;if(raw.blankTransitionFlags[i]!==blank)blankErrors++;if(raw.flashFlags[i]!==flash)flashErrors++;if(raw.renderBuckets[i]!==glyph)bucketErrors++;progressMin=Math.min(progressMin,progressFloat);progressMax=Math.max(progressMax,progressFloat);if(Math.round(raw.fromValues[i])!==raw.targetIndices[i])changed++;if(progressFloat>=1)completed++;if(glyph>0)occupied++;if(flash)flashes++;buckets[glyph]++}const checksumsOk=data.currentValueChecksum===checksum(raw.currentValues,1000)&&data.currentGlyphChecksum===checksum(raw.currentGlyphIndices,1)&&data.fromValueChecksum===checksum(raw.fromValues,1000)&&data.targetGlyphChecksum===checksum(raw.targetIndices,1)&&data.delayChecksum===checksum(raw.delays,1000)&&data.flashChecksum===checksum(raw.flashFlags,1)&&data.renderBucketChecksum===checksum(raw.renderBuckets,1)&&data.lastTriggerBeforeChecksum===checksum(raw.lastTriggerBefore,1000)&&data.lastTriggerFromChecksum===checksum(raw.lastTriggerFrom,1000);const statsOk=near(Number(data.delayMinimum),delayMin,.000002)&&near(Number(data.delayMaximum),delayMax,.000002)&&near(Number(data.fullDuration),delayMax+400,.000002)&&near(Number(data.progressMinimum),progressMin,.000002)&&near(Number(data.progressMaximum),progressMax,.000002)&&Number(data.changedCells)===changed&&Number(data.completedCells)===completed&&Number(data.occupiedCells)===occupied&&Number(data.flashCells)===flashes&&data.bucketCounts===buckets.join(',');return {ok:lengths&&!delayErrors&&!progressErrors&&!valueErrors&&!glyphErrors&&!blankErrors&&!flashErrors&&!bucketErrors&&checksumsOk&&statsOk,lengths,cellsChecked:480,delayErrors,progressErrors,valueErrors,glyphErrors,blankErrors,flashErrors,bucketErrors,checksumsOk,statsOk,buckets,changed,completed,occupied,flashes,delayMin,delayMax,progressMin,progressMax}};
    const validateTrigger=function(before,after,expectedSource,expectedTarget,expectedX,expectedY){if(!before||!after)return {ok:false};let continuityErrors=0,targetErrors=0;for(let i=0;i<480;i++){if(!near(after.lastTriggerBefore[i],before.currentValues[i],.000002)||!near(after.lastTriggerFrom[i],before.currentValues[i],.000002)||(!morphReduced&&!near(after.fromValues[i],before.currentValues[i],.000002)))continuityErrors++;if(after.targetIndices[i]!==after.figureGlyphs[expectedTarget][i])targetErrors++;if(!morphReduced&&(!near(after.currentValues[i],before.currentValues[i],.000002)||after.currentGlyphIndices[i]!==before.currentGlyphIndices[i]))continuityErrors++;if(morphReduced&&(after.currentValues[i]!==after.figureValues[expectedTarget][i]||after.currentGlyphIndices[i]!==after.figureGlyphs[expectedTarget][i]))targetErrors++}const data=after.data,telemetryOk=data.lastTriggerSource===expectedSource&&Number(data.lastTriggerTarget)===expectedTarget&&near(Number(data.lastTriggerTime),Number(data.activeTime),.001)&&near(Number(data.originX),expectedX,.001)&&near(Number(data.originY),expectedY,.001)&&near(Number(data.nextAutoAt)-Number(data.activeTime),4000,.001)&&Number(data.morphTriggers)===Number(before.data.morphTriggers)+1;return {ok:!continuityErrors&&!targetErrors&&telemetryOk,cellsChecked:480,continuityErrors,targetErrors,telemetryOk}};
    const pixelScan=function(){const values=morphCanvas.getContext('2d').getImageData(0,0,morphCanvas.width,morphCanvas.height).data,dpr=Number(root.dataset.dpr),left=Number(root.dataset.fieldOffsetX)*dpr,top=Number(root.dataset.fieldOffsetY)*dpr,right=left+210*dpr,bottom=top+192*dpr;let ink=0,txt1=0,accent=0,outside=0,minInk=765,maxInk=0;for(let p=0;p<values.length;p+=4){const pixel=p/4,x=pixel%morphCanvas.width,y=Math.floor(pixel/morphCanvas.width),r=values[p],g=values[p+1],b=values[p+2],distance=Math.abs(r-10)+Math.abs(g-10)+Math.abs(b-11);if(distance>15){ink++;if(x<left-1||x>right+1||y<top-1||y>bottom+1)outside++;minInk=Math.min(minInk,r+g+b);maxInk=Math.max(maxInk,r+g+b)}if(Math.abs(r-155)<18&&Math.abs(g-155)<18&&Math.abs(b-163)<18)txt1++;if(b-r>45&&b-g>65&&r>110)accent++}return {total:values.length/4,ink,txt1,accent,outside,minInk,maxInk}};
    const rootRect=rectOf(root),sceneRect=rectOf(morphScene),canvasRect=rectOf(morphCanvas),focusSelector='button,input,select,textarea,a[href],[tabindex]';
    const structure={role:root.getAttribute('role'),canvasRole:morphCanvas.getAttribute('role'),canvasLabel:morphCanvas.getAttribute('aria-label'),canvasCount:root.querySelectorAll('.d-ascii-morph-canvas').length,rootTabIndex:root.getAttribute('tabindex'),rootLabel:root.getAttribute('aria-label'),shortcuts:root.getAttribute('aria-keyshortcuts'),focusables:(root.matches(focusSelector)?1:0)+root.querySelectorAll(focusSelector).length,statusLive:morphStatus.getAttribute('aria-live'),statusAtomic:morphStatus.getAttribute('aria-atomic'),headerText:root.querySelector('.d-ascii-morph-topbar').textContent,footerItems:root.querySelectorAll('.d-ascii-morph-footer span').length,rootBackground:getComputedStyle(root).backgroundColor,rootColor:getComputedStyle(root).color,sceneBackground:getComputedStyle(morphScene).backgroundColor,sceneBorder:getComputedStyle(morphScene).borderWidth,sceneRadius:getComputedStyle(morphScene).borderRadius,touchAction:getComputedStyle(root).touchAction,overlayBackground:getComputedStyle(root,'::before').backgroundImage,headerFont:getComputedStyle(root.querySelector('.d-ascii-morph-topbar')).fontSize,footerFont:getComputedStyle(root.querySelector('.d-ascii-morph-footer')).fontSize,sceneInside:inside(sceneRect,rootRect),canvasInside:inside(canvasRect,sceneRect),sceneWidth:sceneRect.width,sceneHeight:sceneRect.height,canvasClientWidth:morphCanvas.clientWidth,canvasClientHeight:morphCanvas.clientHeight,canvasWidth:morphCanvas.width,canvasHeight:morphCanvas.height,dpr:Number(root.dataset.dpr),fieldOffsetX:Number(root.dataset.fieldOffsetX),fieldOffsetY:Number(root.dataset.fieldOffsetY),fontSize:Number(root.dataset.fontSize),maxGlyphAdvance:Number(root.dataset.maxGlyphAdvance),pixels:pixelScan()};
    let currentRaw=inspect();const initial={snapshot:snapshot(),staticValidation:validateStatic(currentRaw),validation:validateState(currentRaw),pixels:pixelScan()},initialKey=freezeKey(initial.snapshot);await wait(morphReduced?600:120);const idle={snapshot:snapshot(),validation:validateState(inspect()),key:freezeKey(snapshot())};
    const invalidBefore=snapshot();morphScene.dispatchEvent(new PointerEvent('pointerdown',{bubbles:true,pointerId:90,pointerType:'mouse',isPrimary:true,button:2,buttons:2,clientX:canvasRect.left+20,clientY:canvasRect.top+20}));const invalidRight=snapshot();morphScene.dispatchEvent(new PointerEvent('pointerdown',{bubbles:true,pointerId:91,pointerType:'mouse',isPrimary:false,button:0,buttons:1,clientX:canvasRect.left+20,clientY:canvasRect.top+20}));const invalidSecondary=snapshot();root.dispatchEvent(new KeyboardEvent('keydown',{bubbles:true,key:' ',repeat:true}));const invalidRepeat=snapshot(),invalid={before:invalidBefore,right:invalidRight,secondary:invalidSecondary,repeat:invalidRepeat};
    let auto=null,visibility=null;currentRaw=inspect();
    if(!morphReduced){
      await poll(function(){return Number(root.dataset.autoTriggers)>=1},4800);currentRaw=inspect();const started={snapshot:snapshot(),validation:validateState(currentRaw)};await poll(function(){return Number(root.dataset.activeTime)-Number(root.dataset.lastTriggerTime)>=220},700);currentRaw=inspect();const mid={snapshot:snapshot(),validation:validateState(currentRaw),pixels:pixelScan()};root.style.transform='translateY(1000px)';await poll(function(){return root.dataset.visible==='false'&&root.dataset.running==='false'},1000);const hidden={snapshot:snapshot(),validation:validateState(inspect())},hiddenKey=freezeKey(hidden.snapshot);await wait(700);const stable={snapshot:snapshot(),validation:validateState(inspect())},stableKey=freezeKey(stable.snapshot);root.style.transform='';await poll(function(){return root.dataset.visible==='true'&&root.dataset.running==='true'},1000);const resumeBefore=snapshot();await poll(function(){return Number(root.dataset.schedulerFrames)>resumeBefore.schedulerFrames},500);const resumed={snapshot:snapshot(),validation:validateState(inspect())};root.dispatchEvent(new KeyboardEvent('keydown',{bubbles:true,key:'Escape'}));currentRaw=inspect();const cancelled={snapshot:snapshot(),validation:validateState(currentRaw)};auto={started,mid,cancelled};visibility={hidden,hiddenKey,stable,stableKey,resumeBefore,resumed};
    }else{root.style.transform='translateY(1000px)';await wait(700);const hidden=snapshot(),hiddenKey=freezeKey(hidden);root.style.transform='';await wait(80);visibility={hidden,hiddenKey,stable:snapshot(),stableKey:freezeKey(snapshot())};auto={stable:snapshot()};currentRaw=inspect()}
    const point=function(x,y){const box=morphCanvas.getBoundingClientRect();return {x,y,clientX:box.left+Number(root.dataset.fieldOffsetX)+x,clientY:box.top+Number(root.dataset.fieldOffsetY)+y}},pointA=point(80.5,90),beforePointer=currentRaw;morphScene.dispatchEvent(new PointerEvent('pointerdown',{bubbles:true,pointerId:1,pointerType:'mouse',isPrimary:true,button:0,buttons:1,clientX:pointA.clientX,clientY:pointA.clientY}));currentRaw=inspect();const pointerStart={snapshot:snapshot(),transition:validateTrigger(beforePointer,currentRaw,'pointer',1,80.5,90),validation:validateState(currentRaw)};let pointerMid=null,pointerReverse=null,pointerComplete=null;
    if(!morphReduced){await poll(function(){return Number(root.dataset.activeTime)-Number(root.dataset.lastTriggerTime)>=160},700);currentRaw=inspect();pointerMid={snapshot:snapshot(),validation:validateState(currentRaw),pixels:pixelScan()};const pointB=point(175,144),beforeReverse=currentRaw;morphScene.dispatchEvent(new PointerEvent('pointerdown',{bubbles:true,pointerId:2,pointerType:'mouse',isPrimary:true,button:0,buttons:1,clientX:pointB.clientX,clientY:pointB.clientY}));currentRaw=inspect();pointerReverse={snapshot:snapshot(),transition:validateTrigger(beforeReverse,currentRaw,'pointer',0,175,144),validation:validateState(currentRaw)};await poll(function(){return root.dataset.morphing==='false'},2600);currentRaw=inspect();pointerComplete={snapshot:snapshot(),validation:validateState(currentRaw)}}else{const beforeReverse=currentRaw,pointB=point(175,144);morphScene.dispatchEvent(new PointerEvent('pointerdown',{bubbles:true,pointerId:2,pointerType:'mouse',isPrimary:true,button:0,buttons:1,clientX:pointB.clientX,clientY:pointB.clientY}));currentRaw=inspect();pointerReverse={snapshot:snapshot(),transition:validateTrigger(beforeReverse,currentRaw,'pointer',0,175,144),validation:validateState(currentRaw)};pointerComplete=pointerReverse}
    const keyMove=function(key,shift){root.dispatchEvent(new KeyboardEvent('keydown',{bubbles:true,key,shiftKey:Boolean(shift)}));return snapshot()},home=keyMove('Home'),arrow=keyMove('ArrowRight'),shiftArrow=keyMove('ArrowDown',true);let before=currentRaw;root.dispatchEvent(new KeyboardEvent('keydown',{bubbles:true,key:' '}));currentRaw=inspect();const space={snapshot:snapshot(),transition:validateTrigger(before,currentRaw,'keyboard',1,112,132),validation:validateState(currentRaw)};root.dispatchEvent(new KeyboardEvent('keydown',{bubbles:true,key:'Escape'}));currentRaw=inspect();const escape={snapshot:snapshot(),validation:validateState(currentRaw)},enterTarget=morphReduced?0:1;before=currentRaw;root.dispatchEvent(new KeyboardEvent('keydown',{bubbles:true,key:'Enter'}));currentRaw=inspect();const enter={snapshot:snapshot(),transition:validateTrigger(before,currentRaw,'keyboard',enterTarget,112,132),validation:validateState(currentRaw)};root.dispatchEvent(new KeyboardEvent('keydown',{bubbles:true,key:'Escape'}));currentRaw=inspect();const escapeEnter={snapshot:snapshot(),validation:validateState(currentRaw)};const keyboard={home,arrow,shiftArrow,space,escape,enter,escapeEnter,focused:document.activeElement===root};
    root.dispatchEvent(new KeyboardEvent('keydown',{bubbles:true,key:'R'}));currentRaw=inspect();const reset={snapshot:snapshot(),validation:validateState(currentRaw)};if(morphReduced){await wait(600);reset.stable=snapshot();reset.key=freezeKey(reset.snapshot);reset.stableKey=freezeKey(reset.stable)}
    morph={metadata:{gridColumns:root.dataset.gridColumns,gridRows:root.dataset.gridRows,cellCount:root.dataset.cellCount,glyphRamp:root.dataset.glyphRamp,cellWidth:root.dataset.cellWidth,cellHeight:root.dataset.cellHeight,fieldWidth:root.dataset.fieldWidth,fieldHeight:root.dataset.fieldHeight,delayScale:root.dataset.delayScale,cellDuration:root.dataset.cellDuration,flashStart:root.dataset.flashStart,flashEnd:root.dataset.flashEnd,flashDuration:root.dataset.flashDuration,autoInterval:root.dataset.autoInterval,figureGlyphChecksums:root.dataset.figureGlyphChecksums,figureValueChecksums:root.dataset.figureValueChecksums,figureBuckets:root.dataset.figureBuckets,figureChangedCells:root.dataset.figureChangedCells,figureBlankTransitions:root.dataset.figureBlankTransitions,figureOccupied:root.dataset.figureOccupied,centerDelayChecksum:root.dataset.centerDelayChecksum,initialGlyphChecksum:root.dataset.initialGlyphChecksum,initialValueChecksum:root.dataset.initialValueChecksum,initialDelayChecksum:root.dataset.initialDelayChecksum},structure,initial,initialKey,idle,invalid,auto,visibility,pointer:{start:pointerStart,mid:pointerMid,reverse:pointerReverse,complete:pointerComplete},keyboard,reset,reduced:root.dataset.reduced,final:{snapshot:snapshot(),validation:validateState(inspect()),pixels:pixelScan(),scrollWidth:root.scrollWidth,clientWidth:root.clientWidth,scrollHeight:root.scrollHeight,clientHeight:root.clientHeight,sceneInside:inside(rectOf(morphScene),rectOf(root)),canvasInside:inside(rectOf(morphCanvas),rectOf(morphScene))}};
  }
  let typeExplode=null;
  if(root.classList.contains('d-ascii-type-explode')){
    const typeReduced=root.dataset.reduced==='true',typeStage=root.querySelector('.d-ascii-type-explode-stage'),typeCanvas=root.querySelector('.d-ascii-type-explode-canvas'),typeInput=root.querySelector('.d-ascii-type-explode-well input'),typeWell=root.querySelector('.d-ascii-type-explode-well'),typeStatus=root.querySelector('.d-ascii-type-explode-status'),typeReadout=root.querySelector('.d-ascii-type-explode-readout');
    const wait=function(ms){return new Promise(function(resolve){setTimeout(resolve,ms)})},poll=async function(test,timeout){const started=performance.now();while(performance.now()-started<(timeout||1200)){if(test())return true;await wait(12)}return test()},clamp=function(value,min,max){return Math.max(min,Math.min(max,value))},near=function(actual,expected,tolerance){return Math.abs(actual-expected)<=(tolerance||.00003)},inspect=function(){return typeof root.__asciiTypeExplodeInspect==='function'?root.__asciiTypeExplodeInspect():null};
    const rectOf=function(node){const box=node.getBoundingClientRect();return {left:box.left,top:box.top,right:box.right,bottom:box.bottom,width:box.width,height:box.height}},inside=function(inner,outer){return inner.left>=outer.left-.5&&inner.right<=outer.right+.5&&inner.top>=outer.top-.5&&inner.bottom<=outer.bottom+.5},checksum=function(values,scale){let hash=2166136261;for(let index=0;index<values.length;index++){hash^=Math.round(values[index]*scale)+index;hash=Math.imul(hash,16777619)}return(hash>>>0).toString(16).toUpperCase().padStart(8,'0')};
    const expectedPairs=[
      ['A',['01110','10001','10001','11111','10001','10001','10001']],['B',['11110','10001','10001','11110','10001','10001','11110']],['C',['01111','10000','10000','10000','10000','10000','01111']],['D',['11110','10001','10001','10001','10001','10001','11110']],['E',['11111','10000','10000','11110','10000','10000','11111']],['F',['11111','10000','10000','11110','10000','10000','10000']],['G',['01110','10001','10000','10111','10001','10001','01110']],['H',['10001','10001','10001','11111','10001','10001','10001']],['I',['11111','00100','00100','00100','00100','00100','11111']],['J',['00111','00010','00010','00010','10010','10010','01100']],['K',['10001','10010','10100','11000','10100','10010','10001']],['L',['10000','10000','10000','10000','10000','10000','11111']],['M',['10001','11011','10101','10101','10001','10001','10001']],['N',['10001','11001','10101','10011','10001','10001','10001']],['O',['01110','10001','10001','10001','10001','10001','01110']],['P',['11110','10001','10001','11110','10000','10000','10000']],['Q',['01110','10001','10001','10001','10101','10010','01101']],['R',['11110','10001','10001','11110','10100','10010','10001']],['S',['01111','10000','10000','01110','00001','00001','11110']],['T',['11111','00100','00100','00100','00100','00100','00100']],['U',['10001','10001','10001','10001','10001','10001','01110']],['V',['10001','10001','10001','10001','10001','01010','00100']],['W',['10001','10001','10001','10101','10101','10101','01010']],['X',['10001','10001','01010','00100','01010','10001','10001']],['Y',['10001','10001','01010','00100','00100','00100','00100']],['Z',['11111','00001','00010','00100','01000','10000','11111']],
      ['0',['01110','10001','10011','10101','11001','10001','01110']],['1',['00100','01100','00100','00100','00100','00100','01110']],['2',['01110','10001','00001','00010','00100','01000','11111']],['3',['11110','00001','00001','01110','00001','00001','11110']],['4',['00010','00110','01010','10010','11111','00010','00010']],['5',['11111','10000','10000','11110','00001','00001','11110']],['6',['01110','10000','10000','11110','10001','10001','01110']],['7',['11111','00001','00010','00100','01000','01000','01000']],['8',['01110','10001','10001','01110','10001','10001','01110']],['9',['01110','10001','10001','01111','00001','00001','01110']]
    ];
    const expectedOrder=expectedPairs.map(function(pair){return pair[0]}).join(''),expectedRows=Object.fromEntries(expectedPairs),expectedBits={},expectedCounts=[],expectedMapChecksums=[],expectedAllBits=[];
    for(const pair of expectedPairs){const bits=pair[1].join('').split('').map(Number);expectedBits[pair[0]]=bits;expectedCounts.push(bits.reduce(function(total,value){return total+value},0));expectedMapChecksums.push(checksum(bits,1));expectedAllBits.push.apply(expectedAllBits,bits)}
    const mix32=function(value){value=Math.imul(value^(value>>>16),0x45d9f3b);value=Math.imul(value^(value>>>16),0x45d9f3b);return(value^(value>>>16))>>>0},unit=function(serial,index,salt){return mix32(Math.imul(serial,0x9e3779b1)^Math.imul(index+1,0x85ebca6b)^salt)/4294967296},launchVector=function(serial,index){const angle=unit(serial,index,0x51ed270b)*Math.PI*2,radius=Math.min(79.999,20+60*Math.sqrt(unit(serial,index,0x2c1b3c6d))),x=Math.fround(Math.cos(angle)*radius),y=Math.fround(Math.sin(angle)*radius);return{x,y,distance:Math.hypot(x,y)}};
    const curve=function(a,b,t){const inverse=1-t;return 3*inverse*inverse*t*a+3*inverse*t*t*b+t*t*t},curveSlope=function(a,b,t){const inverse=1-t;return 3*inverse*inverse*a+6*inverse*t*(b-a)+3*t*t*(1-b)},easeOutSoft=function(value){const progress=clamp(value,0,1);let parameter=progress;for(let pass=0;pass<8;pass++){const error=curve(.22,.36,parameter)-progress,slope=curveSlope(.22,.36,parameter);if(Math.abs(slope)<.000001)break;parameter=clamp(parameter-error/slope,0,1)}let low=0,high=1;for(let pass=0;pass<10;pass++){if(curve(.22,.36,parameter)<progress)low=parameter;else high=parameter;parameter=(low+high)/2}return curve(1,1,parameter)};
    const flatten=function(states,keys){const values=[];for(const state of states)for(const key of keys)values.push(typeof state[key]==='number'?state[key]:0);return values};
    const snapshot=function(){return {text:root.dataset.text,textLength:Number(root.dataset.textLength),expectedCellCount:Number(root.dataset.expectedCellCount),liveCellCount:Number(root.dataset.liveCellCount),scatterCellCount:Number(root.dataset.scatterCellCount),waitingCells:Number(root.dataset.waitingCells),flyingCells:Number(root.dataset.flyingCells),glowCells:Number(root.dataset.glowCells),stableCells:Number(root.dataset.stableCells),activeTime:Number(root.dataset.activeTime),lastActivity:Number(root.dataset.lastActivity),nextWaveAt:Number(root.dataset.nextWaveAt),waveStart:Number(root.dataset.waveStart),waveElapsed:Number(root.dataset.waveElapsed),waveProgress:Number(root.dataset.waveProgress),waving:root.dataset.waving,waveTriggers:Number(root.dataset.waveTriggers),completedWaves:Number(root.dataset.completedWaves),insertionSerial:Number(root.dataset.insertionSerial),appendEvents:Number(root.dataset.appendEvents),deleteEvents:Number(root.dataset.deleteEvents),pasteEvents:Number(root.dataset.pasteEvents),reconcileEvents:Number(root.dataset.reconcileEvents),inputEvents:Number(root.dataset.inputEvents),ignoredInputs:Number(root.dataset.ignoredInputs),compositionStarts:Number(root.dataset.compositionStarts||0),compositionCommits:Number(root.dataset.compositionCommits||0),composing:root.dataset.composing||'false',suppressCompositionInput:root.dataset.suppressCompositionInput||'false',resets:Number(root.dataset.resets||0),lastInputSource:root.dataset.lastInputSource,liveIdentityChecksum:root.dataset.liveIdentityChecksum,liveStartChecksum:root.dataset.liveStartChecksum,liveTargetChecksum:root.dataset.liveTargetChecksum,liveCurrentChecksum:root.dataset.liveCurrentChecksum,liveProgressChecksum:root.dataset.liveProgressChecksum,liveBrightnessChecksum:root.dataset.liveBrightnessChecksum,liveWaveChecksum:root.dataset.liveWaveChecksum,scatterIdentityChecksum:root.dataset.scatterIdentityChecksum,scatterMotionChecksum:root.dataset.scatterMotionChecksum,scatterCurrentChecksum:root.dataset.scatterCurrentChecksum,bannerColumns:Number(root.dataset.bannerColumns),cellWidth:Number(root.dataset.cellWidth),cellHeight:Number(root.dataset.cellHeight),fontSize:Number(root.dataset.fontSize),fieldWidth:Number(root.dataset.fieldWidth),fieldHeight:Number(root.dataset.fieldHeight),layoutOffsetX:Number(root.dataset.layoutOffsetX),layoutOffsetY:Number(root.dataset.layoutOffsetY),canvasWidth:Number(root.dataset.canvasWidth),canvasHeight:Number(root.dataset.canvasHeight),canvasClientWidth:Number(root.dataset.canvasClientWidth),canvasClientHeight:Number(root.dataset.canvasClientHeight),dpr:Number(root.dataset.dpr),schedulerFrames:Number(root.dataset.schedulerFrames),renderFrames:Number(root.dataset.renderFrames),resizeEvents:Number(root.dataset.resizeEvents),running:root.dataset.running,reduced:root.dataset.reduced,visible:root.dataset.visible,cleaned:root.dataset.cleaned,source:root.dataset.source,inputValue:root.dataset.inputValue,placeholder:root.dataset.placeholder,maxLength:Number(root.dataset.maxLength),inputFocused:root.dataset.inputFocused,status:typeStatus.textContent,readout:typeReadout.textContent,canvasLabel:typeCanvas.getAttribute('aria-label')}};
    const freezeKey=function(state){return [state.text,state.liveCellCount,state.scatterCellCount,state.activeTime,state.schedulerFrames,state.renderFrames,state.waveTriggers,state.completedWaves,state.liveIdentityChecksum,state.liveStartChecksum,state.liveTargetChecksum,state.liveCurrentChecksum,state.liveProgressChecksum,state.liveBrightnessChecksum,state.liveWaveChecksum,state.scatterIdentityChecksum,state.scatterMotionChecksum,state.scatterCurrentChecksum,state.appendEvents,state.deleteEvents,state.inputEvents,state.ignoredInputs].join('|')};
    const validateStatic=function(raw){if(!raw||!raw.data)return{ok:false};let rowErrors=0,bitErrors=0;for(const character of expectedOrder){const rows=raw.glyphRows&&raw.glyphRows[character],bits=raw.glyphBits&&raw.glyphBits[character];if(!rows||rows.length!==7||rows.some(function(row,index){return row!==expectedRows[character][index]||!/^[01]{5}$/.test(row)}))rowErrors++;if(!bits||bits.length!==35||bits.some(function(bit,index){return bit!==expectedBits[character][index]}))bitErrors++}const data=raw.data,telemetryOk=raw.glyphOrder===expectedOrder&&data.glyphOrder===expectedOrder&&data.mapCellCounts===expectedCounts.join(',')&&data.mapChecksums===expectedMapChecksums.join(',')&&data.mapChecksum===checksum(expectedAllBits,1);return{ok:!rowErrors&&!bitErrors&&telemetryOk,rowErrors,bitErrors,telemetryOk,glyphsChecked:36,cellsChecked:1260,mapChecksum:checksum(expectedAllBits,1),counts:expectedCounts.join(',')}};
    const validateState=function(raw){
      if(!raw||!raw.data)return{ok:false,lengths:false};
      const data=raw.data,text=data.text||'',definitions=raw.liveCells||[],states=raw.liveState||[],scatter=raw.scatterCells||[],scatterStates=raw.scatterState||[],expectedCellCount=Array.from(text).reduce(function(total,character){const mapIndex=expectedOrder.indexOf(character);return total+(mapIndex>=0?expectedCounts[mapIndex]:0)},0),lengths=definitions.length===states.length&&definitions.length===expectedCellCount&&scatter.length===scatterStates.length;
      if(!lengths)return{ok:false,lengths:false,expectedCellCount,definitions:definitions.length,states:states.length,scatter:scatter.length,scatterStates:scatterStates.length};
      const canvasWidth=Number(data.canvasClientWidth),canvasHeight=Number(data.canvasClientHeight),expectedColumns=text.length?text.length*5+(text.length-1):0,expectedCellWidth=Math.min(7,Math.max(1,canvasWidth-24)/47),expectedCellHeight=expectedCellWidth*12/7,expectedFont=Math.min(11,expectedCellWidth*1.55),expectedOffsetX=(canvasWidth-expectedColumns*expectedCellWidth)/2,expectedOffsetY=(canvasHeight-7*expectedCellHeight)/2,time=Number(data.activeTime),waveStart=Number(data.waveStart),waving=data.waving==='true';
      let definitionErrors=0,stateErrors=0,scatterErrors=0,phaseTimeErrors=0,waiting=0,flying=0,glow=0,stable=0,minDistance=definitions.length?Infinity:0,maxDistance=0;const ids=new Set(),identity=[],starts=[],timeEpsilon=.00051,easingQuantizationTolerance=.0031,stateCheckErrors={identity:0,target:0,current:0,wave:0,progress:0,eased:0,brightness:0,opacity:0,column:0};
      for(let index=0;index<definitions.length;index++){
        const cell=definitions[index],state=states[index],character=text[cell.charIndex],bits=expectedBits[character]||[],vector=launchVector(cell.serial,cell.glyphIndex),rawTargetX=expectedOffsetX+(cell.charIndex*6+cell.glyphX+.5)*expectedCellWidth,rawTargetY=expectedOffsetY+(cell.glyphY+.5)*expectedCellHeight,targetX=Math.fround(rawTargetX),targetY=Math.fround(rawTargetY),column=cell.charIndex*6+cell.glyphX,elapsed=time-cell.bornAt-cell.delay;
        if(cell.character!==character||bits[cell.glyphIndex]!==1||cell.glyphX!==cell.glyphIndex%5||cell.glyphY!==Math.floor(cell.glyphIndex/5)||cell.id!==cell.serial*100+cell.glyphIndex||cell.delay!==cell.ordinal*8||!near(cell.startOffsetX,vector.x,.000001)||!near(cell.startOffsetY,vector.y,.000001)||!near(cell.startDistance,vector.distance,.000001)||cell.startDistance<20||cell.startDistance>=80||ids.has(cell.id)||cell.bornAt>time+.001)definitionErrors++;
        ids.add(cell.id);identity.push(cell.charIndex,cell.glyphIndex,cell.ordinal,cell.serial);starts.push(cell.startOffsetX,cell.startOffsetY,cell.startDistance,cell.delay);minDistance=Math.min(minDistance,cell.startDistance);maxDistance=Math.max(maxDistance,cell.startDistance);
        let progress,eased,brightness,opacity,phase=state&&state.phase,progressMinimum,progressMaximum,easedMinimum,easedMaximum;
        if(typeReduced){progress=1;eased=1;brightness=0;opacity=1;progressMinimum=progressMaximum=easedMinimum=easedMaximum=1;if(phase!=='stable')phaseTimeErrors++}
        else if(phase==='waiting'){progress=0;eased=0;brightness=0;opacity=0;progressMinimum=progressMaximum=easedMinimum=easedMaximum=0;if(elapsed>timeEpsilon)phaseTimeErrors++}
        else if(phase==='flying'){const motionElapsed=clamp(elapsed,0,350),progressLow=clamp((elapsed-timeEpsilon)/350,0,1),progressHigh=clamp((elapsed+timeEpsilon)/350,0,1),easedLow=easeOutSoft(progressLow),easedHigh=easeOutSoft(progressHigh);progress=motionElapsed/350;eased=easeOutSoft(progress);brightness=eased;opacity=.3+.7*eased;progressMinimum=Math.min(progressLow,progressHigh);progressMaximum=Math.max(progressLow,progressHigh);easedMinimum=Math.min(easedLow,easedHigh);easedMaximum=Math.max(easedLow,easedHigh);if(elapsed< -timeEpsilon||elapsed>=350+timeEpsilon)phaseTimeErrors++}
        else if(phase==='glow'){const glowElapsed=clamp(elapsed,350,650);progress=1;eased=1;brightness=1-(glowElapsed-350)/300;opacity=1;progressMinimum=progressMaximum=easedMinimum=easedMaximum=1;if(elapsed<350-timeEpsilon||elapsed>=650+timeEpsilon)phaseTimeErrors++}
        else if(phase==='stable'){progress=1;eased=1;brightness=0;opacity=1;progressMinimum=progressMaximum=easedMinimum=easedMaximum=1;if(elapsed<650-timeEpsilon)phaseTimeErrors++}
        else{progress=0;eased=0;brightness=0;opacity=0;progressMinimum=progressMaximum=easedMinimum=easedMaximum=0;phaseTimeErrors++}
        const stateEased=state&&Number.isFinite(state.eased)?state.eased:eased,expectedBrightness=phase==='flying'?stateEased:brightness,expectedOpacity=phase==='flying'?.3+.7*stateEased:opacity,waveDelay=column/Math.max(1,expectedColumns-1)*600,waveLocal=(time-waveStart-waveDelay)/600,waveY=waving&&waveLocal>0&&waveLocal<1?-4*Math.sin(Math.PI*waveLocal):0,currentX=Math.fround(rawTargetX+cell.startOffsetX*(1-stateEased)),currentY=Math.fround(rawTargetY+cell.startOffsetY*(1-stateEased)+waveY),progressOk=!!state&&state.progress>=Math.fround(progressMinimum)-.000004&&state.progress<=Math.fround(progressMaximum)+.000004,easedOk=!!state&&state.eased>=Math.fround(easedMinimum)-easingQuantizationTolerance&&state.eased<=Math.fround(easedMaximum)+easingQuantizationTolerance;
        const identityOk=!!state&&state.id===cell.id,targetOk=!!state&&near(state.targetX,targetX,.000003)&&near(state.targetY,targetY,.000003),currentOk=!!state&&near(state.currentX,currentX,.00002)&&near(state.currentY,currentY,.00004),waveOk=!!state&&near(state.waveY,Math.fround(waveY),.00002),brightnessOk=!!state&&near(state.brightness,Math.fround(expectedBrightness),.000012),opacityOk=!!state&&near(state.opacity,Math.fround(expectedOpacity),.000012),columnOk=!!state&&state.column===column;
        if(!identityOk)stateCheckErrors.identity++;if(!targetOk)stateCheckErrors.target++;if(!currentOk)stateCheckErrors.current++;if(!waveOk)stateCheckErrors.wave++;if(!progressOk)stateCheckErrors.progress++;if(!easedOk)stateCheckErrors.eased++;if(!brightnessOk)stateCheckErrors.brightness++;if(!opacityOk)stateCheckErrors.opacity++;if(!columnOk)stateCheckErrors.column++;if(!identityOk||!targetOk||!currentOk||!waveOk||!progressOk||!easedOk||!brightnessOk||!opacityOk||!columnOk)stateErrors++;
        if(phase==='waiting')waiting++;else if(phase==='flying')flying++;else if(phase==='glow')glow++;else stable++;
      }
      const scatterIdentity=[],scatterMotion=[];for(let index=0;index<scatter.length;index++){const cell=scatter[index],state=scatterStates[index],elapsed=clamp(time-cell.startTime,0,400),seconds=elapsed/1000,progress=elapsed/400,currentX=Math.fround(cell.startX+cell.velocityX*seconds),currentY=Math.fround(cell.startY+cell.velocityY*seconds+.5*260*seconds*seconds),opacity=Math.fround(1-progress);scatterIdentity.push(cell.charIndex,cell.glyphIndex,cell.ordinal,cell.serial);scatterMotion.push(cell.startX,cell.startY,cell.velocityX,cell.velocityY,cell.startTime);if(!state||state.id!==cell.id||!Number.isFinite(cell.startX)||!Number.isFinite(cell.startY)||!Number.isFinite(cell.velocityX)||!Number.isFinite(cell.velocityY)||cell.startTime>time+.001||!near(state.currentX,currentX,.0002)||!near(state.currentY,currentY,.0002)||!near(state.progress,Math.fround(progress),.000003)||!near(state.opacity,opacity,.000003))scatterErrors++}
      const telemetryOk=data.textLength===String(text.length)&&data.expectedCellCount===String(expectedCellCount)&&data.liveCellCount===String(definitions.length)&&data.scatterCellCount===String(scatter.length)&&data.waitingCells===String(waiting)&&data.flyingCells===String(flying)&&data.glowCells===String(glow)&&data.stableCells===String(stable)&&data.launchBoundsValid==='true'&&near(Number(data.minLaunchDistance),minDistance,.000002)&&near(Number(data.maxLaunchDistance),maxDistance,.000002)&&data.liveIdentityChecksum===checksum(identity,1)&&data.liveStartChecksum===checksum(starts,1000)&&data.liveTargetChecksum===checksum(flatten(states,['targetX','targetY']),1000)&&data.liveCurrentChecksum===checksum(flatten(states,['currentX','currentY']),1000)&&data.liveProgressChecksum===checksum(flatten(states,['progress','eased']),1000000)&&data.liveBrightnessChecksum===checksum(flatten(states,['brightness','opacity']),1000000)&&data.liveWaveChecksum===checksum(flatten(states,['waveY']),1000000)&&data.scatterIdentityChecksum===checksum(scatterIdentity,1)&&data.scatterMotionChecksum===checksum(scatterMotion,1000)&&data.scatterCurrentChecksum===checksum(flatten(scatterStates,['currentX','currentY','progress','opacity']),1000)&&data.inputValue===text&&data.placeholder==='TYPE'&&data.maxLength==='8';
      const layoutOk=Number(data.bannerColumns)===expectedColumns&&near(Number(data.cellWidth),expectedCellWidth,.000002)&&near(Number(data.cellHeight),expectedCellHeight,.000002)&&near(Number(data.fontSize),expectedFont,.000002)&&near(Number(data.fieldWidth),expectedColumns*expectedCellWidth,.000002)&&near(Number(data.fieldHeight),7*expectedCellHeight,.000002)&&near(Number(data.layoutOffsetX),expectedOffsetX,.000002)&&near(Number(data.layoutOffsetY),expectedOffsetY,.000002)&&expectedOffsetX>=0&&expectedOffsetY>=0&&expectedOffsetX+expectedColumns*expectedCellWidth<=canvasWidth+.001&&expectedOffsetY+7*expectedCellHeight<=canvasHeight+.001;
      return{ok:lengths&&!definitionErrors&&!stateErrors&&!scatterErrors&&!phaseTimeErrors&&telemetryOk&&layoutOk,lengths,definitionErrors,stateErrors,stateCheckErrors,scatterErrors,phaseTimeErrors,telemetryOk,layoutOk,cellsChecked:definitions.length,scatterChecked:scatter.length,expectedCellCount,waiting,flying,glow,stable,minDistance,maxDistance};
    };
    const validateAppend=function(before,after,character,source){if(!before||!after)return{ok:false};const expectedAdded=expectedCounts[expectedOrder.indexOf(character)],oldIds=new Set(before.liveCells.map(function(cell){return cell.id})),added=after.liveCells.filter(function(cell){return!oldIds.has(cell.id)}),serial=Number(after.data.insertionSerial),sameClock=near(Number(before.data.activeTime),Number(after.data.activeTime),.001),telemetry=after.data.text===before.data.text+character&&added.length===expectedAdded&&added.every(function(cell){return cell.character===character&&cell.serial===serial&&near(cell.bornAt,Number(after.data.activeTime),.001)})&&Number(after.data.appendEvents)===Number(before.data.appendEvents)+1&&Number(after.data.insertionSerial)===Number(before.data.insertionSerial)+1&&after.data.lastInputSource===source&&near(Number(after.data.lastActivity),Number(after.data.activeTime),.001)&&near(Number(after.data.nextWaveAt),Number(after.data.activeTime)+4000,.001)&&after.data.waving==='false';return{ok:sameClock&&telemetry&&validateState(after).ok,sameClock,telemetry,added:added.length,expectedAdded,validation:validateState(after)}};
    const validateDelete=function(before,after,source){
      if(!before||!after||!before.data.text)return{ok:false};
      const removedIndex=before.data.text.length-1,removedCharacter=before.data.text[removedIndex],removed=before.liveCells.filter(function(cell){return cell.charIndex===removedIndex}),beforeStates=new Map(before.liveState.map(function(state){return[state.id,state]})),oldScatterIds=new Set(before.scatterCells.map(function(cell){return cell.id})),addedScatter=after.scatterCells.filter(function(cell){return!oldScatterIds.has(cell.id)}),expectedScatter=typeReduced?0:removed.length,beforeCanvasWidth=Number(before.data.canvasClientWidth),beforeCanvasHeight=Number(before.data.canvasClientHeight),beforeColumns=before.data.text.length*5+(before.data.text.length-1),beforeCellWidth=Math.min(7,Math.max(1,beforeCanvasWidth-24)/47),beforeCellHeight=beforeCellWidth*12/7,beforeOffsetX=(beforeCanvasWidth-beforeColumns*beforeCellWidth)/2,beforeOffsetY=(beforeCanvasHeight-7*beforeCellHeight)/2,centerX=beforeOffsetX+(removedIndex*6+2.5)*beforeCellWidth,centerY=beforeOffsetY+3.5*beforeCellHeight;let physicsErrors=0;
      if(!typeReduced)for(let index=0;index<removed.length;index++){const cell=removed[index],state=beforeStates.get(cell.id),particle=addedScatter[index];let dx=state.currentX-centerX,dy=state.currentY-centerY,length=Math.hypot(dx,dy);if(length<.001){const angle=unit(cell.serial,cell.glyphIndex,0x7f4a7c15)*Math.PI*2;dx=Math.cos(angle);dy=Math.sin(angle);length=1}const nx=dx/length,ny=dy/length,speed=70+55*unit(cell.serial,cell.glyphIndex,0x165667b1),tangent=(unit(cell.serial,cell.glyphIndex,0xd3a2646c)-.5)*24,lift=28+24*unit(cell.serial,cell.glyphIndex,0xfd7046c5),velocityX=Math.fround(nx*speed-ny*tangent),velocityY=Math.fround(ny*speed+nx*tangent-lift);if(!particle||particle.id!==cell.id||particle.character!==removedCharacter||particle.charIndex!==removedIndex||!near(particle.startTime,Number(after.data.activeTime),.001)||!near(particle.startX,state.currentX,.000003)||!near(particle.startY,state.currentY,.000003)||!near(particle.velocityX,velocityX,.000003)||!near(particle.velocityY,velocityY,.000003))physicsErrors++}
      const telemetry=after.data.text===before.data.text.slice(0,-1)&&Number(after.data.deleteEvents)===Number(before.data.deleteEvents)+1&&after.data.lastInputSource===source&&addedScatter.length===expectedScatter&&Number(after.data.liveCellCount)===Number(before.data.liveCellCount)-removed.length&&near(Number(after.data.activeTime),Number(before.data.activeTime),.001)&&near(Number(after.data.lastActivity),Number(after.data.activeTime),.001)&&near(Number(after.data.nextWaveAt),Number(after.data.activeTime)+4000,.001)&&after.data.waving==='false',validation=validateState(after);return{ok:telemetry&&!physicsErrors&&validation.ok,telemetry,physicsErrors,removed:removed.length,expectedScatter,addedScatter:addedScatter.length,validation};
    };
    const pixelScan=function(){const values=typeCanvas.getContext('2d').getImageData(0,0,typeCanvas.width,typeCanvas.height).data;let ink=0,txt1=0,txt0=0,minX=typeCanvas.width,minY=typeCanvas.height,maxX=-1,maxY=-1,hash=2166136261;for(let index=0;index<values.length;index+=4){const red=values[index],green=values[index+1],blue=values[index+2],pixel=index/4,x=pixel%typeCanvas.width,y=Math.floor(pixel/typeCanvas.width),distance=Math.abs(red-10)+Math.abs(green-10)+Math.abs(blue-11);hash=Math.imul(hash^red,16777619);hash=Math.imul(hash^green,16777619);hash=Math.imul(hash^blue,16777619);if(distance>16){ink++;minX=Math.min(minX,x);minY=Math.min(minY,y);maxX=Math.max(maxX,x);maxY=Math.max(maxY,y)}if(Math.abs(red-155)<14&&Math.abs(green-155)<14&&Math.abs(blue-163)<14)txt1++;if(Math.abs(red-236)<14&&Math.abs(green-236)<14&&Math.abs(blue-239)<14)txt0++}return{total:values.length/4,ink,txt1,txt0,minX:minX===typeCanvas.width?-1:minX,minY:minY===typeCanvas.height?-1:minY,maxX,maxY,checksum:(hash>>>0).toString(16).toUpperCase().padStart(8,'0')}};
    const rootRect=rectOf(root),stageRect=rectOf(typeStage),canvasRect=rectOf(typeCanvas),wellRect=rectOf(typeWell),focusSelector='button,input,select,textarea,a[href],[tabindex]';
    const structure={role:root.getAttribute('role'),rootLabel:root.getAttribute('aria-label'),canvasCount:root.querySelectorAll('.d-ascii-type-explode-canvas').length,canvasRole:typeCanvas.getAttribute('role'),canvasLabel:typeCanvas.getAttribute('aria-label'),inputType:typeInput.type,inputLabel:typeInput.getAttribute('aria-label'),inputMaxLength:typeInput.getAttribute('maxlength'),inputPattern:typeInput.getAttribute('pattern'),inputPlaceholder:typeInput.getAttribute('placeholder'),inputSpellcheck:typeInput.getAttribute('spellcheck'),inputAutocomplete:typeInput.getAttribute('autocomplete'),inputAutocapitalize:typeInput.getAttribute('autocapitalize'),inputMode:typeInput.getAttribute('inputmode'),focusables:(root.matches(focusSelector)?1:0)+root.querySelectorAll(focusSelector).length,statusLive:typeStatus.getAttribute('aria-live'),statusAtomic:typeStatus.getAttribute('aria-atomic'),helpText:root.querySelector('.d-ascii-type-explode-help').textContent,headerText:root.querySelector('.d-ascii-type-explode-top').textContent,rootBackground:getComputedStyle(root).backgroundColor,rootColor:getComputedStyle(root).color,stageBackground:getComputedStyle(typeStage).backgroundColor,stageBorder:getComputedStyle(typeStage).borderWidth,stageRadius:getComputedStyle(typeStage).borderRadius,wellBackground:getComputedStyle(typeWell).backgroundColor,wellBorder:getComputedStyle(typeWell).borderWidth,caretColor:getComputedStyle(typeInput).caretColor,placeholderColor:getComputedStyle(typeInput,'::placeholder').color,overlayBackground:getComputedStyle(root,'::before').backgroundImage,headerFont:getComputedStyle(root.querySelector('.d-ascii-type-explode-top')).fontSize,stageInside:inside(stageRect,rootRect),canvasInside:inside(canvasRect,stageRect),wellInside:inside(wellRect,rootRect),stageWidth:stageRect.width,stageHeight:stageRect.height,canvasClientWidth:typeCanvas.clientWidth,canvasClientHeight:typeCanvas.clientHeight,canvasWidth:typeCanvas.width,canvasHeight:typeCanvas.height,dpr:Number(root.dataset.dpr),baselinePixels:pixelScan()};
    let currentRaw=inspect();const initial={snapshot:snapshot(),staticValidation:validateStatic(currentRaw),validation:validateState(currentRaw),pixels:pixelScan()},initialFreeze=freezeKey(initial.snapshot);await wait(140);currentRaw=inspect();const idle={snapshot:snapshot(),validation:validateState(currentRaw),freeze:freezeKey(snapshot())};
    const focusBefore=document.activeElement===typeInput;typeStage.dispatchEvent(new PointerEvent('pointerdown',{bubbles:true,pointerId:90,pointerType:'mouse',isPrimary:false,button:0,buttons:1,clientX:stageRect.left+15,clientY:stageRect.top+15}));const secondaryFocused=document.activeElement===typeInput;typeStage.dispatchEvent(new PointerEvent('pointerdown',{bubbles:true,pointerId:1,pointerType:'mouse',isPrimary:true,button:0,buttons:1,clientX:stageRect.left+20,clientY:stageRect.top+20}));const focus={before:focusBefore,secondary:secondaryFocused,primary:document.activeElement===typeInput,snapshot:snapshot(),wellBorder:getComputedStyle(typeWell).borderColor,wellShadow:getComputedStyle(typeWell).boxShadow};
    const invalidBefore=inspect();typeInput.dispatchEvent(new KeyboardEvent('keydown',{bubbles:true,cancelable:true,key:'!'}));const invalidPunctuation=inspect();typeInput.dispatchEvent(new KeyboardEvent('keydown',{bubbles:true,cancelable:true,key:'a',ctrlKey:true}));const invalidModifier=inspect();typeInput.dispatchEvent(new KeyboardEvent('keydown',{bubbles:true,cancelable:true,key:'A',isComposing:true}));const invalidCompositionKey=inspect();const invalid={before:snapshot(),punctuation:{snapshot:snapshot(),validation:validateState(invalidPunctuation)},modifierUnchanged:invalidModifier.data.text===invalidPunctuation.data.text&&invalidModifier.data.liveIdentityChecksum===invalidPunctuation.data.liveIdentityChecksum,compositionKeyUnchanged:invalidCompositionKey.data.text===invalidPunctuation.data.text&&invalidCompositionKey.data.liveIdentityChecksum===invalidPunctuation.data.liveIdentityChecksum,ignoredDelta:Number(invalidPunctuation.data.ignoredInputs)-Number(invalidBefore.data.ignoredInputs)};
    currentRaw=inspect();const beforeA=currentRaw;typeInput.dispatchEvent(new KeyboardEvent('keydown',{bubbles:true,cancelable:true,key:'a'}));currentRaw=inspect();const appendA={snapshot:snapshot(),transition:validateAppend(beforeA,currentRaw,'A','keyboard'),validation:validateState(currentRaw),pixels:pixelScan()},aBorn=currentRaw.liveCells.length?currentRaw.liveCells[0].bornAt:Number(root.dataset.activeTime);
    let visibility=null,stagger=null,landing=null,settledA=null;
    if(!typeReduced){
      await poll(function(){return Number(root.dataset.activeTime)>=aBorn+60},800);currentRaw=inspect();stagger={snapshot:snapshot(),validation:validateState(currentRaw),pixels:pixelScan()};root.style.transform='translateY(1000px)';await poll(function(){return root.dataset.visible==='false'&&root.dataset.running==='false'},1000);currentRaw=inspect();const hidden={snapshot:snapshot(),validation:validateState(currentRaw),freeze:freezeKey(snapshot())};await wait(520);currentRaw=inspect();const hiddenStable={snapshot:snapshot(),validation:validateState(currentRaw),freeze:freezeKey(snapshot())};root.style.transform='';await poll(function(){return root.dataset.visible==='true'&&root.dataset.running==='true'},1000);const resumeBefore=snapshot();await poll(function(){return Number(root.dataset.schedulerFrames)>resumeBefore.schedulerFrames},500);currentRaw=inspect();const resumed={snapshot:snapshot(),validation:validateState(currentRaw)};visibility={hidden,hiddenStable,resumeBefore,resumed};
      await poll(function(){return Number(root.dataset.glowCells)>0},1000);currentRaw=inspect();landing={snapshot:snapshot(),validation:validateState(currentRaw),pixels:pixelScan()};const stableAt=Math.max.apply(null,currentRaw.liveCells.map(function(cell){return cell.bornAt+cell.delay+650}));await poll(function(){return Number(root.dataset.activeTime)>=stableAt+10},1500);currentRaw=inspect();settledA={snapshot:snapshot(),validation:validateState(currentRaw),pixels:pixelScan()};
    }else{
      stagger={snapshot:snapshot(),validation:validateState(currentRaw),pixels:pixelScan()};root.style.transform='translateY(1000px)';await poll(function(){return root.dataset.visible==='false'},1000);currentRaw=inspect();const hidden={snapshot:snapshot(),validation:validateState(currentRaw),freeze:freezeKey(snapshot())};await wait(90);currentRaw=inspect();const hiddenStable={snapshot:snapshot(),validation:validateState(currentRaw),freeze:freezeKey(snapshot())};root.style.transform='';await poll(function(){return root.dataset.visible==='true'},1000);currentRaw=inspect();const restored={snapshot:snapshot(),validation:validateState(currentRaw),freeze:freezeKey(snapshot())};visibility={hidden,hiddenStable,resumeBefore:restored,resumed:restored};landing=appendA;settledA={snapshot:snapshot(),validation:validateState(currentRaw),pixels:pixelScan()};
    }
    let before=currentRaw;typeInput.dispatchEvent(new InputEvent('beforeinput',{bubbles:true,cancelable:true,inputType:'insertText',data:'1'}));currentRaw=inspect();const beforeInput={snapshot:snapshot(),transition:validateAppend(before,currentRaw,'1','beforeinput'),validation:validateState(currentRaw)};
    before=currentRaw;const pasteEvent=new Event('paste',{bubbles:true,cancelable:true});Object.defineProperty(pasteEvent,'clipboardData',{value:{getData:function(){return'b!2'}}});typeInput.dispatchEvent(pasteEvent);currentRaw=inspect();const oldPasteIds=new Set(before.liveCells.map(function(cell){return cell.id})),pasteAdded=currentRaw.liveCells.filter(function(cell){return!oldPasteIds.has(cell.id)}),paste={snapshot:snapshot(),validation:validateState(currentRaw),textBefore:before.data.text,appendDelta:Number(currentRaw.data.appendEvents)-Number(before.data.appendEvents),serialDelta:Number(currentRaw.data.insertionSerial)-Number(before.data.insertionSerial),pasteDelta:Number(currentRaw.data.pasteEvents)-Number(before.data.pasteEvents),added:pasteAdded.length,expectedAdded:expectedCounts[expectedOrder.indexOf('B')]+expectedCounts[expectedOrder.indexOf('2')]};
    before=currentRaw;typeInput.dispatchEvent(new CompositionEvent('compositionstart',{bubbles:true,data:''}));const compositionStarted=inspect();typeInput.value=before.data.text+'z';typeInput.dispatchEvent(new InputEvent('input',{bubbles:true,inputType:'insertCompositionText',data:'z',isComposing:true}));const compositionInterim=inspect();typeInput.dispatchEvent(new CompositionEvent('compositionend',{bubbles:true,data:'z'}));currentRaw=inspect();const compositionCommitted=currentRaw,compositionCommittedSnapshot=snapshot(),compositionTransition=validateAppend(before,compositionCommitted,'Z','composition'),beforeDuplicate=inspect();typeInput.dispatchEvent(new InputEvent('input',{bubbles:true,inputType:'insertText',data:'z'}));currentRaw=inspect();const composition={started:{snapshot:{text:compositionStarted.data.text,composing:compositionStarted.data.composing,starts:Number(compositionStarted.data.compositionStarts)},unchanged:compositionStarted.data.liveIdentityChecksum===before.data.liveIdentityChecksum},interim:{text:compositionInterim.data.text,inputValue:compositionInterim.data.inputValue,composing:compositionInterim.data.composing,inputEvents:Number(compositionInterim.data.inputEvents),unchanged:compositionInterim.data.liveIdentityChecksum===before.data.liveIdentityChecksum&&compositionInterim.data.text===before.data.text},committed:{snapshot:compositionCommittedSnapshot,transition:compositionTransition,validation:validateState(compositionCommitted)},duplicate:{snapshot:snapshot(),unchanged:currentRaw.data.liveIdentityChecksum===beforeDuplicate.data.liveIdentityChecksum&&currentRaw.data.text===beforeDuplicate.data.text&&Number(currentRaw.data.appendEvents)===Number(beforeDuplicate.data.appendEvents),validation:validateState(currentRaw)}};
    before=currentRaw;typeInput.value=currentRaw.data.text+'c3d9!';typeInput.dispatchEvent(new InputEvent('input',{bubbles:true,inputType:'insertFromPaste',data:null}));currentRaw=inspect();const reconcile={snapshot:snapshot(),validation:validateState(currentRaw),beforeText:before.data.text,inputDelta:Number(currentRaw.data.inputEvents)-Number(before.data.inputEvents),reconcileDelta:Number(currentRaw.data.reconcileEvents)-Number(before.data.reconcileEvents),appendDelta:Number(currentRaw.data.appendEvents)-Number(before.data.appendEvents),serialDelta:Number(currentRaw.data.insertionSerial)-Number(before.data.insertionSerial)};
    const capBefore=inspect();typeInput.dispatchEvent(new KeyboardEvent('keydown',{bubbles:true,cancelable:true,key:'9'}));currentRaw=inspect();const capAttempt={snapshot:snapshot(),unchanged:currentRaw.data.text===capBefore.data.text&&currentRaw.data.liveIdentityChecksum===capBefore.data.liveIdentityChecksum&&Number(currentRaw.data.appendEvents)===Number(capBefore.data.appendEvents),ignoredDelta:Number(currentRaw.data.ignoredInputs)-Number(capBefore.data.ignoredInputs),validation:validateState(currentRaw)};
    if(!typeReduced){const stableAt=Math.max.apply(null,currentRaw.liveCells.map(function(cell){return cell.bornAt+cell.delay+650}));await poll(function(){return Number(root.dataset.activeTime)>=stableAt+10},1800);currentRaw=inspect()}const full={snapshot:snapshot(),validation:validateState(currentRaw),pixels:pixelScan()};
    before=currentRaw;typeInput.dispatchEvent(new KeyboardEvent('keydown',{bubbles:true,cancelable:true,key:'Backspace'}));currentRaw=inspect();const deleteStart={snapshot:snapshot(),transition:validateDelete(before,currentRaw,'backspace'),validation:validateState(currentRaw),pixels:pixelScan()},scatterStartTime=currentRaw.scatterCells.length?currentRaw.scatterCells[0].startTime:Number(root.dataset.activeTime);let scatterMid=null,scatterComplete=null;
    if(!typeReduced){await poll(function(){return Number(root.dataset.activeTime)>=scatterStartTime+190},800);currentRaw=inspect();scatterMid={snapshot:snapshot(),validation:validateState(currentRaw),pixels:pixelScan(),progressMinimum:Math.min.apply(null,currentRaw.scatterState.map(function(state){return state.progress})),progressMaximum:Math.max.apply(null,currentRaw.scatterState.map(function(state){return state.progress}))};await poll(function(){return Number(root.dataset.scatterCellCount)===0},800);currentRaw=inspect();scatterComplete={snapshot:snapshot(),validation:validateState(currentRaw),pixels:pixelScan()}}else{scatterMid=deleteStart;scatterComplete={snapshot:snapshot(),validation:validateState(currentRaw),pixels:pixelScan()}};
    const waveBefore={snapshot:snapshot(),validation:validateState(currentRaw),pixels:pixelScan()};let wave=null;
    if(!typeReduced){const triggerBefore=waveBefore.snapshot.waveTriggers,completeBefore=waveBefore.snapshot.completedWaves;await poll(function(){return Number(root.dataset.waveTriggers)>=triggerBefore+1},4400);currentRaw=inspect();const started={snapshot:snapshot(),validation:validateState(currentRaw)};await poll(function(){return Number(root.dataset.waveElapsed)>=560},900);currentRaw=inspect();const nonZero=currentRaw.liveState.filter(function(state){return Math.abs(state.waveY)>.01}),mid={snapshot:snapshot(),validation:validateState(currentRaw),pixels:pixelScan(),nonZero:nonZero.length,minimum:nonZero.length?Math.min.apply(null,nonZero.map(function(state){return state.waveY})):0,maximum:nonZero.length?Math.max.apply(null,nonZero.map(function(state){return state.waveY})):0};await poll(function(){return Number(root.dataset.completedWaves)>=completeBefore+1},1000);currentRaw=inspect();const completed={snapshot:snapshot(),validation:validateState(currentRaw),pixels:pixelScan()};wave={started,mid,completed}}else{const beforeWait=snapshot(),key=freezeKey(beforeWait);await wait(4100);currentRaw=inspect();wave={before:beforeWait,key,after:snapshot(),afterKey:freezeKey(snapshot()),validation:validateState(currentRaw)}}
    before=currentRaw;typeInput.dispatchEvent(new KeyboardEvent('keydown',{bubbles:true,cancelable:true,key:'9'}));currentRaw=inspect();const resetPrelude={snapshot:snapshot(),validation:validateState(currentRaw),appendDelta:Number(currentRaw.data.appendEvents)-Number(before.data.appendEvents)};root.__asciiTypeExplodeReset();currentRaw=inspect();const reset={snapshot:snapshot(),validation:validateState(currentRaw),pixels:pixelScan()};await wait(typeReduced?650:120);currentRaw=inspect();reset.stable={snapshot:snapshot(),validation:validateState(currentRaw),pixels:pixelScan()};
    const finalBefore=currentRaw;typeInput.dispatchEvent(new InputEvent('beforeinput',{bubbles:true,cancelable:true,inputType:'insertText',data:'TYPE'}));currentRaw=inspect();if(!typeReduced){const stableAt=Math.max.apply(null,currentRaw.liveCells.map(function(cell){return cell.bornAt+cell.delay+650}));await poll(function(){return Number(root.dataset.activeTime)>=stableAt+10},1700);currentRaw=inspect()}const final={snapshot:snapshot(),validation:validateState(currentRaw),pixels:pixelScan(),appendDelta:Number(currentRaw.data.appendEvents)-Number(finalBefore.data.appendEvents),scrollWidth:root.scrollWidth,clientWidth:root.clientWidth,scrollHeight:root.scrollHeight,clientHeight:root.clientHeight,stageInside:inside(rectOf(typeStage),rectOf(root)),canvasInside:inside(rectOf(typeCanvas),rectOf(typeStage)),wellInside:inside(rectOf(typeWell),rectOf(root))};
    const disposable=document.createElement('div');disposable.style.cssText='position:fixed;left:-5000px;top:0;width:'+stageWidth+'px;height:320px';disposable.innerHTML=data.html;document.body.appendChild(disposable);const cloneRoot=disposable.querySelector('.'+data.rootClass),cloneInput=cloneRoot.querySelector('input');new Function('root','stage',data.js)(cloneRoot,disposable);await wait(140);const cloneBefore=cloneRoot.__asciiTypeExplodeInspect();disposable.remove();await poll(function(){return cloneRoot.dataset.cleaned==='true'},700);const cloneAfter=cloneRoot.__asciiTypeExplodeInspect(),cloneKey=function(raw){const value=raw.data;return[value.text,value.liveCellCount,value.scatterCellCount,value.activeTime,value.schedulerFrames,value.renderFrames,value.appendEvents,value.deleteEvents,value.inputEvents,value.liveIdentityChecksum,value.liveCurrentChecksum,value.scatterCurrentChecksum,value.cleaned,value.running].join('|')},cleanupKey=cloneKey(cloneAfter);cloneInput.dispatchEvent(new KeyboardEvent('keydown',{bubbles:true,cancelable:true,key:'A'}));cloneInput.value='A';cloneInput.dispatchEvent(new InputEvent('input',{bubbles:true,inputType:'insertText',data:'A'}));await wait(140);const cloneStable=cloneRoot.__asciiTypeExplodeInspect(),cleanup={before:{running:cloneBefore.data.running,cleaned:cloneBefore.data.cleaned},after:{running:cloneAfter.data.running,cleaned:cloneAfter.data.cleaned,source:cloneAfter.data.source},key:cleanupKey,stableKey:cloneKey(cloneStable),detached:!cloneRoot.isConnected};
    typeExplode={metadata:{glyphOrder:root.dataset.glyphOrder,glyphWidth:root.dataset.glyphWidth,glyphHeight:root.dataset.glyphHeight,glyphGap:root.dataset.glyphGap,cap:root.dataset.cap,maxBannerColumns:root.dataset.maxBannerColumns,flyRadius:root.dataset.flyRadius,launchRadiusMinimum:root.dataset.launchRadiusMinimum,launchRadiusCap:root.dataset.launchRadiusCap,launchFormula:root.dataset.launchFormula,flyDuration:root.dataset.flyDuration,cellStagger:root.dataset.cellStagger,glowDuration:root.dataset.glowDuration,scatterDuration:root.dataset.scatterDuration,gravity:root.dataset.gravity,idleDelay:root.dataset.idleDelay,waveDuration:root.dataset.waveDuration,waveTravel:root.dataset.waveTravel,waveLobe:root.dataset.waveLobe,waveAmplitude:root.dataset.waveAmplitude,ease:root.dataset.ease,mapCellCounts:root.dataset.mapCellCounts,mapChecksums:root.dataset.mapChecksums,mapChecksum:root.dataset.mapChecksum},structure,initial,initialFreeze,idle,focus,invalid,appendA,stagger,visibility,landing,settledA,beforeInput,paste,composition,reconcile,capAttempt,full,scatter:{start:deleteStart,mid:scatterMid,complete:scatterComplete},wave,resetPrelude,reset,cleanup,reduced:root.dataset.reduced,final};
  }
  let terminalWindow=null;
  if(root.classList.contains('d-raster-terminal-window')){
    const terminalReduced=root.dataset.reduced==='true',terminalStage=root.querySelector('.d-raster-terminal-window-stage'),terminalShell=root.querySelector('.d-raster-terminal-window-shell'),terminalTitlebar=root.querySelector('.d-raster-terminal-window-titlebar'),terminalTabs=[...root.querySelectorAll('.d-raster-terminal-window-tab')],terminalPanels=[...root.querySelectorAll('.d-raster-terminal-window-panel')],terminalBody=root.querySelector('.d-raster-terminal-window-body'),terminalHistory=root.querySelector('.d-raster-terminal-window-history'),terminalCurrent=root.querySelector('.d-raster-terminal-window-current'),terminalPrompt=root.querySelector('.d-raster-terminal-window-prompt'),terminalTyped=root.querySelector('.d-raster-terminal-window-typed'),terminalCursor=root.querySelector('.d-raster-terminal-window-cursor'),terminalStatus=root.querySelector('.d-raster-terminal-window-status'),terminalDots=[...root.querySelectorAll('.d-raster-terminal-window-dot')];
    const wait=function(ms){return new Promise(function(resolve){setTimeout(resolve,ms)})},poll=async function(test,timeout){const started=performance.now();while(performance.now()-started<(timeout||1200)){if(test())return true;await wait(12)}return test()},near=function(actual,expected,tolerance){return Math.abs(Number(actual)-Number(expected))<=(tolerance||.001)},clamp=function(value,min,max){return Math.max(min,Math.min(max,value))},inspect=function(){return typeof root.__terminalWindowInspect==='function'?root.__terminalWindowInspect():null};
    const fixtureCommands=[
      {command:'pwd',outputs:['/workspaces/intrx','branch / interaction-lab']},
      {command:'ls interactions/',outputs:['ascii/  fui/  motion/','288 demos indexed']},
      {command:'npm run build',spinner:true,outputs:['10 frames rendered','build complete / 0 errors']},
      {command:'git status --short',outputs:['M  motion/terminal-window.js','checks / deterministic']},
      {command:'node verify.js',outputs:['registry ........ ok','motion ......... ok','ready / 288 demos']}
    ],fixtureSpinner=['[|]','[/]','[-]','[\\]','[|]','[/]','[-]','[\\]','[|]','[/]'];
    const rectOf=function(node){if(!node)return null;const box=node.getBoundingClientRect();return{left:box.left,top:box.top,right:box.right,bottom:box.bottom,width:box.width,height:box.height}},inside=function(inner,outer){return Boolean(inner&&outer&&inner.left>=outer.left-.5&&inner.right<=outer.right+.5&&inner.top>=outer.top-.5&&inner.bottom<=outer.bottom+.5)},textChecksum=function(value){let hash=2166136261;const text=String(value);for(let index=0;index<text.length;index++){hash^=text.charCodeAt(index)+index;hash=Math.imul(hash,16777619)}return(hash>>>0).toString(16).toUpperCase().padStart(8,'0')},moduleChecksum=function(value){let hash=2166136261;for(const character of String(value))hash=Math.imul(hash^character.charCodeAt(0),16777619)>>>0;return hash.toString(16).padStart(8,'0')};
    const unit=function(cycle,index,charIndex){let value=(0x9e3779b9^Math.imul((cycle+1)|0,0x85ebca6b)^Math.imul((index+1)|0,0xc2b2ae35)^Math.imul((charIndex+1)|0,0x27d4eb2f))>>>0;value=Math.imul(value^(value>>>16),0x7feb352d);value=Math.imul(value^(value>>>15),0x846ca68b);return((value^(value>>>16))>>>0)/4294967296},typingDelay=function(cycle,index,charIndex){return clamp(Math.round(35+(unit(cycle,index,charIndex)*2-1)*20),15,55)},outputOffsets=function(count){if(count===1)return[300];return Array.from({length:count},function(_,index){return index*300/(count-1)})};
    const scheduleRow=function(row){return Array.isArray(row)?row:row&&Array.isArray(row.delays)?row.delays:null},sameNumbers=function(actual,expected,tolerance){return Boolean(actual&&actual.length===expected.length&&actual.every(function(value,index){return near(value,expected[index],tolerance||.000001)}))},counter=function(raw,key){return raw&&raw.counters?Number(raw.counters[key]):NaN};
    const validateConfig=function(raw){
      if(!raw||!raw.config||!raw.schedules)return{ok:false};
      const config=raw.config,cycle=Number(raw.state.cycle),texts=fixtureCommands.map(function(command){return command.command}).concat('clear'),rows=raw.schedules.currentCycle||[];let scheduleErrors=0,delayCount=0;
      for(let index=0;index<texts.length;index++){const expected=Array.from(texts[index],function(_,charIndex){return typingDelay(cycle,index,charIndex)}),actual=scheduleRow(rows[index]);delayCount+=expected.length;if(!sameNumbers(actual,expected,0))scheduleErrors++}
      const constants=[config.typingBase,config.typingJitter,config.typingMin,config.typingMax,config.outputDuration,config.pauseDuration,config.spinnerDuration,config.spinnerFrameDuration,config.spinnerFrames&&config.spinnerFrames.length,config.cursorBlink,config.crossfadeDuration,config.dragLerp,config.releaseDecay,config.maxReleaseSpeed,config.commandsBeforeClear,config.maxDelta].join('|')==='35|20|15|55|300|900|2000|200|10|530|150|0.15|0.88|420|5|50';
      const normalized=(config.commands||[]).map(function(item){const copy={command:item.command};if(item.spinner)copy.spinner=true;copy.outputs=(item.outputs||[]).slice();return copy}),fixtures=JSON.stringify(normalized)===JSON.stringify(fixtureCommands),spinner=JSON.stringify(config.spinnerFrames)===JSON.stringify(fixtureSpinner),checksums=raw.checksums&&raw.checksums.commandChecksum===moduleChecksum(JSON.stringify(fixtureCommands))&&raw.checksums.scheduleChecksum===moduleChecksum(JSON.stringify(rows))&&raw.checksums.historyChecksum===moduleChecksum(JSON.stringify(raw.history))&&raw.checksums.spinnerChecksum===moduleChecksum(fixtureSpinner.join('|'));
      return{ok:constants&&fixtures&&spinner&&checksums&&!scheduleErrors,constants,fixtures,spinner,checksums,scheduleErrors,delayCount,fixtureChecksum:textChecksum(JSON.stringify(fixtureCommands)),scheduleChecksum:textChecksum(JSON.stringify(rows))};
    };
    const visibleOutputCount=function(value){if(Array.isArray(value))return value.length;if(value&&typeof value==='object')return Object.keys(value).filter(function(key){return Boolean(value[key])}).length;return Number(value)||0};
    const validateState=function(raw){
      if(!raw||!raw.state||!raw.drag||!raw.tabs||!raw.counters||!raw.lifecycle)return{ok:false};
      const state=raw.state,drag=raw.drag,tabs=raw.tabs,cycle=Number(state.cycle),index=Number(state.commandIndex),pending=state.pendingClear===true||state.pendingClear==='true'||index>=fixtureCommands.length,text=pending?'clear':fixtureCommands[clamp(index,0,fixtureCommands.length-1)].command,scheduleIndex=pending?fixtureCommands.length:index,expectedDelays=Array.from(text,function(_,charIndex){return typingDelay(cycle,scheduleIndex,charIndex)});let typingErrors=0,outputErrors=0,spinnerErrors=0,tabErrors=0,dragErrors=0;
      if(state.phase==='typing'){if(!sameNumbers(state.typingDelays,expectedDelays,0)||Number(state.typingCursor)<0||Number(state.typingCursor)>text.length||state.typedText!==text.slice(0,Number(state.typingCursor)))typingErrors++;const cursor=Number(state.typingCursor),next=Number(state.phaseStart)+expectedDelays.slice(0,Math.min(cursor+1,expectedDelays.length)).reduce(function(total,value){return total+value},0);if(cursor<text.length&&!near(state.nextTypeAt,next,.001))typingErrors++}
      if(state.phase==='output'&&!pending){const offsets=outputOffsets(fixtureCommands[index].outputs.length),elapsed=Number(state.activeTime)-Number(state.phaseStart),expectedVisible=offsets.filter(function(offset){return elapsed>=offset-.001}).length,actualOutputs=(raw.history||[]).filter(function(entry){return entry.kind==='output'&&Number(entry.commandIndex)===index&&Number(entry.cycle)===cycle}).map(function(entry){return entry.text});if(!sameNumbers(state.outputOffsets,offsets,.000001)||visibleOutputCount(state.outputVisible)!==expectedVisible||JSON.stringify(actualOutputs)!==JSON.stringify(fixtureCommands[index].outputs.slice(0,expectedVisible)))outputErrors++}
      if(state.phase==='spinner'){const elapsed=clamp(Number(state.activeTime)-Number(state.phaseStart),0,1999.999),expected=Math.min(9,Math.floor(elapsed/200));if(index!==2||Number(state.spinnerIndex)!==expected||!Array.isArray(state.spinnerVisited)||state.spinnerVisited.some(function(value,visitedIndex){return value!==visitedIndex||value<0||value>9}))spinnerErrors++}
      if(tabs.transitioning){const expected=clamp((Number(state.activeTime)-Number(tabs.start))/150,0,1);if(!near(tabs.progress,expected,.001)||Number(tabs.from)===Number(tabs.to))tabErrors++}else if(!near(tabs.progress,1,.001)||Number(tabs.active)!==Number(tabs.to))tabErrors++;
      const maxX=Number(drag.maxX),maxY=Number(drag.maxY);if([drag.currentX,drag.currentY,drag.targetX,drag.targetY,maxX,maxY].some(function(value){return!Number.isFinite(Number(value))})||Number(drag.currentX)<-.001||Number(drag.currentY)<-.001||Number(drag.targetX)<-.001||Number(drag.targetY)<-.001||Number(drag.currentX)>maxX+.001||Number(drag.targetX)>maxX+.001||Number(drag.currentY)>maxY+.001||Number(drag.targetY)>maxY+.001)dragErrors++;
      const config=validateConfig(raw);
      return{ok:config.ok&&!typingErrors&&!outputErrors&&!spinnerErrors&&!tabErrors&&!dragErrors,config,typingErrors,outputErrors,spinnerErrors,tabErrors,dragErrors,expectedDelays};
    };
    const freezeKey=function(raw){if(!raw)return'';return[raw.state.activeTime,raw.state.phase,raw.state.phaseStart,raw.state.commandIndex,raw.state.cycle,raw.state.typedText,raw.state.typingCursor,raw.state.spinnerIndex,raw.checksums&&raw.checksums.historyChecksum,raw.counters.schedulerFrames,raw.counters.commandsExecuted,raw.counters.outputLines,raw.counters.clearCommands,raw.counters.loops,raw.drag.currentX,raw.drag.currentY,raw.drag.targetX,raw.drag.targetY,raw.tabs.active,raw.tabs.progress].join('|')};
    const geometry=function(){const stageRect=rectOf(terminalStage),shellRect=rectOf(terminalShell),bodyRect=rectOf(terminalBody);return{stage:stageRect,shell:shellRect,body:bodyRect,shellInside:inside(shellRect,stageRect),bodyInside:inside(bodyRect,shellRect),maxX:stageRect&&shellRect?Math.max(0,stageRect.width-shellRect.width):NaN,maxY:stageRect&&shellRect?Math.max(0,stageRect.height-shellRect.height):NaN,scrollWidth:terminalBody?terminalBody.scrollWidth:NaN,clientWidth:terminalBody?terminalBody.clientWidth:NaN,scrollHeight:terminalBody?terminalBody.scrollHeight:NaN,clientHeight:terminalBody?terminalBody.clientHeight:NaN}};
    const cursorSample=function(){if(!terminalCursor)return null;const style=getComputedStyle(terminalCursor);return{text:terminalCursor.textContent,display:style.display,visibility:style.visibility,opacity:Number(style.opacity),animationName:style.animationName,animationDuration:style.animationDuration,color:style.color}};
    const panelOpacities=function(){return terminalPanels.map(function(panel){return Number(getComputedStyle(panel).opacity)})};
    const paintSample=function(){const nodes=[terminalShell,terminalTitlebar].concat(terminalDots,terminalTabs,terminalPanels,[terminalBody,terminalPrompt,terminalTyped,terminalCursor]).filter(Boolean),parts=nodes.map(function(node){const style=getComputedStyle(node),box=node.getBoundingClientRect();return[node.tagName,node.className,style.color,style.backgroundColor,style.borderColor,style.opacity,style.fontSize,Math.round(box.width*100)/100,Math.round(box.height*100)/100,node.textContent].join('~')});return{nodes:nodes.length,checksum:textChecksum(parts.join('|')),textChecksum:textChecksum(terminalShell?terminalShell.textContent:''),shellCenterHit:(function(){const box=terminalShell&&terminalShell.getBoundingClientRect();const hit=box&&document.elementFromPoint(box.left+box.width/2,box.top+box.height/2);return Boolean(hit&&terminalShell.contains(hit))})()}};
    const stageRect=rectOf(terminalStage),shellRect=rectOf(terminalShell),terminalMain=root.querySelector('.d-raster-terminal-window-main'),bodyStyle=terminalMain?getComputedStyle(terminalMain):null,titlebarStyle=terminalTitlebar?getComputedStyle(terminalTitlebar):null,shellStyle=terminalShell?getComputedStyle(terminalShell):null,focusSelector='button,input,select,textarea,a[href],[tabindex]';
    let currentRaw=inspect();
    const structure={tag:root.tagName,role:root.getAttribute('role'),rootLabel:root.getAttribute('aria-label'),shellTag:terminalShell&&terminalShell.tagName,shellRole:terminalShell&&terminalShell.getAttribute('role'),shellLabel:terminalShell&&terminalShell.getAttribute('aria-label'),titlebarRole:terminalTitlebar&&terminalTitlebar.getAttribute('role'),titlebarTabIndex:terminalTitlebar&&terminalTitlebar.getAttribute('tabindex'),titlebarLabel:terminalTitlebar&&terminalTitlebar.getAttribute('aria-label'),titlebarShortcuts:terminalTitlebar&&terminalTitlebar.getAttribute('aria-keyshortcuts'),title:root.querySelector('.d-raster-terminal-window-title')&&root.querySelector('.d-raster-terminal-window-title').textContent,stageCount:root.querySelectorAll('.d-raster-terminal-window-stage').length,shellCount:root.querySelectorAll('.d-raster-terminal-window-shell').length,dotCount:terminalDots.length,dotSizes:terminalDots.map(function(dot){const box=dot.getBoundingClientRect();return[box.width,box.height]}),dotColors:terminalDots.map(function(dot){return getComputedStyle(dot).backgroundColor}),dotOpacities:terminalDots.map(function(dot){return getComputedStyle(dot).opacity}),tabCount:terminalTabs.length,tabRoles:terminalTabs.map(function(tab){return tab.getAttribute('role')}),tabSelected:terminalTabs.map(function(tab){return tab.getAttribute('aria-selected')}),tabControls:terminalTabs.map(function(tab){return tab.getAttribute('aria-controls')}),tabIndices:terminalTabs.map(function(tab){return tab.getAttribute('tabindex')}),tabListRole:root.querySelector('.d-raster-terminal-window-tabs')&&root.querySelector('.d-raster-terminal-window-tabs').getAttribute('role'),panelCount:terminalPanels.length,panelRoles:terminalPanels.map(function(panel){return panel.getAttribute('role')}),panelLabels:terminalPanels.map(function(panel){return panel.getAttribute('aria-labelledby')}),statusLive:terminalStatus&&terminalStatus.getAttribute('aria-live'),statusAtomic:terminalStatus&&terminalStatus.getAttribute('aria-atomic'),focusables:(root.matches(focusSelector)?1:0)+root.querySelectorAll(focusSelector).length,prompt:terminalPrompt&&terminalPrompt.textContent,shellBackground:shellStyle&&shellStyle.backgroundColor,shellRadius:shellStyle&&shellStyle.borderRadius,shellBorder:shellStyle&&shellStyle.borderWidth,bodyFontSize:bodyStyle&&bodyStyle.fontSize,bodyFontFamily:bodyStyle&&bodyStyle.fontFamily,titlebarTouchAction:titlebarStyle&&titlebarStyle.touchAction,titlebarCursor:titlebarStyle&&titlebarStyle.cursor,inactiveTabBackground:terminalTabs[1]&&getComputedStyle(terminalTabs[1]).backgroundColor,inactiveTabColor:terminalTabs[1]&&getComputedStyle(terminalTabs[1]).color,geometry:geometry(),paint:paintSample()};
    const initial={raw:currentRaw,validation:validateState(currentRaw),frozen:Boolean(currentRaw&&Object.isFrozen(currentRaw)&&Object.isFrozen(currentRaw.config)&&Object.isFrozen(currentRaw.state)&&Object.isFrozen(currentRaw.history)),key:freezeKey(currentRaw),cursor:cursorSample()};
    let tabFlow=null;
    if(terminalTabs.length===2){
      const before=currentRaw,initialSwitches=counter(before,'tabSwitches');terminalTabs[1].click();currentRaw=inspect();const immediate={raw:currentRaw,validation:validateState(currentRaw),opacities:panelOpacities()};
      let mid=immediate;if(!terminalReduced){await poll(function(){const raw=inspect();return raw&&raw.tabs.transitioning&&Number(raw.tabs.progress)>=.35},500);currentRaw=inspect();mid={raw:currentRaw,validation:validateState(currentRaw),opacities:panelOpacities()};await poll(function(){const raw=inspect();return raw&&!raw.tabs.transitioning&&Number(raw.tabs.active)===1},500)}currentRaw=inspect();const complete={raw:currentRaw,validation:validateState(currentRaw),opacities:panelOpacities(),selected:terminalTabs.map(function(tab){return tab.getAttribute('aria-selected')})};
      terminalTabs[1].focus();terminalTabs[1].dispatchEvent(new KeyboardEvent('keydown',{bubbles:true,cancelable:true,key:'ArrowLeft'}));if(!terminalReduced)await poll(function(){const raw=inspect();return raw&&!raw.tabs.transitioning&&Number(raw.tabs.active)===0},500);currentRaw=inspect();const keyboard={raw:currentRaw,validation:validateState(currentRaw),focused:document.activeElement===terminalTabs[0],selected:terminalTabs.map(function(tab){return tab.getAttribute('aria-selected')}),opacities:panelOpacities()};
      tabFlow={before,initialSwitches,immediate,mid,complete,keyboard};
    }
    let dragFlow=null;
    if(terminalTitlebar&&terminalStage&&terminalShell){
      const pointerId=71,downRect=terminalTitlebar.getBoundingClientRect(),downX=downRect.left+downRect.width*.58,downY=downRect.top+downRect.height/2,before=currentRaw;
      terminalTitlebar.dispatchEvent(new PointerEvent('pointerdown',{bubbles:true,cancelable:true,pointerId:pointerId,pointerType:'mouse',isPrimary:true,button:0,buttons:1,clientX:downX,clientY:downY}));currentRaw=inspect();const down={raw:currentRaw,validation:validateState(currentRaw),nativeCapture:terminalTitlebar.hasPointerCapture?terminalTitlebar.hasPointerCapture(pointerId):false};
      terminalTitlebar.dispatchEvent(new PointerEvent('pointermove',{bubbles:true,pointerId:pointerId+1,pointerType:'mouse',isPrimary:true,button:0,buttons:1,clientX:downX+30,clientY:downY+20}));const mismatch=inspect();terminalTitlebar.dispatchEvent(new PointerEvent('pointerdown',{bubbles:true,cancelable:true,pointerId:pointerId+2,pointerType:'mouse',isPrimary:false,button:2,buttons:2,clientX:downX,clientY:downY}));const secondary=inspect();
      const farX=stageRect.right+500,farY=stageRect.bottom+500;terminalTitlebar.dispatchEvent(new PointerEvent('pointermove',{bubbles:true,pointerId:pointerId,pointerType:'mouse',isPrimary:true,button:0,buttons:1,clientX:farX,clientY:farY}));currentRaw=inspect();const clamped={raw:currentRaw,validation:validateState(currentRaw)};
      const targetX=Number(currentRaw.drag.maxX)*.62,targetY=Number(currentRaw.drag.maxY)*.48,moveX=stageRect.left+targetX+Number(currentRaw.drag.pointerOffsetX),moveY=stageRect.top+targetY+Number(currentRaw.drag.pointerOffsetY);terminalTitlebar.dispatchEvent(new PointerEvent('pointermove',{bubbles:true,pointerId:pointerId,pointerType:'mouse',isPrimary:true,button:0,buttons:1,clientX:moveX,clientY:moveY}));currentRaw=inspect();const lerpStart={raw:currentRaw,validation:validateState(currentRaw)};let lerpMid=lerpStart;
      if(!terminalReduced){const frameStart=counter(currentRaw,'schedulerFrames');await poll(function(){return counter(inspect(),'schedulerFrames')>=frameStart+4},600);currentRaw=inspect();const steps=counter(currentRaw,'schedulerFrames')-frameStart,expectedX=Number(lerpStart.raw.drag.targetX)+(Number(lerpStart.raw.drag.currentX)-Number(lerpStart.raw.drag.targetX))*Math.pow(.85,steps),expectedY=Number(lerpStart.raw.drag.targetY)+(Number(lerpStart.raw.drag.currentY)-Number(lerpStart.raw.drag.targetY))*Math.pow(.85,steps);lerpMid={raw:currentRaw,validation:validateState(currentRaw),steps,expectedX,expectedY,errorX:Math.abs(Number(currentRaw.drag.currentX)-expectedX),errorY:Math.abs(Number(currentRaw.drag.currentY)-expectedY)}}else{currentRaw=inspect();lerpMid={raw:currentRaw,validation:validateState(currentRaw),steps:0,expectedX:Number(currentRaw.drag.targetX),expectedY:Number(currentRaw.drag.targetY),errorX:Math.abs(Number(currentRaw.drag.currentX)-Number(currentRaw.drag.targetX)),errorY:Math.abs(Number(currentRaw.drag.currentY)-Number(currentRaw.drag.targetY))}};
      terminalTitlebar.dispatchEvent(new PointerEvent('pointerup',{bubbles:true,cancelable:true,pointerId:pointerId,pointerType:'mouse',isPrimary:true,button:0,buttons:0,clientX:moveX,clientY:moveY}));currentRaw=inspect();const released={raw:currentRaw,validation:validateState(currentRaw),nativeCapture:terminalTitlebar.hasPointerCapture?terminalTitlebar.hasPointerCapture(pointerId):false};let coast={raw:currentRaw,validation:validateState(currentRaw),expectedVelocityX:Number(currentRaw.drag.velocityX),expectedVelocityY:Number(currentRaw.drag.velocityY),velocityErrorX:0,velocityErrorY:0};
      if(!terminalReduced){const releaseTime=Number(currentRaw.state.activeTime),releaseVelocityX=Number(currentRaw.drag.velocityX),releaseVelocityY=Number(currentRaw.drag.velocityY),releaseTargetX=Number(currentRaw.drag.targetX),releaseTargetY=Number(currentRaw.drag.targetY);await poll(function(){return Number(inspect().state.activeTime)>=releaseTime+140},700);currentRaw=inspect();const elapsed=Number(currentRaw.state.activeTime)-releaseTime,decay=Math.pow(.88,elapsed/(1000/60)),expectedVelocityX=releaseVelocityX*decay,expectedVelocityY=releaseVelocityY*decay,hitX=Number(currentRaw.drag.targetX)<=.001||Number(currentRaw.drag.targetX)>=Number(currentRaw.drag.maxX)-.001,hitY=Number(currentRaw.drag.targetY)<=.001||Number(currentRaw.drag.targetY)>=Number(currentRaw.drag.maxY)-.001,targetDeltaX=Number(currentRaw.drag.targetX)-releaseTargetX,targetDeltaY=Number(currentRaw.drag.targetY)-releaseTargetY,integrationX=(Math.abs(releaseVelocityX)<.5&&Math.abs(targetDeltaX)<.01)||(Math.sign(targetDeltaX)===Math.sign(releaseVelocityX)&&Math.abs(targetDeltaX)<=Math.abs(releaseVelocityX)*elapsed/1000+.25),integrationY=(Math.abs(releaseVelocityY)<.5&&Math.abs(targetDeltaY)<.01)||(Math.sign(targetDeltaY)===Math.sign(releaseVelocityY)&&Math.abs(targetDeltaY)<=Math.abs(releaseVelocityY)*elapsed/1000+.25);coast={raw:currentRaw,validation:validateState(currentRaw),elapsed,expectedVelocityX,expectedVelocityY,targetDeltaX,targetDeltaY,integrationX,integrationY,velocityErrorX:hitX&&Number(currentRaw.drag.velocityX)===0?0:Math.abs(Number(currentRaw.drag.velocityX)-expectedVelocityX),velocityErrorY:hitY&&Number(currentRaw.drag.velocityY)===0?0:Math.abs(Number(currentRaw.drag.velocityY)-expectedVelocityY)}}
      const cancelId=81,cancelRect=terminalTitlebar.getBoundingClientRect(),cancelX=cancelRect.left+cancelRect.width/2,cancelY=cancelRect.top+cancelRect.height/2;terminalTitlebar.dispatchEvent(new PointerEvent('pointerdown',{bubbles:true,cancelable:true,pointerId:cancelId,pointerType:'mouse',isPrimary:true,button:0,buttons:1,clientX:cancelX,clientY:cancelY}));terminalTitlebar.dispatchEvent(new PointerEvent('pointermove',{bubbles:true,pointerId:cancelId,pointerType:'mouse',isPrimary:true,button:0,buttons:1,clientX:cancelX+24,clientY:cancelY+12}));terminalTitlebar.dispatchEvent(new PointerEvent('pointercancel',{bubbles:true,cancelable:true,pointerId:cancelId,pointerType:'mouse',isPrimary:true,button:0,buttons:0,clientX:cancelX+24,clientY:cancelY+12}));currentRaw=inspect();const cancelled={raw:currentRaw,validation:validateState(currentRaw),nativeCapture:terminalTitlebar.hasPointerCapture?terminalTitlebar.hasPointerCapture(cancelId):false};
      const keyboardBefore=currentRaw;terminalTitlebar.focus();const expectedLeft=clamp(Number(currentRaw.drag.targetX)-16,0,Number(currentRaw.drag.maxX));terminalTitlebar.dispatchEvent(new KeyboardEvent('keydown',{bubbles:true,cancelable:true,key:'ArrowLeft'}));currentRaw=inspect();const keyboardLeft={raw:currentRaw,validation:validateState(currentRaw),expectedTargetX:expectedLeft};const expectedDown=clamp(Number(currentRaw.drag.targetY)+48,0,Number(currentRaw.drag.maxY));terminalTitlebar.dispatchEvent(new KeyboardEvent('keydown',{bubbles:true,cancelable:true,key:'ArrowDown',shiftKey:true}));currentRaw=inspect();const keyboardDown={raw:currentRaw,validation:validateState(currentRaw),expectedTargetY:expectedDown,focused:document.activeElement===terminalTitlebar};
      dragFlow={before,down,mismatch,secondary,clamped,lerpStart,lerpMid,released,coast,cancelled,keyboard:{before:keyboardBefore,left:keyboardLeft,down:keyboardDown}};
    }
    root.style.transform='translateY(1000px)';await poll(function(){const raw=inspect();return raw&&raw.lifecycle.visible===false&&raw.lifecycle.running===false},1000);currentRaw=inspect();const hidden={raw:currentRaw,validation:validateState(currentRaw),key:freezeKey(currentRaw)};await wait(650);currentRaw=inspect();const hiddenStable={raw:currentRaw,validation:validateState(currentRaw),key:freezeKey(currentRaw)};root.style.transform='';await poll(function(){const raw=inspect();return raw&&raw.lifecycle.visible===true&&(terminalReduced||raw.lifecycle.running===true)},1000);currentRaw=inspect();const resumed={raw:currentRaw,validation:validateState(currentRaw)};const visibility={hidden,hiddenStable,resumed};
    const originalStageWidth=stage.style.width,resizeBefore={raw:currentRaw,validation:validateState(currentRaw),geometry:geometry()};stage.style.width=Math.max(280,stageWidth-36)+'px';await poll(function(){const raw=inspect(),box=geometry();return Math.abs(root.getBoundingClientRect().width-stageWidth)>=30&&Number(raw.counters.resizeEvents)>Number(resizeBefore.raw.counters.resizeEvents)&&Math.abs(box.maxX-Number(raw.drag.maxX))<=.51&&Math.abs(box.maxY-Number(raw.drag.maxY))<=.51},1000);currentRaw=inspect();const resizeNarrow={raw:currentRaw,validation:validateState(currentRaw),geometry:geometry()};stage.style.width=originalStageWidth;await poll(function(){const raw=inspect(),box=geometry();return Math.abs(root.getBoundingClientRect().width-stageWidth)<.1&&Number(raw.counters.resizeEvents)>Number(resizeNarrow.raw.counters.resizeEvents)&&Math.abs(box.maxX-Number(raw.drag.maxX))<=.51&&Math.abs(box.maxY-Number(raw.drag.maxY))<=.51},1000);currentRaw=inspect();const resizeRestored={raw:currentRaw,validation:validateState(currentRaw),geometry:geometry()};const resize={before:resizeBefore,narrow:resizeNarrow,restored:resizeRestored};
    const resetBefore=currentRaw;terminalTitlebar.focus();terminalTitlebar.dispatchEvent(new KeyboardEvent('keydown',{bubbles:true,cancelable:true,key:'Escape'}));currentRaw=inspect();const reset={before:resetBefore,raw:currentRaw,validation:validateState(currentRaw),key:freezeKey(currentRaw),cursor:cursorSample(),paint:paintSample(),focused:document.activeElement===terminalTitlebar};let loop=null,reducedStable=null;
    const phaseEvent=function(raw){return{phase:raw.state.phase,phaseStart:Number(raw.state.phaseStart),activeTime:Number(raw.state.activeTime),commandIndex:Number(raw.state.commandIndex),cycle:Number(raw.state.cycle),pendingClear:raw.state.pendingClear===true||raw.state.pendingClear==='true',typedText:raw.state.typedText,domTyped:terminalTyped&&terminalTyped.textContent,prompt:terminalPrompt&&terminalPrompt.textContent,currentText:terminalCurrent&&terminalCurrent.textContent,typingDelays:(raw.state.typingDelays||[]).slice(),outputOffsets:(raw.state.outputOffsets||[]).slice(),outputVisible:visibleOutputCount(raw.state.outputVisible),historyCount:(raw.history||[]).length,historyText:(raw.history||[]).map(function(entry){return entry.text}).join('\n'),scrollTop:Number(raw.data.scrollTop),scrollHeight:Number(raw.data.scrollHeight),clientHeight:Number(raw.data.clientHeight),spinnerIndex:Number(raw.state.spinnerIndex),spinnerVisited:(raw.state.spinnerVisited||[]).slice(),validation:validateState(raw)}};
    const validateTrace=function(events){let timingErrors=0,validationErrors=0;for(let index=0;index<events.length;index++){const event=events[index];if(!event.validation.ok)validationErrors++;const next=events[index+1];if(!next)continue;let expected=null;if(event.phase==='waiting'&&next.phase==='typing')expected=900;else if(event.phase==='typing'&&(next.phase==='output'||next.phase==='spinner'||(next.phase==='waiting'&&next.cycle>event.cycle)))expected=event.typingDelays.reduce(function(total,value){return total+value},0);else if(event.phase==='spinner'&&next.phase==='output')expected=2000;else if(event.phase==='output'&&next.phase==='waiting')expected=300;if(expected!==null&&!near(next.phaseStart-event.phaseStart,expected,.001))timingErrors++}const order=events.map(function(event){return event.phase}).join(','),expectedOrder='waiting,typing,output,waiting,typing,output,waiting,typing,spinner,output,waiting,typing,output,waiting,typing,output,waiting,typing,waiting';return{ok:!timingErrors&&!validationErrors&&order===expectedOrder,timingErrors,validationErrors,order,expectedOrder}};
    if(terminalReduced){const stableBefore=currentRaw,key=freezeKey(stableBefore);await wait(1200);currentRaw=inspect();reducedStable={before:stableBefore,key,after:currentRaw,afterKey:freezeKey(currentRaw),validation:validateState(currentRaw),cursor:cursorSample(),paint:paintSample()}}else{
      const events=[],outputMids=[],spinnerObserved=new Set(),spinnerTexts={},outputSeen=new Set(),startedLoops=counter(currentRaw,'loops'),startedClears=counter(currentRaw,'clearCommands'),wallStart=performance.now();let signature='',waitingCursor=null,busyCursor=null;
      while(performance.now()-wallStart<28000&&counter(currentRaw,'clearCommands')<=startedClears){currentRaw=inspect();const nextSignature=[currentRaw.state.cycle,currentRaw.state.commandIndex,currentRaw.state.pendingClear,currentRaw.state.phase,currentRaw.state.phaseStart].join('|');if(nextSignature!==signature){signature=nextSignature;events.push(phaseEvent(currentRaw))}if(currentRaw.state.phase==='spinner'){const frame=Number(currentRaw.state.spinnerIndex),entry=currentRaw.history.find(function(item){return item.kind==='spinner'});spinnerObserved.add(frame);spinnerTexts[frame]=entry&&entry.text}if(currentRaw.state.phase==='waiting'&&!waitingCursor)waitingCursor=cursorSample();if(currentRaw.state.phase!=='waiting'&&!busyCursor)busyCursor=cursorSample();if(currentRaw.state.phase==='output'){const outputKey=currentRaw.state.cycle+'|'+currentRaw.state.commandIndex+'|'+currentRaw.state.phaseStart,elapsed=Number(currentRaw.state.activeTime)-Number(currentRaw.state.phaseStart);if(!outputSeen.has(outputKey)&&elapsed>=125&&elapsed<=225){outputSeen.add(outputKey);outputMids.push({event:phaseEvent(currentRaw),cursor:cursorSample(),paint:paintSample()})}}await wait(12)}
      currentRaw=inspect();const finalEvent=phaseEvent(currentRaw),traceValidation=validateTrace(events);loop={events,traceValidation,outputMids,spinnerObserved:[...spinnerObserved].sort(function(a,b){return a-b}),spinnerTexts,waitingCursor,busyCursor,startedLoops,startedClears,final:{raw:currentRaw,validation:validateState(currentRaw),event:finalEvent,cursor:cursorSample(),paint:paintSample(),geometry:geometry()}};
    }
    const disposable=document.createElement('div');disposable.style.cssText='position:fixed;left:-5000px;top:0;width:'+stageWidth+'px;height:320px';disposable.innerHTML=data.html;document.body.appendChild(disposable);const cloneRoot=disposable.querySelector('.'+data.rootClass);new Function('root','stage',data.js)(cloneRoot,disposable);await wait(90);const cloneBefore=cloneRoot.__terminalWindowInspect(),cloneSchedule=JSON.stringify(cloneBefore.schedules.currentCycle),mainSchedule=JSON.stringify(reset.raw.schedules.currentCycle),cloneTitlebar=cloneRoot.querySelector('.d-raster-terminal-window-titlebar');disposable.remove();await poll(function(){return cloneRoot.__terminalWindowInspect().lifecycle.cleaned===true},800);const cloneAfter=cloneRoot.__terminalWindowInspect(),cloneKey=freezeKey(cloneAfter);if(cloneTitlebar)cloneTitlebar.dispatchEvent(new PointerEvent('pointerdown',{bubbles:true,pointerId:99,pointerType:'mouse',isPrimary:true,button:0,buttons:1,clientX:0,clientY:0}));await wait(120);const cloneStable=cloneRoot.__terminalWindowInspect(),cleanup={deterministic:cloneSchedule===mainSchedule,before:{cleaned:cloneBefore.lifecycle.cleaned,running:cloneBefore.lifecycle.running},after:{cleaned:cloneAfter.lifecycle.cleaned,running:cloneAfter.lifecycle.running,frameId:cloneAfter.lifecycle.frameId,dragging:cloneAfter.drag.dragging,captured:cloneAfter.drag.captured},key:cloneKey,stableKey:freezeKey(cloneStable),detached:!cloneRoot.isConnected};
    terminalWindow={metadata:initial.raw&&initial.raw.config,fixtures:{commands:fixtureCommands,spinner:fixtureSpinner,checksum:textChecksum(JSON.stringify(fixtureCommands))},structure,initial,tabFlow,dragFlow,visibility,resize,reset,loop,reducedStable,cleanup,reduced:root.dataset.reduced,final:{raw:inspect(),validation:validateState(inspect()),geometry:geometry(),paint:paintSample(),scrollWidth:root.scrollWidth,clientWidth:root.clientWidth,scrollHeight:root.scrollHeight,clientHeight:root.clientHeight}};
  }
  let dotMatrixShapes=null;
  if(root.classList.contains('d-raster-dot-matrix-shapes')){
    const dotReduced=root.dataset.reduced==='true',dotStage=root.querySelector('.d-raster-dot-matrix-shapes-stage'),dotCanvas=root.querySelector('.d-raster-dot-matrix-shapes-canvas'),dotContext=dotCanvas.getContext('2d'),dotControls=root.querySelector('.d-raster-dot-matrix-shapes-controls'),dotChips=[...root.querySelectorAll('.d-raster-dot-matrix-shapes-chip')],dotStatus=root.querySelector('.d-raster-dot-matrix-shapes-status');
    const wait=function(ms){return new Promise(function(resolve){setTimeout(resolve,ms)})},poll=async function(test,timeout){const started=performance.now();while(performance.now()-started<(timeout||1200)){if(test())return true;await wait(10)}return test()},near=function(actual,expected,tolerance){return Math.abs(Number(actual)-Number(expected))<=(tolerance||.00001)},clamp=function(value,min,max){return Math.max(min,Math.min(max,value))},inspect=function(){return typeof root.__dotMatrixShapesInspect==='function'?root.__dotMatrixShapesInspect():null};
    const expectedMessage='INTRX\u25cfDOT\u25cfMATRIX',expectedShapes=['circle','square','diamond','cross'],expectedGlyphs={
      I:['11111','00100','00100','00100','00100','00100','11111'],
      N:['10001','11001','11001','10101','10011','10011','10001'],
      T:['11111','00100','00100','00100','00100','00100','00100'],
      R:['11110','10001','10001','11110','10100','10010','10001'],
      X:['10001','10001','01010','00100','01010','10001','10001'],
      '\u25cf':['00100','01110','11111','11111','11111','01110','00100'],
      D:['11110','10001','10001','10001','10001','10001','11110'],
      O:['01110','10001','10001','10001','10001','10001','01110'],
      M:['10001','11011','10101','10101','10001','10001','10001'],
      A:['01110','10001','10001','11111','10001','10001','10001']
    };
    const checksumText=function(value){let hash=2166136261;for(const character of String(value))hash=Math.imul(hash^character.charCodeAt(0),16777619)>>>0;return hash.toString(16).padStart(8,'0')};
    const buildColumns=function(){const built=[];for(const character of expectedMessage){const glyph=expectedGlyphs[character];for(let x=0;x<5;x++){const column=[];for(let y=0;y<7;y++)column.push(glyph[y][x]==='1'?1:0);built.push(column)}built.push([0,0,0,0,0,0,0])}for(let gap=0;gap<8;gap++)built.push([0,0,0,0,0,0,0]);return built},expectedColumns=buildColumns();
    const cubic=function(t,a,b){const inverse=1-t;return 3*inverse*inverse*t*a+3*inverse*t*t*b+t*t*t},easeOutSoft=function(value){const x=clamp(value,0,1);let low=0,high=1;for(let index=0;index<36;index++){const middle=(low+high)/2;if(cubic(middle,.22,.36)<x)low=middle;else high=middle}return cubic((low+high)/2,1,1)};
    const expectedMorphSample=function(raw,column){if(!raw.morph.morphing)return{column,scale:1,shape:raw.state.displayShape,phase:'settled'};const local=Number(raw.state.activeTime)-Number(raw.morph.start)-column*6;if(local<=0)return{column,scale:1,shape:raw.morph.from,phase:'delay'};if(local<120)return{column,scale:1-local/120,shape:raw.morph.from,phase:'out'};if(local<280)return{column,scale:easeOutSoft((local-120)/160),shape:raw.morph.to,phase:'in'};return{column,scale:1,shape:raw.morph.to,phase:'arrived'}};
    const expectedLitCount=function(raw){let count=0;for(let column=0;column<56;column++){const base=(Number(raw.state.scrollColumn)+column)%expectedColumns.length,next=(base+1)%expectedColumns.length;for(let row=0;row<14;row++){const glyphRow=row-3;if(glyphRow<0||glyphRow>=7)continue;const level=expectedColumns[base][glyphRow]*(1-Number(raw.state.scrollPhase))+expectedColumns[next][glyphRow]*Number(raw.state.scrollPhase);if(level>=.5)count++}}return count};
    const validate=function(raw){
      if(!raw||!raw.config||!raw.fixtures||!raw.state||!raw.morph||!raw.pointer||!raw.layout||!raw.counters||!raw.lifecycle||!raw.checksums||!raw.data)return{ok:false};
      const config=raw.config,configOk=[config.columns,config.rows,config.pitch,config.message,config.speed,config.glyphWidth,config.glyphHeight,config.glyphGap,config.rowOffset,config.marqueeGap,config.morphOut,config.morphIn,config.stagger,config.morphTotal,config.easing,config.maxDelta].join('|')==='56|14|10|'+expectedMessage+'|40|5|7|1|3|8|120|160|6|610|ease-out-soft|50'&&JSON.stringify(config.easingCurve)===JSON.stringify([.22,1,.36,1])&&JSON.stringify(config.shapes)===JSON.stringify(expectedShapes);
      let glyphErrors=0,columnErrors=0;for(const key of Object.keys(expectedGlyphs)){if(JSON.stringify(raw.fixtures.glyphs[key])!==JSON.stringify(expectedGlyphs[key]))glyphErrors++}if(Object.keys(raw.fixtures.glyphs).length!==Object.keys(expectedGlyphs).length)glyphErrors++;if(raw.fixtures.messageColumns.length!==expectedColumns.length)columnErrors++;else for(let index=0;index<expectedColumns.length;index++)if(JSON.stringify(raw.fixtures.messageColumns[index])!==JSON.stringify(expectedColumns[index]))columnErrors++;
      const fixtureOk=!glyphErrors&&!columnErrors&&Number(raw.fixtures.trackColumns)===104&&Number(raw.fixtures.trackWidth)===1040;
      const active=Number(raw.state.activeTime),distance=Number(raw.state.scrollDistance),expectedDistance=active*.04,expectedX=((distance%1040)+1040)%1040,expectedColumn=Math.floor(expectedX/10)%104,expectedPhase=(expectedX%10)/10,scrollOk=near(distance,expectedDistance,.00001)&&near(raw.state.scrollX,expectedX,.00001)&&Number(raw.state.scrollColumn)===expectedColumn&&near(raw.state.scrollPhase,expectedPhase,.00001)&&Number(raw.state.litCount)===expectedLitCount(raw);
      let morphErrors=0;const sampleColumns=[0,27,55];if(raw.morph.samples.length!==3)morphErrors++;else raw.morph.samples.forEach(function(sample,index){const expected=expectedMorphSample(raw,sampleColumns[index]);if(Number(sample.column)!==expected.column||sample.phase!==expected.phase||sample.shape!==expected.shape||!near(sample.scale,expected.scale,.00002))morphErrors++});const expectedElapsed=raw.morph.morphing?Math.max(0,active-Number(raw.morph.start)):0,expectedProgress=raw.morph.morphing?clamp(expectedElapsed/610,0,1):1;if(!near(raw.morph.elapsed,expectedElapsed,.00001)||!near(raw.morph.progress,expectedProgress,.00001))morphErrors++;
      const shapeOk=Number(raw.state.shapeIndex)>=0&&Number(raw.state.shapeIndex)<4&&raw.state.shapeName===expectedShapes[Number(raw.state.shapeIndex)]&&expectedShapes.includes(raw.state.displayShape)&&expectedShapes.includes(raw.morph.from)&&expectedShapes.includes(raw.morph.to);
      const pointerOk=raw.pointer.inside?(Number(raw.pointer.column)>=0&&Number(raw.pointer.column)<56&&Number(raw.pointer.lastX)>=0&&Number(raw.pointer.lastX)<=560&&Number(raw.pointer.lastY)>=0&&Number(raw.pointer.lastY)<=140):(Number(raw.pointer.column)===-1&&Number(raw.pointer.lastX)===-1&&Number(raw.pointer.lastY)===-1);
      const layoutOk=Number(raw.layout.logicalWidth)===560&&Number(raw.layout.logicalHeight)===140&&Number(raw.layout.cssWidth)>0&&Number(raw.layout.cssWidth)<=560.1&&Number(raw.layout.cssHeight)>0&&near(Number(raw.layout.cssWidth)/Number(raw.layout.cssHeight),4,.015)&&near(raw.layout.scaleX,Number(raw.layout.cssWidth)/560,.00001)&&near(raw.layout.scaleY,Number(raw.layout.cssHeight)/140,.00001)&&near(raw.layout.scaleX,raw.layout.scaleY,.001);
      const counterValues=Object.values(raw.counters).map(Number),countersOk=counterValues.every(function(value){return Number.isInteger(value)&&value>=0}),lifecycleOk=typeof raw.lifecycle.visible==='boolean'&&typeof raw.lifecycle.documentVisible==='boolean'&&typeof raw.lifecycle.running==='boolean'&&raw.lifecycle.reduced===dotReduced&&typeof raw.lifecycle.cleaned==='boolean'&&Number.isInteger(Number(raw.lifecycle.frameId));
      const checksumOk=raw.checksums.messageChecksum===checksumText(expectedMessage)&&raw.checksums.glyphChecksum===checksumText(JSON.stringify(expectedGlyphs))&&raw.checksums.columnChecksum===checksumText(JSON.stringify(expectedColumns))&&raw.checksums.shapeChecksum===checksumText(expectedShapes.join('|'));
      const data=raw.data,dataOk=data.columns==='56'&&data.rows==='14'&&data.pitch==='10'&&data.message===expectedMessage&&data.speed==='40'&&data.trackColumns==='104'&&data.trackWidth==='1040'&&data.easing==='ease-out-soft'&&data.easingCurve==='0.22,1,0.36,1'&&data.morphOut==='120'&&data.morphIn==='160'&&data.stagger==='6'&&data.morphTotal==='610'&&data.reduced===String(dotReduced)&&near(data.activeTime,active,.00051)&&near(data.scrollDistance,distance,.00051)&&Number(data.scrollColumn)===Number(raw.state.scrollColumn)&&near(data.scrollPhase,raw.state.scrollPhase,.000001)&&Number(data.litCount)===Number(raw.state.litCount)&&Number(data.shapeIndex)===Number(raw.state.shapeIndex)&&data.shapeName===raw.state.shapeName&&data.displayShape===raw.state.displayShape&&data.morphing===String(raw.morph.morphing)&&Number(data.pointerColumn)===Number(raw.pointer.column)&&data.pointerInside===String(raw.pointer.inside)&&data.messageChecksum===raw.checksums.messageChecksum&&data.glyphChecksum===raw.checksums.glyphChecksum&&data.columnChecksum===raw.checksums.columnChecksum;
      const frozen=Object.isFrozen(raw)&&Object.isFrozen(raw.config)&&Object.isFrozen(raw.config.easingCurve)&&Object.isFrozen(raw.config.shapes)&&Object.isFrozen(raw.fixtures)&&Object.isFrozen(raw.fixtures.glyphs)&&Object.isFrozen(raw.fixtures.glyphs.I)&&Object.isFrozen(raw.fixtures.messageColumns)&&Object.isFrozen(raw.fixtures.messageColumns[0])&&Object.isFrozen(raw.state)&&Object.isFrozen(raw.morph)&&Object.isFrozen(raw.morph.samples)&&Object.isFrozen(raw.morph.samples[0])&&Object.isFrozen(raw.pointer)&&Object.isFrozen(raw.layout)&&Object.isFrozen(raw.counters)&&Object.isFrozen(raw.lifecycle)&&Object.isFrozen(raw.checksums)&&Object.isFrozen(raw.data);
      return{ok:configOk&&fixtureOk&&scrollOk&&!morphErrors&&shapeOk&&pointerOk&&layoutOk&&countersOk&&lifecycleOk&&checksumOk&&dataOk&&frozen,configOk,fixtureOk,glyphErrors,columnErrors,scrollOk,morphErrors,shapeOk,pointerOk,layoutOk,countersOk,lifecycleOk,checksumOk,dataOk,frozen,expectedDistance,expectedX,expectedColumn,expectedPhase,expectedLitCount:expectedLitCount(raw)};
    };
    const rectOf=function(node){if(!node)return null;const box=node.getBoundingClientRect();return{left:box.left,top:box.top,right:box.right,bottom:box.bottom,width:box.width,height:box.height}},inside=function(inner,outer){return Boolean(inner&&outer&&inner.left>=outer.left-.5&&inner.right<=outer.right+.5&&inner.top>=outer.top-.5&&inner.bottom<=outer.bottom+.5)};
    const geometry=function(){const rootRect=rectOf(root),stageRect=rectOf(dotStage),canvasRect=rectOf(dotCanvas),controlsRect=rectOf(dotControls);return{root:rootRect,stage:stageRect,canvas:canvasRect,controls:controlsRect,stageInside:inside(stageRect,rootRect),canvasInside:inside(canvasRect,stageRect),controlsInside:inside(controlsRect,rootRect),stageInset:stageRect.left-rootRect.left,controlInset:controlsRect.left-rootRect.left,aspect:canvasRect.width/canvasRect.height,scrollWidth:root.scrollWidth,clientWidth:root.clientWidth,scrollHeight:root.scrollHeight,clientHeight:root.clientHeight}};
    const hashBytes=function(values){let hash=2166136261;for(let index=0;index<values.length;index++){hash^=values[index]+index;hash=Math.imul(hash,16777619)}return(hash>>>0).toString(16).toUpperCase().padStart(8,'0')};
    const paintSample=function(raw){const image=dotContext.getImageData(0,0,dotCanvas.width,dotCanvas.height),values=image.data,centers=[];let accentCenters=0,darkCenters=0,litCenters=0,brightestScore=-1,brightestColumn=0,brightestRow=0;for(let column=0;column<56;column++)for(let row=0;row<14;row++){const offset=((row*10+5)*560+(column*10+5))*4,r=values[offset],g=values[offset+1],b=values[offset+2],score=r+g+b;centers.push(r,g,b,values[offset+3]);if(score>brightestScore){brightestScore=score;brightestColumn=column;brightestRow=row}if(Math.abs(r-167)<=1&&Math.abs(g-139)<=1&&Math.abs(b-250)<=1)accentCenters++;if(r<35&&g<35&&b<38)darkCenters++;if(r>100&&g>100&&b>100)litCenters++}const shapeBytes=[];for(let y=1;y<=9;y++)for(let x=1;x<=9;x++){const offset=(y*560+x)*4,delta=Math.max(Math.abs(values[offset]-10),Math.abs(values[offset+1]-10),Math.abs(values[offset+2]-11));shapeBytes.push(delta>=2?1:0)}const detailDeltas=[];let maximumDelta=1;for(let y=-4;y<=4;y++)for(let x=-4;x<=4;x++){const offset=(((brightestRow*10+5+y)*560)+(brightestColumn*10+5+x))*4,delta=Math.max(0,values[offset]-10)+Math.max(0,values[offset+1]-10)+Math.max(0,values[offset+2]-11);detailDeltas.push(delta);maximumDelta=Math.max(maximumDelta,delta)}const detailBytes=detailDeltas.map(function(delta){return Math.round(delta/maximumDelta*15)});return{accentCenters,darkCenters,litCenters,centerChecksum:hashBytes(centers),shapeSignature:hashBytes(shapeBytes),shapeDetailSignature:hashBytes(detailBytes),expectedAccent:raw.pointer.inside?14:0,expectedLit:raw.state.litCount}};
    const freezeKey=function(raw){return[raw.state.activeTime,raw.state.scrollDistance,raw.state.scrollX,raw.state.scrollColumn,raw.state.scrollPhase,raw.state.shapeIndex,raw.state.displayShape,raw.morph.from,raw.morph.to,raw.morph.start,raw.morph.elapsed,raw.morph.morphing,raw.pointer.column,raw.pointer.inside,raw.counters.schedulerFrames,raw.counters.renderFrames,raw.counters.shapeSwitches,raw.counters.completedMorphs,raw.counters.pointerMoves,raw.lifecycle.running,raw.lifecycle.frameId].join('|')};
    const selected=function(){return dotChips.map(function(chip){return{shape:chip.dataset.shape,checked:chip.getAttribute('aria-checked'),tabIndex:chip.getAttribute('tabindex'),focused:document.activeElement===chip,color:getComputedStyle(chip).color,background:getComputedStyle(chip).backgroundColor,border:getComputedStyle(chip).borderColor,radius:getComputedStyle(chip).borderRadius,fontSize:getComputedStyle(chip).fontSize}})};
    const capture=function(){const raw=inspect();return{raw,validation:validate(raw),paint:paintSample(raw),selected:selected(),status:dotStatus.textContent,geometry:geometry()}};
    let currentRaw=inspect();const initial=capture(),rootRect=rectOf(root),stageRect=rectOf(dotStage),canvasRect=rectOf(dotCanvas),controlsRect=rectOf(dotControls),rootStyle=getComputedStyle(root),stageStyle=getComputedStyle(dotStage),canvasStyle=getComputedStyle(dotCanvas),headerStyle=getComputedStyle(root.querySelector('.d-raster-dot-matrix-shapes-head')),focusSelector='button,input,select,textarea,a[href],[tabindex]';
    const structure={tag:root.tagName,role:root.getAttribute('role'),rootLabel:root.getAttribute('aria-label'),headerText:root.querySelector('.d-raster-dot-matrix-shapes-label').textContent,speedText:root.querySelector('.d-raster-dot-matrix-shapes-speed').textContent,canvasCount:root.querySelectorAll('.d-raster-dot-matrix-shapes-canvas').length,canvasRole:dotCanvas.getAttribute('role'),canvasLabel:dotCanvas.getAttribute('aria-label'),canvasWidth:dotCanvas.width,canvasHeight:dotCanvas.height,canvasClientWidth:dotCanvas.clientWidth,canvasClientHeight:dotCanvas.clientHeight,controlsRole:dotControls.getAttribute('role'),controlsLabel:dotControls.getAttribute('aria-label'),chipCount:dotChips.length,chipTags:dotChips.map(function(chip){return chip.tagName}),chipTypes:dotChips.map(function(chip){return chip.type}),chipRoles:dotChips.map(function(chip){return chip.getAttribute('role')}),chipShapes:dotChips.map(function(chip){return chip.dataset.shape}),chipTexts:dotChips.map(function(chip){return chip.textContent}),statusLive:dotStatus.getAttribute('aria-live'),statusAtomic:dotStatus.getAttribute('aria-atomic'),focusables:(root.matches(focusSelector)?1:0)+root.querySelectorAll(focusSelector).length,rootBackground:rootStyle.backgroundColor,rootColor:rootStyle.color,containerType:rootStyle.containerType,stageBorder:stageStyle.borderWidth,stageRadius:stageStyle.borderRadius,stageTouchAction:stageStyle.touchAction,canvasCursor:canvasStyle.cursor,headerFont:headerStyle.fontSize,geometry:geometry(),initialSelected:selected()};
    const scrollBefore=currentRaw,scrollBeforeKey=freezeKey(currentRaw);await wait(dotReduced?620:220);currentRaw=inspect();const scrollAfter=currentRaw,scroll={before:scrollBefore,after:scrollAfter,beforeKey:scrollBeforeKey,afterKey:freezeKey(scrollAfter),validation:validate(scrollAfter),deltaTime:Number(scrollAfter.state.activeTime)-Number(scrollBefore.state.activeTime),deltaDistance:Number(scrollAfter.state.scrollDistance)-Number(scrollBefore.state.scrollDistance)};
    const invalidBefore=currentRaw;dotCanvas.dispatchEvent(new PointerEvent('pointerenter',{bubbles:true,pointerId:90,pointerType:'mouse',isPrimary:false,button:0,buttons:0,clientX:canvasRect.left+20,clientY:canvasRect.top+20}));currentRaw=inspect();const invalidEnter=currentRaw;
    const point=function(column,row){const box=dotCanvas.getBoundingClientRect();return{clientX:box.left+(column*10+5)/560*box.width,clientY:box.top+(row*10+5)/140*box.height}},pointA=point(18,6);dotCanvas.dispatchEvent(new PointerEvent('pointerenter',{bubbles:true,pointerId:1,pointerType:'mouse',isPrimary:true,button:0,buttons:0,clientX:pointA.clientX,clientY:pointA.clientY}));currentRaw=inspect();const entered=capture();dotCanvas.dispatchEvent(new PointerEvent('pointermove',{bubbles:true,pointerId:91,pointerType:'mouse',isPrimary:false,button:0,buttons:0,clientX:pointA.clientX+20,clientY:pointA.clientY}));const invalidMove=inspect();dotCanvas.dispatchEvent(new PointerEvent('pointerleave',{bubbles:true,pointerId:92,pointerType:'mouse',isPrimary:false,button:0,buttons:0,clientX:pointA.clientX,clientY:pointA.clientY}));const invalidLeave=inspect();
    const pointB=point(33,8);dotCanvas.dispatchEvent(new PointerEvent('pointermove',{bubbles:true,pointerId:1,pointerType:'mouse',isPrimary:true,button:0,buttons:0,clientX:pointB.clientX,clientY:pointB.clientY}));currentRaw=inspect();const moved=capture();dotCanvas.dispatchEvent(new PointerEvent('pointerleave',{bubbles:true,pointerId:1,pointerType:'mouse',isPrimary:true,button:0,buttons:0,clientX:pointB.clientX,clientY:pointB.clientY}));currentRaw=inspect();const left=capture(),pointer={before:invalidBefore,invalidEnter,entered,invalidMove,invalidLeave,moved,left};
    const shapeStart=currentRaw;dotChips[1].click();currentRaw=inspect();const squareImmediate=capture();let squareEarly=null,squareTrough=null,squareStagger=null,squareTail=null;if(!dotReduced){await poll(function(){const raw=inspect();return Number(raw.morph.elapsed)>=55},500);squareEarly=capture();await poll(function(){const raw=inspect();return Number(raw.morph.elapsed)>=126},500);squareTrough=capture();await poll(function(){const raw=inspect();return Number(raw.morph.elapsed)>=195},500);squareStagger=capture();await poll(function(){const raw=inspect();return Number(raw.morph.elapsed)>=455},700);squareTail=capture();await poll(function(){return inspect().morph.morphing===false},900)}currentRaw=inspect();const squareComplete=capture();
    dotChips[1].focus();dotChips[1].dispatchEvent(new KeyboardEvent('keydown',{bubbles:true,cancelable:true,key:'ArrowRight'}));currentRaw=inspect();const diamondImmediate=capture();if(!dotReduced)await poll(function(){return inspect().morph.morphing===false},900);const diamondComplete=capture();
    dotChips[2].dispatchEvent(new KeyboardEvent('keydown',{bubbles:true,cancelable:true,key:'End'}));currentRaw=inspect();const crossImmediate=capture();if(!dotReduced)await poll(function(){return inspect().morph.morphing===false},900);const crossComplete=capture();
    dotChips[3].dispatchEvent(new KeyboardEvent('keydown',{bubbles:true,cancelable:true,key:'Home'}));currentRaw=inspect();const circleImmediate=capture();if(!dotReduced)await poll(function(){return inspect().morph.morphing===false},900);currentRaw=inspect();const circleComplete=capture(),shapes={start:shapeStart,square:{immediate:squareImmediate,early:squareEarly,trough:squareTrough,stagger:squareStagger,tail:squareTail,complete:squareComplete},diamond:{immediate:diamondImmediate,complete:diamondComplete},cross:{immediate:crossImmediate,complete:crossComplete},circle:{immediate:circleImmediate,complete:circleComplete}};
    const retargetCapture=function(){const raw=inspect();return{raw,samples:raw.morph.samples.map(function(sample){return{column:Number(sample.column),scale:Number(sample.scale),shape:sample.shape,phase:sample.phase}}),selected:selected(),status:dotStatus.textContent,paint:paintSample(raw)}},rapidStart=inspect();dotChips[1].click();const rapidSquareImmediate=retargetCapture();if(!dotReduced)await poll(function(){const raw=inspect();return Number(raw.morph.elapsed)>=195},600);const beforeRetarget=retargetCapture();dotChips[3].click();const afterRetarget=retargetCapture(),continuity=beforeRetarget.samples.map(function(before,index){const after=afterRetarget.samples[index];return{column:before.column,beforeScale:before.scale,afterScale:after.scale,scaleDelta:Math.abs(after.scale-before.scale),beforeShape:before.shape,afterShape:after.shape,beforePhase:before.phase,afterPhase:after.phase,sameScale:Math.abs(after.scale-before.scale)<=.000000001,sameShape:after.shape===before.shape}});if(!dotReduced)await poll(function(){return inspect().morph.morphing===false},900);const rapidFinal=capture(),rapidRetarget={start:rapidStart,squareImmediate:rapidSquareImmediate,before:beforeRetarget,after:afterRetarget,continuity,final:rapidFinal};
    const ownVisibility=Object.getOwnPropertyDescriptor(document,'visibilityState');let fakeVisibility='visible',visibilityPatched=false,documentVisibility=null;try{Object.defineProperty(document,'visibilityState',{configurable:true,get:function(){return fakeVisibility}});visibilityPatched=true;const before=inspect();fakeVisibility='hidden';document.dispatchEvent(new Event('visibilitychange'));await poll(function(){const raw=inspect();return raw.lifecycle.documentVisible===false&&raw.lifecycle.running===false},700);const hidden=inspect(),hiddenKey=freezeKey(hidden);await wait(420);const stable=inspect(),stableKey=freezeKey(stable);fakeVisibility='visible';document.dispatchEvent(new Event('visibilitychange'));await poll(function(){const raw=inspect();return raw.lifecycle.documentVisible===true&&(dotReduced||raw.lifecycle.running===true)},700);const resumed=inspect();documentVisibility={patched:true,before,hidden,hiddenKey,stable,stableKey,resumed}}catch(error){documentVisibility={patched:false,error:String(error)}}finally{if(visibilityPatched){if(ownVisibility)Object.defineProperty(document,'visibilityState',ownVisibility);else delete document.visibilityState;document.dispatchEvent(new Event('visibilitychange'))}}
    root.style.transform='translateY(1000px)';await poll(function(){const raw=inspect();return raw.lifecycle.visible===false&&raw.lifecycle.running===false},1000);currentRaw=inspect();const intersectionHidden=currentRaw,intersectionHiddenKey=freezeKey(currentRaw);await wait(420);currentRaw=inspect();const intersectionStable=currentRaw,intersectionStableKey=freezeKey(currentRaw);root.style.transform='';await poll(function(){const raw=inspect();return raw.lifecycle.visible===true&&(dotReduced||raw.lifecycle.running===true)},1000);currentRaw=inspect();const intersectionResumed=currentRaw,intersection={hidden:intersectionHidden,hiddenKey:intersectionHiddenKey,stable:intersectionStable,stableKey:intersectionStableKey,resumed:intersectionResumed};
    const originalStageWidth=stage.style.width,resizeBefore=capture();stage.style.width=Math.max(280,stageWidth-40)+'px';await poll(function(){const raw=inspect(),box=geometry();return resizeBefore.geometry.root.width-box.root.width>=35&&Number(raw.counters.resizeEvents)>Number(resizeBefore.raw.counters.resizeEvents)},1000);const resizeNarrow=capture();stage.style.width=originalStageWidth;await poll(function(){const raw=inspect(),box=geometry();return Math.abs(box.root.width-stageWidth)<.1&&Number(raw.counters.resizeEvents)>Number(resizeNarrow.raw.counters.resizeEvents)},1000);const resizeRestored=capture(),resize={before:resizeBefore,narrow:resizeNarrow,restored:resizeRestored};
    dotChips[0].focus();const resetBefore=inspect();root.__dotMatrixShapesReset();currentRaw=inspect();const resetImmediate=capture();await wait(dotReduced?520:180);currentRaw=inspect();const resetAfter=capture(),reset={before:resetBefore,immediate:resetImmediate,after:resetAfter,focused:document.activeElement===dotChips[0]};
    const disposable=document.createElement('div');disposable.style.cssText='position:fixed;left:-5000px;top:0;width:'+stageWidth+'px;height:320px';disposable.innerHTML=data.html;document.body.appendChild(disposable);const cloneRoot=disposable.querySelector('.'+data.rootClass);new Function('root','stage',data.js)(cloneRoot,disposable);await wait(100);const cloneBefore=cloneRoot.__dotMatrixShapesInspect(),cloneFixture=JSON.stringify({config:cloneBefore.config,fixtures:cloneBefore.fixtures,checksums:cloneBefore.checksums});disposable.remove();await poll(function(){return cloneRoot.__dotMatrixShapesInspect().lifecycle.cleaned===true},800);const cloneAfter=cloneRoot.__dotMatrixShapesInspect(),cloneKey=freezeKey(cloneAfter),cloneChip=cloneRoot.querySelector('.d-raster-dot-matrix-shapes-chip[data-shape="square"]');if(cloneChip)cloneChip.click();await wait(140);const cloneStable=cloneRoot.__dotMatrixShapesInspect(),cleanup={deterministic:cloneFixture===JSON.stringify({config:initial.raw.config,fixtures:initial.raw.fixtures,checksums:initial.raw.checksums}),before:{cleaned:cloneBefore.lifecycle.cleaned,running:cloneBefore.lifecycle.running},after:{cleaned:cloneAfter.lifecycle.cleaned,running:cloneAfter.lifecycle.running,frameId:cloneAfter.lifecycle.frameId},key:cloneKey,stableKey:freezeKey(cloneStable),detached:!cloneRoot.isConnected};
    dotMatrixShapes={metadata:initial.raw&&initial.raw.config,structure,initial,scroll,pointer,shapes,rapidRetarget,documentVisibility,intersection,resize,reset,cleanup,reduced:root.dataset.reduced,final:capture()};
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
    donut,
    fire,
    fluid,
    portrait,
    morph,
    typeExplode,
    terminalWindow,
    dotMatrixShapes,
    scrollWidth: root.scrollWidth,
    scrollHeight: root.scrollHeight,
    clientWidth: root.clientWidth,
    clientHeight: root.clientHeight,
    clip: { x: rect.left, y: rect.top, width: rect.width, height: rect.height, scale: 1 }
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
  ws.addEventListener('message', event => {
    const message = JSON.parse(event.data);
    if (message.id && pending.has(message.id)) {
      const pair = pending.get(message.id);
      pending.delete(message.id);
      return message.error ? pair.reject(new Error(message.error.message)) : pair.resolve(message.result);
    }
    if (message.method === 'Runtime.exceptionThrown') errors.push(message.params.exceptionDetails.exception && message.params.exceptionDetails.exception.description || message.params.exceptionDetails.text);
    if (message.method === 'Runtime.consoleAPICalled' && message.params.type === 'error') errors.push(message.params.args.map(arg => arg.value || arg.description || '').join(' '));
  });
  const send = (method, params = {}) => new Promise((resolve, reject) => {
    const id = ++sequence;
    pending.set(id, { resolve, reject });
    ws.send(JSON.stringify({ id, method, params }));
  });
  await send('Runtime.enable');
  await send('Page.enable');
  await send('Page.bringToFront');
  await send('Emulation.setDeviceMetricsOverride', { width: Math.max(480, width + 80), height: 420, deviceScaleFactor: 1, mobile: false });
  await send('Emulation.setEmulatedMedia', { features: [{ name: 'prefers-reduced-motion', value: reducedMotion ? 'reduce' : 'no-preference' }] });
  if (demoId === 'ascii-portrait-reveal') {
    await send('Input.dispatchMouseEvent', { type: 'mouseMoved', x: Math.max(480, width + 80) - 1, y: 419, modifiers: 0 });
  }
  const expression = '(' + render.toString() + ')(' + JSON.stringify(demo) + ',' + width + ',' + JSON.stringify(verificationMode) + ')';
  const evaluated = await send('Runtime.evaluate', { expression, awaitPromise: true, returnByValue: true });
  if (evaluated.exceptionDetails) throw new Error(evaluated.exceptionDetails.text);
  const result = evaluated.result.value;
  const jpeg = /\.jpe?g$/i.test(screenshot);
  const image = await send('Page.captureScreenshot', { format: jpeg ? 'jpeg' : 'png', quality: jpeg ? 72 : undefined, fromSurface: true, captureBeyondViewport: false, clip: result.clip });
  fs.writeFileSync(screenshot, Buffer.from(image.data, 'base64'));
  ws.close();
  if(process.env.INTRX_GATE_ONLY!=='1')console.log(JSON.stringify({ result, errors, screenshot }, null, 2));
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
  const donut=result.donut;
  const donutBounds=donut?donut.initial.silhouetteBounds.split(',').map(Number):[];
  const donutCommonFailed=!donut
    || donut.metadata.r1!=='1' || donut.metadata.r2!=='2' || donut.metadata.gridColumns!=='48' || donut.metadata.gridRows!=='24' || donut.metadata.thetaSteps!=='90' || donut.metadata.phiSteps!=='24' || donut.metadata.pointCount!=='2160'
    || donut.metadata.glyphRamp!=='.,-~:;=!*#$@' || donut.metadata.targetFps!=='30' || donut.metadata.frameInterval!=='33.333' || donut.metadata.autoA!=='0.04' || donut.metadata.autoB!=='0.02' || donut.metadata.friction!=='0.95'
    || donut.metadata.edgeRadius!=='6' || donut.metadata.accentMix!=='0.3' || donut.metadata.cameraDistance!=='5' || donut.metadata.projection!=='15,8' || donut.metadata.initialAngles!=='0.6,0.2' || donut.metadata.dragGain!=='0.008' || donut.metadata.dragClamp!=='0.22' || donut.metadata.lightDirection!=='0.22,0.66,-0.718'
    || donut.structure.sceneTag!=='DIV' || donut.structure.canvasCount!==1 || donut.structure.canvasRole!=='img' || !donut.structure.canvasLabel.startsWith('ASCII torus using ') || !donut.structure.canvasLabel.includes(String(donut.initial.occupiedCells))
    || donut.structure.rootTabIndex!=='0' || !donut.structure.rootLabel.includes('Interactive ASCII torus') || donut.structure.shortcuts!=='ArrowLeft ArrowRight ArrowUp ArrowDown Home Space' || donut.structure.focusables!==1
    || donut.structure.statusLive!=='polite' || donut.structure.statusAtomic!=='true' || donut.structure.topbars!==1 || donut.structure.footers!==1 || donut.structure.corners!==0
    || donut.structure.sceneRadius!=='10px' || donut.structure.sceneBorder!=='1px' || donut.structure.sceneBackground!=='rgb(16, 16, 18)' || donut.structure.rootBackground!=='rgb(10, 10, 11)' || donut.structure.rootColor!=='rgb(236, 236, 239)' || donut.structure.touchAction!=='none'
    || !donut.structure.overlayBackground.includes('radial-gradient') || donut.structure.overlayBackground.includes('repeating-linear-gradient') || donut.structure.labelFont!=='10px' || donut.structure.dataFont!=='12px'
    || !donut.structure.sceneInside || !donut.structure.canvasInside || Math.abs(donut.structure.sceneWidth-(result.width-20))>.1 || Math.abs(donut.structure.sceneHeight-264)>.1 || donut.structure.canvasClientWidth!==donut.structure.sceneWidth-2 || donut.structure.canvasClientHeight!==262
    || !donut.structure.canvasSized || donut.structure.dpr<1 || donut.structure.dpr>2 || donut.structure.fontSize<=0 || donut.structure.fontSize>11 || donut.structure.maxGlyphAdvance>donut.structure.cellWidth+.01 || donut.structure.colorBuckets<2 || donut.structure.colorBuckets>=donut.initial.occupiedCells
    || donut.structure.rampText!==donut.metadata.glyphRamp || donut.structure.gridText!=='048x024' || donut.structure.pixels.nonBackground<2500 || donut.structure.pixels.accent<250 || donut.structure.pixels.bright<500 || donut.structure.pixels.minInk>=donut.structure.pixels.maxInk || donut.structure.pixels.maxInk<600 || donut.structure.pixels.total!==donut.structure.canvasWidth*donut.structure.canvasHeight
    || donut.initial.initialChecksum!=='6989CBDF' || !/^[0-9A-F]{8}$/.test(donut.initial.glyphChecksum) || donut.initial.occupiedCells<100 || donut.initial.occupiedCells>220 || donut.initial.silhouetteCells<30 || donut.initial.silhouetteCells>90 || donut.initial.accentCells<donut.initial.silhouetteCells || donut.initial.accentCells>donut.initial.occupiedCells
    || donut.initial.glyphsUsed.length<8 || [...donut.initial.glyphsUsed].some(function(glyph){return !donut.metadata.glyphRamp.includes(glyph)}) || donutBounds.length!==4 || donutBounds.some(function(value){return !Number.isInteger(value)}) || donutBounds[0]<0 || donutBounds[1]<0 || donutBounds[2]>=48 || donutBounds[3]>=24 || donutBounds[0]>=donutBounds[2] || donutBounds[1]>=donutBounds[3]
    || !donut.pointer || !donut.keyboard || donut.final.scrollWidth!==donut.final.clientWidth || donut.final.scrollHeight!==donut.final.clientHeight || !donut.final.sceneInside || !donut.final.canvasInside;
  const donutMotionFailed=reducedMotion
    ? !donut || donut.reduced!=='true' || donut.initial.reduced!=='true' || donut.initial.angleA!==.6 || donut.initial.angleB!==.2 || donut.initial.velocityA!==.04 || donut.initial.velocityB!==.02 || donut.initial.renderFrames!==0 || donut.initial.manualRenders!==0 || donut.initial.rafFrames!==0 || donut.initial.simulationTime!==0 || donut.initial.running!=='false' || donut.initial.glyphChecksum!==donut.initial.initialChecksum
      || donut.motion!==null || donut.visibility!==null || !donut.reducedStable || donut.reducedStable.angleA!==donut.initial.angleA || donut.reducedStable.angleB!==donut.initial.angleB || donut.reducedStable.renderFrames!==0 || donut.reducedStable.manualRenders!==0 || donut.reducedStable.rafFrames!==0 || donut.reducedStable.simulationTime!==0 || donut.reducedStable.glyphChecksum!==donut.initial.glyphChecksum || donut.reducedStable.running!=='false'
      || donut.pointer.active.dragging!=='true' || donut.pointer.active.dragPointer!==41 || donut.pointer.active.dragMoves!==1 || Math.abs(donut.pointer.active.dragDistance-29.15)>.02 || donut.pointer.active.angleA!==.48 || donut.pointer.active.angleB!==.4 || donut.pointer.active.velocityA!==-.12 || donut.pointer.active.velocityB!==.2 || donut.pointer.active.manualRenders!==1 || donut.pointer.active.renderFrames!==0 || donut.pointer.active.rafFrames!==0 || donut.pointer.active.simulationTime!==0 || donut.pointer.active.glyphChecksum===donut.initial.glyphChecksum || !donut.pointer.focused
      || donut.pointer.released.dragging!=='false' || donut.pointer.released.dragPointer!==-1 || donut.pointer.released.running!=='false' || donut.pointer.released.source!=='pointer release' || donut.pointer.status!=='Static torus orientation updated' || donut.pointer.inertia!==null || donut.pointer.inertiaFrames!==0
      || donut.keyboard.arrow.angleA!==donut.keyboard.before.angleA || Math.abs(donut.keyboard.arrow.angleB-donut.keyboard.before.angleB-.12)>.0001 || donut.keyboard.arrow.velocityA!==.04 || donut.keyboard.arrow.velocityB!==.02 || donut.keyboard.arrow.manualRenders!==2 || donut.keyboard.arrow.renderFrames!==0 || donut.keyboard.arrow.source!=='keyboard' || donut.keyboard.arrow.glyphChecksum===donut.keyboard.before.glyphChecksum
      || Math.abs(donut.keyboard.stepped.angleA-donut.keyboard.arrow.angleA-.04)>.0001 || Math.abs(donut.keyboard.stepped.angleB-donut.keyboard.arrow.angleB-.02)>.0001 || donut.keyboard.stepped.manualRenders!==3 || donut.keyboard.stepped.renderFrames!==0 || donut.keyboard.stepped.rafFrames!==0 || donut.keyboard.stepped.simulationTime!==0 || donut.keyboard.stepped.running!=='false' || donut.keyboard.stepped.source!=='keyboard step'
      || donut.keyboard.home.angleA!==.6 || donut.keyboard.home.angleB!==.2 || donut.keyboard.home.velocityA!==.04 || donut.keyboard.home.velocityB!==.02 || donut.keyboard.home.manualRenders!==4 || donut.keyboard.home.glyphChecksum!==donut.initial.initialChecksum || !donut.keyboard.focused
      || donut.keyboard.finalStable.angleA!==donut.keyboard.home.angleA || donut.keyboard.finalStable.angleB!==donut.keyboard.home.angleB || donut.keyboard.finalStable.renderFrames!==0 || donut.keyboard.finalStable.manualRenders!==4 || donut.keyboard.finalStable.rafFrames!==0 || donut.keyboard.finalStable.simulationTime!==0 || donut.keyboard.finalStable.glyphChecksum!==donut.keyboard.home.glyphChecksum || donut.keyboard.finalStable.running!=='false'
      || donut.final.snapshot.renderFrames!==0 || donut.final.snapshot.manualRenders!==4 || donut.final.snapshot.rafFrames!==0 || donut.final.snapshot.simulationTime!==0 || donut.final.snapshot.running!=='false'
    : !donut || donut.reduced!=='false' || donut.initial.reduced!=='false' || donut.initial.renderFrames<=0 || donut.initial.rafFrames<=0 || donut.initial.simulationTime<=0 || donut.initial.running!=='true' || donut.initial.velocityA!==.04 || donut.initial.velocityB!==.02
      || !donut.motion || donut.motion.frameDelta<4 || donut.motion.after.renderFrames<=donut.motion.before.renderFrames || donut.motion.after.simulationTime<=donut.motion.before.simulationTime || donut.motion.after.glyphChecksum===donut.motion.before.glyphChecksum || donut.motion.averageInterval<32 || donut.motion.averageInterval>75 || Math.abs(donut.motion.angleADelta-donut.motion.frameDelta*.04)>.0003 || Math.abs(donut.motion.angleBDelta-donut.motion.frameDelta*.02)>.0003 || donut.motion.after.velocityA!==.04 || donut.motion.after.velocityB!==.02
      || donut.pointer.active.dragging!=='true' || donut.pointer.active.dragPointer!==31 || donut.pointer.active.dragMoves!==1 || Math.abs(donut.pointer.active.dragDistance-29.15)>.02 || donut.pointer.active.velocityA!==-.12 || donut.pointer.active.velocityB!==.2 || !donut.pointer.focused
      || donut.pointer.released.dragging!=='false' || donut.pointer.released.dragPointer!==-1 || donut.pointer.released.source!=='pointer release' || !donut.pointer.status.startsWith('Inertial rotation') || donut.pointer.inertiaFrames<4 || donut.pointer.inertia.renderFrames<=donut.pointer.released.renderFrames || donut.pointer.inertia.glyphChecksum===donut.pointer.released.glyphChecksum || Math.abs(donut.pointer.inertia.velocityA-donut.pointer.expectedVelocityA)>.00003 || Math.abs(donut.pointer.inertia.velocityB-donut.pointer.expectedVelocityB)>.00003
      || !donut.visibility || donut.visibility.hidden.state.running!=='false' || donut.visibility.stable.state.running!=='false' || donut.visibility.hidden.key!==donut.visibility.stable.key || donut.visibility.resumed.state.running!=='true' || donut.visibility.resumed.state.simulationTime<donut.visibility.stable.state.simulationTime || donut.visibility.resumed.state.simulationTime-donut.visibility.stable.state.simulationTime>50.1 || donut.visibility.resumed.state.renderFrames<donut.visibility.stable.state.renderFrames || donut.visibility.resumed.state.renderFrames-donut.visibility.stable.state.renderFrames>1
      || donut.pointer.cancelled.dragging!=='false' || donut.pointer.cancelled.dragPointer!==-1 || donut.pointer.cancelled.source!=='pointer cancel' || donut.pointer.cancelled.velocityA!==.08 || donut.pointer.cancelled.velocityB!==-.08
      || donut.keyboard.arrow.angleA!==donut.keyboard.before.angleA || Math.abs(donut.keyboard.arrow.angleB-donut.keyboard.before.angleB-.12)>.0001 || donut.keyboard.arrow.velocityA!==.04 || donut.keyboard.arrow.velocityB!==.02 || donut.keyboard.arrow.manualRenders!==donut.keyboard.before.manualRenders+1 || donut.keyboard.arrow.renderFrames!==donut.keyboard.before.renderFrames || donut.keyboard.arrow.source!=='keyboard' || donut.keyboard.arrow.glyphChecksum===donut.keyboard.before.glyphChecksum
      || Math.abs(donut.keyboard.shifted.angleA-donut.keyboard.arrow.angleA-.24)>.0001 || donut.keyboard.shifted.angleB!==donut.keyboard.arrow.angleB || donut.keyboard.shifted.velocityA!==.04 || donut.keyboard.shifted.velocityB!==.02 || donut.keyboard.shifted.manualRenders!==donut.keyboard.arrow.manualRenders+1 || donut.keyboard.shifted.renderFrames!==donut.keyboard.arrow.renderFrames
      || donut.keyboard.home.angleA!==.6 || donut.keyboard.home.angleB!==.2 || donut.keyboard.home.velocityA!==.04 || donut.keyboard.home.velocityB!==.02 || donut.keyboard.home.glyphChecksum!==donut.initial.initialChecksum || donut.keyboard.home.manualRenders!==donut.keyboard.shifted.manualRenders+1
      || donut.keyboard.paused.paused!=='true' || donut.keyboard.paused.running!=='false' || donut.keyboard.paused.source!=='keyboard pause' || donut.keyboard.pausedStable.angleA!==donut.keyboard.paused.angleA || donut.keyboard.pausedStable.angleB!==donut.keyboard.paused.angleB || donut.keyboard.pausedStable.velocityA!==donut.keyboard.paused.velocityA || donut.keyboard.pausedStable.velocityB!==donut.keyboard.paused.velocityB || donut.keyboard.pausedStable.renderFrames!==donut.keyboard.paused.renderFrames || donut.keyboard.pausedStable.rafFrames!==donut.keyboard.paused.rafFrames || donut.keyboard.pausedStable.simulationTime!==donut.keyboard.paused.simulationTime || donut.keyboard.pausedStable.glyphChecksum!==donut.keyboard.paused.glyphChecksum || donut.keyboard.pausedStable.running!=='false'
      || donut.keyboard.resumed.paused!=='false' || donut.keyboard.resumed.running!=='true' || donut.keyboard.resumed.source!=='keyboard pause' || !donut.keyboard.focused || donut.keyboard.status!=='Torus resumed' || donut.final.snapshot.angleA!==.6 || donut.final.snapshot.angleB!==.2 || donut.final.snapshot.running!=='true';
  const donutFailed=demoId==='ascii-donut-3d'&&(donutCommonFailed||donutMotionFailed);
  const fire=result.fire;
  const fireCommonFailed=!fire
    || fire.metadata.gridColumns!=='64' || fire.metadata.gridRows!=='28' || fire.metadata.cellCount!=='1792' || fire.metadata.glyphRamp!==' .:*#%@' || fire.metadata.targetFps!=='24' || fire.metadata.frameInterval!=='41.667'
    || fire.metadata.initialSeed!=='12648430' || fire.metadata.bottomRange!=='70,100' || fire.metadata.decayRange!=='1,4' || fire.metadata.windMax!=='2' || fire.metadata.windRadius!=='120' || fire.metadata.windFalloff!=='squared'
    || fire.metadata.surgeDuration!=='2000' || fire.metadata.warmupSteps!=='56' || fire.metadata.colors!=='#5c5c66,rgba(248 113 113 / 0.7),#fbbf24,#ffffff' || fire.metadata.boundaryMode!=='clamp'
    || fire.structure.canvasCount!==1 || fire.structure.canvasRole!=='img' || !fire.structure.canvasLabel.startsWith('ASCII fire averaging ') || !fire.structure.rootLabel.startsWith('Interactive ASCII fire.')
    || fire.structure.rootTabIndex!=='0' || fire.structure.shortcuts!=='ArrowLeft ArrowRight Home Space Enter' || fire.structure.focusables!==1 || fire.structure.statusLive!=='polite' || fire.structure.statusAtomic!=='true' || fire.structure.topbars!==1 || fire.structure.footers!==1
    || fire.structure.rootBackground!=='rgb(10, 10, 11)' || fire.structure.rootColor!=='rgb(236, 236, 239)' || fire.structure.sceneBackground!=='rgb(16, 16, 18)' || fire.structure.sceneBorder!=='1px' || fire.structure.sceneRadius!=='10px' || fire.structure.touchAction!=='pan-y' || !fire.structure.overlayBackground.includes('radial-gradient')
    || fire.structure.labelFont!=='10px' || fire.structure.dataFont!=='12px' || Math.abs(fire.structure.fuelWidth-52)>.1 || Math.abs(fire.structure.fuelHeight-3)>.1 || !fire.structure.sceneInside || !fire.structure.canvasInside || Math.abs(fire.structure.sceneWidth-(result.width-20))>.1 || fire.structure.sceneHeight<250
    || !fire.structure.canvasSized || fire.structure.dpr<1 || fire.structure.dpr>2 || fire.structure.canvasClientWidth<=0 || fire.structure.canvasClientHeight<=0 || fire.structure.cellWidth<=0 || fire.structure.cellHeight<=0 || fire.structure.fontSize<=0 || fire.structure.fontSize>11 || fire.structure.maxGlyphAdvance>fire.structure.cellWidth+.01 || fire.structure.colorBuckets!==4
    || fire.structure.gridText!=='064x028' || fire.structure.rampText!==' .:*#%@' || fire.structure.pixels.total!==fire.structure.canvasWidth*fire.structure.canvasHeight || fire.structure.pixels.nonBackground<fire.structure.pixels.total*.004 || fire.structure.pixels.cool<50 || fire.structure.pixels.error<20 || fire.structure.pixels.warning<20 || fire.structure.pixels.core<10 || fire.structure.pixels.minInk>=fire.structure.pixels.maxInk || fire.structure.pixels.maxInk<600
    || fire.initial.initialChecksum!=='230BCD5F' || fire.initial.initialHeatChecksum!=='62CF78D3' || fire.initial.warmedSeedState!==485713902 || !fire.initialValidation.ok || fire.initialValidation.bottomMin<70 || fire.initialValidation.bottomMax>100 || fire.initialValidation.bottomDistinct<20 || fire.initialValidation.bandCounts.some(function(count){return count<=0}) || fire.initialValidation.occupied<1500
    || !fire.pointer || !fire.keyboard || !fire.surge || !fire.final.validation.ok || fire.final.scrollWidth!==fire.final.clientWidth || fire.final.scrollHeight!==fire.final.clientHeight || !fire.final.sceneInside || !fire.final.canvasInside;
  const fireMotionFailed=reducedMotion
    ? !fire || fire.reduced!=='true' || fire.motion!==null || fire.visibility!==null || !fire.reducedStable
      || fire.initial.renderFrames!==0 || fire.initial.manualFrames!==0 || fire.initial.rafFrames!==0 || fire.initial.simulationTime!==0 || fire.initial.running!=='false' || fire.initial.reduced!=='true' || fire.initial.rngCalls!==100352 || fire.initial.rngState!==485713902
      || fire.initial.glyphChecksum!==fire.initial.initialChecksum || fire.initial.heatChecksum!==fire.initial.initialHeatChecksum || fire.initial.averageHeat!==45.641 || fire.initial.minimumHeat!==0 || fire.initial.maximumHeat!==100 || fire.initial.coolCells!==536 || fire.initial.warmCells!==670 || fire.initial.hotCells!==519 || fire.initial.coreCells!==67 || fire.initial.occupiedGlyphs!==1669 || fire.initial.glyphsUsed!==' .:*#%@' || fire.initialValidation.bottomDistinct!==29
      || fire.reducedStable.renderFrames!==0 || fire.reducedStable.manualFrames!==0 || fire.reducedStable.rafFrames!==0 || fire.reducedStable.simulationTime!==0 || fire.reducedStable.rngCalls!==fire.initial.rngCalls || fire.reducedStable.rngState!==fire.initial.rngState || fire.reducedStable.heatChecksum!==fire.initial.heatChecksum || fire.reducedStable.glyphChecksum!==fire.initial.glyphChecksum || fire.reducedStable.running!=='false'
      || !fire.pointer.movedValidation.ok || fire.pointer.moved.renderFrames!==0 || fire.pointer.moved.manualFrames!==0 || fire.pointer.moved.rafFrames!==0 || fire.pointer.moved.simulationTime!==0 || fire.pointer.moved.pointerInside!=='true' || Math.abs(fire.pointer.moved.windStrength-1.84)>.01 || fire.pointer.moved.windSource!=='pointer' || fire.pointer.moved.source!=='pointer' || fire.pointer.moved.heatChecksum!==fire.initial.heatChecksum || fire.pointer.moved.rngCalls!==fire.initial.rngCalls
      || !fire.keyboard.arrowValidation.ok || fire.keyboard.arrow.renderFrames!==0 || fire.keyboard.arrow.manualFrames!==1 || fire.keyboard.arrow.rafFrames!==0 || fire.keyboard.arrow.simulationTime!==0 || fire.keyboard.arrow.windStrength!==2 || fire.keyboard.arrow.windSource!=='keyboard' || fire.keyboard.arrow.source!=='keyboard wind' || fire.keyboard.arrowValidation.offsetMin!==0 || fire.keyboard.arrowValidation.offsetMax!==2 || fire.keyboard.arrowValidation.affectedCells<=0
      || !fire.keyboard.homeValidation.ok || fire.keyboard.home.renderFrames!==0 || fire.keyboard.home.manualFrames!==fire.keyboard.arrow.manualFrames || fire.keyboard.home.rafFrames!==0 || fire.keyboard.home.simulationTime!==0 || fire.keyboard.home.pointerInside!=='false' || fire.keyboard.home.windStrength!==0 || fire.keyboard.home.windSource!=='keyboard calm' || fire.keyboard.home.source!=='keyboard calm' || fire.keyboard.home.status!=='Wind calmed' || fire.keyboard.home.heatChecksum!==fire.keyboard.arrow.heatChecksum || fire.keyboard.home.rngCalls!==fire.keyboard.arrow.rngCalls
      || !fire.surge.pointerFuelValidation.ok || fire.surge.pointerFuel.renderFrames!==0 || fire.surge.pointerFuel.manualFrames!==fire.keyboard.arrow.manualFrames+1 || fire.surge.pointerFuel.rafFrames!==0 || fire.surge.pointerFuel.simulationTime!==0 || fire.surge.pointerFuel.surges!==1 || fire.surge.pointerFuel.fuelFrames!==1 || fire.surge.pointerFuel.lastFuelMode!=='reduced pulse' || fire.surge.pointerFuel.surgeActive!=='false' || fire.surge.pointerFuel.surgeStartedAt!==0 || fire.surge.pointerFuel.surgeUntil!==0 || fire.surge.pointerFuel.surgeRemaining!==0 || fire.surge.pointerFuel.source!=='pointer fuel' || fire.surge.pointerFuelValidation.bottomHundreds!==64 || !fire.surge.focused
      || !fire.keyboard.spaceValidation.ok || fire.keyboard.space.renderFrames!==0 || fire.keyboard.space.manualFrames!==fire.surge.pointerFuel.manualFrames+1 || fire.keyboard.space.rafFrames!==0 || fire.keyboard.space.simulationTime!==0 || fire.keyboard.space.surges!==2 || fire.keyboard.space.fuelFrames!==2 || fire.keyboard.space.lastFuelMode!=='reduced pulse' || fire.keyboard.space.surgeActive!=='false' || fire.keyboard.space.source!=='keyboard fuel' || fire.keyboard.space.status!=='Static fire advanced with full fuel' || fire.keyboard.spaceValidation.bottomHundreds!==64 || !fire.keyboard.focused
      || fire.final.snapshot.renderFrames!==0 || fire.final.snapshot.manualFrames!==fire.keyboard.space.manualFrames || fire.final.snapshot.rafFrames!==0 || fire.final.snapshot.simulationTime!==0 || fire.final.snapshot.running!=='false' || fire.final.snapshot.rngCalls!==fire.keyboard.space.rngCalls || fire.final.snapshot.rngState!==fire.keyboard.space.rngState || fire.final.snapshot.heatChecksum!==fire.keyboard.space.heatChecksum || fire.final.snapshot.glyphChecksum!==fire.keyboard.space.glyphChecksum
    : !fire || fire.reduced!=='false' || !fire.motion || !fire.visibility
      || fire.initial.renderFrames<=0 || fire.initial.manualFrames!==0 || fire.initial.rafFrames<=fire.initial.renderFrames || fire.initial.simulationTime<=0 || fire.initial.running!=='true' || fire.initial.reduced!=='false'
      || !fire.motion.validation.ok || fire.motion.frameDelta<5 || fire.motion.after.renderFrames<=fire.motion.before.renderFrames || fire.motion.after.rafFrames<=fire.motion.before.rafFrames || fire.motion.after.simulationTime<=fire.motion.before.simulationTime || fire.motion.after.heatChecksum===fire.motion.before.heatChecksum || fire.motion.after.glyphChecksum===fire.motion.before.glyphChecksum || fire.motion.averageInterval<32 || fire.motion.averageInterval>52 || fire.motion.after.rngCalls-fire.motion.before.rngCalls!==fire.motion.frameDelta*1792
      || fire.pointer.rightSet.pointerInside!=='true' || Math.abs(fire.pointer.rightSet.windStrength-1.84)>.01 || fire.pointer.rightSet.windSource!=='pointer' || fire.pointer.rightSet.source!=='pointer' || !fire.pointer.rightValidation.ok || fire.pointer.rightValidation.offsetMin!==0 || fire.pointer.rightValidation.offsetMax!==2 || fire.pointer.rightValidation.affectedCells<=0 || fire.pointer.right.heatChecksum===fire.pointer.rightSet.heatChecksum
      || fire.pointer.leftSet.pointerInside!=='true' || Math.abs(fire.pointer.leftSet.windStrength+1.84)>.01 || fire.pointer.leftSet.windSource!=='pointer' || !fire.pointer.leftValidation.ok || fire.pointer.leftValidation.offsetMin!==-2 || fire.pointer.leftValidation.offsetMax!==0 || fire.pointer.leftValidation.affectedCells<=0 || fire.pointer.left.heatChecksum===fire.pointer.leftSet.heatChecksum
      || fire.pointer.calmSet.pointerInside!=='false' || fire.pointer.calmSet.windStrength!==0 || fire.pointer.calmSet.windSource!=='leave' || fire.pointer.calmSet.source!=='pointer leave' || !fire.pointer.calmValidation.ok || fire.pointer.calmValidation.offsetMin!==0 || fire.pointer.calmValidation.offsetMax!==0 || fire.pointer.calmValidation.affectedCells!==0
      || fire.keyboard.arrow.windStrength!==2 || fire.keyboard.arrow.windSource!=='keyboard' || fire.keyboard.arrow.source!=='keyboard wind' || !fire.keyboard.arrowValidation.ok || fire.keyboard.arrowValidation.offsetMin!==0 || fire.keyboard.arrowValidation.offsetMax!==2 || fire.keyboard.arrowValidation.affectedCells<=0 || fire.keyboard.arrowFrame.renderFrames<=fire.keyboard.arrow.renderFrames
      || fire.keyboard.home.pointerInside!=='false' || fire.keyboard.home.windStrength!==0 || fire.keyboard.home.windSource!=='keyboard calm' || fire.keyboard.home.source!=='keyboard calm' || fire.keyboard.home.status!=='Wind calmed' || !fire.keyboard.homeValidation.ok || fire.keyboard.homeValidation.offsetMin!==0 || fire.keyboard.homeValidation.offsetMax!==0 || fire.keyboard.homeValidation.affectedCells!==0 || !fire.keyboard.focused
      || fire.surge.start.surges!==1 || fire.surge.start.surgeActive!=='true' || fire.surge.start.surgeUntil-fire.surge.start.surgeStartedAt!==2000 || fire.surge.start.surgeRemaining!==2000 || fire.surge.start.source!=='pointer fuel'
      || !fire.surge.earlyValidation.ok || fire.surge.early.renderFrames<=fire.surge.start.renderFrames || fire.surge.early.lastFuelMode!=='surge' || fire.surge.earlyValidation.bottomMin!==100 || fire.surge.earlyValidation.bottomMax!==100 || fire.surge.earlyValidation.bottomHundreds!==64 || fire.surge.early.fuelFrames<=fire.surge.start.fuelFrames || !fire.surge.focused
      || fire.visibility.hidden.running!=='false' || fire.visibility.stable.running!=='false' || fire.visibility.hiddenKey!==fire.visibility.stableKey || fire.visibility.resumed.running!=='true' || fire.visibility.resumed.renderFrames<fire.visibility.stable.renderFrames || fire.visibility.resumed.renderFrames-fire.visibility.stable.renderFrames>1 || fire.visibility.resumed.simulationTime<fire.visibility.stable.simulationTime || fire.visibility.resumed.simulationTime-fire.visibility.stable.simulationTime>50.1 || fire.visibility.resumed.surgeRemaining>fire.visibility.stable.surgeRemaining || fire.visibility.stable.surgeRemaining-fire.visibility.resumed.surgeRemaining>50.1
      || !fire.surge.endValidation.ok || fire.surge.end.surgeActive!=='false' || fire.surge.end.lastFuelMode!=='base' || fire.surge.end.simulationTime<fire.surge.end.surgeUntil || fire.surge.end.simulationTime-fire.surge.end.surgeUntil>50.1 || fire.surge.endValidation.bottomMin<70 || fire.surge.endValidation.bottomMax>100 || fire.surge.endValidation.bottomHundreds>=64 || fire.surge.endValidation.bottomDistinct<20 || fire.surge.status!=='Two second fuel surge started' || fire.final.snapshot.running!=='true';
  const fireFailed=demoId==='ascii-fire'&&(fireCommonFailed||fireMotionFailed);
  const fluid=result.fluid;
  const fluidStateStable=function(a,b){return !!a&&!!b&&a.solverStep===b.solverStep&&a.renderFrames===b.renderFrames&&a.manualFrames===b.manualFrames&&a.rafFrames===b.rafFrames&&a.simulationTime===b.simulationTime&&a.densityChecksum===b.densityChecksum&&a.velocityXChecksum===b.velocityXChecksum&&a.velocityYChecksum===b.velocityYChecksum&&a.pressureChecksum===b.pressureChecksum&&a.glyphChecksum===b.glyphChecksum&&a.splats===b.splats};
  const fluidCommonFailed=!fluid
    || fluid.metadata.gridColumns!=='48' || fluid.metadata.gridRows!=='24' || fluid.metadata.cellCount!=='1152' || fluid.metadata.glyphRamp!==' .:-=+*#%@' || fluid.metadata.dissipation!=='0.98' || fluid.metadata.jacobiIterations!=='4'
    || fluid.metadata.emitterCount!=='2' || fluid.metadata.emitterPositions!=='15,20;32,20' || fluid.metadata.emitterDensity!=='0.3' || fluid.metadata.emitterHorizontalForce!=='0.04' || fluid.metadata.emitterUpwardForce!=='-0.08' || fluid.metadata.emitterDriftRate!=='0.03' || fluid.metadata.emitterCarrierRadius!=='3' || fluid.metadata.emitterCarrierFalloff!=='squared' || fluid.metadata.emitterPhases!=='0,pi'
    || fluid.metadata.pointerGain!=='0.6' || fluid.metadata.splatRadius!=='3' || fluid.metadata.splatFalloff!=='squared' || fluid.metadata.velocityThreshold!=='0.12' || fluid.metadata.infoMix!=='0.4' || fluid.metadata.brightDensityThreshold!=='0.72' || fluid.metadata.divergenceScale!=='-0.5' || fluid.metadata.projectionScale!=='0.5'
    || fluid.metadata.renderColors!=='#9b9ba3,#ececef,rgb(134 186 197),rgb(183 234 243)' || fluid.metadata.targetFps!=='30' || fluid.metadata.frameInterval!=='33.333' || fluid.metadata.warmupSteps!=='180' || fluid.metadata.boundaryMode!=='solid-clamp' || fluid.metadata.advection!=='semi-lagrangian' || fluid.metadata.interpolation!=='bilinear'
    || fluid.structure.role!=='group' || fluid.structure.canvasCount!==1 || fluid.structure.canvasRole!=='img' || fluid.structure.canvasLabel!=='Deterministic ASCII density and velocity field' || fluid.structure.rootTabIndex!=='0' || !fluid.structure.rootLabel.startsWith('Interactive ASCII fluid.') || fluid.structure.shortcuts!=='ArrowLeft ArrowRight ArrowUp ArrowDown Home Space Escape R' || fluid.structure.focusables!==1
    || fluid.structure.statusLive!=='polite' || fluid.structure.statusAtomic!=='true' || fluid.structure.headerText!=='INTRX / FLUID STIR048x024 · 4J' || fluid.structure.footerItems!==3 || fluid.structure.rootBackground!=='rgb(10, 10, 11)' || fluid.structure.rootColor!=='rgb(236, 236, 239)' || fluid.structure.sceneBackground!=='rgb(16, 16, 18)' || fluid.structure.sceneBorder!=='1px' || fluid.structure.sceneRadius!=='10px' || fluid.structure.touchAction!=='none'
    || !fluid.structure.overlayBackground.includes('radial-gradient') || fluid.structure.overlayBackground.includes('repeating-linear-gradient') || fluid.structure.headerFont!=='10px' || !['9px','10px'].includes(fluid.structure.footerFont) || fluid.structure.reticleBorder!=='1px' || fluid.structure.reticleColor!=='rgba(167, 139, 250, 0.72)' || fluid.structure.reticleOpacity!=='0'
    || !fluid.structure.sceneInside || !fluid.structure.canvasInside || Math.abs(fluid.structure.sceneWidth-(result.width-20))>.1 || Math.abs(fluid.structure.sceneHeight-264)>.1 || Math.abs(fluid.structure.canvasClientWidth-(fluid.structure.sceneWidth-2))>.1 || Math.abs(fluid.structure.canvasClientHeight-262)>.1 || !fluid.structure.canvasSized || fluid.structure.dpr<1 || fluid.structure.dpr>2
    || fluid.structure.cellWidth<=0 || fluid.structure.cellHeight<=0 || fluid.structure.fontSize<=0 || fluid.structure.fontSize>11 || fluid.structure.maxGlyphAdvance>fluid.structure.cellWidth+.01 || fluid.structure.colorBuckets<2 || fluid.structure.colorBuckets>4 || Math.abs(fluid.structure.reticleWidth-fluid.structure.cellWidth*6)>.1 || Math.abs(fluid.structure.reticleHeight-fluid.structure.cellHeight*6)>.1
    || fluid.structure.pixels.total!==fluid.structure.canvasWidth*fluid.structure.canvasHeight || fluid.structure.pixels.nonBackground<600 || fluid.structure.pixels.low<20 || fluid.structure.pixels.infoLow<20 || fluid.structure.pixels.minInk>=fluid.structure.pixels.maxInk || fluid.structure.pixels.maxInk<450
    || fluid.initial.initialDensityChecksum!=='700326D1' || fluid.initial.initialVelocityXChecksum!=='36A8C1B3' || fluid.initial.initialVelocityYChecksum!=='3E8163C1' || fluid.initial.initialGlyphChecksum!=='4300753D' || fluid.initial.solverStep!==180+fluid.initial.renderFrames+fluid.initial.manualFrames || fluid.initial.pressureIterationsLast!==4
    || !fluid.initialValidation.ok || fluid.initialValidation.projectionRatio<=0 || fluid.initialValidation.projectionRatio>=1 || fluid.initialValidation.occupied<80 || fluid.initialValidation.occupied>200 || fluid.initial.highVelocityCells<40 || fluid.initial.highVelocityCells>180 || fluid.initial.glyphsUsed.length<4 || [...fluid.initial.glyphsUsed].some(function(glyph){return !fluid.metadata.glyphRamp.includes(glyph)})
    || !fluid.pointer || !fluid.keyboard || !fluid.reset || !fluid.final.validation.ok || fluid.final.scrollWidth!==fluid.final.clientWidth || fluid.final.scrollHeight!==fluid.final.clientHeight || !fluid.final.sceneInside || !fluid.final.canvasInside;
  const fluidMotionFailed=reducedMotion
    ? !fluid || fluid.reduced!=='true' || fluid.motion!==null || fluid.visibility!==null || !fluid.reducedStable
      || fluid.initial.solverStep!==180 || fluid.initial.renderFrames!==0 || fluid.initial.manualFrames!==0 || fluid.initial.rafFrames!==0 || fluid.initial.simulationTime!==0 || fluid.initial.running!=='false' || fluid.initial.reduced!=='true' || fluid.initial.densityChecksum!=='700326D1' || fluid.initial.velocityXChecksum!=='36A8C1B3' || fluid.initial.velocityYChecksum!=='3E8163C1' || fluid.initial.glyphChecksum!=='4300753D'
      || !fluidStateStable(fluid.initial,fluid.reducedStable) || fluid.reducedStable.running!=='false'
      || fluid.pointer.down.dragging!=='true' || fluid.pointer.down.dragPointer!==81 || fluid.pointer.down.captures!==1 || fluid.pointer.down.solverStep!==180 || fluid.pointer.down.manualFrames!==0 || fluid.pointer.down.rafFrames!==0 || fluid.pointer.down.simulationTime!==0
      || fluid.pointer.ignored.ignoredPointers!==1 || fluid.pointer.ignored.solverStep!==fluid.pointer.down.solverStep || fluid.pointer.ignored.manualFrames!==fluid.pointer.down.manualFrames
      || !fluid.pointer.movedSplat.ok || !fluid.pointer.movedValidation.ok || fluid.pointer.movedConsumed!==0 || fluid.pointer.moved.solverStep!==181 || fluid.pointer.moved.manualFrames!==1 || fluid.pointer.moved.renderFrames!==0 || fluid.pointer.moved.rafFrames!==0 || fluid.pointer.moved.simulationTime!==0 || fluid.pointer.moved.splats!==1 || fluid.pointer.moved.source!=='pointer stir'
      || fluid.pointer.released.dragging!=='false' || fluid.pointer.released.dragPointer!==-1 || fluid.pointer.released.releases!==1 || !fluid.pointer.cancelSplat.ok || fluid.pointer.beforeCancel.solverStep!==182 || fluid.pointer.beforeCancel.manualFrames!==2 || fluid.pointer.cancelled.dragging!=='false' || fluid.pointer.cancelled.dragPointer!==-1 || fluid.pointer.cancelled.cancels!==1 || !fluid.pointer.focused
      || !fluid.keyboard.arrowSplat.ok || !fluid.keyboard.arrowValidation.ok || fluid.keyboard.arrowConsumed!==0 || fluid.keyboard.arrow.solverStep!==183 || fluid.keyboard.arrow.manualFrames!==3 || fluid.keyboard.arrow.rafFrames!==0 || fluid.keyboard.arrow.simulationTime!==0 || fluid.keyboard.home.solverStep!==fluid.keyboard.arrow.solverStep || fluid.keyboard.home.manualFrames!==fluid.keyboard.arrow.manualFrames || fluid.keyboard.home.source!=='keyboard center'
      || !fluid.keyboard.spaceValidation.ok || fluid.keyboard.space.solverStep!==184 || fluid.keyboard.space.manualFrames!==4 || fluid.keyboard.space.renderFrames!==0 || fluid.keyboard.space.rafFrames!==0 || fluid.keyboard.space.simulationTime!==0 || fluid.keyboard.space.source!=='keyboard step' || !fluid.keyboard.focused
      || fluid.reset.capture.dragging!=='true' || fluid.reset.capture.dragPointer!==83 || fluid.reset.nativeAfter!==false || !fluid.reset.validation.ok || fluid.reset.state.dragging!=='false' || fluid.reset.state.dragPointer!==-1 || fluid.reset.state.solverStep!==180 || fluid.reset.state.renderFrames!==0 || fluid.reset.state.manualFrames!==0 || fluid.reset.state.rafFrames!==0 || fluid.reset.state.simulationTime!==0 || fluid.reset.state.resets!==1 || fluid.reset.state.running!=='false' || fluid.reset.state.densityChecksum!=='700326D1' || fluid.reset.state.velocityXChecksum!=='36A8C1B3' || fluid.reset.state.velocityYChecksum!=='3E8163C1' || fluid.reset.state.glyphChecksum!=='4300753D'
      || !fluidStateStable(fluid.reset.state,fluid.final.snapshot) || fluid.final.snapshot.running!=='false'
    : !fluid || fluid.reduced!=='false' || !fluid.motion || !fluid.visibility || fluid.reducedStable!==null
      || fluid.initial.renderFrames<1 || fluid.initial.manualFrames!==0 || fluid.initial.rafFrames<fluid.initial.renderFrames || fluid.initial.simulationTime<=0 || fluid.initial.running!=='true' || fluid.initial.reduced!=='false'
      || !fluid.motion.validation.ok || fluid.motion.frameDelta<5 || fluid.motion.after.solverStep-fluid.motion.before.solverStep!==fluid.motion.frameDelta || fluid.motion.after.renderFrames-fluid.motion.before.renderFrames!==fluid.motion.frameDelta || fluid.motion.after.rafFrames<=fluid.motion.before.rafFrames || fluid.motion.after.simulationTime<=fluid.motion.before.simulationTime || fluid.motion.averageInterval<32 || fluid.motion.averageInterval>50 || fluid.motion.after.densityChecksum===fluid.motion.before.densityChecksum
      || fluid.pointer.down.dragging!=='true' || fluid.pointer.down.dragPointer!==71 || fluid.pointer.down.captures<1 || fluid.pointer.ignored.ignoredPointers!==fluid.pointer.down.ignoredPointers+1 || !fluid.pointer.movedSplat.ok || !fluid.pointer.solvedValidation.ok || fluid.pointer.consumedErrors!==0 || fluid.pointer.solved.solverStep<=fluid.pointer.moved.solverStep || fluid.pointer.released.dragging!=='false' || fluid.pointer.released.dragPointer!==-1 || fluid.pointer.released.releases!==fluid.pointer.down.releases+1 || !fluid.pointer.cancelSplat.ok || fluid.pointer.beforeCancel.dragging!=='true' || fluid.pointer.cancelled.dragging!=='false' || fluid.pointer.cancelled.dragPointer!==-1 || fluid.pointer.cancelled.cancels!==fluid.pointer.beforeCancel.cancels+1 || !fluid.pointer.focused
      || !fluid.keyboard.arrowSplat.ok || !fluid.keyboard.arrowValidation.ok || fluid.keyboard.arrowSolved.solverStep<=fluid.keyboard.arrow.solverStep || fluid.keyboard.home.solverStep!==fluid.keyboard.arrowSolved.solverStep || fluid.keyboard.home.manualFrames!==fluid.keyboard.arrowSolved.manualFrames || fluid.keyboard.home.source!=='keyboard center' || fluid.keyboard.paused.paused!=='true' || fluid.keyboard.paused.running!=='false' || !fluidStateStable(fluid.keyboard.paused,fluid.keyboard.pausedStable) || fluid.keyboard.resumed.paused!=='false' || fluid.keyboard.resumed.running!=='true' || !fluid.keyboard.focused
      || fluid.visibility.hidden.running!=='false' || fluid.visibility.stable.running!=='false' || fluid.visibility.hiddenKey!==fluid.visibility.stableKey || fluid.visibility.visible.running!=='true'
      || fluid.reset.capture.dragging!=='true' || fluid.reset.capture.dragPointer!==73 || fluid.reset.nativeAfter!==false || !fluid.reset.validation.ok || fluid.reset.state.dragging!=='false' || fluid.reset.state.dragPointer!==-1 || fluid.reset.state.solverStep!==180 || fluid.reset.state.renderFrames!==0 || fluid.reset.state.manualFrames!==0 || fluid.reset.state.rafFrames!==0 || fluid.reset.state.simulationTime!==0 || fluid.reset.state.resets!==1 || fluid.reset.state.running!=='false' || fluid.reset.state.densityChecksum!==fluid.reset.state.initialDensityChecksum || fluid.reset.state.velocityXChecksum!==fluid.reset.state.initialVelocityXChecksum || fluid.reset.state.velocityYChecksum!==fluid.reset.state.initialVelocityYChecksum || fluid.reset.state.glyphChecksum!==fluid.reset.state.initialGlyphChecksum || fluid.final.snapshot.running!=='true';
  const fluidFailed=demoId==='ascii-fluid-stir'&&(fluidCommonFailed||fluidMotionFailed);
  const portrait=result.portrait;
  const portraitCommonFailed=!portrait
    || portrait.metadata.sourceWidth!=='192' || portrait.metadata.sourceHeight!=='96' || portrait.metadata.sourceScale!=='4' || portrait.metadata.sourceSeed!=='0x9E3779B9' || portrait.metadata.sourceFormula!=='portrait-v2' || portrait.metadata.sourceNoiseAmplitudes!=='0.025,0.07' || portrait.metadata.sourcePalette!=='#161619,#ececef'
    || portrait.metadata.sourceMasks!=='head:.5,.39,.17,.28;neck:.5,.67,.095,.18;shoulders:.5,.91,.47,.29;edge:.84,1.08' || portrait.metadata.sourceLighting!=='background:.27,.58,.72,.24,.88,.82;key:.42,.31,.34,.52,.26;rim:.63,.39,.20,.40,.14;bustBase:.05' || portrait.metadata.luminanceWeights!=='0.2126,0.7152,0.0722'
    || portrait.metadata.gridColumns!=='48' || portrait.metadata.gridRows!=='24' || portrait.metadata.cellCount!=='1152' || portrait.metadata.glyphRamp!==' .:-=+*#%@' || portrait.metadata.revealRadius!=='90' || portrait.metadata.revealFalloff!=='squared' || portrait.metadata.accentAnnulus!=='12' || portrait.metadata.trailDuration!=='600'
    || portrait.structure.role!=='group' || portrait.structure.canvasCount!==1 || portrait.structure.canvasRole!=='img' || portrait.structure.canvasLabel!=='Procedural abstract bust rendered as responsive ASCII glyphs' || portrait.structure.rootTabIndex!=='0' || !portrait.structure.rootLabel.startsWith('Interactive abstract ASCII portrait.') || portrait.structure.shortcuts!=='ArrowLeft ArrowRight ArrowUp ArrowDown Home Space Escape R' || portrait.structure.focusables!==1 || portrait.structure.statusLive!=='polite' || portrait.structure.statusAtomic!=='true'
    || portrait.structure.headerText!=='INTRX / PORTRAIT STUDY192x096 → 048x024' || portrait.structure.footerItems!==3 || portrait.structure.rootBackground!=='rgb(10, 10, 11)' || portrait.structure.rootColor!=='rgb(236, 236, 239)' || portrait.structure.sceneBackground!=='rgb(10, 10, 11)' || portrait.structure.sceneBorder!=='1px' || portrait.structure.sceneRadius!=='10px' || portrait.structure.touchAction!=='pan-y' || !portrait.structure.overlayBackground.includes('radial-gradient') || portrait.structure.overlayBackground.includes('repeating-linear-gradient')
    || portrait.structure.headerFont!==(result.width<=340?'9px':'10px') || portrait.structure.footerFont!==(result.width<=340?'9px':'10px') || !portrait.structure.sceneInside || !portrait.structure.canvasInside || Math.abs(portrait.structure.sceneWidth-(result.width-20))>.1 || Math.abs(portrait.structure.sceneHeight-264)>.1 || Math.abs(portrait.structure.canvasClientWidth-(result.width-22))>.1 || Math.abs(portrait.structure.canvasClientHeight-262)>.1 || !portrait.structure.canvasSized || portrait.structure.dpr<1 || portrait.structure.dpr>2
    || Math.abs(portrait.structure.cellWidth-portrait.structure.canvasClientWidth/48)>.001 || Math.abs(portrait.structure.cellHeight-portrait.structure.canvasClientHeight/24)>.001 || portrait.structure.fontSize<=0 || portrait.structure.fontSize>11 || portrait.structure.maxGlyphAdvance>portrait.structure.cellWidth+.01
    || portrait.structure.baselinePixels.total!==portrait.structure.canvasWidth*portrait.structure.canvasHeight || portrait.structure.baselinePixels.nonBackground<portrait.structure.baselinePixels.total*.06 || portrait.structure.baselinePixels.txt1<1000 || portrait.structure.baselinePixels.accent!==0 || portrait.structure.baselinePixels.sourceTone!==0 || portrait.structure.baselinePixels.minInk>=portrait.structure.baselinePixels.maxInk || portrait.structure.baselinePixels.maxInk<400
    || !portrait.initial.staticValidation.ok || portrait.initial.staticValidation.sourceBytesChecked!==73728 || portrait.initial.staticValidation.cellsChecked!==1152 || portrait.initial.staticValidation.expectedSourceChecksum!=='BDB1BF6A' || portrait.initial.staticValidation.expectedCellChecksum!=='A1D31493' || portrait.initial.staticValidation.expectedGlyphChecksum!=='571A181B' || portrait.initial.staticValidation.sourceMinimum!==23 || portrait.initial.staticValidation.sourceMaximum!==210 || portrait.initial.staticValidation.sourceDistinct!==183 || portrait.initial.staticValidation.darkPixels!==5544 || portrait.initial.staticValidation.brightPixels!==1925 || portrait.initial.staticValidation.occupied!==1009 || portrait.initial.staticValidation.glyphCounts.join(',')!=='143,214,180,260,125,125,72,33,0,0'
    || !portrait.initial.stateValidation.ok || portrait.initial.snapshot.sourceChecksum!=='BDB1BF6A' || portrait.initial.snapshot.cellChecksum!=='A1D31493' || portrait.initial.snapshot.glyphChecksum!=='571A181B' || portrait.initial.snapshot.initialRevealChecksum!=='8121AC45' || portrait.initial.snapshot.revealChecksum!=='8121AC45' || portrait.initial.snapshot.targetChecksum!=='8121AC45' || portrait.initial.snapshot.edgeChecksum!=='8121AC45' || portrait.initial.snapshot.renderBucketChecksum!=='8121AC45' || portrait.initial.snapshot.renderBucketCounts!=='1152,0,0,0'
    || portrait.initial.snapshot.activeTime!==0 || portrait.initial.snapshot.schedulerFrames!==0 || portrait.initial.snapshot.inputUpdates!==0 || portrait.initial.snapshot.pointerMoves!==0 || portrait.initial.snapshot.keyboardMoves!==0 || portrait.initial.snapshot.pointerActive!=='false' || portrait.initial.snapshot.pointerInside!=='false' || portrait.initial.snapshot.dragging!=='false' || portrait.initial.snapshot.dragPointer!==-1 || portrait.initial.snapshot.revealCells!==0 || portrait.initial.snapshot.trailCells!==0 || portrait.initial.snapshot.glyphCells!==1009 || portrait.initial.snapshot.running!=='false' || portrait.initial.snapshot.status!=='' || portrait.initial.snapshot.mode!=='MODE / ASCII' || portrait.initial.snapshot.readout!=='REVEAL 000' || portrait.initial.key!==portrait.idleStable.key
    || portrait.ignored.secondary.ignoredPointers!==portrait.ignored.before.ignoredPointers+1 || portrait.ignored.right.ignoredPointers!==portrait.ignored.secondary.ignoredPointers+1 || portrait.ignored.right.inputUpdates!==portrait.ignored.before.inputUpdates || portrait.ignored.right.revealChecksum!==portrait.ignored.before.revealChecksum || portrait.ignored.right.targetChecksum!==portrait.ignored.before.targetChecksum
    || !portrait.hover.enter.transition.ok || !portrait.hover.enter.validation.ok || portrait.hover.enter.snapshot.pointerActive!=='true' || portrait.hover.enter.snapshot.pointerInside!=='true' || portrait.hover.enter.snapshot.inputUpdates!==portrait.ignored.right.inputUpdates+1 || portrait.hover.enter.snapshot.pointerMoves!==portrait.ignored.right.pointerMoves+1 || portrait.hover.enter.snapshot.revealCells<200 || portrait.hover.enter.snapshot.accentCells<20 || portrait.hover.enter.snapshot.revealMaximum!==1 || portrait.hover.enter.validation.buckets[2]!==1 || portrait.hover.enter.snapshot.mode!=='MODE / DEVELOP' || portrait.hover.enter.snapshot.status!=='Portrait reveal active'
    || portrait.hover.enter.pixels.nonBackground<=portrait.structure.baselinePixels.nonBackground || portrait.hover.enter.pixels.sourceTone<portrait.hover.enter.pixels.total*.04 || portrait.hover.enter.pixels.accent<20 || portrait.hover.enter.sample.actual.join(',')!==portrait.hover.enter.sample.expected.join(',')
    || !portrait.hover.move.transition.ok || !portrait.hover.move.validation.ok || portrait.hover.move.snapshot.inputUpdates!==portrait.hover.enter.snapshot.inputUpdates+1 || portrait.hover.move.snapshot.pointerMoves!==portrait.hover.enter.snapshot.pointerMoves+1 || portrait.hover.move.snapshot.targetChecksum===portrait.hover.enter.snapshot.targetChecksum
    || !portrait.capture.down.transition.ok || !portrait.capture.down.validation.ok || portrait.capture.down.snapshot.dragging!=='true' || portrait.capture.down.snapshot.dragPointer!==(reducedMotion?81:71) || portrait.capture.down.snapshot.captures!==1 || portrait.capture.mismatched.ignoredPointers!==portrait.capture.down.snapshot.ignoredPointers+1 || portrait.capture.secondary.ignoredPointers!==portrait.capture.mismatched.ignoredPointers+1 || portrait.capture.secondary.inputUpdates!==portrait.capture.down.snapshot.inputUpdates
    || !portrait.capture.moved.transition.ok || !portrait.capture.moved.validation.ok || portrait.capture.moved.snapshot.pointerMoves!==portrait.capture.down.snapshot.pointerMoves+1 || portrait.capture.released.dragging!=='false' || portrait.capture.released.dragPointer!==-1 || portrait.capture.released.releases!==1
    || !portrait.capture.outside.down.transition.ok || !portrait.capture.outside.down.validation.ok || portrait.capture.outside.down.snapshot.dragging!=='true' || portrait.capture.outside.down.snapshot.dragPointer!==(reducedMotion?82:72) || portrait.capture.outside.down.snapshot.captures!==2 || !portrait.capture.outside.release.transition.ok || !portrait.capture.outside.release.validation.ok || portrait.capture.outside.release.snapshot.dragging!=='false' || portrait.capture.outside.release.snapshot.dragPointer!==-1 || portrait.capture.outside.release.snapshot.pointerActive!=='false' || portrait.capture.outside.release.snapshot.pointerInside!=='false' || portrait.capture.outside.release.snapshot.releases!==2 || portrait.capture.outside.release.snapshot.lastUpdateSource!=='pointer release outside' || portrait.capture.outside.release.snapshot.status!=='Portrait reveal released outside' || !portrait.capture.outside.settled.validation.ok || portrait.capture.outside.settled.snapshot.revealCells!==0 || portrait.capture.outside.settled.snapshot.trailCells!==0 || portrait.capture.outside.settled.snapshot.revealChecksum!=='8121AC45'
    || !portrait.capture.secondDown.transition.ok || !portrait.capture.secondDown.validation.ok || portrait.capture.secondDown.snapshot.dragging!=='true' || portrait.capture.secondDown.snapshot.captures!==3 || !portrait.capture.cancelled.transition.ok || !portrait.capture.cancelled.validation.ok || portrait.capture.cancelled.snapshot.dragging!=='false' || portrait.capture.cancelled.snapshot.dragPointer!==-1 || portrait.capture.cancelled.snapshot.cancels!==1 || !portrait.capture.settledValidation.ok || !portrait.capture.focused
    || !portrait.keyboard.home.transition.ok || !portrait.keyboard.home.validation.ok || portrait.keyboard.home.snapshot.pointerActive!=='true' || portrait.keyboard.home.snapshot.pointerNormalized!=='0.500000,0.500000' || Math.abs(portrait.keyboard.home.snapshot.pointerX-portrait.structure.canvasClientWidth/2)>.001 || Math.abs(portrait.keyboard.home.snapshot.pointerY-portrait.structure.canvasClientHeight/2)>.001 || portrait.keyboard.home.snapshot.keyboardMoves!==1 || portrait.keyboard.home.snapshot.lastUpdateSource!=='keyboard center'
    || !portrait.keyboard.resize.before.validation.ok || !portrait.keyboard.resize.narrowed.validation.ok || !portrait.keyboard.resize.restoredHidden.validation.ok || !portrait.keyboard.resize.hiddenStable.validation.ok || !portrait.keyboard.resize.restored.validation.ok || portrait.keyboard.resize.before.canvasClientWidth-portrait.keyboard.resize.narrowed.canvasClientWidth<30 || portrait.keyboard.resize.before.canvasClientWidth-portrait.keyboard.resize.narrowed.canvasClientWidth>45 || portrait.keyboard.resize.narrowed.canvasClientHeight!==portrait.keyboard.resize.before.canvasClientHeight || portrait.keyboard.resize.narrowed.snapshot.pointerNormalized!=='0.500000,0.500000' || Math.abs(portrait.keyboard.resize.narrowed.snapshot.pointerX-portrait.keyboard.resize.narrowed.canvasClientWidth/2)>.001 || Math.abs(portrait.keyboard.resize.narrowed.snapshot.pointerY-portrait.keyboard.resize.narrowed.canvasClientHeight/2)>.001 || portrait.keyboard.resize.narrowed.snapshot.inputUpdates!==portrait.keyboard.resize.before.snapshot.inputUpdates || portrait.keyboard.resize.narrowed.snapshot.keyboardMoves!==portrait.keyboard.resize.before.snapshot.keyboardMoves || portrait.keyboard.resize.narrowed.snapshot.activeTime!==portrait.keyboard.resize.before.snapshot.activeTime || portrait.keyboard.resize.narrowed.snapshot.schedulerFrames!==portrait.keyboard.resize.before.snapshot.schedulerFrames || portrait.keyboard.resize.narrowed.snapshot.lastUpdateSource!=='resize' || portrait.keyboard.resize.restoredHidden.canvasClientWidth!==portrait.keyboard.resize.before.canvasClientWidth || portrait.keyboard.resize.restoredHidden.snapshot.inputUpdates!==portrait.keyboard.resize.before.snapshot.inputUpdates || portrait.keyboard.resize.restoredHidden.snapshot.activeTime!==portrait.keyboard.resize.before.snapshot.activeTime || portrait.keyboard.resize.hiddenKey!==portrait.keyboard.resize.hiddenStable.key || portrait.keyboard.resize.restored.canvasClientWidth!==portrait.keyboard.resize.before.canvasClientWidth || portrait.keyboard.resize.restored.snapshot.pointerNormalized!=='0.500000,0.500000' || Math.abs(portrait.keyboard.resize.restored.snapshot.pointerX-portrait.keyboard.home.snapshot.pointerX)>.001 || Math.abs(portrait.keyboard.resize.restored.snapshot.pointerY-portrait.keyboard.home.snapshot.pointerY)>.001 || portrait.keyboard.resize.restored.snapshot.inputUpdates!==portrait.keyboard.resize.before.snapshot.inputUpdates || portrait.keyboard.resize.restored.snapshot.targetChecksum!==portrait.keyboard.home.snapshot.targetChecksum || portrait.keyboard.resize.restored.snapshot.revealChecksum!==portrait.keyboard.resize.restored.snapshot.targetChecksum
    || !portrait.keyboard.arrow.transition.ok || !portrait.keyboard.arrow.validation.ok || Math.abs(portrait.keyboard.arrow.snapshot.pointerX-(portrait.keyboard.home.snapshot.pointerX+12))>.001 || portrait.keyboard.arrow.snapshot.keyboardMoves!==2 || portrait.keyboard.arrow.snapshot.lastUpdateSource!=='keyboard move' || !portrait.keyboard.shiftArrow.transition.ok || !portrait.keyboard.shiftArrow.validation.ok || Math.abs(portrait.keyboard.shiftArrow.snapshot.pointerY-(portrait.keyboard.arrow.snapshot.pointerY+36))>.001 || portrait.keyboard.shiftArrow.snapshot.keyboardMoves!==3
    || !portrait.keyboard.spaceOff.transition.ok || !portrait.keyboard.spaceOff.validation.ok || portrait.keyboard.spaceOff.snapshot.pointerActive!=='false' || portrait.keyboard.spaceOff.snapshot.lastUpdateSource!=='keyboard toggle off' || !portrait.keyboard.spaceOn.transition.ok || !portrait.keyboard.spaceOn.validation.ok || portrait.keyboard.spaceOn.snapshot.pointerActive!=='true' || portrait.keyboard.spaceOn.snapshot.lastUpdateSource!=='keyboard toggle on' || !portrait.keyboard.escape.transition.ok || !portrait.keyboard.escape.validation.ok || portrait.keyboard.escape.snapshot.pointerActive!=='false' || portrait.keyboard.escape.snapshot.pointerInside!=='false' || portrait.keyboard.escape.snapshot.lastUpdateSource!=='keyboard clear' || portrait.keyboard.escape.snapshot.status!=='Portrait reveal cleared' || !portrait.keyboard.settledValidation.ok || !portrait.keyboard.focused
    || !portrait.reset.capture.transition.ok || !portrait.reset.capture.validation.ok || portrait.reset.capture.snapshot.dragging!=='true' || portrait.reset.capture.snapshot.dragPointer!==(reducedMotion?84:74) || portrait.reset.capture.snapshot.captures!==4 || portrait.reset.nativeAfter!==false || !portrait.reset.validation.ok || portrait.reset.state.activeTime!==0 || portrait.reset.state.inputUpdates!==0 || portrait.reset.state.pointerMoves!==0 || portrait.reset.state.keyboardMoves!==0 || portrait.reset.state.pointerActive!=='false' || portrait.reset.state.pointerInside!=='false' || portrait.reset.state.pointerNormalized!=='0.500000,0.500000' || portrait.reset.state.dragging!=='false' || portrait.reset.state.dragPointer!==-1 || portrait.reset.state.captures!==0 || portrait.reset.state.releases!==0 || portrait.reset.state.cancels!==0 || portrait.reset.state.ignoredPointers!==0 || portrait.reset.state.resets!==1 || portrait.reset.state.running!=='false'
    || portrait.reset.state.sourceChecksum!=='BDB1BF6A' || portrait.reset.state.cellChecksum!=='A1D31493' || portrait.reset.state.glyphChecksum!=='571A181B' || portrait.reset.state.revealChecksum!=='8121AC45' || portrait.reset.state.targetChecksum!=='8121AC45' || portrait.reset.state.edgeChecksum!=='8121AC45' || portrait.reset.state.renderBucketChecksum!=='8121AC45' || portrait.reset.state.renderBucketCounts!=='1152,0,0,0' || portrait.reset.state.source!=='keyboard reset' || portrait.reset.state.status!=='Portrait reset to ASCII' || portrait.reset.state.mode!=='MODE / ASCII' || portrait.reset.state.readout!=='REVEAL 000' || portrait.reset.key!==portrait.reset.stableKey
    || !portrait.final.validation.ok || portrait.final.snapshot.sourceChecksum!=='BDB1BF6A' || portrait.final.snapshot.cellChecksum!=='A1D31493' || portrait.final.snapshot.glyphChecksum!=='571A181B' || portrait.final.snapshot.revealChecksum!=='8121AC45' || portrait.final.snapshot.running!=='false' || portrait.final.scrollWidth!==portrait.final.clientWidth || portrait.final.scrollHeight!==portrait.final.clientHeight || !portrait.final.sceneInside || !portrait.final.canvasInside;
  const portraitMotionFailed=reducedMotion
    ? !portrait || portrait.reduced!=='true' || portrait.visibility!==null || !portrait.motion || portrait.initial.snapshot.reduced!=='true' || portrait.initial.snapshot.activeTime!==0 || portrait.initial.snapshot.schedulerFrames!==0 || portrait.initial.snapshot.running!=='false'
      || portrait.hover.enter.snapshot.activeTime!==0 || portrait.hover.enter.snapshot.schedulerFrames!==0 || portrait.hover.enter.snapshot.running!=='false' || portrait.hover.move.snapshot.activeTime!==0 || portrait.hover.move.snapshot.schedulerFrames!==0 || portrait.hover.move.snapshot.running!=='false' || portrait.hover.move.snapshot.trailCells!==0
      || !portrait.motion.leave.transition.ok || !portrait.motion.leave.validation.ok || portrait.motion.leave.snapshot.activeTime!==0 || portrait.motion.leave.snapshot.schedulerFrames!==0 || portrait.motion.leave.snapshot.running!=='false' || portrait.motion.leave.snapshot.revealCells!==0 || portrait.motion.leave.snapshot.trailCells!==0 || portrait.motion.leave.snapshot.revealChecksum!=='8121AC45' || portrait.motion.leave.snapshot.targetChecksum!=='8121AC45'
      || portrait.capture.down.snapshot.activeTime!==0 || portrait.capture.down.snapshot.schedulerFrames!==0 || portrait.capture.moved.snapshot.activeTime!==0 || portrait.capture.moved.snapshot.schedulerFrames!==0 || portrait.capture.moved.snapshot.trailCells!==0 || portrait.capture.outside.release.snapshot.revealCells!==0 || portrait.capture.outside.release.snapshot.trailCells!==0 || portrait.capture.cancelled.snapshot.revealCells!==0 || portrait.capture.cancelled.snapshot.trailCells!==0
      || portrait.keyboard.home.snapshot.schedulerFrames!==0 || portrait.keyboard.arrow.snapshot.schedulerFrames!==0 || portrait.keyboard.shiftArrow.snapshot.schedulerFrames!==0 || portrait.keyboard.spaceOff.snapshot.schedulerFrames!==0 || portrait.keyboard.spaceOff.snapshot.revealCells!==0 || portrait.keyboard.spaceOn.snapshot.schedulerFrames!==0 || portrait.keyboard.escape.snapshot.schedulerFrames!==0 || portrait.keyboard.escape.snapshot.revealCells!==0 || portrait.keyboard.settled.schedulerFrames!==0 || portrait.reset.state.schedulerFrames!==0 || portrait.final.snapshot.schedulerFrames!==0
    : !portrait || portrait.reduced!=='false' || !portrait.motion || !portrait.motion.mid || !portrait.motion.settled || !portrait.visibility || portrait.initial.snapshot.reduced!=='false' || portrait.initial.snapshot.activeTime!==0 || portrait.initial.snapshot.schedulerFrames!==0 || portrait.initial.snapshot.running!=='false' || portrait.hover.move.snapshot.trailCells<=0 || portrait.hover.move.snapshot.revealCells<=portrait.hover.enter.snapshot.revealCells
      || !portrait.motion.mid.validation.ok || portrait.motion.mid.snapshot.activeTime-portrait.hover.move.snapshot.activeTime<110 || portrait.motion.mid.snapshot.schedulerFrames<=portrait.hover.move.snapshot.schedulerFrames || portrait.motion.mid.snapshot.running!=='true' || portrait.motion.mid.snapshot.trailCells<=0
      || !portrait.motion.settled.validation.ok || portrait.motion.settled.snapshot.activeTime-portrait.hover.move.snapshot.activeTime<599 || portrait.motion.settled.snapshot.activeTime-portrait.hover.move.snapshot.activeTime>680 || portrait.motion.settled.snapshot.running!=='false' || portrait.motion.settled.snapshot.trailCells!==0 || portrait.motion.settled.snapshot.pointerActive!=='true' || portrait.motion.settled.snapshot.revealChecksum!==portrait.motion.settled.snapshot.targetChecksum
      || portrait.capture.outside.release.snapshot.trailCells<=0 || portrait.capture.outside.settled.snapshot.revealCells!==0 || portrait.capture.outside.settled.snapshot.trailCells!==0
      || !portrait.visibility.leave.transition.ok || !portrait.visibility.leave.validation.ok || portrait.visibility.leave.snapshot.pointerActive!=='false' || portrait.visibility.leave.snapshot.trailCells<=0 || portrait.visibility.leave.snapshot.targetChecksum!=='8121AC45'
      || !portrait.visibility.hidden.validation.ok || portrait.visibility.hidden.snapshot.visible!=='false' || portrait.visibility.hidden.snapshot.running!=='false' || !portrait.visibility.stable.validation.ok || portrait.visibility.hiddenKey!==portrait.visibility.stableKey || portrait.visibility.resumed.visible!=='true' || !portrait.visibility.finished.validation.ok || portrait.visibility.finished.snapshot.running!=='false' || portrait.visibility.finished.snapshot.pointerActive!=='false' || portrait.visibility.finished.snapshot.revealCells!==0 || portrait.visibility.finished.snapshot.trailCells!==0 || portrait.visibility.finished.snapshot.revealChecksum!=='8121AC45' || portrait.visibility.finished.snapshot.targetChecksum!=='8121AC45' || portrait.visibility.finished.snapshot.activeTime-portrait.visibility.leave.snapshot.activeTime<599 || portrait.visibility.finished.snapshot.activeTime-portrait.visibility.leave.snapshot.activeTime>680 || portrait.visibility.finished.snapshot.schedulerFrames<=portrait.visibility.hidden.snapshot.schedulerFrames;
  const portraitFailed=demoId==='ascii-portrait-reveal'&&(portraitCommonFailed||portraitMotionFailed);
  const morph=result.morph;
  const morphCommonFailed=!morph
    || morph.metadata.gridColumns!=='30' || morph.metadata.gridRows!=='16' || morph.metadata.cellCount!=='480' || morph.metadata.glyphRamp!==' .:-=+*#%@' || morph.metadata.cellWidth!=='7' || morph.metadata.cellHeight!=='12' || morph.metadata.fieldWidth!=='210' || morph.metadata.fieldHeight!=='192' || morph.metadata.delayScale!=='8' || morph.metadata.cellDuration!=='400' || morph.metadata.flashStart!=='125' || morph.metadata.flashEnd!=='275' || morph.metadata.flashDuration!=='150' || morph.metadata.autoInterval!=='4000'
    || morph.metadata.figureBuckets!=='266,14,22,4,28,16,14,48,54,14|336,12,12,8,16,16,20,24,20,16' || morph.metadata.figureChangedCells!=='222' || morph.metadata.figureBlankTransitions!=='102' || morph.metadata.figureOccupied!=='214,144' || !/^[0-9A-F]{8},[0-9A-F]{8}$/.test(morph.metadata.figureGlyphChecksums) || !/^[0-9A-F]{8},[0-9A-F]{8}$/.test(morph.metadata.figureValueChecksums)
    || morph.structure.role!=='group' || morph.structure.canvasCount!==1 || morph.structure.canvasRole!=='img' || morph.structure.canvasLabel!=='A skull and diamond morphing through a fixed ASCII glyph field' || morph.structure.rootTabIndex!=='0' || !morph.structure.rootLabel.startsWith('Interactive ASCII figure morph.') || morph.structure.shortcuts!=='ArrowLeft ArrowRight ArrowUp ArrowDown Home Space Enter Escape R' || morph.structure.focusables!==1 || morph.structure.statusLive!=='polite' || morph.structure.statusAtomic!=='true' || morph.structure.headerText!=='INTRX / GLYPH MORPH030x016 · RADIAL' || morph.structure.footerItems!==3
    || morph.structure.rootBackground!=='rgb(10, 10, 11)' || morph.structure.rootColor!=='rgb(236, 236, 239)' || morph.structure.sceneBackground!=='rgb(10, 10, 11)' || morph.structure.sceneBorder!=='1px' || morph.structure.sceneRadius!=='10px' || morph.structure.touchAction!=='pan-y' || !morph.structure.overlayBackground.includes('radial-gradient') || morph.structure.headerFont!==(result.width<=340?'9px':'10px') || morph.structure.footerFont!==(result.width<=340?'9px':'10px')
    || !morph.structure.sceneInside || !morph.structure.canvasInside || Math.abs(morph.structure.sceneWidth-(result.width-20))>.1 || Math.abs(morph.structure.sceneHeight-264)>.1 || morph.structure.canvasClientWidth<210 || morph.structure.canvasClientHeight<192 || Math.abs(morph.structure.fieldOffsetX-(morph.structure.canvasClientWidth-210)/2)>.01 || Math.abs(morph.structure.fieldOffsetY-(morph.structure.canvasClientHeight-192)/2)>.01 || morph.structure.fontSize!==11 || morph.structure.maxGlyphAdvance>7.01 || morph.structure.pixels.total!==morph.structure.canvasWidth*morph.structure.canvasHeight || morph.structure.pixels.ink<1000 || morph.structure.pixels.txt1<500 || morph.structure.pixels.accent!==0 || morph.structure.pixels.outside!==0
    || !morph.initial.staticValidation.ok || morph.initial.staticValidation.rowsChecked!==32 || morph.initial.staticValidation.cellsChecked!==960 || !morph.initial.validation.ok || morph.initial.snapshot.stableFigure!==0 || morph.initial.snapshot.targetFigure!==0 || morph.initial.snapshot.morphing!=='false' || morph.initial.snapshot.currentGlyphChecksum!==morph.metadata.initialGlyphChecksum || morph.initial.snapshot.currentValueChecksum!==morph.metadata.initialValueChecksum || morph.initial.snapshot.delayChecksum!==morph.metadata.initialDelayChecksum || morph.metadata.centerDelayChecksum!==morph.metadata.initialDelayChecksum || morph.initial.snapshot.bucketCounts!=='266,14,22,4,28,16,14,48,54,14' || morph.initial.snapshot.occupiedCells!==214 || morph.initial.snapshot.status!=='' || morph.initial.snapshot.mode!=='MODE / IDLE' || morph.initial.snapshot.figure!=='FIG / SKULL'
    || morph.invalid.right.ignoredInputs!==morph.invalid.before.ignoredInputs+1 || morph.invalid.secondary.ignoredInputs!==morph.invalid.right.ignoredInputs+1 || morph.invalid.repeat.ignoredInputs!==morph.invalid.secondary.ignoredInputs+1 || morph.invalid.repeat.morphTriggers!==morph.invalid.before.morphTriggers || morph.invalid.repeat.currentValueChecksum!==morph.invalid.before.currentValueChecksum
    || !morph.pointer.start.transition.ok || !morph.pointer.start.validation.ok || morph.pointer.start.snapshot.targetFigure!==1 || morph.pointer.start.snapshot.pointerTriggers<1 || morph.pointer.start.snapshot.originX!==80.5 || morph.pointer.start.snapshot.originY!==90 || !morph.pointer.reverse.transition.ok || !morph.pointer.reverse.validation.ok || morph.pointer.reverse.snapshot.targetFigure!==0 || morph.pointer.reverse.snapshot.originX!==175 || morph.pointer.reverse.snapshot.originY!==144 || !morph.pointer.complete.validation.ok || morph.pointer.complete.snapshot.stableFigure!==0 || morph.pointer.complete.snapshot.morphing!=='false'
    || morph.keyboard.home.virtualOriginX!==105 || morph.keyboard.home.virtualOriginY!==96 || morph.keyboard.home.keyboardMoves<1 || morph.keyboard.arrow.virtualOriginX!==112 || morph.keyboard.arrow.virtualOriginY!==96 || morph.keyboard.shiftArrow.virtualOriginX!==112 || morph.keyboard.shiftArrow.virtualOriginY!==132 || !morph.keyboard.space.transition.ok || !morph.keyboard.space.validation.ok || morph.keyboard.space.snapshot.targetFigure!==1 || !morph.keyboard.escape.validation.ok || morph.keyboard.escape.snapshot.morphing!=='false' || morph.keyboard.escape.snapshot.stableFigure!==(morph.reduced==='true'?1:0) || !morph.keyboard.enter.transition.ok || !morph.keyboard.enter.validation.ok || morph.keyboard.enter.snapshot.targetFigure!==(morph.reduced==='true'?0:1) || !morph.keyboard.escapeEnter.validation.ok || morph.keyboard.escapeEnter.snapshot.morphing!=='false' || !morph.keyboard.focused
    || !morph.reset.validation.ok || morph.reset.snapshot.activeTime!==0 || morph.reset.snapshot.schedulerFrames!==0 || morph.reset.snapshot.renderFrames!==1 || morph.reset.snapshot.morphTriggers!==0 || morph.reset.snapshot.completedMorphs!==0 || morph.reset.snapshot.autoTriggers!==0 || morph.reset.snapshot.manualTriggers!==0 || morph.reset.snapshot.pointerTriggers!==0 || morph.reset.snapshot.keyboardTriggers!==0 || morph.reset.snapshot.keyboardMoves!==0 || morph.reset.snapshot.ignoredInputs!==0 || morph.reset.snapshot.cancellations!==0 || morph.reset.snapshot.resets!==1 || morph.reset.snapshot.stableFigure!==0 || morph.reset.snapshot.targetFigure!==0 || morph.reset.snapshot.morphing!=='false' || morph.reset.snapshot.originX!==105 || morph.reset.snapshot.originY!==96 || morph.reset.snapshot.currentGlyphChecksum!==morph.metadata.initialGlyphChecksum || morph.reset.snapshot.currentValueChecksum!==morph.metadata.initialValueChecksum || morph.reset.snapshot.delayChecksum!==morph.metadata.initialDelayChecksum || morph.reset.snapshot.status!=='ASCII morph reset to skull'
    || !morph.final.validation.ok || morph.final.scrollWidth!==morph.final.clientWidth || morph.final.scrollHeight!==morph.final.clientHeight || !morph.final.sceneInside || !morph.final.canvasInside;
  const morphMotionFailed=reducedMotion
    ? !morph || morph.reduced!=='true' || morph.initial.snapshot.running!=='false' || morph.initial.snapshot.activeTime!==0 || morph.initial.snapshot.schedulerFrames!==0 || morph.idle.key!==morph.initialKey || morph.auto.stable.autoTriggers!==0 || morph.auto.stable.activeTime!==0 || morph.visibility.hiddenKey!==morph.visibility.stableKey || morph.pointer.start.snapshot.morphing!=='false' || morph.pointer.start.snapshot.stableFigure!==1 || morph.pointer.start.snapshot.completedMorphs!==1 || morph.pointer.start.snapshot.flashCells!==0 || morph.pointer.reverse.snapshot.morphing!=='false' || morph.pointer.reverse.snapshot.stableFigure!==0 || morph.pointer.reverse.snapshot.completedMorphs!==2 || morph.pointer.reverse.snapshot.flashCells!==0 || morph.keyboard.space.snapshot.morphing!=='false' || morph.keyboard.space.snapshot.stableFigure!==1 || morph.keyboard.space.snapshot.flashCells!==0 || morph.keyboard.enter.snapshot.morphing!=='false' || morph.keyboard.enter.snapshot.stableFigure!==0 || morph.keyboard.enter.snapshot.flashCells!==0 || morph.reset.snapshot.running!=='false' || morph.final.snapshot.schedulerFrames!==0 || morph.reset.key!==morph.reset.stableKey
    : !morph || morph.reduced!=='false' || morph.initial.snapshot.running!=='true' || morph.idle.snapshot.running!=='true' || morph.idle.snapshot.activeTime<=morph.initial.snapshot.activeTime || morph.idle.snapshot.schedulerFrames<=morph.initial.snapshot.schedulerFrames || !morph.auto.started.validation.ok || morph.auto.started.snapshot.autoTriggers!==1 || morph.auto.started.snapshot.lastTriggerSource!=='auto' || morph.auto.started.snapshot.lastTriggerTarget!==1 || morph.auto.started.snapshot.originX!==105 || morph.auto.started.snapshot.originY!==96 || morph.auto.started.snapshot.lastTriggerTime<3990 || morph.auto.started.snapshot.lastTriggerTime>4050 || !morph.auto.mid.validation.ok || morph.auto.mid.snapshot.morphing!=='true' || morph.auto.mid.snapshot.progressMaximum<=0 || morph.auto.mid.snapshot.progressMinimum>=1 || !morph.auto.cancelled.validation.ok || morph.auto.cancelled.snapshot.morphing!=='false' || morph.auto.cancelled.snapshot.stableFigure!==0 || !morph.visibility.hidden.validation.ok || !morph.visibility.stable.validation.ok || !morph.visibility.resumed.validation.ok || morph.visibility.hidden.snapshot.visible!=='false' || morph.visibility.hidden.snapshot.running!=='false' || morph.visibility.hiddenKey!==morph.visibility.stableKey || morph.visibility.resumeBefore.running!=='true' || morph.visibility.resumed.snapshot.activeTime-morph.visibility.hidden.snapshot.activeTime>50.1 || morph.visibility.resumed.snapshot.schedulerFrames<=morph.visibility.hidden.snapshot.schedulerFrames || !morph.pointer.mid.validation.ok || morph.pointer.mid.snapshot.flashCells<=0 || morph.pointer.mid.pixels.accent<=0 || morph.reset.snapshot.running!=='true';
  const morphFailed=demoId==='ascii-morph'&&(morphCommonFailed||morphMotionFailed);
  const typeExplode=result.typeExplode;
  const typeMetadata=typeExplode&&typeExplode.metadata;
  const typeCommonFailed=!typeExplode
    || [typeMetadata.glyphOrder,typeMetadata.glyphWidth,typeMetadata.glyphHeight,typeMetadata.glyphGap,typeMetadata.cap,typeMetadata.maxBannerColumns,typeMetadata.flyRadius,typeMetadata.launchRadiusMinimum,typeMetadata.launchRadiusCap,typeMetadata.launchFormula,typeMetadata.flyDuration,typeMetadata.cellStagger,typeMetadata.glowDuration,typeMetadata.scatterDuration,typeMetadata.gravity,typeMetadata.idleDelay,typeMetadata.waveDuration,typeMetadata.waveTravel,typeMetadata.waveLobe,typeMetadata.waveAmplitude,typeMetadata.ease].join('|')!=='ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789|5|7|1|8|47|80|20|79.999|min(79.999,20+60*sqrt(unit))|350|8|300|400|260|4000|1200|600|600|4|cubic-bezier(.22,1,.36,1)'
    || typeMetadata.mapCellCounts!==typeExplode.initial.staticValidation.counts || typeMetadata.mapChecksum!==typeExplode.initial.staticValidation.mapChecksum || !/^([0-9A-F]{8},){35}[0-9A-F]{8}$/.test(typeMetadata.mapChecksums)
    || typeExplode.structure.role!=='group' || typeExplode.structure.rootLabel!=='Live ASCII banner editor' || typeExplode.structure.canvasCount!==1 || typeExplode.structure.canvasRole!=='img' || typeExplode.structure.canvasLabel!=='Empty 5 by 7 ASCII banner' || typeExplode.structure.focusables!==1
    || [typeExplode.structure.inputType,typeExplode.structure.inputMaxLength,typeExplode.structure.inputPattern,typeExplode.structure.inputPlaceholder,typeExplode.structure.inputSpellcheck,typeExplode.structure.inputAutocomplete,typeExplode.structure.inputAutocapitalize,typeExplode.structure.inputMode].join('|')!=='text|8|[A-Za-z0-9]{0,8}|TYPE|false|off|characters|text'
    || typeExplode.structure.inputLabel!=='ASCII banner text, 0 of eight characters' || typeExplode.structure.statusLive!=='polite' || typeExplode.structure.statusAtomic!=='true' || typeExplode.structure.helpText!=='Letters and digits render above. Backspace scatters the last letter. Escape resets the banner.' || typeExplode.structure.headerText!=='INTRX / TYPE EXPLODE000/008 · IDLE'
    || typeExplode.structure.rootBackground!=='rgb(10, 10, 11)' || typeExplode.structure.rootColor!=='rgb(236, 236, 239)' || typeExplode.structure.stageBackground!=='rgb(10, 10, 11)' || typeExplode.structure.stageBorder!=='1px' || typeExplode.structure.stageRadius!=='10px' || typeExplode.structure.wellBackground!=='rgb(22, 22, 26)' || typeExplode.structure.wellBorder!=='1px' || typeExplode.structure.caretColor!=='rgb(167, 139, 250)' || typeExplode.structure.placeholderColor!=='rgb(92, 92, 102)' || !typeExplode.structure.overlayBackground.includes('radial-gradient') || typeExplode.structure.headerFont!==(result.width<=340?'9px':'10px')
    || !typeExplode.structure.stageInside || !typeExplode.structure.canvasInside || !typeExplode.structure.wellInside || Math.abs(typeExplode.structure.stageWidth-(result.width-20))>.1 || Math.abs(typeExplode.structure.stageHeight-236)>.1 || typeExplode.structure.canvasClientWidth!==typeExplode.structure.stageWidth-2 || typeExplode.structure.canvasClientHeight!==234 || typeExplode.structure.canvasWidth!==Math.round(typeExplode.structure.canvasClientWidth*typeExplode.structure.dpr) || typeExplode.structure.canvasHeight!==Math.round(typeExplode.structure.canvasClientHeight*typeExplode.structure.dpr) || typeExplode.structure.baselinePixels.total!==typeExplode.structure.canvasWidth*typeExplode.structure.canvasHeight || typeExplode.structure.baselinePixels.ink!==0
    || !typeExplode.initial.staticValidation.ok || typeExplode.initial.staticValidation.glyphsChecked!==36 || typeExplode.initial.staticValidation.cellsChecked!==1260 || !typeExplode.initial.validation.ok || typeExplode.initial.snapshot.text!=='' || typeExplode.initial.snapshot.liveCellCount!==0 || typeExplode.initial.snapshot.scatterCellCount!==0 || typeExplode.initial.snapshot.readout!=='000/008 · IDLE' || typeExplode.initial.snapshot.canvasLabel!=='Empty 5 by 7 ASCII banner' || !typeExplode.idle.validation.ok
    || typeExplode.focus.before || typeExplode.focus.secondary || !typeExplode.focus.primary || typeExplode.focus.snapshot.inputFocused!=='true' || typeExplode.focus.wellBorder!=='rgb(167, 139, 250)' || typeExplode.focus.wellShadow==='none'
    || !typeExplode.invalid.punctuation.validation.ok || typeExplode.invalid.ignoredDelta!==1 || !typeExplode.invalid.modifierUnchanged || !typeExplode.invalid.compositionKeyUnchanged
    || !typeExplode.appendA.transition.ok || !typeExplode.appendA.validation.ok || typeExplode.appendA.snapshot.text!=='A' || typeExplode.appendA.snapshot.appendEvents!==1 || typeExplode.appendA.snapshot.insertionSerial!==1 || !typeExplode.stagger.validation.ok || !typeExplode.visibility.hidden.validation.ok || !typeExplode.visibility.hiddenStable.validation.ok || typeExplode.visibility.hidden.snapshot.visible!=='false' || typeExplode.visibility.hidden.snapshot.running!=='false' || typeExplode.visibility.hidden.freeze!==typeExplode.visibility.hiddenStable.freeze || !typeExplode.visibility.resumed.validation.ok || (!reducedMotion&&typeExplode.visibility.resumed.snapshot.visible!=='true') || (reducedMotion&&typeExplode.resetPrelude.snapshot.visible!=='true')
    || !typeExplode.landing.validation.ok || !typeExplode.settledA.validation.ok || typeExplode.settledA.snapshot.text!=='A' || typeExplode.settledA.snapshot.waitingCells!==0 || typeExplode.settledA.snapshot.flyingCells!==0 || typeExplode.settledA.snapshot.glowCells!==0 || typeExplode.settledA.snapshot.stableCells!==typeExplode.settledA.snapshot.liveCellCount || typeExplode.settledA.pixels.ink<=0
    || !typeExplode.beforeInput.transition.ok || !typeExplode.beforeInput.validation.ok || typeExplode.beforeInput.snapshot.text!=='A1' || !typeExplode.paste.validation.ok || typeExplode.paste.snapshot.text!=='A1B2' || typeExplode.paste.appendDelta!==2 || typeExplode.paste.serialDelta!==2 || typeExplode.paste.pasteDelta!==1 || typeExplode.paste.added!==typeExplode.paste.expectedAdded
    || typeExplode.composition.started.snapshot.text!=='A1B2' || typeExplode.composition.started.snapshot.composing!=='true' || typeExplode.composition.started.snapshot.starts!==1 || !typeExplode.composition.started.unchanged || typeExplode.composition.interim.text!=='A1B2' || !typeExplode.composition.interim.inputValue.endsWith('z') || typeExplode.composition.interim.composing!=='true' || !typeExplode.composition.interim.unchanged
    || !typeExplode.composition.committed.transition.ok || !typeExplode.composition.committed.validation.ok || typeExplode.composition.committed.snapshot.text!=='A1B2Z' || typeExplode.composition.committed.snapshot.composing!=='false' || typeExplode.composition.committed.snapshot.suppressCompositionInput!=='true' || typeExplode.composition.committed.snapshot.compositionCommits!==1 || !typeExplode.composition.duplicate.unchanged || !typeExplode.composition.duplicate.validation.ok || typeExplode.composition.duplicate.snapshot.suppressCompositionInput!=='false'
    || !typeExplode.reconcile.validation.ok || typeExplode.reconcile.snapshot.text!=='A1B2ZC3D' || typeExplode.reconcile.snapshot.textLength!==8 || typeExplode.reconcile.snapshot.bannerColumns!==47 || typeExplode.reconcile.inputDelta!==1 || typeExplode.reconcile.reconcileDelta!==1 || typeExplode.reconcile.appendDelta!==3 || typeExplode.reconcile.serialDelta!==3 || !typeExplode.capAttempt.unchanged || typeExplode.capAttempt.ignoredDelta!==1 || !typeExplode.capAttempt.validation.ok || typeExplode.capAttempt.snapshot.status!=='Eight character maximum reached'
    || !typeExplode.full.validation.ok || typeExplode.full.snapshot.text!=='A1B2ZC3D' || typeExplode.full.snapshot.bannerColumns!==47 || typeExplode.full.snapshot.fieldWidth>typeExplode.full.snapshot.canvasClientWidth || typeExplode.full.snapshot.layoutOffsetX<0 || typeExplode.full.snapshot.layoutOffsetY<0 || typeExplode.full.pixels.ink<=0
    || !typeExplode.scatter.start.transition.ok || !typeExplode.scatter.start.validation.ok || typeExplode.scatter.start.snapshot.text!=='A1B2ZC3' || typeExplode.scatter.start.transition.removed<=0 || typeExplode.scatter.start.transition.physicsErrors!==0 || !typeExplode.scatter.mid.validation.ok || !typeExplode.scatter.complete.validation.ok || typeExplode.scatter.complete.snapshot.scatterCellCount!==0
    || !typeExplode.resetPrelude.validation.ok || typeExplode.resetPrelude.appendDelta!==1 || typeExplode.resetPrelude.snapshot.text!=='A1B2ZC39' || !typeExplode.reset.validation.ok || [typeExplode.reset.snapshot.text,typeExplode.reset.snapshot.liveCellCount,typeExplode.reset.snapshot.scatterCellCount,typeExplode.reset.snapshot.activeTime,typeExplode.reset.snapshot.insertionSerial,typeExplode.reset.snapshot.schedulerFrames,typeExplode.reset.snapshot.renderFrames,typeExplode.reset.snapshot.appendEvents,typeExplode.reset.snapshot.deleteEvents,typeExplode.reset.snapshot.waveTriggers,typeExplode.reset.snapshot.completedWaves,typeExplode.reset.snapshot.resets].join('|')!=='|0|0|0|0|0|1|0|0|0|0|1' || typeExplode.reset.snapshot.source!=='inspect reset' || typeExplode.reset.snapshot.lastInputSource!=='inspect reset' || typeExplode.reset.snapshot.status!=='ASCII banner reset' || typeExplode.reset.pixels.ink!==0 || !typeExplode.reset.stable.validation.ok
    || typeExplode.cleanup.before.cleaned!=='false' || typeExplode.cleanup.after.cleaned!=='true' || typeExplode.cleanup.after.running!=='false' || typeExplode.cleanup.after.source!=='cleanup' || typeExplode.cleanup.key!==typeExplode.cleanup.stableKey || !typeExplode.cleanup.detached
    || !typeExplode.final.validation.ok || typeExplode.final.snapshot.text!=='TYPE' || typeExplode.final.snapshot.textLength!==4 || typeExplode.final.snapshot.appendEvents!==4 || typeExplode.final.snapshot.insertionSerial!==4 || typeExplode.final.snapshot.resets!==1 || typeExplode.final.snapshot.waitingCells!==0 || typeExplode.final.snapshot.flyingCells!==0 || typeExplode.final.snapshot.glowCells!==0 || typeExplode.final.snapshot.stableCells!==typeExplode.final.snapshot.liveCellCount || typeExplode.final.snapshot.readout!=='004/008 · IDLE' || typeExplode.final.snapshot.canvasLabel!=='5 by 7 ASCII banner reading TYPE' || typeExplode.final.appendDelta!==4 || typeExplode.final.pixels.ink<=0 || typeExplode.final.scrollWidth!==typeExplode.final.clientWidth || typeExplode.final.scrollHeight!==typeExplode.final.clientHeight || !typeExplode.final.stageInside || !typeExplode.final.canvasInside || !typeExplode.final.wellInside;
  const typeMotionFailed=reducedMotion
    ? !typeExplode || typeExplode.reduced!=='true' || typeExplode.initial.snapshot.reduced!=='true' || typeExplode.initial.snapshot.activeTime!==0 || typeExplode.initial.snapshot.schedulerFrames!==0 || typeExplode.initial.snapshot.running!=='false' || typeExplode.initialFreeze!==typeExplode.idle.freeze
      || typeExplode.appendA.snapshot.activeTime!==0 || typeExplode.appendA.snapshot.schedulerFrames!==0 || typeExplode.appendA.snapshot.waitingCells!==0 || typeExplode.appendA.snapshot.flyingCells!==0 || typeExplode.appendA.snapshot.glowCells!==0 || typeExplode.appendA.snapshot.stableCells!==typeExplode.appendA.snapshot.liveCellCount || typeExplode.appendA.pixels.ink<=0
      || typeExplode.visibility.hidden.snapshot.activeTime!==0 || typeExplode.visibility.hidden.snapshot.schedulerFrames!==0 || typeExplode.visibility.resumed.snapshot.activeTime!==0 || typeExplode.visibility.resumed.snapshot.schedulerFrames!==0 || typeExplode.visibility.resumed.snapshot.running!=='false' || typeExplode.resetPrelude.snapshot.visible!=='true'
      || typeExplode.scatter.start.snapshot.scatterCellCount!==0 || typeExplode.scatter.start.transition.expectedScatter!==0 || typeExplode.scatter.mid.snapshot.scatterCellCount!==0
      || typeExplode.wave.before.activeTime!==0 || typeExplode.wave.before.schedulerFrames!==0 || typeExplode.wave.before.waveTriggers!==0 || typeExplode.wave.key!==typeExplode.wave.afterKey || typeExplode.wave.after.activeTime!==0 || typeExplode.wave.after.schedulerFrames!==0 || typeExplode.wave.after.waveTriggers!==0 || typeExplode.wave.after.completedWaves!==0 || !typeExplode.wave.validation.ok
      || typeExplode.reset.snapshot.running!=='false' || typeExplode.reset.stable.snapshot.activeTime!==0 || typeExplode.reset.stable.snapshot.schedulerFrames!==0 || typeExplode.final.snapshot.activeTime!==0 || typeExplode.final.snapshot.schedulerFrames!==0 || typeExplode.final.snapshot.running!=='false'
    : !typeExplode || typeExplode.reduced!=='false' || typeExplode.initial.snapshot.reduced!=='false' || typeExplode.initial.snapshot.running!=='true' || typeExplode.idle.snapshot.activeTime<=typeExplode.initial.snapshot.activeTime || typeExplode.idle.snapshot.schedulerFrames<=typeExplode.initial.snapshot.schedulerFrames || typeExplode.initialFreeze===typeExplode.idle.freeze
      || typeExplode.appendA.snapshot.waitingCells<=0 || typeExplode.appendA.snapshot.flyingCells<=0 || typeExplode.stagger.snapshot.waitingCells<=0 || typeExplode.stagger.snapshot.flyingCells<=0 || typeExplode.stagger.pixels.ink<=0
      || typeExplode.visibility.resumed.snapshot.running!=='true' || typeExplode.visibility.resumed.snapshot.schedulerFrames<=typeExplode.visibility.hidden.snapshot.schedulerFrames || typeExplode.visibility.resumed.snapshot.activeTime-typeExplode.visibility.hidden.snapshot.activeTime>50.1
      || typeExplode.landing.snapshot.glowCells<=0 || typeExplode.landing.pixels.ink<=0 || typeExplode.settledA.snapshot.activeTime<=typeExplode.landing.snapshot.activeTime
      || typeExplode.scatter.start.snapshot.scatterCellCount!==typeExplode.scatter.start.transition.removed || typeExplode.scatter.start.transition.expectedScatter!==typeExplode.scatter.start.transition.removed || typeExplode.scatter.mid.snapshot.scatterCellCount!==typeExplode.scatter.start.snapshot.scatterCellCount || typeExplode.scatter.mid.progressMinimum<.43 || typeExplode.scatter.mid.progressMaximum>.58 || typeExplode.scatter.mid.pixels.checksum===typeExplode.scatter.start.pixels.checksum || typeExplode.scatter.complete.pixels.checksum===typeExplode.scatter.mid.pixels.checksum
      || !typeExplode.wave.started.validation.ok || typeExplode.wave.started.snapshot.waving!=='true' || typeExplode.wave.started.snapshot.waveTriggers!==1 || typeExplode.wave.started.snapshot.completedWaves!==0 || Math.abs(typeExplode.wave.started.snapshot.waveStart-typeExplode.wave.started.snapshot.nextWaveAt)>.001 || Math.abs(typeExplode.wave.started.snapshot.waveStart-typeExplode.wave.started.snapshot.lastActivity-4000)>.001
      || !typeExplode.wave.mid.validation.ok || typeExplode.wave.mid.snapshot.waving!=='true' || typeExplode.wave.mid.snapshot.waveElapsed<550 || typeExplode.wave.mid.snapshot.waveElapsed>650 || typeExplode.wave.mid.nonZero<=0 || typeExplode.wave.mid.minimum>-3.8 || typeExplode.wave.mid.maximum>=0 || typeExplode.wave.mid.pixels.checksum===typeExplode.scatter.complete.pixels.checksum
      || !typeExplode.wave.completed.validation.ok || typeExplode.wave.completed.snapshot.waving!=='false' || typeExplode.wave.completed.snapshot.waveTriggers!==1 || typeExplode.wave.completed.snapshot.completedWaves!==1 || typeExplode.wave.completed.snapshot.liveWaveChecksum!==typeExplode.scatter.complete.snapshot.liveWaveChecksum || typeExplode.wave.completed.pixels.checksum!==typeExplode.scatter.complete.pixels.checksum
      || typeExplode.reset.snapshot.running!=='true' || typeExplode.reset.stable.snapshot.activeTime<=typeExplode.reset.snapshot.activeTime || typeExplode.reset.stable.snapshot.schedulerFrames<=typeExplode.reset.snapshot.schedulerFrames || typeExplode.final.snapshot.running!=='true' || typeExplode.final.snapshot.schedulerFrames<=0;
  const typeFailed=demoId==='ascii-type-explode'&&(typeCommonFailed||typeMotionFailed);
  const terminalWindow=result.terminalWindow,terminalMetadata=terminalWindow&&terminalWindow.metadata,terminalStructure=terminalWindow&&terminalWindow.structure,terminalInitial=terminalWindow&&terminalWindow.initial,terminalTabs=terminalWindow&&terminalWindow.tabFlow,terminalDrag=terminalWindow&&terminalWindow.dragFlow,terminalReset=terminalWindow&&terminalWindow.reset,terminalLoop=terminalWindow&&terminalWindow.loop;
  const nearNumber=(actual,expected,tolerance)=>Math.abs(Number(actual)-Number(expected))<=tolerance;
  const terminalExpectedCommands=[
    {command:'pwd',outputs:['/workspaces/intrx','branch / interaction-lab']},
    {command:'ls interactions/',outputs:['ascii/  fui/  motion/','288 demos indexed']},
    {command:'npm run build',spinner:true,outputs:['10 frames rendered','build complete / 0 errors']},
    {command:'git status --short',outputs:['M  motion/terminal-window.js','checks / deterministic']},
    {command:'node verify.js',outputs:['registry ........ ok','motion ......... ok','ready / 288 demos']}
  ],terminalExpectedSpinner=['[|]','[/]','[-]','[\\]','[|]','[/]','[-]','[\\]','[|]','[/]'],terminalExpectedHistory=terminalExpectedCommands.flatMap((command,index)=>[command.command].concat(index===2?['[ok] 10 frames / 2.00s']:[],command.outputs));
  const terminalChecksums=terminalInitial&&terminalInitial.raw&&terminalInitial.raw.checksums;
  const terminalNormalizedConfigCommands=terminalMetadata&&(terminalMetadata.commands||[]).map(item=>{const copy={command:item.command};if(item.spinner)copy.spinner=true;copy.outputs=(item.outputs||[]).slice();return copy});
  const terminalCommonFailed=!terminalWindow
    || !terminalMetadata || [terminalMetadata.typingBase,terminalMetadata.typingJitter,terminalMetadata.typingMin,terminalMetadata.typingMax,terminalMetadata.outputDuration,terminalMetadata.pauseDuration,terminalMetadata.spinnerDuration,terminalMetadata.spinnerFrameDuration,terminalMetadata.spinnerFrames&&terminalMetadata.spinnerFrames.length,terminalMetadata.cursorBlink,terminalMetadata.crossfadeDuration,terminalMetadata.dragLerp,terminalMetadata.releaseDecay,terminalMetadata.maxReleaseSpeed,terminalMetadata.commandsBeforeClear,terminalMetadata.maxDelta].join('|')!=='35|20|15|55|300|900|2000|200|10|530|150|0.15|0.88|420|5|50'
    || JSON.stringify(terminalNormalizedConfigCommands)!==JSON.stringify(terminalExpectedCommands) || JSON.stringify(terminalMetadata.spinnerFrames)!==JSON.stringify(terminalExpectedSpinner) || JSON.stringify(terminalWindow.fixtures.commands)!==JSON.stringify(terminalExpectedCommands) || JSON.stringify(terminalWindow.fixtures.spinner)!==JSON.stringify(terminalExpectedSpinner) || !/^[0-9A-F]{8}$/.test(terminalWindow.fixtures.checksum)
    || terminalStructure.tag!=='DIV' || terminalStructure.role!=='region' || terminalStructure.rootLabel!=='Interactive scripted terminal window' || terminalStructure.shellTag!=='SECTION' || terminalStructure.shellRole!==null || terminalStructure.shellLabel!=='intrx zsh terminal' || terminalStructure.titlebarRole!=='toolbar' || terminalStructure.titlebarTabIndex!=='0' || !/Drag terminal window/.test(terminalStructure.titlebarLabel||'') || terminalStructure.titlebarShortcuts!=='ArrowLeft ArrowRight ArrowUp ArrowDown Escape' || terminalStructure.title!=='intrx \u2014 zsh'
    || terminalStructure.stageCount!==1 || terminalStructure.shellCount!==1 || terminalStructure.dotCount!==3 || terminalStructure.dotSizes.some(size=>Math.abs(size[0]-10)>.1||Math.abs(size[1]-10)>.1) || terminalStructure.dotColors.join('|')!=='rgb(248, 113, 113)|rgb(251, 191, 36)|rgb(74, 222, 128)' || terminalStructure.dotOpacities.join('|')!=='0.6|0.6|0.6'
    || terminalStructure.tabCount!==2 || terminalStructure.tabListRole!=='tablist' || terminalStructure.tabRoles.some(role=>role!=='tab') || terminalStructure.tabSelected.join('|')!=='true|false' || terminalStructure.tabIndices.join('|')!=='0|-1' || terminalStructure.tabControls.some(value=>!value) || terminalStructure.panelCount!==2 || terminalStructure.panelRoles.some(role=>role!=='tabpanel') || terminalStructure.panelLabels.some(value=>!value)
    || terminalStructure.statusLive!=='polite' || terminalStructure.statusAtomic!=='true' || terminalStructure.focusables!==3 || terminalStructure.prompt!=='\u279c intrx'
    || terminalStructure.shellBackground!=='rgb(16, 16, 18)' || terminalStructure.shellRadius!=='4px' || terminalStructure.shellBorder!=='1px' || terminalStructure.bodyFontSize!=='12px' || !terminalStructure.bodyFontFamily.includes('JetBrains Mono') || terminalStructure.titlebarTouchAction!=='none' || terminalStructure.titlebarCursor!=='grab' || terminalStructure.inactiveTabBackground!=='rgb(10, 10, 11)' || terminalStructure.inactiveTabColor!=='rgb(92, 92, 102)'
    || !terminalStructure.geometry.shellInside || !terminalStructure.geometry.bodyInside || Math.abs(terminalStructure.geometry.stage.width-result.width)>.1 || Math.abs(terminalStructure.geometry.stage.height-320)>.1 || terminalStructure.geometry.shell.width<terminalStructure.geometry.stage.width*.8 || terminalStructure.geometry.shell.width>terminalStructure.geometry.stage.width*.87 || Math.abs(terminalStructure.geometry.shell.height-244)>.1 || terminalStructure.geometry.scrollWidth!==terminalStructure.geometry.clientWidth || Math.abs(terminalStructure.geometry.maxX-Number(terminalInitial.raw.drag.maxX))>.51 || Math.abs(terminalStructure.geometry.maxY-Number(terminalInitial.raw.drag.maxY))>.51 || !nearNumber(terminalInitial.raw.drag.currentX,Number(terminalInitial.raw.drag.maxX)/2,.001) || !nearNumber(terminalInitial.raw.drag.currentY,Number(terminalInitial.raw.drag.maxY)/2,.001) || !nearNumber(terminalInitial.raw.drag.targetX,terminalInitial.raw.drag.currentX,.001) || !nearNumber(terminalInitial.raw.drag.targetY,terminalInitial.raw.drag.currentY,.001) || terminalStructure.paint.nodes<12 || !terminalStructure.paint.shellCenterHit || !/^[0-9A-F]{8}$/.test(terminalStructure.paint.checksum) || !/^[0-9A-F]{8}$/.test(terminalStructure.paint.textChecksum)
    || !terminalInitial.frozen || !terminalInitial.validation.ok || !terminalInitial.validation.config.ok || terminalInitial.validation.config.delayCount!==69 || terminalInitial.raw.state.phase!=='waiting' || Number(terminalInitial.raw.state.cycle)!==0 || terminalInitial.raw.state.typedText!==''
    || !terminalChecksums || !/^[0-9A-F]{8}$/i.test(terminalChecksums.commandChecksum) || !/^[0-9A-F]{8}$/i.test(terminalChecksums.scheduleChecksum) || !/^[0-9A-F]{8}$/i.test(terminalChecksums.historyChecksum) || !/^[0-9A-F]{8}$/i.test(terminalChecksums.spinnerChecksum)
    || !terminalTabs || !terminalTabs.immediate.validation.ok || !terminalTabs.mid.validation.ok || !terminalTabs.complete.validation.ok || !terminalTabs.keyboard.validation.ok || Number(terminalTabs.before.tabs.active)!==0 || Number(terminalTabs.immediate.raw.counters.tabSwitches)!==Number(terminalTabs.initialSwitches)+1 || Number(terminalTabs.complete.raw.tabs.active)!==1 || terminalTabs.complete.selected.join('|')!=='false|true' || Number(terminalTabs.keyboard.raw.tabs.active)!==0 || terminalTabs.keyboard.selected.join('|')!=='true|false' || !terminalTabs.keyboard.focused || Number(terminalTabs.keyboard.raw.counters.tabSwitches)!==Number(terminalTabs.initialSwitches)+2 || Number(terminalTabs.keyboard.raw.counters.keyboardTabSwitches)!==1
    || !terminalDrag || !terminalDrag.down.validation.ok || !terminalDrag.clamped.validation.ok || !terminalDrag.lerpStart.validation.ok || !terminalDrag.lerpMid.validation.ok || !terminalDrag.released.validation.ok || !terminalDrag.coast.validation.ok || !terminalDrag.cancelled.validation.ok || terminalDrag.down.raw.drag.dragging!==true || Number(terminalDrag.down.raw.drag.pointerId)!==71 || typeof terminalDrag.down.raw.drag.captured!=='boolean' || Number(terminalDrag.down.raw.counters.pointerDowns)!==Number(terminalDrag.before.counters.pointerDowns)+1
    || Number(terminalDrag.mismatch.counters.ignoredPointers)!==Number(terminalDrag.down.raw.counters.ignoredPointers) || Number(terminalDrag.mismatch.counters.pointerMoves)!==Number(terminalDrag.down.raw.counters.pointerMoves) || !nearNumber(terminalDrag.mismatch.drag.targetX,terminalDrag.down.raw.drag.targetX,.001) || !nearNumber(terminalDrag.mismatch.drag.targetY,terminalDrag.down.raw.drag.targetY,.001) || Number(terminalDrag.secondary.counters.ignoredPointers)!==Number(terminalDrag.mismatch.counters.ignoredPointers)+1 || !nearNumber(terminalDrag.clamped.raw.drag.targetX,terminalDrag.clamped.raw.drag.maxX,.001) || !nearNumber(terminalDrag.clamped.raw.drag.targetY,terminalDrag.clamped.raw.drag.maxY,.001) || !nearNumber(terminalDrag.lerpStart.raw.drag.targetX,Number(terminalDrag.lerpStart.raw.drag.maxX)*.62,.01) || !nearNumber(terminalDrag.lerpStart.raw.drag.targetY,Number(terminalDrag.lerpStart.raw.drag.maxY)*.48,.01)
    || terminalDrag.released.raw.drag.dragging!==false || terminalDrag.released.raw.drag.pointerId!==null || terminalDrag.released.raw.drag.captured!==false || terminalDrag.released.nativeCapture!==false || Number(terminalDrag.released.raw.counters.pointerReleases)!==Number(terminalDrag.down.raw.counters.pointerReleases)+1 || Math.abs(Number(terminalDrag.released.raw.drag.velocityX))>420.001 || Math.abs(Number(terminalDrag.released.raw.drag.velocityY))>420.001
    || terminalDrag.cancelled.raw.drag.dragging!==false || terminalDrag.cancelled.raw.drag.coasting!==false || terminalDrag.cancelled.raw.drag.pointerId!==null || terminalDrag.cancelled.raw.drag.captured!==false || terminalDrag.cancelled.nativeCapture!==false || Math.abs(Number(terminalDrag.cancelled.raw.drag.velocityX))>.001 || Math.abs(Number(terminalDrag.cancelled.raw.drag.velocityY))>.001 || Number(terminalDrag.cancelled.raw.counters.pointerCancels)!==Number(terminalDrag.released.raw.counters.pointerCancels)+1
    || !terminalDrag.keyboard.left.validation.ok || !terminalDrag.keyboard.down.validation.ok || !nearNumber(terminalDrag.keyboard.left.raw.drag.targetX,terminalDrag.keyboard.left.expectedTargetX,.001) || !nearNumber(terminalDrag.keyboard.down.raw.drag.targetY,terminalDrag.keyboard.down.expectedTargetY,.001) || Number(terminalDrag.keyboard.left.raw.counters.keyboardMoves)!==Number(terminalDrag.keyboard.before.counters.keyboardMoves)+1 || Number(terminalDrag.keyboard.down.raw.counters.keyboardMoves)!==Number(terminalDrag.keyboard.before.counters.keyboardMoves)+2 || terminalDrag.keyboard.left.raw.state.source!=='keyboard left' || terminalDrag.keyboard.down.raw.state.source!=='keyboard down' || !terminalDrag.keyboard.down.focused
    || !terminalWindow.visibility.hidden.validation.ok || !terminalWindow.visibility.hiddenStable.validation.ok || !terminalWindow.visibility.resumed.validation.ok || terminalWindow.visibility.hidden.raw.lifecycle.visible!==false || terminalWindow.visibility.hidden.raw.lifecycle.running!==false || terminalWindow.visibility.hidden.key!==terminalWindow.visibility.hiddenStable.key || terminalWindow.visibility.resumed.raw.lifecycle.visible!==true || Number(terminalWindow.visibility.resumed.raw.state.activeTime)-Number(terminalWindow.visibility.hidden.raw.state.activeTime)>50.1
    || !terminalWindow.resize.before.validation.ok || !terminalWindow.resize.narrow.validation.ok || !terminalWindow.resize.restored.validation.ok || terminalWindow.resize.before.geometry.stage.width-terminalWindow.resize.narrow.geometry.stage.width<30 || Math.abs(terminalWindow.resize.restored.geometry.stage.width-terminalWindow.resize.before.geometry.stage.width)>.1 || Math.abs(terminalWindow.resize.narrow.geometry.maxX-Number(terminalWindow.resize.narrow.raw.drag.maxX))>.51 || Math.abs(terminalWindow.resize.narrow.geometry.maxY-Number(terminalWindow.resize.narrow.raw.drag.maxY))>.51 || Math.abs(terminalWindow.resize.restored.geometry.maxX-Number(terminalWindow.resize.restored.raw.drag.maxX))>.51 || Math.abs(terminalWindow.resize.restored.geometry.maxY-Number(terminalWindow.resize.restored.raw.drag.maxY))>.51 || Number(terminalWindow.resize.narrow.raw.counters.resizeEvents)<=Number(terminalWindow.resize.before.raw.counters.resizeEvents) || Number(terminalWindow.resize.restored.raw.counters.resizeEvents)<=Number(terminalWindow.resize.narrow.raw.counters.resizeEvents)
    || !terminalReset.validation.ok || !terminalReset.validation.config.ok || Number(terminalReset.raw.state.cycle)!==0 || terminalReset.raw.state.phase!=='waiting' || terminalReset.raw.state.typedText!=='' || Number(terminalReset.raw.counters.resets)!==1 || !terminalReset.focused
    || !terminalWindow.cleanup.deterministic || terminalWindow.cleanup.before.cleaned!==false || terminalWindow.cleanup.after.cleaned!==true || terminalWindow.cleanup.after.running!==false || Number(terminalWindow.cleanup.after.frameId)!==0 || terminalWindow.cleanup.after.dragging!==false || terminalWindow.cleanup.after.captured!==false || terminalWindow.cleanup.key!==terminalWindow.cleanup.stableKey || !terminalWindow.cleanup.detached
    || !terminalWindow.final.validation.ok || terminalWindow.final.scrollWidth!==terminalWindow.final.clientWidth || terminalWindow.final.scrollHeight!==terminalWindow.final.clientHeight || !terminalWindow.final.geometry.shellInside || !terminalWindow.final.geometry.bodyInside || terminalWindow.final.geometry.scrollWidth!==terminalWindow.final.geometry.clientWidth || !terminalWindow.final.paint.shellCenterHit;
  const terminalMotionFailed=reducedMotion
    ? !terminalWindow || terminalWindow.reduced!=='true' || terminalWindow.loop!==null || !terminalWindow.reducedStable || terminalInitial.raw.lifecycle.reduced!==true || terminalInitial.raw.lifecycle.running!==false || Number(terminalInitial.raw.counters.schedulerFrames)!==0 || Number(terminalInitial.raw.state.activeTime)!==0 || Number(terminalInitial.raw.state.commandIndex)!==5 || terminalInitial.raw.state.pendingClear!==true
      || Number(terminalReset.raw.state.commandIndex)!==5 || terminalReset.raw.state.pendingClear!==true || Number(terminalReset.raw.state.spinnerIndex)!==9 || terminalReset.raw.state.spinnerVisited.join(',')!=='0,1,2,3,4,5,6,7,8,9' || Number(terminalReset.raw.counters.commandsExecuted)!==5 || Number(terminalReset.raw.counters.outputLines)!==11 || Number(terminalReset.raw.counters.spinnerRuns)!==1 || Number(terminalReset.raw.counters.spinnerFramesRendered)!==10 || Number(terminalReset.raw.counters.clearCommands)!==0 || Number(terminalReset.raw.counters.loops)!==0 || Number(terminalReset.raw.counters.schedulerFrames)!==0 || Number(terminalReset.raw.state.activeTime)!==0 || terminalReset.raw.lifecycle.running!==false || JSON.stringify(terminalReset.raw.history.map(entry=>entry.text))!==JSON.stringify(terminalExpectedHistory)
      || terminalWindow.reducedStable.key!==terminalWindow.reducedStable.afterKey || !terminalWindow.reducedStable.validation.ok || Number(terminalWindow.reducedStable.after.counters.schedulerFrames)!==0 || Number(terminalWindow.reducedStable.after.state.activeTime)!==0 || !terminalWindow.reducedStable.cursor || terminalWindow.reducedStable.cursor.display==='none' || terminalWindow.reducedStable.cursor.visibility==='hidden' || terminalWindow.reducedStable.cursor.opacity<=0 || terminalWindow.reducedStable.cursor.animationDuration!=='0s' || terminalWindow.reducedStable.cursor.animationName!=='none'
      || terminalTabs.immediate.raw.tabs.transitioning!==false || Number(terminalTabs.immediate.raw.tabs.active)!==1 || Number(terminalTabs.immediate.raw.tabs.progress)!==1 || terminalTabs.immediate.opacities.join('|')!=='0|1' || terminalTabs.keyboard.raw.tabs.transitioning!==false || Number(terminalTabs.keyboard.raw.tabs.active)!==0 || terminalTabs.keyboard.opacities.join('|')!=='1|0'
      || terminalDrag.lerpMid.errorX>.001 || terminalDrag.lerpMid.errorY>.001 || !nearNumber(terminalDrag.lerpMid.raw.drag.currentX,terminalDrag.lerpMid.raw.drag.targetX,.001) || !nearNumber(terminalDrag.lerpMid.raw.drag.currentY,terminalDrag.lerpMid.raw.drag.targetY,.001) || terminalDrag.released.raw.drag.coasting!==false || Math.abs(Number(terminalDrag.released.raw.drag.velocityX))>.001 || Math.abs(Number(terminalDrag.released.raw.drag.velocityY))>.001 || !nearNumber(terminalDrag.keyboard.left.raw.drag.currentX,terminalDrag.keyboard.left.raw.drag.targetX,.001) || !nearNumber(terminalDrag.keyboard.down.raw.drag.currentY,terminalDrag.keyboard.down.raw.drag.targetY,.001) || terminalWindow.visibility.resumed.raw.lifecycle.running!==false
    : !terminalWindow || terminalWindow.reduced!=='false' || terminalWindow.reducedStable!==null || !terminalLoop || terminalInitial.raw.lifecycle.reduced!==false || terminalInitial.raw.lifecycle.running!==true || Number(terminalInitial.raw.counters.schedulerFrames)<=0 || Number(terminalInitial.raw.state.activeTime)<=0 || Number(terminalInitial.raw.state.commandIndex)!==0 || terminalInitial.raw.state.pendingClear!==false
      || terminalTabs.immediate.raw.tabs.transitioning!==true || Number(terminalTabs.immediate.raw.tabs.from)!==0 || Number(terminalTabs.immediate.raw.tabs.to)!==1 || Number(terminalTabs.immediate.raw.tabs.progress)!==0 || terminalTabs.mid.raw.tabs.transitioning!==true || Number(terminalTabs.mid.raw.tabs.progress)<.35 || Number(terminalTabs.mid.raw.tabs.progress)>=1 || terminalTabs.mid.opacities.some(value=>value<=0||value>=1) || Math.abs(terminalTabs.mid.opacities[0]+terminalTabs.mid.opacities[1]-1)>.06 || terminalTabs.complete.raw.tabs.transitioning!==false || Number(terminalTabs.complete.raw.tabs.progress)!==1 || Number(terminalTabs.complete.raw.state.activeTime)-Number(terminalTabs.immediate.raw.tabs.start)<150 || Number(terminalTabs.complete.raw.state.activeTime)-Number(terminalTabs.immediate.raw.tabs.start)>200.1
      || terminalDrag.lerpMid.steps<4 || terminalDrag.lerpMid.errorX>.08 || terminalDrag.lerpMid.errorY>.08 || terminalDrag.released.raw.drag.coasting!==true || terminalDrag.coast.elapsed<130 || terminalDrag.coast.velocityErrorX>.8 || terminalDrag.coast.velocityErrorY>.8 || !terminalDrag.coast.integrationX || !terminalDrag.coast.integrationY || terminalWindow.visibility.resumed.raw.lifecycle.running!==true
      || Number(terminalReset.raw.state.commandIndex)!==0 || terminalReset.raw.state.pendingClear!==false || Number(terminalReset.raw.counters.commandsExecuted)!==0 || Number(terminalReset.raw.counters.outputLines)!==0 || Number(terminalReset.raw.counters.spinnerRuns)!==0 || Number(terminalReset.raw.counters.clearCommands)!==0 || Number(terminalReset.raw.counters.loops)!==0
      || !terminalLoop.traceValidation.ok || terminalLoop.events.length!==19 || terminalLoop.outputMids.length!==5 || terminalLoop.outputMids.some(sample=>!sample.event.validation.ok||sample.event.phase!=='output') || terminalLoop.events.some(event=>event.prompt!=='\u279c intrx'||(event.phase==='typing'&&event.domTyped!==event.typedText)) || terminalLoop.spinnerObserved.join(',')!=='0,1,2,3,4,5,6,7,8,9' || terminalExpectedSpinner.some((frame,index)=>terminalLoop.spinnerTexts[index]!==frame+' compiling interaction atlas') || !terminalLoop.events.concat(terminalLoop.outputMids.map(sample=>sample.event)).some(event=>event.scrollTop>0&&event.scrollHeight>event.clientHeight)
      || !terminalLoop.waitingCursor || terminalLoop.waitingCursor.display==='none' || terminalLoop.waitingCursor.visibility==='hidden' || terminalLoop.waitingCursor.animationDuration!=='0.53s' || terminalLoop.waitingCursor.animationName==='none' || !terminalLoop.busyCursor || (terminalLoop.busyCursor.display!=='none'&&terminalLoop.busyCursor.visibility!=='hidden'&&terminalLoop.busyCursor.opacity>0)
      || !terminalLoop.final.validation.ok || Number(terminalLoop.final.raw.counters.commandsExecuted)!==5 || Number(terminalLoop.final.raw.counters.outputLines)!==11 || Number(terminalLoop.final.raw.counters.spinnerRuns)!==1 || Number(terminalLoop.final.raw.counters.spinnerFramesRendered)!==10 || Number(terminalLoop.final.raw.counters.clearCommands)!==1 || Number(terminalLoop.final.raw.counters.loops)!==1 || Number(terminalLoop.final.raw.state.cycle)!==1 || Number(terminalLoop.final.raw.state.commandIndex)!==0 || terminalLoop.final.raw.state.phase!=='waiting' || terminalLoop.final.raw.state.pendingClear===true || terminalLoop.final.raw.state.typedText!=='' || terminalLoop.final.raw.history.length!==0 || terminalLoop.final.raw.lifecycle.running!==true;
  const terminalFailed=demoId==='terminal-window'&&(terminalCommonFailed||terminalMotionFailed);
  if(process.env.INTRX_TERMINAL_FLAGS==='1')console.log(JSON.stringify({terminalCommonFailed,terminalMotionFailed}));
  const dot=result.dotMatrixShapes,dotMetadata=dot&&dot.metadata,dotStructure=dot&&dot.structure,dotInitial=dot&&dot.initial,dotPointer=dot&&dot.pointer,dotShapes=dot&&dot.shapes,dotRapid=dot&&dot.rapidRetarget,dotResize=dot&&dot.resize,dotReset=dot&&dot.reset;
  const dotShapeSignatures=dot?[dot.initial.paint.shapeSignature,dot.shapes.square.complete.paint.shapeSignature,dot.shapes.diamond.complete.paint.shapeSignature,dot.shapes.cross.complete.paint.shapeSignature]:[],dotShapeDetails=dot?[dot.initial.paint.shapeDetailSignature,dot.shapes.square.complete.paint.shapeDetailSignature,dot.shapes.diamond.complete.paint.shapeDetailSignature,dot.shapes.cross.complete.paint.shapeDetailSignature]:[];
  const dotCommonFailed=!dot
    || !dotMetadata || [dotMetadata.columns,dotMetadata.rows,dotMetadata.pitch,dotMetadata.message,dotMetadata.speed,dotMetadata.glyphWidth,dotMetadata.glyphHeight,dotMetadata.glyphGap,dotMetadata.rowOffset,dotMetadata.marqueeGap,dotMetadata.morphOut,dotMetadata.morphIn,dotMetadata.stagger,dotMetadata.morphTotal,dotMetadata.easing,dotMetadata.maxDelta].join('|')!=='56|14|10|INTRX\u25cfDOT\u25cfMATRIX|40|5|7|1|3|8|120|160|6|610|ease-out-soft|50' || JSON.stringify(dotMetadata.easingCurve)!==JSON.stringify([.22,1,.36,1]) || JSON.stringify(dotMetadata.shapes)!==JSON.stringify(['circle','square','diamond','cross'])
    || dotStructure.tag!=='DIV' || dotStructure.role!=='region' || dotStructure.rootLabel!=='Interactive dot matrix shape marquee' || dotStructure.headerText!=='DOT / MATRIX' || dotStructure.speedText!=='56\u00d714 \u00b7 40 PX/S' || dotStructure.canvasCount!==1 || dotStructure.canvasRole!=='img' || dotStructure.canvasLabel!=='Scrolling INTRX dot matrix message' || dotStructure.canvasWidth!==560 || dotStructure.canvasHeight!==140
    || dotStructure.controlsRole!=='radiogroup' || dotStructure.controlsLabel!=='Dot shape' || dotStructure.chipCount!==4 || dotStructure.chipTags.some(tag=>tag!=='BUTTON') || dotStructure.chipTypes.some(type=>type!=='button') || dotStructure.chipRoles.some(role=>role!=='radio') || dotStructure.chipShapes.join('|')!=='circle|square|diamond|cross' || dotStructure.chipTexts.join('|')!=='circle|square|diamond|cross' || dotStructure.statusLive!=='polite' || dotStructure.statusAtomic!=='true' || dotStructure.focusables!==4
    || dotStructure.rootBackground!=='rgb(10, 10, 11)' || dotStructure.rootColor!=='rgb(236, 236, 239)' || dotStructure.containerType!=='inline-size' || dotStructure.stageBorder!=='1px' || dotStructure.stageRadius!=='10px' || dotStructure.stageTouchAction!=='none' || dotStructure.canvasCursor!=='crosshair' || dotStructure.headerFont!=='10px'
    || !dotStructure.geometry.stageInside || !dotStructure.geometry.canvasInside || !dotStructure.geometry.controlsInside || !nearNumber(dotStructure.geometry.root.width,result.width,.1) || !nearNumber(dotStructure.geometry.root.height,320,.1) || !nearNumber(dotStructure.geometry.aspect,4,.015) || !nearNumber(dotStructure.geometry.stageInset,result.width<=340?6:8,.1) || !nearNumber(dotStructure.geometry.controlInset,result.width<=340?8:12,.1) || dotStructure.geometry.scrollWidth!==dotStructure.geometry.clientWidth || dotStructure.geometry.scrollHeight!==dotStructure.geometry.clientHeight
    || dotStructure.initialSelected.map(item=>item.checked).join('|')!=='true|false|false|false' || dotStructure.initialSelected.map(item=>item.tabIndex).join('|')!=='0|-1|-1|-1' || dotStructure.initialSelected[0].color!=='rgb(167, 139, 250)' || dotStructure.initialSelected[0].background!=='rgb(22, 22, 25)' || dotStructure.initialSelected[0].border!=='rgb(46, 46, 52)' || dotStructure.initialSelected.some(item=>item.radius!=='999px'||item.fontSize!=='10px') || dotStructure.initialSelected.slice(1).some(item=>item.color!=='rgb(92, 92, 102)'||item.background!=='rgb(22, 22, 25)'||item.border!=='rgb(35, 35, 39)')
    || !dotInitial.validation.ok || !dotInitial.validation.configOk || !dotInitial.validation.fixtureOk || !dotInitial.validation.scrollOk || !dotInitial.validation.layoutOk || !dotInitial.validation.checksumOk || !dotInitial.validation.dataOk || !dotInitial.validation.frozen || dotInitial.raw.fixtures.trackColumns!==104 || dotInitial.raw.fixtures.trackWidth!==1040 || dotInitial.raw.fixtures.messageColumns.length!==104 || dotInitial.raw.fixtures.messageColumns.some(column=>column.length!==7) || dotInitial.paint.accentCenters!==0 || dotInitial.paint.expectedAccent!==0 || dotInitial.paint.darkCenters<392 || dotInitial.paint.litCenters<=0 || !/^[0-9A-F]{8}$/.test(dotInitial.paint.centerChecksum) || !/^[0-9A-F]{8}$/.test(dotInitial.paint.shapeSignature)
    || !dot.scroll.validation.ok || !dot.scroll.after.lifecycle || !dot.scroll.after.lifecycle.visible || !dot.scroll.after.lifecycle.documentVisible
    || Number(dotPointer.invalidEnter.counters.ignoredPointers)!==Number(dotPointer.before.counters.ignoredPointers)+1 || dotPointer.invalidEnter.pointer.inside!==false || Number(dotPointer.invalidEnter.pointer.column)!==-1
    || !dotPointer.entered.validation.ok || dotPointer.entered.raw.pointer.inside!==true || Number(dotPointer.entered.raw.pointer.column)!==18 || Number(dotPointer.entered.raw.counters.pointerEnters)!==Number(dotPointer.before.counters.pointerEnters)+1 || Number(dotPointer.entered.raw.counters.pointerMoves)!==Number(dotPointer.before.counters.pointerMoves)+1 || dotPointer.entered.paint.accentCenters!==14 || dotPointer.entered.paint.expectedAccent!==14
    || Number(dotPointer.invalidMove.counters.ignoredPointers)!==Number(dotPointer.invalidEnter.counters.ignoredPointers)+1 || dotPointer.invalidMove.pointer.inside!==true || Number(dotPointer.invalidMove.pointer.column)!==18 || Number(dotPointer.invalidLeave.counters.ignoredPointers)!==Number(dotPointer.invalidMove.counters.ignoredPointers)+1 || dotPointer.invalidLeave.pointer.inside!==true || Number(dotPointer.invalidLeave.pointer.column)!==18
    || !dotPointer.moved.validation.ok || dotPointer.moved.raw.pointer.inside!==true || Number(dotPointer.moved.raw.pointer.column)!==33 || Number(dotPointer.moved.raw.counters.pointerMoves)!==Number(dotPointer.entered.raw.counters.pointerMoves)+1 || dotPointer.moved.paint.accentCenters!==14 || !dotPointer.left.validation.ok || dotPointer.left.raw.pointer.inside!==false || Number(dotPointer.left.raw.pointer.column)!==-1 || Number(dotPointer.left.raw.counters.pointerLeaves)!==Number(dotPointer.moved.raw.counters.pointerLeaves)+1 || dotPointer.left.paint.accentCenters!==0
    || !dotShapes.square.immediate.validation.ok || !dotShapes.square.complete.validation.ok || Number(dotShapes.square.immediate.raw.state.shapeIndex)!==1 || dotShapes.square.immediate.raw.state.shapeName!=='square' || dotShapes.square.immediate.raw.morph.to!=='square' || Number(dotShapes.square.immediate.raw.counters.shapeSwitches)!==Number(dotShapes.start.counters.shapeSwitches)+1 || Number(dotShapes.square.immediate.raw.counters.chipClicks)!==Number(dotShapes.start.counters.chipClicks)+1 || dotShapes.square.complete.status!=='Square dots selected' || dotShapes.square.complete.selected.map(item=>item.checked).join('|')!=='false|true|false|false' || dotShapes.square.complete.selected.map(item=>item.tabIndex).join('|')!=='-1|0|-1|-1'
    || !dotShapes.diamond.immediate.validation.ok || !dotShapes.diamond.complete.validation.ok || Number(dotShapes.diamond.immediate.raw.state.shapeIndex)!==2 || dotShapes.diamond.immediate.raw.state.shapeName!=='diamond' || dotShapes.diamond.immediate.raw.morph.to!=='diamond' || Number(dotShapes.diamond.immediate.raw.counters.keyboardSwitches)!==Number(dotShapes.square.complete.raw.counters.keyboardSwitches)+1 || !dotShapes.diamond.immediate.selected[2].focused || dotShapes.diamond.complete.status!=='Diamond dots selected' || dotShapes.diamond.complete.selected.map(item=>item.checked).join('|')!=='false|false|true|false'
    || !dotShapes.cross.immediate.validation.ok || !dotShapes.cross.complete.validation.ok || Number(dotShapes.cross.immediate.raw.state.shapeIndex)!==3 || dotShapes.cross.immediate.raw.state.shapeName!=='cross' || dotShapes.cross.immediate.raw.morph.to!=='cross' || Number(dotShapes.cross.immediate.raw.counters.keyboardSwitches)!==Number(dotShapes.diamond.complete.raw.counters.keyboardSwitches)+1 || !dotShapes.cross.immediate.selected[3].focused || dotShapes.cross.complete.status!=='Cross dots selected' || dotShapes.cross.complete.selected.map(item=>item.checked).join('|')!=='false|false|false|true'
    || !dotShapes.circle.immediate.validation.ok || !dotShapes.circle.complete.validation.ok || Number(dotShapes.circle.immediate.raw.state.shapeIndex)!==0 || dotShapes.circle.immediate.raw.state.shapeName!=='circle' || dotShapes.circle.immediate.raw.morph.to!=='circle' || Number(dotShapes.circle.immediate.raw.counters.keyboardSwitches)!==Number(dotShapes.cross.complete.raw.counters.keyboardSwitches)+1 || !dotShapes.circle.immediate.selected[0].focused || dotShapes.circle.complete.status!=='Circle dots selected' || dotShapes.circle.complete.selected.map(item=>item.checked).join('|')!=='true|false|false|false' || dotShapes.circle.complete.selected.map(item=>item.tabIndex).join('|')!=='0|-1|-1|-1'
    || Number(dotShapes.circle.complete.raw.counters.shapeSwitches)!==Number(dotShapes.start.counters.shapeSwitches)+4 || Number(dotShapes.circle.complete.raw.counters.chipClicks)!==Number(dotShapes.start.counters.chipClicks)+1 || Number(dotShapes.circle.complete.raw.counters.keyboardSwitches)!==Number(dotShapes.start.counters.keyboardSwitches)+3 || Number(dotShapes.circle.complete.raw.counters.retargets)!==Number(dotShapes.start.counters.retargets) || dotShapeDetails.some(signature=>!/^[0-9A-F]{8}$/.test(signature)) || new Set(dotShapeSignatures.map((signature,index)=>signature+'|'+dotShapeDetails[index])).size!==4 || dotShapes.circle.complete.paint.shapeSignature!==dotInitial.paint.shapeSignature
    || !dotRapid || dotRapid.continuity.length!==3 || dotRapid.continuity.map(sample=>sample.column).join('|')!=='0|27|55' || !dotRapid.final.validation.ok || dotRapid.squareImmediate.status!=='Square dots selected' || dotRapid.after.status!=='Cross dots selected' || dotRapid.squareImmediate.selected.map(item=>item.checked).join('|')!=='false|true|false|false' || dotRapid.after.selected.map(item=>item.checked).join('|')!=='false|false|false|true'
    || !dot.documentVisibility || !dot.documentVisibility.patched || dot.documentVisibility.hidden.lifecycle.documentVisible!==false || dot.documentVisibility.hidden.lifecycle.running!==false || dot.documentVisibility.hiddenKey!==dot.documentVisibility.stableKey || dot.documentVisibility.resumed.lifecycle.documentVisible!==true || Number(dot.documentVisibility.resumed.state.activeTime)-Number(dot.documentVisibility.hidden.state.activeTime)>50.1
    || dot.intersection.hidden.lifecycle.visible!==false || dot.intersection.hidden.lifecycle.running!==false || dot.intersection.hiddenKey!==dot.intersection.stableKey || dot.intersection.resumed.lifecycle.visible!==true || Number(dot.intersection.resumed.state.activeTime)-Number(dot.intersection.hidden.state.activeTime)>50.1
    || !dotResize.before.validation.ok || !dotResize.narrow.validation.ok || !dotResize.restored.validation.ok || dotResize.before.geometry.root.width-dotResize.narrow.geometry.root.width<35 || !nearNumber(dotResize.narrow.geometry.root.width,Math.max(280,result.width-40),.1) || !nearNumber(dotResize.narrow.geometry.stageInset,6,.1) || !nearNumber(dotResize.narrow.geometry.controlInset,8,.1) || !nearNumber(dotResize.narrow.geometry.aspect,4,.015) || !nearNumber(dotResize.restored.geometry.root.width,result.width,.1) || !nearNumber(dotResize.restored.geometry.stageInset,result.width<=340?6:8,.1) || !nearNumber(dotResize.restored.geometry.controlInset,result.width<=340?8:12,.1) || Number(dotResize.narrow.raw.counters.resizeEvents)<=Number(dotResize.before.raw.counters.resizeEvents) || Number(dotResize.restored.raw.counters.resizeEvents)<=Number(dotResize.narrow.raw.counters.resizeEvents) || [dotResize.before.geometry,dotResize.narrow.geometry,dotResize.restored.geometry].some(box=>!box.stageInside||!box.canvasInside||!box.controlsInside||box.scrollWidth!==box.clientWidth||box.scrollHeight!==box.clientHeight)
    || !dotReset.immediate.validation.ok || !dotReset.after.validation.ok || !dotReset.focused || Number(dotReset.immediate.raw.state.activeTime)!==0 || Number(dotReset.immediate.raw.state.scrollDistance)!==0 || Number(dotReset.immediate.raw.state.scrollX)!==0 || Number(dotReset.immediate.raw.state.scrollColumn)!==0 || Number(dotReset.immediate.raw.state.scrollPhase)!==0 || Number(dotReset.immediate.raw.state.shapeIndex)!==0 || dotReset.immediate.raw.state.shapeName!=='circle' || dotReset.immediate.raw.state.displayShape!=='circle' || dotReset.immediate.raw.morph.morphing!==false || dotReset.immediate.raw.pointer.inside!==false || Number(dotReset.immediate.raw.pointer.column)!==-1 || Number(dotReset.immediate.raw.counters.shapeSwitches)!==0 || Number(dotReset.immediate.raw.counters.completedMorphs)!==0 || Number(dotReset.immediate.raw.counters.chipClicks)!==0 || Number(dotReset.immediate.raw.counters.keyboardSwitches)!==0 || Number(dotReset.immediate.raw.counters.pointerMoves)!==0 || Number(dotReset.immediate.raw.counters.schedulerFrames)!==0 || Number(dotReset.immediate.raw.counters.renderFrames)!==1 || Number(dotReset.immediate.raw.counters.resizeEvents)!==0 || Number(dotReset.immediate.raw.counters.resets)!==1 || dotReset.immediate.status!=='Circle dots selected'
    || !dot.cleanup.deterministic || dot.cleanup.before.cleaned!==false || dot.cleanup.after.cleaned!==true || dot.cleanup.after.running!==false || Number(dot.cleanup.after.frameId)!==0 || dot.cleanup.key!==dot.cleanup.stableKey || !dot.cleanup.detached
    || !dot.final.validation.ok || !dot.final.geometry.stageInside || !dot.final.geometry.canvasInside || !dot.final.geometry.controlsInside || dot.final.geometry.scrollWidth!==dot.final.geometry.clientWidth || dot.final.geometry.scrollHeight!==dot.final.geometry.clientHeight || dot.final.paint.accentCenters!==0;
  const dotMotionFailed=reducedMotion
    ? !dot || dot.reduced!=='true' || dotInitial.raw.lifecycle.reduced!==true || dotInitial.raw.lifecycle.running!==false || Number(dotInitial.raw.lifecycle.frameId)!==0 || Number(dotInitial.raw.counters.schedulerFrames)!==0 || Number(dotInitial.raw.state.activeTime)!==0 || Number(dotInitial.raw.state.scrollDistance)!==0 || dot.scroll.beforeKey!==dot.scroll.afterKey || Number(dot.scroll.deltaTime)!==0 || Number(dot.scroll.deltaDistance)!==0 || Number(dot.scroll.after.counters.schedulerFrames)!==0
      || dotShapes.square.early!==null || dotShapes.square.trough!==null || dotShapes.square.stagger!==null || dotShapes.square.tail!==null || dotShapes.square.immediate.raw.morph.morphing!==false || dotShapes.square.immediate.raw.state.displayShape!=='square' || dotShapes.square.immediate.raw.morph.samples.some(sample=>sample.phase!=='settled'||sample.shape!=='square'||Number(sample.scale)!==1) || dotShapes.diamond.immediate.raw.morph.morphing!==false || dotShapes.diamond.immediate.raw.state.displayShape!=='diamond' || dotShapes.cross.immediate.raw.morph.morphing!==false || dotShapes.cross.immediate.raw.state.displayShape!=='cross' || dotShapes.circle.immediate.raw.morph.morphing!==false || dotShapes.circle.immediate.raw.state.displayShape!=='circle' || Number(dotShapes.circle.complete.raw.counters.completedMorphs)!==Number(dotShapes.start.counters.completedMorphs)
      || dotRapid.squareImmediate.raw.morph.morphing!==false || dotRapid.squareImmediate.raw.state.displayShape!=='square' || dotRapid.squareImmediate.samples.some(sample=>sample.phase!=='settled'||sample.shape!=='square'||Number(sample.scale)!==1) || Number(dotRapid.before.raw.state.activeTime)!==Number(dotRapid.squareImmediate.raw.state.activeTime) || JSON.stringify(dotRapid.before.samples)!==JSON.stringify(dotRapid.squareImmediate.samples) || dotRapid.after.raw.morph.morphing!==false || dotRapid.after.raw.state.displayShape!=='cross' || dotRapid.after.samples.some(sample=>sample.phase!=='settled'||sample.shape!=='cross'||Number(sample.scale)!==1) || Number(dotRapid.after.raw.counters.retargets)!==Number(dotRapid.start.counters.retargets) || Number(dotRapid.after.raw.counters.shapeSwitches)!==Number(dotRapid.start.counters.shapeSwitches)+2 || Number(dotRapid.after.raw.counters.chipClicks)!==Number(dotRapid.start.counters.chipClicks)+2 || Number(dotRapid.final.raw.counters.completedMorphs)!==Number(dotRapid.start.counters.completedMorphs) || Number(dotRapid.final.raw.counters.schedulerFrames)!==Number(dotRapid.start.counters.schedulerFrames) || Number(dotRapid.final.raw.lifecycle.frameId)!==0
      || dot.documentVisibility.resumed.lifecycle.running!==false || dot.intersection.resumed.lifecycle.running!==false || dotReset.immediate.raw.lifecycle.running!==false || Number(dotReset.after.raw.state.activeTime)!==0 || Number(dotReset.after.raw.state.scrollDistance)!==0 || Number(dotReset.after.raw.counters.schedulerFrames)!==0 || Number(dotReset.after.raw.lifecycle.frameId)!==0 || dotReset.immediate.paint.centerChecksum!==dotReset.after.paint.centerChecksum || Number(dot.final.raw.counters.schedulerFrames)!==0 || Number(dot.final.raw.state.activeTime)!==0
    : !dot || dot.reduced!=='false' || dotInitial.raw.lifecycle.reduced!==false || dotInitial.raw.lifecycle.running!==true || Number(dotInitial.raw.counters.schedulerFrames)<=0 || Number(dotInitial.raw.state.activeTime)<=0 || dot.scroll.deltaTime<150 || !nearNumber(dot.scroll.deltaDistance,dot.scroll.deltaTime*.04,.00002) || Number(dot.scroll.after.counters.schedulerFrames)<=Number(dot.scroll.before.counters.schedulerFrames) || dot.scroll.beforeKey===dot.scroll.afterKey
      || !dotShapes.square.early || !dotShapes.square.trough || !dotShapes.square.stagger || !dotShapes.square.tail || dotShapes.square.immediate.raw.morph.morphing!==true || dotShapes.square.immediate.raw.morph.from!=='circle' || dotShapes.square.immediate.raw.morph.to!=='square' || Number(dotShapes.square.immediate.raw.morph.start)!==Number(dotShapes.square.immediate.raw.state.activeTime) || dotShapes.square.immediate.raw.morph.samples.map(sample=>sample.phase).join('|')!=='delay|delay|delay'
      || !dotShapes.square.early.validation.ok || dotShapes.square.early.raw.morph.samples.map(sample=>sample.phase).join('|')!=='out|delay|delay' || !dotShapes.square.trough.validation.ok || dotShapes.square.trough.raw.morph.samples[0].phase!=='in' || dotShapes.square.trough.raw.morph.samples[0].shape!=='square' || dotShapes.square.trough.raw.morph.samples[2].phase!=='delay'
      || !dotShapes.square.stagger.validation.ok || dotShapes.square.stagger.raw.morph.samples[0].phase!=='in' || !['out','in'].includes(dotShapes.square.stagger.raw.morph.samples[1].phase) || dotShapes.square.stagger.raw.morph.samples[2].phase!=='delay' || !dotShapes.square.tail.validation.ok || dotShapes.square.tail.raw.morph.samples.map(sample=>sample.phase).join('|')!=='arrived|arrived|in'
      || dotShapes.square.complete.raw.morph.morphing!==false || dotShapes.square.complete.raw.state.displayShape!=='square' || dotShapes.square.complete.raw.morph.samples.some(sample=>sample.phase!=='settled'||sample.shape!=='square'||Number(sample.scale)!==1) || Number(dotShapes.square.complete.raw.counters.completedMorphs)!==Number(dotShapes.start.counters.completedMorphs)+1 || Number(dotShapes.circle.complete.raw.counters.completedMorphs)!==Number(dotShapes.start.counters.completedMorphs)+4
      || dotRapid.squareImmediate.raw.morph.morphing!==true || dotRapid.squareImmediate.raw.morph.from!=='circle' || dotRapid.squareImmediate.raw.morph.to!=='square' || dotRapid.before.raw.morph.morphing!==true || dotRapid.before.samples.map(sample=>sample.phase).join('|')!=='in|out|delay' || Number(dotRapid.before.raw.morph.elapsed)<195 || Number(dotRapid.after.raw.state.activeTime)!==Number(dotRapid.before.raw.state.activeTime) || Number(dotRapid.after.raw.state.scrollDistance)!==Number(dotRapid.before.raw.state.scrollDistance) || dotRapid.after.paint.centerChecksum!==dotRapid.before.paint.centerChecksum || Number(dotRapid.after.raw.morph.start)!==Number(dotRapid.after.raw.state.activeTime) || dotRapid.after.raw.morph.morphing!==true || dotRapid.after.raw.morph.from!=='square' || dotRapid.after.raw.morph.to!=='cross' || dotRapid.after.raw.state.displayShape!=='square' || dotRapid.after.samples.some(sample=>sample.phase!=='delay') || dotRapid.continuity.some(sample=>!sample.sameScale||!sample.sameShape||sample.scaleDelta>.000000001) || Number(dotRapid.after.raw.counters.retargets)!==Number(dotRapid.start.counters.retargets)+1 || Number(dotRapid.after.raw.counters.shapeSwitches)!==Number(dotRapid.start.counters.shapeSwitches)+2 || Number(dotRapid.after.raw.counters.chipClicks)!==Number(dotRapid.start.counters.chipClicks)+2 || Number(dotRapid.final.raw.counters.completedMorphs)!==Number(dotRapid.start.counters.completedMorphs)+1 || dotRapid.final.raw.morph.morphing!==false || dotRapid.final.raw.state.shapeIndex!==3 || dotRapid.final.raw.state.displayShape!=='cross' || dotRapid.final.raw.morph.samples.some(sample=>sample.phase!=='settled'||sample.shape!=='cross'||Number(sample.scale)!==1)
      || dot.documentVisibility.resumed.lifecycle.running!==true || dot.intersection.resumed.lifecycle.running!==true || dotReset.immediate.raw.lifecycle.running!==true || Number(dotReset.after.raw.state.activeTime)<=0 || Number(dotReset.after.raw.state.scrollDistance)<=0 || Number(dotReset.after.raw.counters.schedulerFrames)<=0 || dotReset.immediate.paint.centerChecksum===dotReset.after.paint.centerChecksum || dot.final.raw.lifecycle.running!==true || Number(dot.final.raw.counters.schedulerFrames)<=0 || Number(dot.final.raw.state.activeTime)<=0;
  const dotFailed=demoId==='dot-matrix-shapes'&&(dotCommonFailed||dotMotionFailed);
  if(process.env.INTRX_DOT_FLAGS==='1')console.log(JSON.stringify({dotCommonFailed,dotMotionFailed}));
  if (!result.root || result.height !== 320 || result.scrollHeight !== result.clientHeight || result.scrollWidth !== result.clientWidth || errors.length || fuiFailed || lockFailed || bootFailed || scopeFailed || scannerFailed || streamFailed || authFailed || hexFailed || tradeFailed || orbitFailed || donutFailed || fireFailed || fluidFailed || portraitFailed || morphFailed || typeFailed || terminalFailed || dotFailed) process.exitCode = 1;
}

main().catch(error => { console.error(error); process.exitCode = 1; });

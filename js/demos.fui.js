window.INTRX=window.INTRX||{demos:[],register(d){this.demos.push(d)}};
INTRX.register({
  id:'fui-status-dashboard',
  title:'FUI Status Dashboard',
  cat:'FUI & Terminal',
  rootClass:'d-fui-status',
  tags:['fui','dashboard','status','telemetry'],
  libs:[],
  desc:'A compact four-module system monitor with animated power, thermal, shield, and diagnostic telemetry. The hard-edged framing and restrained activity make dense fictional interfaces feel operational instead of decorative.',
  seen:'Seen on: Steve Lauda\'s FUI explorations and Fallout-inspired robot status interfaces',
  hint:'hover panels',
  html:`<div class="d-fui-status" role="region" aria-label="Fictional system status dashboard">
  <div class="d-fui-status-topbar"><span class="d-fui-status-kicker">INTRX / SYSTEM ARRAY</span><span class="d-fui-status-live"><i class="d-fui-status-live-dot"></i>LIVE TELEMETRY</span></div>
  <div class="d-fui-status-grid">
    <section class="d-fui-status-panel d-fui-status-power" tabindex="0" aria-label="Power at 94 percent">
      <i class="d-fui-status-corner d-fui-status-corner-tl"></i><i class="d-fui-status-corner d-fui-status-corner-tr"></i><i class="d-fui-status-corner d-fui-status-corner-bl"></i><i class="d-fui-status-corner d-fui-status-corner-br"></i>
      <header class="d-fui-status-panel-head"><span>POWER</span><b>NOMINAL</b></header>
      <div class="d-fui-status-power-body"><div class="d-fui-status-power-bars" aria-hidden="true"><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i></div><div class="d-fui-status-metric"><strong>94%</strong><span>OUTPUT</span><small>18.8 KW</small></div></div>
    </section>
    <section class="d-fui-status-panel d-fui-status-thermal" tabindex="0" aria-label="Thermals at 71 degrees Celsius">
      <i class="d-fui-status-corner d-fui-status-corner-tl"></i><i class="d-fui-status-corner d-fui-status-corner-tr"></i><i class="d-fui-status-corner d-fui-status-corner-bl"></i><i class="d-fui-status-corner d-fui-status-corner-br"></i>
      <header class="d-fui-status-panel-head"><span>THERMALS</span><b>STABLE</b></header>
      <div class="d-fui-status-thermal-body"><div class="d-fui-status-gauge" aria-hidden="true"><svg viewBox="0 0 140 78"><path class="d-fui-status-gauge-track" d="M16 68 A54 54 0 0 1 124 68"></path><path class="d-fui-status-gauge-redline" d="M112 35 A54 54 0 0 1 124 68"></path><path class="d-fui-status-gauge-ticks" d="M16 68 L23 68 M23 43 L29 47 M43 20 L47 27 M70 14 L70 22 M97 20 L93 27 M117 43 L111 47 M124 68 L117 68"></path></svg><i class="d-fui-status-needle"></i><i class="d-fui-status-needle-pin"></i></div><div class="d-fui-status-metric"><strong>71°</strong><span>CELSIUS</span><small>Δ +0.4</small></div></div>
    </section>
    <section class="d-fui-status-panel d-fui-status-shield" tabindex="0" aria-label="Shield integrity at 87 percent">
      <i class="d-fui-status-corner d-fui-status-corner-tl"></i><i class="d-fui-status-corner d-fui-status-corner-tr"></i><i class="d-fui-status-corner d-fui-status-corner-bl"></i><i class="d-fui-status-corner d-fui-status-corner-br"></i>
      <header class="d-fui-status-panel-head"><span>SHIELD</span><b>SYNCED</b></header>
      <div class="d-fui-status-shield-body"><div class="d-fui-status-hex-wrap" aria-hidden="true"><svg viewBox="0 0 90 84"><polygon class="d-fui-status-hex" points="45,5 79,24 79,60 45,79 11,60 11,24"></polygon><polygon class="d-fui-status-hex-inner" points="45,17 68,30 68,54 45,67 22,54 22,30"></polygon><path class="d-fui-status-hex-axis" d="M45 17 V67 M22 30 L68 54 M68 30 L22 54"></path></svg><i class="d-fui-status-shield-core"></i></div><div class="d-fui-status-metric"><strong>87%</strong><span>INTEGRITY</span><small>4.2 TESLA</small></div></div>
    </section>
    <section class="d-fui-status-panel d-fui-status-diagnostics" tabindex="0" aria-label="Five live diagnostic checks">
      <i class="d-fui-status-corner d-fui-status-corner-tl"></i><i class="d-fui-status-corner d-fui-status-corner-tr"></i><i class="d-fui-status-corner d-fui-status-corner-bl"></i><i class="d-fui-status-corner d-fui-status-corner-br"></i>
      <header class="d-fui-status-panel-head"><span>DIAGNOSTICS</span><b class="d-fui-status-diag-summary">5/5 OK</b></header>
      <div class="d-fui-status-diag-list" aria-live="polite"><div><span>CORE BUS</span><b>OK</b></div><div><span>MEMORY</span><b>OK</b></div><div><span>UPLINK</span><b>OK</b></div><div><span>NAV ARRAY</span><b>OK</b></div><div><span>COOLANT</span><b>OK</b></div></div>
    </section>
  </div>
  <div class="d-fui-status-footer"><span>NODE 04 / SECTOR A7</span><span class="d-fui-status-clock">T+ 02:14:08.412</span></div>
  <i class="d-fui-status-scanline" aria-hidden="true"></i>
</div>`,
  css:`
.d-fui-status{position:relative;width:100%;height:320px;box-sizing:border-box;overflow:hidden;padding:7px 15px;background:#0a0a0b;color:#ececef;font-family:'JetBrains Mono',monospace;isolation:isolate}
.d-fui-status:before{content:'';position:absolute;inset:0;z-index:-1;background:repeating-linear-gradient(0deg,transparent 0 2px,rgba(255,255,255,.02) 2px 3px),radial-gradient(circle at 50% 45%,rgba(250,115,25,.06),transparent 48%);pointer-events:none}
.d-fui-status-topbar,.d-fui-status-footer{height:17px;display:flex;align-items:center;justify-content:space-between;color:#5c5c66;font-size:9px;line-height:1;letter-spacing:.08em}
.d-fui-status-kicker{color:#9b9ba3}.d-fui-status-live{display:flex;align-items:center;gap:6px;color:#fa7319}
.d-fui-status-live-dot{width:5px;height:5px;border-radius:50%;background:#fa7319;box-shadow:0 0 9px rgba(250,115,25,.55);animation:d-fui-status-live-pulse 1.6s ease-in-out infinite}
.d-fui-status-grid{height:258px;margin:7px 0;display:grid;grid-template-columns:1fr 1fr;grid-template-rows:1fr 1fr;gap:6px}
.d-fui-status-panel{position:relative;min-width:0;overflow:hidden;box-sizing:border-box;padding:10px 11px;border:1px solid #232327;border-radius:4px;background:#101012;outline:none;transition:border-color 270ms cubic-bezier(.22,1,.36,1),background 270ms cubic-bezier(.22,1,.36,1)}
.d-fui-status-panel:hover,.d-fui-status-panel:focus-visible{border-color:#2e2e34;background:#161619}
.d-fui-status-corner{position:absolute;width:7px;height:7px;opacity:.7;transition:border-color 180ms cubic-bezier(.22,1,.36,1),opacity 180ms cubic-bezier(.22,1,.36,1)}
.d-fui-status-corner-tl{left:3px;top:3px;border-left:1px solid #5c5c66;border-top:1px solid #5c5c66}.d-fui-status-corner-tr{right:3px;top:3px;border-right:1px solid #5c5c66;border-top:1px solid #5c5c66}
.d-fui-status-corner-bl{left:3px;bottom:3px;border-left:1px solid #5c5c66;border-bottom:1px solid #5c5c66}.d-fui-status-corner-br{right:3px;bottom:3px;border-right:1px solid #5c5c66;border-bottom:1px solid #5c5c66}
.d-fui-status-panel:hover .d-fui-status-corner,.d-fui-status-panel:focus-visible .d-fui-status-corner{border-color:#fa7319;opacity:1}
.d-fui-status-panel-head{height:12px;display:flex;align-items:center;justify-content:space-between;color:#5c5c66;font-size:9px;line-height:1;letter-spacing:.08em;font-weight:400}.d-fui-status-panel-head b{color:#4ade80;font-size:8px;font-weight:500}
.d-fui-status-power-body,.d-fui-status-thermal-body,.d-fui-status-shield-body{display:flex;align-items:center;justify-content:center;gap:18px}.d-fui-status-power-body{height:94px}.d-fui-status-thermal-body,.d-fui-status-shield-body{height:82px}.d-fui-status-power{padding-bottom:8px}
.d-fui-status-metric{min-width:62px;display:flex;flex-direction:column;align-items:flex-start}.d-fui-status-metric strong{font-size:12px;line-height:1;color:#ececef;font-weight:500;transition:font-size 180ms cubic-bezier(.22,1,.36,1),color 180ms cubic-bezier(.22,1,.36,1)}
.d-fui-status-panel:hover .d-fui-status-metric strong,.d-fui-status-panel:focus-visible .d-fui-status-metric strong{font-size:14px;color:#fa7319}.d-fui-status-metric span{margin-top:5px;color:#5c5c66;font-size:8px;letter-spacing:.08em}.d-fui-status-metric small{margin-top:6px;color:#9b9ba3;font-size:8px}
.d-fui-status-power-bars{width:48px;height:94px;display:flex;flex-direction:column-reverse;justify-content:flex-start;gap:2px}.d-fui-status-power-bars i{display:block;height:6px;background:#fa7319;opacity:.92;box-shadow:0 0 5px rgba(250,115,25,.22)}.d-fui-status-power-bars i:last-child{animation:d-fui-status-power-top 1.2s ease-in-out infinite}
.d-fui-status-gauge{position:relative;width:96px;height:70px;overflow:hidden}.d-fui-status-gauge svg{position:absolute;inset:0;width:100%;height:100%;overflow:visible}.d-fui-status-gauge path{fill:none;stroke-linecap:square}.d-fui-status-gauge-track{stroke:#2e2e34;stroke-width:5}.d-fui-status-gauge-redline{stroke:#f87171;stroke-width:5}.d-fui-status-gauge-ticks{stroke:#5c5c66;stroke-width:1}
.d-fui-status-needle{position:absolute;left:50%;bottom:8px;width:1px;height:48px;background:#fa7319;box-shadow:0 0 8px rgba(250,115,25,.5);transform-origin:50% 100%;transform:rotate(var(--d-fui-status-thermal-angle,26deg));will-change:transform}.d-fui-status-needle-pin{position:absolute;left:calc(50% - 4px);bottom:4px;width:8px;height:8px;border:1px solid #fa7319;border-radius:50%;background:#101012}
.d-fui-status-hex-wrap{position:relative;width:76px;height:76px}.d-fui-status-hex-wrap svg{width:100%;height:100%;overflow:visible;animation:d-fui-status-shield-pulse 2.4s ease-in-out infinite;will-change:transform}.d-fui-status-hex{fill:rgba(103,232,249,.04);stroke:#67e8f9;stroke-width:1.5}.d-fui-status-hex-inner,.d-fui-status-hex-axis{fill:none;stroke:rgba(103,232,249,.25);stroke-width:1}.d-fui-status-shield-core{position:absolute;left:calc(50% - 3px);top:calc(50% - 3px);width:6px;height:6px;border-radius:50%;background:#67e8f9;box-shadow:0 0 12px rgba(103,232,249,.45)}
.d-fui-status-diagnostics{padding-bottom:7px}.d-fui-status-diag-list{margin-top:7px;display:grid;gap:2px}.d-fui-status-diag-list div{height:13px;display:flex;align-items:center;justify-content:space-between;border-bottom:1px solid #232327;color:#5c5c66;font-size:8px;line-height:1;letter-spacing:.05em}.d-fui-status-diag-list b{color:#4ade80;font-size:8px;font-weight:500;transition:color 160ms,opacity 160ms}
.d-fui-status-diag-list b.d-fui-status-checking{color:#fbbf24;animation:d-fui-status-checking-blink 600ms steps(1,end) infinite}.d-fui-status-diag-summary.d-fui-status-summary-checking{color:#fbbf24}
.d-fui-status-scanline{position:absolute;z-index:4;left:15px;right:15px;top:7px;height:1px;background:#fa7319;box-shadow:0 0 7px rgba(250,115,25,.35);opacity:.12;pointer-events:none;animation:d-fui-status-scan 7s linear infinite}.d-fui-status-clock{color:#9b9ba3}
@keyframes d-fui-status-live-pulse{0%,100%{opacity:.45}50%{opacity:1}}@keyframes d-fui-status-power-top{0%,100%{opacity:.35}50%{opacity:1}}@keyframes d-fui-status-shield-pulse{0%,100%{transform:scale(1)}50%{transform:scale(1.03)}}@keyframes d-fui-status-checking-blink{0%,49%{opacity:1}50%,100%{opacity:.25}}@keyframes d-fui-status-scan{0%{transform:translateY(0)}100%{transform:translateY(306px)}}
@media(max-width:520px){.d-fui-status{padding:7px 11px}.d-fui-status-grid{gap:4px}.d-fui-status-panel{padding:9px 7px}.d-fui-status-power{padding-bottom:7px}.d-fui-status-power-body,.d-fui-status-thermal-body,.d-fui-status-shield-body{gap:7px}.d-fui-status-power-bars{width:32px}.d-fui-status-gauge{width:80px}.d-fui-status-hex-wrap{width:64px;height:64px}.d-fui-status-metric{min-width:50px}}
@media(prefers-reduced-motion:reduce){.d-fui-status *{animation:none!important;transition-duration:1ms!important}.d-fui-status-scanline{top:160px}.d-fui-status-live-dot,.d-fui-status-power-bars i:last-child{opacity:1}}
`,
  js:`const needle=root.querySelector('.d-fui-status-needle');
const clock=root.querySelector('.d-fui-status-clock');
const rows=Array.from(root.querySelectorAll('.d-fui-status-diag-list div'));
const summary=root.querySelector('.d-fui-status-diag-summary');
const reduced=matchMedia('(prefers-reduced-motion: reduce)').matches;
const started=performance.now();
let checks=0;
root.dataset.power='94';
root.dataset.thermal='71';
root.dataset.panels='4';
root.dataset.diagnosticChecks='0';
root.dataset.reduced=String(reduced);
function animate(now){
  if(!root.isConnected)return;
  const elapsed=now-started;
  const angle=26+Math.sin(elapsed/3000*Math.PI*2)*4;
  needle.style.setProperty('--d-fui-status-thermal-angle',angle.toFixed(2)+'deg');
  const total=8048412+Math.floor(elapsed);
  const hours=Math.floor(total/3600000);
  const minutes=Math.floor(total%3600000/60000);
  const seconds=Math.floor(total%60000/1000);
  const millis=total%1000;
  clock.textContent='T+ '+String(hours).padStart(2,'0')+':'+String(minutes).padStart(2,'0')+':'+String(seconds).padStart(2,'0')+'.'+String(millis).padStart(3,'0');
  requestAnimationFrame(animate);
}
function scheduleCheck(){
  const delay=4000+Math.random()*5000;
  setTimeout(function(){
    if(!root.isConnected)return;
    const row=rows[Math.floor(Math.random()*rows.length)];
    const status=row.querySelector('b');
    status.textContent='CHECKING';
    status.classList.add('d-fui-status-checking');
    summary.textContent='4/5 CHECKING';
    summary.classList.add('d-fui-status-summary-checking');
    checks++;
    root.dataset.diagnosticChecks=String(checks);
    root.dataset.diagnosticState='checking';
    setTimeout(function(){
      if(!root.isConnected)return;
      status.textContent='OK';
      status.classList.remove('d-fui-status-checking');
      summary.textContent='5/5 OK';
      summary.classList.remove('d-fui-status-summary-checking');
      root.dataset.diagnosticState='ok';
      scheduleCheck();
    },900+Math.random()*700);
  },delay);
}
if(reduced){
  needle.style.setProperty('--d-fui-status-thermal-angle','26deg');
  clock.textContent='T+ 02:14:08.412';
  root.dataset.diagnosticState='ok';
}else{
  root.dataset.diagnosticState='ok';
  requestAnimationFrame(animate);
  scheduleCheck();
}`,
  prompt:`Build a 320px-tall sci-fi status dashboard with a 2 by 2 grid of hard-tech panels named POWER, THERMALS, SHIELD, and DIAGNOSTICS. Use only #0a0a0b, #101012, #161619, #232327, #2e2e34, #ececef, #9b9ba3, #5c5c66, accent #fa7319, success #4ade80, warning #fbbf24, error #f87171, and info #67e8f9. Use JetBrains Mono throughout, 4px panel radii, 1px borders, four L-shaped corner ticks per panel, scanlines, and a visible accent activity light.

POWER is a 12-segment vertical gauge with 6px segments and 2px gaps, filled in accent at 94 percent; blink the top segment on a 1.2 second loop because the value exceeds 90 percent. THERMALS uses a semicircle gauge with the final 20 percent in error red and a needle centered on its value that wanders plus or minus 4 degrees using a three-second sine cycle. SHIELD is a cyan hexagon outline with internal axes and a core light, pulsing scale 1 to 1.03 every 2.4 seconds. DIAGNOSTICS contains five labeled rows; every random four to nine seconds, switch one status from OK success green to CHECKING warning yellow with a 600ms blink, restore it after 900 to 1600ms, and keep the summary synchronized. Sweep one full-width 1px accent scanline from top to bottom every seven seconds at 12 percent opacity.

On hover or keyboard focus, change that panel's corner ticks to accent and enlarge its 12px metric to 14px over 180ms with cubic-bezier(0.22,1,0.36,1); let hover-out take about 270ms. Use one requestAnimationFrame loop for the sine needle and clock, check whether the root is still connected before scheduling another frame or diagnostic timer, and animate transforms or opacity where possible. Make all four panels keyboard focusable with descriptive labels and an aria-live diagnostic region. Under prefers-reduced-motion, stop the clock, thermal wander, scan, pulses, and blinking while preserving a clear representative state and instant focus feedback.`
});

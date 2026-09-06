/* INTRX registry — IMAGE & WEBGL */
window.INTRX = window.INTRX || { demos: [], register(d) { this.demos.push(d); } };

/* ------------------------------------------------------------
   WebGL hover distortion
------------------------------------------------------------ */
INTRX.register({
  id: 'webgl-distortion',
  title: 'WebGL Hover Distortion',
  cat: 'Image & WebGL',
  rootClass: 'd-glsl',
  tags: ['shader', 'displacement'],
  libs: [],
  desc: 'The image lives on a WebGL quad; hovering ramps a uniform that displaces UVs with sine waves around the cursor, warping the image like liquid. Raw WebGL — no three.js required.',
  seen: 'Seen on: tanziro.com/hobbies/travel, Active Theory, lusion.co',
  hint: 'hover & move on the image',
  html: `
<div class="d-glsl">
  <canvas class="d-glsl-canvas" width="480" height="270"></canvas>
</div>`,
  css: `.d-glsl{height:320px;width:100%;background:#d9dfd2;display:block;overflow:hidden}.d-glsl-canvas{display:block;width:100%;height:320px;object-fit:cover;border:0;cursor:crosshair}.d-glsl-canvas:focus-visible{outline:2px solid #dbeac9;outline-offset:-4px}.d-glsl [class$="-label"],.d-glsl [class$="-side"],.d-glsl [class$="-spec"],.d-glsl [class$="-measure"]{display:none}`,
  js: `
const canvas = root.querySelector('.d-glsl-canvas');
const gl = canvas.getContext('webgl');

const tex=document.createElement('canvas');tex.width=512;tex.height=512;const t=tex.getContext('2d');t.fillStyle='#d3dbcb';t.fillRect(0,0,512,512);
// --- shaders ---
const vsSrc = [
  'attribute vec2 aPos;',
  'varying vec2 vUv;',
  'void main() {',
  '  vUv = aPos * 0.5 + 0.5;',
  '  gl_Position = vec4(aPos, 0.0, 1.0);',
  '}'
].join('\\n');

const fsSrc = [
  'precision mediump float;',
  'varying vec2 vUv;',
  'uniform sampler2D uTex;',
  'uniform float uTime;',
  'uniform float uHover;',      // 0 -> 1 eased on hover
  'uniform vec2 uMouse;',
  'void main() {',
  '  vec2 uv = vUv;',
  '  float d = distance(uv, uMouse);',
  '  float ripple = sin(d * 28.0 - uTime * 4.0) * 0.5 + 0.5;',
  '  float amt = uHover * 0.045 * ripple * smoothstep(0.55, 0.0, d);',
  '  uv += normalize(uv - uMouse + 0.0001) * amt;',
  '  uv.x += sin(uv.y * 12.0 + uTime * 2.0) * 0.012 * uHover;',
  '  vec4 col = texture2D(uTex, uv);',
  '  col.r = texture2D(uTex, uv + vec2(0.008, 0.0) * uHover).r;',  // chromatic split
  '  col.b = texture2D(uTex, uv - vec2(0.008, 0.0) * uHover).b;',
  '  gl_FragColor = col;',
  '}'
].join('\\n');

function compile(type, src) {
  const s = gl.createShader(type);
  gl.shaderSource(s, src); gl.compileShader(s);
  return s;
}
const prog = gl.createProgram();
gl.attachShader(prog, compile(gl.VERTEX_SHADER, vsSrc));
gl.attachShader(prog, compile(gl.FRAGMENT_SHADER, fsSrc));
gl.linkProgram(prog); gl.useProgram(prog);

// fullscreen quad
gl.bindBuffer(gl.ARRAY_BUFFER, gl.createBuffer());
gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1,-1, 1,-1, -1,1, 1,1]), gl.STATIC_DRAW);
const loc = gl.getAttribLocation(prog, 'aPos');
gl.enableVertexAttribArray(loc);
gl.vertexAttribPointer(loc, 2, gl.FLOAT, false, 0, 0);

// texture upload
const texture = gl.createTexture();
gl.bindTexture(gl.TEXTURE_2D, texture);
gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true);
gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, tex);
gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);

const uTime = gl.getUniformLocation(prog, 'uTime');
const uHover = gl.getUniformLocation(prog, 'uHover');
const uMouse = gl.getUniformLocation(prog, 'uMouse');

let hover = 0, hoverTarget = 0, mouse = [0.5, 0.5];
canvas.addEventListener('mouseenter', function () { hoverTarget = 1; });
canvas.addEventListener('mouseleave', function () { hoverTarget = 0; });
canvas.addEventListener('mousemove', function (e) {
  const b = canvas.getBoundingClientRect();
  mouse = [(e.clientX - b.left) / b.width, 1 - (e.clientY - b.top) / b.height];
});

(function tick(now) {
  hover += (hoverTarget - hover) * 0.06;      // ease the intensity
  gl.uniform1f(uTime, now * 0.001);
  gl.uniform1f(uHover, hover);
  gl.uniform2f(uMouse, mouse[0], mouse[1]);
  gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
  requestAnimationFrame(tick);
})(0);
const photograph=new Image();photograph.onload=()=>{const scale=Math.max(512/photograph.naturalWidth,512/photograph.naturalHeight);t.drawImage(photograph,(512-photograph.naturalWidth*scale)/2,(512-photograph.naturalHeight*scale)/2,photograph.naturalWidth*scale,photograph.naturalHeight*scale);gl.bindTexture(gl.TEXTURE_2D,texture);gl.texImage2D(gl.TEXTURE_2D,0,gl.RGBA,gl.RGBA,gl.UNSIGNED_BYTE,tex)};photograph.src='{{asset:limestone-pavilion}}';canvas.tabIndex=0;canvas.setAttribute('aria-label','Photographic WebGL distortion. Focus or hover to distort, arrows move the field.');canvas.addEventListener('focus',()=>hoverTarget=1);canvas.addEventListener('blur',()=>hoverTarget=0);canvas.addEventListener('keydown',e=>{if(['ArrowLeft','ArrowRight','ArrowUp','ArrowDown'].includes(e.key)){e.preventDefault();mouse[0]=Math.max(0,Math.min(1,mouse[0]+(e.key==='ArrowRight'?.1:e.key==='ArrowLeft'?-.1:0)));mouse[1]=Math.max(0,Math.min(1,mouse[1]+(e.key==='ArrowUp'?.1:e.key==='ArrowDown'?-.1:0)));hoverTarget=1}});`,
  prompt: `Build the WebGL Hover Distortion in native300×320px geometry, preserving its actual effect, state machine, timing, pointer capture and keyboard behavior. Use the supplied limestone-pavilion photograph in the actual WebGL distortion texture, with pointer/focus intensity and keyboard movement. Remove external instrument headers, formulas and telemetry. Use a calm pale surface or dark effect field as appropriate, with a quiet small control beneath. Set visible UI in regular Inter400, normal tracking; headlines may be24–28px, captions10–11px. Preserve the exact meaningful color of the demonstrated effect, semantic states, polite feedback, reset, reduced motion and resource cleanup. Do not replace an effect with a static illustration.`,
});

/* ------------------------------------------------------------
   Fragment / particle disintegration
------------------------------------------------------------ */
INTRX.register({
  id: 'particle-dissolve',
  title: 'Fragment Disintegration',
  cat: 'Image & WebGL',
  rootClass: 'd-frag',
  tags: ['particles', 'canvas 2d'],
  libs: [],
  desc: 'The element is sampled into thousands of pixel particles that scatter with drift and turbulence, then reassemble on demand — the "magic dust" appear/disappear.',
  seen: 'Seen on: Thanos-snap demos, product reveals, Codrops particle articles',
  hint: 'click to dissolve / reform',
  html: `
<div class="d-frag">
  <canvas class="d-frag-canvas" width="480" height="260"></canvas>
  <span class="d-frag-state">DISSOLVE ▸</span>
</div>`,
  css: `
.d-frag {
  position: relative; width: 100%; height: 320px; background: #0a0a0b;
  display: flex; align-items: center; justify-content: center; cursor: pointer;
}
.d-frag-canvas { width: 480px; max-width: 92%; }
.d-frag-state {
  position: absolute; bottom: 14px; left: 50%; transform: translateX(-50%);
  font-family: "JetBrains Mono", monospace; font-size: 10px; letter-spacing: 0.2em; color: #5c5c66;
}.d-frag{background:#e6eae0;color:#748468;font-family:"Inter",system-ui,sans-serif}.d-frag-state{font:400 10px "Inter",system-ui,sans-serif;letter-spacing:0;color:#7d906c;bottom:28px}.d-frag [class$="-label"],.d-frag [class$="-side"],.d-frag [class$="-spec"],.d-frag [class$="-measure"]{display:none}`,
  js: `
const canvas = root.querySelector('.d-frag-canvas');
const ctx = canvas.getContext('2d');
const state = root.querySelector('.d-frag-state');
const W = canvas.width, H = canvas.height;

// --- render the source once to an offscreen canvas, then sample it ---
const src = document.createElement('canvas');
src.width = W; src.height = H;
const s = src.getContext('2d');
s.fillStyle = '#6c7f57';
s.font = '700 110px sans-serif';
s.textAlign = 'center'; s.textBaseline = 'middle';
s.fillText('FORM', W / 2, H / 2);

const GAP = 3;                       // sample every 3rd pixel
const data = s.getImageData(0, 0, W, H).data;
const particles = [];
for (let y = 0; y < H; y += GAP) {
  for (let x = 0; x < W; x += GAP) {
    const a = data[(y * W + x) * 4 + 3];
    if (a > 128) {
      particles.push({
        hx: x, hy: y,                              // home position
        x: x, y: y,
        vx: 0, vy: 0,
        seed: Math.random() * 1000,
        delay: (x / W) * 0.6 + Math.random() * 0.2 // dissolve sweeps left -> right
      });
    }
  }
}

let mode = 0;            // 0 = assembled, 1 = dissolved
let clock = 0;

root.addEventListener('click', function () {
  mode = 1 - mode;
  clock = 0;
  state.textContent = mode ? '◂ REFORM' : 'DISSOLVE ▸';
});

(function tick() {
  clock += 1 / 60;
  ctx.clearRect(0, 0, W, H);
  ctx.fillStyle = '#6c7f57';
  particles.forEach(function (p) {
    const active = clock > p.delay;
    if (mode === 1 && active) {
      // scatter: drift right/up with turbulence
      p.vx += 0.05 + Math.sin(p.seed + clock * 3) * 0.03;
      p.vy += Math.cos(p.seed * 2 + clock * 4) * 0.05 - 0.015;
      p.x += p.vx; p.y += p.vy;
    } else if (mode === 0) {
      // spring home
      p.vx += (p.hx - p.x) * 0.06; p.vy += (p.hy - p.y) * 0.06;
      p.vx *= 0.82; p.vy *= 0.82;
      p.x += p.vx; p.y += p.vy;
    }
    // fade with distance from home
    const dist = Math.hypot(p.x - p.hx, p.y - p.hy);
    ctx.globalAlpha = Math.max(0, 1 - dist / 160);
    ctx.fillRect(p.x, p.y, 2, 2);
  });
  ctx.globalAlpha = 1;
  requestAnimationFrame(tick);
})();`,
  prompt: `Build the Fragment Disintegration in native300×320px geometry, preserving its actual effect, state machine, timing, pointer capture and keyboard behavior. Keep the supplied photographs or literal fragment effect as the visual focus. Remove external instrument headers, formulas and telemetry. Use a calm pale surface or dark effect field as appropriate, with a quiet small control beneath. Set visible UI in regular Inter400, normal tracking; headlines may be24–28px, captions10–11px. Preserve the exact meaningful color of the demonstrated effect, semantic states, polite feedback, reset, reduced motion and resource cleanup. Do not replace an effect with a static illustration.`,
});

/* ------------------------------------------------------------
   Clip-path reveal wipe
------------------------------------------------------------ */
INTRX.register({
  id: 'clip-reveal',
  title: 'Clip-Path Image Reveal',
  cat: 'Image & WebGL',
  rootClass: 'd-clip',
  tags: ['clip-path', 'inset'],
  libs: [],
  desc: 'Images wipe in via animated clip-path insets while the image itself counter-scales from 1.3 to 1 — the parallax-unmask that opens most award-site case studies.',
  seen: 'Seen on: basically every SOTD case study; popularized by Locomotive',
  hint: 'click replay',
  html: `
<div class="d-clip">
  <div class="d-clip-row">
    <figure class="d-clip-fig" style="--d:0s"><div class="d-clip-img d-clip-i1"></div></figure>
    <figure class="d-clip-fig" style="--d:0.15s"><div class="d-clip-img d-clip-i2"></div></figure>
    <figure class="d-clip-fig" style="--d:0.3s"><div class="d-clip-img d-clip-i3"></div></figure>
  </div>
  <button class="d-clip-replay"><svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false"><path d="M19.4 10a7.5 7.5 0 1 1-2-4M17 2v5h-5"/></svg><span>replay</span></button>
</div>`,
  css: `
.d-clip {
  width: 100%; height: 320px; background: #0a0a0b; position: relative;
  display: flex; align-items: center; justify-content: center;
}
.d-clip-row { display: flex; gap: 14px; }
.d-clip-fig {
  width: 150px; height: 200px; margin: 0; overflow: hidden;
  clip-path: inset(100% 0 0 0);
  transition: clip-path 1s cubic-bezier(0.77, 0, 0.175, 1);
  transition-delay: var(--d);
}
.d-clip-img {
  width: 100%; height: 100%;
  transform: scale(1.3);
  transition: transform 1.2s cubic-bezier(0.77, 0, 0.175, 1);
  transition-delay: var(--d);
}
.d-clip.d-clip-in .d-clip-fig { clip-path: inset(0 0 0 0); }
.d-clip.d-clip-in .d-clip-img { transform: scale(1); }
.d-clip-img.d-clip-i1 { background: linear-gradient(160deg, #3c5a18, #0f1a08); }
.d-clip-img.d-clip-i2 { background: linear-gradient(160deg, #1f3a52, #0b141f); }
.d-clip-img.d-clip-i3 { background: linear-gradient(160deg, #52301f, #1f0b0b); }
.d-clip-replay {
  position: absolute; bottom: 16px; left: 50%; transform: translateX(-50%);
  background: none; border: 1px solid #2e2e34; color: #9b9ba3;
  font-family: "JetBrains Mono", monospace; font-size: 11px; padding: 6px 14px; cursor: pointer;
}
.d-clip-replay:hover { color: #c8ff2e; border-color: #c8ff2e; }
.d-clip-row{width:88%;gap:9px}.d-clip-fig{flex:1;min-width:0;width:auto;height:180px;border:1px solid #343438}.d-clip-img{position:relative;background:#171719!important}.d-clip-img:before{content:'';position:absolute;left:18%;right:18%;top:18%;height:54%;border:1px solid #84848c;background:repeating-linear-gradient(0deg,transparent 0 9px,#55555c 9px 10px);transform:skewY(-18deg)}.d-clip-i2:before{transform:rotate(45deg);top:25%;height:38%;border-color:#fa7319;background:none}.d-clip-i3:before{border-radius:50%;background:repeating-linear-gradient(90deg,transparent 0 7px,#55555c 7px 8px);transform:none}.d-clip-img:after{position:absolute;left:12px;bottom:12px;color:#b8b8be;font:12px monospace;content:'01'}.d-clip-i2:after{content:'02'}.d-clip-i3:after{content:'03'}.d-clip-replay:hover{color:#fa7319;border-color:#fa7319}@media(prefers-reduced-motion:reduce){.d-clip-fig,.d-clip-img{transition:none}}
/* Photographic field studies, with restrained readable captions. */
.d-clip-img:before{display:none}.d-clip-img.d-clip-i1{background:center/cover url("{{asset:coastal-stack}}")!important}.d-clip-img.d-clip-i2{background:60% center/cover url("{{asset:limestone-pavilion}}")!important}.d-clip-img.d-clip-i3{background:center/cover url("{{asset:atlantic-shore}}")!important}.d-clip-img:after{font:500 10px "Inter","Segoe UI",Arial,sans-serif;color:#fff;text-shadow:0 1px 5px #0009}.d-clip-fig{border-color:#ffffff0d;border-radius:3px}.d-clip-replay{font:500 11px "Inter","Segoe UI",Arial,sans-serif;border-radius:5px;background:linear-gradient(#292b2e,#212326)}.d-clip{background:#e8ebe4;padding:20px 15px}.d-clip-row{gap:10px}.d-clip-fig{border-radius:2px}.d-clip-replay{font:400 11px "Inter",system-ui,sans-serif;letter-spacing:0;background:none;border:1px solid #a2b58d4f;border-radius:15px;color:#849674;padding:6px 14px}.d-clip-img:after{font:400 10px "Inter",system-ui,sans-serif;color:#f0f3e8}.d-clip [class$="-label"],.d-clip [class$="-side"],.d-clip [class$="-spec"],.d-clip [class$="-measure"]{display:none}
.d-clip-replay{display:inline-flex;align-items:center;justify-content:center;gap:5px;min-height:28px;line-height:1}.d-clip-replay svg{display:block;flex:none;pointer-events:none}`,
  js: `
function play() {
  root.classList.remove('d-clip-in');
  void root.offsetWidth;       // reflow to restart transitions
  root.classList.add('d-clip-in');
}
root.querySelector('.d-clip-replay').addEventListener('click', play);
requestAnimationFrame(play);`,
  prompt: `Build the Clip-Path Image Reveal in native300×320px geometry, preserving its actual effect, state machine, timing, pointer capture and keyboard behavior. Keep the supplied photographs or literal fragment effect as the visual focus. Remove external instrument headers, formulas and telemetry. Use a calm pale surface or dark effect field as appropriate, with a quiet small control beneath. Set visible UI in regular Inter400, normal tracking; headlines may be24–28px, captions10–11px. Preserve the exact meaningful color of the demonstrated effect, semantic states, polite feedback, reset, reduced motion and resource cleanup. Do not replace an effect with a static illustration.`,
});

/* ------------------------------------------------------------
   Hover zoom + caption
------------------------------------------------------------ */
INTRX.register({
  id: 'hover-zoom-card',
  title: 'Hover Zoom Project Card',
  cat: 'Image & WebGL',
  rootClass: 'd-hz',
  tags: ['scale', 'overlay'],
  libs: [],
  desc: 'The classic project-grid hover: image zooms inside its clipped frame, a gradient scrim fades in, the caption slides up, and an arrow chip appears — all pure CSS.',
  seen: 'Seen on: portfolio grids everywhere — pentagram.com, area17.com',
  hint: 'hover the cards',
  html: `
<div class="d-hz">
  <a class="d-hz-card" href="#" onclick="return false">
    <div class="d-hz-img d-hz-a"></div>
    <div class="d-hz-scrim"></div>
    <div class="d-hz-meta"><em>01 — Architecture</em><strong>Limestone</strong></div>
    <span class="d-hz-arrow">↗</span>
  </a>
  <a class="d-hz-card" href="#" onclick="return false">
    <div class="d-hz-img d-hz-b"></div>
    <div class="d-hz-scrim"></div>
    <div class="d-hz-meta"><em>02 — Landscape</em><strong>Coastal rock</strong></div>
    <span class="d-hz-arrow">↗</span>
  </a>
</div>`,
  css: `
.d-hz {
  width: 100%; height: 320px; background: #0a0a0b;
  display: flex; align-items: center; justify-content: center; gap: 18px;
}
.d-hz-card {
  position: relative; width: 240px; height: 240px; overflow: hidden;
  text-decoration: none; border: 1px solid #2e2e34; display: block;
}
.d-hz-img {
  position: absolute; inset: 0;
  transform: scale(1.01);
  transition: transform 0.8s cubic-bezier(0.22, 1, 0.36, 1);
}
.d-hz-img.d-hz-a { background: radial-gradient(circle at 30% 30%, #3c5a18, #0f1a08 70%); }
.d-hz-img.d-hz-b { background: radial-gradient(circle at 70% 40%, #1f3a52, #0b141f 70%); }
.d-hz-card:hover .d-hz-img { transform: scale(1.08); }
.d-hz-scrim {
  position: absolute; inset: 0;
  background: linear-gradient(to top, rgba(0,0,0,0.75), transparent 55%);
  opacity: 0; transition: opacity 0.4s;
}
.d-hz-card:hover .d-hz-scrim { opacity: 1; }
.d-hz-meta {
  position: absolute; left: 16px; bottom: 14px;
  transform: translateY(14px); opacity: 0;
  transition: transform 0.5s cubic-bezier(0.22, 1, 0.36, 1), opacity 0.4s;
}
.d-hz-card:hover .d-hz-meta { transform: none; opacity: 1; }
.d-hz-meta em { display: block; font-style: normal; font-family: "Roboto Mono", "JetBrains Mono", monospace; font-size: 10px; color: #fa7319; letter-spacing: 0.14em; }
.d-hz-meta strong { color: #fff; font-size: 18px; }
.d-hz-arrow {
  position: absolute; top: 12px; right: 12px;
  width: 32px; height: 32px; display: grid; place-items: center;
  background: #fa7319; color: #000; font-size: 15px;
  transform: translate(8px, -8px); opacity: 0;
  transition: transform 0.4s cubic-bezier(0.22, 1, 0.36, 1), opacity 0.3s;
}
.d-hz-card:hover .d-hz-arrow { transform: none; opacity: 1; }
.d-hz.d-hz-idle .d-hz-a { animation: d-hz-idle-a 6s ease-in-out infinite alternate; }
.d-hz.d-hz-idle .d-hz-b { animation: d-hz-idle-b 6.8s ease-in-out infinite alternate; }
@keyframes d-hz-idle-a { to { transform: scale(1.055) translate(-4px, -3px); } }
@keyframes d-hz-idle-b { to { transform: scale(1.05) translate(4px, 3px); } }
@media (prefers-reduced-motion: reduce) { .d-hz.d-hz-idle .d-hz-img { animation: none; } }
.d-hz{gap:12px;padding:0 20px;box-sizing:border-box}.d-hz-card{width:calc(50% - 6px);height:214px}.d-hz-img{background:#19191c!important}.d-hz-img:before{content:'';position:absolute;left:22%;right:22%;top:18%;height:54%;border:1px solid #777780;transform:skewY(-23deg);background:repeating-linear-gradient(0deg,transparent 0 12px,#44444c 12px 13px)}.d-hz-b:before{border-radius:50%;transform:none;border-color:#fa7319;background:repeating-linear-gradient(90deg,transparent 0 9px,#55555e 9px 10px)}.d-hz-meta{left:12px;right:8px;bottom:14px;opacity:.75;transform:translateY(4px)}.d-hz-meta em{font-size:8px;letter-spacing:.04em}.d-hz-meta strong{font:500 14px/1.5 monospace}.d-hz-card:hover .d-hz-meta{opacity:1}.d-hz-arrow{width:24px;height:24px;font-size:13px}.d-hz-card:focus-visible{outline:1px solid #fa7319;outline-offset:3px}
/* Photographic field studies, with restrained readable captions. */
.d-hz-img:before{display:none}.d-hz-img.d-hz-a{background:center/cover url("{{asset:limestone-pavilion}}")!important}.d-hz-img.d-hz-b{background:center/cover url("{{asset:coastal-stack}}")!important}.d-hz-meta{opacity:1;transform:none}.d-hz-meta em{font:500 9px "Inter","Segoe UI",Arial,sans-serif;letter-spacing:.025em;color:#d4dadd}.d-hz-meta strong{font:500 18px/1.15 "Inter","Segoe UI",Arial,sans-serif;letter-spacing:-.03em;color:#f0f3f4}.d-hz-scrim{opacity:1;background:linear-gradient(transparent 45%,#06090dad)}.d-hz-card{border-color:#ffffff12;border-radius:5px}.d-hz{background:#e8ebe4;padding:18px 14px;gap:12px}.d-hz-card{height:224px;border-radius:3px}.d-hz-meta{left:13px;right:10px;bottom:18px}.d-hz-meta em{font:400 9px "Inter",system-ui,sans-serif;letter-spacing:0;text-transform:none;color:#f0f3e2bf}.d-hz-meta strong{font:400 18px/1.08 "Inter",system-ui,sans-serif;letter-spacing:-.02em}.d-hz-arrow{font:400 15px "Inter",system-ui,sans-serif;right:12px;top:12px}.d-hz [class$="-label"],.d-hz [class$="-side"],.d-hz [class$="-spec"],.d-hz [class$="-measure"]{display:none}`,
  js: `
const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
let idle = !reduced;
function stopIdle() {
  if (!idle) return;
  idle = false;
  root.classList.remove('d-hz-idle');
}
if (!reduced) {
  root.classList.add('d-hz-idle');
  root.addEventListener('pointerover', stopIdle, { once: true });
  root.addEventListener('pointerdown', stopIdle, { once: true });
  root.addEventListener('keydown', stopIdle, { once: true });
}

// Optional: parallax the image toward the cursor while hovered:
root.querySelectorAll('.d-hz-card').forEach(function (card) {
  const img = card.querySelector('.d-hz-img');
  card.addEventListener('pointermove', function (e) {
    stopIdle();
    const b = card.getBoundingClientRect();
    const px = (e.clientX - b.left) / b.width - 0.5;
    const py = (e.clientY - b.top) / b.height - 0.5;
    img.style.transform = 'scale(1.08) translate(' + (px * -8) + 'px,' + (py * -8) + 'px)';
  });
  card.addEventListener('mouseleave', function () { img.style.transform = ''; });
});`,
  prompt: `Build the Hover Zoom Project Card in native300×320px geometry, preserving its actual effect, state machine, timing, pointer capture and keyboard behavior. Keep the supplied photographs or literal fragment effect as the visual focus. Remove external instrument headers, formulas and telemetry. Use a calm pale surface or dark effect field as appropriate, with a quiet small control beneath. Set visible UI in regular Inter400, normal tracking; headlines may be24–28px, captions10–11px. Preserve the exact meaningful color of the demonstrated effect, semantic states, polite feedback, reset, reduced motion and resource cleanup. Do not replace an effect with a static illustration.`,
});

/* ------------------------------------------------------------
   Pixelation reveal
------------------------------------------------------------ */
INTRX.register({
  id: 'pixelate-reveal',
  title: 'Pixelation Reveal',
  cat: 'Image & WebGL',
  rootClass: 'd-pix',
  tags: ['mosaic', 'canvas 2d'],
  libs: [],
  desc: 'A photographic resolution study with six inspectable steps, a keyboard-accessible slider, and a replay control. The canvas samples the supplied coastal image at each resolution.',
  seen: 'Seen on: obys.agency projects, brutalist fashion e-commerce, glitch-era portfolios',
  hint: 'adjust resolution or replay the reveal',
  html: `<div class="d-pix"><div class="d-pix-image"><canvas class="d-pix-canvas" width="600" height="520" aria-label="A coastal rock formation revealed through six pixel resolutions"></canvas><button class="d-pix-play" type="button" aria-label="Replay pixel reveal"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false"><path d="M19.4 10a7.5 7.5 0 1 1-2-4M17 2v5h-5"/></svg></button></div><label class="d-pix-control"><span>Resolution</span><input type="range" min="0" max="5" step="1" value="5" aria-label="Image resolution"><output>Full</output></label></div>`,
  css: `.d-pix{height:320px;width:100%;box-sizing:border-box;display:grid;grid-template-rows:minmax(0,1fr) 46px;background:#eeeee9;font-family:"Inter",system-ui,sans-serif;color:#65695e;overflow:hidden}.d-pix-image{position:relative;min-height:0;overflow:hidden}.d-pix-canvas{display:block;width:100%;height:100%;object-fit:cover;image-rendering:pixelated}.d-pix-play{position:absolute;right:12px;bottom:12px;width:30px;height:30px;border:1px solid #ffffff55;border-radius:50%;background:#24392d39;backdrop-filter:blur(8px);color:#fff;font:400 19px "Inter",system-ui,sans-serif;cursor:pointer}.d-pix-control{display:flex;align-items:center;gap:12px;padding:0 15px;font:400 11px "Inter",system-ui,sans-serif}.d-pix-control input{min-width:0;width:100%;height:3px;accent-color:#627259;cursor:pointer}.d-pix-control output{width:28px;text-align:right;font-variant-numeric:tabular-nums;flex-shrink:0}.d-pix button:focus-visible,.d-pix input:focus-visible{outline:2px solid #627259;outline-offset:4px}.d-pix [class$="-label"],.d-pix [class$="-side"],.d-pix [class$="-spec"],.d-pix [class$="-measure"]{display:none}
.d-pix-play{display:grid;place-items:center;padding:0;line-height:1}.d-pix-play svg{display:block;pointer-events:none}`,
  js: `const canvas=root.querySelector('canvas'),ctx=canvas.getContext('2d'),range=root.querySelector('input'),out=root.querySelector('output'),replay=root.querySelector('button');
const source=new Image(),buf=document.createElement('canvas'),steps=[.02,.04,.08,.16,.32,1];let level=5,timer=0,loaded=false;
function draw(){if(!loaded)return;const w=Math.round(canvas.width*steps[level]),h=Math.round(canvas.height*steps[level]);buf.width=w;buf.height=h;const s=buf.getContext('2d'),ratio=Math.max(w/source.width,h/source.height),dw=source.width*ratio,dh=source.height*ratio;s.drawImage(source,(w-dw)/2,(h-dh)/2,dw,dh);ctx.imageSmoothingEnabled=false;ctx.clearRect(0,0,canvas.width,canvas.height);ctx.drawImage(buf,0,0,canvas.width,canvas.height);range.value=level;out.textContent=level===5?'Full':Math.round(steps[level]*100)+'%';}
range.addEventListener('input',()=>{clearTimeout(timer);level=Number(range.value);draw()});
function reveal(){clearTimeout(timer);level=0;draw();function next(){if(!root.isConnected)return;if(level<5){level++;draw();timer=setTimeout(next,180)}}timer=setTimeout(next,300)}
replay.addEventListener('click',reveal);source.onload=()=>{loaded=true;draw()};source.src='{{asset:coastal-stack}}';
function resize(){const b=root.querySelector('.d-pix-image').getBoundingClientRect(),dpr=Math.min(2,devicePixelRatio||1);canvas.width=Math.max(1,Math.round(b.width*dpr));canvas.height=Math.max(1,Math.round(b.height*dpr));draw()}if('ResizeObserver'in window)new ResizeObserver(resize).observe(root);resize();`,
  prompt: `Create a native 300×320px photograph pixel-reveal demo. Use the supplied coastal-stack photograph, covering the canvas above a slim warm-white resolution control. Do not synthesize placeholder artwork or add a title overlay. Draw the image through a cached temporary canvas at six resolutions 2%,4%,8%,16%,32%,100%, then enlarge with image smoothing disabled. A semantic range control lets users inspect every resolution, with an accurate percentage output and Full at maximum. A small glass replay button within the photograph starts coarse and reveals at 180ms steps after a short initial pause. Manual input cancels replay. Load the source asynchronously and draw only after onload. Use regular Inter, subtle controls, tabular numeric labels, visible keyboard focus, and keep the photograph as the visual focus. Match the canvas backing dimensions to the measured image area with a capped device-pixel ratio, redraw on resize, and stop replay when the component disconnects.`,
});

/* ------------------------------------------------------------
   Grayscale-to-color hover grid
------------------------------------------------------------ */
INTRX.register({
  id: 'grayscale-grid',
  title: 'Focus Grid (Dim Siblings)',
  cat: 'Image & WebGL',
  rootClass: 'd-gray',
  tags: ['filter', ':has()'],
  libs: [],
  desc: 'Hovering one item restores its color and dims + desaturates every sibling. Modern CSS does it without JS via :has(). Directs the eye instantly.',
  seen: 'Seen on: team pages, photo indexes — hoverstat.es galleries',
  hint: 'hover the tiles',
  html: `
<div class="d-gray">
  <div class="d-gray-grid">
    <div class="d-gray-tile d-gray-t1"></div>
    <div class="d-gray-tile d-gray-t2"></div>
    <div class="d-gray-tile d-gray-t3"></div>
    <div class="d-gray-tile d-gray-t4"></div>
    <div class="d-gray-tile d-gray-t5"></div>
  </div>
</div>`,
  css: `
.d-gray {
  width: 100%; height: 320px; background: #0a0a0b;
  display: flex; align-items: center; justify-content: center;
}
.d-gray-grid { display: flex; gap: 12px; }
.d-gray-tile {
  width: 110px; height: 160px; border: 1px solid #2e2e34;
  transition: filter 0.45s, opacity 0.45s, transform 0.45s cubic-bezier(0.22, 1, 0.36, 1);
}
.d-gray-tile.d-gray-t1 { background: linear-gradient(160deg, #c8ff2e, #3c5a18); }
.d-gray-tile.d-gray-t2 { background: linear-gradient(160deg, #8bd0ff, #1f3a52); }
.d-gray-tile.d-gray-t3 { background: linear-gradient(160deg, #ff8b6a, #52301f); }
.d-gray-tile.d-gray-t4 { background: linear-gradient(160deg, #d0a3ff, #3a1f52); }
.d-gray-tile.d-gray-t5 { background: linear-gradient(160deg, #ffe08b, #52481f); }
/* when the grid contains a hovered tile, mute everything… */
.d-gray-grid:has(.d-gray-tile:hover) .d-gray-tile:not(:hover) { filter: grayscale(1) brightness(0.45); opacity: 0.6; }
/* …except the hovered one */
.d-gray-grid .d-gray-tile:hover { filter: none; opacity: 1; transform: translateY(-8px); }
.d-gray.d-gray-idle .d-gray-tile { animation: d-gray-idle 5s ease-in-out infinite; }
.d-gray.d-gray-idle .d-gray-tile:nth-child(2) { animation-delay: .42s; }
.d-gray.d-gray-idle .d-gray-tile:nth-child(3) { animation-delay: .84s; }
.d-gray.d-gray-idle .d-gray-tile:nth-child(4) { animation-delay: 1.26s; }
.d-gray.d-gray-idle .d-gray-tile:nth-child(5) { animation-delay: 1.68s; }
@keyframes d-gray-idle { 0%, 14%, 100% { transform: none; opacity: 1; } 7% { transform: translateY(-5px) scale(1.015); opacity: .82; } }
@media (prefers-reduced-motion: reduce) { .d-gray.d-gray-idle .d-gray-tile { animation: none; } }
.d-gray-grid{width:88%;gap:7px}.d-gray-tile{position:relative;width:auto;flex:1;min-width:0;height:160px;overflow:hidden;background:#202024!important}.d-gray-tile:before{content:'';position:absolute;left:20%;right:20%;top:20%;height:52%;border:1px solid var(--ink,#c77b51);background:repeating-linear-gradient(0deg,transparent 0 8px,var(--ink,#c77b51) 8px 9px);transform:skewY(-20deg)}.d-gray-t2{--ink:#70909d}.d-gray-t3{--ink:#aaa188}.d-gray-t4{--ink:#778f78}.d-gray-t5{--ink:#a47a86}.d-gray-t2:before,.d-gray-t4:before{border-radius:50%;transform:none}.d-gray-tile:after{position:absolute;left:8px;bottom:10px;content:'01';color:#aaaab2;font:10px monospace}.d-gray-t2:after{content:'02'}.d-gray-t3:after{content:'03'}.d-gray-t4:after{content:'04'}.d-gray-t5:after{content:'05'}
/* Photographic field studies, with restrained readable captions. */
.d-gray-tile:before{display:none}.d-gray-tile:after{color:#fff;text-shadow:0 1px 4px #0009;font:500 10px "Inter","Segoe UI",Arial,sans-serif}.d-gray-tile{border-radius:3px;border:1px solid #ffffff0c}.d-gray .d-gray-t1{background:42% center/cover url("{{asset:coastal-stack}}")!important}.d-gray .d-gray-t2{background:58% center/cover url("{{asset:limestone-pavilion}}")!important}.d-gray .d-gray-t3{background:35% center/cover url("{{asset:atlantic-shore}}")!important}.d-gray .d-gray-t4{background:72% center/cover url("{{asset:limestone-pavilion}}")!important}.d-gray .d-gray-t5{background:65% center/cover url("{{asset:coastal-stack}}")!important}.d-gray{background:#e8ebe4;padding:20px 13px}.d-gray-grid{gap:7px}.d-gray-tile{border-radius:2px;height:198px}.d-gray-tile:after{font:400 10px "Inter",system-ui,sans-serif}.d-gray [class$="-label"],.d-gray [class$="-side"],.d-gray [class$="-spec"],.d-gray [class$="-measure"]{display:none}`,
  js: `
const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
let idle = !reduced;
function stopIdle() {
  if (!idle) return;
  idle = false;
  root.classList.remove('d-gray-idle');
}
if (!reduced) {
  root.classList.add('d-gray-idle');
  root.addEventListener('pointerover', stopIdle, { once: true });
  root.addEventListener('pointerdown', stopIdle, { once: true });
  root.addEventListener('keydown', stopIdle, { once: true });
}

// The :has() selector handles sibling dimming. Fallback for older browsers:
if (!CSS.supports('selector(:has(*))')) {
  const tiles = root.querySelectorAll('.d-gray-tile');
  tiles.forEach(function (tile) {
    tile.addEventListener('mouseenter', function () {
      tiles.forEach(function (t) {
        t.style.filter = t === tile ? 'none' : 'grayscale(1) brightness(0.45)';
      });
    });
  });
  root.addEventListener('mouseleave', function () {
    tiles.forEach(function (t) { t.style.filter = ''; });
  });
}`,
  prompt: `Build the Focus Grid (Dim Siblings) in native300×320px geometry, preserving its actual effect, state machine, timing, pointer capture and keyboard behavior. Keep the supplied photographs or literal fragment effect as the visual focus. Remove external instrument headers, formulas and telemetry. Use a calm pale surface or dark effect field as appropriate, with a quiet small control beneath. Set visible UI in regular Inter400, normal tracking; headlines may be24–28px, captions10–11px. Preserve the exact meaningful color of the demonstrated effect, semantic states, polite feedback, reset, reduced motion and resource cleanup. Do not replace an effect with a static illustration.`,
});

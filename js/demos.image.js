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
  css: `
.d-glsl {
  width: 100%; height: 320px; background: #0a0a0b;
  display: flex; align-items: center; justify-content: center;
}
.d-glsl-canvas { width: 480px; max-width: 90%; border: 1px solid #2e2e34; cursor: crosshair; }`,
  js: `
const canvas = root.querySelector('.d-glsl-canvas');
const gl = canvas.getContext('webgl');

// --- procedural texture (swap for a real image via new Image() + crossOrigin) ---
const tex = document.createElement('canvas');
tex.width = 512; tex.height = 288;
const t = tex.getContext('2d');
const g = t.createLinearGradient(0, 0, 512, 288);
g.addColorStop(0, '#1b2a10'); g.addColorStop(0.55, '#3c5a18'); g.addColorStop(1, '#0b141f');
t.fillStyle = g; t.fillRect(0, 0, 512, 288);
for (let i = 0; i < 70; i++) {
  t.fillStyle = 'hsla(' + (70 + Math.random() * 60) + ', 70%, ' + (30 + Math.random() * 40) + '%, 0.25)';
  t.beginPath();
  t.arc(Math.random() * 512, Math.random() * 288, Math.random() * 40 + 4, 0, 7);
  t.fill();
}
t.fillStyle = '#c8ff2e'; t.font = '700 44px sans-serif';
t.fillText('HOVER', 30, 250);

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
})(0);`,
  prompt: `
Build a WebGL hover-distortion image effect in raw WebGL (no three.js).

Requirements:
- Replace an <img> with a <canvas>; draw the image as a texture on a fullscreen triangle-strip quad.
- Fragment shader uniforms: uTime, uMouse (normalized, y flipped), uHover (0..1).
- Distortion: compute distance d from uv to uMouse; ripple = sin(d * 28 - uTime * 4); displace uv radially away from the mouse by uHover * 0.045 * ripple * smoothstep(0.55, 0.0, d); add a horizontal sine wobble uv.x += sin(uv.y * 12 + uTime * 2) * 0.012 * uHover.
- Chromatic aberration: sample the R and B channels with ±0.008 uv offsets scaled by uHover.
- Ease uHover toward 1 on mouseenter and 0 on mouseleave with lerp factor ~0.06 in the render loop, so the warp blooms and relaxes smoothly.
- Set texture CLAMP_TO_EDGE (non-power-of-two safe) and handle image loading with crossOrigin = 'anonymous'.
- Fall back to the plain <img> if WebGL is unavailable.`,
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
}`,
  js: `
const canvas = root.querySelector('.d-frag-canvas');
const ctx = canvas.getContext('2d');
const state = root.querySelector('.d-frag-state');
const W = canvas.width, H = canvas.height;

// --- render the source once to an offscreen canvas, then sample it ---
const src = document.createElement('canvas');
src.width = W; src.height = H;
const s = src.getContext('2d');
s.fillStyle = '#c8ff2e';
s.font = '700 110px sans-serif';
s.textAlign = 'center'; s.textBaseline = 'middle';
s.fillText('MAGIC', W / 2, H / 2);

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
  ctx.fillStyle = '#c8ff2e';
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
  prompt: `
Build a fragment-disintegration (magic dissolve/reform) effect with Canvas 2D, vanilla JS.

Requirements:
- Render the source (text, logo, or an image) to an offscreen canvas, then getImageData and sample every 3rd pixel with alpha > 128 into a particle: {homeX, homeY, x, y, vx, vy, seed, delay}.
- delay = (x / width) * 0.6 + random * 0.2 so the dissolve sweeps across the element rather than popping at once.
- Dissolve mode: after its delay each particle accelerates with a base drift plus sine/cos turbulence keyed off its seed and a global clock; alpha fades proportionally to distance from home (fully gone by ~160px).
- Reform mode: particles spring back (accel = (home - pos) * 0.06, velocity damped * 0.82) and alpha returns as they approach home.
- Draw particles as 2x2 rects; single rAF loop; toggle modes on click.
- For an image source, keep each particle's sampled RGBA color instead of a flat fill.`,
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
  <button class="d-clip-replay">↻ replay</button>
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
.d-clip-replay:hover { color: #c8ff2e; border-color: #c8ff2e; }`,
  js: `
function play() {
  root.classList.remove('d-clip-in');
  void root.offsetWidth;       // reflow to restart transitions
  root.classList.add('d-clip-in');
}
root.querySelector('.d-clip-replay').addEventListener('click', play);
requestAnimationFrame(play);`,
  prompt: `
Build clip-path image reveals, CSS-driven with a JS trigger.

Requirements:
- Each figure starts at clip-path: inset(100% 0 0 0) (fully clipped from the bottom) and transitions to inset(0 0 0 0) over 1s with cubic-bezier(0.77, 0, 0.175, 1).
- The image inside starts at transform: scale(1.3) and settles to scale(1) over 1.2s with the same ease — the counter-scale is what makes it feel like an unmasking, not a wipe.
- Stagger siblings ~150ms apart via a --d custom property on transition-delay.
- Trigger by toggling a class when the section enters the viewport (IntersectionObserver, once).
- Variants: inset(0 100% 0 0) for left-to-right, inset(0 0 0 100%) for right-to-left.
- Under prefers-reduced-motion, show images unclipped immediately.`,
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
    <div class="d-hz-meta"><em>01 — Brand</em><strong>Neon District</strong></div>
    <span class="d-hz-arrow">↗</span>
  </a>
  <a class="d-hz-card" href="#" onclick="return false">
    <div class="d-hz-img d-hz-b"></div>
    <div class="d-hz-scrim"></div>
    <div class="d-hz-meta"><em>02 — Web</em><strong>Field Notes</strong></div>
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
.d-hz-meta em { display: block; font-style: normal; font-family: "JetBrains Mono", monospace; font-size: 10px; color: #c8ff2e; letter-spacing: 0.14em; }
.d-hz-meta strong { color: #fff; font-size: 18px; }
.d-hz-arrow {
  position: absolute; top: 12px; right: 12px;
  width: 32px; height: 32px; display: grid; place-items: center;
  background: #c8ff2e; color: #000; font-size: 15px;
  transform: translate(8px, -8px); opacity: 0;
  transition: transform 0.4s cubic-bezier(0.22, 1, 0.36, 1), opacity 0.3s;
}
.d-hz-card:hover .d-hz-arrow { transform: none; opacity: 1; }`,
  js: `
// Pure CSS — no JS required.
// Optional: parallax the image toward the cursor while hovered:
root.querySelectorAll('.d-hz-card').forEach(function (card) {
  const img = card.querySelector('.d-hz-img');
  card.addEventListener('mousemove', function (e) {
    const b = card.getBoundingClientRect();
    const px = (e.clientX - b.left) / b.width - 0.5;
    const py = (e.clientY - b.top) / b.height - 0.5;
    img.style.transform = 'scale(1.08) translate(' + (px * -8) + 'px,' + (py * -8) + 'px)';
  });
  card.addEventListener('mouseleave', function () { img.style.transform = ''; });
});`,
  prompt: `
Build a project-card hover treatment, CSS-first.

Requirements:
- Card is overflow: hidden. The image starts at scale(1.01) and eases to scale(1.08) on hover over 0.8s with cubic-bezier(0.22,1,0.36,1).
- A bottom gradient scrim (rgba black to transparent at 55%) fades in over 0.4s.
- Caption (category eyebrow + title) slides up 14px and fades in with the same spring-like ease.
- An arrow chip in the top-right corner translates in diagonally from (8px, -8px).
- Optional JS enhancement: while hovered, translate the image a few px opposite to the cursor for micro-parallax; reset on leave.
- All transforms only — no width/height/box-shadow animation.`,
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
  desc: 'The image resolves from giant blocks to full resolution in stepped jumps by re-drawing a tiny downscale back up with image smoothing off. Retro-digital, very fashion-tech.',
  seen: 'Seen on: obys.agency projects, brutalist fashion e-commerce, glitch-era portfolios',
  hint: 'hover to pixelate, leave to resolve',
  html: `
<div class="d-pix">
  <canvas class="d-pix-canvas" width="480" height="260"></canvas>
</div>`,
  css: `
.d-pix {
  width: 100%; height: 320px; background: #0a0a0b;
  display: flex; align-items: center; justify-content: center;
}
.d-pix-canvas { width: 480px; max-width: 92%; border: 1px solid #2e2e34; cursor: crosshair; image-rendering: pixelated; }`,
  js: `
const canvas = root.querySelector('.d-pix-canvas');
const ctx = canvas.getContext('2d');
const W = canvas.width, H = canvas.height;

// procedural source image (swap for a loaded <img>)
const src = document.createElement('canvas');
src.width = W; src.height = H;
const s = src.getContext('2d');
const g = s.createLinearGradient(0, 0, W, H);
g.addColorStop(0, '#52301f'); g.addColorStop(0.5, '#c8ff2e'); g.addColorStop(1, '#1f3a52');
s.fillStyle = g; s.fillRect(0, 0, W, H);
s.fillStyle = '#0a0a0b'; s.font = '700 80px sans-serif';
s.textAlign = 'center'; s.textBaseline = 'middle';
s.fillText('PIXEL', W / 2, H / 2);

// stepped resolutions: fraction of full size
const STEPS = [0.02, 0.04, 0.08, 0.16, 0.35, 1];
let step = STEPS.length - 1, target = STEPS.length - 1;

function draw() {
  const f = STEPS[step];
  const w = Math.max(1, Math.round(W * f));
  const h = Math.max(1, Math.round(H * f));
  ctx.imageSmoothingEnabled = false;
  ctx.clearRect(0, 0, W, H);
  // downscale to a tiny buffer, then stretch back up
  const buf = document.createElement('canvas');
  buf.width = w; buf.height = h;
  buf.getContext('2d').drawImage(src, 0, 0, w, h);
  ctx.drawImage(buf, 0, 0, w, h, 0, 0, W, H);
}

// step toward the target resolution every 70ms (discrete jumps sell the effect)
setInterval(function () {
  if (step < target) step++;
  else if (step > target) step--;
  draw();
}, 70);

canvas.addEventListener('mouseenter', function () { target = 0; });
canvas.addEventListener('mouseleave', function () { target = STEPS.length - 1; });
draw();`,
  prompt: `
Build a pixelation reveal effect with Canvas 2D, vanilla JS.

Requirements:
- Draw the source image to a canvas through a stepped-resolution pipeline: for pixelation factor f, draw the image into an offscreen buffer of size (W*f, H*f), then draw that buffer stretched back to full size with imageSmoothingEnabled = false.
- Use discrete steps [0.02, 0.04, 0.08, 0.16, 0.35, 1] and move one step toward the target every ~70ms — the visible jumps are the aesthetic; do not tween smoothly.
- Reveal on scroll-into-view (start at 0.02, target 1) or invert it as a hover effect.
- Set image-rendering: pixelated on the canvas.
- Handle real images with crossOrigin = 'anonymous' and start after load.`,
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
.d-gray-grid:has(.d-gray-tile:hover) .d-gray-tile { filter: grayscale(1) brightness(0.45); opacity: 0.6; }
/* …except the hovered one */
.d-gray-grid .d-gray-tile:hover { filter: none; opacity: 1; transform: translateY(-8px); }`,
  js: `
// Zero JS — the :has() selector handles sibling dimming.
// Fallback for older browsers:
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
  prompt: `
Build a "focus grid" hover — hovering one item dims all siblings. CSS-first.

Requirements:
- Grid of image tiles. When any tile is hovered, all tiles get filter: grayscale(1) brightness(0.45) and opacity 0.6, except the hovered tile, which stays full color and lifts translateY(-8px).
- Implement with pure CSS :has(): .grid:has(.tile:hover) .tile { …muted… } and .tile:hover { filter: none; }.
- Transitions ~0.45s; the lift uses cubic-bezier(0.22,1,0.36,1).
- Provide a small JS fallback (mouseenter/mouseleave toggling inline filters) gated behind CSS.supports('selector(:has(*))').`,
});

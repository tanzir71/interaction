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

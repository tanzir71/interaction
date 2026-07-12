/* Verify that CODEX_HANDOFF.md is partitioned into published demos and roadmap chips.
   Only registry files actually loaded by index.html count as published; stray or
   in-progress files in js/ are intentionally ignored. */
const fs = require('fs');
const vm = require('vm');

const html = fs.readFileSync('index.html', 'utf8');
const handoff = fs.readFileSync('CODEX_HANDOFF.md', 'utf8');
const categoryByHeading = {
  'Cursor & pointer-reactive': 'Cursor',
  'Raster, dither & glitch': 'Raster & Glitch',
  'Skeuomorphism & physicality': 'Skeuomorph',
  'Scroll': 'Scroll',
  'Text & type': 'Text & Type',
  'Image & WebGL': 'Image & WebGL',
  'SVG & line': 'SVG & Line',
  '3D & perspective': '3D & Perspective',
  'Physics & springs': 'Physics',
  'Liquid & organic': 'Liquid & Organic',
  'Galleries & sliders': 'Galleries & Sliders',
  'Navigation & menus': 'Navigation & Menus',
  'Buttons & micro-interactions': 'Buttons & Micro',
  'Forms & inputs': 'Forms & Inputs',
  'Loaders & progress': 'Loaders & Progress',
  'Data & numbers': 'Data & Numbers',
  'Ambient & generative': 'Ambient',
  'Sound & haptics': 'Sound & Haptics',
  'Play & easter eggs': 'Play & Easter Eggs',
  'Layout & UI': 'Layout & UI'
};

function title(id) {
  return id.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')
    .replace(/^Css3d /, 'CSS 3D ')
    .replace(/^Webgl /, 'WebGL ')
    .replace(/^Svg /, 'SVG ')
    .replace(/^Ascii /, 'ASCII ')
    .replace(/^Vhs /, 'VHS ')
    .replace(/^Otp /, 'OTP ')
    .replace(/^Dvd /, 'DVD ')
    .replace(/^Ui /, 'UI ');
}

let category = '';
const backlog = [];
for (const line of handoff.split(/\r?\n/)) {
  const heading = line.match(/^### (.+?)(?: \(|$)/);
  if (heading && categoryByHeading[heading[1]]) category = categoryByHeading[heading[1]];
  const item = line.match(/^- \[([ xX])\] `([^`]+)`[^—]*— (.+)$/);
  if (item && category) backlog.push({
    checked: item[1].toLowerCase() === 'x',
    id: item[2],
    title: title(item[2]),
    category,
    spec: item[3].trim()
  });
}

const registryFiles = [...html.matchAll(/<script src="(js\/demos\.[^"]+\.js)"><\/script>/g)].map(match => match[1]);
const context = {};
context.window = context;
vm.createContext(context);
for (const file of registryFiles) vm.runInContext(fs.readFileSync(file, 'utf8'), context, { filename: file });
const publishedIds = new Set(context.INTRX.demos.map(demo => demo.id));
const roadmap = backlog.filter(item => !publishedIds.has(item.id));

const roadmapHtml = (html.match(/<section class="roadmap"[\s\S]*?<\/section>/) || [''])[0];
const chipTitles = [...roadmapHtml.matchAll(/<span class="chip">([^<]+)<\/span>/g)].map(match => match[1]
  .replace(/&amp;/g, '&').replace(/&quot;/g, '"').replace(/&#39;/g, "'").trim());
const queuedLabel = roadmapHtml.match(/<span class="mono">(\d+) patterns queued<\/span>/);
const errors = [];

if (backlog.length !== 236) errors.push('handoff item count is ' + backlog.length + ', expected 236');
backlog.forEach(item => {
  const published = publishedIds.has(item.id);
  if (item.checked !== published) errors.push(item.id + ' checkbox does not match published state');
});
if (!queuedLabel || Number(queuedLabel[1]) !== roadmap.length) errors.push('queued label does not equal ' + roadmap.length);
if (chipTitles.length !== roadmap.length) errors.push('chip count is ' + chipTitles.length + ', expected ' + roadmap.length);
roadmap.forEach((item, index) => {
  if (chipTitles[index] !== item.title) errors.push('chip ' + (index + 1) + ': expected "' + item.title + '", got "' + (chipTitles[index] || '') + '"');
});

const report = {
  handoff: backlog.length,
  publishedFromBacklog: backlog.length - roadmap.length,
  roadmap: roadmap.length,
  firstQueued: roadmap[0] || null,
  registryFiles
};
console.log(JSON.stringify(report, null, 2));
if (errors.length) {
  errors.forEach(error => console.error('ERROR:', error));
  process.exitCode = 1;
} else {
  console.log('PASS — every handoff item is either published or represented by one roadmap chip');
}

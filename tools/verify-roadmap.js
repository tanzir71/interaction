/* Verify that both CODEX handoffs are partitioned into published demos and roadmap chips.
   Only registry files actually loaded by index.html count as published; stray or
   in-progress files in js/ are intentionally ignored. */
const fs = require('fs');
const vm = require('vm');

const html = fs.readFileSync('index.html', 'utf8');
const handoffFiles = ['CODEX_HANDOFF.md', 'CODEX_HANDOFF_2.md'];
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
  'Layout & UI': 'Layout & UI',
  'FUI & Terminal': 'FUI & Terminal',
  'ASCII & glyph': 'Raster & Glitch',
  'Maps & Geo': 'Maps & Geo',
  'Agent & AI UI': 'Agent & AI UI',
  'Skeuomorph': 'Skeuomorph',
  'Buttons, layout & micro': 'Layout & UI'
};
const categoryById = {
  'voxel-assemble': '3D & Perspective',
  'css3d-exploded-device': '3D & Perspective',
  'btn-polish-stages': 'Buttons & Micro',
  'mega-menu-preview': 'Navigation & Menus'
};

function title(id) {
  return id.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')
    .replace(/^Css3d /, 'CSS 3D ')
    .replace(/^Webgl /, 'WebGL ')
    .replace(/^Svg /, 'SVG ')
    .replace(/^Ascii /, 'ASCII ')
    .replace(/^Fui /, 'FUI ')
    .replace(/ 3d( |$)/, ' 3D$1')
    .replace(/^Op1 /, 'OP-1 ')
    .replace(/^Btn /, 'Button ')
    .replace(/^Scrollsnap /, 'Scroll Snap ')
    .replace(/^Vhs /, 'VHS ')
    .replace(/^Otp /, 'OTP ')
    .replace(/^Dvd /, 'DVD ')
    .replace(/^Ui /, 'UI ');
}

const backlog = [];
for (const file of handoffFiles) {
  let category = '';
  const handoff = fs.readFileSync(file, 'utf8');
  for (const line of handoff.split(/\r?\n/)) {
    const heading = line.match(/^### (.+?)(?: \(|$)/);
    if (heading && categoryByHeading[heading[1]]) category = categoryByHeading[heading[1]];
    const item = line.match(/^- \[([ xX])\] `([^`]+)`[^—]*— (.+)$/);
    if (item && category) backlog.push({
      checked: item[1].toLowerCase() === 'x',
      id: item[2],
      title: title(item[2]),
      category: categoryById[item[2]] || category,
      spec: item[3].trim()
    });
  }
}

const registryFiles = [...html.matchAll(/<script src="(js\/demos\.[^"]+\.js)"><\/script>/g)].map(match => match[1]);
const context = {};
context.window = context;
vm.createContext(context);
for (const file of registryFiles) vm.runInContext(fs.readFileSync(file, 'utf8'), context, { filename: file });
const demos = context.INTRX.demos;
const demoIds = demos.map(demo => demo.id);
const publishedIds = new Set(demoIds);
const roadmap = backlog.filter(item => !publishedIds.has(item.id));

const roadmapHtml = (html.match(/<section class="roadmap"[\s\S]*?<\/section>/) || [''])[0];
const chipTitles = [...roadmapHtml.matchAll(/<span class="chip">([^<]+)<\/span>/g)].map(match => match[1]
  .replace(/&amp;/g, '&').replace(/&quot;/g, '"').replace(/&#39;/g, "'").trim());
const queuedLabel = roadmapHtml.match(/<span class="mono">(\d+) patterns queued<\/span>/);
const errors = [];

if (backlog.length !== 292) errors.push('handoff item count is ' + backlog.length + ', expected 292');
const backlogIds = backlog.map(item => item.id);
if (new Set(backlogIds).size !== backlogIds.length) errors.push('duplicate IDs across handoff files');
if (publishedIds.size !== demoIds.length) errors.push('duplicate IDs across published registries');
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
  handoffs: { original: 236, expansion: 56, total: backlog.length },
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

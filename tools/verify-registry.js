/* Verify every published registry entry and apply the stricter Handoff 2 contract. */
const fs = require('fs');
const vm = require('vm');

const {demos,files,metadata,context}=require('./load-registry')();
const h2 = fs.readFileSync('CODEX_HANDOFF_2.md', 'utf8');
const h2Ids = new Set([...h2.matchAll(/^- \[[ xX]\] `([^`]+)`/gm)].map(match => match[1]));
const categories=Object.values(context.INTRX.groups).flat();
const dramsCatalog=JSON.parse(fs.readFileSync('DRAMS_CATALOG.json','utf8'));
const expectedCount=Object.keys(metadata).length;
const errors = [];
const warnings = [];
const manifest=JSON.parse(fs.readFileSync('INTRX-handover/manifest/components.json','utf8')).components;
for(const row of manifest.filter(row=>row.origin==='repo'))if(!demos.some(d=>d.id===row.id))errors.push('MISSING ORIGINAL '+row.id);
for(const row of manifest){const demo=demos.find(d=>d.id===row.id);if(!demo)errors.push('MISSING V4 COMPONENT '+row.id);else if(demo.title!==row.title)errors.push('V4 TITLE '+row.id+': expected '+JSON.stringify(row.title)+', got '+JSON.stringify(demo.title));}
for(const demo of demos)if(!manifest.some(row=>row.id===demo.id))errors.push('UNLISTED V4 COMPONENT '+demo.id);
for(const file of fs.readdirSync('js').filter(name=>/^demos\..*\.js$/.test(name)))if(!files.includes('js/'+file))errors.push('UNLISTED REGISTRY FILE '+file);

const required = ['id','title','cat','rootClass','desc','seen','hint','html','css','js','prompt'];
const forbiddenRuntime = [/\bfetch\s*\(/, /XMLHttpRequest/, /localStorage/, /https?:\/\//];

demos.forEach(demo => {
  required.forEach(key => { if (!demo[key]) errors.push('MISSING ' + demo.id + ' ' + key); });
  if (!Array.isArray(demo.tags) || !Array.isArray(demo.libs)) errors.push('INVALID ARRAYS ' + demo.id);
  if (!demo.html.includes(demo.rootClass)) errors.push('ROOT NOT IN HTML ' + demo.id);
  if (!categories.includes(demo.cat)) errors.push('UNKNOWN CATEGORY ' + demo.id + ' ' + demo.cat);
  if (demo.prompt.trim().length < 300) errors.push('PROMPT TOO THIN ' + demo.id);
  try { new Function('root', 'stage', 'ctx', '{\n' + demo.js + '\n}'); } catch (error) { errors.push('JS COMPILE ' + demo.id + ' ' + error.message); }

  // Typography and material palettes are intentional per-demo decisions.
  // The current design brief includes local Inter and pale DRAMS surfaces.

  if (!h2Ids.has(demo.id)) return;
  ['html','css','js','prompt'].forEach(key => {
    const value = demo[key];
    if (value.includes('`') || value.includes('${')) errors.push('TEMPLATE-LITERAL HAZARD ' + demo.id + ' ' + key);
  });
  for (const match of demo.html.matchAll(/class="([^"]+)"/g)) {
    match[1].split(/\s+/).filter(Boolean).forEach(name => {
      if (!name.startsWith(demo.rootClass)) errors.push('UNPREFIXED HTML CLASS ' + demo.id + ' .' + name);
    });
  }
  const prefix = '.' + demo.rootClass.split('-')[0] + '-';
  demo.css.replace(/\/\*[^]*?\*\//g, '').split('}').forEach(rule => {
    const selector = rule.split('{')[0];
    if (!selector || !selector.includes('.')) return;
    selector.split(',').forEach(part => {
      const first = (part.trim().match(/^\.[a-zA-Z][\w-]*/) || [])[0];
      if (first && !first.startsWith(prefix) && first !== '.' + demo.rootClass) {
        errors.push('BARE UNPREFIXED SELECTOR ' + demo.id + ' ' + part.trim());
      }
    });
  });
  if (/position\s*:\s*fixed/i.test(demo.css)) errors.push('FIXED POSITION ' + demo.id);
  forbiddenRuntime.forEach(pattern => {
    const runtimeSource = (demo.html + demo.css + demo.js).replace(/https?:\/\/www\.w3\.org\/2000\/svg/g, 'svg-namespace');
    if (pattern.test(runtimeSource)) errors.push('EXTERNAL OR PERSISTENT IO ' + demo.id + ' ' + pattern);
  });
});

const ids = demos.map(demo => demo.id);
const handoff2Published = ids.filter(id => h2Ids.has(id)).length;
if (new Set(ids).size !== ids.length) errors.push('DUPLICATE DEMO IDS');
if (demos.length !== expectedCount) errors.push('DEMO COUNT ' + demos.length + ', expected '+expectedCount);
const drams = demos.filter(demo => demo.cat === 'DRAMS');
if (drams.length !== dramsCatalog.items.length) errors.push('DRAMS COUNT '+drams.length+', expected '+dramsCatalog.items.length);
dramsCatalog.items.forEach(item => {
  const demo = drams.find(d => d.id === item.id);
  if (!demo) { errors.push('MISSING DRAMS COMPONENT '+item.number+' '+item.title); return; }
  if (demo.source?.url !== item.url) errors.push('INCORRECT DRAMS SOURCE '+item.id);
  if (demo.libs.length || /<iframe/i.test(demo.html)) errors.push('DRAMS MUST BE NATIVE '+item.id);
});
if (demos.filter(d => d.cat === 'Framer Collection').length !== 4) errors.push('FRAMER COUNTERS: expected 4');
const showcase = demos.filter(demo => demo.cat === 'Interactive Showcase');
if (showcase.length !== 16) errors.push('SHOWCASE COUNT ' + showcase.length + ', expected 16');
showcase.forEach(demo => {
  if (!demo.source || !/^https:\/\//.test(demo.source.url) || !demo.source.name) errors.push('MISSING SOURCE ' + demo.id);
  if (demo.libs.length) errors.push('SHOWCASE DEPENDENCY ' + demo.id);
});
if (handoff2Published !== 56) errors.push('HANDOFF 2 PUBLISHED ' + handoff2Published + ', expected 56');

console.log(JSON.stringify({ demos: demos.length, files: files.length, handoff2Published }, null, 2));
warnings.forEach(warning => console.warn('WARNING:', warning));
if (errors.length) {
  errors.forEach(error => console.error('ERROR:', error));
  process.exitCode = 1;
} else {
  console.log('PASS — published registry and Handoff 2 constraints verified');
}

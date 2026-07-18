/* Verify every published registry entry and apply the stricter Handoff 2 contract. */
const fs = require('fs');
const vm = require('vm');

const html = fs.readFileSync('index.html', 'utf8');
const app = fs.readFileSync('js/app.js', 'utf8');
const h2 = fs.readFileSync('CODEX_HANDOFF_2.md', 'utf8');
const h2Ids = new Set([...h2.matchAll(/^- \[[ xX]\] `([^`]+)`/gm)].map(match => match[1]));
const categories = app.match(/CAT_ORDER = \[(.*?)\]/s)[1].match(/'[^']+'/g).map(value => value.slice(1, -1));
const files = [...html.matchAll(/<script src="(js\/demos\.[^"]+\.js)"><\/script>/g)].map(match => match[1]);
const context = {};
context.window = context;
vm.createContext(context);
files.forEach(file => vm.runInContext(fs.readFileSync(file, 'utf8'), context, { filename: file }));

const demos = context.INTRX.demos;
const errors = [];
const required = ['id','title','cat','rootClass','desc','seen','hint','html','css','js','prompt'];
const forbiddenRuntime = [/\bfetch\s*\(/, /XMLHttpRequest/, /localStorage/, /https?:\/\//];

demos.forEach(demo => {
  required.forEach(key => { if (!demo[key]) errors.push('MISSING ' + demo.id + ' ' + key); });
  if (!Array.isArray(demo.tags) || !Array.isArray(demo.libs)) errors.push('INVALID ARRAYS ' + demo.id);
  if (!demo.html.includes(demo.rootClass)) errors.push('ROOT NOT IN HTML ' + demo.id);
  if (!categories.includes(demo.cat)) errors.push('UNKNOWN CATEGORY ' + demo.id + ' ' + demo.cat);
  if (demo.prompt.trim().length < 300) errors.push('PROMPT TOO THIN ' + demo.id);
  try { new Function('root', 'stage', demo.js); } catch (error) { errors.push('JS COMPILE ' + demo.id + ' ' + error.message); }

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
  for (const match of demo.css.matchAll(/\.([a-zA-Z][\w-]*)/g)) {
    if (!match[1].startsWith(demo.rootClass)) errors.push('UNPREFIXED CSS CLASS ' + demo.id + ' .' + match[1]);
  }
  if (/position\s*:\s*fixed/i.test(demo.css)) errors.push('FIXED POSITION ' + demo.id);
  forbiddenRuntime.forEach(pattern => {
    if (pattern.test(demo.html + demo.css + demo.js)) errors.push('EXTERNAL OR PERSISTENT IO ' + demo.id + ' ' + pattern);
  });
});

const ids = demos.map(demo => demo.id);
if (new Set(ids).size !== ids.length) errors.push('DUPLICATE DEMO IDS');
if (demos.length !== 287) errors.push('DEMO COUNT ' + demos.length + ', expected 287');

console.log(JSON.stringify({ demos: demos.length, files: files.length, handoff2Published: ids.filter(id => h2Ids.has(id)).length }, null, 2));
if (errors.length) {
  errors.forEach(error => console.error('ERROR:', error));
  process.exitCode = 1;
} else {
  console.log('PASS — published registry and Handoff 2 constraints verified');
}

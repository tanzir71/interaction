/* Full-view ink, exact native artwork, layout preservation and offline palette checks. */
const fs = require('node:fs');
const path = require('node:path');
const crypto = require('node:crypto');
const assert = require('node:assert/strict');
const {chromium} = require(process.env.PLAYWRIGHT_MODULE || 'playwright');
const registry = require('./load-registry')();
const fixture = require('./fixtures/component-palettes-before.json');
const assets = require('../assets/demo-assets.json');
const catalog = require('../registry/index.json');
const base = (process.argv.find(v => /^https?:/.test(v)) || 'http://127.0.0.1:4173').replace(/\/$/, '');
const output = path.resolve(process.argv.find(v => v.startsWith('--output='))?.slice(9) || '.artifacts/component-palettes', new Date().toISOString().replace(/[:.]/g, '-'));
fs.mkdirSync(output, {recursive:true});
const hash = value => crypto.createHash('sha256').update(value).digest('hex');
const files = [__filename, 'tools/fixtures/component-palettes-before.json', 'css/foundations.css', 'css/fonts.css', 'js/demo-runtime.js', 'js/shell/stage.js', 'assets/demo-assets.json', 'registry/index.json', ...fixture.items.flatMap(item => [registry.filesById[item.definition.id], 'r/'+item.definition.id+'.json'])];
const inputs = Object.fromEntries(files.map(file => [file, hash(fs.readFileSync(file))]));
const report = {started:new Date().toISOString(), inputs, scope:'Nine full-view palettes; original controller hashes, exact initial layout and native pixels at two widths, themes and motion settings, plus fresh offline full exports. Contrast checks cover listed text and light chart marks on the Stage surface, not photographic captions or whole-catalog WCAG acceptance.', layouts:[], native:[], ink:[], graphs:[], exports:[]};
const save = () => fs.writeFileSync(path.join(output, 'report.json'), JSON.stringify(report, null, 2)+'\n');
const selectors = {
 'text-accordion-squeeze':['.d-typeaccordion-row', '.d-typeaccordion-index'],
 'text-underline-magic':['.d-magicline-nav button', '.d-magicline-brand', '.d-magicline-copy>span', '.d-magicline-copy strong'],
 'text-numbers-slot':['.d-numberslot-label', '.d-numberslot-targets button:not([aria-pressed="true"])'],
 'text-highlighter-swipe':['.d-highlighter-article header>span', '.d-highlighter-article h2', '.d-highlighter-article footer'],
 'slider-progress-fraction':['.d-fraction-slider-header', '.d-fraction-slider-counter', '.d-fraction-slider-digit'],
 'chart-bars-race':['.d-barrace-demo-caption', '.d-barrace-demo-row>span', '.d-barrace-demo-row>b', '.d-barrace-demo-row>strong'],
 'sparkline-hover-scrub':['.d-spark-demo-head>span', '.d-spark-demo-head>strong', '.d-spark-demo-head>b', '.d-spark-demo-axis>span'],
 'ticker-tape-prices':['.d-ticker-demo-item>b', '.d-ticker-demo-item>strong', '.d-ticker-demo-table>div', '.d-ticker-demo-table li>span'],
 'radar-sweep-blips':['.d-radar-demo-list>span', '.d-radar-demo-list li']
};
for (const item of fixture.items) {
 const demo = registry.demos.find(d => d.id === item.definition.id);
 assert.equal(hash(demo.js), item.jsSHA256, 'Unchanged controller '+demo.id);
 for (const [key, value] of Object.entries(item.definition)) if (key !== 'css') assert.deepEqual(JSON.parse(JSON.stringify(demo[key])), value, 'Unchanged '+demo.id+'.'+key);
 assert(demo.css.startsWith(item.definition.css), 'Original CSS remains an exact prefix');
 const suffix = demo.css.slice(item.definition.css.length).replace(/\/\*[\s\S]*?\*\//g, '').trim();
 const rules = [...suffix.matchAll(/([^{}]+)\{([^{}]*)\}/g)];
 assert.equal(rules.map(r=>r[0]).join(''), suffix);
 for (const [, selector, declarations] of rules) {
  for (const part of selector.split(',')) assert(part.trim().startsWith('.stage[data-mode="full"]'), 'Full-only palette selector');
  for (const declaration of declarations.split(';').filter(Boolean)) assert(['color','background','border-color','stroke','fill'].includes(declaration.split(':')[0]), 'Palette-only declaration');
 }
}
async function mount(browser, demo, {width, theme, reduced, mode}) {
 const context = await browser.newContext({viewport:{width,height:1000}, deviceScaleFactor:width<600?2:1, reducedMotion:reduced?'reduce':'no-preference'});
 const page = await context.newPage(), errors=[];
 page.on('pageerror', e=>errors.push(e.message));
 await page.goto(base+'/tools/fixtures/showcase-fields/rig.html');
 await page.evaluate(({base,assets,theme})=>{
  const link=document.createElement('base');link.href=base+'/';document.head.prepend(link);
  document.documentElement.dataset.theme=theme;
  window.INTRX={resolveAssets:value=>value.replace(/\{\{asset:([\w-]+)\}\}/g,(_,name)=>{if(!assets[name])throw Error('Unknown asset '+name);return base+'/'+assets[name];})};
 }, {base,assets,theme});
 for(const file of ['css/foundations.css','css/fonts.css']) await page.addStyleTag({url:base+'/'+file});
 for(const file of ['js/demo-runtime.js','js/shell/stage.js']) await page.addScriptTag({url:base+'/'+file});
 const entry=catalog.find(d=>d.id===demo.id), data={...demo,fullAssetRefs:entry.fullAssetRefs,photoCredits:entry.photoCredits,stage:{...demo.stage,theme}};
 await page.evaluate(({data,width,mode})=>{
  const create=INTRX.createRuntime;INTRX.createRuntime=stage=>{const runtime=create(stage);runtime.suspend();return runtime;};
  document.body.replaceChildren();document.body.style.margin='0';
  const stage=document.createElement('div');stage.className='demo-stage stage';Object.assign(stage.style,{position:'relative',width:(mode==='thumb'?Math.min(372,width):width)+'px',height:(mode==='thumb'?264:720)+'px'});document.body.append(stage);INTRX.mountStage(data,stage,mode);
  if(stage.dataset.bootError)throw Error('Failed to mount '+data.id);
 }, {data,width,mode});
 await page.evaluate(()=>document.fonts.ready);
 await page.evaluate(()=>Promise.all([...document.images].map(image=>image.decode())));
 const geometry=await page.evaluate(()=>{
  const stage=document.querySelector('.stage'),root=stage._root,origin=root.getBoundingClientRect();
  return [...root.querySelectorAll('*')].map(n=>{const r=n.getBoundingClientRect(),s=getComputedStyle(n);return [n.tagName,r.x-origin.x,r.y-origin.y,r.width,r.height,s.fontFamily,s.fontSize,s.fontWeight,s.letterSpacing,s.lineHeight,s.transform];});
 });
 return {page,context,geometry,errors,async close(){await page.evaluate(()=>document.querySelector('.stage')._runtime.dispose());await context.close();assert.deepEqual(errors,[]);}};
}
async function ink(page, id, theme) {
 return page.evaluate(({selectors,theme})=>{
  const luminance=rgb=>rgb.map(v=>{v/=255;return v<=.04045?v/12.92:((v+.055)/1.055)**2.4;}).reduce((s,v,i)=>s+v*[.2126,.7152,.0722][i],0);
  // The light Kit glow varies from244 to255. Its darkest surface is conservative for dark ink.
  const bg=theme==='light'?[244,244,244]:[21,21,21],b=luminance(bg),rows=[];
  for(const selector of selectors){const nodes=[...document.querySelectorAll(selector)];if(!nodes.length)throw Error('Missing ink selector '+selector);
   for(const n of nodes){const r=n.getBoundingClientRect(),s=getComputedStyle(n);if(!r.width||!r.height||s.visibility==='hidden')continue;const values=s.color.match(/[\d.]+/g).map(Number),alpha=values[3]??1,a=luminance(values.slice(0,3).map((v,i)=>v*alpha+bg[i]*(1-alpha)));rows.push({selector,text:n.textContent.trim().slice(0,80),color:s.color,ratio:(Math.max(a,b)+.05)/(Math.min(a,b)+.05)});}
  }return rows;
 }, {selectors:selectors[id],theme});
}
save();
async function graphInk(page,id,theme){
 if(theme!=='light')return [];
 const marks={
  'chart-bars-race':[['.d-barrace-demo-bar i','backgroundColor']],
  'sparkline-hover-scrub':[['.d-spark-demo-line','stroke']],
  'radar-sweep-blips':[['.d-radar-demo-scope','borderTopColor'],['.d-radar-demo-ring','borderTopColor']]
 };
 if(!marks[id])return [];
 return page.evaluate(marks=>{
  const lum=rgb=>rgb.map(v=>{v/=255;return v<=.04045?v/12.92:((v+.055)/1.055)**2.4;}).reduce((s,v,i)=>s+v*[.2126,.7152,.0722][i],0),bg=lum([244,244,244]),rows=[];
  for(const[selector,property]of marks){const nodes=[...document.querySelectorAll(selector)];if(!nodes.length)throw Error('Missing chart mark '+selector);for(const node of nodes){const color=getComputedStyle(node)[property],rgb=color.match(/[\d.]+/g).map(Number);if(rgb.length!==3)throw Error('Opaque chart ink required');const fg=lum(rgb);rows.push({selector,property,color,ratio:(Math.max(fg,bg)+.05)/(Math.min(fg,bg)+.05)});}}
  return rows;
 },marks[id]);
}
(async()=>{
 const browser=await chromium.launch(process.env.INTRX_CHROME_EXECUTABLE?{executablePath:process.env.INTRX_CHROME_EXECUTABLE}:{});report.browser=browser.version();
 try{
  for(const item of fixture.items){const current=registry.demos.find(d=>d.id===item.definition.id),original={...item.definition,js:current.js};
   for(const width of [1440,390])for(const theme of ['dark','light'])for(const reduced of [true,false])for(const mode of ['thumb','full']){
    const spec={id:current.id,width,theme,reduced,mode},before=await mount(browser,original,{width,theme,reduced,mode});let beforePNG;
    try{if(mode==='thumb')beforePNG=await before.page.locator('.stage').screenshot({animations:'allow'});}finally{await before.close();}
    const after=await mount(browser,current,{width,theme,reduced,mode});try{
     assert.deepEqual(after.geometry,before.geometry,'Exact layout '+JSON.stringify(spec));report.layouts.push({...spec,elements:after.geometry.length,exact:true});
     const prefix=[current.id,width,theme,reduced?'reduced':'normal',mode].join('-');
     const png=await after.page.locator('.stage').screenshot({animations:'allow'});fs.writeFileSync(path.join(output,prefix+'.png'),png);
     if(mode==='thumb'){fs.writeFileSync(path.join(output,prefix+'-before.png'),beforePNG);assert(png.equals(beforePNG),'Exact native pixels '+prefix);report.native.push({...spec,sha256:hash(png),exact:true});}
     else {const rows=await ink(after.page,current.id,theme);for(const row of rows)assert(row.ratio>=4.5,'Readable full ink '+prefix+' '+JSON.stringify(row));report.ink.push({...spec,rows});const graphRows=await graphInk(after.page,current.id,theme);for(const row of graphRows)assert(row.ratio>=3,'Visible light chart mark '+prefix+' '+JSON.stringify(row));if(graphRows.length)report.graphs.push({...spec,rows:graphRows});}
    }finally{await after.close();}save();
   }
   for(const theme of ['dark','light']){
    const currentStage='"stage":'+JSON.stringify(current.stage),nextStage='"stage":'+JSON.stringify({...current.stage,theme});
    let code=JSON.parse(fs.readFileSync('r/'+current.id+'.json')).files[0].content;assert.equal(code.split(currentStage).length,2);code=code.replace(currentStage,nextStage);
    const context=await browser.newContext({viewport:{width:390,height:844},reducedMotion:'reduce'}),page=await context.newPage(),errors=[];page.on('pageerror',e=>errors.push(e.message));await page.route('**/*',route=>route.abort());
    try{await page.setContent(code);await page.evaluate(()=>document.fonts.ready);await page.evaluate(()=>Promise.all([...document.images].map(n=>n.decode())));await page.waitForTimeout(350);const rows=await ink(page,current.id,theme);for(const row of rows)assert(row.ratio>=4.5,'Offline full ink '+current.id+' '+JSON.stringify(row));const graphRows=await graphInk(page,current.id,theme);for(const row of graphRows)assert(row.ratio>=3,'Offline light chart mark '+current.id+' '+JSON.stringify(row));assert.deepEqual(errors,[]);report.exports.push({id:current.id,theme,rows,graphRows,errors});}finally{await context.close();}save();
   }
   console.log('PASS palette, native artwork and offline source:',current.id);
  }
  for(const[file,expected]of Object.entries(inputs))assert.equal(hash(fs.readFileSync(file)),expected,'Stable input '+file);
  report.finished=new Date().toISOString();report.sourceStable=true;save();console.log('PASS',report.layouts.length,'layouts;',report.native.length,'exact native crops;',report.exports.length,'fresh offline palettes');
 }finally{await browser.close();}
})().catch(error=>{report.error=error.stack;save();console.error(error.stack);process.exitCode=1;});

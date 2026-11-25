/* Full-view ink, exact native artwork, layout preservation and offline palette checks. */
const fs = require('node:fs');
const path = require('node:path');
const crypto = require('node:crypto');
const assert = require('node:assert/strict');
const {chromium} = require(process.env.PLAYWRIGHT_MODULE || 'playwright');
const registry = require('./load-registry')();
const dockNames = require('./verification/dock-control-names');
dockNames.validate(registry);
const fixture = require('./fixtures/interactive-palettes-before.json');
const titleReference = require('./verification/catalog-title-reference');
const assets = require('../assets/demo-assets.json');
const catalog = require('../registry/index.json');
const base = (process.argv.find(v => /^https?:/.test(v)) || 'http://127.0.0.1:4173').replace(/\/$/, '');
const output = path.resolve(process.argv.find(v => v.startsWith('--output='))?.slice(9) || '.artifacts/interactive-palettes', new Date().toISOString().replace(/[:.]/g, '-'));
if(require.main===module)fs.mkdirSync(output, {recursive:true});
const hash = value => crypto.createHash('sha256').update(value).digest('hex');
const files = [__filename, 'tools/fixtures/catalog-title-updates.json', 'tools/verification/catalog-title-reference.js', 'INTRX-handover/manifest/components.json', 'tools/fixtures/interactive-palettes-before.json', 'tools/fixtures/dock-names-before.json', 'tools/verification/dock-control-names.js', 'js/shell/registry.js', 'js/meta.stage.js', 'css/foundations.css', 'css/fonts.css', 'js/demo-runtime.js', 'js/shell/stage.js', 'assets/demo-assets.json', 'registry/index.json', ...fixture.items.flatMap(item => [registry.filesById[item.definition.id], 'r/'+item.definition.id+'.json'])];
const inputs = Object.fromEntries(files.map(file => [file, hash(fs.readFileSync(file))]));
const report = {started:new Date().toISOString(), inputs, scope:'Ten full preview repairs, exact original geometry and native CSS roundtrips, complete controller edit contracts, ancestor-opacity-aware contrast and fresh offline exports. Random Cipher strings are decorative incidental glyphs and retain their original low ink. Liquid percentage is tested against its dark physical halo; dynamic values require separate rendered coverage.', capture:'Chrome is launched with --disable-gpu for this CSS pixel comparison. Direct CDP capture follows two global frames while source runtime remains held. One priming readback is retained separately before the native baseline. Native checks apply and remove the exact CSS suffix on one initialized instance, preserving its clock, DOM, computed styles and pixels. Priming and separate-startup images remain recorded. Default GPU readback variance is retained separately and is not certified by this comparison.', browserArgs:['--disable-gpu'], layouts:[], native:[], ink:[], exports:[]};
const save = () => fs.writeFileSync(path.join(output, 'report.json'), JSON.stringify(report, null, 2)+'\n');
const checks = fixture.checks;

for(const item of fixture.items){
 const demo=registry.demos.find(d=>d.id===item.definition.id);let expected=item.definition.js;
 assert.equal(hash(expected),item.originalJS,'Original controller hash');
 for(const edit of item.edits){assert.equal(expected.split(edit.needle).length,2);expected=expected.replace(edit.needle,edit.replacement);}
 assert.equal(demo.js,expected,'Complete original controller plus exact full renderer insertions '+demo.id);assert.equal(hash(demo.js),item.jsSHA256);
 for(const[key,value]of Object.entries(titleReference(item.definition)))if(!['css','prompt','js'].includes(key))assert.deepEqual(JSON.parse(JSON.stringify(demo[key])),key==='controls'?dockNames.expectedControls(demo.id,value):value,'Unchanged '+demo.id+'.'+key);
 assert(demo.css.startsWith(item.definition.css),'Exact original CSS prefix');assert.notEqual(demo.prompt,item.definition.prompt);
 const suffix=demo.css.slice(item.definition.css.length).replace(/\/\*[\s\S]*?\*\//g,'').trim(),rules=[...suffix.matchAll(/([^{}]+)\{([^{}]*)\}/g)];assert.equal(rules.map(r=>r[0]).join(''),suffix);
 for(const[,selector,declarations]of rules){assert(selector.startsWith('.'+demo.rootClass+':is(.stage[data-mode="full"]'),'Component-first full-only selector');for(const declaration of declarations.split(';').filter(Boolean))assert(['color','background','box-shadow','border-radius','text-shadow','opacity'].includes(declaration.split(':')[0]),'Optical properties only');}
}
async function mount(browser, demo, {width, theme, reduced, mode}) {
 const context = await browser.newContext({viewport:{width,height:1000}, deviceScaleFactor:width<600?2:1, reducedMotion:reduced?'reduce':'no-preference'});
 const page = await context.newPage(), errors=[];
 page.on('pageerror', e=>errors.push(e.message));
 await page.goto(base+'/tools/fixtures/showcase-fields/rig.html');
 await page.evaluate(({base,assets,theme})=>{
  const link=document.createElement('base');link.href=base+'/';document.head.prepend(link);
  document.documentElement.dataset.theme=theme;
  window.INTRX={demos:[],register(d){this.demos.push(d);}};
 }, {base,assets,theme});
 for(const file of ['css/foundations.css','css/fonts.css']) await page.addStyleTag({url:base+'/'+file});
 for(const file of ['js/shell/registry.js','js/demo-runtime.js','js/shell/stage.js']) await page.addScriptTag({url:base+'/'+file});
 await page.evaluate(({base,assets})=>{INTRX.resolveAssets=value=>value.replace(/\{\{asset:([\w-]+)\}\}/g,(_,name)=>{if(!assets[name])throw Error('Unknown asset '+name);return base+'/'+assets[name];});},{base,assets});
 const entry=catalog.find(d=>d.id===demo.id), data={...demo,fullAssetRefs:entry.fullAssetRefs,photoCredits:entry.photoCredits,stage:{...demo.stage,theme}};
 await page.evaluate(({data,width,mode})=>{
  const create=INTRX.createRuntime;INTRX.createRuntime=stage=>{const runtime=create(stage);runtime.suspend();return runtime;};
  document.body.replaceChildren();document.body.style.margin='0';
  const stage=document.createElement('div');stage.className='demo-stage stage';Object.assign(stage.style,{position:'relative',width:(mode==='thumb'?Math.min(372,width):width)+'px',height:(mode==='thumb'?264:720)+'px'});document.body.append(stage);INTRX.register(data);INTRX.mountStage(data,stage,mode);
  if(stage.dataset.bootError)throw Error('Failed to mount '+data.id);
 }, {data,width,mode});
 await page.evaluate(()=>document.fonts.ready);
 await page.evaluate(()=>Promise.all([...document.images].map(image=>image.decode())));
 const animationObservation=mode==='full'?await page.evaluate(()=>document.querySelector('.stage')._root.getAnimations({subtree:true}).map(animation=>({target:animation.effect?.target?.getAttribute('class'),playState:animation.playState,currentTime:animation.currentTime}))):[];
 const geometry=await page.evaluate(()=>{
  const stage=document.querySelector('.stage'),root=stage._root,origin=root.getBoundingClientRect();
  return [...root.querySelectorAll('*')].map(n=>{const r=n.getBoundingClientRect(),s=getComputedStyle(n);return [n.tagName,r.x-origin.x,r.y-origin.y,r.width,r.height,s.fontFamily,s.fontSize,s.fontWeight,s.letterSpacing,s.lineHeight,s.transform];});
 });
 return {page,context,geometry,animationObservation,errors,async close(){await page.evaluate(()=>document.querySelector('.stage')._runtime.dispose());await context.close();assert.deepEqual(errors,[]);}};
}

async function ink(page,id,theme,extra=[]){return page.evaluate(({checks,theme})=>{
 const rgb=value=>{const m=value.match(/[\d.]+/g);if(!m)throw Error('No RGB '+value);return m.map(Number);},lum=rgb=>rgb.slice(0,3).map(v=>{v/=255;return v<=.04045?v/12.92:((v+.055)/1.055)**2.4;}).reduce((sum,v,i)=>sum+v*[.2126,.7152,.0722][i],0),stage=theme==='light'?[244,244,244]:[21,21,21],rows=[];
 for(const check of checks){const nodes=[...document.querySelectorAll(check.selector)];if(!nodes.length)throw Error('Missing ink selector '+check.selector);
  for(const node of nodes){const rect=node.getBoundingClientRect(),style=getComputedStyle(node);if(!rect.width||!rect.height||style.visibility==='hidden')continue;let surface=check.background,bg;
   if(surface?.self)bg=rgb(style.backgroundColor);else if(surface?.computed)bg=rgb(getComputedStyle(document.querySelector(surface.computed)).backgroundColor);else{if(typeof surface==='object')surface=surface[theme];if(surface==='stage')bg=stage;else{let hex=surface.slice(1);if(hex.length===3)hex=hex.split('').map(v=>v+v).join('');bg=[0,2,4].map(i=>parseInt(hex.slice(i,i+2),16));}}
   if(bg.length>3&&bg[3]!==1)throw Error('Opaque measured surface required '+check.selector);
   let opacity=1;for(let p=node;p;p=p.parentElement)opacity*=+getComputedStyle(p).opacity;
   const color=rgb(style.color),alpha=(color[3]??1)*opacity,a=lum(color.map((v,i)=>v*alpha+(bg[i]??0)*(1-alpha))),b=lum(bg),ratio=(Math.max(a,b)+.05)/(Math.min(a,b)+.05);
   if(check.halo){if(style.textShadow==='none')throw Error('Percentage requires its actual text halo');}
   rows.push({selector:check.selector,text:node.textContent.trim().slice(0,100),color:style.color,background:bg,opacity,ratio,...(check.halo?{textShadow:style.textShadow,method:'Nominal foreground against the dark halo; actual painted halo checked separately'}:{})});
  }
 }return {rows};
 },{checks:[...checks[id],...extra],theme});}
async function capture(rig) {
 await rig.page.evaluate(()=>new Promise(resolve=>requestAnimationFrame(()=>requestAnimationFrame(resolve))));
 const bounds=await rig.page.locator('.stage').boundingBox();assert(bounds,'Mounted Stage bounds');
 const session=await rig.context.newCDPSession(rig.page);
 try {const result=await session.send('Page.captureScreenshot',{format:'png',fromSurface:true,captureBeyondViewport:true,clip:{...bounds,scale:1}});return Buffer.from(result.data,'base64');}
 finally {await session.detach();}
}
async function nativeState(page){
 return page.evaluate(()=>{const stage=document.querySelector('.stage'),root=stage._root;return{root:{...root.dataset},stage:{...stage.dataset},clock:stage._runtime.now(),html:root.innerHTML,nodes:[root,...root.querySelectorAll('*')].map(node=>{const style=getComputedStyle(node);return{tag:node.tagName,classes:node.getAttribute('class'),style:Object.fromEntries([...style].map(key=>[key,style.getPropertyValue(key)]))};})};});
}
async function nativeDelta(rig,suffix,prefix){
 const priming=await capture(rig);
 const before=await capture(rig),state=await nativeState(rig.page);
 await rig.page.evaluate(css=>{const style=document.createElement('style');style.id='palette-delta-proof';style.textContent=css;document.head.append(style);},suffix);
 const matches=await rig.page.evaluate(()=>[...document.getElementById('palette-delta-proof').sheet.cssRules].filter(rule=>rule.selectorText).map(rule=>({selector:rule.selectorText,count:document.querySelectorAll(rule.selectorText).length})));
 assert(matches.length&&matches.every(rule=>rule.count===0),'Full-only CSS cannot match native nodes');
 assert.deepEqual(await nativeState(rig.page),state,'Native clock, DOM and every computed style survive the CSS delta');
 const after=await capture(rig);assert.deepEqual(await nativeState(rig.page),state,'Native state remains held through capture');
 await rig.page.evaluate(()=>document.getElementById('palette-delta-proof').remove());
 const restored=await capture(rig);assert.deepEqual(await nativeState(rig.page),state,'Removing the CSS delta preserves complete native state');
 for(const[name,png]of [['priming',priming],['before',before],['delta',after],['restored',restored]])fs.writeFileSync(path.join(output,prefix+'-'+name+'.png'),png);
 assert(before.equals(after)&&before.equals(restored),'Exact same-instance native CSS roundtrip '+prefix);
 return{sha256:hash(before),primingSHA256:hash(priming),primingEqualsBaseline:priming.equals(before),styleStateExact:true,clockHeld:true,matches,pixelsExact:true};
}
async function main(){save();
 // This is a CSS regression oracle, separate from the default-GPU timing audit.
 const browser=await chromium.launch({...(process.env.INTRX_CHROME_EXECUTABLE?{executablePath:process.env.INTRX_CHROME_EXECUTABLE}:{}),args:report.browserArgs});report.browser=browser.version();
 try{
  for(const item of fixture.items){const current=registry.demos.find(d=>d.id===item.definition.id),original=item.definition;
   for(const width of [1440,390])for(const theme of ['dark','light'])for(const reduced of [true,false])for(const mode of ['thumb','full']){
    const spec={id:current.id,width,theme,reduced,mode},before=await mount(browser,original,{width,theme,reduced,mode});let nativeProof;
    const prefix=[current.id,width,theme,reduced?'reduced':'normal',mode].join('-');
    try{if(mode==='thumb')nativeProof=await nativeDelta(before,current.css.slice(original.css.length),prefix);}finally{await before.close();}
    const after=await mount(browser,current,{width,theme,reduced,mode});try{
     assert.deepEqual(after.geometry,before.geometry,'Exact layout '+JSON.stringify(spec));report.layouts.push({...spec,elements:after.geometry.length,exact:true,...(mode==='full'?{pose:'Actual runtime-held pose; no animation seek',originalAnimations:before.animationObservation,currentAnimations:after.animationObservation}:{})});
     const png=await capture(after);fs.writeFileSync(path.join(output,prefix+'.png'),png);
     if(mode==='thumb')report.native.push({...spec,method:'same-instance CSS delta and restoration',...nativeProof,freshStartupSHA256:hash(png),exact:true});
     else {const result=await ink(after.page,current.id,theme);for(const row of result.rows)assert(row.ratio>=4.5,'Readable full ink '+prefix+' '+JSON.stringify(row));report.ink.push({...spec,...result});}
    }finally{await after.close();}save();
   }
   for(const theme of ['dark','light']){
    const currentStage='"stage":'+JSON.stringify(current.stage),nextStage='"stage":'+JSON.stringify({...current.stage,theme});
    let code=JSON.parse(fs.readFileSync('r/'+current.id+'.json')).files[0].content;assert.equal(code.split(currentStage).length,2);code=code.replace(currentStage,nextStage);
    const context=await browser.newContext({viewport:{width:390,height:844},reducedMotion:'reduce'}),page=await context.newPage(),errors=[];page.on('pageerror',e=>errors.push(e.message));await page.route('**/*',route=>route.abort());
    try{await page.setContent(code);await page.evaluate(()=>document.fonts.ready);await page.evaluate(()=>Promise.all([...document.images].map(n=>n.decode())));await page.waitForTimeout(350);const result=await ink(page,current.id,theme);for(const row of result.rows)assert(row.ratio>=4.5,'Offline full ink '+current.id+' '+JSON.stringify(row));assert.deepEqual(errors,[]);report.exports.push({id:current.id,theme,...result,errors});}finally{await context.close();}save();
   }
   console.log('PASS palette, native artwork and offline source:',current.id);
  }
  for(const[id,fields]of Object.entries(checks))for(const theme of ['dark','light'])for(const field of fields)assert(report.ink.some(item=>item.id===id&&item.theme===theme&&item.rows.some(row=>row.selector===field.selector)),'Every named field must render in each theme: '+id+' '+theme+' '+field.selector);
  for(const[file,expected]of Object.entries(inputs))assert.equal(hash(fs.readFileSync(file)),expected,'Stable input '+file);
  report.finished=new Date().toISOString();report.sourceStable=true;save();console.log('PASS',report.layouts.length,'layouts;',report.native.length,'exact native crops;',report.exports.length,'fresh offline palettes');
 }finally{await browser.close();}
}
module.exports={mount,ink,capture,registry,chromium,fixture};
if(require.main===module)main().catch(error=>{report.error=error.stack;save();console.error(error.stack);process.exitCode=1;});

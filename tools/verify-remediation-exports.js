#!/usr/bin/env node
const fs=require('node:fs'),path=require('node:path'),vm=require('node:vm'),crypto=require('node:crypto'),assert=require('node:assert/strict'),{pathToFileURL}=require('node:url');
const {chromium}=require(process.env.PLAYWRIGHT_MODULE||'playwright');
const R=require('./load-registry')(),ids=['agent-thinking-drawer','slot-machine-reel','zippo-flame','wax-seal-stamp','vinyl-player-card','punch-card-keyboard'],dir='.artifacts/remediation-cleanup/offline',hash=b=>crypto.createHash('sha256').update(b).digest('hex');
fs.mkdirSync(dir,{recursive:true});
const inputs=Object.fromEntries([...ids.map(id=>R.filesById[id]),'tools/verify-remediation-exports.js','js/demo-assets.js','js/export-data.js','js/shell/export.js','js/meta.stage.js'].map(f=>[f,hash(fs.readFileSync(f))]));
for(const f of['js/demo-assets.js','js/export-data.js','js/shell/export.js'])vm.runInContext(fs.readFileSync(f,'utf8'),R.context,{filename:f});
(async()=>{const browser=await chromium.launch({headless:true}),rows=[];
try{for(const id of ids)for(const theme of['dark','light'])for(const reduced of[false,true]){
 const demo=R.demos.find(d=>d.id===id),html=R.context.INTRX.buildCode({...demo,stage:{...demo.stage,theme}}),file=path.resolve(dir,id+'-'+theme+'-'+(reduced?'reduced':'normal')+'.html');
 assert(!/\{\{asset:[\w-]+\}\}/.test(html));assert(!/<script[^>]*\bsrc=/.test(html));assert(!/\.artifacts\//.test(html));
 fs.writeFileSync(file,html);const context=await browser.newContext({viewport:{width:390,height:844},reducedMotion:reduced?'reduce':'no-preference'}),page=await context.newPage(),errors=[],blocked=[];
 page.on('pageerror',e=>errors.push(e.stack||e.message));await page.route('**/*',route=>{if(route.request().url().startsWith('file:'))return route.continue();blocked.push(route.request().url());return route.abort();});
 try{await page.goto(pathToFileURL(file).href);await page.waitForFunction(()=>{const r=document.querySelector('.demo-stage')?._root;if(!r)return false;const f=r.__SkeuoInspect||r.__agentThinkingDrawerInspect;return f&&f().ready!==false;});
  await page.evaluate(()=>Promise.all([document.fonts.ready,...[...document.images].map(n=>n.decode())]));
  if(id==='punch-card-keyboard'){await page.locator('.d-punch-host-plane button[data-action=bold]').click();assert.equal(await page.evaluate(()=>document.querySelector('.demo-stage')._root.__SkeuoInspect().state.bold),true);await page.locator('.d-punch-host-plane button[data-action=reset]').click();assert.equal(await page.evaluate(()=>document.querySelector('.demo-stage')._root.__SkeuoInspect().state.bold),false);}
  else{const buttons=page.locator('.stage-dock button:not([hidden])');let acted=false;for(let i=0;i<await buttons.count();i++)if(await buttons.nth(i).isVisible()){await buttons.nth(i).click();acted=true;break;}assert(acted,id+' portable shared action');}
  assert.deepEqual(blocked,[]);assert.deepEqual(errors,[]);const resources=await page.evaluate(()=>({images:[...document.images].length,fonts:document.fonts.status,root:document.querySelector('.demo-stage')._root.className}));assert.equal(resources.fonts,'loaded');
  await page.evaluate(()=>document.querySelector('.demo-stage')._runtime.dispose());rows.push({id,theme,reduced,file:path.relative(process.cwd(),file).replaceAll('\\','/'),sha256:hash(fs.readFileSync(file)),bytes:Buffer.byteLength(html),blockedRequests:blocked.length,...resources});console.log('PASS '+id+' '+theme+' '+(reduced?'reduced':'normal')+' offline');
 }finally{await context.close();}
}
for(const[f,h]of Object.entries(inputs))assert.equal(hash(fs.readFileSync(f)),h,f+' changed');fs.writeFileSync('.artifacts/remediation-cleanup/exports.json',JSON.stringify({at:new Date().toISOString(),inputs,rows,scope:'24 fresh full exports at390px, dark/light and normal/reduced motion, with all network requests blocked. Complete current programs, photos/SVGs/fonts and working native/shared commands remain self-contained.'},null,2)+'\n');console.log('PASS '+rows.length+' fresh offline exports');
}finally{await browser.close();}})().catch(error=>{console.error(error.stack);process.exitCode=1;});

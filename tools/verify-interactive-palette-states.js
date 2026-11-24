/* Stateful contrast coverage. Uses physical controls and actual scroll offsets. */
const fs=require('node:fs'),path=require('node:path'),crypto=require('node:crypto'),assert=require('node:assert/strict');
const {mount,ink,chromium,registry,fixture}=require('./verify-interactive-palettes');
const {decode}=require('./verification/sound-png');
const output=path.resolve(process.argv.find(v=>v.startsWith('--output='))?.slice(9)||'.artifacts/interactive-palette-states',new Date().toISOString().replace(/[:.]/g,'-'));
fs.mkdirSync(output,{recursive:true});
const hash=value=>crypto.createHash('sha256').update(value).digest('hex');
const files=[__filename,'tools/verify-interactive-palettes.js','tools/verification/sound-png.js','tools/fixtures/interactive-palettes-before.json','css/foundations.css','js/demo-runtime.js','js/shell/stage.js',...fixture.items.map(i=>registry.filesById[i.definition.id])];
const report={started:new Date().toISOString(),scope:'Full theme interpolation, settled physical creator/timeline/autocomplete states, liquid 0/68/100 halos at two widths, sound controls and LED power/format. Transition opacity is retained, observed and distinguished from settled text. Decorative Cipher glyph strings keep their original artwork. This is not the whole catalog accessibility or performance acceptance.',inputs:Object.fromEntries(files.map(f=>[f,hash(fs.readFileSync(f))])),stories:[],ink:[],halos:[],themeModels:[]};
const save=()=>fs.writeFileSync(path.join(output,'report.json'),JSON.stringify(report,null,2)+'\n');save();
const current=id=>registry.demos.find(d=>d.id===id);
async function resume(page){await page.evaluate(()=>document.querySelector('.stage')._runtime.resume());await page.evaluate(()=>new Promise(resolve=>requestAnimationFrame(()=>requestAnimationFrame(resolve))));}
async function readable(page,id,theme,label,extra=[]){const result=await ink(page,id,theme,extra);assert(result.rows.length);for(const row of result.rows)assert(row.ratio>=4.5,label+' '+JSON.stringify(row));report.ink.push({id,theme,label,...result});save();}
async function model(page){return page.evaluate(()=>{const r=document.querySelector('.stage')._root;return(r.__agentExt||r.__layoutExt)?.inspect();});}
async function main(){
 const browser=await chromium.launch({...(process.env.INTRX_CHROME_EXECUTABLE?{executablePath:process.env.INTRX_CHROME_EXECUTABLE}:{}),args:['--mute-audio']});report.browser=browser.version();
 try{
  // Compare the complete original palette model, then render every actual offset.
  const id='scroll-color-theme',original=fixture.items.find(i=>i.definition.id===id).definition;
  const old=await mount(browser,original,{width:390,theme:'dark',reduced:false,mode:'full'}),now=await mount(browser,current(id),{width:390,theme:'dark',reduced:false,mode:'full'});
  try{
   const sample=page=>page.evaluate(()=>{const r=document.querySelector('.stage')._root;return Array.from({length:1001},(_,i)=>r.__ScrollModel(i,1001,1));});
   const before=await sample(old.page),after=await sample(now.page);assert.deepEqual(after,before,'All original palette channels and progress calculations');report.themeModels.push({samples:1001,exact:true,sha256:hash(JSON.stringify(after))});
   await resume(now.page);
   const rendered=await now.page.evaluate(()=>{
    const r=document.querySelector('.stage')._root,v=r.querySelector('.d-themescroll-viewport'),range=v.scrollHeight-v.clientHeight,rows=[];
    const rgb=s=>s.match(/[\d.]+/g).map(Number),lum=a=>a.slice(0,3).map(v=>(v/=255)<=.04045?v/12.92:((v+.055)/1.055)**2.4).reduce((s,v,i)=>s+v*[.2126,.7152,.0722][i],0),ratio=(a,b)=>(Math.max(lum(a),lum(b))+.05)/(Math.min(lum(a),lum(b))+.05);
    for(let i=0;i<=600;i++){
     v.scrollTo({top:range*i/600,behavior:'instant'});v.dispatchEvent(new Event('scroll'));
     const bg=rgb(getComputedStyle(v).backgroundColor),surface=r.querySelector('.d-themescroll-inspector'),sb=rgb(getComputedStyle(surface).backgroundColor),text=[...r.querySelectorAll('.d-themescroll-nav strong,.d-themescroll-route,.d-themescroll-chapter>span,.d-themescroll-chapter h2,.d-themescroll-chapter p')];
     const values=text.map(n=>({text:n.textContent.trim().slice(0,30),color:getComputedStyle(n).color,ratio:ratio(rgb(getComputedStyle(n).color),bg)}));values.push({text:'Palette',color:getComputedStyle(surface).color,ratio:ratio(rgb(getComputedStyle(surface).color),sb)});
     rows.push({requested:i/600,actual:v.scrollTop,progress:r.__ScrollInspect().value.progress,background:bg,surface:sb,values});
    }return rows;
   });
   for(const row of rendered)for(const value of row.values)assert(value.ratio>=4.5,'Interpolated palette '+JSON.stringify({progress:row.progress,...value}));
   report.themeRendered=rendered;
   const viewport=now.page.locator('.d-themescroll-viewport');await viewport.press('Home');assert.equal((await now.page.evaluate(()=>document.querySelector('.stage')._root.__ScrollInspect())).value.progress,0);await viewport.press('PageDown');assert((await now.page.evaluate(()=>document.querySelector('.stage')._root.__ScrollInspect())).value.progress>0);await viewport.press('End');assert((await now.page.evaluate(()=>document.querySelector('.stage')._root.__ScrollInspect())).value.progress>.999);
   report.stories.push({id,story:'1001 exact original model samples, 601 rendered fractional scroll states and physical Home/Page Down/End',pass:true});save();
  }finally{await old.close();await now.close();}
  for(const theme of['dark','light']){
   const creator=await mount(browser,current('ai-agent-creator'),{width:390,theme,reduced:false,mode:'full'});
   try{
    await resume(creator.page);
    for(let step=0;step<3;step++){
     await creator.page.locator('[data-ui=creator-step]').nth(step).click();await creator.page.waitForTimeout(450);assert.equal((await model(creator.page)).step,step);
     await readable(creator.page,'ai-agent-creator',theme,'Creator step '+step,step===1?[{selector:'.d-ext-agent-creator-creator-form label>span',background:'stage'}]:step===2?[{selector:'[data-ui=creator-tone][aria-checked=false]',background:'#202020'},{selector:'[data-ui=creator-tone][aria-checked=true]',background:theme==='light'?'#f5e8df':'#2b1e15'}]:[]);
    }
    await creator.page.locator('[data-ui=creator-tone]').nth(2).click();await creator.page.locator('[data-ui=creator-next]').click();await creator.page.waitForTimeout(550);const state=await model(creator.page);assert(state.complete);assert.equal(state.state.tone,2);assert.equal(state.model.roles.length,3);assert.equal(state.model.tones.length,3);assert.equal(state.model.tools.length,3);
    report.stories.push({id:'ai-agent-creator',theme,story:'Three physical creation steps and complete agent',state,pass:true});save();
   }finally{await creator.close();}
   for(const reduced of[false,true]){
    const timeline=await mount(browser,current('ui-timeline-progress'),{width:390,theme,reduced,mode:'full'});
    try{
     await resume(timeline.page);const field=timeline.page.locator('[data-ui=timeline]');
     for(const key of['End','Home','PageDown']){await field.press(key);await timeline.page.waitForTimeout(reduced?180:1500);const state=await model(timeline.page);assert.equal(state.items.length,4);for(let i=0;i<4;i++)assert.equal(state.states[i].reached,state.progress+1e-7>=i/3,'Original reached threshold');await readable(timeline.page,'ui-timeline-progress',theme,'Timeline '+key+' '+(reduced?'reduced':'normal'));report.stories.push({id:'ui-timeline-progress',theme,reduced,key,state,pass:true});save();}
    }finally{await timeline.close();}
   }
   const autocomplete=await mount(browser,current('ai-autocomplete'),{width:390,theme,reduced:false,mode:'full'});
   try{
    await resume(autocomplete.page);await autocomplete.page.waitForTimeout(1800);await readable(autocomplete.page,'ai-autocomplete',theme,'Settled suggestion',[{selector:'[data-ui=autocomplete-ghost]>span',background:'#181818'}]);const input=autocomplete.page.locator('[data-ui=autocomplete-input]'),before=await model(autocomplete.page);await input.press('End');await input.press('Tab');await autocomplete.page.waitForTimeout(350);const after=await model(autocomplete.page);assert.equal(after.value,before.suggestion);assert.equal(after.accepted,before.accepted+1);report.stories.push({id:'ai-autocomplete',theme,story:'Complete arrival and physical Tab acceptance',before,after,pass:true});save();
   }finally{await autocomplete.close();}
   for(const width of[390,1440]){
    const liquid=await mount(browser,current('progress-blob-fill'),{width,theme,reduced:true,mode:'full'});
    try{
     for(const percent of[0,68,100]){
      if(percent===68)await liquid.page.locator('[data-action=inspect]').click();else if(percent===100)await liquid.page.locator('.d-blobfill-demo-fill').click();
      assert.equal(await liquid.page.locator('.d-blobfill-demo-vessel svg').getAttribute('aria-valuenow'),String(percent));
      const label=liquid.page.locator('.d-blobfill-demo-number');
      const state=await label.evaluate(n=>{const c=getComputedStyle(n),root=document.querySelector('.stage')._root;return{data:{...root.dataset},shadow:c.textShadow,scale:n.getBoundingClientRect().width/n.offsetWidth};});
      const offsets=[...state.shadow.matchAll(/rgb\([^)]*\) ([\d.-]+)px ([\d.-]+)px 0px/g)].map(m=>[+m[1]*state.scale,+m[2]*state.scale]);assert.equal(offsets.length,8);for(const axis of[0,1])assert(Math.max(...offsets.map(p=>Math.abs(p[axis])))>=1.49,'Physical halo extends at least 1.49 CSS pixels');
      const withHalo=await label.screenshot();await label.evaluate(n=>n.style.setProperty('text-shadow','none','important'));const withoutHalo=await label.screenshot();await label.evaluate(n=>n.style.removeProperty('text-shadow'));
      const a=decode(withHalo),b=decode(withoutHalo);assert.equal(a.width,b.width);assert.equal(a.height,b.height);let darkened=0;
      for(let i=0;i<a.pixels.length;i+=4)if(b.pixels[i]+b.pixels[i+1]+b.pixels[i+2]-a.pixels[i]-a.pixels[i+1]-a.pixels[i+2]>60)darkened++;
      if(percent>=68)assert(darkened>100,'Actual dark halo paints around orange-backed percentage');
      const restored=await label.evaluate(n=>({...document.querySelector('.stage')._root.dataset}));assert.deepEqual(restored,state.data,'Optical sampling preserves the complete liquid model');
      const name='liquid-'+theme+'-'+width+'-'+percent;fs.writeFileSync(path.join(output,name+'-halo.png'),withHalo);fs.writeFileSync(path.join(output,name+'-control.png'),withoutHalo);report.halos.push({theme,width,percent,physicalOffsets:offsets,darkenedPixels:darkened,withSHA256:hash(withHalo),controlSHA256:hash(withoutHalo),state,pass:true});await readable(liquid.page,'progress-blob-fill',theme,name);save();
     }
    }finally{await liquid.close();}
   }
   const sound=await mount(browser,current('ui-sound-kit'),{width:390,theme,reduced:true,mode:'full'});
   try{await resume(sound.page);await sound.page.locator('[data-action=enable]').click();await sound.page.locator('[data-voice=tick]').click();await sound.page.waitForTimeout(250);await readable(sound.page,'ui-sound-kit',theme,'Enabled tick');await sound.page.locator('[data-action=mute]').click();await readable(sound.page,'ui-sound-kit',theme,'Muted');report.stories.push({id:'ui-sound-kit',theme,story:'Physical enable, tick and mute; browser speaker output muted',pass:true});save();}finally{await sound.close();}
   const led=await mount(browser,current('led-segment-display'),{width:390,theme,reduced:true,mode:'full'});
   try{await resume(led.page);await led.page.locator('[data-action=power]').click();await led.page.waitForTimeout(200);await readable(led.page,'led-segment-display',theme,'Power toggled');await led.page.locator('[data-action=format]').click();await led.page.waitForTimeout(200);await readable(led.page,'led-segment-display',theme,'Format toggled');report.stories.push({id:'led-segment-display',theme,story:'Physical power and format controls',pass:true});save();}finally{await led.close();}
  }
  // Exact captured random glyph strings, with no semantic message to read.
  const cipher=await mount(browser,current('ui-evervault-card'),{width:390,theme:'dark',reduced:true,mode:'full'});
  try{const data=await cipher.page.evaluate(()=>{const r=document.querySelector('.stage')._root,model=r.__layoutExt.inspect();return{model,rows:[...r.querySelectorAll('[data-ui=glyph-base]')].map(n=>({text:n.textContent,color:getComputedStyle(n).color}))};});assert.equal(data.rows.length,12);assert(data.rows.every(n=>n.color==='rgb(73, 73, 73)'));report.decorativeCipher={...data,classification:'Incidental random glyph artwork under WCAG 1.4.3; original complete strings, seed and renderer remain unchanged. The help remains readable. Raw axe findings are retained.',stringsSHA256:hash(JSON.stringify(data.rows.map(n=>n.text)))};save();}finally{await cipher.close();}
  for(const[file,expected]of Object.entries(report.inputs))assert.equal(hash(fs.readFileSync(file)),expected,'Stable state-suite input '+file);
  report.finished=new Date().toISOString();save();console.log('PASS',report.stories.length,'physical/model stories;',report.halos.length,'painted halos;',report.themeRendered.length,'rendered theme states');
 }finally{await browser.close();}
}
main().catch(error=>{report.error=error.stack;save();console.error(error.stack);process.exitCode=1;});

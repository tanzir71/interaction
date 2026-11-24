/* Initial-state WCAG scan. Automated results do not replace input, focus or visual review. */
const fs=require('node:fs'),path=require('node:path'),crypto=require('node:crypto'),assert=require('node:assert/strict');
const option=name=>process.argv.find(value=>value.startsWith('--'+name+'='))?.slice(name.length+3);
if(process.argv.includes('--help')){
  console.log('Usage: node tools/audit-component-accessibility.js [http://127.0.0.1:4173] --axe=/external/axe.min.js [--ids=id,...] [--themes=dark,light] [--modes=full,thumb] [--motion=reduced,normal] [--width=1440] [--output=.artifacts/component-accessibility]\nRequires external Playwright via PLAYWRIGHT_MODULE. Optional INTRX_CHROME_EXECUTABLE selects Chrome. Each run retains complete violations, incomplete results and source hashes.');
  process.exit(0);
}
const {chromium}=require(process.env.PLAYWRIGHT_MODULE||'playwright'),registry=require('./load-registry')(),assets=require('../assets/demo-assets.json'),catalog=require('../registry/index.json'),root=path.resolve(__dirname,'..');
const base=(process.argv.find(value=>/^https?:/.test(value))||'http://127.0.0.1:4173').replace(/\/$/,''),axeSource=option('axe');
assert(axeSource&&fs.existsSync(axeSource),'Provide --axe=/external/axe.min.js; audit dependencies do not belong in the static site');
const ids=option('ids')?.split(',')||registry.demos.map(d=>d.id),themes=(option('themes')||'dark,light').split(','),modes=(option('modes')||'full').split(','),motions=(option('motion')||'reduced').split(','),width=Number(option('width')||1440);
assert(ids.length&&new Set(ids).size===ids.length&&ids.every(id=>registry.demos.some(d=>d.id===id)),'Unknown or duplicate IDs');
assert(themes.length&&themes.every(theme=>['dark','light'].includes(theme)),'Invalid themes');
assert(modes.length&&modes.every(mode=>['full','thumb'].includes(mode)),'Invalid modes');
assert(motions.length&&motions.every(motion=>['normal','reduced'].includes(motion)),'Invalid motion modes');
assert(Number.isInteger(width)&&width>=320,'Invalid viewport width');
const hash=file=>crypto.createHash('sha256').update(fs.readFileSync(file)).digest('hex');
const files=[__filename,'tools/load-registry.js','tools/fixtures/showcase-fields/rig.html','assets/demo-assets.json','registry/index.json','css/foundations.css','css/fonts.css','js/demo-runtime.js','js/shell/stage.js','js/shell/registry.js','js/shell/access.js','js/meta.stage.js','js/registry-files.json',...new Set(ids.map(id=>registry.filesById[id]))];
const inputs=Object.fromEntries(files.map(file=>[path.relative(root,path.resolve(root,file)).replaceAll('\\','/'),hash(file)]));
const runId=new Date().toISOString().replace(/[:.]/g,'-'),out=path.resolve(root,option('output')||'.artifacts/component-accessibility',runId);
assert(!fs.existsSync(out),'Run directory exists');fs.mkdirSync(out,{recursive:true});
const report={started:new Date().toISOString(),scope:'Initial rendered component and shared Dock only; current Stage styles. Does not establish keyboard/touch behavior, screen-reader quality, focus clipping, photographic contrast, hidden states or motion/performance acceptance.',inputs,axe:{file:path.resolve(axeSource),sha256:hash(axeSource)},ids,themes,modes,motions,width,cases:[]};
const guard=()=>{for(const[file,expected]of Object.entries(inputs))assert.equal(hash(path.join(root,file)),expected,'Changed during accessibility scan: '+file);};
const save=()=>fs.writeFileSync(path.join(out,'report.json'),JSON.stringify(report,null,2)+'\n');save();
(async()=>{
  const browser=await chromium.launch(process.env.INTRX_CHROME_EXECUTABLE?{executablePath:process.env.INTRX_CHROME_EXECUTABLE}:{});report.browser=browser.version();
  try{for(const motion of motions)for(const theme of themes){
    const context=await browser.newContext({viewport:{width,height:1000},deviceScaleFactor:width<600?2:1,reducedMotion:motion==='reduced'?'reduce':'no-preference'}),page=await context.newPage(),errors=[];
    page.on('pageerror',error=>errors.push(error.message));
    try{
      await page.goto(base+'/tools/fixtures/showcase-fields/rig.html');
      await page.evaluate(({theme,assets,base})=>{
        const origin=document.createElement('base');origin.href=base+'/';document.head.prepend(origin);
        window.INTRX={resolveAssets:value=>value.replace(/\{\{asset:([\w-]+)\}\}/g,(_,name)=>{if(!assets[name])throw Error('Unknown demo asset '+name);return base+'/'+assets[name];})};
        document.documentElement.dataset.theme=theme;
      },{theme,assets,base});
      for(const file of['css/foundations.css','css/fonts.css'])await page.addStyleTag({url:base+'/'+file});
      for(const file of['js/demo-runtime.js','js/shell/stage.js'])await page.addScriptTag({url:base+'/'+file});
      await page.addScriptTag({path:axeSource});report.axe.version=await page.evaluate(()=>axe.version);
      for(const id of ids)for(const mode of modes){
        if(report.cases.length%20===0)guard();const errorStart=errors.length,definition=registry.demos.find(d=>d.id===id),entry=catalog.find(d=>d.id===id),demo={...definition,fullAssetRefs:entry.fullAssetRefs,photoCredits:entry.photoCredits},started=Date.now();let result,error;
        try{
          result=await page.evaluate(async({demo,mode,width,theme})=>{
            document.querySelector('.stage')?._runtime?.dispose();document.body.replaceChildren();
            Object.assign(document.body.style,{margin:'0',background:theme==='light'?'#fafafa':'#151515'});
            const stage=document.createElement('div');stage.className='demo-stage stage';
            Object.assign(stage.style,{position:'relative',width:(mode==='thumb'?Math.min(372,width):Math.min(width,1000))+'px',height:(mode==='thumb'?264:width<600?600:720)+'px'});document.body.append(stage);
            // The detail toolbar permits either stage palette, including demos whose default is light.
            const data={...demo,stage:{...demo.stage,theme}};INTRX.mountStage(data,stage,mode);
            await document.fonts.ready;await Promise.all([...stage.querySelectorAll('img')].map(image=>image.decode()));
            if(stage.dataset.bootError)throw Error('Component failed to boot');
            if(stage.innerHTML.includes('{{asset:'))throw Error('Unresolved demo asset');
            await new Promise(resolve=>requestAnimationFrame(()=>requestAnimationFrame(resolve)));
            const scan=await axe.run(stage,{runOnly:{type:'tag',values:['wcag2a','wcag2aa','wcag21a','wcag21aa','best-practice']}});
            const trim=rule=>({id:rule.id,impact:rule.impact,help:rule.help,helpUrl:rule.helpUrl,nodes:rule.nodes.map(node=>({target:node.target,html:node.html,summary:node.failureSummary||node.summary,checks:[...node.any,...node.all,...node.none].map(check=>({id:check.id,message:check.message,data:check.data}))}))});
            return{violations:scan.violations.map(trim),incomplete:scan.incomplete.map(trim),passes:scan.passes.map(rule=>rule.id),inapplicable:scan.inapplicable.map(rule=>rule.id),root:stage._root.className};
          },{demo,mode,width,theme});
        }catch(caught){error=caught.stack||String(caught);}
        const row={id,mode,theme,motion,width,ms:Date.now()-started,...result,errors:errors.slice(errorStart),...(error?{error}:{})};
        report.cases.push(row);fs.appendFileSync(path.join(out,'cases.jsonl'),JSON.stringify(row)+'\n');if(report.cases.length%20===0||error)save();
        console.log(JSON.stringify({case:report.cases.length,id,mode,theme,motion,violations:row.violations?.map(rule=>rule.id),incomplete:row.incomplete?.length,error}));
        if(error)throw Error(error);
      }
      await page.evaluate(()=>document.querySelector('.stage')?._runtime?.dispose());
    }finally{await context.close();}
  }
  guard();report.finished=new Date().toISOString();report.sourceStable=true;
  report.summary={cases:report.cases.length,violations:report.cases.reduce((sum,row)=>sum+row.violations.length,0),incomplete:report.cases.reduce((sum,row)=>sum+row.incomplete.length,0),pageErrors:report.cases.reduce((sum,row)=>sum+row.errors.length,0)};save();
  console.log(JSON.stringify({output:path.relative(root,out),...report.summary}));
  if(report.summary.violations||report.summary.pageErrors)process.exitCode=1;
  }finally{await browser.close();}
})().catch(error=>{console.error(error.stack);process.exitCode=1;});

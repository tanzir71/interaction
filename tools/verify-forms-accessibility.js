/* Actual accessible names, trusted file selection, keyboard ink and adjacent-month contrast. */
const fs=require('node:fs'),path=require('node:path'),crypto=require('node:crypto'),assert=require('node:assert/strict');
const {chromium}=require(process.env.PLAYWRIGHT_MODULE||'playwright'),registry=require('./load-registry')(),assets=require('../assets/demo-assets.json'),catalog=require('../registry/index.json');
const base=(process.argv.find(value=>/^https?:/.test(value))||'http://127.0.0.1:4173').replace(/\/$/,''),root=path.resolve(__dirname,'..');
const ids=['form-dropzone-morph','form-date-range','form-signature-pad'],hash=file=>crypto.createHash('sha256').update(fs.readFileSync(file)).digest('hex');
const files=[__filename,'assets/demo-assets.json','registry/index.json','css/foundations.css','css/fonts.css','js/demo-runtime.js','js/shell/stage.js',...ids.map(id=>registry.filesById[id])];
const inputs=Object.fromEntries(files.map(file=>[path.relative(root,path.resolve(root,file)).replaceAll('\\','/'),hash(file)]));
const output=path.resolve(root,process.argv.find(value=>value.startsWith('--output='))?.slice(9)||'.artifacts/forms-accessibility');fs.mkdirSync(output,{recursive:true});
const rows=[];let checks=0;const check=(value,message)=>{assert(value,message);checks++;};
(async()=>{
  const browser=await chromium.launch(process.env.INTRX_CHROME_EXECUTABLE?{executablePath:process.env.INTRX_CHROME_EXECUTABLE}:{});
  try{for(const width of[1440,390])for(const theme of['dark','light'])for(const reduced of[false,true]){
    const context=await browser.newContext({viewport:{width,height:1000},reducedMotion:reduced?'reduce':'no-preference'}),page=await context.newPage(),errors=[];
    page.on('pageerror',error=>errors.push(error.message));
    try{
      await page.goto(base+'/tools/fixtures/showcase-fields/rig.html');await page.evaluate(({theme,assets,base})=>{
        const origin=document.createElement('base');origin.href=base+'/';document.head.prepend(origin);
        window.INTRX={resolveAssets:value=>value.replace(/\{\{asset:([\w-]+)\}\}/g,(_,name)=>base+'/'+assets[name])};document.documentElement.dataset.theme=theme;
      },{theme,assets,base});
      for(const file of['css/foundations.css','css/fonts.css'])await page.addStyleTag({url:base+'/'+file});
      for(const file of['js/demo-runtime.js','js/shell/stage.js'])await page.addScriptTag({url:base+'/'+file});
      async function mount(id){const definition=registry.demos.find(d=>d.id===id),entry=catalog.find(d=>d.id===id),demo={...definition,fullAssetRefs:entry.fullAssetRefs,photoCredits:entry.photoCredits};await page.evaluate(({demo,width,theme})=>{
        document.querySelector('.stage')?._runtime?.dispose();document.body.replaceChildren();Object.assign(document.body.style,{margin:'0'});
        const stage=document.createElement('div');stage.className='demo-stage stage';Object.assign(stage.style,{position:'relative',width:Math.min(width,1000)+'px',height:'720px'});document.body.append(stage);
        INTRX.mountStage({...demo,stage:{...demo.stage,theme}},stage,'full');
      },{demo,width,theme});await page.evaluate(()=>Promise.all([document.fonts.ready,...[...document.images].map(image=>image.decode())]));}
      await mount(ids[0]);
      const dropzone=page.getByRole('button',{name:'Drop a file here Or choose a file below',exact:true});
      check(await dropzone.count()===1,'The upload accessible name contains its complete visible idle wording');
      const chooserEvent=page.waitForEvent('filechooser');await dropzone.press('Enter');const chooser=await chooserEvent;
      await chooser.setFiles({name:'Field notes.txt',mimeType:'text/plain',buffer:Buffer.from('Accessible file selection.')});
      const uploaded=page.getByRole('button',{name:/Field notes\.txt/});await uploaded.waitFor();
      check(await uploaded.count()===1,'Selected file stays in the upload accessible name');
      await page.waitForFunction(()=>document.querySelector('[data-ui=dropzone]').getAttribute('aria-busy')==='false');
      check(await uploaded.count()===1,'Completed file stays in the upload accessible name');
      const uploadName=await uploaded.ariaSnapshot();check(uploadName.includes('Complete'),'Completion is present in the accessible button text');
      await mount(ids[1]);
      const dates=await page.locator('[data-outside=true]').evaluateAll(nodes=>{
        const luminance=rgb=>rgb.map(v=>{v/=255;return v<=.04045?v/12.92:((v+.055)/1.055)**2.4;}).reduce((sum,v,i)=>sum+v*[.2126,.7152,.0722][i],0);
        const parse=value=>value.match(/[\d.]+/g).map(Number);
        return nodes.filter(node=>node.getBoundingClientRect().width&&getComputedStyle(node).visibility!=='hidden').map(node=>{
          const ancestors=[];for(let n=node;n;n=n.parentElement)ancestors.unshift(n);let bg=[255,255,255];
          for(const ancestor of ancestors){const color=parse(getComputedStyle(ancestor).backgroundColor),alpha=color[3]??1;bg=bg.map((v,i)=>color[i]*alpha+v*(1-alpha));}
          const color=parse(getComputedStyle(node).color),alpha=color[3]??1,fg=bg.map((v,i)=>color[i]*alpha+v*(1-alpha)),a=luminance(fg),b=luminance(bg);
          return{text:node.textContent,ratio:(Math.max(a,b)+.05)/(Math.min(a,b)+.05),disabled:node.disabled};
        });
      });
      check(dates.length>0,'Adjacent-month dates are present');for(const date of dates){check(!date.disabled,'Adjacent-month dates remain selectable');check(date.ratio>=4.5,'Selectable adjacent-month date meets 4.5:1: '+JSON.stringify(date));}
      await mount(ids[2]);
      const pad=page.getByRole('group',{name:/^Signature drawing area\./});check(await pad.count()===1,'The signature keyboard area is exposed to assistive technology');
      let reached=false;for(let i=0;i<25;i++){await page.keyboard.press('Tab');if(await pad.evaluate(node=>node===document.activeElement)){reached=true;break;}}
      check(reached,'Tab reaches the visible signature pad');
      await page.keyboard.down('Space');await page.keyboard.press('ArrowRight');await page.keyboard.press('ArrowDown');await page.keyboard.up('Space');
      const ink=await page.evaluate(()=>document.querySelector('.stage')._root.__formsExt.inspect());
      check(ink.strokes.length===1&&ink.strokes[0].length>=3&&!ink.keyOwner,'Native Space and Arrow keys create and finish an actual signature stroke');
      check(await page.locator('[data-ui=signature-help]').textContent().then(text=>text.startsWith('1 stroke.')),'Visible keyboard drawing feedback remains available');
      await page.evaluate(()=>document.querySelector('.stage')._runtime.dispose());assert.deepEqual(errors,[]);checks++;
      rows.push({width,theme,reduced,uploadName,dates,signaturePoints:ink.strokes[0].length});console.log(JSON.stringify({width,theme,reduced,checks}));
    }finally{await context.close();}
  }
  for(const[file,expected]of Object.entries(inputs))assert.equal(hash(path.join(root,file)),expected,'Changed during verification: '+file);
  fs.writeFileSync(path.join(output,'report.json'),JSON.stringify({at:new Date().toISOString(),browser:browser.version(),inputs,checks,rows},null,2)+'\n');
  console.log('PASS form names, trusted file selection, adjacent-month contrast and exposed keyboard signature: '+checks+' checks');
  }finally{await browser.close();}
})().catch(error=>{console.error(error.stack);process.exitCode=1;});

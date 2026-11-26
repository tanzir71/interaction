/* Synthetic pixel controls. Candidate bounds require a separate foreground review. */
const fs=require('node:fs'),path=require('node:path'),assert=require('node:assert/strict'),crypto=require('node:crypto'),{chromium}=require(process.env.PLAYWRIGHT_MODULE||'playwright'),sample=require('./verification/text-background-sampler'),{decode}=require('./verification/sound-png');
const option=name=>process.argv.find(a=>a.startsWith('--'+name+'='))?.slice(name.length+3),dir=__dirname,run=path.resolve(option('output')||'.artifacts/text-background-calibration','calibration-'+new Date().toISOString().replace(/[:.]/g,'-'));assert(run.startsWith(path.resolve('.artifacts')+path.sep));fs.mkdirSync(run,{recursive:true});const rows=[],hash=f=>crypto.createHash('sha256').update(fs.readFileSync(f)).digest('hex'),inputs=Object.fromEntries([__filename,dir+'/verification/text-background-browser.js',dir+'/verification/text-background-sampler.js','tools/verification/sound-png.js'].map(f=>[f,hash(f)]));
const fixtures=[
 {id:'dark',css:'color:#eee;background:#151515',expected:'candidate-at-least-4.5'},
 {id:'light',css:'color:#222;background:#fafafa',expected:'candidate-at-least-4.5'},
 {id:'low',css:'color:#888;background:#aaa',expected:'review'},
 {id:'foreground-matches-half-background',css:'color:#fff;background:linear-gradient(90deg,#151515 50%,#fff 50%)',expected:'review'},
 {id:'currentColor-background',css:'color:#000;background:currentColor;-webkit-text-fill-color:#fff',expected:'candidate-at-least-4.5'},
 {id:'alpha',css:'color:rgba(255,255,255,.75);background:#151515',expected:'candidate-at-least-4.5'},
 {id:'low-alpha',css:'color:rgba(255,255,255,.2);background:#151515',expected:'review'},
 {id:'group-opacity',css:'color:#fff;background:#151515;opacity:.5',expected:'pending'},
 {id:'filter',css:'color:#fff;background:#151515;filter:brightness(.5)',expected:'pending'},
 {id:'mask',css:'color:#fff;background:#151515;mask-image:linear-gradient(#000,transparent)',expected:'pending'},
 {id:'shadow',css:'color:#fff;background:#151515;text-shadow:1px 1px 2px white',expected:'pending'},
 {id:'gradient-type',css:'color:transparent;background:linear-gradient(red,blue);background-clip:text',expected:'pending'},
 {id:'colored-glyph',text:'Hello 🟠',css:'color:#fff;background:#151515',expected:'pending'},
 {id:'descendant-background',text:'MMMM',css:'color:#fff;background:#151515;position:relative;z-index:0;font:40px monospace',child:'<span style="position:absolute;left:0;top:0;color:#888;z-index:-1;font:40px monospace">MMMM</span>',expected:'review'},
 {id:'italic-overhang',text:'f',css:'color:#fff;background:#151515;font:italic 80px Times New Roman;box-shadow:0 0 0 3px #151515;margin-left:100px;margin-top:10px',expectedFontSize:'80px',expected:'review'},
 {id:'transition-all-low',css:'color:#151515;background:#151515;transition:all 3s linear',expected:'review'},
 {id:'transition-all-high',css:'color:#fff;background:#151515;transition:all 3s linear',expected:'candidate-at-least-4.5'},
 {id:'front-scrim-counterexample',css:'color:#000;background:#fff;position:relative',child:'<i style="position:absolute;inset:0;background:rgba(255,255,255,.5)"></i>',expected:'candidate-at-least-4.5',foregroundApproved:false,knownRenderedContrast:3.976653024912438},
 {id:'transition-list-low',css:'color:#151515;background:#151515;transition:transform 1s cubic-bezier(.22,1,.36,1), all 3s steps(4,end)',expected:'review'}
];
const report={started:new Date().toISOString(),inputs,rows,scope:'Calibration of conditional background measurements, not WCAG passing cases. The front-scrim counterexample intentionally has a high candidate bound and an unacceptable final glyph color; its foreground review is not approved.'};
const save=()=>fs.writeFileSync(path.join(run,'results.json'),JSON.stringify(report,null,2)+'\n');save();
(async()=>{
 const browser=await chromium.launch({executablePath:process.env.INTRX_CHROME_EXECUTABLE,args:['--force-color-profile=srgb']});report.browser=browser.version();
 try{
  for(const dpr of[1,2]){
   const page=await browser.newPage({viewport:{width:600,height:260},deviceScaleFactor:dpr});
   try{
    for(const fixture of fixtures){
     await page.setContent('<style>html,body{margin:0;background:#fff}.target{display:inline-block;font:20px Arial;padding:0}</style><div class="target" style="'+fixture.css+'">'+(fixture.text||'Contrast field')+(fixture.child||'')+'</div>');
     await page.addScriptTag({path:dir+'/verification/text-background-browser.js'});
     const target=await page.evaluate(()=>{window.contrastProbe=installContrastProbe(document.body);return contrastProbe.list()[0];});
     if(fixture.expectedFontSize)assert.equal(target.fontSize,fixture.expectedFontSize,'Intended fixture font');
     const images={},result=await sample(page,target,(name,bytes)=>{images[name]=bytes;fs.writeFileSync(path.join(run,fixture.id+'-dpr'+dpr+'-'+name+'.png'),bytes);});
     const row={id:fixture.id,dpr,expected:fixture.expected,foregroundApproved:fixture.foregroundApproved,knownRenderedContrast:fixture.knownRenderedContrast,result};
     rows.push(row);save();assert.equal(result.outcome,fixture.expected,fixture.id+' DPR'+dpr);assert.equal(result.requiresManualForegroundReview,true,'Measurements cannot approve foreground stacking');
     if(fixture.foregroundApproved===false){
      const black=decode(images.black),white=decode(images.white);let maximum=0;
      for(let i=0;i<black.pixels.length;i++)if(i%4!==3)maximum=Math.max(maximum,Math.abs(white.pixels[i]-black.pixels[i]));
      assert(maximum>=126&&maximum<=129,'Actual scrim attenuates glyph paint');assert(fixture.knownRenderedContrast<4.5);row.actualMaximumProbeDelta=maximum;row.reviewDecision='not approved: translucent foreground scrim';save();
     }
     console.log(fixture.id,dpr,result.outcome,result.contrastLowerBound,result.reasons);
    }
   }finally{await page.close();}
  }
  for(const[f,h]of Object.entries(inputs))assert.equal(hash(f),h,'Stable '+f);report.finished=new Date().toISOString();report.sourceStable=true;save();console.log('PASS '+rows.length+' measurement calibration stories');
 }finally{await browser.close();}
})().catch(e=>{report.error=e.stack;save();console.error(e.stack);process.exitCode=1;});

/* Frozen capture values plus independent original execution in the tested browser. */
const H=require('./raster-fields-harness'),{fs,assert,chromium,hash,dir,vm,zlib}=H,{runOriginal}=require('./raster-fields-original');
const probesFile='tools/fixtures/raster-fields-original-probes.json',probesEnvelope=JSON.parse(fs.readFileSync(probesFile)),probeBytes=Buffer.from(probesEnvelope.source,'base64'),probeModule={exports:{}};
assert.equal(hash(probeBytes),probesEnvelope.sha256,'Byte-preserved original observation source');vm.runInNewContext(probeBytes.toString('utf8'),{module:probeModule});

function replaceOnce(source,from,to){assert.equal(source.split(from).length-1,1,'Original harness adapter boundary');return source.replace(from,()=>to);}
function referenceRunner(){
 // Only returned evidence changes. The original source, input and paint paths stay literal.
 let source=replaceOnce(runOriginal.toString(),'rows: retain ? rows : undefined','rows');
 source=replaceOnce(source,'if (retain) row.pixels = encode(pixels);','row.pixels = encode(pixels);');
 source=replaceOnce(source,'checkPack(inspected, packed);',"checkPack(inspected, packed);\n      if(config.id==='halftone-globe-canvas'){row.coreModel={...packed};delete row.coreModel.projection;}");
 return new Function('return ('+source+')')();
}

function expandVectors(value,pool){
 if(!value||typeof value!=='object')return value;
 if(Object.hasOwn(value,'$ref'))return expandVectors(pool[value.$ref],pool);
 if(Array.isArray(value))return value.map(v=>expandVectors(v,pool));
 return Object.fromEntries(Object.entries(value).map(([key,item])=>[key,expandVectors(item,pool)]));
}
function runner(factory,native){
 let s=runOriginal.toString(),a=s.indexOf('  let now = 0, nextID = 0, docVisible = true;'),b=s.indexOf('  const checkpoints = new Set',a);assert(a>0&&b>a);
 s=s.slice(0,a)+'  let now=0;const core=('+factory+')(canvas,{width:config.size[0],height:config.size[1],dpr:config.dpr,reduced:config.reduced,nativeOnly:'+native+'});\n  root[config.inspect]=()=>core.snapshot();const dispatch=e=>core.dispatch(e);\n'+s.slice(b);
 s=s.replace('const jobs = [...frames.values()]; frames.clear(); jobs.forEach(callback => callback(now));','core.tick(now);').replaceAll('frames.size','core.pending()');
 const ca=s.indexOf('  root.remove();'),cb=s.indexOf('  if (cleanup.pendingFrames',ca);assert(ca>0&&cb>ca);
 s=s.slice(0,ca)+'  core.dispose();root.remove();await Promise.resolve();await Promise.resolve();\n  const life=core.lifecycle();const cleanup={pendingFrames:core.pending(),resizeTargets:life.observerTargets,intersectionTargets:life.observerTargets,connected:life.connected};\n'+s.slice(cb);
 if(native)s=s.replace("['modelSHA256', 'paintSHA256', 'paintCommands', 'pixelSHA256', 'pendingFrames', 'now']","['modelSHA256','pendingFrames','now']");
 else s=replaceOnce(s,'row.pixelSHA256 = await digest(encode(pixels));',"row.pixelSHA256 = await digest(encode(pixels));\n      if(expected&&encode(pixels)!==expected.rows[frame].pixels)errors.push({frame,key:'pixelBytes',expected:expected.rows[frame].pixelSHA256,actual:row.pixelSHA256});");
 s=s.replace('  return result;','  result.lifecycle=core.lifecycle();result.disposedSnapshot=core.snapshot();result.disposedCanvas=[canvas.width,canvas.height];return result;');return new Function('return ('+s+')')();
}

(async()=>{
 fs.writeFileSync(dir+'/blank.html','<!doctype html><meta charset="utf-8"><body></body>');
 const sourceHashes={...H.mathHashes(__filename),[probesFile]:hash(fs.readFileSync(probesFile))},font=fs.readFileSync('assets/fonts/geist-mono-variable.woff2');assert.equal(hash(font),H.manifest.fontSHA256);
 const kernelSources=Object.fromEntries(H.A.configs.map(c=>[c.id,H.kernels(c.id)])),kernelHashes=Object.fromEntries(Object.entries(kernelSources).map(([id,k])=>[id,Object.fromEntries(Object.entries(k).map(([mode,s])=>[mode,hash(s)]))])),results=[],references=[];let next=0;
 async function worker(){const browser=await chromium.launch({headless:true});
  async function execute(fn,args,config){const context=await browser.newContext({viewport:{width:900,height:750},deviceScaleFactor:config.dpr,reducedMotion:config.reduced?'reduce':'no-preference'}),page=await context.newPage(),errors=[];page.on('pageerror',e=>errors.push(e.message));try{await page.goto(H.base+'/.artifacts/raster-fields/blank.html');const value=await page.evaluate(fn,args);assert.deepEqual(errors,[]);return value;}finally{await context.close();}}
  try{while(next<H.manifest.cases.length){
   const record=H.manifest.cases[next++],fixture=H.fixture(record),config=fixture.config,original=H.manifest.definitions.find(d=>d.id===config.id);assert.equal(hash(probeBytes),fixture.probesSHA256,'Captured observation bytes '+record.key);assert.equal(typeof probeModule.exports[config.id],'string');
   const archived={cleanup:fixture.cleanup,rows:fixture.rows.map(({model,paint,pixels,...r})=>r)},reference=await execute(referenceRunner(),{original,observation:probeModule.exports[config.id],config,font:font.toString('base64'),expected:archived,retain:false},config);
   const referenceFile=dir+'/independent-original-'+record.key+'.json.gz';fs.writeFileSync(referenceFile,zlib.gzipSync(JSON.stringify(reference)));
   // Math.sin is implementation-approximated. The unchanged globe's derived
   // projection differs between Chromium 140 and 158 at one recorded angle.
   // Keep those historical hashes as findings; never apply a numeric tolerance.
   // Its actual fixtures/state/clocks stay byte-exact at every captured model
   // checkpoint, and all complete states/projections below match the separately
   // executed original in this browser exactly, including every RGBA byte.
   let coreCheckpoints=0;
   if(config.id==='halftone-globe-canvas')for(const row of reference.rows)if(row.coreModel){const frozen=expandVectors(fixture.rows[row.frame].model,fixture.pool);assert(frozen,'Captured complete model checkpoint '+row.frame);delete frozen.projection;assert.deepEqual(row.coreModel,frozen,'Exact original globe fixtures/core state '+record.key+' '+row.frame);coreCheckpoints++;}
   const derivedKeys=new Set(config.id==='halftone-globe-canvas'?['pixelSHA256','modelSHA256','paintSHA256']:['pixelSHA256']),violations=reference.summary.errors.filter(e=>!derivedKeys.has(e.key)),historicalDifferences=reference.summary.errors.filter(e=>derivedKeys.has(e.key));
   if(violations.length)throw Error('Original capture state/paint replay mismatch '+record.key+' '+JSON.stringify(violations.slice(0,2)));
   references.push({key:record.key,browser:browser.version(),file:referenceFile,sha256:hash(fs.readFileSync(referenceFile)),frames:reference.summary.frames,coreCheckpoints,historicalDifferences,originalJS:original.jsSHA256,probesSHA256:fixture.probesSHA256});
   console.log(record.key+' independent original / '+reference.summary.frames+' states; '+historicalDifferences.length+' historical render hash differences retained');
   for(const variant of['full','native']){
    const r=await execute(runner(kernelSources[config.id][variant],variant==='native'),{original,config,font:font.toString('base64'),expected:{cleanup:reference.cleanup,rows:reference.rows},retain:false},config);
    if(r.summary.errors.length){fs.writeFileSync(dir+'/model-mismatch-'+record.key+'-'+variant+'.json',JSON.stringify(r.summary.errors,null,2));throw Error('Independent original mismatch '+record.key+' '+variant+' '+JSON.stringify(r.summary.errors.slice(0,2)));}
    assert.equal(r.disposedSnapshot,null);assert.deepEqual(r.disposedCanvas,[1,1]);assert.deepEqual(r.lifecycle,{dead:true,connected:false,clock:fixture.rows.at(-1).now,pending:0,listeners:0,observerTargets:0,captures:0});
    results.push({key:record.key,variant,factorySHA256:kernelHashes[config.id][variant],...r.summary});console.log(record.key+' '+variant+' / '+r.summary.frames+' complete independent original states');
   }
   fs.writeFileSync(dir+'/model-progress.json',JSON.stringify({at:new Date().toISOString(),cases:results.length,total:H.manifest.cases.length*2,last:{key:record.key}},null,2));
  }}finally{await browser.close();}
 }
 const workers=await Promise.allSettled([worker(),worker()]);for(const w of workers)if(w.status==='rejected')throw w.reason;
 for(const[file,value]of Object.entries(sourceHashes))assert.equal(hash(fs.readFileSync(file)),value,'Current mathematical input '+file);
 const fresh=H.load();for(const c of H.A.configs){const k=H.kernels(c.id,fresh.demos.find(d=>d.id===c.id).js);for(const mode of['full','native'])assert.equal(hash(k[mode]),kernelHashes[c.id][mode],'Current isolated engine');}
 results.sort((a,b)=>a.key.localeCompare(b.key)||a.variant.localeCompare(b.variant));references.sort((a,b)=>a.key.localeCompare(b.key));
 const checks=results.reduce((n,r)=>n+r.frames*(r.variant==='full'?7:4)+(r.variant==='full'?r.pixelCheckpoints:0)+4,0)+references.reduce((n,r)=>n+r.frames*(r.key.startsWith('halftone-globe-canvas')?3:6)+r.coreCheckpoints,0);
 fs.writeFileSync(dir+'/models.json',JSON.stringify({at:new Date().toISOString(),sourceHashes,kernelHashes,cases:results.length,checks,states:results.reduce((n,r)=>n+r.frames,0),numericValues:results.reduce((n,r)=>n+r.numericValues,0),fullPixelCheckpoints:results.filter(r=>r.variant==='full').reduce((n,r)=>n+r.pixelCheckpoints,0),references,results,scope:'Complete datasets, readouts, clocks and scheduler match immutable captures. The globe core fixture/state/counter/lifecycle buffers match every captured model checkpoint byte-exactly; historical derived-projection, paint and pixel hash differences are retained as findings, not passed or rewritten. Every original runs independently in the tested browser and a fresh context. Full engines match every complete original state, draw digest and literal RGBA byte in that browser exactly; native engines match every complete original state and clock. No numeric or pixel tolerance. Original source, observations, engines, captures, fonts and verifier inputs are bound. Native artwork, physical input and full cameras have separate checks.',standards:['https://tc39.es/ecma262/multipage/numbers-and-dates.html#sec-math.sin']},null,2));
 console.log('PASS '+results.length+' engine cases / '+checks+' independent original checks');
})().catch(e=>{console.error(e.stack?.slice(0,3000));process.exitCode=1;});

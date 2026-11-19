const fs=require('node:fs'),zlib=require('node:zlib'),crypto=require('node:crypto'),assert=require('node:assert/strict');
const H=require('./raster-fields-harness'),{unpack}=require('./raster-fields-codec'),dir=H.dir;const initialHashes={...H.mathHashes(__filename),'tools/verification/raster-fields-codec.js':H.hash(fs.readFileSync('tools/verification/raster-fields-codec.js'))};
const hash=bytes=>crypto.createHash('sha256').update(bytes).digest('hex');
const selected=process.argv.find(arg=>arg.startsWith('--case='))?.slice(7);
let checks=0;const numericErrors={};
function eq(actual,expected,label){checks++;assert.deepEqual(actual,expected,label)}
function near(actual,expected,label,tolerance=2e-12){checks++;const error=Math.abs(actual-expected),item=numericErrors[label]||(numericErrors[label]={maximumError:0,tolerance,comparisons:0});item.comparisons++;item.maximumError=Math.max(item.maximumError,error);assert(Number.isFinite(actual)&&error<=tolerance,label+': '+actual+' != '+expected)}
const clamp=(v,a,b)=>Math.max(a,Math.min(b,v));
function checksum(values){let h=2166136261;for(const n of values)h=Math.imul(h^(n+1),16777619);return(h>>>0).toString(16).toUpperCase().padStart(8,'0')}

function donut(m,row,fixture){
  eq([m.config.R1,m.config.R2,m.config.gridColumns,m.config.gridRows,m.config.thetaSteps,m.config.phiSteps],[1,2,48,24,90,24],'Complete torus dimensions');
  eq([m.config.autoA,m.config.autoB,m.config.friction,m.config.dragGain,m.config.dragClamp],[.04,.02,.95,.008,.22],'Original rotation coefficients');
  const a=m.state.angleA,b=m.state.angleB,ca=Math.cos(a),sa=Math.sin(a),cb=Math.cos(b),sb=Math.sin(b);
  const depths=new Float64Array(1152).fill(-Infinity),glyphs=new Int16Array(1152).fill(-1),lumas=new Float32Array(1152);
  const rotate=([x,y,z])=>[cb*x+sb*(sa*y+ca*z),ca*y-sa*z,-sb*x+cb*(sa*y+ca*z)];
  for(let ti=0;ti<90;ti++)for(let pi=0;pi<24;pi++){
    const t=ti*2*Math.PI/90,p=pi*2*Math.PI/24,ct=Math.cos(t),st=Math.sin(t),cp=Math.cos(p),sp=Math.sin(p);
    const [x,y,z]=rotate([(2+ct)*cp,st,(2+ct)*sp]),inverse=1/(5+z);
    const sx=Math.round(24+15*x*inverse),sy=Math.round(12-8*y*inverse);
    if(sx<0||sx>=48||sy<0||sy>=24)continue;
    const i=sy*48+sx;if(inverse<=depths[i])continue;
    const normal=rotate([ct*cp,st,ct*sp]),luma=clamp((normal[0]*.22+normal[1]*.66+normal[2]*-.718+1)/2,0,1);
    depths[i]=inverse;glyphs[i]=Math.round(luma*(m.config.glyphRamp.length-1));lumas[i]=luma;
  }
  const occupied=[],edges=[];
  for(let i=0;i<1152;i++)if(glyphs[i]>=0){occupied.push(i);const x=i%48,y=Math.floor(i/48);if(x===0||x===47||y===0||y===23||[i-1,i+1,i-48,i+48].some(j=>glyphs[j]<0))edges.push(i)}
  const distances=occupied.map(i=>Math.min(...edges.map(j=>Math.abs(i%48-j%48)+Math.abs(Math.floor(i/48)-Math.floor(j/48)))));
  eq(m.render.glyphChecksum,checksum(glyphs),'Complete independent torus z-buffer');
  eq(m.render.occupiedCells,occupied.length,'All occupied cells');eq(m.render.silhouetteCells,edges.length,'Complete silhouette');
  eq(m.render.accentCells,distances.filter(d=>d<=6).length,'Six-cell interior edge distance');
  const xs=occupied.map(i=>i%48),ys=occupied.map(i=>Math.floor(i/48));
  eq(m.render.silhouetteBounds,[Math.min(...xs),Math.min(...ys),Math.max(...xs),Math.max(...ys)].join(','),'Complete torus bounds');
  eq(m.render.glyphsUsed,[...m.config.glyphRamp].filter((_,i)=>glyphs.includes(i)).join(''),'All torus glyphs');
  if(row.paint){
    const paint=unpack(row.paint,fixture.pool);let start=-1;
    paint.forEach((c,i)=>{if(c[0]==='call'&&c[1]==='fillRect'&&c[2]===0&&c[3]===0&&c[4]===m.canvas.width&&c[5]===m.canvas.height)start=i});
    if(start>=0){
      const texts=paint.slice(start).filter(c=>c[0]==='call'&&c[1]==='fillText');eq(texts.length,occupied.length,'Every occupied glyph is painted');
      const seen=new Set();
      for(const c of texts){const x=Math.round(c[3]/(m.canvas.width/48)-.5),y=Math.round(c[4]/(m.canvas.height/24)-.54),i=y*48+x;
        eq(c[2],m.config.glyphRamp[glyphs[i]],'Painted z-buffer glyph');near(c[3],(x+.5)*m.canvas.width/48,'Painted glyph X');near(c[4],(y+.54)*m.canvas.height/24,'Painted glyph Y');seen.add(i)}
      eq(seen.size,occupied.length,'No duplicated or missing cells');
    }
  }
}

function morph(m){
  eq([m.config.columns,m.config.rows,m.config.cellWidth,m.config.cellHeight,m.config.delayScale,m.config.cellDuration,m.config.autoInterval],[30,16,7,12,8,400,4000],'Complete original morph model');
  const ramp=' .:-=+*#%@';eq(m.config.glyphRamp,ramp,'Complete ramp');
  const buckets=[Array(10).fill(0),Array(10).fill(0)];let changed=0,blank=0;
  for(let f=0;f<2;f++){eq(m.figureRows[f].length,16,'All figure rows');for(let i=0;i<480;i++){
    const row=m.figureRows[f][Math.floor(i/30)];eq(row.length,30,'All figure columns');const glyph=ramp.indexOf(row[i%30]);
    eq(m.figureGlyphs[f][i],glyph,'Literal figure glyph');eq(m.figureValues[f][i],glyph,'Literal figure value');buckets[f][glyph]++;
  }}
  for(let i=0;i<480;i++){if(m.figureGlyphs[0][i]!==m.figureGlyphs[1][i])changed++;if((m.figureGlyphs[0][i]===0)!==(m.figureGlyphs[1][i]===0))blank++}
  eq(buckets,[[266,14,22,4,28,16,14,48,54,14],[336,12,12,8,16,16,20,24,20,16]],'Original complete figure histograms');eq(changed,222,'All changed figure cells');eq(blank,102,'All blank-transition cells');
  let min=Infinity,max=0;
  for(let i=0;i<480;i++){
    const distance=Math.hypot((i%30+.5)*7-m.state.originX,(Math.floor(i/30)+.5)*12-m.state.originY),delay=Math.fround(distance*8);
    eq(m.delays[i],delay,'Radial delay');min=Math.min(min,delay);max=Math.max(max,delay);
    const progress=m.state.morphing?clamp((m.state.activeTime-m.state.morphStart-delay)/400,0,1):1;
    const value=m.state.morphing?Math.fround(m.fromValues[i]+(m.targetIndices[i]-m.fromValues[i])*progress):m.figureValues[m.state.stableFigure][i];
    eq(m.progressValues[i],Math.fround(progress),'Original per-cell progress');eq(m.currentValues[i],value,'Original interpolated Float32 value');
    eq(m.currentGlyphIndices[i],Math.round(value),'Original quantized glyph');eq(m.renderBuckets[i],Math.round(value),'Actual render bucket');
    const elapsed=m.state.activeTime-m.state.morphStart;
    eq(m.flashFlags[i],m.state.morphing&&m.blankTransitionFlags[i]&&elapsed>=delay+125&&elapsed<delay+275?1:0,'Exact flash interval');
    eq(m.lastTriggerBefore[i],m.lastTriggerFrom[i],'Interrupted morph retains visible source');
  }
  eq(m.state.delayMinimum,min,'Minimum delay');eq(m.state.delayMaximum,max,'Maximum delay');eq(m.state.fullDuration,max+400,'Full radial duration');
}

// A high-accuracy bisection oracle is independent of the original Newton solver.
function bezierEase(x){let lo=0,hi=1;for(let i=0;i<60;i++){const t=(lo+hi)/2,q=1-t;const bx=3*q*q*t*.22+3*q*t*t*.36+t*t*t;if(bx<x)lo=t;else hi=t}const t=(lo+hi)/2;return 1-Math.pow(1-t,3)}
function matrix(m){
  eq([m.config.columns,m.config.rows,m.config.pitch,m.config.speed,m.config.message],[56,14,10,40,'INTRX●DOT●MATRIX'],'Complete matrix and message');
  eq(m.config.shapes,['circle','square','diamond','cross'],'All four original shapes');
  const columns=[];for(const character of m.config.message){const glyph=m.fixtures.glyphs[character];eq(glyph.length,7,'Complete bitmap height');for(let x=0;x<5;x++)columns.push(glyph.map(row=>Number(row[x])));columns.push(Array(7).fill(0))}for(let n=0;n<8;n++)columns.push(Array(7).fill(0));
  eq(m.fixtures.messageColumns,columns,'Complete original message track');eq(m.fixtures.trackWidth,columns.length*10,'Track width');
  near(m.state.scrollDistance,m.state.activeTime*.04,'Original scroll speed',2e-9);
  const sx=((m.state.scrollDistance%(columns.length*10))+columns.length*10)%(columns.length*10),column=Math.floor(sx/10),phase=(sx%10)/10;
  near(m.state.scrollX,sx,'Complete wrap');eq(m.state.scrollColumn,column,'Track column');near(m.state.scrollPhase,phase,'Sub-column interpolation');
  let lit=0;
  for(let x=0;x<56;x++)for(let y=0;y<14;y++){
    const r=y-3,level=r<0||r>=7?0:columns[(column+x)%columns.length][r]*(1-phase)+columns[(column+x+1)%columns.length][r]*phase;
    near(m.allLevels[x*14+y],level,'Every interpolated matrix dot');if(level>=.5)lit++;
  }
  eq(m.state.litCount,lit,'Actual lit-dot count');
  for(let c=0;c<56;c++){
    const local=m.state.activeTime-m.morph.start-c*6;let shape,scale,phase;
    if(!m.morph.morphing){shape=m.state.displayShape;scale=1;phase='settled'}
    else if(local<=0){shape=m.morphBaseShapes[c];scale=m.morphBaseScales[c];phase='delay'}
    else if(local<120){shape=m.morphBaseShapes[c];scale=m.morphBaseScales[c]*(1-local/120);phase='out'}
    else if(local<280){shape=m.morph.to;scale=bezierEase((local-120)/160);phase='in'}
    else{shape=m.morph.to;scale=1;phase='arrived'}
    eq(m.allMorphs[c].shape,shape,'Every column shape');eq(m.allMorphs[c].phase,phase,'Every column phase');near(m.allMorphs[c].scale,scale,'Independent cubic-bezier morph scale',.00001);
  }
  if(m.pointer.inside)eq(m.pointer.column,clamp(Math.round((m.pointer.lastX-5)/10),0,55),'Pointer-selected complete column');
}

function noiseHash(x,y,z){let h=24681357^Math.imul(x,374761393)^Math.imul(y,668265263)^Math.imul(z,1442695041);h=Math.imul(h^(h>>>13),1274126177);return((h^(h>>>16))>>>0)/4294967295}
function noise(x,y,z){const base=[Math.floor(x),Math.floor(y),Math.floor(z)],t=[x-base[0],y-base[1],z-base[2]].map(v=>v*v*(3-2*v));let sum=0;
  for(let iz=0;iz<2;iz++)for(let iy=0;iy<2;iy++)for(let ix=0;ix<2;ix++)sum+=noiseHash(base[0]+ix,base[1]+iy,base[2]+iz)*(ix?t[0]:1-t[0])*(iy?t[1]:1-t[1])*(iz?t[2]:1-t[2]);return sum}
function globe(m){
  eq([m.config.rings,m.config.pointsPerRing,m.config.pointCount,m.config.rotationPeriod],[24,48,1152,12000],'Complete original globe');
  eq(m.fixtures.points.length,1152,'All globe points');near(m.state.rotation,((.35+m.state.activeTime*Math.PI*2/12000)%(2*Math.PI)+2*Math.PI)%(2*Math.PI),'Complete orbit wrap');
  const expected=[];let land=0;
  for(let i=0;i<1152;i++){
    const ring=Math.floor(i/48),column=i%48,lat=Math.PI/2-(ring+.5)/24*Math.PI,lon=column/48*2*Math.PI-Math.PI;
    const x=Math.cos(lat)*Math.cos(lon),y=Math.sin(lat),z=Math.cos(lat)*Math.sin(lon);
    const n=.67*noise(x*1.35+4.1,y*1.35-2.7,z*1.35+1.9)+.33*noise(x*2.7-3.4,y*2.7+5.2,z*2.7-.8),isLand=n>=.55,p=m.fixtures.points[i];
    eq(p.index,i,'Original point identity');eq(p.ring,ring,'Point ring');eq(p.column,column,'Point column');
    for(const [k,v] of Object.entries({latitude:lat,longitude:lon,x,y,z,noise:n}))near(p[k],v,'Original point '+k);eq(p.land,isLand,'Independent continent noise');if(isLand)land++;
    const r=m.state.rotation,tx=m.state.tiltX,tz=m.state.tiltZ;
    const yawX=x*Math.cos(r)+z*Math.sin(r),yawZ=-x*Math.sin(r)+z*Math.cos(r),py=y*Math.cos(tx)-yawZ*Math.sin(tx),vz=y*Math.sin(tx)+yawZ*Math.cos(tx);
    if(vz<=0)continue;
    const vx=yawX*Math.cos(tz)-py*Math.sin(tz),vy=yawX*Math.sin(tz)+py*Math.cos(tz),length=Math.hypot(-.55,.68,.48),light=clamp((vx*-.55+vy*.68+vz*.48)/length,0,1),terminator=light>=.15&&light<=.3;
    expected.push({index:i,viewX:vx,viewY:vy,viewZ:vz,screenX:180+vx*110,screenY:122-vy*110,lighting:light,mask:isLand?1:.58,radius:.5+3*light*(isLand?1:.58),land:isLand,terminator,tone:terminator?'terminator':isLand?'land':'ocean',alpha:terminator?.6:1});
  }
  eq(m.fixtures.landCount,land,'Complete land population');eq(m.fixtures.oceanCount,1152-land,'Complete ocean population');eq(m.projection.visiblePoints.length,expected.length,'Complete visible hemisphere');eq(m.projection.backfaceCount,1152-expected.length,'Complete hidden hemisphere');
  for(let i=0;i<expected.length;i++)for(const [key,value] of Object.entries(expected[i]))typeof value==='number'?near(m.projection.visiblePoints[i][key],value,'Projected point '+key):eq(m.projection.visiblePoints[i][key],value,'Projected point '+key);
  const step=m.state.tiltStep;
  near(step.afterX,m.lifecycle.reduced?m.state.targetTiltX:step.beforeX+(m.state.targetTiltX-step.beforeX)*.06,'Original X tilt recurrence');
  near(step.afterZ,m.lifecycle.reduced?m.state.targetTiltZ:step.beforeZ+(m.state.targetTiltZ-step.beforeZ)*.06,'Original Z tilt recurrence');
}

const results=[];
for(const record of H.manifest.cases.filter(c=>!selected||c.key===selected)){
  const config=record.config,file=record.file,bytes=fs.readFileSync(file),fixture=H.fixture(record);
  eq(fixture.config,config,'Scenario is immutable');eq(fixture.sourceSHA256,H.manifest.definitions.find(d=>d.id===config.id).jsSHA256,'Source-bound capture');
  for(const [name,key] of [['original-harness.cjs','harnessSHA256'],['scenarios.cjs','scenariosSHA256'],['probes.cjs','probesSHA256']])eq(fixture[key],H.manifest.environmentHashes[name],'Capture environment '+name);
  const before=checks;let checkpoints=0,activeTime=0,wallTime=0,visible=true,documentVisible=true,paused=false;
  for(const row of fixture.rows){
    for(const event of row.events){
      if(event.type==='intersection')visible=event.visible;if(event.type==='document')documentVisible=event.visible;
      if(event.type==='reset'||config.id==='ascii-morph'&&event.type==='key'&&event.key==='R')activeTime=0;
      if(config.id==='ascii-donut-3d'&&!config.reduced){if(event.type==='key'&&event.key===' ')paused=!paused;if(event.type==='pointer'&&event.event==='pointerdown')paused=false}
    }
    eq(row.now,wallTime+(row.frame?(row.frame===610?150:row.frame===620?1:config.stepMS):0),'Declared independent wall clock');
    if(row.frame&&!config.reduced&&visible&&documentVisible&&!paused)activeTime+=Math.min(50,row.now-wallTime);
    wallTime=row.now;
    if(config.reduced)eq(row.pendingFrames,0,'Reduced motion does not schedule');
    if(row.frame>=370&&row.frame<400||row.frame>=520&&row.frame<550){eq(row.pendingFrames,0,'Independent hold clears scheduling');eq(row.paintCommands,0,'Held model does not repaint')}
    if(!row.model)continue;
    const m=unpack(row.model,fixture.pool);checkpoints++;
    try {
      eq(config.id==='ascii-donut-3d'?m.state.simulationTime:m.state.activeTime,activeTime,'Exact independent active clock');
      ({'ascii-donut-3d':donut,'ascii-morph':morph,'dot-matrix-shapes':matrix,'halftone-globe-canvas':globe})[config.id](m,row,fixture);
    } catch(error) { error.message=config.key+' frame '+row.frame+': '+error.message;throw error; }
  }
  eq(fixture.cleanup,{pendingFrames:0,resizeTargets:0,intersectionTargets:0,connected:false},'Original disposal');
  const last=unpack(fixture.rows.at(-1).model,fixture.pool);
  if(!config.reduced&&config.id==='dot-matrix-shapes')assert(last.state.scrollDistance>last.fixtures.trackWidth,'Complete marquee wrap was not exercised');
  if(!config.reduced&&config.id==='halftone-globe-canvas')assert(last.state.activeTime>12000,'Complete globe orbit was not exercised');
  if(!config.reduced&&config.id==='ascii-morph')assert(last.counters.autoTriggers>0,'Autonomous morph was not exercised');
  results.push({key:config.key,sha256:hash(bytes),checkpoints,checks:checks-before});console.log('PASS independent model '+config.key+' / '+(checks-before)+' checks');
}
const report={verifiedAt:new Date().toISOString(),sourceCommit:H.manifest.sourceCommit,completeMatrix:!selected,cases:results.length,checks,checkpoints:results.reduce((n,item)=>n+item.checkpoints,0),numericErrors,sourceHashes:initialHashes,results,
 scope:'Independent complete torus projection, literal morph figures/radial timing, full message bitmap/column shape fields, seeded globe continents and hemisphere projection, active clocks, holds and cleanup. Native v4 geometry, physical input and performance have separate verifiers.',errors:[]};
fs.writeFileSync(dir+'/fixture-models'+(selected?'-'+selected:'')+'-proof.json',JSON.stringify(report,null,2));console.log('PASS '+results.length+' cases / '+checks+' independent checks');

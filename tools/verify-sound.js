const fs=require('node:fs'),cp=require('node:child_process'),path=require('node:path'),crypto=require('node:crypto'),assert=require('node:assert/strict');
const base=process.argv[2]||'http://127.0.0.1:4173',dir='.artifacts/sound',stored=process.argv.includes('--check-evidence'),hash=f=>crypto.createHash('sha256').update(fs.readFileSync(f)).digest('hex');
const steps=[['models',68],['owned',34],['native',144],['input',24],['projection',22],['hosts',192],['clocks',72],['touch',24],['portable',48],['visibility',18],['routes',12],['boundaries',24]],results=[];
fs.mkdirSync(dir,{recursive:true});
for(const[name,count]of steps){
 const script='tools/verification/sound-'+name+'.js',started=Date.now();
 if(!stored){const r=cp.spawnSync(process.execPath,[script,base],{encoding:'utf8',maxBuffer:8*1024*1024});fs.writeFileSync(dir+'/'+name+'.log',r.stdout+r.stderr);process.stdout.write(r.stdout);if(r.status!==0){process.stderr.write(r.stderr);process.exit(r.status||1);}}
 const file=dir+'/'+name+'.json';if(!stored)assert(fs.statSync(file).mtimeMs>=started,'Fresh '+name+' proof');
 const proof=JSON.parse(fs.readFileSync(file));assert(proof.checks>0);assert.equal(proof.results.length,count,name+' complete cases');assert.equal(proof.sourceHashes[path.resolve(script)],hash(script));
 for(const[f,sha]of Object.entries(proof.sourceHashes))assert.equal(hash(f),sha,'Current '+name+' source '+f);
 assert.deepEqual(proof.errors,[]);results.push({name,cases:count,checks:proof.checks,proof:file,sha256:hash(file)});if(stored)console.log('CHECK current source-bound '+name+' proof');
}
const checks=results.reduce((n,r)=>n+r.checks,0);
fs.writeFileSync(dir+'/results.json',JSON.stringify({at:new Date().toISOString(),groups:results.length,checks,results,verifiedFromStoredEvidence:stored,scope:'All six v4 Sound instruments: 58 original SVGs, complete original state and synthesis graphs, lossless original buffers and measured native PCM repeatability, actual trusted audio/input, painted pixels, 60/120/240Hz clocks, compact layouts, mobile touch, authored mute and independent holds, native context closure/recovery, route/viewport cleanup and 48 fresh offline exports.'},null,2)+'\n');
console.log('PASS '+results.length+' Sound groups / '+checks+' checks');

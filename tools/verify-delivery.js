/* Authoring/delivery equivalence through the actual registry and metadata API. */
const fs=require('node:fs'),path=require('node:path'),vm=require('node:vm'),assert=require('node:assert/strict'),crypto=require('node:crypto'),zlib=require('node:zlib');
const ROOT=path.resolve(__dirname,'..');process.chdir(ROOT);
const option=name=>process.argv.find(arg=>arg.startsWith('--'+name+'='))?.slice(name.length+3);
const build=path.resolve(option('catalog-root')||ROOT),sha=value=>crypto.createHash('sha256').update(value).digest('hex');
const catalog=JSON.parse(fs.readFileSync(path.join(build,'registry/index.json'),'utf8'));
const {files,filesById}=require('./load-registry')(),{serialize,buildComponentModule}=require('./component-module');
const sourceCounts=new Map();for(const file of Object.values(filesById))sourceCounts.set(file,(sourceCounts.get(file)||0)+1);
const sources=new Map(files.map(file=>[file,fs.readFileSync(file,'utf8').replace(/\r\n/g,'\n')]));
const delivery=new Map(catalog.map(item=>{
 const file=item.module.split('?')[0];assert.equal(file,sourceCounts.get(filesById[item.id])>1?'registry/m/'+item.id+'.js':filesById[item.id],'Delivery path '+item.id);
 return[item.id,fs.readFileSync(path.join(file.startsWith('registry/m/')?build:ROOT,file),'utf8').replace(/\r\n/g,'\n')];
}));
const inputs=Object.fromEntries([__filename,'tools/component-module.js','tools/load-registry.js','js/shell/registry.js','js/shell/access.js','js/meta.stage.js',path.join(build,'registry/index.json'),...files,...catalog.map(d=>d.module.split('?')[0]).filter(f=>f.startsWith('registry/m/')).map(f=>path.join(build,f))].map(file=>[file,sha(fs.readFileSync(file))]));
let checks=0;
function equal(actual,expected,message){checks++;assert.deepEqual(actual,expected,message);}
// Keep undefined, signed zero, object order and sparse arrays visible across VMs.
function snapshot(value){
 if(value===null)return['null'];
 if(typeof value==='number')return['number',Object.is(value,-0)?'-0':String(value)];
 if(typeof value!=='object')return[typeof value,String(value)];
 if(Array.isArray(value))return['array',value.length,Array.from({length:value.length},(_,i)=>i in value?snapshot(value[i]):['hole'])];
 return['object',Object.getPrototypeOf(value)===null?'null':'plain',Object.keys(value).map(key=>[key,snapshot(value[key])])];
}
function definitions(R){return Object.fromEntries(R.demos.map(d=>[d.id,{data:snapshot(d),inline:snapshot(d._inlineMeta)}]));}
function registrationState(R){return snapshot(Object.fromEntries(Object.keys(R).filter(key=>!['demos','stageMeta','catalog','byId'].includes(key)).map(key=>[key,R[key]])));}
async function load(generated,order){
 const context={console};context.window=context;
 context.fetch=async()=>({ok:true,json:async()=>JSON.parse(JSON.stringify(catalog))});vm.createContext(context);
 for(const file of ['js/shell/registry.js','js/shell/access.js'])vm.runInContext(fs.readFileSync(file,'utf8'),context,{filename:file});
 const R=context.INTRX,raw={};const register=R.register;
 R.register=function(d){raw[d.id]=snapshot(d);return register.call(R,d);};
 const meta=async()=>{if(order.startsWith('catalog'))await R.initCatalog();else vm.runInContext(fs.readFileSync('js/meta.stage.js','utf8'),context,{filename:'js/meta.stage.js'});};
 if(order.endsWith('before'))await meta();
 if(generated){
  for(const item of catalog){const count=R.demos.length;vm.runInContext(delivery.get(item.id),context,{filename:item.module});equal(R.demos.length,count+1,'One registration '+item.id);equal(R.demos.at(-1).id,item.id,'Requested registration '+item.id);}
 }else for(const[file,source]of sources)vm.runInContext(source,context,{filename:file});
 if(order.endsWith('after'))await meta();
 const initial=definitions(R),state=registrationState(R);
 // A captured effective definition would turn defaults into permanent overrides.
 R.meta(Object.fromEntries(Object.entries(R.stageMeta).map(([id,m])=>[id,{...m,addedAt:'2099-12-31',stage:{...m.stage,theme:m.stage?.theme==='dark'?'light':'dark',deliveryProbe:true},a11y:{...m.a11y,deliveryProbe:true}}])));
 return{initial,changed:definitions(R),raw,state};
}
async function main(){
 const edge=vm.runInNewContext('({missing:undefined,negativeZero:-0,sparse:[,1,,],nullPrototype:Object.assign(Object.create(null),{key:"value"}),["__proto__"]:{own:true}})');
 equal(snapshot(vm.runInNewContext('('+serialize(edge)+')')),snapshot(edge),'Lossless non-JSON values and own __proto__ data');
 for(const invalid of [()=>{},Symbol('value'),new Date(),new (class Custom{})(),Object.defineProperty({},'key',{enumerable:true,get(){throw Error('Getter executed');}}),Object.assign([1],{extra:true})]){checks++;assert.throws(()=>serialize(invalid),/Component module/,'Unsupported data is rejected');}
 const cycle={};cycle.self=cycle;checks++;assert.throws(()=>serialize(cycle),/Cyclic component/,'Cyclic data is rejected');
 equal(catalog.length,Object.keys(filesById).length,'Complete catalog');equal(new Set(catalog.map(d=>d.id)).size,catalog.length,'Unique catalog IDs');
 for(const order of ['stage-before','stage-after','catalog-before','catalog-after']){
  const original=await load(false,order),generated=await load(true,order);
  for(const item of catalog){equal(generated.raw[item.id],original.raw[item.id],order+' original data '+item.id);equal(generated.initial[item.id],original.initial[item.id],order+' effective data '+item.id);equal(generated.changed[item.id],original.changed[item.id],order+' changed defaults '+item.id);}
  equal(generated.state,original.state,order+' registration side effects');
 }
 const registry=require('./load-registry')(),sizes=[],moduleIds=[];
 for(const item of catalog){
  const source=delivery.get(item.id),file=filesById[item.id],original=sources.get(file);
  equal(item.module.split('?v=')[1],sha(source).slice(0,10),'Exact content hash '+item.id);
  if(sourceCounts.get(file)>1){equal(source,buildComponentModule(registry.demos.find(d=>d.id===item.id),registry.metadata[item.id],file),'Deterministic module '+item.id);moduleIds.push(item.id);}
  else equal(source,original,'Unchanged individual authoring module '+item.id);
  sizes.push({id:item.id,split:sourceCounts.get(file)>1,authoringBytes:Buffer.byteLength(original),deliveryBytes:Buffer.byteLength(source),authoringGzip:zlib.gzipSync(original).length,deliveryGzip:zlib.gzipSync(source).length});
 }
 equal(fs.readdirSync(path.join(build,'registry/m')).filter(f=>f.endsWith('.js')).sort(),moduleIds.map(id=>id+'.js').sort(),'No orphan delivery modules');
 for(const[file,hash]of Object.entries(inputs))equal(sha(fs.readFileSync(file)),hash,'Stable input '+file);
 const result={components:catalog.length,checks,metadataOrders:4,splitModules:moduleIds.length,unchangedIndividualModules:catalog.length-moduleIds.length,sizes,scope:'Exact definition, original inline metadata, updated defaults, registration side effects, content hashes and single-registration delivery. Browser startup and frame rate are separate.'};
 const output=option('output');if(output){const target=path.resolve(output);assert(target.startsWith(path.join(ROOT,'.artifacts')+path.sep),'Reports stay in .artifacts');fs.mkdirSync(path.dirname(target),{recursive:true});fs.writeFileSync(target,JSON.stringify({...result,inputs},null,2)+'\n');}
 console.log(JSON.stringify({...result,sizes:undefined}));
}
main().catch(error=>{console.error(error.stack);process.exitCode=1;});

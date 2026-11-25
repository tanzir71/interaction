/* Match v4 names throughout generated metadata and actual portable documents. */
const fs=require('node:fs'),crypto=require('node:crypto'),assert=require('node:assert/strict');
const manifest=require('../INTRX-handover/manifest/components.json').components,catalog=require('../registry/index.json'),hash=b=>crypto.createHash('sha256').update(b).digest('hex');
const decode=s=>s.replace(/&(amp|lt|gt|quot|#39);/g,(_,key)=>({amp:'&',lt:'<',gt:'>',quot:'"','#39':"'"})[key]);
assert.equal(catalog.length,manifest.length);assert.equal(new Set(catalog.map(d=>d.id)).size,manifest.length);
let documents=0;for(const expected of manifest){
 const item=catalog.find(d=>d.id===expected.id);assert(item,'Published v4 ID '+expected.id);assert.equal(item.title,expected.title,'Catalog title '+expected.id);
 const full=JSON.parse(fs.readFileSync('registry/c/'+item.id+'.json')),portable=JSON.parse(fs.readFileSync('r/'+item.id+'.json'));
 assert.equal(full.title,expected.title,'Full registry title '+item.id);assert.equal(portable.title,expected.title,'Portable registry title '+item.id);
 for(const file of [...full.files,...portable.files]){const title=file.content.match(/<title>([^]*?)<\/title>/)?.[1];assert.equal(decode(title||''),expected.title,'Portable document title '+item.id);documents++;}
 const previewPath=item.sourcePreview.split('?')[0],bytes=fs.readFileSync(previewPath,'utf8').replace(/\r\n/g,'\n'),version=item.sourcePreview.split('?v=')[1];
 assert.equal(version,hash(bytes).slice(0,10),'Preview URL follows emitted content '+item.id);assert.equal(full.sourcePreview,item.sourcePreview,'Detail source URL '+item.id);
}
console.log('PASS '+manifest.length+' v4 catalog/full/portable titles, '+documents+' document titles and '+catalog.length+' emitted preview hashes');

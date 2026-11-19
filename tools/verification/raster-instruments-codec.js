const assert=require('node:assert/strict');
function unpack(v){
  if(Array.isArray(v))return v.map(unpack);
  if(!v||typeof v!=='object')return v;
  if(v.$number)return{Infinity,'-Infinity':-Infinity,NaN,'-0':-0}[v.$number];
  if(v.$vector){const b=Buffer.from(v.$vector,'base64');assert.equal(b.length,v.length*(v.format==='u8'?1:8));return Array.from({length:v.length},(_,i)=>v.format==='u8'?b[i]:b.readDoubleLE(i*8));}
  if(v.$rows){const cols=Object.fromEntries(Object.entries(v.columns).map(([k,x])=>[k,unpack(x)]));return Array.from({length:v.$rows},(_,i)=>Object.fromEntries(Object.entries(cols).map(([k,x])=>[k,x[i]])));}
  return Object.fromEntries(Object.entries(v).map(([k,x])=>[k,unpack(x)]));
}
module.exports={unpack};

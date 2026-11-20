// Native asynchronous SHA-256 gives typed pixel/map data content identities. Each
// complete byte sequence is retained once; model snapshots contain stable refs.
function createNormalizer(store){
 const encode=bytes=>{let text='';for(let i=0;i<bytes.length;i+=8192)text+=String.fromCharCode(...bytes.subarray(i,i+8192));return btoa(text);};
 const digest=async bytes=>Array.from(new Uint8Array(await crypto.subtle.digest('SHA-256',bytes)),x=>x.toString(16).padStart(2,'0')).join('');
 async function normalize(value){
  if(ArrayBuffer.isView(value)){
   let type,bytes;if(value instanceof Uint16Array){type='u16le';bytes=new Uint8Array(value.length*2);const view=new DataView(bytes.buffer);for(let i=0;i<value.length;i++)view.setUint16(i*2,value[i],true);}
   else if(value instanceof Float64Array){type='f64le';bytes=new Uint8Array(value.length*8);const view=new DataView(bytes.buffer);for(let i=0;i<value.length;i++)view.setFloat64(i*8,value[i],true);}
   else if(value instanceof Uint8Array||value instanceof Uint8ClampedArray){type='u8';bytes=new Uint8Array(value.buffer,value.byteOffset,value.byteLength).slice();}
   else throw Error('Unsupported captured buffer '+value.constructor.name);
   const sha256=await digest(bytes),key=type+':'+sha256;if(!store[key])store[key]={type,length:value.length,byteLength:bytes.length,sha256,bytes:encode(bytes)};return{buffer:key,type,length:value.length,byteLength:bytes.length};
  }
  if(Array.isArray(value)){const result=[];for(const entry of value)result.push(await normalize(entry));return result;}
  if(value&&typeof value==='object'){const result={};for(const[key,entry]of Object.entries(value))result[key]=await normalize(entry);return result;}
  return value;
 }
 return normalize;
}
module.exports={createNormalizer};

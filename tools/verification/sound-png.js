const zlib=require('node:zlib'),assert=require('node:assert/strict');
function decode(bytes){assert.equal(bytes.subarray(1,4).toString(),'PNG');let offset=8,width,height,channels;const blocks=[];while(offset<bytes.length){const length=bytes.readUInt32BE(offset),type=bytes.subarray(offset+4,offset+8).toString(),data=bytes.subarray(offset+8,offset+8+length);if(type==='IHDR'){width=data.readUInt32BE(0);height=data.readUInt32BE(4);assert.equal(data[8],8);channels=data[9]===6?4:data[9]===2?3:0;assert(channels);assert.equal(data[12],0);}if(type==='IDAT')blocks.push(data);offset+=length+12;}
 const raw=zlib.inflateSync(Buffer.concat(blocks)),stride=width*channels,out=Buffer.alloc(width*height*4);let previous=Buffer.alloc(stride),at=0;
 const paeth=(a,b,c)=>{const p=a+b-c,pa=Math.abs(p-a),pb=Math.abs(p-b),pc=Math.abs(p-c);return pa<=pb&&pa<=pc?a:pb<=pc?b:c;};
 for(let y=0;y<height;y++){const type=raw[at++],row=Buffer.alloc(stride);assert(type<=4);for(let x=0;x<stride;x++){const a=x>=channels?row[x-channels]:0,b=previous[x],c=x>=channels?previous[x-channels]:0;row[x]=(raw[at++]+(type===0?0:type===1?a:type===2?b:type===3?Math.floor((a+b)/2):type===4?paeth(a,b,c):NaN))&255;}for(let x=0;x<width;x++){const s=x*channels,d=(y*width+x)*4;out[d]=row[s];out[d+1]=row[s+1];out[d+2]=row[s+2];out[d+3]=channels===4?row[s+3]:255;}previous=row;}
 assert.equal(at,raw.length);return{width,height,pixels:out};
}
module.exports={decode};

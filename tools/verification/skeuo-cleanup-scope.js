/* Preserve the original model checksum while allowing this one host-only binding. */
const assert=require('node:assert/strict');
const binding='const stop=undefined; returnedCleanup=(()=>{';
module.exports=function originalKernel(source){
 const count=source.split(binding).length-1;
 assert(count<=1,'One optional browser-stop binding per embedded kernel');
 return count?source.replace(binding,'returnedCleanup=(()=>{'):source;
};

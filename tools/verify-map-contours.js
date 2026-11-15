/* Compare the optimized full-grid extractor with the unchanged original math. */
const fs=require('node:fs');
module.exports=async function verifyContourEquivalence(page,check){
 const reference=JSON.parse(fs.readFileSync('tools/fixtures/isoline-reference.json','utf8')).body;
 const result=await page.evaluate(({reference})=>{
  const root=document.querySelector('.detail-stage')._root,before=root.__mapIsolineFieldInspect(),extract=root.__mapIsolineFieldExtract,original=new Function('values','colors',reference),levels=[.24,.33,.42,.51,.60,.69,.78],cases=[];
  cases.push({name:'original field',values:before.field.values});
  for(const level of levels){
   cases.push({name:'flat '+level,values:Array(2560).fill(level)});
   for(const direction of ['horizontal','vertical'])for(const epsilon of [.1,8e-12,1e-14])cases.push({name:direction+' boundary '+level+' / '+epsilon,values:Array.from({length:2560},(_,i)=>{const n=direction==='horizontal'?Math.floor(i/64):i%64;return level+(n%3===0?0:n%3===1?epsilon:-epsilon);})});
   cases.push({name:'near-threshold saddle '+level,values:Array.from({length:2560},(_,i)=>level+((Math.floor(i/64)+i%64)%2?8e-12:-8e-12))});
  }
  let seed=19371;const next=()=>{seed^=seed<<13;seed^=seed>>>17;seed^=seed<<5;return seed>>>0;};
  for(let n=0;n<16;n++)cases.push({name:'seeded boundary field '+n,values:Array.from({length:2560},()=>{const r=next(),level=levels[r%7],kind=(r>>>8)%5;return kind===0?level:kind===1?level+1e-14:kind===2?level-1e-14:kind===3?level+8e-12:r/4294967296;})});
  const checks=cases.map(item=>{const actual=extract(item.values),colors={acc:actual.levels[3].style.color,txt2:actual.levels[2].style.color,line1:actual.levels[0].style.color},expected=original(item.values,colors);return{name:item.name,equal:JSON.stringify(actual)===JSON.stringify(expected),frozen:Object.isFrozen(actual)&&Object.isFrozen(actual.levels[0].segments),segments:actual.totalSegments,duplicates:actual.duplicateSegments};});
  const after=root.__mapIsolineFieldInspect();
  return{checks,unchanged:JSON.stringify(before.field)===JSON.stringify(after.field)&&JSON.stringify(before.contours)===JSON.stringify(after.contours)};
 },{reference});
 for(const resultCase of result.checks)check(resultCase.equal&&resultCase.frozen,'Original contour equivalence: '+resultCase.name);
 check(result.unchanged,'Adversarial extraction preserves the live contour field and segments');
 return result;
};

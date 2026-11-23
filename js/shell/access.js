/* Pro is a design seam until the owner launches it. No payments or account state. */
(function(scope,factory){const policy=factory();if(typeof module==='object'&&module.exports)module.exports=policy;if(scope.INTRX)scope.INTRX.access=policy;})(typeof window==='object'?window:globalThis,function(){
 const settings=Object.freeze({enabled:false,candidates:Object.freeze(['fx-liquid-glass','fx-plasma-orb']),upgradeUrl:'https://intrx.vercel.app/#/pricing'});
 function create({enabled=settings.enabled}={}){const denied=new Set(),tier=item=>denied.has(item.id)||item.locked||item.tier==='pro'||enabled===true&&settings.candidates.includes(item.id)?'pro':'free';return Object.freeze({settings:Object.freeze({...settings,enabled:enabled===true}),tier,canReadSource:item=>tier(item)!=='pro',denySource:id=>{if(typeof id==='string')denied.add(id);},locked:item=>({id:item.id,locked:true,prompt:item.prompt,upgradeUrl:item.upgradeUrl||settings.upgradeUrl})});}
 return Object.freeze({...create(),create});
});

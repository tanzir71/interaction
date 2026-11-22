/* Extend the frozen exporter with the current shared Stage Kit. */
(function () {
  const R=window.INTRX,installed=Symbol.for('intrx.shared-stage-exporter');
  if(R[installed])return;
  Object.defineProperty(R,installed,{value:true});
  const wrapped=new WeakSet();
  function decorate(fn){
    if(typeof fn!=='function'||wrapped.has(fn))return fn;
    const result=function(...args){
      const html=fn.apply(this,args);
      if(!html)return html;
      if(typeof R.sharedStageCss!=='string'||!R.sharedStageCss.trim())throw Error('Shared Stage Kit CSS is unavailable');
      const neutral=html.replace('.stage[data-stage-theme="light"]{background:#F4F4F2;color-scheme:light}', '.stage[data-stage-theme="light"]{background:var(--p-gray-50);color-scheme:light}');
      return neutral.replace('</style>','\n/* INTRX portable shared Stage Kit */\n'+R.sharedStageCss+'\n</style>');
    };
    wrapped.add(result);return result;
  }
  let buildCode=decorate(R.buildCode);
  // Both load orders are used by the browser and dependency-free Node tooling.
  Object.defineProperty(R,'buildCode',{configurable:true,enumerable:true,get:()=>buildCode,set:fn=>{buildCode=decorate(fn);}});
})();

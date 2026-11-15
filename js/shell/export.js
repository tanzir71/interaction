/* One portable HTML exporter for the browser, registry, CLI and MCP. */
(function () {
  const R=window.INTRX;
  const escape=value=>String(value).replace(/[&<>"']/g,char=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[char]));
  const urls={gsap:'https://cdn.jsdelivr.net/npm/gsap@3.12.5/dist/gsap.min.js',scrolltrigger:'https://cdn.jsdelivr.net/npm/gsap@3.12.5/dist/ScrollTrigger.min.js',lenis:'https://cdn.jsdelivr.net/npm/lenis@1.1.14/dist/lenis.min.js'};
  R.compactSource=code=>code.replace(/data:[^;"')\s]+;base64,[A-Za-z0-9+/=]+/g,'data:embedded;base64,…');
  R.buildCode=function(demo){
    if(demo.tier==='pro')return '';
    let fonts=R.fontFaces.Geist+R.fontFaces['Geist Mono'];
    if(/Inter|--font-ui|--font-numeric/.test(demo.css))fonts+=R.fontFaces.Inter;
    if(/Manrope/.test(demo.css))fonts+=R.fontFaces.Manrope;
    if(/Newsreader|--font-editorial/.test(demo.css))fonts+=R.fontFaces.Newsreader+R.fontFaces['Newsreader Italic'];
    const data={id:demo.id,title:demo.title,rootClass:demo.rootClass,html:R.resolveAssets(demo.html.trim()),css:'',js:R.resolveAssets(demo.js.trim()),designSize:demo.designSize,...(demo.thumbDesignSize!==undefined?{thumb:demo.thumb,thumbDesignSize:demo.thumbDesignSize}:{}),stage:demo.stage,controls:demo.controls,_styled:true};
    const source=JSON.stringify(data).replace(/</g,'\\u003c');
    const libs=(demo.libs||[]).map(lib=>urls[lib]?'<script src="'+urls[lib]+'"><\/script>':'').join('\n');
    const credit=demo.source?'<!-- '+(demo.cat==='DRAMS'?'DRAMS by 1042 Studio (@mrblackstudio and @karimeshrimp). Native interpretation. ':'')+escape(demo.source.name)+' | '+escape(demo.source.url)+' -->\n':'';
    const photos=(demo.photoCredits||[]).map(photo=>'<!-- Photo: '+escape(photo.photographer)+' / Unsplash | '+escape(photo.url)+' | '+escape(photo.licenseUrl)+' -->\n').join('');
    const base='*{box-sizing:border-box}body{margin:0;background:var(--bg-canvas);color:var(--text-primary);font-family:var(--font-shell)}:root{--font-ui:"Inter","Segoe UI",Arial,sans-serif;--font-numeric:var(--font-ui);--font-editorial:"Newsreader",Georgia,serif}button,input{font:inherit}.demo-stage.stage{height:min(560px,100vh);min-height:320px;position:relative;overflow:hidden}.stage-content{position:absolute;display:flex;align-items:center;justify-content:center;transform:translateY(-4px)}.stage-content[data-bleed="true"]{transform:none}.stage-dock{position:absolute;display:flex;justify-content:center;gap:6px;bottom:12px;left:12px;right:12px}.stage[data-stage-theme="light"]{background:#F4F4F2;color-scheme:light}.stage[data-suspended="true"] *,.stage[data-suspended="true"] *::before,.stage[data-suspended="true"] *::after{animation-play-state:paused!important}';
    const bootstrap='(function(){const R=window.INTRX={resolveAssets:value=>value};\n'+R.exportRuntime+'\nR.mountStage('+source+',document.querySelector(".demo-stage"),"full");})();';
    return '<!DOCTYPE html>\n<html lang="en">\n<head>\n<meta charset="UTF-8">\n<meta name="viewport" content="width=device-width,initial-scale=1">\n<title>'+escape(demo.title)+'</title>\n'+credit+photos+libs+'\n<style>\n'+fonts+R.tokenCss+R.kitCss+base+R.resolveAssets(demo.css.trim())+'\n</style>\n</head>\n<body>\n<div class="demo-stage stage"></div>\n<script>\n'+bootstrap.replace(/<\/script/gi,'<\\/script')+'\n<\/script>\n</body>\n</html>';
  };
})();

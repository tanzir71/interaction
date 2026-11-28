(function(){
 const R=INTRX;
 R.escape=value=>String(value??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
 // Platform-aware shortcut glyph: ⌘ on Apple devices, Ctrl elsewhere.
 const nav=typeof navigator==='undefined'?{}:navigator;
 R.mod=/Mac|iPhone|iPad|iPod/i.test(nav.userAgentData?.platform||nav.platform||nav.userAgent||'')?'⌘':'Ctrl ';
 const icons={search:'home-imgIconSearch',moon:'home-imgIconMoon',github:'home-imgIconGithub',back:'detail-imgFrame',next:'detail-imgFrame1',share:'detail-imgFrame3',replay:'detail-imgFrame4',sun:'detail-imgFrame7',desktop:'detail-imgFrame8',tablet:'detail-imgFrame9',mobile:'detail-imgFrame10',expand:'detail-imgFrame11',copy:'detail-imgFrame12',check:'detail-imgFrame13',close:'browse-imgFrame',menu:'mobile-home-imgFrame1'};
 R.icon=name=>{const mobile={search:'mobile-home-imgFrame',back:'mobile-detail-imgFrame',share:'mobile-detail-imgFrame1',replay:'mobile-detail-imgFrame2',moon:'mobile-detail-imgFrame3',expand:'mobile-detail-imgFrame4'};return icons[name]?'<span class="shell-icon" aria-hidden="true"><picture>'+(mobile[name]?'<source media="(max-width:600px)" srcset="assets/shell/'+mobile[name]+'.svg">':'')+'<img src="assets/shell/'+icons[name]+'.svg" alt=""></picture></span>':'<svg width="16" height="16" aria-hidden="true"><use href="assets/icons.svg#'+name+'"></use></svg>';};

 R.announce=message=>{const live=document.getElementById('announcer');live.textContent='';requestAnimationFrame(()=>live.textContent=message);};
 R.bindTabs=container=>container.querySelectorAll('[role="tablist"]').forEach(list=>{
  if(list.closest('.stage-content'))return; // Each portable demo owns its keyboard behavior.
  if(list.dataset.tabsBound)return;list.dataset.tabsBound='true';
  const tabs=[...list.querySelectorAll('[role="tab"]')].filter(tab=>!tab.disabled);
  const sync=()=>tabs.forEach(tab=>tab.tabIndex=tab.getAttribute('aria-selected')==='true'?0:-1);sync();
  list.addEventListener('click',sync);
  list.addEventListener('keydown',event=>{const index=tabs.indexOf(event.target);if(index<0)return;let next;if(event.key==='ArrowRight')next=(index+1)%tabs.length;else if(event.key==='ArrowLeft')next=(index-1+tabs.length)%tabs.length;else if(event.key==='Home')next=0;else if(event.key==='End')next=tabs.length-1;else return;event.preventDefault();tabs[next].click();tabs[next].focus();sync();});
 });
 R.copy=async(text,button)=>{
  let copied=false;try{await navigator.clipboard.writeText(text);copied=true;}catch{const area=document.createElement('textarea');area.value=text;area.style.cssText='position:fixed;opacity:0';document.body.appendChild(area);area.select();copied=document.execCommand('copy');area.remove();}
  R.announce(copied?'Copied to clipboard':'Copy unavailable');
  if(button&&copied){const label=button.innerHTML;button.innerHTML='Copied ✓';setTimeout(()=>{if(button.isConnected)button.innerHTML=label;},1400);}
  return copied;
 };
 R.copyWhenReady=async(prepare,button)=>{
  if(button?.dataset.copyBusy)return false;
  const label=button?.innerHTML,icon=button?.classList.contains('icon-btn');
  if(button){button.dataset.copyBusy='true';button.setAttribute('aria-busy','true');button.innerHTML=icon?'…':'Preparing…';}R.announce('Preparing clipboard content');
  const prepared=Promise.resolve().then(prepare);prepared.catch(()=>{});
  try{
   if(typeof ClipboardItem==='function'&&navigator.clipboard?.write){
    // A promised Blob keeps the write tied to this click while source loads.
    // https://developer.mozilla.org/en-US/docs/Web/API/ClipboardItem/ClipboardItem
    const data=prepared.then(value=>new Blob([value],{type:'text/plain'}));data.catch(()=>{});
    await navigator.clipboard.write([new ClipboardItem({'text/plain':data})]);
    R.announce('Copied to clipboard');if(button){button.innerHTML=icon?R.icon('check'):'Copied ✓';setTimeout(()=>{if(button.isConnected)button.innerHTML=label;},1400);}return true;
   }
   const value=await prepared;if(button)button.innerHTML=label;return await R.copy(value,button);
  }catch{if(button)button.innerHTML=label;R.announce('Copy unavailable. Please try again.');return false;}
  finally{if(button){delete button.dataset.copyBusy;button.removeAttribute('aria-busy');}}
 };
 R.badges=item=>(item.isNew?'<span class="badge--new">New</span>':'')+(item.tier==='pro'?'<span class="badge--pro">Pro</span>':'')+(item.libs||[]).map(lib=>'<span class="badge--lib">'+R.escape(lib)+'</span>').join('');
 R.makeTile=(item,manager,{landing=false}={})=>{
  const card=document.createElement('article');card.className='tile'+(landing?' tile--landing':'');card.id='tile-'+item.id;card.dataset.id=item.id;card.setAttribute('data-intrx-tile','');
  const title=R.escape(item.title),hint=(item.trigger[0].toUpperCase()+item.trigger.slice(1)+' · '+item.hint.replace(/^(hover|press|drag|scroll|type|ambient|move)\s*[·:]?\s*/i,''));
  card.innerHTML='<div class="demo-stage stage" data-stage="'+item.id+'" data-mode="thumb" data-stage-theme="'+item.stage.theme+'" data-overflow="'+item.stage.overflow+'"></div><div class="tile-quick"><button class="icon-btn" data-copy="code" aria-label="Copy '+title+' code">'+R.icon('copy')+'</button><button class="icon-btn" data-copy="prompt" aria-label="Copy '+title+' prompt">⌘</button></div><div class="tile-caption"><button class="tile-details" type="button"><span>'+title+'</span>'+R.badges(item)+'</button><p class="tile-hint">'+R.escape(hint.length<=56?hint:item.trigger[0].toUpperCase()+item.trigger.slice(1)+' · '+item.hint.slice(0,42).replace(/\s+\S*$/,''))+'</p></div>';
  card.querySelector('.tile-details').addEventListener('click',()=>R.router.go('#/c/'+item.id));
  card.querySelectorAll('[data-copy]').forEach(button=>button.addEventListener('click',()=>R.copyWhenReady(async()=>{const demo=await R.loadDemo(item.id);return button.dataset.copy==='prompt'?demo.prompt:await R.getCode(demo);},button)));
  manager.add(item,card);return card;
 };
 R.renderTiles=(container,items,{landing=false}={})=>{const manager=R.liveTiles||(R.liveTiles=new R.LiveTiles());items.forEach(item=>container.appendChild(R.makeTile(item,manager,{landing})));};
 R.disposeView=()=>{if(R.liveTiles){R.liveTiles.destroy();R.liveTiles=null;}document.querySelectorAll('#app .demo-stage').forEach(stage=>stage._runtime?.dispose());R.viewCleanup?.();R.viewCleanup=null;};
 // Chromium leaves a partly visible chip where it is when it takes focus inside a
 // horizontal scroller; bring the whole chip into view.
 if(typeof document!=='undefined')document.addEventListener('focusin',event=>{const target=event.target;if(target instanceof Element&&target.parentElement?.matches('.trigger-scroll,.group-tabs,.source-toolbar>div'))target.scrollIntoView({block:'nearest',inline:'nearest'});});
 R.sidebar=()=>'<nav class="library-nav" aria-label="Browse components"><a href="#/library">All components <span>'+R.catalog.filter(d=>!R.archived.has(d.id)).length+'</span></a><a href="#/new">New this month <span>'+R.catalog.filter(d=>d.isNew).length+'</span></a><a href="#/picks">Staff picks <span>'+R.picks.filter(id=>R.byId.has(id)).length+'</span></a>'+Object.entries(R.groups).map(([group,categories])=>{const live=categories.map(category=>[category,R.catalog.filter(d=>d.category===category&&!R.archived.has(d.id)).length]).filter(([,count])=>count);return live.length?'<div class="nav-group"><p class="type-meta"><a href="#/library/'+R.slug(group)+'">'+R.escape(group)+'</a></p>'+live.map(([category,count])=>'<a href="#/library/'+R.slug(category)+'">'+R.escape(category)+'<span>'+count+'</span></a>').join('')+'</div>':'';}).join('')+'<div class="nav-group"><p class="type-meta"><a href="#/collections">Collections</a></p>'+R.collections.map(c=>'<a href="#/collections/'+c.slug+'">'+R.escape(c.title)+'<span>'+R.catalog.filter(d=>d.collections?.includes(c.slug)).length+'</span></a>').join('')+'</div></nav>';
 R.config=client=>{
  const entry={command:'npx',args:['-y','@tanziro/intrx@latest','mcp']};
  if(client==='Claude Code')return 'claude mcp add intrx -- npx -y @tanziro/intrx@latest mcp';
  if(client==='Codex')return '[mcp_servers.intrx]\ncommand = "npx"\nargs = ["-y", "@tanziro/intrx@latest", "mcp"]';
  return JSON.stringify(client==='VS Code'?{servers:{intrx:{type:'stdio',...entry}}}:{mcpServers:{intrx:entry}},null,2);
 };
 R.agentCard=()=>'<div class="config-card"><div class="config-tabs" role="tablist" aria-label="Agent client">'+['Claude Code','Cursor','Codex','VS Code'].map((client,i)=>'<button role="tab" aria-selected="'+(i===0)+'" data-client="'+client+'">'+client+'</button>').join('')+'</div><pre class="config-code">'+R.escape(R.config('Claude Code'))+'</pre><button class="icon-btn config-copy" aria-label="Copy agent configuration">'+R.icon('copy')+'</button><p class="config-note">Local setup is available now. npm installation follows package publication.</p><a href="#/docs/mcp-setup">Local setup instructions →</a></div>';
 R.bindConfig=container=>{R.bindTabs(container);container.querySelectorAll('.config-card').forEach(card=>{
  card.querySelectorAll('[data-client]').forEach(button=>button.addEventListener('click',()=>{card.querySelectorAll('[data-client]').forEach(b=>b.setAttribute('aria-selected',String(b===button)));card.querySelector('pre').textContent=R.config(button.dataset.client);}));
  card.querySelector('.config-copy').addEventListener('click',event=>R.copy(card.querySelector('pre').textContent,event.currentTarget));
 });};
 R.openOverlay=(content,{className='',label='Dialog'}={})=>{
  R.closeOverlay?.();const origin=document.activeElement,dialog=document.createElement('dialog');dialog.className='overlay '+className;dialog.setAttribute('aria-label',label);dialog.innerHTML=content;document.body.appendChild(dialog);
  R.liveTiles?.suspendAll();dialog.showModal();document.body.classList.add('overlay-open');
  const close=()=>{dialog.close();dialog.remove();document.body.classList.remove('overlay-open');R.liveTiles?.resumeAll();if(origin?.isConnected)origin.focus({preventScroll:true});if(R.closeOverlay===close)R.closeOverlay=null;};
  R.closeOverlay=close;dialog.addEventListener('cancel',event=>{event.preventDefault();close();});dialog.addEventListener('click',event=>{if(event.target===dialog){const b=dialog.getBoundingClientRect();if(event.clientX<b.left||event.clientX>b.right||event.clientY<b.top||event.clientY>b.bottom)close();}});dialog.querySelector('[data-close]')?.addEventListener('click',close);return dialog;
 };
 R.openAgent=()=>{const dialog=R.openOverlay('<div class="dialog-head"><h2>Connect your agent</h2><button class="icon-btn" data-close aria-label="Close">'+R.icon('close')+'</button></div><p>Bring an interaction into the project you are building.</p>'+R.agentCard(),{className:'agent-dialog',label:'Connect your agent'});R.bindConfig(dialog);};
 R.footer=()=>'<footer class="site-footer"><div><a class="brand" href="#/"><span class="brand-mark"></span>INTRX</a><p>An independent interaction library.<br>MIT. Copy, play, create.</p><p>Made by <a href="https://tanziro.com/" target="_blank" rel="noopener noreferrer">Tanzir Rahman ↗</a></p></div><nav aria-label="Footer"><div><strong>Library</strong><a href="#/library">All components</a><a href="#/picks">Staff picks</a><a href="#/new">Recently added</a></div><div><strong>Agents</strong><a href="#/agents">MCP server</a><a href="#/docs/cli">CLI</a><a href="#/docs/agent-skill">Agent skill</a></div><div><strong>Project</strong><a href="https://github.com/tanzir71/interaction">GitHub ↗</a><a href="#/docs/license-credits">Credits</a><a href="#/docs">Docs</a></div></nav></footer>';
})();

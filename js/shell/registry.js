/* Shared registry metadata; usable in the browser and dependency-free Node VMs. */
(function () {
  const R = window.INTRX = window.INTRX || { demos:[], register(demo) { this.demos.push(demo); } };
  const metadata = R.stageMeta = Object.create(null);
  R.meta = entries => {
    Object.entries(entries).forEach(([id,value]) => { metadata[id] = value; });
    R.demos.forEach(demo => R.applyMeta(demo));
  };
  R.applyMeta = demo => {
    const sidecar = metadata[demo.id]; if (!sidecar) return demo;
    // Inline fields take precedence. Keep their original values separately so
    // reapplying metadata never mistakes a previous default for an override.
    if (!demo._inlineMeta) {
      Object.defineProperty(demo,'_inlineMeta',{value:Object.fromEntries(Object.keys(sidecar).filter(key=>Object.hasOwn(demo,key)).map(key=>[key,demo[key]]))});
    }
    Object.assign(demo,sidecar,demo._inlineMeta);
    ['stage','a11y'].forEach(key => { demo[key] = Object.assign({},sidecar[key],demo._inlineMeta[key]); });
    return demo;
  };
  const register = R.register;
  R.register = function(demo) { R.applyMeta(demo); return register.call(R,demo); };
})();

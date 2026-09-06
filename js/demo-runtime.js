/* A small lifecycle boundary for independently authored previews. */
(function () {
  window.INTRX.createRuntime = function (stage) {
    let disposed = false, sequence = 0;
    const frames = new Map(), timers = new Set(), intervals = new Set();
    const visible = () => !document.hidden && stage._visible !== false;
    const runtime = {
      requestAnimationFrame(callback) {
        const id = ++sequence;
        const tick = time => {
          if (disposed || !stage.isConnected) return;
          if (!visible()) { frames.set(id, requestAnimationFrame(tick)); return; }
          frames.delete(id);
          callback(time);
        };
        frames.set(id, requestAnimationFrame(tick));
        return id;
      },
      cancelAnimationFrame(id) { cancelAnimationFrame(frames.get(id)); frames.delete(id); },
      setTimeout(callback, delay, ...args) {
        const id = setTimeout(() => { timers.delete(id); if (!disposed) callback(...args); }, delay);
        timers.add(id); return id;
      },
      clearTimeout(id) { clearTimeout(id); timers.delete(id); },
      setInterval(callback, delay, ...args) {
        const id = setInterval(() => { if (!disposed && visible()) callback(...args); }, delay);
        intervals.add(id); return id;
      },
      clearInterval(id) { clearInterval(id); intervals.delete(id); },
      dispose() {
        if (disposed) return;
        disposed = true;
        frames.forEach(id => cancelAnimationFrame(id));
        timers.forEach(id => clearTimeout(id));
        intervals.forEach(id => clearInterval(id));
        frames.clear(); timers.clear(); intervals.clear();
        if (typeof runtime.cleanup === 'function') runtime.cleanup();
      }
    };
    return runtime;
  };
})();

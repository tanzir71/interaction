/* Lifecycle and virtual clock for one independently authored demo. */
(function () {
  const R = window.INTRX;
  R.createRuntime = function (stage) {
    let disposed = false, suspended = false, inViewport = true, sequence = 0, speed = 1;
    let realTime = performance.now(), virtualTime = realTime;
    const frames = new Map(), timers = new Map(), cleanups = new Set(), animations = new Set();
    const paused = () => suspended || document.hidden || !inViewport;
    function clock() {
      const now = performance.now();
      if (!paused()) virtualTime += (now - realTime) * speed;
      realTime = now;
      return virtualTime;
    }
    function armFrame(id, frame) {
      if (disposed || paused() || frame.native != null) return;
      frame.native = requestAnimationFrame(() => {
        frame.native = null;
        if (disposed || paused() || !stage.isConnected) return;
        frames.delete(id);
        frame.callback(clock());
      });
    }
    function armTimer(id, timer) {
      if (disposed || paused() || timer.native != null) return;
      timer.started = performance.now();
      timer.native = setTimeout(() => {
        timer.native = null;
        if (disposed || paused() || !timers.has(id)) return;
        if (!timer.repeat) timers.delete(id);
        timer.remaining = timer.delay;
        timer.callback(...timer.args);
        if (timer.repeat && timers.has(id)) armTimer(id, timer);
      }, timer.remaining / speed);
    }
    function freeze() {
      frames.forEach(frame => { if (frame.native != null) cancelAnimationFrame(frame.native); frame.native = null; });
      timers.forEach(timer => {
        if (timer.native != null) {
          timer.remaining = Math.max(0, timer.remaining - (performance.now() - timer.started) * speed);
          clearTimeout(timer.native); timer.native = null;
        }
      });
      if (stage.getAnimations) stage.getAnimations({ subtree: true }).forEach(animation => {
        // CSS loops follow the stage's suspension rule. Calling play() on a
        // CSSAnimation overrides its author's animation-play-state, so a later
        // in-demo Pause would otherwise be ignored after a speed change.
        if (typeof window.CSSAnimation==='function' && animation instanceof window.CSSAnimation) return;
        if (animation.playState === 'running') { animations.add(animation); animation.pause(); }
      });
    }
    function thaw() {
      if (disposed || paused()) return;
      realTime = performance.now();
      frames.forEach((frame,id) => armFrame(id,frame));
      timers.forEach((timer,id) => armTimer(id,timer));
      animations.forEach(animation => { if (animation.playState === 'paused') animation.play(); });
      animations.clear();
    }
    function visibility() {
      // The event fires after document.hidden changes. Accrue the final
      // visible interval on hide; never add hidden wall time on show.
      if (document.hidden && !suspended && inViewport) virtualTime += (performance.now() - realTime) * speed;
      realTime = performance.now();
      stage.dataset.suspended = String(paused());
      if (document.hidden) freeze(); else thaw();
    }
    function viewport(entries) {
      if (disposed || !entries.length) return;
      const visible = entries[0].isIntersecting && entries[0].intersectionRatio > 0;
      if (visible === inViewport) return;
      clock(); freeze(); inViewport = visible;
      stage.dataset.suspended = String(paused());
      thaw();
    }
    function syncAnimationSpeed(event) {
      // New CSS motion already runs at 1x. Explicit setSpeed still synchronizes
      // existing animations when returning from a different playback rate.
      if (event && speed === 1) return;
      if (!disposed && stage.getAnimations) stage.getAnimations({subtree:true}).forEach(animation=>animation.updatePlaybackRate(speed));
    }
    function makeTimer(callback, delay, repeat, args) {
      const id = ++sequence;
      const ms = Math.max(repeat ? 1 : 0, Number(delay) || 0);
      const timer = { callback, delay: ms, remaining: ms, repeat, args, native: null };
      timers.set(id,timer); armTimer(id,timer); return id;
    }
    function clearTimer(id) {
      const timer = timers.get(id);
      if (timer) clearTimeout(timer.native);
      timers.delete(id);
    }
    const runtime = {
      get suspended() { return paused(); },
      get disposed() { return disposed; },
      get speed() { return speed; },
      requestAnimationFrame(callback) {
        if (disposed) return 0;
        const id = ++sequence, frame = { callback, native: null };
        frames.set(id,frame); armFrame(id,frame); return id;
      },
      cancelAnimationFrame(id) { const frame = frames.get(id); if (frame) cancelAnimationFrame(frame.native); frames.delete(id); },
      setTimeout(callback,delay,...args) { return disposed ? 0 : makeTimer(callback,delay,false,args); },
      clearTimeout: clearTimer,
      setInterval(callback,delay,...args) { return disposed ? 0 : makeTimer(callback,delay,true,args); },
      clearInterval: clearTimer,
      suspend() {
        if (disposed || suspended) return;
        clock(); freeze(); suspended = true;
        stage.dataset.suspended = 'true';
      },
      resume() {
        if (disposed || !suspended) return;
        suspended = false; realTime = performance.now();
        stage.dataset.suspended = String(paused()); thaw();
      },
      setSpeed(value) {
        if (![.5,1,2].includes(value)) throw new RangeError('Speed must be 0.5, 1, or 2');
        clock(); freeze(); speed = value;
        syncAnimationSpeed();
        thaw();
      },
      onDispose(callback) { cleanups.add(callback); return () => cleanups.delete(callback); },
      dispose() {
        if (disposed) return;
        clock(); freeze(); disposed = true;
        stage.dataset.suspended = 'true';
        document.removeEventListener('visibilitychange',visibility);
        frames.clear(); timers.clear(); animations.clear();
        const callbacks = [...cleanups]; cleanups.clear();
        if (typeof runtime.cleanup === 'function') callbacks.push(runtime.cleanup);
        callbacks.forEach(callback => { try { callback(); } catch(error) { console.error('[INTRX] cleanup failed',error); } });
      }
    };
    ['ResizeObserver','IntersectionObserver'].forEach(name => {
      if (typeof window[name] !== 'function') return;
      runtime[name] = function(...args) {
        const observer = new window[name](...args);
        cleanups.add(()=>observer.disconnect()); return observer;
      };
    });
    // Thumbnail visibility belongs to LiveTiles and its live-preview cap.
    // Full previews have a separate viewport hold, orthogonal to manual pause.
    if (stage.dataset.mode === 'full' && typeof window.IntersectionObserver === 'function') {
      const observer = new window.IntersectionObserver(viewport, { threshold: 0 });
      observer.observe(stage); cleanups.add(()=>observer.disconnect());
    }
    document.addEventListener('visibilitychange',visibility);
    stage.addEventListener?.('animationstart',syncAnimationSpeed);
    stage.addEventListener?.('transitionrun',syncAnimationSpeed);
    cleanups.add(()=>{stage.removeEventListener?.('animationstart',syncAnimationSpeed);stage.removeEventListener?.('transitionrun',syncAnimationSpeed);});
    return runtime;
  };
})();

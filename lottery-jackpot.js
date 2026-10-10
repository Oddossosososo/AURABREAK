(() => {
  "use strict";

  // One full-screen shader, one draw call, no per-frame object allocations.
  const vertexShader = `
    varying vec2 vUv;
    void main() {
      vUv = uv;
      gl_Position = vec4(position, 1.0);
    }
  `;

  const fragmentShader = `
    precision mediump float;
    uniform float uTime;
    uniform vec2 uResolution;
    varying vec2 vUv;

    float hash(vec2 p) {
      return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453);
    }
    float noise(vec2 p) {
      vec2 i = floor(p), f = fract(p);
      f = f * f * (3.0 - 2.0 * f);
      return mix(
        mix(hash(i), hash(i + vec2(1.0, 0.0)), f.x),
        mix(hash(i + vec2(0.0, 1.0)), hash(i + vec2(1.0, 1.0)), f.x),
        f.y
      );
    }
    float fbm(vec2 p) {
      float v = 0.0, a = 0.5;
      for (int i = 0; i < 4; i++) {
        v += noise(p) * a;
        p = mat2(1.62, -1.18, 1.18, 1.62) * p + vec2(2.7, 1.9);
        a *= 0.5;
      }
      return v;
    }
    mat2 rotate2d(float a) {
      float c = cos(a), s = sin(a);
      return mat2(c, -s, s, c);
    }

    void main() {
      vec2 p = (vUv - 0.5) * vec2(uResolution.x / max(uResolution.y, 1.0), 1.0);
      float t = uTime * 0.12;
      float r = length(p);
      float a = atan(p.y, p.x);
      vec2 warped = rotate2d(t * 0.12) * p;
      warped += 0.014 * vec2(sin(a * 7.0 - t * 2.0), cos(a * 5.0 + t)) / (r + 0.12);

      float cloud = fbm(warped * 5.0 + vec2(t, -t * 0.7));
      float cloud2 = fbm(warped * 10.5 - vec2(t * 0.6, t * 0.8));
      float corona = exp(-abs(r - 0.245) * 28.0);
      float eventHorizon = 1.0 - smoothstep(0.105, 0.17, r);
      float ringA = pow(max(0.0, 1.0 - abs(fract(r * 13.0 - t * 0.6) - 0.5) * 2.0), 16.0);
      float ringB = pow(max(0.0, 1.0 - abs(fract(r * 7.0 + t * 0.28) - 0.5) * 2.0), 10.0);
      float wheel = abs(fract((a + t * 0.35) * 15.2789) - 0.5);
      float spokes = pow(max(0.0, 1.0 - wheel * 16.0), 7.0) * (1.0 - smoothstep(0.12, 0.8, r));
      float rays = pow(max(0.0, cos(a * 19.0 - t * 0.55)), 30.0) * (1.0 - smoothstep(0.08, 0.72, r));
      float lens = exp(-abs(r - (0.33 + 0.015 * sin(a * 6.0 + t))) * 70.0);

      // Small drifting stars are calculated from a grid, not individual DOM objects.
      vec2 starCell = floor((vUv + vec2(t * 0.002, -t * 0.003)) * vec2(72.0, 46.0));
      vec2 starLocal = fract((vUv + vec2(t * 0.002, -t * 0.003)) * vec2(72.0, 46.0)) - 0.5;
      float starSeed = hash(starCell);
      float star = (1.0 - smoothstep(0.018, 0.055, length(starLocal))) * step(0.978, starSeed);
      star *= 0.45 + 0.55 * sin(uTime * (1.0 + starSeed * 2.0) + starSeed * 40.0);

      // A few luminous ticket silhouettes orbit the event horizon.
      vec2 ticketP = rotate2d(a * 0.0 + t * 0.2) * (p - vec2(cos(t * 0.5 + 1.7), sin(t * 0.5 + 1.7)) * 0.43);
      ticketP = rotate2d(-t * 0.45) * ticketP;
      vec2 ticketBox = abs(ticketP) - vec2(0.052, 0.026);
      float ticket = 1.0 - smoothstep(0.002, 0.009, max(ticketBox.x, ticketBox.y));
      float ticketNotch = smoothstep(0.012, 0.018, length(ticketP - vec2(0.052, 0.0)));
      ticket *= ticketNotch;

      vec3 black = vec3(0.006, 0.004, 0.012);
      vec3 gold = vec3(1.0, 0.61, 0.09);
      vec3 pale = vec3(1.0, 0.95, 0.70);
      vec3 amber = vec3(0.85, 0.20, 0.025);
      vec3 champagne = vec3(1.0, 0.79, 0.36);

      vec3 col = black;
      col += vec3(0.12, 0.045, 0.009) * (0.35 + cloud) * (1.0 - eventHorizon);
      col += amber * pow(max(0.0, cloud - 0.42), 2.0) * 1.5;
      col += gold * ringA * (0.18 + cloud2 * 0.48);
      col += champagne * ringB * 0.24;
      col += pale * corona * (0.24 + spokes * 0.9);
      col += gold * spokes * 0.9;
      col += champagne * lens * 0.48;
      col += gold * rays * 0.65;
      col += pale * star * 1.8;
      col += champagne * ticket * (0.65 + 0.35 * sin(t * 3.0));
      col += pale * exp(-r * 30.0) * 1.9;

      // A dark core keeps the gold corona bright without washing out the scene.
      col *= 1.0 - eventHorizon * 0.96;
      float vignette = 1.0 - smoothstep(0.35, 0.88, r);
      col *= vignette;
      col = pow(max(col, vec3(0.0)), vec3(0.86));
      float alpha = clamp(max(max(col.r, col.g), col.b) + 0.08, 0.0, 0.96);
      gl_FragColor = vec4(col, alpha);
    }
  `;

  function start(container) {
    if (!window.THREE) throw new Error("Three.js unavailable");
    if (!container || !container.isConnected) throw new Error("Jackpot art container is unavailable");

    container.querySelectorAll(".lottery-jackpot-canvas").forEach(node => node.remove());
    const THREE = window.THREE;
    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: false,
      depth: false,
      stencil: false,
      powerPreference: "low-power",
      preserveDrawingBuffer: false
    });
    renderer.domElement.className = "lottery-jackpot-canvas";
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 0.5));
    renderer.setClearColor(0x000000, 0);
    container.appendChild(renderer.domElement);

    const scene = new THREE.Scene();
    const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);
    const uniforms = {
      uTime: { value: 0 },
      uResolution: { value: new THREE.Vector2(1, 1) }
    };
    const geometry = new THREE.PlaneGeometry(2, 2);
    const material = new THREE.ShaderMaterial({
      vertexShader,
      fragmentShader,
      uniforms,
      transparent: true,
      depthTest: false,
      depthWrite: false
    });
    scene.add(new THREE.Mesh(geometry, material));

    let raf = 0;
    let disposed = false;
    let lastFrame = 0;
    let visible = true;
    const reducedMotion = !!(window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches);
    let resizeObserver = null;
    let intersectionObserver = null;

    function resize() {
      if (disposed) return;
      const width = Math.max(1, container.clientWidth);
      const height = Math.max(1, container.clientHeight);
      renderer.setSize(width, height, false);
      uniforms.uResolution.value.set(renderer.domElement.width, renderer.domElement.height);
      renderer.render(scene, camera);
    }

    function shouldAnimate() {
      return !disposed && !document.hidden && visible && container.isConnected;
    }
    function frame(ms) {
      raf = 0;
      if (!shouldAnimate()) return;
      if (ms - lastFrame >= 42) {
        lastFrame = ms;
        uniforms.uTime.value = ms * 0.001;
        renderer.render(scene, camera);
      }
      raf = requestAnimationFrame(frame);
    }
    function syncAnimation() {
      if (shouldAnimate()) {
        if (!raf) raf = requestAnimationFrame(frame);
      } else if (raf) {
        cancelAnimationFrame(raf);
        raf = 0;
      }
    }
    function onVisibilityChange() { syncAnimation(); }

    if (typeof ResizeObserver !== "undefined") {
      resizeObserver = new ResizeObserver(resize);
      resizeObserver.observe(container);
    } else {
      window.addEventListener("resize", resize, { passive: true });
    }
    if (typeof IntersectionObserver !== "undefined") {
      intersectionObserver = new IntersectionObserver(entries => {
        visible = !!entries[0] && entries[0].isIntersecting;
        syncAnimation();
      }, { threshold: 0 });
      intersectionObserver.observe(container);
    }
    document.addEventListener("visibilitychange", onVisibilityChange);
    resize();
    syncAnimation();

    return function stop() {
      if (disposed) return;
      disposed = true;
      if (raf) cancelAnimationFrame(raf);
      if (resizeObserver) resizeObserver.disconnect();
      if (intersectionObserver) intersectionObserver.disconnect();
      window.removeEventListener("resize", resize);
      document.removeEventListener("visibilitychange", onVisibilityChange);
      geometry.dispose();
      material.dispose();
      renderer.dispose();
      renderer.domElement.remove();
    };
  }

  window.AURABREAK_LOTTERY_JACKPOT = { start };
})();

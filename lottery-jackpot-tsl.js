// AURABREAK II exclusive TSL/WebGPU background. GLSL fallback remains in lottery-jackpot.js.
import * as THREE from "three/webgpu";
import { Fn, uv, time, vec2, vec3, vec4, float, sin, cos, length, smoothstep, abs, pow, max, exp, atan } from "three/tsl";

async function start(container) {
  if (!container || !container.isConnected) throw new Error("Jackpot art container unavailable");
  if (!("gpu" in navigator)) throw new Error("WebGPU not supported; using GLSL fallback");
  container.querySelectorAll(".lottery-jackpot-canvas").forEach(node => node.remove());

  const renderer = new THREE.WebGPURenderer({ alpha: true, antialias: false, powerPreference: "low-power" });
  renderer.domElement.className = "lottery-jackpot-canvas lottery-jackpot-tsl-canvas";
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 0.5));
  await renderer.init();
  if (!container.isConnected) { renderer.dispose(); throw new Error("Cutscene closed during WebGPU setup"); }
  container.appendChild(renderer.domElement);

  const scene = new THREE.Scene();
  const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);
  const zoom = float(1).add(sin(time.mul(0.28)).mul(0.075));
  const p = uv().sub(vec2(0.5, 0.5)).mul(zoom);
  const r = length(p);
  const a = atan(p.y, p.x);
  const t = time;
  const swirl = sin(a.mul(12).add(t.mul(0.7))).mul(0.5).add(0.5);
  const bands = pow(max(float(0), sin(r.mul(54).sub(t.mul(1.9))).mul(0.5).add(0.5)), float(9));
  const corona = exp(abs(r.sub(float(0.24))).mul(-38));
  const core = float(1).sub(smoothstep(float(0.055), float(0.17), r));
  const nebula = sin(p.x.mul(17).add(t.mul(0.22))).mul(cos(p.y.mul(21).sub(t.mul(0.31)))).mul(0.5).add(0.5);
  const rays = pow(max(float(0), cos(a.mul(22).add(t.mul(-0.2)))), float(18)).mul(float(1).sub(smoothstep(float(0.08), float(0.75), r)));

  let color = vec3(0.006, 0.003, 0.012);
  color = color.add(vec3(0.19, 0.055, 0.012).mul(nebula).mul(float(1).sub(core)));
  color = color.add(vec3(1.0, 0.34, 0.035).mul(bands).mul(float(0.2).add(swirl.mul(0.5))));
  color = color.add(vec3(1.0, 0.72, 0.24).mul(corona).mul(float(0.35).add(rays)));
  color = color.add(vec3(1.0, 0.88, 0.53).mul(rays).mul(0.8));
  color = color.add(vec3(1.0, 0.94, 0.7).mul(exp(r.mul(-22))).mul(0.8));
  color = color.mul(float(1).sub(core.mul(0.96)));
  const vignette = float(1).sub(smoothstep(float(0.3), float(0.85), r));
  color = color.mul(vignette);
  const material = new THREE.MeshBasicNodeMaterial();
  material.colorNode = Fn(() => vec4(color, float(0.96)))();
  material.transparent = true;
  material.depthWrite = false;
  const mesh = new THREE.Mesh(new THREE.PlaneGeometry(2, 2), material);
  scene.add(mesh);

  let raf = 0, disposed = false, lastFrame = 0, visible = true;
  let resizeObserver = null, intersectionObserver = null;
  // Keep the jackpot reveal moving; reduced-motion is handled by gentler CSS effects.
  function resize() {
    if (disposed) return;
    renderer.setSize(Math.max(1, container.clientWidth), Math.max(1, container.clientHeight), false);
    renderer.render(scene, camera);
  }
  function shouldAnimate() { return !disposed && !document.hidden && visible && container.isConnected; }
  function frame(ms) {
    raf = 0;
    if (!shouldAnimate()) return;
    if (ms - lastFrame >= 42) { lastFrame = ms; renderer.render(scene, camera); }
    raf = requestAnimationFrame(frame);
  }
  function sync() {
    if (shouldAnimate()) { if (!raf) raf = requestAnimationFrame(frame); }
    else if (raf) { cancelAnimationFrame(raf); raf = 0; }
  }
  const onVisibility = () => sync();
  if (typeof ResizeObserver !== "undefined") { resizeObserver = new ResizeObserver(resize); resizeObserver.observe(container); }
  else window.addEventListener("resize", resize, { passive: true });
  if (typeof IntersectionObserver !== "undefined") {
    intersectionObserver = new IntersectionObserver(entries => { visible = !!entries[0]?.isIntersecting; sync(); }, { threshold: 0 });
    intersectionObserver.observe(container);
  }
  document.addEventListener("visibilitychange", onVisibility);
  resize();
  sync();
  return function stop() {
    if (disposed) return;
    disposed = true;
    if (raf) cancelAnimationFrame(raf);
    resizeObserver?.disconnect();
    intersectionObserver?.disconnect();
    window.removeEventListener("resize", resize);
    document.removeEventListener("visibilitychange", onVisibility);
    mesh.geometry.dispose();
    material.dispose();
    renderer.dispose();
    renderer.domElement.remove();
  };
}
window.AURABREAK_LOTTERY_JACKPOT_TSL = { start };

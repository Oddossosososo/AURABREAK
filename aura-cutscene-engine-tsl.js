import * as THREE from "three/webgpu";
import { Fn, uv, vec2, vec3, vec4, float, sin, cos, length, smoothstep, abs, pow, max, exp, atan, time } from "three/tsl";
function parseColor(value){const m=String(value||"#9c78ff").match(/^#([\da-f]{3}|[\da-f]{6})$/i);if(!m)return [0.61,0.47,1];let h=m[1];if(h.length===3)h=h.split("").map(c=>c+c).join("");return [parseInt(h.slice(0,2),16)/255,parseInt(h.slice(2,4),16)/255,parseInt(h.slice(4,6),16)/255]}
async function start(container,name,color){
if(!container||!container.isConnected)throw Error("Cutscene art container unavailable");
if(!("gpu" in navigator))throw Error("WebGPU unsupported");
container.querySelectorAll(".aurabreak-scene-canvas").forEach(n=>n.remove());
const renderer=new THREE.WebGPURenderer({alpha:true,antialias:false,powerPreference:"low-power"});
renderer.domElement.className="aurabreak-scene-canvas aurabreak-scene-tsl";renderer.setPixelRatio(Math.min(window.devicePixelRatio||1,.55));await renderer.init();
if(!container.isConnected){renderer.dispose();throw Error("Cutscene closed during shader setup")}
container.appendChild(renderer.domElement);
const rgb=parseColor(color),key=2097883034;
const auraHash=(()=>{let h=2166136261;for(const ch of String(name)){h^=ch.charCodeAt(0);h=Math.imul(h,16777619)}return h>>>0})();
const gold=/JACKPOT|LOTTERY|WINNER/.test(name),ice=/DEITY|UNFATHOMABLE|VIEWER|FROST|ICE|ZERO/.test(name);
const mode=(auraHash%7),spokes=11+(auraHash%17),ringCount=64+(auraHash%38),waveRate=0.45+(auraHash%11)*0.07;
const primary=vec3(rgb[0],rgb[1],rgb[2]),accent=gold?vec3(1,.72,.28):ice?vec3(.56,.86,1):vec3(.38+(auraHash%5)*.1,.48+(auraHash%4)*.1,.8);
const scene=new THREE.Scene(),camera=new THREE.OrthographicCamera(-1,1,1,-1,0,1),p=uv().sub(vec2(.5,.5)),r=length(p),a=atan(p.y,p.x),t=time;
const pulse=sin(t.mul(gold?2.2:2.4+mode*.23)).mul(.14).add(.86);
const wave=sin(a.mul(gold?5:7+mode*2).sub(t.mul(waveRate))).mul(gold ? 0.025 : 0.022+mode*.002);
const ring1=exp(abs(r.sub(float(gold ? 0.24 : 0.18+(mode%4)*.018).add(wave))).mul(-52-mode*2));
const ring2=pow(max(float(0),sin(r.mul(gold ? 76 : ringCount).sub(t.mul(gold ? 1.7 : 1.1+mode*.29))).mul(.5).add(.5)),float(gold ? 10 : 9+mode));
const rays=pow(max(float(0),cos(a.mul(gold ? 17 : spokes).add(t.mul(gold ? -0.16 : (mode%2 ? -0.28 : 0.34))))),float(16+mode*2)).mul(float(1).sub(smoothstep(float(.08),float(.72),r)));
const core=float(1).sub(smoothstep(float(.025),float(.13),r)),corona=exp(abs(r.sub(float(gold ? 0.36 : 0.27+(mode%5)*.025))).mul(-64));
let colorNode=vec3(.003,.003,.012).add(primary.mul(ring1).mul(.75)).add(accent.mul(ring2).mul(.8)).add(vec3(.93,.96,1).mul(corona).mul(.65)).add(accent.mul(rays).mul(.7));
colorNode=colorNode.add(vec3(.95,.9,1).mul(exp(r.mul(-25))).mul(.4)).mul(float(1).sub(core.mul(.92))).mul(pulse).mul(float(1).sub(smoothstep(float(.4),float(.9),r)));
const material=new THREE.MeshBasicNodeMaterial();material.colorNode=Fn(()=>vec4(colorNode,float(.58)))();material.transparent=true;material.depthWrite=false;
const geometry=new THREE.PlaneGeometry(2,2);scene.add(new THREE.Mesh(geometry,material));
let raf=0,disposed=false,last=0,visible=true,ro=null,io=null;
function resize(){if(disposed)return;renderer.setSize(Math.max(1,container.clientWidth),Math.max(1,container.clientHeight),false);renderer.render(scene,camera)}
function active(){return !disposed&&!document.hidden&&visible&&container.isConnected}
function frame(ms){raf=0;if(!active())return;if(ms-last>=40){last=ms;renderer.render(scene,camera)}raf=requestAnimationFrame(frame)}
function sync(){if(active()){if(!raf)raf=requestAnimationFrame(frame)}else if(raf){cancelAnimationFrame(raf);raf=0}}
const onVisibility=()=>sync();if(typeof ResizeObserver!=="undefined"){ro=new ResizeObserver(resize);ro.observe(container)}else window.addEventListener("resize",resize,{passive:true});
if(typeof IntersectionObserver!=="undefined"){io=new IntersectionObserver(entries=>{visible=!!entries[0]?.isIntersecting;sync()},{threshold:0});io.observe(container)}
document.addEventListener("visibilitychange",onVisibility);resize();sync();
return()=>{if(disposed)return;disposed=true;if(raf)cancelAnimationFrame(raf);ro?.disconnect();io?.disconnect();window.removeEventListener("resize",resize);document.removeEventListener("visibilitychange",onVisibility);geometry.dispose();material.dispose();renderer.dispose();renderer.domElement.remove()};
}
window.AURABREAK_SCENE_ENGINE={start};
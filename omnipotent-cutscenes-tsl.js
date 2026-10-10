// TSL/WebGPU shaders for LOTTERY: WINNER and PURE DEITY: UNFATHOMABLE.
import * as THREE from "https://cdn.jsdelivr.net/npm/three@0.180.0/build/three.webgpu.js";
import { Fn, uv, time, vec2, vec3, vec4, float, sin, cos, length, smoothstep, abs, pow, max, exp, atan } from "https://cdn.jsdelivr.net/npm/three@0.180.0/build/three.tsl.js";
async function start(container,kind){
if(!container||!container.isConnected)throw Error("Omnipotent art container unavailable");
if(!("gpu" in navigator))throw Error("WebGPU unsupported");
container.querySelectorAll(".omnipotent-shader-canvas").forEach(n=>n.remove());
const renderer=new THREE.WebGPURenderer({alpha:true,antialias:false,powerPreference:"low-power"});
renderer.domElement.className="lottery-jackpot-canvas omnipotent-shader-canvas omnipotent-tsl-canvas";
renderer.setPixelRatio(Math.min(window.devicePixelRatio||1,.65));await renderer.init();
if(!container.isConnected){renderer.dispose();throw Error("Cutscene closed during TSL setup")}
container.appendChild(renderer.domElement);
const winner=kind==="lottery-winner",scene=new THREE.Scene(),camera=new THREE.OrthographicCamera(-1,1,1,-1,0,1);
const p=uv().sub(vec2(.5,.5)),r=length(p),a=atan(p.y,p.x),t=time;
const pulse=sin(t.mul(winner?2.3:3.6)).mul(.14).add(.86);
const wave=sin(a.mul(winner?5:13).sub(t.mul(.7))).mul(winner?.025:.035);
const ringA=exp(abs(r.sub(float(winner?.25:.19).add(wave))).mul(-55));
const ringB=pow(max(float(0),sin(r.mul(winner?76:91).sub(t.mul(winner?1.7:2.8))).mul(.5).add(.5)),float(winner?10:15));
const rays=pow(max(float(0),cos(a.mul(winner?17:23).add(t.mul(winner?-.16:.42)))),float(22)).mul(float(1).sub(smoothstep(float(.08),float(.72),r)));
const core=float(1).sub(smoothstep(float(.045),float(.16),r));
const corona=exp(abs(r.sub(float(winner?.36:.31))).mul(-72));
let color;
if(winner) color=vec3(.012,.003,.025).add(vec3(.62,.20,1).mul(ringB).mul(.85)).add(vec3(1,.69,.25).mul(ringA).mul(.9)).add(vec3(1,.91,.70).mul(corona).mul(.65)).add(vec3(.8,.45,1).mul(rays).mul(.8));
else color=vec3(.002,.003,.014).add(vec3(.43,.78,1).mul(ringB).mul(.8)).add(vec3(.60,.37,1).mul(ringA)).add(vec3(.94,.97,1).mul(corona).mul(.9)).add(vec3(.80,.91,1).mul(rays).mul(.95));
color=color.add(vec3(.95,.90,1).mul(exp(r.mul(-25))).mul(.55)).mul(float(1).sub(core.mul(.92))).mul(pulse).mul(float(1).sub(smoothstep(float(.4),float(.9),r)));
const material=new THREE.MeshBasicNodeMaterial();material.colorNode=Fn(()=>vec4(color,float(.97)))();material.transparent=true;material.depthWrite=false;
const geometry=new THREE.PlaneGeometry(2,2),mesh=new THREE.Mesh(geometry,material);scene.add(mesh);
let raf=0,disposed=false,last=0,visible=true,ro=null,io=null;
function resize(){if(disposed)return;renderer.setSize(Math.max(1,container.clientWidth),Math.max(1,container.clientHeight),false);renderer.render(scene,camera)}
function active(){return !disposed&&!document.hidden&&visible&&container.isConnected}
function frame(ms){raf=0;if(!active())return;if(ms-last>=42){last=ms;renderer.render(scene,camera)}raf=requestAnimationFrame(frame)}
function sync(){if(active()){if(!raf)raf=requestAnimationFrame(frame)}else if(raf){cancelAnimationFrame(raf);raf=0}}
const onVisibility=()=>sync();if(typeof ResizeObserver!=="undefined"){ro=new ResizeObserver(resize);ro.observe(container)}else window.addEventListener("resize",resize,{passive:true});
if(typeof IntersectionObserver!=="undefined"){io=new IntersectionObserver(entries=>{visible=!!entries[0]?.isIntersecting;sync()},{threshold:0});io.observe(container)}
document.addEventListener("visibilitychange",onVisibility);resize();sync();
return()=>{if(disposed)return;disposed=true;if(raf)cancelAnimationFrame(raf);ro?.disconnect();io?.disconnect();window.removeEventListener("resize",resize);document.removeEventListener("visibilitychange",onVisibility);geometry.dispose();material.dispose();renderer.dispose();renderer.domElement.remove()};
}
window.AURABREAK_OMNIPOTENT_TSL={start};

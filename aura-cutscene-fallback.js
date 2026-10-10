(() => {
"use strict";
const vertexShader = "varying vec2 vUv; void main(){vUv=uv;gl_Position=vec4(position,1.0);}";
const fragmentShader = [
"precision mediump float;",
"varying vec2 vUv; uniform float uTime; uniform vec2 uResolution; uniform vec3 uColor; uniform float uMode;",
"void main(){",
"vec2 p=(vUv-.5)*vec2(uResolution.x/max(uResolution.y,1.0),1.0); float r=length(p), a=atan(p.y,p.x), t=uTime;",
"float pulse=.72+.28*sin(t*(2.2+uMode*.23));",
"float ringA=exp(-abs(r-(.22+.025*sin(a*(5.0+uMode)+t*.7)))*62.0);",
"float ringB=exp(-abs(r-(.35+.018*cos(a*(8.0+uMode)+t*.45)))*76.0);",
"float ringC=exp(-abs(fract(r*(12.0+uMode*.2)-t*.12)-.5)*48.0);",
"float rays=pow(max(0.0,cos(a*(13.0+uMode*1.7)+t*.3)),24.0)*(1.0-smoothstep(.08,.72,r));",
"float core=1.0-smoothstep(.025,.13,r); float orbit=exp(-abs(r-(.15+.035*sin(a*11.0-t*1.1)))*88.0);",
"vec3 col=uColor*(ringA*.8+ringB*.55+ringC*.45+rays*.65+orbit*.75);",
"col+=vec3(.78,.88,1.0)*exp(-r*17.0)*.55; col*=1.0-core*.92; col*=1.0-smoothstep(.42,.92,r); col*=pulse;",
"float alpha=clamp(max(max(col.r,col.g),col.b)*.65,0.0,.62); gl_FragColor=vec4(col,alpha);",
"}"
].join("\n");
function parseColor(value){const m=String(value||"#9c78ff").match(/^#([\da-f]{3}|[\da-f]{6})$/i);if(!m)return [0.61,0.47,1];let h=m[1];if(h.length===3)h=h.split("").map(c=>c+c).join("");return [parseInt(h.slice(0,2),16)/255,parseInt(h.slice(2,4),16)/255,parseInt(h.slice(4,6),16)/255]}
function start(container,name,color){
if(!window.THREE||!container||!container.isConnected)throw Error("Shared Three.js runtime unavailable");
container.querySelectorAll(".aurabreak-scene-canvas").forEach(n=>n.remove());
const THREE=window.THREE,renderer=new THREE.WebGLRenderer({alpha:true,antialias:false,depth:false,stencil:false,powerPreference:"low-power"});
renderer.domElement.className="aurabreak-scene-canvas";renderer.setPixelRatio(Math.min(window.devicePixelRatio||1,.55));renderer.setClearColor(0,0);container.appendChild(renderer.domElement);
const rgb=parseColor(color),mode=/JACKPOT|LOTTERY|WINNER/.test(name)?0:/DEITY|UNFATHOMABLE/.test(name)?1:/NULL|ABSOLUTE|FALLEN/.test(name)?2:/VIEWER|ENDING/.test(name)?3:/SHATTER|DEVELOPER/.test(name)?4:5;
const scene=new THREE.Scene(),camera=new THREE.OrthographicCamera(-1,1,1,-1,0,1),uniforms={uTime:{value:0},uResolution:{value:new THREE.Vector2(1,1)},uColor:{value:new THREE.Vector3(...rgb)},uMode:{value:mode}};
const geometry=new THREE.PlaneGeometry(2,2),material=new THREE.ShaderMaterial({vertexShader,fragmentShader,uniforms,transparent:true,depthTest:false,depthWrite:false});scene.add(new THREE.Mesh(geometry,material));
let raf=0,disposed=false,last=0,visible=true,ro=null,io=null;
function resize(){if(disposed)return;renderer.setSize(Math.max(1,container.clientWidth),Math.max(1,container.clientHeight),false);uniforms.uResolution.value.set(renderer.domElement.width,renderer.domElement.height);renderer.render(scene,camera)}
function active(){return !disposed&&!document.hidden&&visible&&container.isConnected}
function frame(ms){raf=0;if(!active())return;if(ms-last>=40){last=ms;uniforms.uTime.value=ms*.001;renderer.render(scene,camera)}raf=requestAnimationFrame(frame)}
function sync(){if(active()){if(!raf)raf=requestAnimationFrame(frame)}else if(raf){cancelAnimationFrame(raf);raf=0}}
const onVisibility=()=>sync();if(typeof ResizeObserver!=="undefined"){ro=new ResizeObserver(resize);ro.observe(container)}else window.addEventListener("resize",resize,{passive:true});
if(typeof IntersectionObserver!=="undefined"){io=new IntersectionObserver(entries=>{visible=!!entries[0]?.isIntersecting;sync()},{threshold:0});io.observe(container)}
document.addEventListener("visibilitychange",onVisibility);resize();sync();
return()=>{if(disposed)return;disposed=true;if(raf)cancelAnimationFrame(raf);ro?.disconnect();io?.disconnect();window.removeEventListener("resize",resize);document.removeEventListener("visibilitychange",onVisibility);geometry.dispose();material.dispose();renderer.dispose();renderer.domElement.remove()};
}
window.AURABREAK_SCENE_FALLBACK={start};
})();
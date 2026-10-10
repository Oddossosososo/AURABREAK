(() => {
"use strict";
const vertexShader=`varying vec2 vUv; void main(){vUv=uv;gl_Position=vec4(position,1.0);}`;
const fragmentShader=`
precision mediump float; varying vec2 vUv; uniform float uTime; uniform vec2 uResolution; uniform float uKind;
float hash(vec2 p){return fract(sin(dot(p,vec2(127.1,311.7)))*43758.5453);}
void main(){
vec2 p=(vUv-.5)*vec2(uResolution.x/max(uResolution.y,1.0),1.0);float r=length(p),a=atan(p.y,p.x),t=uTime;
float spin=a+t*(uKind<.5?.16:.42),ring1=exp(-abs(fract(r*12.0-t*.14)-.5)*48.0);
float ring2=exp(-abs(r-(.25+.025*sin(a*5.0-t*.7)))*45.0),ring3=exp(-abs(r-(.38+.018*cos(a*9.0+t*.45)))*65.0);
float core=1.0-smoothstep(.045,.16,r),rays=pow(max(0.0,cos(spin*(uKind<.5?17.0:23.0))),22.0)*(1.0-smoothstep(.08,.72,r));
float pulse=.72+.28*sin(t*(uKind<.5?2.3:3.6));vec3 col=vec3(.004,.003,.012);
if(uKind<.5){vec3 violet=vec3(.55,.19,1.0),gold=vec3(1.0,.72,.30),pale=vec3(1.0,.91,.75);
col+=violet*ring1*.75+gold*ring2*.85+pale*ring3*.5+gold*rays*.7;
float ticket=step(.965,hash(floor((vUv+vec2(t*.008,-t*.012))*vec2(26.0,18.0))));col+=gold*ticket*(.3+.7*pulse);
}else{vec3 ice=vec3(.52,.9,1.0),violet=vec3(.55,.38,1.0),white=vec3(.95,.96,1.0);
col+=ice*ring1*.65+violet*ring2*.9+white*ring3*.55+white*rays*.95+violet*(1.0-smoothstep(.1,.62,r))*.32;
col+=ice*exp(-abs(r-(.19+.035*sin(a*13.0-t)))*90.0)*.8;}
col*=1.0-core*.94;col*=1.0-smoothstep(.42,.9,r);col*=pulse;col=pow(max(col,vec3(0.0)),vec3(.86));
float alpha=clamp(max(max(col.r,col.g),col.b)+.06,0.0,.98);gl_FragColor=vec4(col,alpha);}
`;
function start(container,kind){
if(!window.THREE||!container||!container.isConnected)throw Error("Omnipotent shader unavailable");
container.querySelectorAll(".omnipotent-shader-canvas").forEach(n=>n.remove());
const T=window.THREE,renderer=new T.WebGLRenderer({alpha:true,antialias:false,depth:false,stencil:false,powerPreference:"low-power"});
renderer.domElement.className="lottery-jackpot-canvas omnipotent-shader-canvas";renderer.setPixelRatio(Math.min(window.devicePixelRatio||1,.65));renderer.setClearColor(0,0);container.appendChild(renderer.domElement);
const scene=new T.Scene(),camera=new T.OrthographicCamera(-1,1,1,-1,0,1),uniforms={uTime:{value:0},uResolution:{value:new T.Vector2(1,1)},uKind:{value:kind==="lottery-winner"?0:1}},geometry=new T.PlaneGeometry(2,2),material=new T.ShaderMaterial({vertexShader,fragmentShader,uniforms,transparent:true,depthTest:false,depthWrite:false});
scene.add(new T.Mesh(geometry,material));let raf=0,disposed=false,last=0,visible=true,ro=null,io=null;
function resize(){if(disposed)return;renderer.setSize(Math.max(1,container.clientWidth),Math.max(1,container.clientHeight),false);uniforms.uResolution.value.set(renderer.domElement.width,renderer.domElement.height);renderer.render(scene,camera)}
function active(){return !disposed&&!document.hidden&&visible&&container.isConnected}
function frame(ms){raf=0;if(!active())return;if(ms-last>=42){last=ms;uniforms.uTime.value=ms*.001;renderer.render(scene,camera)}raf=requestAnimationFrame(frame)}
function sync(){if(active()){if(!raf)raf=requestAnimationFrame(frame)}else if(raf){cancelAnimationFrame(raf);raf=0}}
const visibility=()=>sync();if(typeof ResizeObserver!=="undefined"){ro=new ResizeObserver(resize);ro.observe(container)}else window.addEventListener("resize",resize,{passive:true});
if(typeof IntersectionObserver!=="undefined"){io=new IntersectionObserver(entries=>{visible=!!entries[0]?.isIntersecting;sync()},{threshold:0});io.observe(container)}
document.addEventListener("visibilitychange",visibility);resize();sync();
return()=>{if(disposed)return;disposed=true;if(raf)cancelAnimationFrame(raf);ro?.disconnect();io?.disconnect();window.removeEventListener("resize",resize);document.removeEventListener("visibilitychange",visibility);geometry.dispose();material.dispose();renderer.dispose();renderer.domElement.remove()};
}
window.AURABREAK_OMNIPOTENT={start};
})();
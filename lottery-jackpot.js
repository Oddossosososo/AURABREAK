(() => {
  "use strict";
  const vertexShader = `
    varying vec2 vUv;
    void main(){ vUv=uv; gl_Position=vec4(position,1.0); }
  `;
  const fragmentShader = `
    precision mediump float;
    uniform float uTime;
    uniform vec2 uResolution;
    varying vec2 vUv;
    float hash(vec2 p){ return fract(sin(dot(p,vec2(127.1,311.7)))*43758.5453); }
    float noise(vec2 p){
      vec2 i=floor(p), f=fract(p); f=f*f*(3.0-2.0*f);
      return mix(mix(hash(i),hash(i+vec2(1.,0.)),f.x),
                 mix(hash(i+vec2(0.,1.)),hash(i+vec2(1.,1.)),f.x),f.y);
    }
    void main(){
      vec2 p=(vUv-.5)*vec2(uResolution.x/uResolution.y,1.0);
      float t=uTime*.16, r=length(p), a=atan(p.y,p.x);
      float spin=a+0.12*sin(t*1.7+r*8.0);
      float wheel=abs(fract((spin+t*.11)*3.8197)-.5);
      float spokes=pow(max(0.0,1.0-wheel*13.0),5.0);
      float ring=pow(max(0.0,1.0-abs(fract(r*10.0-t*.24)-.5)*2.0),12.0);
      float halo=exp(-abs(r-.24)*17.0);
      float center=exp(-r*10.0);
      float field=noise(p*5.0+vec2(t,-t*.6))*0.65+noise(p*11.0-vec2(t*.7,t))*.35;
      float glitter=pow(max(0.0,field-.70),5.0)*4.0;
      float tickets=pow(max(0.0, sin(a*23.0+t*1.8)*.5+.5),18.0)*smoothstep(.72,.18,r);
      vec3 gold=vec3(1.0,.68,.12), pale=vec3(1.0,.95,.68), amber=vec3(.9,.24,.025);
      vec3 col=vec3(.008,.006,.018);
      col+=gold*spokes*.75;
      col+=gold*ring*(.18+field*.45);
      col+=pale*halo*(.45+spokes*.65);
      col+=amber*tickets*.7;
      col+=gold*glitter;
      col+=pale*center*1.6;
      float rays=pow(max(0.0,cos(a*9.0+t*.7)),24.0)*smoothstep(.58,.04,r);
      col+=gold*rays*.55;
      float vignette=1.0-smoothstep(.35,.92,r);
      col*=vignette;
      col=pow(max(col,vec3(0.0)),vec3(.88));
      gl_FragColor=vec4(col,clamp(max(max(col.r,col.g),col.b)+.10,0.0,1.0));
    }
  `;
  function start(container){
    if(!window.THREE) throw new Error("Three.js unavailable");
    container.querySelectorAll(".lottery-jackpot-canvas").forEach(n=>n.remove());
    const THREE=window.THREE;
    const renderer=new THREE.WebGLRenderer({alpha:true,antialias:false,powerPreference:"low-power"});
    renderer.domElement.className="lottery-jackpot-canvas";
    renderer.setPixelRatio(Math.min(window.devicePixelRatio||1,.7));
    renderer.setClearColor(0x000000,0);
    container.appendChild(renderer.domElement);
    const scene=new THREE.Scene();
    const camera=new THREE.OrthographicCamera(-1,1,1,-1,0,1);
    const uniforms={uTime:{value:0},uResolution:{value:new THREE.Vector2(1,1)}};
    const material=new THREE.ShaderMaterial({vertexShader,fragmentShader,uniforms,transparent:true,depthWrite:false});
    const plane=new THREE.Mesh(new THREE.PlaneGeometry(2,2),material);
    scene.add(plane);
    let raf=0, disposed=false, last=0, resizeObserver=null;
    function resize(){
      const w=Math.max(1,container.clientWidth), h=Math.max(1,container.clientHeight);
      renderer.setSize(w,h,false);
      uniforms.uResolution.value.set(renderer.domElement.width,renderer.domElement.height);
    }
    if(typeof ResizeObserver!=="undefined"){resizeObserver=new ResizeObserver(resize);resizeObserver.observe(container);}
    else window.addEventListener("resize",resize);
    resize();
    function frame(ms){
      if(disposed)return;
      raf=requestAnimationFrame(frame);
      if(document.hidden || !container.isConnected || container.getBoundingClientRect().width===0)return;
      if(ms-last<40)return; last=ms;
      uniforms.uTime.value=ms*.001;
      renderer.render(scene,camera);
    }
    raf=requestAnimationFrame(frame);
    return function stop(){
      if(disposed)return; disposed=true; cancelAnimationFrame(raf);
      if(resizeObserver)resizeObserver.disconnect();else window.removeEventListener("resize",resize);
      plane.geometry.dispose();material.dispose();renderer.dispose();renderer.domElement.remove();
    };
  }
  window.AURABREAK_LOTTERY_JACKPOT={start};
})();
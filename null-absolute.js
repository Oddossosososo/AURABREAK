(() => {
  "use strict";
  const vertexShader = `
    varying vec2 vUv;
    void main(){ vUv=uv; gl_Position=vec4(position,1.0); }
  `;
  const fragmentShader = `
    precision highp float;
    uniform float uTime;
    uniform vec2 uResolution;
    varying vec2 vUv;
    float hash(vec2 p){return fract(sin(dot(p,vec2(127.1,311.7)))*43758.5453123);}
    float noise(vec2 p){
      vec2 i=floor(p), f=fract(p); f=f*f*(3.0-2.0*f);
      return mix(mix(hash(i),hash(i+vec2(1.,0.)),f.x),mix(hash(i+vec2(0.,1.)),hash(i+vec2(1.,1.)),f.x),f.y);
    }
    float fbm(vec2 p){float v=0.,a=.5; for(int i=0;i<5;i++){v+=a*noise(p);p=mat2(1.6,-1.2,1.2,1.6)*p+vec2(3.1,1.7);a*=.5;}return v;}
    void main(){
      vec2 uv=(gl_FragCoord.xy-.5*uResolution)/uResolution.y;
      float t=uTime*.16;
      float r=length(uv);
      float a=atan(uv.y,uv.x);
      float lens=0.018/(abs(r-.19)+.018);
      vec2 warped=uv*(1.0+0.035*sin(a*7.0-t*2.0)/(r+.12));
      warped+=vec2(cos(a*3.0+t),sin(a*4.0-t))*0.025/(r+.12);
      vec2 p=warped*3.4;
      float f=fbm(p+vec2(t,-t*.7));
      float f2=fbm(p*1.8+vec2(-t*1.4,t));
      float fil=pow(max(0.,1.0-abs(f-f2)*2.8),5.0);
      float rings=pow(max(0.,1.0-abs(fract(r*17.0-t*.65)-.5)*2.0),12.0);
      float core=exp(-r*24.0);
      float horizon=smoothstep(.28,.17,r);
      vec3 col=vec3(.012,.002,.025);
      col+=vec3(.52,.015,.18)*fil*(.35+f);
      col+=vec3(.9,.02,.3)*rings*(.2+f2)*smoothstep(.42,.12,r);
      col+=vec3(.03,.65,.95)*pow(max(0.,fil-.62),2.0)*.7;
      col+=vec3(1.0,.08,.48)*lens*.018;
      col*=1.0-horizon*.94;
      col+=vec3(1.0,.8,.95)*core*1.7;
      float crack=noise(vec2(a*8.0,r*31.0+f*4.0));
      col+=vec3(1.,.04,.34)*pow(max(0.,crack-.74),8.0)*smoothstep(.5,.08,r)*1.8;
      float grain=(hash(gl_FragCoord.xy+uTime)-.5)*.035;
      col+=grain;
      float vignette=1.0-smoothstep(.28,.82,r);
      col*=vignette;
      col=pow(max(col,vec3(0.)),vec3(.82));
      gl_FragColor=vec4(col,clamp(max(max(col.r,col.g),col.b)+.12,0.0,1.0));
    }
  `;
  function start(container){
    if(!window.THREE) throw new Error("Three.js unavailable");
    container.querySelectorAll(".null-absolute-canvas").forEach(n=>n.remove());
    const THREE=window.THREE;
    const renderer=new THREE.WebGLRenderer({alpha:true,antialias:true,powerPreference:"high-performance"});
    renderer.domElement.className="null-absolute-canvas";
    renderer.setPixelRatio(Math.min(window.devicePixelRatio||1,1.5));
    renderer.setClearColor(0x000000,0);
    container.appendChild(renderer.domElement);
    const scene=new THREE.Scene();
    const camera=new THREE.PerspectiveCamera(55,1,.1,100);
    camera.position.z=12;
    const uniforms={uTime:{value:0},uResolution:{value:new THREE.Vector2(1,1)}};
    const plane=new THREE.Mesh(new THREE.PlaneGeometry(20,20),new THREE.ShaderMaterial({vertexShader,fragmentShader,uniforms,transparent:true,depthWrite:false}));
    plane.position.z=-2;
    scene.add(plane);
    const count=260, positions=new Float32Array(count*3), colors=new Float32Array(count*3);
    for(let i=0;i<count;i++){
      const radius=1.4+Math.random()*9, angle=Math.random()*Math.PI*2;
      positions[i*3]=Math.cos(angle)*radius;
      positions[i*3+1]=Math.sin(angle)*radius;
      positions[i*3+2]=(Math.random()-.5)*8;
      const hot=Math.random();
      colors[i*3]=1; colors[i*3+1]=hot*.25; colors[i*3+2]=.35+hot*.65;
    }
    const geo=new THREE.BufferGeometry();
    geo.setAttribute("position",new THREE.BufferAttribute(positions,3));
    geo.setAttribute("color",new THREE.BufferAttribute(colors,3));
    const particles=new THREE.Points(geo,new THREE.PointsMaterial({size:.045,vertexColors:true,transparent:true,opacity:.9,depthWrite:false,blending:THREE.AdditiveBlending}));
    scene.add(particles);
    const shards=new THREE.Group(); scene.add(shards);
    for(let i=0;i<42;i++){
      const g=new THREE.TetrahedronGeometry(.12+Math.random()*.24,0);
      const m=new THREE.MeshBasicMaterial({color:i%5===0?0x9bdbff:0xff1b78,wireframe:i%3===0,transparent:true,opacity:.45+Math.random()*.45});
      const mesh=new THREE.Mesh(g,m);
      const angle=Math.random()*Math.PI*2, radius=2+Math.random()*7;
      mesh.position.set(Math.cos(angle)*radius,Math.sin(angle)*radius,(Math.random()-.5)*6);
      mesh.rotation.set(Math.random()*6,Math.random()*6,Math.random()*6);
      mesh.userData={speed:.2+Math.random()*.8,phase:Math.random()*6.28,baseX:mesh.position.x,baseY:mesh.position.y};
      shards.add(mesh);
    }
    let raf=0,disposed=false,last=0;
    function resize(){
      const w=Math.max(1,container.clientWidth),h=Math.max(1,container.clientHeight);
      renderer.setSize(w,h,false);camera.aspect=w/h;camera.updateProjectionMatrix();
      uniforms.uResolution.value.set(renderer.domElement.width,renderer.domElement.height);
    }
    const ro=typeof ResizeObserver!=="undefined"?new ResizeObserver(resize):null;
    if(ro)ro.observe(container);else window.addEventListener("resize",resize);
    resize();
    function frame(ms){
      if(disposed)return;
      raf=requestAnimationFrame(frame);
      if(ms-last<30)return; last=ms;
      const t=ms*.001;uniforms.uTime.value=t;
      particles.rotation.z=t*.035;
      shards.children.forEach((m,i)=>{
        const d=m.userData, a=t*d.speed+d.phase;
        m.rotation.x+=.002*d.speed;m.rotation.y+=.003*d.speed;
        m.position.x=d.baseX+Math.sin(a)*.18;
        m.position.y=d.baseY+Math.cos(a*1.2)*.18;
      });
      camera.position.x=Math.sin(t*.22)*.16;
      camera.position.y=Math.cos(t*.18)*.12;
      camera.lookAt(0,0,0);
      renderer.render(scene,camera);
    }
    raf=requestAnimationFrame(frame);
    return function stop(){
      if(disposed)return;disposed=true;cancelAnimationFrame(raf);
      if(ro)ro.disconnect();else window.removeEventListener("resize",resize);
      geo.dispose();particles.material.dispose();shards.children.forEach(m=>{m.geometry.dispose();m.material.dispose();});
      plane.geometry.dispose();plane.material.dispose();renderer.dispose();renderer.domElement.remove();
    };
  }
  window.AURABREAK_NULL_ABSOLUTE={start};
})();
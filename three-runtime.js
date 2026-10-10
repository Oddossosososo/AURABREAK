import * as THREE from "three";
window.THREE = THREE;
window.dispatchEvent(new CustomEvent("aurabreak:three-ready", { detail: { revision: THREE.REVISION } }));

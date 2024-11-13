import * as THREE from "three";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader";
import { GUI } from "dat.gui";

export default function loadCeilingLampModel(scene, ceiling) {
  const loader = new GLTFLoader();

  loader.load("../assets/ratten_lamp/scene.gltf", (gltf) => {
    const lamp = gltf.scene;
    const sLight = new THREE.SpotLight(0xffffff, 50);
    lamp.position.copy(ceiling.position);
    sLight.angle = 1.57079;
    sLight.penumbra = 0.3;
    sLight.decay = 1;
    lamp.position.y -= 13;
    lamp.scale.set(20, 20, 20);
    sLight.position.copy(ceiling.position);
    sLight.position.y -= 1;
    sLight.castShadow = true;

    const sLightHelper = new THREE.SpotLightHelper(sLight, 0xffffff);
    scene.add(lamp, sLight, sLightHelper);
  });
}

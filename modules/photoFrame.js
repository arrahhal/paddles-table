import { GLTFLoader } from "three/addons/loaders/GLTFLoader";
import * as THREE from "three";

export default function loadPhotoFrame(scene, wall) {
  const loader = new GLTFLoader();
  const textureLoader = new THREE.TextureLoader();

  loader.load("../assets/photo_frame/scene.gltf", (gltf) => {
    const frame = gltf.scene;
    const photo = new THREE.Mesh(
      new THREE.PlaneGeometry(15, 10),
      new THREE.MeshStandardMaterial({
        map: textureLoader.load("../assets/cover.jpg"),
      }),
    );
    frame.position.copy(wall.position);
    frame.rotation.z = Math.PI / 2;
    frame.rotation.x = Math.PI / 2;
    frame.position.z += 0.1;
    frame.scale.set(20, 20, 20);
    photo.position.copy(wall.position);
    photo.position.z += 0.5;
    scene.add(frame, photo);
  });
}

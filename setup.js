import * as THREE from "three";
import wallImg from "./assets/wall.jpg";

const textureLoader = new THREE.TextureLoader();

const wallTexture = textureLoader.load(wallImg);
wallTexture.wrapS = THREE.RepeatWrapping;
wallTexture.wrapT = THREE.RepeatWrapping;
wallTexture.repeat.set(5, 5);

export function createWallSpotlight(
  { x = 0, y = 0, z = 0 },
  intensity = 900,
  targetPosition = new THREE.Vector3(0, 0, 0),
) {
  const spotlight = new THREE.SpotLight(0xffffff, intensity);
  spotlight.position.set(x, y, z);
  spotlight.target.position.copy(targetPosition);
  spotlight.castShadow = true;
  spotlight.angle = Math.PI / 6; // 30 degrees
  spotlight.penumbra = 0.9;
  spotlight.decay = 2;
  spotlight.distance = 40;
  spotlight.shadow.mapSize.width = 1024;
  spotlight.shadow.mapSize.height = 1024;
  return spotlight;
}

export function createWall({ x = 0, y = 0, z = 0 }, isRotated = false) {
  const wall = new THREE.Mesh(
    new THREE.BoxGeometry(100, 50, 0.001),
    new THREE.MeshLambertMaterial({ map: wallTexture }),
  );
  if (isRotated) {
    wall.rotation.y = Math.PI / 2;
  }
  wall.position.x = x;
  wall.position.y = y;
  wall.position.z = z;
  return wall;
}

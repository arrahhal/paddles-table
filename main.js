import * as THREE from "three";
import * as dat from "dat.gui";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import floor from "./assets/floor.jpg";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";

const plant = new URL("./assets/potted_plant_02_4k.gltf", import.meta.url);

let paddle1DirX = 0;
let paddle2DirX = 0;
let paddleSpeed = 0.2;

let ballDirX = 1;
let ballDirZ = 1;
let ballSpeed = 0.1;

const gui = new dat.GUI();
const options = {
  angle: 1,
  penumbra: 0,
  intensity: 100,
};

gui.add(options, "angle", 0, 1);
gui.add(options, "penumbra", 0, 1);
gui.add(options, "intensity", 0, 200);

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000,
);

const textureLoader = new THREE.TextureLoader();

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.shadowMap.enabled = true;
document.body.appendChild(renderer.domElement);

const orbit = new OrbitControls(camera, renderer.domElement);
scene.add(orbit);

camera.position.set(0, 8, 25);
orbit.update();

const planeGeomtry = new THREE.PlaneGeometry(20, 30);
const planeMaterial = new THREE.MeshStandardMaterial({
  color: "darkgreen",
  side: THREE.DoubleSide,
});
const plane = new THREE.Mesh(planeGeomtry, planeMaterial);
plane.rotation.x = -0.5 * Math.PI;
plane.receiveShadow = true;
scene.add(plane);

const tableGeometry = new THREE.BoxGeometry(22, 32, 10);
const tableMaterial = new THREE.MeshStandardMaterial({ color: "brown" });
const table = new THREE.Mesh(tableGeometry, tableMaterial);
table.rotation.x = -0.5 * Math.PI;
table.position.y -= 5.1;
scene.add(table);

const sphereGeometry = new THREE.SphereGeometry(0.5);
const sphereMaterial = new THREE.MeshStandardMaterial({ color: 0xff0000 });
const ball = new THREE.Mesh(sphereGeometry, sphereMaterial);
ball.castShadow = true;
ball.position.y += 0.5;

scene.add(ball);

const paddleGeometry = new THREE.BoxGeometry(3, 1, 1);
const paddleMaterial1 = new THREE.MeshStandardMaterial({
  color: 0xfff0fc,
});
const paddleMaterial2 = new THREE.MeshStandardMaterial({
  color: 0xfff0fc,
});
const paddle1 = new THREE.Mesh(paddleGeometry, paddleMaterial1);
const paddle2 = new THREE.Mesh(paddleGeometry, paddleMaterial2);

paddle1.position.y += 0.5;
paddle1.position.z = 15;

paddle2.position.y += 0.5;
paddle2.position.z = -15;

scene.add(paddle1);
scene.add(paddle2);

const pillarGeometry = new THREE.BoxGeometry(2, 20, 2);
const pillarMaterial = new THREE.MeshStandardMaterial({
  color: 0x909acf,
});

const pillar2 = new THREE.Mesh(pillarGeometry, pillarMaterial);
pillar2.position.x = 20;
pillar2.position.z += 5;
scene.add(pillar2);

const groundGeomtery = new THREE.BoxGeometry(1000, 1000);
const groundMaterial = new THREE.MeshStandardMaterial({
  color: "#eef0e1",
  map: textureLoader.load(floor),
});
const ground = new THREE.Mesh(groundGeomtery, groundMaterial);
ground.rotation.x = -0.5 * Math.PI;
ground.position.y = -10;
ground.receiveShadow = true;
scene.add(ground);

const ambientLight = new THREE.AmbientLight(0xffffff);
scene.add(ambientLight);

const spotLight = new THREE.SpotLight(0xffffff, 100);
spotLight.position.set(0, 10, 0);
spotLight.castShadow = true;
scene.add(spotLight);

const sLightHelper = new THREE.SpotLightHelper(spotLight);
scene.add(sLightHelper);

scene.add(spotLight);

const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
directionalLight.position.set(30, 30, 30);
scene.add(directionalLight);

const dLightHelper = new THREE.DirectionalLightHelper(directionalLight);
scene.add(dLightHelper);

const assetLoader = new GLTFLoader();
assetLoader.load(
  plant.href,
  (gltf) => {
    const model = gltf.scene;
    scene.add(model);
    model.scale.set(8, 8, 8);
    model.position.set(25, -9.5, -10);
  },
  undefined,
  function (error) {
    console.error(error);
  },
);

const mousePosition = new THREE.Vector2();

window.addEventListener("mousemove", (e) => {
  mousePosition.x = (e.clientX / window.innerWidth) * 2 - 1;
  mousePosition.y = (e.clientY / window.innerHeight) * 2 + 1;
});

function animate() {
  spotLight.angle = options.angle;
  spotLight.penumbra = options.penumbra;
  spotLight.intensity = options.intensity;
  sLightHelper.update();

  ballLogic();
  paddleLogic();
  cpuPaddleLogic();
  playerPaddleLogic();

  renderer.render(scene, camera);
}

renderer.setAnimationLoop(animate);

function resetBall(loser) {
  if (loser == 1) {
    ballDirZ = -1;
  } else {
    ballDirZ = 1;
  }

  ballDirX = 1;
}

function ballLogic() {
  if (ball.position.z <= -15) {
    resetBall(2);
  } else if (ball.position.z >= 15) {
    resetBall(1);
  } else if (ball.position.x <= -10) {
    ballDirX = -ballDirX;
  } else if (ball.position.x >= 10) {
    ballDirX = -ballDirX;
  }

  ball.position.x += ballDirX * ballSpeed;
  ball.position.z += ballDirZ * ballSpeed;
}

function paddleLogic() {
  if (ball.position.z >= paddle1.position.z) {
    if (
      ball.position.x <= paddle1.position.x + 0.5 &&
      ball.position.x >= paddle1.position.x - 0.5
    ) {
      paddle1.material.color.set("#ff0000");
      ballDirZ = -ballDirZ;
    } else {
      paddle1.material.color.set("#00ff00");
      ball.position.setX(0);
      ball.position.setZ(0);
    }
  } else if (ball.position.z <= paddle2.position.z) {
    if (
      ball.position.x <= paddle2.position.x + 0.5 &&
      ball.position.x >= paddle2.position.x - 0.5
    ) {
      paddle2.material.color.set("#ff0000");
      ballDirZ = -ballDirZ;
    } else {
      paddle2.material.color.set("#00ff00");
      ball.position.setX(0);
      ball.position.setZ(0);
    }
  }
}

function cpuPaddleLogic() {
  paddle2DirX = (ball.position.x - paddle2.position.x) * 0.2;
  if (Math.abs(paddle2DirX) <= paddleSpeed) {
    paddle2.position.x += paddle2DirX;
  } else {
    if (paddle2DirX > paddleSpeed) {
      paddle2.position.x += paddleSpeed;
    } else if (paddle2DirX < -paddleSpeed) {
      paddle2.position.x -= paddleSpeed;
    }
  }
}

function playerPaddleLogic() {
  if (Key.isDown(Key.left)) {
    if (paddle1.position.x > -15) {
      paddle1DirX = -paddleSpeed * 0.5;
    } else {
      paddle1DirX = 0;
    }
  } else if (Key.isDown(Key.right)) {
    if (paddle1.position.x < 15) {
      paddle1DirX = paddleSpeed * 0.5;
    } else {
      paddle1DirX = 0;
    }
  } else {
    paddle1DirX = 0;
  }

  paddle1.position.x += paddle1DirX;
}

window.addEventListener(
  "keyup",
  function (event) {
    Key.onKeyup(event);
  },
  false,
);
window.addEventListener(
  "keydown",
  function (event) {
    Key.onKeydown(event);
  },
  false,
);

const Key = {
  _pressed: {},

  left: 37,
  right: 39,

  isDown: function (keyCode) {
    return this._pressed[keyCode];
  },

  onKeydown: function (event) {
    this._pressed[event.keyCode] = true;
  },

  onKeyup: function (event) {
    delete this._pressed[event.keyCode];
  },
};

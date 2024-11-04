import * as THREE from "three";
import * as dat from "dat.gui";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

// field variables var fieldWidth = 400,  fieldHeight = 200;

let paddle1DirX = 0;
let paddle2DirX = 0;
let paddleSpeed = 0.2;

let ballDirX = 1;
let ballDirZ = 1;
let ballSpeed = 0.1;

const gui = new dat.GUI();
const options = {
  ballColor: "#00ff00",
  paddle1: "#00ff00",
  paddle2: "#00ff00",
  pillar: "#c0ef0f",
  cameraShadow: 10,
  ballX: 10,
  ballZ: 10,
};

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000,
);

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.shadowMap.enabled = true;
document.body.appendChild(renderer.domElement);

const orbit = new OrbitControls(camera, renderer.domElement);
scene.add(orbit);

camera.position.set(0, 8, 25);
orbit.update();

const axesHelper = new THREE.AxesHelper(5);
scene.add(axesHelper);

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
gui.addColor(options, "ballColor").onChange((e) => {
  ball.material.color.set(e);
});

const paddleGeometry = new THREE.BoxGeometry(3, 1, 1);
const paddleMaterial1 = new THREE.MeshStandardMaterial({
  color: options.paddle1,
});
const paddleMaterial2 = new THREE.MeshStandardMaterial({
  color: options.paddle2,
});
const paddle1 = new THREE.Mesh(paddleGeometry, paddleMaterial1);
const paddle2 = new THREE.Mesh(paddleGeometry, paddleMaterial2);

paddle1.position.y += 0.5;
paddle1.position.z = 15;

paddle2.position.y += 0.5;
paddle2.position.z = -15;

gui.addColor(options, "paddle1").onChange((e) => paddle1.material.color.set(e));
gui.addColor(options, "paddle2").onChange((e) => paddle2.material.color.set(e));

scene.add(paddle1);
scene.add(paddle2);

const pillarGeometry = new THREE.BoxGeometry(2, 20, 2);
const pillarMaterial = new THREE.MeshStandardMaterial({
  color: options.pillar,
});

const pillar1 = new THREE.Mesh(pillarGeometry, pillarMaterial);
pillar1.castShadow = true;
pillar1.position.x = 20;
pillar1.position.z -= 5;
scene.add(pillar1);

const pillar2 = new THREE.Mesh(pillarGeometry, pillarMaterial);
pillar2.position.x = 20;
pillar2.position.z += 5;
scene.add(pillar2);

gui.addColor(options, "pillar").onChange((e) => pillarMaterial.color.set(e));

const groundGeomtery = new THREE.BoxGeometry(1000, 1000);
const groundMaterial = new THREE.MeshStandardMaterial({ color: "#eef0e1" });
const ground = new THREE.Mesh(groundGeomtery, groundMaterial);
ground.rotation.x = -0.5 * Math.PI;
ground.position.y = -10;
ground.receiveShadow = true;
scene.add(ground);

const ambientLight = new THREE.AmbientLight(0xffffff);
scene.add(ambientLight);

const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
directionalLight.position.set(-30, 30, 0);
directionalLight.castShadow = true;
gui.add(options, "cameraShadow", -10, 10);
scene.add(directionalLight);

const dLightShadowHelper = new THREE.CameraHelper(
  directionalLight.shadow.camera,
);
scene.add(dLightShadowHelper);

const dLightHelper = new THREE.DirectionalLightHelper(directionalLight, 5);
scene.add(dLightHelper);

function animate() {
  renderer.render(scene, camera);
  ballLogic();
  paddleLogic();
  cpuPaddleLogic();
  playerPaddleLogic();
}

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

renderer.setAnimationLoop(animate);

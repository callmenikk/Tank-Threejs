import * as THREE from "https://cdn.skypack.dev/three@0.126.1";
import { OrbitControls } from "https://threejsfundamentals.org/threejs/resources/threejs/r122/examples/jsm/controls/OrbitControls.js";

const loader = new THREE.TextureLoader();
loader.load(
  "https://cdn.webshopapp.com/shops/66605/files/266382284/interior-film-rough-dark-grey.jpg",
  (texture) => {
    scene.background = texture;
  }
);

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(devicePixelRatio);
document.body.appendChild(renderer.domElement);

new OrbitControls(camera, renderer.domElement);
camera.position.z = 30;

const geometry = new THREE.CylinderGeometry(1.4, 2, 0.8, 16);
const material = new THREE.MeshPhongMaterial({
  color: 0x264d1b,
  side: THREE.DoubleSide,
  flatShading: THREE.FlatShading,
});
const cylinder = new THREE.Mesh(geometry, material);

const tankBody = new THREE.BoxGeometry(5, 1.3, 5);
const tankGeometry = new THREE.MeshPhongMaterial({
  color: 0x264d1b,
  side: THREE.DoubleSide,
  flatShading: THREE.FlatShading,
});

const shotCilnder = new THREE.CylinderGeometry(0.3, 0.3, 12, 100);
const shotmaterial = new THREE.MeshPhongMaterial({
  color: 0x264d1b,
  side: THREE.DoubleSide,
  flatShading: THREE.FlatShading,
});

const shotMesh = new THREE.Mesh(shotCilnder, shotmaterial);
shotMesh.position.z = -3.6;
shotMesh.position.y = -0.7;
shotMesh.rotation.x = 1.55;

const cilinderHead = new THREE.CylinderGeometry(0.3, 0.4, 1, 100);
const ciliderHeadGeometry = new THREE.MeshPhongMaterial({
  color: 0x264d1b,
  side: THREE.DoubleSide,
  flatShading: THREE.FlatShading,
});

const tankBottomBody = new THREE.BoxGeometry(7, 2, 12);
const tankBodyMaterial = new THREE.MeshPhongMaterial({
  color: 0x264d1b,
  side: THREE.DoubleSide,
  flatShading: THREE.FlatShading,
});

const length = 8,
  width = 2;

const shape = new THREE.Shape();
shape.moveTo(0, 0);
shape.lineTo(0, width);
shape.lineTo(length, width);
shape.lineTo(length, 0);
shape.lineTo(0, 0);

const extrudeSettings = {
  steps: 10,
  depth: 10,
  bevelEnabled: true,
  bevelThickness: 3,
  bevelSize: 0.2,
  bevelOffset: 0.03,
  bevelSegments: 100,
};

const bigBody = new THREE.ExtrudeGeometry(shape, extrudeSettings);
const bigBodyMaterial = new THREE.MeshPhongMaterial({
  color: 0x264d1b,
  side: THREE.DoubleSide,
  flatShading: THREE.FlatShading,
});
const bigBodyMesh = new THREE.Mesh(bigBody, bigBodyMaterial);
bigBodyMesh.position.y = -5;
bigBodyMesh.position.z = -7;
bigBodyMesh.position.x = -4.1;

const tankBodyMesh = new THREE.Mesh(tankBottomBody, tankBodyMaterial);
tankBodyMesh.position.y = -2.3;
tankBodyMesh.position.z = -2;

const cilinderHeadMesh = new THREE.Mesh(
  cilinderHead,
  ciliderHeadGeometry
);
cilinderHeadMesh.position.z = -10;
cilinderHeadMesh.rotation.x = 1.55;
cilinderHeadMesh.position.y = -0.8;

const tankMesh = new THREE.Mesh(tankBody, tankGeometry);
scene.add(tankMesh);
tankMesh.position.y = -0.7;
const light = new THREE.DirectionalLight(0xffffff, 1);
light.position.set(0, 0, 2);

const backlight = new THREE.DirectionalLight(0xffffff, 1);
backlight.position.set(0, 0, -2);

const upLight = new THREE.DirectionalLight(0xffffff, 1);
upLight.position.set(0, 2, 0);

const bottomLight = new THREE.DirectionalLight(0xffffff, 1);
bottomLight.position.set(0, -2, 0);

const xLight = new THREE.DirectionalLight(0xffffff, 1);
upLight.position.set(1, 0, 0);

const yLight = new THREE.DirectionalLight(0xffffff, 1);
bottomLight.position.set(-1, 0, 0);

const leftWheel = new THREE.TorusGeometry(0.8, 0.6, 16, 15);
const Wheelmaterial = new THREE.MeshPhongMaterial({ color: 0x212121 });

const rightWheel = new THREE.TorusGeometry(0.8, 0.6, 16, 15);

for (let i = 0; i < 6; i++) {
  const torus = new THREE.Mesh(leftWheel, Wheelmaterial);
  torus.position.z = i / -0.4 + 4.3;
  torus.rotation.y = 1.55;
  torus.position.x = 4.3;
  torus.position.y = -4.6;
  scene.add(torus);

  const animate = () => {
    requestAnimationFrame(animate);
    renderer.render(scene, camera);

    torus.rotation.x += 2;
  };

  animate();
}

for (let i = 0; i < 6; i++) {
  const righttorus = new THREE.Mesh(rightWheel, Wheelmaterial);
  righttorus.position.z = i / -0.4 + 4.3;
  righttorus.rotation.y = 1.55;
  righttorus.position.x = -4.3;
  righttorus.position.y = -4.6;
  scene.add(righttorus);

  const animate = () => {
    requestAnimationFrame(animate);
    renderer.render(scene, camera);

    righttorus.rotation.x += 2;
  };
  animate();
}

scene.add(bigBodyMesh);
scene.add(tankBodyMesh);
scene.add(cylinder);
scene.add(shotMesh);
scene.add(cilinderHeadMesh);
scene.add(upLight, backlight, light, bottomLight, xLight, yLight);

renderer.render(scene, camera);
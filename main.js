import './style.css'

import * as THREE from 'three'; 
import { AmbientLight } from 'three';

import {OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

//scene is like container that holds cameras and lights
const scene = new THREE.Scene();

//adding perspective camera to mimic human eyebals
//perspectiveCamera(FOV, ASPECT RATIO, VIEW FRUSTUM) (apspect ratio = users browser window).
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

//rendering 
const renderer = new THREE.WebGLRenderer({
  canvas : document.querySelector('#bg'),
});

//setting pixelRatio to window device pixel ratio
renderer.setPixelRatio(window.devicePixelRatio);
//seeting to full screen canvas
renderer.setSize(window.innerWidth, window.innerHeight);

//camera position
camera.position.setZ(30);

renderer.render(scene, camera);

//built in three JS geometry
const geometry = new THREE.DodecahedronGeometry(10);
const material = new THREE.MeshStandardMaterial({color: 0xFF3347});
//adding mesh to material
const dodecahedron = new THREE.Mesh( geometry, material);

scene.add(dodecahedron)

//Point lighting 
const pointLight = new THREE.PointLight(0xffffff);
pointLight.position.set(20,20,20);
scene.add(pointLight);


//Ambient light
const ambientLight = new THREE.AmbientLight(0xffffff);
scene.add(ambientLight);

/*
//helpers
const lightHelper = new THREE.PointLightHelper(pointLight);
const gridHelper = new THREE.GridHelper(200, 50);
scene.add(lightHelper, gridHelper);
*/

//adding orbital controls (ie allowing us to move around)
//listens to dorm events and updates
const controls = new OrbitControls(camera, renderer.domElement);

function addStar(){
  const geometry = new THREE.SphereGeometry(0.25, 24, 24);
  const material = new THREE.MeshStandardMaterial({color : 0xffffff})
  const star = new THREE.Mesh(geometry, material);
  
  //placing stars randomly
  const [x, y, z] = Array(3).fill().map(() => THREE.MathUtils.randFloatSpread( 100 ) );
  star.position.set(x,y,z);
  scene.add(star);
}
//adding 200 stars
Array(200).fill().forEach(addStar);

const spaceTexture = new THREE.TextureLoader().load('')
scene.background = spaceTexture;

/*
//TorusKnotGeometry
const geometryT = new THREE.TorusKnotGeometry( 10, 3, 15, 8 );
const materialT = new THREE.MeshBasicMaterial( { color:	0x9932CC } );
const torusKnot = new THREE.Mesh( geometryT, materialT );
scene.add( torusKnot );
*/


//game loop to animate
function animate() {
  requestAnimationFrame(animate);
  dodecahedron.rotation.x += 0.01;
  dodecahedron.rotation.y += 0.005;
  dodecahedron.rotation.z += 0.01;
  controls.update();

  renderer.render(scene, camera);
}

animate();


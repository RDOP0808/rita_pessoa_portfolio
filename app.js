document.addEventListener('mousemove', onMouseMove, false);

// Set up the scene, camera, and renderer as global variables.
const scene = new THREE.Scene();
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(window.devicePixelRatio); // Optimize rendering for device pixel ratio
document.body.appendChild(renderer.domElement);

let viewSize = 10; // Adjust this value based on the size of your scene
const aspectRatio = window.innerWidth / window.innerHeight;

const light = new THREE.AmbientLight(0x404040); // Add ambient light
scene.add(light);

const pointLight = new THREE.PointLight(0xffffff, 1); // Add point light
pointLight.position.set(5, 5, 10);
scene.add(pointLight);

// Create orthographic camera
const camera = new THREE.OrthographicCamera(-aspectRatio * viewSize / 2, aspectRatio * viewSize / 2, viewSize / 2, -viewSize / 2, 1, 100);
camera.position.set(0, 0, 10);

camera.lookAt(scene.position);

let touchX = 0;
let touchY = 0;

//Create a table
const table = new THREE.Group();
const tableMaterial = new THREE.MeshStandardMaterial({ color: 0x5e5038 });
//Table top
const tableTopGeometry = new THREE.BoxGeometry(7, 0.5, 5);
const tableTop = new THREE.Mesh(tableTopGeometry, tableMaterial);
tableTop.position.y = 0.25;
table.add(tableTop);
//Table legs
const tableLegGeometry = new THREE.BoxGeometry(0.5, 3, 0.5);
const tableLeg1 = new THREE.Mesh(tableLegGeometry, tableMaterial);
tableLeg1.position.set(-3, -1.5, -2);
table.add(tableLeg1);
const tableLeg2 = new THREE.Mesh(tableLegGeometry, tableMaterial);
tableLeg2.position.set(3, -1.5, -2);
table.add(tableLeg2);
const tableLeg3 = new THREE.Mesh(tableLegGeometry, tableMaterial);
tableLeg3.position.set(-3, -1.5, 2);
table.add(tableLeg3);
const tableLeg4 = new THREE.Mesh(tableLegGeometry, tableMaterial);
tableLeg4.position.set(3, -1.5, 2);
table.add(tableLeg4);

scene.add(table);

//Create a chair
const chair = new THREE.Group();
const chairMaterial = new THREE.MeshStandardMaterial({ color: 0x5e5038 });
//Chair seat
const chairSeatGeometry = new THREE.BoxGeometry(2.5, 0.5, 2.5);
const chairSeat = new THREE.Mesh(chairSeatGeometry, chairMaterial);
chairSeat.position.y = 0.25;
chair.add(chairSeat);
//Chair legs
const chairLegGeometry = new THREE.BoxGeometry(0.5, 2, 0.5);
const chairLeg1 = new THREE.Mesh(chairLegGeometry, chairMaterial);
chairLeg1.position.set(-1, -1, -1);
chair.add(chairLeg1);
const chairLeg2 = new THREE.Mesh(chairLegGeometry, chairMaterial);
chairLeg2.position.set(1, -1, -1);
chair.add(chairLeg2);
const chairLeg3 = new THREE.Mesh(chairLegGeometry, chairMaterial);
chairLeg3.position.set(-1, -1, 1);
chair.add(chairLeg3);
const chairLeg4 = new THREE.Mesh(chairLegGeometry, chairMaterial);
chairLeg4.position.set(1, -1, 1);
chair.add(chairLeg4);
//Chair back
const chairBackGeometry = new THREE.BoxGeometry(2.5, 2.5, 0.5);
const chairBack = new THREE.Mesh(chairBackGeometry, chairMaterial);
chairBack.position.set(0, 1.25, -1);
chair.add(chairBack);
//rotate chair
chair.rotation.y = -Math.PI / 3;
chair.position.set(2, -1, 5);
scene.add(chair);

function onMouseMove(event) {
    // Calculate the rotation angles based on mouse movement
    const rotationSpeed = 0.01;
    const deltaX = event.movementX || event.mozMovementX || event.webkitMovementX || 0;
    const deltaY = event.movementY || event.mozMovementY || event.webkitMovementY || 0;
    const rotationX = deltaY * rotationSpeed;
    const rotationY = deltaX * rotationSpeed;

    // Rotate the scene
    scene.rotation.x += rotationX;
    scene.rotation.y += rotationY;
}

function animate() {
  requestAnimationFrame(animate);
  
  camera.lookAt(scene.position);
  
  renderer.render(scene, camera);
}

animate();

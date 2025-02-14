
import * as THREE from 'https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.module.js';

// Scene setup
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Heart shape creation
const createHeartShape = () => {
  const x = 0, y = 0;
  const heartShape = new THREE.Shape();

  heartShape.moveTo(x + 0, y + 0);
  heartShape.bezierCurveTo(x + 0, y + 3, x - 5, y + 5, x - 5, y + 0);
  heartShape.bezierCurveTo(x - 5, y - 5, x + 0, y - 8, x + 0, y - 10);
  heartShape.bezierCurveTo(x + 0, y - 8, x + 5, y - 5, x + 5, y + 0);
  heartShape.bezierCurveTo(x + 5, y + 5, x + 0, y + 3, x + 0, y + 0);
  return heartShape;
};

const heartShape = createHeartShape();
const extrudeSettings = { depth: 1, bevelEnabled: true, bevelThickness: 0.3, bevelSize: 0.3, bevelSegments: 5 };
const geometry = new THREE.ExtrudeGeometry(heartShape, extrudeSettings);
const material = new THREE.MeshPhongMaterial({ color: 0xff69b4, shininess: 100 });
const heartMesh = new THREE.Mesh(geometry, material);

heartMesh.rotation.x = Math.PI; // Flip for correct orientation
heartMesh.rotation.z = Math.PI; // Invert to make the heart top appear below
scene.add(heartMesh);

heartMesh.position.set(0, 0, -5);

// Add lighting
const pointLight = new THREE.PointLight(0xffffff, 1);
pointLight.position.set(10, 10, 10);
scene.add(pointLight);

const ambientLight = new THREE.AmbientLight(0xff69b4, 0.5);
scene.add(ambientLight);

// Particles around the heart
const particlesGeometry = new THREE.BufferGeometry();
const particleCount = 500;
const positions = [];
for (let i = 0; i < particleCount; i++) {
  positions.push((Math.random() - 0.5) * 50); // X
  positions.push((Math.random() - 0.5) * 50); // Y
  positions.push((Math.random() - 0.5) * 50); // Z
}
particlesGeometry.setAttribute(
  'position',
  new THREE.Float32BufferAttribute(positions, 3)
);
const particlesMaterial = new THREE.PointsMaterial({
  color: 0xff69b4,
  size: 0.4,
});
const particlesMesh = new THREE.Points(particlesGeometry, particlesMaterial);
scene.add(particlesMesh);

camera.position.z = 20;

// Animation loop
function animate() {
  requestAnimationFrame(animate);
  heartMesh.rotation.y += 0.01;
  particlesMesh.rotation.x += 0.002;
  particlesMesh.rotation.y += 0.002;
  renderer.render(scene, camera);
}
animate();

// Handle window resizing
window.addEventListener('resize', () => {
  renderer.setSize(window.innerWidth, window.innerHeight);
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
});

const messageDiv = document.getElementById('message');
const yesButton = document.getElementById('yesButton');
const noButton = document.getElementById('noButton');

// Handle Yes button click
yesButton.addEventListener('click', () => {
  messageDiv.textContent = "You just made my heart skip a beat. I’m so glad you said yes!";
  messageDiv.style.opacity = 1;
  // Optionally, you could disable the "No" button after clicking "Yes"
  noButton.disabled = true;
});

// Handle No button click with position change
let clickCount = 0;
noButton.addEventListener('click', () => {
  clickCount++;
  
  if (clickCount < 4) {
    // Change message depending on click count
    if (clickCount === 1) {
      messageDiv.textContent = "Oh no! Are you sure? 😢";
    } else if (clickCount === 2) {
      messageDiv.textContent = "Please reconsider! 😔";
    } else {
      messageDiv.textContent = "Come on, give it a chance! 🌹";
    }
    
    messageDiv.style.opacity = 1;
    
    // Hide the message after 2 seconds
    setTimeout(() => {
      messageDiv.style.opacity = 0;
    }, 2000);
  } else {
    // Get the window dimensions and button size
    const buttonWidth = noButton.offsetWidth;
    const buttonHeight = noButton.offsetHeight;
    const maxX = window.innerWidth - buttonWidth;
    const maxY = window.innerHeight - buttonHeight;

    // Ensure the new position is within bounds
    const randomX = Math.floor(Math.random() * maxX);
    const randomY = Math.floor(Math.random() * maxY);

    // Set the new position for the "No" button
    noButton.style.position = "absolute";  // Ensure button is positioned absolutely
    noButton.style.left = randomX + 'px';
    noButton.style.top = randomY + 'px';
    noButton.style.visibility = "visible"; // Ensure the button stays visible

    // Optionally, you can add a little animation or effect here
    noButton.style.transition = "all 0.5s ease"; // Smooth transition to the new position
  }
});


 

 
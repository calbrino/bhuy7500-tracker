const container = document.getElementById('globe-container'); // Use const as the element reference won't change

// Scene setup (Scene doesn't change throughout the application)
const scene = new THREE.Scene();

// Camera setup (Similar to scene, camera properties might not change)
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.z = 5;

// Renderer setup (Renderer itself likely won't change, but its size might)
const renderer = new THREE.WebGLRenderer({ antialias: true });

// Set initial size based on container
renderer.setSize(container.clientWidth, container.clientHeight);
container.appendChild(renderer.domElement);

// Globe creation (These values might be adjusted based on user interaction)
let radius = 1;
let segments = 50;
let rings = 50;
const geometry = new THREE.SphereGeometry(radius, segments, rings); // Use const as the geometry itself shouldn't change

// Material for the globe (Material properties might be changed for customization)
let material = new THREE.MeshBasicMaterial({ color: 0x007bff }); // Blue color

const globe = new THREE.Mesh(geometry, material);
scene.add(globe);

// Animation loop (These variables change within the loop)
function animate() {
  requestAnimationFrame(animate);
  globe.rotation.y += 0.01; // Rotate the globe slowly
  renderer.render(scene, camera);
}

animate();

// Handle window resize (These values change based on window size)
window.addEventListener('resize', () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(container.clientWidth, container.clientHeight);
});

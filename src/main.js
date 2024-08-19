import * as THREE from "three";

let scene, camera, renderer, ball, maze;

function init() {
  // Scene setup
  scene = new THREE.Scene();
  camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
  );
  camera.position.set(0, 20, 20);
  camera.lookAt(0, 0, 0);

  // Renderer setup
  renderer = new THREE.WebGLRenderer();
  renderer.setSize(window.innerWidth, window.innerHeight);
  document.body.appendChild(renderer.domElement);

  // Lighting
  const ambientLight = new THREE.AmbientLight(0x404040);
  scene.add(ambientLight);
  const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
  directionalLight.position.set(10, 10, 10).normalize();
  scene.add(directionalLight);

  // Ball
  const ballGeometry = new THREE.SphereGeometry(0.5, 32, 32);
  const ballMaterial = new THREE.MeshStandardMaterial({ color: 0x0077ff });
  ball = new THREE.Mesh(ballGeometry, ballMaterial);
  ball.position.set(0, 0.5, 0);
  scene.add(ball);

  // Maze (simple plane as a placeholder)
  const mazeGeometry = new THREE.BoxGeometry(20, 1, 20);
  const mazeMaterial = new THREE.MeshStandardMaterial({ color: 0x00ff00 });
  maze = new THREE.Mesh(mazeGeometry, mazeMaterial);
  maze.position.set(0, 0, 0);
  scene.add(maze);

  const obstacleGeometry = new THREE.BoxGeometry(2, 2, 2);
  const obstacleMaterial = new THREE.MeshStandardMaterial({
    color: 0xff0000,
  });
  const obstacle = new THREE.Mesh(obstacleGeometry, obstacleMaterial);
  obstacle.position.set(5, 1, 5);
  scene.add(obstacle);

  // Animation loop
  animate();
}

function handleKeyDown(event) {
  switch (event.key) {
    case "ArrowUp":
      ball.position.z -= 0.5;
      break;
    case "ArrowDown":
      ball.position.z += 0.5;
      break;
    case "ArrowLeft":
      ball.position.x -= 0.5;
      break;
    case "ArrowRight":
      ball.position.x += 0.5;
      break;
  }
}

window.addEventListener("keydown", handleKeyDown);

function checkCollision() {
  const distance = ball.position.distanceTo(obstacle.position);
  if (distance < 1.5) {
    console.log("Collision Detected!");
  }
}

function animate() {
  requestAnimationFrame(animate);

  // Example: simple ball movement
  //   ball.position.x += 0.01;

  renderer.render(scene, camera);
}

window.addEventListener("resize", () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});

init();

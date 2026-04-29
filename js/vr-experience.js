import * as THREE from 'three';
import { EffectComposer } from 'three/addons/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/addons/postprocessing/RenderPass.js';
import { UnrealBloomPass } from 'three/addons/postprocessing/UnrealBloomPass.js';
import { OutputPass } from 'three/addons/postprocessing/OutputPass.js';
import { RoomEnvironment } from 'three/addons/environments/RoomEnvironment.js';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';

// ---------- Setup ----------
const canvas = document.getElementById('scene');
const renderer = new THREE.WebGLRenderer({canvas, antialias:true, alpha:false});
renderer.setPixelRatio(Math.min(devicePixelRatio, 2));
renderer.outputColorSpace = THREE.SRGBColorSpace;
renderer.toneMapping = THREE.ACESFilmicToneMapping;
renderer.toneMappingExposure = 1.4;
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;

const scene = new THREE.Scene();
scene.background = null; // CSS handles bg

const camera = new THREE.PerspectiveCamera(35, 1, 0.01, 100);
camera.position.set(0, 0.1, 2.5);

// Environment
const pmrem = new THREE.PMREMGenerator(renderer);
scene.environment = pmrem.fromScene(new RoomEnvironment(), 0.04).texture;

// ---------- Post-processing ----------
const composer = new EffectComposer(renderer);
composer.addPass(new RenderPass(scene, camera));

const bloomPass = new UnrealBloomPass(
  new THREE.Vector2(window.innerWidth, window.innerHeight),
  0.3,  // Bloom strength
  0.8,  // Radius
  0.5   // Threshold
);
composer.addPass(bloomPass);
composer.addPass(new OutputPass());

// ---------- Enhanced Lighting for Better Visibility ----------
const keyLight = new THREE.DirectionalLight(0xffffff, 3.5);
keyLight.position.set(3, 4, 2.5);
keyLight.castShadow = true;
keyLight.shadow.camera.near = 0.1;
keyLight.shadow.camera.far = 10;
keyLight.shadow.camera.left = -2;
keyLight.shadow.camera.right = 2;
keyLight.shadow.camera.top = 2;
keyLight.shadow.camera.bottom = -2;
keyLight.shadow.mapSize.width = 2048;
keyLight.shadow.mapSize.height = 2048;
scene.add(keyLight);

const fillLight = new THREE.DirectionalLight(0xbfd8ff, 1.2);
fillLight.position.set(-3, -1, 2);
scene.add(fillLight);

const rimLight = new THREE.DirectionalLight(0xffffff, 2.0);
rimLight.position.set(-1.5, 2, -3);
scene.add(rimLight);

// Much brighter ambient for better overall visibility
scene.add(new THREE.AmbientLight(0xffffff, 0.8));

// Accent light for the orange details
const accentLight = new THREE.PointLight(0xff6b4a, 0.8, 5);
accentLight.position.set(0, 0, 1);
scene.add(accentLight);

// Special highlight light for Stage 2 (problem statement)
const stage2Light = new THREE.SpotLight(0xffffff, 0, 10, Math.PI / 6, 0.5);
stage2Light.position.set(0, 2, 3);
stage2Light.target.position.set(0, 0, 0);
scene.add(stage2Light);
scene.add(stage2Light.target);

// ---------- Load Meta Quest 3 Model ----------
const headsetGroup = new THREE.Group();
scene.add(headsetGroup);

let headsetModel = null;
let lensGlassMat = null;
const loader = new GLTFLoader();

// Loading indicator
const loadingEl = document.createElement('div');
loadingEl.style.cssText = `
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-family: 'JetBrains Mono', monospace;
  font-size: 12px;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: #55555A;
  z-index: 1000;
`;
loadingEl.textContent = 'Loading VR Headset...';
document.body.appendChild(loadingEl);

loader.load(
  'assets/vr-headset.glb',
  (gltf) => {
    console.log('Model loaded successfully');
    headsetModel = gltf.scene;

    // Process the model
    headsetModel.traverse((child) => {
      if (child.isMesh) {
        // Enable shadows
        child.castShadow = true;
        child.receiveShadow = true;

        // Enhance materials
        if (child.material) {
          // Make materials more responsive to lighting
          if (child.material.name && child.material.name.toLowerCase().includes('lens')) {
            // Save lens material reference for transition effects
            lensGlassMat = child.material;
            child.material.transparent = true;
            child.material.opacity = 1;
          }

          // Enhance metallic surfaces
          if (child.material.metalness !== undefined) {
            child.material.envMapIntensity = 1.2;
          }
        }
      }
    });

    // Center and scale the model
    const box = new THREE.Box3().setFromObject(headsetModel);
    const center = box.getCenter(new THREE.Vector3());
    const size = box.getSize(new THREE.Vector3());

    // Center the model
    headsetModel.position.x = -center.x;
    headsetModel.position.y = -center.y;
    headsetModel.position.z = -center.z;

    // Scale to appropriate size - making it much bigger for more prominence
    const targetHeight = 0.8; // Much larger for better screen presence
    const scale = targetHeight / size.y;
    headsetModel.scale.setScalar(scale);

    // Add to group
    headsetGroup.add(headsetModel);

    // Remove loading indicator
    document.body.removeChild(loadingEl);

    // Start render loop after model loads
    render();
  },
  (progress) => {
    // Update loading progress
    const percent = (progress.loaded / progress.total * 100).toFixed(0);
    loadingEl.textContent = `Loading VR Headset... ${percent}%`;
  },
  (error) => {
    console.error('Error loading model:', error);
    loadingEl.textContent = 'Error loading model. Using fallback...';
    // Fallback to simple geometry if model fails
    createFallbackHeadset();
    setTimeout(() => document.body.removeChild(loadingEl), 2000);
    render();
  }
);

// Fallback procedural headset (simplified) - scaled larger
function createFallbackHeadset() {
  const geometry = new THREE.BoxGeometry(1.2, 0.58, 0.35); // Scaled up by ~60%
  const material = new THREE.MeshPhysicalMaterial({
    color: 0x1e1e21,
    roughness: 0.55,
    metalness: 0.15,
    clearcoat: 0.3,
    clearcoatRoughness: 0.6,
  });
  const mesh = new THREE.Mesh(geometry, material);
  headsetGroup.add(mesh);
}

// Contact shadow (radial)
const shadowTex = makeRadialShadow();
const radialShadowPlane = new THREE.Mesh(
  new THREE.PlaneGeometry(3.8, 1.9), // Scaled up for larger headset
  new THREE.MeshBasicMaterial({
    map:shadowTex,
    transparent:true,
    opacity:0.4,
    depthWrite:false
  })
);
radialShadowPlane.rotation.x = -Math.PI/2;
radialShadowPlane.position.y = -0.25; // Adjusted for model
radialShadowPlane.receiveShadow = true;
scene.add(radialShadowPlane);

function makeRadialShadow(){
  const c = document.createElement('canvas');
  c.width=c.height=256;
  const ctx = c.getContext('2d');
  const g = ctx.createRadialGradient(128,128,10,128,128,128);
  g.addColorStop(0,'rgba(0,0,0,0.6)');
  g.addColorStop(0.5,'rgba(0,0,0,0.25)');
  g.addColorStop(1,'rgba(0,0,0,0)');
  ctx.fillStyle=g;
  ctx.fillRect(0,0,256,256);
  const t = new THREE.CanvasTexture(c);
  t.colorSpace = THREE.SRGBColorSpace;
  return t;
}

// Shadow plane for the VR headset
const shadowGeo = new THREE.PlaneGeometry(8, 8);
const shadowMat = new THREE.ShadowMaterial({
  opacity: 0.15,
  transparent: true
});
const shadowPlane = new THREE.Mesh(shadowGeo, shadowMat);
shadowPlane.rotation.x = -Math.PI / 2;
shadowPlane.position.y = -0.45;
shadowPlane.receiveShadow = true;
scene.add(shadowPlane);

// ---------- Stage 2: Problem Lines ----------
const problemLines = new THREE.Group();
scene.add(problemLines);
const problemLinesMeshes = [];
const problemSpheres = [];

const problemPositions = [
  { endPos: new THREE.Vector3(-3.5, 0.2, -2), color: 0x00ffcc },
  { endPos: new THREE.Vector3(0, 0.5, -2.5), color: 0x00ffcc },
  { endPos: new THREE.Vector3(3.5, 0.2, -2), color: 0x00ffcc }
];

problemPositions.forEach((problem) => {
  const geometry = new THREE.BufferGeometry();
  const material = new THREE.LineBasicMaterial({
    color: problem.color,
    transparent: true,
    opacity: 0
  });
  const line = new THREE.Line(geometry, material);
  problemLines.add(line);

  const glowGeometry = new THREE.BufferGeometry();
  const glowMaterial = new THREE.LineBasicMaterial({
    color: problem.color,
    transparent: true,
    opacity: 0,
    linewidth: 3
  });
  const glowLine = new THREE.Line(glowGeometry, glowMaterial);
  problemLines.add(glowLine);

  problemLinesMeshes.push({
    line, geometry, material, problem, glowLine, glowMaterial
  });

  const sphereGeometry = new THREE.SphereGeometry(0.05, 16, 16);
  const sphereMaterial = new THREE.MeshBasicMaterial({
    color: problem.color,
    transparent: true,
    opacity: 0
  });
  const sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);
  sphere.position.copy(problem.endPos);
  problemLines.add(sphere);

  problemSpheres.push({ sphere, material: sphereMaterial });
});

// ---------- Stage 3: Interior VR room ----------
const interior = new THREE.Group();
interior.visible = false;
scene.add(interior);

// Floor
const floorGeo = new THREE.PlaneGeometry(80, 80);
const floorMat = new THREE.MeshStandardMaterial({
  color:0x0A0A10,
  roughness:0.92,
  metalness:0.1
});
const floor = new THREE.Mesh(floorGeo, floorMat);
floor.rotation.x = -Math.PI/2;
floor.position.y = -1.2;
floor.receiveShadow = true;
interior.add(floor);

// Walls
const wallMat = new THREE.MeshStandardMaterial({
  color:0x0C0C12,
  roughness:1,
  metalness:0
});
const backWall = new THREE.Mesh(new THREE.PlaneGeometry(80, 40), wallMat);
backWall.position.set(0, 8, -12);
interior.add(backWall);

const sideL = new THREE.Mesh(new THREE.PlaneGeometry(40, 40), wallMat);
sideL.rotation.y = Math.PI/2;
sideL.position.set(-14, 8, 0);
interior.add(sideL);

const sideR = sideL.clone();
sideR.rotation.y = -Math.PI/2;
sideR.position.x = 14;
interior.add(sideR);

// Guardian boundary
const guardianMat = new THREE.LineBasicMaterial({
  color:0x4FB3FF,
  transparent:true,
  opacity:0.9
});
const guardianGeom = new THREE.BufferGeometry().setFromPoints([
  new THREE.Vector3(-4, -1.19, -4),
  new THREE.Vector3( 4, -1.19, -4),
  new THREE.Vector3( 4, -1.19,  4),
  new THREE.Vector3(-4, -1.19,  4),
  new THREE.Vector3(-4, -1.19, -4),
]);
const guardian = new THREE.Line(guardianGeom, guardianMat);
interior.add(guardian);

// Guardian glow bars
const guardianGlow = new THREE.Mesh(
  new THREE.BoxGeometry(8.04, 0.02, 0.04),
  new THREE.MeshBasicMaterial({color:0x4FB3FF})
);
guardianGlow.position.set(0, -1.19, -4);
interior.add(guardianGlow);

const gg2 = guardianGlow.clone();
gg2.position.z = 4;
interior.add(gg2);

const gg3 = new THREE.Mesh(
  new THREE.BoxGeometry(0.04, 0.02, 8.04),
  new THREE.MeshBasicMaterial({color:0x4FB3FF})
);
gg3.position.set(-4, -1.19, 0);
interior.add(gg3);

const gg4 = gg3.clone();
gg4.position.x = 4;
interior.add(gg4);

// ENHANCED CUBE FIELD
const CUBE_COUNT = 3500;
const cubeGeom = new THREE.BoxGeometry(0.14, 0.14, 0.14);

// Interactive cube material
const cubeMat = new THREE.MeshStandardMaterial({
  color: 0xff6b4a,
  roughness: 0.5,
  metalness: 0.1,
  emissive: 0xff3020,
  emissiveIntensity: 0.08,
});

const uniforms = {
  uTime: {value:0},
  uCursor: {value: new THREE.Vector3(0,0,0)},
  uSigma: {value: 1.8},
};

cubeMat.onBeforeCompile = (shader)=>{
  shader.uniforms.uTime = uniforms.uTime;
  shader.uniforms.uCursor = uniforms.uCursor;
  shader.uniforms.uSigma = uniforms.uSigma;
  shader.vertexShader = `
    uniform float uTime;
    uniform vec3 uCursor;
    uniform float uSigma;
    attribute float aSeed;
    varying float vLift;
  ` + shader.vertexShader.replace(
    '#include <begin_vertex>',
    `
      vec3 transformed = vec3(position);
      vec4 worldPos = instanceMatrix * vec4(0.0, 0.0, 0.0, 1.0);
      vec3 pxyz = worldPos.xyz;
      float d = distance(pxyz, uCursor);
      float f = exp(-(d*d) / (uSigma*uSigma));

      float baseWave = sin(uTime * 0.8 + aSeed * 6.2831 + pxyz.x * 0.3) * 0.08
                     + sin(uTime * 0.5 + aSeed * 3.0 + pxyz.z * 0.2) * 0.05
                     + cos(uTime * 1.2 + aSeed * 4.7) * 0.03;

      float lift = baseWave + f * 0.6 + f * sin(uTime*2.5 + d*2.0) * 0.15;

      transformed += normalize(pxyz - uCursor) * f * 0.25;
      transformed.y += lift;

      float rotAngle = f * sin(uTime + aSeed * 3.14) * 0.5;
      mat2 rot = mat2(cos(rotAngle), -sin(rotAngle), sin(rotAngle), cos(rotAngle));
      transformed.xz = rot * transformed.xz;

      vLift = lift;
    `
  );
  shader.fragmentShader = `
    varying float vLift;
  ` + shader.fragmentShader.replace(
    '#include <emissivemap_fragment>',
    `
      #include <emissivemap_fragment>
      float glow = clamp(vLift * 2.0, 0.0, 1.0);
      totalEmissiveRadiance += vec3(1.0, 0.32, 0.18) * glow * 0.5;
      diffuseColor.rgb = mix(vec3(0.95, 0.55, 0.45), vec3(1.0, 0.42, 0.32), glow);
    `
  );
};

const cubeMesh = new THREE.InstancedMesh(cubeGeom, cubeMat, CUBE_COUNT);
const seeds = new Float32Array(CUBE_COUNT);
const dummy = new THREE.Object3D();

// Distribute cubes throughout space
for (let i = 0; i < CUBE_COUNT; i++) {
  // Mix of distributions for variety
  let x, y, z;

  if (i < CUBE_COUNT * 0.4) {
    // Floor grid with some variation - pushed further back
    const gridSize = 15;
    const gi = i % (gridSize * gridSize);
    const gx = (gi % gridSize) / gridSize - 0.5;
    const gz = Math.floor(gi / gridSize) / gridSize - 0.5;
    x = gx * 12 + (Math.random() - 0.5) * 0.8;
    y = -1.1 + Math.random() * 0.3;
    z = gz * 12 + (Math.random() - 0.5) * 0.8 - 3; // Pushed 3 units back
  } else if (i < CUBE_COUNT * 0.7) {
    // Floating in space - pushed further away from camera
    const phi = Math.random() * Math.PI * 2;
    const theta = Math.acos(1 - 2 * Math.random());
    const r = 3.5 + Math.random() * 5; // Start further out (was 2)
    x = r * Math.sin(theta) * Math.cos(phi);
    y = r * Math.sin(theta) * Math.sin(phi) - 0.5;
    z = r * Math.cos(theta) - 4; // Pushed back more (was -2)
  } else {
    // Wall clusters - keep some depth
    x = (Math.random() - 0.5) * 10;
    y = Math.random() * 3.5 - 0.5;
    z = -6 + Math.random() * 10; // Start further back (was -4)
  }

  // Constrain to room
  x = Math.max(-7, Math.min(7, x));
  y = Math.max(-1.5, Math.min(3.5, y));
  z = Math.max(-7, Math.min(5, z));

  dummy.position.set(x, y, z);

  const s = 0.4 + Math.random() * 0.8;
  dummy.scale.set(s, s, s);

  dummy.rotation.set(
    Math.random() * Math.PI * 2,
    Math.random() * Math.PI * 2,
    Math.random() * Math.PI * 2
  );

  dummy.updateMatrix();
  cubeMesh.setMatrixAt(i, dummy.matrix);
  seeds[i] = Math.random();
}

cubeGeom.setAttribute('aSeed', new THREE.InstancedBufferAttribute(seeds, 1));
cubeMesh.instanceMatrix.needsUpdate = true;
cubeMesh.castShadow = true;
interior.add(cubeMesh);

// Interior lighting
const interiorKey = new THREE.DirectionalLight(0xffccaa, 0.6);
interiorKey.position.set(0, 6, 2);
interior.add(interiorKey);

const interiorAmb = new THREE.HemisphereLight(0x2a1a20, 0x050507, 0.35);
interior.add(interiorAmb);

const interiorFill = new THREE.PointLight(0xff4a2a, 1.2, 16, 1.6);
interiorFill.position.set(0, 0.2, 0);
interior.add(interiorFill);

const interiorRim = new THREE.PointLight(0x4FB3FF, 1.0, 14, 1.2);
interiorRim.position.set(0, -0.8, -3.5);
interior.add(interiorRim);


// ---------- Cursor Tracking ----------
const mouse = {x:0, y:0, tx:0, ty:0};
const CURSOR_DAMPING = 0.18; // Increased by 50% for more responsive cursor control

window.addEventListener('pointermove', (e)=>{
  mouse.tx = (e.clientX / innerWidth) * 2 - 1;
  mouse.ty = -((e.clientY / innerHeight) * 2 - 1);
});

// Device orientation
window.addEventListener('deviceorientation',(e)=>{
  if(e.gamma==null) return;
  mouse.tx = (e.gamma/45) * 0.5;
  mouse.ty = (e.beta/45) * 0.5;
});

// ---------- Resize ----------
function resize(){
  const w = innerWidth, h = innerHeight;
  renderer.setSize(w, h, false);
  composer.setSize(w, h);
  camera.aspect = w/h;
  camera.updateProjectionMatrix();
}
resize();
addEventListener('resize', resize);

// ---------- Problem Statement Lines (Extended) ----------
// Additional line configurations
const lineProblems = [
  {
    id: 1,
    color: 0xff6b6b,
    endPos: new THREE.Vector3(-2.8, -0.5, 1.2),
    title: 'No Touch Sensation'
  },
  {
    id: 2,
    color: 0xffd93d,
    endPos: new THREE.Vector3(0, -0.7, 1.8),
    title: 'Limited Precision'
  },
  {
    id: 3,
    color: 0x6bcf7f,
    endPos: new THREE.Vector3(2.8, -0.5, 1.2),
    title: 'High Complexity'
  }
];

// Create additional lines for each problem
lineProblems.forEach((problem, index) => {
  const points = [];
  const divisions = 50;

  for (let i = 0; i <= divisions; i++) {
    points.push(new THREE.Vector3(0, 0, 0));
  }

  const geometry = new THREE.BufferGeometry().setFromPoints(points);
  const material = new THREE.LineBasicMaterial({
    color: problem.color,
    transparent: true,
    opacity: 0,
    linewidth: 5
  });

  const line = new THREE.Line(geometry, material);
  problemLines.add(line);

  // Add glow line
  const glowMaterial = new THREE.LineBasicMaterial({
    color: problem.color,
    transparent: true,
    opacity: 0,
    linewidth: 10
  });
  const glowLine = new THREE.Line(geometry.clone(), glowMaterial);
  problemLines.add(glowLine);

  const meshData = { line, geometry, material, problem, glowLine, glowMaterial };
  problemLinesMeshes.push(meshData);
});

// Add glowing spheres at the end of each line (extended)
lineProblems.forEach((problem) => {
  const sphereGeometry = new THREE.SphereGeometry(0.12, 32, 32);
  const sphereMaterial = new THREE.MeshBasicMaterial({
    color: problem.color,
    emissive: problem.color,
    emissiveIntensity: 1.5,
    transparent: true,
    opacity: 0
  });

  const sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);
  sphere.position.copy(problem.endPos);

  // Add outer glow for better visibility
  const glowGeometry = new THREE.SphereGeometry(0.2, 16, 16);
  const glowMaterial = new THREE.MeshBasicMaterial({
    color: problem.color,
    transparent: true,
    opacity: 0,
    side: THREE.BackSide
  });
  const glowSphere = new THREE.Mesh(glowGeometry, glowMaterial);
  sphere.add(glowSphere);

  problemLines.add(sphere);

  problemSpheres.push({ sphere, material: sphereMaterial, glowMaterial });
});

// ---------- Scroll orchestration ----------
const hero = document.getElementById('hero');
const chrome = document.getElementById('chrome');
const midEl = document.getElementById('mid');
const stageEl = document.getElementById('stage');
const flash = document.getElementById('flash');
const bar = document.getElementById('bar');
const l1 = document.getElementById('l1');
const l2 = document.getElementById('l2');
const l3 = document.getElementById('l3');
const l4 = document.getElementById('l4');
const indicators = [...document.querySelectorAll('.stageind .item')];

let scrollProgress = 0;

function computeScrollProgress(){
  const rect = hero.getBoundingClientRect();
  const total = hero.offsetHeight - innerHeight;
  const p = Math.max(0, Math.min(1, -rect.top / total));
  scrollProgress = p;
}

function easeInOut(t){
  // Smoother cubic easing for better transitions
  return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
}


// ---------- Main render loop ----------
const clock = new THREE.Clock();

function render(){
  const t = clock.getElapsedTime();
  computeScrollProgress();
  const p = scrollProgress;

  // Reset visibility
  headsetGroup.visible = true;
  shadowPlane.visible = true;
  interior.visible = false;
  stageEl.classList.remove('dark');
  problemLines.visible = false;

  let camPos = new THREE.Vector3();
  let lookAt = new THREE.Vector3(0, 0, 0);
  let fov = 35;

  // Keep headset centered
  headsetGroup.position.set(0, 0, 0);

  if (p < 0.25) {
    // ---- STAGE 1: Front view with cursor tracking ----
    stage2Light.intensity = 0; // Turn off stage 2 light
    camPos.set(0, 0.05, 2.8); // Pulled back to accommodate larger model
    fov = 35;

    // Smooth cursor-follow - increased by 50% for more reactivity
    const tyaw = mouse.x * 0.375; // Increased from 0.25
    const tpitch = -mouse.y * 0.225; // Increased from 0.15
    headsetGroup.rotation.y += (tyaw - headsetGroup.rotation.y) * 0.18; // Faster response
    headsetGroup.rotation.x += (tpitch - headsetGroup.rotation.x) * 0.18; // Faster response
    headsetGroup.rotation.z *= 0.94;

    // Floating animation
    headsetGroup.position.y = Math.sin(t * 1.2) * 0.015;
    flash.style.opacity = 0;

  } else if (p < 0.50) {
    // ---- STAGE 2: Problem Statement - VR locked, lines animate out ----
    const s = (p - 0.25) / 0.25;
    const e = easeInOut(s);

    // Turn on highlight light for better VR visibility
    stage2Light.intensity = 2.5 * e;

    // Camera pulls back slightly for better view
    camPos.set(0, 0.2, 3.2);
    fov = 38;

    // Lock VR headset - no cursor tracking, smooth return to center
    headsetGroup.rotation.y *= 0.92; // Smooth return to center
    headsetGroup.rotation.x *= 0.92;
    headsetGroup.rotation.z *= 0.92;

    // Slight upward position for emphasis
    headsetGroup.position.y = 0.1;

    // Show and animate problem lines
    problemLines.visible = true;

    // Animate lines extending from headset
    problemLinesMeshes.forEach(({ line, geometry, material, problem, glowLine, glowMaterial }, index) => {
      const startPos = new THREE.Vector3(0, 0, 0);
      const endPos = problem.endPos;

      // Stagger the line animations
      const staggeredE = Math.max(0, Math.min(1, (e - index * 0.1) * 1.3));

      // Update line opacity
      material.opacity = Math.min(1, staggeredE * 1.5);
      glowMaterial.opacity = Math.min(0.3, staggeredE * 0.5);

      // Update line geometry with curve
      const points = [];
      const divisions = 50;

      for (let i = 0; i <= divisions; i++) {
        const t = i / divisions;
        const curveT = t * staggeredE;

        // Create curved path
        const point = new THREE.Vector3();
        point.lerpVectors(startPos, endPos, curveT);

        // Add curve to the line
        const curveHeight = Math.sin(curveT * Math.PI) * 0.3;
        point.y += curveHeight;

        points.push(point);
      }

      geometry.setFromPoints(points);
      glowLine.geometry.setFromPoints(points);
    });

    // Animate spheres at end of lines
    problemSpheres.forEach(({ sphere, material, glowMaterial }, index) => {
      const staggeredE = Math.max(0, Math.min(1, (e - index * 0.1 - 0.3) * 2));
      material.opacity = staggeredE;
      if (glowMaterial) {
        glowMaterial.opacity = staggeredE * 0.3;
      }
      sphere.scale.setScalar(0.5 + staggeredE * 0.5);
    });

    flash.style.opacity = 0;

  } else if (p < 0.75) {
    // ---- STAGE 3: 180° rotation for back view ----
    const s = (p - 0.50) / 0.25;
    const e = easeInOut(s);

    // Turn off stage 2 light
    stage2Light.intensity = 0;

    // Camera pulls back for full view of larger model
    const radius = 2.8 + e * 0.8;
    camPos.set(0, 0.1, radius);
    fov = 35;

    // Smooth Y rotation with improved damping
    const targetYaw = Math.PI * e;
    headsetGroup.rotation.y += (targetYaw - headsetGroup.rotation.y) * 0.22;

    // Subtle cursor overlay
    const tpitch = -mouse.y * 0.12;
    const troll = mouse.x * 0.09;
    headsetGroup.rotation.x += (tpitch - headsetGroup.rotation.x) * 0.18;
    headsetGroup.rotation.z += (troll - headsetGroup.rotation.z) * 0.18;

    headsetGroup.position.y = Math.sin(t * 1.1) * 0.012;
    flash.style.opacity = 0;

  } else if (p < 0.90) {
    // ---- STAGE 3→4 transition: Rotate back and dolly into lens ----
    const s = (p - 0.75) / 0.15;
    const e = easeInOut(s);

    // Turn off stage 2 light
    stage2Light.intensity = 0;

    // Rotate back to front with smoother interpolation
    const targetYaw = Math.PI * (1 - e);
    headsetGroup.rotation.y += (targetYaw - headsetGroup.rotation.y) * 0.25;
    headsetGroup.rotation.x *= 0.92;
    headsetGroup.rotation.z *= 0.92;

    // Dolly into lens
    const startZ = 3.6, endZ = 0.08;
    const z = startZ + (endZ - startZ) * e;
    const leftLensX = -0.12;
    const x = 0 + (leftLensX - 0) * e;
    camPos.set(x, 0.02, z);
    fov = 38 + e * 32;

    // Fade headset
    if (e > 0.5 && headsetModel) {
      const fade = (e - 0.5) / 0.5;
      headsetModel.traverse((child) => {
        if (child.isMesh && child.material) {
          child.material.opacity = 1 - fade * 0.8;
          child.material.transparent = true;
        }
      });
      interior.visible = true;
      stageEl.classList.add('dark');
    }

    // Look targets
    const lensTarget = new THREE.Vector3(-0.12, 0.01, 0.08);
    const innerTarget = new THREE.Vector3(-0.12, 0, -0.5);
    lookAt.set(0,0,0)
      .lerp(lensTarget, Math.min(1, e*1.5))
      .lerp(innerTarget, Math.max(0, e - 0.5) * 2);

    // Flash effect
    const flashT = Math.max(0, 1 - Math.abs(e - 0.85) / 0.15);
    const flashCurve = Math.sin(flashT * Math.PI * 0.5);
    flash.style.opacity = (flashCurve * flashCurve * 0.85).toFixed(3);

  } else {
    // ---- STAGE 4: Inside VR ----
    stage2Light.intensity = 0; // Turn off stage 2 light
    headsetGroup.visible = false;
    shadowPlane.visible = false;
    interior.visible = true;
    stageEl.classList.add('dark');

    // Free-look camera
    camPos.set(mouse.x * 0.3, 0.35 + mouse.y * 0.15, 1.8);
    fov = 70;
    lookAt.set(mouse.x * 0.5, -0.2 + mouse.y * 0.4, -2);

    // Smoother fade out of flash
    const fadeProgress = (p - 0.80) / 0.05; // Slightly longer fade
    const fadeCurve = Math.cos(Math.min(1, fadeProgress) * Math.PI * 0.5); // Cosine for smooth end
    flash.style.opacity = (fadeCurve * 0.9).toFixed(3);
  }

  // Apply camera
  camera.position.copy(camPos);
  camera.lookAt(lookAt);
  camera.fov = fov;
  camera.updateProjectionMatrix();

  // Cube cursor interaction
  if (interior.visible) {
    const ray = new THREE.Raycaster();
    ray.setFromCamera({x: mouse.x, y: mouse.y}, camera);
    const plane = new THREE.Plane(new THREE.Vector3(0,1,0), 1.0);
    const hit = new THREE.Vector3();

    if (ray.ray.intersectPlane(plane, hit)) {
      hit.x = Math.max(-6, Math.min(6, hit.x));
      hit.z = Math.max(-6, Math.min(4, hit.z));
      hit.y = 0;
      uniforms.uCursor.value.lerp(hit, 0.2);
    }
  }
  uniforms.uTime.value = t;

  updateUI(p);
  composer.render();
  requestAnimationFrame(render);
}

// UI Updates
const copies = [...document.querySelectorAll('.copy')];
const problemCards = document.getElementById('problem-cards');
const pc1 = document.getElementById('pc1');
const pc2 = document.getElementById('pc2');
const pc3 = document.getElementById('pc3');
const landingTitle = document.getElementById('landing-title');


function updateUI(p){
  bar.style.setProperty('--p', (p*100).toFixed(1) + '%');

  // 4 stages now: 0-25%, 25-50%, 50-75%, 75-100%
  const stage = p < 0.25 ? 1 : p < 0.50 ? 2 : p < 0.75 ? 3 : 4;

  // Control landing title visibility - only show on Stage 1
  if (landingTitle) {
    landingTitle.classList.toggle('hide', stage !== 1);
  }

  // Update progress labels
  l1.classList.toggle('active', stage===1);
  l2.classList.toggle('active', stage===2);
  l3.classList.toggle('active', stage===3);
  l4.classList.toggle('active', stage===4);

  // Update stage indicators
  indicators.forEach(el=>{
    el.classList.toggle('active', +el.dataset.s === stage);
  });

  // Show copy - map stages to copy sections (hide during stage 2)
  let activeCopy = stage;
  const inTransition = (p > 0.22 && p < 0.28) || (p > 0.47 && p < 0.53) || (p > 0.72 && p < 0.78);
  const isStage2 = stage === 2;

  copies.forEach(el=>{
    // Don't show copy during stage 2 (problem cards stage)
    el.classList.toggle('on', !inTransition && !isStage2 && +el.dataset.copy === activeCopy);
  });

  // Hide side specs during stage 2
  const sideEl = document.querySelector('.side');
  if (sideEl) {
    sideEl.style.opacity = isStage2 ? '0' : '1';
  }

  // Invert colors for inside VR stage
  chrome.classList.toggle('invert', p > 0.75);
  midEl.classList.toggle('stage3', p >= 0.50 && p < 0.90);
  midEl.classList.toggle('stage4', p >= 0.90);

  // Show problem cards during stage 2
  const inStage2Range = p >= 0.25 && p < 0.50;
  problemCards.classList.toggle('active', inStage2Range);

  if (inStage2Range) {
    const stage2Progress = (p - 0.25) / 0.25;

    // Animate cards in with staggered timing
    pc1.classList.toggle('show', stage2Progress > 0.2);
    pc2.classList.toggle('show', stage2Progress > 0.3);
    pc3.classList.toggle('show', stage2Progress > 0.4);
  } else {
    pc1.classList.remove('show');
    pc2.classList.remove('show');
    pc3.classList.remove('show');
  }
}

// Scroll and mouse tracking
let scrollY = 0;

// Track mouse for interaction
window.addEventListener('mousemove', (e) => {
  mouse.x = (e.clientX / window.innerWidth) * 2 - 1;
  mouse.y = -(e.clientY / window.innerHeight) * 2 + 1;
});

// Handle resize
window.addEventListener('resize', () => {
  const w = window.innerWidth;
  const h = window.innerHeight;
  camera.aspect = w / h;
  camera.updateProjectionMatrix();
  renderer.setSize(w, h);
  composer.setSize(w, h);
});

// Initialize size
const w = window.innerWidth;
const h = window.innerHeight;
camera.aspect = w / h;
camera.updateProjectionMatrix();
renderer.setSize(w, h);
composer.setSize(w, h);

// Don't start until model loads (started in loader callback)

// Expose renderer for performance monitoring
window.renderer = renderer;
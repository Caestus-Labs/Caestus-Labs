// Caestus product page — 3D body with scroll-activated clutch nodes
import * as THREE from 'three';

const canvas = document.getElementById('three');
const wrap   = document.getElementById('canvasWrap');
const scene  = new THREE.Scene();
scene.background = null;
scene.fog = new THREE.Fog(0x050507, 9, 22);

const camera = new THREE.PerspectiveCamera(32, 1, 0.1, 50);
camera.position.set(0, 1.05, 4.6);
camera.lookAt(0, 1.0, 0);

const renderer = new THREE.WebGLRenderer({canvas, antialias:true, alpha:true, powerPreference:'high-performance'});
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

function resize(){
  const r = wrap.getBoundingClientRect();
  renderer.setSize(r.width, r.height, false);
  camera.aspect = r.width / r.height;
  camera.updateProjectionMatrix();
}
resize();
window.addEventListener('resize', resize);

// Lights — three-point with strong rim
scene.add(new THREE.AmbientLight(0xffffff, .35));
const key = new THREE.DirectionalLight(0xfff2e6, 1.1); key.position.set(2.5, 4, 4); scene.add(key);
const fill = new THREE.DirectionalLight(0x6688aa, .4); fill.position.set(-3, 2, 2); scene.add(fill);
const rim = new THREE.DirectionalLight(0xff4827, .9); rim.position.set(-2, 1.5, -3); scene.add(rim);
const top = new THREE.DirectionalLight(0xffffff, .25); top.position.set(0, 6, 0); scene.add(top);

// Body group
const body = new THREE.Group();
scene.add(body);

// Materials — readable on dark bg
const skinMat  = new THREE.MeshStandardMaterial({color:0x44444c, metalness:.3, roughness:.6});
const wireMat  = new THREE.MeshBasicMaterial({color:0x4a4a52, wireframe:true, transparent:true, opacity:.35});
const suitMat  = new THREE.MeshStandardMaterial({color:0x1a1a20, metalness:.55, roughness:.45});
const accentMat= new THREE.MeshStandardMaterial({color:0x1a1015, metalness:.6, roughness:.4});

// Helpers
function mesh(geom, mat, x, y, z, rx=0, ry=0, rz=0){
  const m = new THREE.Mesh(geom, mat);
  m.position.set(x, y, z); m.rotation.set(rx, ry, rz);
  body.add(m);
  // wireframe overlay for edge visibility on dark bg
  if (mat === skinMat) {
    const w = new THREE.Mesh(geom, wireMat);
    w.position.copy(m.position); w.rotation.copy(m.rotation); w.scale.setScalar(1.002);
    body.add(w);
  }
  return m;
}

// Capsule helper for limbs
function capsule(r, h, mat, x, y, z, rx=0, ry=0, rz=0){
  return mesh(new THREE.CapsuleGeometry(r, h, 8, 16), mat, x, y, z, rx, ry, rz);
}

// Head + headset
mesh(new THREE.SphereGeometry(.20, 32, 24), skinMat, 0, 1.85, 0);
const headset = mesh(new THREE.BoxGeometry(.46, .20, .24), suitMat, 0, 1.86, .06);
headset.geometry.translate(0,0,0);
mesh(new THREE.TorusGeometry(.21, .018, 10, 32), suitMat, 0, 1.85, -.04, 0, Math.PI/2, 0);
// Visor highlight
const visor = mesh(new THREE.BoxGeometry(.42, .08, .005), new THREE.MeshStandardMaterial({color:0x0a0a0c, metalness:.9, roughness:.15}), 0, 1.88, .19);

// Neck
capsule(.07, .08, skinMat, 0, 1.62, 0);

// Torso — tapered capsule
const torsoGeom = new THREE.CylinderGeometry(.40, .34, .92, 32, 4);
mesh(torsoGeom, skinMat, 0, 1.05, 0);

// Pelvis
mesh(new THREE.CylinderGeometry(.34, .30, .24, 24), skinMat, 0, .55, 0);

// Shoulders
mesh(new THREE.SphereGeometry(.13, 20, 16), skinMat,  .42, 1.46, 0);
mesh(new THREE.SphereGeometry(.13, 20, 16), skinMat, -.42, 1.46, 0);

// Upper arms
capsule(.095, .42, skinMat,  .54, 1.18, 0, 0, 0,  .14);
capsule(.095, .42, skinMat, -.54, 1.18, 0, 0, 0, -.14);

// Elbows
mesh(new THREE.SphereGeometry(.082, 16, 14), skinMat,  .62, .88, 0);
mesh(new THREE.SphereGeometry(.082, 16, 14), skinMat, -.62, .88, 0);

// Forearms
capsule(.08, .38, skinMat,  .67, .60, 0, 0, 0,  .08);
capsule(.08, .38, skinMat, -.67, .60, 0, 0, 0, -.08);

// Hands — softer rounded box
const handGeom = new THREE.BoxGeometry(.13, .19, .07);
handGeom.translate(0, -.02, 0);
mesh(handGeom, skinMat,  .72, .32, 0);
mesh(handGeom, skinMat, -.72, .32, 0);

// Suit shell strips — sit slightly outside the skin
const shellMat = new THREE.MeshStandardMaterial({color:0x1c1c20, metalness:.7, roughness:.32});
function shell(r1, r2, h, x, y, z, rx=0, ry=0, rz=0){
  const g = new THREE.CylinderGeometry(r1, r2, h, 24, 1, true);
  const m = new THREE.Mesh(g, shellMat);
  m.position.set(x,y,z); m.rotation.set(rx,ry,rz);
  body.add(m);
}
shell(.422, .362, .94, 0, 1.05, 0);                // torso
shell(.10, .088, .43,  .54, 1.18, 0, 0, 0,  .14);  // R upper
shell(.10, .088, .43, -.54, 1.18, 0, 0, 0, -.14);  // L upper
shell(.085, .075, .39,  .67, .60, 0, 0, 0,  .08);  // R fore
shell(.085, .075, .39, -.67, .60, 0, 0, 0, -.08);  // L fore

// Subtle vertical seam line down chest
const seamMat = new THREE.MeshBasicMaterial({color:0x2a2a30});
mesh(new THREE.BoxGeometry(.004, .9, .005), seamMat, 0, 1.05, .42);

// ============ NODES ============
// Each node: clutch ring + inner core + outer halo
const NODES = [];
function addNode(x, y, z, region){
  NODES.push({pos: new THREE.Vector3(x,y,z), region});
}

// Forearms (8 each = 16)
for (let i=0; i<8; i++){
  const t = i/7;
  const y = .38 + t*.42;
  const ang = (i%2===0) ? 0.55 : -0.55;
  addNode( .67 + Math.sin(ang)*.094 + t*.04, y, Math.cos(ang)*.092, 'forearm');
  addNode(-.67 - Math.sin(ang)*.094 - t*.04, y, Math.cos(ang)*.092, 'forearm');
}
// Hands (3 each = 6)
for (let i=0; i<3; i++){
  const y = .26 + i*.06;
  addNode( .72, y,  .04, 'hand');
  addNode(-.72, y,  .04, 'hand');
}
// Upper arms (5 each = 10)
for (let i=0; i<5; i++){
  const t = i/4;
  const y = .96 + t*.40;
  const ang = (i%2===0) ? 0.5 : -0.5;
  addNode( .54 - t*.04 + Math.sin(ang)*.108, y, Math.cos(ang)*.108, 'upper');
  addNode(-.54 + t*.04 - Math.sin(ang)*.108, y, Math.cos(ang)*.108, 'upper');
}
// Shoulders (2)
addNode( .42, 1.50, .085, 'shoulder');
addNode(-.42, 1.50, .085, 'shoulder');
// Chest (8)
[[.18,1.32,.40],[-.18,1.32,.40],[.22,1.18,.42],[-.22,1.18,.42],
 [.18,1.04,.42],[-.18,1.04,.42],[.22,.88,.40],[-.22,.88,.40]].forEach(p=>addNode(...p,'chest'));
// Back (6)
[[.16,1.28,-.40],[-.16,1.28,-.40],[.20,1.10,-.42],[-.20,1.10,-.42],
 [.18,.92,-.40],[-.18,.92,-.40]].forEach(p=>addNode(...p,'back'));

while (NODES.length > 48) NODES.pop();

// Build node visuals — ring + core + outer halo (all face camera)
const ringGeom = new THREE.RingGeometry(.022, .032, 24);
const coreGeom = new THREE.CircleGeometry(.014, 20);
const haloGeom = new THREE.RingGeometry(.034, .062, 24);

const nodeObjs = NODES.map(n => {
  const grp = new THREE.Group();
  grp.position.copy(n.pos);
  body.add(grp);

  // ring (the clutch housing) — always visible, dim grey
  const ringMat = new THREE.MeshBasicMaterial({color:0x3a3a40, transparent:true, opacity:.85, side:THREE.DoubleSide});
  const ring = new THREE.Mesh(ringGeom, ringMat);
  grp.add(ring);

  // core (lights up when active)
  const coreMat = new THREE.MeshBasicMaterial({color:0x2a2a30, transparent:true, opacity:1, side:THREE.DoubleSide});
  const core = new THREE.Mesh(coreGeom, coreMat);
  core.position.z = .002;
  grp.add(core);

  // halo (pulse when firing)
  const haloMat = new THREE.MeshBasicMaterial({color:0xff4827, transparent:true, opacity:0, side:THREE.DoubleSide, blending:THREE.AdditiveBlending});
  const halo = new THREE.Mesh(haloGeom, haloMat);
  halo.position.z = -.002;
  grp.add(halo);

  return {...n, grp, ring, core, halo, active:0, fire:0};
});

// ============ SCROLL → STAGE ============
const scrollEl = document.getElementById('scrollStage');
const STAGES = 5;
let progress = 0, stageFloat = 0, stage = 0;
function updateProgress(){
  const r = scrollEl.getBoundingClientRect();
  const total = r.height - window.innerHeight;
  const p = Math.min(1, Math.max(0, -r.top / total));
  progress = p;
  stageFloat = p * (STAGES - 1);
  stage = Math.round(stageFloat);
}

const copyBlocks = document.querySelectorAll('.copy-block');
const stagePips  = document.querySelectorAll('.stage-pips span');
function syncDOM(){
  copyBlocks.forEach(b => b.classList.toggle('in', +b.dataset.stage === stage));
  stagePips.forEach(p => p.classList.toggle('active', +p.dataset.i === stage));
  document.getElementById('stageBar').style.width = (progress*100)+'%';
  document.getElementById('frameLabel').textContent = 'FRAME ' + String(Math.floor(progress*9999)).padStart(4,'0');
  document.getElementById('modeLabel').textContent = ['STANDBY','WAKE · DISTAL','WAKE · PROXIMAL','LIVE','IMPACT'][stage];
  document.getElementById('sysStatus').innerHTML = '<span class="pulse"></span>'+['STANDBY','BOOTING','BOOTING','LIVE','ENGAGED'][stage];
  document.getElementById('regionLabel').textContent = ['—','FOREARM · HAND','UPPER BODY','FULL SYSTEM','ARM · SHOULDER'][stage];
  document.getElementById('forceLabel').textContent = ['0.0 N','12.0 N','28.0 N','44.0 N','50.0 N'][stage];
}

// ============ ANIMATE ============
const clock = new THREE.Clock();
let mouseX = 0, mouseY = 0;
window.addEventListener('mousemove', (e) => {
  const r = wrap.getBoundingClientRect();
  if (e.clientX < r.left || e.clientX > r.right) return;
  mouseX = ((e.clientX - r.left) / r.width  - .5) * 2;
  mouseY = ((e.clientY - r.top ) / r.height - .5) * 2;
});

const camPos = new THREE.Vector3();

function regionThreshold(region){
  return ({forearm:0.5, hand:0.5, upper:1.5, shoulder:1.5, chest:1.5, back:1.5})[region] ?? 1.5;
}

function animate(){
  updateProgress();
  syncDOM();

  const t = clock.getElapsedTime();
  const orbit = progress * Math.PI * .55 - .15 + mouseX * .25;
  const tilt  = -.04 + mouseY * .08;
  body.rotation.y += (orbit - body.rotation.y) * .08;
  body.rotation.x += (tilt  - body.rotation.x) * .08;
  body.position.y = Math.sin(t*.4)*.018;

  // Camera punch on impact stage
  const impact = Math.max(0, stageFloat - 3.6) * 2.5;
  camera.position.z = 4.6 - impact * .35 + Math.sin(t*30)*impact*.03;

  // World cam pos for billboard
  camera.getWorldPosition(camPos);

  let activeCount = 0;
  nodeObjs.forEach((n, i) => {
    const stagger = (i / nodeObjs.length) * 0.5; // wave across body
    const th = regionThreshold(n.region);
    let target = Math.max(0, Math.min(1, (stageFloat - th - stagger*.3) / 0.7 + 0.15));

    // Impact stage — pulse on the arm
    let firing = 0;
    if (stageFloat > 3.4 && (n.region === 'forearm' || n.region === 'upper' || n.region === 'shoulder' || n.region === 'hand')){
      const punch = Math.min(1, (stageFloat - 3.4) / 0.4);
      const wave = .5 + .5*Math.sin(t*10 + i*.4);
      firing = punch * wave;
      target = Math.max(target, .85);
    }

    n.active += (target - n.active) * .12;
    n.fire   += (firing - n.fire)   * .25;

    if (n.active > .5) activeCount++;

    // Billboard — face camera
    n.grp.lookAt(camPos);

    // Ring color — grey -> hot orange
    const a = n.active;
    n.ring.material.color.setRGB(.22 + a*.78, .22 + a*.06, .22 - a*.08);
    n.ring.material.opacity = .55 + a*.45;

    // Core dot — dark -> bright orange
    n.core.material.color.setRGB(.16 + a*.84, .16 + a*.13, .16 - a*.05);

    // Halo — only visible when active, brighter when firing
    const haloOp = a*.35 + n.fire*.55;
    n.halo.material.opacity = haloOp;
    const haloScale = 1 + a*.4 + n.fire*1.6;
    n.halo.scale.setScalar(haloScale);

    // Subtle z-pop on firing nodes
    n.grp.scale.setScalar(1 + n.fire*.18);
  });

  document.getElementById('activeCount').textContent = activeCount;

  renderer.render(scene, camera);
  requestAnimationFrame(animate);
}
animate();

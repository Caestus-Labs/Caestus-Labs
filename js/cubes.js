// Caestus Labs — Coming Soon background.
// Ports the "Presence" cube floor from the archived vr-experience scene
// (3500 instanced peach cubes, cursor-lift shader, bloom) and adapts it for
// a static page: no scroll, no stage transitions, just an ambient living floor
// the cursor pushes around.

import * as THREE from 'three'
import { EffectComposer } from 'three/addons/postprocessing/EffectComposer.js'
import { RenderPass } from 'three/addons/postprocessing/RenderPass.js'
import { UnrealBloomPass } from 'three/addons/postprocessing/UnrealBloomPass.js'
import { OutputPass } from 'three/addons/postprocessing/OutputPass.js'

const canvas = document.getElementById('cubes')
if (!canvas) throw new Error('cubes canvas missing')

// ---------- Renderer ----------
const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: false })
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
renderer.outputColorSpace = THREE.SRGBColorSpace
renderer.toneMapping = THREE.ACESFilmicToneMapping
renderer.toneMappingExposure = 1.25

const scene = new THREE.Scene()
scene.background = new THREE.Color(0x140909)
scene.fog = new THREE.Fog(0x2a1410, 8, 30)

const camera = new THREE.PerspectiveCamera(60, 1, 0.05, 80)
camera.position.set(0, 0.35, 4.2)
camera.lookAt(0, 0.4, -3)

// ---------- Bloom pipeline ----------
const composer = new EffectComposer(renderer)
composer.addPass(new RenderPass(scene, camera))
const bloom = new UnrealBloomPass(
  new THREE.Vector2(window.innerWidth, window.innerHeight),
  0.75, // strength
  0.95, // radius
  0.20  // threshold — low so background cubes still bloom
)
composer.addPass(bloom)
composer.addPass(new OutputPass())

// ---------- Lights ----------
scene.add(new THREE.HemisphereLight(0x2a1a20, 0x050507, 0.45))

const key = new THREE.DirectionalLight(0xffccaa, 0.7)
key.position.set(0, 6, 2)
scene.add(key)

const warmFill = new THREE.PointLight(0xff4a2a, 1.4, 18, 1.6)
warmFill.position.set(0, 0.2, 0)
scene.add(warmFill)

const coolRim = new THREE.PointLight(0x4fb3ff, 0.9, 16, 1.2)
coolRim.position.set(0, -0.8, -3.5)
scene.add(coolRim)

// ---------- Cube field ----------
const CUBE_COUNT = 3500
const cubeGeom = new THREE.BoxGeometry(0.14, 0.14, 0.14)

const cubeMat = new THREE.MeshStandardMaterial({
  color: 0xff6b4a,
  roughness: 0.5,
  metalness: 0.1,
  emissive: 0xff3020,
  emissiveIntensity: 0.08
})

const uniforms = {
  uTime: { value: 0 },
  uCursor: { value: new THREE.Vector3(0, 0, 0) },
  uSigma: { value: 4.0 },
  uRippleSpeed: { value: 1.4 },
  uRippleFreq: { value: 3.2 }
}

cubeMat.onBeforeCompile = (shader) => {
  shader.uniforms.uTime = uniforms.uTime
  shader.uniforms.uCursor = uniforms.uCursor
  shader.uniforms.uSigma = uniforms.uSigma
  shader.uniforms.uRippleSpeed = uniforms.uRippleSpeed
  shader.uniforms.uRippleFreq = uniforms.uRippleFreq
  shader.vertexShader =
    `
    uniform float uTime;
    uniform vec3 uCursor;
    uniform float uSigma;
    uniform float uRippleSpeed;
    uniform float uRippleFreq;
    attribute float aSeed;
    varying float vLift;
  ` + shader.vertexShader.replace(
      '#include <begin_vertex>',
      `
      vec3 transformed = vec3(position);
      vec4 worldPos = instanceMatrix * vec4(0.0, 0.0, 0.0, 1.0);
      vec3 pxyz = worldPos.xyz;

      // Distance on the floor plane only — keeps ripples reading as concentric
      // rings on the surface even for sky/sphere cubes.
      vec2 toCursor = pxyz.xz - uCursor.xz;
      float d = length(toCursor);

      // Gaussian envelope — wide and soft, fades the ripple far from cursor.
      float env = exp(-(d*d) / (uSigma*uSigma));

      // Slow ambient swell so the field breathes when nothing's happening.
      float baseWave = sin(uTime * 0.45 + aSeed * 6.2831 + pxyz.x * 0.22) * 0.05
                     + sin(uTime * 0.30 + aSeed * 3.0    + pxyz.z * 0.16) * 0.035;

      // Outgoing traveling wave: phase = d*k - t*omega so crests march away
      // from cursor. Two harmonics give a softer, water-like beat.
      float phase  = d * uRippleFreq - uTime * uRippleSpeed * uRippleFreq;
      float ripple = sin(phase) * 0.22
                   + sin(phase * 0.5 - uTime * 0.6) * 0.10;
      ripple *= env;

      float lift = baseWave + ripple;

      // Gentle radial nudge inward so cubes near the cursor lean toward the
      // ring crest instead of jumping vertically.
      vec2 radial = d > 0.0001 ? toCursor / d : vec2(0.0);
      transformed.xz += radial * env * sin(phase) * 0.05;
      transformed.y  += lift;

      // Slight twist near the cursor — keeps the surface alive without spikes.
      float rotAngle = env * sin(uTime * 0.6 + aSeed * 3.14) * 0.25;
      mat2 rot = mat2(cos(rotAngle), -sin(rotAngle), sin(rotAngle), cos(rotAngle));
      transformed.xz = rot * transformed.xz;

      vLift = lift;
    `
    )
  shader.fragmentShader =
    `
    varying float vLift;
  ` + shader.fragmentShader.replace(
      '#include <emissivemap_fragment>',
      `
      #include <emissivemap_fragment>
      float glow = clamp(vLift * 2.0, 0.0, 1.0);
      totalEmissiveRadiance += vec3(1.0, 0.32, 0.18) * glow * 0.5;
      diffuseColor.rgb = mix(vec3(0.95, 0.55, 0.45), vec3(1.0, 0.42, 0.32), glow);
    `
    )
}

const cubeMesh = new THREE.InstancedMesh(cubeGeom, cubeMat, CUBE_COUNT)
const seeds = new Float32Array(CUBE_COUNT)
const dummy = new THREE.Object3D()

// Four-pool distribution: dense floor · mid-air sphere · sky layer · scatter.
// The sky layer is the new addition — larger, brighter cubes filling the top
// half of the frame so the overhead area reads as part of the same world
// instead of going dark.
for (let i = 0; i < CUBE_COUNT; i++) {
  let x, y, z, s

  if (i < CUBE_COUNT * 0.40) {
    // Dense floor grid
    const gridSize = 15
    const gi = i % (gridSize * gridSize)
    const gx = (gi % gridSize) / gridSize - 0.5
    const gz = Math.floor(gi / gridSize) / gridSize - 0.5
    x = gx * 14 + (Math.random() - 0.5) * 0.8
    y = -1.15 + Math.random() * 0.3
    z = gz * 14 + (Math.random() - 0.5) * 0.8 - 4
    s = 0.45 + Math.random() * 0.5
  } else if (i < CUBE_COUNT * 0.65) {
    // Floating spherical shell around the camera
    const phi = Math.random() * Math.PI * 2
    const theta = Math.acos(1 - 2 * Math.random())
    const r = 3.5 + Math.random() * 5
    x = r * Math.sin(theta) * Math.cos(phi)
    y = r * Math.sin(theta) * Math.sin(phi) - 0.4
    z = r * Math.cos(theta) - 4
    s = 0.5 + Math.random() * 0.7
  } else if (i < CUBE_COUNT * 0.90) {
    // Sky layer — bigger cubes overhead, sparse but bright
    x = (Math.random() - 0.5) * 18
    y = 1.4 + Math.random() * 5.5
    z = -10 + Math.random() * 14
    s = 0.7 + Math.random() * 1.1
  } else {
    // Long-range scatter for far-distance depth
    x = (Math.random() - 0.5) * 22
    y = -1 + Math.random() * 7
    z = -16 + Math.random() * 6
    s = 0.6 + Math.random() * 1.0
  }

  x = Math.max(-12, Math.min(12, x))
  y = Math.max(-1.5, Math.min(7, y))
  z = Math.max(-16, Math.min(5, z))

  dummy.position.set(x, y, z)
  dummy.scale.set(s, s, s)
  dummy.rotation.set(
    Math.random() * Math.PI * 2,
    Math.random() * Math.PI * 2,
    Math.random() * Math.PI * 2
  )
  dummy.updateMatrix()
  cubeMesh.setMatrixAt(i, dummy.matrix)
  seeds[i] = Math.random()
}

cubeGeom.setAttribute('aSeed', new THREE.InstancedBufferAttribute(seeds, 1))
cubeMesh.instanceMatrix.needsUpdate = true
scene.add(cubeMesh)

// ---------- Cursor → world point ----------
// Lower damping = ripple trails the pointer. ~0.06 looks like syrup;
// 0.18 was near-instant.
const mouse = { x: 0, y: 0, tx: 0, ty: 0 }
const DAMPING = 0.06

let lastPointerAt = 0
const POINTER_PRIORITY_MS = 1500

window.addEventListener('pointermove', (e) => {
  mouse.tx = (e.clientX / window.innerWidth) * 2 - 1
  mouse.ty = -((e.clientY / window.innerHeight) * 2 - 1)
  lastPointerAt = performance.now()
}, { passive: true })

// Touchmove fires even when pointermove is throttled on some Android browsers.
window.addEventListener('touchmove', (e) => {
  const t = e.touches[0]
  if (!t) return
  mouse.tx = (t.clientX / window.innerWidth) * 2 - 1
  mouse.ty = -((t.clientY / window.innerHeight) * 2 - 1)
  lastPointerAt = performance.now()
}, { passive: true })

function onOrientation(e) {
  if (e.gamma == null || e.beta == null) return
  // If the user is actively dragging, let the finger lead — gyro takes over
  // again after POINTER_PRIORITY_MS of stillness.
  if (performance.now() - lastPointerAt < POINTER_PRIORITY_MS) return

  // Map raw beta/gamma to screen-aligned tilt so landscape (Android) feels
  // the same as portrait. screen.orientation.angle is 0/90/180/270.
  const angle = (screen.orientation && screen.orientation.angle) || window.orientation || 0
  let gx, gy
  switch (angle) {
    case 90:  gx =  e.beta;   gy = -e.gamma; break
    case -90:
    case 270: gx = -e.beta;   gy =  e.gamma; break
    case 180: gx = -e.gamma;  gy = -e.beta;  break
    default:  gx =  e.gamma;  gy =  e.beta;  break
  }
  mouse.tx = Math.max(-1, Math.min(1, (gx / 45) * 0.6))
  mouse.ty = Math.max(-1, Math.min(1, (gy / 45) * 0.6))
}

// iOS 13+ requires explicit permission, granted from a user gesture.
const NeedsOrientationPermission =
  typeof DeviceOrientationEvent !== 'undefined' &&
  typeof DeviceOrientationEvent.requestPermission === 'function'

if (NeedsOrientationPermission) {
  const ask = async () => {
    try {
      const res = await DeviceOrientationEvent.requestPermission()
      if (res === 'granted') {
        window.addEventListener('deviceorientation', onOrientation)
      }
    } catch {
      // user denied or non-secure context — fall back to touch only
    } finally {
      window.removeEventListener('touchend', ask)
      window.removeEventListener('click', ask)
    }
  }
  window.addEventListener('touchend', ask, { once: true, passive: true })
  window.addEventListener('click', ask, { once: true })
} else {
  window.addEventListener('deviceorientation', onOrientation)
}

// ---------- Resize ----------
function resize() {
  const w = window.innerWidth
  const h = window.innerHeight
  renderer.setSize(w, h, false)
  composer.setSize(w, h)
  bloom.setSize(w, h)
  camera.aspect = w / h
  camera.updateProjectionMatrix()
}
resize()
window.addEventListener('resize', resize)

// ---------- Animate ----------
const clock = new THREE.Clock()
const cursorWorld = new THREE.Vector3()
const ndcVec = new THREE.Vector3()

const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches

function animate() {
  const t = clock.getElapsedTime()
  uniforms.uTime.value = t

  // Smooth cursor towards target
  mouse.x += (mouse.tx - mouse.x) * DAMPING
  mouse.y += (mouse.ty - mouse.y) * DAMPING

  // Project NDC cursor to a fixed plane in front of the camera
  ndcVec.set(mouse.x, mouse.y, 0.5).unproject(camera)
  const dir = ndcVec.sub(camera.position).normalize()
  const planeY = -0.6
  const tHit = (planeY - camera.position.y) / dir.y
  cursorWorld.copy(camera.position).addScaledVector(dir, tHit)
  uniforms.uCursor.value.copy(cursorWorld)

  // Subtle ambient camera drift so the field never feels frozen
  if (!reduced) {
    camera.position.x = mouse.x * 0.4
    camera.position.y = 0.55 + mouse.y * 0.25 + Math.sin(t * 0.3) * 0.04
    camera.lookAt(0, -0.2, -2)
  }

  composer.render()
  requestAnimationFrame(animate)
}
requestAnimationFrame(animate)

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

const CLICK_SLOTS = 4

const uniforms = {
  uTime: { value: 0 },
  uMouseNdc: { value: new THREE.Vector2(0, 0) },
  uAspect: { value: window.innerWidth / window.innerHeight },
  uSigma: { value: 0.32 },                    // glow radius in screen-space NDC
  uCursorWorld: { value: new THREE.Vector3(0, -0.6, -2) },
  uClickWorlds: {
    value: Array.from({ length: CLICK_SLOTS }, () => new THREE.Vector3(0, -0.6, -2))
  },
  uClickTimes: { value: new Array(CLICK_SLOTS).fill(-100) }
}

cubeMat.onBeforeCompile = (shader) => {
  shader.uniforms.uTime = uniforms.uTime
  shader.uniforms.uMouseNdc = uniforms.uMouseNdc
  shader.uniforms.uAspect = uniforms.uAspect
  shader.uniforms.uSigma = uniforms.uSigma
  shader.uniforms.uCursorWorld = uniforms.uCursorWorld
  shader.uniforms.uClickWorlds = uniforms.uClickWorlds
  shader.uniforms.uClickTimes = uniforms.uClickTimes

  // Screen-space glow: project each instance to NDC, measure 2D distance to
  // the cursor, and use that as a Gaussian "lit-up" envelope. No traveling
  // wave — cubes simply gather/glow around wherever the pointer is, regardless
  // of depth (so sky cubes near the top of the screen react too).
  shader.vertexShader =
    `
    uniform float uTime;
    uniform vec2 uMouseNdc;
    uniform float uAspect;
    uniform float uSigma;
    uniform vec3 uCursorWorld;
    uniform vec3 uClickWorlds[4];
    uniform float uClickTimes[4];
    attribute float aSeed;
    varying float vGlow;
    ` + shader.vertexShader
      .replace(
        '#include <begin_vertex>',
        `
        vec3 transformed = vec3(position);

        vec3 pxyz = (instanceMatrix * vec4(0.0, 0.0, 0.0, 1.0)).xyz;

        // Project the instance center to clip space → NDC for screen-space envelope.
        vec4 instClip = projectionMatrix * viewMatrix * vec4(pxyz, 1.0);
        vec2 instNdc  = instClip.xy / max(instClip.w, 0.0001);

        // Aspect-corrected screen distance so the glow stays circular.
        vec2 toMouse = instNdc - uMouseNdc;
        toMouse.x *= uAspect;
        float screenD = length(toMouse);

        // Gaussian envelope in NDC; cubes behind the camera get nothing.
        float inFront = step(0.0, instClip.w);
        float env = exp(-(screenD * screenD) / (uSigma * uSigma)) * inFront;

        // Ambient breathing so the field is never frozen.
        float baseWave = sin(uTime * 0.45 + aSeed * 6.2831) * 0.05
                       + sin(uTime * 0.30 + aSeed * 3.0)    * 0.035;

        // Per-cube shimmer near cursor — visible movement, not just glow.
        float pulse = sin(uTime * 1.8 + aSeed * 6.2831) * 0.12;
        float worldLift = baseWave + env * (0.22 + pulse);

        // GATHER: pull cubes inward in world XZ toward the cursor's floor
        // projection, weighted by the screen-space envelope. Per-cube jitter
        // (driven by aSeed + time) makes the swarm look alive instead of glassy.
        vec2 toCursorXZ = uCursorWorld.xz - pxyz.xz;
        vec2 jitter = vec2(
          sin(uTime * 2.7 + aSeed * 12.5),
          cos(uTime * 2.1 + aSeed * 7.3)
        ) * 0.45;
        vec2 gatherXZ = (toCursorXZ + jitter) * env * 0.22;

        // CLICK BURST: per-cube smooth wave-arrival model.
        // Instead of a thin ring shell sweeping past (which made each cube
        // feel a brief blip), every cube computes its own arrival time based
        // on distance, then plays a smooth ease-in + exponential decay curve.
        // This gives a sustained, fluid outward motion — not a hard pulse.
        // CLICK BURSTS — single uniform timeline, no per-cube wave arrival.
        // All cubes move at the same instant (kills the layer-by-layer ring
        // look) with a soft 1/(1+d²) distance falloff so far cubes still get
        // a meaningful push. Three phases per click:
        //   GATHER   0.00 → 0.45s   all cubes pull INWARD toward the click
        //   SHOOT    0.40 → 1.6s   all cubes push OUTWARD (transient kick)
        //   SETTLE   0.40s onward   permanent outward offset = HOLE that stays
        float depthScale = smoothstep(0.4, 2.5, instClip.w);
        float magJitter = 0.78 + sin(aSeed * 23.1) * 0.22;

        vec2 burstPushXZ = vec2(0.0);
        float burstLift  = 0.0;
        float burstGlow  = 0.0;

        for (int i = 0; i < 4; i++) {
          float clickTime = uClickTimes[i];
          vec3 clickWorld = uClickWorlds[i];
          float burstAge = uTime - clickTime;
          if (burstAge < 0.0) continue;

          vec2 toClickXZ = pxyz.xz - clickWorld.xz;
          float clickDist = length(toClickXZ);
          vec2 outDir = clickDist > 0.0001 ? toClickXZ / clickDist : vec2(0.0);

          // Soft, wide distance falloff so far cubes still react meaningfully.
          // d=0 → 1.0, d=5 → 0.77, d=10 → 0.45, d=20 → 0.17
          float falloff = 1.0 / (1.0 + clickDist * clickDist * 0.012);

          // GATHER: pulls everything inward, peaks at ~0.18s, fades by ~0.45s
          float gather = smoothstep(0.0, 0.18, burstAge)
                       * (1.0 - smoothstep(0.30, 0.45, burstAge));

          // SHOOT + SETTLE share an age, both starting after the gather peaks
          float shootAge = burstAge - 0.38;
          float shoot  = shootAge > 0.0
            ? smoothstep(0.0, 0.20, shootAge) * exp(-shootAge * 0.85)
            : 0.0;
          float settle = shootAge > 0.0 ? smoothstep(0.0, 0.65, shootAge) : 0.0;

          // Per-cube angular wobble + magnitude jitter — organic edges.
          float wobble = sin(aSeed * 31.7) * 0.4;
          vec2 chaosDir = vec2(cos(wobble), sin(wobble));
          vec2 dirNoisy = normalize(outDir + chaosDir * 0.3);

          float baseScale = falloff * magJitter * depthScale;

          burstPushXZ += -outDir  * gather  * falloff * 0.55 * depthScale;
          burstPushXZ +=  dirNoisy * shoot  * baseScale * 1.35;
          burstPushXZ +=  dirNoisy * settle * baseScale * 0.55;

          burstLift   += gather   * falloff * 0.14 * depthScale;
          burstLift   += shoot    * baseScale * (0.35 + sin(aSeed * 17.0) * 0.18);
          burstLift   += settle   * baseScale * 0.14;

          burstGlow = max(burstGlow, max(gather * 0.45, shoot * 0.65) * falloff);
        }

        vGlow = max(env, burstGlow);
        `
      )
      .replace(
        '#include <project_vertex>',
        `
        vec4 mvPosition = vec4(transformed, 1.0);
        #ifdef USE_INSTANCING
          mvPosition = instanceMatrix * mvPosition;
        #endif
        // Apply all displacements in world space, after instance rotation.
        mvPosition.y  += worldLift + burstLift;
        mvPosition.xz += gatherXZ + burstPushXZ;
        mvPosition = modelViewMatrix * mvPosition;
        gl_Position = projectionMatrix * mvPosition;
        `
      )

  shader.fragmentShader =
    `
    varying float vGlow;
    ` + shader.fragmentShader.replace(
      '#include <emissivemap_fragment>',
      `
      #include <emissivemap_fragment>
      float g = clamp(vGlow, 0.0, 1.0);
      totalEmissiveRadiance += vec3(1.0, 0.34, 0.18) * g * 0.45;
      diffuseColor.rgb = mix(vec3(0.95, 0.55, 0.45), vec3(1.0, 0.50, 0.36), g * 0.6);
      `
    )
}

const cubeMesh = new THREE.InstancedMesh(cubeGeom, cubeMat, CUBE_COUNT)
const seeds = new Float32Array(CUBE_COUNT)
const dummy = new THREE.Object3D()

// Five-pool distribution: dense floor · core fill · mid-air sphere · sky · scatter.
// The "core fill" pool plugs the empty pocket inside the spherical shell that
// used to read as a dark hole right where the camera looks.
for (let i = 0; i < CUBE_COUNT; i++) {
  let x, y, z, s

  if (i < CUBE_COUNT * 0.36) {
    // Dense floor grid
    const gridSize = 15
    const gi = i % (gridSize * gridSize)
    const gx = (gi % gridSize) / gridSize - 0.5
    const gz = Math.floor(gi / gridSize) / gridSize - 0.5
    x = gx * 14 + (Math.random() - 0.5) * 0.8
    y = -1.15 + Math.random() * 0.3
    z = gz * 14 + (Math.random() - 0.5) * 0.8 - 4
    s = 0.45 + Math.random() * 0.5
  } else if (i < CUBE_COUNT * 0.52) {
    // Core fill — fills the inner sphere (r=0.6 → 3.5) the shell pool skipped.
    // This is what removes the central "hole" in the field of view.
    const phi = Math.random() * Math.PI * 2
    const theta = Math.acos(1 - 2 * Math.random())
    const r = 0.6 + Math.random() * 2.9
    x = r * Math.sin(theta) * Math.cos(phi)
    y = r * Math.sin(theta) * Math.sin(phi) - 0.2
    z = r * Math.cos(theta) - 3.2
    s = 0.35 + Math.random() * 0.5
  } else if (i < CUBE_COUNT * 0.72) {
    // Floating spherical shell around the camera
    const phi = Math.random() * Math.PI * 2
    const theta = Math.acos(1 - 2 * Math.random())
    const r = 3.5 + Math.random() * 5
    x = r * Math.sin(theta) * Math.cos(phi)
    y = r * Math.sin(theta) * Math.sin(phi) - 0.4
    z = r * Math.cos(theta) - 4
    s = 0.5 + Math.random() * 0.7
  } else if (i < CUBE_COUNT * 0.92) {
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
const DAMPING = 0.18

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
  uniforms.uAspect.value = w / h
}
resize()
window.addEventListener('resize', resize)

// ---------- Animate ----------
const clock = new THREE.Clock()
const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches

const FLOOR_Y = -0.6
const tmpNdc = new THREE.Vector3()
const tmpDir = new THREE.Vector3()
const tmpWorld = new THREE.Vector3()

// Ray-cast NDC → floor plane, with safety clamps for when the cursor is
// above the camera horizon (which would otherwise blow up the projection).
function ndcToFloor(nx, ny, out) {
  tmpNdc.set(nx, ny, 0.5).unproject(camera)
  tmpDir.copy(tmpNdc).sub(camera.position).normalize()
  const safeDirY = Math.min(tmpDir.y, -0.05)
  const tHit = Math.min((FLOOR_Y - camera.position.y) / safeDirY, 18)
  out.copy(camera.position).addScaledVector(tmpDir, tHit)
  out.x = Math.max(-12, Math.min(12, out.x))
  out.y = FLOOR_Y
  out.z = Math.max(-16, Math.min(5, out.z))
  return out
}

// Click → outward burst, ring-buffered into one of CLICK_SLOTS so successive
// clicks each leave their own persistent hole.
let nextClickSlot = 0
function fireBurst(clientX, clientY) {
  const nx = (clientX / window.innerWidth) * 2 - 1
  const ny = -((clientY / window.innerHeight) * 2 - 1)
  ndcToFloor(nx, ny, tmpWorld)
  const slot = nextClickSlot
  uniforms.uClickWorlds.value[slot].copy(tmpWorld)
  uniforms.uClickTimes.value[slot] = clock.getElapsedTime()
  nextClickSlot = (nextClickSlot + 1) % CLICK_SLOTS
}
window.addEventListener('pointerdown', (e) => {
  // Skip clicks on UI elements (buttons, modal, etc).
  if (e.target && e.target.closest('button, a, input, select, [role="dialog"]')) return
  fireBurst(e.clientX, e.clientY)
}, { passive: true })

function animate() {
  const t = clock.getElapsedTime()
  uniforms.uTime.value = t

  mouse.x += (mouse.tx - mouse.x) * DAMPING
  mouse.y += (mouse.ty - mouse.y) * DAMPING

  uniforms.uMouseNdc.value.set(mouse.x, mouse.y)
  ndcToFloor(mouse.x, mouse.y, uniforms.uCursorWorld.value)

  // Camera both translates AND rotates with the cursor so the world feels
  // like it's actually turning, not just panning a flat backdrop.
  if (!reduced) {
    camera.position.x = mouse.x * 0.9 + Math.sin(t * 0.27) * 0.05
    camera.position.y = 0.55 + mouse.y * 0.45 + Math.sin(t * 0.3) * 0.05
    camera.position.z = 4.2 + mouse.y * 0.25
    // LookAt target leans the same direction as the cursor — exaggerates
    // the parallax so foreground vs background separate visibly.
    const lookX = mouse.x * 1.2
    const lookY = -0.2 + mouse.y * 0.55
    camera.lookAt(lookX, lookY, -2)
  }

  composer.render()
  requestAnimationFrame(animate)
}
requestAnimationFrame(animate)

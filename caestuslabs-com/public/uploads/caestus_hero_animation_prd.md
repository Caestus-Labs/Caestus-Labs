# PRD: Caestus Labs Hero Animation

**Owner:** James
**Audience:** Claude (implementation), future frontend contributors
**Target surface:** Caestus Labs marketing site, hero section (above the fold, pinned through two additional scroll stages)
**Last updated:** April 20, 2026

---

## 1. Context

Caestus Labs builds haptic VR wearables: servo-driven arm resistance synchronized with the virtual environment. The thesis is **"VR you can feel"**. Pressure, mass, and resistance rendered physically.

The hero animation has to communicate that thesis in under **~6 seconds of engaged scroll**, without copy carrying the load. The visitor should move from *looking at a headset* → *understanding it's a real device with craft* → *being inside an environment that reacts to them*. The cursor-reactive virtual room is the metaphor for haptic responsiveness: the world pushes back when you move.

This is a hero, not a full page. Scope is disciplined.

---

## 2. Objective

Build a **scroll-jacked, three-stage 3D animation** as the Caestus Labs landing page hero. Single hyperrealistic VR headset, three camera states driven by vertical scroll, cursor position modulating motion in every stage.

### Success criteria

- Interactive in **< 2.5s** on M2 MacBook / mid-tier Android.
- Sustains **60fps** on desktop Chrome/Safari.
- Sustains **≥ 30fps** on mobile Safari.
- All three stages are reachable **and reversible** via scroll (scroll up returns you).
- Cursor tracking feels **< 16ms perceived latency** under normal pointer motion.
- **Zero CLS** from hero transitioning into downstream sections.

### Non-goals

- No WebXR / real VR mode. This is a marketing visualization.
- No audio.
- No exit state from stage 3: it idles indefinitely (per owner direction).
- No copy animations in this PRD (leave slot; copy lives in a separate overlay).

---

## 3. Three-stage flow

Total scroll range: **3× viewport height**, pinned. Stage slices are 0.00 → 0.33, 0.33 → 0.66, 0.66 → 1.00, with **0.05 overlap** at boundaries for cross-fade.

### Stage 1: front-facing headset (scroll 0 → 0.33)

- Camera dead-on, headset fills **~40% of viewport** vertically, horizontally centered.
- Headset orientation: **both lenses facing camera**. Viewer sees the two dark lens assemblies, face gasket, strap curling behind.
- Subtle floating idle: **±0.5° sine oscillation** on pitch, 4s period.
- Cursor tracking: headset yaws to face cursor.
  - `rotation.y = lerp(current, mouseX * 0.14, 0.08)` (±8°)
  - `rotation.x = lerp(current, -mouseY * 0.09, 0.08)` (±5°)
- Background: off-white studio void with soft radial gradient (lighter center).
- Lighting: 3-point rig. Key top-right, fill bottom-left, rim behind to catch lens bezel edge.
- Shadow: single soft contact shadow under where the headset "floats".

### Stage 2: side profile (scroll 0.33 → 0.66)

- Camera orbits **+90° on Y axis** around the headset origin, slight inward dolly (**~15%** closer).
- Transition duration mapped to scroll: linear 1:1 with progress, eased via `cubicBezier(0.4, 0, 0.2, 1)` on camera position interpolation.
- End state: viewer sees the **side profile**. Strap mechanism, side sensor array, IPD adjustment wheel, housing curvature all visible.
- Cursor tracking flips axis mapping (yaw would hide the side we just revealed):
  - `rotation.x = mouseY * 0.10` (pitch)
  - `rotation.z = mouseX * 0.06` (roll)
- Lighting rig follows camera at 70% intensity to preserve key direction relative to the headset.
- At scroll 0.65, camera has re-positioned to align with the **left lens centerline**, primed for stage 3 dolly-in.

### Stage 3: inside VR (scroll 0.66 → 1.00)

- Camera dollies **into the left lens**. Lens glass transition:
  - 0.66 → 0.72: DoF near-plane pulls in, lens material opacity fades 1.0 → 0.0
  - 0.72: **bloom flash** (white-out peak ~0.3s equivalent scroll window)
  - 0.72 → 0.80: reveal VR environment, camera settles at interior eye height
  - 0.80 → 1.00: cursor-driven idle motion in the room, no more forward translation
- Interior scene:
  - Minimalist white room (matches reference aesthetic in the uploaded image).
  - Floor has a visible **blue guardian boundary rectangle** glowing at perimeter, Quest-style, `#4FB3FF`.
  - Red/coral grid structures: instanced cube field covering the floor inside the guardian box, extending up into a vertical grid pattern on the near wall.
  - Ambient top-down light plus per-cube emission.
- Loop behavior: stage 3 **idles forever** once reached. Scrolling back returns to stage 2 normally.

---

## 4. Tech stack

- **Framework:** Next.js 14+ (App Router) + React 18
- **3D:** `three` r160+, `@react-three/fiber`, `@react-three/drei`
- **Post:** `@react-three/postprocessing` (Bloom, Vignette, DepthOfField)
- **Scroll orchestration:** GSAP + ScrollTrigger
- **Smooth scroll:** Lenis, synced to ScrollTrigger via `scrollerProxy`
- **Dev tuning:** `leva` (removed in production build)
- **Compression:** Draco + Meshopt for GLB

---

## 5. Scene architecture

```
<HeroSection>                     // 300vh wrapper, pinned
  <Canvas>                        // position: fixed, full viewport
    <Suspense fallback={LowPolyHeadset}>
      <HeadsetModel />            // opacity 1.0 during stages 1-2
      <InteriorScene />           // opacity 1.0 during stage 3
      <CameraRig />               // reads scroll progress, drives position/rotation/fov
      <Lighting />
      <PostFX />
    </Suspense>
  </Canvas>
  <CopyOverlay />                 // z-index above canvas, reserved for later
</HeroSection>
```

- Scroll progress (0 → 1) is the single source of truth. It drives camera, material opacities, post-effects, and stage visibility.
- Cursor state lives in a Zustand store (or lightweight context) to avoid prop drilling into shader uniforms.

---

## 6. Headset asset

**Requirement: hyperrealistic.** Quest 3 form factor as the reference since it matches the Caestus prototype.

- Format: GLB, Draco-compressed.
- Budget: **< 2MB** compressed on the wire.
- PBR materials: **2K textures** for albedo, roughness, normal, metalness.
- Hero detail requirements:
  - Lens glass: real glass material with cubemap reflection at low intensity, slight internal tint.
  - Fabric strap: visible weave on normal map, subtle sheen.
  - Plastic housing: micro-scratch roughness variation, not mirror-smooth.
  - Logo: debossed or subtly embossed, not decal-flat.
- Sourcing options:
  - **Preferred:** Sketchfab paid Quest 3 asset with PBR channels. Budget **~$30-80**.
  - **Fallback:** commission on Fiverr / Blender Market, ~$150-300, 1 week turnaround.
  - **Not acceptable:** untextured primitive assembly, low-poly untextured, or any model under **15k tris** for the hero shot.
- Neutral pose required (strap closed, no default animations).

---

## 7. Cursor interaction model

### Shared plumbing

- Normalize pointer to `{ x: [-1, 1], y: [-1, 1] }` on `pointermove`.
- Damping: `lerp(current, target, 0.08)` per frame.
- Mobile fallback: `deviceorientation` (`gamma` → x, `beta` → y), amplitude scaled to **0.4×** desktop.
- Cursor state is written once per frame from the render loop, not per event.

### Per-stage mapping

| Stage | Axis driven by cursor | Max amplitude | Notes |
|---|---|---|---|
| 1 | `rotation.y`, `rotation.x` | ±8°, ±5° | Headset "looks at" cursor |
| 2 | `rotation.x`, `rotation.z` | ±6°, ±3° | Yaw locked to preserve profile reveal |
| 3 | Cube field displacement | See §8 | Cursor projected to ground plane |

### Stage 3 field projection

- Cast ray from camera through cursor screen position to the **y = 0** plane.
- Intersection point `P = (px, 0, pz)` is the cursor's 3D anchor.
- `P` is passed as a uniform `uCursor` to the cube instanced shader.

---

## 8. Cube field behavior (stage 3)

**Design intent per owner:** cursor influences **drift**, not literal sculpting. Cubes are always moving; cursor biases their motion.

### Base motion (always on)

- Instanced mesh, **2500 cubes desktop / 1200 mobile**.
- Arrangement: jittered grid across the guardian rectangle plus a vertical grid on the near wall.
- Each cube has a per-instance seed `s` (random, stable across frames).
- Vertical oscillation: `y = baseY + sin(time * 0.6 + s * 6.28) * 0.15 + simplex(s, time * 0.2) * 0.1`
- Color: gradient from `#FFB5A0` (base) to `#FF4444` (peak emission), mapped to current `y` offset.

### Cursor bias layer

- For each cube: `d = length(cubePos.xz - uCursor.xz)`
- Falloff: `f = exp(-d*d / (sigma*sigma))`, **sigma ≈ 2.5** world units.
- Amplitude boost: cubes within the falloff radius get up to **3× vertical amplitude** and a slight horizontal drift velocity biased away from cursor.
- Drift velocity: `v.xz += normalize(cubePos.xz - uCursor.xz) * f * 0.02` per frame, clamped, with soft return-to-home spring at `k = 0.015`.
- Net effect: cursor looks like it's pushing a localized wave outward. Cubes ripple and drift, then settle back toward home grid positions.

### Random coalescence events (secondary, optional for MVP)

- Every 10-14 seconds (randomized in range), trigger a formation event.
- Duration: **~4s** (0.8s form, 2.2s hold, 1.0s dissolve).
- Silhouette library (precomputed target positions per cube):
  1. Low-poly chair silhouette (nods to the reference image)
  2. Abstract humanoid with one arm raised (Caestus haptic-arm hook)
  3. Architectural wireframe (door, window frame)
  4. Simple geometric sculpture (torus, knot)
- Only a subset of cubes (**~30%**) participates per event. The rest stay in base motion.
- Interpolation: per-cube lerp from current → target with staggered start offset so the silhouette appears to sweep into existence.
- Phase 2 feature. Ship MVP without it if timeline is tight.

---

## 9. Visual design

### Palette

| Role | Hex | Notes |
|---|---|---|
| Room base | `#F5F5F2` | Warm off-white |
| Room highlight | `#FFFFFF` | Gradient toward light source |
| Headset housing | `#1C1C1E` → `#2B2B2E` | PBR, not flat |
| Lens glass | `#0A0A0A` | Cubemap reflection at 0.15 intensity |
| Cube base | `#FFB5A0` | Coral |
| Cube peak | `#FF4444` | Saturated red |
| Guardian line | `#4FB3FF` | Quest-blue with bloom |
| Brand accent | `TBD` | Slot reserved for Caestus brand color |

### Lighting

- **Stages 1-2:** 3-point studio rig. Key 4500K from top-right, fill 5500K bottom-left at 40%, rim 6500K behind at 60%.
- **Stage 3:** ambient top-down `#FFFFFF` at 0.6, per-cube emissive intensity scaled by y-offset, hemi light with sky `#F5F5F2` / ground `#E8E8E5`.
- HDRI: low-intensity studio softbox `.hdr` (0.3 intensity), used for environment reflections only.

### Post-processing

- **Bloom:** threshold 0.9, intensity 0.4, luminance smoothing 0.3. Primarily to make the red cubes and blue guardian glow.
- **Vignette:** stage 3 only, 0.4 intensity.
- **DoF:** transient during stage 2 → 3 lens transition only. Off otherwise (cost).
- **Chromatic aberration:** off by default. Enabled only during 0.3s of the lens dissolve for a brief lens-artifact feel.

---

## 10. Performance

- **Single draw call** for the cube field via `InstancedMesh`.
- Cube motion lives in a **vertex shader**, not JS. Time uniform pushed per frame.
- Headset model uses a **single material with texture atlas** where possible. Target **≤ 4 materials total**.
- Shadows: disabled on cubes. Headset gets one soft contact shadow via a shadow-catcher plane.
- Frustum culling on for everything. Cube field bounded by a custom `boundingSphere` so it doesn't disappear when the camera tilts.
- **GPU tier detection** via `detect-gpu`:
  - Tier 3+: full experience.
  - Tier 2: cube count halved, bloom intensity halved.
  - Tier 1 or unknown: static image fallback stack.
- Suspense placeholder during GLB load: low-poly silhouette + skeleton shimmer, no layout shift.
- First paint: static image of stage 1 renders within **800ms** even before the 3D scene is ready, then swaps in.

---

## 11. Scroll implementation

- GSAP `ScrollTrigger.create({ trigger: hero, pin: true, end: "+=300%", scrub: 0.5 })`.
- `scrub: 0.5` smooths flick-scrolls.
- Lenis for OS-level scroll smoothing, wired via `ScrollTrigger.scrollerProxy`.
- Scroll progress stored in a Zustand slice, read inside `useFrame`.
- All stage logic (camera position, opacity, uniforms) is a **pure function of scroll progress**, which makes reverse-scroll free.

### Keyframe table (scroll progress → camera state)

| Progress | Camera position (world) | Rotation target | FOV | Notes |
|---|---|---|---|---|
| 0.00 | (0, 0.1, 2.5) | (0, 0, 0) | 35° | Front-center, headset fills frame |
| 0.33 | (2.5, 0.1, 0.1) | (0, 0, 0) | 35° | 90° orbit complete |
| 0.66 | (0.08, 0.0, 0.25) | Left lens center | 45° | Approaching lens |
| 0.72 | (0.03, 0.0, 0.10) | same | 55° | Inside glass, flash |
| 0.80 | (0, 1.6, 0) | Front wall | 60° | Inside VR, eye-height |
| 1.00 | (0, 1.6, 0) | same | 60° | Idle, cursor drives cubes |

---

## 12. Accessibility

- `prefers-reduced-motion: reduce`: disable scroll-jacking entirely. Render three stacked `<img>` stills, one per stage, stacked vertically. Hero becomes a scroll-through of static screenshots.
- Keyboard scroll (Arrow Down, Page Down, Space) works identically to wheel scroll because it still triggers scroll events.
- Skip-hero link at the top of the page, visible on focus.
- Canvas has `role="img"` with `aria-label`: "Animated visualization of the Caestus Labs haptic VR system."
- No content gated behind time; everything progresses via user input.

---

## 13. Implementation phasing

**Phase 1 (MVP, target ~2 days):**

- Headset model integrated and rendering with PBR materials.
- Stages 1 and 2 working with scroll + cursor.
- Stage 3 with cube field, base motion, cursor bias only. No formation events yet.
- Lens dissolve transition with simple opacity + bloom.

**Phase 2 (~2 days):**

- Coalescence / formation events.
- Full post-processing tuning.
- Mobile perf pass, GPU tier fallbacks.
- Accessibility fallback stills.

**Phase 3 (polish):**

- Lens dissolve refinement (DoF curves, flash timing).
- Silhouette library expansion.
- Copy overlay integration.
- Brand accent color plumbing once decided.

---

## 14. Open questions and assumptions

**Assumed (flip if wrong):**

- Headset = Quest 3 form factor. When Caestus ships its own headset, the GLB swaps.
- Cursor in stage 3 is a drift-field influence only, no sculpting.
- Stage 3 has no exit; it idles.
- Dark-on-light aesthetic throughout hero.
- App Router, React 18, Next.js 14+.

**Still open:**

- Blue guardian line in stage 3: visible inside the room permanently, or only appearing during the dissolve transition? Default assumption: visible throughout stage 3 at reduced opacity.
- Copy overlay: what text sits above the hero? Affects z-index and mobile layout.
- Does the hero re-animate from stage 1 on every visit, or persist scroll state within a session?
- Model sourcing: paid Sketchfab asset, commissioned model, or existing asset you already have?
- Caestus brand accent color.

---

## 15. Definition of done

- All success criteria in §2 measurable and met.
- Works on latest Chrome, Safari, Firefox on desktop. Works on iOS Safari 17+ and Chrome Android.
- Lighthouse Performance score **≥ 85** on the hero page.
- Reduced-motion fallback verified.
- Owner sign-off on the feel of cursor interaction at all three stages.

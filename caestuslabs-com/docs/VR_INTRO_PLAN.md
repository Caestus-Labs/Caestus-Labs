# VR Intro — Plan

Scroll-driven cinematic intro for the Caestus Labs landing page. User lands facing a VR headset; as they scroll, the camera flies into the lens and emerges inside a living cube-world that morphs continuously.

---

## 0. Decisions (locked)

1. **Headset:** generic premium VR goggles — not branded, not Quest 3, not Vision Pro.
2. **Trigger:** on page load. First thing the visitor sees.
3. **Scope:** **entire page** gets the treatment. One shared `<Canvas>` sits behind every section. The cube world is the ambient background from Vision all the way through Footer; only its density and camera framing change as you scroll.
4. **Tech:** Real 3D — React Three Fiber + drei + GSAP ScrollTrigger.
5. **Cubes:** cursor-reactive. Cursor position nudges cube rotations and displaces nearby cubes subtly — strongest "you are freely modifying this world" metaphor.
6. **Copy:** do **not** mention Meta Quest 3. New Hero subtitle will replace the current line. Proposed options (pick one):
   - **a.** "A haptic suit. Feel virtual reality with your whole body."
   - **b.** "A haptic suit to feel virtual reality — physically."
   - **c.** "Feel virtual reality. Physically."
   - Headline stays: `"WE'RE REINVENTING / VIRTUAL / REALITY."`
7. **Accessibility:** full fallback stack — `prefers-reduced-motion` gets a static scene, low-end devices get reduced cube count + no post-processing, no-JS/no-WebGL gets poster PNGs.

---

## 1. User journey (what the visitor sees)

```
 ┌────────────────────────┐      ┌────────────────────────┐      ┌────────────────────────┐
 │   SCENE A (0% scroll)  │  →   │  SCENE B (0–40% scroll)│  →   │  SCENE C (40%+ scroll) │
 │                        │      │                        │      │                        │
 │  Headset centered,     │      │  Camera flies forward, │      │  Inside the world:     │
 │  facing viewer.        │      │  lens grows to fill    │      │  floor grid, cubes     │
 │  Subtle glow + drift.  │      │  the frame, dissolves  │      │  floating, slowly      │
 │  Headline on right.    │      │  into the cube world.  │      │  rearranging.          │
 └────────────────────────┘      └────────────────────────┘      └────────────────────────┘
```

- **Scene A — "The portal."** Hero headline stays. Headset no longer sits beside the text — it sits *behind* it, centered, glowing faintly. Cursor parallax tilts it a few degrees. Idle breathing animation (scale 1.00 ↔ 1.02).
- **Scene B — "The dive."** As the user scrolls the first viewport, GSAP ScrollTrigger drives a camera dolly: the headset grows, the lens becomes the frame, a radial mask blurs the bezel away. A subtle chromatic aberration + bloom sells the "through the glass" effect.
- **Scene C — "Inside."** Camera is now inside a wide, pale environment. Dozens of white cubes of varying sizes float and drift. Every ~8s, ~20% of cubes re-target new positions with a spring ease. The headline ("WE'RE REINVENTING…") sits readably over this — background is kept low-contrast so text wins.

---

## 2. Tech approach

**Chosen stack (all already installed):**
- **React Three Fiber + drei** — declarative 3D scene graph
- **GSAP + ScrollTrigger + @gsap/react** — scroll-linked timeline for the dive
- **Framer Motion** — keep for text reveals (already working in Hero)
- **Tailwind v4** — layout + text styling (unchanged)

**Why R3F over video:**
- Already in `package.json` — no new dependencies
- Responsive at any viewport without re-encoding
- Text layout can change without re-rendering a video
- Deterministic `prefers-reduced-motion` fallback (render one frame, no animation)
- Bundle impact: ~150 KB gzipped for three + R3F vs 10–40 MB for a scrubbable video

**Scene graph (one shared Canvas behind the whole page):**

```
<Canvas> (position:fixed, inset:0, z-index:-1 — behind ALL sections)
  <Suspense>
    <HeadsetScene />   ← visible 0–40% scroll
    <CubeWorld />      ← fades in from 25% scroll, stays for the rest of the page
    <CameraRig />      ← scroll-driven; drifts slowly through the cube world after the dive
    <Environment />    ← HDR for glass reflections
    <CursorInfluence />← cursor pos drives cube rotation/displacement
  </Suspense>
</Canvas>
```

The canvas mounts once in `app/layout.tsx` and stays alive for the whole scroll. Section backgrounds become **semi-transparent** (dark gradient vignettes) so the cube world shows through behind Problem, SystemReveal, EarlyAccess, Footer — density thins out and camera drifts slowly so it reads as ambient texture, not distraction. Text contrast is protected with per-section backdrop panels.

---

## 3. File changes

**New files:**

```
caestuslabs-com/
├── components/
│   └── scene/
│       ├── VRScene.tsx          ← shared <Canvas> wrapper, mounts at layout
│       ├── Headset.tsx          ← 3D headset model + materials
│       ├── CubeWorld.tsx        ← instanced cubes + drift/swap behavior
│       ├── CameraRig.tsx        ← ScrollTrigger-driven camera dolly
│       └── SceneFallback.tsx    ← static image for reduced-motion / low-end
├── public/
│   └── models/
│       └── headset.glb          ← 3D model (see "Assets needed")
└── docs/
    └── VR_INTRO_PLAN.md         ← this file
```

**Edited files:**

- `app/layout.tsx` — mount `<VRScene />` once at the top, absolutely positioned behind `<main>`
- `components/sections/Hero.tsx` — remove placeholder headset `<div>`; keep headline + subtitle; change layout to center-or-right text over transparent background
- `components/sections/Vision.tsx` — make background transparent so the cube world shows through; keep existing copy
- `app/globals.css` — ensure section backgrounds use `bg-transparent` where the canvas should show

**Touched lightly:** Problem, SystemReveal, EarlyAccess, Footer — their solid `#0A0A0C` backgrounds become translucent dark gradients so the cube world is visible behind them. Text stays over backdrop panels to protect contrast. Nav is unchanged.

---

## 4. Scroll timeline (GSAP / ScrollTrigger)

Pinning the Hero section, driving one timeline:

```
progress │ camera.z │ camera.fov │ headset.opacity │ cubeWorld.opacity │ postFX.bloom
─────────┼──────────┼────────────┼─────────────────┼───────────────────┼──────────────
  0.00   │   6.0    │    40°     │      1.00       │        0.00       │    0.0
  0.35   │   1.2    │    55°     │      1.00       │        0.10       │    0.3
  0.55   │   0.2    │    80°     │      0.30       │        0.60       │    0.8  ← "through the lens"
  0.80   │  -2.0    │    70°     │      0.00       │        1.00       │    0.3
  1.00   │  -4.0    │    65°     │      0.00       │        1.00       │    0.1
```

Pin duration: `1.5 * viewport height` — feels like ~1.5 scrolls from landing to fully inside.

---

## 5. Cube world behavior

- **Count:** ~60 cubes, `THREE.InstancedMesh` (one draw call, cheap)
- **Size distribution:** 0.3–1.6 m, log-normal so most are small, a few are big and anchor the composition
- **Layout:** loose cluster within a 20×8×20 m box, biased so the dense mass sits ~8 m from the camera (matches your reference photo's feel)
- **Motion:**
  - **Idle drift:** each cube has a slow perlin-noise offset on position + rotation (±0.2 m, ±5°)
  - **Re-target loop:** every 6–10s, pick 8–12 cubes, spring them to new target positions over 2.5s with staggered delays
  - **"Breathing" scale:** whole cluster scales 0.98 ↔ 1.02 on an 18s loop
- **Material:** `MeshStandardMaterial`, base white `#f2efea` (your text-primary), low roughness, subtle shadow — matches your reference photo's papercraft feel

---

## 6. Performance & fallbacks

| Condition | Behavior |
|---|---|
| Desktop + good GPU | Full scene, bloom + DoF enabled, 60fps target |
| Mobile or detected low-end | Skip post-processing, reduce cube count to ~25, disable shadows |
| `prefers-reduced-motion` | Render one static frame per scene, no dive animation; Hero uses headset PNG, Vision uses cube PNG |
| JS disabled | Static PNGs for both scenes, current text overlaid, no interactivity |
| WebGL unsupported | Same as JS-disabled fallback |

Device detection via `navigator.hardwareConcurrency < 4` + `devicePixelRatio > 2.5` heuristic (good enough, ships today).

---

## 7. Assets needed

- **Headset GLB model.** Options, in order of preference:
  1. Commission a simple low-poly headset (~5 MB, a few hours of a 3D artist's time)
  2. Use a free CC0 model (Sketchfab has Quest 3-ish ones) — I can pick one
  3. Build a procedural headset in code from primitives (torus + rounded box + sphere lenses) — no asset needed, ships fastest, least realistic. **Recommended for phase 1.**
- **HDR environment map** for glass reflection — one free CC0 studio HDR (~2 MB) from polyhaven.com
- **Two poster PNGs** (1920×1080, ~100 KB each) for the reduced-motion/no-JS fallback — I can render these from the R3F scene once it's built

---

## 8. Implementation phases

Each phase ships a working, deployable state. You can stop at any phase and have a better site than today.

**Phase 1 — Static composition (half a day)**
- Procedural headset (primitives, no asset)
- Centered in Hero, faintly glowing, cursor parallax
- No dive animation yet, no cube world yet
- Hero text repositioned over it
- **Deliverable:** new Hero look, zero risk

**Phase 2 — Cube world in Vision section (1 day)**
- Build `CubeWorld` with idle drift + re-target loop
- Vision section becomes the canvas background
- No transition between sections yet — they're just two scenes
- **Deliverable:** two polished scenes, abrupt cut between them

**Phase 3 — The dive (1–2 days)**
- One shared `<Canvas>` across both sections
- GSAP ScrollTrigger timeline drives camera + opacity crossfade
- Post-processing pass (bloom + chromatic aberration during the lens moment)
- **Deliverable:** the full cinematic effect

**Phase 4 — Polish + fallbacks (half a day)**
- Reduced-motion path
- Mobile/low-end detection and cube-count reduction
- Render poster PNGs for no-JS
- Lighthouse pass, ensure CLS/LCP don't regress
- **Deliverable:** production-quality

**Phase 5 (optional) — Real headset model**
- Swap procedural headset for a real GLB
- Tune materials, lighting
- **Deliverable:** maximum visual fidelity

Total: **3–5 working days** for phases 1–4.

---

## 9. Risks & things I'm watching

- **Text legibility.** Moving cubes behind headlines risks making text hard to read. Mitigation: slight backdrop-blur panel behind text, or a darker gradient vignette near the headline.
- **Scroll-jacking feels bad on trackpad.** Pinning the Hero for 1.5× viewport means 1.5 scrolls of "the page isn't moving." If it feels gluey in testing, shorten to 1× and accept a faster dive.
- **Bundle size.** Three.js + R3F + drei + GSAP is ~180 KB gzipped. I'll code-split the scene with `next/dynamic` so it doesn't block the initial paint.
- **Dev-server perf ≠ prod perf.** Turbopack dev is slower than prod. Will test `next build && next start` before declaring any phase done.
- **Your Next.js 16 caveat** (per `AGENTS.md`). I'll read `node_modules/next/dist/docs/` before touching `app/layout.tsx` to confirm the client-component pattern I'm using is current.

---

## 10. What I need from you to start

1. Answers to the 7 open questions in section 0.
2. Green-light on **Phase 1** only — we review after each phase.
3. (Optional) Any brand-side constraints I should know about: colors, do-not-show-the-suit-yet, NDAs on specific imagery, etc.

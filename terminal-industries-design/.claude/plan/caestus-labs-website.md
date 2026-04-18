# Implementation Plan: Caestus Labs Website

## Project Overview

Build caestuslabs.com - a cinematic, scroll-driven vision site for a haptic VR suit company. Hardware company energy with terminal-industries.com as the reference benchmark.

**Confirmed Decisions:**
- Accent color: Minimalistic black hardware aesthetic (no bright accent, or very subtle use)
- Display typeface: PP Neue Montreal
- Cube grid (Section 07): Real-time Three.js/React Three Fiber
- Assets ready: Quest 3 headset renders, 3D suit model (Blender)
- Missing assets: Demo footage (use CGI placeholders), team portraits, logo/wordmark

---

## Technical Architecture

### Tech Stack
- **Framework:** Next.js 14 + TypeScript + App Router
- **Styling:** Tailwind CSS (custom config, override default palette)
- **Animation:** GSAP + ScrollTrigger + Framer Motion
- **3D:** React Three Fiber + Drei (Section 07 cube grid)
- **Video:** Pre-rendered Blender sequences (scroll-scrubbed)
- **Forms:** Resend or Formspree for early access capture
- **Fonts:** PP Neue Montreal (display), Söhne/Inter (body), JetBrains Mono (mono)
- **Hosting:** Vercel
- **Analytics:** Plausible or Vercel Analytics

### Project Structure
```
caestuslabs-com/
├── app/
│   ├── layout.tsx
│   ├── page.tsx
│   └── globals.css
├── components/
│   ├── sections/
│   │   ├── Hero.tsx
│   │   ├── HeadsetTransition.tsx
│   │   ├── Vision.tsx
│   │   ├── Problem.tsx
│   │   ├── SystemReveal.tsx
│   │   ├── DrivingDemo.tsx
│   │   ├── CubeGrid.tsx
│   │   ├── HowItWorks.tsx
│   │   ├── Team.tsx
│   │   ├── EarlyAccess.tsx
│   │   └── Footer.tsx
│   ├── ui/
│   │   ├── Nav.tsx
│   │   ├── ScrollCue.tsx
│   │   └── SectionLabel.tsx
│   └── animations/
│       ├── ScrollAnimationWrapper.tsx
│       ├── TextReveal.tsx
│       └── VideoScrubber.tsx
├── public/
│   ├── videos/
│   │   ├── headset-transition.mp4
│   │   ├── suit-turntable.mp4
│   │   ├── driving-demo.mp4
│   │   └── pillar-*.mp4
│   ├── images/
│   │   ├── headset-hero.png
│   │   ├── suit-render.png
│   │   └── team/
│   └── fonts/
│       ├── PPNeueMontreal-*.woff2
│       ├── Sohne-*.woff2
│       └── JetBrainsMono-*.woff2
├── lib/
│   ├── animations.ts
│   └── utils.ts
├── tailwind.config.ts
└── tsconfig.json
```

---

## Implementation Steps

### Phase 1: Project Setup & Foundation (Days 1-2)

#### Step 1.1: Initialize Next.js Project
```bash
npx create-next-app@latest caestuslabs-com --typescript --tailwind --app --no-src-dir
cd caestuslabs-com
```

**Deliverable:** Clean Next.js 14 project with TypeScript and Tailwind

#### Step 1.2: Install Dependencies
```bash
npm install gsap @gsap/react framer-motion
npm install @react-three/fiber @react-three/drei three
npm install @types/three
npm install -D @tailwindcss/typography
```

**Deliverable:** All required animation and 3D libraries installed

#### Step 1.3: Configure Tailwind Design Tokens

**File:** `tailwind.config.ts`

Override default Tailwind palette with Caestus brand colors:

```typescript
import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        background: {
          primary: '#0A0A0C',
          secondary: '#15151A',
        },
        text: {
          primary: '#F2EFEA',
          secondary: '#8A8A90',
        },
        border: '#1F1F24',
        accent: '#E6FF3C', // Keep as fallback, use sparingly if at all
      },
      fontFamily: {
        display: ['PP Neue Montreal', 'sans-serif'],
        body: ['Söhne', 'Inter', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      spacing: {
        '120': '120px', // Desktop margins
        '24': '24px',   // Mobile margins
      },
      borderRadius: {
        'sm': '2px',
        'md': '4px',
      },
      maxWidth: {
        'content': '1440px',
      },
    },
  },
  plugins: [],
}
export default config
```

**Deliverable:** Tailwind configured with Caestus design system

#### Step 1.4: Add Custom Fonts

**File:** `app/globals.css`

```css
@font-face {
  font-family: 'PP Neue Montreal';
  src: url('/fonts/PPNeueMontreal-Regular.woff2') format('woff2');
  font-weight: 400;
  font-display: swap;
}
@font-face {
  font-family: 'PP Neue Montreal';
  src: url('/fonts/PPNeueMontreal-Bold.woff2') format('woff2');
  font-weight: 700;
  font-display: swap;
}

@layer base {
  body {
    @apply bg-background-primary text-text-primary font-body;
  }

  h1, h2, h3 {
    @apply font-display font-bold;
  }
}
```

**Deliverable:** Font system configured and loaded

---

### Phase 2: Core Components & Layout (Days 3-4)

#### Step 2.1: Build Navigation Component

**File:** `components/ui/Nav.tsx`

```typescript
'use client'
import { useState, useEffect } from 'react'

export default function Nav() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <nav className={`fixed top-0 w-full z-50 transition-all ${
      scrolled ? 'border-b border-border' : ''
    }`}>
      <div className="max-w-content mx-auto px-120 py-6 flex items-center justify-between">
        {/* Logo left */}
        <div className="font-display font-bold">CAESTUS</div>

        {/* Nav center */}
        <div className="flex gap-8 text-sm font-mono">
          <a href="#system">System</a>
          <a href="#vision">Vision</a>
          <a href="#about">About</a>
        </div>

        {/* CTA right */}
        <button className="px-6 py-2 border border-text-primary rounded-sm font-mono text-sm hover:bg-text-primary hover:text-background-primary transition">
          REQUEST ACCESS
        </button>
      </div>
    </nav>
  )
}
```

**Deliverable:** Sticky navigation with glassmorphism-free design

#### Step 2.2: Build Section Label Component

**File:** `components/ui/SectionLabel.tsx`

```typescript
export default function SectionLabel({ number, title }: { number: string, title: string }) {
  return (
    <div className="font-mono text-xs text-text-secondary tracking-wider">
      {number} / {title}
    </div>
  )
}
```

**Deliverable:** Reusable section label component

#### Step 2.3: Build Scroll Cue Component

**File:** `components/ui/ScrollCue.tsx`

```typescript
'use client'
import { motion } from 'framer-motion'

export default function ScrollCue() {
  return (
    <motion.div
      className="absolute bottom-12 left-1/2 -translate-x-1/2 font-mono text-xs text-text-secondary"
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 1.5, duration: 0.8 }}
    >
      SCROLL TO EXPLORE ↓
    </motion.div>
  )
}
```

**Deliverable:** Animated scroll cue for hero section

---

### Phase 3: Section 01 - Hero (Days 5-6)

#### Step 3.1: Build Hero Section

**File:** `components/sections/Hero.tsx`

```typescript
'use client'
import { motion } from 'framer-motion'
import { useRef, useEffect } from 'react'
import SectionLabel from '@/components/ui/SectionLabel'
import ScrollCue from '@/components/ui/ScrollCue'

export default function Hero() {
  const headsetRef = useRef<HTMLDivElement>(null)

  // Cursor parallax effect
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!headsetRef.current) return
      const { clientX, clientY } = e
      const { innerWidth, innerHeight } = window
      const x = (clientX / innerWidth - 0.5) * 20
      const y = (clientY / innerHeight - 0.5) * 20
      headsetRef.current.style.transform = `translate(${x}px, ${y}px) rotateY(${x * 0.5}deg) rotateX(${-y * 0.5}deg)`
    }
    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  return (
    <section className="relative h-screen flex items-center">
      {/* Top-left label */}
      <div className="absolute top-32 left-120">
        <SectionLabel number="001" title="CAESTUS LABS" />
      </div>

      {/* Quest 3 headset - left 60% */}
      <motion.div
        ref={headsetRef}
        className="absolute left-[10%] w-[50%]"
        initial={{ opacity: 0, y: 100 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.2, ease: 'easeOut' }}
      >
        <img src="/images/headset-hero.png" alt="Meta Quest 3" className="w-full" />
      </motion.div>

      {/* Headline - right side */}
      <div className="absolute right-120 max-w-2xl">
        <motion.h1
          className="text-8xl font-display font-bold leading-tight"
          initial="hidden"
          animate="visible"
          variants={{
            hidden: {},
            visible: {
              transition: {
                staggerChildren: 0.15,
              },
            },
          }}
        >
          {['WE'RE REINVENTING', 'VIRTUAL', 'REALITY.'].map((line, i) => (
            <motion.div
              key={i}
              variants={{
                hidden: { opacity: 0 },
                visible: { opacity: 1 },
              }}
            >
              {line}
            </motion.div>
          ))}
        </motion.h1>

        <motion.p
          className="mt-6 text-text-secondary text-lg"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.8 }}
        >
          A haptic suit for Meta Quest 3. Built so you can feel it.
        </motion.p>
      </div>

      <ScrollCue />
    </section>
  )
}
```

**Deliverable:** Hero section with headset render, word-by-word headline animation, cursor parallax

---

### Phase 4: Section 02 - Headset Transition (Days 7-8)

#### Step 4.1: Video Scrubber Component

**File:** `components/animations/VideoScrubber.tsx`

```typescript
'use client'
import { useRef, useEffect } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export default function VideoScrubber({ src }: { src: string }) {
  const videoRef = useRef<HTMLVideoElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const video = videoRef.current
    const container = containerRef.current
    if (!video || !container) return

    ScrollTrigger.create({
      trigger: container,
      start: 'top top',
      end: 'bottom bottom',
      pin: true,
      scrub: true,
      onUpdate: (self) => {
        if (video.duration) {
          video.currentTime = video.duration * self.progress
        }
      },
    })
  }, [])

  return (
    <div ref={containerRef} className="h-[200vh]">
      <div className="h-screen flex items-center justify-center overflow-hidden">
        <video
          ref={videoRef}
          src={src}
          className="w-full h-full object-cover"
          muted
          playsInline
          preload="auto"
        />
      </div>
    </div>
  )
}
```

**Deliverable:** Scroll-scrubbed video component

#### Step 4.2: Headset Transition Section

**File:** `components/sections/HeadsetTransition.tsx`

```typescript
import VideoScrubber from '@/components/animations/VideoScrubber'

export default function HeadsetTransition() {
  return (
    <VideoScrubber src="/videos/headset-transition.mp4" />
  )
}
```

**Deliverable:** Headset zoom-in transition (scrubs as user scrolls, camera pushes through lenses)

**Asset requirement:** Pre-rendered Blender video of headset scaling up, rotating forward, camera pushing through lenses (60fps, ~3-4 seconds)

---

### Phase 5: Sections 03-06 - Vision, Problem, System, Driving (Days 9-12)

#### Step 5.1: Vision Section

**File:** `components/sections/Vision.tsx`

```typescript
'use client'
import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef } from 'react'
import SectionLabel from '@/components/ui/SectionLabel'

export default function Vision() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.3 })

  return (
    <section ref={ref} className="min-h-screen relative flex items-center">
      {/* Background image with Ken Burns */}
      <motion.div
        className="absolute inset-0 z-0"
        style={{ backgroundImage: 'url(/images/vision-bg.png)', backgroundSize: 'cover', backgroundPosition: 'center' }}
        animate={isInView ? { scale: 1.06 } : { scale: 1 }}
        transition={{ duration: 8, ease: 'linear' }}
      />

      <div className="relative z-10 px-120 max-w-content mx-auto">
        <SectionLabel number="002" title="THE VISION" />

        <motion.h2
          className="text-7xl font-display font-bold mt-12 leading-tight"
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          variants={{
            hidden: {},
            visible: { transition: { staggerChildren: 0.2 } },
          }}
        >
          {['IMAGINE A WORLD', 'WHERE EVERY VIRTUAL', 'OBJECT IS SOMETHING', 'YOU CAN TOUCH.'].map((line, i) => (
            <motion.div
              key={i}
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0 },
              }}
            >
              {line}
            </motion.div>
          ))}
        </motion.h2>

        <motion.p
          className="mt-8 text-text-secondary text-xl max-w-3xl opacity-80"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 0.8, y: 0 } : {}}
          transition={{ delay: 0.8, duration: 0.8 }}
        >
          Grip a wheel in a driving game and feel it turn in your hands. Reach out in a dream world and land on something real. The virtual, finally physical.
        </motion.p>
      </div>
    </section>
  )
}
```

**Deliverable:** Vision section with staggered text reveal and Ken Burns background zoom

#### Step 5.2: Problem Section

**File:** `components/sections/Problem.tsx`

```typescript
'use client'
import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef } from 'react'
import SectionLabel from '@/components/ui/SectionLabel'

export default function Problem() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.3 })

  return (
    <section ref={ref} className="min-h-screen flex items-center px-120 max-w-content mx-auto">
      <div className="grid grid-cols-2 gap-24 w-full">
        {/* Left: image */}
        <motion.div
          initial={{ opacity: 1 }}
          animate={isInView ? { opacity: 0.4 } : {}}
          transition={{ duration: 1.5, delay: 0.5 }}
        >
          <img src="/images/quest-alone.png" alt="Quest 3 alone" className="w-full" />
        </motion.div>

        {/* Right: copy */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <SectionLabel number="003" title="THE GAP" />

          <h2 className="text-6xl font-display font-bold mt-12 leading-tight">
            VR GOT SHARP.<br />NOTHING GOT REAL.
          </h2>

          <p className="mt-8 text-text-secondary text-lg">
            Screens got better. Tracking got faster. Controllers got lighter. But the moment you reach into virtual reality, nothing reaches back. There is no consumer headset today that lets you feel the world it shows you.
          </p>
        </motion.div>
      </div>
    </section>
  )
}
```

**Deliverable:** Split-layout problem section with image desaturation

#### Step 5.3: System Reveal Section

**File:** `components/sections/SystemReveal.tsx`

```typescript
'use client'
import VideoScrubber from '@/components/animations/VideoScrubber'
import SectionLabel from '@/components/ui/SectionLabel'
import { motion } from 'framer-motion'
import { useState, useEffect } from 'react'

export default function SystemReveal() {
  const [count1, setCount1] = useState(0)
  const [count2, setCount2] = useState(0)

  useEffect(() => {
    // Counter animations
    const timer1 = setInterval(() => {
      setCount1((prev) => (prev < 12 ? prev + 1 : prev))
    }, 50)
    const timer2 = setInterval(() => {
      setCount2((prev) => (prev < 10 ? prev + 1 : prev))
    }, 50)

    return () => {
      clearInterval(timer1)
      clearInterval(timer2)
    }
  }, [])

  return (
    <section className="min-h-screen relative flex flex-col items-center justify-center">
      <div className="absolute top-32 left-120">
        <SectionLabel number="004" title="CAESTUS SYSTEM" />
      </div>

      {/* Video turntable */}
      <div className="w-full max-w-4xl">
        <VideoScrubber src="/videos/suit-turntable.mp4" />
      </div>

      <motion.div
        className="text-center mt-16"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.8 }}
      >
        <h2 className="text-7xl font-display font-bold">MEET CAESTUS.</h2>

        <p className="mt-6 text-text-secondary text-xl max-w-2xl mx-auto">
          An electrostatic clutch-based haptic suit for the upper body.<br />
          Every resistance, every pull, every impact in VR, felt in real life.
        </p>

        {/* Spec callouts */}
        <div className="flex gap-16 justify-center mt-12 font-mono text-sm">
          <div>
            <div className="text-4xl font-bold">{count1}</div>
            <div className="text-text-secondary mt-2">CLUTCH POINTS</div>
          </div>
          <div>
            <div className="text-4xl font-bold">SUB-{count2}MS</div>
            <div className="text-text-secondary mt-2">LATENCY</div>
          </div>
          <div>
            <div className="text-4xl font-bold">WIRELESS</div>
            <div className="text-text-secondary mt-2">USB-C</div>
          </div>
        </div>
      </motion.div>
    </section>
  )
}
```

**Deliverable:** Product turntable with scroll-driven rotation + counter-animated specs

**Asset requirement:** Pre-rendered 360° suit turntable video

#### Step 5.4: Driving Demo Section

**File:** `components/sections/DrivingDemo.tsx`

```typescript
'use client'
import { useRef, useEffect } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import SectionLabel from '@/components/ui/SectionLabel'

gsap.registerPlugin(ScrollTrigger)

export default function DrivingDemo() {
  const videoRef = useRef<HTMLVideoElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const video = videoRef.current
    const container = containerRef.current
    if (!video || !container) return

    ScrollTrigger.create({
      trigger: container,
      start: 'top center',
      end: 'bottom center',
      scrub: true,
      onUpdate: (self) => {
        // Play forward then reverse
        const progress = self.progress
        if (progress < 0.5) {
          video.currentTime = (progress * 2) * video.duration
        } else {
          video.currentTime = (2 - progress * 2) * video.duration
        }
      },
    })
  }, [])

  return (
    <section ref={containerRef} className="min-h-screen flex items-center px-120 max-w-content mx-auto">
      <div className="grid grid-cols-2 gap-24 w-full">
        {/* Left: video */}
        <div>
          <video
            ref={videoRef}
            src="/videos/driving-demo.mp4"
            className="w-full rounded-md"
            muted
            playsInline
          />
        </div>

        {/* Right: copy */}
        <div>
          <SectionLabel number="005" title="IN MOTION" />

          <h2 className="text-6xl font-display font-bold mt-12 leading-tight">
            FEEL THE WHEEL.<br />TURN IT. WIN.
          </h2>

          <p className="mt-8 text-text-secondary text-lg">
            Grip the wheel. Turn it in real space. Watch it turn in your headset. The suit tenses when you hit the curb, pulls when you brake, pushes back on every turn. Every force in the game becomes a force on you.
          </p>
        </div>
      </div>
    </section>
  )
}
```

**Deliverable:** Driving demo with scroll-locked video (plays forward then reverses)

**Asset requirement:** CGI placeholder or demo footage of driving sequence

---

### Phase 6: Section 07 - Cube Grid (Days 13-14)

#### Step 6.1: Three.js Cube Grid

**File:** `components/sections/CubeGrid.tsx`

```typescript
'use client'
import { Canvas, useFrame } from '@react-three/fiber'
import { useRef, useMemo } from 'react'
import * as THREE from 'three'
import SectionLabel from '@/components/ui/SectionLabel'

function Cubes() {
  const mesh = useRef<THREE.InstancedMesh>(null)
  const count = 15 * 15 // 225 cubes

  const { positions } = useMemo(() => {
    const positions: THREE.Vector3[] = []
    const size = 15
    const spacing = 1.5
    const offset = (size - 1) * spacing / 2

    for (let x = 0; x < size; x++) {
      for (let z = 0; z < size; z++) {
        positions.push(new THREE.Vector3(
          x * spacing - offset,
          0,
          z * spacing - offset
        ))
      }
    }
    return { positions }
  }, [])

  useFrame(({ clock, mouse }) => {
    if (!mesh.current) return

    const time = clock.getElapsedTime()
    const matrix = new THREE.Matrix4()

    positions.forEach((pos, i) => {
      const distance = Math.sqrt(
        Math.pow(pos.x - mouse.x * 10, 2) +
        Math.pow(pos.z - mouse.y * 10, 2)
      )
      const wave = Math.sin(time * 0.5 + distance * 0.3) * 0.5
      const y = wave + Math.sin(time * 0.3 + i * 0.05) * 0.3

      matrix.setPosition(pos.x, y, pos.z)
      mesh.current!.setMatrixAt(i, matrix)
    })

    mesh.current.instanceMatrix.needsUpdate = true
  })

  return (
    <instancedMesh ref={mesh} args={[undefined, undefined, count]}>
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color="#F2EFEA" />
    </instancedMesh>
  )
}

export default function CubeGrid() {
  return (
    <section className="min-h-screen relative flex items-center">
      <div className="absolute inset-0">
        <Canvas camera={{ position: [0, 8, 15], fov: 50 }}>
          <ambientLight intensity={0.5} />
          <directionalLight position={[0, 10, 5]} intensity={1} />
          <Cubes />
        </Canvas>
      </div>

      <div className="relative z-10 px-120 max-w-content mx-auto">
        <SectionLabel number="006" title="EVERY ENVIRONMENT" />

        <h2 className="text-7xl font-display font-bold mt-12 leading-tight max-w-3xl">
          BUILD ANY WORLD.<br />FEEL ALL OF IT.
        </h2>

        <p className="mt-8 text-text-secondary text-xl max-w-2xl">
          Walls you can lean on. Objects you can lift. Surfaces that push back. Whatever the headset shows, the suit makes real.
        </p>
      </div>
    </section>
  )
}
```

**Deliverable:** Interactive 3D cube grid with wave animation and mouse parallax

---

### Phase 7: Sections 08-11 - How It Works, Team, Early Access, Footer (Days 15-17)

#### Step 7.1: How It Works (3 Pillars)

**File:** `components/sections/HowItWorks.tsx`

```typescript
'use client'
import { useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import SectionLabel from '@/components/ui/SectionLabel'

gsap.registerPlugin(ScrollTrigger)

const pillars = [
  {
    title: 'FORCE',
    video: '/videos/pillar-force.mp4',
    copy: 'Ionoelastomer electroadhesive clutches. Variable resistance at key contact points. Real force, not vibration.',
  },
  {
    title: 'SPEED',
    video: '/videos/pillar-speed.mp4',
    copy: 'Sub-10ms latency from headset to body. Fast enough to feel inseparable from what you see.',
  },
  {
    title: 'FREEDOM',
    video: '/videos/pillar-freedom.mp4',
    copy: 'Wireless. Standalone. Charges like a headset. No PC tower, no tangle, no setup.',
  },
]

function Pillar({ title, video, copy, index }: any) {
  return (
    <div className="h-screen flex items-center px-120 max-w-content mx-auto">
      <div className="grid grid-cols-2 gap-24 w-full">
        <div>
          <video src={video} className="w-full rounded-md" autoPlay loop muted playsInline />
        </div>
        <div>
          <div className="font-mono text-xs text-text-secondary">PILLAR {String(index + 1).padStart(2, '0')}</div>
          <h3 className="text-5xl font-display font-bold mt-6">{title}</h3>
          <p className="mt-6 text-text-secondary text-lg">{copy}</p>
        </div>
      </div>
    </div>
  )
}

export default function HowItWorks() {
  return (
    <section>
      <div className="px-120 py-32">
        <SectionLabel number="007" title="HOW IT WORKS" />
      </div>
      {pillars.map((pillar, i) => (
        <Pillar key={i} {...pillar} index={i} />
      ))}
    </section>
  )
}
```

**Deliverable:** 3-pillar sticky-scroll section with looping videos

**Asset requirements:** 3 short looping videos for Force, Speed, Freedom

#### Step 7.2: Team Section

**File:** `components/sections/Team.tsx`

```typescript
import SectionLabel from '@/components/ui/SectionLabel'

const team = [
  {
    name: 'JAMES [LAST NAME]',
    role: 'CO-FOUNDER / TBD',
    bio: '[Placeholder: one sentence bio.]',
    image: '/images/team/james.png',
  },
  {
    name: 'JINGYAO JIANG',
    role: 'CO-FOUNDER / TBD',
    bio: '[Placeholder: one sentence bio.]',
    image: '/images/team/jingyao.png',
  },
]

export default function Team() {
  return (
    <section className="min-h-screen py-32 px-120 max-w-content mx-auto">
      <SectionLabel number="007" title="THE TEAM" />

      <h2 className="text-7xl font-display font-bold mt-12 mb-24">
        BUILT BY TWO.
      </h2>

      <div className="grid grid-cols-2 gap-24">
        {team.map((person, i) => (
          <div key={i}>
            <img src={person.image} alt={person.name} className="w-full rounded-md mb-6" />
            <h3 className="text-2xl font-display font-bold">{person.name}</h3>
            <div className="font-mono text-sm text-text-secondary mt-2">{person.role}</div>
            <p className="mt-4 text-text-secondary">{person.bio}</p>
          </div>
        ))}
      </div>
    </section>
  )
}
```

**Deliverable:** Team section with portraits (placeholders for now)

**Asset requirements:** Team portraits (to be added before launch)

#### Step 7.3: Early Access Form

**File:** `components/sections/EarlyAccess.tsx`

```typescript
'use client'
import { useState } from 'react'

export default function EarlyAccess() {
  const [email, setEmail] = useState('')
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    // TODO: Integrate with Resend or Formspree
    console.log('Email submitted:', email)
    setSubmitted(true)
  }

  return (
    <section className="min-h-screen flex flex-col items-center justify-center px-120">
      <h2 className="text-7xl font-display font-bold text-center mb-6">
        BE THE FIRST TO FEEL IT.
      </h2>

      <p className="text-text-secondary text-xl text-center mb-12">
        Caestus ships to early access users before general release. Leave your email.
      </p>

      {!submitted ? (
        <form onSubmit={handleSubmit} className="flex gap-4 w-full max-w-2xl">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="email address"
            className="flex-1 px-6 py-4 bg-transparent border border-text-primary rounded-sm font-mono text-sm focus:outline-none focus:ring-2 focus:ring-text-primary"
            required
          />
          <button
            type="submit"
            className="px-8 py-4 bg-text-primary text-background-primary rounded-sm font-mono text-sm hover:opacity-90 transition"
          >
            REQUEST ACCESS →
          </button>
        </form>
      ) : (
        <div className="text-center text-text-secondary">
          Thanks! We'll be in touch.
        </div>
      )}
    </section>
  )
}
```

**Deliverable:** Early access email capture form

**Integration required:** Set up Resend or Formspree backend

#### Step 7.4: Footer

**File:** `components/sections/Footer.tsx`

```typescript
export default function Footer() {
  return (
    <footer className="border-t border-border py-12 px-120">
      <div className="max-w-content mx-auto flex items-center justify-between">
        {/* Left: logo */}
        <div className="font-display font-bold">CAESTUS</div>

        {/* Center: nav */}
        <div className="flex gap-8 text-sm">
          <a href="#vision">Vision</a>
          <a href="#system">System</a>
          <a href="#team">Team</a>
          <a href="#early-access">Early Access</a>
          <a href="#contact">Contact</a>
        </div>

        {/* Right: socials */}
        <div className="flex gap-6">
          <a href="#">X</a>
          <a href="#">Instagram</a>
          <a href="#">LinkedIn</a>
          <a href="#">YouTube</a>
        </div>
      </div>

      <div className="max-w-content mx-auto mt-8 text-center font-mono text-xs text-text-secondary">
        CAESTUS LABS / 2026 / BUILT IN ONTARIO
      </div>
    </footer>
  )
}
```

**Deliverable:** Footer with nav links and social icons

---

### Phase 8: Main Page Assembly (Day 18)

#### Step 8.1: Assemble All Sections

**File:** `app/page.tsx`

```typescript
import Nav from '@/components/ui/Nav'
import Hero from '@/components/sections/Hero'
import HeadsetTransition from '@/components/sections/HeadsetTransition'
import Vision from '@/components/sections/Vision'
import Problem from '@/components/sections/Problem'
import SystemReveal from '@/components/sections/SystemReveal'
import DrivingDemo from '@/components/sections/DrivingDemo'
import CubeGrid from '@/components/sections/CubeGrid'
import HowItWorks from '@/components/sections/HowItWorks'
import Team from '@/components/sections/Team'
import EarlyAccess from '@/components/sections/EarlyAccess'
import Footer from '@/components/sections/Footer'

export default function Home() {
  return (
    <main>
      <Nav />
      <Hero />
      <HeadsetTransition />
      <Vision />
      <Problem />
      <SystemReveal />
      <DrivingDemo />
      <CubeGrid />
      <HowItWorks />
      <Team />
      <EarlyAccess />
      <Footer />
    </main>
  )
}
```

**Deliverable:** Complete single-page site with all 11 sections

---

### Phase 9: Mobile Optimization (Days 19-20)

#### Step 9.1: Responsive Breakpoints

Add mobile-first responsive styles to all components:

- Nav: Hamburger menu below 768px
- Hero: Stack headline and headset vertically on mobile
- Grid layouts: Convert 2-column grids to single column below 768px
- Typography: Scale down display type for mobile (use `clamp()` or responsive classes)
- Margins: Switch from 120px to 24px padding on mobile

**Example responsive update for Hero:**

```typescript
<section className="relative h-screen flex items-center px-6 md:px-120">
  {/* Mobile-optimized layout */}
  <div className="flex flex-col md:flex-row items-center">
    {/* ... */}
  </div>
</section>
```

**Deliverable:** Fully responsive site across all breakpoints

---

### Phase 10: Performance & Polish (Days 21-22)

#### Step 10.1: Performance Optimizations

1. **Video optimization:**
   - Export videos at 1080p max, 60fps
   - Use H.264 codec for broad compatibility
   - Consider WebM fallback for smaller file size
   - Add `preload="metadata"` to non-hero videos

2. **Image optimization:**
   - Use Next.js `<Image>` component with automatic optimization
   - Add `priority` to hero headset image
   - Use WebP format with PNG fallback

3. **Font optimization:**
   - Use `font-display: swap` for all @font-face rules
   - Subset fonts to Latin characters only if possible

4. **Bundle optimization:**
   - Code-split Three.js components with `dynamic()` import
   - Lazy-load sections below the fold

**Deliverable:** Lighthouse score 90+ for Performance, Accessibility, Best Practices

#### Step 10.2: Accessibility

1. Add ARIA labels to all interactive elements
2. Ensure keyboard navigation works for nav and form
3. Add `prefers-reduced-motion` checks for animations
4. Ensure color contrast meets WCAG AA standards (current palette should pass)

**Deliverable:** WCAG AA compliant site

#### Step 10.3: SEO & Meta Tags

**File:** `app/layout.tsx`

```typescript
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Caestus Labs — Feel Virtual Reality',
  description: 'A haptic upper-body suit for Meta Quest 3. Making virtual reality physical.',
  openGraph: {
    title: 'Caestus Labs',
    description: 'Making virtual reality physical.',
    images: ['/og-image.png'],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Caestus Labs',
    description: 'Making virtual reality physical.',
    images: ['/og-image.png'],
  },
}
```

**Deliverable:** Complete SEO meta tags

**Asset requirement:** OG image (1200x630px)

---

### Phase 11: Deployment (Day 23)

#### Step 11.1: Deploy to Vercel

```bash
# Connect to Vercel
vercel

# Deploy to production
vercel --prod
```

**Environment variables to set in Vercel:**
- `RESEND_API_KEY` (if using Resend for forms)
- `NEXT_PUBLIC_SITE_URL`

**Deliverable:** Live site at caestuslabs.com

#### Step 11.2: Analytics Setup

1. Install Plausible or Vercel Analytics
2. Add script to `app/layout.tsx`
3. Set up custom events for:
   - Early access form submission
   - Video play interactions
   - Section scroll depth

**Deliverable:** Analytics tracking live

---

## Asset Preparation Checklist

### Ready
- [x] Quest 3 headset renders
- [x] 3D suit model (Blender)

### Needed Before Launch
- [ ] Headset transition video (Section 02): Blender export, headset zoom-in sequence
- [ ] Suit turntable video (Section 05): 360° rotation, Blender export
- [ ] Driving demo video (Section 06): CGI placeholder or demo footage
- [ ] Pillar videos (Section 08): 3 short loops for Force, Speed, Freedom
- [ ] Vision background image (Section 03): Cinematic shot of person in suit
- [ ] Problem image (Section 04): Person with Quest 3, reaching into empty air
- [ ] Team portraits (Section 09): James + Jingyao, product-shot style
- [ ] Logo/wordmark files: SVG for nav and footer
- [ ] OG image: 1200x630px for social sharing

### Font Files
- [ ] PP Neue Montreal: Regular (400) and Bold (700) in WOFF2
- [ ] Söhne or Inter: Regular (400) in WOFF2
- [ ] JetBrains Mono: Regular (400) in WOFF2

---

## Risk Mitigation

| Risk | Impact | Mitigation |
|------|--------|------------|
| Video file size too large (slow load) | High | Compress to <5MB per video, use Cloudflare Stream or Mux for hosting |
| Three.js performance issues on mobile | Medium | Add device detection, fallback to static image grid on low-end devices |
| Missing demo footage before launch | Medium | Use CGI placeholders, swap in real footage post-launch |
| Font licensing issues | Low | Verify PP Neue Montreal license allows web use, have fallback (Neue Haas) |
| GSAP ScrollTrigger conflicts | Medium | Extensive testing across browsers, add polyfills for older Safari |
| Form spam submissions | Low | Add honeypot field or Turnstile CAPTCHA |

---

## Testing Checklist

### Cross-browser
- [ ] Chrome (latest)
- [ ] Safari (latest, desktop + mobile)
- [ ] Firefox (latest)
- [ ] Edge (latest)

### Devices
- [ ] Desktop (1440px, 1920px)
- [ ] Laptop (1280px)
- [ ] Tablet (768px)
- [ ] Mobile (375px, 414px)

### Animations
- [ ] Hero word-by-word reveal works
- [ ] Headset transition scrubs smoothly
- [ ] Suit turntable scrubs smoothly
- [ ] Cube grid responds to mouse
- [ ] All text reveal animations trigger correctly
- [ ] Video loops play without jank

### Forms
- [ ] Early access form submits correctly
- [ ] Email validation works
- [ ] Success state shows after submission
- [ ] Backend receives email (test with real address)

---

## Post-Launch Enhancements

### Phase 2 (if time permits)
1. Add more detailed spec breakdowns (expandable sections)
2. Add comparison video: "VR before Caestus" vs "VR with Caestus"
3. Add FAQ section
4. Add press/media kit page
5. Add developer SDK preview section (if applicable)

### Phase 3 (future)
1. Swap CGI placeholders with real demo footage
2. Add customer testimonials section (post-beta)
3. Add interactive configurator (choose suit size, accessories)
4. Add blog for company updates
5. Add careers page

---

## Open Questions for Client

1. **Spec numbers accuracy:** Are the clutch contact point counts and "sub-10ms latency" confirmed, or placeholder?
2. **Logo status:** Do you have final logomark + wordmark files ready?
3. **Team bios:** Should we fill in placeholder bios now, or wait until closer to launch?
4. **Social links:** What are the actual URLs for X, Instagram, LinkedIn, YouTube accounts?
5. **Contact page:** Do you need a separate contact page, or is early access form sufficient?
6. **Accent color usage:** You said "minimalistic black hardware" — should we completely remove the `#E6FF3C` accent, or use it extremely sparingly (e.g., focus rings only)?
7. **Demo video timeline:** When do you expect to have real prototype footage ready? Should we plan CGI for initial launch?

---

## Timeline Summary

| Phase | Duration | Deliverables |
|-------|----------|--------------|
| 1. Setup | 2 days | Next.js project, Tailwind config, fonts |
| 2. Core components | 2 days | Nav, labels, scroll cues |
| 3. Hero | 2 days | Section 01 complete |
| 4. Transition | 2 days | Section 02 complete |
| 5. Sections 03-06 | 4 days | Vision, Problem, System, Driving |
| 6. Cube grid | 2 days | Section 07 complete |
| 7. Sections 08-11 | 3 days | How It Works, Team, Early Access, Footer |
| 8. Assembly | 1 day | Full site integrated |
| 9. Mobile | 2 days | Responsive optimization |
| 10. Polish | 2 days | Performance, A11y, SEO |
| 11. Deploy | 1 day | Live on Vercel |
| **Total** | **23 days** | Production-ready caestuslabs.com |

---

## Key Files to Reference During Build

| File | Purpose |
|------|---------|
| `/Users/james/Downloads/caestus-labs-website-spec.md` | Full requirements doc (master reference) |
| `/Users/james/Documents/GitHub/Caestus-Labs/terminal-industries-design/DESIGN.md` | Reference design patterns (scroll, motion, grid) |
| `.claude/plan/caestus-labs-website.md` | This implementation plan |

---

## Next Steps

1. Review this plan with your team
2. Confirm open questions above
3. Gather missing assets (videos, portraits, logo)
4. Verify font licensing
5. Set up Vercel project and domain
6. Begin Phase 1: Project setup

---

**Plan created:** 2026-04-18
**Estimated completion:** 23 working days from start
**Target launch:** TBD (confirm with client)

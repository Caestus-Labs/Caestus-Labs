'use client'

import { Canvas } from '@react-three/fiber'
import { Suspense, useEffect, useRef, useState } from 'react'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import gsap from 'gsap'
import Lenis from 'lenis'
import dynamic from 'next/dynamic'
import { useScrollStore } from '@/stores/scrollStore'
import { useCursorStore } from '@/stores/cursorStore'

// Dynamic imports for better code splitting
const HeroScene = dynamic(() => import('@/components/hero/HeroScene'), {
  ssr: false,
})

const HeroUI = dynamic(() => import('@/components/hero/HeroUI'), {
  ssr: false,
})

// Register GSAP plugins
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}

export default function NewHero() {
  const containerRef = useRef<HTMLDivElement>(null)
  const canvasRef = useRef<HTMLDivElement>(null)
  const [isReady, setIsReady] = useState(false)
  const setScrollProgress = useScrollStore((state) => state.setProgress)
  const setCursorPosition = useCursorStore((state) => state.setPosition)

  useEffect(() => {
    if (typeof window === 'undefined') return

    // Initialize Lenis smooth scroll
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      wheelMultiplier: 0.8,
    })

    // Connect Lenis to GSAP ScrollTrigger
    lenis.on('scroll', ScrollTrigger.update)

    gsap.ticker.add((time) => {
      lenis.raf(time * 1000)
    })

    gsap.ticker.lagSmoothing(0)

    // Create main ScrollTrigger for the hero
    const scrollTrigger = ScrollTrigger.create({
      trigger: containerRef.current,
      start: 'top top',
      end: '+=300%',
      pin: canvasRef.current,
      scrub: 0.5,
      onUpdate: (self) => {
        setScrollProgress(self.progress)
      },
    })

    // Handle cursor movement
    const handleMouseMove = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth) * 2 - 1
      const y = -(e.clientY / window.innerHeight) * 2 + 1
      setCursorPosition(x, y)
    }

    // Handle touch for mobile
    const handleTouchMove = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        const touch = e.touches[0]
        const x = (touch.clientX / window.innerWidth) * 2 - 1
        const y = -(touch.clientY / window.innerHeight) * 2 + 1
        setCursorPosition(x, y)
      }
    }

    // Device orientation for mobile
    const handleOrientation = (e: DeviceOrientationEvent) => {
      if (e.gamma !== null && e.beta !== null) {
        const x = (e.gamma / 90) * 0.4 // Scale down for subtlety
        const y = (e.beta / 180) * 0.4
        setCursorPosition(x, y)
      }
    }

    window.addEventListener('mousemove', handleMouseMove)
    window.addEventListener('touchmove', handleTouchMove)

    // Check if device orientation is available
    if (window.DeviceOrientationEvent) {
      window.addEventListener('deviceorientation', handleOrientation)
    }

    setIsReady(true)

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('touchmove', handleTouchMove)
      window.removeEventListener('deviceorientation', handleOrientation)
      scrollTrigger.kill()
      lenis.destroy()
      gsap.ticker.remove(lenis.raf)
    }
  }, [setScrollProgress, setCursorPosition])

  return (
    <section
      ref={containerRef}
      className="relative bg-black"
      style={{ height: '400vh' }}
    >
      {/* Pinned viewport */}
      <div
        ref={canvasRef}
        className="fixed inset-0 w-full h-screen"
        style={{ willChange: 'transform' }}
      >
        {/* Background gradient */}
        <div
          className="absolute inset-0 transition-opacity duration-1000"
          style={{
            background: 'radial-gradient(ellipse at 50% 40%, #0A0A0A 0%, #000000 100%)',
          }}
        />

        {/* 3D Canvas */}
        <div className="absolute inset-0">
          {isReady && (
            <Canvas
              dpr={[1, 2]}
              camera={{ position: [0, 0, 2], fov: 45 }}
              gl={{
                antialias: true,
                alpha: false,
                powerPreference: 'high-performance',
              }}
            >
              <Suspense fallback={null}>
                <HeroScene />
              </Suspense>
            </Canvas>
          )}
        </div>

        {/* UI Overlay */}
        <HeroUI />

        {/* Grain effect for premium feel */}
        <div
          className="absolute inset-0 pointer-events-none opacity-[0.03] mix-blend-screen"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200'%3E%3Cdefs%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' /%3E%3C/filter%3E%3C/defs%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' /%3E%3C/svg%3E")`,
          }}
        />
      </div>
    </section>
  )
}
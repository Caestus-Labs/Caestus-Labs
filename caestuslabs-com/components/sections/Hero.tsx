'use client'

import { motion } from 'framer-motion'
import dynamic from 'next/dynamic'
import { useEffect, useRef } from 'react'
import SectionLabel from '@/components/ui/SectionLabel'
import ScrollCue from '@/components/ui/ScrollCue'

const VRScene = dynamic(() => import('@/components/scene/VRScene'), {
  ssr: false,
  loading: () => null,
})

export default function Hero() {
  const canvasWrapperRef = useRef<HTMLDivElement>(null)
  const textWrapperRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (typeof window === 'undefined') return

    const handler = () => {
      const p = Math.min(window.scrollY / (window.innerHeight * 0.8), 1)

      // Canvas wrapper: hold full opacity through the dive, quick fade at end
      if (canvasWrapperRef.current) {
        const canvasOpacity =
          p <= 0.85 ? 1 : 1 - (p - 0.85) / 0.15
        canvasWrapperRef.current.style.opacity = String(canvasOpacity)
      }

      // Text wrapper: fade out early so dive is pure visual
      if (textWrapperRef.current) {
        const textOpacity =
          p <= 0.25 ? 1 : p >= 0.65 ? 0 : 1 - (p - 0.25) / 0.4
        textWrapperRef.current.style.opacity = String(textOpacity)
      }
    }

    window.addEventListener('scroll', handler, { passive: true })
    return () => window.removeEventListener('scroll', handler)
  }, [])

  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden">
      <div ref={canvasWrapperRef} className="absolute inset-0 z-0">
        <VRScene />
      </div>

      <div
        className="absolute inset-0 z-[1] pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 70% 55% at 50% 50%, rgba(10,10,12,0) 0%, rgba(10,10,12,0.55) 70%, rgba(10,10,12,0.95) 100%)',
        }}
      />

      <div className="absolute top-32 left-6 md:left-[120px] z-10">
        <SectionLabel number="001" title="CAESTUS LABS" />
      </div>

      <div ref={textWrapperRef} className="relative z-10 w-full px-6 md:px-[120px] text-center">
        <motion.h1
          className="text-5xl md:text-8xl font-[family-name:var(--font-display)] font-bold leading-[1.05] tracking-tight"
          initial="hidden"
          animate="visible"
          variants={{
            hidden: {},
            visible: {
              transition: {
                staggerChildren: 0.15,
                delayChildren: 0.3,
              },
            },
          }}
        >
          {["WE'RE REINVENTING", 'VIRTUAL', 'REALITY.'].map((line, i) => (
            <motion.div
              key={i}
              variants={{
                hidden: { opacity: 0, y: 24 },
                visible: {
                  opacity: 1,
                  y: 0,
                  transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] },
                },
              }}
            >
              {line}
            </motion.div>
          ))}
        </motion.h1>

        <motion.p
          className="mt-8 text-text-secondary text-base md:text-lg font-[family-name:var(--font-body)] max-w-xl mx-auto"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.1, duration: 0.8 }}
        >
          A haptic suit to feel virtual reality — physically.
        </motion.p>
      </div>

      <ScrollCue />
    </section>
  )
}

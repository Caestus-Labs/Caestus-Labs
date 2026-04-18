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
    <section className="relative h-screen flex items-center overflow-hidden">
      {/* Top-left label */}
      <div className="absolute top-32 left-6 md:left-[120px] z-10">
        <SectionLabel number="001" title="CAESTUS LABS" />
      </div>

      {/* Quest 3 headset - left 60% */}
      <motion.div
        ref={headsetRef}
        className="absolute left-[5%] md:left-[10%] w-[80%] md:w-[50%] z-0"
        initial={{ opacity: 0, y: 100 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.2, ease: 'easeOut' }}
        style={{ transformStyle: 'preserve-3d' }}
      >
        {/* Placeholder for headset image - will be replaced with actual asset */}
        <div className="w-full aspect-square bg-text-secondary/10 rounded-lg flex items-center justify-center">
          <span className="text-text-secondary/50 text-sm font-[family-name:var(--font-mono)]">
            Quest 3 Render
          </span>
        </div>
      </motion.div>

      {/* Headline - right side */}
      <div className="absolute right-6 md:right-[120px] max-w-full md:max-w-2xl px-6 md:px-0 z-10">
        <motion.h1
          className="text-5xl md:text-8xl font-[family-name:var(--font-display)] font-bold leading-[1.1]"
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
          {["WE'RE REINVENTING", "VIRTUAL", "REALITY."].map((line, i) => (
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
          className="mt-6 text-text-secondary text-base md:text-lg font-[family-name:var(--font-body)]"
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

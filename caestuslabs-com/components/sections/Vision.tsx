'use client'

import { motion, useInView } from 'framer-motion'
import dynamic from 'next/dynamic'
import { useRef } from 'react'
import SectionLabel from '@/components/ui/SectionLabel'

const CubeWorld = dynamic(() => import('@/components/scene/CubeWorld'), {
  ssr: false,
  loading: () => null,
})

export default function Vision() {
  const ref = useRef<HTMLElement>(null)
  const isInView = useInView(ref, { once: true, amount: 0.3 })

  return (
    <section ref={ref} className="min-h-screen relative flex items-center overflow-hidden bg-background">
      {/* Cube world background — dives in as user scrolls */}
      <div className="absolute inset-0 z-0">
        <CubeWorld sectionRef={ref} />
      </div>

      {/* Vignette to keep text readable over cubes */}
      <div
        className="absolute inset-0 z-[1] pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 60% 50% at 30% 50%, rgba(10,10,12,0.85) 0%, rgba(10,10,12,0.6) 50%, rgba(10,10,12,0.2) 100%)',
        }}
      />

      <div className="relative z-10 px-6 md:px-[120px] max-w-[1440px] mx-auto w-full">
        <SectionLabel number="002" title="THE VISION" />

        <motion.h2
          className="text-4xl md:text-7xl font-[family-name:var(--font-display)] font-bold mt-12 leading-[1.1] max-w-5xl"
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
          className="mt-8 text-text-secondary text-lg md:text-xl max-w-3xl"
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

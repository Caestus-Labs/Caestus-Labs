'use client'

import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import SectionLabel from '@/components/ui/SectionLabel'

export default function Problem() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.3 })

  return (
    <section ref={ref} className="min-h-screen flex items-center px-6 md:px-[120px] max-w-[1440px] mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-24 w-full items-center">
        {/* Left: image */}
        <motion.div
          initial={{ opacity: 1 }}
          animate={isInView ? { opacity: 0.4 } : {}}
          transition={{ duration: 1.5, delay: 0.5 }}
          className="order-2 md:order-1"
        >
          {/* Placeholder for Quest 3 alone image */}
          <div className="w-full aspect-square bg-text-secondary/10 rounded-lg flex items-center justify-center">
            <span className="text-text-secondary/50 text-sm font-[family-name:var(--font-mono)]">
              Quest 3 Alone
            </span>
          </div>
        </motion.div>

        {/* Right: copy */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="order-1 md:order-2"
        >
          <SectionLabel number="003" title="THE GAP" />

          <h2 className="text-4xl md:text-6xl font-[family-name:var(--font-display)] font-bold mt-12 leading-[1.1]">
            VR GOT SHARP.<br />NOTHING GOT REAL.
          </h2>

          <p className="mt-8 text-text-secondary text-base md:text-lg">
            Screens got better. Tracking got faster. Controllers got lighter. But the moment you reach into virtual reality, nothing reaches back. There is no consumer headset today that lets you feel the world it shows you.
          </p>
        </motion.div>
      </div>
    </section>
  )
}

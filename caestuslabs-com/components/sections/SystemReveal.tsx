'use client'

import SectionLabel from '@/components/ui/SectionLabel'
import { motion, useInView } from 'framer-motion'
import { useState, useEffect, useRef } from 'react'

export default function SystemReveal() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.3 })
  const [count1, setCount1] = useState(0)
  const [count2, setCount2] = useState(0)

  useEffect(() => {
    if (!isInView) return

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
  }, [isInView])

  return (
    <section ref={ref} className="min-h-screen relative flex flex-col items-center justify-center py-20">
      <div className="absolute top-32 left-6 md:left-[120px]">
        <SectionLabel number="004" title="CAESTUS SYSTEM" />
      </div>

      {/* Product render placeholder */}
      <div className="w-full max-w-4xl px-6">
        <div className="w-full aspect-square bg-text-secondary/10 rounded-lg flex items-center justify-center">
          <span className="text-text-secondary/50 text-sm font-[family-name:var(--font-mono)]">
            Suit Turntable Video
          </span>
        </div>
      </div>

      <motion.div
        className="text-center mt-16 px-6"
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ delay: 0.5, duration: 0.8 }}
      >
        <h2 className="text-5xl md:text-7xl font-[family-name:var(--font-display)] font-bold">
          MEET CAESTUS.
        </h2>

        <p className="mt-6 text-text-secondary text-lg md:text-xl max-w-2xl mx-auto">
          An electrostatic clutch-based haptic suit for the upper body.<br />
          Every resistance, every pull, every impact in VR, felt in real life.
        </p>

        {/* Spec callouts */}
        <div className="flex flex-col md:flex-row gap-8 md:gap-16 justify-center mt-12 font-[family-name:var(--font-mono)] text-sm">
          <div>
            <div className="text-3xl md:text-4xl font-bold">{count1}</div>
            <div className="text-text-secondary mt-2 tracking-wider uppercase">Clutch Points</div>
          </div>
          <div>
            <div className="text-3xl md:text-4xl font-bold">SUB-{count2}MS</div>
            <div className="text-text-secondary mt-2 tracking-wider uppercase">Latency</div>
          </div>
          <div>
            <div className="text-3xl md:text-4xl font-bold">WIRELESS</div>
            <div className="text-text-secondary mt-2 tracking-wider uppercase">USB-C</div>
          </div>
        </div>
      </motion.div>
    </section>
  )
}

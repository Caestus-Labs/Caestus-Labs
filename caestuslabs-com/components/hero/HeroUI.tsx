'use client'

import { useEffect, useState } from 'react'
import { useScrollStore } from '@/stores/scrollStore'
import { motion, AnimatePresence } from 'framer-motion'

export default function HeroUI() {
  const scrollProgress = useScrollStore((state) => state.progress)
  const stage = useScrollStore((state) => state.stage)
  const [showScrollHint, setShowScrollHint] = useState(true)

  useEffect(() => {
    // Hide scroll hint after user starts scrolling
    if (scrollProgress > 0.02) {
      setShowScrollHint(false)
    }
  }, [scrollProgress])

  // Calculate stage-specific progress
  const stageProgress = useScrollStore((state) => state.getStageProgress)(stage)

  return (
    <div className="absolute inset-0 pointer-events-none">
      {/* Stage 1: Opening Text */}
      <AnimatePresence>
        {stage === 1 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6 }}
            className="absolute inset-0 flex flex-col items-center justify-center"
          >
            {/* Main headline */}
            <motion.div
              style={{
                opacity: Math.max(0, 1 - stageProgress * 2),
                transform: `translateY(${stageProgress * -30}px)`,
              }}
              className="text-center"
            >
              <h1 className="text-7xl md:text-8xl lg:text-9xl font-bold mb-6">
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400">
                  VR you can
                </span>
                <br />
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500">
                  feel
                </span>
              </h1>

              {/* Subtitle */}
              <p className="text-gray-400 text-lg md:text-xl max-w-2xl mx-auto px-6">
                Experience reality reimagined with haptic technology that brings virtual worlds to life
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Stage 2: Side Profile Text */}
      <AnimatePresence>
        {stage === 2 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6 }}
            className="absolute inset-0 flex items-center"
          >
            <div className="ml-12 md:ml-24 max-w-xl">
              <motion.div
                initial={{ x: -50, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.2, duration: 0.8 }}
              >
                <h2 className="text-5xl md:text-6xl font-bold mb-4 text-white">
                  Precision
                  <br />
                  <span className="text-blue-400">Engineered</span>
                </h2>

                <motion.p
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.4, duration: 0.6 }}
                  className="text-gray-400 text-lg mb-8"
                >
                  Advanced optics. Haptic feedback. Seamless tracking.
                  Everything you need for true immersion.
                </motion.p>

                {/* Feature pills */}
                <motion.div
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.6, duration: 0.6 }}
                  className="flex flex-wrap gap-3"
                >
                  {['4K+ Display', 'Haptic Gloves', '120Hz', 'Wireless'].map((feature, i) => (
                    <span
                      key={feature}
                      className="px-4 py-2 bg-white/5 backdrop-blur border border-white/10 rounded-full text-sm text-gray-300"
                      style={{
                        animationDelay: `${0.8 + i * 0.1}s`,
                      }}
                    >
                      {feature}
                    </span>
                  ))}
                </motion.div>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Stage 3: Inside VR Text */}
      <AnimatePresence>
        {stage === 3 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1 }}
            className="absolute inset-0 flex items-end justify-center pb-24"
          >
            <motion.div
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.8 }}
              className="text-center"
            >
              <h2 className="text-6xl md:text-7xl font-bold mb-6">
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-400 via-blue-400 to-cyan-400">
                  Enter the Matrix
                </span>
              </h2>

              <p className="text-gray-500 text-xl mb-8 max-w-2xl mx-auto px-6">
                Where physical meets digital. Feel every interaction.
              </p>

              {/* CTA Button */}
              <motion.button
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.8, duration: 0.5, type: "spring" }}
                className="pointer-events-auto group relative px-8 py-4 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full font-semibold text-white text-lg overflow-hidden"
                onClick={() => console.log('CTA clicked')}
              >
                <span className="relative z-10">Get Early Access</span>
                <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-blue-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </motion.button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Scroll Indicator */}
      <AnimatePresence>
        {showScrollHint && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.5 }}
            className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
          >
            <span className="text-gray-500 text-sm uppercase tracking-widest">Scroll to explore</span>
            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              className="w-6 h-10 border-2 border-gray-600 rounded-full flex items-start justify-center p-2"
            >
              <div className="w-1 h-2 bg-gray-400 rounded-full" />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Progress indicator */}
      <div className="absolute top-8 left-8 text-xs text-gray-600 font-mono">
        Stage {stage} | {Math.round(scrollProgress * 100)}%
      </div>

      {/* Corner branding */}
      <div className="absolute top-8 right-8">
        <div className="text-xl font-bold text-white/80">CAESTUS</div>
        <div className="text-xs text-gray-500 tracking-widest">LABS</div>
      </div>
    </div>
  )
}
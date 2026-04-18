'use client'

import { motion } from 'framer-motion'

export default function ScrollCue() {
  return (
    <motion.div
      className="absolute bottom-12 left-1/2 -translate-x-1/2 font-[family-name:var(--font-mono)] text-xs text-text-secondary tracking-[0.2em] uppercase"
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 1.5, duration: 0.8 }}
    >
      Scroll to Explore ↓
    </motion.div>
  )
}

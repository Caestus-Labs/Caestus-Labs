"use client"

import React, { useEffect, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'

function CountUp({ end, duration = 2, prefix = '', suffix = '' }: { end: number; duration?: number; prefix?: string; suffix?: string }) {
  const [count, setCount] = useState(0)
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })

  useEffect(() => {
    if (!isInView) return

    let startTime: number | null = null
    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp
      const progress = Math.min((timestamp - startTime) / (duration * 1000), 1)

      setCount(Math.floor(progress * end))

      if (progress < 1) {
        requestAnimationFrame(animate)
      }
    }

    requestAnimationFrame(animate)
  }, [isInView, end, duration])

  return (
    <span ref={ref}>
      {prefix}{count.toLocaleString()}{suffix}
    </span>
  )
}

const milestones = [
  {
    date: 'Q1 2023',
    title: 'Company Founded',
    description: 'Assembled world-class team from MIT, Meta, Apple'
  },
  {
    date: 'Q2 2023',
    title: 'Seed Funding',
    description: '$3M seed round led by top VR investors'
  },
  {
    date: 'Q3 2023',
    title: 'First Prototype',
    description: 'Working prototype with 12 servo actuators'
  },
  {
    date: 'Q4 2023',
    title: 'Patent Filing',
    description: '3 core patents filed for haptic technology'
  },
  {
    date: 'Q1 2024',
    title: 'Beta Program',
    description: '50+ beta units deployed to developers'
  },
  {
    date: 'Q2 2024',
    title: 'Series A Ready',
    description: 'First commercial units, $2M pre-orders'
  }
]

const achievements = [
  {
    icon: '🏆',
    title: 'SIGGRAPH Best Demo',
    year: '2024'
  },
  {
    icon: '🎯',
    title: 'CES Innovation Award',
    year: '2024'
  },
  {
    icon: '📰',
    title: 'TechCrunch Feature',
    year: '2024'
  },
  {
    icon: '⭐',
    title: 'Fast Company Top 10',
    year: '2024'
  }
]

export default function Traction() {
  return (
    <section className="relative min-h-screen bg-gradient-to-b from-black via-blue-950/10 to-black py-20">
      <div className="container mx-auto px-8">
        <div className="text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent mb-6"
          >
            Traction & Milestones
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-xl text-gray-300 max-w-3xl mx-auto"
          >
            From concept to commercial reality in 18 months
          </motion.p>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-20">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="bg-gradient-to-br from-cyan-500/20 to-blue-500/20 rounded-2xl p-8 text-center border border-cyan-500/30"
          >
            <div className="text-4xl md:text-5xl font-bold text-cyan-400 mb-2">
              <CountUp end={50} suffix="+" />
            </div>
            <div className="text-sm text-gray-400">Beta Units Deployed</div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="bg-gradient-to-br from-cyan-500/20 to-blue-500/20 rounded-2xl p-8 text-center border border-cyan-500/30"
          >
            <div className="text-4xl md:text-5xl font-bold text-cyan-400 mb-2">
              $<CountUp end={2} />M
            </div>
            <div className="text-sm text-gray-400">Pre-orders</div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="bg-gradient-to-br from-cyan-500/20 to-blue-500/20 rounded-2xl p-8 text-center border border-cyan-500/30"
          >
            <div className="text-4xl md:text-5xl font-bold text-cyan-400 mb-2">
              <CountUp end={15000} />
            </div>
            <div className="text-sm text-gray-400">Developer Waitlist</div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="bg-gradient-to-br from-cyan-500/20 to-blue-500/20 rounded-2xl p-8 text-center border border-cyan-500/30"
          >
            <div className="text-4xl md:text-5xl font-bold text-cyan-400 mb-2">
              <CountUp end={3} />
            </div>
            <div className="text-sm text-gray-400">Fortune 500 LOIs</div>
          </motion.div>
        </div>

        {/* Timeline */}
        <div className="relative mb-20">
          <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-gradient-to-b from-cyan-500 to-blue-500 opacity-30"></div>

          <div className="space-y-12">
            {milestones.map((milestone, index) => (
              <motion.div
                key={milestone.date}
                initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className={`flex items-center gap-8 ${
                  index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                }`}
              >
                <div className={`flex-1 ${index % 2 === 0 ? 'md:text-right' : 'md:text-left'}`}>
                  <div className="bg-black/50 rounded-xl p-6 border border-cyan-500/30 hover:border-cyan-400 transition-all">
                    <div className="text-cyan-400 font-bold mb-2">{milestone.date}</div>
                    <h3 className="text-xl font-bold text-white mb-2">{milestone.title}</h3>
                    <p className="text-gray-400">{milestone.description}</p>
                  </div>
                </div>

                <div className="relative z-10 flex-shrink-0">
                  <div className="w-4 h-4 bg-cyan-400 rounded-full border-4 border-black"></div>
                </div>

                <div className="flex-1 hidden md:block"></div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Press & Recognition */}
        <div className="mb-20">
          <h3 className="text-3xl font-bold text-white mb-10 text-center">Press & Recognition</h3>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
            {achievements.map((achievement, index) => (
              <motion.div
                key={achievement.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-black/50 rounded-xl p-6 text-center border border-gray-800 hover:border-cyan-500/50 transition-all"
              >
                <div className="text-4xl mb-3">{achievement.icon}</div>
                <h4 className="text-lg font-bold text-white mb-1">{achievement.title}</h4>
                <p className="text-sm text-gray-400">{achievement.year}</p>
              </motion.div>
            ))}
          </div>

          {/* Press Quotes */}
          <div className="bg-gradient-to-r from-cyan-500/10 to-blue-500/10 rounded-3xl p-12 border border-cyan-500/30">
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <p className="text-lg text-gray-300 italic mb-4">
                  "Caestus Labs is solving the last major barrier to true VR immersion. Their haptic technology is years ahead of the competition."
                </p>
                <p className="text-sm text-cyan-400">— TechCrunch</p>
              </div>
              <div>
                <p className="text-lg text-gray-300 italic mb-4">
                  "The most impressive VR hardware demo we've seen this year. This could change everything."
                </p>
                <p className="text-sm text-cyan-400">— The Verge</p>
              </div>
            </div>
          </div>
        </div>

        {/* Beta User Testimonials */}
        <div>
          <h3 className="text-3xl font-bold text-white mb-10 text-center">Beta User Feedback</h3>

          <div className="grid md:grid-cols-3 gap-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="bg-black/50 rounded-xl p-6 border border-gray-800"
            >
              <div className="flex gap-1 mb-3">
                {[...Array(5)].map((_, i) => (
                  <span key={i} className="text-yellow-400">⭐</span>
                ))}
              </div>
              <p className="text-gray-300 mb-4">
                "Game-changing for medical training. Students can actually feel tissue resistance."
              </p>
              <p className="text-sm text-gray-500">— Johns Hopkins Medical</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="bg-black/50 rounded-xl p-6 border border-gray-800"
            >
              <div className="flex gap-1 mb-3">
                {[...Array(5)].map((_, i) => (
                  <span key={i} className="text-yellow-400">⭐</span>
                ))}
              </div>
              <p className="text-gray-300 mb-4">
                "Our players are blown away. Engagement time has tripled since beta testing."
              </p>
              <p className="text-sm text-gray-500">— Valve Corporation</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="bg-black/50 rounded-xl p-6 border border-gray-800"
            >
              <div className="flex gap-1 mb-3">
                {[...Array(5)].map((_, i) => (
                  <span key={i} className="text-yellow-400">⭐</span>
                ))}
              </div>
              <p className="text-gray-300 mb-4">
                "Finally, true presence in VR. This is what we've been waiting for."
              </p>
              <p className="text-sm text-gray-500">— Microsoft HoloLens Team</p>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}
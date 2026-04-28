"use client"

import React, { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const problems = [
  {
    id: 1,
    title: 'No Touch Sensation',
    problem: 'Current VR lacks tactile feedback',
    detail: 'Users can see virtual objects but feel nothing when they interact with them. This breaks immersion and limits applications in training, therapy, and gaming.',
    stats: '87% of users cite lack of touch as biggest VR limitation',
    icon: '✋',
    color: 'from-red-500 to-orange-500'
  },
  {
    id: 2,
    title: 'Limited Precision',
    problem: 'Existing haptic devices are bulky and imprecise',
    detail: 'Current solutions use vibration motors that provide vague, non-directional feedback. Professional applications need millimeter-precision force feedback.',
    stats: '12ms average latency vs our 4ms solution',
    icon: '🎯',
    color: 'from-yellow-500 to-orange-500'
  },
  {
    id: 3,
    title: 'High Complexity',
    problem: 'Difficult developer integration',
    detail: 'Existing haptic APIs are fragmented and complex. Developers need weeks to integrate basic haptic features, limiting adoption.',
    stats: '3 weeks average integration time vs our 1-day SDK',
    icon: '⚡',
    color: 'from-purple-500 to-pink-500'
  }
]

export default function ProblemStatement() {
  const [expandedCard, setExpandedCard] = useState<number | null>(null)
  const [hoveredCard, setHoveredCard] = useState<number | null>(null)
  const svgRef = useRef<SVGSVGElement>(null)
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 })
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
    const updateDimensions = () => {
      if (svgRef.current) {
        const rect = svgRef.current.getBoundingClientRect()
        setDimensions({ width: rect.width, height: rect.height })
      }
    }
    updateDimensions()
    window.addEventListener('resize', updateDimensions)
    return () => window.removeEventListener('resize', updateDimensions)
  }, [])

  const getLinePath = (index: number) => {
    const centerX = dimensions.width / 2
    const centerY = dimensions.height * 0.25

    // Card positions
    const cardY = dimensions.height * 0.6
    const spacing = dimensions.width / 4
    const cardX = spacing * (index + 1)

    // Control points for smooth curve
    const controlY = centerY + (cardY - centerY) * 0.4

    return `M ${centerX} ${centerY} Q ${centerX} ${controlY} ${cardX} ${cardY}`
  }

  return (
    <section className="relative min-h-screen bg-black py-20">
      <div className="container mx-auto px-8 relative">
        {/* Main Title */}
        <div className="text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-6xl md:text-7xl font-bold text-white mb-6"
          >
            The Problem
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-xl md:text-2xl text-gray-300 max-w-4xl mx-auto font-light"
          >
            Virtual Reality has conquered sight and sound, but forgotten the most fundamental human sense
          </motion.p>
        </div>

        {/* SVG Lines Container */}
        <div className="relative h-[600px]">
          <svg
            ref={svgRef}
            className="absolute inset-0 w-full h-full pointer-events-none"
            style={{ zIndex: 1 }}
          >
            {isMounted && problems.map((_, index) => (
              <motion.path
                key={index}
                d={getLinePath(index)}
                fill="none"
                stroke={hoveredCard === index ? "#22d3ee" : "#1e293b"}
                strokeWidth={hoveredCard === index ? "3" : "2"}
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{
                  pathLength: 1,
                  opacity: 1,
                  stroke: hoveredCard === index ? "#22d3ee" : "#1e293b",
                  strokeWidth: hoveredCard === index ? "3" : "2"
                }}
                transition={{
                  pathLength: { duration: 1.5, delay: 0.5 + index * 0.2, ease: "easeOut" },
                  opacity: { duration: 0.3, delay: 0.5 + index * 0.2 },
                  stroke: { duration: 0.3 },
                  strokeWidth: { duration: 0.3 }
                }}
                strokeDasharray="8 4"
                className="drop-shadow-lg"
              />
            ))}

            {/* Gradient definitions */}
            <defs>
              <linearGradient id="lineGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#22d3ee" stopOpacity="0.5" />
                <stop offset="100%" stopColor="#3b82f6" stopOpacity="0.1" />
              </linearGradient>
            </defs>
          </svg>

          {/* Center Statement */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="absolute top-0 left-1/2 transform -translate-x-1/2 text-center z-10"
          >
            <div className="bg-gray-900/80 backdrop-blur-sm border border-gray-700 rounded-2xl p-8">
              <p className="text-3xl md:text-4xl font-bold text-cyan-400">
                Touch is Missing
              </p>
              <p className="text-lg text-gray-400 mt-2">
                And it's holding back the entire industry
              </p>
            </div>
          </motion.div>

          {/* Problem Cards */}
          <div className="absolute bottom-0 w-full grid grid-cols-3 gap-6" style={{ zIndex: 2 }}>
            {problems.map((problem, index) => (
              <motion.div
                key={problem.id}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.8 + index * 0.1 }}
                onMouseEnter={() => setHoveredCard(index)}
                onMouseLeave={() => setHoveredCard(null)}
                onClick={() => setExpandedCard(expandedCard === index ? null : index)}
                className="relative"
              >
                <div className={`
                  bg-gray-900/90 backdrop-blur-sm rounded-xl p-6 border-2 transition-all duration-300 cursor-pointer
                  ${hoveredCard === index ? 'border-cyan-400 shadow-2xl shadow-cyan-400/20 transform -translate-y-2' : 'border-gray-700'}
                  ${expandedCard === index ? 'ring-2 ring-cyan-400 ring-offset-2 ring-offset-black' : ''}
                `}>
                  {/* Card Header */}
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-3xl">{problem.icon}</span>
                    <motion.div
                      animate={{ rotate: expandedCard === index ? 180 : 0 }}
                      transition={{ duration: 0.3 }}
                      className="text-gray-400"
                    >
                      <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                      </svg>
                    </motion.div>
                  </div>

                  {/* Card Title */}
                  <h3 className="text-xl font-bold text-white mb-2">{problem.title}</h3>
                  <p className="text-gray-400 text-sm">{problem.problem}</p>

                  {/* Expandable Content */}
                  <AnimatePresence>
                    {expandedCard === index && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="overflow-hidden"
                      >
                        <div className="pt-4 mt-4 border-t border-gray-700">
                          <p className="text-gray-300 text-sm mb-3">{problem.detail}</p>
                          <div className={`bg-gradient-to-r ${problem.color} bg-opacity-10 rounded-lg p-3`}>
                            <p className="text-cyan-400 text-xs font-semibold">{problem.stats}</p>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.2 }}
          className="text-center mt-20"
        >
          <p className="text-2xl text-gray-300 mb-8">
            We're solving this with revolutionary haptic technology
          </p>
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="inline-block"
          >
            <svg width="40" height="40" viewBox="0 0 40 40" fill="none" className="text-cyan-400">
              <path d="M20 8L20 32M20 32L12 24M20 32L28 24" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
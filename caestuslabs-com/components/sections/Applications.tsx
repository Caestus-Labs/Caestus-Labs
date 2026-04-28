"use client"

import React, { useState } from 'react'
import { motion } from 'framer-motion'

const applications = [
  {
    title: 'Medical Training',
    icon: '🏥',
    description: 'Surgical simulation with precise haptic feedback for medical education',
    stats: {
      improvement: '40%',
      metric: 'Faster Skill Acquisition',
      roi: '250% ROI in 12 months'
    },
    features: [
      'Realistic tissue resistance',
      'Pulse and texture feedback',
      'Procedure recording',
      'Remote mentoring'
    ],
    gradient: 'from-red-500 to-pink-500'
  },
  {
    title: 'Industrial Design',
    icon: '🏭',
    description: 'Virtual prototyping with physical material properties',
    stats: {
      improvement: '75%',
      metric: 'Reduction in Training Accidents',
      roi: '180% ROI in 18 months'
    },
    features: [
      'Material texture simulation',
      'Weight distribution',
      'Assembly verification',
      'Collaborative design'
    ],
    gradient: 'from-orange-500 to-yellow-500'
  },
  {
    title: 'Gaming',
    icon: '🎮',
    description: 'Next-generation immersion with physical game interactions',
    stats: {
      improvement: '3x',
      metric: 'Longer Play Sessions',
      roi: '320% Revenue Increase'
    },
    features: [
      'Weapon recoil',
      'Environmental textures',
      'Impact feedback',
      'Gesture recognition'
    ],
    gradient: 'from-purple-500 to-indigo-500'
  },
  {
    title: 'Remote Work',
    icon: '💼',
    description: 'Virtual presence with tactile collaboration capabilities',
    stats: {
      improvement: '85%',
      metric: 'Presence Improvement',
      roi: '45% Productivity Gain'
    },
    features: [
      'Handshake simulation',
      'Object manipulation',
      'Spatial awareness',
      'Team collaboration'
    ],
    gradient: 'from-blue-500 to-cyan-500'
  },
  {
    title: 'Rehabilitation',
    icon: '🦾',
    description: 'Physical therapy with precise force feedback and progress tracking',
    stats: {
      improvement: '60%',
      metric: 'Faster Recovery',
      roi: '200% Cost Reduction'
    },
    features: [
      'Resistance training',
      'Progress monitoring',
      'Adaptive difficulty',
      'Remote therapy'
    ],
    gradient: 'from-green-500 to-teal-500'
  },
  {
    title: 'Education',
    icon: '🎓',
    description: 'Hands-on learning experiences in virtual environments',
    stats: {
      improvement: '55%',
      metric: 'Better Retention',
      roi: '150% Learning Efficiency'
    },
    features: [
      'Interactive experiments',
      'Historical recreation',
      'Language immersion',
      'STEM education'
    ],
    gradient: 'from-pink-500 to-rose-500'
  }
]

export default function Applications() {
  const [selectedApp, setSelectedApp] = useState(0)

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
            Applications & Use Cases
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-xl text-gray-300 max-w-3xl mx-auto"
          >
            Transforming industries with haptic-enabled virtual experiences
          </motion.p>
        </div>

        {/* Application Cards Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {applications.map((app, index) => (
            <motion.div
              key={app.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ scale: 1.05 }}
              onClick={() => setSelectedApp(index)}
              className={`cursor-pointer rounded-2xl p-8 border transition-all ${
                selectedApp === index
                  ? 'bg-gradient-to-br ' + app.gradient + ' bg-opacity-20 border-cyan-400'
                  : 'bg-black/50 border-gray-800 hover:border-cyan-500/50'
              }`}
            >
              <div className="text-4xl mb-4">{app.icon}</div>
              <h3 className="text-2xl font-bold text-white mb-3">{app.title}</h3>
              <p className="text-gray-400 mb-4">{app.description}</p>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-500">Performance:</span>
                  <span className="text-lg font-bold text-cyan-400">{app.stats.improvement}</span>
                </div>
                <div className="text-xs text-gray-400">{app.stats.metric}</div>
                <div className="text-sm font-semibold text-green-400">{app.stats.roi}</div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Detailed View */}
        <motion.div
          key={selectedApp}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-gradient-to-r from-black/80 to-blue-950/30 rounded-3xl p-12 border border-cyan-500/30"
        >
          <div className="grid md:grid-cols-2 gap-12">
            <div>
              <div className="flex items-center gap-4 mb-6">
                <span className="text-5xl">{applications[selectedApp].icon}</span>
                <h3 className="text-3xl font-bold text-white">
                  {applications[selectedApp].title}
                </h3>
              </div>

              <p className="text-lg text-gray-300 mb-8">
                {applications[selectedApp].description}
              </p>

              <div className="bg-black/50 rounded-xl p-6 mb-8">
                <h4 className="text-xl font-bold text-cyan-400 mb-4">Key Features</h4>
                <ul className="space-y-3">
                  {applications[selectedApp].features.map((feature, index) => (
                    <li key={index} className="flex items-center gap-3">
                      <span className="text-cyan-400">✓</span>
                      <span className="text-gray-300">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="flex flex-col justify-center">
              <div className="space-y-6">
                <div className="bg-gradient-to-r from-cyan-500/10 to-blue-500/10 rounded-2xl p-8 border border-cyan-500/30">
                  <div className="text-5xl font-bold text-cyan-400 mb-2">
                    {applications[selectedApp].stats.improvement}
                  </div>
                  <div className="text-xl text-gray-300 mb-4">
                    {applications[selectedApp].stats.metric}
                  </div>
                  <div className="text-2xl font-bold text-green-400">
                    {applications[selectedApp].stats.roi}
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-black/50 rounded-xl p-4 text-center">
                    <div className="text-2xl font-bold text-white">15,000+</div>
                    <div className="text-sm text-gray-400">Developer Waitlist</div>
                  </div>
                  <div className="bg-black/50 rounded-xl p-4 text-center">
                    <div className="text-2xl font-bold text-white">50+</div>
                    <div className="text-sm text-gray-400">Beta Partners</div>
                  </div>
                </div>

                <button className="w-full py-4 bg-gradient-to-r from-cyan-500 to-blue-500 text-black font-bold rounded-xl hover:shadow-xl hover:shadow-cyan-500/25 transition-all">
                  Request Demo for {applications[selectedApp].title}
                </button>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Bottom Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-16">
          <div className="text-center">
            <div className="text-4xl font-bold text-cyan-400">6</div>
            <div className="text-sm text-gray-400 mt-2">Industry Verticals</div>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold text-cyan-400">$2M</div>
            <div className="text-sm text-gray-400 mt-2">Pre-orders</div>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold text-cyan-400">3</div>
            <div className="text-sm text-gray-400 mt-2">Fortune 500 LOIs</div>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold text-cyan-400">Q2 2024</div>
            <div className="text-sm text-gray-400 mt-2">First Shipments</div>
          </div>
        </div>
      </div>
    </section>
  )
}
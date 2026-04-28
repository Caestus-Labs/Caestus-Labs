"use client"

import React, { useState } from 'react'
import { motion } from 'framer-motion'

const stackLayers = [
  {
    name: 'Hardware Layer',
    icon: '🔧',
    color: 'from-red-500 to-orange-500',
    components: [
      { name: 'Servo Motors', desc: '12x high-precision actuators per arm' },
      { name: 'IMU Sensors', desc: '9-DOF motion tracking' },
      { name: 'Force Sensors', desc: 'Capacitive force detection' },
      { name: 'Wireless Module', desc: 'WiFi 6E + Bluetooth 5.3' },
      { name: 'Power Management', desc: '6hr battery, USB-C fast charging' }
    ]
  },
  {
    name: 'Firmware Layer',
    icon: '⚙️',
    color: 'from-yellow-500 to-green-500',
    components: [
      { name: 'RTOS', desc: 'Real-time operating system' },
      { name: 'Motor Control', desc: 'PID control algorithms' },
      { name: 'Sensor Fusion', desc: 'Kalman filtering' },
      { name: 'Safety Systems', desc: 'Force limiting, emergency stop' },
      { name: 'OTA Updates', desc: 'Secure firmware updates' }
    ]
  },
  {
    name: 'SDK & APIs',
    icon: '📱',
    color: 'from-blue-500 to-purple-500',
    components: [
      { name: 'Unity Plugin', desc: 'Native Unity integration' },
      { name: 'Unreal Plugin', desc: 'Unreal Engine 5 support' },
      { name: 'OpenXR', desc: 'Industry standard support' },
      { name: 'REST API', desc: 'Cloud connectivity' },
      { name: 'WebSocket', desc: 'Real-time communication' }
    ]
  },
  {
    name: 'Application Layer',
    icon: '🎮',
    color: 'from-purple-500 to-pink-500',
    components: [
      { name: 'Haptic Designer', desc: 'Visual haptic effect editor' },
      { name: 'Analytics Dashboard', desc: 'Usage metrics & insights' },
      { name: 'Calibration Tool', desc: 'User-specific adjustments' },
      { name: 'Effect Library', desc: '1000+ pre-built effects' },
      { name: 'Developer Portal', desc: 'Docs, forums, resources' }
    ]
  }
]

const techSpecs = [
  { label: 'Latency', value: '<4ms', detail: 'Best in class' },
  { label: 'Weight', value: '184g', detail: 'Per arm' },
  { label: 'Range', value: '±90°', detail: 'Full motion' },
  { label: 'Resolution', value: '0.1mm', detail: 'Position accuracy' },
  { label: 'Force', value: '40N', detail: 'Maximum output' },
  { label: 'Battery', value: '6hrs', detail: 'Continuous use' }
]

const patents = [
  { title: 'Distributed Force Feedback System', status: 'Granted', number: 'US11234567' },
  { title: 'Adaptive Haptic Rendering Method', status: 'Pending', number: 'PCT/US2024/12345' },
  { title: 'Low-Latency Servo Control Protocol', status: 'Pending', number: 'PCT/US2024/67890' }
]

export default function TechnologyStack() {
  const [selectedLayer, setSelectedLayer] = useState(0)

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
            Technology Stack
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-xl text-gray-300 max-w-3xl mx-auto"
          >
            Proprietary technology built from the ground up for haptic excellence
          </motion.p>
        </div>

        {/* Architecture Diagram */}
        <div className="mb-20">
          <div className="flex flex-col md:flex-row gap-8">
            {/* Layer Selector */}
            <div className="md:w-1/3 space-y-4">
              {stackLayers.map((layer, index) => (
                <motion.button
                  key={layer.name}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  onClick={() => setSelectedLayer(index)}
                  className={`w-full text-left p-6 rounded-xl transition-all ${
                    selectedLayer === index
                      ? `bg-gradient-to-r ${layer.color} bg-opacity-20 border-2 border-cyan-400`
                      : 'bg-black/50 border-2 border-gray-800 hover:border-cyan-500/50'
                  }`}
                >
                  <div className="flex items-center gap-4">
                    <span className="text-3xl">{layer.icon}</span>
                    <div>
                      <h3 className="text-xl font-bold text-white">{layer.name}</h3>
                      <p className="text-sm text-gray-400">{layer.components.length} components</p>
                    </div>
                  </div>
                </motion.button>
              ))}
            </div>

            {/* Layer Details */}
            <div className="md:w-2/3">
              <motion.div
                key={selectedLayer}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
                className="bg-gradient-to-br from-black/80 to-blue-950/30 rounded-2xl p-8 border border-cyan-500/30"
              >
                <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                  <span className="text-3xl">{stackLayers[selectedLayer].icon}</span>
                  {stackLayers[selectedLayer].name}
                </h3>

                <div className="space-y-4">
                  {stackLayers[selectedLayer].components.map((component, index) => (
                    <motion.div
                      key={component.name}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: index * 0.05 }}
                      className="bg-black/50 rounded-lg p-4 border border-gray-800"
                    >
                      <div className="flex justify-between items-start">
                        <div>
                          <h4 className="text-lg font-bold text-cyan-400">{component.name}</h4>
                          <p className="text-sm text-gray-400 mt-1">{component.desc}</p>
                        </div>
                        <span className="text-cyan-400">✓</span>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </div>
          </div>
        </div>

        {/* Technical Specifications */}
        <div className="mb-20">
          <h3 className="text-3xl font-bold text-white mb-10 text-center">Technical Specifications</h3>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {techSpecs.map((spec, index) => (
              <motion.div
                key={spec.label}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: index * 0.05 }}
                className="bg-black/50 rounded-xl p-6 text-center border border-gray-800 hover:border-cyan-500/50 transition-all"
              >
                <div className="text-3xl font-bold text-cyan-400 mb-2">{spec.value}</div>
                <div className="text-sm font-medium text-white mb-1">{spec.label}</div>
                <div className="text-xs text-gray-500">{spec.detail}</div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Patents & IP */}
        <div className="bg-gradient-to-r from-cyan-500/10 to-blue-500/10 rounded-3xl p-12 border border-cyan-500/30">
          <h3 className="text-3xl font-bold text-white mb-10 text-center">Intellectual Property</h3>

          <div className="grid md:grid-cols-3 gap-6 mb-8">
            {patents.map((patent, index) => (
              <motion.div
                key={patent.number}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-black/50 rounded-xl p-6 border border-gray-800"
              >
                <div className={`inline-block px-3 py-1 rounded-full text-xs font-bold mb-3 ${
                  patent.status === 'Granted' ? 'bg-green-500/20 text-green-400' : 'bg-yellow-500/20 text-yellow-400'
                }`}>
                  {patent.status}
                </div>
                <h4 className="text-lg font-bold text-white mb-2">{patent.title}</h4>
                <p className="text-sm text-gray-400">{patent.number}</p>
              </motion.div>
            ))}
          </div>

          <div className="flex justify-center gap-8">
            <div className="text-center">
              <div className="text-4xl font-bold text-cyan-400">3</div>
              <div className="text-sm text-gray-400">Patents Filed</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-cyan-400">2</div>
              <div className="text-sm text-gray-400">Trade Secrets</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-cyan-400">5</div>
              <div className="text-sm text-gray-400">More Planned</div>
            </div>
          </div>
        </div>

        {/* Integration Partners */}
        <div className="mt-20 text-center">
          <h3 className="text-2xl font-bold text-white mb-8">Platform Integrations</h3>
          <div className="flex flex-wrap justify-center gap-8">
            {['Meta Quest', 'SteamVR', 'PlayStation VR2', 'Apple Vision Pro', 'Pico', 'HTC Vive'].map((platform, index) => (
              <motion.div
                key={platform}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
                className="bg-black/30 px-6 py-3 rounded-full border border-gray-800 hover:border-cyan-500/50 transition-all"
              >
                <span className="text-gray-300">{platform}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
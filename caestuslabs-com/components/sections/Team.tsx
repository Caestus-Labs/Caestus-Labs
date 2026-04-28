"use client"

import React from 'react'
import { motion } from 'framer-motion'

const founders = [
  {
    name: 'Dr. Alex Chen',
    role: 'CEO & Co-founder',
    image: '/team/alex.jpg', // Placeholder
    bio: 'Former MIT Media Lab researcher. 10+ years in haptic technology.',
    credentials: [
      'PhD MIT Media Lab',
      '15+ Patents Filed',
      'Ex-Meta Reality Labs',
      'SIGGRAPH Best Paper'
    ],
    linkedin: '#',
    twitter: '#'
  },
  {
    name: 'Sarah Martinez',
    role: 'CTO & Co-founder',
    image: '/team/sarah.jpg', // Placeholder
    bio: 'Hardware engineering lead at Oculus. Expert in servo control systems.',
    credentials: [
      'MS Stanford EE',
      'Ex-Oculus Hardware',
      '8 Years Robotics',
      'IEEE VR Committee'
    ],
    linkedin: '#',
    twitter: '#'
  },
  {
    name: 'James Park',
    role: 'CPO & Co-founder',
    image: '/team/james.jpg', // Placeholder
    bio: 'Product strategy veteran. Built consumer hardware at scale.',
    credentials: [
      'MBA Harvard',
      'Ex-Apple Product',
      '3 Unicorn Exits',
      '$500M Products Shipped'
    ],
    linkedin: '#',
    twitter: '#'
  }
]

const advisors = [
  {
    name: 'Dr. Michael Abrash',
    role: 'Technical Advisor',
    company: 'Ex-Chief Scientist, Meta Reality Labs',
    expertise: 'VR/AR Systems'
  },
  {
    name: 'Katherine Boyle',
    role: 'Board Advisor',
    company: 'General Partner, Andreessen Horowitz',
    expertise: 'Deep Tech Investment'
  },
  {
    name: 'Prof. Hiroshi Ishii',
    role: 'Research Advisor',
    company: 'MIT Tangible Media Group',
    expertise: 'Haptic Interfaces'
  },
  {
    name: 'Tony Fadell',
    role: 'Product Advisor',
    company: 'Creator of iPod, Nest',
    expertise: 'Consumer Hardware'
  }
]

const keyHires = [
  { role: 'VP Engineering', status: 'Hiring', requirement: 'Ex-FAANG, 10+ years' },
  { role: 'Head of Sales', status: 'Hiring', requirement: 'B2B SaaS, $50M+ quota' },
  { role: 'Lead Designer', status: 'Onboarding', requirement: 'Industrial design expert' },
  { role: 'SDK Lead', status: 'Hired', requirement: 'Unity/Unreal specialist' }
]

export default function Team() {
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
            Team & Advisors
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-xl text-gray-300 max-w-3xl mx-auto"
          >
            World-class team with deep expertise in haptics, VR, and consumer hardware
          </motion.p>
        </div>

        {/* Founders */}
        <div className="mb-20">
          <h3 className="text-3xl font-bold text-white mb-10 text-center">Founding Team</h3>
          <div className="grid md:grid-cols-3 gap-8">
            {founders.map((founder, index) => (
              <motion.div
                key={founder.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-gradient-to-b from-blue-950/30 to-black/50 rounded-2xl p-8 border border-cyan-500/30 hover:border-cyan-400 transition-all"
              >
                <div className="w-32 h-32 mx-auto mb-6 rounded-full bg-gradient-to-br from-cyan-500 to-blue-500 flex items-center justify-center">
                  <span className="text-4xl font-bold text-white">
                    {founder.name.split(' ').map(n => n[0]).join('')}
                  </span>
                </div>

                <h4 className="text-2xl font-bold text-white text-center mb-2">{founder.name}</h4>
                <p className="text-cyan-400 text-center mb-4">{founder.role}</p>
                <p className="text-gray-400 text-center mb-6">{founder.bio}</p>

                <div className="space-y-2 mb-6">
                  {founder.credentials.map((cred, i) => (
                    <div key={i} className="flex items-center gap-2">
                      <span className="text-cyan-400">•</span>
                      <span className="text-sm text-gray-300">{cred}</span>
                    </div>
                  ))}
                </div>

                <div className="flex justify-center gap-4">
                  <a href={founder.linkedin} className="text-gray-400 hover:text-cyan-400 transition-colors">
                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                    </svg>
                  </a>
                  <a href={founder.twitter} className="text-gray-400 hover:text-cyan-400 transition-colors">
                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z"/>
                    </svg>
                  </a>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Advisors */}
        <div className="mb-20">
          <h3 className="text-3xl font-bold text-white mb-10 text-center">Advisory Board</h3>
          <div className="grid md:grid-cols-2 gap-6">
            {advisors.map((advisor, index) => (
              <motion.div
                key={advisor.name}
                initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-black/50 rounded-xl p-6 border border-gray-800 hover:border-cyan-500/50 transition-all"
              >
                <div className="flex items-start gap-4">
                  <div className="w-16 h-16 rounded-full bg-gradient-to-br from-cyan-500/20 to-blue-500/20 flex items-center justify-center flex-shrink-0">
                    <span className="text-xl font-bold text-cyan-400">
                      {advisor.name.split(' ').map(n => n[0]).join('')}
                    </span>
                  </div>
                  <div>
                    <h4 className="text-xl font-bold text-white">{advisor.name}</h4>
                    <p className="text-cyan-400 text-sm">{advisor.role}</p>
                    <p className="text-gray-400 text-sm mt-1">{advisor.company}</p>
                    <p className="text-gray-500 text-xs mt-2">Expertise: {advisor.expertise}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Key Hires Roadmap */}
        <div className="bg-gradient-to-r from-cyan-500/10 to-blue-500/10 rounded-3xl p-12 border border-cyan-500/30">
          <h3 className="text-3xl font-bold text-white mb-10 text-center">Key Hires Roadmap</h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {keyHires.map((hire, index) => (
              <motion.div
                key={hire.role}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="text-center"
              >
                <div className={`inline-block px-3 py-1 rounded-full text-xs font-bold mb-3 ${
                  hire.status === 'Hired' ? 'bg-green-500/20 text-green-400' :
                  hire.status === 'Onboarding' ? 'bg-yellow-500/20 text-yellow-400' :
                  'bg-cyan-500/20 text-cyan-400'
                }`}>
                  {hire.status}
                </div>
                <h4 className="text-lg font-bold text-white mb-2">{hire.role}</h4>
                <p className="text-sm text-gray-400">{hire.requirement}</p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Company Culture */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-16">
          <div className="text-center">
            <div className="text-4xl mb-2">🚀</div>
            <div className="text-sm font-bold text-white">Mission-Driven</div>
            <div className="text-xs text-gray-400 mt-1">Make VR truly immersive</div>
          </div>
          <div className="text-center">
            <div className="text-4xl mb-2">🧬</div>
            <div className="text-sm font-bold text-white">Research-First</div>
            <div className="text-xs text-gray-400 mt-1">Science-backed innovation</div>
          </div>
          <div className="text-center">
            <div className="text-4xl mb-2">🤝</div>
            <div className="text-sm font-bold text-white">User-Centric</div>
            <div className="text-xs text-gray-400 mt-1">Built with developers</div>
          </div>
          <div className="text-center">
            <div className="text-4xl mb-2">🌍</div>
            <div className="text-sm font-bold text-white">Global Impact</div>
            <div className="text-xs text-gray-400 mt-1">Accessible to all</div>
          </div>
        </div>
      </div>
    </section>
  )
}
"use client"

import React from 'react'
import { motion } from 'framer-motion'

const fundingUse = [
  {
    category: 'R&D & Product',
    percentage: 40,
    amount: 6,
    details: [
      'Next-gen hardware development',
      'Software platform expansion',
      'AI/ML haptic algorithms',
      'Quality assurance'
    ]
  },
  {
    category: 'Manufacturing',
    percentage: 25,
    amount: 3.75,
    details: [
      'Production tooling',
      'Supply chain setup',
      'Inventory management',
      'Quality control'
    ]
  },
  {
    category: 'Sales & Marketing',
    percentage: 20,
    amount: 3,
    details: [
      'Enterprise sales team',
      'Developer evangelism',
      'Brand marketing',
      'Trade shows & events'
    ]
  },
  {
    category: 'Operations',
    percentage: 15,
    amount: 2.25,
    details: [
      'Team scaling',
      'Office & facilities',
      'Legal & IP',
      'Working capital'
    ]
  }
]

const investmentHighlights = [
  {
    icon: '🚀',
    title: 'Massive Market',
    description: '$92B VR market by 2027 with 32.6% CAGR'
  },
  {
    icon: '🏆',
    title: 'Technical Moat',
    description: '3 patents, 2+ years ahead of competition'
  },
  {
    icon: '💰',
    title: 'Strong Traction',
    description: '$2M pre-orders, 3 Fortune 500 LOIs'
  },
  {
    icon: '👥',
    title: 'World-Class Team',
    description: 'Ex-Meta, Apple, MIT with 50+ years experience'
  },
  {
    icon: '📈',
    title: 'Scalable Model',
    description: '57% gross margin, 15x LTV/CAC ratio'
  },
  {
    icon: '🎯',
    title: 'Clear Path to Exit',
    description: 'Strategic acquisition targets identified'
  }
]

const comparableExits = [
  { company: 'Oculus', acquirer: 'Meta', valuation: '$2B', year: '2014' },
  { company: 'NextVR', acquirer: 'Apple', valuation: '$100M', year: '2020' },
  { company: 'Ultrahaptics', acquirer: 'Ultraleap', valuation: '$250M', year: '2019' },
  { company: 'HaptX', acquirer: 'TBD', valuation: '$300M+', year: 'Est. 2026' }
]

const investors = [
  { name: 'Andreessen Horowitz', status: 'In Discussion', type: 'Lead' },
  { name: 'Index Ventures', status: 'Term Sheet', type: 'Co-Lead' },
  { name: 'Founders Fund', status: 'DD Phase', type: 'Participant' },
  { name: 'GV (Google Ventures)', status: 'Interested', type: 'Strategic' }
]

export default function Investment() {
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
            Investment Opportunity
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-xl text-gray-300 max-w-3xl mx-auto"
          >
            Series A funding to accelerate growth and capture the haptic VR market
          </motion.p>
        </div>

        {/* Funding Ask */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          className="bg-gradient-to-r from-cyan-500/20 to-blue-500/20 rounded-3xl p-12 border-2 border-cyan-400 mb-20"
        >
          <div className="text-center mb-12">
            <h3 className="text-2xl font-bold text-white mb-4">Series A Funding Round</h3>
            <div className="text-6xl md:text-7xl font-bold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent mb-4">
              $15M
            </div>
            <div className="text-xl text-gray-300">
              $75M Post-Money Valuation
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="text-3xl font-bold text-cyan-400">$3M</div>
              <div className="text-sm text-gray-400">Already Committed</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-white">Q2 2024</div>
              <div className="text-sm text-gray-400">Expected Close</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-green-400">5x</div>
              <div className="text-sm text-gray-400">Projected Return</div>
            </div>
          </div>
        </motion.div>

        {/* Use of Funds */}
        <div className="mb-20">
          <h3 className="text-3xl font-bold text-white mb-10 text-center">Use of Funds</h3>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {fundingUse.map((use, index) => (
              <motion.div
                key={use.category}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-black/50 rounded-xl p-6 border border-gray-800 hover:border-cyan-500/50 transition-all"
              >
                <div className="flex justify-between items-start mb-4">
                  <h4 className="text-xl font-bold text-white">{use.category}</h4>
                  <span className="text-2xl font-bold text-cyan-400">{use.percentage}%</span>
                </div>

                <div className="text-3xl font-bold text-white mb-4">${use.amount}M</div>

                <ul className="space-y-2">
                  {use.details.map((detail, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className="text-cyan-400 mt-1">•</span>
                      <span className="text-sm text-gray-400">{detail}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Investment Highlights */}
        <div className="mb-20">
          <h3 className="text-3xl font-bold text-white mb-10 text-center">Why Invest Now</h3>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {investmentHighlights.map((highlight, index) => (
              <motion.div
                key={highlight.title}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-gradient-to-br from-blue-950/30 to-black/50 rounded-xl p-6 border border-cyan-500/30 hover:border-cyan-400 transition-all"
              >
                <div className="text-4xl mb-4">{highlight.icon}</div>
                <h4 className="text-xl font-bold text-cyan-400 mb-2">{highlight.title}</h4>
                <p className="text-gray-300">{highlight.description}</p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Comparable Exits */}
        <div className="mb-20">
          <h3 className="text-3xl font-bold text-white mb-10 text-center">Comparable Exits</h3>

          <div className="bg-black/50 rounded-3xl p-12 border border-cyan-500/30">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-800">
                    <th className="text-left py-4 text-gray-400">Company</th>
                    <th className="text-left py-4 text-gray-400">Acquirer</th>
                    <th className="text-right py-4 text-gray-400">Valuation</th>
                    <th className="text-right py-4 text-gray-400">Year</th>
                  </tr>
                </thead>
                <tbody>
                  {comparableExits.map((exit, index) => (
                    <motion.tr
                      key={exit.company}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      className="border-b border-gray-800/50"
                    >
                      <td className="py-4 text-white font-medium">{exit.company}</td>
                      <td className="py-4 text-gray-300">{exit.acquirer}</td>
                      <td className="py-4 text-right text-cyan-400 font-bold">{exit.valuation}</td>
                      <td className="py-4 text-right text-gray-400">{exit.year}</td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="mt-8 p-6 bg-gradient-to-r from-cyan-500/10 to-blue-500/10 rounded-xl">
              <p className="text-lg text-white">
                <span className="font-bold text-cyan-400">Caestus Labs</span> is positioned for a
                <span className="font-bold text-green-400"> $500M-1B exit</span> within 3-5 years through
                strategic acquisition by major VR/AR platforms seeking haptic differentiation.
              </p>
            </div>
          </div>
        </div>

        {/* Investor Interest */}
        <div className="mb-20">
          <h3 className="text-3xl font-bold text-white mb-10 text-center">Investor Interest</h3>

          <div className="grid md:grid-cols-2 gap-6">
            {investors.map((investor, index) => (
              <motion.div
                key={investor.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-black/50 rounded-xl p-6 border border-gray-800 hover:border-cyan-500/50 transition-all flex justify-between items-center"
              >
                <div>
                  <h4 className="text-xl font-bold text-white">{investor.name}</h4>
                  <p className="text-sm text-gray-400">{investor.type}</p>
                </div>
                <div className={`px-4 py-2 rounded-full text-sm font-bold ${
                  investor.status === 'Term Sheet' ? 'bg-green-500/20 text-green-400' :
                  investor.status === 'DD Phase' ? 'bg-yellow-500/20 text-yellow-400' :
                  investor.status === 'In Discussion' ? 'bg-blue-500/20 text-blue-400' :
                  'bg-gray-500/20 text-gray-400'
                }`}>
                  {investor.status}
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <h3 className="text-3xl font-bold text-white mb-8">Join Us in Defining the Future of VR</h3>

          <div className="flex flex-col md:flex-row gap-6 justify-center">
            <button className="px-10 py-5 bg-gradient-to-r from-cyan-500 to-blue-500 text-black font-bold text-lg rounded-full hover:shadow-xl hover:shadow-cyan-500/25 transition-all transform hover:scale-105">
              Schedule Investor Meeting
            </button>
            <button className="px-10 py-5 border-2 border-cyan-500 text-cyan-500 hover:bg-cyan-500 hover:text-black font-bold text-lg rounded-full transition-all">
              Download Full Deck
            </button>
            <button className="px-10 py-5 border-2 border-gray-600 text-gray-400 hover:border-cyan-500 hover:text-cyan-500 font-bold text-lg rounded-full transition-all">
              Request Data Room Access
            </button>
          </div>

          <div className="mt-12 text-gray-400">
            <p>For investor inquiries:</p>
            <p className="text-cyan-400 text-xl mt-2">investors@caestuslabs.com</p>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
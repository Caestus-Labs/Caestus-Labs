"use client"

import React, { useState } from 'react'
import { motion } from 'framer-motion'

const revenueStreams = [
  {
    name: 'Hardware Sales',
    percentage: 40,
    description: 'Direct consumer and B2B device sales',
    pricing: '$1,499 per unit',
    margin: '45%'
  },
  {
    name: 'Enterprise Licenses',
    percentage: 35,
    description: 'Volume licensing for training and industrial',
    pricing: '$50K-500K contracts',
    margin: '70%'
  },
  {
    name: 'SDK & Cloud',
    percentage: 20,
    description: 'Developer tools and cloud services',
    pricing: '$99-999/month',
    margin: '85%'
  },
  {
    name: 'Partnerships',
    percentage: 5,
    description: 'OEM and platform integrations',
    pricing: 'Revenue share',
    margin: '60%'
  }
]

const projectedRevenue = [
  { year: '2024', revenue: 5, units: 1000 },
  { year: '2025', revenue: 25, units: 5000 },
  { year: '2026', revenue: 100, units: 20000 },
  { year: '2027', revenue: 250, units: 50000 },
  { year: '2028', revenue: 500, units: 100000 }
]

const goToMarket = [
  {
    phase: 'Phase 1: Developer Launch',
    timeline: 'Q2 2024',
    strategy: 'Beta SDK, developer kits, hackathons',
    target: '1,000 developers'
  },
  {
    phase: 'Phase 2: Enterprise Pilots',
    timeline: 'Q3 2024',
    strategy: 'Medical, training, industrial partnerships',
    target: '50 enterprise clients'
  },
  {
    phase: 'Phase 3: Consumer Launch',
    timeline: 'Q4 2024',
    strategy: 'Gaming partnerships, retail presence',
    target: '10,000 consumers'
  },
  {
    phase: 'Phase 4: Platform Integration',
    timeline: 'Q1 2025',
    strategy: 'Native support in major VR platforms',
    target: '100,000 MAU'
  }
]

const unitEconomics = {
  asp: 1499,
  cogs: 650,
  grossMargin: 849,
  cac: 150,
  ltv: 2250,
  payback: '4 months'
}

export default function BusinessModel() {
  const [selectedMetric, setSelectedMetric] = useState('revenue')

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
            Business Model
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-xl text-gray-300 max-w-3xl mx-auto"
          >
            Multiple revenue streams with strong unit economics and rapid scaling potential
          </motion.p>
        </div>

        {/* Revenue Streams */}
        <div className="mb-20">
          <h3 className="text-3xl font-bold text-white mb-10 text-center">Revenue Streams</h3>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {revenueStreams.map((stream, index) => (
              <motion.div
                key={stream.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-black/50 rounded-xl p-6 border border-gray-800 hover:border-cyan-500/50 transition-all"
              >
                <div className="mb-4">
                  <div className="h-2 bg-gray-800 rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: `${stream.percentage}%` }}
                      transition={{ duration: 1, delay: 0.5 }}
                      className="h-full bg-gradient-to-r from-cyan-500 to-blue-500"
                    />
                  </div>
                  <div className="text-2xl font-bold text-cyan-400 mt-2">{stream.percentage}%</div>
                </div>

                <h4 className="text-xl font-bold text-white mb-2">{stream.name}</h4>
                <p className="text-sm text-gray-400 mb-4">{stream.description}</p>

                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">Pricing:</span>
                    <span className="text-white">{stream.pricing}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">Margin:</span>
                    <span className="text-green-400">{stream.margin}</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Financial Projections */}
        <div className="mb-20">
          <h3 className="text-3xl font-bold text-white mb-10 text-center">Financial Projections</h3>

          <div className="bg-gradient-to-br from-black/80 to-blue-950/30 rounded-3xl p-12 border border-cyan-500/30">
            <div className="flex justify-center gap-4 mb-8">
              <button
                onClick={() => setSelectedMetric('revenue')}
                className={`px-6 py-2 rounded-full transition-all ${
                  selectedMetric === 'revenue'
                    ? 'bg-cyan-500 text-black font-bold'
                    : 'bg-black/50 text-gray-400 border border-gray-800'
                }`}
              >
                Revenue
              </button>
              <button
                onClick={() => setSelectedMetric('units')}
                className={`px-6 py-2 rounded-full transition-all ${
                  selectedMetric === 'units'
                    ? 'bg-cyan-500 text-black font-bold'
                    : 'bg-black/50 text-gray-400 border border-gray-800'
                }`}
              >
                Units Sold
              </button>
            </div>

            <div className="grid grid-cols-5 gap-4">
              {projectedRevenue.map((year, index) => (
                <motion.div
                  key={year.year}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="text-center"
                >
                  <div className="text-4xl font-bold text-cyan-400 mb-2">
                    {selectedMetric === 'revenue' ? `$${year.revenue}M` : `${year.units.toLocaleString()}`}
                  </div>
                  <div className="text-sm text-gray-400">{year.year}</div>
                  <div className="mt-4 h-32 bg-gray-800 rounded-lg relative overflow-hidden">
                    <motion.div
                      initial={{ height: 0 }}
                      whileInView={{
                        height: selectedMetric === 'revenue'
                          ? `${(year.revenue / 500) * 100}%`
                          : `${(year.units / 100000) * 100}%`
                      }}
                      transition={{ duration: 1, delay: 0.5 + index * 0.1 }}
                      className="absolute bottom-0 w-full bg-gradient-to-t from-cyan-500 to-blue-500"
                    />
                  </div>
                </motion.div>
              ))}
            </div>

            <div className="flex justify-center gap-8 mt-8">
              <div className="text-center">
                <div className="text-2xl font-bold text-white">Q3 2025</div>
                <div className="text-sm text-gray-400">Break-even</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-white">45%</div>
                <div className="text-sm text-gray-400">Gross Margin</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-white">15x</div>
                <div className="text-sm text-gray-400">LTV/CAC Ratio</div>
              </div>
            </div>
          </div>
        </div>

        {/* Unit Economics */}
        <div className="mb-20">
          <h3 className="text-3xl font-bold text-white mb-10 text-center">Unit Economics</h3>

          <div className="bg-black/50 rounded-3xl p-12 border border-cyan-500/30">
            <div className="grid md:grid-cols-2 gap-12">
              <div>
                <h4 className="text-2xl font-bold text-cyan-400 mb-6">Per Unit Metrics</h4>
                <div className="space-y-4">
                  <div className="flex justify-between items-center py-3 border-b border-gray-800">
                    <span className="text-gray-400">Average Selling Price</span>
                    <span className="text-2xl font-bold text-white">${unitEconomics.asp}</span>
                  </div>
                  <div className="flex justify-between items-center py-3 border-b border-gray-800">
                    <span className="text-gray-400">Cost of Goods Sold</span>
                    <span className="text-2xl font-bold text-red-400">-${unitEconomics.cogs}</span>
                  </div>
                  <div className="flex justify-between items-center py-3 border-b border-gray-800">
                    <span className="text-gray-400">Gross Margin</span>
                    <span className="text-2xl font-bold text-green-400">${unitEconomics.grossMargin}</span>
                  </div>
                  <div className="flex justify-between items-center py-3">
                    <span className="text-gray-400">Gross Margin %</span>
                    <span className="text-2xl font-bold text-cyan-400">57%</span>
                  </div>
                </div>
              </div>

              <div>
                <h4 className="text-2xl font-bold text-cyan-400 mb-6">Customer Metrics</h4>
                <div className="space-y-4">
                  <div className="flex justify-between items-center py-3 border-b border-gray-800">
                    <span className="text-gray-400">Customer Acquisition Cost</span>
                    <span className="text-2xl font-bold text-white">${unitEconomics.cac}</span>
                  </div>
                  <div className="flex justify-between items-center py-3 border-b border-gray-800">
                    <span className="text-gray-400">Lifetime Value</span>
                    <span className="text-2xl font-bold text-green-400">${unitEconomics.ltv}</span>
                  </div>
                  <div className="flex justify-between items-center py-3 border-b border-gray-800">
                    <span className="text-gray-400">LTV/CAC Ratio</span>
                    <span className="text-2xl font-bold text-cyan-400">15x</span>
                  </div>
                  <div className="flex justify-between items-center py-3">
                    <span className="text-gray-400">Payback Period</span>
                    <span className="text-2xl font-bold text-white">{unitEconomics.payback}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Go-to-Market Strategy */}
        <div>
          <h3 className="text-3xl font-bold text-white mb-10 text-center">Go-to-Market Strategy</h3>

          <div className="space-y-6">
            {goToMarket.map((phase, index) => (
              <motion.div
                key={phase.phase}
                initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-black/50 rounded-xl p-8 border border-gray-800 hover:border-cyan-500/50 transition-all"
              >
                <div className="grid md:grid-cols-4 gap-6 items-center">
                  <div>
                    <h4 className="text-xl font-bold text-cyan-400">{phase.phase}</h4>
                  </div>
                  <div>
                    <span className="text-sm text-gray-500">Timeline</span>
                    <p className="text-lg text-white">{phase.timeline}</p>
                  </div>
                  <div>
                    <span className="text-sm text-gray-500">Strategy</span>
                    <p className="text-lg text-gray-300">{phase.strategy}</p>
                  </div>
                  <div>
                    <span className="text-sm text-gray-500">Target</span>
                    <p className="text-lg font-bold text-cyan-400">{phase.target}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
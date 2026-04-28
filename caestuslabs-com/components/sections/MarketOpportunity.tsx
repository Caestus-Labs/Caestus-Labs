"use client"

import React, { useRef, useState, useEffect } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { Text, Box, Line } from '@react-three/drei'
import * as THREE from 'three'

// 3D Bar Chart Component
function BarChart({ data, visible }: { data: number[]; visible: boolean }) {
  const groupRef = useRef<THREE.Group>(null)
  const [animationProgress, setAnimationProgress] = useState(0)

  useFrame((state, delta) => {
    if (visible && animationProgress < 1) {
      setAnimationProgress(Math.min(1, animationProgress + delta * 0.5))
    }
  })

  return (
    <group ref={groupRef} position={[0, -1, 0]}>
      {data.map((value, index) => {
        const height = value * animationProgress * 3
        const x = (index - data.length / 2) * 1.2

        return (
          <group key={index} position={[x, height / 2, 0]}>
            <Box args={[0.8, height, 0.8]}>
              <meshPhysicalMaterial
                color="#00ffff"
                emissive="#00ffff"
                emissiveIntensity={0.3}
                metalness={0.8}
                roughness={0.2}
              />
            </Box>
            <Text
              position={[0, height / 2 + 0.3, 0]}
              fontSize={0.2}
              color="white"
              anchorX="center"
              anchorY="middle"
            >
              ${value}B
            </Text>
            <Text
              position={[0, -height / 2 - 0.3, 0]}
              fontSize={0.15}
              color="gray"
              anchorX="center"
              anchorY="middle"
            >
              {2023 + index}
            </Text>
          </group>
        )
      })}
    </group>
  )
}

// TAM/SAM/SOM Circles
function MarketCircles({ visible }: { visible: boolean }) {
  const groupRef = useRef<THREE.Group>(null)
  const [scale, setScale] = useState(0)

  useFrame((state, delta) => {
    if (visible && scale < 1) {
      setScale(Math.min(1, scale + delta * 0.5))
    }
    if (groupRef.current) {
      groupRef.current.rotation.y += delta * 0.2
    }
  })

  const markets = [
    { size: 3, label: 'TAM', value: '$387B', color: '#0066cc' },
    { size: 2, label: 'SAM', value: '$51B', color: '#0088ff' },
    { size: 1, label: 'SOM', value: '$5B', color: '#00ffff' }
  ]

  return (
    <group ref={groupRef} position={[3, 0, 0]}>
      {markets.map((market, index) => (
        <group key={market.label}>
          <mesh scale={[scale, scale, scale]}>
            <sphereGeometry args={[market.size, 32, 32]} />
            <meshPhysicalMaterial
              color={market.color}
              transparent
              opacity={0.3}
              wireframe
            />
          </mesh>
          <Text
            position={[0, market.size + 0.5, 0]}
            fontSize={0.3}
            color="white"
            anchorX="center"
          >
            {market.label}
          </Text>
          <Text
            position={[0, market.size + 0.2, 0]}
            fontSize={0.2}
            color={market.color}
            anchorX="center"
          >
            {market.value}
          </Text>
        </group>
      ))}
    </group>
  )
}

// Market Scene
function MarketScene() {
  const { camera } = useThree()
  const [isInView, setIsInView] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      const section = document.getElementById('market-opportunity')
      if (section) {
        const rect = section.getBoundingClientRect()
        setIsInView(rect.top < window.innerHeight && rect.bottom > 0)
      }
    }

    window.addEventListener('scroll', handleScroll)
    handleScroll()

    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useFrame(() => {
    camera.position.z = THREE.MathUtils.lerp(camera.position.z, 8, 0.05)
  })

  const marketData = [31.1, 45.2, 67.8, 92.4, 134.5] // VR Market projections in billions

  return (
    <>
      <ambientLight intensity={0.3} />
      <directionalLight position={[5, 5, 5]} intensity={0.8} />
      <pointLight position={[-5, 5, -5]} intensity={0.5} color="#00ffff" />

      <BarChart data={marketData} visible={isInView} />
      <MarketCircles visible={isInView} />
    </>
  )
}

export default function MarketOpportunity() {
  return (
    <section id="market-opportunity" className="relative min-h-screen bg-gradient-to-b from-black via-blue-950/20 to-black py-20">
      <div className="container mx-auto px-8">
        <div className="text-center mb-16">
          <h2 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent mb-6">
            Market Opportunity
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            The VR/AR market is experiencing explosive growth, with haptic technology as the next frontier
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* 3D Visualization */}
          <div className="h-[500px] rounded-2xl overflow-hidden border border-cyan-500/30 bg-black/50">
            <Canvas camera={{ position: [0, 0, 10], fov: 45 }}>
              <MarketScene />
            </Canvas>
          </div>

          {/* Market Stats */}
          <div className="space-y-8">
            <div className="bg-black/50 backdrop-blur-sm rounded-xl p-8 border border-cyan-500/30">
              <h3 className="text-2xl font-bold text-cyan-400 mb-4">VR Market Growth</h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-gray-400">2024 Market Size</span>
                  <span className="text-2xl font-bold text-white">$31.1B</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-400">2027 Projection</span>
                  <span className="text-2xl font-bold text-white">$92.4B</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-400">CAGR</span>
                  <span className="text-2xl font-bold text-cyan-400">32.6%</span>
                </div>
              </div>
            </div>

            <div className="bg-black/50 backdrop-blur-sm rounded-xl p-8 border border-cyan-500/30">
              <h3 className="text-2xl font-bold text-cyan-400 mb-4">Haptics Market</h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-gray-400">Current Size</span>
                  <span className="text-2xl font-bold text-white">$19.5B</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-400">VR Users by 2025</span>
                  <span className="text-2xl font-bold text-white">184M</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-400">Training Market</span>
                  <span className="text-2xl font-bold text-cyan-400">$387B</span>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-r from-cyan-500/20 to-blue-500/20 rounded-xl p-6 border border-cyan-400">
              <p className="text-lg text-white">
                "The haptic feedback market represents the most significant opportunity in VR since the introduction of 6DOF tracking."
              </p>
              <p className="text-sm text-gray-400 mt-2">- Industry Analysis, 2024</p>
            </div>
          </div>
        </div>

        {/* Growth Indicators */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-16">
          <div className="text-center">
            <div className="text-4xl font-bold text-cyan-400">3x</div>
            <div className="text-sm text-gray-400 mt-2">Market Growth in 3 Years</div>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold text-cyan-400">78%</div>
            <div className="text-sm text-gray-400 mt-2">Enterprise Adoption Rate</div>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold text-cyan-400">$2.8T</div>
            <div className="text-sm text-gray-400 mt-2">Metaverse Economy 2030</div>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold text-cyan-400">45%</div>
            <div className="text-sm text-gray-400 mt-2">Annual Growth Rate</div>
          </div>
        </div>
      </div>
    </section>
  )
}
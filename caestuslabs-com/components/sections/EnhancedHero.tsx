"use client"

import React, { useRef, useState, useEffect, Suspense, useMemo } from 'react'
import { Canvas, useFrame, useLoader, useThree } from '@react-three/fiber'
import {
  OrbitControls,
  PerspectiveCamera,
  Environment,
  Float,
  Text,
  Box,
  Sphere,
  Line,
  Html
} from '@react-three/drei'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'
import { EffectComposer, Bloom } from '@react-three/postprocessing'
import * as THREE from 'three'
import { motion, AnimatePresence } from 'framer-motion'

// VR Headset Model Component
function VRHeadset({ scrollProgress, mousePos }: { scrollProgress: number; mousePos: { x: number; y: number } }) {
  const modelRef = useRef<THREE.Group>(null)
  const gltf = useLoader(GLTFLoader, '/models/vr-headset.glb')

  useFrame(() => {
    if (!modelRef.current) return

    // Stage-based positioning and rotation (4 stages now)
    let targetRotation = { x: 0, y: 0, z: 0 }
    let targetPosition = { x: 0, y: 0, z: 0 }

    if (scrollProgress < 0.25) {
      // Stage 1: Floating reveal
      targetRotation.y = Math.sin(Date.now() * 0.001) * 0.1
      targetPosition.y = Math.sin(Date.now() * 0.002) * 0.05
    } else if (scrollProgress < 0.5) {
      // Stage 2: Problem statement - slight tilt to show connection points
      const progress = (scrollProgress - 0.25) / 0.25
      targetRotation.y = progress * 0.3
      targetRotation.x = -0.2 * progress // Slight downward tilt
      targetPosition.y = -0.3 * progress // Move up slightly
    } else if (scrollProgress < 0.75) {
      // Stage 3: 180-degree turn showing technology
      const progress = (scrollProgress - 0.5) / 0.25
      targetRotation.y = 0.3 + progress * (Math.PI - 0.3)
      targetRotation.x = Math.sin(progress * Math.PI) * 0.1
    } else {
      // Stage 4: Interactive rotation with cubes
      targetRotation.y = Math.PI + mousePos.x * 0.5
      targetRotation.x = mousePos.y * 0.2
    }

    // Enhanced cursor tracking with 50% more reactivity
    const cursorInfluence = 0.18 // Increased from 0.12
    modelRef.current.rotation.x = THREE.MathUtils.lerp(
      modelRef.current.rotation.x,
      targetRotation.x + mousePos.y * cursorInfluence,
      0.1
    )
    modelRef.current.rotation.y = THREE.MathUtils.lerp(
      modelRef.current.rotation.y,
      targetRotation.y + mousePos.x * cursorInfluence,
      0.1
    )
    modelRef.current.rotation.z = THREE.MathUtils.lerp(
      modelRef.current.rotation.z,
      targetRotation.z,
      0.1
    )

    // Position updates
    modelRef.current.position.x = THREE.MathUtils.lerp(
      modelRef.current.position.x,
      targetPosition.x,
      0.1
    )
    modelRef.current.position.y = THREE.MathUtils.lerp(
      modelRef.current.position.y,
      targetPosition.y,
      0.1
    )
  })

  // Scale the model to be prominent
  const scaledGltf = useMemo(() => {
    const cloned = gltf.scene.clone()
    cloned.scale.set(0.8, 0.8, 0.8) // Large scale for prominence
    return cloned
  }, [gltf])

  return (
    <group ref={modelRef}>
      <primitive object={scaledGltf} />
    </group>
  )
}

// Problem Lines Component - Lines extending from VR headset to problem cards
function ProblemLines({ scrollProgress }: { scrollProgress: number }) {
  const linesRef = useRef<THREE.Group>(null)
  const [lineProgress, setLineProgress] = useState(0)

  // Define the problem positions and data
  const problems = [
    {
      id: 1,
      position: new THREE.Vector3(-2.5, -1, 1),
      color: '#ff6b6b',
      title: 'No Touch Sensation',
      description: '87% of users cite lack of touch as biggest VR limitation'
    },
    {
      id: 2,
      position: new THREE.Vector3(0, -1.5, 1.5),
      color: '#ffd93d',
      title: 'Limited Precision',
      description: '12ms average latency vs our 4ms solution'
    },
    {
      id: 3,
      position: new THREE.Vector3(2.5, -1, 1),
      color: '#6bcf7f',
      title: 'High Complexity',
      description: '3 weeks integration time vs our 1-day SDK'
    }
  ]

  useFrame(() => {
    // Show lines during problem statement stage (between stage 1 and 2)
    if (scrollProgress > 0.25 && scrollProgress < 0.5) {
      const progress = (scrollProgress - 0.25) / 0.25
      setLineProgress(progress)
      if (linesRef.current) {
        linesRef.current.visible = true
      }
    } else {
      if (linesRef.current) {
        linesRef.current.visible = false
      }
    }
  })

  return (
    <group ref={linesRef} visible={false}>
      {problems.map((problem, index) => {
        // Create animated line path from headset to problem card
        const linePoints = []
        const segments = 50
        for (let i = 0; i <= segments; i++) {
          const t = i / segments * lineProgress

          // Start from headset position (center)
          const start = new THREE.Vector3(0, 0, 0)

          // Create a curved path to the problem position
          const controlPoint = new THREE.Vector3(
            problem.position.x * 0.3,
            problem.position.y + 1,
            problem.position.z - 0.5
          )

          // Quadratic Bezier curve
          const point = new THREE.Vector3()
          point.lerpVectors(start, controlPoint, t * 2)
          if (t > 0.5) {
            const t2 = (t - 0.5) * 2
            point.lerpVectors(controlPoint, problem.position, t2)
          }

          linePoints.push(point)
        }

        return (
          <group key={problem.id}>
            {/* Animated Line */}
            <Line
              points={linePoints}
              color={problem.color}
              lineWidth={2}
              transparent
              opacity={0.8}
            />

            {/* Problem Card at the end of the line */}
            {lineProgress > 0.8 && (
              <group position={problem.position}>
                {/* Card Background */}
                <mesh>
                  <planeGeometry args={[1.5, 0.8]} />
                  <meshPhysicalMaterial
                    color="#1a1a2e"
                    emissive={problem.color}
                    emissiveIntensity={0.1}
                    metalness={0.8}
                    roughness={0.2}
                    transparent
                    opacity={0.9}
                  />
                </mesh>

                {/* HTML Overlay for text */}
                <Html
                  position={[0, 0, 0.01]}
                  center
                  style={{
                    width: '180px',
                    pointerEvents: 'none'
                  }}
                >
                  <div className="bg-gray-900/90 backdrop-blur p-3 rounded-lg border border-gray-700">
                    <h3 className="text-sm font-bold text-white mb-1">{problem.title}</h3>
                    <p className="text-xs text-gray-400">{problem.description}</p>
                  </div>
                </Html>

                {/* Glowing orb at connection point */}
                <mesh position={[0, 0, 0.1]}>
                  <sphereGeometry args={[0.05, 16, 16]} />
                  <meshBasicMaterial color={problem.color} />
                </mesh>
              </group>
            )}
          </group>
        )
      })}
    </group>
  )
}

// Floating Cubes Component
function CubeField({ scrollProgress, mousePos }: { scrollProgress: number; mousePos: { x: number; y: number } }) {
  const meshRef = useRef<THREE.InstancedMesh>(null)
  const dummy = useMemo(() => new THREE.Object3D(), [])

  const positions = useMemo(() => {
    const pos = []
    const count = 3500

    for (let i = 0; i < count; i++) {
      const theta = Math.random() * Math.PI * 2
      const phi = Math.random() * Math.PI

      // Volumetric distribution - pushed further from camera
      const r = 3.5 + Math.random() * 5 // Start further out
      const x = r * Math.sin(phi) * Math.cos(theta)
      const y = (Math.random() - 0.5) * 8
      const z = r * Math.cos(phi) - 4 // Pushed back more

      pos.push({ x, y, z, scale: 0.02 + Math.random() * 0.03 })
    }
    return pos
  }, [])

  useFrame(({ clock }) => {
    if (!meshRef.current || scrollProgress < 0.75) {
      if (meshRef.current) {
        meshRef.current.visible = false
      }
      return
    }

    meshRef.current.visible = true
    const time = clock.getElapsedTime()

    positions.forEach((pos, i) => {
      dummy.position.set(
        pos.x + Math.sin(time * 0.5 + i) * 0.2,
        pos.y + Math.cos(time * 0.3 + i) * 0.2,
        pos.z + Math.sin(time * 0.4 + i) * 0.1
      )

      dummy.rotation.x = time * 0.5 + i
      dummy.rotation.y = time * 0.3 + i

      // Interactive scaling based on mouse
      const distance = Math.sqrt(
        Math.pow(mousePos.x * 2 - dummy.position.x / 5, 2) +
        Math.pow(mousePos.y * 2 - dummy.position.y / 5, 2)
      )
      const scale = pos.scale * (1 + Math.max(0, 1 - distance) * 0.5)
      dummy.scale.setScalar(scale)

      dummy.updateMatrix()
      meshRef.current!.setMatrixAt(i, dummy.matrix)
    })

    meshRef.current.instanceMatrix.needsUpdate = true
  })

  return (
    <instancedMesh ref={meshRef} args={[undefined, undefined, 3500]} visible={false}>
      <boxGeometry args={[1, 1, 1]} />
      <meshPhysicalMaterial
        color="#00ffff"
        emissive="#00ffff"
        emissiveIntensity={0.5}
        metalness={0.8}
        roughness={0.2}
      />
    </instancedMesh>
  )
}

// Fallback component while loading
function LoadingFallback() {
  return (
    <mesh>
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color="#00ffff" />
    </mesh>
  )
}

// Main Scene Component
function VRScene({ scrollProgress, mousePos }: { scrollProgress: number; mousePos: { x: number; y: number } }) {
  const { camera } = useThree()

  useFrame(() => {
    // Camera positioning based on scroll (4 stages)
    if (scrollProgress < 0.25) {
      // Stage 1: Hero
      camera.position.z = THREE.MathUtils.lerp(camera.position.z, 3, 0.1)
    } else if (scrollProgress < 0.5) {
      // Stage 2: Problem statement - pull back to show lines
      camera.position.z = THREE.MathUtils.lerp(camera.position.z, 4.5, 0.1)
      camera.position.y = THREE.MathUtils.lerp(camera.position.y, 0.5, 0.1)
    } else if (scrollProgress < 0.75) {
      // Stage 3: Technology
      camera.position.z = THREE.MathUtils.lerp(camera.position.z, 2.5, 0.1)
      camera.position.y = THREE.MathUtils.lerp(camera.position.y, 0, 0.1)
    } else {
      // Stage 4: Possibilities with cubes
      camera.position.z = THREE.MathUtils.lerp(camera.position.z, 4, 0.1)
      camera.position.y = THREE.MathUtils.lerp(camera.position.y, 0, 0.1)
    }
  })

  return (
    <>
      {/* Lighting */}
      <ambientLight intensity={0.3} />
      <directionalLight position={[5, 5, 5]} intensity={0.8} castShadow />
      <pointLight position={[-5, 5, -5]} intensity={0.5} color="#00ffff" />
      <spotLight position={[0, 10, 0]} intensity={0.4} angle={0.5} />

      {/* VR Headset */}
      <Suspense fallback={<LoadingFallback />}>
        <VRHeadset scrollProgress={scrollProgress} mousePos={mousePos} />
      </Suspense>

      {/* Problem Lines - Extend from headset during problem statement stage */}
      <ProblemLines scrollProgress={scrollProgress} />

      {/* Cube Field (Stage 3) */}
      <CubeField scrollProgress={scrollProgress} mousePos={mousePos} />

      {/* Post-processing for Stage 4 */}
      {scrollProgress >= 0.75 && (
        <EffectComposer>
          <Bloom
            intensity={1.5}
            luminanceThreshold={0.5}
            luminanceSmoothing={0.9}
          />
        </EffectComposer>
      )}
    </>
  )
}

// Main Enhanced Hero Component
export default function EnhancedHero() {
  const [scrollProgress, setScrollProgress] = useState(0)
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 })
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleScroll = () => {
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight
      const progress = Math.min(1, window.scrollY / scrollHeight)
      setScrollProgress(progress)
    }

    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({
        x: (e.clientX / window.innerWidth) * 2 - 1,
        y: -(e.clientY / window.innerHeight) * 2 + 1
      })
    }

    window.addEventListener('scroll', handleScroll)
    window.addEventListener('mousemove', handleMouseMove)

    return () => {
      window.removeEventListener('scroll', handleScroll)
      window.removeEventListener('mousemove', handleMouseMove)
    }
  }, [])

  // Adjusted stages for problem statement section
  const stage = scrollProgress < 0.25 ? 1 : scrollProgress < 0.5 ? 2 : scrollProgress < 0.75 ? 3 : 4

  return (
    <div ref={containerRef} className="relative h-[500vh]">
      {/* Fixed Canvas */}
      <div className="fixed inset-0 w-full h-screen">
        <Canvas shadows>
          <PerspectiveCamera makeDefault position={[0, 0, 3]} fov={60} />
          <VRScene scrollProgress={scrollProgress} mousePos={mousePos} />
          <Environment preset="night" />
        </Canvas>
      </div>

      {/* Scroll Content Overlays with Enhanced Visibility */}
      <div className="relative z-10 pointer-events-none">
        {/* Stage 1 Content - Hero */}
        <div className={`h-screen flex items-center justify-center transition-opacity duration-1000 ${
          stage === 1 ? 'opacity-100' : 'opacity-0'
        }`}>
          <div className="text-center space-y-6 max-w-5xl mx-auto px-8">
            {/* Background panel for better text contrast */}
            <div className="bg-black/60 backdrop-blur-md rounded-3xl p-12 border border-gray-800/50">
              <h1 className="text-7xl md:text-9xl font-bold text-white tracking-tight mb-6">
                VR You Can <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">Feel</span>
              </h1>
              <p className="text-2xl md:text-3xl text-gray-100 font-light">
                Servo-driven haptic feedback for true virtual presence
              </p>
              <div className="flex gap-4 justify-center mt-10 pointer-events-auto">
                <button className="px-10 py-5 bg-cyan-500 hover:bg-cyan-400 text-black font-bold text-lg rounded-full transition-all transform hover:scale-105 shadow-2xl shadow-cyan-500/30">
                  Watch Demo
                </button>
                <button className="px-10 py-5 border-2 border-gray-600 text-gray-200 hover:border-cyan-500 hover:text-cyan-400 hover:bg-cyan-500/10 font-bold text-lg rounded-full transition-all">
                  Get Investor Deck
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Stage 2 Content - Problem Statement */}
        <div className={`h-screen flex items-center justify-center transition-opacity duration-1000 ${
          stage === 2 ? 'opacity-100' : 'opacity-0'
        }`}>
          <div className="text-center space-y-6 max-w-5xl mx-auto px-8">
            <div className="bg-black/60 backdrop-blur-md rounded-3xl p-10 border border-gray-800/50">
              <h2 className="text-5xl md:text-7xl font-bold text-white tracking-tight mb-6">
                The <span className="text-red-400">Problem</span>
              </h2>
              <p className="text-xl md:text-2xl text-gray-100 font-light mb-12">
                Virtual Reality has conquered sight and sound, but forgotten touch
              </p>
              <div className="text-4xl md:text-5xl font-bold text-cyan-400">
                Touch is Missing
              </div>
              <p className="text-lg text-gray-300 mt-4">
                And it's holding back the entire industry
              </p>
            </div>
          </div>
        </div>

        {/* Stage 3 Content - Technology */}
        <div className={`h-screen flex items-center justify-center transition-opacity duration-1000 ${
          stage === 3 ? 'opacity-100' : 'opacity-0'
        }`}>
          <div className="text-center space-y-8 max-w-4xl mx-auto px-8">
            {/* Background panel for better text contrast */}
            <div className="bg-black/60 backdrop-blur-md rounded-3xl p-10 border border-gray-800/50">
              <h2 className="text-5xl md:text-7xl font-bold text-white tracking-tight mb-8">
                Revolutionary <span className="text-cyan-400">Technology</span>
              </h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-12">
                <div className="bg-gray-900/90 backdrop-blur p-6 rounded-xl border border-gray-700">
                  <div className="text-4xl font-bold text-cyan-400">12</div>
                  <div className="text-sm text-gray-300 mt-2 font-medium">Servo Actuators</div>
                </div>
                <div className="bg-gray-900/90 backdrop-blur p-6 rounded-xl border border-gray-700">
                  <div className="text-4xl font-bold text-cyan-400">&lt;4ms</div>
                  <div className="text-sm text-gray-300 mt-2 font-medium">Latency</div>
                </div>
                <div className="bg-gray-900/90 backdrop-blur p-6 rounded-xl border border-gray-700">
                  <div className="text-4xl font-bold text-cyan-400">184g</div>
                  <div className="text-sm text-gray-300 mt-2 font-medium">Per Arm</div>
                </div>
                <div className="bg-gray-900/90 backdrop-blur p-6 rounded-xl border border-gray-700">
                  <div className="text-4xl font-bold text-cyan-400">6hr</div>
                  <div className="text-sm text-gray-300 mt-2 font-medium">Battery Life</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Stage 4 Content - Possibilities */}
        <div className={`h-screen flex items-center justify-center transition-opacity duration-1000 ${
          stage === 4 ? 'opacity-100' : 'opacity-0'
        }`}>
          <div className="text-center space-y-8 max-w-5xl mx-auto px-8">
            {/* Background panel for better text contrast */}
            <div className="bg-black/60 backdrop-blur-md rounded-3xl p-10 border border-gray-800/50">
              <h2 className="text-5xl md:text-7xl font-bold text-white tracking-tight mb-4">
                Infinite <span className="text-cyan-400">Possibilities</span>
              </h2>
              <p className="text-xl md:text-2xl text-gray-100 font-light mb-8">
                From medical training to industrial design, gaming to remote presence
              </p>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-12">
                <div className="bg-gray-900/90 backdrop-blur p-6 rounded-xl border border-gray-700 hover:border-cyan-500 transition-all">
                  <h3 className="text-lg font-bold text-cyan-400">Medical Training</h3>
                  <p className="text-sm text-gray-300 mt-2 font-medium">40% faster skill acquisition</p>
                </div>
                <div className="bg-gray-900/90 backdrop-blur p-6 rounded-xl border border-gray-700 hover:border-cyan-500 transition-all">
                  <h3 className="text-lg font-bold text-cyan-400">Industrial Design</h3>
                  <p className="text-sm text-gray-300 mt-2 font-medium">75% fewer training accidents</p>
                </div>
                <div className="bg-gray-900/90 backdrop-blur p-6 rounded-xl border border-gray-700 hover:border-cyan-500 transition-all">
                  <h3 className="text-lg font-bold text-cyan-400">Gaming</h3>
                  <p className="text-sm text-gray-300 mt-2 font-medium">3x longer play sessions</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className={`fixed bottom-8 left-1/2 transform -translate-x-1/2 transition-opacity duration-500 ${
          scrollProgress > 0.9 ? 'opacity-0' : 'opacity-100'
        }`}>
          <div className="animate-bounce">
            <svg className="w-6 h-6 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </svg>
          </div>
        </div>
      </div>
    </div>
  )
}
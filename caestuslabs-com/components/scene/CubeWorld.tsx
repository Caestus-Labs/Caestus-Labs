'use client'

import { Canvas, useFrame } from '@react-three/fiber'
import { Suspense, useEffect, useMemo, useRef } from 'react'
import * as THREE from 'three'

interface CubeInstance {
  position: [number, number, number]
  scale: number
  rotation: [number, number, number]
  rotSpeed: [number, number, number]
  color: string
}

function generateCubes(count: number): CubeInstance[] {
  const cubes: CubeInstance[] = []
  const palette = ['#E6FF3C', '#F2EFEA', '#8A8A90', '#17171c', '#0d0d10']
  for (let i = 0; i < count; i++) {
    const angle = Math.random() * Math.PI * 2
    const radius = 3 + Math.random() * 14
    const depth = -20 - Math.random() * 60
    const scale = 0.4 + Math.random() * 1.8
    cubes.push({
      position: [
        Math.cos(angle) * radius,
        (Math.random() - 0.5) * 14,
        depth,
      ],
      scale,
      rotation: [
        Math.random() * Math.PI,
        Math.random() * Math.PI,
        Math.random() * Math.PI,
      ],
      rotSpeed: [
        (Math.random() - 0.5) * 0.3,
        (Math.random() - 0.5) * 0.3,
        (Math.random() - 0.5) * 0.2,
      ],
      color: palette[Math.floor(Math.random() * palette.length)],
    })
  }
  return cubes
}

function Cubes({ progressRef }: { progressRef: React.RefObject<number> }) {
  const cubes = useMemo(() => generateCubes(80), [])
  const groupRef = useRef<THREE.Group>(null)
  const meshRefs = useRef<(THREE.Mesh | null)[]>([])

  useFrame((state, delta) => {
    const p = progressRef.current ?? 0
    if (groupRef.current) {
      groupRef.current.position.z = -50 + 55 * p
      const spin = state.clock.elapsedTime * 0.04
      groupRef.current.rotation.z = spin * (1 - p * 0.8)
    }
    meshRefs.current.forEach((mesh, i) => {
      if (!mesh) return
      const cube = cubes[i]
      mesh.rotation.x += cube.rotSpeed[0] * delta
      mesh.rotation.y += cube.rotSpeed[1] * delta
      mesh.rotation.z += cube.rotSpeed[2] * delta
    })
  })

  return (
    <group ref={groupRef}>
      {cubes.map((cube, i) => (
        <mesh
          key={i}
          ref={(el) => {
            meshRefs.current[i] = el
          }}
          position={cube.position}
          rotation={cube.rotation}
          scale={cube.scale}
        >
          <boxGeometry args={[1, 1, 1]} />
          <meshStandardMaterial
            color={cube.color}
            metalness={cube.color === '#E6FF3C' ? 0.3 : 0.7}
            roughness={cube.color === '#E6FF3C' ? 0.4 : 0.25}
            emissive={cube.color === '#E6FF3C' ? '#E6FF3C' : '#000'}
            emissiveIntensity={cube.color === '#E6FF3C' ? 0.3 : 0}
          />
        </mesh>
      ))}
    </group>
  )
}

interface CubeWorldProps {
  sectionRef: React.RefObject<HTMLElement | null>
}

export default function CubeWorld({ sectionRef }: CubeWorldProps) {
  const progressRef = useRef(0)

  useEffect(() => {
    if (typeof window === 'undefined') return

    const handler = () => {
      const el = sectionRef.current
      if (!el) return
      const rect = el.getBoundingClientRect()
      const vh = window.innerHeight
      // Progress: 0 when section is one viewport below, 1 when section top reaches top of viewport
      const raw = 1 - (rect.top + vh * 0.2) / (vh * 1.2)
      progressRef.current = Math.max(0, Math.min(1, raw))
    }

    handler()
    window.addEventListener('scroll', handler, { passive: true })
    window.addEventListener('resize', handler)
    return () => {
      window.removeEventListener('scroll', handler)
      window.removeEventListener('resize', handler)
    }
  }, [sectionRef])

  return (
    <Canvas
      camera={{ position: [0, 0, 8], fov: 65 }}
      dpr={[1, 2]}
      gl={{ antialias: true, alpha: true }}
      style={{
        position: 'absolute',
        inset: 0,
        pointerEvents: 'none',
      }}
    >
      <Suspense fallback={null}>
        <ambientLight intensity={0.3} />
        <directionalLight position={[5, 5, 8]} intensity={0.9} />
        <pointLight position={[-5, 3, 5]} intensity={0.7} color="#E6FF3C" />
        <pointLight position={[6, -3, 4]} intensity={0.4} color="#F2EFEA" />
        <fog attach="fog" args={['#0A0A0C', 8, 40]} />
        <Cubes progressRef={progressRef} />
      </Suspense>
    </Canvas>
  )
}

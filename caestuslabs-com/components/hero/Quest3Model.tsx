'use client'

import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import { useCursorStore } from '@/stores/cursorStore'
import { useScrollStore } from '@/stores/scrollStore'
import { RoundedBox, Box, Cylinder, Sphere, Torus } from '@react-three/drei'

export default function Quest3Model() {
  const groupRef = useRef<THREE.Group>(null)
  const stage = useScrollStore((state) => state.stage)
  const cursorX = useCursorStore((state) => state.smoothX)
  const cursorY = useCursorStore((state) => state.smoothY)

  useFrame((state, delta) => {
    if (!groupRef.current) return

    const t = state.clock.elapsedTime
    const k = 1 - Math.exp(-4 * delta)

    // Base floating animation
    const ambientY = Math.sin(t * 0.85) * 0.015
    const ambientX = Math.sin(t * 0.55) * 0.008

    // Cursor tracking based on stage
    let targetRotationY = ambientY
    let targetRotationX = ambientX
    let targetRotationZ = Math.sin(t * 0.6) * 0.01

    if (stage === 1) {
      // Stage 1: Headset looks at cursor
      targetRotationY = ambientY + cursorX * 0.14
      targetRotationX = ambientX - cursorY * 0.09
    } else if (stage === 2) {
      // Stage 2: Different axis mapping for side view
      targetRotationX = ambientX + cursorY * 0.10
      targetRotationZ = Math.sin(t * 0.6) * 0.01 + cursorX * 0.06
    }

    // Smooth rotation updates
    groupRef.current.rotation.y += (targetRotationY - groupRef.current.rotation.y) * k
    groupRef.current.rotation.x += (targetRotationX - groupRef.current.rotation.x) * k
    groupRef.current.rotation.z += (targetRotationZ - groupRef.current.rotation.z) * k

    // Subtle floating
    groupRef.current.position.y = Math.sin(t * 1.3) * 0.02

    // Subtle scale breathing
    const scale = 1 + Math.sin(t * 0.55) * 0.01
    groupRef.current.scale.setScalar(scale)
  })

  return (
    <group ref={groupRef} scale={0.8}>
      {/* Main headset body - more realistic curved shape */}
      <group>
        {/* Main body with curved sides */}
        <RoundedBox
          args={[0.32, 0.15, 0.11]}
          radius={0.025}
          smoothness={8}
          position={[0, 0, 0]}
        >
          <meshPhysicalMaterial
            color="#0f0f11"
            metalness={0.6}
            roughness={0.2}
            clearcoat={0.9}
            clearcoatRoughness={0.05}
            reflectivity={0.8}
            envMapIntensity={1.5}
          />
        </RoundedBox>

        {/* Front curved glass panel - more realistic curve */}
        <group position={[0, 0, 0.062]}>
          {/* Main visor */}
          <mesh scale={[1.6, 0.85, 0.4]}>
            <sphereGeometry args={[0.1, 32, 32]} />
            <meshPhysicalMaterial
              color="#0a0a0c"
              metalness={0.3}
              roughness={0.01}
              transmission={0.15}
              thickness={0.8}
              ior={2.2}
              clearcoat={1}
              clearcoatRoughness={0}
              reflectivity={1.5}
              envMapIntensity={2.5}
            />
          </mesh>

          {/* Reflective coating layer */}
          <mesh scale={[1.62, 0.87, 0.42]}>
            <sphereGeometry args={[0.1, 24, 24]} />
            <meshPhysicalMaterial
              color="#4FB3FF"
              metalness={0.9}
              roughness={0.1}
              opacity={0.1}
              transparent={true}
              envMapIntensity={3}
            />
          </mesh>
        </group>

        {/* White/silver frame trim */}
        <Torus
          args={[0.155, 0.008, 16, 64, Math.PI]}
          rotation={[0, 0, 0]}
          position={[0, 0, 0.062]}
        >
          <meshPhysicalMaterial
            color="#e8e8ec"
            metalness={0.95}
            roughness={0.08}
            envMapIntensity={2}
          />
        </Torus>
      </group>

      {/* Tracking cameras - Quest 3 layout */}
      {/* Front main cameras */}
      <group>
        <Cylinder args={[0.006, 0.007, 0.004, 16]} position={[-0.1, 0.04, 0.065]} rotation={[Math.PI / 2, 0, 0]}>
          <meshPhysicalMaterial color="#050505" metalness={0.8} roughness={0.3} />
        </Cylinder>
        <Cylinder args={[0.006, 0.007, 0.004, 16]} position={[0.1, 0.04, 0.065]} rotation={[Math.PI / 2, 0, 0]}>
          <meshPhysicalMaterial color="#050505" metalness={0.8} roughness={0.3} />
        </Cylinder>

        {/* Side tracking cameras */}
        <Cylinder args={[0.005, 0.005, 0.003, 16]} position={[-0.12, -0.02, 0.065]} rotation={[Math.PI / 2, 0, 0]}>
          <meshPhysicalMaterial color="#050505" metalness={0.8} roughness={0.3} />
        </Cylinder>
        <Cylinder args={[0.005, 0.005, 0.003, 16]} position={[0.12, -0.02, 0.065]} rotation={[Math.PI / 2, 0, 0]}>
          <meshPhysicalMaterial color="#050505" metalness={0.8} roughness={0.3} />
        </Cylinder>

        {/* Depth sensor */}
        <Cylinder args={[0.004, 0.004, 0.003, 16]} position={[0, 0.055, 0.065]} rotation={[Math.PI / 2, 0, 0]}>
          <meshPhysicalMaterial color="#1a1a1c" metalness={0.7} roughness={0.4} />
        </Cylinder>
      </group>

      {/* Elite strap mount points */}
      <group>
        <Cylinder args={[0.012, 0.01, 0.025, 16]} position={[-0.165, 0, -0.01]} rotation={[0, 0, Math.PI / 2]}>
          <meshPhysicalMaterial
            color="#d8d8dc"
            metalness={0.9}
            roughness={0.15}
          />
        </Cylinder>
        <Cylinder args={[0.012, 0.01, 0.025, 16]} position={[0.165, 0, -0.01]} rotation={[0, 0, Math.PI / 2]}>
          <meshPhysicalMaterial
            color="#d8d8dc"
            metalness={0.9}
            roughness={0.15}
          />
        </Cylinder>

        {/* Mount point details */}
        <Box args={[0.015, 0.03, 0.008]} position={[-0.165, 0, -0.025]}>
          <meshPhysicalMaterial color="#2a2a2c" metalness={0.3} roughness={0.7} />
        </Box>
        <Box args={[0.015, 0.03, 0.008]} position={[0.165, 0, -0.025]}>
          <meshPhysicalMaterial color="#2a2a2c" metalness={0.3} roughness={0.7} />
        </Box>
      </group>

      {/* Head strap system */}
      <group>
        {/* Top strap */}
        <Torus
          args={[0.12, 0.01, 12, 48, Math.PI * 0.9]}
          position={[0, 0.07, -0.1]}
          rotation={[0, 0, Math.PI / 2]}
        >
          <meshPhysicalMaterial
            color="#252527"
            metalness={0.1}
            roughness={0.85}
          />
        </Torus>

        {/* Rear support */}
        <Torus
          args={[0.09, 0.012, 12, 48, Math.PI]}
          position={[0, -0.01, -0.16]}
          rotation={[0, Math.PI / 2, 0]}
        >
          <meshPhysicalMaterial
            color="#252527"
            metalness={0.1}
            roughness={0.85}
          />
        </Torus>

        {/* Adjustment dial */}
        <Cylinder args={[0.018, 0.016, 0.01, 24]} position={[0, -0.01, -0.25]} rotation={[Math.PI / 2, 0, 0]}>
          <meshPhysicalMaterial
            color="#3a3a3c"
            metalness={0.7}
            roughness={0.3}
          />
        </Cylinder>
      </group>

      {/* Face cushion/gasket */}
      <group position={[0, 0, -0.045]}>
        <RoundedBox
          args={[0.26, 0.145, 0.03]}
          radius={0.02}
          smoothness={6}
        >
          <meshPhysicalMaterial
            color="#0a0a0b"
            metalness={0}
            roughness={0.98}
            clearcoat={0}
          />
        </RoundedBox>

        {/* Inner padding detail */}
        <RoundedBox
          args={[0.24, 0.13, 0.025]}
          radius={0.018}
          smoothness={6}
          position={[0, 0, -0.002]}
        >
          <meshPhysicalMaterial
            color="#181819"
            metalness={0}
            roughness={1}
          />
        </RoundedBox>
      </group>

      {/* Power/Status LED */}
      <Sphere args={[0.003, 16, 16]} position={[0.13, -0.045, 0.065]}>
        <meshBasicMaterial color="#4FB3FF" />
      </Sphere>

      {/* Volume/Power buttons */}
      <group position={[-0.155, -0.045, 0.02]}>
        {/* Volume up */}
        <RoundedBox args={[0.012, 0.025, 0.008]} radius={0.004} position={[0, 0.015, 0]}>
          <meshPhysicalMaterial
            color="#d0d0d4"
            metalness={0.85}
            roughness={0.25}
          />
        </RoundedBox>

        {/* Volume down */}
        <RoundedBox args={[0.012, 0.025, 0.008]} radius={0.004} position={[0, -0.015, 0]}>
          <meshPhysicalMaterial
            color="#d0d0d4"
            metalness={0.85}
            roughness={0.25}
          />
        </RoundedBox>
      </group>

      {/* USB-C port detail */}
      <Box args={[0.014, 0.006, 0.008]} position={[0.13, -0.07, 0.02]}>
        <meshPhysicalMaterial
          color="#1a1a1c"
          metalness={0.8}
          roughness={0.4}
        />
      </Box>

      {/* Ventilation grilles */}
      <group>
        {[...Array(3)].map((_, i) => (
          <Box
            key={i}
            args={[0.03, 0.003, 0.008]}
            position={[-0.08 + i * 0.035, 0.073, 0.03]}
          >
            <meshPhysicalMaterial color="#0a0a0b" metalness={0.5} roughness={0.6} />
          </Box>
        ))}
        {[...Array(3)].map((_, i) => (
          <Box
            key={i + 3}
            args={[0.03, 0.003, 0.008]}
            position={[0.08 - i * 0.035, 0.073, 0.03]}
          >
            <meshPhysicalMaterial color="#0a0a0b" metalness={0.5} roughness={0.6} />
          </Box>
        ))}
      </group>

      {/* Meta logo area (simplified) */}
      <Box args={[0.025, 0.002, 0.015]} position={[0, -0.073, 0.045]}>
        <meshPhysicalMaterial
          color="#c0c0c4"
          metalness={0.95}
          roughness={0.1}
        />
      </Box>
    </group>
  )
}
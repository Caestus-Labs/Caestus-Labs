'use client'

import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import { useCursorStore } from '@/stores/cursorStore'
import { useScrollStore } from '@/stores/scrollStore'
import { RoundedBox } from '@react-three/drei'

export default function EnhancedHeadset() {
  const groupRef = useRef<THREE.Group>(null)
  const leftLensMat = useRef<THREE.MeshPhysicalMaterial>(null)
  const rightLensMat = useRef<THREE.MeshPhysicalMaterial>(null)

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
    groupRef.current.position.y = Math.sin(t * 1.3) * 0.03

    // Subtle scale breathing
    const scale = 1 + Math.sin(t * 0.55) * 0.01
    groupRef.current.scale.setScalar(scale)

    // Lens glow animation
    if (leftLensMat.current && rightLensMat.current) {
      const glowIntensity = 0.1 + (Math.sin(t * 2.4) * 0.5 + 0.5) * 0.2
      leftLensMat.current.emissiveIntensity = glowIntensity
      rightLensMat.current.emissiveIntensity = glowIntensity * 0.8
    }
  })

  return (
    <group ref={groupRef}>
      {/* Main body - sleek black housing */}
      <mesh position={[0, 0, -0.05]} scale={[1.7, 1, 0.7]}>
        <sphereGeometry args={[0.75, 64, 48]} />
        <meshPhysicalMaterial
          color="#0A0A0A"
          metalness={0.9}
          roughness={0.15}
          clearcoat={0.8}
          clearcoatRoughness={0.1}
          envMapIntensity={2}
        />
      </mesh>

      {/* Front visor - curved glass with high reflectivity */}
      <mesh position={[0, 0, 0.18]} scale={[1.75, 1.02, 0.55]}>
        <sphereGeometry args={[0.95, 64, 48, 0, Math.PI * 2, 0, Math.PI / 2]} />
        <meshPhysicalMaterial
          color="#050508"
          metalness={0.6}
          roughness={0.02}
          clearcoat={1}
          clearcoatRoughness={0.01}
          transmission={0.3}
          thickness={0.5}
          ior={1.8}
          envMapIntensity={3}
          side={THREE.DoubleSide}
        />
      </mesh>

      {/* Silver aluminum rim - premium feel */}
      <mesh position={[0, 0, 0.35]} scale={[1.75, 1.05, 1]}>
        <torusGeometry args={[0.95, 0.06, 32, 120]} />
        <meshPhysicalMaterial
          color="#d0d0d4"
          metalness={0.98}
          roughness={0.08}
          envMapIntensity={2.5}
        />
      </mesh>

      {/* Left lens - with subtle glow */}
      <mesh position={[-0.38, -0.02, 0.48]}>
        <circleGeometry args={[0.22, 64]} />
        <meshPhysicalMaterial
          ref={leftLensMat}
          color="#1a1a20"
          emissive="#4FB3FF"
          emissiveIntensity={0.15}
          metalness={0.5}
          roughness={0.3}
          clearcoat={1}
          clearcoatRoughness={0}
        />
      </mesh>

      {/* Right lens */}
      <mesh position={[0.38, -0.02, 0.48]}>
        <circleGeometry args={[0.22, 64]} />
        <meshPhysicalMaterial
          ref={rightLensMat}
          color="#1a1a20"
          emissive="#4FB3FF"
          emissiveIntensity={0.15}
          metalness={0.5}
          roughness={0.3}
          clearcoat={1}
          clearcoatRoughness={0}
        />
      </mesh>

      {/* Lens rings - precision details */}
      <mesh position={[-0.38, -0.02, 0.5]}>
        <torusGeometry args={[0.24, 0.015, 24, 64]} />
        <meshPhysicalMaterial
          color="#2a2a30"
          metalness={0.95}
          roughness={0.2}
        />
      </mesh>
      <mesh position={[0.38, -0.02, 0.5]}>
        <torusGeometry args={[0.24, 0.015, 24, 64]} />
        <meshPhysicalMaterial
          color="#2a2a30"
          metalness={0.95}
          roughness={0.2}
        />
      </mesh>

      {/* Camera sensors - Quest 3 signature */}
      <mesh position={[0, 0.28, 0.55]}>
        <circleGeometry args={[0.04, 32]} />
        <meshBasicMaterial color="#000000" />
      </mesh>
      <mesh position={[0.64, 0.15, 0.5]}>
        <circleGeometry args={[0.035, 32]} />
        <meshBasicMaterial color="#000000" />
      </mesh>
      <mesh position={[-0.64, 0.15, 0.5]}>
        <circleGeometry args={[0.035, 32]} />
        <meshBasicMaterial color="#000000" />
      </mesh>

      {/* Status LED */}
      <mesh position={[0.8, -0.25, 0.48]}>
        <circleGeometry args={[0.012, 24]} />
        <meshBasicMaterial color="#4FB3FF" />
      </mesh>

      {/* Premium strap system */}
      <mesh position={[0, 0.35, -0.45]} rotation={[0, 0, Math.PI / 2]}>
        <torusGeometry args={[0.85, 0.05, 16, 64, Math.PI]} />
        <meshPhysicalMaterial
          color="#1a1a20"
          metalness={0.2}
          roughness={0.7}
        />
      </mesh>

      {/* Rear strap */}
      <mesh position={[0, -0.05, -0.95]} rotation={[0, Math.PI / 2, 0]}>
        <torusGeometry args={[0.5, 0.055, 16, 64, Math.PI]} />
        <meshPhysicalMaterial
          color="#1a1a20"
          metalness={0.2}
          roughness={0.7}
        />
      </mesh>

      {/* Temple connectors - aluminum details */}
      <mesh position={[-1.0, 0.05, -0.15]} rotation={[0, 0, Math.PI / 2]}>
        <cylinderGeometry args={[0.06, 0.06, 0.25, 32]} />
        <meshPhysicalMaterial
          color="#c8c8cc"
          metalness={0.98}
          roughness={0.15}
        />
      </mesh>
      <mesh position={[1.0, 0.05, -0.15]} rotation={[0, 0, Math.PI / 2]}>
        <cylinderGeometry args={[0.06, 0.06, 0.25, 32]} />
        <meshPhysicalMaterial
          color="#c8c8cc"
          metalness={0.98}
          roughness={0.15}
        />
      </mesh>

      {/* Face gasket - soft material */}
      <mesh position={[0, -0.02, -0.45]} scale={[1.4, 0.9, 1]}>
        <torusGeometry args={[0.58, 0.12, 24, 64]} />
        <meshPhysicalMaterial
          color="#0f0f12"
          metalness={0}
          roughness={0.95}
        />
      </mesh>
    </group>
  )
}
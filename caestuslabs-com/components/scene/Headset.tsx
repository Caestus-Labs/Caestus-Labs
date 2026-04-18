'use client'

import { useRef, useEffect } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

export default function Headset() {
  const groupRef = useRef<THREE.Group>(null)
  const mouseRef = useRef({ x: 0, y: 0 })
  const leftLensMat = useRef<THREE.MeshBasicMaterial>(null)
  const rightLensMat = useRef<THREE.MeshBasicMaterial>(null)
  const eyeSightMat = useRef<THREE.MeshBasicMaterial>(null)

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      mouseRef.current.x = (e.clientX / window.innerWidth) * 2 - 1
      mouseRef.current.y = -((e.clientY / window.innerHeight) * 2 - 1)
    }
    window.addEventListener('mousemove', onMove)
    return () => window.removeEventListener('mousemove', onMove)
  }, [])

  useFrame((state, delta) => {
    if (!groupRef.current) return
    const t = state.clock.elapsedTime
    const k = 1 - Math.exp(-4 * delta)

    const ambientY = Math.sin(t * 0.85) * 0.28
    const ambientX = Math.sin(t * 0.55) * 0.1

    const cursorY = mouseRef.current.x * 0.26
    const cursorX = mouseRef.current.y * 0.16

    const targetY = ambientY + cursorY
    const targetX = ambientX + cursorX

    groupRef.current.rotation.y += (targetY - groupRef.current.rotation.y) * k
    groupRef.current.rotation.x += (targetX - groupRef.current.rotation.x) * k

    groupRef.current.rotation.z = Math.sin(t * 0.6) * 0.025

    const scale = 1 + Math.sin(t * 0.55) * 0.025
    groupRef.current.scale.setScalar(scale)

    groupRef.current.position.y = Math.sin(t * 1.3) * 0.06

    if (leftLensMat.current) {
      leftLensMat.current.opacity = 0.1 + (Math.sin(t * 2.4) * 0.5 + 0.5) * 0.35
    }
    if (rightLensMat.current) {
      rightLensMat.current.opacity = 0.1 + (Math.sin(t * 2.4 + Math.PI) * 0.5 + 0.5) * 0.35
    }
    if (eyeSightMat.current) {
      eyeSightMat.current.opacity = 0.12 + (Math.sin(t * 1.2) * 0.5 + 0.5) * 0.08
    }
  })

  return (
    <group ref={groupRef}>
      {/* Silver aluminum outer rim — Vision Pro signature */}
      <mesh position={[0, 0, 0.35]} scale={[1.75, 1.05, 1]}>
        <torusGeometry args={[0.95, 0.06, 16, 80]} />
        <meshStandardMaterial
          color="#c8c8cc"
          metalness={0.95}
          roughness={0.15}
          envMapIntensity={1.5}
        />
      </mesh>

      {/* Curved front visor glass — dome segment for Vision Pro wraparound look */}
      <mesh position={[0, 0, 0.18]} scale={[1.75, 1.02, 0.55]}>
        <sphereGeometry args={[0.95, 48, 32, 0, Math.PI * 2, 0, Math.PI / 2]} />
        <meshPhysicalMaterial
          color="#0a0a0f"
          metalness={0.4}
          roughness={0.05}
          clearcoat={1}
          clearcoatRoughness={0.03}
          transmission={0.15}
          thickness={0.2}
          ior={1.5}
          envMapIntensity={1.8}
          side={THREE.DoubleSide}
        />
      </mesh>

      {/* EyeSight glow layer — Vision Pro's signature eye display */}
      <mesh position={[0, 0.02, 0.52]} scale={[1.6, 0.9, 1]}>
        <planeGeometry args={[1, 0.58]} />
        <meshBasicMaterial
          ref={eyeSightMat}
          color="#4a5fff"
          transparent
          opacity={0.15}
          blending={THREE.AdditiveBlending}
        />
      </mesh>

      {/* Left pancake lens glow (visible through visor) */}
      <mesh position={[-0.38, -0.02, 0.48]}>
        <circleGeometry args={[0.22, 48]} />
        <meshBasicMaterial
          ref={leftLensMat}
          color="#E6FF3C"
          transparent
          opacity={0.15}
          blending={THREE.AdditiveBlending}
        />
      </mesh>

      {/* Right pancake lens glow */}
      <mesh position={[0.38, -0.02, 0.48]}>
        <circleGeometry args={[0.22, 48]} />
        <meshBasicMaterial
          ref={rightLensMat}
          color="#E6FF3C"
          transparent
          opacity={0.15}
          blending={THREE.AdditiveBlending}
        />
      </mesh>

      {/* Left lens inner bezel (pancake lens ring) */}
      <mesh position={[-0.38, -0.02, 0.5]}>
        <torusGeometry args={[0.24, 0.012, 16, 48]} />
        <meshStandardMaterial
          color="#2a2a30"
          metalness={0.8}
          roughness={0.3}
        />
      </mesh>

      {/* Right lens inner bezel */}
      <mesh position={[0.38, -0.02, 0.5]}>
        <torusGeometry args={[0.24, 0.012, 16, 48]} />
        <meshStandardMaterial
          color="#2a2a30"
          metalness={0.8}
          roughness={0.3}
        />
      </mesh>

      {/* Front sensor cluster — Quest 3 three-camera signature (center) */}
      <mesh position={[0, 0.28, 0.55]}>
        <circleGeometry args={[0.035, 20]} />
        <meshBasicMaterial color="#050508" />
      </mesh>
      <mesh position={[0.64, 0.15, 0.5]}>
        <circleGeometry args={[0.03, 20]} />
        <meshBasicMaterial color="#050508" />
      </mesh>
      <mesh position={[-0.64, 0.15, 0.5]}>
        <circleGeometry args={[0.03, 20]} />
        <meshBasicMaterial color="#050508" />
      </mesh>

      {/* Accent LED dots (Quest status lights) */}
      <mesh position={[0.8, -0.25, 0.48]}>
        <circleGeometry args={[0.01, 12]} />
        <meshBasicMaterial color="#E6FF3C" />
      </mesh>

      {/* Main body — rounded to match Vision Pro profile */}
      <mesh position={[0, 0, -0.05]} scale={[1.7, 1, 0.7]}>
        <sphereGeometry args={[0.75, 32, 24]} />
        <meshStandardMaterial
          color="#1a1a20"
          metalness={0.6}
          roughness={0.4}
          envMapIntensity={1.2}
        />
      </mesh>

      {/* Foam face gasket — soft oval */}
      <mesh position={[0, -0.02, -0.45]} scale={[1.4, 0.9, 1]}>
        <torusGeometry args={[0.58, 0.1, 16, 48]} />
        <meshStandardMaterial color="#2a2a2e" metalness={0.1} roughness={0.95} />
      </mesh>

      {/* Solo Band strap — knit fabric look, wraps around from temples */}
      {/* Top strap arc over head */}
      <mesh position={[0, 0.35, -0.45]} rotation={[0, 0, Math.PI / 2]}>
        <torusGeometry args={[0.85, 0.045, 12, 48, Math.PI]} />
        <meshStandardMaterial
          color="#3a3a42"
          metalness={0.15}
          roughness={0.85}
        />
      </mesh>

      {/* Rear strap band */}
      <mesh position={[0, -0.05, -0.95]} rotation={[0, Math.PI / 2, 0]}>
        <torusGeometry args={[0.5, 0.055, 12, 48, Math.PI]} />
        <meshStandardMaterial
          color="#3a3a42"
          metalness={0.15}
          roughness={0.85}
        />
      </mesh>

      {/* Left temple connector — silver aluminum detail */}
      <mesh position={[-1.0, 0.05, -0.15]} rotation={[0, 0, Math.PI / 2]}>
        <cylinderGeometry args={[0.06, 0.06, 0.25, 16]} />
        <meshStandardMaterial
          color="#b8b8bc"
          metalness={0.95}
          roughness={0.2}
        />
      </mesh>

      {/* Right temple connector */}
      <mesh position={[1.0, 0.05, -0.15]} rotation={[0, 0, Math.PI / 2]}>
        <cylinderGeometry args={[0.06, 0.06, 0.25, 16]} />
        <meshStandardMaterial
          color="#b8b8bc"
          metalness={0.95}
          roughness={0.2}
        />
      </mesh>

      {/* Left temple arm arcing back */}
      <mesh position={[-1.0, 0.05, -0.5]} rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[0.4, 0.04, 12, 32, Math.PI]} />
        <meshStandardMaterial
          color="#3a3a42"
          metalness={0.2}
          roughness={0.8}
        />
      </mesh>

      {/* Right temple arm arcing back */}
      <mesh position={[1.0, 0.05, -0.5]} rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[0.4, 0.04, 12, 32, Math.PI]} />
        <meshStandardMaterial
          color="#3a3a42"
          metalness={0.2}
          roughness={0.8}
        />
      </mesh>
    </group>
  )
}

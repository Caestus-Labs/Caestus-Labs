'use client'

import { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import { useCursorStore } from '@/stores/cursorStore'
import { useScrollStore } from '@/stores/scrollStore'

export default function VRInterior() {
  const groupRef = useRef<THREE.Group>(null)
  const cubesRef = useRef<THREE.InstancedMesh>(null)
  const guardianRef = useRef<THREE.LineSegments>(null)
  const portalRef = useRef<THREE.Mesh>(null)

  const scrollProgress = useScrollStore((state) => state.progress)
  const stage = useScrollStore((state) => state.stage)
  const cursorX = useCursorStore((state) => state.smoothX)
  const cursorY = useCursorStore((state) => state.smoothY)

  // Calculate stage 3 progress (0 to 1 within stage 3)
  const stageProgress = Math.max(0, Math.min(1, (scrollProgress - 0.66) * 3))

  // Create cube field instances
  const { cubePositions, cubeCount } = useMemo(() => {
    const positions: THREE.Vector3[] = []
    const gridSize = 12
    const spacing = 2.5

    for (let x = -gridSize; x <= gridSize; x += 2) {
      for (let y = -gridSize / 2; y <= gridSize / 2; y += 2) {
        for (let z = -gridSize; z <= gridSize; z += 2) {
          // Create gaps for visual interest
          const distance = Math.sqrt(x * x + y * y + z * z)
          if (distance > 3 && distance < 25) {
            positions.push(
              new THREE.Vector3(
                x * spacing + (Math.random() - 0.5) * 0.5,
                y * spacing + (Math.random() - 0.5) * 0.5,
                z * spacing + (Math.random() - 0.5) * 0.5
              )
            )
          }
        }
      }
    }

    return { cubePositions: positions, cubeCount: positions.length }
  }, [])

  // Create guardian boundary geometry
  const guardianGeometry = useMemo(() => {
    const geometry = new THREE.BufferGeometry()
    const vertices: number[] = []

    // Floor rectangle
    const width = 15
    const depth = 15
    const height = 8

    // Floor grid
    for (let i = -width; i <= width; i += 2) {
      vertices.push(i, -height / 2, -depth, i, -height / 2, depth)
      vertices.push(-width, -height / 2, i, width, -height / 2, i)
    }

    // Wall edges
    vertices.push(-width, -height / 2, -depth, -width, height / 2, -depth)
    vertices.push(width, -height / 2, -depth, width, height / 2, -depth)
    vertices.push(-width, -height / 2, depth, -width, height / 2, depth)
    vertices.push(width, -height / 2, depth, width, height / 2, depth)

    // Top edges
    vertices.push(-width, height / 2, -depth, width, height / 2, -depth)
    vertices.push(-width, height / 2, depth, width, height / 2, depth)
    vertices.push(-width, height / 2, -depth, -width, height / 2, depth)
    vertices.push(width, height / 2, -depth, width, height / 2, depth)

    geometry.setAttribute('position', new THREE.Float32BufferAttribute(vertices, 3))
    return geometry
  }, [])

  useFrame((state, delta) => {
    if (!groupRef.current || stage !== 3) return

    const t = state.clock.elapsedTime

    // Animate group entrance
    const targetOpacity = stageProgress
    groupRef.current.traverse((child) => {
      if ((child as THREE.Mesh).material) {
        const mat = (child as THREE.Mesh).material as THREE.Material
        if ('opacity' in mat) {
          mat.opacity = targetOpacity
        }
      }
    })

    // Animate cube instances
    if (cubesRef.current) {
      const dummy = new THREE.Object3D()

      for (let i = 0; i < cubeCount; i++) {
        const position = cubePositions[i]

        // Base position with floating animation
        dummy.position.set(
          position.x + Math.sin(t * 0.5 + i * 0.1) * 0.2,
          position.y + Math.sin(t * 0.7 + i * 0.2) * 0.3,
          position.z + Math.cos(t * 0.6 + i * 0.15) * 0.2
        )

        // Cursor-reactive displacement
        const distanceFromCursor = Math.sqrt(
          Math.pow(dummy.position.x - cursorX * 10, 2) +
          Math.pow(dummy.position.y - cursorY * 10, 2)
        )

        if (distanceFromCursor < 5) {
          const pushForce = (1 - distanceFromCursor / 5) * 1.5
          dummy.position.x += (dummy.position.x - cursorX * 10) * pushForce * 0.1
          dummy.position.y += (dummy.position.y - cursorY * 10) * pushForce * 0.1
        }

        // Rotation animation
        dummy.rotation.x = t * 0.5 + i * 0.1
        dummy.rotation.y = t * 0.7 + i * 0.2

        // Scale breathing and formation effect
        const formationProgress = Math.min(1, stageProgress * 2)
        const baseScale = 0.1 + formationProgress * 0.15
        const breathScale = Math.sin(t * 2 + i * 0.3) * 0.05
        dummy.scale.setScalar(baseScale + breathScale)

        dummy.updateMatrix()
        cubesRef.current.setMatrixAt(i, dummy.matrix)

        // Update color based on distance and interaction
        const color = new THREE.Color()
        const hue = 0 // Red/coral range
        const saturation = 0.8 - distanceFromCursor / 20
        const lightness = 0.5 + Math.sin(t * 3 + i * 0.5) * 0.1
        color.setHSL(hue, Math.max(0.3, saturation), lightness)
        cubesRef.current.setColorAt(i, color)
      }

      cubesRef.current.instanceMatrix.needsUpdate = true
      if (cubesRef.current.instanceColor) {
        cubesRef.current.instanceColor.needsUpdate = true
      }
    }

    // Guardian boundary pulsing
    if (guardianRef.current) {
      const material = guardianRef.current.material as THREE.LineBasicMaterial
      material.opacity = 0.3 + Math.sin(t * 2) * 0.1
    }

    // Portal effect animation
    if (portalRef.current) {
      portalRef.current.rotation.z = t * 0.3
      const portalMat = portalRef.current.material as THREE.MeshBasicMaterial
      portalMat.opacity = 0.1 + Math.sin(t * 3) * 0.05
    }
  })

  return (
    <group ref={groupRef} position={[0, 0, 0]}>
      {/* Ambient fog for depth */}
      <fog attach="fog" args={['#F5F5F2', 5, 50]} />

      {/* Room lighting */}
      <pointLight position={[0, 5, 0]} intensity={0.8} color="#FFFFFF" />
      <pointLight position={[0, -3, 0]} intensity={0.3} color="#4FB3FF" />

      {/* Guardian boundary */}
      <lineSegments ref={guardianRef} geometry={guardianGeometry}>
        <lineBasicMaterial
          color="#4FB3FF"
          opacity={0.3}
          transparent
          linewidth={2}
        />
      </lineSegments>

      {/* Interactive cube field */}
      <instancedMesh
        ref={cubesRef}
        args={[undefined, undefined, cubeCount]}
        frustumCulled={false}
      >
        <boxGeometry args={[1, 1, 1]} />
        <meshPhysicalMaterial
          color="#FF6B6B"
          metalness={0.2}
          roughness={0.5}
          clearcoat={0.3}
          clearcoatRoughness={0.7}
          transparent
          opacity={0.8}
          emissive="#FF4444"
          emissiveIntensity={0.2}
        />
      </instancedMesh>

      {/* Portal/Window effect in the distance */}
      <mesh ref={portalRef} position={[0, 0, -20]}>
        <ringGeometry args={[8, 12, 64]} />
        <meshBasicMaterial
          color="#4FB3FF"
          transparent
          opacity={0.1}
          side={THREE.DoubleSide}
        />
      </mesh>

      {/* Floor plane for reference */}
      <mesh position={[0, -4, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[30, 30]} />
        <meshStandardMaterial
          color="#F5F5F2"
          metalness={0.1}
          roughness={0.9}
          transparent
          opacity={0.5}
        />
      </mesh>

      {/* Ceiling */}
      <mesh position={[0, 4, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <planeGeometry args={[30, 30]} />
        <meshStandardMaterial
          color="#FAFAFA"
          metalness={0}
          roughness={1}
          transparent
          opacity={0.3}
        />
      </mesh>
    </group>
  )
}
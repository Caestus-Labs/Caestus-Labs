'use client'

import { useFrame, useThree } from '@react-three/fiber'
import { useRef, useMemo } from 'react'
import * as THREE from 'three'
import { useScrollStore } from '@/stores/scrollStore'
import { useCursorStore } from '@/stores/cursorStore'
import Quest3Model from './Quest3Model'
import VRInterior from './VRInterior'
import { Environment, Stage, ContactShadows } from '@react-three/drei'
// import { EffectComposer, Bloom, Vignette, ChromaticAberration } from '@react-three/postprocessing'
// import { BlendFunction } from 'postprocessing'

// Post-processing effects component
// function Effects({ stage }: { stage: number }) {
//   return (
//     <EffectComposer>
//       <Bloom
//         intensity={0.4}
//         luminanceThreshold={0.9}
//         luminanceSmoothing={0.3}
//       />
//       <Vignette
//         darkness={stage === 3 ? 0.4 : 0}
//         eskil={false}
//       />
//     </EffectComposer>
//   )
// }

export default function HeroScene() {
  const { camera } = useThree()
  const scrollProgress = useScrollStore((state) => state.progress)
  const stage = useScrollStore((state) => state.stage)
  const updateSmoothCursor = useCursorStore((state) => state.updateSmooth)

  const headsetRef = useRef<THREE.Group>(null)

  // Camera keyframes based on scroll progress
  const cameraKeyframes = useMemo(() => [
    { progress: 0.00, position: [0, 0, 2], rotation: [0, 0, 0], fov: 45 },  // Far enough to see whole headset
    { progress: 0.33, position: [0.8, 0, 1.2], rotation: [0, -Math.PI / 4, 0], fov: 40 },  // Side angle view
    { progress: 0.66, position: [0, 0, 0.6], rotation: [0, 0, 0], fov: 50 },  // Closer frontal view
    { progress: 0.72, position: [0, 0, 0.4], rotation: [0, 0, 0], fov: 60 },  // Very close, before transition
    { progress: 0.80, position: [0, 0, 0.15], rotation: [0, 0, 0], fov: 75 },  // Through the lens
    { progress: 1.00, position: [0, 0, 0], rotation: [0, 0, 0], fov: 75 },  // Inside VR world
  ], [])

  // Interpolate camera state based on scroll
  const interpolateCameraState = (progress: number) => {
    let fromIndex = 0
    let toIndex = 1

    for (let i = 0; i < cameraKeyframes.length - 1; i++) {
      if (progress >= cameraKeyframes[i].progress && progress <= cameraKeyframes[i + 1].progress) {
        fromIndex = i
        toIndex = i + 1
        break
      }
    }

    const from = cameraKeyframes[fromIndex]
    const to = cameraKeyframes[toIndex]
    const localProgress = (progress - from.progress) / (to.progress - from.progress)

    // Eased interpolation
    const easedProgress = 1 - Math.pow(1 - localProgress, 3)

    return {
      position: from.position.map((v, i) =>
        v + (to.position[i] - v) * easedProgress
      ) as [number, number, number],
      rotation: from.rotation.map((v, i) =>
        v + (to.rotation[i] - v) * easedProgress
      ) as [number, number, number],
      fov: from.fov + (to.fov - from.fov) * easedProgress,
    }
  }

  useFrame((state, delta) => {
    // Update smooth cursor
    updateSmoothCursor(delta)

    // Update camera based on scroll
    const cameraState = interpolateCameraState(scrollProgress)
    camera.position.set(...cameraState.position)
    camera.rotation.set(...cameraState.rotation)

    if ('fov' in camera) {
      ;(camera as THREE.PerspectiveCamera).fov = cameraState.fov
      ;(camera as THREE.PerspectiveCamera).updateProjectionMatrix()
    }

    // Update headset opacity based on stage
    if (headsetRef.current) {
      const targetOpacity = scrollProgress < 0.72 ? 1 : Math.max(0, 1 - (scrollProgress - 0.72) * 10)
      headsetRef.current.traverse((child) => {
        if ((child as THREE.Mesh).material) {
          const mat = (child as THREE.Mesh).material as THREE.MeshStandardMaterial
          if (mat.transparent !== undefined) {
            mat.transparent = true
            mat.opacity = targetOpacity
          }
        }
      })
    }

    // Update post-processing effects - temporarily disabled
    // if (bloomRef.current) {
    //   // Bloom flash during transition
    //   if (scrollProgress > 0.70 && scrollProgress < 0.74) {
    //     const flashIntensity = Math.sin((scrollProgress - 0.70) * 25) * 2
    //     bloomRef.current.intensity = 0.4 + flashIntensity
    //   } else {
    //     bloomRef.current.intensity = stage === 3 ? 0.6 : 0.3
    //   }
    // }

    // // Chromatic aberration during lens transition
    // if (chromaticRef.current) {
    //   const shouldShowChromatic = scrollProgress > 0.68 && scrollProgress < 0.75
    //   chromaticRef.current.offset.x = shouldShowChromatic ? 0.002 : 0
    //   chromaticRef.current.offset.y = shouldShowChromatic ? 0.002 : 0
    // }

    // // Vignette in stage 3
    // if (vignetteRef.current) {
    //   vignetteRef.current.darkness = stage === 3 ? 0.4 : 0
    // }
  })

  return (
    <>
      {/* Environment for realistic reflections */}
      <Environment
        preset="studio"
        background={false}
        intensity={stage === 3 ? 0.5 : 1}
      />

      {/* Lighting */}
      <ambientLight intensity={stage === 3 ? 0.2 : 0.05} />

      {/* Stage 1-2 Lighting - Premium studio setup */}
      {stage < 3 && (
        <>
          {/* Key light */}
          <directionalLight
            position={[2, 3, 4]}
            intensity={0.8}
            castShadow
            shadow-mapSize={[2048, 2048]}
            color="#ffffff"
          />
          {/* Fill light */}
          <directionalLight
            position={[-3, 1, 2]}
            intensity={0.3}
            color="#e0e0ff"
          />
          {/* Rim light for edge highlights */}
          <spotLight
            position={[-2, 2, -3]}
            intensity={1.5}
            angle={0.3}
            penumbra={0.5}
            color="#4FB3FF"
          />
          {/* Bottom fill */}
          <pointLight position={[0, -2, 3]} intensity={0.2} color="#ffffff" />
        </>
      )}

      {/* Stage 3 Lighting */}
      {stage === 3 && (
        <>
          <hemisphereLight
            skyColor="#F5F5F2"
            groundColor="#E8E8E5"
            intensity={0.5}
          />
          <directionalLight
            position={[0, 10, 0]}
            intensity={0.8}
            color="#FFFFFF"
          />
        </>
      )}

      {/* VR Headset (Stages 1-2) */}
      <group ref={headsetRef}>
        <Quest3Model />
      </group>

      {/* Contact shadow for realism */}
      {stage < 3 && (
        <ContactShadows
          position={[0, -1, 0]}
          scale={4}
          blur={2}
          opacity={0.4}
          far={2}
        />
      )}

      {/* VR Interior (Stage 3) */}
      {scrollProgress > 0.65 && <VRInterior />}

      {/* Post-processing - temporarily disabled to fix import issues */}
      {/* <Effects stage={stage} /> */}
    </>
  )
}
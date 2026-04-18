'use client'

import { Canvas, useFrame } from '@react-three/fiber'
import { Suspense, useEffect, useRef } from 'react'
import * as THREE from 'three'
import Headset from './Headset'

function CameraRig() {
  const scrollProgress = useRef(0)
  const smoothProgress = useRef(0)

  useEffect(() => {
    if (typeof window === 'undefined') return

    const handler = () => {
      scrollProgress.current = Math.min(
        window.scrollY / (window.innerHeight * 0.8),
        1
      )
    }

    handler()
    window.addEventListener('scroll', handler, { passive: true })
    return () => window.removeEventListener('scroll', handler)
  }, [])

  useFrame((state, delta) => {
    const k = 1 - Math.exp(-6 * delta)
    smoothProgress.current +=
      (scrollProgress.current - smoothProgress.current) * k

    const p = smoothProgress.current

    // Plunge z from 4 through origin to -0.5 (exits through rear of headset)
    state.camera.position.z = 4 + (-0.5 - 4) * p

    // Reduced ambient drift (damps with p)
    state.camera.position.x = Math.sin(state.clock.elapsedTime * 0.3) * 0.05 * (1 - p)

    // Slight roll peaking mid-dive for plunge sensation
    state.camera.rotation.z = Math.sin(p * Math.PI) * 0.07

    // FOV overshoot: ramp to 110 at p=0.85, clamp back to 78 at p=1
    const perspCam = state.camera as THREE.PerspectiveCamera
    perspCam.fov =
      p < 0.85
        ? 42 + (110 - 42) * (p / 0.85)
        : 110 + (78 - 110) * ((p - 0.85) / 0.15)
    perspCam.updateProjectionMatrix()
  })

  return null
}

export default function VRScene() {
  return (
    <Canvas
      camera={{ position: [0, 0, 4], fov: 42 }}
      dpr={[1, 2]}
      gl={{ antialias: true, alpha: true }}
      style={{
        position: 'absolute',
        inset: 0,
        pointerEvents: 'none',
      }}
    >
      <Suspense fallback={null}>
        <ambientLight intensity={0.25} />
        <directionalLight position={[4, 3, 5]} intensity={1.1} />
        <pointLight position={[-3, 1, 3]} intensity={0.9} color="#E6FF3C" />
        <pointLight position={[3, -1, 3]} intensity={0.5} color="#ffffff" />
        <pointLight position={[0, 0, 2.5]} intensity={0.3} color="#E6FF3C" />
        <CameraRig />
        <Headset />
      </Suspense>
    </Canvas>
  )
}

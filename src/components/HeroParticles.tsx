import { useMemo, useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import * as THREE from 'three'

function Particles({ count = 1600 }: { count?: number }) {
  const points = useRef<THREE.Points>(null)
  const { positions, colors } = useMemo(() => {
    const positions = new Float32Array(count * 3)
    const colors = new Float32Array(count * 3)
    const cyan = new THREE.Color('#3d9fff')
    const purple = new THREE.Color('#2563eb')
    const pink = new THREE.Color('#f5c518')
    for (let i = 0; i < count; i++) {
      const r = 4 + Math.random() * 7
      const theta = Math.random() * Math.PI * 2
      const phi = Math.acos(2 * Math.random() - 1)
      positions[i * 3] = r * Math.sin(phi) * Math.cos(theta)
      positions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta) * 0.6
      positions[i * 3 + 2] = r * Math.cos(phi)

      const mix = Math.random()
      const c = mix < 0.6 ? cyan : mix < 0.9 ? purple : pink
      colors[i * 3] = c.r
      colors[i * 3 + 1] = c.g
      colors[i * 3 + 2] = c.b
    }
    return { positions, colors }
  }, [count])

  useFrame((state) => {
    if (!points.current) return
    const t = state.clock.elapsedTime
    points.current.rotation.y = t * 0.04
    points.current.rotation.x = Math.sin(t * 0.1) * 0.08
    // gentle parallax toward the pointer
    const px = state.pointer.x * 0.6
    const py = state.pointer.y * 0.6
    points.current.position.x += (px - points.current.position.x) * 0.03
    points.current.position.y += (py - points.current.position.y) * 0.03
  })

  return (
    <points ref={points}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        <bufferAttribute attach="attributes-color" args={[colors, 3]} />
      </bufferGeometry>
      <pointsMaterial
        size={0.05}
        sizeAttenuation
        vertexColors
        transparent
        opacity={0.9}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  )
}

export default function HeroParticles() {
  return (
    <Canvas
      className="!absolute inset-0"
      camera={{ position: [0, 0, 12], fov: 60 }}
      dpr={[1, 1.8]}
      gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
    >
      <Particles />
    </Canvas>
  )
}

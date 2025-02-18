"use client"

import { useRef, useMemo, useState, useEffect } from "react"
import { Canvas, useFrame, useThree } from "@react-three/fiber"
import { OrbitControls } from "@react-three/drei"
import * as THREE from "three"
import { createNoise3D } from "simplex-noise"

function easeInOutCubic(x: number): number {
  return x < 0.5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2
}

function easeOutQuart(x: number): number {
  return 1 - Math.pow(1 - x, 4)
}

// Smoothstep function for smoother transitions
function smoothstep(min: number, max: number, value: number): number {
  const x = Math.max(0, Math.min(1, (value - min) / (max - min)))
  return x * x * (3 - 2 * x)
}

function ParticleCloud() {
  const points = useRef<THREE.Points>(null)
  const { mouse, viewport, camera } = useThree()
  const noise3D = useMemo(() => createNoise3D(), [])
  const time = useRef(0)
  const isHovered = useRef(false)
  const [isForming, setIsForming] = useState(true)
  const formationProgress = useRef(0)
  const previousMousePos = useRef(new THREE.Vector3())
  const mouseVelocity = useRef(new THREE.Vector3())
  const lastUpdateTime = useRef(0)
  const smoothedMouseVelocity = useRef(new THREE.Vector3())

  const cachedVectors = useMemo(
    () => ({
      particlePos: new THREE.Vector3(),
      toCamera: new THREE.Vector3(),
      swirlDir: new THREE.Vector3(),
      repelDir: new THREE.Vector3(),
      outwardPush: new THREE.Vector3(),
      tempVec: new THREE.Vector3(),
    }),
    [],
  )

  const particlesCount = 20000

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsForming(false)
    }, 2000)
    return () => clearTimeout(timer)
  }, [])

  const { positions, velocities, originalPositions, initialPositions } = useMemo(() => {
    const pos = new Float32Array(particlesCount * 3)
    const vel = new Float32Array(particlesCount * 3)
    const orig = new Float32Array(particlesCount * 3)
    const init = new Float32Array(particlesCount * 3)

    for (let i = 0; i < particlesCount; i++) {
      // Increased base radius from 1.8 to 3.0 for a larger sphere
      const radius = 3.0 * (1 + Math.random() * 0.15)
      const theta = Math.random() * Math.PI * 2
      const phi = Math.acos(Math.random() * 2 - 1)

      const x = radius * Math.sin(phi) * Math.cos(theta)
      const y = radius * Math.sin(phi) * Math.sin(theta)
      const z = radius * Math.cos(phi)

      orig[i * 3] = x
      orig[i * 3 + 1] = y
      orig[i * 3 + 2] = z

      const scatterRadius = 8 + Math.random() * 4
      const scatterTheta = Math.random() * Math.PI * 2
      const scatterPhi = Math.acos(Math.random() * 2 - 1)

      init[i * 3] = scatterRadius * Math.sin(scatterPhi) * Math.cos(scatterTheta)
      init[i * 3 + 1] = scatterRadius * Math.sin(scatterPhi) * Math.sin(scatterTheta)
      init[i * 3 + 2] = scatterRadius * Math.cos(scatterPhi)

      pos[i * 3] = init[i * 3]
      pos[i * 3 + 1] = init[i * 3 + 1]
      pos[i * 3 + 2] = init[i * 3 + 2]

      vel[i * 3] = 0
      vel[i * 3 + 1] = 0
      vel[i * 3 + 2] = 0
    }
    return { positions: pos, velocities: vel, originalPositions: orig, initialPositions: init }
  }, [])

  const raycaster = useMemo(() => new THREE.Raycaster(), [])
  const mouseVector = useMemo(() => new THREE.Vector2(), [])
  // Increased intersection sphere radius from 2.0 to 3.2
  const intersectionSphere = useMemo(() => new THREE.Sphere(new THREE.Vector3(0, 0, 0), 3.2), [])
  const localIntersection = useMemo(() => new THREE.Vector3(), [])
  const worldToLocal = useMemo(() => new THREE.Matrix4(), [])

  useFrame((state, delta) => {
    if (!points.current) return

    time.current += delta
    if (isForming) {
      formationProgress.current = Math.min(1, formationProgress.current + delta * 0.4)
    }

    const positions = points.current.geometry.attributes.position.array as Float32Array

    worldToLocal.copy(points.current.matrixWorld).invert()

    mouseVector.set(mouse.x, mouse.y)
    raycaster.setFromCamera(mouseVector, camera)
    const localRay = raycaster.ray.clone().applyMatrix4(worldToLocal)
    const intersects = localRay.intersectSphere(intersectionSphere, localIntersection)
    isHovered.current = !!intersects

    if (isHovered.current) {
      const currentTime = time.current
      const timeDelta = currentTime - lastUpdateTime.current

      if (timeDelta > 0) {
        const newVelocity = new THREE.Vector3()
          .copy(localIntersection)
          .sub(previousMousePos.current)
          .multiplyScalar(1 / Math.max(timeDelta, 0.016))

        smoothedMouseVelocity.current.lerp(newVelocity, 0.15)
        previousMousePos.current.copy(localIntersection)
        lastUpdateTime.current = currentTime
      }
    } else {
      smoothedMouseVelocity.current.multiplyScalar(0.95)
    }

    for (let i = 0; i < particlesCount; i++) {
      const i3 = i * 3

      const particlePos = cachedVectors.particlePos.set(positions[i3], positions[i3 + 1], positions[i3 + 2])

      if (isForming) {
        const targetX = originalPositions[i3]
        const targetY = originalPositions[i3 + 1]
        const targetZ = originalPositions[i3 + 2]

        const dx = targetX - positions[i3]
        const dy = targetY - positions[i3 + 1]
        const dz = targetZ - positions[i3 + 2]

        const formationForce = 0.03
        velocities[i3] += dx * formationForce
        velocities[i3 + 1] += dy * formationForce
        velocities[i3 + 2] += dz * formationForce

        velocities[i3] *= 0.92
        velocities[i3 + 1] *= 0.92
        velocities[i3 + 2] *= 0.92
      }

      const distance = particlePos.distanceTo(localIntersection)
      const toCamera = cachedVectors.toCamera
        .copy(camera.position)
        .applyMatrix4(worldToLocal)
        .sub(particlePos)
        .normalize()
      const visibilityDot = toCamera.dot(particlePos.normalize())

      const interactionRadius = 0.45
      if (distance < interactionRadius && visibilityDot > -0.6) {
        const smoothFalloff = smoothstep(interactionRadius, 0, distance)
        const temporalFalloff = (Math.sin(time.current * 1.5) * 0.5 + 0.5) * 0.3 + 0.7

        const noiseScale = 1.2
        const noiseTime = time.current * 0.2
        const nx = noise3D(particlePos.x * noiseScale, particlePos.y * noiseScale, noiseTime)
        const ny = noise3D(particlePos.y * noiseScale, particlePos.z * noiseScale, noiseTime)
        const nz = noise3D(particlePos.z * noiseScale, particlePos.x * noiseScale, noiseTime)

        const swirlDir = cachedVectors.swirlDir.set(nx, ny, nz).normalize()
        const repelDir = cachedVectors.repelDir.copy(particlePos).sub(localIntersection).normalize()

        const blendFactor = smoothstep(0, 1, smoothFalloff * 0.6)
        swirlDir.lerp(repelDir, blendFactor).normalize()

        const turbulence = new THREE.Vector3(
          noise3D(particlePos.x * 1.2, particlePos.y * 1.2, noiseTime),
          noise3D(particlePos.y * 1.2, particlePos.z * 1.2, noiseTime),
          noise3D(particlePos.z * 1.2, particlePos.x * 1.2, noiseTime),
        ).multiplyScalar(0.05 * smoothFalloff)

        const force = 0.08 * smoothFalloff * Math.max(0, visibilityDot + 0.6)
        const swirlForce = 0.04 * smoothFalloff * Math.max(0, visibilityDot + 0.6)

        const mouseInfluence = smoothedMouseVelocity.current.clone().multiplyScalar(0.015 * smoothFalloff)

        const outwardPush = cachedVectors.outwardPush
          .copy(particlePos)
          .normalize()
          .multiplyScalar(0.015 * smoothFalloff)

        const combinedForce = 0.9 + temporalFalloff * 0.1
        velocities[i3] +=
          (repelDir.x * force + swirlDir.x * swirlForce + outwardPush.x + turbulence.x + mouseInfluence.x) *
          combinedForce
        velocities[i3 + 1] +=
          (repelDir.y * force + swirlDir.y * swirlForce + outwardPush.y + turbulence.y + mouseInfluence.y) *
          combinedForce
        velocities[i3 + 2] +=
          (repelDir.z * force + swirlDir.z * swirlForce + outwardPush.z + turbulence.z + mouseInfluence.z) *
          combinedForce
      }

      const distFromCenter = Math.sqrt(
        positions[i3] * positions[i3] + positions[i3 + 1] * positions[i3 + 1] + positions[i3 + 2] * positions[i3 + 2],
      )

      const returnForce = 0.012 * (1 + Math.max(0, (distFromCenter - 2) * 0.4))
      const dxOrig = originalPositions[i3] - positions[i3]
      const dyOrig = originalPositions[i3 + 1] - positions[i3 + 1]
      const dzOrig = originalPositions[i3 + 2] - positions[i3 + 2]

      const returnDist = Math.sqrt(dxOrig * dxOrig + dyOrig * dyOrig + dzOrig * dzOrig)
      const returnEase = smoothstep(0, 0.8, returnDist)

      velocities[i3] += dxOrig * returnForce * returnEase
      velocities[i3 + 1] += dyOrig * returnForce * returnEase
      velocities[i3 + 2] += dzOrig * returnForce * returnEase

      positions[i3] += velocities[i3] * 0.6
      positions[i3 + 1] += velocities[i3 + 1] * 0.6
      positions[i3 + 2] += velocities[i3 + 2] * 0.6

      const baseDamping = 0.97
      const distanceFactor = Math.max(0, (distFromCenter - 2) * 0.06)
      const damping = Math.min(baseDamping, baseDamping - distanceFactor)

      velocities[i3] *= damping
      velocities[i3 + 1] *= damping
      velocities[i3 + 2] *= damping

      // Increased maxRadius from 3 to 4.4
      const maxRadius = 4.4
      if (distFromCenter > maxRadius) {
        const correction = maxRadius / distFromCenter
        positions[i3] *= correction
        positions[i3 + 1] *= correction
        positions[i3 + 2] *= correction

        velocities[i3] *= 0.9
        velocities[i3 + 1] *= 0.9
        velocities[i3 + 2] *= 0.9
      }
    }

    points.current.geometry.attributes.position.needsUpdate = true
    points.current.rotation.y += 0.0004
  })

  return (
    <points ref={points}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" count={particlesCount} array={positions} itemSize={3} />
      </bufferGeometry>
      <pointsMaterial
        size={0.02}
        color="#F45A1A"
        sizeAttenuation={true}
        transparent={true}
        opacity={0.9}
        blending={THREE.AdditiveBlending}
      />
    </points>
  )
}

export default function ParticleSphere() {
  return (
    <div className="w-full h-full">
      <Canvas camera={{ position: [0, 0, 8.5], fov: 60 }} gl={{ antialias: true, alpha: true }}>
        <ParticleCloud />
        <OrbitControls enableZoom={false} enablePan={false} enableDamping={true} dampingFactor={0.05} />
      </Canvas>
    </div>
  )
}


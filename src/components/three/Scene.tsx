"use client"

import { Suspense, useMemo, useRef } from "react"
import { Canvas, useFrame } from "@react-three/fiber"
import { Environment, Lightformer } from "@react-three/drei"
import * as THREE from "three"

import { sceneState } from "@/lib/scrollState"
import { Bottle, BOTTLE_HEIGHT } from "./Bottle"

/**
 * A studio built from light panels instead of an HDRI download: two tall
 * strips on the sides carve the long highlights along the glass, a warm
 * top panel lights the cap, a soft floor bounce lifts the base.
 */
function Studio() {
  return (
    <Environment resolution={256} frames={1}>
      <Lightformer form="rect" intensity={2.6} color="#FFF3DA" position={[0, 7, 3]} scale={[10, 3, 1]} target={[0, 0, 0]} />
      <Lightformer form="rect" intensity={5} color="#FFFFFF" position={[-5, 1, 4]} rotation-y={Math.PI / 3.2} scale={[0.45, 9, 1]} />
      <Lightformer form="rect" intensity={3} color="#FFF6E6" position={[5.5, 0.5, 3.5]} rotation-y={-Math.PI / 3.2} scale={[0.3, 9, 1]} />
      <Lightformer form="rect" intensity={0.9} color="#CBD6B8" position={[0, -6, 2]} scale={[10, 2, 1]} target={[0, 0, 0]} />
      <Lightformer form="ring" intensity={1.4} color="#FFE2A0" position={[4, 5, -6]} scale={3} target={[0, 0, 0]} />
    </Environment>
  )
}

/** A soft studio glow behind the bottle; the page colour itself comes from CSS. */
function makeGlowTexture() {
  const c = document.createElement("canvas")
  c.width = c.height = 512
  const ctx = c.getContext("2d")!
  const g = ctx.createRadialGradient(256, 256, 0, 256, 256, 256)
  g.addColorStop(0, "rgba(255,255,255,1)")
  g.addColorStop(0.45, "rgba(255,255,255,.45)")
  g.addColorStop(1, "rgba(255,255,255,0)")
  ctx.fillStyle = g
  ctx.fillRect(0, 0, 512, 512)
  return new THREE.CanvasTexture(c)
}

function Backdrop() {
  const glow = useRef<THREE.Mesh>(null)
  const glowMat = useRef<THREE.MeshBasicMaterial>(null)
  const glowTex = useMemo(() => makeGlowTexture(), [])
  const tmp = useMemo(() => new THREE.Color(), [])
  useFrame(({ camera, viewport, size }) => {
    if (!glow.current || !glowMat.current) return
    const v = viewport.getCurrentViewport(camera, [0, 0, -6], size)
    // A studio glow: brighter on light pages, a faint warm halo on dark ones.
    tmp.set(sceneState.bg)
    const lum = tmp.r * 0.3 + tmp.g * 0.6 + tmp.b * 0.1
    glowMat.current.opacity = lum > 0.5 ? 0.45 : 0.06
    glowMat.current.color.set(lum > 0.5 ? "#FFFDF6" : "#FFE2A8")
    const g = Math.max(v.width, v.height) * 0.95
    glow.current.scale.set(g, g * 0.85, 1)
  })
  return (
    <>
      <mesh ref={glow} position={[0, 0.2, -5.9]} renderOrder={-2}>
        <planeGeometry args={[1, 1]} />
        <meshBasicMaterial ref={glowMat} map={glowTex} transparent opacity={0.4} depthWrite={false} toneMapped={false} />
      </mesh>
    </>
  )
}

export function Scene() {
  return (
    <div className="fixed inset-0 z-[1]" aria-hidden>
      <Canvas
        dpr={[1, 1.75]}
        camera={{ fov: 28, position: [0, 0, 14], near: 0.1, far: 60 }}
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: "high-performance",
          toneMapping: THREE.ACESFilmicToneMapping,
          toneMappingExposure: 1.0,
        }}
        onCreated={({ gl }) => {
          gl.setClearColor(0x000000, 0)
          // Vertical swipes still scroll the page; horizontal drags turn the bottle.
          gl.domElement.style.touchAction = "pan-y"
        }}
      >
        <Backdrop />
        <Suspense fallback={null}>
          <Studio />
          <directionalLight position={[3, 5, 8]} intensity={1.7} color="#FFF1D6" />
          <directionalLight position={[-6, 2, -4]} intensity={0.4} color="#CFE0B8" />
          <Bottle />
        </Suspense>
      </Canvas>
    </div>
  )
}

export { BOTTLE_HEIGHT }

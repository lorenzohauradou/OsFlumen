"use client"

import { useEffect, useMemo, useRef } from "react"
import { useFrame, useThree, type ThreeEvent } from "@react-three/fiber"
import * as THREE from "three"

import { pose } from "@/lib/scrollState"
import { createLabelTexture, resolveFontFamily } from "./labelTexture"

/* ---- Geometry ----------------------------------------------------------------
   A 500 ml "Dorica" bottle built from lathe profiles, so it needs no model
   download. Units: body radius = 1, total height = BOTTLE_HEIGHT.          */

export const BOTTLE_HEIGHT = 7.2

// Outer glass: straight body, a short rounded shoulder, long neck.
const GLASS_PROFILE: [number, number][] = [
  [0, 0.05],
  [0.55, 0.03],
  [0.86, 0.0],
  [0.97, 0.06],
  [1.0, 0.22],
  [1.0, 4.3],
  [0.99, 4.48],
  [0.95, 4.64],
  [0.87, 4.78],
  [0.75, 4.9],
  [0.61, 5.0],
  [0.5, 5.08],
  [0.43, 5.18],
  [0.415, 5.32],
  [0.415, 6.98],
]

// Dark mass inside the glass: the oil in the body …
const OIL_PROFILE: [number, number][] = [
  [0, 0.08],
  [0.9, 0.06],
  [0.985, 0.22],
  [0.985, 4.3],
  [0.975, 4.48],
  [0.935, 4.64],
  [0.855, 4.78],
  [0.735, 4.9],
  [0.6, 5.0],
  [0.49, 5.08],
  [0.42, 5.2],
  [0.405, 5.4],
  [0, 5.4],
]

// … and the thick green glass of the neck.
const NECK_PROFILE: [number, number][] = [
  [0, 5.3],
  [0.405, 5.3],
  [0.405, 6.98],
  [0, 6.98],
]

const CAP_PROFILE: [number, number][] = [
  [0, 7.2],
  [0.4, 7.2],
  [0.47, 7.16],
  [0.49, 7.08],
  [0.49, 5.9],
  [0.46, 5.85],
  [0.415, 5.84],
]

function lathe(points: [number, number][], segments = 128) {
  return new THREE.LatheGeometry(points.map(([r, y]) => new THREE.Vector2(r, y)), segments)
}

/* ---- Textures ------------------------------------------------------------------ */

/** Soft elliptical shadow painted on a canvas: cheaper and calmer than a shadow pass. */
function makeShadowTexture() {
  const c = document.createElement("canvas")
  c.width = c.height = 256
  const ctx = c.getContext("2d")!
  const g = ctx.createRadialGradient(128, 128, 0, 128, 128, 128)
  g.addColorStop(0, "rgba(20,14,4,0.7)")
  g.addColorStop(0.35, "rgba(20,14,4,0.35)")
  g.addColorStop(1, "rgba(20,14,4,0)")
  ctx.fillStyle = g
  ctx.fillRect(0, 0, 256, 256)
  const t = new THREE.CanvasTexture(c)
  t.colorSpace = THREE.SRGBColorSpace
  return t
}

/** Fine horizontal ridges for the screw cap. */
function makeCapBumpTexture() {
  const c = document.createElement("canvas")
  c.width = 4
  c.height = 256
  const ctx = c.getContext("2d")!
  for (let y = 0; y < 256; y++) {
    const v = 128 + Math.round(Math.sin((y / 256) * Math.PI * 2 * 22) * 60)
    ctx.fillStyle = `rgb(${v},${v},${v})`
    ctx.fillRect(0, y, 4, 1)
  }
  const t = new THREE.CanvasTexture(c)
  t.wrapS = t.wrapT = THREE.RepeatWrapping
  return t
}

/* ---- Component ---------------------------------------------------------------- */

const LABEL_ARC = Math.PI * 2 * 0.66
const LABEL_HEIGHT = 3.4
const LABEL_Y = 0.95 + LABEL_HEIGHT / 2

const current = { x: 0, y: -2.5, rx: 0, ry: -0.6, rz: 0, s: 0, shadow: 0 }
const drag = { active: false, offset: 0, velocity: 0, lastX: 0, spin: 0 }

const damp = THREE.MathUtils.damp

interface Props {
  onReady?: () => void
}

export function Bottle({ onReady }: Props) {
  const group = useRef<THREE.Group>(null)
  const shadow = useRef<THREE.Mesh>(null)
  const { viewport, size } = useThree()
  const labelMat = useRef<THREE.MeshStandardMaterial>(null)
  const labelTex = useRef<THREE.CanvasTexture | null>(null)

  const glassGeo = useMemo(() => lathe(GLASS_PROFILE), [])
  const oilGeo = useMemo(() => lathe(OIL_PROFILE, 96), [])
  const neckGeo = useMemo(() => lathe(NECK_PROFILE, 64), [])
  const capGeo = useMemo(() => lathe(CAP_PROFILE, 96), [])
  const labelGeo = useMemo(
    () => new THREE.CylinderGeometry(1.012, 1.012, LABEL_HEIGHT, 128, 1, true, -LABEL_ARC / 2, LABEL_ARC),
    []
  )
  const shadowTex = useMemo(() => makeShadowTexture(), [])
  const capBump = useMemo(() => makeCapBumpTexture(), [])

  // Paint the label once the page fonts are available.
  useEffect(() => {
    let alive = true
    const family = resolveFontFamily("--font-display")
    const ready = family ? document.fonts.load(`600 40px ${family}`).catch(() => undefined) : Promise.resolve()
    ready
      .then(() => createLabelTexture(family))
      .then((tex) => {
        if (!alive || !labelMat.current) {
          tex.dispose()
          return
        }
        labelTex.current = tex
        labelMat.current.map = tex
        labelMat.current.color.set("#FFFFFF")
        labelMat.current.needsUpdate = true
        onReady?.()
      })
      .catch(() => undefined)
    return () => {
      alive = false
      labelTex.current?.dispose()
      labelTex.current = null
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // Grab-and-turn: a horizontal drag on the bottle spins it; on release it
  // keeps a little momentum and then settles back to the story pose.
  useEffect(() => {
    const move = (e: PointerEvent) => {
      if (!drag.active) return
      const dx = e.clientX - drag.lastX
      drag.lastX = e.clientX
      drag.offset += dx * 0.012
      drag.velocity = dx * 0.012
    }
    const up = () => {
      if (!drag.active) return
      drag.active = false
      document.body.style.cursor = ""
    }
    window.addEventListener("pointermove", move)
    window.addEventListener("pointerup", up)
    window.addEventListener("pointercancel", up)
    return () => {
      window.removeEventListener("pointermove", move)
      window.removeEventListener("pointerup", up)
      window.removeEventListener("pointercancel", up)
    }
  }, [])

  const onPointerDown = (e: ThreeEvent<PointerEvent>) => {
    e.stopPropagation()
    drag.active = true
    drag.lastX = e.clientX
    drag.velocity = 0
    document.body.style.cursor = "grabbing"
  }

  useFrame((state, dt) => {
    const g = group.current
    if (!g) return
    const t = state.clock.elapsedTime
    const d = Math.min(dt, 1 / 30)

    // World-space size: the bottle spans ~72% of the viewport height at scale 1.
    const isNarrow = size.width < 768
    const fill = isNarrow ? 0.6 : 0.72
    const base = (viewport.height * fill) / BOTTLE_HEIGHT

    current.x = damp(current.x, pose.x * viewport.width, 4.5, d)
    current.y = damp(current.y, pose.y * viewport.height, 4.5, d)
    current.s = damp(current.s, base * pose.scale, 4.5, d)
    current.rx = damp(current.rx, pose.rx, 4, d)
    current.ry = damp(current.ry, pose.ry, 4, d)
    current.rz = damp(current.rz, pose.rz, 4, d)
    current.shadow = damp(current.shadow, pose.shadow, 4, d)

    // Slow turntable while a chapter asks for it; eases back to zero after.
    if (pose.spin > 0.02) {
      drag.spin += d * 0.35 * pose.spin
    } else {
      drag.spin = THREE.MathUtils.euclideanModulo(drag.spin + Math.PI, Math.PI * 2) - Math.PI
      drag.spin = damp(drag.spin, 0, 2.5, d)
    }

    // Drag momentum, then a gentle return to the composed view.
    if (!drag.active) {
      drag.offset += drag.velocity
      drag.velocity *= 0.92
      drag.offset = THREE.MathUtils.euclideanModulo(drag.offset + Math.PI, Math.PI * 2) - Math.PI
      drag.offset = damp(drag.offset, 0, 0.9, d)
    }

    const px = state.pointer.x
    const py = state.pointer.y
    const floatY = Math.sin(t * 0.9) * 0.025 * current.s * BOTTLE_HEIGHT * 0.1

    g.position.set(current.x, current.y + floatY, 0)
    g.scale.setScalar(current.s)
    g.rotation.set(
      current.rx - py * 0.05 + Math.sin(t * 0.7) * 0.008,
      current.ry + drag.spin + drag.offset + px * 0.12,
      current.rz + Math.sin(t * 0.5) * 0.01
    )

    const sh = shadow.current
    if (sh) {
      const bottom = current.y - (current.s * BOTTLE_HEIGHT) / 2
      sh.position.set(current.x, bottom - 0.02, -0.2)
      sh.scale.set(current.s * 4.2, current.s * 1.5, 1)
      const m = sh.material as THREE.MeshBasicMaterial
      m.opacity = current.shadow * 0.9
      sh.visible = m.opacity > 0.01
    }
  })

  return (
    <>
      <group
        ref={group}
        onPointerDown={onPointerDown}
        onPointerOver={() => {
          if (!drag.active) document.body.style.cursor = "grab"
        }}
        onPointerOut={() => {
          if (!drag.active) document.body.style.cursor = ""
        }}
      >
        <group position={[0, -BOTTLE_HEIGHT / 2, 0]}>
          {/* Oil in the body: near-black with a warm amber undertone. */}
          <mesh geometry={oilGeo} renderOrder={0}>
            <meshStandardMaterial color="#2C1407" emissive="#1C0C03" emissiveIntensity={0.6} roughness={0.62} metalness={0} />
          </mesh>
          {/* Neck: thick dark-green glass with nothing behind it. */}
          <mesh geometry={neckGeo} renderOrder={0}>
            <meshStandardMaterial color="#14220C" emissive="#0E1A08" emissiveIntensity={0.5} roughness={0.55} metalness={0} />
          </mesh>

          {/* Label */}
          <mesh geometry={labelGeo} position={[0, LABEL_Y, 0]} renderOrder={1}>
            <meshStandardMaterial ref={labelMat} color="#E4D4AE" roughness={0.9} metalness={0} />
          </mesh>

          {/* Glass skin: nearly invisible, it only carries the reflections. */}
          <mesh geometry={glassGeo} renderOrder={2}>
            <meshPhysicalMaterial
              color="#040803"
              transparent
              opacity={0.34}
              roughness={0.05}
              metalness={0}
              clearcoat={0.7}
              clearcoatRoughness={0.03}
              envMapIntensity={1.0}
              depthWrite={false}
              side={THREE.FrontSide}
            />
          </mesh>

          {/* Screw cap */}
          <mesh geometry={capGeo} renderOrder={3}>
            <meshStandardMaterial
              color="#C9A24E"
              roughness={0.42}
              metalness={0.95}
              envMapIntensity={1.3}
              bumpMap={capBump}
              bumpScale={0.01}
            />
          </mesh>
          <mesh position={[0, 6.12, 0]} renderOrder={3}>
            <torusGeometry args={[0.492, 0.008, 8, 96]} />
            <meshStandardMaterial color="#7A5A20" roughness={0.5} metalness={1} />
          </mesh>
        </group>
      </group>

      <mesh ref={shadow} rotation={[-Math.PI / 2, 0, 0]} renderOrder={-1}>
        <planeGeometry args={[1, 1]} />
        <meshBasicMaterial map={shadowTex} transparent opacity={0} depthWrite={false} toneMapped={false} />
      </mesh>
    </>
  )
}

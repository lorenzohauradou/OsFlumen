"use client"

import { Suspense, useEffect, useMemo, useRef, useState } from "react"
import { Canvas, useFrame, useThree } from "@react-three/fiber"
import { useTexture } from "@react-three/drei"
import * as THREE from "three"

import { useSceneReady } from "./sceneReady"

/**
 * The opening scene: the aerial photograph of the estate as a shader plate,
 * and the wordmark standing in front of it as real geometry.
 *
 * The photograph surfaces out of the paper colour through a slow liquid warp —
 * light read through a film of oil — which settles to a near-still drift over
 * about two seconds. The wordmark extrudes at the same moment and afterwards
 * only turns a few degrees to follow the pointer, so its thickness reads.
 *
 * Reduced motion, a blocked WebGL context or a texture that fails to decode all
 * fall back to the plain <Image> pair the caller paints underneath.
 */

const REVEAL_MS = 2200

/** Slices of the wordmark stacked back to front; more slices, smoother sides.
    The depth is a fraction of the mark's own width, so the letters keep the
    same proportions on a phone as on a wide screen. */
const LAYERS = 24
const DEPTH_RATIO = 0.032

const PHOTO_VERTEX = /* glsl */ `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`

const PHOTO_FRAGMENT = /* glsl */ `
  precision highp float;

  uniform sampler2D uTex;
  uniform vec2  uRes;      // canvas, in device-independent px
  uniform vec2  uTexRes;   // source image, in px
  uniform vec2  uPointer;  // -1 .. 1, smoothed
  uniform float uTime;
  uniform float uWarp;     // 1 at load, 0 once settled
  uniform float uFade;     // 0 at load, 1 once settled
  uniform vec3  uPaper;

  varying vec2 vUv;

  float hash(vec2 p) {
    return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453123);
  }

  float noise(vec2 p) {
    vec2 i = floor(p);
    vec2 f = fract(p);
    vec2 u = f * f * (3.0 - 2.0 * f);
    return mix(
      mix(hash(i), hash(i + vec2(1.0, 0.0)), u.x),
      mix(hash(i + vec2(0.0, 1.0)), hash(i + vec2(1.0, 1.0)), u.x),
      u.y
    );
  }

  float fbm(vec2 p) {
    float v = 0.0;
    float a = 0.5;
    for (int i = 0; i < 4; i++) {
      v += a * noise(p);
      p *= 2.02;
      a *= 0.5;
    }
    return v;
  }

  /* Fill the frame the way object-fit: cover would, with a hair of overscan
     so the warp and the parallax never drag the clamped edge into view. */
  vec2 coverUv(vec2 uv) {
    float frame = uRes.x / uRes.y;
    float image = uTexRes.x / uTexRes.y;
    vec2 scale = frame > image
      ? vec2(1.0, image / frame)
      : vec2(frame / image, 1.0);
    return (uv - 0.5) * scale * 0.955 + 0.5;
  }

  void main() {
    vec2 uv = coverUv(vUv);

    float t = uTime * 0.035;
    vec2 flow = vec2(
      fbm(uv * 3.1 + vec2(0.0, t)),
      fbm(uv * 3.1 + vec2(5.2, 1.3) - t)
    ) - 0.5;

    /* The idle term is deliberately tiny: at rest this reads as still water,
       not as a wobbling background. */
    uv += flow * (uWarp * 0.055 + 0.0024);
    uv += uPointer * vec2(0.012, 0.008) * (1.0 - vUv.y * 0.35);

    /* Oil disperses light: the channels separate while the warp is strong and
       re-converge exactly as it settles. */
    vec2 spread = normalize(vUv - 0.5 + 1e-5) * uWarp * 0.0045;
    vec3 col = vec3(
      texture2D(uTex, uv + spread).r,
      texture2D(uTex, uv).g,
      texture2D(uTex, uv - spread).b
    );

    // Grade: pull a little saturation out, warm the frame, firm the mids.
    float luma = dot(col, vec3(0.299, 0.587, 0.114));
    col = mix(vec3(luma), col, 0.9);
    col *= vec3(1.035, 1.0, 0.955);
    col = mix(col, col * col * (3.0 - 2.0 * col), 0.18);

    float vignette = smoothstep(1.25, 0.4, length((vUv - 0.5) * vec2(uRes.x / uRes.y, 1.0)));
    col *= mix(0.78, 1.0, vignette);

    // Surface out of the paper rather than cross-fading from black.
    col = mix(uPaper, col, uFade);

    gl_FragColor = vec4(col, 1.0);
    #include <colorspace_fragment>
  }
`

/** Where the DOM has reserved room for the wordmark, in CSS pixels. */
export type MarkBox = { x: number; y: number; w: number; h: number }

type SceneProps = {
  photo: string
  mark: string
  box: MarkBox | null
}

/** Shared, smoothed pointer: both the photograph and the wordmark read it. */
function usePointer() {
  const aim = useRef(new THREE.Vector2())
  const value = useRef(new THREE.Vector2())

  useEffect(() => {
    const onMove = (e: PointerEvent) => {
      aim.current.set(
        (e.clientX / window.innerWidth) * 2 - 1,
        (e.clientY / window.innerHeight) * 2 - 1
      )
    }
    window.addEventListener("pointermove", onMove, { passive: true })
    return () => window.removeEventListener("pointermove", onMove)
  }, [])

  return { aim, value }
}

function Photo({
  src,
  pointer,
  progress,
}: {
  src: string
  pointer: React.RefObject<THREE.Vector2>
  progress: React.RefObject<number>
}) {
  const onReady = useSceneReady()
  const texture = useTexture(src)
  const material = useRef<THREE.ShaderMaterial>(null)
  const { viewport, size, gl } = useThree()

  const uniforms = useMemo(
    () => ({
      uTex: { value: texture },
      uRes: { value: new THREE.Vector2(1, 1) },
      uTexRes: { value: new THREE.Vector2(1, 1) },
      uPointer: { value: new THREE.Vector2() },
      uTime: { value: 0 },
      uWarp: { value: 1 },
      uFade: { value: 0 },
      uPaper: { value: new THREE.Color("#F4EDDE").convertSRGBToLinear() },
    }),
    [texture]
  )

  useEffect(() => {
    texture.colorSpace = THREE.SRGBColorSpace
    texture.anisotropy = gl.capabilities.getMaxAnisotropy()
    texture.needsUpdate = true
    const img = texture.image as { width: number; height: number }
    uniforms.uTexRes.value.set(img.width, img.height)
    onReady?.()
  }, [texture, gl, uniforms, onReady])

  useFrame((state) => {
    const u = material.current?.uniforms
    if (!u) return
    const eased = progress.current ?? 0
    u.uWarp.value = 1 - eased
    u.uFade.value = Math.min(1, eased * 1.15)
    u.uTime.value = state.clock.elapsedTime
    u.uRes.value.set(size.width, size.height)
    if (pointer.current) u.uPointer.value.copy(pointer.current)
  })

  return (
    /* Drawn first and writing no depth, so the wordmark's slices — which sit
       at the same z — always land in front of it. */
    <mesh renderOrder={-1} scale={[viewport.width, viewport.height, 1]}>
      <planeGeometry args={[1, 1]} />
      <shaderMaterial
        ref={material}
        uniforms={uniforms}
        vertexShader={PHOTO_VERTEX}
        fragmentShader={PHOTO_FRAGMENT}
        depthWrite={false}
      />
    </mesh>
  )
}

function Wordmark({
  src,
  box,
  pointer,
  progress,
}: {
  src: string
  box: MarkBox
  pointer: React.RefObject<THREE.Vector2>
  progress: React.RefObject<number>
}) {
  const texture = useTexture(src)
  const group = useRef<THREE.Group>(null)
  const { viewport, size, gl } = useThree()

  useEffect(() => {
    texture.colorSpace = THREE.SRGBColorSpace
    texture.anisotropy = gl.capabilities.getMaxAnisotropy()
    texture.needsUpdate = true
  }, [texture, gl])

  // Map the box the DOM reserved onto world units, so the geometry lands
  // exactly where the fallback image would have been at any window size.
  const perPx = viewport.width / size.width
  const width = box.w * perPx
  const height = box.h * perPx
  const depth = width * DEPTH_RATIO
  const x = (box.x + box.w / 2 - size.width / 2) * perPx
  const y = (size.height / 2 - (box.y + box.h / 2)) * perPx

  /* The map is the logo itself (#642F1A). The face multiplies by white so those
     pixels stay exact; slices behind only lose luminance, so the cut edge still
     reads as thickness without shifting the brown. */
  const slices = useMemo(() => {
    return Array.from({ length: LAYERS }, (_, i) => {
      const k = i / (LAYERS - 1)
      const shade = 1 - Math.pow(k, 0.42) * 0.38
      return {
        z: -k * depth,
        color: new THREE.Color(shade, shade, shade),
      }
    })
  }, [depth])

  useFrame(() => {
    const g = group.current
    if (!g) return
    const eased = progress.current ?? 0
    const p = pointer.current ?? new THREE.Vector2()

    // Arrive turned a few degrees, then settle to the pointer's lead.
    const entry = (1 - eased) * 0.5
    g.rotation.y = THREE.MathUtils.lerp(g.rotation.y, p.x * 0.16 - entry, 0.08)
    g.rotation.x = THREE.MathUtils.lerp(g.rotation.x, p.y * 0.09, 0.08)
    g.scale.setScalar(0.94 + eased * 0.06)
  })

  return (
    <group ref={group} position={[x, y, 0]}>
      {/* Contact shadow: the mark reads as standing off the photograph. */}
      <mesh position={[width * 0.004, -height * 0.018, -depth - width * 0.008]}>
        <planeGeometry args={[width, height]} />
        <meshBasicMaterial
          map={texture}
          color="#150E07"
          transparent
          opacity={0.22}
          alphaTest={0.35}
          toneMapped={false}
        />
      </mesh>

      {slices.map(({ z, color }, i) => (
        <mesh key={i} position={[0, 0, z]}>
          <planeGeometry args={[width, height]} />
          <meshBasicMaterial
            map={texture}
            color={color}
            transparent
            alphaTest={0.45}
            toneMapped={false}
          />
        </mesh>
      ))}
    </group>
  )
}

function Scene({ photo, mark, box }: SceneProps) {
  const { aim, value } = usePointer()
  const elapsed = useRef(0)
  const progress = useRef(0)

  useFrame((state, delta) => {
    /* Accumulated rather than read off the clock: a first frame at elapsed
       time zero would otherwise pin the reveal at its starting pose. The step
       is capped so returning to a backgrounded tab doesn't jump the scene. */
    const step = Math.min(delta, 0.05)
    elapsed.current = Math.min(1, elapsed.current + (step * 1000) / REVEAL_MS)
    progress.current = 1 - Math.pow(1 - elapsed.current, 3)

    // Frame-rate independent smoothing, so the parallax trails the cursor
    // identically on a 60 and a 120 Hz display.
    value.current.lerp(aim.current, 1 - Math.exp(-step * 3.2))
  })

  return (
    <>
      <Photo src={photo} pointer={value} progress={progress} />
      {box && (
        <Wordmark src={mark} box={box} pointer={value} progress={progress} />
      )}
    </>
  )
}

export function LandPlate(props: SceneProps) {
  const [failed, setFailed] = useState(false)
  if (failed) return null

  return (
    <Canvas
      className="!absolute inset-0"
      dpr={[1, 1.75]}
      gl={{ antialias: true, alpha: false, powerPreference: "high-performance" }}
      camera={{ fov: 45, position: [0, 0, 5] }}
      onCreated={({ gl }) => gl.setClearColor("#F4EDDE")}
      onError={() => setFailed(true)}
    >
      <Suspense fallback={null}>
        <Scene {...props} />
      </Suspense>
    </Canvas>
  )
}

export default LandPlate

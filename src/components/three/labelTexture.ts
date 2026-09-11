import * as THREE from "three"

/**
 * Paints the Òs Flumen label onto a canvas and returns it as a texture.
 * The canvas is wrapped around the bottle: the front of the label is the
 * middle of the canvas, the nutrition table lands on the back.
 *
 * A detailed print-ready label will replace this later; keep the drawing
 * self-contained so it can be swapped for an image texture in one place.
 */

const W = 1640
const H = 1370
const CX = W / 2

const CREAM = "#E8D8B0"
const INK = "#3B2E1F"
const BRAND = "#6B2A1A"

function loadImage(src: string) {
  return new Promise<HTMLImageElement>((resolve, reject) => {
    const img = new Image()
    img.onload = () => resolve(img)
    img.onerror = reject
    img.src = src
  })
}

function paper(ctx: CanvasRenderingContext2D) {
  ctx.fillStyle = CREAM
  ctx.fillRect(0, 0, W, H)

  // A faint warm vignette and speckle so the paper doesn't read as flat.
  const g = ctx.createRadialGradient(CX, H / 2, H * 0.2, CX, H / 2, H * 0.9)
  g.addColorStop(0, "rgba(255,250,235,.35)")
  g.addColorStop(1, "rgba(120,90,40,.16)")
  ctx.fillStyle = g
  ctx.fillRect(0, 0, W, H)

  ctx.fillStyle = "rgba(90,60,20,.06)"
  for (let i = 0; i < 2600; i++) {
    const x = Math.random() * W
    const y = Math.random() * H
    const r = Math.random() * 1.6
    ctx.beginPath()
    ctx.arc(x, y, r, 0, Math.PI * 2)
    ctx.fill()
  }
}

function text(
  ctx: CanvasRenderingContext2D,
  str: string,
  x: number,
  y: number,
  font: string,
  color = INK,
  align: CanvasTextAlign = "center",
  tracking = 0
) {
  ctx.font = font
  ctx.fillStyle = color
  ctx.textAlign = align
  ctx.textBaseline = "alphabetic"
  if (!tracking) {
    ctx.fillText(str, x, y)
    return
  }
  // Manual letter-spacing for the few tracked lines.
  const chars = [...str]
  const widths = chars.map((c) => ctx.measureText(c).width)
  const total = widths.reduce((a, b) => a + b, 0) + tracking * (chars.length - 1)
  let cx = align === "center" ? x - total / 2 : align === "right" ? x - total : x
  ctx.textAlign = "left"
  chars.forEach((c, i) => {
    ctx.fillText(c, cx, y)
    cx += widths[i] + tracking
  })
}

function nutrition(ctx: CanvasRenderingContext2D, x: number, y: number, serif: string) {
  const rows: [string, string][] = [
    ["Energia", "3389 kJ · 824 kcal"],
    ["Grassi", "91,6 g"],
    ["di cui acidi grassi saturi", "15,4 g"],
    ["Carboidrati", "0 g"],
    ["di cui zuccheri", "0 g"],
    ["Proteine", "0 g"],
    ["Sale", "0 g"],
  ]
  text(ctx, "Valori nutrizionali medi", x, y, `600 22px ${serif}`, INK, "left")
  text(ctx, "per 100 g di prodotto", x, y + 26, `400 18px ${serif}`, INK, "left")
  ctx.strokeStyle = "rgba(59,46,31,.5)"
  ctx.lineWidth = 1.2
  rows.forEach(([k, v], i) => {
    const ry = y + 62 + i * 30
    text(ctx, k, x, ry, `400 19px ${serif}`, INK, "left")
    text(ctx, v, x + 300, ry, `400 19px ${serif}`, INK, "right")
    ctx.beginPath()
    ctx.moveTo(x, ry + 8)
    ctx.lineTo(x + 300, ry + 8)
    ctx.stroke()
  })

  // Organic certification mark.
  const by = y + 62 + rows.length * 30 + 34
  ctx.fillStyle = "#5C8A2E"
  ctx.beginPath()
  ctx.roundRect(x, by - 24, 50, 34, 4)
  ctx.fill()
  ctx.fillStyle = "#EAF2C8"
  for (let i = 0; i < 10; i++) {
    const a = (i / 10) * Math.PI * 2
    ctx.beginPath()
    ctx.arc(x + 25 + Math.cos(a) * 12, by - 7 + Math.sin(a) * 9, 1.6, 0, Math.PI * 2)
    ctx.fill()
  }
  text(ctx, "IT BIO 006", x + 62, by - 12, `500 18px ${serif}`, INK, "left")
  text(ctx, "Agricoltura Italia", x + 62, by + 8, `400 17px ${serif}`, INK, "left")
}

export async function createLabelTexture(serifFamily: string): Promise<THREE.CanvasTexture> {
  const serif = serifFamily || "Georgia, serif"
  const canvas = document.createElement("canvas")
  canvas.width = W
  canvas.height = H
  const ctx = canvas.getContext("2d")!

  const [engraving, wordmark] = await Promise.all([
    loadImage("/images/OsFlumen_etichetta.png").catch(() => null),
    loadImage("/images/brandOSFLUMENmarroneRGB.png").catch(() => null),
  ])

  paper(ctx)

  // ---- Front ---------------------------------------------------------------
  text(ctx, "Azienda agricola", CX, 128, `400 40px ${serif}`, INK, "center", 2)
  text(ctx, "Paola Pettinicchio", CX, 180, `600 46px ${serif}`, INK, "center", 1)

  if (wordmark) {
    const w = 640
    const h = (w * wordmark.naturalHeight) / wordmark.naturalWidth
    ctx.drawImage(wordmark, CX - w / 2, 212, w, h)
  } else {
    text(ctx, "Òs Flumen", CX, 350, `600 150px ${serif}`, BRAND)
  }

  text(ctx, "Olio extra vergine di oliva", CX, 470, `500 46px ${serif}`, INK, "center", 1)
  text(ctx, "Biologico", CX, 524, `500 46px ${serif}`, INK, "center", 6)
  text(ctx, "100% italiano  •  estratto a freddo", CX, 584, `400 34px ${serif}`, INK, "center", 1)

  const claim = [
    "Olio di oliva di categoria superiore,",
    "ottenuto direttamente dalle olive",
    "e unicamente mediante procedimenti meccanici",
  ]
  claim.forEach((l, i) => text(ctx, l, CX, 646 + i * 36, `italic 400 29px ${serif}`))

  // Engraving of the Maison de Poste di Bocca di Fiume.
  const box = { x: CX - 245, y: 780, w: 490, h: 350 }
  if (engraving) {
    ctx.save()
    ctx.globalCompositeOperation = "multiply"
    const sx = 40, sy = 300, sw = 640, sh = 470
    ctx.drawImage(engraving, sx, sy, sw, sh, box.x, box.y, box.w, box.h)
    ctx.restore()
  }
  ctx.strokeStyle = "rgba(59,46,31,.7)"
  ctx.lineWidth = 2
  ctx.strokeRect(box.x - 6, box.y - 6, box.w + 12, box.h + 12)

  const legal = [
    "Azienda Agricola Paola Pettinicchio",
    "Sezze Romano (LT)  •  loc. Bocca di Fiume  •  via migliara 45",
    "confezionato dal Frantoio La Valle dell'Usignolo,",
    "via Le Pastine km 9,500 – Sermoneta (LT)",
  ]
  legal.forEach((l, i) => text(ctx, l, CX, 1186 + i * 26, `400 20px ${serif}`))

  text(ctx, "0,500 L", CX + 300, 1330, `500 54px ${serif}`, INK, "right")
  text(ctx, "℮", CX + 340, 1330, `400 40px ${serif}`, INK, "right")

  // ---- Back ----------------------------------------------------------------
  nutrition(ctx, 110, 560, serif)
  text(ctx, "Lotto", 110, 1010, `400 18px ${serif}`, INK, "left")
  ctx.strokeStyle = "rgba(59,46,31,.6)"
  ctx.strokeRect(160, 990, 120, 28)
  text(ctx, "G 4024", 220, 1011, `400 20px ${serif}`, INK)

  text(ctx, "Conservare in luogo fresco e asciutto,", W - 110, 620, `400 20px ${serif}`, INK, "right")
  text(ctx, "al riparo da fonti di luce e di calore.", W - 110, 648, `400 20px ${serif}`, INK, "right")
  text(ctx, "Da consumarsi preferibilmente entro", W - 110, 700, `400 20px ${serif}`, INK, "right")
  text(ctx, "18 mesi dalla data di confezionamento.", W - 110, 728, `400 20px ${serif}`, INK, "right")

  const texture = new THREE.CanvasTexture(canvas)
  texture.colorSpace = THREE.SRGBColorSpace
  texture.anisotropy = 8
  texture.needsUpdate = true
  return texture
}

/** Resolve the font-family assigned by next/font to a CSS variable. */
export function resolveFontFamily(cssVar: string) {
  if (typeof window === "undefined") return ""
  return getComputedStyle(document.documentElement).getPropertyValue(cssVar).trim()
}

import { Chapter } from "../Chapter"
import { ChapterMedia } from "../ChapterMedia"

const FACTS = [
  { value: "24 ore", text: "Dalla raccolta alla frangitura, senza attese in cassetta." },
  { value: "Sotto i 27 °C", text: "Estrazione a freddo, a ciclo continuo e a temperatura controllata." },
  { value: "Solo olive", text: "Nessun additivo, nessun taglio: quello che vedi è quello che c'è." },
]

export function Molitura() {
  return (
    <Chapter
      id="molitura"
      side="spread"
      label="La molitura"
      className="overflow-hidden"
      // Drop a looping clip of the press at /public/video/frantoio.mp4 and it plays here.
      backdrop={<ChapterMedia video="/video/frantoio.mp4" wash={0.7} position="center 60%" />}
    >

      <div className="max-w-[30rem]">
        <p data-reveal className="ui mb-6">La molitura</p>
        <h2 data-reveal className="display">
          Dalla pianta al frantoio nella stessa giornata.
        </h2>
      </div>

      <ul className="grid gap-8 md:grid-cols-3 md:gap-12">
        {FACTS.map((f) => (
          <li key={f.value} data-reveal>
            <div className="hairline mb-5" />
            <p className="stat">{f.value}</p>
            <p className="mt-3 max-w-[18rem] text-[1rem] leading-relaxed" style={{ color: "var(--muted)" }}>
              {f.text}
            </p>
          </li>
        ))}
      </ul>
    </Chapter>
  )
}

import { Chapter } from "../Chapter"
import { ChapterMedia } from "../ChapterMedia"

export function Olive() {
  return (
    <Chapter
      id="olive"
      side="right"
      label="Le olive"
      className="overflow-hidden"
      backdrop={<ChapterMedia image="/images/olive.png" video="/video/uliveto.mp4" wash={0.72} position="center 35%" />}
    >

      <p data-reveal className="ui mb-6">Le olive</p>
      <h2 data-reveal className="display">
        Leccino per nove decimi. Frantoio per il resto.
      </h2>
      <p data-reveal className="lede mt-7">
        Due cultivar che crescono su questa terra da generazioni, senza trattamenti di sintesi.
        La raccolta si fa a mano, nel momento in cui il frutto vira dal verde al violetto e
        profuma di più.
      </p>
      <div data-reveal className="mt-10 flex gap-10">
        <div>
          <p className="stat">90%</p>
          <p className="ui mt-2">Leccino</p>
        </div>
        <div>
          <p className="stat">10%</p>
          <p className="ui mt-2">Frantoio</p>
        </div>
        <div>
          <p className="stat">Bio</p>
          <p className="ui mt-2">Uliveti certificati</p>
        </div>
      </div>
    </Chapter>
  )
}

import { Chapter } from "../Chapter"

export function Etichetta() {
  return (
    <Chapter
      id="etichetta"
      side="left"
      label="L'etichetta"
      className="overflow-hidden"
      backdrop={
        // The engraving from the label, enlarged and faint, like a watermark on the page.
        <div
          aria-hidden
          className="pointer-events-none absolute -left-[12%] top-1/2 z-0 hidden aspect-[720/900] w-[54vw] -translate-y-1/2 lg:block"
          style={{
            backgroundImage: "url(/images/OsFlumen_etichetta.png)",
            backgroundSize: "cover",
            mixBlendMode: "multiply",
            opacity: 0.11,
            maskImage: "radial-gradient(60% 60% at 50% 50%, #000 40%, transparent 100%)",
            WebkitMaskImage: "radial-gradient(60% 60% at 50% 50%, #000 40%, transparent 100%)",
          }}
        />
      }
    >

      <p data-reveal className="ui mb-6">L&apos;etichetta</p>
      <h2 data-reveal className="display">
        Una casa di posta sul fiume, incisa due secoli fa.
      </h2>
      <p data-reveal className="lede mt-7">
        Sull&apos;etichetta c&apos;è la Maison de Poste di Bocca di Fiume, la stazione dove i viaggiatori
        cambiavano i cavalli attraversando la pianura pontina. È il luogo da cui l&apos;olio prende il
        nome: Òs Flumen, la bocca del fiume.
      </p>
      <dl data-reveal className="mt-10 grid gap-x-8 gap-y-5 sm:grid-cols-2">
        <div>
          <dt className="ui">Chi lo produce</dt>
          <dd className="mt-1">Azienda agricola Massimo Orsini</dd>
        </div>
        <div>
          <dt className="ui">Certificazione</dt>
          <dd className="mt-1">Agricoltura biologica, controllo IT BIO 006</dd>
        </div>
        <div>
          <dt className="ui">Come nasce</dt>
          <dd className="mt-1">Estratto a freddo, solo procedimenti meccanici</dd>
        </div>
        <div>
          <dt className="ui">Formato</dt>
          <dd className="mt-1">Bottiglia da 0,500 L in vetro scuro</dd>
        </div>
      </dl>
    </Chapter>
  )
}

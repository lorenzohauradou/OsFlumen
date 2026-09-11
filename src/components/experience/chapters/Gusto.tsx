import { Chapter } from "../Chapter"

export function Gusto() {
  return (
    <Chapter id="gusto" side="left" label="Il gusto">
      <p data-reveal className="ui mb-6">Il gusto</p>
      <h2 data-reveal className="display">
        Lattuga e carciofo al naso, mandorla dolce in chiusura.
      </h2>
      <p data-reveal className="lede mt-7">
        Amaro e piccante di media intensità, in equilibrio fra loro: si sentono al palato senza
        coprire il piatto. Sul finale, una nota di erbe officinali.
      </p>
      <div data-reveal className="mt-10">
        <p className="ui">Dove dà il meglio</p>
        <p className="mt-2 text-[1.1rem] leading-relaxed">
          A crudo su carpacci e pesce, sulle vellutate di verdura e sulle carni bianche. Sorprende
          sui dolci al cucchiaio e sul gelato alla crema.
        </p>
      </div>
    </Chapter>
  )
}

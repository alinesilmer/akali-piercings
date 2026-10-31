import { Reveal, RuledItem } from "../../components/motion";
import { Section } from "../../components/ui/Section";
import { PROMISES } from "../../data/about";
import { pad } from "../../lib/format";

export function Promises() {
  return (
    <Section tone="panel" defer>
      <ul className="rows">
        {PROMISES.map((promise, i) => (
          <RuledItem key={promise.word} className="row">
            <span className="label">{pad(i + 1)}</span>
            <h2 className="row__title">
              <Reveal>{promise.word}</Reveal>
            </h2>
            <p className="label row__line">{promise.line}</p>
            <img src={promise.image} alt="" loading="lazy" decoding="async" />
          </RuledItem>
        ))}
      </ul>
    </Section>
  );
}

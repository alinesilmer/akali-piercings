import { RuledItem, Reveal } from "../../components/motion";
import { Section, SectionHead } from "../../components/ui/Section";
import { PROMO_STEPS } from "../../data/home";
import { pad } from "../../lib/format";

export function Steps() {
  return (
    <Section defer>
      <SectionHead
        kanji="手順"
        title={
          <>
            Así de <em>simple</em>
          </>
        }
      />
      <ol className="steps">
        {PROMO_STEPS.map((step, i) => (
          <RuledItem key={step.title} className="step">
            <span className="step__no">{pad(i + 1)}</span>
            <h3 className="title-sm">
              <Reveal delay={i * 0.08}>{step.title}</Reveal>
            </h3>
            <p>{step.note}</p>
            <step.icon size={26} strokeWidth={1.1} />
          </RuledItem>
        ))}
      </ol>
    </Section>
  );
}

import { Parallax, RuledItem } from "../../components/motion";
import { Frame } from "../../components/ui/Frame";
import { Section, SectionHead } from "../../components/ui/Section";
import { Text } from "../../components/ui/Text";
import { CARE } from "../../data/about";

export function Care() {
  return (
    <Section defer>
      <SectionHead
        kanji="手入れ"
        title={
          <>
            Tu <em>cuidado</em>
          </>
        }
        aside={<Text variant="label">Antes y después</Text>}
      />

      <div className="care-grid">
        {CARE.map((block) => (
          <article key={block.id} className="care-card">
            <Frame shape="soft" className="frame--wide">
              <Parallax src={block.image} alt={block.alt} amount={5} className="fill" />
            </Frame>
            <h3 className="title-md">
              {block.title}
              <span className="care-card__kanji" lang="ja" aria-hidden>
                {block.kanji}
              </span>
            </h3>
            <ul>
              {block.tips.map((tip) => (
                <RuledItem key={tip.title} className="tip">
                  <tip.icon size={22} strokeWidth={1.2} />
                  <strong>{tip.title}</strong>
                  <span>{tip.note}</span>
                </RuledItem>
              ))}
            </ul>
          </article>
        ))}
      </div>
    </Section>
  );
}

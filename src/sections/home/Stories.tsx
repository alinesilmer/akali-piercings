import { Reveal } from "../../components/motion";
import { PolaroidStrip } from "../../components/ui/PolaroidStrip";
import { Section, SectionHead } from "../../components/ui/Section";
import { Text } from "../../components/ui/Text";
import { STORIES } from "../../data/home";

export function Stories({ onOpen }: { onOpen: (src: string) => void }) {
  return (
    <Section tone="panel" defer>
      <SectionHead
        kanji="声"
        title={
          <>
            Historias <em>reales</em>
          </>
        }
        aside={<Text variant="label">Vía Instagram</Text>}
      />
      <PolaroidStrip images={STORIES} onOpen={onOpen} />
      <blockquote className="pull-quote">
        <Reveal>«Súper atenta</Reveal>
        <Reveal delay={0.12}>
          <em>y rápida»</em>
        </Reveal>
      </blockquote>
    </Section>
  );
}

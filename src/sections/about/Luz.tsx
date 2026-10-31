import luz from "../../assets/images/Luz.webp";
import { Parallax } from "../../components/motion";
import { Frame } from "../../components/ui/Frame";
import { Heading } from "../../components/ui/Heading";
import { Section } from "../../components/ui/Section";
import { StatList } from "../../components/ui/StatList";
import { Eyebrow, Text } from "../../components/ui/Text";
import { LUZ } from "../../data/about";

export function Luz() {
  return (
    <Section flush="top" defer>
      <div className="split">
        <Frame shape="tall" className="frame--soft">
          <Parallax src={luz} alt="Luz perforando en el estudio" className="fill" />
        </Frame>
        <div className="about-luz">
          <Eyebrow ember>{LUZ.eyebrow}</Eyebrow>
          <Heading size="lg">
            Soy <em>Luz.</em>
          </Heading>
          <Text>{LUZ.text}</Text>
          <StatList stats={LUZ.stats} />
        </div>
      </div>
    </Section>
  );
}

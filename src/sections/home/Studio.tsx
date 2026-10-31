import { ArrowUpRight } from "lucide-react";

import { Parallax } from "../../components/motion";
import { Button } from "../../components/ui/Button";
import { Frame } from "../../components/ui/Frame";
import { Heading } from "../../components/ui/Heading";
import { Section } from "../../components/ui/Section";
import { StatList, type Stat } from "../../components/ui/StatList";
import { Eyebrow, Text } from "../../components/ui/Text";
import { PROMO, STUDIO } from "../../data/home";

// Facts that are always true for the studio (hours and the cash offer come from the site data).
const STATS: Stat[] = [
  { value: 6, label: "Días a la semana" },
  { value: 12, suffix: " h", label: "De atención por día" },
  { value: Number.parseInt(PROMO.value, 10), suffix: "%", label: "Off pagando en efectivo" },
];

export function Studio() {
  return (
    <Section defer>
      <div className="split">
        <div className="collage">
          <Frame shape="soft" className="collage__main">
            <Parallax src={STUDIO.images.main} alt="Colocación de un piercing en el estudio" amount={4} className="fill" />
          </Frame>
          <Frame shape="soft" className="collage__detail">
            <Parallax src={STUDIO.images.detail} amount={6} className="fill" />
          </Frame>
        </div>

        <div className="studio-copy">
          <Eyebrow ember>{STUDIO.eyebrow}</Eyebrow>
          <Heading size="md" lines={["Manos expertas,", <em key="a">ambiente cálido.</em>]} />
          <Text>{STUDIO.text}</Text>
          <StatList stats={STATS} />
          <Button variant="solid" to="/nosotros">
            Conocer el estudio <ArrowUpRight size={16} strokeWidth={1.5} />
          </Button>
        </div>
      </div>
    </Section>
  );
}

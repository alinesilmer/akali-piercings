import { Button } from "../../components/ui/Button";
import { Section, SectionHead } from "../../components/ui/Section";
import { ZoneLink } from "../../components/ui/ZoneLink";
import { ZONES } from "../../data/home";

export function Zones() {
  return (
    <Section defer>
      <SectionHead
        kanji="部位"
        title={
          <>
            Comprá por <em>zona</em>
          </>
        }
        aside={
          <Button variant="line" to="/servicios">
            Ver todo
          </Button>
        }
      />
      <div className="zone-row">
        {ZONES.map((zone, i) => (
          <ZoneLink key={zone.id} name={zone.name} image={zone.image} to="/servicios" index={i} />
        ))}
      </div>
    </Section>
  );
}

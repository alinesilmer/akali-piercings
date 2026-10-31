import { Section, SectionHead } from "../../components/ui/Section";
import { Text } from "../../components/ui/Text";
import { MAP_URL } from "../../data/contact";

export function ContactMap() {
  return (
    <Section tone="panel" defer>
      <SectionHead
        kanji="場所"
        title={
          <>
            Zona <em>centro</em>
          </>
        }
      />
      <figure>
        <div className="map">
          <iframe
            title="Ubicación Akali Piercing"
            src={MAP_URL}
            loading="lazy"
            sandbox="allow-scripts allow-same-origin"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
        <figcaption className="map__caption">
          <Text variant="label" as="span">
            Fig. 01
          </Text>
          <Text variant="label" as="span">
            Corrientes Capital · ubicación exacta al reservar
          </Text>
        </figcaption>
      </figure>
    </Section>
  );
}

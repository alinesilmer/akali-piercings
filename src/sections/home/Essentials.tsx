import { IconNotes } from "../../components/ui/IconNotes";
import { Section } from "../../components/ui/Section";
import { ESSENTIALS } from "../../data/home";

export function Essentials() {
  return (
    <Section flush="top" defer>
      <IconNotes items={ESSENTIALS} />
    </Section>
  );
}

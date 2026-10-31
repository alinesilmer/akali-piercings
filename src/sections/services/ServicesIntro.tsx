import { ArrowDown } from "lucide-react";

import { PageIntro } from "../../components/layout/PageIntro";
import { MotionButton } from "../../components/ui/Button";
import { CATALOG_DOORS, SERVICES_INTRO } from "../../data/services";
import { pad } from "../../lib/format";
import { fadeUp } from "../../lib/motion";
import { scrollToId } from "../../lib/scroll";
import type { Catalog } from "../../types/catalog";

export function ServicesIntro({ catalog, loading }: { catalog: Catalog; loading: boolean }) {
  return (
    <PageIntro {...SERVICES_INTRO}>
      <div className="doors">
        {CATALOG_DOORS.map((door, i) => (
          <MotionButton key={door.id} className="door" onClick={() => scrollToId(door.id)} {...fadeUp(0.6 + i * 0.12)}>
            <img src={door.image} alt="" loading="lazy" decoding="async" />
            <span className="door__caption">
              <span>{door.title}</span>
              <span className="label">{loading ? "…" : `(${pad(catalog[door.list].length)})`}</span>
              <ArrowDown size={22} strokeWidth={1.25} />
            </span>
          </MotionButton>
        ))}
      </div>
    </PageIntro>
  );
}

import { RingMark } from "../../components/deco";
import { Marquee } from "../../components/motion";
import { VALUES } from "../../data/home";

const [respect, experience, presence] = VALUES;

/** Brand ticker: values in Spanish with their kanji in between. */
export function Band() {
  return (
    <Marquee className="band">
      <span className="band__item">
        Calidad
        <span className="band__kanji" lang="ja">
          {respect.kanji}
        </span>
        <em>Calidez</em>
        <span className="band__kanji" lang="ja">
          {experience.kanji}
        </span>
        Piercing
        <span className="band__kanji" lang="ja">
          {presence.kanji}
        </span>
        <em>Joyería</em>
        <RingMark size={28} />
      </span>
    </Marquee>
  );
}

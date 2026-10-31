import type { IconNote } from "../../types/content";
import { RuledItem } from "../motion";

/** Icon + title + one-line note, laid out as a responsive ruled grid. */
export function IconNotes({ items }: { items: IconNote[] }) {
  return (
    <ul className="icon-notes">
      {items.map((item) => (
        <RuledItem key={item.title} className="icon-note">
          <item.icon size={24} strokeWidth={1.1} />
          <h3 className="title-sm">{item.title}</h3>
          <span>{item.note}</span>
        </RuledItem>
      ))}
    </ul>
  );
}

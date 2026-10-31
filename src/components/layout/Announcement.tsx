import { ANNOUNCEMENTS } from "../../data/announcements";

/** Endless offer ticker. The second copy is only there to loop seamlessly. */
export function Announcement() {
  return (
    <div className="announce">
      <div className="announce__track">
        {[0, 1].map((copy) => (
          <span key={copy} className="announce__group" aria-hidden={copy === 1 || undefined}>
            {ANNOUNCEMENTS.map((text) => (
              <span key={text} className="announce__item">
                {text}
              </span>
            ))}
          </span>
        ))}
      </div>
    </div>
  );
}

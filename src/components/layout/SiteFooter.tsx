import type { ReactNode } from "react";
import { Link } from "react-router-dom";
import { ArrowUpRight, Clock, Instagram, MapPin, Phone } from "lucide-react";

import { DEVELOPER_URL, INSTAGRAM_HANDLE, INSTAGRAM_URL, NAV_LINKS, PHONE_LABEL } from "../../data/site";
import { BOOK_URL } from "../../lib/whatsapp";
import { ExternalLink } from "../ui/Button";

function Column({ title, children }: { title: string; children: ReactNode }) {
  return (
    <div>
      <h3 className="footer__head">{title}</h3>
      <ul>{children}</ul>
    </div>
  );
}

export function SiteFooter() {
  return (
    <footer className="footer">
      <div className="footer__grid">
        <div>
          <span className="footer__brand">Akali</span>
          <p className="footer__note">Calidad y calidez, en un único lugar.</p>
        </div>

        <Column title="Explorar">
          {NAV_LINKS.map((link) => (
            <li key={link.path}>
              <Link to={link.path}>{link.label}</Link>
            </li>
          ))}
        </Column>

        <Column title="Visitanos">
          <li>
            <MapPin size={15} strokeWidth={1.5} /> Zona Centro, Corrientes Capital
          </li>
          <li>
            <Clock size={15} strokeWidth={1.5} /> Lunes a sábado, 9 a 21 h
          </li>
        </Column>

        <Column title="Escribinos">
          <li>
            <ExternalLink href={BOOK_URL}>
              <Phone size={15} strokeWidth={1.5} /> {PHONE_LABEL}
            </ExternalLink>
          </li>
          <li>
            <ExternalLink href={INSTAGRAM_URL}>
              <Instagram size={15} strokeWidth={1.5} /> {INSTAGRAM_HANDLE}
            </ExternalLink>
          </li>
        </Column>
      </div>

      <div className="footer__base">
        <span>© {new Date().getFullYear()} Akali Piercing</span>
        <ExternalLink href={DEVELOPER_URL}>
          Desarrollado por Dev Horizon <ArrowUpRight size={13} strokeWidth={1.5} />
        </ExternalLink>
      </div>
    </footer>
  );
}

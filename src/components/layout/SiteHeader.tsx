import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { Menu, X } from "lucide-react";

import { NAV_LINKS } from "../../data/site";
import { useHeaderScroll } from "../../hooks/useHeaderScroll";
import { BOOK_URL } from "../../lib/whatsapp";
import { RingMark } from "../deco";
import { Button } from "../ui/Button";
import { MobileMenu } from "./MobileMenu";
import { SearchTrigger } from "./SearchTrigger";

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const { hidden, solid } = useHeaderScroll();
  const classes = ["header", (solid || open) && "header--solid", hidden && !open && "header--hidden"]
    .filter(Boolean)
    .join(" ");

  return (
    <>
      <header className={classes}>
        <Link to="/" className="brand" aria-label="Akali Piercing, inicio">
          <RingMark size={18} />
          Akali
        </Link>

        <nav className="header__links" aria-label="Principal">
          {NAV_LINKS.map((link) => (
            <NavLink key={link.path} to={link.path} end={link.path === "/"}>
              {link.label}
            </NavLink>
          ))}
        </nav>

        <div className="header__actions">
          <SearchTrigger />
          <Button variant="solid" size="sm" href={BOOK_URL}>
            Reservar
          </Button>
          <Button
            variant="icon"
            className="header__burger"
            aria-label={open ? "Cerrar menú" : "Abrir menú"}
            aria-expanded={open}
            onClick={() => setOpen((value) => !value)}
          >
            {open ? <X size={20} strokeWidth={1.5} /> : <Menu size={20} strokeWidth={1.5} />}
          </Button>
        </div>
      </header>

      <MobileMenu open={open} onClose={() => setOpen(false)} />
    </>
  );
}

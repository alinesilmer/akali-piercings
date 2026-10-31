import { useState } from "react";
import { Link, NavLink, Navigate, Outlet, useNavigate } from "react-router-dom";
import { Menu, X } from "lucide-react";

import { RingMark } from "../deco";
import s from "./admin.module.scss";
import { useAuth } from "./auth";
import { Spinner } from "./ui";

const LINKS = [
  { to: "/admin/dashboard", label: "Inicio" },
  { to: "/admin/categorias", label: "Categorías" },
  { to: "/admin/productos", label: "Productos" },
  { to: "/admin/servicios", label: "Servicios" },
];

function Brand() {
  return (
    <span className={s.brand}>
      <RingMark size={18} />
      Akali
    </span>
  );
}

export function AdminLayout() {
  const { isAdmin, loading, logout } = useAuth();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  if (loading) return <Spinner fullscreen />;
  if (!isAdmin) return <Navigate to="/admin/login" replace />;

  return (
    <div className={s.layout}>
      {open && <div className={s.backdrop} onClick={() => setOpen(false)} />}

      <aside className={`${s.sidebar} ${open ? s.open : ""}`}>
        <Brand />
        <nav className={s.nav}>
          {LINKS.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              className={({ isActive }) => `${s.navLink} ${isActive ? s.active : ""}`}
              onClick={() => setOpen(false)}
            >
              {link.label}
            </NavLink>
          ))}
        </nav>
        <div className={s.sidebarFoot}>
          <Link to="/" className={s.navLink}>
            Ver el sitio
          </Link>
          <button type="button" className={s.navLink} onClick={() => logout().then(() => navigate("/admin/login"))}>
            Cerrar sesión
          </button>
        </div>
      </aside>

      <div className={s.main}>
        <header className={s.topBar}>
          <Brand />
          <button
            type="button"
            className={s.menuButton}
            aria-label={open ? "Cerrar menú" : "Abrir menú"}
            aria-expanded={open}
            onClick={() => setOpen((value) => !value)}
          >
            {open ? <X size={20} strokeWidth={1.5} /> : <Menu size={20} strokeWidth={1.5} />}
          </button>
        </header>
        <main className={s.content}>
          <Outlet />
        </main>
      </div>
    </div>
  );
}

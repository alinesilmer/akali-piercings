import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import s from "../../components/admin/admin.module.scss";
import { PageHeader, Spinner } from "../../components/admin/ui";
import { categoryService } from "../../services/categoryService";
import { productService } from "../../services/productService";
import { serviceService } from "../../services/serviceService";

const SHORTCUTS = [
  { to: "/admin/categorias/nueva", title: "Nueva categoría", note: "Agregar una categoría de productos" },
  { to: "/admin/productos/nuevo", title: "Nuevo producto", note: "Agregar un producto al catálogo" },
  { to: "/admin/servicios/nuevo", title: "Nuevo servicio", note: "Agregar un servicio de piercing" },
  { to: "/admin/categorias", title: "Ver categorías", note: "Administrar las categorías existentes" },
  { to: "/admin/productos", title: "Ver productos", note: "Administrar los productos existentes" },
  { to: "/admin/servicios", title: "Ver servicios", note: "Administrar los servicios existentes" },
];

export function Dashboard() {
  const [stats, setStats] = useState<{ label: string; value: number }[] | null>(null);

  useEffect(() => {
    Promise.all([categoryService.adminList(), productService.adminList(), serviceService.adminList()])
      .then(([categories, products, services]) =>
        setStats([
          { label: "Categorías", value: categories.length },
          { label: "Productos", value: products.length },
          { label: "Publicados", value: products.filter((product) => product.status === "published").length },
          { label: "Borradores", value: products.filter((product) => product.status === "draft").length },
          { label: "Servicios", value: services.length },
        ]),
      )
      .catch((error) => {
        console.error(error);
        setStats([]);
      });
  }, []);

  if (!stats) return <Spinner />;

  return (
    <div className={s.page}>
      <PageHeader title="Inicio" />

      <div className={s.statsGrid}>
        {stats.map((stat) => (
          <div key={stat.label} className={s.stat}>
            <strong>{stat.value}</strong>
            <span>{stat.label}</span>
          </div>
        ))}
      </div>

      <h2 className={s.sectionTitle}>Acciones rápidas</h2>
      <div className={s.shortcuts}>
        {SHORTCUTS.map((shortcut) => (
          <Link key={shortcut.to} to={shortcut.to} className={s.shortcut}>
            <strong>{shortcut.title}</strong>
            <span>{shortcut.note}</span>
          </Link>
        ))}
      </div>
    </div>
  );
}

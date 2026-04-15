import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { categoryService } from '../../../services/categoryService';
import { productService } from '../../../services/productService';
import { serviceService } from '../../../services/serviceService';
import styles from './AdminDashboard.module.scss';

interface Stats {
  totalCategories: number;
  totalProducts: number;
  publishedProducts: number;
  draftProducts: number;
  totalServices: number;
}

export function AdminDashboard() {
  const [stats, setStats] = useState<Stats>({
    totalCategories: 0,
    totalProducts: 0,
    publishedProducts: 0,
    draftProducts: 0,
    totalServices: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const [categories, allProducts, publishedProducts, draftProducts, services] = await Promise.all([
          categoryService.adminList(),
          productService.adminList({}),
          productService.adminList({ status: 'published' }),
          productService.adminList({ status: 'draft' }),
          serviceService.adminList(),
        ]);

        setStats({
          totalCategories: categories.length,
          totalProducts: allProducts.items.length,
          publishedProducts: publishedProducts.items.length,
          draftProducts: draftProducts.items.length,
          totalServices: services.length,
        });
      } catch (error) {
        console.error('Error fetching dashboard stats:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  if (loading) {
    return (
      <div className={styles.loading}>
        <div className={styles.spinner} />
      </div>
    );
  }

  return (
    <div className={styles.dashboard}>
      <h1 className={styles.title}>Dashboard</h1>
      <p className={styles.subtitle}>Bienvenido al panel de administración de Akali Piercings</p>

      <div className={styles.statsGrid}>
        <div className={styles.statCard}>
          <span className={styles.statValue}>{stats.totalCategories}</span>
          <span className={styles.statLabel}>Categorías</span>
        </div>
        <div className={styles.statCard}>
          <span className={styles.statValue}>{stats.totalProducts}</span>
          <span className={styles.statLabel}>Productos Totales</span>
        </div>
        <div className={styles.statCard}>
          <span className={styles.statValue}>{stats.publishedProducts}</span>
          <span className={styles.statLabel}>Publicados</span>
        </div>
        <div className={styles.statCard}>
          <span className={styles.statValue}>{stats.draftProducts}</span>
          <span className={styles.statLabel}>Borradores</span>
        </div>
        <div className={styles.statCard}>
          <span className={styles.statValue}>{stats.totalServices}</span>
          <span className={styles.statLabel}>Servicios</span>
        </div>
      </div>

      <div className={styles.quickActions}>
        <h2 className={styles.sectionTitle}>Acciones Rápidas</h2>
        <div className={styles.actionsGrid}>
          <Link to="/admin/categorias/nueva" className={styles.actionCard}>
            <span className={styles.actionTitle}>Nueva Categoría</span>
            <span className={styles.actionDesc}>Agregar una nueva categoría de productos</span>
          </Link>
          <Link to="/admin/productos/nuevo" className={styles.actionCard}>
            <span className={styles.actionTitle}>Nuevo Producto</span>
            <span className={styles.actionDesc}>Agregar un nuevo producto al catálogo</span>
          </Link>
          <Link to="/admin/categorias" className={styles.actionCard}>
            <span className={styles.actionTitle}>Ver Categorías</span>
            <span className={styles.actionDesc}>Administrar las categorías existentes</span>
          </Link>
          <Link to="/admin/productos" className={styles.actionCard}>
            <span className={styles.actionTitle}>Ver Productos</span>
            <span className={styles.actionDesc}>Administrar los productos existentes</span>
          </Link>
          <Link to="/admin/servicios/nuevo" className={styles.actionCard}>
            <span className={styles.actionTitle}>Nuevo Servicio</span>
            <span className={styles.actionDesc}>Agregar un nuevo servicio de piercing</span>
          </Link>
          <Link to="/admin/servicios" className={styles.actionCard}>
            <span className={styles.actionTitle}>Ver Servicios</span>
            <span className={styles.actionDesc}>Administrar los servicios existentes</span>
          </Link>
        </div>
      </div>
    </div>
  );
}

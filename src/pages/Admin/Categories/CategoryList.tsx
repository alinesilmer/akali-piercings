import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { categoryService } from '../../../services/categoryService';
import type { Category } from '../../../types/models';
import styles from './CategoryList.module.scss';

export function CategoryList() {
  const navigate = useNavigate();
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [deleteId, setDeleteId] = useState<string | null>(null);

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const data = await categoryService.adminList();
      setCategories(data);
    } catch (error) {
      console.error('[v0] Error fetching categories:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleToggleActive = async (category: Category) => {
    try {
      await categoryService.update(category.id, { isActive: !category.isActive });
      setCategories((prev) =>
        prev.map((c) =>
          c.id === category.id ? { ...c, isActive: !c.isActive } : c
        )
      );
    } catch (error) {
      console.error('[v0] Error toggling category:', error);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await categoryService.delete(id);
      setCategories((prev) => prev.filter((c) => c.id !== id));
      setDeleteId(null);
    } catch (error) {
      console.error('[v0] Error deleting category:', error);
    }
  };

  if (loading) {
    return (
      <div className={styles.loading}>
        <div className={styles.spinner} />
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h1 className={styles.title}>Categorias</h1>
        <Link to="/admin/categorias/nueva" className={styles.addButton}>
          Nueva Categoria
        </Link>
      </header>

      {categories.length === 0 ? (
        <div className={styles.empty}>
          <p>No hay categorias creadas.</p>
          <Link to="/admin/categorias/nueva" className={styles.emptyLink}>
            Crear primera categoria
          </Link>
        </div>
      ) : (
        <div className={styles.tableWrapper}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>Nombre</th>
                <th>Slug</th>
                <th>Orden</th>
                <th>Estado</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {categories.map((category) => (
                <tr key={category.id}>
                  <td>{category.name}</td>
                  <td className={styles.slug}>{category.slug}</td>
                  <td>{category.order}</td>
                  <td>
                    <button
                      className={`${styles.statusToggle} ${
                        category.isActive ? styles.active : styles.inactive
                      }`}
                      onClick={() => handleToggleActive(category)}
                    >
                      {category.isActive ? 'Activa' : 'Inactiva'}
                    </button>
                  </td>
                  <td>
                    <div className={styles.actions}>
                      <button
                        className={styles.editButton}
                        onClick={() => navigate(`/admin/categorias/${category.id}/editar`)}
                      >
                        Editar
                      </button>
                      <button
                        className={styles.deleteButton}
                        onClick={() => setDeleteId(category.id)}
                      >
                        Eliminar
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Delete confirmation dialog */}
      {deleteId && (
        <div className={styles.dialogOverlay}>
          <div className={styles.dialog}>
            <h3 className={styles.dialogTitle}>Confirmar Eliminacion</h3>
            <p className={styles.dialogText}>
              Estas seguro de que deseas eliminar esta categoria? Esta accion no se puede deshacer.
            </p>
            <div className={styles.dialogActions}>
              <button
                className={styles.cancelButton}
                onClick={() => setDeleteId(null)}
              >
                Cancelar
              </button>
              <button
                className={styles.confirmDeleteButton}
                onClick={() => handleDelete(deleteId)}
              >
                Eliminar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

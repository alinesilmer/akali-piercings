import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import type { QueryDocumentSnapshot } from 'firebase/firestore';
import { productService } from '../../../services/productService';
import { categoryService } from '../../../services/categoryService';
import { formatPrice } from '../../../utils/slugify';
import type { Product, Category, ProductStatus } from '../../../types/models';
import styles from './ProductList.module.scss';

type StatusFilter = ProductStatus | 'all';

export function ProductList() {
  const navigate = useNavigate();
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [hasMore, setHasMore] = useState(false);
  const [cursor, setCursor] = useState<QueryDocumentSnapshot | null>(null);
  const [loadingMore, setLoadingMore] = useState(false);
  const [deleteId, setDeleteId] = useState<string | null>(null);

  const [statusFilter, setStatusFilter] = useState<StatusFilter>('all');
  const [categoryFilter, setCategoryFilter] = useState<string>('');

  useEffect(() => {
    categoryService.adminList().then(setCategories).catch(console.error);
  }, []);

  // Re-fetch from scratch whenever filters change
  useEffect(() => {
    setProducts([]);
    setCursor(null);
    loadProducts(false, null);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [statusFilter, categoryFilter]);

  const loadProducts = async (append: boolean, currentCursor: QueryDocumentSnapshot | null) => {
    append ? setLoadingMore(true) : setLoading(true);

    try {
      const result = await productService.adminList({
        // Only pass status when it's an actual status, not 'all'
        status: statusFilter !== 'all' ? statusFilter : undefined,
        categoryId: categoryFilter || undefined,
        startAfter: currentCursor ?? undefined,
      });

      setProducts((prev) => append ? [...prev, ...result.items] : result.items);
      setHasMore(result.hasMore);
      setCursor(result.cursor);
    } catch (error) {
      console.error('Error fetching products:', error);
    } finally {
      setLoading(false);
      setLoadingMore(false);
    }
  };

  const handlePublishToggle = async (product: Product) => {
    try {
      if (product.status === 'published') {
        await productService.unpublish(product.id);
        setProducts((prev) =>
          prev.map((p) => p.id === product.id ? { ...p, status: 'draft' as ProductStatus } : p)
        );
      } else {
        await productService.publish(product.id);
        setProducts((prev) =>
          prev.map((p) => p.id === product.id ? { ...p, status: 'published' as ProductStatus } : p)
        );
      }
    } catch (error) {
      console.error('Error toggling product status:', error);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await productService.delete(id);
      setProducts((prev) => prev.filter((p) => p.id !== id));
      setDeleteId(null);
    } catch (error) {
      console.error('Error deleting product:', error);
    }
  };

  const statusLabel: Record<ProductStatus, string> = {
    published: 'Publicado',
    draft: 'Borrador',
    archived: 'Archivado',
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
        <h1 className={styles.title}>Productos</h1>
        <Link to="/admin/productos/nuevo" className={styles.addButton}>
          Nuevo Producto
        </Link>
      </header>

      {/* Filters */}
      <div className={styles.filters}>
        <div className={styles.filterGroup}>
          <label htmlFor="statusFilter" className={styles.filterLabel}>Estado</label>
          <select
            id="statusFilter"
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value as StatusFilter)}
            className={styles.filterSelect}
          >
            <option value="all">Todos</option>
            <option value="published">Publicado</option>
            <option value="draft">Borrador</option>
            <option value="archived">Archivado</option>
          </select>
        </div>
        <div className={styles.filterGroup}>
          <label htmlFor="categoryFilter" className={styles.filterLabel}>Categoría</label>
          <select
            id="categoryFilter"
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className={styles.filterSelect}
          >
            <option value="">Todas</option>
            {categories.map((cat) => (
              <option key={cat.id} value={cat.id}>{cat.name}</option>
            ))}
          </select>
        </div>
      </div>

      {products.length === 0 ? (
        <div className={styles.empty}>
          <p>No hay productos creados.</p>
          <Link to="/admin/productos/nuevo" className={styles.emptyLink}>
            Crear primer producto
          </Link>
        </div>
      ) : (
        <>
          <div className={styles.tableWrapper}>
            <table className={styles.table}>
              <thead>
                <tr>
                  <th>Imagen</th>
                  <th>Título</th>
                  <th>Categoría</th>
                  <th>Precio</th>
                  <th>Estado</th>
                  <th>Etiquetas</th>
                  <th>Acciones</th>
                </tr>
              </thead>
              <tbody>
                {products.map((product) => (
                  <tr key={product.id}>
                    <td>
                      {product.images[0]?.url ? (
                        <img
                          src={product.images[0].url}
                          alt={product.images[0].alt}
                          className={styles.thumbnail}
                        />
                      ) : (
                        <div className={styles.noImage}>Sin imagen</div>
                      )}
                    </td>
                    <td>{product.title}</td>
                    <td>{product.categoryName}</td>
                    <td className={styles.price}>
                      {formatPrice(product.price)}
                      {product.originalPrice && (
                        <span className={styles.originalPrice}>
                          {formatPrice(product.originalPrice)}
                        </span>
                      )}
                    </td>
                    <td>
                      <span className={`${styles.statusBadge} ${styles[product.status]}`}>
                        {statusLabel[product.status]}
                      </span>
                    </td>
                    <td>
                      <div className={styles.badges}>
                        {product.isFeatured && <span className={styles.badge}>FEA</span>}
                        {product.isNew && <span className={styles.badge}>NEW</span>}
                        {product.isOnSale && <span className={styles.badge}>OFF</span>}
                      </div>
                    </td>
                    <td>
                      <div className={styles.actions}>
                        <button
                          className={styles.editButton}
                          onClick={() => navigate(`/admin/productos/${product.id}/editar`)}
                        >
                          Editar
                        </button>
                        <button
                          className={styles.publishButton}
                          onClick={() => handlePublishToggle(product)}
                        >
                          {product.status === 'published' ? 'Despublicar' : 'Publicar'}
                        </button>
                        <button
                          className={styles.deleteButton}
                          onClick={() => setDeleteId(product.id)}
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

          {hasMore && (
            <div className={styles.loadMoreWrapper}>
              <button
                className={styles.loadMoreButton}
                onClick={() => loadProducts(true, cursor)}
                disabled={loadingMore}
              >
                {loadingMore ? 'Cargando...' : 'Cargar más'}
              </button>
            </div>
          )}
        </>
      )}

      {deleteId && (
        <div className={styles.dialogOverlay}>
          <div className={styles.dialog}>
            <h3 className={styles.dialogTitle}>Confirmar Eliminación</h3>
            <p className={styles.dialogText}>
              ¿Estás seguro de que deseas eliminar este producto? Esta acción no se puede deshacer.
            </p>
            <div className={styles.dialogActions}>
              <button className={styles.cancelButton} onClick={() => setDeleteId(null)}>
                Cancelar
              </button>
              <button className={styles.confirmDeleteButton} onClick={() => handleDelete(deleteId)}>
                Eliminar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { serviceService } from '../../../services/serviceService';
import { formatPrice } from '../../../utils/slugify';
import type { Service } from '../../../types/models';
import styles from './ServiceList.module.scss';

const BODY_PART_LABELS: Record<string, string> = {
  nose: 'Nariz',
  mouth: 'Boca',
  body: 'Cuerpo',
  eyebrow: 'Ceja',
  ear: 'Oreja',
};

export function ServiceList() {
  const navigate = useNavigate();
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);
  const [deleteId, setDeleteId] = useState<string | null>(null);

  useEffect(() => {
    serviceService.adminList()
      .then(setServices)
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  const handleToggleActive = async (service: Service) => {
    try {
      await serviceService.update(service.id, { isActive: !service.isActive });
      setServices((prev) =>
        prev.map((s) => s.id === service.id ? { ...s, isActive: !s.isActive } : s)
      );
    } catch (error) {
      console.error('Error toggling service:', error);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await serviceService.delete(id);
      setServices((prev) => prev.filter((s) => s.id !== id));
      setDeleteId(null);
    } catch (error) {
      console.error('Error deleting service:', error);
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
        <h1 className={styles.title}>Servicios de Piercing</h1>
        <Link to="/admin/servicios/nuevo" className={styles.addButton}>
          Nuevo Servicio
        </Link>
      </header>

      {services.length === 0 ? (
        <div className={styles.empty}>
          <p>No hay servicios creados.</p>
          <Link to="/admin/servicios/nuevo" className={styles.emptyLink}>
            Crear primer servicio
          </Link>
        </div>
      ) : (
        <div className={styles.tableWrapper}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>Imagen</th>
                <th>Título</th>
                <th>Zona</th>
                <th>Precio</th>
                <th>Orden</th>
                <th>Estado</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {services.map((service) => (
                <tr key={service.id}>
                  <td>
                    {service.images[0]?.url ? (
                      <img
                        src={service.images[0].url}
                        alt={service.images[0].alt}
                        className={styles.thumbnail}
                      />
                    ) : (
                      <div className={styles.noImage}>Sin imagen</div>
                    )}
                  </td>
                  <td>{service.title}</td>
                  <td>{BODY_PART_LABELS[service.bodyPart] ?? service.bodyPart}</td>
                  <td className={styles.price}>{formatPrice(service.price)}</td>
                  <td>{service.order}</td>
                  <td>
                    <button
                      className={`${styles.statusToggle} ${service.isActive ? styles.active : styles.inactive}`}
                      onClick={() => handleToggleActive(service)}
                    >
                      {service.isActive ? 'Activo' : 'Inactivo'}
                    </button>
                  </td>
                  <td>
                    <div className={styles.actions}>
                      <button
                        className={styles.editButton}
                        onClick={() => navigate(`/admin/servicios/${service.id}/editar`)}
                      >
                        Editar
                      </button>
                      <button
                        className={styles.deleteButton}
                        onClick={() => setDeleteId(service.id)}
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

      {deleteId && (
        <div className={styles.dialogOverlay}>
          <div className={styles.dialog}>
            <h3 className={styles.dialogTitle}>Confirmar Eliminación</h3>
            <p className={styles.dialogText}>
              ¿Estás seguro de que deseas eliminar este servicio? Esta acción no se puede deshacer.
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

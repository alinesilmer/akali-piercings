import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useAuth } from '../../../context/AuthContext';
import { serviceService } from '../../../services/serviceService';
import { createServiceSchema } from '../../../schemas/service';
import { slugify } from '../../../lib/utils';
import type { BodyPart } from '../../../types/models';
import type { ServiceImageInputDto } from '../../../types/dtos';
import styles from './ServiceForm.module.scss';

const BODY_PART_OPTIONS: { value: BodyPart; label: string }[] = [
  { value: 'nose', label: 'Nariz' },
  { value: 'mouth', label: 'Boca' },
  { value: 'body', label: 'Cuerpo' },
  { value: 'eyebrow', label: 'Ceja' },
  { value: 'ear', label: 'Oreja' },
];

interface ServiceFormState {
  title: string;
  slug: string;
  description: string;
  price: number | '';
  originalPrice: number | null | '';
  bodyPart: BodyPart | '';
  features: string[];
  isNew: boolean;
  isOnSale: boolean;
  isActive: boolean;
  order: number;
}

interface ImageRow {
  rowId: string;
  url: string;
  alt: string;
  type: 'main' | 'detail' | 'result';
}

const newImageRow = (): ImageRow => ({
  rowId: crypto.randomUUID(),
  url: '',
  alt: '',
  type: 'main',
});

const INITIAL_FORM: ServiceFormState = {
  title: '',
  slug: '',
  description: '',
  price: '',
  originalPrice: '',
  bodyPart: '',
  features: [],
  isNew: false,
  isOnSale: false,
  isActive: true,
  order: 0,
};

export function ServiceForm() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { user } = useAuth();
  const isEditMode = Boolean(id);

  const [formData, setFormData] = useState<ServiceFormState>(INITIAL_FORM);
  const [images, setImages] = useState<ImageRow[]>([newImageRow()]);
  const [newFeature, setNewFeature] = useState('');
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [loading, setLoading] = useState(isEditMode);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [slugManuallyEdited, setSlugManuallyEdited] = useState(false);

  useEffect(() => {
    if (isEditMode && id) {
      serviceService.getById(id).then((service) => {
        if (!service) { navigate('/admin/servicios'); return; }
        setFormData({
          title: service.title,
          slug: service.slug,
          description: service.description,
          price: service.price,
          originalPrice: service.originalPrice ?? '',
          bodyPart: service.bodyPart,
          features: service.features,
          isNew: service.isNew,
          isOnSale: service.isOnSale,
          isActive: service.isActive,
          order: service.order,
        });
        setImages(
          service.images.length > 0
            ? service.images.map((img) => ({ rowId: crypto.randomUUID(), url: img.url, alt: img.alt, type: img.type }))
            : [newImageRow()]
        );
        setSlugManuallyEdited(true);
      }).catch(() => navigate('/admin/servicios'))
        .finally(() => setLoading(false));
    } else if (!isEditMode) {
      setLoading(false);
    }
  }, [id, isEditMode, navigate]);

  // ── Field handlers ─────────────────────────────────────────────────────────

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target;
    const checked = (e.target as HTMLInputElement).checked;

    setFormData((prev) => {
      const updated = { ...prev };

      if (type === 'checkbox') {
        (updated as Record<string, unknown>)[name] = checked;
      } else if (type === 'number') {
        (updated as Record<string, unknown>)[name] = value === '' ? '' : Number(value);
      } else {
        (updated as Record<string, unknown>)[name] = value;
      }

      if (name === 'title' && !slugManuallyEdited) {
        updated.slug = slugify(value);
      }
      return updated;
    });

    setErrors((prev) => ({ ...prev, [name]: '' }));
  };

  const handleSlugChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSlugManuallyEdited(true);
    handleChange(e);
  };

  // ── Image handlers ─────────────────────────────────────────────────────────

  const handleImageChange = (rowId: string, field: keyof Omit<ImageRow, 'rowId'>, value: string) => {
    setImages((prev) =>
      prev.map((img) => img.rowId === rowId ? { ...img, [field]: value } : img)
    );
  };

  const addImageRow = () => setImages((prev) => [...prev, newImageRow()]);

  const removeImageRow = (rowId: string) => {
    if (images.length === 1) return;
    setImages((prev) => prev.filter((img) => img.rowId !== rowId));
  };

  // ── Feature handlers ───────────────────────────────────────────────────────

  const handleAddFeature = () => {
    const trimmed = newFeature.trim();
    if (trimmed && !formData.features.includes(trimmed)) {
      setFormData((prev) => ({ ...prev, features: [...prev.features, trimmed] }));
      setNewFeature('');
    }
  };

  const handleRemoveFeature = (feature: string) => {
    setFormData((prev) => ({ ...prev, features: prev.features.filter((f) => f !== feature) }));
  };

  // ── Submit ─────────────────────────────────────────────────────────────────

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});
    setSubmitError(null);

    const validImages: ServiceImageInputDto[] = images
      .filter((img) => img.url.trim() && img.alt.trim())
      .map(({ url, alt, type }) => ({ url, alt, type }));

    const rawData = {
      title: formData.title,
      slug: formData.slug.trim() || undefined,
      description: formData.description,
      price: formData.price === '' ? 0 : Number(formData.price),
      originalPrice: formData.originalPrice === '' ? null : Number(formData.originalPrice),
      bodyPart: formData.bodyPart || undefined,
      images: validImages,
      features: formData.features,
      isNew: formData.isNew,
      isOnSale: formData.isOnSale,
      order: formData.order,
    };

    const result = createServiceSchema.safeParse(rawData);
    if (!result.success) {
      const fieldErrors: Record<string, string> = {};
      for (const issue of result.error.issues) {
        fieldErrors[issue.path.join('.')] = issue.message;
      }
      setErrors(fieldErrors);
      return;
    }

    if (!user) return;

    setIsSubmitting(true);
    try {
      if (isEditMode && id) {
        await serviceService.update(id, { ...rawData, isActive: formData.isActive });
      } else {
        await serviceService.create(user.uid, rawData as Parameters<typeof serviceService.create>[1]);
      }
      navigate('/admin/servicios');
    } catch (error) {
      console.error('Error saving service:', error);
      setSubmitError('Error al guardar el servicio. Intentá de nuevo.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const isValidUrl = (url: string) => { try { new URL(url); return true; } catch { return false; } };

  if (loading) {
    return <div className={styles.loading}><div className={styles.spinner} /></div>;
  }

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h1 className={styles.title}>{isEditMode ? 'Editar Servicio' : 'Nuevo Servicio'}</h1>
      </header>

      <form className={styles.form} onSubmit={handleSubmit}>
        {submitError && <div className={styles.errorBanner}>{submitError}</div>}

        {/* ── Información básica ───────────────────────────────────────────── */}
        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>Información Básica</h2>
          <div className={styles.formGrid}>

            <div className={styles.field}>
              <label htmlFor="title" className={styles.label}>Título *</label>
              <input
                type="text" id="title" name="title"
                value={formData.title} onChange={handleChange}
                className={`${styles.input} ${errors.title ? styles.inputError : ''}`}
                placeholder="Nombre del servicio"
              />
              {errors.title && <span className={styles.errorText}>{errors.title}</span>}
            </div>

            <div className={styles.field}>
              <label htmlFor="slug" className={styles.label}>Slug *</label>
              <input
                type="text" id="slug" name="slug"
                value={formData.slug} onChange={handleSlugChange}
                className={`${styles.input} ${errors.slug ? styles.inputError : ''}`}
                placeholder="nombre-del-servicio"
              />
              {errors.slug && <span className={styles.errorText}>{errors.slug}</span>}
            </div>

            <div className={styles.fieldFull}>
              <label htmlFor="description" className={styles.label}>Descripción *</label>
              <textarea
                id="description" name="description"
                value={formData.description} onChange={handleChange}
                className={`${styles.textarea} ${errors.description ? styles.inputError : ''}`}
                placeholder="Descripción del servicio (mínimo 10 caracteres)"
                rows={4}
              />
              {errors.description && <span className={styles.errorText}>{errors.description}</span>}
            </div>

            <div className={styles.field}>
              <label htmlFor="price" className={styles.label}>Precio (ARS) *</label>
              <input
                type="number" id="price" name="price"
                value={formData.price} onChange={handleChange}
                className={`${styles.input} ${errors.price ? styles.inputError : ''}`}
                placeholder="15000" min={0}
              />
              {errors.price && <span className={styles.errorText}>{errors.price}</span>}
            </div>

            <div className={styles.field}>
              <label htmlFor="originalPrice" className={styles.label}>
                Precio Original <span className={styles.optional}>(opcional — activa badge de oferta)</span>
              </label>
              <input
                type="number" id="originalPrice" name="originalPrice"
                value={formData.originalPrice ?? ''} onChange={handleChange}
                className={styles.input}
                placeholder="20000" min={0}
              />
            </div>

            <div className={styles.field}>
              <label htmlFor="bodyPart" className={styles.label}>Zona del cuerpo *</label>
              <select
                id="bodyPart" name="bodyPart"
                value={formData.bodyPart} onChange={handleChange}
                className={`${styles.select} ${errors.bodyPart ? styles.inputError : ''}`}
              >
                <option className={styles.option} value="">Seleccionar zona</option>
                {BODY_PART_OPTIONS.map((opt) => (
                  <option key={opt.value} value={opt.value} className={styles.option}>
                    {opt.label}
                  </option>
                ))}
              </select>
              {errors.bodyPart && <span className={styles.errorText}>{errors.bodyPart}</span>}
            </div>

            <div className={styles.field}>
              <label htmlFor="order" className={styles.label}>Orden de visualización</label>
              <input
                type="number" id="order" name="order"
                value={formData.order} onChange={handleChange}
                className={styles.input}
                min={0}
              />
            </div>

          </div>
        </section>

        {/* ── Imágenes ─────────────────────────────────────────────────────── */}
        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>Imágenes (URLs de Cloudinary)</h2>
          {errors.images && <div className={styles.errorBanner}>{errors.images}</div>}
          <div className={styles.imagesList}>
            {images.map((img) => (
              <div key={img.rowId} className={styles.imageRow}>
                <div className={styles.imageFields}>
                  <div className={styles.imageField}>
                    <label className={styles.labelSmall}>URL *</label>
                    <input
                      type="text" value={img.url}
                      onChange={(e) => handleImageChange(img.rowId, 'url', e.target.value)}
                      className={styles.input}
                      placeholder="https://res.cloudinary.com/..."
                    />
                  </div>
                  <div className={styles.imageField}>
                    <label className={styles.labelSmall}>Texto alternativo *</label>
                    <input
                      type="text" value={img.alt}
                      onChange={(e) => handleImageChange(img.rowId, 'alt', e.target.value)}
                      className={styles.input}
                      placeholder="Descripción de la imagen"
                    />
                  </div>
                  <div className={styles.imageFieldSmall}>
                    <label className={styles.labelSmall}>Tipo</label>
                    <select
                      value={img.type}
                      onChange={(e) => handleImageChange(img.rowId, 'type', e.target.value as ImageRow['type'])}
                      className={styles.select}
                    >
                      <option value="main" className={styles.option}>Principal</option>
                      <option value="detail" className={styles.option}>Detalle</option>
                      <option value="result" className={styles.option}>Resultado</option>
                    </select>
                  </div>
                  {images.length > 1 && (
                    <button type="button" className={styles.removeImageButton} onClick={() => removeImageRow(img.rowId)}>
                      ×
                    </button>
                  )}
                </div>
                {isValidUrl(img.url) && (
                  <div className={styles.imagePreview}>
                    <img src={img.url} alt={img.alt || 'Preview'} onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }} />
                  </div>
                )}
              </div>
            ))}
          </div>
          <button type="button" className={styles.addImageButton} onClick={addImageRow}>
            + Agregar imagen
          </button>
        </section>

        {/* ── Características ───────────────────────────────────────────────── */}
        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>Características</h2>
          <div className={styles.featuresInput}>
            <input
              type="text" value={newFeature}
              onChange={(e) => setNewFeature(e.target.value)}
              className={styles.input}
              placeholder="Nueva característica"
              onKeyDown={(e) => { if (e.key === 'Enter') { e.preventDefault(); handleAddFeature(); } }}
            />
            <button type="button" className={styles.addFeatureButton} onClick={handleAddFeature}>
              Agregar
            </button>
          </div>
          {formData.features.length > 0 && (
            <div className={styles.featuresTags}>
              {formData.features.map((feature) => (
                <span key={feature} className={styles.featureTag}>
                  {feature}
                  <button type="button" className={styles.removeFeatureButton} onClick={() => handleRemoveFeature(feature)}>
                    ×
                  </button>
                </span>
              ))}
            </div>
          )}
        </section>

        {/* ── Etiquetas y estado ────────────────────────────────────────────── */}
        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>Etiquetas</h2>
          <div className={styles.flagsRow}>
            {([
              { name: 'isNew', label: 'Nuevo' },
              { name: 'isOnSale', label: 'En oferta' },
            ] as const).map(({ name, label }) => (
              <label key={name} className={styles.checkboxLabel}>
                <input
                  type="checkbox" name={name}
                  checked={formData[name]} onChange={handleChange}
                  className={styles.checkbox}
                />
                <span>{label}</span>
              </label>
            ))}
            {isEditMode && (
              <label className={styles.checkboxLabel}>
                <input
                  type="checkbox" name="isActive"
                  checked={formData.isActive} onChange={handleChange}
                  className={styles.checkbox}
                />
                <span>Servicio activo (visible en el sitio)</span>
              </label>
            )}
          </div>
        </section>

        {/* ── Acciones ─────────────────────────────────────────────────────── */}
        <div className={styles.formActions}>
          <button type="button" className={styles.cancelButton} onClick={() => navigate('/admin/servicios')}>
            Cancelar
          </button>
          <button type="submit" className={styles.submitButton} disabled={isSubmitting}>
            {isSubmitting ? 'Guardando...' : isEditMode ? 'Guardar Cambios' : 'Crear Servicio'}
          </button>
        </div>
      </form>
    </div>
  );
}

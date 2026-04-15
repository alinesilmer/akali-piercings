import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useAuth } from '../../../context/AuthContext';
import { productService } from '../../../services/productService';
import { categoryService } from '../../../services/categoryService';
import { createProductSchema, updateProductSchema } from '../../../schemas/product';
import { slugify } from '../../../utils/slugify';
import type { Category, ProductStatus } from '../../../types/models';
import type { ProductImageInputDto } from '../../../types/dtos';
import styles from './ProductForm.module.scss';

// Local form state — includes all fields needed for both create and edit
interface ProductFormState {
  title: string;
  slug: string;
  description: string;
  price: number | '';
  originalPrice: number | null | '';
  categoryId: string;
  features: string[];
  isFeatured: boolean;
  isNew: boolean;
  isOnSale: boolean;
  status: ProductStatus;
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

const INITIAL_FORM: ProductFormState = {
  title: '',
  slug: '',
  description: '',
  price: '',
  originalPrice: '',
  categoryId: '',
  features: [],
  isFeatured: false,
  isNew: false,
  isOnSale: false,
  status: 'draft',
};

export function ProductForm() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { user } = useAuth();
  const isEditMode = Boolean(id);

  const [categories, setCategories] = useState<Category[]>([]);
  const [formData, setFormData] = useState<ProductFormState>(INITIAL_FORM);
  const [images, setImages] = useState<ImageRow[]>([newImageRow()]);
  const [newFeature, setNewFeature] = useState('');
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [loading, setLoading] = useState(isEditMode);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [slugManuallyEdited, setSlugManuallyEdited] = useState(false);

  // Load categories first, then load product if editing
  useEffect(() => {
    categoryService.adminList().then(setCategories).catch(console.error);
  }, []);

  useEffect(() => {
    if (isEditMode && id) {
      productService.getById(id).then((product) => {
        if (!product) { navigate('/admin/productos'); return; }
        setFormData({
          title: product.title,
          slug: product.slug,
          description: product.description,
          price: product.price,
          originalPrice: product.originalPrice ?? '',
          categoryId: product.categoryId,
          features: product.features,
          isFeatured: product.isFeatured,
          isNew: product.isNew,
          isOnSale: product.isOnSale,
          status: product.status,
        });
        setImages(
          product.images.length > 0
            ? product.images.map((img) => ({ rowId: crypto.randomUUID(), url: img.url, alt: img.alt, type: img.type }))
            : [newImageRow()]
        );
        setSlugManuallyEdited(true);
      }).catch(() => navigate('/admin/productos'))
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

    const validImages: ProductImageInputDto[] = images
      .filter((img) => img.url.trim() && img.alt.trim())
      .map(({ url, alt, type }) => ({ url, alt, type }));

    const rawData = {
      title: formData.title,
      slug: formData.slug || undefined,
      description: formData.description,
      price: formData.price === '' ? 0 : Number(formData.price),
      originalPrice: formData.originalPrice === '' ? undefined : Number(formData.originalPrice),
      categoryId: formData.categoryId,
      images: validImages,
      features: formData.features,
      isFeatured: formData.isFeatured,
      isNew: formData.isNew,
      isOnSale: formData.isOnSale,
      status: formData.status,
    };

    // Use updateProductSchema in edit mode (includes status), createProductSchema on create
    const schema = isEditMode ? updateProductSchema : createProductSchema;
    const result = schema.safeParse(rawData);

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
        await productService.update(id, rawData);
      } else {
        await productService.create(user.uid, rawData);
      }
      navigate('/admin/productos');
    } catch (error) {
      console.error('Error saving product:', error);
      setSubmitError('Error al guardar el producto. Intentá de nuevo.');
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
        <h1 className={styles.title}>{isEditMode ? 'Editar Producto' : 'Nuevo Producto'}</h1>
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
                placeholder="Nombre del producto"
              />
              {errors.title && <span className={styles.errorText}>{errors.title}</span>}
            </div>

            <div className={styles.field}>
              <label htmlFor="slug" className={styles.label}>Slug *</label>
              <input
                type="text" id="slug" name="slug"
                value={formData.slug} onChange={handleSlugChange}
                className={`${styles.input} ${errors.slug ? styles.inputError : ''}`}
                placeholder="nombre-del-producto"
              />
              {errors.slug && <span className={styles.errorText}>{errors.slug}</span>}
            </div>

            <div className={styles.fieldFull}>
              <label htmlFor="description" className={styles.label}>Descripción *</label>
              <textarea
                id="description" name="description"
                value={formData.description} onChange={handleChange}
                className={`${styles.textarea} ${errors.description ? styles.inputError : ''}`}
                placeholder="Descripción detallada del producto (mínimo 10 caracteres)"
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
              <label htmlFor="categoryId" className={styles.label}>Categoría *</label>
              <select
                id="categoryId" name="categoryId"
                value={formData.categoryId} onChange={handleChange}
                className={`${styles.select} ${errors.categoryId ? styles.inputError : ''}`}
              >
                <option className={styles.option} value="">Seleccionar categoría</option>
                {categories.map((cat) => (
                  <option key={cat.id} value={cat.id} className={styles.option}>
                    {cat.name}
                  </option>
                ))}
              </select>
              {errors.categoryId && <span className={styles.errorText}>{errors.categoryId}</span>}
            </div>

            <div className={styles.field}>
              <label htmlFor="status" className={styles.label}>Estado</label>
              <select
                id="status" name="status"
                value={formData.status} onChange={handleChange}
                className={styles.select}
              >
                <option className={styles.option} value="draft">Borrador</option>
                <option className={styles.option} value="published">Publicado</option>
                <option className={styles.option} value="archived">Archivado</option>
              </select>
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

        {/* ── Badges ───────────────────────────────────────────────────────── */}
        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>Etiquetas</h2>
          <div className={styles.flagsRow}>
            {([
              { name: 'isFeatured', label: 'Destacado' },
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
          </div>
        </section>

        {/* ── Acciones ─────────────────────────────────────────────────────── */}
        <div className={styles.formActions}>
          <button type="button" className={styles.cancelButton} onClick={() => navigate('/admin/productos')}>
            Cancelar
          </button>
          <button type="submit" className={styles.submitButton} disabled={isSubmitting}>
            {isSubmitting ? 'Guardando...' : isEditMode ? 'Guardar Cambios' : 'Crear Producto'}
          </button>
        </div>
      </form>
    </div>
  );
}

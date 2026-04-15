import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useAuth } from '../../../context/AuthContext';
import { categoryService } from '../../../services/categoryService';
import { createCategorySchema } from '../../../schemas/category';
import { slugify } from '../../../lib/utils';
import styles from './CategoryForm.module.scss';

interface CategoryFormState {
  name: string;
  slug: string;
  description: string;
  order: number;
  isActive: boolean;
}

const INITIAL_FORM: CategoryFormState = {
  name: '',
  slug: '',
  description: '',
  order: 0,
  isActive: true,
};

export function CategoryForm() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { user } = useAuth();
  const isEditMode = Boolean(id);

  const [formData, setFormData] = useState<CategoryFormState>(INITIAL_FORM);
  const [errors, setErrors] = useState<Partial<Record<keyof CategoryFormState, string>>>({});
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [loading, setLoading] = useState(isEditMode);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [slugManuallyEdited, setSlugManuallyEdited] = useState(false);

  useEffect(() => {
    if (isEditMode && id) {
      categoryService.getById(id).then((category) => {
        if (!category) { navigate('/admin/categorias'); return; }
        setFormData({
          name: category.name,
          slug: category.slug,
          description: category.description ?? '',
          order: category.order,
          isActive: category.isActive,
        });
        setSlugManuallyEdited(true);
      }).catch(() => navigate('/admin/categorias'))
        .finally(() => setLoading(false));
    }
  }, [id, isEditMode, navigate]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    const checked = (e.target as HTMLInputElement).checked;

    setFormData((prev) => {
      const updated = { ...prev };

      if (type === 'checkbox') {
        (updated as Record<string, unknown>)[name] = checked;
      } else if (type === 'number') {
        (updated as Record<string, unknown>)[name] = parseInt(value, 10) || 0;
      } else {
        (updated as Record<string, unknown>)[name] = value;
      }

      if (name === 'name' && !slugManuallyEdited) {
        updated.slug = slugify(value);
      }

      return updated;
    });

    setErrors((prev) => ({ ...prev, [name]: undefined }));
  };

  const handleSlugChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSlugManuallyEdited(true);
    handleChange(e);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});
    setSubmitError(null);

    const dataToValidate = {
      name: formData.name,
      slug: formData.slug.trim() || undefined,
      description: formData.description.trim() || null,
      order: formData.order,
    };

    const result = createCategorySchema.safeParse(dataToValidate);
    if (!result.success) {
      const fieldErrors: Partial<Record<keyof CategoryFormState, string>> = {};
      for (const issue of result.error.issues) {
        const field = issue.path[0] as keyof CategoryFormState;
        fieldErrors[field] = issue.message;
      }
      setErrors(fieldErrors);
      return;
    }

    if (!user) return;

    setIsSubmitting(true);
    try {
      const dto = {
        name: formData.name,
        slug: formData.slug.trim() || undefined,
        description: formData.description.trim() || null,
        order: formData.order,
      };

      if (isEditMode && id) {
        await categoryService.update(id, { ...dto, isActive: formData.isActive });
      } else {
        await categoryService.create(user.uid, dto);
      }
      navigate('/admin/categorias');
    } catch (error) {
      console.error('Error saving category:', error);
      setSubmitError('Error al guardar la categoría. Intentá de nuevo.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loading) {
    return <div className={styles.loading}><div className={styles.spinner} /></div>;
  }

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h1 className={styles.title}>{isEditMode ? 'Editar Categoría' : 'Nueva Categoría'}</h1>
      </header>

      <form className={styles.form} onSubmit={handleSubmit}>
        {submitError && <div className={styles.errorBanner}>{submitError}</div>}

        <div className={styles.formGrid}>

          <div className={styles.field}>
            <label htmlFor="name" className={styles.label}>Nombre *</label>
            <input
              type="text" id="name" name="name"
              value={formData.name} onChange={handleChange}
              className={`${styles.input} ${errors.name ? styles.inputError : ''}`}
              placeholder="Nombre de la categoría"
            />
            {errors.name && <span className={styles.errorText}>{errors.name}</span>}
          </div>

          <div className={styles.field}>
            <label htmlFor="slug" className={styles.label}>Slug *</label>
            <input
              type="text" id="slug" name="slug"
              value={formData.slug} onChange={handleSlugChange}
              className={`${styles.input} ${errors.slug ? styles.inputError : ''}`}
              placeholder="nombre-de-categoria"
            />
            {errors.slug && <span className={styles.errorText}>{errors.slug}</span>}
          </div>

          <div className={styles.fieldFull}>
            <label htmlFor="description" className={styles.label}>Descripción</label>
            <textarea
              id="description" name="description"
              value={formData.description} onChange={handleChange}
              className={`${styles.textarea} ${errors.description ? styles.inputError : ''}`}
              placeholder="Descripción opcional de la categoría"
              rows={3}
            />
            {errors.description && <span className={styles.errorText}>{errors.description}</span>}
          </div>

          <div className={styles.field}>
            <label htmlFor="order" className={styles.label}>Orden de visualización</label>
            <input
              type="number" id="order" name="order"
              value={formData.order} onChange={handleChange}
              className={`${styles.input} ${errors.order ? styles.inputError : ''}`}
              min={0}
            />
            {errors.order && <span className={styles.errorText}>{errors.order}</span>}
          </div>

          {isEditMode && (
            <div className={styles.field}>
              <label className={styles.checkboxLabel}>
                <input
                  type="checkbox" name="isActive"
                  checked={formData.isActive} onChange={handleChange}
                  className={styles.checkbox}
                />
                <span>Categoría activa (visible en el sitio)</span>
              </label>
            </div>
          )}

        </div>

        <div className={styles.formActions}>
          <button type="button" className={styles.cancelButton} onClick={() => navigate('/admin/categorias')}>
            Cancelar
          </button>
          <button type="submit" className={styles.submitButton} disabled={isSubmitting}>
            {isSubmitting ? 'Guardando...' : isEditMode ? 'Guardar Cambios' : 'Crear Categoría'}
          </button>
        </div>
      </form>
    </div>
  );
}

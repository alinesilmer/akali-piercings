import { AdminForm } from "../../components/admin/AdminForm";
import { AdminList, type Column } from "../../components/admin/AdminList";
import s from "../../components/admin/admin.module.scss";
import { CheckboxField, Section, StatusToggle, TextAreaField, TextField } from "../../components/admin/ui";
import { useAdminForm } from "../../components/admin/useAdminForm";
import { categorySchema, type CategoryInput } from "../../schemas/category";
import { categoryService } from "../../services/categoryService";
import type { Category } from "../../types/models";

const PATH = "/admin/categorias";

const COLUMNS: Column<Category>[] = [
  { header: "Nombre", cell: (category) => category.name },
  { header: "Slug", cell: (category) => <span className={s.muted}>{category.slug}</span> },
  { header: "Orden", cell: (category) => category.order },
  {
    header: "Estado",
    cell: (category, patch) => (
      <StatusToggle
        on={category.isActive}
        labels={["Activa", "Inactiva"]}
        onClick={() => {
          const isActive = !category.isActive;
          patch({ isActive }, () => categoryService.update(category.id, { isActive }));
        }}
      />
    ),
  },
];

export function CategoryList() {
  return (
    <AdminList
      title="Categorías"
      noun="categoría"
      basePath={PATH}
      newPath={`${PATH}/nueva`}
      columns={COLUMNS}
      load={categoryService.adminList}
      remove={categoryService.remove}
    />
  );
}

const INITIAL = { name: "", slug: "", description: "", order: "0", isActive: true };
type FormData = typeof INITIAL;

const load = async (id: string): Promise<FormData | null> => {
  const category = await categoryService.getById(id);
  return (
    category && {
      name: category.name,
      slug: category.slug,
      description: category.description ?? "",
      order: String(category.order),
      isActive: category.isActive,
    }
  );
};

const toInput = (form: FormData): CategoryInput => ({
  name: form.name,
  slug: form.slug.trim() || undefined,
  description: form.description.trim() || null,
  order: Number(form.order),
  isActive: form.isActive,
});

const save = (input: CategoryInput, { id, uid }: { id?: string; uid: string }) =>
  id ? categoryService.update(id, input) : categoryService.create(uid, input);

export function CategoryForm() {
  const state = useAdminForm({
    initial: INITIAL,
    slugFrom: "name",
    backTo: PATH,
    schema: categorySchema,
    load,
    toInput,
    save,
  });

  return (
    <AdminForm noun="categoría" state={state}>
      <Section title="Información básica">
        <div className={s.formGrid}>
          <TextField label="Nombre *" placeholder="Nombre de la categoría" {...state.text("name")} />
          <TextField label="Slug" placeholder="nombre-de-categoria" {...state.text("slug")} />
          <TextAreaField
            label="Descripción"
            rows={3}
            placeholder="Descripción opcional de la categoría"
            {...state.text("description")}
          />
          <TextField label="Orden de visualización" type="number" min={0} {...state.text("order")} />
          {state.isEdit && <CheckboxField label="Categoría activa (visible en el sitio)" {...state.check("isActive")} />}
        </div>
      </Section>
    </AdminForm>
  );
}

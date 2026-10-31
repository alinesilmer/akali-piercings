import { useEffect, useState } from "react";

import { AdminForm } from "../../components/admin/AdminForm";
import { AdminList, type Column } from "../../components/admin/AdminList";
import s from "../../components/admin/admin.module.scss";
import {
  Button,
  CheckboxField,
  FeaturesEditor,
  ImagesEditor,
  Section,
  SelectField,
  TextAreaField,
  TextField,
  Thumbnail,
  type Option,
} from "../../components/admin/ui";
import { emptyImage, toImageInputs, toImageRows } from "../../components/admin/images";
import { useAdminForm } from "../../components/admin/useAdminForm";
import { formatPrice } from "../../lib/format";
import { productSchema, type ProductInput } from "../../schemas/product";
import { categoryService } from "../../services/categoryService";
import { productService } from "../../services/productService";
import { PRODUCT_STATUSES, type Product, type ProductStatus } from "../../types/models";

const PATH = "/admin/productos";

const STATUS_LABELS: Record<ProductStatus, string> = {
  draft: "Borrador",
  published: "Publicado",
  archived: "Archivado",
};
const STATUS_OPTIONS = PRODUCT_STATUSES.map((value) => ({ value, label: STATUS_LABELS[value] }));
const STATUS_STYLES: Record<ProductStatus, string> = { draft: s.off, published: s.on, archived: "" };

function useCategoryOptions() {
  const [options, setOptions] = useState<Option[]>([]);

  useEffect(() => {
    categoryService
      .adminList()
      .then((categories) => setOptions(categories.map(({ id, name }) => ({ value: id, label: name }))))
      .catch(console.error);
  }, []);

  return options;
}

const COLUMNS: Column<Product>[] = [
  { header: "Imagen", cell: (product) => <Thumbnail image={product.images[0]} /> },
  { header: "Título", cell: (product) => product.title },
  { header: "Categoría", cell: (product) => product.categoryName },
  {
    header: "Precio",
    cell: (product) => (
      <span className={s.price}>
        {formatPrice(product.price)}
        {product.originalPrice && <s>{formatPrice(product.originalPrice)}</s>}
      </span>
    ),
  },
  {
    header: "Estado",
    cell: (product) => (
      <span className={`${s.status} ${STATUS_STYLES[product.status]}`}>{STATUS_LABELS[product.status]}</span>
    ),
  },
  {
    header: "Etiquetas",
    cell: (product) => (
      <div className={s.tags}>
        {product.isFeatured && <span>Destacado</span>}
        {product.isNew && <span>Nuevo</span>}
        {product.isOnSale && <span>Oferta</span>}
      </div>
    ),
  },
  {
    header: "Publicación",
    cell: (product, patch) => {
      const status: ProductStatus = product.status === "published" ? "draft" : "published";
      return (
        <Button small onClick={() => patch({ status }, () => productService.update(product.id, { status }))}>
          {status === "published" ? "Publicar" : "Despublicar"}
        </Button>
      );
    },
  },
];

export function ProductList() {
  const categories = useCategoryOptions();
  const [status, setStatus] = useState("");
  const [categoryId, setCategoryId] = useState("");

  return (
    <AdminList
      title="Productos"
      noun="producto"
      basePath={PATH}
      newPath={`${PATH}/nuevo`}
      columns={COLUMNS}
      load={productService.adminList}
      remove={productService.remove}
      filter={(product) =>
        (!status || product.status === status) && (!categoryId || product.categoryId === categoryId)
      }
      toolbar={
        <>
          <SelectField
            label="Estado"
            placeholder="Todos"
            options={STATUS_OPTIONS}
            value={status}
            onChange={(event) => setStatus(event.target.value)}
          />
          <SelectField
            label="Categoría"
            placeholder="Todas"
            options={categories}
            value={categoryId}
            onChange={(event) => setCategoryId(event.target.value)}
          />
        </>
      }
    />
  );
}

const INITIAL = {
  title: "",
  slug: "",
  description: "",
  price: "",
  originalPrice: "",
  categoryId: "",
  status: "draft" as ProductStatus,
  images: [emptyImage()],
  features: [] as string[],
  isFeatured: false,
  isNew: false,
  isOnSale: false,
};
type FormData = typeof INITIAL;

const load = async (id: string): Promise<FormData | null> => {
  const product = await productService.getById(id);
  return (
    product && {
      title: product.title,
      slug: product.slug,
      description: product.description,
      price: String(product.price),
      originalPrice: product.originalPrice === null ? "" : String(product.originalPrice),
      categoryId: product.categoryId,
      status: product.status,
      images: toImageRows(product.images),
      features: product.features,
      isFeatured: product.isFeatured,
      isNew: product.isNew,
      isOnSale: product.isOnSale,
    }
  );
};

const toInput = (form: FormData): ProductInput => ({
  title: form.title,
  slug: form.slug.trim() || undefined,
  description: form.description,
  price: Number(form.price),
  originalPrice: form.originalPrice === "" ? null : Number(form.originalPrice),
  categoryId: form.categoryId,
  status: form.status,
  images: toImageInputs(form.images),
  features: form.features,
  isFeatured: form.isFeatured,
  isNew: form.isNew,
  isOnSale: form.isOnSale,
});

const save = (input: ProductInput, { id, uid }: { id?: string; uid: string }) =>
  id ? productService.update(id, input) : productService.create(uid, input);

export function ProductForm() {
  const categories = useCategoryOptions();
  const [draft, setDraft] = useState("");
  const state = useAdminForm({
    initial: INITIAL,
    slugFrom: "title",
    backTo: PATH,
    schema: productSchema,
    load,
    toInput,
    save,
  });

  return (
    <AdminForm noun="producto" state={state}>
      <Section title="Información básica">
        <div className={s.formGrid}>
          <TextField label="Título *" placeholder="Nombre del producto" {...state.text("title")} />
          <TextField label="Slug" placeholder="nombre-del-producto" {...state.text("slug")} />
          <TextAreaField
            label="Descripción *"
            placeholder="Descripción detallada del producto (mínimo 10 caracteres)"
            {...state.text("description")}
          />
          <TextField label="Precio (ARS) *" type="number" min={0} placeholder="15000" {...state.text("price")} />
          <TextField
            label={
              <>
                Precio original <small>(opcional)</small>
              </>
            }
            type="number"
            min={0}
            placeholder="20000"
            {...state.text("originalPrice")}
          />
          <SelectField
            label="Categoría *"
            placeholder="Seleccionar categoría"
            options={categories}
            {...state.text("categoryId")}
          />
          <SelectField label="Estado" options={STATUS_OPTIONS} {...state.text("status")} />
        </div>
      </Section>

      <ImagesEditor
        images={state.form.images}
        error={state.errors.images}
        onChange={(images) => state.set("images", images)}
      />
      <FeaturesEditor
        features={state.form.features}
        draft={draft}
        onDraft={setDraft}
        onChange={(features) => state.set("features", features)}
      />

      <Section title="Etiquetas">
        <div className={s.row}>
          <CheckboxField label="Destacado" {...state.check("isFeatured")} />
          <CheckboxField label="Nuevo" {...state.check("isNew")} />
          <CheckboxField label="En oferta" {...state.check("isOnSale")} />
        </div>
      </Section>
    </AdminForm>
  );
}

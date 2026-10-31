import { useState } from "react";

import { AdminForm } from "../../components/admin/AdminForm";
import { AdminList, type Column } from "../../components/admin/AdminList";
import s from "../../components/admin/admin.module.scss";
import {
  CheckboxField,
  FeaturesEditor,
  ImagesEditor,
  Section,
  SelectField,
  StatusToggle,
  TextAreaField,
  TextField,
  Thumbnail,
} from "../../components/admin/ui";
import { emptyImage, toImageInputs, toImageRows } from "../../components/admin/images";
import { useAdminForm } from "../../components/admin/useAdminForm";
import { BODY_PARTS, BODY_PART_LABELS } from "../../data/site";
import { formatPrice } from "../../lib/format";
import { serviceSchema, type ServiceInput } from "../../schemas/service";
import { serviceService } from "../../services/serviceService";
import type { BodyPart, Service } from "../../types/models";

const PATH = "/admin/servicios";
const BODY_PART_OPTIONS = BODY_PARTS.map(({ id, name }) => ({ value: id, label: name }));

const COLUMNS: Column<Service>[] = [
  { header: "Imagen", cell: (service) => <Thumbnail image={service.images[0]} /> },
  { header: "Título", cell: (service) => service.title },
  { header: "Zona", cell: (service) => BODY_PART_LABELS[service.bodyPart] ?? service.bodyPart },
  { header: "Precio", cell: (service) => <span className={s.price}>{formatPrice(service.price)}</span> },
  { header: "Orden", cell: (service) => service.order },
  {
    header: "Estado",
    cell: (service, patch) => (
      <StatusToggle
        on={service.isActive}
        labels={["Activo", "Inactivo"]}
        onClick={() => {
          const isActive = !service.isActive;
          patch({ isActive }, () => serviceService.update(service.id, { isActive }));
        }}
      />
    ),
  },
];

export function ServiceList() {
  return (
    <AdminList
      title="Servicios de piercing"
      noun="servicio"
      basePath={PATH}
      newPath={`${PATH}/nuevo`}
      columns={COLUMNS}
      load={serviceService.adminList}
      remove={serviceService.remove}
    />
  );
}

const INITIAL = {
  title: "",
  slug: "",
  description: "",
  price: "",
  originalPrice: "",
  bodyPart: "",
  order: "0",
  images: [emptyImage()],
  features: [] as string[],
  isNew: false,
  isOnSale: false,
  isActive: true,
};
type FormData = typeof INITIAL;

const load = async (id: string): Promise<FormData | null> => {
  const service = await serviceService.getById(id);
  return (
    service && {
      title: service.title,
      slug: service.slug,
      description: service.description,
      price: String(service.price),
      originalPrice: service.originalPrice === null ? "" : String(service.originalPrice),
      bodyPart: service.bodyPart,
      order: String(service.order),
      images: toImageRows(service.images),
      features: service.features,
      isNew: service.isNew,
      isOnSale: service.isOnSale,
      isActive: service.isActive,
    }
  );
};

const toInput = (form: FormData): ServiceInput => ({
  title: form.title,
  slug: form.slug.trim() || undefined,
  description: form.description,
  price: Number(form.price),
  originalPrice: form.originalPrice === "" ? null : Number(form.originalPrice),
  bodyPart: form.bodyPart as BodyPart,
  order: Number(form.order),
  images: toImageInputs(form.images),
  features: form.features,
  isNew: form.isNew,
  isOnSale: form.isOnSale,
  isActive: form.isActive,
});

const save = (input: ServiceInput, { id, uid }: { id?: string; uid: string }) =>
  id ? serviceService.update(id, input) : serviceService.create(uid, input);

export function ServiceForm() {
  const [draft, setDraft] = useState("");
  const state = useAdminForm({
    initial: INITIAL,
    slugFrom: "title",
    backTo: PATH,
    schema: serviceSchema,
    load,
    toInput,
    save,
  });

  return (
    <AdminForm noun="servicio" state={state}>
      <Section title="Información básica">
        <div className={s.formGrid}>
          <TextField label="Título *" placeholder="Nombre del servicio" {...state.text("title")} />
          <TextField label="Slug" placeholder="nombre-del-servicio" {...state.text("slug")} />
          <TextAreaField
            label="Descripción *"
            placeholder="Descripción del servicio (mínimo 10 caracteres)"
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
            label="Zona del cuerpo *"
            placeholder="Seleccionar zona"
            options={BODY_PART_OPTIONS}
            {...state.text("bodyPart")}
          />
          <TextField label="Orden de visualización" type="number" min={0} {...state.text("order")} />
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
          <CheckboxField label="Nuevo" {...state.check("isNew")} />
          <CheckboxField label="En oferta" {...state.check("isOnSale")} />
          {state.isEdit && <CheckboxField label="Servicio activo (visible en el sitio)" {...state.check("isActive")} />}
        </div>
      </Section>
    </AdminForm>
  );
}

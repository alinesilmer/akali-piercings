import type { FormEvent, ReactNode } from "react";

import s from "./admin.module.scss";
import { Button, PageHeader, Spinner } from "./ui";

interface FormState {
  loading: boolean;
  submitting: boolean;
  isEdit: boolean;
  submitError: string | null;
  submit: (event: FormEvent) => void;
  cancel: () => void;
}

export function AdminForm({ noun, state, children }: { noun: string; state: FormState; children: ReactNode }) {
  if (state.loading) return <Spinner />;

  return (
    <div className={s.pageNarrow}>
      <PageHeader title={`${state.isEdit ? "Editar" : "Crear"} ${noun}`} />
      <form className={s.form} onSubmit={state.submit} noValidate>
        {state.submitError && <div className={s.banner}>{state.submitError}</div>}
        {children}
        <div className={s.formActions}>
          <Button onClick={state.cancel}>Cancelar</Button>
          <Button type="submit" variant="secondary" disabled={state.submitting}>
            {state.submitting ? "Guardando..." : state.isEdit ? "Guardar cambios" : `Crear ${noun}`}
          </Button>
        </div>
      </form>
    </div>
  );
}

import { useEffect, useState, type ReactNode } from "react";

import s from "./admin.module.scss";
import { Button, ConfirmDialog, PageHeader, Spinner } from "./ui";

type Patch<T> = (changes: Partial<T>, persist: () => Promise<void>) => void;

export interface Column<T> {
  header: string;
  cell: (row: T, patch: Patch<T>) => ReactNode;
}

export function AdminList<T extends { id: string }>({
  title,
  noun,
  basePath,
  newPath,
  columns,
  load,
  remove,
  filter,
  toolbar,
}: {
  title: string;
  noun: string;
  basePath: string;
  newPath: string;
  columns: Column<T>[];
  load: () => Promise<T[]>;
  remove: (id: string) => Promise<void>;
  filter?: (row: T) => boolean;
  toolbar?: ReactNode;
}) {
  const [rows, setRows] = useState<T[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [deleteId, setDeleteId] = useState<string | null>(null);

  const attempt = (action: Promise<unknown>, message: string) =>
    action.catch((cause) => {
      console.error(cause);
      setError(message);
    });

  useEffect(() => {
    load()
      .then(setRows)
      .catch((cause) => {
        console.error(cause);
        setError("No se pudieron cargar los datos.");
      })
      .finally(() => setLoading(false));
  }, [load]);

  const patchRow = (id: string): Patch<T> => (changes, persist) => {
    setError(null);
    attempt(
      persist().then(() => setRows((current) => current.map((row) => (row.id === id ? { ...row, ...changes } : row)))),
      "No se pudo guardar el cambio.",
    );
  };

  const confirmDelete = (id: string) => {
    setDeleteId(null);
    setError(null);
    attempt(
      remove(id).then(() => setRows((current) => current.filter((row) => row.id !== id))),
      "No se pudo eliminar.",
    );
  };

  if (loading) return <Spinner />;

  const visible = filter ? rows.filter(filter) : rows;
  const newLabel = `Crear ${noun}`;

  return (
    <div className={s.page}>
      <PageHeader title={title}>
        <Button small variant="secondary" to={newPath}>
          {newLabel}
        </Button>
      </PageHeader>

      {error && <div className={s.banner}>{error}</div>}
      {toolbar && <div className={s.toolbar}>{toolbar}</div>}

      {visible.length === 0 ? (
        <div className={s.empty}>
          <p>No hay nada para mostrar.</p>
          <Button small to={newPath}>
            {newLabel}
          </Button>
        </div>
      ) : (
        <div className={s.tableWrapper}>
          <table className={s.table}>
            <thead>
              <tr>
                {columns.map((column) => (
                  <th key={column.header}>{column.header}</th>
                ))}
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {visible.map((row) => (
                <tr key={row.id}>
                  {columns.map((column) => (
                    <td key={column.header}>{column.cell(row, patchRow(row.id))}</td>
                  ))}
                  <td>
                    <div className={s.actions}>
                      <Button small to={`${basePath}/${row.id}/editar`}>
                        Editar
                      </Button>
                      <Button small variant="danger" onClick={() => setDeleteId(row.id)}>
                        Eliminar
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {deleteId && (
        <ConfirmDialog
          message={`¿Seguro que querés eliminar ${noun === "categoría" ? "esta" : "este"} ${noun}? Esta acción no se puede deshacer.`}
          onConfirm={() => confirmDelete(deleteId)}
          onCancel={() => setDeleteId(null)}
        />
      )}
    </div>
  );
}

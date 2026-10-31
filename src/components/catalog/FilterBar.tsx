import type { CatalogFilter } from "../../types/models";
import { Button } from "../ui/Button";

/** Pill filters with an implicit "Todo". `value` is the selected id, or null for everything. */
export function FilterBar({
  label,
  options,
  value,
  onChange,
}: {
  label: string;
  options: CatalogFilter[];
  value: string | null;
  onChange: (id: string | null) => void;
}) {
  return (
    <div className="filters" role="group" aria-label={label}>
      {[{ id: null, name: "Todo" }, ...options].map((option) => (
        <Button
          key={option.id ?? "all"}
          variant="chip"
          active={value === option.id}
          aria-pressed={value === option.id}
          onClick={() => onChange(option.id)}
        >
          {option.name}
        </Button>
      ))}
    </div>
  );
}

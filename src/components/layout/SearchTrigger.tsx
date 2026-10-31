import { useCallback, useMemo, useState } from "react";
import { Search } from "lucide-react";

import { useCatalog } from "../../hooks/useCatalog";
import type { CatalogItem } from "../../types/models";
import { ProductModal } from "../catalog/ProductModal";
import { SearchModal } from "../catalog/SearchModal";
import { Button } from "../ui/Button";

/** Header search icon. The catalog is only requested once the drawer is opened. */
export function SearchTrigger() {
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState<CatalogItem | null>(null);
  const { piercings, jewelry, loading } = useCatalog(open);
  const items = useMemo(() => [...piercings, ...jewelry], [piercings, jewelry]);
  const closeSearch = useCallback(() => setOpen(false), []);
  const closeProduct = useCallback(() => setSelected(null), []);

  return (
    <>
      <Button variant="icon" aria-label="Buscar" onClick={() => setOpen(true)}>
        <Search size={18} strokeWidth={1.5} />
      </Button>
      <SearchModal open={open} items={items} loading={loading} onClose={closeSearch} onSelect={setSelected} />
      <ProductModal product={selected} onClose={closeProduct} />
    </>
  );
}

import { useCallback, useMemo, useState } from "react";
import { X } from "lucide-react";

import { KIND_LABELS } from "../../data/site";
import { searchItems } from "../../domain/catalog";
import type { CatalogItem } from "../../types/models";
import { SearchField } from "../form/SearchField";
import { Button } from "../ui/Button";
import { Modal } from "../ui/Modal";
import { Text } from "../ui/Text";
import { SearchResults } from "./SearchResults";

const SUGGESTIONS = ["Nostril", "Septum", "Helix", "Labret"];

export function SearchModal({
  open,
  items,
  loading,
  onClose,
  onSelect,
}: {
  open: boolean;
  items: CatalogItem[];
  loading: boolean;
  onClose: () => void;
  onSelect: (item: CatalogItem) => void;
}) {
  const [query, setQuery] = useState("");
  const term = query.trim().toLowerCase();
  const results = useMemo(() => searchItems(items, term, KIND_LABELS), [items, term]);

  const close = useCallback(() => {
    setQuery("");
    onClose();
  }, [onClose]);

  const pick = (item: CatalogItem) => {
    onSelect(item);
    close();
  };

  return (
    <Modal open={open} onClose={close} label="Buscar" variant="top">
      <div className="search">
        <div className="search__bar">
          <Text variant="label">Buscar</Text>
          <Button variant="icon" onClick={close} aria-label="Cerrar búsqueda">
            <X size={18} strokeWidth={1.5} />
          </Button>
        </div>

        <SearchField
          label="Buscar piercings y joyería"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="¿Qué buscás?"
          autoFocus
        />

        {!term && (
          <div className="search__chips">
            {SUGGESTIONS.map((word) => (
              <Button key={word} variant="chip" onClick={() => setQuery(word)}>
                {word}
              </Button>
            ))}
          </div>
        )}

        {term && loading && <Text variant="label">Cargando catálogo…</Text>}
        {term && !loading && results.length === 0 && (
          <p className="empty-note">
            Nada con <em>«{query.trim()}»</em>.
          </p>
        )}
        {results.length > 0 && <SearchResults results={results} term={term} onPick={pick} />}
      </div>
    </Modal>
  );
}

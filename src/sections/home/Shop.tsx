import { ArrowUpRight } from "lucide-react";

import { CatalogSection } from "../../components/catalog/CatalogSection";
import { Button } from "../../components/ui/Button";
import { Text } from "../../components/ui/Text";
import type { Catalog } from "../../types/catalog";
import type { CatalogItem } from "../../types/models";

const SHOP_LIMIT = 8;

export function Shop({
  catalog,
  loading,
  onSelect,
}: {
  catalog: Catalog;
  loading: boolean;
  onSelect: (item: CatalogItem) => void;
}) {
  return (
    <CatalogSection
      tone="panel"
      kanji="新作"
      title={
        <>
          Lo más <em>elegido</em>
        </>
      }
      aside={<Text variant="label">Se reserva por WhatsApp</Text>}
      items={catalog.jewelry}
      categories={catalog.jewelryCategories}
      loading={loading}
      limit={SHOP_LIMIT}
      onSelect={onSelect}
      footer={
        <Button variant="line" to="/servicios">
          Ver catálogo completo <ArrowUpRight size={16} strokeWidth={1.5} />
        </Button>
      }
    />
  );
}

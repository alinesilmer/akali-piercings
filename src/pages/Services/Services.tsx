import { CatalogSection } from "../../components/catalog/CatalogSection";
import { ProductModal } from "../../components/catalog/ProductModal";
import { ClosingCta } from "../../components/layout/ClosingCta";
import { PageShell } from "../../components/layout/PageShell";
import { BODY_PARTS } from "../../data/site";
import { useCatalog } from "../../hooks/useCatalog";
import { useSelection } from "../../hooks/useSelection";
import { ServicesIntro } from "../../sections/services/ServicesIntro";
import type { CatalogItem } from "../../types/models";

export default function Services() {
  const catalog = useCatalog();
  const product = useSelection<CatalogItem>();

  return (
    <PageShell>
      <ServicesIntro catalog={catalog} loading={catalog.loading} />

      <CatalogSection
        id="servicios"
        kanji="施術"
        title="Piercings"
        items={catalog.piercings}
        categories={BODY_PARTS}
        loading={catalog.loading}
        onSelect={product.select}
      />
      <CatalogSection
        id="productos"
        tone="panel"
        kanji="宝飾"
        title="Joyería"
        items={catalog.jewelry}
        categories={catalog.jewelryCategories}
        loading={catalog.loading}
        onSelect={product.select}
      />

      <ClosingCta
        showPromo={false}
        title={
          <>
            ¿Dudás? <em>Preguntá.</em>
          </>
        }
      />
      <ProductModal product={product.selected} onClose={product.clear} />
    </PageShell>
  );
}

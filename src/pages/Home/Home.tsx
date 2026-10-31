import { ProductModal } from "../../components/catalog/ProductModal";
import { ClosingCta } from "../../components/layout/ClosingCta";
import { PageShell } from "../../components/layout/PageShell";
import { Lightbox } from "../../components/ui/Lightbox";
import { useCatalog } from "../../hooks/useCatalog";
import { useSelection } from "../../hooks/useSelection";
import { Band, Essentials, Hero, Shop, Steps, Stories, Studio, Zones } from "../../sections/home";
import type { CatalogItem } from "../../types/models";

export default function Home() {
  const catalog = useCatalog();
  const product = useSelection<CatalogItem>();
  const story = useSelection<string>();

  return (
    <PageShell>
      <Hero />
      <Band />
      <Zones />
      <Shop catalog={catalog} loading={catalog.loading} onSelect={product.select} />
      <Studio />
      <Steps />
      <Essentials />
      <Stories onOpen={story.select} />
      <ClosingCta
        title={
          <>
            Reservá <em>tu turno</em>
          </>
        }
      />
      <Lightbox src={story.selected} alt="Testimonio de una clienta de Akali" onClose={story.clear} />
      <ProductModal product={product.selected} onClose={product.clear} />
    </PageShell>
  );
}

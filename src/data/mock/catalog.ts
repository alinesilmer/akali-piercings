import gold from "../../assets/images/WhyUs3.webp";
import cuff from "../../assets/images/ProductsOption.jpg";
import pearls from "../../assets/images/ProductsOption2.jpg";
import type { Catalog } from "../../types/catalog";
import type { CatalogItem } from "../../types/models";

// MOCK DATA: placeholder products and prices for the frontend-only phase.
// Swap the source in `repositories/catalogRepository.ts`; nothing else needs to change.

const photo = (url: string, alt: string) => [{ id: url, url, publicId: null, alt, type: "main" as const }];

type Seed = Pick<CatalogItem, "id" | "title" | "description" | "price" | "categoryId"> &
  Partial<Pick<CatalogItem, "originalPrice" | "isNew" | "isOnSale" | "features">> & { image: string };

const make = (kind: CatalogItem["kind"], seed: Seed): CatalogItem => {
  const { image, ...rest } = seed;
  return {
    kind,
    originalPrice: null,
    isNew: false,
    isOnSale: false,
    features: [],
    ...rest,
    images: photo(image, seed.title),
  };
};

const SERVICE_FEATURES = ["Colocación en el estudio", "Guía de cuidados"];

const piercings = (
  [
    { id: "s-helix", title: "Helix", description: "Cartílago superior de la oreja.", price: 18000, categoryId: "ear", image: "/catalog/helix.webp" },
    { id: "s-industrial", title: "Industrial", description: "Dos perforaciones unidas por una barra.", price: 24000, categoryId: "ear", image: "/catalog/industrial.webp", isNew: true },
    { id: "s-tragus", title: "Tragus", description: "El pequeño cartílago frente al canal auditivo.", price: 20000, categoryId: "ear", image: "/catalog/tragus.webp" },
    { id: "s-daith", title: "Daith", description: "El pliegue interno del cartílago.", price: 22000, categoryId: "ear", image: "/catalog/daith.webp" },
    { id: "s-lobe", title: "Lóbulo", description: "El clásico, desde la primera perforación.", price: 12000, categoryId: "ear", image: "/catalog/lobe2.webp" },
    { id: "s-nostril", title: "Nostril", description: "Aleta de la nariz, con joya a elección.", price: 15000, categoryId: "nose", image: "/catalog/nostrile.webp" },
    { id: "s-septum", title: "Septum", description: "Tabique nasal, discreto o protagonista.", price: 20000, categoryId: "nose", image: "/catalog/client3.webp" },
    { id: "s-brow", title: "Ceja", description: "Perforación en la ceja.", price: 16000, categoryId: "eyebrow", image: "/catalog/client10.webp" },
    { id: "s-tongue", title: "Lengua", description: "Barra central en la lengua.", price: 22000, categoryId: "mouth", image: "/catalog/tongue.webp" },
    { id: "s-navel", title: "Ombligo", description: "Banana con piedra o simple.", price: 18000, categoryId: "body", image: "/catalog/client7.webp" },
  ] satisfies Seed[]
).map((seed) => make("piercing", { features: SERVICE_FEATURES, ...seed }));

const JEWELRY_FEATURES = ["Material hipoalergénico", "Se coloca en el estudio"];

const jewelry = (
  [
    { id: "j-pearl", title: "Aro perla", description: "Aro fino con perlas de río.", price: 14500, categoryId: "aros", image: pearls },
    { id: "j-gold", title: "Labret dorado", description: "Labret baño de oro, terminación pulida.", price: 9800, categoryId: "labrets", image: gold, isNew: true },
    { id: "j-cuff", title: "Ear cuff plata", description: "Ear cuff con cristales, sin perforación.", price: 17500, originalPrice: 21000, isOnSale: true, categoryId: "aros", image: cuff },
    { id: "j-nostril-cz", title: "Nostril cristal", description: "Nostril con piedra de circonia.", price: 9800, categoryId: "nostril", image: "/catalog/nostrile2.webp" },
    { id: "j-nostril-hoop", title: "Nostril aro", description: "Aro segmentado para nariz.", price: 8500, categoryId: "nostril", image: "/catalog/nostrile3.webp", isNew: true },
    { id: "j-septum", title: "Septum clicker", description: "Clicker de cierre seguro.", price: 14200, categoryId: "nostril", image: "/catalog/client3.webp" },
    { id: "j-industrial", title: "Barra industrial ópalo", description: "Barra de 38 mm con flor de ópalo.", price: 18900, categoryId: "barras", image: "/catalog/industrial.webp" },
    { id: "j-helix", title: "Helix luna", description: "Luna calada para helix.", price: 12500, categoryId: "aros", image: "/catalog/helix.webp" },
  ] satisfies Seed[]
).map((seed) => make("jewelry", { features: JEWELRY_FEATURES, ...seed }));

export const MOCK_CATALOG: Catalog = {
  piercings,
  jewelry,
  jewelryCategories: [
    { id: "aros", name: "Aros" },
    { id: "nostril", name: "Nostril" },
    { id: "labrets", name: "Labrets" },
    { id: "barras", name: "Barras" },
  ],
};

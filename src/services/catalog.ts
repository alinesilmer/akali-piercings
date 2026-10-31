import type { Catalog } from "../types/catalog";
import type { CatalogItem, Product, Service } from "../types/models";
import { categoryService } from "./categoryService";
import { productService } from "./productService";
import { serviceService } from "./serviceService";

const orEmpty = <T>(request: Promise<T[]>) =>
  request.catch((error) => {
    console.error(error);
    return [] as T[];
  });

const toItem = (source: Service | Product, kind: CatalogItem["kind"], categoryId: string): CatalogItem => ({
  id: source.id,
  kind,
  categoryId,
  title: source.title,
  description: source.description,
  price: source.price,
  originalPrice: source.originalPrice,
  images: source.images,
  features: source.features,
  isNew: source.isNew,
  isOnSale: source.isOnSale,
});

export async function loadCatalog(): Promise<Catalog> {
  const [services, products, categories] = await Promise.all([
    orEmpty(serviceService.listActive()),
    orEmpty(productService.listPublished()),
    orEmpty(categoryService.listActive()),
  ]);

  return {
    piercings: services.map((service) => toItem(service, "piercing", service.bodyPart)),
    jewelry: products.map((product) => toItem(product, "jewelry", product.categoryId)),
    jewelryCategories: categories.map(({ id, name }) => ({ id, name })),
  };
}

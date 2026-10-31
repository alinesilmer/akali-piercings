import { orderBy, serverTimestamp, where } from "firebase/firestore";

import { slugify } from "../lib/format";
import { createRepository } from "../repositories/createRepository";
import { productSchema, type ProductInput } from "../schemas/product";
import { toStoredImages } from "../schemas/shared";
import type { Product, ProductStatus } from "../types/models";
import { categoryService } from "./categoryService";

const repo = createRepository<Product>("products");
const newestFirst = orderBy("createdAt", "desc");

async function categoryName(categoryId: string) {
  const category = await categoryService.getById(categoryId);
  if (!category) throw new Error(`Category not found: ${categoryId}`);
  return category.name;
}

async function firstPublication(id: string, status?: ProductStatus) {
  if (status !== "published") return {};
  const current = await repo.getById(id);
  return current?.publishedAt ? {} : { publishedAt: serverTimestamp() };
}

export const productService = {
  getById: repo.getById,
  remove: repo.remove,

  listPublished() {
    return repo.list(where("status", "==", "published"), newestFirst);
  },

  adminList() {
    return repo.list(newestFirst);
  },

  async create(uid: string, input: ProductInput) {
    const { slug, images, ...data } = productSchema.parse(input);
    const status = data.status ?? "draft";
    await repo.create(uid, {
      title: data.title,
      slug: await repo.uniqueSlug(slug ?? slugify(data.title)),
      description: data.description,
      price: data.price,
      originalPrice: data.originalPrice ?? null,
      currency: "ARS",
      categoryId: data.categoryId,
      categoryName: await categoryName(data.categoryId),
      images: toStoredImages(images),
      features: data.features ?? [],
      status,
      isFeatured: data.isFeatured ?? false,
      isNew: data.isNew ?? false,
      isOnSale: data.isOnSale ?? false,
      publishedAt: status === "published" ? serverTimestamp() : null,
    });
  },

  async update(id: string, input: Partial<ProductInput>) {
    const { slug, images, ...data } = productSchema.partial().parse(input);
    const slugBase = slug ?? (data.title ? slugify(data.title) : undefined);
    await repo.update(id, {
      ...data,
      ...(images && { images: toStoredImages(images) }),
      ...(slugBase && { slug: await repo.uniqueSlug(slugBase, id) }),
      ...(data.categoryId && { categoryName: await categoryName(data.categoryId) }),
      ...(await firstPublication(id, data.status)),
    });
  },
};

import { where } from "firebase/firestore";

import { slugify } from "../lib/format";
import { createRepository } from "../repositories/createRepository";
import { categorySchema, type CategoryInput } from "../schemas/category";
import type { Category } from "../types/models";

const repo = createRepository<Category>("categories");
const byOrder = (a: Category, b: Category) => a.order - b.order;

export const categoryService = {
  getById: repo.getById,
  remove: repo.remove,

  async listActive() {
    return (await repo.list(where("isActive", "==", true))).sort(byOrder);
  },

  async adminList() {
    return (await repo.list()).sort(byOrder);
  },

  async create(uid: string, input: CategoryInput) {
    const { slug, ...data } = categorySchema.parse(input);
    await repo.create(uid, {
      name: data.name,
      slug: await repo.uniqueSlug(slug ?? slugify(data.name)),
      description: data.description ?? null,
      imageUrl: null,
      imagePublicId: null,
      order: data.order ?? 0,
      isActive: data.isActive ?? true,
    });
  },

  async update(id: string, input: Partial<CategoryInput>) {
    const { slug, ...data } = categorySchema.partial().parse(input);
    const slugBase = slug ?? (data.name ? slugify(data.name) : undefined);
    await repo.update(id, {
      ...data,
      ...(slugBase && { slug: await repo.uniqueSlug(slugBase, id) }),
    });
  },
};

import { where } from "firebase/firestore";

import { slugify } from "../lib/format";
import { createRepository } from "../repositories/createRepository";
import { serviceSchema, type ServiceInput } from "../schemas/service";
import { toStoredImages } from "../schemas/shared";
import type { Service } from "../types/models";

const repo = createRepository<Service>("services");
const byOrder = (a: Service, b: Service) => a.order - b.order;

export const serviceService = {
  getById: repo.getById,
  remove: repo.remove,

  async listActive() {
    return (await repo.list(where("isActive", "==", true))).sort(byOrder);
  },

  async adminList() {
    return (await repo.list()).sort(byOrder);
  },

  async create(uid: string, input: ServiceInput) {
    const { slug, images, ...data } = serviceSchema.parse(input);
    await repo.create(uid, {
      title: data.title,
      slug: await repo.uniqueSlug(slug ?? slugify(data.title)),
      description: data.description,
      price: data.price,
      originalPrice: data.originalPrice ?? null,
      bodyPart: data.bodyPart,
      images: toStoredImages(images),
      features: data.features ?? [],
      isActive: data.isActive ?? true,
      isNew: data.isNew ?? false,
      isOnSale: data.isOnSale ?? false,
      order: data.order ?? 0,
    });
  },

  async update(id: string, input: Partial<ServiceInput>) {
    const { slug, images, ...data } = serviceSchema.partial().parse(input);
    const slugBase = slug ?? (data.title ? slugify(data.title) : undefined);
    await repo.update(id, {
      ...data,
      ...(images && { images: toStoredImages(images) }),
      ...(slugBase && { slug: await repo.uniqueSlug(slugBase, id) }),
    });
  },
};

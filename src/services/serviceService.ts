import { serverTimestamp } from "firebase/firestore"
import { serviceRepository } from "../repositories/serviceRepository"
import { createServiceSchema, updateServiceSchema } from "../schemas/service"
import { slugify, serviceDocToModel, generateImageId } from "../lib/utils"
import type { Service } from "../types/models"
import type { CreateServiceDto, UpdateServiceDto } from "../types/dtos"

// ─── Helpers ──────────────────────────────────────────────────────────────────

async function resolveUniqueSlug(base: string, excludeId?: string): Promise<string> {
  let candidate = base
  let suffix = 1
  while (true) {
    const existing = await serviceRepository.getBySlug(candidate)
    if (!existing || existing.id === excludeId) return candidate
    suffix++
    candidate = `${base}-${suffix}`
  }
}

// ─── Service ──────────────────────────────────────────────────────────────────

export const serviceService = {
  async create(uid: string, dto: CreateServiceDto): Promise<Service> {
    const parsed = createServiceSchema.parse(dto)
    const baseSlug = parsed.slug ?? slugify(parsed.title)
    const slug = await resolveUniqueSlug(baseSlug)

    const now = serverTimestamp()

    const id = await serviceRepository.create({
      title: parsed.title,
      slug,
      description: parsed.description,
      price: parsed.price,
      originalPrice: parsed.originalPrice ?? null,
      bodyPart: parsed.bodyPart,
      images: (parsed.images ?? []).map((img) => ({
        id: generateImageId(),
        url: img.url,
        publicId: img.publicId ?? null,
        alt: img.alt,
        type: img.type,
      })),
      features: parsed.features ?? [],
      isActive: true,
      isNew: parsed.isNew ?? false,
      isOnSale: parsed.isOnSale ?? false,
      order: parsed.order ?? 0,
      createdAt: now as never,
      updatedAt: now as never,
      createdBy: uid,
    })

    const created = await serviceRepository.getById(id)
    if (!created) throw new Error("Failed to fetch created service")
    return serviceDocToModel(created)
  },

  async update(id: string, dto: UpdateServiceDto): Promise<Service> {
    const parsed = updateServiceSchema.parse(dto)

    const updates: Record<string, unknown> = {
      updatedAt: serverTimestamp(),
    }

    if (parsed.title !== undefined) updates.title = parsed.title
    if (parsed.description !== undefined) updates.description = parsed.description
    if (parsed.price !== undefined) updates.price = parsed.price
    if (parsed.originalPrice !== undefined) updates.originalPrice = parsed.originalPrice
    if (parsed.bodyPart !== undefined) updates.bodyPart = parsed.bodyPart
    if (parsed.features !== undefined) updates.features = parsed.features
    if (parsed.isActive !== undefined) updates.isActive = parsed.isActive
    if (parsed.isNew !== undefined) updates.isNew = parsed.isNew
    if (parsed.isOnSale !== undefined) updates.isOnSale = parsed.isOnSale
    if (parsed.order !== undefined) updates.order = parsed.order

    if (parsed.images !== undefined) {
      updates.images = parsed.images.map((img) => ({
        id: generateImageId(),
        url: img.url,
        publicId: img.publicId ?? null,
        alt: img.alt,
        type: img.type,
      }))
    }

    if (parsed.slug !== undefined) {
      updates.slug = await resolveUniqueSlug(parsed.slug, id)
    } else if (parsed.title !== undefined) {
      updates.slug = await resolveUniqueSlug(slugify(parsed.title), id)
    }

    await serviceRepository.update(id, updates as never)

    const updated = await serviceRepository.getById(id)
    if (!updated) throw new Error("Failed to fetch updated service")
    return serviceDocToModel(updated)
  },

  async delete(id: string): Promise<void> {
    await serviceRepository.delete(id)
  },

  async getById(id: string): Promise<Service | null> {
    const doc = await serviceRepository.getById(id)
    return doc ? serviceDocToModel(doc) : null
  },

  /** Public site: returns active services ordered by `order`. */
  async listActive(): Promise<Service[]> {
    const docs = await serviceRepository.listActive()
    return docs.map(serviceDocToModel)
  },

  /** Admin: returns all services regardless of status. */
  async adminList(): Promise<Service[]> {
    const docs = await serviceRepository.listAll()
    return docs.map(serviceDocToModel)
  },
}

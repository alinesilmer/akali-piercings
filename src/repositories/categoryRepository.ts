import {
  collection,
  doc,
  getDoc,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
  query,
  where,
  limit as firestoreLimit,
  type DocumentData,
  type FirestoreDataConverter,
  type QueryDocumentSnapshot,
  type SnapshotOptions,
} from "firebase/firestore"
import { db } from "../lib/firebase"
import type { CategoryDoc } from "../types/firestore"

// ─── Converter ───────────────────────────────────────────────────────────────

const categoryConverter: FirestoreDataConverter<CategoryDoc> = {
  toFirestore(data: CategoryDoc) {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { id, ...rest } = data
    return rest
  },
  fromFirestore(snap: QueryDocumentSnapshot, options: SnapshotOptions): CategoryDoc {
    const data = snap.data(options)
    return { id: snap.id, ...data } as CategoryDoc
  },
}

// ─── Collection ref ───────────────────────────────────────────────────────────

function categoriesRef() {
  return collection(db, "categories").withConverter(categoryConverter)
}

function categoryDocRef(id: string) {
  return doc(db, "categories", id).withConverter(categoryConverter)
}

// ─── Repository ───────────────────────────────────────────────────────────────

export const categoryRepository = {
  /**
   * Returns a single category by Firestore document ID, or null if not found.
   */
  async getById(id: string): Promise<CategoryDoc | null> {
    const snap = await getDoc(categoryDocRef(id))
    return snap.exists() ? snap.data() : null
  },

  /**
   * Returns a single category by slug, or null.
   * Uses a collection query — slug uniqueness is enforced at service layer.
   */
  async getBySlug(slug: string): Promise<CategoryDoc | null> {
    const q = query(categoriesRef(), where("slug", "==", slug), firestoreLimit(1))
    const snap = await getDocs(q)
    if (snap.empty) return null
    return snap.docs[0].data()
  },

  /**
   * Returns all active categories sorted by `order` ASC.
   * Uses a single-field filter (no composite index required).
   */
  async listActive(): Promise<CategoryDoc[]> {
    const q = query(categoriesRef(), where("isActive", "==", true))
    const snap = await getDocs(q)
    const docs = snap.docs.map((d) => d.data())
    return docs.sort((a, b) => a.order - b.order)
  },

  /**
   * Returns all categories (any status) sorted by `order` ASC.
   * Admin only.
   */
  async listAll(): Promise<CategoryDoc[]> {
    const snap = await getDocs(categoriesRef())
    const docs = snap.docs.map((d) => d.data())
    return docs.sort((a, b) => a.order - b.order)
  },

  /**
   * Creates a new category document. Returns the generated document ID.
   */
  async create(data: Omit<CategoryDoc, "id">): Promise<string> {
    // We use addDoc so Firestore generates the ID.
    // withConverter requires the full type — cast after creation.
    const ref = await addDoc(collection(db, "categories"), data)
    return ref.id
  },

  /**
   * Partially updates a category document.
   */
  async update(id: string, data: Partial<Omit<CategoryDoc, "id">>): Promise<void> {
    await updateDoc(doc(db, "categories", id), data as DocumentData)
  },

  /**
   * Permanently deletes a category document.
   */
  async delete(id: string): Promise<void> {
    await deleteDoc(doc(db, "categories", id))
  },
}

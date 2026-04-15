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
  type DocumentData,
  type FirestoreDataConverter,
  type QueryDocumentSnapshot,
  type SnapshotOptions,
} from "firebase/firestore"
import { db } from "../lib/firebase"
import type { ServiceDoc } from "../types/firestore"

// ─── Converter ───────────────────────────────────────────────────────────────

const serviceConverter: FirestoreDataConverter<ServiceDoc> = {
  toFirestore(data: ServiceDoc) {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { id, ...rest } = data
    return rest
  },
  fromFirestore(snap: QueryDocumentSnapshot, options: SnapshotOptions): ServiceDoc {
    const data = snap.data(options)
    return { id: snap.id, ...data } as ServiceDoc
  },
}

// ─── Collection refs ──────────────────────────────────────────────────────────

function servicesRef() {
  return collection(db, "services").withConverter(serviceConverter)
}

function serviceDocRef(id: string) {
  return doc(db, "services", id).withConverter(serviceConverter)
}

// ─── Repository ───────────────────────────────────────────────────────────────

export const serviceRepository = {
  async getById(id: string): Promise<ServiceDoc | null> {
    const snap = await getDoc(serviceDocRef(id))
    return snap.exists() ? snap.data() : null
  },

  async getBySlug(slug: string): Promise<ServiceDoc | null> {
    const q = query(servicesRef(), where("slug", "==", slug))
    const snap = await getDocs(q)
    if (snap.empty) return null
    return snap.docs[0].data()
  },

  /** Public site: returns active services sorted by `order` ASC.
   *  Uses a single-field filter (no composite index required). */
  async listActive(): Promise<ServiceDoc[]> {
    const q = query(servicesRef(), where("isActive", "==", true))
    const snap = await getDocs(q)
    const docs = snap.docs.map((d) => d.data())
    return docs.sort((a, b) => a.order - b.order)
  },

  /** Admin: returns all services sorted by `order` ASC. */
  async listAll(): Promise<ServiceDoc[]> {
    const snap = await getDocs(servicesRef())
    const docs = snap.docs.map((d) => d.data())
    return docs.sort((a, b) => a.order - b.order)
  },

  /** Creates a new service document. Returns the generated document ID. */
  async create(data: Omit<ServiceDoc, "id">): Promise<string> {
    const ref = await addDoc(collection(db, "services"), data)
    return ref.id
  },

  async update(id: string, data: Partial<Omit<ServiceDoc, "id">>): Promise<void> {
    await updateDoc(doc(db, "services", id), data as DocumentData)
  },

  async delete(id: string): Promise<void> {
    await deleteDoc(doc(db, "services", id))
  },
}

import type { ProductService } from "../types/product"

export const SAMPLE_NOSTRIL_PRODUCT: ProductService = {
  id: "nostril-piercing",
  title: "Nostril",
  description:
    "Dale a tu perfil un brillo fresco con nuestro servicio de piercing nostril. En una sesión de pocos minutos creamos una perforación limpia y precisa, guiándote en cada paso para que disfrutes el resultado.",
  price: 15000,
  currency: "$",
  category: "piercing",
  features: ["Evaluación personalizada", "Joyería de acero", "Acompañamiento post-servicio"],
  images: [
    {
      id: "main",
      src: "/images/nostril-main.png",
      alt: "Piercing nostril principal",
      type: "main",
    },
    {
      id: "thumb1",
      src: "/images/nostril-thumb-1.png",
      alt: "Vista lateral del piercing nostril",
      type: "result",
    },
    {
      id: "thumb2",
      src: "/images/nostril-thumb-2.png",
      alt: "Vista frontal del piercing nostril",
      type: "result",
    },
    {
      id: "thumb3",
      src: "/images/nostril-thumb-3.png",
      alt: "Joyería para piercing nostril",
      type: "product",
    },
    {
      id: "thumb4",
      src: "/images/nostril-thumb-4.png",
      alt: "Detalle del piercing nostril",
      type: "detail",
    },
  ],
}

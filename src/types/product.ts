export interface ProductImage {
    id: string
    src: string
    alt: string
    type: "main" | "detail" | "product" | "result"
  }
  
  export interface ProductService {
    id: string
    title: string
    description: string
    price: number
    originalPrice?: number
    currency: string
    features: string[]
    images: ProductImage[]
    category: "piercing" | "jewelry" | "aftercare"
    categoryId?: string
    isOnSale?: boolean
    isNew?: boolean
  }
  
  export interface Category {
    id: string
    name: string
    icon: string
  }
  
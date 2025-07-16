import type { ProductService, Category } from "../types/product"
// src/utils/servicesData.ts
import eyebrow from "../assets/images/Ceja.svg";
import lips from "../assets/images/Labial.svg";
import ear from "../assets/images/Ombligo.svg";
import nose from "../assets/images/Nariz.svg";
import tongue from "../assets/images/Lengua.svg";

// PIERCING
export const PIERCING_CATEGORIES: Category[] = [
  { id: "nose",     name: "Nariz",  icon: nose },
  { id: "lips",     name: "Labios", icon: lips },
  { id: "ear",      name: "Oreja",  icon: ear },
  { id: "eyebrow",  name: "Ceja",   icon: eyebrow },
  { id: "tongue",   name: "Lengua", icon: tongue },
];

// JEWELRY
import ring from "../assets/images/Anillo.svg";
import necklace from "../assets/images/Collar.svg";
import earrings from "../assets/images/Aros.svg";
import piercing from "../assets/images/Piercing.svg";
import bracelet from "../assets/images/Pulsera.svg";

export const JEWELRY_CATEGORIES: Category[] = [
  { id: "rings",     name: "Anillos",    icon: ring },
  { id: "necklaces", name: "Collares",   icon: necklace },
  { id: "sets",      name: "Sets",       icon: piercing },
  { id: "earrings",  name: "Aretes",     icon: earrings },
  { id: "horseshoe", name: "Herradura",  icon: bracelet },
];

import Septum from "../assets/images/clients/client3.jpeg"; 
import nostrile from "../assets/images/clients/client4.jpeg";
import nostrile2 from "../assets/images/clients/client4-1.jpeg";
import industrial from "../assets/images/clients/client8.jpeg";
import navel from "../assets/images/clients/client7.jpeg";
import labret from "../assets/images/clients/client5.jpeg";
import eyebrows from "../assets/images/clients/client2.jpeg";

export const PIERCING_SERVICES: ProductService[] = [
  {
    id: "nostrile",
    title: "Nostrile",
    description:
      "Dale a tu perfil un brillo fresco con nuestro servicio de piercing nostril. En una sesión de pocos minutos creamos una perforación limpia y precisa, guiándote en cada paso para que disfrutes el resultado.",
    price: 15000,
    currency: "$",
    category: "piercing",
    features: ["Evaluación personalizada", "Joyería de acero", "Acompañamiento post-servicio"],
    images: [
      {
        id: "main",
        src: nostrile,              
        alt: "Piercing Smiley",    
        type: "main"
      },
      {
        id: "secondary",
        src: nostrile2,              
        alt: "Piercing Smiley",    
        type: "main"
      }
    ],
    categoryId: "nose",
  },
  {
    id: "smiley",
    title: "Smiley",
    description:
      "Un piercing discreto y único que se revela con tu sonrisa. Perfecto para quienes buscan algo especial y diferente.",
    price: 30000,
    currency: "$",
    category: "piercing",
    features: ["Evaluación personalizada", "Joyería de acero", "Acompañamiento post-servicio"],
     images: [
      ],
    categoryId: "lips",
  },
  {
    id: "septum",
    title: "Septum",
    description: "Un clásico atemporal que aporta personalidad y estilo. Versátil y elegante para cualquier ocasión.",
    price: 18000,
    currency: "$",
    category: "piercing",
    features: ["Evaluación personalizada", "Joyería de acero", "Acompañamiento post-servicio"],
    images: [{
        id: "main",
        src: Septum,              
        alt: "Piercing Smiley",    
        type: "main"
      }],
    categoryId: "nose",
  },
  {
    id: "industrial",
    title: "Industrial",
    description:
      "Un piercing llamativo y moderno que conecta dos puntos del oído con una barra recta. Para los más atrevidos.",
    price: 22000,
    currency: "$",
    category: "piercing",
    features: ["Evaluación personalizada", "Joyería de acero", "Acompañamiento post-servicio"],
    images: [{
        id: "main",
        src: industrial,              
        alt: "Piercing Smiley",    
        type: "main"
      }],
    categoryId: "ear",
  },
  {
    id: "labret",
    title: "Labret",
    description:
      "Elegante y versátil, el piercing labret es perfecto para complementar tu estilo personal con sutileza.",
    price: 15000,
    currency: "$",
    category: "piercing",
    features: ["Evaluación personalizada", "Joyería de acero", "Acompañamiento post-servicio"],
    images: [{
        id: "main",
        src: labret,              
        alt: "Piercing Smiley",    
        type: "main"
      }],
    categoryId: "lips",
  },
  {
    id: "navel",
    title: "Navel",
    description: "Un clásico que nunca pasa de moda. Perfecto para mostrar tu personalidad y estilo único.",
    price: 7000,
    originalPrice: 15000,
    currency: "$",
    category: "piercing",
    features: ["Evaluación personalizada", "Joyería de acero", "Acompañamiento post-servicio"],
    images: [{
        id: "main",
        src: navel,              
        alt: "Piercing Smiley",    
        type: "main"
      }],
    categoryId: "body",
    isOnSale: true,
  },
  {
    id: "ceja",
    title: "Ceja",
    description: "Un piercing que enmarca tu mirada y añade un toque rebelde y sofisticado a tu expresión.",
    price: 40000,
    currency: "$",
    category: "piercing",
    features: ["Evaluación personalizada", "Joyería de acero", "Acompañamiento post-servicio"],
    images: [{
        id: "main",
        src: eyebrows,              
        alt: "Piercing Smiley",    
        type: "main"
      }],
    categoryId: "eyebrow",
  },
]

export const JEWELRY_PRODUCTS: ProductService[] = [
  {
    id: "anillo-anna",
    title: "Anillo Anna",
    description: "Elegante anillo con cristales que aporta sofisticación y brillo a cualquier look.",
    price: 15000,
    currency: "$",
    category: "jewelry",
    features: ["Acero quirúrgico", "Cristales de alta calidad", "Hipoalergénico"],
    images: [],
    categoryId: "rings",
  },
  {
    id: "set-anillos",
    title: "Set de Anillos",
    description: "Conjunto de anillos variados para crear combinaciones únicas y personalizadas.",
    price: 30000,
    currency: "$",
    category: "jewelry",
    features: ["Acero quirúrgico", "Diseños variados", "Hipoalergénico"],
    images: [],
    categoryId: "sets",
  },
  {
    id: "anillo-snake",
    title: "Anillo Snake",
    description: "Diseño serpentino único que añade un toque místico y elegante a tu colección.",
    price: 18000,
    currency: "$",
    category: "jewelry",
    features: ["Acero quirúrgico", "Diseño exclusivo", "Hipoalergénico"],
    images: [],
    categoryId: "rings",
    isNew: true,
  },
  {
    id: "anillo-waves",
    title: "Anillo Waves",
    description: "Diseño ondulado que captura la fluidez y movimiento del agua en una pieza única.",
    price: 22000,
    currency: "$",
    category: "jewelry",
    features: ["Acero quirúrgico", "Diseño ondulado", "Hipoalergénico"],
    images: [],
    categoryId: "rings",
  },
  {
    id: "anillo-moon",
    title: "Anillo Moon",
    description: "Inspirado en las fases lunares, este anillo aporta misticismo y elegancia a tu estilo.",
    price: 15000,
    currency: "$",
    category: "jewelry",
    features: ["Acero quirúrgico", "Diseño lunar", "Hipoalergénico"],
    images: [],
    categoryId: "rings",
  },
  {
    id: "anillo-summer",
    title: "Anillo Summer",
    description: "Colores vibrantes que capturan la esencia del verano en una pieza radiante.",
    price: 7000,
    originalPrice: 15000,
    currency: "$",
    category: "jewelry",
    features: ["Acero quirúrgico", "Cristales coloridos", "Hipoalergénico"],
    images: [],
    categoryId: "rings",
    isOnSale: true,
  },
  {
    id: "par-anillos",
    title: "Par de Anillos",
    description: "Conjunto de anillos a juego, perfectos para crear looks coordinados y armoniosos.",
    price: 40000,
    currency: "$",
    category: "jewelry",
    features: ["Acero quirúrgico", "Diseño a juego", "Hipoalergénico"],
    images: [],
    categoryId: "rings",
  },
]

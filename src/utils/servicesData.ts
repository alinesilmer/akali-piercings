import type { ProductService, Category } from "../types/product"
// src/utils/servicesData.ts
import eyebrow from "../assets/images/Ceja.svg";
import lips from "../assets/images/Labial.svg";
import nose from "../assets/images/Nariz.svg";
import body from "../assets/images/Ombligo.svg";
import ear from "../assets/images/Oreja.svg";

// PIERCING
export const PIERCING_CATEGORIES: Category[] = [
  { id: "nose",     name: "Nariz",  icon: nose },
  { id: "mouth",     name: "Boca", icon: lips },
  { id: "body",      name: "Cuerpo",  icon: body },
  { id: "eyebrow",  name: "Ceja",   icon: eyebrow },
  {id: "ear", name: "Oreja", icon: ear},
];

// JEWELRY
import ring from "../assets/images/Anillo.svg";
import necklace from "../assets/images/Collar.svg";
import earrings from "../assets/images/Aros.svg";
import piercing from "../assets/images/Piercing.svg";
import bracelet from "../assets/images/Pulsera.svg";

export const JEWELRY_CATEGORIES: Category[] = [
  { id: "piercing",      name: "Piercing",       icon: piercing },
  { id: "rings",     name: "Anillos",    icon: ring },
  { id: "necklaces", name: "Collares",   icon: necklace },
  { id: "earrings",  name: "Aretes",     icon: earrings },
  { id: "horseshoe", name: "Herradura", icon: bracelet },
];

import Septum from "../assets/images/clients/client3.jpeg"; 
import nostrile from "../assets/images/clients/client4.jpeg";
import industrial from "../assets/images/clients/client8.jpeg";
import navel from "../assets/images/clients/client7.jpeg";
import labret from "../assets/images/clients/client5.jpeg";
import eyebrows from "../assets/images/clients/client2.jpeg";
import industrial2 from "../assets/images/clients/client9.jpeg";
import eyebrows2 from "../assets/images/clients/client10.jpeg";
import daith from "../assets/images/clients/client11.jpeg";
import daith2 from "../assets/images/clients/client6.jpeg";
import lobe from "../assets/images/clients/client12.jpeg";
import helix from "../assets/images/clients/helix.jpeg";
import helix2 from "../assets/images/clients/helix2.jpeg";
import lingual from "../assets/images/clients/tongue.jpeg";
import nostrile2 from "../assets/images/clients/nostrile.jpeg";
import nostrile3 from "../assets/images/clients/nostrile2.jpeg";
import nostrile4 from "../assets/images/clients/nostrile3.jpeg";
import rook from "../assets/images/clients/daith.jpeg";

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
        alt: "Piercing Nostrile",
        type: "main"
      },
      {
        id: "secondary",
        src: nostrile2,
        alt: "Piercing Nostrile",
        type: "main"
      }, 
      {
        id: "secondary",
        src: nostrile3,
        alt: "Piercing Nostrile",
        type: "main"
      },
      {
        id: "secondary",
        src: nostrile4,
        alt: "Piercing Nostrile",
        type: "main"
      }
    ],
    categoryId: "nose",
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
      alt: "Piercing Septum",
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
      alt: "Piercing Industrial",
      type: "main"
    }, {
      id: "main",
      src: industrial2,
      alt: "Piercing Industrial",
      type: "main"
    }],
    categoryId: "ear",
  },
  {
  id: "rook",
  title: "Rook",
  description:
    "Piercing en el pliegue interno superior del cartílago del oído, ideal para un look sofisticado y discreto. Realizado con acero quirúrgico de alta calidad y técnica precisa para máxima comodidad y sanación.",
  price: 20000,
  currency: "$",
  category: "piercing",
  features: ["Evaluación personalizada", "Joyería de acero", "Acompañamiento post-servicio"],
  images: [
    {
      id: "main",
      src: rook,         
      alt: "Piercing Rook",
      type: "main"
    }
  ],
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
      alt: "Piercing Labret",
      type: "main"
    }],
    categoryId: "mouth",
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
      alt: "Piercing Navel",
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
      alt: "Piercing Ceja",
      type: "main"
    },
    {
      id: "main",
      src: eyebrows2,
      alt: "Piercing Ceja",
      type: "main"
    }],
    categoryId: "eyebrow",
  },
  {
    id: "lobe",
    title: "lobe",
    description:
      "El piercing lóbulo es el clásico por excelencia: discreto, elegante y perfecto para cualquier estilo. ",
    price: 20000,
    currency: "$",
    category: "piercing",
    features: ["Evaluación personalizada", "Joyería de acero", "Acompañamiento post-servicio"],
    images: [{ id: "main", src: lobe, alt: "Piercing Lobe", type: "main" }],
    categoryId: "ear",
  },
   {
    id: "helix",
    title: "Helix",
    description:
      "Piercing en el cartílago superior del oído que aporta un toque moderno y sofisticado.",
    price: 20000,
    currency: "$",
    category: "piercing",
    features: ["Evaluación personalizada", "Joyería de acero", "Acompañamiento post-servicio"],
    images: [{ id: "main", src: helix, alt: "Piercing Helix", type: "main" }, { id: "main", src: helix2, alt: "Piercing Helix", type: "main" }],
    categoryId: "ear",
  },
  {
    id: "daith",
    title: "Daith",
    description:
      "Piercing en el pliegue interno del cartílago que además de estético puede ayudar a aliviar la migraña.",
    price: 23000,
    currency: "$",
    category: "piercing",
    features: ["Evaluación personalizada", "Joyería de acero", "Acompañamiento post-servicio"],
    images: [{ id: "main", src: daith, alt: "Piercing Daith", type: "main" },
      { id: "main", src: daith2, alt: "Piercing Daith", type: "main" },
    ],
    categoryId: "ear",
  },
  {
  id: "tongue",
  title: "Lingual",
  description:
    "El piercing lingual, ubicado en la lengua, aporta un toque audaz y sofisticado. Realizado con acero quirúrgico de primera calidad y técnica precisa, garantiza comodidad y un acabado impecable.",
  price: 25000,
  currency: "$",
  category: "piercing",
  features: ["Evaluación personalizada", "Joyería de acero", "Acompañamiento post-servicio"],
  images: [
    {
      id: "main",
      src: lingual,      
      alt: "Piercing Lingual",
      type: "main"
    }
  ],
  categoryId: "mouth",
}

];


import product from "../assets/images/products/product1.jpeg";
import product2 from "../assets/images/products/joya.jpeg";

export const JEWELRY_PRODUCTS: ProductService[] = [
  {
    id: "piercing-ear",
    title: "Pieza Helix Acero",
    description: "Pieza de acero para piercing Helix, ideal para piercing en el cartílago superior del oído.",
    price: 12000,
    currency: "$",
    category: "jewelry",
    features: ["Acero quirúrgico", "Diseño a juego", "Hipoalergénico"],
    images: [{
      id: "main",
      src: product,      
      alt: "Pieza Helix Acero",
      type: "main"
    }],
    categoryId: "piercing",
  },
  {
    id: "piercing-eyebrow",
    title: "Barra Curva",
    description: "Barra curva de acero para piercing en ceja, diseñada para complementar tu mirada y realzar tu estilo.",
    price: 15000,
    currency: "$",
    category: "jewelry",
    features: ["Acero quirúrgico", "Diseño a juego", "Hipoalergénico"],
    images: [{
      id: "main",
      src: product2,      
      alt: "Barra Curva",
      type: "main"
    }],
    categoryId: "piercing",
  },
]

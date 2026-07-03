export const siteContent = {
  brand: {
    name: "Sockets",
    headline: "Basta de medias medias.",
    promise: "Nunca más pierdas una media.",
    domain: "www.sockets.com.ar",
  },
  contact: {
    email: "hola@sockets.com.ar",
    suggestionsEmail: "sugerencias@sockets.com.ar",
    instagramHandle: "@sockets_original",
    instagramUrl: "https://www.instagram.com/sockets_original/",
    tiktokUrl: "https://www.tiktok.com/@sockets_original",
    purchaseUrl: "https://www.instagram.com/sockets_original/",
  },
  navigation: [
    { label: "El problema", href: "#problema" },
    { label: "Cómo funciona", href: "#como-funciona" },
    { label: "Producto", href: "#producto" },
    { label: "Contacto", href: "#contacto" },
  ],
  problemLines: [
    {
      number: "01",
      text: "Hay gente que pierde llaves. Otros pierden dignidad. Vos perdés medias.",
    },
    {
      number: "02",
      text: "El lavarropas no se las come. Pero claramente está metido en algo.",
    },
    {
      number: "03",
      text: "Una media sola no es minimalismo. Es abandono.",
    },
  ],
  steps: [
    {
      number: "01",
      title: "Usalas",
      text: "Te las ponés. Caminás. Vivís. Hasta acá, una media completamente normal.",
    },
    {
      number: "02",
      title: "Acercalas",
      text: "Cuando te las sacás, juntás los logos. El imán está escondido justo debajo.",
    },
    {
      number: "03",
      title: "Olvidate",
      text: "Lavado, secado, cajón o valija: quedan juntas. Como debería ser toda buena pareja.",
    },
  ],
  benefits: [
    "Nunca más perder una media",
    "Menos tiempo armando pares",
    "Cajón menos caótico",
    "Listas para lavar, guardar y viajar",
    "La pareja más estable de tu placard",
  ],
  manifesto: [
    "No arreglamos tu vida. Pero tus medias quedan juntas.",
    "Si algo se va a separar, que no sean tus medias.",
    "El amor existe. Y viene con imán.",
    "Menos medias viudas. Más orden.",
    "Una solución ridículamente simple para un problema ridículamente real.",
  ],
} as const;

export type SiteContent = typeof siteContent;

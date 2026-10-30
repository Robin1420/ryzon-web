import type { NavItem } from "./types";

export const nav: NavItem[] = [
  { id: "inicio", label: "Inicio", href: "#inicio" },
  { id: "servicios", label: "Servicios", href: "#servicios" },
  { id: "enfoque", label: "Nuestro enfoque", href: "#enfoque" },
  { id: "preguntas", label: "Preguntas", href: "#preguntas" },
  { id: "contacto", label: "Contacto", href: "#contacto" },
];

/** Secciones observadas para marcar el enlace activo. Varias secciones pueden apuntar al mismo enlace. */
export const sectionToNav: Record<string, string> = {
  inicio: "inicio",
  servicios: "servicios",
  enfoque: "enfoque",
  preguntas: "preguntas",
  contacto: "contacto",
  formulario: "contacto",
};

export const hero = {
  title: "Tecnología bien diseñada para que tu negocio avance",
  accent: ".",
  subtitle:
    "Arquitectura de redes, monitoreo, software a medida y soporte para simplificar tu operación y acompañar tu crecimiento.",
  cta: "Hablemos de tu proyecto",
  hintDesktop: "Mueve el cursor sobre la red",
  hintTouch: "Toca la red",
  networkLabel: "Red de nodos interactiva",
  areasLabel: "Áreas de trabajo",
};

export const servicesIntro = {
  label: "Servicios",
  title: "Cuatro áreas que funcionan como un solo sistema.",
  text: "Desde cómo se conecta tu negocio hasta quién responde cuando algo falla. Recorre cada área y mira cómo se une al resto.",
  benefitLabel: "Lo que ganas",
};

export const approachIntro = {
  label: "Nuestro enfoque",
  title: "La tecnología se ajusta a tu negocio, no al revés.",
};

export const condense = {
  label: "Contacto",
  text: "Todo empieza con una conversación.",
  countLabel: "Nodos activos",
};

/** Datos de contacto NO confirmados: se muestran como espacios reservados. */
export const contact = {
  label: "Cuéntanos tu proyecto",
  title: "Cuéntanos qué necesitas",
  accent: ".",
  text: "Explícanos tu necesidad o proyecto con tus propias palabras. No hace falta que sea técnico: te ayudamos a aterrizarlo y a ver por dónde empezar.",
  channels: [
    { label: "Correo", value: "robinzon.1420@gmail.com" },
    { label: "Teléfono", value: "+51 931 320 429" },
    { label: "Ubicación", value: "Lima, Perú" },
  ],
};

/** WhatsApp que recibe los mensajes del formulario. Número con código de país (Perú, +51), sin símbolos. */
export const whatsapp = { number: "51931320429" };

export const form = {
  fields: {
    name: "Nombre",
    email: "Correo electrónico",
    company: "Empresa (opcional)",
    area: "¿Qué necesitas?",
    message: "Cuéntanos tu necesidad o proyecto",
  },
  undecided: "Aún no lo sé",
  submit: "Enviar mensaje",
  note: "Se abrirá WhatsApp con tu mensaje listo para enviar.",
  errors: {
    name: "Escribe tu nombre.",
    email: "Escribe un correo válido, por ejemplo nombre@empresa.com.",
    message: "Cuéntanos brevemente qué necesitas.",
  },
  invalidSummary: "Revisa los campos marcados para poder enviar.",
  opened: "Abrimos WhatsApp con tu mensaje. Si no se abrió,",
  openLink: "ábrelo aquí",
  message: {
    greeting: "Hola, quiero hablar de un proyecto con Ryzon.",
    name: "Nombre",
    email: "Correo",
    company: "Empresa",
    area: "Me interesa",
  },
};

export const footer = {
  legal: "© 2026 Ryzon. [razón social]",
  tagline: "Arquitectura de redes, monitoreo, software y soporte.",
};

/** Atribución exigida por la licencia CC BY 4.0 del modelo 3D (texto sugerido por Sketchfab, sin traducir). */
export const modelCredit = {
  title: "Server V2 +console",
  url: "https://skfb.ly/ADNW",
  author: "FlevasGR",
  authorUrl: "https://sketchfab.com/FlevasGR",
  license: "Creative Commons Attribution",
  licenseUrl: "http://creativecommons.org/licenses/by/4.0/",
  /** La licencia pide indicar los cambios: se quitó la marca de la textura del gabinete. */
  changes: "Adaptado.",
};

export const meta = {
  title: "Servicios de TI en Perú: redes, software y soporte | Ryzon",
  description:
    "Ryzon diseña redes, monitoreo, software a medida, automatización y soporte técnico para empresas en Perú. Cuéntanos tu proyecto y te asesoramos.",
  keywords: [
    "servicios de TI en Perú",
    "empresa de tecnología Perú",
    "diseño de redes empresariales",
    "monitoreo de redes",
    "software a medida Perú",
    "automatización de procesos",
    "soporte técnico para empresas",
    "asesoría tecnológica",
    "integración de sistemas",
  ],
  locale: "es_PE",
  brand: "Ryzon",
};

export const motionToggle = {
  on: "Activar animaciones",
  off: "Reducir animaciones",
} as const;

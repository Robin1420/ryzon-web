import type { NavItem } from "./types";

export const nav: NavItem[] = [
  { id: "inicio", label: "Inicio", href: "#inicio" },
  { id: "servicios", label: "Servicios", href: "#servicios" },
  { id: "enfoque", label: "Nuestro enfoque", href: "#enfoque" },
  { id: "contacto", label: "Contacto", href: "#contacto" },
];

/** Secciones observadas para marcar el enlace activo. Varias secciones pueden apuntar al mismo enlace. */
export const sectionToNav: Record<string, string> = {
  inicio: "inicio",
  servicios: "servicios",
  enfoque: "enfoque",
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
    { label: "Correo", value: "[correo de contacto]" },
    { label: "Teléfono", value: "[teléfono]" },
    { label: "Ubicación", value: "[ciudad]" },
    { label: "Horario de atención", value: "[horario]" },
  ],
};

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
  note: "Respondemos a cada mensaje.",
  errors: {
    name: "Escribe tu nombre.",
    email: "Escribe un correo válido, por ejemplo nombre@empresa.com.",
    message: "Cuéntanos brevemente qué necesitas.",
  },
  invalidSummary: "Revisa los campos marcados para poder enviar.",
  demo: "Formulario en modo de demostración: el envío todavía no está conectado [servicio de envío pendiente].",
};

export const footer = {
  legal: "© 2026 Ryzon. [razón social]",
  tagline: "Arquitectura de redes, monitoreo, software y soporte.",
};

export const meta = {
  title: "Ryzon — Arquitectura de redes, monitoreo, software a medida y soporte",
  description:
    "Ryzon diseña soluciones tecnológicas adaptadas a cada negocio: arquitectura de redes, monitoreo, software a medida y soporte tecnológico.",
};

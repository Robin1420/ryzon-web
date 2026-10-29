import type { Faq } from "./types";

export const faqIntro = {
  label: "Preguntas frecuentes",
  title: "Lo que suelen preguntarnos antes de empezar",
};

/** Respuestas basadas solo en lo que Ryzon hace; sin precios, plazos ni cobertura sin confirmar. */
export const faqs: Faq[] = [
  {
    q: "¿Qué servicios de TI ofrece Ryzon?",
    a: "Diseñamos arquitecturas de red, monitoreamos redes, desarrollamos software a medida y damos soporte tecnológico para equipos, servidores y sistemas. También te asesoramos para decidir por dónde empezar.",
  },
  {
    q: "¿Ryzon es un proveedor de internet?",
    a: "No. Diseñamos e implementamos la arquitectura de tu red: cómo se conectan tus equipos, sistemas y servicios. No vendemos internet ni hacemos la instalación física de fibra óptica.",
  },
  {
    q: "¿Qué es el monitoreo de redes y para qué sirve?",
    a: "Es la supervisión del funcionamiento de tu red para identificar problemas y facilitar su solución. Sirve para detectar fallas y prevenir interrupciones antes de que afecten tu operación.",
  },
  {
    q: "¿Qué es el software a medida?",
    a: "Son aplicaciones e integraciones desarrolladas para la forma de trabajar de tu negocio, en lugar de adaptarte a un programa genérico. Sirven para simplificar tareas y conectar los sistemas que ya usas.",
  },
  {
    q: "¿Pueden automatizar procesos de mi empresa?",
    a: "Desarrollamos sistemas que simplifican y automatizan tareas. Cuéntanos qué proceso quieres mejorar y vemos cómo resolverlo.",
  },
  {
    q: "¿Ofrecen asesoría tecnológica?",
    a: "Sí. Si no tienes claro qué necesitas, explícanos tu situación con tus propias palabras. Te ayudamos a aterrizarla y a ver por dónde empezar.",
  },
  {
    q: "¿Cómo empiezo un proyecto con Ryzon?",
    a: "Llena el formulario de contacto: se abre WhatsApp con tu mensaje listo para enviar. A partir de lo que nos cuentes, conversamos sobre tu proyecto.",
  },
];

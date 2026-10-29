import type { Service } from "./types";

export const services: Service[] = [
  {
    id: "redes",
    index: "01",
    short: "Redes",
    label: "Redes y conectividad",
    title: "Creamos arquitecturas de red para tu negocio.",
    description:
      "Diseñamos cómo se conectan tus equipos, sistemas y servicios para que trabajen de forma estable y puedan crecer contigo.",
    benefit: "Una red estable hoy, preparada para crecer mañana.",
    note: "Diseñamos e implementamos la arquitectura. No somos proveedor de internet ni instalamos fibra óptica.",
    topics: ["Diseño de redes empresariales", "Arquitectura de red", "Conectividad de equipos y sistemas"],
    scene: { caption: "Equipos, sistemas y servicios conectados", tone: "neutral" },
  },
  {
    id: "monitoreo",
    index: "02",
    short: "Monitoreo",
    label: "Monitoreo de redes",
    title: "Detectamos fallas y prevenimos interrupciones.",
    description: "Supervisamos el funcionamiento de tu red para identificar problemas y facilitar su solución.",
    benefit: "Te enteras del problema antes de que llegue a tu operación.",
    topics: ["Monitoreo de redes", "Detección de fallas", "Prevención de caídas"],
    scene: { caption: "Falla detectada en el nodo 04", tone: "alert" },
  },
  {
    id: "software",
    index: "03",
    short: "Software",
    label: "Software a medida",
    title: "Sistemas que simplifican y automatizan tareas.",
    description: "Desarrollamos aplicaciones e integraciones adaptadas a la forma de trabajar de tu negocio.",
    benefit: "Menos trabajo repetitivo y herramientas que encajan con tu manera de operar.",
    topics: ["Software a medida", "Automatización de procesos", "Integración de sistemas"],
    scene: { caption: "Capas de software sobre la red", tone: "neutral" },
  },
  {
    id: "soporte",
    index: "04",
    short: "Soporte",
    label: "Soporte tecnológico",
    title: "Soluciones para equipos, servidores y sistemas.",
    description:
      "Ayudamos a configurar, mantener y resolver problemas en la tecnología que sostiene tu operación.",
    benefit: "Una persona que se ocupa de que la tecnología siga funcionando.",
    topics: ["Soporte técnico", "Mantenimiento de servidores", "Configuración de equipos"],
    scene: { caption: "Módulo reparado. Sistema en orden", tone: "ok" },
  },
];

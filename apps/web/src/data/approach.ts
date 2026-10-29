import type { Principle } from "./types";

export const principles: Principle[] = [
  {
    id: "negocio",
    kicker: "Principio 1",
    title: "Soluciones adaptadas al negocio",
    text: "Partimos de cómo trabajas, no de un catálogo. Cada solución se diseña a la medida de tu operación y encaja con lo que ya tienes.",
    figure: "fit",
    figureCaption: ["Fig. 1", "Encaje a medida"],
  },
  {
    id: "detalle",
    kicker: "Principio 2",
    title: "Atención al detalle técnico",
    text: "Cada conexión, configuración y decisión se revisa con precisión, para que lo que no ves funcione como debe.",
    figure: "precision",
    figureCaption: ["Fig. 2", "Medida exacta"],
    reversed: true,
  },
  {
    id: "crecimiento",
    kicker: "Principio 3",
    title: "Capacidad de crecimiento",
    text: "Dejamos espacio para lo que viene: lo que construimos hoy puede ampliarse sin empezar de cero.",
    figure: "growth",
    figureCaption: ["Fig. 3", "Espacio para crecer"],
  },
];

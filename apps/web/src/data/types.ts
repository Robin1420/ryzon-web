export type NavItem = { id: string; label: string; href: string };

export type SceneTone = "neutral" | "alert" | "ok";

export type Service = {
  id: string;
  index: string;
  /** Nombre corto para la pestaña. */
  short: string;
  label: string;
  title: string;
  description: string;
  benefit: string;
  note?: string;
  /** Temas que la gente busca y que este servicio cubre; se muestran como etiquetas legibles. */
  topics: string[];
  /** Leyenda que acompaña a la escena del diagrama. */
  scene: { caption: string; tone: SceneTone };
};

export type FigureId = "fit" | "precision" | "growth";

export type Principle = {
  id: string;
  kicker: string;
  title: string;
  text: string;
  figure: FigureId;
  figureCaption: [string, string];
  reversed?: boolean;
};

export type Faq = { q: string; a: string };

export type LegalSection = { title: string; body: string };

/** Documento legal de una app de Ryzon; `slug` es el último tramo de su dirección. */
export type LegalDocument = {
  slug: string;
  title: string;
  description: string;
  /** Fecha de la última actualización, ya escrita para leerse. */
  updated: string;
  sections: LegalSection[];
};

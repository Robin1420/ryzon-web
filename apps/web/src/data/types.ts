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

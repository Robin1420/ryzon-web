/** Geometría del diagrama de servicios (viewBox 800 × 640). Solo datos, sin lógica de dibujo. */
export const VIEWBOX = { w: 800, h: 640 } as const;
export const CENTER = { x: 400, y: 320 } as const;

export type NodeId = "hub" | "n1" | "n2" | "n3" | "n4" | "n5" | "n6" | "n7" | "n8";

export const NODES: Record<NodeId, readonly [number, number]> = {
  hub: [400, 320],
  n1: [230, 200],
  n2: [570, 190],
  n3: [210, 430],
  n4: [590, 440],
  n5: [400, 120],
  n6: [400, 540],
  n7: [130, 320],
  n8: [670, 320],
};

export const LINKS: ReadonlyArray<readonly [NodeId, NodeId]> = [
  ["hub", "n1"], ["hub", "n2"], ["hub", "n3"], ["hub", "n4"],
  ["n1", "n5"], ["n2", "n5"], ["n3", "n6"], ["n4", "n6"],
  ["n1", "n7"], ["n3", "n7"], ["n2", "n8"], ["n4", "n8"],
];

/** Nodo que falla en la escena 2 y se repara en la escena 4. */
export const FAULT_NODE: NodeId = "n4";
export const FAULT_LINK_INDEX = 3;

/** Marco común de cada capa (en coordenadas planas). */
export const FRAME = { x: 95, y: 60, w: 610, h: 520 } as const;
export const FRAME_CORNERS: ReadonlyArray<readonly [number, number]> = [
  [FRAME.x, FRAME.y],
  [FRAME.x + FRAME.w, FRAME.y],
  [FRAME.x + FRAME.w, FRAME.y + FRAME.h],
  [FRAME.x, FRAME.y + FRAME.h],
];

export type Rect = { x: number; y: number; w: number; h: number };

export const SYSTEM_MODULES: readonly Rect[] = [
  { x: 135, y: 120, w: 160, h: 190 },
  { x: 320, y: 120, w: 160, h: 190 },
  { x: 505, y: 120, w: 160, h: 190 },
  { x: 135, y: 330, w: 160, h: 190 },
  { x: 320, y: 330, w: 160, h: 190 },
];
/** Módulo que está sobre el nodo con falla. */
export const FAULT_MODULE: Rect = { x: 505, y: 330, w: 160, h: 190 };
export const FAULT_OFFSET = { x: 28, y: -24 } as const;

export const APP_BARS: readonly Rect[] = [
  { x: 135, y: 130, w: 530, h: 85 },
  { x: 135, y: 255, w: 530, h: 85 },
  { x: 135, y: 380, w: 530, h: 85 },
];
export const APP_CHIPS = APP_BARS.flatMap((bar, row) =>
  Array.from({ length: 6 }, (_, k) => ({ x: 155 + k * 36, y: bar.y + 34 + (row === 1 ? -2 : 0), opacity: 0.85 - k * 0.1 })),
);

/** Etiquetas de capa, de abajo hacia arriba. */
export const LAYER_LABELS = ["RED", "SISTEMAS", "APLICACIONES"] as const;

export const ISO = { scale: 0.34, squash: 0.5, angle: 45, rise: 150 } as const;

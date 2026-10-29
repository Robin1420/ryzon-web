import { APP_BARS, CENTER, FAULT_MODULE, FRAME, LINKS, NODES, SYSTEM_MODULES, type NodeId, type Rect } from "./diagram";

/** Unidades del plano 2D por unidad de mundo 3D. */
const U = 60;
export type V3 = [number, number, number];

export const toWorld = ([x, y]: readonly [number, number]): V3 => [(x - CENTER.x) / U, 0, (y - CENTER.y) / U];

/** Caja (centro y tamaño) a partir de un rectángulo plano. */
export const rectToBox = (r: Rect, height: number): { pos: V3; size: V3 } => ({
  pos: [(r.x + r.w / 2 - CENTER.x) / U, height / 2, (r.y + r.h / 2 - CENTER.y) / U],
  size: [r.w / U, height, r.h / U],
});

export const PLATE = { w: FRAME.w / U, d: FRAME.h / U, h: 0.06 } as const;
export const LAYER_GAP = 2.2;

export const NODE_LIST = (Object.keys(NODES) as NodeId[]).filter((id) => id !== "hub").map((id) => ({ id, pos: toWorld(NODES[id]) }));
export const HUB: V3 = toWorld(NODES.hub);
export const LINK_LIST = LINKS.map(([a, b]) => ({ a: toWorld(NODES[a]), b: toWorld(NODES[b]) }));

export const SYSTEM_BOXES = SYSTEM_MODULES.map((m, i) => ({ ...rectToBox(m, 0.5 + (i % 3) * 0.12), delay: i * 0.05 }));
export const FAULT_BOX = rectToBox(FAULT_MODULE, 0.5);
export const FAULT_OFFSET: V3 = [0.5, 0.45, -0.4];
export const APP_BOXES = APP_BARS.map((b, i) => ({ ...rectToBox(b, 0.34), delay: i * 0.05 }));
export const APP_CHIP_LIST = APP_BARS.flatMap((bar, row) =>
  Array.from({ length: 6 }, (_, k): V3 => [(bar.x + 22 + k * 36 - CENTER.x) / U, 0.42, (bar.y + bar.h / 2 - CENTER.y) / U + (row === 1 ? 0 : 0)]),
);

export const PLATE_CORNERS: Array<[number, number]> = [
  [-PLATE.w / 2, -PLATE.d / 2], [PLATE.w / 2, -PLATE.d / 2], [PLATE.w / 2, PLATE.d / 2], [-PLATE.w / 2, PLATE.d / 2],
];

/* ---------- Figuras de "Nuestro enfoque" ---------- */
const FIG = 50;
const tile = (x: number, y: number, w: number, h: number, depth: number) => ({
  pos: [(x + w / 2 - 240) / FIG, depth / 2, (y + h / 2 - 180) / FIG] as V3,
  size: [w / FIG, depth, h / FIG] as V3,
});

/** Fig. 1: cinco piezas que encajan; la última tiene forma de L (hecha a medida). */
export const FIT_TILES = [
  { ...tile(40, 30, 180, 140, 0.7), kind: "light", from: [-4, 5, -3], spin: -0.4 },
  { ...tile(220, 30, 220, 90, 0.35), kind: "line", from: [5, 4, -4], spin: 0.5 },
  { ...tile(220, 120, 110, 210, 1.1), kind: "dark", from: [0.5, 6, 6], spin: 0.3 },
  { ...tile(40, 170, 180, 160, 0.35), kind: "line", from: [-6, 4, 3], spin: -0.5 },
] as const;
/** L: contorno en coordenadas 2D del plano; la vista lo extruye. */
export const FIT_L_OUTLINE: Array<[number, number]> = [[330, 120], [440, 120], [440, 330], [330, 330], [330, 250], [390, 250], [390, 200], [330, 200]];
export const FIT_L = { toLocal: ([x, y]: [number, number]): [number, number] => [(x - 240) / FIG, (180 - y) / FIG], depth: 0.7, from: [6, 6, 4] as V3, spin: 0.6 };

/** Fig. 2: escala graduada (72 divisiones) y posición exacta marcada en rojo. */
export const DIAL = { ticks: 72, rInner: 2.85, rShort: 3.05, rLong: 3.3, ringA: 1.24, ringB: 2.04, markAngle: (-40 * Math.PI) / 180 };

/** Fig. 3: módulos que crecen y un espacio reservado para el siguiente. */
export const GROWTH = { sizes: [0.6, 0.92, 1.32, 1.8], slot: 2.4, gap: 0.3 };

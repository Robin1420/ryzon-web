/** Geometría de las figuras 3D de "Nuestro enfoque". */
export type V3 = [number, number, number];

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
export const FIT_L_OUTLINE: Array<[number, number]> = [[330, 120], [440, 120], [440, 330], [330, 330], [330, 250], [390, 250], [390, 200], [330, 200]];
export const FIT_L = { toLocal: ([x, y]: [number, number]): [number, number] => [(x - 240) / FIG, (180 - y) / FIG], depth: 0.7, from: [6, 6, 4] as V3, spin: 0.6 };

/** Fig. 2: escala graduada (72 divisiones) y posición exacta marcada en rojo. */
export const DIAL = { ticks: 72, rInner: 2.85, rShort: 3.05, rLong: 3.3, ringA: 1.24, ringB: 2.04, markAngle: (-40 * Math.PI) / 180 };

/** Fig. 3: módulos que crecen y un espacio reservado para el siguiente. */
export const GROWTH = { sizes: [0.6, 0.92, 1.32, 1.8], slot: 2.4, gap: 0.3 };

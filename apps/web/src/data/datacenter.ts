/** Escena del data center: hilera de racks (el modelo se repite) con el frente hacia +x. Unidades del modelo. */
export type V3 = [number, number, number];

export const RACK = { count: 5, pitch: 2.2, height: 5.15, front: 0.97, main: 2 } as const;
export const rackZ = (i: number) => (i - (RACK.count - 1) / 2) * RACK.pitch;

/** Equipo central de red sobre la hilera y troncal que baja a cada rack. */
export const HUB: V3 = [0.2, 7.4, 0];
export const BUS_Y = 6.3;
export const RACK_TOP_Y = RACK.height + 0.1;

/** Unidad del rack que falla en la escena 2 y se repara en la 4. */
export const FAULT_UNIT = { y: 1.1, h: 0.27, w: 1.44, depth: 1.15 } as const;

/** Capas de aplicaciones que se elevan desde la laptop (escena 3). */
export const LAPTOP: V3 = [1.7, 3.3, 0];
export const UI_LAYERS = [
  { y: 4.1, delay: 0 },
  { y: 4.9, delay: 0.18 },
  { y: 5.7, delay: 0.36 },
] as const;
export const UI_SIZE = { x: 2.6, z: 1.9 } as const;
export const UI_CENTER_X = 2.3;

export const SCAN = { x: 0.3, w: 3.4, d: 2.0 } as const;

type Key = { t: number; pos: V3; look: V3 };
const WIDE: Pick<Key, "pos" | "look"> = { pos: [15.5, 6.8, 7.6], look: [0, 3.2, 0] };
/** Recorrido de la cámara: pasa por cada zona del modelo según avanza el scroll (t de 0 a 4). */
export const CAMERA_KEYS: Key[] = [
  { t: 0, ...WIDE },
  { t: 0.95, ...WIDE },
  { t: 1.35, pos: [9.2, 3.9, 5], look: [1, 2.5, 0] },
  { t: 1.95, pos: [9.2, 3.9, 5], look: [1, 2.5, 0] },
  { t: 2.4, pos: [10, 5.8, 6.4], look: [2.2, 4, 0] },
  { t: 2.9, pos: [10, 5.8, 6.4], look: [2.2, 4, 0] },
  { t: 3.2, pos: [7, 2.4, 3.8], look: [1.1, 1.3, 0] },
  { t: 3.5, pos: [7, 2.4, 3.8], look: [1.1, 1.3, 0] },
  { t: 3.95, ...WIDE },
  { t: 4, ...WIDE },
];

/** Etiquetas ancladas a un punto del modelo; aparecen mientras su escena está activa. */
export const LABELS = [
  { name: "REDES", note: "Todo conectado", at: [0.2, 7.5, 1.6] as V3, from: 0.3, to: 1.3 },
  { name: "MONITOREO", note: "Falla detectada", at: [1.0, 1.1, 1.0] as V3, from: 1.55, to: 2.3 },
  { name: "SOFTWARE", note: "Capas sobre el sistema", at: [UI_CENTER_X, 5.9, 1.1] as V3, from: 2.6, to: 3.2 },
  { name: "SOPORTE", note: "Reparado, en orden", at: [1.0, 1.1, -0.9] as V3, from: 3.3, to: 4.01 },
] as const;

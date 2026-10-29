/** Geometría de las figuras 3D de "Nuestro enfoque", en las mismas unidades del rack. */
export type V3 = [number, number, number];

/** Altura de una unidad de rack (U) y medidas del gabinete. */
export const U = 0.43;
export const CABINET = { x: 1.7, y: 5.15, z: 1.9 } as const;
export const FRONT_X = 0.97;

/** Fig. 1: módulos de distinta altura que se acomodan en un rack; el último se hace a la medida. */
export type SlabKind = "line" | "light" | "dark" | "custom";
const SLAB_GAP = 0.06;
const SLAB_SPEC: Array<{ units: number; kind: SlabKind; from: V3; spin: number }> = [
  { units: 1, kind: "line", from: [5, 1, 3], spin: 0.5 },
  { units: 2, kind: "light", from: [6, -1, -3], spin: -0.4 },
  { units: 1, kind: "line", from: [5, 2, 2.5], spin: 0.3 },
  { units: 3, kind: "dark", from: [6, 1, -2.5], spin: -0.5 },
  { units: 1, kind: "line", from: [5, -1, 3.5], spin: 0.4 },
  { units: 2, kind: "custom", from: [7, 3, 0], spin: 0.6 },
];
export const FIT_SLABS = (() => {
  let y = 0.25;
  return SLAB_SPEC.map((s) => {
    const h = s.units * U - SLAB_GAP;
    const slab = { ...s, size: [1.3, h, 1.6] as V3, y: y + h / 2 };
    y += s.units * U;
    return slab;
  });
})();
/** Pestaña de fijación que hace "a medida" al último módulo. */
export const FIT_TAB: { size: V3; offset: V3 } = { size: [0.18, 0.5, 0.5], offset: [0.74, 0, 0.55] };

/** Fig. 2: escala de unidades de rack (12 divisiones) y la unidad marcada en rojo. */
export const SCALE = { x: FRONT_X, z: -1.3, ticks: 12, marked: 5 } as const;

/** Desplazamiento de cada escena para centrarla en el cuadro (también lo usan sus etiquetas). */
export const PRECISION_OFFSET: V3 = [-0.7, -2.7, 0.3];
export const GROWTH_OFFSET: V3 = [0, -2.4, 0];

/** Fig. 3: racks que se suman y un espacio reservado para el siguiente. */
export const GROWTH = { pitch: 2.4, built: 2, slots: 3 } as const;
export const growthZ = (i: number) => (i - (GROWTH.slots - 1) / 2) * GROWTH.pitch;

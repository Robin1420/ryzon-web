/** Marcas de la escala graduada de la Fig. 2 (anillo de 72 divisiones). */
export const TICKS = Array.from({ length: 72 }, (_, i) => {
  const a = (i / 72) * Math.PI * 2;
  const long = i % 6 === 0;
  const r1 = 142;
  const r2 = long ? 164 : 152;
  return {
    x1: 240 + Math.cos(a) * r1,
    y1: 180 + Math.sin(a) * r1,
    x2: 240 + Math.cos(a) * r2,
    y2: 180 + Math.sin(a) * r2,
    long,
  };
});

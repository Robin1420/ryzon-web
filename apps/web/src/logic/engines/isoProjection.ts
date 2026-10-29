import { CENTER, FRAME_CORNERS, ISO, LAYER_LABELS } from "@/data/diagram";

/**
 * Proyección isométrica del diagrama: con t = 0 la red está plana; con t = 1 las tres capas
 * quedan rotadas, aplastadas y apiladas. Escribe atributos SVG directamente (se llama en cada fotograma).
 */
export function createIsoRenderer(root: Element) {
  const one = (sel: string) => root.querySelector(sel);
  const all = (sel: string) => Array.from(root.querySelectorAll(sel));
  const layers = [0, 1, 2].map((i) => one(`[data-el="layer"][data-layer="${i}"]`));
  const cn = FRAME_CORNERS.map((_, k) => [0, 1].map((i) => one(`[data-el="cn"][data-corner="${k}"][data-seg="${i}"]`)));
  const spine = [0, 1].map((i) => one(`[data-el="spine"][data-seg="${i}"]`));
  const dots = all('[data-el="spinedot"]');
  const labels = LAYER_LABELS.map((_, i) => one(`[data-el="lbl"][data-i="${i}"]`));

  const params = (t: number, i: number) => ({
    s: 1 - ISO.scale * t,
    sy: 1 - ISO.squash * t,
    a: (ISO.angle * t * Math.PI) / 180,
    cy: CENTER.y + ISO.rise * t - i * ISO.rise * t,
  });
  const point = (x: number, y: number, i: number, t: number) => {
    const { s, sy, a, cy } = params(t, i);
    const dx = x - CENTER.x, dy = y - CENTER.y;
    return [CENTER.x + s * (dx * Math.cos(a) - dy * Math.sin(a)), cy + s * sy * (dx * Math.sin(a) + dy * Math.cos(a))] as const;
  };
  const set = (el: Element | null | undefined, a: Record<string, number | string>) => {
    if (el) for (const k in a) el.setAttribute(k, String(a[k]));
  };

  return function render(t: number) {
    layers.forEach((g, i) => {
      const { s, sy, cy } = params(t, i);
      const ang = ISO.angle * t;
      g?.setAttribute("transform", `translate(${CENTER.x} ${cy}) scale(${s} ${s * sy}) rotate(${ang}) translate(${-CENTER.x} ${-CENTER.y})`);
    });
    FRAME_CORNERS.forEach(([x, y], k) => {
      for (let i = 0; i < 2; i++) {
        const a = point(x, y, i, t), b = point(x, y, i + 1, t);
        set(cn[k][i], { x1: a[0], y1: a[1], x2: b[0], y2: b[1] });
      }
    });
    for (let i = 0; i < 2; i++) {
      const a = point(CENTER.x, CENTER.y, i, t), b = point(CENTER.x, CENTER.y, i + 1, t);
      set(spine[i], { x1: a[0], y1: a[1], x2: b[0], y2: b[1] });
    }
    dots.forEach((d, i) => { const p = point(CENTER.x, CENTER.y, i, t); set(d, { x: p[0] - 3, y: p[1] - 3 }); });
    labels.forEach((g, i) => {
      const [fx, fy] = FRAME_CORNERS[1];
      const p = point(fx, fy, i, t);
      set(g?.querySelector('[data-part="l"]'), { x1: p[0] + 3, y1: p[1], x2: p[0] + 18, y2: p[1] });
      set(g?.querySelector('[data-part="x"]'), { x: p[0] + 24, y: p[1] + 4 });
    });
  };
}

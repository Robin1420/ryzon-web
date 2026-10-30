import { currentTheme, palette } from "@ryzon/tokens";
import { clamp, lerp, seeded } from "../utils/math";

type Node = { hx: number; hy: number; x: number; y: number; vx: number; vy: number; ph: number; r: number; big: boolean };
type Signal = { a: Node; b: Node; k: number };

/** Red de nodos del inicio: flota sola, huye del cursor y manda paquetes de señal. */
export function createHeroNetwork() {
  let W = 0, H = 0, small = false, last = 0;
  let nodes: Node[] = [];
  let signals: Signal[] = [];
  let pairs: Array<[Node, Node]> = [];
  const mouse = { x: -9999, y: -9999 };

  const linkDistance = () => (small ? 120 : 150);

  return {
    resize(w: number, h: number, isSmall: boolean) {
      W = w; H = h; small = isSmall;
      const r = seeded(7);
      const count = small ? 34 : Math.round(clamp((w * h) / 15000, 40, 92));
      nodes = Array.from({ length: count }, () => {
        const hx = r() * W, hy = r() * H;
        return { hx, hy, x: hx, y: hy, vx: 0, vy: 0, ph: r() * 6.28, r: 1.2 + r() * 1.6, big: r() < 0.09 };
      });
      signals = []; pairs = [];
    },
    setMouse(x: number, y: number) { mouse.x = x; mouse.y = y; },
    clearMouse() { mouse.x = mouse.y = -9999; },

    update(t: number, dt: number) {
      for (const n of nodes) {
        const tx = n.hx + Math.sin(t * 0.0003 + n.ph) * 14;
        const ty = n.hy + Math.cos(t * 0.00027 + n.ph * 1.3) * 14;
        const dx = n.x - mouse.x, dy = n.y - mouse.y, d = Math.hypot(dx, dy);
        if (d < 190 && d > 0.1) { const f = Math.pow(1 - d / 190, 2) * 2.2; n.vx += (dx / d) * f; n.vy += (dy / d) * f; }
        n.vx += (tx - n.x) * 0.02; n.vy += (ty - n.y) * 0.02;
        n.vx *= 0.87; n.vy *= 0.87; n.x += n.vx; n.y += n.vy;
      }
      if (t - last > 420 && signals.length < 6 && pairs.length) {
        const p = pairs[(Math.random() * pairs.length) | 0];
        signals.push({ a: p[0], b: p[1], k: 0 }); last = t;
      }
      for (const s of signals) s.k += dt * 0.0014;
      signals = signals.filter((s) => s.k < 1);
    },

    draw(ctx: CanvasRenderingContext2D) {
      ctx.clearRect(0, 0, W, H);
      const c = palette[currentTheme()];
      const L = linkDistance();
      pairs = [];
      ctx.lineWidth = 1;
      for (let i = 0; i < nodes.length; i++) for (let j = i + 1; j < nodes.length; j++) {
        const a = nodes[i], b = nodes[j], d = Math.hypot(a.x - b.x, a.y - b.y);
        if (d < L) {
          ctx.strokeStyle = `rgba(${c.inkRgb},${(1 - d / L) * 0.34})`;
          ctx.beginPath(); ctx.moveTo(a.x, a.y); ctx.lineTo(b.x, b.y); ctx.stroke();
          pairs.push([a, b]);
        }
      }
      // Líneas hacia el cursor; el nodo más cercano se marca en rojo.
      let near: Node | null = null, nd = 1e9;
      for (const n of nodes) {
        const d = Math.hypot(n.x - mouse.x, n.y - mouse.y);
        if (d < 210) {
          ctx.strokeStyle = `rgba(${c.inkRgb},${(1 - d / 210) * 0.5})`;
          ctx.beginPath(); ctx.moveTo(mouse.x, mouse.y); ctx.lineTo(n.x, n.y); ctx.stroke();
          if (d < nd) { nd = d; near = n; }
        }
      }
      for (const n of nodes) {
        ctx.fillStyle = n === near ? c.red : `rgba(${c.inkRgb},.88)`;
        const s = n.big ? n.r * 2.2 : n.r;
        if (n.big) ctx.fillRect(n.x - s, n.y - s, s * 2, s * 2);
        else { ctx.beginPath(); ctx.arc(n.x, n.y, n === near ? s * 1.8 : s, 0, 6.283); ctx.fill(); }
      }
      if (near) { ctx.strokeStyle = `rgba(${c.redRgb},.7)`; ctx.beginPath(); ctx.arc(near.x, near.y, 9, 0, 6.283); ctx.stroke(); }
      ctx.fillStyle = c.ink;
      for (const s of signals) ctx.fillRect(lerp(s.a.x, s.b.x, s.k) - 2, lerp(s.a.y, s.b.y, s.k) - 2, 4, 4);
    },
  };
}

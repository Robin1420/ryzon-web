import { colors } from "@ryzon/tokens";
import { clamp, easeInOutCubic, lerp, seeded } from "../utils/math";

/** Escena de contacto: una red dispersa que converge en un solo punto rojo según el avance `p` (0–1). */
export function createCondenseScene() {
  let W = 0, H = 0, small = false;
  let nodes: Array<{ x: number; y: number; r: number; big: boolean }> = [];

  return {
    resize(w: number, h: number, isSmall: boolean) {
      W = w; H = h; small = isSmall;
      const r = seeded(23);
      nodes = Array.from({ length: small ? 34 : 72 }, () => ({ x: r() * W, y: r() * H, r: 1.2 + r() * 1.8, big: r() < 0.1 }));
    },

    /** Dibuja el fotograma y devuelve lo que la vista necesita mostrar. */
    draw(ctx: CanvasRenderingContext2D, p: number, time: number, animate: boolean) {
      const e = easeInOutCubic(clamp(p / 0.78, 0, 1));
      const cx = W / 2, cy = H * 0.42;
      ctx.clearRect(0, 0, W, H);

      const pts = nodes.map((n) => {
        const dx = n.x - cx, dy = n.y - cy, r0 = Math.hypot(dx, dy), a = Math.atan2(dy, dx) + e * 1.7, r = r0 * (1 - e);
        return { x: cx + Math.cos(a) * r, y: cy + Math.sin(a) * r, r: n.r * (1 - e * 0.7), big: n.big };
      });
      const L = (small ? 120 : 170) * (1 - e * 0.5);
      ctx.lineWidth = 1;
      for (let i = 0; i < pts.length; i++) for (let j = i + 1; j < pts.length; j++) {
        const d = Math.hypot(pts[i].x - pts[j].x, pts[i].y - pts[j].y);
        if (d < L) {
          ctx.strokeStyle = `rgba(255,255,255,${(1 - d / L) * 0.34 * (1 - e * e)})`;
          ctx.beginPath(); ctx.moveTo(pts[i].x, pts[i].y); ctx.lineTo(pts[j].x, pts[j].y); ctx.stroke();
        }
      }
      ctx.fillStyle = "rgba(255,255,255,.9)";
      for (const n of pts) {
        if (n.big) ctx.fillRect(n.x - n.r * 1.6, n.y - n.r * 1.6, n.r * 3.2, n.r * 3.2);
        else { ctx.beginPath(); ctx.arc(n.x, n.y, Math.max(n.r, 0.01), 0, 6.283); ctx.fill(); }
      }

      const dp = clamp((p - 0.66) / 0.22, 0, 1);
      if (dp > 0) {
        ctx.strokeStyle = `rgba(255,255,255,${0.22 * dp})`;
        ctx.beginPath();
        ctx.moveTo(cx - 90 * dp, cy); ctx.lineTo(cx + 90 * dp, cy);
        ctx.moveTo(cx, cy - 90 * dp); ctx.lineTo(cx, cy + 90 * dp);
        ctx.stroke();
        ctx.fillStyle = colors.red; ctx.beginPath(); ctx.arc(cx, cy, 11 * dp, 0, 6.283); ctx.fill();
        if (animate) {
          const k = (time / 1000 % 2.4) / 2.4;
          ctx.strokeStyle = `rgba(244,6,18,${(1 - k) * 0.6 * dp})`;
          ctx.beginPath(); ctx.arc(cx, cy, 11 + k * 46, 0, 6.283); ctx.stroke();
        }
      }
      return {
        textProgress: clamp((p - 0.74) / 0.16, 0, 1),
        nodeCount: Math.max(1, Math.round(lerp(nodes.length, 1, e))),
      };
    },
  };
}

import { gsap } from "./gsapSetup";
import type { FigureId } from "@/data/types";

type ST = ScrollTrigger.Vars;

const center = { transformOrigin: "50% 50%" };

/** Cada composición se ensambla pieza por pieza mientras se hace scroll. */
const builders: Record<FigureId, (q: (s: string) => Element[], st: ST) => gsap.core.Timeline> = {
  fit(q, st) {
    const tl = gsap.timeline({ scrollTrigger: st });
    const offs = [[-150, -100, -8], [170, -90, 10], [10, 190, 6], [-170, 130, -10], [200, 130, 14]];
    q("[data-piece]").forEach((el, i) =>
      tl.from(el, { x: offs[i][0], y: offs[i][1], rotation: offs[i][2], opacity: 0, ...center, duration: 1, ease: "power3.out" }, i * 0.28),
    );
    return tl;
  },
  precision(q, st) {
    return gsap.timeline({ scrollTrigger: st })
      .from(q('[data-piece="axis-x"]'), { scaleX: 0, ...center, duration: 1 }, 0)
      .from(q('[data-piece="axis-y"]'), { scaleY: 0, ...center, duration: 1 }, 0)
      .from(q("[data-tick]"), { opacity: 0, duration: 0.3, stagger: { each: 0.018, from: "start" } }, 0.3)
      .from(q('[data-piece="ring-outer"]'), { opacity: 0, scale: 0.4, ...center, duration: 0.8, ease: "power3.out" }, 0.8)
      .from(q('[data-piece="ring-inner"]'), { opacity: 0, scale: 0.3, ...center, duration: 0.8, ease: "power3.out" }, 1.0)
      .from(q('[data-piece="core"]'), { scale: 0, ...center, duration: 0.4 }, 1.3)
      .from(q('[data-piece="radius"]'), { opacity: 0, duration: 0.3 }, 1.7)
      .from(q('[data-piece="mark"]'), { scale: 0, ...center, duration: 0.4, ease: "back.out(3)" }, 1.9);
  },
  growth(q, st) {
    const tl = gsap.timeline({ scrollTrigger: st });
    tl.from(q('[data-piece="base"]'), { scaleX: 0, transformOrigin: "0% 50%", duration: 0.8 }, 0);
    q("[data-module]").forEach((el, i) =>
      tl.from(el, { scale: 0, y: 20, transformOrigin: "0% 100%", opacity: 0, duration: 0.55, ease: "power3.out" }, 0.4 + i * 0.3),
    );
    return tl
      .from(q('[data-piece="diag"]'), { opacity: 0, duration: 0.5 }, 1.3)
      .from(q('[data-piece="slot"]'), { opacity: 0, scale: 0.6, transformOrigin: "0% 100%", duration: 0.6, ease: "power3.out" }, 1.7)
      .from(q('[data-piece="next"]'), { scale: 0, ...center, duration: 0.4, ease: "back.out(3)" }, 2.2);
  },
};

export function buildFigureTimeline(id: FigureId, figure: Element) {
  const q = (s: string) => Array.from(figure.querySelectorAll(s));
  return builders[id](q, { trigger: figure, start: "top 82%", end: "center 48%", scrub: 0.7 });
}

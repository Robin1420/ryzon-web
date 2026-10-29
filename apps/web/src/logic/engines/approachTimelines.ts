import { gsap } from "./gsapSetup";
import { figureScene } from "./sceneState";
import type { FigureId } from "@/data/types";

/** Cada figura 3D se ensambla según el avance (0–1) del scroll mientras cruza la pantalla. */
export function buildFigureTimeline(id: FigureId, figure: Element) {
  figureScene[id].p = 0;
  return gsap.fromTo(
    figureScene[id],
    { p: 0 },
    { p: 1, ease: "none", scrollTrigger: { trigger: figure, start: "top 85%", end: "center 45%", scrub: 0.7 } },
  );
}

export const completeFigures = () => { (Object.keys(figureScene) as FigureId[]).forEach((k) => (figureScene[k].p = 1)); };

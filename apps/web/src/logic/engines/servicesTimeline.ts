import { gsap } from "./gsapSetup";
import { servicesScene } from "./sceneState";

/**
 * Línea de tiempo de las cuatro escenas (duración total = 4, una unidad por escena):
 *  0–1 los nodos se conectan · 1–2 un pulso rojo detecta una falla ·
 *  2–3 se apilan capas de software · 3–4 un módulo se repara y el sistema queda en orden.
 * La escena 3D lee `servicesScene.t`; aquí solo se mueve ese valor y se cruzan textos y leyendas.
 */
export function buildServicesTimeline(root: HTMLElement) {
  const all = (sel: string) => Array.from(root.querySelectorAll(sel));
  const tl = gsap.timeline({ defaults: { ease: "none" } });

  servicesScene.t = 0;
  tl.fromTo(servicesScene, { t: 0 }, { t: 4, duration: 4 }, 0);

  const panels = all("[data-panel]");
  const caps = all("[data-cap]");
  [panels, caps].forEach((group, g) => {
    group.forEach((node, i) => {
      if (i > 0) tl.fromTo(node, { opacity: 0, y: g === 0 ? 28 : 0 }, { opacity: 1, y: 0, duration: g === 0 ? 0.16 : 0.12, immediateRender: false }, i - 0.02);
      if (i < group.length - 1) tl.to(node, { opacity: 0, y: g === 0 ? -28 : 0, duration: g === 0 ? 0.14 : 0.1 }, i + (g === 0 ? 0.84 : 0.88));
    });
    gsap.set(group.slice(1), { opacity: 0 });
  });
  gsap.set(panels[0], { opacity: 1 });
  return tl;
}

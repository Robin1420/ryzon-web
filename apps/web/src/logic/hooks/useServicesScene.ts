"use client";
import { useState, type RefObject } from "react";
import { motion } from "@ryzon/tokens";
import { gsap, ScrollTrigger, useGSAP } from "../engines/gsapSetup";
import { buildServicesTimeline } from "../engines/servicesTimeline";
import { registerServicesScroller } from "../services/servicesScroller";
import { clamp } from "../utils/math";

const SCENES = 4;

/**
 * Sección fija con cuatro escenas. Devuelve la escena activa (0–3) para la vista;
 * el avance fino de cada pestaña se escribe en `--p` sin re-renderizar.
 */
export function useServicesScene(stage: RefObject<HTMLElement | null>) {
  const [scene, setScene] = useState(0);

  useGSAP(
    () => {
      const root = stage.current;
      if (!root) return;
      const mm = gsap.matchMedia();
      mm.add({ full: motion.fullQuery, lite: motion.liteQuery, rm: motion.reducedQuery }, (ctx) => {
        const { lite, rm } = ctx.conditions as { lite: boolean; rm: boolean };
        const tl = buildServicesTimeline(root);
        if (rm) { tl.progress(1); return; }

        const st = ScrollTrigger.create({
          animation: tl,
          trigger: root,
          start: "top top",
          end: () => "+=" + Math.round(window.innerHeight * (lite ? 3.2 : 4)),
          pin: true,
          scrub: 0.6,
          anticipatePin: 1,
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            const p = self.progress;
            const sc = clamp(Math.floor(p * SCENES + 0.1), 0, SCENES - 1);
            setScene(sc);
            root.querySelectorAll<HTMLElement>("[data-tab]").forEach((tab, i) => {
              const bar = tab.querySelector<HTMLElement>("[data-bar]");
              bar?.style.setProperty("--p", String(i < sc ? 1 : i === sc ? clamp(p * SCENES - sc, 0, 1) : 0));
            });
          },
        });
        registerServicesScroller((i) =>
          window.scrollTo({ top: st.start + (st.end - st.start) * ((i + 0.9) / SCENES), behavior: "smooth" }),
        );
        return () => registerServicesScroller(null);
      });
      return () => mm.revert();
    },
    { scope: stage },
  );

  return scene;
}

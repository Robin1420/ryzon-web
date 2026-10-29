"use client";
import { type RefObject } from "react";
import { motion } from "@ryzon/tokens";
import type { FigureId } from "@/data/types";
import { buildFigureTimeline } from "../engines/approachTimelines";
import { gsap, useGSAP } from "../engines/gsapSetup";

/** Cada `[data-figure]` de la sección se ensambla con el scroll (en movimiento reducido queda armada). */
export function useApproachFigures(section: RefObject<HTMLElement | null>) {
  useGSAP(
    () => {
      const root = section.current;
      if (!root) return;
      const mm = gsap.matchMedia();
      mm.add(motion.noPreferenceQuery, () => {
        root.querySelectorAll<HTMLElement>("[data-figure]").forEach((fig) => buildFigureTimeline(fig.dataset.figure as FigureId, fig));
      });
      return () => mm.revert();
    },
    { scope: section },
  );
}

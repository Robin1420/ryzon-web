"use client";
import { motion } from "@ryzon/tokens";
import { gsap, ScrollTrigger, useGSAP } from "../engines/gsapSetup";

/**
 * Movimiento transversal de la página (titulares con máscara, apariciones, entrada del inicio
 * y botones magnéticos). Todo depende de atributos `data-*` en la vista:
 *  data-split · data-word · data-reveal · data-hero-fade · data-hero-content · data-hero-canvas · data-mag
 */
export function usePageMotion() {
  useGSAP(() => {
    const mm = gsap.matchMedia();
    mm.add({ ok: motion.noPreferenceQuery, fine: motion.finePointerQuery, wide: motion.fullQuery }, (ctx) => {
      const { ok, fine, wide } = ctx.conditions as { ok: boolean; fine: boolean; wide: boolean };
      if (!ok) return;

      document.querySelectorAll<HTMLElement>("[data-split]").forEach((h) => {
        const words = h.querySelectorAll("[data-word]");
        gsap.set(words, { yPercent: 118 });
        const reveal = { yPercent: 0, duration: 1.1, stagger: 0.055, ease: "power4.out" };
        if (h.closest("#inicio")) gsap.to(words, { ...reveal, delay: 0.25 });
        else ScrollTrigger.create({ trigger: h, start: "top 85%", once: true, onEnter: () => gsap.to(words, reveal) });
      });

      gsap.from("[data-hero-fade]", { opacity: 0, y: 24, duration: 1, stagger: 0.12, delay: 0.9, ease: "power3.out" });
      gsap.set("[data-reveal]", { opacity: 0 });
      ScrollTrigger.batch("[data-reveal]", {
        start: "top 88%", once: true,
        onEnter: (els) => gsap.fromTo(els, { opacity: 0, y: 22 }, { opacity: 1, y: 0, duration: 0.9, stagger: 0.1, ease: "power3.out" }),
      });

      gsap.to("[data-hero-content]", { yPercent: -12, opacity: 0.2, ease: "none", scrollTrigger: { trigger: "#inicio", start: "top top", end: "bottom top", scrub: true } });
      gsap.to("[data-hero-canvas]", { opacity: 0.15, ease: "none", scrollTrigger: { trigger: "#inicio", start: "30% top", end: "bottom top", scrub: true } });

      if (fine && wide) {
        document.querySelectorAll<HTMLElement>("[data-mag]").forEach((el) => {
          const qx = gsap.quickTo(el, "x", { duration: 0.5, ease: "power3" }), qy = gsap.quickTo(el, "y", { duration: 0.5, ease: "power3" });
          el.addEventListener("pointermove", (e) => { const r = el.getBoundingClientRect(); qx((e.clientX - r.left - r.width / 2) * 0.18); qy((e.clientY - r.top - r.height / 2) * 0.3); });
          el.addEventListener("pointerleave", () => { qx(0); qy(0); });
        });
      }
    });
    return () => mm.revert();
  });
}

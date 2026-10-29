import { colors } from "@ryzon/tokens";
import { FAULT_OFFSET, NODES, FAULT_NODE } from "@/data/diagram";
import { gsap } from "./gsapSetup";
import { createIsoRenderer } from "./isoProjection";

/**
 * Línea de tiempo de las cuatro escenas del diagrama (duración total = 4, una unidad por escena):
 *  0–1 los nodos se conectan · 1–2 un pulso rojo detecta una falla ·
 *  2–3 se apilan capas de software · 3–4 un módulo se repara y el sistema queda en orden.
 * Los elementos se localizan con atributos `data-*` de la vista.
 */
export function buildServicesTimeline(root: HTMLElement) {
  const one = (sel: string) => root.querySelector(sel) as Element;
  const all = (sel: string) => Array.from(root.querySelectorAll(sel));
  const el = (name: string) => one(`[data-el="${name}"]`);
  const els = (name: string) => all(`[data-el="${name}"]`);

  const iso = { t: 0 };
  const render = createIsoRenderer(root);
  render(0);

  const links = els("link");
  const lk4 = links[3];
  const lk4r = el("link-fault");
  const nodeGs = els("node");
  const n4c = one(`[data-el="dot"][data-node="${FAULT_NODE}"]`);
  const n4ring = one(`[data-el="ring"][data-node="${FAULT_NODE}"]`);
  const [fx, fy] = NODES[FAULT_NODE];
  const [hx, hy] = NODES.hub;
  const lbls = els("lbl");
  const conn = el("conn");
  const tag = el("tag");
  const l1mods = els("mod-1");
  const l2mods = els("mod-2");
  const m6in = el("fault-in");

  gsap.set([tag, conn, ...lbls], { opacity: 0 });

  const tl = gsap.timeline({ defaults: { ease: "none" } });

  // Escena 1: los nodos se conectan
  tl.to(el("ghost"), { opacity: 0, duration: 0.35 }, 0.25);
  tl.fromTo(el("hub"), { scale: 0, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.14, ease: "back.out(2)" }, 0.02);
  tl.fromTo(nodeGs, { scale: 0, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.12, stagger: 0.04, ease: "power2.out" }, 0.1);
  tl.fromTo(links, { strokeDashoffset: 1 }, { strokeDashoffset: 0, duration: 0.22, stagger: 0.04, ease: "power1.inOut" }, 0.18);

  // Escena 2: un pulso rojo detecta una falla
  tl.fromTo(el("radar"), { attr: { r: 8 }, opacity: 0.9 }, { attr: { r: 400 }, opacity: 0, duration: 0.5, ease: "power1.out", immediateRender: false }, 1.0);
  tl.fromTo(el("radar2"), { attr: { r: 8 }, opacity: 0.5 }, { attr: { r: 400 }, opacity: 0, duration: 0.5, ease: "power1.out", immediateRender: false }, 1.14);
  tl.set(el("pulse"), { opacity: 1 }, 1.3);
  tl.fromTo(el("pulse"), { attr: { cx: hx, cy: hy } }, { attr: { cx: fx, cy: fy }, duration: 0.38, ease: "power2.in", immediateRender: false }, 1.3);
  tl.set(el("pulse"), { opacity: 0 }, 1.69);
  tl.to(n4c, { fill: colors.red, stroke: colors.red, duration: 0.1 }, 1.66);
  tl.to(n4ring, { stroke: colors.red, duration: 0.1 }, 1.66);
  tl.fromTo(el("alert"), { attr: { r: 10 }, opacity: 0.95 }, { attr: { r: 46 }, opacity: 0, duration: 0.3, ease: "power1.out", immediateRender: false }, 1.68);
  tl.fromTo(el("alert2"), { attr: { r: 10 }, opacity: 0.6 }, { attr: { r: 46 }, opacity: 0, duration: 0.3, ease: "power1.out", immediateRender: false }, 1.82);
  tl.to(lk4, { opacity: 0, duration: 0.08 }, 1.68);
  tl.to(lk4r, { opacity: 1, duration: 0.08 }, 1.68);
  tl.fromTo(tag, { opacity: 0, x: -8 }, { opacity: 1, x: 0, duration: 0.12, immediateRender: false }, 1.74);
  tl.to(tag, { opacity: 0, duration: 0.1 }, 1.95);

  // Escena 3: se apilan capas de software
  tl.fromTo(iso, { t: 0 }, { t: 1, duration: 0.85, ease: "power2.inOut", onUpdate: () => render(iso.t), immediateRender: false }, 2.0);
  tl.fromTo(el("frame-0"), { opacity: 0 }, { opacity: 1, duration: 0.3 }, 2.0);
  tl.fromTo(el("frame-1"), { opacity: 0 }, { opacity: 1, duration: 0.25 }, 2.4);
  tl.fromTo(l1mods, { opacity: 0, scale: 0.6 }, { opacity: 1, scale: 1, duration: 0.18, stagger: 0.05, ease: "power2.out" }, 2.5);
  tl.fromTo(el("frame-2"), { opacity: 0 }, { opacity: 1, duration: 0.25 }, 2.55);
  tl.fromTo(l2mods, { opacity: 0, scale: 0.7 }, { opacity: 1, scale: 1, duration: 0.14, stagger: 0.03, ease: "power2.out" }, 2.65);
  tl.fromTo(conn, { opacity: 0 }, { opacity: 1, duration: 0.25, immediateRender: false }, 2.6);
  tl.fromTo(lbls, { opacity: 0 }, { opacity: 1, duration: 0.15, stagger: 0.08, immediateRender: false }, 2.75);

  // Escena 4: un módulo se repara y el sistema queda en orden
  tl.set(m6in, { x: FAULT_OFFSET.x, y: FAULT_OFFSET.y }, 0);
  tl.to(m6in, { x: 0, y: 0, duration: 0.35, ease: "power3.inOut" }, 3.1);
  tl.to(el("fault-bad"), { opacity: 0, duration: 0.15 }, 3.4);
  tl.to(el("fault-ok"), { opacity: 1, duration: 0.15 }, 3.4);
  tl.to(n4c, { fill: colors.bg, stroke: colors.white, duration: 0.15 }, 3.4);
  tl.to(n4ring, { stroke: "rgba(255,255,255,.18)", duration: 0.15 }, 3.4);
  tl.to(lk4r, { opacity: 0, duration: 0.08 }, 3.42);
  tl.to(lk4, { opacity: 1, duration: 0.08 }, 3.42);
  tl.fromTo(lk4, { strokeDashoffset: 1 }, { strokeDashoffset: 0, duration: 0.25, ease: "power1.inOut", immediateRender: false }, 3.42);
  tl.fromTo(el("okdot"), { opacity: 0 }, { opacity: 1, duration: 0.1, immediateRender: false }, 3.7);
  tl.fromTo(el("okwave"), { attr: { r: 12 }, opacity: 0.8 }, { attr: { r: 90 }, opacity: 0, duration: 0.3, ease: "power1.out", immediateRender: false }, 3.7);

  // Texto y leyendas de cada escena
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

  tl.to({}, { duration: 0.0001 }, 3.9999); // fija la duración total en 4
  return tl;
}

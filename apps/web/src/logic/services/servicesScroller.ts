/**
 * Puente entre quien pide "ir al servicio N" (inicio, pestañas) y la sección fija que sabe
 * cuánto hay que desplazarse. La sección se registra al montarse.
 */
type Scroller = (index: number) => void;
let scroller: Scroller | null = null;

export function registerServicesScroller(fn: Scroller | null) { scroller = fn; }

export function scrollToService(index: number) {
  if (scroller) scroller(index);
  else document.getElementById("servicios")?.scrollIntoView({ behavior: "smooth" });
}

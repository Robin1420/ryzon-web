import s from "./figures.module.css";

/** Fig. 1 — piezas de distinto tamaño que encajan; la última, con borde rojo, es la hecha a medida. */
export function FitFigure() {
  return (
    <svg viewBox="0 0 480 360" role="img" aria-label="Piezas de distinto tamaño que encajan en un marco; la última, con borde rojo, tiene una forma hecha a medida.">
      <rect className={s.faint} x={40} y={30} width={400} height={300} />
      <rect data-piece className={s.solid} x={40} y={30} width={180} height={140} />
      <rect data-piece className={s.line} x={220} y={30} width={220} height={90} />
      <rect data-piece className={s.dark} x={220} y={120} width={110} height={210} />
      <rect data-piece className={s.line} x={40} y={170} width={180} height={160} />
      <path data-piece className={s.red} d="M330 120H440V330H330V250H390V200H330Z" />
    </svg>
  );
}

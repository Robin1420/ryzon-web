import s from "./figures.module.css";

const MODULES = [
  { x: 36, y: 270, size: 30, fill: "rgba(255,255,255,.12)" },
  { x: 80, y: 254, size: 46, fill: "rgba(255,255,255,.28)" },
  { x: 140, y: 234, size: 66, fill: "rgba(255,255,255,.5)" },
  { x: 220, y: 210, size: 90, fill: "#f1f1f1" },
];

/** Fig. 3 — módulos que crecen sobre una línea base y un espacio vacío reservado para el siguiente. */
export function GrowthFigure() {
  return (
    <svg viewBox="0 0 480 360" role="img" aria-label="Módulos cuadrados que crecen de tamaño sobre una línea base, con un espacio vacío reservado para el siguiente.">
      <line data-piece="base" className={s.faint} x1={20} y1={300} x2={460} y2={300} />
      <line data-piece="diag" className={`${s.faint} ${s.dash}`} x1={36} y1={270} x2={444} y2={180} />
      {MODULES.map((m) => <rect key={m.x} data-module className={s.line} x={m.x} y={m.y} width={m.size} height={m.size} style={{ fill: m.fill }} />)}
      <rect data-piece="slot" className={`${s.line} ${s.dash}`} x={324} y={180} width={120} height={120} />
      <rect data-piece="next" className={s.redFill} x={434} y={170} width={20} height={20} />
    </svg>
  );
}

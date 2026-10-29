import { TICKS } from "@/data/precision";
import s from "./figures.module.css";

/** Fig. 2 — escala graduada con círculos concéntricos y un punto rojo en la medida exacta. */
export function PrecisionFigure() {
  return (
    <svg viewBox="0 0 480 360" role="img" aria-label="Círculos concéntricos con una escala graduada y un punto rojo marcando una posición exacta.">
      <line data-piece="axis-x" className={s.faint} x1={14} y1={180} x2={466} y2={180} />
      <line data-piece="axis-y" className={s.faint} x1={240} y1={8} x2={240} y2={352} />
      <g>
        {TICKS.map((t, i) => (
          <line key={i} data-tick x1={t.x1} y1={t.y1} x2={t.x2} y2={t.y2} stroke={t.long ? "rgba(255,255,255,.75)" : "rgba(255,255,255,.35)"} strokeWidth={1} vectorEffect="non-scaling-stroke" />
        ))}
      </g>
      <circle data-piece="ring-outer" className={`${s.line} ${s.dash}`} cx={240} cy={180} r={102} />
      <circle data-piece="ring-inner" className={s.line} cx={240} cy={180} r={62} />
      <line data-piece="radius" className={s.line} x1={240} y1={180} x2={317} y2={114} />
      <rect data-piece="core" className={s.solid} x={228} y={168} width={24} height={24} />
      <circle data-piece="mark" className={s.redFill} cx={317} cy={114} r={6} />
    </svg>
  );
}

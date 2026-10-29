import { APP_BARS, APP_CHIPS, FAULT_LINK_INDEX, FAULT_MODULE, FAULT_NODE, FRAME, FRAME_CORNERS, LAYER_LABELS, LINKS, NODES, SYSTEM_MODULES, VIEWBOX, type NodeId } from "@/data/diagram";
import s from "./ServiceDiagram.module.css";

const [hubX, hubY] = NODES.hub;
const [faultX, faultY] = NODES[FAULT_NODE];

/**
 * Vista pura del diagrama. No anima nada: los `data-el` / `data-*` son el contrato con
 * `logic/engines/servicesTimeline.ts` y `isoProjection.ts`.
 */
export function ServiceDiagram() {
  return (
    <svg className={s.svg} viewBox={`0 0 ${VIEWBOX.w} ${VIEWBOX.h}`} role="img" aria-labelledby="dia-t dia-d" preserveAspectRatio="xMidYMid meet">
      <title id="dia-t">Diagrama animado de una red de nodos</title>
      <desc id="dia-d">Los nodos se conectan, un pulso rojo detecta una falla en un nodo, se apilan capas de software sobre la red y el módulo con falla se repara dejando el sistema en orden.</desc>

      <g data-el="ghost">
        {Object.entries(NODES).map(([id, [x, y]]) => <circle key={id} className={s.ghost} cx={x} cy={y} r={2.5} />)}
      </g>

      {/* Capa 0: red */}
      <g data-el="layer" data-layer="0">
        <rect data-el="frame-0" className={s.frame} x={FRAME.x} y={FRAME.y} width={FRAME.w} height={FRAME.h} />
        {LINKS.map(([a, b], i) => (
          <line key={i} data-el="link" className={s.ln} pathLength={1} x1={NODES[a][0]} y1={NODES[a][1]} x2={NODES[b][0]} y2={NODES[b][1]} data-fault={i === FAULT_LINK_INDEX || undefined} />
        ))}
        <line data-el="link-fault" className={s.lnr} x1={hubX} y1={hubY} x2={faultX} y2={faultY} />
        {(Object.keys(NODES) as NodeId[]).map((id) => {
          const [x, y] = NODES[id];
          return id === "hub" ? (
            <g key={id} data-el="hub">
              <rect className={s.rg} x={x - 20} y={y - 20} width={40} height={40} />
              <rect className={s.hub} x={x - 11} y={y - 11} width={22} height={22} />
            </g>
          ) : (
            <g key={id} data-el="node" data-node={id}>
              <circle data-el="ring" data-node={id} className={s.rg} cx={x} cy={y} r={16} />
              <circle data-el="dot" data-node={id} className={s.nd} cx={x} cy={y} r={7.5} />
            </g>
          );
        })}
        <circle data-el="radar" className={s.wave} cx={hubX} cy={hubY} r={8} />
        <circle data-el="radar2" className={s.wave} cx={hubX} cy={hubY} r={8} />
        <circle data-el="alert" className={s.wave} cx={faultX} cy={faultY} r={10} />
        <circle data-el="alert2" className={s.wave} cx={faultX} cy={faultY} r={10} />
        <circle data-el="pulse" className={s.pulse} cx={hubX} cy={hubY} r={5} />
        <rect data-el="okdot" x={hubX - 5} y={hubY - 5} width={10} height={10} fill="var(--rz-red)" opacity={0} />
        <circle data-el="okwave" className={s.wave} cx={hubX} cy={hubY} r={12} />
      </g>

      {/* Capa 1: sistemas */}
      <g data-el="layer" data-layer="1">
        <rect data-el="frame-1" className={`${s.frame} ${s.up}`} x={FRAME.x} y={FRAME.y} width={FRAME.w} height={FRAME.h} />
        {SYSTEM_MODULES.map((m, i) => <rect key={i} data-el="mod-1" className={s.mod} x={m.x} y={m.y} width={m.w} height={m.h} />)}
        <g data-el="mod-1">
          <g data-el="fault-in">
            <g data-el="fault-bad">
              <rect className={s.bad} x={FAULT_MODULE.x} y={FAULT_MODULE.y} width={FAULT_MODULE.w} height={FAULT_MODULE.h} />
              <line className={s.badx} x1={FAULT_MODULE.x} y1={FAULT_MODULE.y} x2={FAULT_MODULE.x + FAULT_MODULE.w} y2={FAULT_MODULE.y + FAULT_MODULE.h} />
              <line className={s.badx} x1={FAULT_MODULE.x + FAULT_MODULE.w} y1={FAULT_MODULE.y} x2={FAULT_MODULE.x} y2={FAULT_MODULE.y + FAULT_MODULE.h} />
            </g>
            <rect data-el="fault-ok" className={s.okm} x={FAULT_MODULE.x} y={FAULT_MODULE.y} width={FAULT_MODULE.w} height={FAULT_MODULE.h} opacity={0} />
          </g>
        </g>
      </g>

      {/* Capa 2: aplicaciones */}
      <g data-el="layer" data-layer="2">
        <rect data-el="frame-2" className={`${s.frame} ${s.up}`} x={FRAME.x} y={FRAME.y} width={FRAME.w} height={FRAME.h} />
        {APP_BARS.map((b, i) => <rect key={i} data-el="mod-2" className={s.bar} x={b.x} y={b.y} width={b.w} height={b.h} />)}
        {APP_CHIPS.map((c, i) => <rect key={i} data-el="mod-2" className={s.chip} x={c.x} y={c.y} width={14} height={14} opacity={c.opacity} />)}
      </g>

      {/* Conectores entre capas */}
      <g data-el="conn">
        {FRAME_CORNERS.map((_, k) => [0, 1].map((i) => <line key={`${k}-${i}`} data-el="cn" data-corner={k} data-seg={i} className={s.cn} />))}
        {[0, 1].map((i) => <line key={i} data-el="spine" data-seg={i} className={s.spine} />)}
        {[0, 1, 2].map((i) => <rect key={i} data-el="spinedot" width={6} height={6} fill="#fff" />)}
      </g>

      {/* Etiquetas */}
      <g>
        {LAYER_LABELS.map((t, i) => (
          <g key={t} data-el="lbl" data-i={i}>
            <line data-part="l" className={s.cn} strokeDasharray="none" />
            <text data-part="x" className={s.txt}>{t}</text>
          </g>
        ))}
        <g data-el="tag">
          <line x1={faultX + 6} y1={faultY + 6} x2={faultX + 40} y2={faultY + 38} stroke="var(--rz-red)" strokeWidth={1} />
          <text className={`${s.txt} ${s.txtBad}`} x={faultX + 46} y={faultY + 42}>FALLA · NODO 04</text>
        </g>
      </g>
    </svg>
  );
}

"use client";
import { useFrame, useThree } from "@react-three/fiber";
import { useMemo, type RefObject } from "react";
import * as THREE from "three";
import type { V3 } from "@/data/datacenter";
import { seg, smooth } from "@/logic/engines/sceneState";
import { clamp } from "@/logic/utils/math";
import s from "./AnchorSync.module.css";

export type Anchor = { name: string; note: string; at: V3; from: number; to: number };

/**
 * Proyecta cada ancla 3D a pantalla y mueve su etiqueta DOM (que vive fuera del lienzo).
 * La etiqueta se ve entre `from` y `to` según el avance que devuelva `progress`.
 */
export function AnchorSync({ anchors, labels, progress }: { anchors: readonly Anchor[]; labels: RefObject<Array<HTMLDivElement | null>>; progress: () => number }) {
  const { camera, size } = useThree();
  const v = useMemo(() => new THREE.Vector3(), []);
  useFrame(() => {
    const p = progress();
    anchors.forEach((a, i) => {
      const el = labels.current?.[i];
      if (!el) return;
      v.set(...a.at).project(camera);
      const x = clamp((v.x * 0.5 + 0.5) * size.width, 10, size.width - 150), y = clamp((-v.y * 0.5 + 0.5) * size.height, 30, size.height - 50);
      el.style.transform = `translate(${x}px, ${y}px) translateY(-50%)`;
      el.style.opacity = String(smooth(seg(p, a.from, a.from + 0.15)) * (1 - smooth(seg(p, a.to - 0.15, a.to))));
    });
  });
  return null;
}

/** Etiquetas DOM de las anclas; se mueven con `AnchorSync`. */
export function anchorLabels(anchors: readonly Anchor[], refs: RefObject<Array<HTMLDivElement | null>>) {
  return anchors.map((a, i) => (
    <div key={a.name} ref={(el) => { refs.current[i] = el; }} className={s.label} aria-hidden="true">
      <b>{a.name}</b>
      <span>{a.note}</span>
    </div>
  ));
}

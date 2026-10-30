"use client";
import { useFrame } from "@react-three/fiber";
import { useMemo, useRef, type ReactNode } from "react";
import * as THREE from "three";
import type { V3 } from "@/data/datacenter";
import { useTheme } from "@/logic/hooks/useTheme";

export const RED = new THREE.Color("#F40612");
/** "Tinta" de las escenas: blanco en modo oscuro, casi negro en modo claro (se actualiza con el tema). */
export const WHITE = new THREE.Color("#ffffff");

export type ScenePalette = {
  edge: string; ink: string; fog: string; grid: [string, string];
  part: string; hub: string; ui: string; slabLight: string; slabDark: string; slabLine: string;
  customFill: string; faultFill: string; okFill: string;
};
const PALETTES: Record<"dark" | "light", ScenePalette> = {
  dark: { edge: "#ffffff", ink: "#ffffff", fog: "#050505", grid: ["#2c2c2c", "#171717"], part: "#0c0c0c", hub: "#161616", ui: "#0d0d0d", slabLight: "#f1f1f1", slabDark: "#1c1c1c", slabLine: "#0a0a0a", customFill: "#4a0509", faultFill: "#3a0508", okFill: "#404040" },
  light: { edge: "#0b0b0c", ink: "#0b0b0c", fog: "#f6f5f2", grid: ["#cfcdc7", "#e2e0da"], part: "#e6e4de", hub: "#dcdad4", ui: "#e9e7e1", slabLight: "#2a2b2e", slabDark: "#cfcdc7", slabLine: "#ecebe6", customFill: "#f7c8cb", faultFill: "#f4c6c9", okFill: "#cfcdc7" },
};

/** Paleta de la escena según el tema activo. */
export function useScenePalette(): ScenePalette {
  const { theme } = useTheme();
  const p = PALETTES[theme];
  WHITE.set(p.ink);
  return p;
}

type Api = { group: THREE.Group; fill: THREE.MeshStandardMaterial; edge: THREE.LineBasicMaterial };
type PartProps = {
  size: V3;
  pos: V3;
  fill?: string;
  fillOpacity?: number;
  edge?: string;
  edgeOpacity?: number;
  /** Opaco: escribe profundidad (para piezas pequeñas que no deben verse a través). */
  solid?: boolean;
  /** Se llama en cada fotograma. Devuelve la visibilidad (0–1) o nada para dejarla fija. */
  update?: (api: Api) => number | void;
};

/** Caja con relleno y aristas nítidas: el lenguaje visual de todas las escenas. */
export function Part({ size, pos, fill, fillOpacity = 0.9, edge, edgeOpacity = 0.6, solid, update }: PartProps) {
  const pal = useScenePalette();
  const group = useRef<THREE.Group>(null);
  const fillMat = useRef<THREE.MeshStandardMaterial>(null);
  const edgeMat = useRef<THREE.LineBasicMaterial>(null);
  const edges = useMemo(() => new THREE.EdgesGeometry(new THREE.BoxGeometry(...size)), [size]);

  useFrame(() => {
    if (!group.current || !fillMat.current || !edgeMat.current) return;
    const k = update?.({ group: group.current, fill: fillMat.current, edge: edgeMat.current });
    const v = typeof k === "number" ? k : 1;
    group.current.visible = v > 0.002;
    fillMat.current.opacity = fillOpacity * v;
    edgeMat.current.opacity = edgeOpacity * v;
  });

  return (
    <group ref={group} position={pos}>
      <mesh>
        <boxGeometry args={size} />
        <meshStandardMaterial ref={fillMat} color={fill ?? pal.part} transparent depthWrite={!!solid} roughness={0.55} metalness={0.2} />
      </mesh>
      <lineSegments geometry={edges}>
        <lineBasicMaterial ref={edgeMat} color={edge ?? pal.edge} transparent />
      </lineSegments>
    </group>
  );
}

/** Inclina suavemente el conjunto hacia el puntero. */
export function Sway({ amount = 0.25, children }: { amount?: number; children: ReactNode }) {
  const g = useRef<THREE.Group>(null);
  useFrame(({ pointer }, dt) => {
    if (!g.current) return;
    const k = 1 - Math.pow(0.001, dt);
    g.current.rotation.y += (pointer.x * amount - g.current.rotation.y) * k;
    g.current.rotation.x += (-pointer.y * amount * 0.5 - g.current.rotation.x) * k;
  });
  return <group ref={g}>{children}</group>;
}

export function Lights() {
  return (
    <>
      <ambientLight intensity={0.8} />
      <directionalLight position={[6, 10, 6]} intensity={1.6} />
      <directionalLight position={[-6, 4, -4]} intensity={0.5} />
    </>
  );
}

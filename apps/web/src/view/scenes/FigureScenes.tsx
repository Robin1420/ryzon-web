"use client";
import { useFrame } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import * as THREE from "three";
import { CABINET, FIT_SLABS, FIT_TAB, FRONT_X, GROWTH, GROWTH_OFFSET, PRECISION_OFFSET, SCALE, U, growthZ, type V3 } from "@/data/figures";
import { cloneRack } from "@/logic/engines/rackModel";
import { easeOut, figureScene, seg, smooth } from "@/logic/engines/sceneState";
import { useRackModel } from "@/logic/hooks/useRackModel";
import { AnchorSync, anchorLabels, type Anchor } from "./AnchorSync";
import { Lights, Part, Sway, useScenePalette } from "./parts";
import { SceneCanvas } from "./SceneCanvas";

const lerp3 = (a: readonly number[], b: readonly number[], k: number) => [a[0] + (b[0] - a[0]) * k, a[1] + (b[1] - a[1]) * k, a[2] + (b[2] - a[2]) * k] as const;
const wire = (size: V3) => new THREE.EdgesGeometry(new THREE.BoxGeometry(...size));
const RED_HEX = "#F40612";

/** Contorno de un gabinete de rack (sin relleno). */
function Cabinet({ z = 0, opacity = 0.35, update }: { z?: number; opacity?: number; update?: (m: THREE.LineBasicMaterial) => void }) {
  const pal = useScenePalette();
  const geo = useMemo(() => wire([CABINET.x, CABINET.y, CABINET.z]), []);
  const mat = useRef<THREE.LineBasicMaterial>(null);
  useFrame(() => { if (mat.current) update?.(mat.current); });
  return (
    <lineSegments geometry={geo} position={[0, CABINET.y / 2, z]}>
      <lineBasicMaterial ref={mat} color={pal.edge} transparent opacity={opacity} />
    </lineSegments>
  );
}

/** Copia del rack del modelo; sube desde el piso entre `a` y `b` del avance. */
function RackCopy({ z, a, b, progress }: { z: number; a: number; b: number; progress: () => number }) {
  const source = useRackModel();
  const g = useRef<THREE.Group>(null);
  const rack = useMemo(() => (source ? cloneRack(source, false).rack : null), [source]);
  useFrame(() => {
    if (!g.current) return;
    const k = easeOut(seg(progress(), a, b));
    g.current.position.y = -7 * (1 - k);
    g.current.visible = k > 0.003;
  });
  return rack ? <group ref={g} position={[0, 0, z]}><primitive object={rack} /></group> : null;
}

/* ---------- Fig. 1: módulos que se acomodan en un rack; el último se hace a la medida ---------- */
const fitProgress = () => figureScene.fit.p;

function Slab({ i }: { i: number }) {
  const pal = useScenePalette();
  const s = FIT_SLABS[i];
  const custom = s.kind === "custom";
  const place = (group: THREE.Group, offset: V3 = [0, 0, 0]) => {
    const k = easeOut(seg(fitProgress(), 0.12 + i * 0.13, 0.6 + i * 0.13));
    const [x, y, z] = lerp3(s.from, [0, 0, 0], k);
    group.position.set(x + offset[0], s.y + y + offset[1], z + offset[2]);
    group.rotation.y = s.spin * (1 - k);
    return Math.min(1, k * 3);
  };
  const fill = s.kind === "light" ? pal.slabLight : s.kind === "dark" ? pal.slabDark : custom ? pal.customFill : pal.slabLine;
  const edge = custom ? RED_HEX : pal.edge;
  return (
    <>
      <Part pos={[0, s.y, 0]} size={s.size} fill={fill} fillOpacity={s.kind === "line" ? 0.75 : 1} edge={edge} edgeOpacity={s.kind === "light" ? 0 : 0.85} update={({ group }) => place(group)} />
      {custom && <Part pos={[0, s.y, 0]} size={FIT_TAB.size} fill={pal.customFill} fillOpacity={0.9} edge={RED_HEX} edgeOpacity={1} update={({ group }) => place(group, FIT_TAB.offset)} />}
    </>
  );
}

export function FitScene() {
  return (
    <SceneCanvas label="Un rack al que se acomodan módulos de distintos tamaños; el último, en rojo, tiene una forma hecha a la medida." camera={{ position: [8, 4.4, 8.6], fov: 30 }}>
      <Lights />
      <Sway amount={0.25}>
        <group position-y={-CABINET.y / 2}>
          <Cabinet update={(m) => { m.opacity = 0.4 * smooth(seg(fitProgress(), 0, 0.15)); }} />
          {FIT_SLABS.map((_, i) => <Slab key={i} i={i} />)}
        </group>
      </Sway>
    </SceneCanvas>
  );
}

/* ---------- Fig. 2: cada unidad se mide; una queda marcada en rojo ---------- */
const precisionProgress = () => figureScene.precision.p;
const PRECISION_ANCHORS: readonly Anchor[] = [
  { name: "DETALLE", note: "Cada unidad, medida", at: [SCALE.x + PRECISION_OFFSET[0], U * (SCALE.marked + 0.5) + PRECISION_OFFSET[1], SCALE.z - 0.2 + PRECISION_OFFSET[2]], from: 0.65, to: 1.01 },
];

function Ruler() {
  const pal = useScenePalette();
  const spine = useRef<THREE.Mesh>(null);
  const ticks = useRef<Array<THREE.Mesh | null>>([]);
  const leader = useRef<THREE.Mesh>(null);
  const led = useRef<THREE.Mesh>(null);
  const markY = U * (SCALE.marked + 0.5);
  const leaderLen = Math.abs(SCALE.z) - 0.75;
  useFrame(() => {
    const p = precisionProgress();
    const k = easeOut(seg(p, 0, 0.3));
    if (spine.current) { spine.current.scale.y = Math.max(k, 0.001); spine.current.position.y = (CABINET.y * k) / 2; }
    ticks.current.forEach((t, i) => { if (t) { const a = smooth(seg(p, 0.2 + i * 0.03, 0.32 + i * 0.03)); t.scale.set(Math.max(a, 0.001), 1, 1); } });
    const l = smooth(seg(p, 0.62, 0.8));
    if (leader.current) { leader.current.visible = l > 0.002; leader.current.scale.z = Math.max(l, 0.001); leader.current.position.z = SCALE.z + (leaderLen * l) / 2; }
    const on = smooth(seg(p, 0.78, 0.92));
    if (led.current) { led.current.visible = on > 0.002; (led.current.material as THREE.MeshBasicMaterial).opacity = on * 0.85; }
  });
  return (
    <>
      <mesh ref={spine} position={[SCALE.x, 0, SCALE.z]}>
        <boxGeometry args={[0.025, CABINET.y, 0.025]} />
        <meshBasicMaterial color={pal.edge} transparent opacity={0.7} />
      </mesh>
      {Array.from({ length: SCALE.ticks + 1 }, (_, i) => (
        <mesh key={i} ref={(m) => { ticks.current[i] = m; }} position={[SCALE.x, i * U, SCALE.z + 0.14]}>
          <boxGeometry args={[0.02, 0.02, i % 6 === 0 ? 0.42 : 0.26]} />
          <meshBasicMaterial color={pal.edge} transparent opacity={0.8} />
        </mesh>
      ))}
      <mesh ref={leader} position={[SCALE.x, markY, SCALE.z]}>
        <boxGeometry args={[0.02, 0.02, leaderLen]} />
        <meshBasicMaterial color={RED_HEX} />
      </mesh>
      <mesh ref={led} position={[FRONT_X + 0.02, markY, 0]}>
        <boxGeometry args={[0.02, U * 0.8, 1.44]} />
        <meshBasicMaterial color={RED_HEX} transparent />
      </mesh>
    </>
  );
}

export function PrecisionScene() {
  const labels = useRef<Array<HTMLDivElement | null>>([]);
  return (
    <SceneCanvas overlay={anchorLabels(PRECISION_ANCHORS, labels)} label="Primer plano de un rack con una escala de unidades al costado y una unidad marcada en rojo." camera={{ position: [7.4, 4.2, 7.2], fov: 32 }}>
      <Lights />
      <AnchorSync anchors={PRECISION_ANCHORS} labels={labels} progress={precisionProgress} />
      <Sway amount={0.18}>
        <group position={PRECISION_OFFSET}>
          <RackCopy z={0} a={0} b={0.3} progress={precisionProgress} />
          <Ruler />
        </group>
      </Sway>
    </SceneCanvas>
  );
}

/* ---------- Fig. 3: racks que se suman y espacio reservado para el siguiente ---------- */
const growthProgress = () => figureScene.growth.p;
const GROWTH_ANCHORS: readonly Anchor[] = [
  { name: "CRECIMIENTO", note: "Espacio reservado", at: [GROWTH_OFFSET[0], CABINET.y + 0.9 + GROWTH_OFFSET[1], growthZ(GROWTH.built) + GROWTH_OFFSET[2]], from: 0.78, to: 1.01 },
];

function NextMarker() {
  const m = useRef<THREE.Mesh>(null);
  useFrame(({ clock }) => {
    const k = smooth(seg(growthProgress(), 0.85, 1));
    if (!m.current) return;
    m.current.visible = k > 0.002;
    m.current.scale.setScalar(Math.max(k, 0.001));
    m.current.position.y = CABINET.y + 0.45 + Math.sin(clock.elapsedTime * 2) * 0.06;
  });
  return (
    <mesh ref={m} position={[0, CABINET.y + 0.45, growthZ(GROWTH.built)]}>
      <boxGeometry args={[0.3, 0.3, 0.3]} />
      <meshBasicMaterial color={RED_HEX} />
    </mesh>
  );
}

export function GrowthScene() {
  const pal = useScenePalette();
  const labels = useRef<Array<HTMLDivElement | null>>([]);
  return (
    <SceneCanvas overlay={anchorLabels(GROWTH_ANCHORS, labels)} label="Dos racks construidos y un espacio vacío, reservado, para el siguiente." camera={{ position: [11, 6, 9], fov: 30 }}>
      <Lights />
      <AnchorSync anchors={GROWTH_ANCHORS} labels={labels} progress={growthProgress} />
      <gridHelper key={pal.edge} args={[40, 40, pal.grid[0], pal.grid[1]]} />
      <Sway amount={0.2}>
        <group position={GROWTH_OFFSET}>
          {Array.from({ length: GROWTH.built }, (_, i) => <RackCopy key={i} z={growthZ(i)} a={0.05 + i * 0.25} b={0.45 + i * 0.25} progress={growthProgress} />)}
          <Cabinet z={growthZ(GROWTH.built)} opacity={0} update={(m) => { m.opacity = 0.6 * smooth(seg(growthProgress(), 0.7, 0.88)); }} />
          <NextMarker />
        </group>
      </Sway>
    </SceneCanvas>
  );
}

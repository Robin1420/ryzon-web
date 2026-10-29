"use client";
import { useFrame } from "@react-three/fiber";
import { useEffect, useMemo, useRef } from "react";
import * as THREE from "three";
import { DIAL, FIT_L, FIT_L_OUTLINE, FIT_TILES, GROWTH } from "@/data/scene3d";
import { easeOut, figureScene, seg, smooth } from "@/logic/engines/sceneState";
import { Lights, Part, RED, Sway } from "./parts";
import { SceneCanvas } from "./SceneCanvas";

const lerp3 = (a: readonly number[], b: readonly number[], k: number) => [a[0] + (b[0] - a[0]) * k, a[1] + (b[1] - a[1]) * k, a[2] + (b[2] - a[2]) * k] as const;

/* ---------- Fig. 1: piezas que encajan ---------- */
function LTile() {
  const g = useRef<THREE.Group>(null);
  const geo = useMemo(() => {
    const shape = new THREE.Shape(FIT_L_OUTLINE.map((p) => new THREE.Vector2(...FIT_L.toLocal(p))));
    const e = new THREE.ExtrudeGeometry(shape, { depth: FIT_L.depth, bevelEnabled: false });
    e.rotateX(-Math.PI / 2);
    return e;
  }, []);
  const edges = useMemo(() => new THREE.EdgesGeometry(geo), [geo]);
  const fill = useRef<THREE.MeshStandardMaterial>(null);
  const line = useRef<THREE.LineBasicMaterial>(null);
  useFrame(() => {
    const k = easeOut(seg(figureScene.fit.p, 0.55, 1));
    if (!g.current || !fill.current || !line.current) return;
    const [x, y, z] = lerp3(FIT_L.from, [0, 0, 0], k);
    g.current.position.set(x, y, z);
    g.current.rotation.y = FIT_L.spin * (1 - k);
    fill.current.opacity = 0.6 * Math.min(1, k * 3);
    line.current.opacity = Math.min(1, k * 3);
  });
  return (
    <group ref={g}>
      <mesh geometry={geo}>
        <meshStandardMaterial ref={fill} color="#4a0509" transparent roughness={0.5} />
      </mesh>
      <lineSegments geometry={edges}>
        <lineBasicMaterial ref={line} color="#F40612" transparent />
      </lineSegments>
    </group>
  );
}

export function FitScene() {
  return (
    <SceneCanvas label="Piezas de distinto tamaño que encajan en un marco; la última, en rojo, tiene una forma hecha a medida." camera={{ position: [8.6, 10.4, 12.6], fov: 30 }}>
      <Lights />
      <Sway amount={0.3}>
        <group rotation-y={-0.25}>
          {FIT_TILES.map((t, i) => (
            <Part
              key={i}
              pos={t.pos}
              size={t.size}
              fill={t.kind === "light" ? "#f1f1f1" : t.kind === "dark" ? "#1c1c1c" : "#0a0a0a"}
              fillOpacity={t.kind === "line" ? 0.7 : 1}
              edgeOpacity={t.kind === "light" ? 0 : 0.7}
              update={({ group }) => {
                const k = easeOut(seg(figureScene.fit.p, i * 0.12, i * 0.12 + 0.5));
                const [x, y, z] = lerp3(t.from, [0, 0, 0], k);
                group.position.set(t.pos[0] + x, t.pos[1] + y, t.pos[2] + z);
                group.rotation.y = t.spin * (1 - k);
                return Math.min(1, k * 3);
              }}
            />
          ))}
          <LTile />
        </group>
      </Sway>
    </SceneCanvas>
  );
}

/* ---------- Fig. 2: medida exacta ---------- */
function Dial() {
  const ticks = useRef<THREE.InstancedMesh>(null);
  const ringA = useRef<THREE.Mesh>(null);
  const ringB = useRef<THREE.Mesh>(null);
  const core = useRef<THREE.Mesh>(null);
  const mark = useRef<THREE.Mesh>(null);
  const radius = useRef<THREE.Mesh>(null);
  const spin = useRef<THREE.Group>(null);
  const axes = useRef<THREE.Group>(null);
  const dummy = useMemo(() => new THREE.Object3D(), []);
  const markPos = useMemo(() => new THREE.Vector3(Math.cos(DIAL.markAngle) * DIAL.ringB, 0.1, Math.sin(DIAL.markAngle) * DIAL.ringB), []);

  useEffect(() => {
    if (ticks.current) ticks.current.instanceMatrix.setUsage(THREE.DynamicDrawUsage);
  }, []);

  useFrame(({ clock }) => {
    const p = figureScene.precision.p;
    if (spin.current) spin.current.rotation.y = p * 0.5 + clock.elapsedTime * 0.05;
    if (axes.current) axes.current.scale.setScalar(Math.max(0.001, smooth(seg(p, 0, 0.45))));
    if (ticks.current) {
      for (let i = 0; i < DIAL.ticks; i++) {
        const a = (i / DIAL.ticks) * Math.PI * 2, long = i % 6 === 0;
        const r1 = DIAL.rInner, r2 = long ? DIAL.rLong : DIAL.rShort, len = r2 - r1;
        const k = smooth(seg(p, 0.15 + (i / DIAL.ticks) * 0.35, 0.3 + (i / DIAL.ticks) * 0.35));
        dummy.position.set(Math.cos(a) * (r1 + len / 2), 0, Math.sin(a) * (r1 + len / 2));
        dummy.rotation.set(0, -a, 0);
        dummy.scale.set(Math.max(len * k, 0.0001), k, k);
        dummy.updateMatrix();
        ticks.current.setMatrixAt(i, dummy.matrix);
      }
      ticks.current.instanceMatrix.needsUpdate = true;
    }
    ringB.current?.scale.setScalar(Math.max(0.001, easeOut(seg(p, 0.45, 0.75))));
    ringA.current?.scale.setScalar(Math.max(0.001, easeOut(seg(p, 0.55, 0.85))));
    core.current?.scale.setScalar(Math.max(0.001, smooth(seg(p, 0.7, 0.85))));
    if (radius.current) radius.current.scale.x = Math.max(0.001, smooth(seg(p, 0.8, 0.92)));
    if (mark.current) {
      const k = seg(p, 0.88, 1), drop = (1 - easeOut(k)) * 3;
      mark.current.visible = k > 0;
      mark.current.position.set(markPos.x, markPos.y + drop, markPos.z);
    }
  });

  const R = DIAL.ringB;
  return (
    <group ref={spin}>
      <group ref={axes}>
        <mesh><boxGeometry args={[9, 0.01, 0.01]} /><meshBasicMaterial color="#ffffff" transparent opacity={0.25} /></mesh>
        <mesh><boxGeometry args={[0.01, 0.01, 7.4]} /><meshBasicMaterial color="#ffffff" transparent opacity={0.25} /></mesh>
      </group>
      <instancedMesh ref={ticks} args={[undefined, undefined, DIAL.ticks]}>
        <boxGeometry args={[1, 0.02, 0.025]} />
        <meshBasicMaterial color="#ffffff" transparent opacity={0.75} />
      </instancedMesh>
      <mesh ref={ringB} rotation-x={Math.PI / 2}>
        <torusGeometry args={[R, 0.012, 8, 128]} />
        <meshBasicMaterial color="#ffffff" transparent opacity={0.6} />
      </mesh>
      <mesh ref={ringA} rotation-x={Math.PI / 2}>
        <torusGeometry args={[DIAL.ringA, 0.016, 8, 128]} />
        <meshBasicMaterial color="#ffffff" />
      </mesh>
      <mesh ref={core}>
        <boxGeometry args={[0.5, 0.5, 0.5]} />
        <meshStandardMaterial color="#f1f1f1" roughness={0.4} />
      </mesh>
      <mesh ref={radius} position={[Math.cos(DIAL.markAngle) * R / 2, 0.05, Math.sin(DIAL.markAngle) * R / 2]} rotation-y={-DIAL.markAngle}>
        <boxGeometry args={[R, 0.012, 0.012]} />
        <meshBasicMaterial color="#ffffff" transparent opacity={0.7} />
      </mesh>
      <mesh ref={mark} visible={false}>
        <sphereGeometry args={[0.16, 24, 16]} />
        <meshStandardMaterial color={RED} emissive={RED} emissiveIntensity={0.8} />
      </mesh>
    </group>
  );
}

export function PrecisionScene() {
  return (
    <SceneCanvas label="Círculos concéntricos con una escala graduada y un punto rojo marcando una posición exacta." camera={{ position: [0, 8.6, 8.8], fov: 32 }}>
      <Lights />
      <Sway amount={0.25}>
        <Dial />
      </Sway>
    </SceneCanvas>
  );
}

/* ---------- Fig. 3: espacio para crecer ---------- */
const growthLayout = (() => {
  const { sizes, slot, gap } = GROWTH;
  const total = sizes.reduce((a, b) => a + b, 0) + slot + gap * sizes.length;
  let x = -total / 2;
  const cubes = sizes.map((size) => { const c = { size, x: x + size / 2 }; x += size + gap; return c; });
  return { cubes, slotX: x + slot / 2, left: -total / 2, total };
})();

function NextMarker() {
  const m = useRef<THREE.Mesh>(null);
  useFrame(({ clock }) => {
    const k = smooth(seg(figureScene.growth.p, 0.85, 1));
    if (!m.current) return;
    m.current.visible = k > 0.002;
    m.current.scale.setScalar(Math.max(k, 0.001));
    m.current.position.y = GROWTH.slot + 0.35 + Math.sin(clock.elapsedTime * 2) * 0.05;
  });
  return (
    <mesh ref={m} position={[growthLayout.slotX + GROWTH.slot / 2, GROWTH.slot + 0.35, 0]}>
      <boxGeometry args={[0.32, 0.32, 0.32]} />
      <meshStandardMaterial color={RED} emissive={RED} emissiveIntensity={0.7} />
    </mesh>
  );
}

export function GrowthScene() {
  const greys = ["#2a2a2a", "#555555", "#8a8a8a", "#f1f1f1"];
  return (
    <SceneCanvas label="Módulos cuadrados que crecen de tamaño sobre una línea base, con un espacio vacío reservado para el siguiente." camera={{ position: [7.2, 6.4, 13.8], fov: 30 }}>
      <Lights />
      <Sway amount={0.25}>
        <group position={[0, -1.1, 0]} rotation-y={-0.3}>
          <Part pos={[0, -0.03, 0]} size={[growthLayout.total + 1.2, 0.05, 2.6]} fill="#0a0a0a" fillOpacity={0.6} edgeOpacity={0.35} update={() => smooth(seg(figureScene.growth.p, 0, 0.25))} />
          {growthLayout.cubes.map((c, i) => (
            <Part
              key={i}
              pos={[c.x, c.size / 2, 0]}
              size={[c.size, c.size, c.size]}
              fill={greys[i]}
              fillOpacity={1}
              edgeOpacity={i === 3 ? 0 : 0.7}
              update={({ group }) => {
                const k = easeOut(seg(figureScene.growth.p, 0.15 + i * 0.16, 0.4 + i * 0.16));
                group.scale.set(Math.max(k, 0.001), Math.max(k, 0.001), Math.max(k, 0.001));
                group.position.y = (c.size / 2) * k;
                return Math.min(1, k * 4);
              }}
            />
          ))}
          <Part
            pos={[growthLayout.slotX, GROWTH.slot / 2, 0]}
            size={[GROWTH.slot, GROWTH.slot, GROWTH.slot]}
            fillOpacity={0.06}
            edgeOpacity={0.55}
            update={() => smooth(seg(figureScene.growth.p, 0.7, 0.9))}
          />
          <NextMarker />
        </group>
      </Sway>
    </SceneCanvas>
  );
}

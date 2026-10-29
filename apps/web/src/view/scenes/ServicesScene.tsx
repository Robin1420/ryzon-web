"use client";
import { useFrame, useThree } from "@react-three/fiber";
import { useMemo, useRef, type RefObject } from "react";
import * as THREE from "three";
import { BUS_Y, CAMERA_KEYS, FAULT_UNIT, HUB, LABELS, LAPTOP, RACK, RACK_TOP_Y, SCAN, UI_CENTER_X, UI_LAYERS, UI_SIZE, rackZ, type V3 } from "@/data/datacenter";
import { cloneRack } from "@/logic/engines/rackModel";
import { easeOut, seg, servicesScene, smooth } from "@/logic/engines/sceneState";
import { useRackModel } from "@/logic/hooks/useRackModel";
import { clamp, lerp } from "@/logic/utils/math";
import { Lights, Part, RED, WHITE } from "./parts";
import { SceneCanvas } from "./SceneCanvas";
import s from "./ServicesScene.module.css";

const appear = (a: number, b: number) => () => smooth(seg(servicesScene.t, a, b));

/** Rack del modelo 3D: se "instala" subiendo desde el piso al inicio de la escena 1. */
function Rack({ index, source }: { index: number; source: THREE.Object3D }) {
  const g = useRef<THREE.Group>(null);
  const rack = useMemo(() => cloneRack(source, index === RACK.main), [source, index]);
  useFrame(() => {
    if (!g.current) return;
    const k = easeOut(seg(servicesScene.t, 0.05 + index * 0.07, 0.55 + index * 0.07));
    g.current.position.y = -8 * (1 - k);
    g.current.visible = k > 0.003;
  });
  return <group ref={g} position={[0, 0, rackZ(index)]}><primitive object={rack} /></group>;
}

/** Línea que se dibuja de punta a punta entre dos instantes. Puede cambiar de color (falla). */
function Cable({ from, to, start, end, tint }: { from: V3; to: V3; start: number; end: number; tint?: (t: number) => THREE.Color }) {
  const N = 24;
  const { line, mat } = useMemo(() => {
    const pts = Array.from({ length: N + 1 }, (_, i) => new THREE.Vector3(lerp(from[0], to[0], i / N), lerp(from[1], to[1], i / N), lerp(from[2], to[2], i / N)));
    const mat = new THREE.LineBasicMaterial({ color: "#ffffff", transparent: true, opacity: 0.75 });
    return { line: new THREE.Line(new THREE.BufferGeometry().setFromPoints(pts), mat), mat };
  }, [from, to]);
  useFrame(() => {
    const t = servicesScene.t, k = seg(t, start, end);
    line.geometry.setDrawRange(0, Math.floor(k * (N + 1)));
    line.visible = k > 0;
    if (tint) {
      mat.color.copy(tint(t));
      mat.opacity = tint(t) === RED ? 0.55 + 0.45 * Math.sin(t * 40) ** 2 : 0.75;
    }
  });
  return <primitive object={line} />;
}

const faultActive = (t: number) => t > 1.7 && t < 3.45;
const faultTint = (t: number) => (faultActive(t) ? RED : WHITE);

/** Equipo central, troncal y bajadas a cada rack: la "arquitectura de red". */
function Backbone() {
  const reach = rackZ(RACK.count - 1);
  return (
    <>
      <Part pos={HUB} size={[1.2, 0.36, 1.2]} fill="#161616" fillOpacity={0.9} edgeOpacity={0.9} update={appear(0.15, 0.3)} />
      <Cable from={[HUB[0], HUB[1] - 0.18, HUB[2]]} to={[HUB[0], BUS_Y, HUB[2]]} start={0.28} end={0.4} />
      <Cable from={[HUB[0], BUS_Y, 0]} to={[HUB[0], BUS_Y, reach]} start={0.4} end={0.7} />
      <Cable from={[HUB[0], BUS_Y, 0]} to={[HUB[0], BUS_Y, -reach]} start={0.4} end={0.7} />
      {Array.from({ length: RACK.count }, (_, i) => {
        const z = rackZ(i), d = Math.abs(i - RACK.main);
        return (
          <group key={i}>
            <Cable from={[HUB[0], BUS_Y, z]} to={[HUB[0], RACK_TOP_Y, z]} start={0.62 + d * 0.06} end={0.82 + d * 0.06} tint={i === RACK.main ? faultTint : undefined} />
            <Part pos={[HUB[0], RACK_TOP_Y + 0.08, z]} size={[0.24, 0.16, 0.24]} fill="#ffffff" fillOpacity={1} edgeOpacity={0} solid update={appear(0.8 + d * 0.06, 0.9 + d * 0.06)} />
          </group>
        );
      })}
      <group position={[HUB[0], HUB[1] + 0.42, HUB[2]]}><OkMark /></group>
    </>
  );
}

/** Marca roja de estado sobre el equipo central: aparece cuando todo queda en orden. */
function OkMark() {
  const g = useRef<THREE.Group>(null);
  useFrame(() => {
    const k = smooth(seg(servicesScene.t, 3.75, 3.9));
    if (g.current) { g.current.visible = k > 0.002; g.current.scale.setScalar(Math.max(k, 0.001)); }
  });
  return <group ref={g}><mesh><boxGeometry args={[0.22, 0.22, 0.22]} /><meshBasicMaterial color="#F40612" /></mesh></group>;
}

/** Escena 2: un plano rojo recorre el rack y marca la unidad con falla. */
function Monitoring() {
  const [x, z] = [RACK.front + 0.02, 0];
  const led = useRef<THREE.Mesh>(null);
  useFrame(() => {
    if (!led.current) return;
    const t = servicesScene.t, on = smooth(seg(t, 1.7, 1.8)) * (1 - smooth(seg(t, 3.45, 3.55)));
    led.current.visible = on > 0.002;
    (led.current.material as THREE.MeshBasicMaterial).opacity = on * (0.65 + 0.35 * Math.sin(t * 30) ** 2);
  });
  return (
    <>
      <Part pos={[SCAN.x, 0, 0]} size={[SCAN.w, 0.03, SCAN.d]} fill="#F40612" fillOpacity={0.1} edge="#F40612" edgeOpacity={0.95} update={({ group }) => {
        const t = servicesScene.t, k = seg(t, 1.2, 1.7);
        group.position.y = lerp(0.05, RACK.height, k);
        return smooth(seg(t, 1.15, 1.25)) * (1 - smooth(seg(t, 1.7, 1.8)));
      }} />
      <mesh ref={led} position={[x, FAULT_UNIT.y, z]}>
        <boxGeometry args={[0.02, FAULT_UNIT.h, FAULT_UNIT.w]} />
        <meshBasicMaterial color="#F40612" transparent />
      </mesh>
      {[1.7, 1.86].map((s0, i) => (
        <Part key={i} pos={[x, FAULT_UNIT.y, z]} size={[0.06, FAULT_UNIT.h + 0.1, FAULT_UNIT.w + 0.1]} fill="#F40612" fillOpacity={0} edge="#F40612" edgeOpacity={0.9} update={({ group }) => {
          const k = seg(servicesScene.t, s0, s0 + 0.3);
          group.scale.set(1, 1 + 0.9 * easeOut(k), 1 + 0.5 * easeOut(k));
          return k > 0 && k < 1 ? 1 - k : 0;
        }} />
      ))}
    </>
  );
}

/** Escena 3: capas de aplicación que suben desde la laptop. */
function SoftwareLayers() {
  const connector = useRef<THREE.Mesh>(null);
  const top = UI_LAYERS[UI_LAYERS.length - 1].y;
  useFrame(() => {
    const k = easeOut(seg(servicesScene.t, 2.3, 2.9));
    if (!connector.current) return;
    connector.current.visible = k > 0.003;
    connector.current.scale.y = Math.max((top - LAPTOP[1]) * k, 0.001);
    connector.current.position.y = LAPTOP[1] + ((top - LAPTOP[1]) * k) / 2;
  });
  return (
    <>
      <mesh ref={connector} position={[UI_CENTER_X, LAPTOP[1], 0]}>
        <boxGeometry args={[0.025, 1, 0.025]} />
        <meshBasicMaterial color="#ffffff" transparent opacity={0.5} />
      </mesh>
      {UI_LAYERS.map((l, i) => <UiLayer key={i} y={l.y} delay={l.delay} />)}
    </>
  );
}

function UiLayer({ y, delay }: { y: number; delay: number }) {
  const g = useRef<THREE.Group>(null);
  useFrame(() => {
    if (!g.current) return;
    g.current.position.y = lerp(LAPTOP[1], y, easeOut(seg(servicesScene.t, 2.1 + delay, 2.6 + delay)));
  });
  const vis = appear(2.1 + delay, 2.35 + delay);
  const rows = [-0.55, -0.15, 0.25, 0.65];
  return (
    <group ref={g} position={[UI_CENTER_X, LAPTOP[1], 0]}>
      <Part pos={[0, 0, 0]} size={[UI_SIZE.x, 0.05, UI_SIZE.z]} fill="#0d0d0d" fillOpacity={0.85} edgeOpacity={0.75} update={vis} />
      {rows.map((z, i) => (
        <Part key={i} pos={[-0.35, 0.05, z]} size={[1.5 - (i % 2) * 0.35, 0.04, 0.1]} fill="#ffffff" fillOpacity={0.85} edgeOpacity={0} solid update={vis} />
      ))}
      <Part pos={[0.85, 0.07, -0.55]} size={[0.5, 0.08, 0.35]} fill="#ffffff" fillOpacity={0.2} edgeOpacity={0.8} update={vis} />
    </group>
  );
}

/** Escena 4: la unidad sale, se repara y vuelve a su lugar. */
function RepairUnit() {
  const D = FAULT_UNIT.depth;
  return (
    <Part pos={[RACK.front, FAULT_UNIT.y, 0]} size={[D, FAULT_UNIT.h, FAULT_UNIT.w]} fill="#3a0508" fillOpacity={0.6} edge="#F40612" edgeOpacity={0.95} update={({ group, fill, edge }) => {
      const t = servicesScene.t, slide = smooth(seg(t, 3.05, 3.45)), ok = seg(t, 3.35, 3.5);
      group.position.x = RACK.front - D / 2 + 0.05 + 1.3 * (1 - slide);
      edge.color.copy(RED).lerp(WHITE, ok);
      fill.color.set("#3a0508").lerp(WHITE.clone().multiplyScalar(0.25), ok);
      return smooth(seg(t, 3.0, 3.1)) * (1 - smooth(seg(t, 3.6, 3.75)));
    }} />
  );
}

/** Cámara: recorre el modelo, una zona por área; con pantallas estrechas se aleja un poco. */
function Rig() {
  const { camera, size } = useThree();
  const pos = useMemo(() => new THREE.Vector3(), []);
  const look = useMemo(() => new THREE.Vector3(), []);
  useFrame(({ pointer }) => {
    const t = servicesScene.t, K = CAMERA_KEYS;
    let i = 0;
    while (i < K.length - 2 && t > K[i + 1].t) i++;
    const u = smooth(seg(t, K[i].t, K[i + 1].t));
    pos.set(lerp(K[i].pos[0], K[i + 1].pos[0], u), lerp(K[i].pos[1], K[i + 1].pos[1], u), lerp(K[i].pos[2], K[i + 1].pos[2], u));
    look.set(lerp(K[i].look[0], K[i + 1].look[0], u), lerp(K[i].look[1], K[i + 1].look[1], u), lerp(K[i].look[2], K[i + 1].look[2], u));
    if (size.width / size.height < 1.15) pos.sub(look).multiplyScalar(1.35).add(look);
    camera.position.set(pos.x, pos.y + pointer.y * 0.35, pos.z + pointer.x * 0.5);
    camera.lookAt(look);
  });
  return null;
}

/** Proyecta cada ancla 3D a pantalla y mueve las etiquetas DOM, que viven fuera del lienzo. */
function LabelSync({ labels }: { labels: RefObject<Array<HTMLDivElement | null>> }) {
  const { camera, size } = useThree();
  const v = useMemo(() => new THREE.Vector3(), []);
  useFrame(() => {
    const t = servicesScene.t;
    LABELS.forEach((l, i) => {
      const el = labels.current?.[i];
      if (!el) return;
      v.set(...l.at).project(camera);
      const x = clamp((v.x * 0.5 + 0.5) * size.width, 10, size.width - 150), y = clamp((-v.y * 0.5 + 0.5) * size.height, 30, size.height - 50);
      el.style.transform = `translate(${x}px, ${y}px) translateY(-50%)`;
      el.style.opacity = String(smooth(seg(t, l.from, l.from + 0.15)) * (1 - smooth(seg(t, l.to - 0.15, l.to))));
    });
  });
  return null;
}

function DataCenter() {
  const source = useRackModel();
  return (
    <>
      <gridHelper args={[48, 48, "#2c2c2c", "#171717"]} />
      {source && Array.from({ length: RACK.count }, (_, i) => <Rack key={i} index={i} source={source} />)}
      <Backbone />
      <Monitoring />
      <SoftwareLayers />
      <RepairUnit />
    </>
  );
}

export function ServicesScene() {
  const labels = useRef<Array<HTMLDivElement | null>>([]);
  const overlay = LABELS.map((l, i) => (
    <div key={l.name} ref={(el) => { labels.current[i] = el; }} className={s.label} aria-hidden="true">
      <b>{l.name}</b>
      <span>{l.note}</span>
    </div>
  ));
  return (
    <SceneCanvas overlay={overlay} label="Data center en 3D: una hilera de racks se conecta, se detecta una falla en un equipo, aparecen capas de software desde la consola y la unidad con falla se repara." camera={{ position: [17, 7, 8], fov: 30 }}>
      <fog attach="fog" args={["#050505", 26, 52]} />
      <Lights />
      <Rig />
      <LabelSync labels={labels} />
      <DataCenter />
    </SceneCanvas>
  );
}

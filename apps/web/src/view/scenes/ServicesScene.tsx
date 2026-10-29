"use client";
import { useFrame, useThree } from "@react-three/fiber";
import { useMemo, useRef, type ReactNode, type RefObject } from "react";
import * as THREE from "three";
import { FAULT_LINK_INDEX, FAULT_NODE, LAYER_LABELS } from "@/data/diagram";
import { APP_BOXES, APP_CHIP_LIST, FAULT_BOX, FAULT_OFFSET, HUB, LAYER_GAP, LINK_LIST, NODE_LIST, PLATE, PLATE_CORNERS, SYSTEM_BOXES } from "@/data/scene3d";
import { easeIn, easeOut, seg, servicesScene, smooth } from "@/logic/engines/sceneState";
import { Lights, Part, RED, Sway, WHITE } from "./parts";
import { SceneCanvas } from "./SceneCanvas";
import s from "./ServicesScene.module.css";

const rise = (t: number) => smooth(seg(t, 2.0, 2.9));
const n4 = NODE_LIST.find((n) => n.id === FAULT_NODE)!.pos;

/** Nodo: esfera que aparece en la escena 1, se pone roja en la 2 y se repara en la 4. */
function Node({ id, pos, index }: { id: string; pos: [number, number, number]; index: number }) {
  const g = useRef<THREE.Group>(null);
  const mat = useRef<THREE.MeshStandardMaterial>(null);
  useFrame(() => {
    const t = servicesScene.t;
    g.current?.scale.setScalar(Math.max(0.0001, smooth(seg(t, 0.1 + index * 0.04, 0.26 + index * 0.04))));
    if (id === FAULT_NODE && mat.current) {
      const f = smooth(seg(t, 1.66, 1.76)) - smooth(seg(t, 3.4, 3.55));
      mat.current.color.copy(WHITE).lerp(RED, f);
      mat.current.emissive.copy(RED).multiplyScalar(f * 0.9);
    }
  });
  return (
    <group ref={g} position={pos}>
      <mesh>
        <sphereGeometry args={[0.2, 28, 20]} />
        <meshStandardMaterial ref={mat} color="#ffffff" roughness={0.35} metalness={0.15} />
      </mesh>
      <mesh rotation-x={Math.PI / 2}>
        <torusGeometry args={[0.36, 0.008, 8, 48]} />
        <meshBasicMaterial color="#ffffff" transparent opacity={0.3} />
      </mesh>
    </group>
  );
}

function Hub() {
  const g = useRef<THREE.Group>(null);
  useFrame(() => g.current?.scale.setScalar(Math.max(0.0001, smooth(seg(servicesScene.t, 0.02, 0.16)))));
  return (
    <group ref={g} position={HUB}>
      <mesh position-y={0.05}>
        <boxGeometry args={[0.42, 0.42, 0.42]} />
        <meshStandardMaterial color="#ffffff" roughness={0.3} />
      </mesh>
      <mesh rotation-x={Math.PI / 2}>
        <torusGeometry args={[0.62, 0.008, 8, 48]} />
        <meshBasicMaterial color="#ffffff" transparent opacity={0.3} />
      </mesh>
    </group>
  );
}

/** Enlace que se dibuja desde un extremo. El de la falla se vuelve rojo e intermitente y se rehace al repararse. */
function Link({ a, b, index }: { a: [number, number, number]; b: [number, number, number]; index: number }) {
  const mesh = useRef<THREE.Mesh>(null);
  const mat = useRef<THREE.MeshBasicMaterial>(null);
  const { from, dir, len, quat } = useMemo(() => {
    const from = new THREE.Vector3(...a), to = new THREE.Vector3(...b);
    const dir = to.clone().sub(from);
    const len = dir.length();
    dir.normalize();
    return { from, dir, len, quat: new THREE.Quaternion().setFromUnitVectors(new THREE.Vector3(1, 0, 0), dir) };
  }, [a, b]);
  const isFault = index === FAULT_LINK_INDEX;

  useFrame(() => {
    const t = servicesScene.t;
    let k = seg(t, 0.18 + index * 0.04, 0.4 + index * 0.04);
    if (isFault && t >= 3.42) k = seg(t, 3.42, 3.67);
    const m = mesh.current, c = mat.current;
    if (!m || !c) return;
    m.visible = k > 0.001;
    m.scale.x = Math.max(len * k, 0.0001);
    m.position.copy(from).addScaledVector(dir, (len * k) / 2);
    if (isFault) {
      const bad = t > 1.68 && t < 3.42;
      c.color.copy(bad ? RED : WHITE);
      c.opacity = bad ? 0.55 + 0.45 * Math.sin(t * 40) * Math.sin(t * 40) : 0.7;
    }
  });
  return (
    <mesh ref={mesh} quaternion={quat}>
      <boxGeometry args={[1, 0.03, 0.03]} />
      <meshBasicMaterial ref={mat} color="#ffffff" transparent opacity={0.7} />
    </mesh>
  );
}

/** Anillo plano que se expande y se desvanece (radar, alertas, onda de "todo en orden"). */
function Wave({ at, start, end, max, color = RED, strength = 0.9 }: { at: [number, number, number]; start: number; end: number; max: number; color?: THREE.Color; strength?: number }) {
  const m = useRef<THREE.Mesh>(null);
  const mat = useRef<THREE.MeshBasicMaterial>(null);
  useFrame(() => {
    const k = seg(servicesScene.t, start, end);
    if (!m.current || !mat.current) return;
    m.current.visible = k > 0 && k < 1;
    m.current.scale.setScalar(Math.max(0.01, max * easeOut(k)));
    mat.current.opacity = (1 - k) * strength;
  });
  return (
    <mesh ref={m} position={[at[0], 0.04, at[2]]} rotation-x={-Math.PI / 2}>
      <ringGeometry args={[0.985, 1, 96]} />
      <meshBasicMaterial ref={mat} color={color} transparent side={THREE.DoubleSide} depthWrite={false} />
    </mesh>
  );
}

function Pulse() {
  const m = useRef<THREE.Mesh>(null);
  useFrame(() => {
    const t = servicesScene.t, k = easeIn(seg(t, 1.3, 1.68));
    if (!m.current) return;
    m.current.visible = t > 1.3 && t < 1.69;
    m.current.position.set(HUB[0] + (n4[0] - HUB[0]) * k, 0.1, HUB[2] + (n4[2] - HUB[2]) * k);
  });
  return (
    <mesh ref={m}>
      <sphereGeometry args={[0.13, 16, 12]} />
      <meshBasicMaterial color="#F40612" />
    </mesh>
  );
}

/** Mueve una capa según el avance de la escena 3 (la capa 0 se queda abajo). */
function Layer({ index, children }: { index: number; children: ReactNode }) {
  const g = useRef<THREE.Group>(null);
  useFrame(() => { if (g.current) g.current.position.y = index * LAYER_GAP * rise(servicesScene.t); });
  return <group ref={g}>{children}</group>;
}

/** Proyecta la esquina de cada capa a pantalla y mueve las etiquetas DOM (que viven fuera del lienzo). */
function LabelSync({ labels }: { labels: RefObject<Array<HTMLDivElement | null>> }) {
  const { camera, size } = useThree();
  const v = useMemo(() => new THREE.Vector3(), []);
  useFrame(() => {
    const t = servicesScene.t;
    labels.current?.forEach((el, i) => {
      if (!el) return;
      v.set(PLATE.w / 2 + 0.15, 0.1 + i * LAYER_GAP * rise(t) - 1.2, -PLATE.d / 2).project(camera);
      el.style.transform = `translate(${(v.x * 0.5 + 0.5) * size.width}px, ${(-v.y * 0.5 + 0.5) * size.height}px) translateY(-50%)`;
      el.style.opacity = String(smooth(seg(t, 2.75 + i * 0.08, 2.95 + i * 0.08)));
    });
  });
  return null;
}

/** Hilos verticales entre capas y eje central con un marcador por capa. */
function Connectors() {
  const g = useRef<THREE.Group>(null);
  const mats = useRef<THREE.MeshBasicMaterial[]>([]);
  const refs = useRef<THREE.Object3D[]>([]);
  const total = 2 * LAYER_GAP;
  useFrame(() => {
    const t = servicesScene.t, r = rise(t), vis = smooth(seg(t, 2.6, 2.9));
    if (!g.current) return;
    g.current.visible = vis > 0.002;
    refs.current.forEach((o, i) => {
      if (!o) return;
      if (i < 5) { o.scale.y = Math.max(total * r, 0.001); o.position.y = (total * r) / 2; }
      else o.position.y = (i - 5) * LAYER_GAP * r;
    });
    mats.current.forEach((m) => m && (m.opacity = 0.4 * vis));
  });
  const place = (i: number) => (o: THREE.Object3D | null) => { if (o) refs.current[i] = o; };
  const mat = (i: number) => (m: THREE.MeshBasicMaterial | null) => { if (m) mats.current[i] = m; };
  return (
    <group ref={g}>
      {PLATE_CORNERS.map(([x, z], i) => (
        <mesh key={i} ref={place(i)} position={[x, 0, z]}>
          <boxGeometry args={[0.014, 1, 0.014]} />
          <meshBasicMaterial ref={mat(i)} color="#ffffff" transparent />
        </mesh>
      ))}
      <mesh ref={place(4)}>
        <boxGeometry args={[0.03, 1, 0.03]} />
        <meshBasicMaterial ref={mat(4)} color="#ffffff" transparent />
      </mesh>
      {[0, 1, 2].map((i) => (
        <mesh key={i} ref={place(5 + i)}>
          <boxGeometry args={[0.16, 0.16, 0.16]} />
          <meshBasicMaterial color="#ffffff" />
        </mesh>
      ))}
    </group>
  );
}

function SystemModules() {
  return (
    <>
      {SYSTEM_BOXES.map((b, i) => (
        <Part key={i} pos={b.pos} size={b.size} fillOpacity={0.55} edgeOpacity={0.7} update={({ group }) => {
          const k = smooth(seg(servicesScene.t, 2.5 + b.delay, 2.75 + b.delay));
          group.scale.setScalar(0.6 + 0.4 * k);
          return k;
        }} />
      ))}
      {/* Módulo con falla: desplazado y rojo hasta la escena 4, donde encaja y se vuelve blanco */}
      <Part pos={FAULT_BOX.pos} size={FAULT_BOX.size} fillOpacity={0.5} edgeOpacity={0.95} edge="#F40612" fill="#3a0508" update={({ group, fill, edge }) => {
        const t = servicesScene.t, appear = smooth(seg(t, 2.6, 2.85)), slide = smooth(seg(t, 3.1, 3.45)), ok = seg(t, 3.4, 3.6);
        group.scale.setScalar(0.6 + 0.4 * appear);
        group.position.set(FAULT_BOX.pos[0] + FAULT_OFFSET[0] * (1 - slide), FAULT_BOX.pos[1] + FAULT_OFFSET[1] * (1 - slide), FAULT_BOX.pos[2] + FAULT_OFFSET[2] * (1 - slide));
        group.rotation.z = 0.28 * (1 - slide);
        edge.color.copy(RED).lerp(WHITE, ok);
        fill.color.set("#3a0508").lerp(WHITE.clone().multiplyScalar(0.22), ok);
        return appear;
      }} />
    </>
  );
}

function AppModules() {
  return (
    <>
      {APP_BOXES.map((b, i) => (
        <Part key={i} pos={b.pos} size={b.size} fillOpacity={0.6} edgeOpacity={0.7} update={({ group }) => {
          const k = smooth(seg(servicesScene.t, 2.65 + b.delay, 2.9 + b.delay));
          group.scale.setScalar(0.7 + 0.3 * k);
          return k;
        }} />
      ))}
      {APP_CHIP_LIST.map((p, i) => (
        <Part key={i} pos={[p[0], p[1], p[2]]} size={[0.22, 0.12, 0.22]} fill="#ffffff" fillOpacity={1} edgeOpacity={0} solid update={({ group }) => {
          const k = smooth(seg(servicesScene.t, 2.8 + (i % 6) * 0.025, 2.98 + (i % 6) * 0.025));
          group.scale.setScalar(0.3 + 0.7 * k);
          return k;
        }} />
      ))}
    </>
  );
}

/** Cámara: casi cenital para ver la red plana; baja a una vista en perspectiva cuando se apilan las capas. */
function Rig() {
  const { camera, size } = useThree();
  const look = useMemo(() => new THREE.Vector3(), []);
  useFrame(({ pointer }) => {
    const t = servicesScene.t, k = smooth(seg(t, 1.95, 3.0));
    const narrow = size.width / size.height < 1.15 ? 1.45 : 1;
    const sway = Math.sin(t * 0.7) * 0.5 * (1 - k);
    const far = narrow * (1 + 0.42 * k);
    camera.position.set((0.5 + 9.5 * k + sway) * far + 1.7 * k + pointer.x * 0.5, (13.5 - 6.2 * k) * far, (2.2 + 8.6 * k) * far - pointer.y * 0.4);
    look.set(1.7 * k, 1.6 * k, 0);
    camera.lookAt(look);
  });
  return null;
}

export function ServicesScene() {
  const labels = useRef<Array<HTMLDivElement | null>>([]);
  const overlay = LAYER_LABELS.map((text, i) => (
    <div key={text} ref={(el) => { labels.current[i] = el; }} className={s.label} aria-hidden="true">{text}</div>
  ));
  return (
    <SceneCanvas overlay={overlay} label="Diagrama 3D: los nodos de una red se conectan, un pulso rojo detecta una falla, se apilan capas de software y el módulo con falla se repara." camera={{ position: [0.5, 13.5, 2.2], fov: 30 }}>
      <Lights />
      <Rig />
      <LabelSync labels={labels} />
      <Sway amount={0.12}>
        <group position-y={-1.2}>
          <Layer index={0}>
            <Part pos={[0, -PLATE.h / 2, 0]} size={[PLATE.w, PLATE.h, PLATE.d]} fillOpacity={0.5} edgeOpacity={0.5} update={() => smooth(seg(servicesScene.t, 2.0, 2.35))} />
          </Layer>
          <Hub />
          {NODE_LIST.map((n, i) => <Node key={n.id} id={n.id} pos={n.pos} index={i} />)}
          {LINK_LIST.map((l, i) => <Link key={i} a={l.a} b={l.b} index={i} />)}
          <Wave at={HUB} start={1.0} end={1.55} max={5.6} strength={0.8} />
          <Wave at={HUB} start={1.14} end={1.69} max={5.6} strength={0.45} />
          <Pulse />
          <Wave at={n4} start={1.68} end={2.0} max={1.3} />
          <Wave at={n4} start={1.82} end={2.14} max={1.3} strength={0.6} />
          <group position={[HUB[0], 0.42, HUB[2]]}><OkDot /></group>
          <Wave at={HUB} start={3.7} end={4} max={3.4} strength={0.8} />

          <Layer index={1}>
            <Part pos={[0, -PLATE.h / 2, 0]} size={[PLATE.w, PLATE.h, PLATE.d]} fillOpacity={0.82} edgeOpacity={0.55} update={() => smooth(seg(servicesScene.t, 2.4, 2.65))} />
            <SystemModules />
          </Layer>
          <Layer index={2}>
            <Part pos={[0, -PLATE.h / 2, 0]} size={[PLATE.w, PLATE.h, PLATE.d]} fillOpacity={0.82} edgeOpacity={0.55} update={() => smooth(seg(servicesScene.t, 2.55, 2.8))} />
            <AppModules />
          </Layer>
          <Connectors />
        </group>
      </Sway>
    </SceneCanvas>
  );
}

/** Marca roja de estado sobre el centro: aparece al final, cuando el sistema queda en orden. */
function OkDot() {
  const g = useRef<THREE.Group>(null);
  useFrame(() => {
    const k = smooth(seg(servicesScene.t, 3.7, 3.85));
    if (g.current) { g.current.visible = k > 0.002; g.current.scale.setScalar(Math.max(k, 0.001)); }
  });
  return (
    <group ref={g}>
      <mesh>
        <boxGeometry args={[0.16, 0.16, 0.16]} />
        <meshBasicMaterial color="#F40612" />
      </mesh>
    </group>
  );
}

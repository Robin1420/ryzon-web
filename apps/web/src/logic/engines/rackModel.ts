import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";

export const RACK_MODEL_URL = "/models/server-rack.glb";

/** Nombres de material del modelo original (Server V2 +console, FlevasGR, CC BY 4.0). */
const CABINET = "Cube1_auv";
const SERVERS = "Cube12_auv";
const CONSOLE = "console_auv";

/** Descarga el .glb. La vista previa empaquetada puede incrustarlo en `__RYZON_MODEL__` (base64). */
async function loadBuffer(): Promise<ArrayBuffer> {
  const embedded = (globalThis as { __RYZON_MODEL__?: string }).__RYZON_MODEL__;
  if (embedded) return Uint8Array.from(atob(embedded), (c) => c.charCodeAt(0)).buffer;
  const res = await fetch(RACK_MODEL_URL);
  if (!res.ok) throw new Error(`No se pudo cargar ${RACK_MODEL_URL}`);
  return res.arrayBuffer();
}

/**
 * Adapta el modelo a la identidad de Ryzon: el gabinete pierde su textura (traía el logo de
 * otra empresa) y pasa a un metal oscuro liso; los equipos y la pantalla conservan su textura
 * con un brillo propio para que se lean sobre fondo negro.
 */
function style(root: THREE.Object3D) {
  root.traverse((o) => {
    const mesh = o as THREE.Mesh;
    if (!mesh.isMesh) return;
    const mat = mesh.material as THREE.MeshStandardMaterial;
    if (mat.name === CABINET) {
      mesh.material = new THREE.MeshStandardMaterial({ color: "#1b1f23", roughness: 0.5, metalness: 0.65 });
    } else if (mat.name === SERVERS || mat.name === CONSOLE) {
      mat.emissive = new THREE.Color("#ffffff");
      mat.emissiveMap = mat.map;
      mat.emissiveIntensity = mat.name === CONSOLE ? 0.55 : 0.4;
      mat.roughness = 0.6;
    }
    mesh.userData.part = mat.name === CONSOLE ? "console" : mat.name === SERVERS ? "servers" : "cabinet";
  });
  return root;
}

export async function loadRack(): Promise<THREE.Object3D> {
  const buffer = await loadBuffer();
  const gltf = await new Promise<{ scene: THREE.Group }>((resolve, reject) => new GLTFLoader().parse(buffer, "", resolve, reject));
  return style(gltf.scene);
}

/**
 * Copia de un rack. Solo el principal conserva la laptop extraíble; los demás reciben materiales
 * propios (devueltos en `ghost`) para poder volverlos transparentes sin afectar al principal.
 */
export function cloneRack(source: THREE.Object3D, isMain: boolean) {
  const rack = source.clone(true);
  const ghost: THREE.Material[] = [];
  rack.traverse((o) => {
    const mesh = o as THREE.Mesh;
    if (o.userData.part === "console") o.visible = isMain;
    if (isMain || !mesh.isMesh) return;
    mesh.material = (mesh.material as THREE.Material).clone();
    (mesh.material as THREE.Material).transparent = true;
    ghost.push(mesh.material as THREE.Material);
  });
  return { rack, ghost };
}

"use client";
import { useEffect, useState } from "react";
import type * as THREE from "three";
import { loadRack } from "../engines/rackModel";

/** Carga el rack de servidores una sola vez; devuelve null mientras llega. */
export function useRackModel() {
  const [model, setModel] = useState<THREE.Object3D | null>(null);
  useEffect(() => {
    let live = true;
    loadRack().then((m) => live && setModel(m)).catch(() => undefined);
    return () => { live = false; };
  }, []);
  return model;
}

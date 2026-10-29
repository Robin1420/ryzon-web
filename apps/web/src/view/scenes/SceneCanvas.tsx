"use client";
import { Canvas } from "@react-three/fiber";
import { useEffect, useRef, useState, type ReactNode } from "react";
import { useReducedMotion } from "@/logic/hooks/useMediaQuery";
import s from "./SceneCanvas.module.css";

type Props = { label: string; camera: { position: [number, number, number]; fov: number }; children: ReactNode; /** Elementos DOM (etiquetas) que se dibujan encima del lienzo. */ overlay?: ReactNode };

/**
 * Lienzo WebGL transparente (se ve el fondo de la página). Solo se monta en el cliente
 * y deja de dibujar cuando sale de pantalla; con movimiento reducido dibuja a demanda.
 */
export function SceneCanvas({ label, camera, children, overlay }: Props) {
  const box = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const [mounted, setMounted] = useState(false);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    setMounted(true);
    const el = box.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => setVisible(e.isIntersecting), { rootMargin: "150px" });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div ref={box} className={s.box} role="img" aria-label={label}>
      {mounted && (
        <Canvas
          dpr={[1, 1.75]}
          camera={{ ...camera, near: 0.1, far: 80 }}
          frameloop={reduced ? "demand" : visible ? "always" : "never"}
          gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
          onCreated={({ gl }) => gl.setClearColor(0x000000, 0)}
        >
          {children}
        </Canvas>
      )}
      {overlay}
    </div>
  );
}

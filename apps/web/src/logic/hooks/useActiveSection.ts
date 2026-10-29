"use client";
import { useEffect, useState } from "react";

/** Devuelve el id del enlace de navegación cuya sección cruza el centro de la pantalla. */
export function useActiveSection(sectionToNav: Record<string, string>) {
  const [active, setActive] = useState<string>("inicio");
  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting) setActive(sectionToNav[e.target.id] ?? active); }),
      { rootMargin: "-50% 0px -50% 0px" },
    );
    Object.keys(sectionToNav).forEach((id) => { const el = document.getElementById(id); if (el) io.observe(el); });
    return () => io.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sectionToNav]);
  return active;
}

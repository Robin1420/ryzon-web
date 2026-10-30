"use client";
import { useCallback, useSyncExternalStore } from "react";
import { MOTION_KEY, motion } from "@ryzon/tokens";

const noop = () => () => {};
const read = () => document.documentElement.dataset.motion === "on";

/** Permite activar las animaciones aunque el sistema pida reducirlas. Recarga para rehacer las escenas. */
export function useMotionOverride() {
  const systemReduced = useSyncExternalStore(noop, () => matchMedia(motion.systemReducedQuery).matches, () => false);
  const forced = useSyncExternalStore(noop, read, () => false);
  const toggle = useCallback(() => {
    try {
      if (forced) localStorage.removeItem(MOTION_KEY);
      else localStorage.setItem(MOTION_KEY, "on");
    } catch { /* sin almacenamiento */ }
    if (forced) delete document.documentElement.dataset.motion;
    else document.documentElement.dataset.motion = "on";
    location.reload();
  }, [forced]);
  return { visible: systemReduced || forced, forced, toggle };
}

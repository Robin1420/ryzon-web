"use client";
import { useSyncExternalStore } from "react";
import { motion } from "@ryzon/tokens";

export function useMediaQuery(query: string, serverValue = false) {
  return useSyncExternalStore(
    (cb) => {
      const mq = matchMedia(query);
      mq.addEventListener("change", cb);
      return () => mq.removeEventListener("change", cb);
    },
    () => matchMedia(query).matches,
    () => serverValue,
  );
}

export const useReducedMotion = () => useMediaQuery(motion.reducedQuery);
export const useFinePointer = () => useMediaQuery(motion.finePointerQuery);

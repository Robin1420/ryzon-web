"use client";
import { useEffect, useSyncExternalStore } from "react";
import { currentTheme, type Theme } from "@ryzon/tokens";
import { THEME_EVENT, followSystem, toggleTheme } from "../services/themeService";

const subscribe = (cb: () => void) => {
  window.addEventListener(THEME_EVENT, cb);
  return () => window.removeEventListener(THEME_EVENT, cb);
};

/** Tema activo (el script del <head> ya lo fijó antes de pintar) y acción para alternarlo. */
export function useTheme(): { theme: Theme; toggle: () => void } {
  const theme = useSyncExternalStore(subscribe, currentTheme, () => "dark" as Theme);
  return { theme, toggle: toggleTheme };
}

/** Se monta una vez: acompaña los cambios del sistema mientras no haya elección guardada. */
export function useFollowSystemTheme() {
  useEffect(() => followSystem(), []);
}

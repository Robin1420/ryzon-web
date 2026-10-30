import { THEME_KEY, currentTheme, palette, type Theme } from "@ryzon/tokens";

export const THEME_EVENT = "ryzon-theme";
const SYSTEM_QUERY = "(prefers-color-scheme: light)";

export const systemTheme = (): Theme => (matchMedia(SYSTEM_QUERY).matches ? "light" : "dark");

function stored(): Theme | null {
  try {
    const v = localStorage.getItem(THEME_KEY);
    return v === "light" || v === "dark" ? v : null;
  } catch {
    return null;
  }
}

/** Aplica el tema al documento. Con `persist` recuerda la elección; sin ella sigue al sistema. */
export function applyTheme(theme: Theme, persist: boolean) {
  const root = document.documentElement;
  root.dataset.theme = theme;
  root.style.colorScheme = theme;
  document.querySelectorAll('meta[name="theme-color"]').forEach((m) => m.setAttribute("content", palette[theme].bg));
  if (persist) {
    try { localStorage.setItem(THEME_KEY, theme); } catch { /* sin almacenamiento */ }
  }
  window.dispatchEvent(new Event(THEME_EVENT));
}

export const toggleTheme = () => applyTheme(currentTheme() === "light" ? "dark" : "light", true);

/** Mientras el visitante no elija, la página acompaña los cambios del sistema. Devuelve la limpieza. */
export function followSystem() {
  const mq = matchMedia(SYSTEM_QUERY);
  const onChange = () => { if (!stored()) applyTheme(systemTheme(), false); };
  mq.addEventListener("change", onChange);
  return () => mq.removeEventListener("change", onChange);
}

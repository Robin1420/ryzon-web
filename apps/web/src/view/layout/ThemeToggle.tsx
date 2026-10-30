"use client";
import { themeToggle } from "@/data/site";
import { useFollowSystemTheme, useTheme } from "@/logic/hooks/useTheme";
import s from "./ThemeToggle.module.css";

/** Interruptor claro/oscuro del encabezado. El tema inicial lo decide el sistema del visitante. */
export function ThemeToggle() {
  const { theme, toggle } = useTheme();
  useFollowSystemTheme();
  const toLight = theme === "dark";
  const label = toLight ? themeToggle.toLight : themeToggle.toDark;
  return (
    <button type="button" className={s.btn} onClick={toggle} aria-label={label}>
      <svg className={s.icon} viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
        {toLight ? (
          <>
            <circle cx="12" cy="12" r="4" />
            <path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" />
          </>
        ) : (
          <path d="M20 14.5A8.5 8.5 0 0 1 9.5 4 8.5 8.5 0 1 0 20 14.5Z" />
        )}
      </svg>
      <span className={s.text} aria-hidden="true">{toLight ? themeToggle.short.light : themeToggle.short.dark}</span>
    </button>
  );
}

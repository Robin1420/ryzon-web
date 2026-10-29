"use client";
import { useEffect, useState } from "react";
import { BrandMark, Button, NavLink } from "@ryzon/ui";
import { nav, sectionToNav } from "@/data/site";
import { useActiveSection } from "@/logic/hooks/useActiveSection";
import s from "./Nav.module.css";

export function Nav() {
  const active = useActiveSection(sectionToNav);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    const esc = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", esc);
    return () => { window.removeEventListener("keydown", esc); document.body.style.overflow = ""; };
  }, [open]);

  return (
    <>
      <header className={s.nav}>
        <a href="#inicio" aria-label="Ryzon, ir al inicio"><BrandMark /></a>
        <ul className={s.links}>
          {nav.map((n) => <li key={n.id}><NavLink href={n.href} active={active === n.id}>{n.label}</NavLink></li>)}
        </ul>
        <a className={s.cta} href="#formulario">Hablemos</a>
        <button type="button" className={s.burger} aria-expanded={open} aria-controls="menu" aria-label={open ? "Cerrar menú" : "Abrir menú"} onClick={() => setOpen((o) => !o)}>
          <i /><i />
        </button>
      </header>
      <div id="menu" className={`${s.menu} ${open ? s.open : ""}`}>
        <div>
          {nav.map((n) => <a key={n.id} className={s.big} href={n.href} onClick={() => setOpen(false)}>{n.label}</a>)}
        </div>
        <Button variant="solid" href="#formulario" onClick={() => setOpen(false)}>Hablemos de tu proyecto</Button>
      </div>
    </>
  );
}

import { form, whatsapp } from "@/data/site";
import type { ContactValues } from "../validation/contactRules";

/** Arma el mensaje que llegará por WhatsApp con lo que la persona llenó. */
export function buildMessage(v: ContactValues): string {
  const m = form.message;
  const lines = [m.greeting, "", `${m.name}: ${v.name.trim()}`, `${m.email}: ${v.email.trim()}`];
  if (v.company.trim()) lines.push(`${m.company}: ${v.company.trim()}`);
  if (v.area) lines.push(`${m.area}: ${v.area}`);
  lines.push("", v.message.trim());
  return lines.join("\n");
}

export const whatsappUrl = (v: ContactValues) => `https://wa.me/${whatsapp.number}?text=${encodeURIComponent(buildMessage(v))}`;

/**
 * Punto único de envío del formulario: abre WhatsApp con el mensaje listo.
 * Debe llamarse directamente desde el evento de envío para que el navegador no bloquee la ventana.
 */
export function submitContact(values: ContactValues): { url: string; opened: boolean } {
  const url = whatsappUrl(values);
  const win = window.open(url, "_blank", "noopener,noreferrer");
  return { url, opened: !!win };
}

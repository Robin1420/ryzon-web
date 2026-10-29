import type { ContactValues } from "../validation/contactRules";

export type SubmitResult = { ok: true } | { ok: false; reason: "not-configured" | "network" };

/**
 * Punto único de envío del formulario. Aún no hay destino confirmado (correo, API o CRM),
 * así que devuelve "not-configured". Cuando exista, solo hay que implementar esta función.
 */
export async function submitContact(_values: ContactValues): Promise<SubmitResult> {
  return { ok: false, reason: "not-configured" };
}

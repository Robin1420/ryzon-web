export type ContactValues = { name: string; email: string; company: string; area: string; message: string };
export type ContactErrors = Partial<Record<"name" | "email" | "message", true>>;

const rules: Record<keyof ContactErrors, (v: string) => boolean> = {
  name: (v) => v.trim().length > 1,
  email: (v) => /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v.trim()),
  message: (v) => v.trim().length > 4,
};

export const emptyContact: ContactValues = { name: "", email: "", company: "", area: "", message: "" };

export const isValid = (field: keyof ContactErrors, value: string) => rules[field](value);

export function validateAll(values: ContactValues): ContactErrors {
  const errors: ContactErrors = {};
  (Object.keys(rules) as Array<keyof ContactErrors>).forEach((k) => { if (!rules[k](values[k])) errors[k] = true; });
  return errors;
}

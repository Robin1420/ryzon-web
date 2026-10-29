"use client";
import { useState, type ChangeEvent, type FormEvent } from "react";
import { form as copy } from "@/data/site";
import { submitContact } from "../services/contactService";
import { emptyContact, isValid, validateAll, type ContactErrors, type ContactValues } from "../validation/contactRules";

export function useContactForm() {
  const [values, setValues] = useState<ContactValues>(emptyContact);
  const [errors, setErrors] = useState<ContactErrors>({});
  const [status, setStatus] = useState("");
  const [waUrl, setWaUrl] = useState("");

  const onChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setValues((v) => ({ ...v, [name]: value }));
    if (name in errors && isValid(name as keyof ContactErrors, value)) setErrors((er) => ({ ...er, [name]: undefined }));
  };
  const onBlur = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const name = e.target.name as keyof ContactErrors;
    setErrors((er) => ({ ...er, [name]: isValid(name, values[name]) ? undefined : true }));
  };

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const found = validateAll(values);
    setErrors(found);
    if (Object.keys(found).length) {
      setStatus(copy.invalidSummary);
      setWaUrl("");
      const first = Object.keys(found)[0];
      (e.currentTarget.elements.namedItem(first) as HTMLElement | null)?.focus();
      return;
    }
    const { url } = submitContact(values);
    setStatus(copy.opened);
    setWaUrl(url);
  };

  return { values, errors, status, waUrl, onChange, onBlur, onSubmit };
}

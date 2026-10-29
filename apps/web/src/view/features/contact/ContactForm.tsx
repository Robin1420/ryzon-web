"use client";
import { Button, Field, Input, Mono, Select, Textarea } from "@ryzon/ui";
import { form as copy } from "@/data/site";
import { services } from "@/data/services";
import { useContactForm } from "@/logic/hooks/useContactForm";
import s from "./ContactForm.module.css";

export function ContactForm() {
  const { values, errors, status, onChange, onBlur, onSubmit } = useContactForm();
  const f = copy.fields;
  return (
    <form className={s.form} onSubmit={onSubmit} noValidate>
      <div className={s.row}>
        <Field id="f-name" label={f.name} error={errors.name ? copy.errors.name : undefined}>
          {(c) => <Input {...c} name="name" type="text" autoComplete="name" required value={values.name} onChange={onChange} onBlur={onBlur} />}
        </Field>
        <Field id="f-email" label={f.email} error={errors.email ? copy.errors.email : undefined}>
          {(c) => <Input {...c} name="email" type="email" autoComplete="email" required value={values.email} onChange={onChange} onBlur={onBlur} />}
        </Field>
      </div>
      <div className={s.row}>
        <Field id="f-company" label={f.company}>
          {({ id, "aria-describedby": d }) => <Input id={id} aria-describedby={d} name="company" type="text" autoComplete="organization" value={values.company} onChange={onChange} />}
        </Field>
        <Field id="f-area" label={f.area}>
          {({ id, "aria-describedby": d }) => (
            <Select id={id} aria-describedby={d} name="area" value={values.area} onChange={onChange}>
              <option value="">{copy.undecided}</option>
              {services.map((sv) => <option key={sv.id}>{sv.label}</option>)}
            </Select>
          )}
        </Field>
      </div>
      <Field id="f-message" label={f.message} error={errors.message ? copy.errors.message : undefined}>
        {(c) => <Textarea {...c} name="message" rows={4} required value={values.message} onChange={onChange} onBlur={onBlur} />}
      </Field>
      <div className={s.foot}>
        <Button variant="solid" type="submit" magnetic>{copy.submit}</Button>
        <Mono>{copy.note}</Mono>
      </div>
      <p className={s.status} role="status" aria-live="polite">{status}</p>
    </form>
  );
}

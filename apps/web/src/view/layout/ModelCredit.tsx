import { modelCredit as c } from "@/data/site";

/** Atribución del modelo 3D, con los enlaces que exige la licencia CC BY 4.0. */
export function ModelCredit({ className }: { className?: string }) {
  const link = { target: "_blank", rel: "noopener noreferrer" } as const;
  return (
    <p className={className}>
      &ldquo;<a href={c.url} {...link}>{c.title}</a>&rdquo; by <a href={c.authorUrl} {...link}>{c.author}</a> is licensed under{" "}
      <a href={c.licenseUrl} {...link}>{c.license}</a>. {c.changes}
    </p>
  );
}

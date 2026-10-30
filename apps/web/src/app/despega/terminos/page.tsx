import type { Metadata } from "next";
import { despegaTerms } from "@/data/despega";
import { DespegaLayout } from "@/view/features/despega/DespegaLayout";
import { LegalPage } from "@/view/features/despega/LegalPage";

export const metadata: Metadata = {
  title: `${despegaTerms.title} de Despega | Ryzon`,
  description: despegaTerms.description,
  alternates: { canonical: "/despega/terminos" },
  openGraph: { title: `${despegaTerms.title} de Despega`, description: despegaTerms.description, type: "article", url: "/despega/terminos" },
};

export default function Page() {
  return (
    <DespegaLayout>
      <LegalPage doc={despegaTerms} />
    </DespegaLayout>
  );
}

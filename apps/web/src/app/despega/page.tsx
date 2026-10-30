import type { Metadata } from "next";
import { despegaApp } from "@/data/despega";
import { DespegaIntro } from "@/view/features/despega/DespegaIntro";
import { DespegaLayout } from "@/view/features/despega/DespegaLayout";

export const metadata: Metadata = {
  title: "Despega: tus stickers de TikTok en WhatsApp | Ryzon",
  description: despegaApp.text,
  alternates: { canonical: "/despega" },
  openGraph: { title: "Despega | Ryzon", description: despegaApp.text, type: "website", url: "/despega" },
};

export default function Page() {
  return (
    <DespegaLayout>
      <DespegaIntro />
    </DespegaLayout>
  );
}

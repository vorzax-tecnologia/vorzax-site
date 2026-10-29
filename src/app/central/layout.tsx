import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Central Administrativa Vorzax",
  description: "Gestão da plataforma, empresas, módulos e auditoria.",
  robots: { index: false, follow: false },
};

export default function CentralLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return children;
}

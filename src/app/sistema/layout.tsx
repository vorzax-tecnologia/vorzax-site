import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Vorzax Business OS",
  description: "Plataforma integrada de gestão empresarial Vorzax.",
  robots: { index: false, follow: false },
};

export default function SistemaLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return children;
}

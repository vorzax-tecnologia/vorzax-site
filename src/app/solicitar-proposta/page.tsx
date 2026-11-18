import type { Metadata } from "next";
import { ProposalForm } from "@/components/ProposalForm";
export const metadata: Metadata = {
  title: "Solicitar proposta técnica",
  description: "Solicite uma proposta técnica para sites, automações, BI e sistemas sob medida. Contato empresarial organizado pela Vorzax Tecnologia.",
  alternates: { canonical: "/solicitar-proposta" }
};
export default async function ProposalPage({ searchParams }: { searchParams: Promise<{servico?:string}> }) {
  const {servico} = await searchParams;
  return <ProposalForm initialService={servico ?? ""}/>;
}

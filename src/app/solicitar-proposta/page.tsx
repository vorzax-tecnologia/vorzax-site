import type { Metadata } from "next";
import { ProposalForm } from "@/components/ProposalForm";
export const metadata: Metadata = {
  title: "Solicitar proposta técnica",
  description: "Prepare uma solicitação de proposta para sites, automações, BI ou sistemas sob medida e envie por e-mail à Vorzax Tecnologia.",
  alternates: { canonical: "/solicitar-proposta" }
};
export default async function ProposalPage({ searchParams }: { searchParams: Promise<{servico?:string}> }) {
  const {servico} = await searchParams;
  return <ProposalForm initialService={servico ?? ""}/>;
}

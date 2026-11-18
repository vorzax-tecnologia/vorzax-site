import type { Metadata } from "next";
import Link from "next/link";
import { offerings } from "@/lib/offerings";
import { BusinessShell, SectionHeading } from "@/components/BusinessShell";

export const metadata: Metadata = {
  title: "Serviços para empresas",
  description: "Conheça os serviços da Vorzax: sites institucionais, automações, dashboards e sistemas sob medida. Escopo, entregáveis e proposta técnica.",
  alternates: { canonical: "/servicos" }
};

export default function ServicesIndex() {
  return <BusinessShell active="servicos">
    <SectionHeading eyebrow="VORZAX / SOLUÇÕES" title="Tecnologia aplicada a problemas reais." description="Quatro frentes de desenvolvimento. Conheça o que pode ser entregue, quais limites precisam ser definidos e como solicitar uma proposta."/>
    <div className="mt-10 grid gap-4 md:grid-cols-2">
      {offerings.map((offer,index)=><article key={offer.slug} className="flex flex-col rounded-[20px] border border-[#2c5677] bg-[#0a2238] p-6 sm:p-8">
        <p className="text-xs font-bold tracking-[.16em] text-[#8bd2ff]">0{index+1} / {offer.eyebrow}</p>
        <h2 className="mt-4 text-2xl font-semibold tracking-tight text-white">{offer.title}</h2>
        <p className="mt-3 flex-1 text-sm leading-7 text-[#b8d0e1]">{offer.description}</p>
        <Link href={"/servicos/"+offer.slug} className="mt-6 inline-flex min-h-11 w-fit items-center rounded-lg border border-[#4b98c8] px-4 text-sm font-semibold text-[#a0ddff] transition hover:bg-[#12507a] hover:text-white">Ver escopo e entregáveis →</Link>
      </article>)}
    </div>
    <div className="mt-10 flex flex-wrap gap-4 rounded-xl border border-[#376487] bg-[#0d2c46] p-6">
      <p className="max-w-xl flex-1 text-sm leading-7 text-[#c5e0f1]">Os exemplos apresentados no Laboratório são protótipos ilustrativos, não cases de clientes nem produtos obrigatoriamente disponíveis para contratação.</p>
      <Link href="/solicitar-proposta" className="inline-flex min-h-12 items-center rounded-lg bg-[#1476c6] px-6 text-sm font-semibold text-white hover:bg-[#208bd9]">Solicitar proposta técnica →</Link>
    </div>
  </BusinessShell>;
}

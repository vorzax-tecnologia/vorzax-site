import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { BusinessShell, BusinessCard, PlainList, SectionHeading } from "@/components/BusinessShell";
import { offeringBySlug, offerings } from "@/lib/offerings";

export function generateStaticParams() {
  return offerings.map(item => ({ slug: item.slug }));
}

export async function generateMetadata({params}:{params:Promise<{slug:string}>}):Promise<Metadata> {
  const {slug}=await params;
  const offer=offeringBySlug(slug);
  if(!offer)return {};
  return {
    title: offer.title,
    description: offer.seo,
    alternates: {canonical: "/servicos/"+offer.slug},
    openGraph: { title: offer.title+" | Vorzax Tecnologia", description: offer.seo, url:"https://www.vorzax.com.br/servicos/"+offer.slug }
  };
}

export default async function ServiceDetails({params}:{params:Promise<{slug:string}>}) {
  const {slug}=await params;
  const offer=offeringBySlug(slug);
  if(!offer)notFound();
  return <BusinessShell active="servicos">
    <Link href="/servicos" className="text-sm font-semibold text-[#91d7ff] hover:underline">← Todos os serviços</Link>
    <div className="mt-7"><SectionHeading eyebrow={offer.eyebrow} title={offer.headline} description={offer.description}/></div>
    <div className="mt-8 flex flex-wrap items-center gap-3">
      <Link href={"/solicitar-proposta?servico="+encodeURIComponent(offer.slug)} className="inline-flex min-h-12 items-center rounded-xl bg-[#0f78cb] px-6 text-sm font-semibold text-white hover:bg-[#2099ef]">Solicitar proposta técnica →</Link>
      <Link href="/#tecnologia-em-acao" className="inline-flex min-h-12 items-center rounded-xl border border-[#4e8eb7] px-6 text-sm font-semibold text-[#bcdef3] hover:bg-[#13344e]">Explorar demonstrações</Link>
    </div>
    <div className="mt-10 grid gap-4 md:grid-cols-2">
      <BusinessCard title="Para quem faz sentido"><PlainList items={offer.audience}/></BusinessCard>
      <BusinessCard title="O que podemos entregar"><PlainList items={offer.deliverables}/></BusinessCard>
      <BusinessCard title="O que não está incluído automaticamente"><PlainList items={offer.exclusions}/></BusinessCard>
      <BusinessCard title="Etapas de trabalho"><ol className="space-y-3">{offer.stages.map((item,i)=><li key={item} className="flex gap-3"><span className="font-mono font-semibold text-[#82d0ff]">{String(i+1).padStart(2,"0")}</span><span>{item}</span></li>)}</ol></BusinessCard>
    </div>
    <div className="mt-4 grid gap-4 lg:grid-cols-[1.25fr_.75fr]">
      <BusinessCard title="Como avaliamos a entrega"><PlainList items={offer.acceptance}/></BusinessCard>
      <BusinessCard title="Demonstração relacionada"><p>{offer.demonstration}</p><p className="mt-3 text-[#8eb6d1]">Os dados, marcas e fluxos das demos são fictícios. A solução efetiva depende de contratação e definição de requisitos.</p></BusinessCard>
    </div>
    <aside className="mt-8 border-l-2 border-[#4faee5] bg-[#0b263b] px-5 py-5 text-sm leading-7 text-[#b6d1e5]">
      <strong className="text-white">Como são definidos preços, prazo e suporte?</strong> Por proposta individual, conforme escopo, dependências, riscos e critérios de aceite. Não existe promessa de implantação, certificação ou SLA corporativo sem contrato específico.
    </aside>
  </BusinessShell>;
}

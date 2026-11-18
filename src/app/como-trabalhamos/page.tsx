import type { Metadata } from "next";
import Link from "next/link";
import { BusinessCard, BusinessShell, PlainList, SectionHeading } from "@/components/BusinessShell";
export const metadata:Metadata={
  title:"Como trabalhamos e como contratar",
  description:"Veja como a Vorzax define escopo, entregas, homologação, responsabilidades e suporte antes da contratação de um projeto.",
  alternates:{canonical:"/como-trabalhamos"}
};

const stages=[
  {title:"01 · Diagnóstico",text:"Entendemos o problema, os usuários envolvidos, os resultados esperados e as restrições. Dados sensíveis não são solicitados nesta etapa."},
  {title:"02 · Proposta técnica",text:"Documentamos escopo, entregáveis, premissas, exclusões, dependências, calendário, condições comerciais e aceite antes de iniciar."},
  {title:"03 · Desenvolvimento e validação",text:"Executamos por etapas com revisões combinadas. Integrações, dados e permissões só entram após validação de viabilidade e responsabilidades."},
  {title:"04 · Homologação e transição",text:"Conferimos critérios de aceite, correções aplicáveis, acesso a materiais contratados e responsabilidades de manutenção e suporte."}
];
export default function ProcessPage(){
  return <BusinessShell active="processo">
    <SectionHeading eyebrow="VORZAX / TRANSPARÊNCIA" title="Um processo que o comprador consegue avaliar." description="A contratação começa com problema e escopo claros, não com a promessa de um sistema pronto. Cada compromisso deve aparecer em uma proposta e em seu contrato."/>
    <div className="mt-10 grid gap-4 md:grid-cols-2">{stages.map(stage=><article key={stage.title} className="rounded-2xl border border-[#2b5b7b] bg-[#0a253b] p-6"><h2 className="text-xl font-semibold text-white">{stage.title}</h2><p className="mt-3 text-sm leading-7 text-[#b9d0df]">{stage.text}</p></article>)}</div>
    <div className="mt-6 grid gap-4 md:grid-cols-2">
      <BusinessCard title="O que deve constar na proposta"><PlainList items={["Objetivo, escopo incluído e exclusões", "Entregáveis e responsáveis pela aprovação", "Marcos, dependências e prazos combinados", "Valor, condições de pagamento e revisão de mudanças", "Critérios de aceite, suporte e propriedade da entrega"]}/></BusinessCard>
      <BusinessCard title="Cuidados conforme o risco"><PlainList items={["Sites: conteúdo, domínio, acessibilidade e publicação", "Automações: permissões, erros e plano de reversão", "BI: fonte de dados, atualizações e acesso", "Sistemas: autenticação, dados, continuidade e homologação", "Dados pessoais ou sigilosos: análise contratual e de segurança específica"]}/></BusinessCard>
    </div>
    <div className="mt-6 rounded-xl border border-[#436d8b] bg-[#0b2b43] p-6 text-sm leading-7 text-[#c6dcef]">
      <h2 className="text-lg font-semibold text-white">Transparência para compras empresariais</h2>
      <p className="mt-2">Podemos discutir cadastro de fornecedor, acordo de confidencialidade, tratamento de dados, documentação técnica e critérios de suporte de acordo com o risco e a contratação. Essas informações são avaliadas caso a caso. A Vorzax não declara neste site possuir certificações, equipes de plantão ou disponibilidade crítica sem comprovação.</p>
    </div>
    <Link href="/solicitar-proposta" className="mt-8 inline-flex min-h-12 items-center rounded-lg bg-[#1478c7] px-6 text-sm font-semibold text-white hover:bg-[#1988db]">Solicitar avaliação do projeto →</Link>
  </BusinessShell>;
}

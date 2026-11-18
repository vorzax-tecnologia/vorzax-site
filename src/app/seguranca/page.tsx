import type { Metadata } from "next";
import Link from "next/link";
import { BusinessCard, BusinessShell, PlainList, SectionHeading } from "@/components/BusinessShell";
export const metadata:Metadata={
  title:"Segurança, privacidade e limites das demonstrações",
  description:"Conheça as informações verificáveis de segurança do site, o uso de demonstrações simuladas e os pontos avaliados antes de tratar dados corporativos.",
  alternates:{canonical:"/seguranca"}
};
export default function SecurityPage() {
  return <BusinessShell active="seguranca">
    <SectionHeading eyebrow="VORZAX / GOVERNANÇA" title="Segurança começa pela clareza do escopo e dos dados." description="Esta página diferencia controles observáveis no site de requisitos que dependem de análise e contrato em cada projeto."/>
    <div className="mt-9 grid gap-4 md:grid-cols-2">
      <BusinessCard title="O que é demonstrativo"><PlainList items={["Os 15 exemplos do Laboratório são interfaces ilustrativas.", "Gráficos, registros, fluxos e resultados exibidos nas demos são simulados.", "Simulações de IA não representam um assistente conectado a dados reais.", "Uma demonstração não constitui evidência de implantação em cliente."]}/></BusinessCard>
      <BusinessCard title="O que existe no site"><PlainList items={["Política de Privacidade pública e canal de contato por e-mail.", "Área de sistemas separada da experiência institucional pública.", "Solicitação de proposta por mensagem preparada localmente no navegador.", "A operação e os controles de cada sistema contratado exigem validação específica."]}/></BusinessCard>
      <BusinessCard title="O que avaliamos antes de projetos com dados"><PlainList items={["Categorias e necessidade de acesso aos dados", "Permissões, responsáveis e ambiente de homologação", "Retenção, exclusão, backup e continuidade quando aplicáveis", "Integrações, registros de auditoria e transferência de responsabilidade"]}/></BusinessCard>
      <BusinessCard title="O que não afirmamos"><PlainList items={["Não declaramos certificação ISO 27001, SOC 2 ou auditoria independente.", "Não presumimos SLA de alta disponibilidade ou monitoramento 24 horas.", "Não prometemos tratamento seguro de dados sensíveis sem avaliação técnica e contratual.", "Não usamos depoimentos, clientes ou números de resultado fictícios como prova comercial."]}/></BusinessCard>
    </div>
    <p className="mt-8 rounded-lg border border-[#2e5b78] bg-[#09263d] p-5 text-sm leading-7 text-[#c1d8e8]">
      Para informações sobre dados enviados ao site e direitos do titular, consulte a <Link href="/privacidade" className="font-semibold text-[#8ad8ff] underline">Política de Privacidade</Link>. Para uma avaliação técnica ou de compras corporativas, descreva o contexto por e-mail sem incluir senhas, bases internas ou dados pessoais desnecessários.
    </p>
    <Link href="/solicitar-proposta" className="mt-7 inline-flex min-h-12 items-center rounded-lg bg-[#1478c7] px-6 text-sm font-semibold text-white hover:bg-[#1988db]">Falar sobre requisitos de segurança →</Link>
  </BusinessShell>;
}

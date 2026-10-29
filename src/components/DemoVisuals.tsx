"use client";

import { SiteDemo } from "./demos/DemoSites";
import { AutomationDemo } from "./demos/DemoAutomations";
import { DashboardDemo } from "./demos/DemoDashboards";
import { SystemsDemo } from "./demos/DemoSystems";

export type DemoCategory = "sites" | "automacao" | "bi" | "sistemas";
export type DemoDevice = "desktop" | "mobile";

export const demoCatalog: Record<DemoCategory, { title:string; summary:string; examples: {name:string;subtitle:string;tag:string}[] }> = {
  sites: {title:"Três negócios. Três experiências de site.",summary:"Estruturas, paletas e hierarquias criadas para públicos distintos.",examples:[
    {name:"Climatização comercial",subtitle:"Site técnico B2B com serviços, hero industrial e orçamento",tag:"Institucional técnico"},
    {name:"Escritório contábil",subtitle:"Experiência editorial clara, consultiva e institucional",tag:"Institucional consultivo"},
    {name:"Arquitetura e projetos",subtitle:"Página editorial com vitrine visual e apresentação do estúdio",tag:"Portfólio editorial"},
  ]},
  automacao: {title:"Fluxos diferentes para situações diferentes.",summary:"Cada exemplo possui composição e etapas próprias.",examples:[
    {name:"Captação de leads",subtitle:"Formulário conectado ao fluxo de qualificação e CRM",tag:"Fluxo comercial"},
    {name:"Agendamento técnico",subtitle:"Agenda semanal e disponibilidade de atendimento",tag:"Fluxo de agenda"},
    {name:"Cobrança e avisos",subtitle:"Contas, prazos e regras de comunicação",tag:"Fluxo financeiro"},
  ]},
  bi: {title:"Três painéis, três formas de analisar.",summary:"Funil de vendas, central de operações e controle financeiro com gráficos próprios.",examples:[
    {name:"BI comercial",subtitle:"Funil de conversão e origem de oportunidades",tag:"Funil & aquisição"},
    {name:"BI de operações",subtitle:"SLA, cargas das equipes e mapa de demanda",tag:"Desempenho operacional"},
    {name:"BI financeiro",subtitle:"Fluxo de caixa e distribuição por categoria",tag:"Gestão financeira"},
  ]},
  sistemas: {title:"Cada operação exige uma interface específica.",summary:"Detalhes de atendimento, inventário filtrável e Kanban interativo.",examples:[
    {name:"Ordens de serviço",subtitle:"Lista selecionável com detalhes da execução",tag:"Central de atendimento"},
    {name:"Controle de estoque",subtitle:"Tabela de produtos, saldos e filtro de alertas",tag:"Inventário ERP"},
    {name:"Gestão de projetos",subtitle:"Quadro Kanban com tarefas selecionáveis",tag:"Gestão colaborativa"},
  ]},
};

export function DemoVisual({category,variant,device="desktop",compact=false,step=0,playing=true}:{category:DemoCategory;variant:number;device?:DemoDevice;compact?:boolean;step?:number;playing?:boolean}) {
  const props={variant,device,compact,step,playing};
  const content=category==="sites"?<SiteDemo {...props}/>:
    category==="automacao"?<AutomationDemo {...props}/>:
    category==="bi"?<DashboardDemo {...props}/>:
    <SystemsDemo {...props}/>;
  if(!compact)return <div data-demo-layout={category+"-"+variant} className="w-full min-w-0">{content}</div>;
  return <div data-demo-thumbnail={category+"-"+variant} className="relative aspect-[1.53] w-full overflow-hidden bg-[#0b2037]" aria-hidden="true" inert>
    <div className="pointer-events-none absolute left-0 top-0 origin-top-left" style={{width:"300%",transform:"scale(0.333333)"}}>{content}</div>
    <span className="absolute bottom-2 right-2 rounded-md border border-[#b8e0ff]/20 bg-[#04182c]/90 px-2 py-1.5 text-[9px] font-bold tracking-[.04em] text-[#d1efff]">PRÉVIA 0{variant+1} / 03</span>
  </div>;
}

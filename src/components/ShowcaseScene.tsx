"use client";

import type { DemoCategory, DemoDevice } from "./DemoVisuals";

/** 15 specially composed, fixed-canvas showcase screens. No scroll and no hidden content.
 * The values, companies, chat and activity are ILLUSTRATIVE, not real Vorzax metrics.
 * The desktop canvas is 900x480; the phone screen follows iPhone 16 Pro 402x874.
 */
type Tone = "sky"|"mint"|"gold"|"violet"|"rose";
type Scenario = {
 title:string; kicker:string; intro:string; tone:Tone; icon:string;
 kpis:[string,string,string]; metricLabels:[string,string,string];
 line:number[]; bars:number[]; barLabels:string[];
 flow:[string,string,string]; details:[string,string,string];
 foot:string; image?:string;
};
const data:Record<DemoCategory,Scenario[]>={
 sites:[
  {title:"ClimaForte",kicker:"CLIMATIZAÇÃO COMERCIAL",intro:"Conforto e eficiência para espaços profissionais.",tone:"sky",icon:"✳",kpis:["24 h","B2B","03"],metricLabels:["Atendimento","Especialidade","Serviços"],line:[17,20,25,23,30,35,42],bars:[16,24,32,27,39],barLabels:["Seg","Ter","Qua","Qui","Sex"],flow:["Instalação técnica","Manutenção preventiva","Projetos de climatização"],details:["Atendemos sua operação","Orçamento sem compromisso","Equipe técnica especializada"],foot:"PROJETO DE SITE ILUSTRATIVO",image:"/demo-hvac-workspace.webp"},
  {title:"Aliança Contábil",kicker:"CONTABILIDADE CONSULTIVA",intro:"Clareza e tranquilidade para quem empreende.",tone:"mint",icon:"◈",kpis:["PME","100%","03"],metricLabels:["Público","Digital","Áreas"],line:[21,27,25,36,33,42,46],bars:[17,25,36,28,40],barLabels:["Seg","Ter","Qua","Qui","Sex"],flow:["Contabilidade empresarial","Gestão fiscal","Consultoria tributária"],details:["Rotina organizada","Atendimento consultivo","Planejamento responsável"],foot:"CONCEITO INSTITUCIONAL",image:"/demo-accounting-workspace.webp"},
  {title:"Ateliê Forma",kicker:"ARQUITETURA CONTEMPORÂNEA",intro:"Espaços que traduzem ideias em experiências.",tone:"gold",icon:"▧",kpis:["01","03","360°"],metricLabels:["Portfólio","Projetos","Visão"],line:[11,19,17,27,30,39,44],bars:[14,21,28,33,37],barLabels:["Jan","Fev","Mar","Abr","Mai"],flow:["Projetos residenciais","Interiores autorais","Consultoria de espaços"],details:["Conceito e materialidade","Forma e funcionalidade","Detalhes com propósito"],foot:"PORTFÓLIO FICTÍCIO",image:"/demo-architecture-residence.webp"}
 ],
 automacao:[
  {title:"Captação de leads",kicker:"FLUXO COMERCIAL / CRM",intro:"Do interesse à oportunidade, com etapas conectadas.",tone:"sky",icon:"↗",kpis:["128","74%","18"],metricLabels:["Entradas","Triagem","Qualificados"],line:[12,17,15,24,20,31,27],bars:[11,21,28,18,35],barLabels:["Seg","Ter","Qua","Qui","Sex"],flow:["Formulário recebido","Qualificação automática","Oportunidade encaminhada"],details:["Empresa: Jardim Sul","Serviço: manutenção comercial","Destino: equipe de vendas"],foot:"AUTOMAÇÃO CONCEITUAL • SEM CRM CONECTADO"},
  {title:"Agendamento técnico",kicker:"AGENDA / EQUIPE DE CAMPO",intro:"Visitas distribuídas por técnico, região e prazo.",tone:"mint",icon:"▦",kpis:["32","08","91%"],metricLabels:["Visitas","Equipes","Ocupação"],line:[14,18,16,22,19,13,11],bars:[6,9,7,11,8],barLabels:["Seg","Ter","Qua","Qui","Sex"],flow:["Solicitação de visita","Verificar disponibilidade","Confirmar equipe e horário"],details:["Visita: preventiva PMOC","Equipe: Técnica B","Quarta-feira • 14h30"],foot:"AGENDA SIMULADA • SEM RESERVAS REAIS"},
  {title:"Cobranças e avisos",kicker:"FINANCEIRO / AUTOMAÇÃO",intro:"Vencimentos acompanhados sem perder o controle.",tone:"gold",icon:"◷",kpis:["86","12","07"],metricLabels:["Títulos","Pendentes","Alertas"],line:[20,18,17,15,12,9,7],bars:[28,13,8,4,2],barLabels:["Prazo","7d","15d","30d","+30"],flow:["Conferir vencimento","Preparar lembrete","Registrar retorno"],details:["Título: FAT-1025","Cliente: Edifício Vista","Status: aviso preparado"],foot:"COBRANÇAS DEMONSTRATIVAS • SEM ENVIOS"}
 ],
 bi:[
  {title:"BI comercial",kicker:"INTELIGÊNCIA / VENDAS",intro:"Origem, conversão e desempenho em um painel.",tone:"sky",icon:"◉",kpis:["R$ 84 mil","31%","128"],metricLabels:["Pipeline","Conversão","Oportunidades"],line:[17,24,20,29,36,33,48],bars:[38,27,19,12,8],barLabels:["Indicação","Site","Orgânico","Contato","Outros"],flow:["Leads no período","Propostas enviadas","Negócios em negociação"],details:["Origem: multicanal","Meta: 80% atingida","Funil: 5 etapas"],foot:"MÉTRICAS COMERCIAIS FICTÍCIAS"},
  {title:"BI de operações",kicker:"INTELIGÊNCIA / EFICIÊNCIA",intro:"SLA, produtividade e carga de atendimento.",tone:"mint",icon:"◫",kpis:["94%","238","07"],metricLabels:["Dentro SLA","Atendimentos","Equipes"],line:[24,31,26,38,33,45,41],bars:[33,27,21,16,12],barLabels:["E1","E2","E3","E4","E5"],flow:["Ordens recebidas","Ordens concluídas","Alertas de prazo"],details:["Tempo médio: 2,4 h","Backlog: 14 ordens","Equipe: Norte em destaque"],foot:"MÉTRICAS OPERACIONAIS SIMULADAS"},
  {title:"BI financeiro",kicker:"INTELIGÊNCIA / FINANÇAS",intro:"Receitas, despesas e previsibilidade.",tone:"violet",icon:"◈",kpis:["R$ 42 mil","23%","18 dias"],metricLabels:["Saldo","Margem","Previsão"],line:[28,34,31,42,38,47,52],bars:[24,18,27,21,34],barLabels:["Jan","Fev","Mar","Abr","Mai"],flow:["Recebimentos","Contas a pagar","Projeção de caixa"],details:["Receitas: R$ 68 mil","Despesas: R$ 26 mil","Projeção ilustrativa"],foot:"FINANCEIRO FICTÍCIO • NÃO É FATURAMENTO REAL"}
 ],
 sistemas:[
  {title:"Ordens de serviço",kicker:"SISTEMA / ATENDIMENTO",intro:"Equipes, prazos e execução organizados.",tone:"sky",icon:"▤",kpis:["48","12","08"],metricLabels:["Ordens","Em curso","Equipes"],line:[9,12,10,16,14,20,17],bars:[8,11,9,15,13],barLabels:["Seg","Ter","Qua","Qui","Sex"],flow:["OS-2048 · Manutenção preventiva","OS-2049 · Vistoria de campo","OS-2050 · Instalação técnica"],details:["Em execução","Agendada","Aguardando peça"],foot:"SISTEMA CONCEITUAL • SEM CLIENTES REAIS"},
  {title:"Controle de estoque",kicker:"SISTEMA / INVENTÁRIO",intro:"Saldo, movimentação e reposição por item.",tone:"gold",icon:"▥",kpis:["142","09","21"],metricLabels:["Produtos","Alertas","Entradas"],line:[35,33,28,32,27,25,29],bars:[42,31,24,12,9],barLabels:["Clima","Peças","Elétrica","EPIs","Outros"],flow:["Filtro G4 · 12 unidades","Sensor T8 · 03 unidades","Conector C2 · 40 unidades"],details:["Estoque adequado","Reposição necessária","Estoque adequado"],foot:"ITENS E QUANTIDADES ILUSTRATIVOS"},
  {title:"Gestão de projetos",kicker:"SISTEMA / KANBAN",intro:"Planejamento, execução e entregas por sprint.",tone:"violet",icon:"◫",kpis:["24","08","76%"],metricLabels:["Tarefas","Em curso","Progresso"],line:[34,32,27,23,18,12,7],bars:[9,8,5,2,0],barLabels:["Backlog","Fazer","Curso","Revisão","Feito"],flow:["Planejamento de interface","Implementar integração","Revisão de entrega"],details:["Em revisão","Em andamento","Concluído"],foot:"PROJETO E TAREFAS DEMONSTRATIVOS"}
 ],
 ia:[
  {title:"Atendimento comercial",kicker:"VORZAX IA / COMERCIAL",intro:"Um assistente para orientar a primeira conversa.",tone:"sky",icon:"✦",kpis:["128","96%","23"],metricLabels:["Conversas","Respostas","Leads"],line:[12,18,16,25,22,34,29],bars:[42,35,23],barLabels:["Orçamento","Serviços","Humano"],flow:["Olá! Como posso ajudar?","Preciso de um orçamento.","Posso reunir sua solicitação."],details:["Atendimento inicial","Intenção identificada","Encaminhamento comercial"],foot:"IA DEMONSTRATIVA • CHAT PRÉ-DEFINIDO"},
  {title:"Suporte e FAQ",kicker:"VORZAX IA / CONHECIMENTO",intro:"Respostas contextualizadas para dúvidas comuns.",tone:"mint",icon:"✧",kpis:["84%","14","03"],metricLabels:["Resolução","Artigos","Assuntos"],line:[17,24,21,28,32,35,41],bars:[18,9,14,5,11],barLabels:["Login","Pedidos","Portal","Acesso","Outros"],flow:["Dúvida sobre acesso","Artigo de ajuda encontrado","Próximo passo sugerido"],details:["Dúvida registrada","Base ilustrativa","Orientação de suporte"],foot:"IA CONCEITUAL • SEM CONSULTA REAL"},
  {title:"Assistente operacional",kicker:"VORZAX IA / OPERAÇÃO",intro:"Organize solicitações e prepare revisões.",tone:"violet",icon:"✳",kpis:["38","12","06"],metricLabels:["Pedidos","Resumos","Ações"],line:[4,7,6,10,8,13,11],bars:[3,6,4,8,7],barLabels:["Seg","Ter","Qua","Qui","Sex"],flow:["Solicitação recebida","Rascunho preparado","Revisão humana pendente"],details:["Organização","Documento ilustrativo","Aguardando aprovação"],foot:"SEM IA, CRM OU BACKEND CONECTADO"}
 ]
};
const colors:Record<Tone,{main:string,soft:string,fade:string}> = {
 sky:{main:"#4bbaf7",soft:"#a5e2ff",fade:"#0f4c79"},
 mint:{main:"#41cdb4",soft:"#a8f3e6",fade:"#115d60"},
 gold:{main:"#edb269",soft:"#ffe1a8",fade:"#68482a"},
 violet:{main:"#a58fff",soft:"#e0d7ff",fade:"#483d7b"},
 rose:{main:"#fa8da3",soft:"#ffcfda",fade:"#743e59"}
};
function ChartLine({values,tone}:{values:number[];tone:Tone}) {
 const c=colors[tone],max=Math.max(1,...values),min=Math.min(...values,0);
 const coords=values.map((v,i)=>[12+i*350/(values.length-1),106-((v-min)/(max-min||1))*75]);
 const points=coords.map(([x,y])=>x+","+y).join(" ");
 const polygon=points+" 362,118 12,118";
 return <svg role="img" aria-label="Tendência simulada de sete períodos" viewBox="0 0 376 126" className="block h-[118px] w-full overflow-visible">
  {[30,65,105].map(y=><line key={y} x1="6" y1={y} x2="369" y2={y} stroke="#6698ad" opacity=".26" strokeDasharray="4 6"/>)}
  <polygon points={polygon} fill={c.main} opacity=".13"/>
  <polyline points={points} stroke={c.main} strokeWidth="3.6" fill="none" strokeLinejoin="round" strokeLinecap="round"/>
  {coords.map(([x,y],i)=><circle key={i} cx={x} cy={y} r="3" fill={c.soft} stroke={c.main} strokeWidth="1.5"/>)}
 </svg>;
}
function ChartBars({scenario}:{scenario:Scenario}){
 const max=Math.max(1,...scenario.bars);return <div role="img" aria-label={"Distribuição simulada por grupo: "+scenario.barLabels.join(", ")} className="flex h-[122px] items-end gap-3">
 {scenario.bars.map((v,i)=><div key={i} className="flex h-full min-w-0 flex-1 flex-col items-center justify-end">
  <span className="mb-1 text-[12px] font-semibold" style={{color:colors[scenario.tone].soft}}>{v}</span>
  <div className="w-full max-w-[46px] rounded-t-[5px]" style={{height:Math.max(8,79*v/max),background:`linear-gradient(180deg,${colors[scenario.tone].soft},${colors[scenario.tone].fade})`}}/>
  <span className="mt-1 w-full truncate text-center text-[11px] text-[#bfd1e2]">{scenario.barLabels[i]}</span>
 </div>)}</div>;
}
function MetricStrip({s}:{s:Scenario}){
 return <div className="grid grid-cols-3 gap-[10px]">{s.kpis.map((k,i)=><div key={i} className="rounded-[13px] border border-[#29435d] bg-[#11263d] px-4 py-3"><p className="text-[12px] text-[#b8d1e5]">{s.metricLabels[i]}</p><p className="mt-1 text-[26px] font-bold tracking-[-.06em] text-white">{k}</p></div>)}</div>;
}
function Panel({children,title,sub}:{children:React.ReactNode;title:string;sub?:string}) {return <div className="rounded-[14px] border border-[#2b4c69] bg-[#0c2137] p-4"><div className="mb-2 flex justify-between gap-2"><p className="text-[15px] font-semibold text-white">{title}</p>{sub&&<span className="text-[11px] text-[#91b7d3]">{sub}</span>}</div>{children}</div>}
function DesktopScene({s,category,variant,step}:{s:Scenario;category:DemoCategory;variant:number;step:number}){
 const c=colors[s.tone];
 if(category==="sites")return <div className="flex h-full flex-col bg-[#061728]">
   <div className="flex h-[64px] items-center justify-between border-b border-[#24415b] px-8"><span className="text-[23px] font-black tracking-[-.05em]" style={{color:c.soft}}>{s.icon} {s.title}</span><span className="text-[12px] text-[#d2e4f1]">Serviços　 Projetos　 Atendimento　 <strong style={{color:c.main}}>Orçamento ↗</strong></span></div>
   <div className="grid min-h-0 flex-1 grid-cols-[.93fr_1.07fr] gap-5 p-7">
    <div className="flex flex-col justify-center"><p className="text-[12px] font-bold tracking-[.13em]" style={{color:c.main}}>{s.kicker}</p><h3 className="mt-5 max-w-[350px] text-[35px] font-bold leading-[1.08] tracking-[-.05em]">{s.intro}</h3><p className="mt-5 max-w-[350px] text-[15px] leading-6 text-[#b5cfe2]">Experiência digital desenvolvida para demonstrar uma presença institucional profissional.</p><div className="mt-7 w-fit rounded-lg px-5 py-3 text-[14px] font-semibold text-[#031625]" style={{background:c.main}}>Solicitar contato ↗</div></div>
    <div className="relative min-h-0 overflow-hidden rounded-[15px] bg-[#15324b]" style={{backgroundImage:`linear-gradient(0deg,rgba(2,17,31,.56),transparent 58%),url("${s.image}")`,backgroundPosition:"center",backgroundSize:"cover"}}><span className="absolute right-4 top-4 rounded-full bg-[#051a2a]/75 px-4 py-2 text-[12px] font-semibold">PROJETO CONCEITUAL</span><p className="absolute bottom-5 left-5 right-5 text-[16px] font-semibold text-white">{s.flow.join("　 •  ")}</p></div>
   </div><div className="flex h-[52px] items-center justify-between border-t border-[#24415b] px-8 text-[13px] text-[#b9d4e6]">{s.flow.map(v=><span key={v}>✓　{v}</span>)}</div>
  </div>;
 return <div className="flex h-full flex-col p-[19px]">
   <MetricStrip s={s}/>
   <div className="mt-3 grid min-h-0 flex-1 grid-cols-[1.05fr_.95fr] gap-3">
    {category==="automacao" ? <>
      <Panel title={variant===0?"Fluxo de qualificação":variant===1?"Agenda da equipe":"Régua de comunicação"} sub="Etapas de exemplo">
       <div className="mt-3 space-y-3">{s.flow.map((v,i)=><div key={v} className="flex items-center gap-3 rounded-lg border border-[#2b4b68] bg-[#112d47] px-3 py-3"><span className="grid h-7 w-7 shrink-0 place-items-center rounded-full text-[13px] font-bold" style={{background:c.fade,color:c.soft}}>{i+1}</span><span className="flex-1 text-[14px] text-white">{v}</span><span className="text-[13px]" style={{color:i===step%3?c.main:"#8ee0c0"}}>{i===step%3?"●":"✓"}</span></div>)}</div>
       <p className="mt-4 text-[12px] leading-5 text-[#a6c8e1]">{s.details[step%3]}</p>
      </Panel>
      <Panel title={variant===0?"Entradas / semana":variant===1?"Visitas / dia":"Títulos por vencimento"} sub="Simulado"><ChartBars scenario={s}/><p className="mt-4 text-[13px] text-[#afcce0]">Fluxo automatizado apenas para demonstração. Nenhuma mensagem ou registro é enviado.</p></Panel>
    </> : category==="bi"?<>
      <Panel title={variant===0?"Evolução de oportunidades":variant===1?"Produtividade operacional":"Saldo ao longo do período"} sub="7 períodos"><ChartLine values={s.line} tone={s.tone}/><div className="mt-1 flex justify-between text-[11px] text-[#a4c8e1]"><span>Início do período</span><span>Fim do período</span></div><p className="mt-2 text-[12px] text-[#aac8dc]">{s.details[step%3]}</p></Panel>
      <Panel title={variant===0?"Canais de aquisição":variant===1?"Carga por equipe":"Receitas por mês"} sub="Distribuição"><ChartBars scenario={s}/><p className="mt-3 text-[12px] text-[#bed1e1]">Acompanhamento: {s.flow[step%3]}</p></Panel>
    </>:category==="sistemas"?<>
     <Panel title={variant===0?"Últimas ordens":variant===1?"Itens monitorados":"Sprint atual"} sub="Selecionável">
      <div className="space-y-2">{s.flow.map((v,i)=><div key={v} className="flex items-center gap-2 rounded-lg border border-[#2b4e66] bg-[#112d46] px-3 py-3 text-[13px]"><span className="text-[#92d9fe]">{i===step%3?"◉":"○"}</span><span className="min-w-0 flex-1 truncate">{v}</span><span className="max-w-[120px] truncate text-[11px]" style={{color:c.soft}}>{s.details[i]}</span></div>)}</div>
     </Panel>
     <Panel title={variant===0?"Execuções / semana":variant===1?"Saldos por categoria":"Tarefas por etapa"} sub="Painel"><ChartBars scenario={s}/><div className="mt-4 flex items-center justify-between text-[13px]"><span className="text-[#a8cadd]">Indicador ativo</span><span className="font-semibold" style={{color:c.soft}}>{s.kpis[2]}</span></div></Panel>
    </>:<>
     <Panel title={variant===0?"Conversa simulada":variant===1?"Consulta de suporte":"Rascunho operacional"} sub="Assistente">
      <div className="mt-3 space-y-3">{s.flow.map((v,i)=><div key={v} className={`w-fit max-w-[95%] rounded-xl px-3 py-3 text-[14px] leading-5 ${i===1?"ml-auto bg-[#12548e] text-white":"bg-[#19364e] text-[#e1f2fd]"}`}>{v}</div>)}</div>
      <p className="mt-4 text-[12px] text-[#a8cbdc]">Nenhum modelo conectado ou envio real.</p>
     </Panel>
     <Panel title={variant===0?"Conversas por período":variant===1?"Assuntos consultados":"Ações preparadas"} sub="Simulação"><ChartLine values={s.line} tone={s.tone}/><p className="mt-3 text-[13px] text-[#c4d5e6]">{s.details[step%3]}</p></Panel>
    </>}
   </div>
  </div>;
}
function MobileScene({s,category,variant,step}:{s:Scenario;category:DemoCategory;variant:number;step:number}){
 const c=colors[s.tone];
 return <div className="flex h-full flex-col bg-[#08192b] text-white">
  <div className="flex h-[56px] shrink-0 items-center justify-between border-b border-[#294764] px-6"><div className="flex items-center gap-2"><span className="text-[23px]" style={{color:c.main}}>{s.icon}</span><span className="text-[17px] font-bold">{category==="sites"?s.title:category==="ia"?"Vorzax IA":s.title}</span></div><span className="text-[19px] text-[#b2d1e5]">☰</span></div>
  {category==="sites"?<div className="relative h-[215px] shrink-0 overflow-hidden" style={{backgroundImage:`linear-gradient(0deg,rgba(5,18,30,.8),rgba(7,22,37,.12)),url("${s.image}")`,backgroundSize:"cover",backgroundPosition:"center"}}><span className="absolute left-5 top-5 rounded-full bg-[#102c43]/80 px-3 py-2 text-[12px] font-semibold">{s.kicker}</span><h3 className="absolute bottom-5 left-5 right-5 text-[28px] font-bold leading-[1.08]">{s.intro}</h3></div>:<div className="px-5 pt-5"><span className="text-[12px] font-bold tracking-[.1em]" style={{color:c.main}}>{s.kicker}</span><h3 className="mt-2 text-[24px] font-bold leading-[1.1]">{s.title}</h3><p className="mt-2 text-[14px] text-[#bdd1e0]">{s.intro}</p></div>}
  <div className="mt-5 grid grid-cols-3 gap-2 px-4">{s.kpis.map((v,i)=><div key={i} className="rounded-xl border border-[#34516d] bg-[#12304a] px-2 py-3 text-center"><p className="text-[18px] font-bold" style={{color:c.soft}}>{v}</p><p className="mt-1 text-[11px] text-[#d0e2ee]">{s.metricLabels[i]}</p></div>)}</div>
  <div className="mx-4 mt-4 rounded-[15px] border border-[#2d4e6c] bg-[#10263c] p-4">
   <p className="mb-2 text-[15px] font-semibold">{category==="sites"?"Nossos serviços":category==="automacao"?"Etapas do processo":category==="bi"?"Evolução dos indicadores":category==="sistemas"?"Painel de controle":"Atendimento e intenções"}</p>
   {category==="sites"?<div className="space-y-3">{s.flow.map(v=><div key={v} className="flex justify-between border-b border-[#34546b] pb-2 text-[14px]"><span>{v}</span><span style={{color:c.main}}>↗</span></div>)}</div>:<ChartLine values={s.line} tone={s.tone}/>}
  </div>
  <div className="mx-4 mt-4 rounded-[15px] border border-[#2d4e6c] bg-[#10263c] p-4"><p className="mb-3 text-[15px] font-semibold">{category==="sites"?"Como atuamos":category==="bi"?"Pontos de atenção":"Acompanhamento"}</p><div className="space-y-2">{s.details.map((v,i)=><div key={i} className="flex items-center gap-2 text-[13px] text-[#d9e8f4]"><span style={{color:c.main}}>{i===step%3?"◉":"✓"}</span><span>{v}</span></div>)}</div></div>
  <p className="mx-5 mt-auto pb-4 pt-4 text-[11px] font-semibold text-[#8fb0cb]">{s.foot}</p>
  <div className="flex h-[54px] shrink-0 items-center justify-around border-t border-[#34516b] bg-[#071727] text-[12px] text-[#b4d2e7]"><span>⌂ Início</span><span>▤ Painel</span><span>☷ Menu</span></div>
 </div>;
}
export function ShowcaseScene({category,variant,device="desktop",step=0}:{category:DemoCategory;variant:number;device?:DemoDevice;step?:number;playing?:boolean}){
 const s=data[category][Math.min(2,Math.max(0,variant))];
 const phone=device==="mobile";
 return <div data-showcase-scene={category+"-"+variant+"-"+device} className={`relative overflow-hidden bg-[#071627] text-white ${phone?"h-[874px] w-[402px]":"h-[480px] w-[900px]"}`}>
  {phone?<MobileScene s={s} category={category} variant={variant} step={step}/>:<>
   <div className="flex h-[65px] items-center justify-between border-b border-[#23405b] px-6">
    <div className="flex items-center gap-3"><div className="grid h-10 w-10 place-items-center rounded-xl text-[22px]" style={{background:colors[s.tone].fade,color:colors[s.tone].soft}}>{s.icon}</div><div><p className="text-[12px] font-semibold uppercase tracking-[.1em]" style={{color:colors[s.tone].main}}>{s.kicker}</p><h2 className="mt-1 text-[20px] font-semibold tracking-[-.04em]">{s.title}</h2></div></div>
    <span className="rounded-full border border-[#365873] px-3 py-1.5 text-[12px] text-[#b5d7ef]">DEMO • DADOS SIMULADOS</span>
   </div>
   <div className="h-[380px]">{<DesktopScene s={s} category={category} variant={variant} step={step}/>}</div>
   <div className="flex h-[35px] items-center justify-between border-t border-[#254966] px-6 text-[11px] text-[#a7c7df]"><span>{s.foot}</span><span>VORZAX / VISUALIZAÇÃO CONCEITUAL</span></div>
  </>}
 </div>;
}

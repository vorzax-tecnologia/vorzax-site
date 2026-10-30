"use client";

import { useState } from "react";

type Group="automacao"|"sistemas"|"ia";
const themes={
 automacao:{accent:"#57c8fb",dark:"#0d2945",title:"Fluxos",kicker:"AUTOMAÇÃO OPERACIONAL"},
 sistemas:{accent:"#73c0fa",dark:"#102c46",title:"Gestão",kicker:"SISTEMA DE GESTÃO"},
 ia:{accent:"#b5a4ff",dark:"#282247",title:"Vorzax IA",kicker:"ASSISTENTE VIRTUAL"},
};
const cases:Record<Group,{name:string,detail:string,stats:[string,string,string],labels:[string,string,string],options:string[],statuses:string[],hint:string}[]>={
 automacao:[
  {name:"Captação de leads",detail:"Solicitação recebida pelo site e encaminhada ao comercial.",stats:["128","18","04"],labels:["Entradas","Qualificados","Etapas"],options:["Formulário recebido","Triagem de serviço","Oportunidade no CRM","Notificar comercial"],statuses:["Registrado","Classificado","Preparado","Aguardando"],hint:"Empresa: Comercial Jardim Sul • Manutenção preventiva"},
  {name:"Agenda técnica",detail:"Visitas agendadas por dia, equipe e disponibilidade.",stats:["32","08","91%"],labels:["Visitas","Equipes","Ocupação"],options:["Seg · 08h00","Ter · 09h30","Qua · 14h00","Qui · 11h00"],statuses:["Reservado","Livre","Selecionado","Disponível"],hint:"Equipe B • Climatização comercial • Região Central"},
  {name:"Cobranças e avisos",detail:"Carteira acompanhada por vencimento e retorno.",stats:["86","12","07"],labels:["Títulos","Pendentes","Avisos"],options:["FAT-1024 • Loja do Centro","FAT-1025 • Edifício Vista","FAT-1026 • Mercado Atlântico","FAT-1027 • Oficina Nobre"],statuses:["Liquidado","Pendente","Aviso preparado","Em análise"],hint:"Mensagens e cobranças não são enviadas nesta demonstração"},
 ],
 sistemas:[
  {name:"Ordens de serviço",detail:"Acompanhe tarefas, status e responsáveis de campo.",stats:["48","12","08"],labels:["Ordens","Em curso","Equipes"],options:["OS-204 • Edifício Horizonte","OS-205 • Mercado Central","OS-206 • Centro Logístico"],statuses:["Em execução","Agendada","Finalizada"],hint:"Manutenção VRF • Equipe Norte • Prazo de exemplo"},
  {name:"Controle de estoque",detail:"Consulte saldos, códigos e reposição.",stats:["286","07","35"],labels:["Itens","Alertas","Movimentos"],options:["Filtro HEPA • FLT-300","Sensor térmico • SNS-204","Compressor 2HP • CMP-210","Conector • CNX-083"],statuses:["38 em estoque","07 • Repor","12 em estoque","03 • Crítico"],hint:"Selecione um item para consultar a situação do estoque"},
  {name:"Gestão de projetos",detail:"Tarefas e entregas organizadas por sprint.",stats:["24","08","76%"],labels:["Tarefas","Em curso","Progresso"],options:["Briefing inicial","Interface principal","Integração visual","Revisão responsiva"],statuses:["A fazer","Em execução","Em execução","Validação"],hint:"Selecione uma tarefa para ver seu estágio na sprint"},
 ],
 ia:[
  {name:"Atendimento comercial",detail:"Chat ilustrativo para qualificação inicial.",stats:["128","96%","23"],labels:["Conversas","Respostas","Leads"],options:["Quero um orçamento","Quais são os serviços?","Falar com atendente"],statuses:["Identificar necessidade","Apresentar serviços","Transferir conversa"],hint:"Fluxo pré-definido, sem IA ou canal de mensagens conectado"},
  {name:"Suporte e FAQ",detail:"Consulta guiada a uma base de conhecimento fictícia.",stats:["84%","14","03"],labels:["Autoajuda","Artigos","Assuntos"],options:["Como recuperar o acesso?","Como consultar um pedido?","Preciso abrir um chamado"],statuses:["Orientar recuperação","Consultar protocolo","Preparar encaminhamento"],hint:"Artigos de exemplo — nenhuma consulta externa é feita"},
  {name:"Assistente operacional",detail:"Ajude a organizar solicitações sem executar ações reais.",stats:["38","12","06"],labels:["Pedidos","Resumos","Ações"],options:["Resumir solicitações","Preparar ordem de serviço","Consultar prioridades"],statuses:["Resumo para revisão","Rascunho aguardando","Lista de prioridades"],hint:"Nenhuma tarefa, OS ou relatório é criado de verdade"},
 ],
};
const responses=[
 ["Para preparar o orçamento, preciso entender o serviço e a área atendida.","Posso apresentar sites, automações, dashboards e sistemas.","Vou indicar o caminho para o atendimento humano."],
 ["Utilize a opção de recuperação de acesso no portal.","O protocolo pode ser consultado na central de atendimento.","Posso registrar um resumo para um atendente."],
 ["Agrupei três solicitações em uma lista para revisão.","Preparei um modelo de ordem de serviço ilustrativa.","Organizei as tarefas de exemplo por prioridade."],
];
export function MobileProductExperience({category,variant}:{category:Group;variant:number}){
 const [chosen,setChosen]=useState(0);
 const [view,setView]=useState<"painel"|"detalhe">("painel");
 const item=cases[category][variant],theme=themes[category];
 const ai=category==="ia";
 return <div className="flex h-full flex-col overflow-hidden bg-[#071727] text-white">
  <header className="flex h-[96px] shrink-0 items-end justify-between border-b border-[#2c4d67] px-5 pb-3 pt-[43px]">
   <div className="flex items-center gap-2"><span className="text-[23px]" style={{color:theme.accent}}>{ai?"✦":category==="sistemas"?"▤":"↗"}</span><span className="text-[18px] font-bold tracking-[-.04em]">{theme.title}</span></div>
   <span className="text-lg text-[#b9d8e7]">☰</span>
  </header>
  <main className="min-h-0 flex-1 px-4 pt-5">
   <p className="text-[11px] font-bold uppercase tracking-[.14em]" style={{color:theme.accent}}>{theme.kicker}</p>
   <h3 className="mt-2 text-[24px] font-semibold leading-[1.1] tracking-[-.04em]">{item.name}</h3>
   <p className="mt-2 min-h-[42px] text-[13px] leading-[1.5] text-[#bbd3e5]">{item.detail}</p>
   <div className="mt-4 grid grid-cols-3 gap-2">{item.stats.map((value,i)=><div key={i} className="rounded-xl border border-[#365974] bg-[#102c45] px-2 py-3 text-center"><p className="text-[20px] font-bold" style={{color:theme.accent}}>{value}</p><p className="mt-1 text-[10px] text-[#d1e3ef]">{item.labels[i]}</p></div>)}</div>
   <section className="mt-4 overflow-hidden rounded-[15px] border border-[#345b78] bg-[#0d253c]">
     <div className="flex items-center justify-between border-b border-[#315170] px-4 py-3"><h4 className="text-[14px] font-semibold">{ai?"Conversa e ações":category==="sistemas"?"Registros e status":"Etapas e registros"}</h4><span className="rounded-full bg-[#173f60] px-2 py-1 text-[10px]" style={{color:theme.accent}}>DEMO</span></div>
     <div className="space-y-2 p-3">{item.options.map((option,i)=><button type="button" key={option} aria-pressed={chosen===i} onClick={()=>{setChosen(i);setView("detalhe")}} className={`flex w-full items-center justify-between gap-2 rounded-lg border px-3 py-3 text-left transition-colors ${chosen===i?"border-[#65a9cd] bg-[#1a4262]":"border-[#2d4d67] bg-[#102d45]"}`}><span className="min-w-0 flex-1 text-[12px] font-semibold">{option}</span><span className="shrink-0 text-[10px]" style={{color:theme.accent}}>{chosen===i?"●":"↗"}</span></button>)}</div>
   </section>
   <section className="mt-3 rounded-[14px] border border-[#375b73] bg-[#132e46] px-4 py-3" aria-live="polite">
    <div className="flex items-center justify-between gap-2"><p className="text-[11px] font-bold" style={{color:theme.accent}}>{view==="detalhe"?"DETALHE SELECIONADO":"ACOMPANHAMENTO"}</p><span className="text-[10px] text-[#a8c8de]">0{chosen+1} / 0{item.options.length}</span></div>
    <p className="mt-2 text-[13px] font-semibold text-white">{item.statuses[chosen]}</p>
    <p className="mt-2 text-[11px] leading-4 text-[#b6d2e4]">{ai?responses[variant][chosen]:item.hint}</p>
   </section>
  </main>
  <div className="shrink-0 px-4 pb-2 pt-2 text-[9px] uppercase tracking-[.06em] text-[#95b6cd]">Conceito visual • dados simulados • nenhuma ação externa</div>
  <footer className="flex h-[48px] shrink-0 items-center justify-around border-t border-[#35546e] bg-[#081828] text-[11px] text-[#c1d9e8]"><button type="button" onClick={()=>setView("painel")} className={view==="painel"?"font-bold text-white":""}>⌂ Painel</button><button type="button" onClick={()=>setView("detalhe")} className={view==="detalhe"?"font-bold text-white":""}>▤ Detalhes</button><span>⚙ Opções</span></footer>
 </div>;
}

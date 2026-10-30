"use client";

import { useState } from "react";
import { DemoFrame, type VisualProps } from "./DemoSites";
import { MiniColumns, SegmentedMeter, TrendPlot } from "./DemoInsights";

const common = "Dados simulados • sem IA conectada";

function SalesAssistant({mobile,step=0}:{mobile:boolean;step?:number}) {
  const [intent,setIntent]=useState(0);
  const intents=[
    {label:"Quero um orçamento",answer:"Posso reunir algumas informações e preparar o encaminhamento para a equipe comercial.",tag:"Solicitação de orçamento"},
    {label:"Quais serviços oferecem?",answer:"A demonstração apresenta serviços, identifica necessidades e sugere o próximo passo.",tag:"Informações de serviços"},
    {label:"Quero falar com alguém",answer:"Vou registrar a intenção e indicar atendimento humano. Nenhum contato real é enviado nesta demonstração.",tag:"Atendimento humano"}
  ];
  return <div className="min-h-[430px] bg-[#071827] p-3 text-white sm:p-5">
    <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[#274b6a] pb-3">
      <div><p className="text-[9px] font-semibold tracking-[.18em] text-[#77d0ff]">VORZAX IA / COMERCIAL</p><h4 className="mt-1 text-lg font-bold tracking-[-.04em]">Atendimento comercial assistido</h4></div>
      <span className="rounded-full border border-[#306d81] bg-[#0f3442] px-3 py-1.5 text-[9px] text-[#a5e7e4]">● SIMULAÇÃO</span>
    </div>
    <div className="mt-3 grid grid-cols-3 gap-2">
      {[[128,"Conversas"],["96%","Respostas"],[23,"Leads"]].map(([n,label])=><div key={label} className="rounded-lg border border-[#2a516e] bg-[#112e48] p-3"><span className="text-[9px] text-[#a5c6df]">{label}</span><p className="mt-1 text-xl font-bold text-white">{n}</p></div>)}
    </div>
    <div className={`mt-3 grid gap-3 ${mobile?"grid-cols-1":"grid-cols-[1.24fr_.76fr]"}`}>
      <div className="overflow-hidden rounded-xl border border-[#2c5673] bg-[#091f33]">
        <div className="flex items-center gap-2 border-b border-[#294c65] px-3 py-2"><span className="grid h-8 w-8 place-items-center rounded-lg bg-[#115f94] font-bold text-[#b9eaff]">✦</span><div><p className="text-[11px] font-semibold">Assistente Vorzax</p><p className="text-[9px] text-[#a6bdd0]">Fluxo comercial demonstrativo</p></div></div>
        <div className="space-y-3 p-3">
          <p className="max-w-[86%] rounded-xl rounded-tl-sm bg-[#153954] px-3 py-2.5 text-[11px] leading-5 text-[#e2f3ff]">Olá! Como posso ajudar sua empresa hoje?</p>
          <p className="ml-auto w-fit max-w-[88%] rounded-xl rounded-tr-sm bg-[#0870ba] px-3 py-2.5 text-[11px] leading-5">{intents[intent].label}</p>
          <p key={intent} className="vx-ai-appear max-w-[92%] rounded-xl rounded-tl-sm bg-[#143b50] px-3 py-2.5 text-[11px] leading-5 text-[#d9f2fa]">{intents[intent].answer}</p>
        </div>
        <div className="flex flex-wrap gap-1.5 border-t border-[#24435d] p-3">{intents.map((item,i)=><button key={item.label} type="button" aria-pressed={intent===i} onClick={()=>setIntent(i)} className={`rounded-md border px-2 py-2 text-[9px] font-semibold transition-colors ${intent===i?"border-[#68bfff] bg-[#114b73] text-white":"border-[#315d7b] text-[#b9d8e9] hover:bg-[#163c59]"}`}>{item.label}</button>)}</div>
      </div>
      <div className="flex flex-col gap-3"><div className="rounded-xl border border-[#2d5e77] bg-[#10334a] p-4"><p className="text-[9px] font-bold tracking-[.1em] text-[#86d9f7]">INTENÇÃO IDENTIFICADA</p><p className="mt-3 text-[13px] font-semibold text-white">{intents[intent].tag}</p><div className="mt-4 flex justify-between border-t border-[#315875] pt-3 text-[10px] text-[#b2cce0]"><span>Rota sugerida</span><span className="text-[#8ce2cd]">Comercial ↗</span></div></div><div className="rounded-xl border border-[#244c65] bg-[#0b263b] p-3 text-[10px] leading-5 text-[#abc8db]">Conversas, taxas e leads são exemplos fictícios. Nenhuma mensagem é enviada.</div></div>
    </div>
    <div className="vx-demo-optional mt-3 grid gap-3 rounded-xl border border-[#2d5777] bg-[#0d2c44] p-4 sm:grid-cols-[1.1fr_.9fr]">
    <div><p className="text-[11px] font-semibold text-[#d1eeff]">Conversas ilustrativas / semana</p><TrendPlot tone="blue" values={[13,19,16,28,24,35,31]} height={74}/></div>
    <div className="flex flex-col justify-center"><p className="mb-3 text-[11px] font-semibold text-[#d1eeff]">Intenções identificadas</p><SegmentedMeter tone="blue" segments={[{label:"Orçamentos",value:42},{label:"Serviços",value:35},{label:"Humano",value:23}]}/></div>
  </div>
  <span className="mt-2 block text-[10px] text-[#abc7da]">{common} · Etapa visual {step%4+1}/4</span>
  </div>;
}

function SupportAssistant({mobile}:{mobile:boolean}){
  const [topic,setTopic]=useState(0);
  const [outcome,setOutcome]=useState<"resolved"|"forwarded"|null>(null);
  const questions=[
    {title:"Acesso e login",answer:"Verifique o endereço de acesso e solicite recuperação de senha pelo canal oficial.",ref:"ART-008"},
    {title:"Acompanhar solicitação",answer:"Consulte o protocolo no portal de atendimento. Se necessário, encaminhe à equipe.",ref:"ART-021"},
    {title:"Falar com suporte",answer:"Registre o assunto e o contexto para facilitar a transferência ao atendimento humano.",ref:"ART-034"}
  ];
  return <div className="min-h-[430px] bg-[#f1f7f8] p-3 text-[#173544] sm:p-5">
    <header className="flex flex-wrap justify-between gap-2 border-b border-[#cddfe5] pb-3"><div><span className="text-[9px] font-bold uppercase tracking-[.16em] text-[#177a88]">CENTRAL DE CONHECIMENTO / DEMO</span><h4 className="mt-1 text-xl font-bold tracking-[-.04em]">Suporte com respostas contextualizadas.</h4></div><span className="h-fit rounded-lg bg-[#d6efed] px-3 py-2 text-[10px] font-semibold text-[#185c62]">BASE ILUSTRATIVA</span></header>
    <div className="mt-3 grid grid-cols-3 gap-2">{[["84%","Autoatendimento"],["14","Artigos"],["3","Filas"]].map(([n,l])=><div key={l} className="rounded-lg border border-[#cfdfe3] bg-white p-3"><p className="text-[9px] text-[#476775]">{l}</p><p className="mt-1 text-xl font-bold">{n}</p></div>)}</div>
    <div className={`mt-3 grid gap-3 ${mobile?"grid-cols-1":"grid-cols-[.8fr_1.2fr]"}`}>
      <div className="space-y-2 rounded-xl border border-[#d1e1e5] bg-white p-3"><p className="pb-1 text-[10px] font-bold uppercase tracking-[.11em] text-[#46727a]">Dúvidas frequentes</p>{questions.map((q,i)=><button type="button" key={q.ref} aria-pressed={topic===i} onClick={()=>{setTopic(i);setOutcome(null)}} className={`w-full rounded-lg border p-3 text-left text-[11px] font-semibold ${topic===i?"border-[#39a1a7] bg-[#dbf2ee] text-[#145b64]":"border-[#d9e5e7] text-[#4c6572] hover:bg-[#eef5f5]"}`}>{q.title} <span className="float-right">↗</span></button>)}</div>
      <div className="rounded-xl border border-[#cddde2] bg-white p-4"><p className="text-[9px] font-bold tracking-[.14em] text-[#0e6370]">ARTIGO {questions[topic].ref} / REFERÊNCIA FICTÍCIA</p><h5 className="mt-4 text-lg font-semibold">{questions[topic].title}</h5><p key={topic} className="vx-ai-appear mt-3 text-xs leading-6 text-[#445e6c]">{questions[topic].answer}</p><div className="mt-5 rounded-lg border border-[#cce0e4] bg-[#eff8f7] p-3"><p className="text-[10px] font-semibold text-[#1e6e77]">Próximo passo sugerido</p><p className="mt-2 text-[11px] leading-5 text-[#4b6c72]">Confirmar se a orientação resolveu ou encaminhar a um atendente.</p></div><div className="mt-5 flex flex-wrap gap-2"><button type="button" onClick={()=>setOutcome("resolved")} aria-pressed={outcome==="resolved"} className="rounded-lg bg-[#147c88] px-3 py-2 text-[10px] font-bold text-white">Problema resolvido ✓</button><button type="button" onClick={()=>setOutcome("forwarded")} aria-pressed={outcome==="forwarded"} className="rounded-lg border border-[#c5dadc] px-3 py-2 text-[10px] text-[#245d65]">Encaminhar ↗</button></div></div>
    </div>
    {outcome&&<p aria-live="polite" className="mt-2 rounded-md bg-[#d9eef3] px-3 py-2 text-[11px] font-semibold text-[#125b70]">{outcome==="resolved"?"Atendimento ilustrativo concluído.":"Encaminhamento ilustrativo registrado. Nenhuma solicitação real foi enviada."}</p>}
    <div className="vx-demo-optional mt-3 rounded-xl border border-[#cedee2] bg-white p-4">
      <p className="text-[11px] font-semibold text-[#244c5c]">Solicitações por assunto / exemplo</p>
      <MiniColumns tone="teal" values={[18,9,14,5,11]} labels={["Login","Pedidos","Portal","Acesso","Outros"]} height={65}/>
    </div>
    <p className="mt-3 text-[10px] text-[#4a6a72]">{common} · respostas pré-definidas, sem consulta real</p>
  </div>;
}

function OperationsAssistant({mobile,step=0}:{mobile:boolean;step?:number}){
  const [action,setAction]=useState(0);
  const tasks=[
    {title:"Resumir solicitações",detail:"Organizar os pedidos recebidos em um resumo para conferência.",tags:["3 registros","Resumo","Revisão"]},
    {title:"Preparar ordem de serviço",detail:"Estruturar uma ordem de serviço a partir de um pedido ilustrativo.",tags:["Solicitação","OS em rascunho","Aprovação"]},
    {title:"Consultar prioridades",detail:"Agrupar tarefas simuladas conforme urgência e prazo.",tags:["Prioridades","Prazos","Equipe"]}
  ];
  return <div className="min-h-[430px] bg-[#101627] p-3 text-white sm:p-5">
    <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[#353856] pb-3"><div><p className="text-[9px] font-bold uppercase tracking-[.16em] text-[#beb4ff]">COPILOTO OPERACIONAL / DEMO</p><h4 className="mt-1 text-xl font-bold tracking-[-.04em]">Assistente de operações.</h4></div><span className="rounded-full border border-[#6561a6] bg-[#332c5a] px-3 py-2 text-[9px] font-bold text-[#ddd4ff]">✦ VORZAX IA</span></div>
    <div className="mt-3 grid grid-cols-3 gap-2">{[["38","Solicitações"],["12","Resumos"],["06","Ações"]].map(([n,l])=><div key={l} className="rounded-lg border border-[#3d405b] bg-[#25263f] p-3"><span className="text-[9px] text-[#c5c2e3]">{l}</span><p className="mt-1 text-xl font-bold">{n}</p></div>)}</div>
    <div className={`mt-3 grid gap-3 ${mobile?"grid-cols-1":"grid-cols-[.85fr_1.15fr]"}`}>
      <div className="space-y-2 rounded-xl border border-[#444363] bg-[#212138] p-3"><p className="mb-2 text-[10px] font-semibold text-[#c9c7ed]">O que deseja preparar?</p>{tasks.map((task,i)=><button key={task.title} type="button" aria-pressed={action===i} onClick={()=>setAction(i)} className={`w-full rounded-lg border px-3 py-3 text-left text-[11px] font-semibold ${action===i?"border-[#a99af7] bg-[#453a72]":"border-[#494862] bg-[#2b2a43] hover:bg-[#3b375a]"}`}>✦　{task.title}</button>)}</div>
      <div className="rounded-xl border border-[#5a5079] bg-[#24213e] p-4"><p className="text-[9px] font-semibold tracking-[.13em] text-[#c6baff]">RESULTADO / RASCUNHO SIMULADO</p><h5 className="mt-4 text-lg font-bold">{tasks[action].title}</h5><p className="mt-3 text-xs leading-6 text-[#d0cfe3]">{tasks[action].detail}</p><div className="mt-4 space-y-2">{tasks[action].tags.map((tag,i)=><div key={tag} className={`flex items-center justify-between rounded-lg border border-[#575176] bg-[#302e4c] px-3 py-2.5 text-[10px]`}><span>{tag}</span><span className="text-[#b8a8fa]">{i===step%3?"●":"✓"}</span></div>)}</div><div className="mt-4 rounded-lg border border-[#665b81] bg-[#3b3658] px-3 py-2.5 text-[10px] text-[#e7e2ff]">Aguardando revisão humana — nenhuma ação externa é executada</div></div>
    </div>
    <div className="vx-demo-optional mt-3 grid gap-3 rounded-xl border border-[#4b486d] bg-[#252440] p-3 sm:grid-cols-[1.1fr_.9fr]">
      <div><p className="text-[11px] font-semibold text-[#e7deff]">Rascunhos preparados / semana</p><MiniColumns tone="violet" values={[3,6,4,8,7]} labels={["Seg","Ter","Qua","Qui","Sex"]} height={63}/></div>
      <div className="flex flex-col justify-center"><p className="mb-3 text-[11px] font-semibold text-[#e7deff]">Revisões humanas</p><SegmentedMeter tone="violet" segments={[{label:"Pendentes",value:4},{label:"Revisados",value:10},{label:"Rejeitados",value:2}]}/></div>
    </div>
    <p className="mt-2 text-[10px] text-[#cbc5e0]">{common} · nenhuma conexão com sistemas reais</p>
  </div>;
}
export function AIDemo({variant,device,compact=false,step=0}:VisualProps) {
  const mobile=device==="mobile"&&!compact;
  return <DemoFrame device={device} compact={compact} title={["vorzax-ia.comercial","vorzax-ia.suporte","vorzax-ia.operacao"][variant]} dark={variant!==1}>
    {variant===0?<SalesAssistant mobile={mobile} step={step}/>:variant===1?<SupportAssistant mobile={mobile}/>:<OperationsAssistant mobile={mobile} step={step}/>}
  </DemoFrame>;
}

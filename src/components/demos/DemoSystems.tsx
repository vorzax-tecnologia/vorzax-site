"use client";
import { useState } from "react";
import { DemoFrame, type VisualProps } from "./DemoSites";

const orders=[
 {id:"OS-204",client:"Edifício Horizonte",task:"Manutenção VRF",status:"Em execução",owner:"Equipe Norte"},
 {id:"OS-205",client:"Mercado Central",task:"Visita preventiva",status:"Agendada",owner:"Equipe Sul"},
 {id:"OS-206",client:"Centro Logístico",task:"Inspeção técnica",status:"Finalizada",owner:"Equipe Leste"},
];
function WorkOrder({mobile,step=0}:{mobile:boolean;step?:number}){
 const [selected,setSelected]=useState(0);const order=orders[selected];
 return <div className="min-h-[475px] bg-[#091a2d] text-white">
  <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[#294563] bg-[#102940] px-5 py-4"><div><p className="text-[10px] font-bold tracking-[.16em] text-[#81ccff]">GESTÃO DE ATENDIMENTOS</p><h4 className="mt-1 text-lg font-bold">Central de ordens de serviço</h4></div><span className="rounded-lg bg-[#0b73bb] px-3 py-2 text-[10px] font-bold">+ Nova OS</span></div>
  <div className="grid grid-cols-3 gap-2 p-4 sm:px-6">{[["Abertas","12"],["Agendadas","08"],["Finalizadas","30"]].map(([name,n])=><div key={name} className="rounded-lg border border-[#315170] bg-[#163452] p-3"><p className="text-[10px] text-[#a7c7df]">{name}</p><p className="mt-2 text-[22px] font-bold">{n}</p></div>)}</div>
  <div className={`grid gap-3 px-4 pb-5 sm:px-6 ${mobile?"grid-cols-1":"grid-cols-[1.15fr_.85fr]"}`}>
   <div className="overflow-hidden rounded-xl border border-[#2c4b68] bg-[#102a43]"><div className="flex justify-between border-b border-[#2c4b68] p-3"><strong className="text-[11px]">Ordens recentes</strong><span className="text-[9px] text-[#9fbed7]">Selecionar uma OS</span></div>{orders.map((o,i)=><button type="button" key={o.id} onClick={()=>setSelected(i)} aria-pressed={selected===i} className={`flex w-full items-center justify-between gap-2 border-b border-[#284661] px-3 py-3 text-left transition-colors ${selected===i?"bg-[#1a5277]":"hover:bg-[#153b58]"}`}><div><span className="text-[9px] font-bold text-[#81ccff]">{o.id}</span><p className="mt-1 text-[11px] font-semibold">{o.client}</p><p className="mt-1 text-[9px] text-[#aac2d5]">{o.task}</p></div><span className="shrink-0 text-[9px] text-[#c4dced]">↗</span></button>)}</div>
   <div className="rounded-xl border border-[#346288] bg-[#12344f] p-4"><p className="text-[10px] font-bold text-[#95d3fc]">DETALHES / {order.id}</p><h5 className="mt-4 text-lg font-bold leading-6">{order.client}</h5><p className="mt-2 text-xs text-[#bcd4e6]">{order.task}</p><div className="my-4 h-px bg-[#376080]"/><p className="text-[10px] text-[#a4c5dc]">RESPONSÁVEL</p><p className="mt-1 text-xs font-semibold">{order.owner}</p><p className="mt-4 text-[10px] text-[#a4c5dc]">STATUS DA EXECUÇÃO</p><div className="mt-2 flex items-center justify-between rounded-lg border border-[#2e799d] bg-[#185677] px-3 py-2.5 text-xs"><span>{order.status}</span><span>{step%4===1?"●":"✓"}</span></div></div>
  </div>
 </div>;
}
const stock=[
 ["Filtro HEPA 300","FLT-300","38","Normal"],
 ["Sensor térmico","SNS-204","07","Repor"],
 ["Compressor 2HP","CMP-210","12","Normal"],
 ["Conector industrial","CNX-083","03","Crítico"],
];
function StockControl({mobile}:{mobile:boolean}){
 const [filter,setFilter]=useState<"todos"|"alertas">("todos");
 const records=stock.filter(r=>filter==="todos"||r[3]!=="Normal");
 return <div className="min-h-[475px] bg-[#f0f4f6] text-[#243c49]">
   <div className="flex items-center justify-between border-b border-[#d5e1e5] bg-white px-5 py-4"><div><span className="text-[10px] font-bold uppercase tracking-[.16em] text-[#0c5a6b]">CONTROLE DE MATERIAIS</span><h4 className="mt-1 text-lg font-bold">Inventário e movimentações</h4></div><span className="rounded-lg bg-[#136e83] px-3 py-2 text-[10px] font-bold text-white">+ Entrada</span></div>
   <div className="grid grid-cols-3 gap-2 px-4 py-4 sm:px-6">{[["Itens","286"],["Reposição","07"],["Movimentações","35"]].map(([name,n])=><div key={name} className="rounded-xl border border-[#d3e0e5] bg-white p-3"><p className="text-[10px] text-[#405b68]">{name}</p><p className="mt-2 text-[22px] font-bold">{n}</p></div>)}</div>
   <div className="mx-4 rounded-xl border border-[#d4e2e6] bg-white p-4 sm:mx-6"><div className="flex flex-wrap items-center justify-between gap-3"><div className="rounded-lg border border-[#dbe5e9] bg-[#f7fafb] px-3 py-2 text-[10px] text-[#43616e]">⌕　Buscar código ou produto</div><div className="flex gap-2"><button onClick={()=>setFilter("todos")} aria-pressed={filter==="todos"} className={`rounded-lg px-3 py-2 text-[10px] font-semibold ${filter==="todos"?"bg-[#d8eef1] text-[#13657a]":"text-[#405a65]"}`}>Todos</button><button onClick={()=>setFilter("alertas")} aria-pressed={filter==="alertas"} className={`rounded-lg px-3 py-2 text-[10px] font-semibold ${filter==="alertas"?"bg-[#f9e2d0] text-[#9f5423]":"text-[#405a65]"}`}>Alertas</button></div></div>
   <div className="mt-4 overflow-hidden rounded-lg border border-[#dce7e9]"><div className={`grid ${mobile?"grid-cols-[1fr_50px]":"grid-cols-[1.3fr_.7fr_.5fr_.7fr]"} gap-2 bg-[#edf4f6] p-3 text-[9px] font-bold uppercase tracking-[.09em] text-[#465d68]`}><span>Produto</span>{!mobile&&<span>Código</span>}<span>Saldo</span>{!mobile&&<span>Situação</span>}</div>{records.map(([n,code,q,status])=><div key={code} className={`grid ${mobile?"grid-cols-[1fr_50px]":"grid-cols-[1.3fr_.7fr_.5fr_.7fr]"} items-center gap-2 border-t border-[#e3e9eb] px-3 py-3 text-[10px]`}><strong>{n}<span className="mt-1 block text-[9px] font-normal text-[#4a626c]">{mobile?code:""}</span></strong>{!mobile&&<span className="text-[#7f939b]">{code}</span>}<span className="font-semibold">{q}</span>{!mobile&&<span className={`w-fit rounded-md px-2 py-1 text-[9px] ${status==="Normal"?"bg-[#e5f5ed] text-[#246c51]":"bg-[#fff0df] text-[#a05a2d]"}`}>{status}</span>}</div>)}</div></div>
   <div className="flex justify-between px-6 py-3 text-[10px] text-[#425e6a]"><span>Dados demonstrativos · sem estoque real</span><span>EXPORTAR ↗</span></div>
 </div>;
}
const lanes=[
 {title:"A fazer",color:"#89a9d3",cards:[["Briefing inicial","Website"],["Mapeamento do fluxo","Automação"]]},
 {title:"Em andamento",color:"#67bdf2",cards:[["Interface principal","Design"],["Integração visual","Frontend"]]},
 {title:"Validação",color:"#e9b46f",cards:[["Revisão responsiva","QA"],["Aprovação do escopo","Revisão"]]},
];
function ProjectsKanban({mobile}:{mobile:boolean}){
 const [focused,setFocused]=useState("Interface principal");
 return <div className="min-h-[475px] bg-[#171726] text-white">
   <header className="flex items-center justify-between border-b border-[#39374d] bg-[#222034] px-5 py-4"><div><span className="text-[10px] font-bold uppercase tracking-[.15em] text-[#b5a9fa]">WORKSPACE / PROJETOS</span><h4 className="mt-1 text-lg font-bold">Quadro de entregas</h4></div><span className="rounded-lg bg-[#5041a1] px-3 py-2 text-[10px] font-bold">+ Nova tarefa</span></header>
   <div className="flex flex-wrap items-center justify-between gap-2 px-5 pt-5 text-[10px] text-[#aeb0c8]"><span>Workspace: <strong className="text-white">Projeto conceitual</strong></span><span>Quadro　 Calendário　 Timeline</span></div>
   <div className={`grid gap-3 p-4 sm:px-5 ${mobile?"grid-cols-1":"grid-cols-3"}`}>{lanes.map((lane,i)=><div key={lane.title} className="rounded-xl border border-[#414056] bg-[#252438] p-3"><div className="mb-4 flex items-center justify-between gap-2"><span className="flex items-center gap-2 text-[11px] font-bold"><i className="h-2 w-2 rounded-full" style={{background:lane.color}}/>{lane.title}</span><span className="rounded-md bg-[#39384c] px-2 py-1 text-[10px] text-[#c8c4e3]">02</span></div><div className="space-y-3">{lane.cards.map(([name,tag],j)=><button key={name} type="button" onClick={()=>setFocused(name)} aria-pressed={focused===name} className={`w-full rounded-xl border p-3 text-left transition-colors ${focused===name?"border-[#9880fc] bg-[#413969]":"border-[#48455f] bg-[#302d45] hover:border-[#7970b2]"}`}><span className="rounded-md bg-[#51496c] px-2 py-1 text-[9px] font-semibold text-[#d5c9fd]">{tag}</span><p className="mt-4 text-[11px] font-semibold leading-5">{name}</p><div className="mt-5 flex items-center justify-between text-[10px] text-[#b6b1d4]"><span className="flex h-6 w-6 items-center justify-center rounded-full border border-[#8b76a9] bg-[#47335f] font-bold">{i+1}{j+1}</span><span>{j+3} tarefas ↗</span></div></button>)}</div></div>)}</div>
   <div className="mx-5 mb-5 flex items-center justify-between gap-3 rounded-lg border border-[#565070] bg-[#312d49] px-4 py-3 text-[10px] text-[#d0c8ee]"><span>Selecionado: <strong className="text-white">{focused}</strong></span><span>SIMULAÇÃO</span></div>
 </div>;
}
export function SystemsDemo({variant,device,compact=false,step=0}:VisualProps){
 const mobile=device==="mobile"&&!compact;
 return <DemoFrame device={device} compact={compact} dark={variant!==1} title={["ordens.os","inventario.erp","projetos.kanban"][variant]}>
 {variant===0?<WorkOrder mobile={mobile} step={step}/>:variant===1?<StockControl mobile={mobile}/>:<ProjectsKanban mobile={mobile}/>}
 </DemoFrame>;
}

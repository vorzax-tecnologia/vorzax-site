"use client";

import { useId, useState, type FormEvent, type ReactNode } from "react";
import { DemoFrame, type VisualProps } from "./DemoSites";

/**
 * Three standalone, interactive product prototypes for the Vorzax showroom.
 * All records are deliberately illustrative and live only in component state.
 * No backend, customer records, CRM or analytics service is contacted.
 * The mobile prop drives composition because the simulator renders a virtual
 * 402 px screen inside a desktop-sized browser viewport.
 */

type Tone = "blue" | "teal" | "amber" | "red" | "slate";
const toneClass: Record<Tone, string> = {
  blue: "bg-[#e5f0ff] text-[#1761ae]",
  teal: "bg-[#d9f1fe] text-[#145d99]",
  amber: "bg-[#e5eef9] text-[#315f9e]",
  red: "bg-[#e9eff7] text-[#405a7e]",
  slate: "bg-[#edf1f6] text-[#60718b]",
};
const surface = "rounded-[12px] border border-[#dfe8f4] bg-white shadow-[0_3px_13px_rgba(23,53,91,.035)]";
const action = "inline-flex min-h-9 items-center justify-center gap-1.5 rounded-lg bg-[#116bd0] px-3 py-2 text-[11px] font-semibold text-white transition hover:bg-[#0756b5] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#66b2ff]";
const secondary = "inline-flex min-h-9 items-center justify-center rounded-lg border border-[#cbdcec] bg-white px-3 py-2 text-[11px] font-semibold text-[#275478] transition hover:border-[#428dd0] hover:bg-[#eef6ff] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#66b2ff]";
const field = "min-h-9 w-full min-w-0 rounded-lg border border-[#d5e2ed] bg-white px-3 py-2 text-[11px] text-[#213751] outline-none placeholder:text-[#8598ad] focus:border-[#2787dd] focus:ring-2 focus:ring-[#2787dd]/10";

function Status({ children, tone = "blue" }: { children: ReactNode; tone?: Tone }) {
  return <span className={`inline-flex w-fit shrink-0 items-center gap-1 rounded-md px-2 py-1 text-[10px] font-semibold ${toneClass[tone]}`}><span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-current" />{children}</span>;
}
function Symbol({ name, size = 16 }: { name: "grid"|"list"|"calendar"|"people"|"package"|"history"|"tasks"|"clock"|"search"|"plus"|"arrow"|"chart"; size?:number }) {
  const common = { width:size, height:size, viewBox:"0 0 24 24", fill:"none", stroke:"currentColor", strokeWidth:1.8, strokeLinecap:"round" as const, strokeLinejoin:"round" as const, "aria-hidden":true as const };
  const paths:Record<string,ReactNode>={
    grid:<><rect x="3" y="3" width="7" height="7" rx="1.5"/><rect x="14" y="3" width="7" height="7" rx="1.5"/><rect x="3" y="14" width="7" height="7" rx="1.5"/><rect x="14" y="14" width="7" height="7" rx="1.5"/></>,
    list:<><path d="M9 6h12M9 12h12M9 18h12"/><path d="M4 6h.01M4 12h.01M4 18h.01"/></>,
    calendar:<><rect x="3" y="5" width="18" height="16" rx="2"/><path d="M7 3v4m10-4v4M3 10h18"/></>,
    people:<><circle cx="9" cy="8" r="3"/><path d="M3 20v-2a6 6 0 0 1 12 0v2M17 6a3 3 0 0 1 0 6m1 3a5 5 0 0 1 3 5"/></>,
    package:<><path d="m12 2 9 5-9 5-9-5 9-5Z"/><path d="M3 7v10l9 5 9-5V7M12 12v10"/></>,
    history:<><path d="M3 11a9 9 0 1 1 2.4 6M3 4v7h7M12 7v5l4 2"/></>,
    tasks:<><path d="M9 6h12M9 12h12M9 18h12M3 6l1.5 1.5L7 5M3 12l1.5 1.5L7 11M3 18l1.5 1.5L7 17"/></>,
    clock:<><circle cx="12" cy="12" r="9"/><path d="M12 7v5l4 3"/></>,
    search:<><circle cx="10.5" cy="10.5" r="6.5"/><path d="m16 16 5 5"/></>,
    plus:<path d="M12 5v14M5 12h14"/>,
    arrow:<path d="m5 12 14 0m-6-6 6 6-6 6"/>,
    chart:<><path d="M4 20V9m6 11V4m6 16v-7m5 7V8"/></>,
  };
  return <svg {...common}>{paths[name]}</svg>;
}

function AppShell({mobile,heading,product,description,nav,view,onView,children}: {
  mobile:boolean;heading:string;product:string;description:string;
  nav:{id:string;label:string;icon:"grid"|"list"|"calendar"|"people"|"package"|"history"|"tasks"|"clock"}[];
  view:string;onView:(next:string)=>void;children:ReactNode;
}) {
  return <div className={`flex w-full bg-[#f2f6fc] font-sans text-[#162c47] ${mobile?"min-h-[608px] flex-col":"min-h-[620px] flex-row"}`}>
    {!mobile && <aside className="flex w-[174px] shrink-0 flex-col bg-[#061b32] px-3 pb-4 pt-5 text-[#c9d9e9]">
      <div className="mb-6 px-3"><p className="text-[15px] font-black tracking-[.17em] text-white">VORZAX<span className="text-[#41b5ff]">.</span></p><p className="mt-1 text-[9px] font-bold uppercase tracking-[.13em] text-[#6eacd6]">Sistemas / Demo</p></div>
      <p className="mb-2 px-3 text-[9px] font-bold uppercase tracking-[.15em] text-[#6086a5]">Navegação</p>
      <nav className="space-y-1" aria-label={`Menu da demonstração ${product}`}>{nav.map(item=><button key={item.id} type="button" onClick={()=>onView(item.id)} aria-current={view===item.id?"page":undefined} className={`flex min-h-9 w-full items-center gap-2.5 rounded-lg px-3 text-left text-[11px] font-medium transition ${view===item.id?"bg-[#1165b6] text-white":"text-[#a8c4da] hover:bg-[#123451] hover:text-white"}`}><Symbol name={item.icon} size={15}/>{item.label}</button>)}</nav>
      <div className="mt-auto rounded-lg border border-[#254b71] bg-[#0a2e51] px-3 py-3"><span className="text-[9px] font-bold uppercase tracking-[.12em] text-[#6ad0ff]">AMBIENTE DEMO</span><p className="mt-1 text-[10px] leading-[1.5] text-[#aac8dd]">Interface ilustrativa e interativa.</p></div>
    </aside>}
    <div className="min-w-0 flex-1">
      <div className={`flex items-center justify-between gap-3 border-b border-[#dce7f1] bg-white ${mobile?"px-4 py-3":"px-5 py-3.5"}`}>
        <div className="flex min-w-0 items-center gap-2.5">
          {mobile&&<span className="grid h-8 w-8 shrink-0 place-items-center rounded-lg bg-[#0a3661] text-[16px] font-extrabold text-white">V</span>}
          <div className="min-w-0"><p className="truncate text-[12px] font-bold tracking-[-.02em] text-[#173455]">{heading}</p><p className="mt-0.5 text-[9px] text-[#7b8fa7]">{product} <span className="mx-1 text-[#bdc9d7]">/</span> Conceito ilustrativo</p></div>
        </div>
        <div className="flex shrink-0 items-center gap-2"><span className="flex h-7 w-7 items-center justify-center rounded-full bg-[#e3f2ff] text-[10px] font-extrabold text-[#1b6cbd]" aria-label="Perfil demonstrativo">VD</span>{!mobile&&<span className="text-[10px] font-semibold text-[#526881]">Operador demo</span>}</div>
      </div>
      {mobile&&<nav className="flex gap-1 overflow-x-auto border-b border-[#dce7f1] bg-white px-2 pb-2" aria-label={`Seções de ${product}`}>{nav.map(item=><button key={item.id} type="button" onClick={()=>onView(item.id)} aria-pressed={view===item.id} className={`inline-flex min-h-9 shrink-0 items-center gap-1.5 rounded-lg px-3 text-[10px] font-semibold ${view===item.id?"bg-[#e0effe] text-[#0e64b5]":"text-[#637b94]"}`}><Symbol name={item.icon} size={13}/>{item.label}</button>)}</nav>}
      <div className={`${mobile?"px-3 py-3":"px-4 py-2"}`}>
        <div className="mb-3"><h4 className={`font-bold tracking-[-.04em] text-[#142f4b] ${mobile?"text-[18px]":"text-[21px]"}`}>{heading}</h4><p className="mt-1 text-[11px] text-[#6b8099]">{description}</p></div>
        {children}
      </div>
    </div>
  </div>;
}

function Metric({label,value,sub,tone="blue",mobile=false}:{label:string;value:string|number;sub:string;tone?:Tone;mobile?:boolean}) {
  const colors:Record<Tone,string>={blue:"#1d7ad8",teal:"#2f9bdf",amber:"#5d91c8",red:"#376eaa",slate:"#8396ad"};
  return <div className={`${surface} min-w-0 ${mobile?"p-3":"p-2.5"}`}>
    <div className="flex items-start justify-between gap-1"><span className="text-[10px] font-semibold leading-4 text-[#71849e]">{label}</span><span className="h-2 w-2 shrink-0 rounded-full" style={{backgroundColor:colors[tone]}}/></div>
    <p className={`mt-1 font-bold tracking-[-.055em] text-[#1a3758] ${mobile?"text-[20px]":"text-[25px]"}`}>{value}</p>
    <p className="mt-1 truncate text-[9px] text-[#8b9db0]">{sub}</p>
  </div>;
}
function SectionHead({title,side}:{title:string;side?:ReactNode}){
  return <div className="flex flex-wrap items-center justify-between gap-2"><h5 className="text-[12px] font-bold tracking-[-.025em] text-[#213a5a]">{title}</h5>{side}</div>;
}
function Trend({values,labels,stroke="#1977d3"}:{values:number[];labels:string[];stroke?:string}) {
  const gradientId=useId();const max=Math.max(1,...values);const min=Math.min(0,...values);const pts=values.map((v,i)=>`${15+(i*(310/Math.max(1,values.length-1)))},${105-(v-min)/(max-min||1)*79}`);const area=`M${pts[0]} L${pts.slice(1).join(" L")} L325 119 L15 119 Z`;
  return <div className="mt-2"><svg viewBox="0 0 340 133" className="h-[86px] w-full" preserveAspectRatio="none" role="img" aria-label="Gráfico ilustrativo da evolução semanal"><defs><linearGradient id={gradientId} x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor={stroke} stopOpacity=".20"/><stop offset="100%" stopColor={stroke} stopOpacity=".01"/></linearGradient></defs>{[30,64,98].map(y=><line key={y} x1="12" x2="328" y1={y} y2={y} stroke="#e6eef7" strokeDasharray="4 4"/>)}<path d={area} fill={`url(#${gradientId})`}/><polyline points={pts.join(" ")} fill="none" stroke={stroke} strokeWidth="2.8" strokeLinejoin="round" strokeLinecap="round"/>{pts.map((p,i)=>{const [cx,cy]=p.split(",").map(Number);return <circle key={i} cx={cx} cy={cy} r="3" fill="white" stroke={stroke} strokeWidth="2"/>})}</svg><div className="flex justify-between gap-1 text-[9px] text-[#8fa0b3]">{labels.map((label,i)=><span key={i}>{label}</span>)}</div></div>;
}
function BarRow({label,count,max,tone="blue"}:{label:string;count:number;max:number;tone?:Tone}){
 const bg=tone==="teal"?"#278bd5":tone==="amber"?"#6b98c7":"#1977d3";
 return <div className="flex items-center gap-2"><span className="w-[96px] shrink-0 truncate text-[10px] text-[#647b95]">{label}</span><div className="h-2 min-w-0 flex-1 rounded-full bg-[#eaf0f7]"><div className="h-2 rounded-full transition-all" style={{width:`${Math.min(100,Math.round(count/Math.max(1,max)*100))}%`,background:bg}}/></div><span className="w-6 shrink-0 text-right text-[10px] font-bold text-[#395673]">{count}</span></div>;
}

// ——— ORDENS DE SERVIÇO: searchable operational cockpit and mutable tickets ———
type OrderState="Aberta"|"Agendada"|"Em execução"|"Concluída";
type Order={id:string;client:string;subject:string;owner:string;priority:"Alta"|"Média"|"Baixa";status:OrderState;day:string};
const sampleOrders:Order[]=[
 {id:"OS-1042",client:"Empresa Horizonte",subject:"Manutenção preventiva",owner:"Equipe Alfa",priority:"Alta",status:"Em execução",day:"Hoje, 09:00"},
 {id:"OS-1043",client:"Comercial Exemplo",subject:"Inspeção de equipamento",owner:"Equipe Beta",priority:"Média",status:"Agendada",day:"Hoje, 14:30"},
 {id:"OS-1044",client:"Unidade Centro",subject:"Instalação de sistema",owner:"Equipe Alfa",priority:"Média",status:"Aberta",day:"Amanhã, 08:00"},
 {id:"OS-1045",client:"Operação Modelo",subject:"Revisão de componentes",owner:"Equipe Gama",priority:"Baixa",status:"Concluída",day:"Ontem, 16:00"},
 {id:"OS-1046",client:"Filial Norte",subject:"Chamado corretivo",owner:"Equipe Beta",priority:"Alta",status:"Aberta",day:"Hoje, 17:00"},
];
const orderNav=[{id:"geral",label:"Visão geral",icon:"grid"},{id:"ordens",label:"Ordens",icon:"list"},{id:"agenda",label:"Agenda",icon:"calendar"}] as const;
function OrderTone(s:OrderState):Tone{return s==="Concluída"?"teal":s==="Em execução"?"blue":s==="Agendada"?"amber":"slate"}
function OrdersDemo({mobile}:{mobile:boolean}){
 const [orders,setOrders]=useState<Order[]>(sampleOrders);
 const [view,setView]=useState("geral");const [query,setQuery]=useState("");const [filter,setFilter]=useState("Todas");const [selected,setSelected]=useState("OS-1042");const [creating,setCreating]=useState(false);
 const [draft,setDraft]=useState({client:"",subject:"",owner:"Equipe Alfa",priority:"Média" as Order["priority"]});
 const counts=(s:OrderState)=>orders.filter(x=>x.status===s).length;
 const shown=orders.filter(x=>(filter==="Todas"||x.status===filter)&&`${x.id} ${x.client} ${x.subject} ${x.owner}`.toLowerCase().includes(query.toLowerCase()));
 const current=orders.find(x=>x.id===selected)||shown[0]||orders[0];
 const advance=()=>{setOrders(v=>v.map(o=>o.id===current.id?{...o,status:o.status==="Aberta"?"Agendada":o.status==="Agendada"?"Em execução":o.status==="Em execução"?"Concluída":"Aberta"}:o))};
 const add=(e:FormEvent<HTMLFormElement>)=>{e.preventDefault();if(!draft.client.trim()||!draft.subject.trim())return;const next="OS-"+String(1042+orders.length);setOrders(v=>[{id:next,client:draft.client.trim(),subject:draft.subject.trim(),owner:draft.owner,priority:draft.priority,status:"Aberta",day:"A agendar"},...v]);setSelected(next);setView("ordens");setFilter("Todas");setQuery("");setCreating(false);setDraft({client:"",subject:"",owner:"Equipe Alfa",priority:"Média"})};
 return <AppShell mobile={mobile} heading="Central de ordens de serviço" product="Vorzax OS" description="Atendimentos, técnicos e prioridades em um só lugar." nav={[...orderNav]} view={view} onView={setView}>
   <div className="mb-3 flex flex-wrap items-center justify-between gap-2"><span className="text-[10px] text-[#8295aa]">Painel de operação / Visão demonstrativa</span><button type="button" onClick={()=>setCreating(v=>!v)} className={action}><Symbol name="plus" size={13}/>{creating?"Fechar formulário":"Nova OS"}</button></div>
   {creating&&<form onSubmit={add} className={`${surface} mb-3 grid gap-2 p-3 ${mobile?"grid-cols-2":"grid-cols-4"}`}><label className="col-span-2 text-[10px] font-semibold text-[#596f86]">Cliente / unidade<input autoFocus maxLength={40} required className={`${field} mt-1`} value={draft.client} onChange={e=>setDraft(v=>({...v,client:e.target.value}))} placeholder="Ex.: Unidade Exemplo"/></label><label className="col-span-2 text-[10px] font-semibold text-[#596f86]">Serviço<input required maxLength={55} className={`${field} mt-1`} value={draft.subject} onChange={e=>setDraft(v=>({...v,subject:e.target.value}))} placeholder="Descreva o serviço"/></label><label className="text-[10px] font-semibold text-[#596f86]">Equipe<select className={`${field} mt-1`} value={draft.owner} onChange={e=>setDraft(v=>({...v,owner:e.target.value}))}>{["Equipe Alfa","Equipe Beta","Equipe Gama"].map(x=><option key={x}>{x}</option>)}</select></label><label className="text-[10px] font-semibold text-[#596f86]">Prioridade<select className={`${field} mt-1`} value={draft.priority} onChange={e=>setDraft(v=>({...v,priority:e.target.value as Order["priority"]}))}>{["Baixa","Média","Alta"].map(x=><option key={x}>{x}</option>)}</select></label><div className="col-span-2 flex items-end justify-end"><button className={action} type="submit">Criar ordem de serviço</button></div></form>}
   <div className={`grid gap-2 ${mobile?"grid-cols-2":"grid-cols-4"}`}><Metric mobile={mobile} label="Total de ordens" value={orders.length} sub="Ordens cadastradas"/><Metric mobile={mobile} label="Em execução" value={counts("Em execução")} sub="Atendimentos ativos" tone="blue"/><Metric mobile={mobile} label="Agendadas" value={counts("Agendada")} sub="Visitas previstas" tone="amber"/><Metric mobile={mobile} label="Concluídas" value={counts("Concluída")} sub="Ordens finalizadas" tone="teal"/></div>
   {view==="geral"&&<div className={`mt-3 grid gap-3 ${mobile?"grid-cols-1":"grid-cols-[1.25fr_.75fr]"}`}><div className={`${surface} p-3`}><SectionHead title="Atendimentos por dia" side={<span className="text-[9px] text-[#8ba1b6]">Últimos 7 dias · exemplo</span>}/><Trend values={[3,5,4,8,6,9,7]} labels={["Seg","Ter","Qua","Qui","Sex","Sáb","Dom"]}/></div><div className={`${surface} p-3`}><SectionHead title="Distribuição das ordens"/><div className="mt-4 space-y-3">{(["Aberta","Agendada","Em execução","Concluída"] as OrderState[]).map(s=><BarRow key={s} label={s} count={counts(s)} max={orders.length} tone={s==="Concluída"?"teal":s==="Agendada"?"amber":"blue"}/>)}</div><p className="mt-4 border-t border-[#ebf0f7] pt-3 text-[10px] text-[#7b8fa6]">Acompanhe a evolução das ordens e as prioridades do dia.</p></div></div>}
   {view==="agenda"?<div className={`${surface} mt-3 p-3`}><SectionHead title="Agenda de atendimentos" side={<Status tone="blue">Visitas previstas</Status>}/><div className="mt-2 space-y-2">{orders.filter(o=>o.status!=="Concluída").map(o=><button key={o.id} type="button" onClick={()=>{setSelected(o.id);setView("ordens")}} className="flex w-full items-center gap-3 rounded-lg border border-[#e3ebf4] p-3 text-left hover:border-[#83b8e9]"><span className="grid h-9 w-9 place-items-center rounded-lg bg-[#e8f2ff] text-[#1678d3]"><Symbol name="calendar"/></span><span className="min-w-0 flex-1"><strong className="block truncate text-[11px] text-[#244361]">{o.subject}</strong><span className="mt-1 block text-[10px] text-[#788da3]">{o.client} · {o.owner}</span></span><span className="shrink-0 text-[10px] font-semibold text-[#2b74b1]">{o.day}</span></button>)}</div></div>:<div className={`mt-3 grid gap-3 ${mobile?"grid-cols-1":"grid-cols-[minmax(0,1.55fr)_minmax(0,.85fr)]"}`}>
     <div className={`${surface} min-w-0 p-3`}><SectionHead title="Ordens de serviço" side={<span className="text-[9px] text-[#8ba1b6]">Selecione para detalhar</span>}/><div className="mt-3 flex gap-2"><label className="flex min-w-0 flex-1 items-center gap-2 rounded-lg border border-[#d5e2ed] bg-[#f8faff] px-2"><Symbol name="search" size={14}/><input aria-label="Buscar ordem de serviço" type="search" value={query} onChange={e=>setQuery(e.target.value)} placeholder="Buscar OS, cliente ou técnico" className="min-h-9 w-full min-w-0 bg-transparent text-[11px] text-[#254360] outline-none placeholder:text-[#8aa0b4]"/></label><select aria-label="Filtrar ordens por status" value={filter} onChange={e=>setFilter(e.target.value)} className="max-w-[120px] rounded-lg border border-[#d5e2ed] bg-white px-2 text-[10px] text-[#4d6780]">{["Todas","Aberta","Agendada","Em execução","Concluída"].map(x=><option key={x}>{x}</option>)}</select></div>
       <div className="mt-3 overflow-hidden rounded-lg border border-[#e3eaf3]"><div className={`grid gap-2 bg-[#f0f5fb] px-3 py-2 text-[9px] font-bold uppercase tracking-[.08em] text-[#7b8ea5] ${mobile?"grid-cols-[1fr_86px]":"grid-cols-[75px_1.5fr_1fr_100px]"}`}><span>OS</span>{!mobile&&<><span>Cliente / serviço</span><span>Equipe</span></>}<span className={mobile?"text-right":""}>Status</span></div>{shown.map(o=><button key={o.id} type="button" onClick={()=>setSelected(o.id)} aria-pressed={selected===o.id} className={`grid w-full items-center gap-2 border-t border-[#edf1f7] px-3 py-1.5 text-left ${mobile?"grid-cols-[1fr_86px]":"grid-cols-[75px_1.5fr_1fr_100px]"} ${current?.id===o.id?"bg-[#ebf5ff]":"bg-white hover:bg-[#f5f9fd]"}`}><span className="min-w-0"><strong className="block text-[10px] text-[#2475bb]">{o.id}</strong>{mobile&&<><span className="mt-1 block truncate text-[10px] text-[#304a63]">{o.client}</span><span className="block truncate text-[9px] text-[#8ca0b4]">{o.subject}</span></>}</span>{!mobile&&<><span className="min-w-0"><strong className="block truncate text-[10px] text-[#2a4159]">{o.client}</strong><span className="mt-1 block truncate text-[9px] text-[#8ca0b4]">{o.subject}</span></span><span className="text-[10px] text-[#687f95]">{o.owner}</span></>}<span className={mobile?"justify-self-end":""}><Status tone={OrderTone(o.status)}>{o.status}</Status></span></button>)}{shown.length===0&&<p className="p-4 text-[11px] text-[#647c93]">Nenhuma ordem encontrada.</p>}</div>
     </div>
     <div className={`${surface} p-3`}><SectionHead title="Detalhes da ordem" side={<span className="text-[10px] font-bold text-[#2175c3]">{current?.id}</span>}/>{current&&<><p className="mt-3 text-[14px] font-bold text-[#1c3d5d]">{current.subject}</p><p className="mt-1 text-[11px] text-[#70869e]">{current.client}</p><div className="mt-3 space-y-2 border-t border-[#e6edf4] pt-3 text-[11px]">{[["Equipe responsável",current.owner],["Previsão",current.day],["Prioridade",current.priority]].map(([label,value])=><div key={label} className="flex justify-between gap-2"><span className="text-[#8498ad]">{label}</span><strong className="text-right text-[#294562]">{value}</strong></div>)}</div><div className="mt-3 flex items-center justify-between rounded-lg bg-[#f3f7fb] px-3 py-2"><span className="text-[10px] text-[#637c94]">Situação atual</span><Status tone={OrderTone(current.status)}>{current.status}</Status></div><button type="button" onClick={advance} className={`${secondary} mt-3 w-full`}>{current.status==="Concluída"?"Reabrir ordem":"Avançar atendimento"}<Symbol name="arrow" size={13}/></button></>}</div>
   </div>}
 </AppShell>;
}

// ——— ESTOQUE: real product rows, filters and live illustrative transactions ———
type Product={sku:string;name:string;category:string;qty:number;minimum:number;unit:string};
type Move={id:number;sku:string;name:string;type:"Entrada"|"Saída";qty:number;when:string};
const sampleProducts:Product[]=[
 {sku:"FLT-300",name:"Filtro HEPA 300",category:"Filtragem",qty:38,minimum:12,unit:"un"},
 {sku:"SNS-204",name:"Sensor térmico",category:"Sensores",qty:7,minimum:10,unit:"un"},
 {sku:"CMP-210",name:"Compressor 2 HP",category:"Peças",qty:12,minimum:8,unit:"un"},
 {sku:"CNX-083",name:"Conector industrial",category:"Elétrica",qty:3,minimum:9,unit:"un"},
 {sku:"CAB-125",name:"Cabo PP 3x2,5",category:"Elétrica",qty:54,minimum:20,unit:"m"},
 {sku:"CTL-009",name:"Controladora digital",category:"Eletrônica",qty:18,minimum:6,unit:"un"},
];
const sampleMoves:Move[]=[{id:1,sku:"FLT-300",name:"Filtro HEPA 300",type:"Entrada",qty:10,when:"Hoje, 09:15"},{id:2,sku:"SNS-204",name:"Sensor térmico",type:"Saída",qty:3,when:"Ontem, 16:40"},{id:3,sku:"CNX-083",name:"Conector industrial",type:"Saída",qty:2,when:"Ontem, 11:10"}];
const stockNav=[{id:"geral",label:"Visão geral",icon:"grid"},{id:"produtos",label:"Produtos",icon:"package"},{id:"movimentacoes",label:"Movimentações",icon:"history"}] as const;
function StockDemo({mobile}:{mobile:boolean}){
 const [products,setProducts]=useState(sampleProducts);const [moves,setMoves]=useState(sampleMoves);const [view,setView]=useState("geral");const [query,setQuery]=useState("");const [filter,setFilter]=useState("Todos");const [editor,setEditor]=useState(false);const [form,setForm]=useState({sku:"SNS-204",type:"Entrada" as Move["type"],qty:1});const [message,setMessage]=useState("");
 const alerts=products.filter(p=>p.qty<=p.minimum).length;
 const filtered=products.filter(p=>(filter==="Todos"||filter==="Reposição"&&p.qty<=p.minimum||filter==="Disponível"&&p.qty>p.minimum)&&`${p.name} ${p.sku} ${p.category}`.toLowerCase().includes(query.toLowerCase()));
 const record=(e:FormEvent<HTMLFormElement>)=>{e.preventDefault();const product=products.find(p=>p.sku===form.sku);if(!product||form.qty<1||!Number.isInteger(form.qty))return;if(form.type==="Saída"&&form.qty>product.qty){setMessage("Quantidade superior ao saldo disponível.");return;}setProducts(v=>v.map(p=>p.sku===form.sku?{...p,qty:p.qty+(form.type==="Entrada"?form.qty:-form.qty)}:p));setMoves(v=>[{id:Date.now(),sku:product.sku,name:product.name,type:form.type,qty:form.qty,when:"Agora"},...v]);setEditor(false);setMessage("");setView("movimentacoes");};
 const cat=products.reduce<Record<string,number>>((acc,p)=>({...acc,[p.category]:(acc[p.category]||0)+p.qty}),{});
 return <AppShell mobile={mobile} heading="Central de estoque" product="Vorzax Stock" description="Inventário, reposição e movimentações com controle de saldo." nav={[...stockNav]} view={view} onView={setView}>
   <div className="mb-3 flex flex-wrap items-center justify-between gap-2"><span className="text-[10px] text-[#8295aa]">Estoque por item / Saldos ilustrativos</span><button type="button" onClick={()=>{setEditor(v=>!v);setMessage("")}} className={action}><Symbol name="plus" size={13}/>{editor?"Fechar registro":"Registrar movimento"}</button></div>
   {editor&&<form onSubmit={record} className={`${surface} mb-3 grid gap-2 p-3 ${mobile?"grid-cols-2":"grid-cols-4"}`}><label className="col-span-2 text-[10px] font-semibold text-[#5d738a]">Produto<select className={`${field} mt-1`} value={form.sku} onChange={e=>setForm(v=>({...v,sku:e.target.value}))}>{products.map(p=><option key={p.sku} value={p.sku}>{p.name}</option>)}</select></label><label className="text-[10px] font-semibold text-[#5d738a]">Movimento<select className={`${field} mt-1`} value={form.type} onChange={e=>setForm(v=>({...v,type:e.target.value as Move["type"]}))}><option>Entrada</option><option>Saída</option></select></label><label className="text-[10px] font-semibold text-[#5d738a]">Quantidade<input className={`${field} mt-1`} type="number" min={1} step={1} max={999} value={form.qty} onChange={e=>setForm(v=>({...v,qty:Number(e.target.value)}))} required/></label><div className="col-span-2 flex items-end justify-end"><button type="submit" className={action}>Confirmar movimento</button></div>{message&&<p role="alert" className="col-span-full text-[11px] font-semibold text-[#bf4757]">{message}</p>}</form>}
   <div className={`grid gap-2 ${mobile?"grid-cols-2":"grid-cols-4"}`}><Metric mobile={mobile} label="Produtos ativos" value={products.length} sub="Itens cadastrados"/><Metric mobile={mobile} label="Estoque baixo" value={alerts} sub="Precisam de reposição" tone="red"/><Metric mobile={mobile} label="Entradas registradas" value={moves.filter(m=>m.type==="Entrada").length} sub="Movimentos de entrada" tone="teal"/><Metric mobile={mobile} label="Saídas registradas" value={moves.filter(m=>m.type==="Saída").length} sub="Movimentos de saída" tone="amber"/></div>
   {view==="geral"&&<div className={`mt-3 grid gap-3 ${mobile?"grid-cols-1":"grid-cols-[1.1fr_.9fr]"}`}><div className={`${surface} p-3`}><SectionHead title="Movimentação por período" side={<span className="text-[9px] text-[#8ba1b6]">Volume ilustrativo</span>}/><Trend values={[10,16,12,24,18,22,27]} labels={["Seg","Ter","Qua","Qui","Sex","Sáb","Dom"]} stroke="#188ca8"/></div><div className={`${surface} p-3`}><SectionHead title="Estoque por categoria"/><div className="mt-4 space-y-3">{Object.entries(cat).slice(0,5).map(([key,num])=><BarRow key={key} label={key} count={num} max={Math.max(...Object.values(cat))} tone="teal"/>)}</div></div></div>}
   {view==="movimentacoes"?<div className={`${surface} mt-3 p-3`}><SectionHead title="Histórico de movimentações" side={<span className="text-[10px] text-[#8399af]">Atualizado nesta sessão</span>}/><div className="mt-3 overflow-hidden rounded-lg border border-[#e1eaf3]">{moves.map(m=><div key={m.id} className="flex items-center gap-3 border-b border-[#edf2f7] px-3 py-3"><span className={`grid h-8 w-8 shrink-0 place-items-center rounded-lg text-[16px] font-bold ${m.type==="Entrada"?"bg-[#e0f7eb] text-[#20966b]":"bg-[#fff0dc] text-[#bd7a1e]"}`}>{m.type==="Entrada"?"+":"−"}</span><span className="min-w-0 flex-1"><strong className="block truncate text-[11px] text-[#29465f]">{m.name}</strong><span className="mt-1 block text-[9px] text-[#8699ad]">{m.sku} · {m.when}</span></span><strong className="text-[11px] text-[#2b5070]">{m.type==="Entrada"?"+":"−"}{m.qty}</strong></div>)}</div></div>:<div className={`${surface} mt-3 min-w-0 p-3`}><SectionHead title="Produtos e saldos" side={<span className="text-[9px] text-[#8ba1b6]">{filtered.length} produtos</span>}/><div className="mt-3 flex gap-2"><label className="flex min-w-0 flex-1 items-center gap-2 rounded-lg border border-[#d5e2ed] bg-[#f8faff] px-2"><Symbol name="search" size={14}/><input type="search" aria-label="Buscar produto em estoque" className="min-h-9 w-full min-w-0 bg-transparent text-[11px] text-[#254360] outline-none placeholder:text-[#8aa0b4]" placeholder="Produto, código, categoria..." value={query} onChange={e=>setQuery(e.target.value)}/></label><select aria-label="Filtrar estoque" className="max-w-[120px] rounded-lg border border-[#d5e2ed] bg-white px-2 text-[10px] text-[#4d6780]" value={filter} onChange={e=>setFilter(e.target.value)}>{["Todos","Reposição","Disponível"].map(x=><option key={x}>{x}</option>)}</select></div><div className="mt-3 overflow-hidden rounded-lg border border-[#e3eaf3]"><div className={`grid gap-2 bg-[#f0f5fb] px-3 py-2 text-[9px] font-bold uppercase tracking-[.08em] text-[#7b8ea5] ${mobile?"grid-cols-[1fr_58px_72px]":"grid-cols-[.7fr_1.55fr_.8fr_.6fr_.85fr]"}`}>{!mobile&&<span>SKU</span>}<span>Produto</span>{!mobile&&<span>Categoria</span>}<span>Saldo</span><span>Situação</span></div>{filtered.map(p=><div key={p.sku} className={`grid items-center gap-2 border-t border-[#edf1f7] px-3 py-2.5 ${mobile?"grid-cols-[1fr_58px_72px]":"grid-cols-[.7fr_1.55fr_.8fr_.6fr_.85fr]"}`}>{!mobile&&<span className="text-[10px] font-semibold text-[#5d7891]">{p.sku}</span>}<span className="min-w-0"><strong className="block truncate text-[10px] text-[#26425f]">{p.name}</strong>{mobile&&<span className="mt-1 block text-[9px] text-[#8da0b3]">{p.sku}</span>}</span>{!mobile&&<span className="truncate text-[10px] text-[#7d90a4]">{p.category}</span>}<strong className="text-[11px] text-[#33536d]">{p.qty} <small className="text-[9px] font-normal text-[#8d9faf]">{p.unit}</small></strong><Status tone={p.qty<=p.minimum?"red":"teal"}>{p.qty<=p.minimum?"Repor":"Normal"}</Status></div>)}{filtered.length===0&&<p className="p-4 text-[11px] text-[#70869b]">Nenhum produto encontrado.</p>}</div><p className="mt-2 text-[10px] text-[#8499ac]">Alertas são calculados pelo saldo mínimo definido para cada item.</p></div>}
 </AppShell>;
}

// ——— PROJETOS: interactive kanban, ownership, progress and deadlines ———
type Lane="Planejado"|"Em andamento"|"Em revisão"|"Concluído";
type Task={id:number;name:string;project:string;owner:string;priority:"Alta"|"Média"|"Baixa";lane:Lane;due:string};
const sampleTasks:Task[]=[
 {id:1,name:"Mapear jornada de atendimento",project:"Portal operacional",owner:"Ana",priority:"Alta",lane:"Em andamento",due:"02/11"},
 {id:2,name:"Definir componentes da interface",project:"Portal operacional",owner:"Bruno",priority:"Média",lane:"Em revisão",due:"04/11"},
 {id:3,name:"Validar requisitos do dashboard",project:"Painel de indicadores",owner:"Ana",priority:"Alta",lane:"Planejado",due:"05/11"},
 {id:4,name:"Estruturar integrações",project:"Automação interna",owner:"Camila",priority:"Média",lane:"Em andamento",due:"06/11"},
 {id:5,name:"Revisão responsiva",project:"Portal operacional",owner:"Bruno",priority:"Baixa",lane:"Concluído",due:"29/10"},
 {id:6,name:"Preparar documentação",project:"Painel de indicadores",owner:"Camila",priority:"Média",lane:"Planejado",due:"07/11"},
];
const lanes:Lane[]=["Planejado","Em andamento","Em revisão","Concluído"];
const taskNav=[{id:"geral",label:"Visão geral",icon:"grid"},{id:"quadro",label:"Quadro de tarefas",icon:"tasks"},{id:"prazos",label:"Prazos",icon:"calendar"}] as const;
const taskTone=(lane:Lane):Tone=>lane==="Concluído"?"teal":lane==="Em andamento"?"blue":lane==="Em revisão"?"amber":"slate";
function ProjectsDemo({mobile}:{mobile:boolean}){
 const [tasks,setTasks]=useState<Task[]>(sampleTasks);const [view,setView]=useState("geral");const [project,setProject]=useState("Todos");const [newOpen,setNewOpen]=useState(false);const [draft,setDraft]=useState({name:"",project:"Portal operacional",owner:"Ana",priority:"Média" as Task["priority"]});
 const projects=["Portal operacional","Painel de indicadores","Automação interna"];
 const visible=tasks.filter(t=>project==="Todos"||t.project===project);
 const count=(l:Lane)=>visible.filter(t=>t.lane===l).length;
 const done=visible.length?Math.round(count("Concluído")/visible.length*100):0;
 const forward=(id:number)=>setTasks(v=>v.map(t=>t.id===id?{...t,lane:lanes[Math.min(lanes.length-1,lanes.indexOf(t.lane)+1)]}:t));
 const backward=(id:number)=>setTasks(v=>v.map(t=>t.id===id?{...t,lane:lanes[Math.max(0,lanes.indexOf(t.lane)-1)]}:t));
 const add=(e:FormEvent<HTMLFormElement>)=>{e.preventDefault();if(!draft.name.trim())return;setTasks(v=>[...v,{id:Math.max(...v.map(t=>t.id),0)+1,name:draft.name.trim(),project:draft.project,owner:draft.owner,priority:draft.priority,lane:"Planejado",due:"A definir"}]);setProject("Todos");setView("quadro");setDraft({...draft,name:""});setNewOpen(false)};
 return <AppShell mobile={mobile} heading="Gestão de projetos" product="Vorzax Projects" description="Planejamento, tarefas e entregas com visão de progresso." nav={[...taskNav]} view={view} onView={setView}>
   <div className="mb-3 flex flex-wrap items-center justify-between gap-2"><label className="flex items-center gap-2 text-[10px] font-semibold text-[#6a8199]">Projeto<select aria-label="Filtrar projeto" value={project} onChange={e=>setProject(e.target.value)} className="min-h-9 max-w-[178px] rounded-lg border border-[#d5e2ed] bg-white px-2 text-[10px] font-medium text-[#31536f]"><option>Todos</option>{projects.map(p=><option key={p}>{p}</option>)}</select></label><button type="button" onClick={()=>setNewOpen(v=>!v)} className={action}><Symbol name="plus" size={13}/>{newOpen?"Fechar":"Nova tarefa"}</button></div>
   {newOpen&&<form onSubmit={add} className={`${surface} mb-3 grid gap-2 p-3 ${mobile?"grid-cols-2":"grid-cols-4"}`}><label className="col-span-2 text-[10px] font-semibold text-[#5d738a]">Nome da tarefa<input autoFocus maxLength={65} required className={`${field} mt-1`} value={draft.name} onChange={e=>setDraft(v=>({...v,name:e.target.value}))} placeholder="Descreva a tarefa"/></label><label className="col-span-2 text-[10px] font-semibold text-[#5d738a]">Projeto<select className={`${field} mt-1`} value={draft.project} onChange={e=>setDraft(v=>({...v,project:e.target.value}))}>{projects.map(p=><option key={p}>{p}</option>)}</select></label><label className="text-[10px] font-semibold text-[#5d738a]">Responsável<select className={`${field} mt-1`} value={draft.owner} onChange={e=>setDraft(v=>({...v,owner:e.target.value}))}>{["Ana","Bruno","Camila"].map(x=><option key={x}>{x}</option>)}</select></label><label className="text-[10px] font-semibold text-[#5d738a]">Prioridade<select className={`${field} mt-1`} value={draft.priority} onChange={e=>setDraft(v=>({...v,priority:e.target.value as Task["priority"]}))}>{["Baixa","Média","Alta"].map(x=><option key={x}>{x}</option>)}</select></label><div className="col-span-2 flex items-end justify-end"><button className={action} type="submit">Adicionar tarefa</button></div></form>}
   <div className={`grid gap-2 ${mobile?"grid-cols-2":"grid-cols-4"}`}><Metric mobile={mobile} label="Total de tarefas" value={visible.length} sub="No filtro atual"/><Metric mobile={mobile} label="Em andamento" value={count("Em andamento")} sub="Em desenvolvimento" tone="blue"/><Metric mobile={mobile} label="Em revisão" value={count("Em revisão")} sub="Aguardam validação" tone="amber"/><Metric mobile={mobile} label="Concluídas" value={`${done}%`} sub="Progresso ilustrativo" tone="teal"/></div>
   {view==="geral"&&<div className={`mt-3 grid gap-3 ${mobile?"grid-cols-1":"grid-cols-[1fr_1fr]"}`}><div className={`${surface} p-3`}><SectionHead title="Progresso das entregas" side={<span className="text-[11px] font-bold text-[#1775c8]">{done}%</span>}/><div className="mt-3 h-3 overflow-hidden rounded-full bg-[#e8eff8]"><div className="h-full rounded-full bg-[linear-gradient(90deg,#1272d6,#39afd0)] transition-all" style={{width:`${done}%`}}/></div><p className="mt-3 text-[10px] leading-5 text-[#748ba2]">Avance tarefas entre as colunas para atualizar os indicadores do projeto.</p></div><div className={`${surface} p-3`}><SectionHead title="Distribuição das tarefas"/><div className="mt-3 space-y-2">{lanes.map(l=><BarRow key={l} label={l} count={count(l)} max={visible.length} tone={l==="Concluído"?"teal":"blue"}/>)}</div></div></div>}
   {view==="prazos"?<div className={`${surface} mt-3 p-3`}><SectionHead title="Próximas entregas" side={<span className="text-[10px] text-[#869bb1]">Datas de exemplo</span>}/><div className="mt-3 space-y-2">{visible.filter(t=>t.lane!=="Concluído").map(t=><div key={t.id} className="flex items-center gap-3 rounded-lg border border-[#e4ecf4] bg-white p-3"><span className="grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-[#ecf4ff] text-[#247cd0]"><Symbol name="clock"/></span><span className="min-w-0 flex-1"><strong className="block truncate text-[11px] text-[#29445f]">{t.name}</strong><span className="mt-1 block text-[10px] text-[#8296ad]">{t.project} · {t.owner}</span></span><span className="shrink-0 text-[11px] font-bold text-[#296dba]">{t.due}</span></div>)}</div></div>:<div className="mt-3"><div className="mb-2 flex items-center justify-between"><SectionHead title="Quadro de tarefas"/><span className="text-[10px] text-[#879bb0]">Mova pelo controle nas tarefas</span></div><div className={`grid gap-2 ${mobile?"grid-cols-1":"grid-cols-4"}`}>{lanes.map(l=><div key={l} className="min-w-0 rounded-xl border border-[#dce6f0] bg-[#eaf0f8] p-2"><div className="mb-3 flex items-center justify-between px-1"><span className="text-[11px] font-bold text-[#344f6e]">{l}</span><span className="rounded-md bg-white px-2 py-0.5 text-[10px] font-bold text-[#668099]">{count(l)}</span></div><div className="space-y-2">{visible.filter(t=>t.lane===l).map(t=><article key={t.id} className="rounded-lg border border-[#dce7f2] bg-white p-3 shadow-[0_2px_5px_rgba(29,55,89,.04)]"><div className="flex items-center justify-between gap-1"><span className="text-[9px] font-semibold uppercase text-[#3787c4]">{t.project.split(" ")[0]}</span><span className={`rounded-md px-1.5 py-0.5 text-[9px] font-semibold ${toneClass[t.priority==="Alta"?"red":t.priority==="Média"?"amber":"slate"]}`}>{t.priority}</span></div><h6 className="mt-3 text-[11px] font-bold leading-4 text-[#2c4764]">{t.name}</h6><div className="mt-3 flex items-center justify-between gap-1 border-t border-[#edf2f7] pt-2"><span className="flex items-center gap-1 text-[9px] text-[#8195a9]"><span className="grid h-6 w-6 place-items-center rounded-full bg-[#e4efff] text-[9px] font-bold text-[#2c7ccb]">{t.owner.slice(0,1)}</span>{t.due}</span><div className="flex gap-1"><button type="button" onClick={()=>backward(t.id)} disabled={l==="Planejado"} aria-label={`Voltar etapa de ${t.name}`} className="grid h-7 w-7 place-items-center rounded-md border border-[#d7e5f3] text-[13px] text-[#4379aa] disabled:opacity-30">←</button><button type="button" onClick={()=>forward(t.id)} disabled={l==="Concluído"} aria-label={`Avançar etapa de ${t.name}`} className="grid h-7 w-7 place-items-center rounded-md bg-[#e6f2fe] text-[13px] font-bold text-[#176dbd] disabled:opacity-30">→</button></div></div></article>)}{count(l)===0&&<p className="rounded-lg border border-dashed border-[#cedcea] p-4 text-center text-[10px] text-[#8da2b6]">Nenhuma tarefa</p>}</div></div>)}</div></div>}
 </AppShell>;
}

export function SystemsDemo({variant,device,compact=false}:VisualProps) {
 const mobile=device==="mobile"&&!compact;
 return <DemoFrame device={device} compact={compact} dark={false} title={["vorzax-os.demo","vorzax-stock.demo","vorzax-projects.demo"][variant]}>
   {variant===0?<OrdersDemo mobile={mobile}/>:variant===1?<StockDemo mobile={mobile}/>:<ProjectsDemo mobile={mobile}/>}
 </DemoFrame>;
}
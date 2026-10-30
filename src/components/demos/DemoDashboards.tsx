"use client";

import { useId, useState, type ReactNode } from "react";
import { DemoFrame, type VisualProps } from "./DemoSites";

/** Three illustrative corporate BI workspaces. Every accent belongs to the Vorzax blue palette. */
const blue = {navy:"#061c34",deep:"#0b2847",primary:"#1477d4",cyan:"#42b9ed",light:"#dbeeff",muted:"#7894ad"};
type ViewTheme = "light"|"dark";
function Shell({mobile,dark=false,name,label,nav,children}: {mobile:boolean;dark?:boolean;name:string;label:string;nav:string[];children:ReactNode}) {
 const [menu,setMenu]=useState(nav[0]);
 return <div className={`flex w-full font-sans ${mobile?"min-h-[900px] flex-col":"min-h-[640px]"} ${dark?"bg-[#081b32] text-[#edf7ff]":"bg-[#f1f6fc] text-[#162f4b]"}`}>
  {!mobile&&<aside className="flex w-[158px] shrink-0 flex-col bg-[#071d36] px-3 py-4 text-white">
   <div className="px-2 pb-5"><span className="text-[17px] font-black tracking-[.14em] text-white">VORZAX</span><p className="mt-1 text-[9px] uppercase tracking-[.2em] text-[#72bbe9]">Business intelligence</p></div>
   <p className="px-2 pb-2 text-[9px] font-semibold uppercase tracking-[.16em] text-[#5a87ad]">Navegação</p>
   {nav.map((item,i)=><button type="button" key={item} onClick={()=>setMenu(item)} aria-pressed={menu===item} className={`mb-1 flex items-center gap-2 rounded-lg px-3 py-2.5 text-left text-[11px] font-semibold ${menu===item?"bg-[#145caa] text-white":"text-[#9dbbda] hover:bg-[#173957]"}`}><span className="grid h-5 w-5 place-items-center rounded-md bg-white/10 text-[10px]">{i+1}</span>{item}</button>)}
   <div className="mt-auto rounded-lg border border-[#245078] bg-[#0d3357] p-3"><span className="text-[10px] font-bold text-[#a8ddff]">AMBIENTE DEMO</span><p className="mt-1 text-[9px] leading-4 text-[#8eb0ce]">Dados e indicadores ilustrativos.</p></div>
  </aside>}
  <div className="min-w-0 flex-1">
   <header className={`flex min-h-12 items-center justify-between gap-3 border-b px-4 py-2 ${dark?"border-[#274968] bg-[#0e2946]":"border-[#d9e4f0] bg-white"}`}>
     <div><p className={`text-[11px] font-bold ${dark?"text-[#e3f5ff]":"text-[#1f4163]"}`}>{name}</p><p className={`text-[9px] ${dark?"text-[#83adce]":"text-[#8297ab]"}`}>{label} · Conceito ilustrativo</p></div>
     <div className="flex items-center gap-2"><span className={`hidden rounded-full px-3 py-1 text-[9px] sm:inline ${dark?"bg-[#153e66] text-[#a6dbfa]":"bg-[#e6f2ff] text-[#2b6baa]"}`}>Visão executiva</span><span className={`grid h-7 w-7 place-items-center rounded-full text-[10px] font-bold ${dark?"bg-[#245a87] text-white":"bg-[#d7e9fc] text-[#226db3]"}`}>V</span></div>
   </header>
   {mobile&&<nav className={`flex gap-2 overflow-x-auto border-b px-3 py-2 ${dark?"border-[#274968] bg-[#0e2946]":"border-[#d9e4f0] bg-white"}`}>{nav.map(n=><button key={n} type="button" onClick={()=>setMenu(n)} className={`shrink-0 rounded-md px-3 py-2 text-[10px] font-semibold ${menu===n?"bg-[#1569bf] text-white":dark?"bg-[#163857] text-[#add0ea]":"bg-[#e9f1fa] text-[#4a759c]"}`}>{n}</button>)}</nav>}
   <div className={`${mobile?"p-3":"p-4"} min-w-0`}>{children}</div>
  </div>
 </div>;
}
function Heading({eyebrow,title,detail,dark=false,actions}: {eyebrow:string;title:string;detail:string;dark?:boolean;actions?:ReactNode}){
 return <div className="mb-3 flex flex-wrap items-center justify-between gap-2"><div><p className={`text-[9px] font-bold uppercase tracking-[.16em] ${dark?"text-[#70c4f6]":"text-[#2579bb]"}`}>{eyebrow}</p><h4 className={`mt-1 text-[21px] font-bold tracking-[-.045em] ${dark?"text-white":"text-[#17334f]"}`}>{title}</h4><p className={`mt-1 text-[10px] ${dark?"text-[#8fb0ca]":"text-[#7c91a9]"}`}>{detail}</p></div>{actions}</div>;
}
function Switch({items,value,onChange,dark=false}:{items:readonly string[];value:string;onChange:(v:string)=>void;dark?:boolean}){
 return <div className={`flex gap-1 rounded-lg p-1 ${dark?"bg-[#193c5e]":"bg-[#e4edf7]"}`}>{items.map(x=><button key={x} type="button" aria-pressed={value===x} onClick={()=>onChange(x)} className={`min-h-7 rounded-md px-3 text-[10px] font-bold ${value===x?"bg-[#1477d4] text-white":dark?"text-[#a9cbe4]":"text-[#517594]"}`}>{x}</button>)}</div>;
}
function Metric({label,value,note,dark=false}: {label:string;value:string;note:string;dark?:boolean}) {
 return <div className={`min-w-0 rounded-[11px] border p-3 ${dark?"border-[#254968] bg-[#123451]":"border-[#dce7f2] bg-white"}`}><p className={`text-[10px] ${dark?"text-[#a2bdd4]":"text-[#7089a2]"}`}>{label}</p><p className={`mt-1 text-[23px] font-extrabold tracking-[-.055em] ${dark?"text-[#f5fbff]":"text-[#173a5f]"}`}>{value}</p><p className={`mt-1 truncate text-[9px] ${dark?"text-[#77b4e2]":"text-[#367eaf]"}`}>{note}</p></div>;
}
function Panel({title,side,dark=false,children,className=""}:{title:string;side?:string;dark?:boolean;children:ReactNode;className?:string}){
 return <section className={`min-w-0 rounded-[12px] border p-3 ${dark?"border-[#234965] bg-[#102e4b]":"border-[#dce6f0] bg-white"} ${className}`}><div className="flex items-center justify-between gap-2"><h5 className={`text-[12px] font-bold ${dark?"text-[#e4f5ff]":"text-[#234464]"}`}>{title}</h5>{side&&<span className={`text-[9px] ${dark?"text-[#8ab8d7]":"text-[#91a4b5]"}`}>{side}</span>}</div>{children}</section>;
}
function Line({values,height=135,dark=false,labels=["Jan","Fev","Mar","Abr","Mai","Jun","Jul"]}:{values:number[];height?:number;dark?:boolean;labels?:string[]}){
 const id=useId().replace(/:/g,"");const max=Math.max(...values,1),min=Math.min(0,...values);const points=values.map((v,i)=>({x:17+i*303/Math.max(1,values.length-1),y:106-(v-min)/(max-min||1)*82}));const line=points.map(p=>`${p.x},${p.y}`).join(" ");const fill=`M${points[0].x} ${points[0].y} L${points.slice(1).map(p=>`${p.x} ${p.y}`).join(" L")} L320 112 L17 112 Z`;
 return <div className="mt-3"><svg viewBox="0 0 340 123" className="w-full" style={{height}} preserveAspectRatio="none" role="img" aria-label="Evolução ilustrativa ao longo dos períodos"><defs><linearGradient id={id} x1="0" y1="0" x2="0" y2="1"><stop stopColor={blue.cyan} stopOpacity=".32"/><stop offset="1" stopColor={blue.cyan} stopOpacity=".015"/></linearGradient></defs>{[30,60,90].map(y=><line key={y} x1="12" x2="327" y1={y} y2={y} stroke={dark?"#2b5273":"#e2ebf5"} strokeDasharray="3 5"/>)}<path d={fill} fill={`url(#${id})`}/><polyline points={line} fill="none" stroke={blue.primary} strokeWidth="3.3" strokeLinecap="round" strokeLinejoin="round"/>{points.map((p,i)=><circle key={i} cx={p.x} cy={p.y} r="3.5" fill={dark?"#123451":"white"} stroke={blue.cyan} strokeWidth="2"/>)}</svg><div className={`flex justify-between gap-1 text-[9px] ${dark?"text-[#84a9c7]":"text-[#8fa2b5]"}`}>{labels.slice(0,values.length).map((v,i)=><span key={i}>{v}</span>)}</div></div>;
}
function Bars({values,labels,dark=false,height=92}:{values:number[];labels:string[];dark?:boolean;height?:number}){
 const max=Math.max(...values,1);return <div className="mt-3 flex items-end gap-2" style={{height:height+28}}>{values.map((v,i)=><div key={i} className="flex h-full min-w-0 flex-1 flex-col justify-end text-center"><span className={`mb-1 text-[9px] font-semibold ${dark?"text-[#b4d7ef]":"text-[#557795]"}`}>{v}</span><div className="mx-auto w-full max-w-[38px] rounded-t-[5px]" style={{height:Math.max(6,(v/max)*height),background:i===values.length-1?blue.cyan:blue.primary,opacity:.63+(i/values.length)*.36}}/><span className={`mt-1 truncate text-[9px] ${dark?"text-[#87afcf]":"text-[#8598ab]"}`}>{labels[i]}</span></div>)}</div>;
}
function Meter({rows,dark=false}:{rows:{label:string;percent:number;note?:string}[];dark?:boolean}){
 return <div className="mt-3 space-y-2.5">{rows.map((r,i)=><div key={r.label}><div className={`mb-1 flex justify-between text-[10px] ${dark?"text-[#bdd6e8]":"text-[#5c7690]"}`}><span>{r.label}</span><span className="font-bold">{r.note??`${r.percent}%`}</span></div><div className={`h-2.5 overflow-hidden rounded-full ${dark?"bg-[#234869]":"bg-[#e5eef7]"}`}><div className="h-full rounded-full" style={{width:`${r.percent}%`,backgroundColor:i===0?blue.primary:i===1?blue.cyan:i===2?"#6a9ac4":"#9bbbd7"}}/></div></div>)}</div>;
}
function Donut({sections,dark=false,center}:{sections:number[];dark?:boolean;center:string}){
 let offset=0;const segments=sections.map((v,i)=>{const st=offset;offset+=v;return `${[blue.primary,blue.cyan,"#6297c3","#9ac7e8"][i%4]} ${st}% ${offset}%`});return <div className="relative mx-auto mt-3 grid h-[122px] w-[122px] place-items-center rounded-full" style={{background:`conic-gradient(${segments.join(",")})`}}><div className={`grid h-[87px] w-[87px] place-items-center rounded-full ${dark?"bg-[#102e4b] text-white":"bg-white text-[#1c4b70]"}`}><strong className="text-[17px] font-black tracking-[-.04em]">{center}</strong></div></div>;
}

function SalesBI({mobile}:{mobile:boolean}){
 const [period,setPeriod]=useState("30 dias");
 const [channel,setChannel]=useState("Orgânico");
 const factor=period==="7 dias"?.29:period==="90 dias"?2.45:1;
 const channels=[{name:"Orgânico",value:42},{name:"Indicação",value:29},{name:"Campanhas",value:18},{name:"Direto",value:11}];
 const stages=[{name:"Visitas",count:1420},{name:"Contatos",count:312},{name:"Qualificados",count:124},{name:"Propostas",count:58},{name:"Negócios",count:19}];
 const trend=period==="7 dias"?[14,22,18,30,27,38,42]:period==="90 dias"?[23,31,35,44,52,61,78]:[20,28,24,38,36,49,56];
 const panel="min-w-0 rounded-xl border border-[#254965] bg-[#10283f] p-3";
 return <div className="min-h-[640px] w-full bg-[#071727] px-4 pb-4 pt-3 font-sans text-[#ebf6ff]" data-bi-layout="executive-commercial">
  <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[#284865] pb-3">
    <div className="flex items-center gap-3"><div className="grid h-10 w-10 place-items-center rounded-lg border border-[#2a638b] bg-[#123c60] text-lg font-black text-[#72cbfb]">V</div>
      <div><p className="text-[10px] font-bold uppercase tracking-[.18em] text-[#72c3f5]">VORZAX / BUSINESS INTELLIGENCE</p><h4 className="text-[23px] font-extrabold tracking-[-.05em]">Radar comercial</h4><p className="text-[10px] text-[#9bbbd2]">Performance de aquisição, conversão e oportunidades</p></div>
    </div><Switch dark items={["7 dias","30 dias","90 dias"]} value={period} onChange={setPeriod}/>
  </div>
  <div className={'mt-3 grid gap-2 '+(mobile?'grid-cols-2':'grid-cols-4')}>
   {[["Leads recebidos",String(Math.round(312*factor)),"Entrada comercial"],["Oportunidades",String(Math.round(124*factor)),"Qualificação"],["Conversão","6,1%","Contato para negócio"],["Pipeline","R$ "+Math.round(148*factor)+" mil","Receita potencial"]].map(([label,value,note],i)=><div key={label} className="relative overflow-hidden rounded-xl border border-[#28506d] bg-[#112e48] p-3"><span className="absolute left-0 top-0 h-[3px] w-full" style={{backgroundColor:["#187ed0","#37adeb","#79cafa","#275d96"][i]}}/><p className="text-[10px] text-[#a3c1d8]">{label}</p><p className="mt-1 text-[24px] font-extrabold tracking-[-.05em] text-white">{value}</p><p className="text-[9px] text-[#80bfe7]">{note}</p></div>)}
  </div>
  <div className={'mt-3 grid gap-3 '+(mobile?'grid-cols-1':'grid-cols-[1.36fr_.92fr]')}>
   <section className={panel}><div className="flex items-center justify-between"><div><h5 className="text-[12px] font-bold">Trajetória de oportunidades</h5><p className="text-[9px] text-[#87b4d2]">Evolução ilustrativa da demanda</p></div><span className="rounded-md bg-[#193f60] px-2 py-1 text-[9px] text-[#b4dbf5]">{period}</span></div><Line dark values={trend} height={mobile?127:133} labels={period==="7 dias"?["Seg","Ter","Qua","Qui","Sex","Sáb","Dom"]:["Jan","Fev","Mar","Abr","Mai","Jun","Jul"]}/></section>
   <section className={panel}><h5 className="text-[12px] font-bold">Mix de aquisição</h5><div className="mt-3 flex items-center gap-3"><div className="relative grid h-[127px] w-[127px] shrink-0 place-items-center rounded-full" style={{background:'conic-gradient(#1477d4 0 42%, #42b9ed 42% 71%, #699bc9 71% 89%, #315a80 89% 100%)'}}><div className="grid h-[82px] w-[82px] place-items-center rounded-full bg-[#10283f] text-center"><div><p className="text-[9px] text-[#9dbed6]">Contatos</p><strong className="text-[20px] text-white">{Math.round(312*factor)}</strong></div></div></div><div className="min-w-0 flex-1 space-y-1">{channels.map((x,i)=><button key={x.name} type="button" aria-pressed={channel===x.name} onClick={()=>setChannel(x.name)} className={'flex w-full items-center justify-between gap-1 rounded-md px-1.5 py-1 text-left text-[10px] '+(channel===x.name?'bg-[#1a486b] text-white':'text-[#abc8dc] hover:bg-[#183d5b]')}><span className="min-w-0 truncate"><i className="mr-1 inline-block h-2 w-2 rounded-sm" style={{backgroundColor:["#1477d4","#42b9ed","#699bc9","#315a80"][i]}}/>{x.name}</span><strong>{x.value}%</strong></button>)}</div></div><p className="mt-2 text-[9px] text-[#84b3d4]">Canal selecionado: <strong>{channel}</strong></p></section>
  </div>
  <div className={'mt-3 grid gap-3 '+(mobile?'grid-cols-1':'grid-cols-[1.25fr_.8fr]')}>
   <section className={panel}><div className="flex items-center justify-between"><h5 className="text-[12px] font-bold">Jornada de conversão</h5><span className="text-[9px] text-[#9abbd3]">Funil por etapa</span></div><div className="mt-3 grid grid-cols-5 items-end gap-2">{stages.map((item,i)=><div key={item.name} className="min-w-0 text-center"><strong className="block text-[13px] text-white">{Math.round(item.count*factor)}</strong><div className="mt-2 rounded-t-md" style={{height:(59-i*11)+'px',backgroundColor:["#164f86","#1c78bc","#2b99d8","#50b4e8","#8dd6f6"][i]}}/><p className="mt-2 truncate text-[9px] text-[#a5c0d5]">{item.name}</p></div>)}</div></section>
   <section className={panel}><h5 className="text-[12px] font-bold">Distribuição de canais</h5><div className="mt-3 space-y-2.5">{channels.map(x=><div key={x.name}><div className="flex justify-between text-[10px] text-[#a9c5d9]"><span>{x.name}</span><strong>{x.value}%</strong></div><div className="mt-1 h-2 rounded-full bg-[#24425d]"><div className="h-full rounded-full bg-[#44b6ed]" style={{width:x.value+'%'}}/></div></div>)}</div></section>
  </div>
 </div>;
}
function OperationalBI({mobile}:{mobile:boolean}){
 const [region,setRegion]=useState("Todas");const [metric,setMetric]=useState("SLA");
 const teams=[{name:"Equipe Norte",load:78},{name:"Equipe Centro",load:91},{name:"Equipe Sul",load:64},{name:"Equipe Leste",load:72}];
 const loads=region==="Norte"?[4,2,3,3,5,5,4,3,2,2,4,5,5,4,3,2,2,4,5,3,2]:region==="Sul"?[1,2,2,3,1,3,4,2,2,1,3,2,4,3,2,1,3,4,2,3,2]:[3,4,2,5,4,3,5,2,4,3,5,4,3,2,5,4,4,3,5,4,2];
 return <Shell mobile={mobile} dark name="Vorzax BI / Operações" label="Central de monitoramento" nav={["Operação geral","Atendimentos","Equipes","Alertas"]}>
   <Heading dark eyebrow="INTELIGÊNCIA OPERACIONAL" title="Central de operações" detail="Capacidade, SLA e demanda acompanhados em uma tela." actions={<Switch dark items={["Todas","Norte","Sul"]} value={region} onChange={setRegion}/>}/>
   <div className={`grid gap-2 ${mobile?"grid-cols-2":"grid-cols-4"}`}><Metric dark label="Dentro do SLA" value="94%" note="Atendimentos no prazo"/><Metric dark label="Ordens ativas" value="38" note="Em acompanhamento"/><Metric dark label="Concluídas" value="126" note="No período"/><Metric dark label="Equipes em campo" value="08" note="Capacidade operacional"/></div>
   <div className={`mt-3 grid gap-3 ${mobile?"grid-cols-1":"grid-cols-[.83fr_1.25fr_1fr]"}`}>
     <Panel dark title="Indicador de SLA" side="Meta 95%"><Donut dark sections={[94,6]} center="94%"/><p className="mt-2 text-center text-[10px] text-[#91b9d4]">Conformidade simulada</p></Panel>
     <Panel dark title="Mapa de demanda" side={region}><div className="mt-3 grid grid-cols-7 gap-2">{loads.map((v,i)=><div key={i} title={`Intensidade ${v}/5`} className="h-[24px] rounded-md border border-[#315d81]" style={{backgroundColor:["#122c47","#1c4770","#22669f","#2f8cc8","#3fb5e5"][v-1]}}/>)}</div><div className="mt-3 flex justify-between text-[9px] text-[#8ab2cf]"><span>Seg</span><span>Ter</span><span>Qua</span><span>Qui</span><span>Sex</span><span>Sáb</span><span>Dom</span></div><p className="mt-4 text-[10px] text-[#a0c9e4]">Concentração de atendimentos por dia</p></Panel>
     <Panel dark title="Ocupação das equipes" side="Capacidade"><Meter dark rows={teams.map(t=>({label:t.name,percent:t.load}))}/></Panel>
   </div>
   <div className={`mt-3 grid gap-3 ${mobile?"grid-cols-1":"grid-cols-[1.2fr_1fr]"}`}>
     <Panel dark title="Ritmo de execução" side="Volume semanal"><Bars dark values={[18,24,21,32,29,19,13]} labels={["Seg","Ter","Qua","Qui","Sex","Sáb","Dom"]} height={mobile?118:101}/></Panel>
     <Panel dark title="Painel de ocorrências" side="Selecione a visão"><Switch dark items={["SLA","Fila","Equipes"]} value={metric} onChange={setMetric}/><div className="mt-3 space-y-2">{(metric==="SLA"?[["Chamados no prazo","94%"],["Risco de atraso","05"],["Atrasados","03"]]:metric==="Fila"?[["Aguardando triagem","08"],["Em execução","38"],["Finalizados","126"]]:[["Equipe Norte","78%"],["Equipe Centro","91%"],["Equipe Sul","64%"]]).map(([name,val])=><div key={name} className="flex items-center justify-between border-b border-[#244764] pb-1 text-[10px]"><span className="text-[#bed8ec]">{name}</span><span className="font-bold text-[#71c6f8]">{val}</span></div>)}</div></Panel>
   </div>
 </Shell>;
}
function FinancialBI({mobile}:{mobile:boolean}){
 const [period,setPeriod]=useState("Semestre");
 const [scenario,setScenario]=useState("Base");
 const quarter=period==="Trimestre";
 const revenue=quarter?[58,65,72]:[48,56,54,68,73,82];
 const costs=quarter?[38,42,46]:[32,36,39,44,47,53];
 const months=quarter?["Ago","Set","Out"]:["Mai","Jun","Jul","Ago","Set","Out"];
 const totalRevenue=revenue.reduce((sum,n)=>sum+n,0);
 const totalCosts=costs.reduce((sum,n)=>sum+n,0);
 const result=totalRevenue-totalCosts;
 const margin=(result/totalRevenue*100).toLocaleString("pt-BR",{maximumFractionDigits:1})+"%";
 const projection=scenario==="Otimista"?[36,43,49,57,64,72]:scenario==="Conservador"?[30,31,34,33,37,40]:[32,36,40,44,49,55];
 const panel="min-w-0 rounded-xl border border-[#d5e5f3] bg-white p-3";
 return <div className="min-h-[640px] w-full bg-[#eef5fc] px-4 pb-4 pt-3 font-sans text-[#183958]" data-bi-layout="executive-financial">
   <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[#cbddea] pb-3"><div><p className="text-[10px] font-bold uppercase tracking-[.18em] text-[#2371ab]">VORZAX / INTELIGÊNCIA FINANCEIRA</p><h4 className="mt-1 text-[22px] font-extrabold tracking-[-.045em]">Mapa de resultados e caixa</h4><p className="text-[10px] text-[#718ca2]">Rentabilidade, despesas e projeções para decisão</p></div><Switch items={["Trimestre","Semestre"]} value={period} onChange={setPeriod}/></div>
   <div className={'mt-3 grid gap-2 '+(mobile?'grid-cols-2':'grid-cols-4')}>
    {[["Receita acumulada","R$ "+totalRevenue+" mil","Entradas ilustrativas"],["Custos acumulados","R$ "+totalCosts+" mil","Saídas ilustrativas"],["Resultado líquido","R$ "+result+" mil","Receita menos custo"],["Margem",margin,"Resultado / receita"]].map(([label,value,note],i)=><div key={label} className={panel+' relative overflow-hidden'}><div className="absolute left-0 top-0 h-full w-[3px]" style={{backgroundColor:["#1679cb","#85bce5","#3298d8","#295e92"][i]}}/><p className="text-[10px] text-[#6688a2]">{label}</p><p className="mt-1 text-[24px] font-extrabold tracking-[-.055em] text-[#174873]">{value}</p><p className="text-[9px] text-[#7c9bb2]">{note}</p></div>)}
   </div>
   <div className={'mt-3 grid gap-3 '+(mobile?'grid-cols-1':'grid-cols-[1.5fr_.85fr]')}>
    <section className={panel}><div className="flex items-center justify-between"><div><h5 className="text-[12px] font-bold">Receita e custos comparados</h5><p className="text-[9px] text-[#7c98ae]">Evolução por período</p></div><span className="rounded-md bg-[#e7f2fc] px-2 py-1 text-[9px] text-[#2e79ac]">{period}</span></div><div className="mt-3 flex items-end gap-3" style={{height:mobile?156:148}}>{revenue.map((v,i)=><div key={i} className="flex h-full min-w-0 flex-1 flex-col justify-end text-center"><div className="flex h-[117px] items-end justify-center gap-1"><div className="w-[36%] rounded-t-sm bg-[#1478d0]" style={{height:Math.round(v/90*100)+'%'}} title={'Receita '+v}/><div className="w-[36%] rounded-t-sm bg-[#86c0e7]" style={{height:Math.round(costs[i]/90*100)+'%'}} title={'Custos '+costs[i]}/></div><p className="mt-2 text-[9px] text-[#7590a5]">{months[i]}</p></div>)}</div><div className="mt-2 flex gap-4 border-t border-[#e2edf6] pt-2 text-[9px] text-[#718ba1]"><span><i className="mr-1 inline-block h-2 w-2 rounded-sm bg-[#1478d0]"/>Receita</span><span><i className="mr-1 inline-block h-2 w-2 rounded-sm bg-[#86c0e7]"/>Custos</span></div></section>
    <section className={panel}><div className="flex justify-between gap-1"><h5 className="text-[12px] font-bold">Estrutura das despesas</h5><span className="text-[9px] text-[#8aa2b7]">% do total</span></div><Donut sections={[39,27,21,13]} center="100%"/><div className="mt-2 grid grid-cols-2 gap-1.5 text-[10px] text-[#52728a]">{[["Equipe",39],["Operação",27],["Serviços",21],["Outros",13]].map(([label,value],i)=><span key={label}><i className="mr-1 inline-block h-2 w-2 rounded-sm" style={{backgroundColor:["#1477d4","#42b9ed","#6297c3","#9ac7e8"][i]}}/>{label} <b>{value}%</b></span>)}</div></section>
   </div>
   <div className={'mt-3 grid gap-3 '+(mobile?'grid-cols-1':'grid-cols-[1.2fr_1fr]')}>
    <section className="min-w-0 rounded-xl border border-[#24608e] bg-[#0a2c4d] p-3 text-white"><div className="flex flex-wrap items-center justify-between gap-2"><div><h5 className="text-[12px] font-bold">Perspectiva de caixa</h5><p className="text-[9px] text-[#a0c8e2]">Projeção ilustrativa</p></div><div className="flex gap-1 rounded-md bg-[#143e60] p-1">{["Conservador","Base","Otimista"].map(n=><button key={n} onClick={()=>setScenario(n)} type="button" aria-pressed={scenario===n} className={'rounded-md px-2 py-1 text-[9px] font-semibold '+(scenario===n?'bg-[#2885cd] text-white':'text-[#b1d2e9]')}>{n}</button>)}</div></div><Line dark height={mobile?122:89} values={projection} labels={["Nov","Dez","Jan","Fev","Mar","Abr"]}/></section>
    <section className={panel}><h5 className="text-[12px] font-bold">Indicadores de rentabilidade</h5><div className="mt-3 space-y-2">{[["Custos / receita",(totalCosts/totalRevenue*100).toLocaleString("pt-BR",{maximumFractionDigits:1})+"%"],["Resultado operacional","R$ "+result+" mil"],["Cenário projetado",scenario]].map(([label,value])=><div key={label} className="flex justify-between gap-3 border-b border-[#e5eef6] pb-2 text-[10px]"><span className="text-[#7090a6]">{label}</span><strong className="text-right text-[#205f96]">{value}</strong></div>)}</div><p className="mt-2 text-[9px] text-[#8aa4b9]">Conceitos visuais ilustrativos.</p></section>
   </div>
 </div>;
}
export function DashboardDemo({variant,device,compact=false}:VisualProps){
 const mobile=device==="mobile"&&!compact;
 return <DemoFrame device={device} compact={compact} dark={variant===1} title={["comercial.bi","operacoes.bi","financeiro.bi"][variant]}>
  {variant===0?<SalesBI mobile={mobile}/>:variant===1?<OperationalBI mobile={mobile}/>:<FinancialBI mobile={mobile}/>}
 </DemoFrame>;
}
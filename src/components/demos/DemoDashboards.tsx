"use client";
import { DemoFrame, type VisualProps } from "./DemoSites";
import { MiniColumns, SegmentedMeter, TrendPlot } from "./DemoInsights";

function SalesBI({mobile}:{mobile:boolean}) {
 const stages=[["Visitantes",840,100],["Contatos",312,79],["Qualificados",124,55],["Propostas",58,35],["Negócios",19,20]];
 return <div className="min-h-[475px] bg-[#ecf2f9] p-4 text-[#16304d] sm:p-6">
  <div className="flex justify-between gap-3 border-b border-[#ccdae7] pb-4"><div><span className="text-[10px] font-bold uppercase tracking-[.16em] text-[#205987]">INTELIGÊNCIA COMERCIAL</span><h4 className="mt-2 text-xl font-bold tracking-[-.04em]">Desempenho comercial</h4></div><span className="h-fit rounded-lg bg-[#d9e9f8] px-3 py-2 text-[10px] font-semibold text-[#306a9c]">VISÃO FUNIL</span></div>
  <div className="mt-4 grid grid-cols-3 gap-2">{[["Leads","312"],["Propostas","58"],["Conversão","6,1%"]].map(([x,n])=><div key={x} className="rounded-xl border border-[#c9d9e8] bg-white p-3"><span className="text-[10px] text-[#5c758f]">{x}</span><p className="mt-2 text-[clamp(18px,2.6vw,29px)] font-bold tracking-[-.05em]">{n}</p></div>)}</div>
  <div className={`mt-4 grid gap-4 ${mobile?"grid-cols-1":"grid-cols-[1fr_.75fr]"}`}>
   <div className="rounded-xl border border-[#cad9e8] bg-white p-4"><div className="flex justify-between"><strong className="text-[11px]">Funil de aquisição</strong><span className="text-[9px] text-[#385e7c]">Dados de exemplo</span></div><div className="mt-4 space-y-2">{stages.map(([label,count,size],i)=><div key={label} className="flex items-center gap-3"><span className="w-[76px] shrink-0 text-[9px] text-[#405f77]">{label}</span><div className="flex min-w-0 flex-1"><div className="vx-draw-bar flex h-8 items-center justify-end rounded-r-md bg-gradient-to-r from-[#1e649e] to-[#5cc1ea] pr-3 text-[10px] font-bold text-white" style={{width:size+"%",animationDelay:i*90+"ms"}}>{count}</div></div></div>)}</div></div>
   <div className="rounded-xl border border-[#cad9e8] bg-white p-4"><strong className="text-[11px]">Origem de contatos</strong><div className="mt-5 flex h-28 items-end gap-3">{[58,77,38,88].map((x,i)=><div key={i} className="flex h-full flex-1 flex-col justify-end"><div className="vx-draw-bar rounded-t-md bg-[#2e82c6]" style={{height:x+"%",animationDelay:i*100+"ms"}}/><span className="mt-2 text-center text-[8px] text-[#405f76]">{["Web","Ind.","Ads","Dir."][i]}</span></div>)}</div><div className="mt-5 flex justify-between border-t border-[#dfe7ef] pt-3 text-[10px] text-[#57728c]"><span>Jornada comercial</span><span className="font-semibold text-[#277bb6]">DEMO</span></div></div>
  </div>
  <div className="mt-3 rounded-xl border border-[#cad9e8] bg-white px-4 py-3">
    <div className="flex flex-wrap items-center justify-between gap-2"><strong className="text-[11px]">Propostas emitidas por semana</strong><span className="text-[10px] text-[#315d84]">Volume fictício</span></div>
    <TrendPlot tone="blue" values={[13,18,14,22,19,31,27]} height={87}/>
  </div>
 </div>;
}
function OperationalBI({mobile}:{mobile:boolean}){
 const workload=[["Equipe A",72],["Equipe B",93],["Equipe C",55],["Equipe D",80]];
 return <div className="min-h-[475px] bg-[#071d25] p-4 text-white sm:p-6">
  <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[#29515a] pb-4"><div><span className="text-[10px] font-bold uppercase tracking-[.17em] text-[#65e1d5]">CENTRAL OPERACIONAL</span><h4 className="mt-2 text-xl font-semibold">Operação em tempo real · simulação</h4></div><span className="flex items-center gap-2 rounded-lg bg-[#103e42] px-3 py-2 text-[10px] text-[#a2ece1]"><i className="h-2 w-2 rounded-full bg-[#39c2b6]"/> STATUS SIMULADO</span></div>
  <div className={`mt-5 grid gap-3 ${mobile?"grid-cols-1":"grid-cols-[.75fr_1.25fr]"}`}>
   <div className="flex flex-col items-center justify-center rounded-xl border border-[#27656a] bg-[#103b41] p-4"><span className="text-[11px] font-semibold text-[#a4e8e2]">SLA ilustrativo</span><div className="relative mt-4 grid h-36 w-36 place-items-center rounded-full" style={{background:"conic-gradient(#47d6c5 0 84%, #214f58 84% 100%)"}}><div className="grid h-28 w-28 place-items-center rounded-full bg-[#103b41]"><span className="text-3xl font-bold">84%</span></div></div><p className="mt-4 text-center text-[10px] text-[#8dc2c0]">Meta de atendimento · conceito</p></div>
   <div className="rounded-xl border border-[#27656a] bg-[#102c37] p-4"><div className="flex justify-between gap-2 text-[11px]"><strong>Carga de equipes</strong><span className="text-[#83c7c1]">4 equipes</span></div><div className="mt-5 space-y-4">{workload.map(([team,value],i)=><div key={team}><div className="mb-2 flex justify-between text-[10px]"><span>{team}</span><span className="text-[#8ddfd6]">{value}%</span></div><div className="h-2.5 overflow-hidden rounded-full bg-[#21444f]"><div className="vx-draw-bar h-full rounded-full bg-gradient-to-r from-[#147d82] to-[#6be5ce]" style={{width:value+"%",animationDelay:i*100+"ms"}}/></div></div>)}</div></div>
  </div>
  <div className="mt-4 rounded-xl border border-[#285562] bg-[#0b2a35] p-4"><div className="flex justify-between"><strong className="text-[11px]">Mapa de demanda / semana</strong><span className="text-[9px] text-[#9fcacb]">Simulado</span></div><div className="mt-4 grid grid-cols-7 gap-2">{Array.from({length:21},(_,i)=><div key={i} className="h-5 rounded-[4px]" style={{background:["#123941","#1a6268","#258a86","#43c2a7","#1b555d"][(i*7+i*i)%5]}}/>)}</div><div className="mt-3 flex justify-between text-[9px] text-[#91bdbf]"><span>Seg</span><span>Ter</span><span>Qua</span><span>Qui</span><span>Sex</span><span>Sáb</span><span>Dom</span></div></div>
  <div className="mt-3 grid gap-3 rounded-xl border border-[#285562] bg-[#0e303a] p-3 sm:grid-cols-[1fr_.8fr]">
    <div><p className="text-[11px] font-semibold text-[#c1ece5]">Atendimentos concluídos / semana</p><MiniColumns tone="teal" height={67} values={[18,26,21,32,25,16,12]} labels={["Seg","Ter","Qua","Qui","Sex","Sáb","Dom"]}/></div>
    <div className="flex flex-col justify-center"><p className="mb-3 text-[11px] font-semibold text-[#c1ece5]">Situação das ordens</p><SegmentedMeter tone="teal" segments={[{label:"Dentro SLA",value:84},{label:"Atenção",value:11},{label:"Atrasadas",value:5}]}/></div>
  </div>
 </div>;
}
function FinancialBI({mobile}:{mobile:boolean}){
 const months=[42,55,48,69,62,84,72,91];
 const path=months.map((v,i)=>`${18+i*42},${125-v}`).join(" ");
 return <div className="min-h-[475px] bg-[#fcfaf6] p-4 text-[#29243d] sm:p-6">
  <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[#dfdae6] pb-4"><div><span className="text-[10px] font-bold uppercase tracking-[.17em] text-[#8051a5]">PAINEL FINANCEIRO</span><h4 className="mt-2 font-serif text-[25px] tracking-[-.035em]">Visão de caixa</h4></div><span className="rounded-lg border border-[#d4c2e1] bg-[#f1e8f6] px-3 py-2 text-[10px] font-semibold text-[#7c529f]">PERÍODO CONCEITUAL</span></div>
  <div className="mt-4 grid grid-cols-3 gap-2">{[["Receitas","R$ 86 mil"],["Despesas","R$ 51 mil"],["Saldo","R$ 35 mil"]].map(([x,n],i)=><div key={x} className={`rounded-xl border p-3 ${i===2?"border-[#c7b1dc] bg-[#efe5f7]":"border-[#e3dce9] bg-white"}`}><p className="text-[10px] text-[#51455d]">{x}</p><p className="mt-2 text-[clamp(14px,2.4vw,24px)] font-semibold tracking-[-.035em]">{n}</p></div>)}</div>
  <div className={`mt-4 grid gap-4 ${mobile?"grid-cols-1":"grid-cols-[1.18fr_.82fr]"}`}>
   <div className="rounded-xl border border-[#e2dae8] bg-white p-4"><div className="flex justify-between"><strong className="text-[11px]">Projeção de fluxo</strong><span className="text-[9px] text-[#6c4d7e]">Não são resultados reais</span></div><svg viewBox="0 0 330 150" role="img" aria-label="Linha conceitual de fluxo de caixa" className="mt-5 h-[135px] w-full sm:h-[165px]">{[35,70,105].map(y=><line key={y} x1="15" x2="317" y1={y} y2={y} stroke="#e4dae8" strokeDasharray="4 6"/>)}<polyline points={path} className="vx-demo-line" stroke="#8850b1" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" fill="none"/>{months.map((v,i)=><circle key={i} cx={18+i*42} cy={125-v} r="4" fill="#8a4fb4"/>)}</svg><div className="mt-2 flex justify-between text-[9px] text-[#62556d]"><span>JAN</span><span>FEV</span><span>MAR</span><span>ABR</span><span>MAI</span><span>JUN</span><span>JUL</span><span>AGO</span></div></div>
   <div className="rounded-xl border border-[#e2dae8] bg-white p-4"><strong className="text-[11px]">Distribuição ilustrativa</strong><div className="mx-auto mt-4 grid h-28 w-28 place-items-center rounded-full" style={{background:"conic-gradient(#8355ac 0 55%, #c6acdb 55% 82%, #eee2f6 82% 100%)"}}><div className="grid h-20 w-20 place-items-center rounded-full bg-white text-[14px] font-bold">100%</div></div><div className="mt-5 space-y-2">{[["Operação","#8355ac","55%"],["Investimentos","#c6acdb","27%"],["Reserva","#d6c7df","18%"]].map(([n,color,percent])=><div key={n} className="flex items-center justify-between text-[10px]"><span className="flex items-center gap-2"><i className="h-2 w-2 rounded-full" style={{background:color}}/>{n}</span><span className="font-semibold">{percent}</span></div>)}</div></div>
  </div>
  <div className="mt-3 grid gap-3 rounded-xl border border-[#e2dae8] bg-white p-4 sm:grid-cols-[1.1fr_.9fr]">
    <div><p className="text-[11px] font-semibold">Recebimentos e pagamentos por período</p><MiniColumns tone="violet" values={[24,18,27,21,34,29]} labels={["Jan","Fev","Mar","Abr","Mai","Jun"]} height={67}/></div>
    <div className="flex flex-col justify-center"><p className="mb-3 text-[11px] font-semibold">Composição do saldo</p><SegmentedMeter tone="violet" segments={[{label:"Disponível",value:62},{label:"A receber",value:28},{label:"Reserva",value:10}]}/></div>
  </div>
 </div>;
}
export function DashboardDemo({variant,device,compact=false}:VisualProps){
 const mobile=device==="mobile"&&!compact;
 return <DemoFrame device={device} compact={compact} dark={variant===1} title={["pipeline.bi","operacoes.bi","financeiro.bi"][variant]}>
 {variant===0?<SalesBI mobile={mobile}/>:variant===1?<OperationalBI mobile={mobile}/>:<FinancialBI mobile={mobile}/>}
 </DemoFrame>;
}

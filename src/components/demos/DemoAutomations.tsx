"use client";

import { DemoFrame, type VisualProps } from "./DemoSites";

const stages = ["Entrada", "Qualificação", "CRM", "Notificação"];

function LeadFlow({ mobile, step=0 }: { mobile:boolean; step?:number }) {
 return <div className="min-h-[475px] bg-[#071b2b] p-4 text-white sm:p-6">
  <div className="flex items-center justify-between border-b border-[#294e66] pb-4"><div><span className="text-[10px] font-bold tracking-[.17em] text-[#76caff]">FLUXO / CAPTAÇÃO DE LEADS</span><h4 className="mt-2 text-xl font-bold">Do formulário ao comercial.</h4></div><span className="rounded-lg border border-[#306d8d] px-3 py-2 text-[10px] text-[#9fdbef]">AUTOMAÇÃO 01</span></div>
  <div className={`mt-5 grid gap-3 ${mobile ? "grid-cols-1":"grid-cols-[.9fr_1.1fr]"}`}>
   <div className="rounded-xl border border-[#35617a] bg-[#113048] p-4"><div className="flex items-center justify-between"><span className="text-[10px] font-bold text-[#8dd9fa]">NOVO CONTATO</span><span className="rounded-full bg-[#1e657c] px-2 py-1 text-[9px]">Formulário</span></div><div className="mt-5 space-y-3">{["Nome da empresa","Serviço de interesse","Telefone de contato"].map((x,i)=><div key={x} className="rounded-lg border border-[#395771] bg-[#09243a] px-3 py-2"><p className="text-[9px] text-[#9bb7ce]">{x}</p><div className="mt-2 h-1.5 rounded bg-[#345a76]" style={{width:(i+3)*18+"%"}}/></div>)}</div><div className="mt-4 rounded-lg bg-[#075f9d] py-2.5 text-center text-[10px] font-bold">Enviar solicitação →</div></div>
   <div className="flex min-w-0 flex-col gap-2"><p className="text-[10px] font-bold uppercase tracking-[.12em] text-[#98c8e9]">Etapas conectadas</p>
   {stages.map((x,i)=><div key={x} className={`flex min-w-0 items-center gap-3 rounded-lg border px-3 py-3 transition-colors duration-500 ${i===step%4?"border-[#55d1ff] bg-[#194b65]":"border-[#284e67] bg-[#0c293e]"}`}><span className={`grid h-8 w-8 shrink-0 place-items-center rounded-lg font-mono text-[11px] ${i<=step%4?"bg-[#137b9c] text-white":"bg-[#183b50] text-[#91b6cb]"}`}>{i<step%4?"✓":"0"+(i+1)}</span><div className="min-w-0 flex-1"><p className="text-[11px] font-semibold">{x}</p><p className="mt-1 text-[9px] text-[#a6c1d3]">{["Contato recebido","Interesse identificado","Oportunidade registrada","Equipe avisada"][i]}</p></div><span className="text-[10px] text-[#65cce9]">↗</span></div>)}
   </div>
  </div>
  <div className="mt-4 flex items-center justify-between rounded-lg border border-[#2c536b] bg-[#092236] px-4 py-3 text-[10px] text-[#a8c7d9]"><span>Sem integração ativa · fluxo ilustrativo</span><span className="text-[#62cffa]">CRM / VENDAS</span></div>
 </div>;
}

function CalendarFlow({mobile,step=0}:{mobile:boolean;step?:number}){
 const days=["SEG","TER","QUA","QUI","SEX"];
 const slots=["08:00","09:30","11:00","14:00"];
 return <div className="min-h-[475px] bg-[#f3f8f9] p-4 text-[#163d48] sm:p-6">
  <header className="flex flex-wrap items-center justify-between gap-3 border-b border-[#c8dee2] pb-4"><div><span className="text-[10px] font-bold uppercase tracking-[.16em] text-[#075a72]">AGENDAMENTO / ASSISTÊNCIA</span><h4 className="mt-2 text-xl font-bold tracking-[-.04em]">Agenda inteligente</h4></div><span className="rounded-lg bg-[#d6eef1] px-3 py-2 text-[10px] font-semibold text-[#136478]">SEMANA / MODELO</span></header>
  <div className={`mt-5 grid gap-4 ${mobile ? "grid-cols-1":"grid-cols-[1.3fr_.7fr]"}`}>
   <div className="overflow-hidden rounded-xl border border-[#c4dadf] bg-white"><div className="grid grid-cols-6 border-b border-[#d7e5e7] bg-[#e8f2f3] p-3 text-center text-[9px] font-bold text-[#355b65]"><span>HORA</span>{days.map(d=><span key={d}>{d}</span>)}</div><div className="grid grid-cols-6 gap-1 p-2">{slots.map((time,row)=><div key={time} className="contents"><span className="flex items-center justify-center text-[9px] text-[#3e646d]">{time}</span>{days.map((day,col)=>{const reserved=(row+col)%5===2|| (row===step%4&&col===2);return <div key={day+time} className={`min-h-12 rounded-md border p-1 text-[8px] font-semibold ${row===step%4&&col===2?"border-[#0c98a8] bg-[#c6eff0] text-[#086373]":reserved?"border-[#a1d3d6] bg-[#def3ef] text-[#255e59]":"border-[#e2edef] bg-[#f7fbfb] text-[#b0c4c8]"}`}>{reserved?"● Visita":""}</div>})}</div>)}</div></div>
   <div className="space-y-3"><div className="rounded-xl bg-[#0b596c] p-4 text-white"><p className="text-[10px] font-semibold text-[#9ce0e9]">VISITA EM DESTAQUE</p><p className="mt-4 text-lg font-bold">Técnico disponível</p><p className="mt-2 text-xs text-[#c0e6e9]">Quarta-feira · {slots[step%4]}</p><span className="mt-5 inline-flex rounded-lg bg-[#0b6574] px-4 py-2 text-[10px] font-bold">Confirmar horário ✓</span></div><div className="rounded-xl border border-[#c7dfe1] bg-white p-4"><p className="text-[10px] font-bold text-[#2c7381]">AUTOMAÇÃO DE AGENDA</p><p className="mt-2 text-xs leading-5 text-[#557a81]">Disponibilidade → Reserva → Confirmação</p><div className="mt-4 flex gap-1">{[0,1,2].map(i=><span key={i} className={`h-1.5 flex-1 rounded ${i<=step%3?"bg-[#0a94a2]":"bg-[#cfe5e7]"}`}/>)}</div></div></div>
  </div>
 </div>;
}

function BillingFlow({mobile,step=0}:{mobile:boolean;step?:number}){
 const invoices=[["FAT-1024","Empresa Alfa","R$ 2.450","Liquidado"],["FAT-1025","Cliente Beta","R$ 1.780","Pendente"],["FAT-1026","Empresa Gama","R$ 3.100","Aviso enviado"],["FAT-1027","Cliente Delta","R$ 980","Em análise"]];
 return <div className="min-h-[475px] bg-[#171b27] p-4 text-white sm:p-6">
  <header className="flex flex-wrap items-center justify-between gap-3 border-b border-[#343d50] pb-5"><div><span className="text-[10px] font-bold uppercase tracking-[.16em] text-[#e8b57c]">ROTINA FINANCEIRA / DEMO</span><h4 className="mt-2 text-xl font-bold">Cobranças sem perder o prazo.</h4></div><span className="rounded-lg border border-[#70583e] bg-[#362a23] px-3 py-2 text-[10px] text-[#ffd3a0]">CENTRAL DE AVISOS</span></header>
  <div className={`mt-5 grid gap-4 ${mobile?"grid-cols-1":"grid-cols-[1.25fr_.75fr]"}`}>
   <div className="rounded-xl border border-[#3d4353] bg-[#202635] p-4"><div className="mb-4 flex justify-between text-[10px]"><strong>Contas e vencimentos</strong><span className="text-[#edbe84]">OUTUBRO / DEMO</span></div><div className="space-y-2">{invoices.map(([code,name,amount,state],i)=><div key={code} className={`grid grid-cols-[1fr_auto] gap-2 rounded-lg border px-3 py-3 ${step%4===i?"border-[#c98f4e] bg-[#3b302d]":"border-[#3d4555] bg-[#282e3c]"}`}><div><span className="text-[9px] text-[#c3b0a3]">{code}</span><p className="mt-1 text-[11px] font-semibold">{name}</p></div><div className="text-right"><p className="text-[11px] font-bold">{amount}</p><span className="mt-1 block text-[9px] text-[#eac092]">{state}</span></div></div>)}</div></div>
   <div className="flex flex-col justify-between gap-3"><div className="rounded-xl border border-[#74583b] bg-[#302a29] p-4"><span className="text-[10px] font-bold text-[#f4c591]">REGRA ATIVA / SIMULAÇÃO</span><p className="mt-4 text-base font-semibold">Aviso de vencimento</p><p className="mt-3 text-xs leading-6 text-[#d6c0ad]">Quando uma cobrança entra no prazo configurado, o fluxo prepara um lembrete para conferência.</p><div className="mt-5 flex items-center gap-2 rounded-md bg-[#57402c] px-3 py-2 text-[10px] text-[#ffe0b6]">✉　Mensagem preparada</div></div><div className="rounded-lg border border-[#4b4951] bg-[#222632] p-3 text-[10px] text-[#adb8ca]">Avisos ilustrativos. Nenhuma mensagem real é enviada.</div></div>
  </div>
 </div>;
}
export function AutomationDemo({variant,device,step=0,compact=false}:VisualProps){
 const mobile=device==="mobile"&&!compact;
 return <DemoFrame device={device} compact={compact} title={["leadflow.app","agendaassist.app","cobrarotina.app"][variant]} dark={variant!==1}>
 {variant===0?<LeadFlow mobile={mobile} step={step}/>:variant===1?<CalendarFlow mobile={mobile} step={step}/>:<BillingFlow mobile={mobile} step={step}/>}
 </DemoFrame>;
}

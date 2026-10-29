"use client";

import { useEffect, useRef, useState } from "react";

/** All content below is illustrative: no real client, contract, or KPI is implied. */
const demoNote = "Demonstração conceitual · dados fictícios";

function useDemoCycle(length: number, every = 3000) {
  const [step, setStep] = useState(0);
  const [visible, setVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    const observer = new IntersectionObserver(([entry]) => setVisible(entry.isIntersecting), { threshold: 0.18 });
    observer.observe(node);
    return () => observer.disconnect();
  }, []);
  useEffect(() => {
    if (!visible || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const handle = window.setInterval(() => setStep(current => (current + 1) % length), every);
    return () => window.clearInterval(handle);
  }, [visible, every, length]);
  return { step, setStep, ref };
}

function DemoHeader({ number, label, title }: { number: string; label: string; title: string }) {
  return <div className="flex flex-wrap items-center justify-between gap-3">
    <span className="text-[10px] font-bold uppercase tracking-[0.23em] text-cyan-300">{number} / {label}</span>
    <span className="rounded-full border border-sky-400/20 bg-sky-400/[0.07] px-3 py-1 text-[10px] text-slate-400">{title}</span>
  </div>;
}

function SystemsDemo() {
  const { step, ref, setStep } = useDemoCycle(4, 3300);
  const columns = ["Entrada", "Em desenvolvimento", "Concluído"];
  const taskPos = Math.min(step, 2);
  return <div ref={ref} className="motion-demo-systems relative h-full min-h-[300px] overflow-hidden rounded-2xl border border-white/10 bg-[#0b1628] p-4 sm:p-5">
    <div className="mb-4 flex items-center justify-between border-b border-white/10 pb-3">
      <div className="flex items-center gap-2"><span className="h-2 w-2 rounded-full bg-sky-400"/><span className="text-xs font-semibold text-white">Gestão de projetos</span></div>
      <span className="text-[10px] text-slate-500">Visão operacional</span>
    </div>
    <div className="grid grid-cols-3 gap-2">
      {columns.map((col, index) => <div key={col} className={`rounded-xl border p-2 transition-colors duration-500 sm:p-3 ${index===taskPos ? "border-sky-400/40 bg-sky-400/[0.08]" : "border-white/[0.07] bg-white/[0.025]"}`}>
        <span className="block text-[9px] leading-4 text-slate-300 sm:text-[10px]">{col}</span>
        <div className="mt-3 min-h-[88px] space-y-2">
          {index===taskPos && <div key={step} className="motion-task-enter rounded-lg border border-sky-400/20 bg-[#142b47] p-2">
            <div className="mb-2 h-1 w-9 rounded-full bg-cyan-400"/>
            <div className="text-[10px] font-medium text-white">Portal interno</div>
            <div className="mt-1 text-[9px] text-slate-400">{step===0?"Recebido":step===1?"Em execução":"Entregue"}</div>
          </div>}
          {index===1 && <div className="rounded-md border border-white/10 bg-[#0e2035] p-2 text-[9px] text-slate-400">Painel financeiro</div>}
          {index===2 && <div className="rounded-md border border-white/10 bg-[#0e2035] p-2 text-[9px] text-slate-400">Cadastro de equipes</div>}
        </div>
      </div>)}
    </div>
    <div className="mt-5 flex items-center justify-between gap-2">
      <span className="text-[10px] text-slate-400">Fluxo de uma tarefa, do início à entrega</span>
      <button type="button" onClick={() => setStep(s => (s + 1) % 4)} className="rounded-full border border-sky-400/25 px-3 py-1.5 text-[10px] text-sky-300 hover:bg-sky-400/10" aria-label="Avançar tarefa na demonstração">Avançar →</button>
    </div>
  </div>;
}

const automationStages = [
  { short:"Entrada", desc:"Solicitação" },
  { short:"Validação", desc:"Regras" },
  { short:"Registro", desc:"CRM" },
  { short:"Notificação", desc:"Equipe" },
];
function AutomationDemo() {
  const { step, ref, setStep } = useDemoCycle(4, 1800);
  return <div ref={ref} className="relative flex h-full min-h-[300px] flex-col justify-center overflow-hidden rounded-2xl border border-cyan-400/15 bg-[#041824] p-4 sm:p-6">
    <div className="mb-6 flex justify-between text-[10px] uppercase tracking-wider text-cyan-300/70"><span>Fluxo / Solicitação → CRM</span><span className="flex items-center gap-2"><span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-400"/> Simulação</span></div>
    <div className="relative grid grid-cols-4 gap-1.5 sm:gap-3">
      <div className="absolute left-4 right-4 top-[32px] h-px bg-cyan-900 sm:top-[39px]" aria-hidden="true" />
      <div className="motion-current-flow absolute left-4 top-[31px] h-[2px] bg-gradient-to-r from-blue-500 to-cyan-300 transition-[width] duration-700 sm:top-[38px]" style={{width:`calc(${step * 25}% - ${step ? 6 : 0}px)`}} aria-hidden="true"/>
      {automationStages.map((item, i) => <button type="button" key={item.short} onClick={() => setStep(i)} className={`relative z-10 flex min-h-[122px] flex-col items-center gap-3 rounded-xl border px-1.5 py-3 transition-all duration-500 sm:px-2 ${i <= step ? "border-cyan-400/35 bg-cyan-400/[0.09] text-white" : "border-white/10 bg-[#0b2230] text-slate-400"}`} aria-label={`Visualizar etapa ${item.short}`}>
        <span className={`flex h-8 w-8 items-center justify-center rounded-full border text-xs font-bold transition-all sm:h-10 sm:w-10 ${i===step?"border-cyan-300 bg-cyan-400 text-[#031321] shadow-[0_0_25px_rgba(34,211,238,.35)]":"border-white/20 bg-[#092033] text-cyan-200"}`}>{i < step ? "✓" : `0${i+1}`}</span>
        <span className="text-center text-[10px] font-semibold sm:text-xs">{item.short}</span>
        <span className="text-center text-[9px] text-slate-400">{item.desc}</span>
      </button>)}
    </div>
    <div className="mt-5 flex justify-between gap-3 rounded-lg border border-white/[0.07] bg-white/[0.035] px-3 py-3 text-[10px] text-slate-300"><span>Evento ilustrativo</span><span className="font-semibold text-cyan-300">{automationStages[step].short} {step===3 ? "✓" : "em execução…"}</span></div>
  </div>;
}

const monthly = [26, 41, 37, 56, 48, 68, 61, 79];
const quarterly = [35, 47, 43, 60, 73, 69, 83, 90];
function BiDemo() {
  const [range, setRange] = useState<"mensal" | "trimestral">("mensal");
  const values = range === "mensal" ? monthly : quarterly;
  const positions = values.map((v,i) => `${22+i*42},${148-v*1.23}`).join(" ");
  return <div className="relative h-full min-h-[300px] overflow-hidden rounded-2xl border border-white/10 bg-[#10182b] p-4 sm:p-5">
    <div className="mb-4 flex items-center justify-between gap-2"><span className="text-xs font-semibold text-white">Análise comercial</span>
      <div className="flex rounded-full border border-white/10 bg-[#070f1f] p-1" aria-label="Período de demonstração">
        {(["mensal","trimestral"] as const).map(p=><button key={p} type="button" onClick={()=>setRange(p)} aria-pressed={range===p} className={`rounded-full px-2.5 py-1 text-[10px] transition-colors ${range===p?"bg-blue-600 text-white":"text-slate-400 hover:text-white"}`}>{p=== "mensal"?"Mês":"Trimestre"}</button>)}
      </div>
    </div>
    <div className="mb-4 grid grid-cols-3 gap-2">
      {[{label:"Pedidos",value:range==="mensal"?"128":"384"},{label:"Atendimentos",value:range==="mensal"?"94":"282"},{label:"Conversão",value:range==="mensal"?"12,4%":"13,1%"}].map(k=><div key={k.label} className="rounded-lg border border-white/[0.07] bg-white/[0.035] p-2.5"><p className="text-[9px] text-slate-400">{k.label}</p><strong className="mt-1 block text-lg font-bold tracking-tight text-white">{k.value}</strong></div>)}
    </div>
    <div className="rounded-xl border border-white/[0.07] bg-[#0a1426] px-3 py-3"><div className="mb-2 text-[10px] text-slate-300">Evolução da operação</div>
      <svg key={range} className="h-[118px] w-full overflow-visible" viewBox="0 0 352 153" role="img" aria-label={`Gráfico demonstrativo ${range} de pedidos`}>
        {[35,70,105,140].map(y=><line key={y} x1="12" y1={y} x2="340" y2={y} stroke="white" strokeOpacity=".08" strokeDasharray="3 5" />)}
        <polyline className="motion-line-draw" points={positions} fill="none" stroke="#32d8fa" strokeWidth="3" strokeLinejoin="round" strokeLinecap="round" />
        {values.map((v,i)=><circle key={i} cx={22+i*42} cy={148-v*1.23} r="3.2" fill="#071629" stroke="#32d8fa" strokeWidth="2"/>)}
      </svg>
    </div>
    <p className="mt-2 text-[10px] text-slate-500">Selecione um período para atualizar a análise.</p>
  </div>;
}

function SitesDemo() {
  const [mobile, setMobile] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  useEffect(()=>{
    const el=ref.current;
    if(!el) return;
    let active=false;
    const obs=new IntersectionObserver(([e])=>{active=e.isIntersecting;},{threshold:.2});obs.observe(el);
    const id=window.setInterval(()=>{if(active && !window.matchMedia("(prefers-reduced-motion: reduce)").matches) setMobile(v=>!v)}, 5000);
    return ()=>{obs.disconnect();window.clearInterval(id)};
  },[]);
  return <div ref={ref} className="relative flex h-full min-h-[300px] flex-col items-center justify-center overflow-hidden rounded-2xl border border-blue-300/10 bg-[#101b27] p-4 sm:p-5">
    <div className="absolute inset-0 opacity-20 [background-image:linear-gradient(rgba(255,255,255,.08)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.08)_1px,transparent_1px)] [background-size:28px_28px]" aria-hidden="true"/>
    <div className="relative mb-4 flex rounded-full border border-white/10 bg-black/40 p-1">
      <button type="button" onClick={()=>setMobile(false)} aria-pressed={!mobile} className={`rounded-full px-4 py-1.5 text-[10px] ${!mobile?"bg-white text-[#081526]":"text-slate-400"}`}>Desktop</button>
      <button type="button" onClick={()=>setMobile(true)} aria-pressed={mobile} className={`rounded-full px-4 py-1.5 text-[10px] ${mobile?"bg-white text-[#081526]":"text-slate-400"}`}>Mobile</button>
    </div>
    <div className={`relative w-full overflow-hidden border-[5px] border-[#202c3b] bg-[#f4f7fb] shadow-[0_20px_60px_rgba(0,0,0,.48)] transition-[max-width,border-radius] duration-700 ${mobile?"max-w-[160px] rounded-[26px]":"max-w-[360px] rounded-xl"}`}>
      <div className="flex h-7 items-center justify-between border-b border-slate-200 bg-white px-3"><span className="text-[9px] font-bold tracking-wide text-slate-800">EMPRESA EXEMPLO</span><span className="text-[8px] text-slate-400">{mobile?"☰":"Serviços   Sobre   Contato"}</span></div>
      <div className={`bg-gradient-to-br from-[#12263c] via-[#123c5a] to-[#2670ae] px-4 py-5 transition-[padding] duration-700 ${mobile?"min-h-[137px]":"min-h-[112px]"}`}>
        <div className={`font-bold leading-[1.2] text-white ${mobile?"text-sm":"text-lg"}`}>Sua empresa,<br/><span className="text-cyan-300">mais presente.</span></div>
        <div className="mt-3 inline-block rounded bg-white px-2 py-1 text-[9px] font-semibold text-[#174061]">Fale conosco</div>
      </div>
      <div className={`grid gap-2 bg-white p-3 transition-all duration-700 ${mobile?"grid-cols-1":"grid-cols-3"}`}>
        {['Serviços','Experiência','Contato'].map(x=><div key={x} className="rounded-lg border border-slate-200 bg-slate-50 p-2"><span className="mb-2 block h-1.5 w-8 rounded bg-[#238dd6]/50"/><span className="text-[8px] font-semibold text-slate-600">{x}</span></div>)}
      </div>
    </div>
  </div>;
}

export function TechnologyInMotion() {
  const cards=[
    {id:"sistemas",number:"01",title:"Sistemas sob medida",desc:"Da tarefa ao projeto concluído, uma operação organizada em uma única interface.",Visual:SystemsDemo},
    {id:"automacao",number:"02",title:"Automação de processos",desc:"Veja como informações percorrem um fluxo sem etapas manuais repetitivas.",Visual:AutomationDemo},
    {id:"bi",number:"03",title:"Dashboards e BI",desc:"Explore indicadores ilustrativos, com filtros que realmente respondem.",Visual:BiDemo},
    {id:"sites",number:"04",title:"Sites e landing pages",desc:"Uma apresentação clara que se adapta do computador ao celular.",Visual:SitesDemo}
  ];
  return <section id="tecnologia-em-acao" aria-labelledby="tecnologia-em-acao-titulo" className="relative overflow-hidden border-y border-white/10 bg-[#030a16] py-20 sm:py-28">
    <div className="pointer-events-none absolute inset-x-0 top-0 mx-auto h-[360px] max-w-5xl bg-blue-700/[0.09] blur-[110px]" aria-hidden="true"/>
    <div className="relative mx-auto max-w-7xl px-6 lg:px-10">
      <div className="flex flex-col justify-between gap-8 md:flex-row md:items-end">
        <div className="max-w-3xl"><p className="text-xs font-semibold tracking-[0.25em] text-cyan-300">TECNOLOGIA EM AÇÃO</p>
          <h2 id="tecnologia-em-acao-titulo" className="mt-5 max-w-[800px] text-balance text-4xl font-semibold tracking-[-.045em] text-white sm:text-5xl">Não mostramos apenas soluções. <span className="text-sky-300">Mostramos como funcionam.</span></h2>
          <p className="mt-5 max-w-2xl leading-7 text-slate-400">Quatro experiências animadas, cada uma representando um tipo de tecnologia que pode fazer diferença na rotina de uma empresa.</p>
        </div>
        <span className="w-fit rounded-full border border-cyan-300/20 bg-cyan-300/[0.05] px-4 py-2 text-[11px] font-semibold tracking-wide text-cyan-200">DEMONSTRAÇÕES CONCEITUAIS</span>
      </div>
      <div className="mt-12 grid gap-6 lg:grid-cols-2">
        {cards.map(({id,number,title,desc,Visual})=><article id={`demo-${id}`} key={id} className="group flex min-w-0 flex-col rounded-[28px] border border-white/10 bg-[#07101e] p-4 shadow-[0_22px_60px_rgba(0,0,0,.15)] transition-colors hover:border-sky-300/25 sm:p-6">
          <DemoHeader number={number} label="EXPERIÊNCIA" title={title}/>
          <div className="mt-5 min-w-0"><Visual/></div>
          <h3 className="mt-6 text-2xl font-semibold tracking-tight text-white">{title}</h3>
          <p className="mt-2 max-w-lg text-sm leading-6 text-slate-400">{desc}</p>
          <span className="mt-5 text-[10px] tracking-wide text-slate-500">{demoNote}</span>
        </article>)}
      </div>
    </div>
  </section>;
}

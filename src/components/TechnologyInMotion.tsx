"use client";

import { useEffect, useRef, useState } from "react";

type Chapter = "sistemas" | "automacao" | "bi" | "sites";

const chapters: { id: Chapter; number: string; nav: string; tag: string; heading: string; desc: string; caption: string }[] = [
  { id: "sites", number: "01", nav: "Sites", tag: "PRESENÇA DIGITAL", heading: "Sua marca merece ser bem apresentada.", desc: "Uma experiência responsiva que explica seus serviços e facilita o contato com sua empresa.", caption: "Design e informação em uma interface conceitual, sem clientes reais." },
  { id: "automacao", number: "02", nav: "Automação", tag: "FLUXOS INTELIGENTES", heading: "O trabalho avança sem retrabalho.", desc: "A informação percorre etapas definidas, aciona tarefas e mantém a equipe informada.", caption: "Da solicitação à confirmação, em uma simulação de processo." },
  { id: "bi", number: "03", nav: "Dashboards e BI", tag: "INTELIGÊNCIA DE NEGÓCIO", heading: "Dados organizados. Decisões mais claras.", desc: "Acompanhe tendências, compare períodos e identifique o que merece atenção.", caption: "Painel executivo com filtros e dados exclusivamente ilustrativos." },
  { id: "sistemas", number: "04", nav: "Sistemas", tag: "PLATAFORMAS SOB MEDIDA", heading: "Cada processo no seu lugar.", desc: "Uma operação complexa fica mais clara quando equipes, tarefas e informações trabalham no mesmo ambiente.", caption: "Uma interface conceitual pensada para a operação." },
];

function Arrow({ right = false }: { right?: boolean }) {
  return <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true"><path d={right ? "M5 12h14m-6-6 6 6-6 6" : "M19 12H5m6 6-6-6 6-6"}/></svg>;
}
function Dot({ active = false }: { active?: boolean }) { return <span className={`h-1.5 w-1.5 rounded-full ${active ? "bg-[#25d4ed] shadow-[0_0_12px_#22c6ef]" : "bg-slate-600"}`}/>; }

function SystemsStage({ step }: { step: number }) {
  const tasks = [
    { title: "Portal interno", stage: step < 1 ? 0 : step < 3 ? 1 : 2, owner: "Produto" },
    { title: "Cadastro de equipes", stage: 1, owner: "Operação" },
    { title: "Painel de indicadores", stage: 2, owner: "Dados" },
  ];
  return <div className="showcase-stage-systems h-full rounded-[20px] bg-[#0b1421] p-3 sm:p-5">
    <div className="mb-4 flex items-center justify-between border-b border-white/[.09] pb-4">
      <div className="flex items-center gap-2.5"><span className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#1d67d9]/20 text-[#63bbff]">▦</span><span className="text-xs font-semibold tracking-tight text-white sm:text-sm">Workspace <span className="font-normal text-slate-500">/ Projetos</span></span></div>
      <div className="hidden items-center gap-2 rounded-lg border border-white/10 px-3 py-1.5 text-[10px] text-slate-400 sm:flex"><span className="h-1.5 w-1.5 rounded-full bg-emerald-400"/>Equipe sincronizada</div>
    </div>
    <div className="mb-5 grid grid-cols-3 gap-2 sm:gap-3">
      {[{v:"12",k:"Projetos ativos"},{v:"28",k:"Tarefas abertas"},{v:"04",k:"Equipes"}].map((x,i)=><div key={x.k} className="rounded-xl border border-white/[.08] bg-[#121f31] px-3 py-3 sm:py-4"><span className="block text-[9px] text-slate-400 sm:text-[10px]">{x.k}</span><span className={`mt-2 block text-2xl font-semibold tracking-tight sm:text-3xl ${i===0?"text-[#65c9ff]":"text-slate-100"}`}>{x.v}</span></div>)}
    </div>
    <div className="mb-3 flex items-center justify-between"><span className="text-xs font-semibold text-slate-100">Quadro de execução</span><span className="rounded-full bg-white/[.05] px-2 py-1 text-[10px] text-slate-400">Atualização ao vivo · demo</span></div>
    <div className="grid grid-cols-3 gap-2 sm:gap-3">
      {["A organizar", "Em andamento", "Concluído"].map((name,j)=><div key={name} className="min-h-[183px] rounded-xl border border-white/[.07] bg-[#0d1929] p-2 sm:min-h-[210px] sm:p-3"><div className="mb-3 flex items-center gap-2 text-[9px] font-semibold text-slate-400 sm:text-[11px]"><Dot active={j===1}/>{name}</div>
        {tasks.filter(t=>t.stage===j).map(t=><div key={t.title} className="showcase-appear mb-2 rounded-lg border border-[#2874b7]/30 bg-[#142941] p-2.5 shadow-[0_10px_24px_rgba(0,0,0,.18)] sm:p-3"><div className="mb-2 h-1 w-8 rounded bg-[#38c6e9]"/><div className="text-[10px] font-semibold leading-4 text-white sm:text-xs">{t.title}</div><div className="mt-3 flex items-center justify-between gap-1"><span className="text-[9px] text-[#9baec5]">{t.owner}</span><span className="h-1.5 w-1.5 rounded-full bg-cyan-300"/></div></div>)}
      </div>)}
    </div>
    <div className="mt-4 flex items-center gap-2 text-[10px] text-slate-400"><span className="h-1.5 w-1.5 rounded-full bg-[#20c9df]"/>Uma tarefa muda de etapa; o restante permanece organizado.</div>
  </div>;
}

const workflow=[{name:"Solicitação",sub:"Formulário"},{name:"Validação",sub:"Regras"},{name:"Registro",sub:"CRM"},{name:"Notificação",sub:"Equipe"}];
function AutomationStage({ step }: { step: number }) {
  return <div className="showcase-stage-automation relative h-full min-h-[460px] overflow-hidden rounded-[20px] border border-[#2d8fa9]/15 bg-[#071b22] p-4 sm:p-7">
    <div className="showcase-blueprint pointer-events-none absolute inset-0 opacity-40"/>
    <div className="relative z-10 flex items-center justify-between gap-3 border-b border-cyan-300/10 pb-5"><div className="flex items-center gap-2 text-xs font-semibold text-white"><span className="h-2 w-2 rounded-full bg-[#4de0d5]"/>Fluxo de atendimento</div><span className="rounded-full border border-[#3ac6c3]/20 bg-[#0d3335] px-3 py-1.5 text-[9px] tracking-[.13em] text-[#95e3df]">EXECUÇÃO SIMULADA</span></div>
    <div className="relative z-10 mt-7 grid grid-cols-[30px_1fr] gap-x-4 gap-y-0 sm:grid-cols-[50px_1fr] sm:gap-x-6">
    {workflow.map((s,i)=><div key={s.name} className="contents">
      <div className="relative flex flex-col items-center"><div className={`z-10 flex h-9 w-9 items-center justify-center rounded-xl border text-[11px] font-bold transition-all duration-700 sm:h-11 sm:w-11 ${i===step?"border-[#8ae6ef] bg-[#20c2dc] text-[#04252e] shadow-[0_0_30px_#23d4e755]":i<step?"border-[#327c82] bg-[#123c43] text-[#87deda]":"border-white/10 bg-[#0b2731] text-slate-500"}`}>{i<step?"✓":String(i+1).padStart(2,"0")}</div>{i<3&&<div className="absolute top-9 bottom-[-2px] w-px bg-[#1f5866] sm:top-11"><div className={`h-full w-full bg-[#26d9db] transition-transform duration-700 ${i<step?"scale-y-100":"origin-top scale-y-0"}`}/></div>}</div>
      <div className={`mb-2 rounded-xl border px-4 py-3 transition-colors duration-700 sm:py-4 ${i===step?"border-[#49c7cd]/50 bg-[#123b46]":"border-white/[.07] bg-[#0c2530]/80"}`}><div className="flex items-center justify-between gap-2"><div><strong className="text-xs font-semibold text-slate-50 sm:text-sm">{s.name}</strong><div className="mt-1 text-[10px] text-slate-400">{s.sub}</div></div><span className={`text-[10px] font-medium ${i<step?"text-[#72d6c5]":i===step?"text-cyan-200":"text-slate-600"}`}>{i<step?"Concluído":i===step?"Executando":"Pendente"}</span></div></div>
    </div>)}
    </div>
    <div className="relative z-10 mt-4 flex flex-wrap items-center justify-between gap-2 border-t border-[#4db6b1]/15 pt-4 text-[10px] text-slate-400"><span>Evento ilustrativo · sem conexão com serviços reais</span><span className="font-semibold text-[#6edbd6]">0{step+1} / 04 etapas</span></div>
  </div>;
}

const dataMonthly=[24,29,26,41,36,53,50,67,63,76,70,86];
const dataQuarter=[34,45,39,62,56,69,65,79,74,91,86,96];
function BiStage() {
  const [period,setPeriod]=useState<"mensal"|"trimestral">("mensal");
  const data=period==="mensal"?dataMonthly:dataQuarter;
  const pts=data.map((v,i)=>`${38+i*31},${185-v*1.55}`).join(" ");
  const area=`M ${pts.replaceAll(" "," L ")} L 379 194 L 38 194 Z`;
  return <div className="showcase-stage-bi h-full min-h-[460px] rounded-[20px] bg-[#111723] p-4 sm:p-6">
    <div className="mb-6 flex flex-wrap items-center justify-between gap-3 border-b border-white/[.08] pb-5"><div><div className="text-xs font-semibold text-white">Visão executiva</div><div className="mt-1 text-[10px] text-slate-500">Desempenho comercial · dados fictícios</div></div><div role="group" aria-label="Filtrar período" className="flex rounded-lg border border-white/10 bg-[#090f1b] p-1">{(["mensal","trimestral"] as const).map(p=><button key={p} aria-pressed={period===p} onClick={()=>setPeriod(p)} className={`rounded-md px-3 py-1.5 text-[10px] font-medium transition-colors ${period===p?"bg-[#1d426b] text-cyan-100":"text-slate-400 hover:text-white"}`} type="button">{p==="mensal"?"Mensal":"Trimestral"}</button>)}</div></div>
    <div className="grid grid-cols-3 gap-2 sm:gap-3">{[{k:"Pedidos",v:period==="mensal"?"128":"384"},{k:"Atendimentos",v:period==="mensal"?"94":"282"},{k:"Conversão",v:period==="mensal"?"12,4%":"13,1%"}].map((k,i)=><div key={k.k} className="rounded-xl border border-white/[.07] bg-[#172234] px-2.5 py-4 sm:p-4"><div className="text-[9px] text-slate-400 sm:text-[10px]">{k.k}</div><div className={`mt-2 text-xl font-semibold sm:text-2xl ${i===0?"text-[#72cfff]":"text-white"}`}>{k.v}</div></div>)}</div>
    <div className="mt-4 rounded-xl border border-white/[.08] bg-[#0d1625] px-2 py-3 sm:px-4 sm:py-4"><div className="mb-3 flex items-center justify-between gap-2"><span className="text-[10px] font-semibold text-slate-200">Evolução de volume</span><span className="text-[9px] text-slate-500">Série ilustrativa</span></div><svg viewBox="0 0 420 210" className="w-full" role="img" aria-label="Gráfico ilustrativo de volume ao longo do tempo"><defs><linearGradient id="vx-bi-fill" x1="0" x2="0" y1="0" y2="1"><stop offset="0" stopColor="#1e8afe" stopOpacity=".4"/><stop offset="1" stopColor="#1e8afe" stopOpacity="0"/></linearGradient></defs>{[50,90,130,170].map(y=><line key={y} x1="30" y1={y} x2="395" y2={y} stroke="#36506b" strokeWidth=".7" strokeDasharray="3 6"/>)}<path d={area} fill="url(#vx-bi-fill)" key={period+"-area"}/><polyline className="showcase-graph-draw" key={period} points={pts} stroke="#47c7f6" strokeWidth="3" fill="none" strokeLinejoin="round" strokeLinecap="round"/>{data.map((n,i)=><circle key={i} cx={38+i*31} cy={185-n*1.55} r="2.8" fill="#6ed8fc"/>)}<text x="32" y="207" fill="#758aa4" fontSize="10">Jan</text><text x="366" y="207" fill="#758aa4" fontSize="10">Dez</text></svg></div>
  </div>;
}
function SitesStage({ step }: { step: number }) {
  const mobile=step>=2;
  return <div className="showcase-stage-sites relative flex h-full min-h-[460px] items-center justify-center overflow-hidden rounded-[20px] bg-[#e8edf3] p-4 sm:p-7">
    <div className="absolute inset-x-0 top-0 h-28 bg-gradient-to-b from-[#e1edfa] to-transparent"/>
    <div className="absolute left-6 top-5 text-[10px] font-semibold uppercase tracking-[.2em] text-slate-500">Estúdio digital / Responsividade</div>
    <div className={`relative mt-7 flex w-full max-w-[560px] flex-col overflow-hidden border-[5px] border-[#162236] bg-[#fafcff] shadow-[0_35px_75px_#20324d4b] transition-[width,border-radius] duration-700 ${mobile?"max-w-[250px] rounded-[28px]":"rounded-[14px]"}`}>
      <div className="flex items-center justify-between border-b border-slate-200 bg-white px-4 py-3"><div className="flex items-center gap-2"><span className="inline-block h-4 w-4 rotate-45 rounded-sm bg-[#1979dd]"/><span className="text-[11px] font-black tracking-tight text-[#0c2447]">AURORA <span className="font-normal text-[#1677b9]">/ arquitetura</span></span></div>{mobile?<span className="text-slate-500">☰</span>:<div className="flex gap-3 text-[9px] font-semibold text-slate-500"><span>Projetos</span><span>Serviços</span><span>Contato</span></div>}</div>
      <div className={`grid bg-[#eff5fa] transition-all duration-700 ${mobile?"grid-cols-1":"grid-cols-[1.1fr_.9fr]"}`}><div className="flex flex-col items-start justify-center p-5 sm:p-8"><span className="mb-3 text-[8px] font-bold uppercase tracking-widest text-[#125b93]">Arquitetura comercial</span><strong className={`font-semibold leading-tight tracking-[-.055em] text-[#0e1f38] ${mobile?"text-2xl":"text-2xl sm:text-3xl"}`}>Espaços para o próximo capítulo.</strong><p className="mt-3 text-[10px] leading-relaxed text-slate-600">Projetos pensados para pessoas e negócios.</p><span className="mt-5 rounded-md bg-[#116cc1] px-4 py-2 text-[9px] font-semibold text-white">Solicitar contato ↗</span></div>
        <div className={`relative min-h-[185px] overflow-hidden bg-gradient-to-br from-[#c1d5e6] via-[#97b9d3] to-[#567c9e] ${mobile?"h-44":""}`}><svg viewBox="0 0 300 280" preserveAspectRatio="xMidYMid slice" className="h-full w-full"><rect x="70" y="58" width="200" height="185" fill="#48667e"/><polygon points="40,105 175,22 290,89 168,153" fill="#dae9f3"/><polygon points="40,105 168,153 168,255 40,207" fill="#7092ad"/><polygon points="168,153 290,89 290,215 168,255" fill="#37536d"/>{[0,1,2].map(i=><g key={i}><rect x={62+i*32} y={139+i*12} width="23" height="47" fill="#b9d5e4" opacity=".85"/><path d={`M ${73+i*32} ${145+i*12}v36`} stroke="#668da4"/></g>)}{[0,1,2].map(i=><rect key={i} x={181+i*30} y="143" width="19" height="79" fill="#9bbbd0" opacity=".9"/>)}</svg></div></div>
      <div className={`grid gap-2 bg-white px-4 py-4 ${mobile?"grid-cols-1":"grid-cols-3"}`}>{["Projetos autorais","Atendimento próximo","Visão de longo prazo"].map(x=><div className="flex items-center gap-2" key={x}><span className="h-5 w-5 rounded-md bg-[#e5f2fb] p-1 text-center text-[9px] text-[#1974bd]">✓</span><span className="text-[9px] font-medium text-slate-600">{x}</span></div>)}</div>
    </div>
    <div className="absolute bottom-5 right-5 rounded-lg border border-[#d5deea] bg-white/90 px-3 py-1.5 text-[10px] font-medium text-[#2f435d] shadow-sm">{mobile?"Visão mobile":"Visão desktop"} · Demo</div>
  </div>;
}

export function TechnologyInMotion() {
  const [active,setActive]=useState<Chapter>("sites");
  const [step,setStep]=useState(0);
  const [playing,setPlaying]=useState(true);
  const [visible,setVisible]=useState(false);
  const wrapper=useRef<HTMLElement>(null);
  const chapter=chapters.find(c=>c.id===active)??chapters[0];
  useEffect(() => {
    const handler = (event: Event) => {
      const slug = (event as CustomEvent<{ slug?: string }>).detail?.slug;
      if (chapters.some(c => c.id === slug)) {
        setActive(slug as Chapter);
        setStep(0);
      }
    };
    window.addEventListener("vorzax:demo", handler);
    return () => window.removeEventListener("vorzax:demo", handler);
  }, []);
  useEffect(()=>{const obs=new IntersectionObserver(([e])=>setVisible(e.isIntersecting),{threshold:.18});if(wrapper.current)obs.observe(wrapper.current);return ()=>obs.disconnect()},[]);
  useEffect(()=>{if(!visible||!playing||window.matchMedia("(prefers-reduced-motion: reduce)").matches)return;const interval=window.setInterval(()=>setStep(v=>(v+1)%4),2600);return ()=>window.clearInterval(interval)},[active,playing,visible]);
  const choose=(id:Chapter)=>{setActive(id);setStep(0)};
  const idx=chapters.findIndex(c=>c.id===active);
  return <section ref={wrapper} id="tecnologia-em-acao" aria-labelledby="vx-showcase-title" className="relative overflow-hidden border-y border-white/[.09] bg-[#050a13] py-20 sm:py-28">
    <div className="pointer-events-none absolute -top-64 left-1/2 h-[520px] w-[700px] -translate-x-1/2 rounded-full bg-[#0d4298]/10 blur-[120px]"/>
    <div className="relative mx-auto max-w-7xl px-5 sm:px-7 lg:px-10">
      <div className="mb-12 flex max-w-4xl flex-col items-start gap-5 sm:mb-16"><div className="flex items-center gap-4"><span className="h-[1px] w-9 bg-[#3ec8e9]"/><span className="text-[10px] font-bold uppercase tracking-[.28em] text-[#6dccef]">VORZAX / TECNOLOGIA EM AÇÃO</span></div><h2 id="vx-showcase-title" className="text-balance text-4xl font-semibold leading-[1.08] tracking-[-.055em] text-[#f5f8ff] sm:text-5xl lg:text-[64px]">Menos discurso. <span className="text-[#51bafa]">Mais tecnologia em movimento.</span></h2><p className="max-w-2xl text-sm leading-7 text-[#9aaabd] sm:text-base">Quatro experiências para visualizar possibilidades reais de aplicação. Interfaces interativas, exemplos claros e uma estética diferente para cada solução.</p></div>
      <div className="overflow-hidden rounded-[25px] border border-[#344057]/60 bg-[#0b111b] shadow-[0_35px_110px_rgba(0,0,0,.38)]">
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-white/[.08] bg-[#0c1420] px-4 py-3 sm:px-6"><span className="flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[.15em] text-slate-400"><span className="h-1.5 w-1.5 rounded-full bg-cyan-400"/>LABORATÓRIO DE SOLUÇÕES</span><span className="text-[10px] text-slate-500">Ambiente conceitual · Sem clientes reais</span></div>
        <div className="grid lg:grid-cols-[270px_1fr] xl:grid-cols-[305px_1fr]">
          <nav aria-label="Selecionar demonstração" className="flex gap-2 overflow-x-auto border-b border-white/[.07] px-3 py-3 lg:flex-col lg:gap-1 lg:border-b-0 lg:border-r lg:p-4">
            {chapters.map(c=><button key={c.id} aria-pressed={active===c.id} onClick={()=>choose(c.id)} type="button" className={`group flex shrink-0 items-center gap-3 rounded-xl border px-3 py-3 text-left transition-all duration-300 lg:w-full lg:px-4 lg:py-4 ${active===c.id?"border-[#3679ae]/40 bg-[#15314d] text-white":"border-transparent text-[#8da1b8] hover:border-white/[.07] hover:bg-white/[.035] hover:text-white"}`}><span className={`text-[11px] font-semibold ${active===c.id?"text-[#62cbf6]":"text-[#92a7bf]"}`}>{c.number}</span><span className="text-xs font-semibold sm:text-sm">{c.nav}</span>{active===c.id&&<span className="ml-auto hidden h-1.5 w-1.5 rounded-full bg-[#3ec9fa] lg:inline-block"/>}</button>)}
            <div className="mt-auto hidden border-t border-white/[.08] px-4 pt-5 text-[11px] leading-5 text-slate-500 lg:block">Criado para demonstrar ideias e possibilidades. Nenhum resultado ou cliente é apresentado como caso real.</div>
          </nav>
          <div className="min-w-0 p-3 sm:p-5 lg:p-6">
            <div className="showcase-appear mb-5 min-h-[86px] px-1" key={active+"-head"}><div className="mb-2 text-[10px] font-bold tracking-[.22em] text-[#66c9ef]">{chapter.tag}</div><h3 className="text-2xl font-semibold tracking-[-.035em] text-white sm:text-3xl">{chapter.heading}</h3><p className="mt-2 max-w-xl text-xs leading-6 text-slate-400 sm:text-sm">{chapter.desc}</p></div>
            <div aria-label={`Demonstração de ${chapter.nav}`} className="showcase-stage-appear min-h-[450px]" key={active}>
              {active==="sistemas"&&<SystemsStage step={step}/>}
              {active==="automacao"&&<AutomationStage step={step}/>}
              {active==="bi"&&<BiStage/>}
              {active==="sites"&&<SitesStage step={step}/>}
            </div>
            <div className="mt-4 flex flex-wrap items-center justify-between gap-3 px-1"><span className="text-[10px] text-slate-500">{chapter.caption}</span><div className="flex items-center gap-2"><button type="button" aria-label="Voltar demonstração" className="flex h-9 w-9 items-center justify-center rounded-full border border-white/10 text-[#aac0d4] hover:border-[#46b9e7] hover:text-white" onClick={()=>choose(chapters[(idx+3)%4].id)}><Arrow/></button><button type="button" className="flex h-9 items-center justify-center rounded-full border border-white/10 px-3 text-[10px] text-[#b8cfe2] hover:border-[#46b9e7] hover:text-white" onClick={()=>setPlaying(x=>!x)}>{playing?"Ⅱ Pausar":"▶ Reproduzir"}</button><button type="button" aria-label="Próxima demonstração" className="flex h-9 w-9 items-center justify-center rounded-full border border-[#2e6792] bg-[#133453] text-[#addef8] hover:border-[#46b9e7] hover:text-white" onClick={()=>choose(chapters[(idx+1)%4].id)}><Arrow right/></button></div></div>
          </div>
        </div>
      </div>
      <p className="mt-5 text-center text-[11px] leading-5 text-[#96aec8]">Demonstrações conceituais de interfaces e processos. Dados ilustrativos, sem vínculos com clientes ou projetos contratados.</p>
    </div>
  </section>;
}

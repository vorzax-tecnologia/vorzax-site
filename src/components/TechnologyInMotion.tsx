"use client";

import { useEffect, useRef, useState } from "react";

type Chapter = "sites" | "automacao" | "bi" | "sistemas";
type Device = "desktop" | "mobile";
type Example = { name: string; subtitle: string; tag: string };

const catalog: Record<Chapter, { title: string; intro: string; examples: Example[] }> = {
  sites: {
    title: "Sites que combinam com cada negócio.",
    intro: "Três propostas visuais diferentes, com navegação adaptada para computador e celular.",
    examples: [
      { name: "Climatização comercial", subtitle: "Serviços, áreas atendidas e contato em destaque", tag: "Site de serviços B2B" },
      { name: "Escritório contábil", subtitle: "Confiança, especialidades e atendimento consultivo", tag: "Site profissional" },
      { name: "Arquitetura e projetos", subtitle: "Apresentação visual com portfólio conceitual", tag: "Site de apresentação" },
    ],
  },
  automacao: {
    title: "Processos conectados, sem repetição.",
    intro: "Três exemplos de fluxo: do pedido inicial ao registro e à comunicação com a equipe.",
    examples: [
      { name: "Captação de leads", subtitle: "Formulário, qualificação, CRM e aviso comercial", tag: "Fluxo comercial" },
      { name: "Agendamento técnico", subtitle: "Solicitação, disponibilidade, agenda e confirmação", tag: "Fluxo operacional" },
      { name: "Cobrança e avisos", subtitle: "Vencimento, conferência, registro e notificação", tag: "Fluxo administrativo" },
    ],
  },
  bi: {
    title: "Dados organizados em perspectivas diferentes.",
    intro: "Painéis comerciais, operacionais e financeiros com indicadores e gráficos demonstrativos.",
    examples: [
      { name: "BI comercial", subtitle: "Oportunidades, propostas e conversões", tag: "Visão de vendas" },
      { name: "BI de operações", subtitle: "Demandas, atendimento e execução", tag: "Visão operacional" },
      { name: "BI financeiro", subtitle: "Receitas, despesas e evolução", tag: "Visão financeira" },
    ],
  },
  sistemas: {
    title: "Software pensado para a operação.",
    intro: "Conceitos distintos de sistemas internos, apresentados como interface de uso real.",
    examples: [
      { name: "Ordens de serviço", subtitle: "Atendimentos, equipes e execução", tag: "Gestão técnica" },
      { name: "Controle de estoque", subtitle: "Produtos, movimentações e alertas", tag: "Gestão de materiais" },
      { name: "Gestão de projetos", subtitle: "Atividades, prazos e responsáveis", tag: "Gestão de trabalho" },
    ],
  },
};

const categories: { id: Chapter; label: string; number: string }[] = [
  { id: "sites", label: "Sites", number: "01" },
  { id: "automacao", label: "Automações", number: "02" },
  { id: "bi", label: "Dashboards e BI", number: "03" },
  { id: "sistemas", label: "Sistemas sob medida", number: "04" },
];

function BrowserFrame({ device, children, mode = "dark" }: { device: Device; children: React.ReactNode; mode?: "light" | "dark" }) {
  const mobile = device === "mobile";
  return (
    <div className={`vx-preview-device mx-auto overflow-hidden border transition-[width,border-radius] duration-500 ease-out ${mobile ? "w-full max-w-[320px] rounded-[27px] border-[7px] border-[#23344a] shadow-[0_25px_55px_rgba(0,0,0,.38)]" : "w-full rounded-[15px] border-[5px] border-[#253e59] shadow-[0_18px_48px_rgba(0,0,0,.22)]"} ${mode === "light" ? "bg-white text-[#15283d]" : "bg-[#0b1829] text-white"}`}>
      <div className={`flex h-9 items-center gap-2 border-b px-3 ${mode === "light" ? "border-[#e0e7ee] bg-[#f5f8fc]" : "border-white/10 bg-[#10253b]"}`}>
        <div className="flex gap-1"><span className="h-1.5 w-1.5 rounded-full bg-[#ef7a80]"/><span className="h-1.5 w-1.5 rounded-full bg-[#edc56e]"/><span className="h-1.5 w-1.5 rounded-full bg-[#6ec9b5]"/></div>
        <span className={`ml-1 min-w-0 flex-1 truncate rounded-md px-3 py-1 text-center text-[9px] ${mode === "light" ? "bg-[#e9eef4] text-[#536c83]" : "bg-[#071727] text-[#9bb9d1]"}`}>demonstração-conceitual.vorzax</span>
        <span className={`text-[9px] ${mode === "light" ? "text-[#61768a]" : "text-[#9bb9d1]"}`}>{mobile ? "390" : "1440"}</span>
      </div>
      {children}
    </div>
  );
}

const siteStyles = [
  { brand: "CLIMA / PRO", background: "bg-[#071a2d]", bar: "bg-[#0d2944]", accent: "text-[#76cbff]", panel: "bg-[#113455]", button: "bg-[#0875db]", headline: "Climatização profissional para sua operação.", small: "Instalação • Manutenção • PMOC", services: ["Instalação técnica", "Manutenção", "Projetos comerciais"] },
  { brand: "NÚCLEO CONTÁBIL", background: "bg-[#f6f3ed]", bar: "bg-[#eae6dd]", accent: "text-[#277361]", panel: "bg-[#e6efe8]", button: "bg-[#276b59]", headline: "Clareza contábil para decisões melhores.", small: "Contabilidade • Fiscal • Consultoria", services: ["Contabilidade", "Consultoria", "Departamento fiscal"] },
  { brand: "LINHA / ATELIÊ", background: "bg-[#282825]", bar: "bg-[#3a3732]", accent: "text-[#e7c7a1]", panel: "bg-[#4b443d]", button: "bg-[#b38a62]", headline: "Espaços pensados para viver melhor.", small: "Arquitetura • Interiores • Projetos", services: ["Residencial", "Comercial", "Interiores"] },
];

function SitePreview({ variant, device }: { variant: number; device: Device }) {
  const config = siteStyles[variant];
  const mobile = device === "mobile";
  const dark = variant !== 1;
  return <BrowserFrame device={device} mode={dark ? "dark" : "light"}>
    <div className={`${config.background} min-h-[300px] ${dark ? "text-white" : "text-[#20372f]"}`}>
      <div className={`flex items-center justify-between border-b ${dark ? "border-white/10" : "border-black/10"} px-5 py-3`}>
        <strong className={`text-xs font-extrabold tracking-[.14em] ${config.accent}`}>{config.brand}</strong>
        {mobile ? <span aria-hidden="true" className="text-xl">≡</span> : <div className="flex items-center gap-4 text-[10px] opacity-75"><span>Início</span><span>Serviços</span><span>Sobre</span><span>Contato</span></div>}
      </div>
      <div className={`grid ${mobile ? "grid-cols-1" : "grid-cols-[1.12fr_.88fr]"} gap-4 px-5 py-6 sm:px-7 sm:py-8`}>
        <div className="flex flex-col justify-center">
          <span className={`mb-3 text-[9px] font-bold uppercase tracking-[.18em] ${config.accent}`}>EXEMPLO DE SITE INSTITUCIONAL</span>
          <h4 className={`max-w-[370px] font-semibold tracking-[-.05em] ${mobile ? "text-[25px] leading-[1.12]" : "text-[clamp(24px,2.6vw,38px)] leading-[1.12]"}`}>{config.headline}</h4>
          <p className={`mt-3 text-[11px] leading-5 ${dark ? "text-[#becbd8]" : "text-[#526b60]"}`}>{config.small}</p>
          <span className={`mt-5 inline-flex w-fit items-center rounded-lg px-4 py-2.5 text-[11px] font-semibold text-white ${config.button}`}>Solicitar atendimento <span aria-hidden="true" className="ml-2">↗</span></span>
        </div>
        <div className={`relative isolate min-h-[165px] overflow-hidden rounded-[13px] ${config.panel}`}>
          {variant===0 ? <div className="absolute inset-0" aria-hidden="true"><div className="absolute -right-12 -top-6 h-40 w-40 rounded-full border-[18px] border-[#58a7d6]/30"/><div className="absolute bottom-4 left-6 right-7 h-[55px] rounded-xl border border-[#70bbef]/45 bg-[#071f35] shadow-xl"><div className="absolute left-4 top-3 h-3 w-[55%] rounded-full bg-[#3178af]"/><div className="absolute left-4 top-8 h-2 w-[73%] rounded-full bg-[#18446a]"/><div className="absolute -right-3 -top-5 h-[88px] w-[64px] rounded-md border border-[#76b8dc]/60 bg-[#0b314f]"><div className="mx-auto mt-3 h-2 w-[70%] rounded-full bg-[#48bafa]"/></div></div></div> : variant===1 ? <div className="absolute inset-0" aria-hidden="true"><div className="absolute right-6 top-6 flex h-[120px] w-[120px] items-center justify-center rounded-full border-[14px] border-[#83b59d]/60"><div className="h-16 w-16 rounded-full border-[7px] border-[#d4e5d7]"/></div><div className="absolute bottom-5 left-5 h-24 w-[43%] rounded-xl bg-[#b2d1bd]/75"/><div className="absolute bottom-8 left-8 h-2 w-20 rounded-full bg-[#578a71]"/></div> : <div className="absolute inset-0" aria-hidden="true"><div className="absolute left-[22%] top-5 h-[160px] w-[54%] rotate-[9deg] border-[9px] border-[#d6c0a2] bg-[#e9d5bb] shadow-[25px_15px_0_#1a1b1a]"/><div className="absolute left-[35%] top-12 h-[112px] w-[38%] rotate-[9deg] bg-[#9b7960]"/><div className="absolute bottom-7 right-[18%] h-[80px] w-[25%] rotate-[9deg] bg-[#b7a78f]"/></div>}
          <span className={`absolute bottom-3 right-3 rounded-md px-2 py-1 text-[9px] ${dark ? "bg-[#091d31]/85 text-[#b4dcf8]" : "bg-white/80 text-[#486855]"}`}>VISUAL CONCEITUAL</span>
        </div>
      </div>
      <div className={`grid ${mobile ? "grid-cols-1" : "grid-cols-3"} gap-2 px-5 pb-5 sm:px-7`}>
        {config.services.map((title,i)=><div key={title} className={`rounded-lg border p-3 ${dark ? "border-white/10 bg-white/[.055]" : "border-[#d4ddd4] bg-white/75"}`}><span className={`text-[10px] font-bold ${config.accent}`}>0{i+1}</span><p className="mt-1 text-[10px] font-semibold">{title}</p></div>)}
      </div>
    </div>
  </BrowserFrame>;
}

const flows = [
  ["Novo contato", "Qualificação", "Registro no CRM", "Aviso comercial"],
  ["Solicitação", "Verifica agenda", "Reserva horário", "Confirmação"],
  ["Vencimento", "Confere status", "Atualiza registro", "Envia lembrete"],
];
function AutomationPreview({ variant, device, step }: { variant: number; device: Device; step: number }) {
  const mobile=device==="mobile";
  return <BrowserFrame device={device}>
    <div className="min-h-[300px] bg-[#071e25] px-4 py-5 sm:p-7">
      <div className="flex items-center justify-between gap-3 border-b border-[#2d6669]/50 pb-4"><div className="flex items-center gap-2 text-xs font-semibold"><span className="h-2 w-2 rounded-full bg-[#4ae1d5] shadow-[0_0_12px_#4ae1d5]"/>CENTRAL DE AUTOMAÇÕES</div><span className="text-[9px] text-[#9accca]">DEMO / 0{variant+1}</span></div>
      <div className="mt-5 flex items-center gap-3"><span className="rounded-lg bg-[#174c53] px-3 py-2 text-[11px] font-bold text-[#81e3e3]">TRIGGER</span><span className="min-w-0 text-xs font-semibold text-white">{catalog.automacao.examples[variant].name}</span></div>
      <div className={`mt-5 grid gap-3 ${mobile?"grid-cols-1":"grid-cols-4"}`}>
        {flows[variant].map((name,i)=><div key={name} className={`vx-flow-node relative rounded-xl border p-3 transition-colors duration-500 ${step===i?"border-[#59ded7] bg-[#114751]":"border-[#27525c] bg-[#0d2e38]"}`}>
          <div className="flex items-center justify-between"><span className={`flex h-7 w-7 items-center justify-center rounded-lg text-[10px] font-bold ${step>=i?"bg-[#1c8b8e] text-white":"bg-[#143d49] text-[#8abbbf]"}`}>{step>i?"✓":"0"+(i+1)}</span>{step===i&&<span className="vx-flow-pulse h-2 w-2 rounded-full bg-[#70fbdf]" aria-label="Etapa ativa"/>}</div>
          <p className="mt-3 text-xs font-semibold text-white">{name}</p>
          <p className="mt-2 text-[9px] text-[#a3c5ca]">{step>i?"Etapa concluída":step===i?"Em execução":"Aguardando"}</p>
        </div>)}
      </div>
      <div className="mt-5 flex flex-wrap items-center justify-between gap-3 rounded-lg border border-[#285860] bg-[#0b2a34] px-4 py-3 text-[10px] text-[#a9d4d3]"><span>Fluxo ilustrativo · Nenhuma integração real</span><span className="font-mono font-bold text-[#77e3dc]">0{step+1} / 04</span></div>
    </div>
  </BrowserFrame>;
}

const dashboardData = [
  { name:"Comercial", metrics:[["Oportunidades",148],["Propostas",67],["Conversão",18]], bars:[24,38,31,52,49,65,60,82], units:["","", "%"], accent:"#52bcff" },
  { name:"Operações", metrics:[["Ordens",94],["Em andamento",27],["Concluídas",67]], bars:[58,45,68,62,74,71,85,89], units:["","",""],accent:"#43dbbd" },
  { name:"Financeiro", metrics:[["Receitas",86],["Despesas",51],["Margem",35]], bars:[24,31,37,50,43,59,64,74], units:[" mil"," mil","%"],accent:"#b39bff" },
];
function Count({value,active,suffix=""}:{value:number;active:boolean;suffix?:string}){
 const [n,setN]=useState(0);
 useEffect(()=>{
  if(!active)return;
  const reduced=window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if(reduced){ const id=window.requestAnimationFrame(()=>setN(value));return()=>window.cancelAnimationFrame(id); }
  let frame=0;const start=performance.now();
  const draw=(now:number)=>{const t=Math.min((now-start)/1050,1);setN(Math.round(value*(1-Math.pow(1-t,3))));if(t<1)frame=requestAnimationFrame(draw);};
  frame=requestAnimationFrame(draw);return()=>cancelAnimationFrame(frame);
 },[value,active]);
 return <span className="tabular-nums">{n.toLocaleString("pt-BR")}{suffix}</span>;
}
function DashboardPreview({variant,device,visible}:{variant:number;device:Device;visible:boolean}){
 const [period,setPeriod]=useState<"mes"|"trimestre">("mes");
 const d=dashboardData[variant], mobile=device==="mobile";
 const values=period==="mes"?d.bars:d.bars.map((n,i)=>Math.min(95,n+Math.round(Math.sin(i+variant)*8)+8));
 const points=values.map((n,i)=>`${24+i*37},${130-n}`).join(" ");
 return <BrowserFrame device={device}>
  <div className="min-h-[315px] bg-[#0c1524] p-4 sm:p-6">
   <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[#2a394d] pb-4">
    <div><span className="text-xs font-semibold text-white">Painel {d.name}</span><p className="mt-1 text-[9px] text-[#9fb2c9]">Dados fictícios para demonstração</p></div>
    <div role="group" aria-label="Período dos indicadores" className="flex gap-1 rounded-lg border border-[#30435c] p-1">
      <button type="button" aria-pressed={period==="mes"} onClick={()=>setPeriod("mes")} className={`rounded-md px-2 py-1.5 text-[10px] ${period==="mes"?"bg-[#20496e] text-white":"text-[#a5b9cf]"}`}>Mensal</button>
      <button type="button" aria-pressed={period==="trimestre"} onClick={()=>setPeriod("trimestre")} className={`rounded-md px-2 py-1.5 text-[10px] ${period==="trimestre"?"bg-[#20496e] text-white":"text-[#a5b9cf]"}`}>Trimestral</button>
    </div>
   </div>
   <div className="mt-4 grid grid-cols-3 gap-2">
    {d.metrics.map(([label,n],i)=><div key={label} className="min-w-0 rounded-xl border border-[#2a3a50] bg-[#16263d] px-2 py-3 sm:px-4"><p className="min-h-6 text-[9px] leading-3 text-[#b4c4d7]">{label}</p><p className="mt-2 text-[clamp(15px,2.3vw,25px)] font-semibold text-white"><Count value={n as number} active={visible} suffix={d.units[i]}/></p></div>)}
   </div>
   <div className={`mt-4 grid gap-3 ${mobile?"grid-cols-1":"grid-cols-[1fr_145px]"}`}>
    <div className="rounded-xl border border-[#2a3a50] bg-[#111e31] p-3">
     <span className="text-[10px] font-semibold text-[#d4e6f5]">Evolução {period==="mes"?"mensal":"trimestral"}</span>
     <svg viewBox="0 0 320 146" role="img" aria-label="Gráfico de evolução conceitual" className="mt-2 w-full"><defs><linearGradient id="vx-multi-grad" x1="0" x2="0" y1="0" y2="1"><stop offset="0" stopColor={d.accent} stopOpacity=".25"/><stop offset="1" stopColor={d.accent} stopOpacity="0"/></linearGradient></defs>{[35,70,105].map(y=><line key={y} x1="16" x2="309" y1={y} y2={y} stroke="#29415a" strokeDasharray="3 5"/>)}<polygon points={`24,135 ${points} 283,135`} fill="url(#vx-multi-grad)"/><polyline key={variant+"-"+period} className="vx-gallery-line" points={points} stroke={d.accent} strokeWidth="2.7" strokeLinecap="round" strokeLinejoin="round" fill="none"/>{values.map((v,i)=><circle key={i} cx={24+i*37} cy={130-v} r="3" fill={d.accent}/>)}</svg>
    </div>
    <div className="flex flex-col items-center justify-center rounded-xl border border-[#2a3a50] bg-[#111e31] px-3 py-4">
     <div className="relative grid h-24 w-24 place-items-center"><svg viewBox="0 0 100 100" className="absolute inset-0 -rotate-90" role="img" aria-label="Indicador circular conceitual"><circle cx="50" cy="50" r="38" stroke="#253a52" strokeWidth="9" fill="none"/><circle key={variant+"-"+period} cx="50" cy="50" r="38" className="vx-gallery-ring" stroke={d.accent} strokeWidth="9" fill="none" strokeLinecap="round" strokeDasharray={`${(values[7]/100)*239} 239`}/></svg><strong className="text-xl font-semibold text-white"><Count value={values[7]} active={visible} suffix="%"/></strong></div>
     <p className="mt-3 text-center text-[9px] text-[#9fb6cc]">Indicador simulado</p>
    </div>
   </div>
  </div>
 </BrowserFrame>;
}

const systemsData=[
 { brand:"Ordem / OS",tabs:["Painel","Atendimentos","Equipes"], metrics:[["Ordens",42],["Em execução",12],["Finalizadas",30]],rows:[["Instalação comercial","Em execução"],["Manutenção preventiva","Agendado"],["Vistoria técnica","Finalizado"]] },
 { brand:"Estoque / Hub",tabs:["Visão geral","Produtos","Movimentos"],metrics:[["Produtos",286],["Estoque baixo",7],["Entradas",35]],rows:[["Peça A-104","Em estoque"],["Filtro F-200","Reposição"],["Sensor S-32","Em estoque"]] },
 { brand:"Projetos / Flow",tabs:["Visão geral","Projetos","Atividades"],metrics:[["Projetos",18],["Em andamento",8],["Entregas",6]],rows:[["Planejamento inicial","Concluído"],["Design do projeto","Em execução"],["Validação final","A iniciar"]] },
];
function SystemPreview({variant,device,step}:{variant:number;device:Device;step:number}){
 const data=systemsData[variant],mobile=device==="mobile";
 return <BrowserFrame device={device}>
  <div className="flex min-h-[320px] bg-[#091523] text-white">
   {!mobile&&<aside className="flex w-[27%] min-w-[115px] flex-col border-r border-[#28405b] bg-[#0a192c] p-4"><strong className="text-[10px] tracking-[.13em] text-[#87d5ff]">VORZAX / DEMO</strong><div className="mt-7 space-y-2">{data.tabs.map((t,i)=><div key={t} className={`rounded-lg px-3 py-2 text-[10px] ${i===0?"bg-[#1d456c] text-white":"text-[#94acc2]"}`}>{t}</div>)}</div><span className="mt-auto text-[9px] text-[#7093ae]">AMBIENTE CONCEITUAL</span></aside>}
   <div className="min-w-0 flex-1 p-4 sm:p-5">
    <div className="flex items-center justify-between border-b border-[#28405b] pb-3"><div><h4 className="text-sm font-semibold">{data.brand}</h4><p className="mt-1 text-[9px] text-[#9db7ce]">Visão geral / cenário ilustrativo</p></div><span className="h-7 w-7 rounded-lg bg-[#1d547c] text-center leading-7 text-[#8fd9ff]">▦</span></div>
    <div className="mt-4 grid grid-cols-3 gap-2">{data.metrics.map(([name,n])=><div key={name} className="rounded-lg border border-[#2b4965] bg-[#112a43] p-2"><span className="block min-h-7 text-[9px] leading-3 text-[#afc5db]">{name}</span><strong className="text-[clamp(14px,2vw,24px)] text-white">{n}</strong></div>)}</div>
    <div className="mt-5 flex justify-between gap-3"><strong className="text-[11px]">Atividades</strong><span className="text-[9px] text-[#a7c8e2]">DADOS DE DEMONSTRAÇÃO</span></div>
    <div className="mt-2 space-y-2">
     {data.rows.map(([title,status],i)=><div key={title} className={`flex items-center justify-between gap-2 rounded-lg border px-3 py-3 transition-colors duration-500 ${step%3===i?"border-[#3c99d5] bg-[#194569]":"border-[#2b4560] bg-[#10283e]"}`}><div className="min-w-0"><span className="block truncate text-[10px] font-semibold">{title}</span><span className="mt-1 block text-[9px] text-[#8eaec8]">EX-0{i+1} • cenário de uso</span></div><span className="shrink-0 rounded-md bg-[#1b5376] px-2 py-1 text-[9px] text-[#cce9ff]">{step%3===i?"Em destaque":status}</span></div>)}
    </div>
   </div>
  </div>
 </BrowserFrame>;
}

export function TechnologyInMotion() {
 const [active,setActive]=useState<Chapter>("sites");
 const [variant,setVariant]=useState(0);
 const [device,setDevice]=useState<Device>("desktop");
 const [playing,setPlaying]=useState(true);
 const [step,setStep]=useState(0);
 const [visible,setVisible]=useState(false);
 const sectionRef=useRef<HTMLElement>(null);
 useEffect(()=>{
  const onDemo=(event:Event)=>{const {slug,example}= (event as CustomEvent<{slug?:Chapter;example?:number}>).detail||{};if(slug && slug in catalog){setActive(slug);setVariant(typeof example==="number"&&example>=0&&example<3?example:0);setStep(0);}};
  window.addEventListener("vorzax:demo",onDemo);return()=>window.removeEventListener("vorzax:demo",onDemo);
 },[]);
 useEffect(()=>{const el=sectionRef.current;if(!el)return;const ob=new IntersectionObserver(([entry])=>setVisible(entry.isIntersecting),{threshold:.13});ob.observe(el);return()=>ob.disconnect();},[]);
 useEffect(()=>{if(!visible||!playing||window.matchMedia("(prefers-reduced-motion: reduce)").matches)return;const id=window.setInterval(()=>setStep(v=>(v+1)%4),3200);return()=>window.clearInterval(id)},[visible,playing,active,variant]);
 const select=(key:Chapter)=>{setActive(key);setVariant(0);setStep(0);};
 const example=catalog[active].examples[variant];
 return <section ref={sectionRef} id="tecnologia-em-acao" aria-labelledby="vx-showcase-title" className="relative border-y border-[#1b405f] bg-[#040e1c] py-16 sm:py-24">
  <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_85%_10%,rgba(14,98,170,.12),transparent_58%)]" aria-hidden="true"/>
  <div className="relative mx-auto max-w-[1440px] px-5 sm:px-8 lg:px-10 xl:px-16">
   <p className="text-[10px] font-bold uppercase tracking-[.2em] text-[#79c9fa]">VORZAX / LABORATÓRIO DE SOLUÇÕES</p>
   <div className="mt-4 flex flex-col justify-between gap-5 lg:flex-row lg:items-end"><div><h2 id="vx-showcase-title" className="max-w-3xl text-balance text-[clamp(2rem,3.8vw,3.5rem)] font-semibold leading-[1.1] tracking-[-.055em] text-white">Explore diferentes soluções. <span className="text-[#68c4ff]">Veja como elas funcionam.</span></h2><p className="mt-4 max-w-2xl text-sm leading-7 text-[#9fb5cc]">Escolha um serviço, compare três conceitos e alterne a visualização entre desktop e mobile. Todas as interfaces e informações são ilustrativas.</p></div><span className="w-fit shrink-0 rounded-full border border-[#275579] bg-[#0a2740] px-4 py-2 text-[11px] font-semibold text-[#a3dbfb]">12 CONCEITOS • 4 SERVIÇOS</span></div>
   <div className="mt-9 grid gap-4 lg:grid-cols-[220px_minmax(0,1fr)] xl:grid-cols-[245px_minmax(0,1fr)]">
    <nav aria-label="Categorias das demonstrações" className="flex gap-2 overflow-x-auto pb-2 lg:flex-col lg:overflow-visible">
      {categories.map(c=><button key={c.id} type="button" aria-pressed={active===c.id} onClick={()=>select(c.id)} className={`flex shrink-0 items-center gap-3 rounded-xl border px-4 py-3 text-left text-xs font-semibold transition-colors lg:w-full lg:py-4 ${active===c.id?"border-[#448ebd] bg-[#153856] text-white":"border-[#22415d] bg-[#081b30] text-[#a7c1d7] hover:border-[#3579a7] hover:text-white"}`}><span className="font-mono text-[#6dc9fa]">{c.number}</span>{c.label}</button>)}
      <p className="mt-3 hidden border-t border-[#24445e] pt-5 text-xs leading-6 text-[#8ca7c0] lg:block">Escolha um exemplo e navegue na interface. Nada aqui representa um cliente real.</p>
    </nav>
    <div className="min-w-0 overflow-hidden rounded-[22px] border border-[#2c5777] bg-[#081b2e] shadow-[0_27px_75px_rgba(0,0,0,.25)]">
      <div className="border-b border-[#264760] px-4 py-5 sm:px-7">
        <div className="flex flex-wrap items-center justify-between gap-3"><div><p className="text-[10px] font-bold uppercase tracking-[.17em] text-[#7bc7f8]">{catalog[active].examples.length} IDEIAS PARA EXPLORAR</p><h3 className="mt-2 text-xl font-semibold tracking-[-.04em] text-white sm:text-[26px]">{catalog[active].title}</h3><p className="mt-2 text-xs leading-6 text-[#a8bfd2]">{catalog[active].intro}</p></div><span className="rounded-md border border-[#2e6285] bg-[#0b2e48] px-3 py-1.5 text-[10px] text-[#9cd7f8]">DEMONSTRAÇÃO</span></div>
        <div role="group" aria-label="Escolher exemplo de solução" className="mt-5 flex snap-x gap-2 overflow-x-auto pb-1">
         {catalog[active].examples.map((item,i)=><button type="button" key={item.name} aria-pressed={variant===i} onClick={()=>{setVariant(i);setStep(0)}} className={`min-w-[155px] flex-1 snap-start rounded-xl border px-4 py-3 text-left transition-colors ${variant===i?"border-[#55b6f2] bg-[#123b60] text-white":"border-[#2c4a63] bg-[#0b2338] text-[#afc5d8] hover:border-[#4687b5]"}`}><span className="block text-[10px] font-semibold text-[#88d0ff]">0{i+1} / 03</span><span className="mt-2 block text-xs font-semibold">{item.name}</span></button>)}
        </div>
      </div>
      <div className="px-3 py-5 sm:px-7 sm:py-7">
       <div className="mb-5 flex flex-wrap items-center justify-between gap-3"><div><span className="text-[10px] font-semibold uppercase tracking-[.16em] text-[#76c3f4]">{example.tag}</span><p className="mt-1 text-sm font-semibold text-white">{example.subtitle}</p></div><span className="flex items-center gap-2 text-[10px] text-[#9cb7ce]"><span className="h-1.5 w-1.5 rounded-full bg-[#4dc5ff]"/>CONCEITO INTERATIVO</span></div>
       <div key={active+"-"+variant+"-"+device} className="vx-gallery-stage rounded-[18px] bg-[#071525] p-3 sm:p-5">
        {active==="sites"&&<SitePreview variant={variant} device={device}/>}
        {active==="automacao"&&<AutomationPreview variant={variant} device={device} step={step}/>}
        {active==="bi"&&<DashboardPreview variant={variant} device={device} visible={visible}/>}
        {active==="sistemas"&&<SystemPreview variant={variant} device={device} step={step}/>}
       </div>
       <div className="mt-5 flex flex-wrap items-center justify-between gap-4 border-t border-[#284861] pt-5">
        <div role="group" aria-label="Visualizar demonstração em" className="flex items-center gap-1 rounded-xl border border-[#35688c] bg-[#0b2740] p-1">
          <button type="button" aria-pressed={device==="desktop"} onClick={()=>setDevice("desktop")} className={`flex min-h-10 items-center gap-2 rounded-lg px-4 text-[11px] font-semibold transition-colors ${device==="desktop"?"bg-[#1573b8] text-white shadow-md":"text-[#b4cde1] hover:bg-[#14415f]"}`}><span aria-hidden="true">▣</span>Visão desktop</button>
          <button type="button" aria-pressed={device==="mobile"} onClick={()=>setDevice("mobile")} className={`flex min-h-10 items-center gap-2 rounded-lg px-4 text-[11px] font-semibold transition-colors ${device==="mobile"?"bg-[#1573b8] text-white shadow-md":"text-[#b4cde1] hover:bg-[#14415f]"}`}><span aria-hidden="true">▯</span>Visão mobile</button>
        </div>
        <div className="flex items-center gap-3">
          {(active==="automacao"||active==="sistemas")&&<button type="button" onClick={()=>setPlaying(v=>!v)} className="rounded-full border border-[#315572] px-4 py-2.5 text-[11px] font-semibold text-[#bfdef3] transition hover:border-[#61b9ee]">{playing?"Pausar movimento":"Reproduzir movimento"}</button>}
          <span className="text-[10px] text-[#88a6bb]">0{variant+1} / 03</span>
        </div>
       </div>
       <p className="mt-4 text-[11px] leading-5 text-[#829eb6]">Interfaces, números, marcas e fluxos demonstrativos. Nenhuma empresa, contrato ou resultado real é representado.</p>
      </div>
    </div>
   </div>
  </div>
 </section>;
}

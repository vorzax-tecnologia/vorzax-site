"use client";

import { useEffect, useRef, useState } from "react";
import { demoCatalog, type DemoCategory, type DemoDevice } from "./DemoVisuals";
import { FitDemoStage } from "./FitDemoStage";

type Chapter = DemoCategory;
const categories: { id: Chapter; label: string; number: string }[] = [
  { id:"sites",label:"Sites",number:"01" },
  { id:"automacao",label:"Automações",number:"02" },
  { id:"bi",label:"Dashboards e BI",number:"03" },
  { id:"sistemas",label:"Sistemas sob medida",number:"04" },
  { id:"ia",label:"Vorzax IA",number:"05" },
];

export function TechnologyInMotion() {
 const [active,setActive]=useState<Chapter>("sites");
 const [variant,setVariant]=useState(0);
 const [device,setDevice]=useState<DemoDevice>("desktop");
 useEffect(()=>{
   if(window.matchMedia("(max-width: 639px)").matches)setDevice("mobile");
 },[]);
 const [playing,setPlaying]=useState(true);
 const [expanded,setExpanded]=useState(false);
 const [step,setStep]=useState(0);
 const [visible,setVisible]=useState(false);
 const sectionRef=useRef<HTMLElement>(null);

 useEffect(()=>{
  const onDemo=(event:Event)=>{
    const {slug,example}=(event as CustomEvent<{slug?:Chapter;example?:number}>).detail||{};
    if(slug && slug in demoCatalog){
      setActive(slug);
      setVariant(typeof example==="number"&&example>=0&&example<3?example:0);
      setStep(0);
    }
  };
  window.addEventListener("vorzax:demo",onDemo);
  return()=>window.removeEventListener("vorzax:demo",onDemo);
 },[]);
 useEffect(()=>{
  const el=sectionRef.current;if(!el)return;
  const ob=new IntersectionObserver(([entry])=>setVisible(entry.isIntersecting),{threshold:.1});
  ob.observe(el);
  return()=>ob.disconnect();
 },[]);
 useEffect(()=>{
  if(!visible||!playing||window.matchMedia("(prefers-reduced-motion: reduce)").matches)return;
  const id=window.setInterval(()=>setStep(v=>(v+1)%4),3200);
  return()=>window.clearInterval(id);
 },[visible,playing,active,variant]);

 const select=(key:Chapter)=>{setActive(key);setVariant(0);setStep(0);};
 const example=demoCatalog[active].examples[variant];
 useEffect(()=>{
  if(!expanded)return;
  const previous=document.body.style.overflow;
  document.body.style.overflow="hidden";
  const dismiss=(e:KeyboardEvent)=>{if(e.key==="Escape")setExpanded(false)};
  window.addEventListener("keydown",dismiss);
  return()=>{document.body.style.overflow=previous;window.removeEventListener("keydown",dismiss)};
 },[expanded]);
 return <section ref={sectionRef} id="tecnologia-em-acao" aria-labelledby="vx-showcase-title" className="relative scroll-mt-16 border-y border-[#1b405f] bg-[#040e1c] py-7 sm:py-8 lg:py-4">
  <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_85%_10%,rgba(14,98,170,.12),transparent_58%)]" aria-hidden="true"/>
  <div className="relative mx-auto w-full max-w-[1500px] px-4 sm:px-7 lg:px-9 xl:px-12">
   <div className="flex flex-wrap items-center justify-between gap-3">
    <div className="min-w-0">
      <p className="text-[10px] font-bold uppercase tracking-[.2em] text-[#79c9fa]">VORZAX / LABORATÓRIO DE SOLUÇÕES</p>
      <h2 id="vx-showcase-title" className="mt-1 text-[clamp(1.5rem,2.4vw,2.35rem)] font-semibold leading-[1.1] tracking-[-.05em] text-white">Explore as soluções <span className="text-[#68c4ff]">em ação.</span></h2>
      <p className="mt-1 text-[11px] leading-5 text-[#a1bbd2]">Explore interfaces completas com gráficos, contexto e controles. Visões desktop e iPhone 16 Pro.</p>
    </div>
    <span className="w-fit shrink-0 rounded-full border border-[#275579] bg-[#0a2740] px-3 py-1.5 text-[10px] font-semibold text-[#a3dbfb]">15 CONCEITOS • 5 FRENTES</span>
   </div>
   <div className="mt-4 grid gap-3 lg:mt-3 lg:grid-cols-[175px_minmax(0,1fr)] xl:grid-cols-[190px_minmax(0,1fr)]">
    <nav aria-label="Categorias das demonstrações" className="flex gap-2 overflow-x-auto pb-1 lg:flex-col lg:overflow-visible lg:pb-0">
      {categories.map(c=><button key={c.id} type="button" aria-pressed={active===c.id} onClick={()=>select(c.id)} className={`flex min-h-10 shrink-0 items-center gap-2 rounded-xl border px-3 py-2 text-left text-[11px] font-semibold transition-colors lg:w-full lg:py-3 ${active===c.id?"border-[#448ebd] bg-[#153856] text-white":"border-[#22415d] bg-[#081b30] text-[#a7c1d7] hover:border-[#3579a7] hover:text-white"}`}><span className="font-mono text-[#6dc9fa]">{c.number}</span>{c.label}</button>)}
      <p className="mt-2 hidden border-t border-[#24445e] pt-3 text-[10px] leading-5 text-[#9cb7cf] lg:block">Conceitos visuais, não clientes ou serviços de IA em produção.</p>
    </nav>
    <div className="flex min-w-0 flex-col overflow-hidden rounded-[18px] border border-[#2c5777] bg-[#081b2e] shadow-[0_20px_55px_rgba(0,0,0,.22)]">
      <div className="border-b border-[#264760] px-3 py-3 sm:px-5 lg:py-2.5">
        <div className="flex flex-wrap items-center justify-between gap-2">
         <div className="min-w-0"><p className="text-[9px] font-bold uppercase tracking-[.16em] text-[#7bc7f8]">{demoCatalog[active].examples.length} IDEIAS PARA EXPLORAR</p>
         <h3 className="mt-1 text-base font-semibold tracking-[-.04em] text-white sm:text-xl">{demoCatalog[active].title}</h3></div>
         <div className="flex flex-wrap items-center gap-2">
           <button type="button" onClick={()=>setPlaying(v=>!v)} aria-pressed={!playing} className="min-h-9 rounded-lg border border-[#315572] bg-[#0c2941] px-3 py-2 text-[10px] font-semibold text-[#bfdef3] hover:border-[#61b9ee]">{playing?"Ⅱ Pausar":"▶ Reproduzir"}</button>
           <span className="rounded-md border border-[#2e6285] bg-[#0b2e48] px-2.5 py-1 text-[9px] text-[#9cd7f8]">DEMONSTRAÇÃO</span>
         </div>
        </div>
        <div role="group" aria-label="Escolher exemplo de solução" className="mt-2 flex snap-x gap-2 overflow-x-auto pb-1">
         {demoCatalog[active].examples.map((item,i)=><button type="button" key={item.name} aria-pressed={variant===i} onClick={()=>{setVariant(i);setStep(0)}} className={`min-w-[135px] flex-1 snap-start rounded-lg border px-3 py-2 text-left transition-colors ${variant===i?"border-[#55b6f2] bg-[#123b60] text-white":"border-[#2c4a63] bg-[#0b2338] text-[#afc5d8] hover:border-[#4687b5]"}`}><span className="block text-[9px] font-semibold text-[#88d0ff]">0{i+1} / 03</span><span className="mt-1 block text-[11px] font-semibold">{item.name}</span></button>)}
        </div>
      </div>
      <div className="flex min-h-0 flex-1 flex-col px-3 pb-3 pt-2 sm:px-5">
       <div className="mb-2 flex flex-wrap items-center justify-between gap-2"><div className="min-w-0"><span className="text-[9px] font-semibold uppercase tracking-[.12em] text-[#76c3f4]">{example.tag}</span><p className="text-[11px] font-medium text-white">{example.subtitle}</p></div><span className="text-[9px] text-[#9cb7ce]"><span className="mr-1 text-[#4dc5ff]">●</span>CONCEITO INTERATIVO</span></div>
       <div className={device==="mobile" ? "vx-lab-single-frame aspect-[468/988] w-full overflow-hidden bg-[#071525] sm:aspect-auto sm:h-[min(82svh,850px)] lg:h-[min(82svh,870px)]" : "vx-lab-single-frame h-[min(62svh,640px)] min-h-[420px] w-full overflow-hidden bg-[#071525] sm:h-[min(66svh,650px)] lg:h-[clamp(460px,62svh,650px)]"}>
         <FitDemoStage key={active+"-"+variant+"-"+device} category={active} variant={variant} device={device} step={step} playing={playing}/>
       </div>
       <div className="mt-2 flex flex-wrap items-center justify-between gap-2 border-t border-[#284861] pt-2">
        <div role="group" aria-label="Visualizar demonstração em" className="flex items-center gap-1 rounded-lg border border-[#35688c] bg-[#0b2740] p-1">
          <button type="button" aria-pressed={device==="desktop"} onClick={()=>setDevice("desktop")} className={`flex min-h-9 items-center gap-1.5 rounded-md px-3 text-[10px] font-semibold transition-colors ${device==="desktop"?"bg-[#1573b8] text-white":"text-[#b4cde1] hover:bg-[#14415f]"}`}>▣ Visão desktop</button>
          <button type="button" aria-pressed={device==="mobile"} onClick={()=>setDevice("mobile")} className={`flex min-h-9 items-center gap-1.5 rounded-md px-3 text-[10px] font-semibold transition-colors ${device==="mobile"?"bg-[#1573b8] text-white":"text-[#b4cde1] hover:bg-[#14415f]"}`}>▯ Visão mobile</button>
        </div>
        <div className="flex items-center gap-2">
          <button type="button" onClick={()=>setExpanded(true)} className="rounded-full border border-[#3d89b7] bg-[#103a5b] px-3 py-2 text-[11px] font-semibold text-[#d4efff] transition hover:bg-[#18537e]" aria-label="Ampliar demonstração para leitura">⛶ Ver maior</button>
          
          <span className="text-[9px] text-[#88a6bb]">0{variant+1} / 03</span>
        </div>
       </div>
       <p className="mt-1.5 text-[9px] leading-4 text-[#94b0c8]">Demonstrações e indicadores simulados; não representam clientes, contratos nem resultados reais da Vorzax.</p>
      </div>
    </div>
   </div>
  </div>
  {expanded&&<div role="dialog" aria-modal="true" aria-label="Demonstração ampliada do Laboratório" className="fixed inset-0 z-[210] flex flex-col bg-[#030b18]/98 p-3 text-white sm:p-5">
    <div className="mx-auto flex w-full max-w-[1500px] flex-wrap items-center justify-between gap-3 border-b border-[#315370] pb-3">
      <div><p className="text-[10px] font-semibold uppercase tracking-[.16em] text-[#87ceff]">LABORATÓRIO VORZAX / VISÃO AMPLIADA</p><h3 className="mt-1 text-lg font-bold">{demoCatalog[active].examples[variant].name} · {demoCatalog[active].examples[variant].tag}</h3></div>
      <button type="button" autoFocus onClick={()=>setExpanded(false)} className="min-h-11 rounded-xl border border-[#518fba] bg-[#0c3658] px-5 text-sm font-semibold text-white hover:bg-[#19557c]">Fechar ✕</button>
    </div>
    <div className="vx-lab-single-frame mx-auto mt-2 min-h-0 w-full max-w-[1500px] flex-1 overflow-hidden rounded-xl bg-[#071525]">
      <FitDemoStage key={"expanded-"+active+"-"+variant+"-"+device} category={active} variant={variant} device={device} step={step} playing={playing} expanded/>
    </div>
    <p className="mx-auto mt-2 w-full max-w-[1500px] text-xs text-[#b5cfe1]">A demonstração é redimensionada para caber integralmente no quadro. Amplie para ler melhor. Conteúdos e indicadores são fictícios.</p>
  </div>}
 </section>;
}

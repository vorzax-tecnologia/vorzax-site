"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { demoCatalog, type DemoCategory, type DemoDevice } from "./DemoVisuals";
import { FitDemoStage } from "./FitDemoStage";
import { useMobileReel } from "./useMobileReel";

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
 const mobileViewport=useMobileReel();
 const [deviceOverride,setDeviceOverride]=useState<DemoDevice|null>(null);
 const device=deviceOverride??(mobileViewport?"mobile":"desktop");
 const setDevice=(nextDevice:DemoDevice)=>setDeviceOverride(nextDevice);
 const [playing,setPlaying]=useState(true);
 const [expanded,setExpanded]=useState(false);
 const [step,setStep]=useState(0);
 const [visible,setVisible]=useState(false);
 const sectionRef=useRef<HTMLElement>(null);
 const expandedTriggerRef=useRef<HTMLButtonElement>(null);
 const expandedCloseRef=useRef<HTMLButtonElement>(null);
 const demoFrameRef=useRef<HTMLDivElement>(null);
 const [desktopStageHeight,setDesktopStageHeight]=useState<number|null>(null);

 // Measure the section's chrome, not its position while scrolling. This avoids
 // resize/scroll feedback and reserves the actual space used by the controls.
 useLayoutEffect(()=>{
   const frame=demoFrameRef.current;
   const section=sectionRef.current;
   if(!frame||!section)return;
   let raf=0;
   const measure=()=>{
     const height=window.visualViewport?.height||window.innerHeight;
     const chrome=section.offsetHeight-frame.offsetHeight;
     const anchorOffset=parseFloat(getComputedStyle(section).scrollMarginTop)||0;
     const available=height-chrome-anchorOffset-8;
     const ideal=device==="mobile" ? frame.clientWidth*988/468 : frame.clientWidth*680/1280;
     // On small screens the page can scroll; the preview itself always fits.
     const fitted=window.innerWidth>=1024 ? Math.min(ideal,Math.max(320,available)) : Math.min(ideal,height*0.67);
     setDesktopStageHeight(previous=>previous!==null&&Math.abs(previous-fitted)<1?previous:fitted);
   };
   const schedule=()=>{cancelAnimationFrame(raf);raf=requestAnimationFrame(measure);};
   const observer=new ResizeObserver(schedule);
   observer.observe(section);
   observer.observe(frame);
   schedule();
   window.addEventListener("resize",schedule);
   window.visualViewport?.addEventListener("resize",schedule);
   return()=>{cancelAnimationFrame(raf);observer.disconnect();window.removeEventListener("resize",schedule);window.visualViewport?.removeEventListener("resize",schedule);};
 },[device]);

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

 const revealOnMobile=()=>{if(window.innerWidth<1024)requestAnimationFrame(()=>sectionRef.current?.scrollIntoView({behavior:"instant",block:"start"}));};
 const select=(key:Chapter)=>{setActive(key);setVariant(0);setStep(0);revealOnMobile();};
 const chooseVariant=(next:number)=>{setVariant(next);setStep(0);revealOnMobile();};
 const example=demoCatalog[active].examples[variant];
 useEffect(()=>{
  if(!expanded)return;
  const previous=document.body.style.overflow;
  document.body.style.overflow="hidden";
  const trigger=expandedTriggerRef.current;
  expandedCloseRef.current?.focus();
  const dismiss=(e:KeyboardEvent)=>{
    if(e.key==="Escape"){e.preventDefault();setExpanded(false);return;}
    if(e.key!=="Tab")return;
    const dialog=document.querySelector<HTMLElement>('[data-vx-expanded-dialog="true"]');
    const buttons=dialog?.querySelectorAll<HTMLButtonElement>("button:not([disabled])");
    if(!buttons?.length)return;
    const first=buttons[0],last=buttons[buttons.length-1];
    if(e.shiftKey&&document.activeElement===first){e.preventDefault();last.focus();}
    else if(!e.shiftKey&&document.activeElement===last){e.preventDefault();first.focus();}
  };
  window.addEventListener("keydown",dismiss);
  return()=>{document.body.style.overflow=previous;window.removeEventListener("keydown",dismiss);trigger?.focus();};
 },[expanded]);
 return <section ref={sectionRef} id="tecnologia-em-acao" aria-labelledby="vx-showcase-title" style={{scrollMarginTop: "0px"}} className="relative scroll-mt-16 lg:scroll-mt-0 border-y border-[#1b405f] bg-[#040e1c] py-7 sm:py-8 lg:py-4">
  <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_85%_10%,rgba(14,98,170,.12),transparent_58%)]" aria-hidden="true"/>
  <div className="relative mx-auto w-full max-w-[1680px] px-3 sm:px-5 lg:px-6 xl:px-8">
   <div className="flex flex-wrap items-center justify-between gap-2">
    <div className="min-w-0">
      <p className="hidden text-[10px] font-bold uppercase tracking-[.2em] text-[#79c9fa] sm:block">VORZAX / LABORATÓRIO DE SOLUÇÕES</p>
      <h2 id="vx-showcase-title" className="mt-1 text-[clamp(1.5rem,2.4vw,2.35rem)] font-semibold leading-[1.1] tracking-[-.05em] text-white">Explore as soluções <span className="text-[#68c4ff]">em ação.</span></h2>
      <p className="mt-1 hidden text-[11px] leading-5 text-[#a1bbd2] lg:block">Explore interfaces, gráficos e interações nas visões desktop e mobile.</p>
    </div>
    <span className="hidden w-fit shrink-0 rounded-full border border-[#275579] bg-[#0a2740] px-3 py-1.5 text-[10px] font-semibold text-[#a3dbfb] lg:inline-flex">15 DEMONSTRAÇÕES • 4 SERVIÇOS + IA CONCEITUAL</span>
   </div>
   <div className="mt-2 lg:hidden"><label className="flex items-center gap-3 rounded-xl border border-[#315675] bg-[#0d2a46] px-3 py-2"><span className="shrink-0 text-[11px] font-semibold text-[#8acdf6]">Categoria</span><select aria-label="Selecionar categoria das demonstrações" value={active} onChange={event=>select(event.target.value as Chapter)} className="min-w-0 flex-1 bg-transparent py-1 text-sm font-semibold text-white outline-none">{categories.map(c=><option key={c.id} value={c.id} className="bg-[#08233c]">{c.label}</option>)}</select></label></div>
   <div data-vx-lab-grid className="mt-2 grid gap-3 lg:mt-2 lg:grid-cols-[min(13vw,180px)_minmax(0,1fr)]">
    <nav aria-label="Categorias das demonstrações" className="hidden gap-2 lg:flex lg:flex-col">
      {categories.map(c=><button key={c.id} type="button" aria-pressed={active===c.id} onClick={()=>select(c.id)} className={`flex min-h-10 shrink-0 items-center gap-2 rounded-xl border px-3 py-2 text-left text-[11px] font-semibold transition-colors lg:w-full lg:py-3 ${active===c.id?"border-[#448ebd] bg-[#153856] text-white":"border-[#22415d] bg-[#081b30] text-[#a7c1d7] hover:border-[#3579a7] hover:text-white"}`}><span className="font-mono text-[#6dc9fa]">{c.number}</span>{c.label}</button>)}
      <p className="mt-2 hidden border-t border-[#24445e] pt-3 text-[10px] leading-5 text-[#9cb7cf] lg:block">Conceitos visuais ilustrativos.</p>
    </nav>
    <div className="flex min-w-0 flex-col overflow-hidden rounded-[18px] border border-[#2c5777] bg-[#081b2e] shadow-[0_20px_55px_rgba(0,0,0,.22)]">
      <div data-vx-lab-panel-top className="border-b border-[#264760] px-3 py-2 sm:px-4 lg:py-1.5">
        <div className="flex flex-wrap items-center justify-between gap-2">
         <div className="min-w-0"><p className="hidden text-[9px] font-bold uppercase tracking-[.16em] text-[#7bc7f8] sm:block">{demoCatalog[active].examples.length} IDEIAS PARA EXPLORAR</p>
         <h3 className="text-base font-semibold tracking-[-.04em] text-white sm:mt-1 sm:text-lg"><span className="sm:hidden">{categories.find(c=>c.id===active)?.label}</span><span className="hidden sm:inline">{demoCatalog[active].title}</span></h3></div>
         <div className="flex flex-wrap items-center gap-2">
           <button type="button" onClick={()=>setPlaying(v=>!v)} aria-pressed={!playing} className="min-h-9 rounded-lg border border-[#315572] bg-[#0c2941] px-3 py-2 text-[10px] font-semibold text-[#bfdef3] hover:border-[#61b9ee]">{playing?"Ⅱ Pausar":"▶ Reproduzir"}</button>
           <span className="hidden rounded-md border border-[#2e6285] bg-[#0b2e48] px-2.5 py-1 text-[9px] text-[#9cd7f8] lg:inline-flex">DEMONSTRAÇÃO</span>
         </div>
        </div>
        <select aria-label="Escolher demonstração" value={variant} onChange={event=>chooseVariant(Number(event.target.value))} className="mt-2 w-full rounded-lg border border-[#417ca8] bg-[#123450] px-3 py-2 text-[13px] font-semibold text-white outline-none sm:hidden">{demoCatalog[active].examples.map((item,i)=><option key={item.name} value={i} className="bg-[#123450]">{`0${i+1} / 03 · ${item.name}`}</option>)}</select>
        <div data-vx-lab-selector role="group" aria-label="Escolher exemplo de solução" className="mt-1 hidden snap-x gap-2 overflow-x-auto pb-0.5 sm:flex">
         {demoCatalog[active].examples.map((item,i)=><button type="button" key={item.name} aria-pressed={variant===i} onClick={()=>chooseVariant(i)} className={`min-w-[135px] flex-1 snap-start rounded-lg border px-3 py-1.5 text-left transition-colors ${variant===i?"border-[#55b6f2] bg-[#123b60] text-white":"border-[#2c4a63] bg-[#0b2338] text-[#afc5d8] hover:border-[#4687b5]"}`}><span className="block text-[9px] font-semibold text-[#88d0ff]">0{i+1} / 03</span><span className="mt-1 block text-[11px] font-semibold">{item.name}</span></button>)}
        </div>
      </div>
      <div data-vx-lab-content className="flex min-h-0 flex-1 flex-col px-1 pb-2 pt-1 sm:px-3">
       <div data-vx-lab-label className="mb-1 flex flex-wrap items-center justify-between gap-1 px-2 sm:px-0"><div className="flex min-w-0 flex-wrap items-center gap-x-3 gap-y-0.5"><span className="shrink-0 text-[9px] font-semibold uppercase tracking-[.12em] text-[#76c3f4]">{example.tag}</span><p className="text-[11px] font-medium text-white">{example.subtitle}</p></div><span className="hidden text-[9px] text-[#9cb7ce] lg:inline"><span className="mr-1 text-[#4dc5ff]">●</span>DEMONSTRAÇÃO ILUSTRATIVA</span></div>
       <div ref={demoFrameRef} data-vx-lab-stage data-vx-stage-height={desktopStageHeight??"auto"} data-device={device}
        style={desktopStageHeight===null?undefined:{height:desktopStageHeight}}
        className={device==="mobile" ? "vx-lab-single-frame aspect-[468/988] w-full overflow-hidden bg-[#071525]" : "vx-lab-single-frame aspect-[1280/680] w-full overflow-hidden bg-[#071525]"}>

         <FitDemoStage key={active+"-"+variant+"-"+device} category={active} variant={variant} device={device} step={step} playing={playing}/>
       </div>
       <div data-vx-lab-footer className="mt-1 flex flex-wrap items-center justify-between gap-1 border-t border-[#284861] px-2 pt-1 sm:px-0">
        <div role="group" aria-label="Visualizar demonstração em" className="flex items-center gap-1 rounded-lg border border-[#35688c] bg-[#0b2740] p-1">
          <button type="button" aria-pressed={device==="desktop"} onClick={()=>{setDevice("desktop");revealOnMobile()}} className={`flex min-h-9 items-center gap-1.5 rounded-md px-3 text-[10px] font-semibold transition-colors ${device==="desktop"?"bg-[#1573b8] text-white":"text-[#b4cde1] hover:bg-[#14415f]"}`}>▣ Visão desktop</button>
          <button type="button" aria-pressed={device==="mobile"} onClick={()=>{setDevice("mobile");revealOnMobile()}} className={`flex min-h-9 items-center gap-1.5 rounded-md px-3 text-[10px] font-semibold transition-colors ${device==="mobile"?"bg-[#1573b8] text-white":"text-[#b4cde1] hover:bg-[#14415f]"}`}>▯ Visão mobile</button>
        </div>
        <div className="flex items-center gap-2">
          <button type="button" ref={expandedTriggerRef} onClick={()=>setExpanded(true)} className="rounded-full border border-[#3d89b7] bg-[#103a5b] px-3 py-2 text-[11px] font-semibold text-[#d4efff] transition hover:bg-[#18537e]" aria-label="Ampliar demonstração para leitura">⛶ Ver maior</button>
          
          <span className="text-[9px] text-[#88a6bb]">0{variant+1} / 03</span>
        </div>
       </div>
       <p data-vx-lab-caption className="mt-0 text-[9px] leading-3 text-[#94b0c8]">Conceitos visuais ilustrativos.</p>
      </div>
    </div>
   </div>
  </div>
  {expanded&&<div data-vx-expanded-dialog="true" role="dialog" aria-modal="true" aria-label="Demonstração ampliada do Laboratório" className="fixed inset-x-0 top-0 h-[100dvh] z-[210] flex min-h-0 flex-col bg-[#030b18]/98 p-3 text-white sm:p-5">
    <div className="mx-auto flex w-full max-w-[1500px] flex-wrap items-center justify-between gap-3 border-b border-[#315370] pb-3">
      <div><p className="text-[10px] font-semibold uppercase tracking-[.16em] text-[#87ceff]">LABORATÓRIO VORZAX / VISÃO AMPLIADA</p><h3 className="mt-1 text-lg font-bold">{demoCatalog[active].examples[variant].name} · {demoCatalog[active].examples[variant].tag}</h3></div>
      <button type="button" ref={expandedCloseRef} autoFocus onClick={()=>setExpanded(false)} className="min-h-11 rounded-xl border border-[#518fba] bg-[#0c3658] px-5 text-sm font-semibold text-white hover:bg-[#19557c]">Fechar ✕</button>
    </div>
    <div className="vx-lab-single-frame mx-auto mt-2 min-h-0 w-full max-w-[1500px] flex-1 overflow-hidden rounded-xl bg-[#071525]">
      <FitDemoStage key={"expanded-"+active+"-"+variant+"-"+device} category={active} variant={variant} device={device} step={step} playing={playing} expanded/>
    </div>
    <p className="mx-auto mt-2 w-full max-w-[1500px] text-xs text-[#b5cfe1]">Demonstração ilustrativa. Explore os detalhes e interações.</p>
  </div>}
 </section>;
}

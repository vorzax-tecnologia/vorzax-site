"use client";

import { useEffect, useRef, useState } from "react";
import { DemoVisual, demoCatalog, type DemoCategory, type DemoDevice } from "./DemoVisuals";

type Chapter = DemoCategory;
type Device = DemoDevice;
const categories: { id: Chapter; label: string; number: string }[] = [
 { id:"sites",label:"Sites",number:"01" },
 { id:"automacao",label:"Automações",number:"02" },
 { id:"bi",label:"Dashboards e BI",number:"03" },
 { id:"sistemas",label:"Sistemas sob medida",number:"04" },
];

export function TechnologyInMotion() {
 const [active,setActive]=useState<Chapter>("sites");
 const [variant,setVariant]=useState(0);
 const [device,setDevice]=useState<Device>("desktop");
 const [playing,setPlaying]=useState(true);
 const [step,setStep]=useState(0);
 const [visible,setVisible]=useState(false);
 const sectionRef=useRef<HTMLElement>(null);
 useEffect(()=>{
  const onDemo=(event:Event)=>{const {slug,example}= (event as CustomEvent<{slug?:Chapter;example?:number}>).detail||{};if(slug && slug in demoCatalog){setActive(slug);setVariant(typeof example==="number"&&example>=0&&example<3?example:0);setStep(0);}};
  window.addEventListener("vorzax:demo",onDemo);return()=>window.removeEventListener("vorzax:demo",onDemo);
 },[]);
 useEffect(()=>{const el=sectionRef.current;if(!el)return;const ob=new IntersectionObserver(([entry])=>setVisible(entry.isIntersecting),{threshold:.13});ob.observe(el);return()=>ob.disconnect();},[]);
 useEffect(()=>{if(!visible||!playing||window.matchMedia("(prefers-reduced-motion: reduce)").matches)return;const id=window.setInterval(()=>setStep(v=>(v+1)%4),3200);return()=>window.clearInterval(id)},[visible,playing,active,variant]);
 const select=(key:Chapter)=>{setActive(key);setVariant(0);setStep(0);};
 const example=demoCatalog[active].examples[variant];
 return <section ref={sectionRef} id="tecnologia-em-acao" aria-labelledby="vx-showcase-title" className="relative border-y border-[#1b405f] bg-[#040e1c] py-16 sm:py-24">
  <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_85%_10%,rgba(14,98,170,.12),transparent_58%)]" aria-hidden="true"/>
  <div className="relative mx-auto max-w-[1440px] px-5 sm:px-8 lg:px-10 xl:px-16">
   <p className="text-[10px] font-bold uppercase tracking-[.2em] text-[#79c9fa]">VORZAX / LABORATÓRIO DE SOLUÇÕES</p>
   <div className="mt-4 flex flex-col justify-between gap-5 lg:flex-row lg:items-end"><div><h2 id="vx-showcase-title" className="max-w-3xl text-balance text-[clamp(2rem,3.8vw,3.5rem)] font-semibold leading-[1.1] tracking-[-.055em] text-white">Explore diferentes soluções. <span className="text-[#68c4ff]">Veja como elas funcionam.</span></h2><p className="mt-4 max-w-2xl text-sm leading-7 text-[#9fb5cc]">Doze interfaces com estruturas próprias: explore o tipo de negócio e alterne desktop/mobile para comparar cada experiência.</p></div><span className="w-fit shrink-0 rounded-full border border-[#275579] bg-[#0a2740] px-4 py-2 text-[11px] font-semibold text-[#a3dbfb]">12 CONCEITOS • 4 SERVIÇOS</span></div>
   <div className="mt-9 grid gap-4 lg:grid-cols-[220px_minmax(0,1fr)] xl:grid-cols-[245px_minmax(0,1fr)]">
    <nav aria-label="Categorias das demonstrações" className="flex gap-2 overflow-x-auto pb-2 lg:flex-col lg:overflow-visible">
      {categories.map(c=><button key={c.id} type="button" aria-pressed={active===c.id} onClick={()=>select(c.id)} className={`flex shrink-0 items-center gap-3 rounded-xl border px-4 py-3 text-left text-xs font-semibold transition-colors lg:w-full lg:py-4 ${active===c.id?"border-[#448ebd] bg-[#153856] text-white":"border-[#22415d] bg-[#081b30] text-[#a7c1d7] hover:border-[#3579a7] hover:text-white"}`}><span className="font-mono text-[#6dc9fa]">{c.number}</span>{c.label}</button>)}
      <p className="mt-3 hidden border-t border-[#24445e] pt-5 text-xs leading-6 text-[#8ca7c0] lg:block">Cada exemplo tem layout, conteúdo e interações próprios. Todos são conceitos ilustrativos.</p>
    </nav>
    <div className="min-w-0 overflow-hidden rounded-[22px] border border-[#2c5777] bg-[#081b2e] shadow-[0_27px_75px_rgba(0,0,0,.25)]">
      <div className="border-b border-[#264760] px-4 py-5 sm:px-7">
        <div className="flex flex-wrap items-center justify-between gap-3"><div><p className="text-[10px] font-bold uppercase tracking-[.17em] text-[#7bc7f8]">{demoCatalog[active].examples.length} IDEIAS PARA EXPLORAR</p><h3 className="mt-2 text-xl font-semibold tracking-[-.04em] text-white sm:text-[26px]">{demoCatalog[active].title}</h3><p className="mt-2 text-xs leading-6 text-[#a8bfd2]">{demoCatalog[active].summary}</p></div><span className="rounded-md border border-[#2e6285] bg-[#0b2e48] px-3 py-1.5 text-[10px] text-[#9cd7f8]">DEMONSTRAÇÃO</span></div>
        <div role="group" aria-label="Escolher exemplo de solução" className="mt-5 flex snap-x gap-2 overflow-x-auto pb-1">
         {demoCatalog[active].examples.map((item,i)=><button type="button" key={item.name} aria-pressed={variant===i} onClick={()=>{setVariant(i);setStep(0)}} className={`min-w-[155px] flex-1 snap-start rounded-xl border px-4 py-3 text-left transition-colors ${variant===i?"border-[#55b6f2] bg-[#123b60] text-white":"border-[#2c4a63] bg-[#0b2338] text-[#afc5d8] hover:border-[#4687b5]"}`}><span className="block text-[10px] font-semibold text-[#88d0ff]">0{i+1} / 03</span><span className="mt-2 block text-xs font-semibold">{item.name}</span></button>)}
        </div>
      </div>
      <div className="px-3 py-5 sm:px-7 sm:py-7">
       <div className="mb-5 flex flex-wrap items-center justify-between gap-3"><div><span className="text-[10px] font-semibold uppercase tracking-[.16em] text-[#76c3f4]">{example.tag}</span><p className="mt-1 text-sm font-semibold text-white">{example.subtitle}</p></div><span className="flex items-center gap-2 text-[10px] text-[#9cb7ce]"><span className="h-1.5 w-1.5 rounded-full bg-[#4dc5ff]"/>CONCEITO INTERATIVO</span></div>
       <div key={active+"-"+variant+"-"+device} className="vx-gallery-stage rounded-[18px] bg-[#071525] p-3 sm:p-5">
        <DemoVisual category={active} variant={variant} device={device} step={step} playing={playing}/>
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
       <p className="mt-4 text-[11px] leading-5 text-[#829eb6]">Todos os layouts, nomes, indicadores e fluxos são fictícios e não representam clientes, contratos ou resultados da Vorzax.</p>
      </div>
    </div>
   </div>
  </div>
 </section>;
}

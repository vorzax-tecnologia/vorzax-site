"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

const SESSION_KEY = "vorzax_intro_seen_v2";
const frames = [
  { type: "brand", eyebrow: "VORZAX TECNOLOGIA", title: "Tecnologia com propósito.", desc: "Soluções digitais para empresas.", src: "" },
  { type: "concept", eyebrow: "01 / PRESENÇA DIGITAL", title: "Sites que apresentam sua empresa.", desc: "Design, clareza e conexão.", src: "/vorzax-reference-service-4.webp" },
  { type: "concept", eyebrow: "02 / AUTOMAÇÃO", title: "Processos que avançam.", desc: "Rotinas organizadas e conectadas.", src: "/vorzax-reference-service-2.webp" },
  { type: "concept", eyebrow: "03 / INTELIGÊNCIA", title: "Dados que fazem sentido.", desc: "Indicadores e decisões mais claras.", src: "/vorzax-reference-service-3.webp" },
  { type: "concept", eyebrow: "04 / SISTEMAS", title: "Tecnologia para operar melhor.", desc: "Interfaces pensadas para sua rotina.", src: "/vorzax-reference-service-1.webp" },
];

export function VideoIntro() {
  const [open,setOpen]=useState(false);
  const [frame,setFrame]=useState(0);
  const firstButton=useRef<HTMLButtonElement>(null);
  const previousFocus=useRef<HTMLElement|null>(null);

  useEffect(()=>{
    let seen=false;
    try { seen=sessionStorage.getItem(SESSION_KEY)==="1"; } catch { /* Browser may restrict storage */ }
    const reduced=window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let raf=0;
    if(!seen&&!reduced){
      previousFocus.current=document.activeElement as HTMLElement|null;
      raf=requestAnimationFrame(()=>setOpen(true));
    }
    const replay=()=>{
      previousFocus.current=document.activeElement as HTMLElement|null;
      setFrame(0);
      setOpen(true);
    };
    window.addEventListener("vorzax:replay-intro",replay);
    return()=>{cancelAnimationFrame(raf);window.removeEventListener("vorzax:replay-intro",replay)};
  },[]);

  useEffect(()=>{
    if(!open)return;
    const prev=document.body.style.overflow;
    document.body.style.overflow="hidden";
    firstButton.current?.focus();
    const onKey=(e:KeyboardEvent)=>{
      if(e.key==="Escape"){e.preventDefault();finish();}
      if(e.key==="Tab"){
        const buttons=Array.from(document.querySelectorAll<HTMLButtonElement>(".vx-intro-dialog button:not([disabled])"));
        if(!buttons.length)return;
        if(e.shiftKey&&document.activeElement===buttons[0]){e.preventDefault();buttons[buttons.length-1].focus()}
        else if(!e.shiftKey&&document.activeElement===buttons[buttons.length-1]){e.preventDefault();buttons[0].focus()}
      }
    };
    window.addEventListener("keydown",onKey);
    const interval=window.setInterval(()=>setFrame(v=>Math.min(v+1,frames.length-1)),2450);
    const finishTimer=window.setTimeout(()=>document.querySelector<HTMLButtonElement>(".vx-intro-enter")?.click(),13250);
    return()=>{window.clearInterval(interval);window.clearTimeout(finishTimer);window.removeEventListener("keydown",onKey);document.body.style.overflow=prev};
  },[open]);

  function finish(){
    setOpen(false);
    try {sessionStorage.setItem(SESSION_KEY,"1")}catch{/* storage unavailable */}
    window.setTimeout(()=>previousFocus.current?.focus(),0);
  }
  if(!open)return null;
  const active=frames[frame];
  return <div role="dialog" aria-modal="true" aria-label="Apresentação Vorzax Tecnologia" className="vx-intro-dialog fixed inset-0 z-[200] flex min-h-[100dvh] flex-col overflow-y-auto bg-[#020a17] text-white">
    <div className="relative mx-auto flex w-full max-w-[1450px] items-center justify-between gap-3 px-5 py-5 sm:px-10 sm:py-7">
      <Image src="/vorzax-logo-oficial.png" alt="Vorzax Tecnologia" width={604} height={172} priority className="h-auto w-[145px] sm:w-[195px]"/>
      <button type="button" ref={firstButton} onClick={finish} className="inline-flex min-h-11 items-center gap-2 rounded-full border border-[#356588] bg-[#0a2540] px-4 py-2 text-xs font-semibold text-[#c2e6fa] transition-colors hover:border-[#77c9f8] hover:bg-[#154365] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#8fd5ff]">Pular apresentação <span aria-hidden="true">↗</span></button>
    </div>
    <div className="mx-auto flex w-full max-w-[1370px] flex-1 flex-col justify-center gap-5 px-5 pb-9 sm:px-10 sm:pb-12">
      <div className="flex flex-wrap items-center justify-between gap-2 text-[10px] font-semibold uppercase tracking-[.17em] text-[#88c9f3]"><span>APRESENTAÇÃO VISUAL / VORZAX</span><span>DESIGN · TECNOLOGIA · SOLUÇÕES</span></div>
      <div className="vx-intro-screen relative mx-auto flex aspect-video w-full items-center overflow-hidden rounded-[17px] border border-[#2c597c] bg-[#061629] shadow-[0_28px_75px_rgba(0,0,0,.32)] sm:rounded-[24px]">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_70%_45%,rgba(24,92,165,.2),transparent_62%)]" aria-hidden="true"/>
        <div key={frame} className={`vx-intro-scene relative grid w-full min-w-0 items-center gap-5 px-[7%] py-7 ${frame===0?"place-items-center text-center":"grid-cols-[.88fr_1.12fr]"}`}>
          {frame===0 ? <div className="flex flex-col items-center justify-center">
            <Image src="/vorzax-logo-oficial.png" alt="" width={604} height={172} className="h-auto w-[min(50vw,360px)]"/>
            <div className="mt-7 h-[2px] w-20 rounded-full bg-[#329fec]"/>
            <p className="mt-5 text-[clamp(12px,2vw,22px)] font-semibold tracking-[-.02em] text-[#d4ecfc]">{active.title}</p>
          </div> : <>
            <div className="min-w-0"><p className="text-[clamp(8px,1vw,13px)] font-bold uppercase tracking-[.15em] text-[#77c9f9]">{active.eyebrow}</p><h2 className="mt-4 max-w-sm text-[clamp(17px,3.2vw,43px)] font-semibold leading-[1.1] tracking-[-.055em] text-white">{active.title}</h2><p className="mt-3 text-[clamp(10px,1.3vw,17px)] leading-relaxed text-[#abc3d7]">{active.desc}</p></div>
            <div className="relative aspect-[1.5] min-w-0 overflow-hidden rounded-xl border border-[#3d7298] bg-[#092440] shadow-xl"><Image src={active.src} alt={"Visual conceitual: "+active.eyebrow} fill sizes="(max-width: 640px) 50vw, 50vw" className="object-cover" priority={frame===1}/></div>
          </>}
        </div>
        <span className="pointer-events-none absolute bottom-3 left-4 rounded-md bg-[#061629]/75 px-2.5 py-1 text-[9px] font-semibold uppercase tracking-[.12em] text-[#a4c7de] sm:bottom-5 sm:left-6">Conceitos demonstrativos</span>
      </div>
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center"><div><p className="text-[10px] font-bold uppercase tracking-[.18em] text-[#73bdf1]">VORZAX / TECNOLOGIA PARA EMPRESAS</p><p className="mt-2 text-lg font-semibold tracking-[-.04em] text-white sm:text-2xl">Sua empresa pode ir além do convencional.</p><p className="mt-2 text-xs leading-5 text-[#96b2c9]">Apresentação conceitual. Não representa clientes, projetos contratados ou resultados reais.</p></div><button type="button" onClick={finish} className="vx-intro-enter vx-primary-button inline-flex min-h-12 shrink-0 items-center justify-center gap-3 rounded-xl px-6 py-3 text-sm font-semibold text-white">Entrar no site <span aria-hidden="true">→</span></button></div>
    </div>
  </div>;
}

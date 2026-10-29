"use client";

import { useEffect, useRef, useState } from "react";
import { DemoVisual, type DemoCategory, type DemoDevice } from "./DemoVisuals";

/**
 * Ajusta a interface real à altura disponível sem reduzir a sessão inteira.
 * O conteúdo preserva a proporção; o recorte fica restrito à prévia.
 */
export function FitDemoStage({category,variant,device,step,playing}:{category:DemoCategory;variant:number;device:DemoDevice;step:number;playing:boolean}) {
  const stageRef=useRef<HTMLDivElement>(null);
  const innerRef=useRef<HTMLDivElement>(null);
  const [scale,setScale]=useState(1);

  useEffect(()=>{
    const stage=stageRef.current, inner=innerRef.current;
    if(!stage||!inner)return;
    let raf=0;
    const measure=()=>{
      cancelAnimationFrame(raf);
      raf=requestAnimationFrame(()=>{
        const w=stage.clientWidth;
        const h=stage.clientHeight;
        if(!w||!h)return;
        const contentHeight=inner.scrollHeight;
        if(!contentHeight)return;
        const next=Math.min(1,Math.max(.36,h/contentHeight));
        setScale(prev=>Math.abs(prev-next)>.012?next:prev);
      });
    };
    const observer=new ResizeObserver(measure);
    observer.observe(stage);
    observer.observe(inner);
    measure();
    return ()=>{cancelAnimationFrame(raf);observer.disconnect();};
  },[category,variant,device]);

  return <div ref={stageRef} data-fit-stage={category+"-"+variant+"-"+device} className="relative h-full w-full overflow-hidden rounded-[13px] bg-[#071525]" role="region" aria-label={"Demonstração "+category+" na visão "+device}>
    <div ref={innerRef} className={`absolute left-0 top-0 origin-top-left ${device==="mobile"?"flex justify-center":"block"}`} style={{width:(100/scale)+"%",transform:`scale(${scale})`}}>
      <DemoVisual category={category} variant={variant} device={device} step={step} playing={playing}/>
    </div>
    <div className="pointer-events-none absolute inset-x-0 bottom-0 h-4 bg-gradient-to-t from-[#071525]/70 to-transparent"/>
  </div>;
}

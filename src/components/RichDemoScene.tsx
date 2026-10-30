"use client";

import { useEffect, useRef, useState } from "react";
import { DemoVisual, type DemoCategory } from "./DemoVisuals";

/**
 * Restores the original complete React demo designs: the different websites,
 * funnel/cash-flow dashboards, orders/inventory/Kanban, lead flows and AI.
 * The layout measures its REAL content height and fits BOTH axes. Unlike
 * cropping, no portion is removed. Density rules trim only supplementary
 * charts that would repeat the primary visualization in a cinematic frame.
 */
export function RichDemoScene({category,variant,step,playing}:{category:DemoCategory;variant:number;step:number;playing:boolean}) {
  const viewport=useRef<HTMLDivElement>(null);
  const artwork=useRef<HTMLDivElement>(null);
  const [box,setBox]=useState({w:0,h:0,contentH:540});
  const canvasWidth=1220;
  useEffect(()=>{
    const stage=viewport.current,inner=artwork.current;
    if(!stage||!inner)return;
    let raf=0;
    const measure=()=>{
      cancelAnimationFrame(raf);
      raf=requestAnimationFrame(()=>{
        const w=stage.clientWidth,h=stage.clientHeight;
        const contentH=Math.max(1,inner.scrollHeight);
        setBox(prev=>prev.w===w&&prev.h===h&&Math.abs(prev.contentH-contentH)<1?prev:{w,h,contentH});
      });
    };
    const observer=new ResizeObserver(measure);
    observer.observe(stage);
    observer.observe(inner);
    measure();
    return()=>{cancelAnimationFrame(raf);observer.disconnect();};
  },[category,variant]);
  const scale=box.w&&box.h?Math.min(box.w/canvasWidth,box.h/box.contentH):0;
  return <div ref={viewport} className="relative flex h-full w-full items-center justify-center overflow-hidden bg-[#07192c]" data-rich-stage={category+"-"+variant} data-rich-scale={scale.toFixed(3)} role="region" aria-label="Demonstração completa com layout original, ajustada ao quadro sem cortes">
    <div ref={artwork} className="vx-rich-canvas relative shrink-0 overflow-visible" style={{
       width:canvasWidth,
       transform:`scale(${scale || 0.001})`,
       transformOrigin:"center center",
    }}>
      <DemoVisual category={category} variant={variant} device="desktop" step={step} playing={playing}/>
    </div>
  </div>;
}

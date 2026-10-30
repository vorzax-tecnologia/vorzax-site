"use client";

import { useEffect, useRef, useState } from "react";
import { ShowcaseScene } from "./ShowcaseScene";
import type { DemoCategory, DemoDevice } from "./DemoVisuals";

const PHONE={w:450,h:930} as const;
const DESKTOP_HEIGHT=480;

/**
 * Encaixe bidimensional SEM CORTE e SEM SCROLL:
 * escala min(largura disponível / largura do canvas, altura / altura do canvas).
 * Desktop com canvas adaptável (mín. 900 × 480), mobile em mockup iPhone 16 Pro.
 */
export function FitDemoStage({category,variant,device,step,playing,expanded=false}:{category:DemoCategory;variant:number;device:DemoDevice;step:number;playing:boolean;expanded?:boolean}) {
  const ref=useRef<HTMLDivElement>(null);
  const [area,setArea]=useState({width:0,height:0});
  useEffect(()=>{
    const node=ref.current;
    if(!node)return;
    const update=()=>setArea(prev=>{
      const width=node.clientWidth,height=node.clientHeight;
      return prev.width===width&&prev.height===height?prev:{width,height};
    });
    const observer=new ResizeObserver(update);
    observer.observe(node);
    update();
    return()=>observer.disconnect();
  },[]);
  // Canvas flexível: usa a proporção real do painel para ocupar a largura e a altura sem corte.
  // A largura mínima protege a hierarquia dos gráficos; a máxima limita linhas muito longas.
  const desktopWidth=area.height>0?Math.max(900,Math.min(1480,Math.round(area.width/area.height*DESKTOP_HEIGHT))):900;
  const size=device==="mobile"?PHONE:{w:desktopWidth,h:DESKTOP_HEIGHT};
  const scale=area.width&&area.height?Math.min(area.width/size.w,area.height/size.h):0;
  const frameWidth=size.w*scale,frameHeight=size.h*scale;
  return <div ref={ref} data-fit-stage={category+"-"+variant+"-"+device} data-expanded={expanded?"true":"false"}
      data-scale={scale.toFixed(3)}
      role="region"
      aria-label={category+" — "+(device==="mobile"?"visão iPhone 16 Pro":"visão desktop")+", exemplo visual completo sem rolagem"}
      className="relative h-full w-full overflow-hidden rounded-[13px] bg-[radial-gradient(circle_at_center,#173451_0%,#08192c_70%)]">
    {scale>0&&<div className="absolute left-1/2 top-1/2" style={{width:frameWidth,height:frameHeight,transform:"translate(-50%, -50%)"}}>
      <div style={{width:size.w,height:size.h,transform:`scale(${scale})`,transformOrigin:"top left"}} className="relative">
        {device==="mobile"?<div className="relative h-[930px] w-[450px] rounded-[65px] border-[7px] border-[#718295] bg-[linear-gradient(120deg,#161c28,#54647a_45%,#111924)] p-[8px] shadow-[0_25px_45px_rgba(0,0,0,.55)]" aria-label="Mockup visual inspirado no iPhone 16 Pro">
          <div className="absolute -left-[9px] top-[165px] h-[68px] w-[4px] rounded-l-md bg-[#697d90]" aria-hidden="true"/>
          <div className="absolute -right-[9px] top-[206px] h-[86px] w-[4px] rounded-r-md bg-[#697d90]" aria-hidden="true"/>
          <div className="relative h-full overflow-hidden rounded-[50px] border-[5px] border-[#050a13] bg-[#080e1a]">
            <div className="absolute inset-[0px] overflow-hidden rounded-[44px]">
              <ShowcaseScene category={category} variant={variant} device="mobile" step={step} playing={playing}/>
            </div>
            <div className="pointer-events-none absolute left-1/2 top-[12px] z-10 h-[29px] w-[116px] -translate-x-1/2 rounded-full bg-[#040508] shadow-[0_2px_6px_rgba(0,0,0,.45)]" aria-hidden="true">
              <span className="absolute right-[12px] top-[9px] h-[8px] w-[8px] rounded-full bg-[#17283d]"/>
            </div>
            <div className="pointer-events-none absolute inset-x-0 bottom-[9px] z-10 mx-auto h-[5px] w-[126px] rounded-full bg-[#c8d3e0]/75" aria-hidden="true"/>
          </div>
        </div>:<div className="overflow-hidden bg-[#071627]" style={{width:size.w,height:size.h}}>
          <ShowcaseScene category={category} variant={variant} step={step} playing={playing} canvasWidth={size.w}/>
        </div>}
      </div>
    </div>}
  </div>;
}

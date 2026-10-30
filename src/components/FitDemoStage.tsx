"use client";

import { DemoVisual, type DemoCategory, type DemoDevice } from "./DemoVisuals";

/**
 * Mostra a interface em tamanho de leitura, sem reduzir toda a UI para caber.
 * O Laboratório permanece com altura controlada e o usuário pode rolar
 * DENTRO da demonstração. A visualização ampliada usa o mesmo componente.
 */
export function FitDemoStage({category,variant,device,step,playing,expanded=false}:{category:DemoCategory;variant:number;device:DemoDevice;step:number;playing:boolean;expanded?:boolean}) {
  return (
    <div
      data-fit-stage={category+"-"+variant+"-"+device}
      data-expanded={expanded?"true":"false"}
      tabIndex={0}
      role="region"
      aria-label={"Interface demonstrativa "+category+", visão "+device+". Use a rolagem para explorar os detalhes."}
      className="vx-lab-readable h-full w-full overflow-auto overscroll-contain rounded-[13px] bg-[#071525] outline-none focus-visible:ring-2 focus-visible:ring-sky-400"
    >
      <div className={device==="mobile"?"mx-auto min-w-[300px] max-w-[390px] p-2 sm:p-4":expanded?"mx-auto min-w-[650px] max-w-[1400px] p-2 sm:p-4":"min-w-[600px] p-1.5 sm:p-2"}>
        <DemoVisual category={category} variant={variant} device={device} step={step} playing={playing}/>
      </div>
    </div>
  );
}

"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { DemoVisual, type DemoCategory } from "./DemoVisuals";

const scenes: { category?: DemoCategory; variant?: number; eyebrow: string; headline: string; highlight: string; caption: string }[] = [
  { eyebrow: "VORZAX / TECNOLOGIA PARA EMPRESAS", headline: "Tecnologia que", highlight: "faz avançar.", caption: "Sites · Automações · Dados · Sistemas" },
  { category: "sites", variant: 0, eyebrow: "01 / PRESENÇA DIGITAL", headline: "Sua marca.", highlight: "Bem apresentada.", caption: "Sites e experiências digitais" },
  { category: "automacao", variant: 0, eyebrow: "02 / AUTOMAÇÃO", headline: "Processos", highlight: "que avançam.", caption: "Fluxos conectados e organizados" },
  { category: "bi", variant: 0, eyebrow: "03 / DASHBOARDS & BI", headline: "Dados mais", highlight: "claros.", caption: "Indicadores que apoiam decisões" },
  { category: "sistemas", variant: 2, eyebrow: "04 / SISTEMAS SOB MEDIDA", headline: "Operação", highlight: "em movimento.", caption: "Sistemas adaptados ao seu negócio" },
  { eyebrow: "VORZAX TECNOLOGIA", headline: "Um universo", highlight: "de soluções.", caption: "Presença digital · Processos · Gestão · Tecnologia" },
];

/** A vitrine do filme utiliza a interface REAL do Laboratório, sem miniatura 33%.
 * Ajusta a largura do desktop ao painel e recorta apenas o conteúdo abaixo da dobra.
 * Assim a tela ocupa toda a largura do filme, inclusive em resoluções menores.
 */
function CinemaDemo({category,variant,step,playing}:{category:DemoCategory;variant:number;step:number;playing:boolean}) {
  const stageRef=useRef<HTMLDivElement>(null);
  const [scale,setScale]=useState(1);
  const baseWidth=720;
  useEffect(()=>{
    const stage=stageRef.current;
    if(!stage)return;
    const resize=()=>setScale(Math.max(.25,stage.clientWidth/baseWidth));
    resize();
    const observer=new ResizeObserver(resize);
    observer.observe(stage);
    return ()=>observer.disconnect();
  },[]);
  return <div ref={stageRef} data-reel-preview={category} className="relative h-full w-full min-w-0 overflow-hidden bg-[#081c30]" aria-hidden="true" inert>
    <div className="pointer-events-none absolute left-0 top-0 origin-top-left" style={{width:baseWidth,transform:`scale(${scale})`}}>
      <DemoVisual category={category} variant={variant} device="desktop" step={step} playing={playing}/>
    </div>
    <div className="pointer-events-none absolute inset-x-0 bottom-0 h-5 bg-gradient-to-t from-[#061a2b]/70 to-transparent" />
  </div>;
}

type BrandReelProps = {
  autoPlay?: boolean;
  onEnded?: () => void;
  compact?: boolean;
  showPlayButton?: boolean;
};

export function BrandReel({ autoPlay = false, onEnded, compact = false, showPlayButton = true }: BrandReelProps) {
  const [scene, setScene] = useState(0);
  const [playing, setPlaying] = useState(autoPlay);
  const [interacted, setInteracted] = useState(false);

  useEffect(() => {
    if (!playing) return;
    const last = scene === scenes.length - 1;
    const duration = scene === 0 || last ? 1700 : 2300;
    const timer = window.setTimeout(() => {
      if (last) {
        setPlaying(false);
        onEnded?.();
      } else setScene(current => Math.min(scenes.length - 1, current + 1));
    }, duration);
    return () => window.clearTimeout(timer);
  }, [scene, playing, onEnded]);

  function restart() {
    setScene(0);
    setPlaying(true);
    setInteracted(true);
  }
  function toggle() {
    if (playing) {
      setPlaying(false);
      setInteracted(true);
    } else if (scene === scenes.length - 1) restart();
    else {
      setPlaying(true);
      setInteracted(true);
    }
  }

  const current = scenes[scene];
  const isBrand = !current.category;
  return (
    <div className={`vx-brand-reel relative isolate ${compact ? "aspect-[1.50]" : "aspect-video"} w-full overflow-hidden rounded-[14px] bg-[#041123] text-white sm:rounded-[20px]`} aria-label="Filme de apresentação Vorzax, com interfaces demonstrativas reais do site">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_75%_48%,rgba(13,110,206,.2),transparent_68%)]" aria-hidden="true" />
      <div className="pointer-events-none absolute inset-0 opacity-25 [background-image:linear-gradient(#28669a22_1px,transparent_1px),linear-gradient(90deg,#28669a22_1px,transparent_1px)] [background-size:65px_65px]" aria-hidden="true" />
      <div key={scene} className="vx-reel-scene absolute inset-0 flex items-center px-[6%] py-[4%]" aria-live="off">
        {isBrand ? (
          <div className="mx-auto flex max-w-[90%] flex-col items-center justify-center text-center">
            <Image src="/vorzax-logo-header.webp" width={539} height={165} priority alt="Vorzax Tecnologia" className={`h-auto drop-shadow-[0_15px_28px_rgba(0,0,0,.22)] ${compact ? "w-[min(43vw,415px)]" : "w-[min(50vw,490px)]"}`} />
            <p className="mt-3 text-[clamp(8px,1vw,13px)] font-bold uppercase tracking-[.15em] text-[#83d0ff]">{current.eyebrow}</p>
            <p className="mt-4 text-[clamp(16px,3.4vw,47px)] font-semibold leading-[1.05] tracking-[-.06em]">{current.headline} <span className="text-[#70c8ff]">{current.highlight}</span></p>
            <p className="mt-3 hidden text-[clamp(9px,1vw,14px)] text-[#a5c2da] sm:block">{current.caption}</p>
          </div>
        ) : (
          <div className="grid h-full w-full grid-cols-[.34fr_.66fr] items-center gap-[2%] max-sm:grid-cols-[.28fr_.72fr]">
            <div className="min-w-0">
              <Image src="/vorzax-logo-header.webp" width={539} height={165} alt="" className="mb-[8%] h-auto w-full max-w-[220px]" />
              <p className="text-[clamp(7px,1vw,13px)] font-bold uppercase tracking-[.11em] text-[#78cfff]">{current.eyebrow}</p>
              <p className="mt-2 text-[clamp(15px,3vw,41px)] font-semibold leading-[1.08] tracking-[-.055em] text-[#f5faff]">{current.headline} <span className="text-[#80cfff]">{current.highlight}</span></p>
              <p className="mt-3 hidden text-[clamp(10px,1.1vw,15px)] text-[#abc9df] sm:block">{current.caption}</p>
            </div>
            <div className="relative h-full min-h-0 min-w-0 overflow-hidden rounded-lg border border-[#3c80ac] bg-[#06192e] p-[2px] shadow-[0_15px_45px_rgba(0,0,0,.3)] sm:rounded-2xl sm:p-1">
              <CinemaDemo category={current.category ?? "sites"} variant={current.variant ?? 0} step={playing ? scene % 4 : 0} playing={playing} />
            </div>
          </div>
        )}
      </div>
      <div className="pointer-events-none absolute inset-x-0 bottom-0 flex items-end justify-between gap-2 bg-gradient-to-t from-[#030b18]/80 via-[#030b18]/15 to-transparent px-[5%] pb-[2%] pt-6 text-[clamp(7px,.75vw,10px)] font-semibold tracking-[.08em] text-[#b4d1e6]">
        <span>CONCEITOS VISUAIS • DEMONSTRAÇÃO</span>
        <span>VORZAX TECNOLOGIA</span>
      </div>
      {showPlayButton && (
        <button type="button" onClick={toggle} aria-label={playing ? "Pausar filme" : scene === scenes.length - 1 ? "Rever filme" : "Reproduzir filme"} className="absolute bottom-[8%] right-[4%] flex min-h-9 items-center gap-2 rounded-full border border-[#5c9ac7] bg-[#071d37]/90 px-3 py-2 text-[11px] font-semibold text-white shadow-lg transition-colors hover:bg-[#16476b] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#9fddff]">
          <span aria-hidden="true">{playing ? "Ⅱ" : "▶"}</span>
          <span className="hidden sm:inline">{playing ? "Pausar" : scene === scenes.length - 1 ? "Rever filme" : interacted ? "Continuar" : "Assistir filme"}</span>
        </button>
      )}
    </div>
  );
}

"use client";

import Image from "next/image";
import { useEffect, useState, useSyncExternalStore } from "react";

const subscribeReduced = (callback: () => void) => { const media=window.matchMedia("(prefers-reduced-motion: reduce)"); media.addEventListener("change",callback); return ()=>media.removeEventListener("change",callback); };
const snapshotReduced = () => window.matchMedia("(prefers-reduced-motion: reduce)").matches;
const serverReduced = () => false;
import { type DemoCategory } from "./DemoVisuals";
import { FitDemoStage } from "./FitDemoStage";

const scenes: { category?: DemoCategory; variant?: number; eyebrow: string; headline: string; highlight: string; caption: string }[] = [
  { eyebrow: "VORZAX / TECNOLOGIA PARA EMPRESAS", headline: "Tecnologia que", highlight: "faz avançar.", caption: "Sites · Automações · Dados · Sistemas · IA" },
  { category: "sites", variant: 0, eyebrow: "01 / PRESENÇA DIGITAL", headline: "Sua marca.", highlight: "Bem apresentada.", caption: "Sites e experiências digitais" },
  { category: "automacao", variant: 0, eyebrow: "02 / AUTOMAÇÃO", headline: "Processos", highlight: "que avançam.", caption: "Fluxos conectados e organizados" },
  { category: "bi", variant: 0, eyebrow: "03 / DASHBOARDS & BI", headline: "Dados mais", highlight: "claros.", caption: "Indicadores que apoiam decisões" },
  { category: "sistemas", variant: 2, eyebrow: "04 / SISTEMAS SOB MEDIDA", headline: "Operação", highlight: "em movimento.", caption: "Sistemas adaptados ao seu negócio" },
  { category:"ia",variant:0,eyebrow:"05 / VORZAX IA",headline:"Assistentes",highlight:"virtuais.",caption:"Atendimento, suporte e operações simuladas" },
  { eyebrow: "VORZAX TECNOLOGIA", headline: "Um universo", highlight: "de soluções.", caption: "Presença digital · Processos · Gestão · IA · Tecnologia" },
];

/** O filme e o laboratório usam a mesma interface real com ajuste proporcional. */
function CinemaDemo({category,variant,step,playing}:{category:DemoCategory;variant:number;step:number;playing:boolean}) {
  return <div data-reel-preview={category} className="flex h-full w-full items-center justify-center overflow-hidden bg-[#081c30]" aria-hidden="true" inert>
    <div className="h-full w-full">
      <FitDemoStage category={category} variant={variant} device="desktop" step={step} playing={playing}/>
    </div>
  </div>;
}

type BrandReelProps = {
  autoPlay?: boolean;
  onEnded?: () => void;
  compact?: boolean;
  showPlayButton?: boolean;
  loop?: boolean;
  pauseOnHover?: boolean;
};

export function BrandReel({ autoPlay = false, onEnded, compact = false, showPlayButton = true, loop = false, pauseOnHover = false }: BrandReelProps) {
  const [scene, setScene] = useState(0);
  const [running, setRunning] = useState(autoPlay);
  const [hovered, setHovered] = useState(false);
  const [touching, setTouching] = useState(false);
  const [interacted, setInteracted] = useState(false);
  const [allowMotion, setAllowMotion] = useState(false);
  const reduced = useSyncExternalStore(subscribeReduced, snapshotReduced, serverReduced);
  const playing = running && !hovered && !touching && (!reduced || allowMotion);

  useEffect(() => {
    if (!playing) return;
    const last = scene === scenes.length - 1;
    const duration = scene === 0 || last ? 1700 : 2300;
    const timer = window.setTimeout(() => {
      if (!last) setScene(current => current + 1);
      else if (loop) setScene(0);
      else {
        setRunning(false);
        onEnded?.();
      }
    }, duration);
    return () => window.clearTimeout(timer);
  }, [scene, playing, loop, onEnded]);

  function restart() {
    setScene(0);
    setRunning(true);
    setInteracted(true);
  }
  function toggle() {
    if (reduced && !allowMotion) { setAllowMotion(true); setRunning(true); setInteracted(true); return; }
    if (running) {
      setRunning(false);
      setInteracted(true);
    } else if (scene === scenes.length - 1 && !loop) restart();
    else {
      setRunning(true);
      setInteracted(true);
    }
  }

  const current = scenes[scene];
  const isBrand = !current.category;
  const buttonLabel = reduced && !allowMotion ? "Reproduzir filme" : running ? (hovered||touching ? "Pausado ao interagir" : "Pausar") : scene === scenes.length - 1 && !loop ? "Rever filme" : interacted ? "Continuar" : "Assistir filme";
  return (
    <div onPointerEnter={event=>{if(pauseOnHover && event.pointerType==="mouse")setHovered(true)}} onPointerLeave={()=>{setHovered(false);setTouching(false)}} onPointerDown={event=>{if(pauseOnHover && event.pointerType!=="mouse")setTouching(true)}} onPointerUp={()=>setTouching(false)} onPointerCancel={()=>setTouching(false)} className={`vx-brand-reel relative isolate ${compact ? "aspect-[4/3] sm:aspect-[1.50]" : "aspect-video"} w-full overflow-hidden bg-[#041123] text-white`} aria-label="Filme de apresentação Vorzax, com interfaces demonstrativas reais do site">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_75%_48%,rgba(13,110,206,.2),transparent_68%)]" aria-hidden="true" />
      <div className="pointer-events-none absolute inset-0 opacity-25 [background-image:linear-gradient(#28669a22_1px,transparent_1px),linear-gradient(90deg,#28669a22_1px,transparent_1px)] [background-size:65px_65px]" aria-hidden="true" />
      <div key={scene} className="vx-reel-scene absolute inset-0 flex items-center px-[3%] pb-[5%] pt-[3%]" aria-live="off">
        {isBrand ? (
          <div className="mx-auto flex max-w-[90%] flex-col items-center justify-center text-center">
            <Image src="/vorzax-logo-header.webp" width={539} height={165} priority alt="Vorzax Tecnologia" className={`h-auto drop-shadow-[0_15px_28px_rgba(0,0,0,.22)] ${compact ? "w-[min(43vw,415px)]" : "w-[min(50vw,490px)]"}`} />
            <p className="mt-3 text-[clamp(8px,1vw,13px)] font-bold uppercase tracking-[.15em] text-[#83d0ff]">{current.eyebrow}</p>
            <p className="mt-4 text-[clamp(16px,3.4vw,47px)] font-semibold leading-[1.05] tracking-[-.06em]">{current.headline} <span className="text-[#70c8ff]">{current.highlight}</span></p>
            <p className="mt-3 hidden text-[clamp(11px,1vw,15px)] text-[#a5c2da] sm:block">{current.caption}</p>
          </div>
        ) : (
          <div className="flex h-full w-full min-h-0 flex-col gap-[1.5%]">
            <div className="flex h-[18%] min-h-0 shrink-0 items-center gap-[3%]">
              <Image src="/vorzax-logo-header.webp" width={539} height={165} alt="" className="h-auto w-[24%] max-w-[230px] shrink-0" />
              <div className="min-w-0">
                <p className="text-[clamp(9px,1vw,14px)] font-bold uppercase tracking-[.12em] text-[#82d1ff]">{current.eyebrow}</p>
                <p className="mt-1 text-[clamp(15px,2.1vw,28px)] font-semibold leading-tight tracking-[-.045em] text-[#f5faff]">{current.headline} <span className="text-[#80cfff]">{current.highlight}</span></p>
              </div>
              <span className="ml-auto mr-24 hidden text-[clamp(10px,.85vw,13px)] text-[#b5d2e6] lg:block">{current.caption}</span>
            </div>
            <div className="min-h-0 flex-1 overflow-hidden bg-[#06192e]">
              <CinemaDemo category={current.category ?? "sites"} variant={current.variant ?? 0} step={playing ? scene % 4 : 0} playing={playing} />
            </div>
          </div>
        )}
      </div>
      <div className="pointer-events-none absolute inset-x-0 bottom-0 flex items-end justify-between gap-2 bg-gradient-to-t from-[#030b18]/80 via-[#030b18]/15 to-transparent px-[5%] pb-[2%] pt-6 text-[clamp(7px,.75vw,10px)] font-semibold tracking-[.08em] text-[#b4d1e6]">
        <span>CONCEITOS VISUAIS ILUSTRATIVOS</span>
        <span>VORZAX TECNOLOGIA</span>
      </div>
      {showPlayButton && (
        <button type="button" onClick={toggle} aria-label={buttonLabel} className="absolute right-[3%] top-[3%] z-20 flex min-h-9 items-center gap-2 rounded-full border border-[#5c9ac7] bg-[#071d37]/90 px-3 py-2 text-[11px] font-semibold text-white shadow-lg transition-colors hover:bg-[#16476b] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#9fddff]">
          <span aria-hidden="true">{playing ? "Ⅱ" : "▶"}</span>
          <span className="hidden sm:inline">{buttonLabel}</span>
        </button>
      )}
    </div>
  );
}

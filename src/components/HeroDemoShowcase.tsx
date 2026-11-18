"use client";

import { useState } from "react";
import { FitDemoStage } from "./FitDemoStage";
import { useMobileReel } from "./useMobileReel";
import type { DemoDevice } from "./DemoVisuals";

/**
 * Um único demonstrativo, usando exatamente a mesma interface interativa
 * do Laboratório. Não há filme, cabeçalho cinematográfico nem zoom artificial.
 * O visitante escolhe somente o formato Desktop ou Mobile.
 */
export function HeroDemoShowcase() {
  const smallScreen = useMobileReel();
  const [preferredDevice, setPreferredDevice] = useState<DemoDevice | null>(null);
  const device: DemoDevice = preferredDevice ?? (smallScreen ? "mobile" : "desktop");

  return (
    <div
      data-vx-hero-demo
      className="overflow-hidden rounded-[18px] border border-[#315d80] bg-[#07192b] shadow-[0_24px_70px_rgba(0,0,0,.34)]"
      aria-label="Demonstração interativa da Vorzax"
    >
      <div className="flex min-h-[56px] items-center justify-between gap-2 border-b border-[#2b526f] bg-[#09243b] px-3 py-2 sm:px-4">
        <div className="min-w-0">
          <p className="truncate text-[12px] font-bold leading-tight text-white sm:text-[13px]">
            Site institucional
          </p>
          <p className="mt-0.5 hidden truncate text-[10px] text-[#8cb7d4] sm:block">
            Exemplo interativo de presença digital
          </p>
        </div>
        <div
          role="group"
          aria-label="Selecionar versão da demonstração"
          className="flex shrink-0 items-center gap-1 rounded-lg border border-[#376689] bg-[#061a2d] p-1"
        >
          <button
            type="button"
            aria-label="Versão desktop"
            aria-pressed={device === "desktop"}
            onClick={() => setPreferredDevice("desktop")}
            className={`min-h-9 rounded-md px-3 text-[11px] font-semibold transition-colors sm:text-[12px] ${device === "desktop" ? "bg-[#177ac5] text-white" : "text-[#a8cbe2] hover:bg-[#143b57]"}`}
          >
            Desktop
          </button>
          <button
            type="button"
            aria-label="Versão mobile"
            aria-pressed={device === "mobile"}
            onClick={() => setPreferredDevice("mobile")}
            className={`min-h-9 rounded-md px-3 text-[11px] font-semibold transition-colors sm:text-[12px] ${device === "mobile" ? "bg-[#177ac5] text-white" : "text-[#a8cbe2] hover:bg-[#143b57]"}`}
          >
            Mobile
          </button>
        </div>
      </div>

      <div
        data-vx-hero-stage
        data-device={device}
        className={
          device === "desktop"
            ? "relative aspect-[11/5] w-full overflow-hidden bg-[#071725]"
            : "relative h-[min(76svh,680px)] min-h-[510px] w-full overflow-hidden bg-[#071725]"
        }
      >
        <FitDemoStage
          key={device}
          category="sites"
          variant={0}
          device={device}
          step={0}
          playing={false}
        />
      </div>

      <div className="flex min-h-[36px] flex-wrap items-center justify-between gap-2 border-t border-[#254862] bg-[#081d30] px-3 py-2 sm:px-4">
        <span className="text-[10px] text-[#8faec5]">Demonstração ilustrativa · sem dados reais</span>
        <a
          href="#tecnologia-em-acao"
          className="text-[11px] font-semibold text-[#8bd4ff] underline-offset-4 hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-300"
        >
          Ver os 15 demonstrativos ↗
        </a>
      </div>
    </div>
  );
}

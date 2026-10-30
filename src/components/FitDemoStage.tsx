"use client";

import { useEffect, useRef, useState } from "react";
import { ShowcaseScene } from "./ShowcaseScene";
import { RichDemoScene } from "./RichDemoScene";
import type { DemoCategory, DemoDevice } from "./DemoVisuals";

/**
 * Apenas uma superfície de prévia: sem moldura externa de dispositivo,
 * janela de navegador duplicada ou cartões em volta do conteúdo.
 * No celular a tela usa toda a largura; no desktop é contida sem cortes.
 */
const PHONE = { width: 402, height: 874 };

export function FitDemoStage({ category, variant, device, step, playing, expanded = false }: {
  category: DemoCategory; variant: number; device: DemoDevice;
  step: number; playing: boolean; expanded?: boolean;
}) {
  const viewport = useRef<HTMLDivElement>(null);
  const [space, setSpace] = useState({ width: 0, height: 0 });

  useEffect(() => {
    const element = viewport.current;
    if (!element) return;
    const measure = () => {
      const width = element.clientWidth;
      const height = element.clientHeight;
      setSpace(previous =>
        previous.width === width && previous.height === height ? previous : { width, height }
      );
    };
    const observer = new ResizeObserver(measure);
    observer.observe(element);
    measure();
    return () => observer.disconnect();
  }, []);

  if (device === "desktop") {
    return <div data-fit-stage={category+"-"+variant+"-desktop"} data-expanded={String(expanded)}
      className="h-full w-full overflow-hidden bg-[#07192c]">
      <RichDemoScene category={category} variant={variant} step={step} playing={playing} />
    </div>;
  }

  const scale = space.width > 0 && space.height > 0
    ? Math.min(space.width / PHONE.width, space.height / PHONE.height)
    : 0;

  return <div ref={viewport} data-fit-stage={category+"-"+variant+"-mobile"}
    data-expanded={String(expanded)} data-scale={scale.toFixed(3)}
    role="region" aria-label="Prévia de interface mobile em uma única tela, sem bordas artificiais"
    className="relative h-full w-full overflow-hidden bg-[#071727]">
    {scale > 0 && <div className="absolute inset-0 flex items-center justify-center">
      <div className="shrink-0" style={{ width: PHONE.width, height: PHONE.height,
        transform: `scale(${scale})`, transformOrigin: "center center" }}>
        <ShowcaseScene category={category} variant={variant} device="mobile"
          step={step} playing={playing} />
      </div>
    </div>}
  </div>;
}

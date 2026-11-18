"use client";

import dynamic from "next/dynamic";
import { useEffect, useRef, useState } from "react";
import type { DemoCategory } from "./DemoVisuals";

const InteractiveLab = dynamic(
  () => import("./TechnologyInMotion").then(m => m.TechnologyInMotion),
  { ssr: false }
);

type Selection = { slug: DemoCategory; example?: number };
const categories = new Set<DemoCategory>(["sites", "automacao", "bi", "sistemas", "ia"]);

/** Preserva o laboratório completo, mas evita baixar e executar seu JS na primeira tela. */
export function DeferredTechnologyInMotion() {
  const [enabled, setEnabled] = useState(false);
  const [selection, setSelection] = useState<Selection>();
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (enabled) return;
    const element = containerRef.current;
    if (!element) return;
    if (typeof IntersectionObserver === "undefined") {
      const frame = requestAnimationFrame(() => setEnabled(true));
      return () => cancelAnimationFrame(frame);
    }
    const observer = new IntersectionObserver(([entry]) => {
      if (entry?.isIntersecting) {
        setEnabled(true);
        observer.disconnect();
      }
    }, { rootMargin: "300px 0px", threshold: 0 });
    observer.observe(element);
    return () => observer.disconnect();
  }, [enabled]);

  useEffect(() => {
    const onSelect = (event: Event) => {
      const detail = (event as CustomEvent<Selection>).detail;
      if (!detail || !categories.has(detail.slug)) return;
      // Inclui cliques realizados antes do download do componente pesado.
      setSelection({
        slug: detail.slug,
        example: typeof detail.example === "number" && detail.example >= 0 && detail.example < 3
          ? detail.example : 0
      });
      setEnabled(true);
    };
    window.addEventListener("vorzax:demo", onSelect);
    return () => window.removeEventListener("vorzax:demo", onSelect);
  }, []);

  return (
    <div data-vx-lab-container ref={containerRef}>
      {enabled ? <InteractiveLab initialSelection={selection} /> : <section
      id="tecnologia-em-acao"
      aria-labelledby="vx-showcase-title"
      aria-busy="true"
      className="relative min-h-[420px] scroll-mt-16 border-y border-[#173a57] bg-[#030d1c] px-4 py-8 text-white sm:min-h-[580px]"
    >
      <div className="mx-auto max-w-[1400px]">
        <p className="text-[10px] font-semibold uppercase tracking-[.18em] text-[#7ecafa]">VORZAX / LABORATÓRIO</p>
        <h2 id="vx-showcase-title" className="mt-2 text-xl font-bold tracking-tight">
          Soluções <span className="text-[#6acbff]">em demonstração.</span>
        </h2>
        <p className="mt-3 text-sm text-[#a8c7dd]">Preparando as demonstrações para desktop e mobile…</p>
        <div aria-hidden="true" className="mt-6 h-[230px] rounded-xl border border-[#274966] bg-[linear-gradient(150deg,#0b2942,#06192b)] sm:h-[400px]" />
      </div>
    </section>}
    </div>
  );
}

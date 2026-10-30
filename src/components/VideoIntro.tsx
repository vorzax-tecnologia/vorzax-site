"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { BrandReel } from "./BrandReel";

/**
 * A apresentação usa as mesmas interfaces do Laboratório,
 * renderizadas na resolução nativa do navegador para não perder nitidez.
 */
export function VideoIntro() {
  const [open, setOpen] = useState(false);
  const skipRef = useRef<HTMLButtonElement>(null);
  const previousFocus = useRef<HTMLElement | null>(null);

  // O vídeo é opcional: o visitante entra direto no site. O replay pode ser
  // solicitado pelo rodapé, sem modal automático ou bloqueio da navegação.
  useEffect(() => {
    const replay = () => {
      previousFocus.current = document.activeElement as HTMLElement | null;
      setOpen(true);
    };
    window.addEventListener("vorzax:replay-intro", replay);
    return () => window.removeEventListener("vorzax:replay-intro", replay);
  }, []);

  useEffect(() => {
    if (!open) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    skipRef.current?.focus();
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") { event.preventDefault(); finish(); }
      if (event.key !== "Tab") return;
      const buttons = Array.from(document.querySelectorAll<HTMLButtonElement>(".vx-intro-dialog button:not([disabled])"));
      if (!buttons.length) return;
      if (event.shiftKey && document.activeElement === buttons[0]) {
        event.preventDefault(); buttons[buttons.length - 1].focus();
      } else if (!event.shiftKey && document.activeElement === buttons[buttons.length - 1]) {
        event.preventDefault(); buttons[0].focus();
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => {
      window.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = previousOverflow;
    };
  }, [open]);

  function finish() {
    setOpen(false);
    window.setTimeout(() => previousFocus.current?.focus(), 0);
  }

  if (!open) return null;
  return (
    <div className="vx-intro-dialog fixed inset-0 z-[200] flex min-h-[100dvh] flex-col overflow-y-auto bg-[#020914] text-white" role="dialog" aria-modal="true" aria-label="Apresentação Vorzax Tecnologia">
      <div className="relative mx-auto flex w-full max-w-[1450px] items-center justify-between gap-4 px-5 py-5 sm:px-10 sm:py-6">
        <Image src="/vorzax-logo-header.webp" width={539} height={165} priority alt="Vorzax Tecnologia" className="h-auto w-[145px] sm:w-[195px]" />
        <button ref={skipRef} type="button" onClick={finish} className="inline-flex min-h-11 items-center gap-2 rounded-full border border-[#356588] bg-[#0a2540] px-4 py-2 text-xs font-semibold text-[#d5edff] transition-colors hover:border-[#77c9f8] hover:bg-[#154365] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#8fd5ff]">
          Pular apresentação <span aria-hidden="true">↗</span>
        </button>
      </div>
      <div className="relative mx-auto flex w-full max-w-[1450px] flex-1 flex-col justify-center gap-4 px-5 pb-9 sm:px-10 sm:pb-12">
        <div className="flex flex-wrap items-center justify-between gap-2 text-[10px] font-semibold uppercase tracking-[.17em] text-[#88c9f3]">
          <span>VORZAX / APRESENTAÇÃO CINEMATOGRÁFICA</span>
          <span>CINCO FRENTES • UMA EMPRESA DE TECNOLOGIA</span>
        </div>
        <div className="vx-intro-screen relative mx-auto w-full overflow-hidden rounded-[17px] border border-[#2e648b] bg-[#051222] shadow-[0_30px_85px_rgba(0,0,0,.5)] sm:rounded-[24px]">
          <BrandReel autoPlay showPlayButton={false} pauseOnHover onEnded={finish} />
        </div>
        <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
          <div>
            <p className="text-[10px] font-bold uppercase tracking-[.18em] text-[#73bdf1]">TECNOLOGIA PARA EMPRESAS</p>
            <p className="mt-2 text-lg font-semibold tracking-[-.04em] text-white sm:text-2xl">Presença digital, processos, dados, sistemas e IA em movimento.</p>
            <p className="mt-2 text-xs leading-5 text-[#9bb4c9]">Conceitos visuais ilustrativos.</p>
          </div>
          <button type="button" onClick={finish} className="vx-intro-enter vx-primary-button inline-flex min-h-12 shrink-0 items-center justify-center gap-3 rounded-xl px-6 py-3 text-sm font-semibold text-white">Entrar no site <span aria-hidden="true">→</span></button>
        </div>
      </div>
    </div>
  );
}

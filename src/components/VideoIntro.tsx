"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

const SESSION_KEY = "vorzax_intro_seen_v3";
const FILM_SRC = "/videos/vorzax-filme-integrado-1080p.mp4";
const FILM_POSTER = "/videos/vorzax-filme-integrado-poster.jpg";

/**
 * Um único filme Full HD baseado no próprio laboratório.
 * Sem slideshow duplicado, tremores, barra de progresso ou números fictícios não identificados.
 */
export function VideoIntro() {
  const [open, setOpen] = useState(false);
  const [playback, setPlayback] = useState<"loading" | "playing" | "paused" | "error">("loading");
  const videoRef = useRef<HTMLVideoElement>(null);
  const skipRef = useRef<HTMLButtonElement>(null);
  const previousFocus = useRef<HTMLElement | null>(null);

  useEffect(() => {
    let seen = false;
    try { seen = sessionStorage.getItem(SESSION_KEY) === "1"; } catch { /* Navegador pode restringir armazenamento */ }
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let raf = 0;
    if (!seen && !reducedMotion) {
      previousFocus.current = document.activeElement as HTMLElement | null;
      raf = requestAnimationFrame(() => setOpen(true));
    }
    const replay = () => {
      previousFocus.current = document.activeElement as HTMLElement | null;
      setPlayback("loading");
      setOpen(true);
    };
    window.addEventListener("vorzax:replay-intro", replay);
    return () => { cancelAnimationFrame(raf); window.removeEventListener("vorzax:replay-intro", replay); };
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
    const video = videoRef.current;
    if (video) {
      video.currentTime = 0;
      void video.play().catch(() => setPlayback("paused"));
    }
    return () => {
      window.removeEventListener("keydown", onKeyDown);
      video?.pause();
      document.body.style.overflow = previousOverflow;
    };
  }, [open]);

  function finish() {
    videoRef.current?.pause();
    setOpen(false);
    try { sessionStorage.setItem(SESSION_KEY, "1"); } catch { /* Sessão sem armazenamento */ }
    window.setTimeout(() => previousFocus.current?.focus(), 0);
  }

  if (!open) return null;

  return (
    <div className="vx-intro-dialog fixed inset-0 z-[200] flex min-h-[100dvh] flex-col overflow-y-auto bg-[#020914] text-white" role="dialog" aria-modal="true" aria-label="Apresentação Vorzax Tecnologia">
      <div className="relative mx-auto flex w-full max-w-[1450px] items-center justify-between gap-4 px-5 py-5 sm:px-10 sm:py-6">
        <Image src="/vorzax-logo-oficial.png" width={604} height={172} priority alt="Vorzax Tecnologia" className="h-auto w-[145px] sm:w-[195px]" />
        <button ref={skipRef} type="button" onClick={finish} className="inline-flex min-h-11 items-center gap-2 rounded-full border border-[#356588] bg-[#0a2540] px-4 py-2 text-xs font-semibold text-[#d5edff] transition-colors hover:border-[#77c9f8] hover:bg-[#154365] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#8fd5ff]">
          Pular apresentação <span aria-hidden="true">↗</span>
        </button>
      </div>
      <div className="relative mx-auto flex w-full max-w-[1450px] flex-1 flex-col justify-center gap-4 px-5 pb-9 sm:px-10 sm:pb-12">
        <div className="flex flex-wrap items-center justify-between gap-2 text-[10px] font-semibold uppercase tracking-[.17em] text-[#88c9f3]">
          <span>VORZAX / FILME DE APRESENTAÇÃO</span>
          <span>QUATRO FRENTES • UMA EMPRESA DE TECNOLOGIA</span>
        </div>
        <div className="vx-intro-screen relative mx-auto aspect-video w-full overflow-hidden rounded-[17px] border border-[#2e648b] bg-[#051222] shadow-[0_30px_85px_rgba(0,0,0,.5)] sm:rounded-[24px]">
          <video
            ref={videoRef}
            autoPlay
            muted
            playsInline
            preload="auto"
            poster={FILM_POSTER}
            className="h-full w-full object-contain"
            aria-label="Filme Vorzax Full HD: sites, automações, dashboards e sistemas sob medida"
            onPlay={() => setPlayback("playing")}
            onPause={() => setPlayback(current => current === "playing" ? "paused" : current)}
            onEnded={finish}
            onError={() => setPlayback("error")}
          >
            <source src={FILM_SRC} type="video/mp4" />
            Seu navegador não suporta reprodução de vídeo.
          </video>
          {playback !== "playing" && playback !== "loading" && (
            <div className="absolute inset-0 flex items-center justify-center bg-[#041226]/20">
              {playback === "paused" ? (
                <button type="button" onClick={() => void videoRef.current?.play().catch(() => setPlayback("error"))} className="rounded-full border border-[#86d2ff] bg-[#0a3255]/95 px-6 py-3 text-sm font-semibold text-white focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white">▶ Reproduzir apresentação</button>
              ) : <p className="rounded-lg bg-[#071b32]/90 px-4 py-3 text-xs text-[#d3e5f4]">Vídeo indisponível. Você pode entrar no site.</p>}
            </div>
          )}
        </div>
        <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
          <div><p className="text-[10px] font-bold uppercase tracking-[.18em] text-[#73bdf1]">TECNOLOGIA PARA EMPRESAS</p><p className="mt-2 text-lg font-semibold tracking-[-.04em] text-white sm:text-2xl">Presença digital, processos, dados e sistemas em movimento.</p><p className="mt-2 text-xs leading-5 text-[#9bb4c9]">Interfaces e dados conceituais. Não representam clientes, contratos ou resultados reais.</p></div>
          <button type="button" onClick={finish} className="vx-intro-enter vx-primary-button inline-flex min-h-12 shrink-0 items-center justify-center gap-3 rounded-xl px-6 py-3 text-sm font-semibold text-white">Entrar no site <span aria-hidden="true">→</span></button>
        </div>
      </div>
    </div>
  );
}

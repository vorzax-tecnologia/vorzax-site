"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

const SESSION_KEY = "vorzax_intro_seen_v1";
const VIDEO_PATH = "/videos/vorzax-filme-principal";

/**
 * Brand film shown once per browser session.
 * Replay is available from the footer. All text/data in the film is conceptual.
 */
export function VideoIntro() {
  const [open, setOpen] = useState(false);
  const [hasFailed, setHasFailed] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const videoRef = useRef<HTMLVideoElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const previousFocusRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let alreadySeen = false;
    try { alreadySeen = sessionStorage.getItem(SESSION_KEY) === "1"; } catch { /* storage may be disabled */ }
    let frame = 0;
    if (!alreadySeen && !reducedMotion) {
      previousFocusRef.current = document.activeElement as HTMLElement | null;
      frame = window.requestAnimationFrame(() => setOpen(true));
    }
    const replay = () => {
      previousFocusRef.current = document.activeElement as HTMLElement | null;
      setHasFailed(false);
      setProgress(0);
      setOpen(true);
    };
    window.addEventListener("vorzax:replay-intro", replay);
    return () => {
      window.cancelAnimationFrame(frame);
      window.removeEventListener("vorzax:replay-intro", replay);
    };
  }, []);

  useEffect(() => {
    if (!open) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        closeIntro();
      }
      if (event.key === "Tab") {
        // Only actionable controls are in the film dialog.
        const buttons = Array.from(document.querySelectorAll<HTMLButtonElement>(".vx-intro-dialog button:not([disabled])"));
        if (!buttons.length) return;
        const first = buttons[0];
        const last = buttons[buttons.length - 1];
        if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus(); }
        else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus(); }
      }
    };
    window.addEventListener("keydown", onKeyDown);
    buttonRef.current?.focus();
    const video = videoRef.current;
    if (video && !window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      void video.play().catch(() => setIsPlaying(false));
    }
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKeyDown);
      video?.pause();
    };
  }, [open]);

  function closeIntro() {
    videoRef.current?.pause();
    setOpen(false);
    try { sessionStorage.setItem(SESSION_KEY, "1"); } catch { /* storage may be disabled */ }
    window.setTimeout(() => previousFocusRef.current?.focus(), 0);
  }

  if (!open) return null;

  return (
    <div role="dialog" aria-modal="true" aria-label="Apresentação da Vorzax Tecnologia" className="vx-intro-dialog fixed inset-0 z-[200] flex min-h-[100dvh] flex-col overflow-y-auto bg-[#020814] text-white">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_50%_40%,rgba(12,97,189,.2),transparent_68%)]" aria-hidden="true"/>
      <div className="relative mx-auto flex w-full max-w-[1600px] items-center justify-between gap-4 px-5 py-5 sm:px-10 sm:py-7 xl:px-16">
        <Image src="/vorzax-logo-oficial.png" alt="Vorzax Tecnologia" width={604} height={172} priority className="h-auto w-[154px] sm:w-[202px]"/>
        <button ref={buttonRef} type="button" onClick={closeIntro} className="inline-flex min-h-11 items-center gap-2 rounded-full border border-[#3a6083] bg-[#071d35]/85 px-5 py-2 text-xs font-semibold text-[#d4eaff] transition hover:border-[#75c8fb] hover:bg-[#123657] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#81d6ff]">
          Pular apresentação <span aria-hidden="true">↗</span>
        </button>
      </div>

      <div className="relative mx-auto flex w-full max-w-[1480px] flex-1 flex-col justify-center gap-5 px-5 pb-10 sm:px-10 sm:pb-14 xl:px-16">
        <div className="flex flex-wrap items-center justify-between gap-3 text-[10px] font-semibold uppercase tracking-[.2em] text-[#81cafb]">
          <span>VORZAX / FILME DE APRESENTAÇÃO</span>
          <span>DESIGN • SISTEMAS • AUTOMAÇÃO • DADOS</span>
        </div>
        <div className="vx-intro-screen relative w-full overflow-hidden rounded-[18px] border border-[#286390] bg-[#041121] shadow-[0_32px_110px_rgba(0,0,0,.65),0_0_95px_rgba(0,107,255,.12)] sm:rounded-[26px]">
          <div className="relative aspect-video w-full">
            <video
              ref={videoRef}
              muted
              playsInline
              preload="auto"
              autoPlay
              poster={VIDEO_PATH + "-poster.jpg"}
              aria-label="Filme conceitual de apresentação Vorzax"
              className="h-full w-full object-contain"
              onPlay={() => setIsPlaying(true)}
              onPause={() => setIsPlaying(false)}
              onEnded={closeIntro}
              onError={() => setHasFailed(true)}
              onTimeUpdate={(event) => {
                const v = event.currentTarget;
                if (Number.isFinite(v.duration) && v.duration > 0) setProgress(Math.min(100, (v.currentTime / v.duration) * 100));
              }}
            >
              <source src={VIDEO_PATH + ".webm"} type="video/webm" />
              <source src={VIDEO_PATH + ".mp4"} type="video/mp4" />
              Filme de apresentação Vorzax.
            </video>
            <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 bottom-0 h-[27%] bg-gradient-to-t from-[#020815]/85 to-transparent"/>
            <div className="absolute bottom-4 left-4 flex flex-wrap gap-2 sm:bottom-6 sm:left-6">
              <span className="rounded-lg border border-white/15 bg-[#05162a]/75 px-3 py-2 text-[10px] font-bold uppercase tracking-[.12em] text-white backdrop-blur-md">TECNOLOGIA QUE SE MOVE</span>
              <span className="rounded-lg border border-white/10 bg-[#05162a]/65 px-3 py-2 text-[10px] text-[#bad5e9] backdrop-blur-md">Filme conceitual</span>
            </div>
            {(!isPlaying || hasFailed) && (
              <div className="absolute inset-0 flex items-center justify-center bg-[#061426]/20">
                {!hasFailed && <button type="button" onClick={() => void videoRef.current?.play().catch(() => setHasFailed(true))} className="rounded-full border border-[#70cafa]/70 bg-[#082b4e]/90 px-5 py-3 text-xs font-bold text-white backdrop-blur-md transition hover:bg-[#155382] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white">▶ Reproduzir apresentação</button>}
              </div>
            )}
          </div>
          <div className="h-[3px] w-full bg-[#123048]"><div className="h-full bg-gradient-to-r from-[#126dde] to-[#75d5ff] transition-[width] duration-150" style={{ width: progress + "%" }}/></div>
        </div>
        <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-center">
          <div>
            <p className="text-[10px] font-bold uppercase tracking-[.2em] text-[#67baf3]">Bem-vindo à Vorzax Tecnologia</p>
            <p className="mt-2 max-w-2xl text-xl font-semibold tracking-[-.045em] text-[#f3f9ff] sm:text-3xl">Sua empresa pode ir além do convencional.</p>
            <p className="mt-2 text-xs leading-6 text-[#9cb5cb]">Apresentação visual ilustrativa. Nenhum cliente, projeto contratado ou resultado real é representado.</p>
          </div>
          <button type="button" onClick={closeIntro} className="vx-primary-button inline-flex min-h-12 shrink-0 items-center justify-center gap-3 rounded-xl px-6 py-3 text-sm font-semibold text-white">
            Entrar no site <span aria-hidden="true">→</span>
          </button>
        </div>
      </div>
    </div>
  );
}

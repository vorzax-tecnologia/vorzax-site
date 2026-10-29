"use client";

import { useEffect, useRef, useState } from "react";

/** Native lightweight loop, with a user-accessible pause control. */
export function MotionFilm({ variant = "principal" }: { variant?: "principal" | "fluxos" }) {
  const ref = useRef<HTMLVideoElement>(null);
  const [userEnabled, setUserEnabled] = useState<boolean | null>(null);
  const [reduced, setReduced] = useState(true);
  const enabled = userEnabled ?? !reduced;
  const src = variant === "principal" ? "vorzax-filme-principal" : "vorzax-tecnologia-fluxos";
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const change = () => { setReduced(mq.matches); if(mq.matches && userEnabled !== true) ref.current?.pause(); };
    change();
    mq.addEventListener("change", change);
    return () => mq.removeEventListener("change", change);
  }, []);
  useEffect(() => {
    const player = ref.current;
    if (!player) return;
    const observer = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting || !enabled) player.pause();
      else player.play().catch(() => {});
    }, { threshold: .12 });
    observer.observe(player);
    return () => observer.disconnect();
  }, [enabled]);
  return <div className="motion-film relative overflow-hidden rounded-[25px] border border-sky-400/20 bg-[#061124] shadow-[0_28px_90px_rgba(0,0,0,.4)]">
    <video ref={ref} className="block aspect-video w-full object-cover" muted playsInline loop preload={variant === "principal" ? "metadata" : "none"} poster={`/videos/${src}-poster.jpg`} aria-label="Vídeo conceitual da Vorzax mostrando interfaces de sistemas, automações, BI e sites">
      <source src={`/videos/${src}.webm`} type="video/webm" />
      <source src={`/videos/${src}.mp4`} type="video/mp4" />
      Seu navegador não suporta vídeo. A imagem da demonstração permanece disponível.
    </video>
    <div className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-[#020611]/90 to-transparent" />
    <div className="absolute inset-x-4 bottom-4 flex items-center justify-between gap-2 sm:inset-x-6 sm:bottom-5">
      <span className="text-[9px] font-semibold uppercase tracking-[.17em] text-slate-300 sm:text-[10px]">Filme conceitual • Sem clientes reais</span>
      <button type="button" onClick={() => setUserEnabled(v => !(v ?? !reduced))} aria-pressed={!enabled} aria-label={enabled ? "Pausar animação" : "Reproduzir animação"} className="rounded-full border border-white/20 bg-[#061328]/80 px-3 py-1.5 text-[10px] font-medium text-sky-100 backdrop-blur-sm transition hover:border-cyan-400/50">{!enabled ? "▶ Reproduzir" : "Ⅱ Pausar"}</button>
    </div>
  </div>;
}

"use client";

import { useEffect, useRef, useState } from "react";

/** Quiet, responsive video. Pauses offscreen and respects reduced motion. */
export function MotionFilm({ variant = "principal" }: { variant?: "principal" | "fluxos" }) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [reduced, setReduced] = useState(false);
  const [pausedByUser, setPausedByUser] = useState(false);
  const [inView, setInView] = useState(false);
  const playVideo = !reduced && !pausedByUser && inView;
  const src = variant === "principal" ? "vorzax-filme-principal" : "vorzax-tecnologia-fluxos";

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const onPreferenceChange = () => setReduced(media.matches);
    onPreferenceChange();
    media.addEventListener("change", onPreferenceChange);
    return () => media.removeEventListener("change", onPreferenceChange);
  }, []);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    const observer = new IntersectionObserver(([entry]) => setInView(entry.isIntersecting), { threshold: 0.18 });
    observer.observe(video);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    if (playVideo) { void video.play().catch(() => {}); }
    else video.pause();
  }, [playVideo]);

  return (
    <div className="motion-film relative isolate aspect-video w-full overflow-hidden rounded-[15px] bg-[#071321] sm:rounded-[21px]">
      <video
        ref={videoRef}
        muted
        playsInline
        loop
        preload={variant === "principal" ? "auto" : "metadata"}
        poster={`/videos/${src}-poster.jpg`}
        className="h-full w-full object-cover"
        aria-label="Filme conceitual da Vorzax: sistemas sob medida, automação, BI e sites profissionais"
      >
        <source src={`/videos/${src}.webm`} type="video/webm" />
        <source src={`/videos/${src}.mp4`} type="video/mp4" />
        Seu navegador não suporta vídeo. A demonstração está disponível nas imagens abaixo.
      </video>
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-[#020713]/80 to-transparent" aria-hidden="true" />
      <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between gap-3 sm:bottom-4 sm:left-5 sm:right-5">
        <span className="rounded-md border border-white/10 bg-[#071525]/65 px-2.5 py-1.5 text-[9px] font-semibold uppercase tracking-[.12em] text-[#e4f2ff] backdrop-blur-sm sm:text-[10px]">VORZAX / VISUALIZAÇÃO CONCEITUAL</span>
        <button
          type="button"
          onClick={() => { if (reduced) { setReduced(false); setPausedByUser(false); } else setPausedByUser(value => !value); }}
          aria-label={playVideo ? "Pausar o filme" : "Reproduzir o filme"}
          aria-pressed={!playVideo}
          className="flex min-h-9 shrink-0 items-center gap-2 rounded-full border border-white/20 bg-[#07162c]/80 px-3 py-1.5 text-[11px] font-semibold text-white backdrop-blur-md transition hover:border-[#56c0ff] hover:bg-[#0b2c4d] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-300"
        >
          <span aria-hidden="true">{playVideo ? "Ⅱ" : "▶"}</span>
          <span className="hidden sm:inline">{playVideo ? "Pausar" : "Reproduzir"}</span>
        </button>
      </div>
    </div>
  );
}

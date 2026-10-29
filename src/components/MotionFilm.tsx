"use client";

import { BrandReel } from "./BrandReel";

/**
 * A mesma apresentação visual é utilizada na entrada e no hero.
 * As interfaces são renderizadas pelo navegador e não dependem
 * de esticar vídeos compactados ou reutilizar imagens antigas.
 */
export function MotionFilm({ variant = "principal" }: { variant?: "principal" | "fluxos" }) {
  if (variant === "principal") return <BrandReel compact />;

  return (
    <div className="motion-film relative isolate aspect-video w-full overflow-hidden rounded-[15px] bg-[#071321] sm:rounded-[21px]">
      <video
        muted
        playsInline
        controls
        preload="metadata"
        poster="/videos/vorzax-tecnologia-fluxos-poster.jpg"
        className="h-full w-full object-contain"
        aria-label="Demonstração conceitual de fluxo de automação Vorzax"
      >
        <source src="/videos/vorzax-tecnologia-fluxos.webm" type="video/webm" />
        <source src="/videos/vorzax-tecnologia-fluxos.mp4" type="video/mp4" />
        Seu navegador não suporta vídeos.
      </video>
    </div>
  );
}

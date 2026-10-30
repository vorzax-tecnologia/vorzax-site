"use client";

import { useLayoutEffect, useRef, useState } from "react";
import { RichDemoScene } from "./RichDemoScene";
import type { DemoCategory, DemoDevice } from "./DemoVisuals";

/**
 * Single frame in desktop/video. Mobile presents the SAME chart-rich React
 * demos inside a consistent mobile device frame, not a substitute
 * static illustration. Shell and content scale independently to fit fully.
 */
const PHONE = { width: 468, height: 988 };

export function FitDemoStage({
  category, variant, device, step, playing, expanded = false,
}: {
  category: DemoCategory;
  variant: number;
  device: DemoDevice;
  step: number;
  playing: boolean;
  expanded?: boolean;
}) {
  const stage = useRef<HTMLDivElement>(null);
  const [size, setSize] = useState({ width: 0, height: 0 });

  useLayoutEffect(() => {
    if (device !== "mobile") return;
    const element = stage.current;
    if (!element) return;

    let frame = 0;
    const measure = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const width = element.clientWidth;
        const height = element.clientHeight;
        setSize(previous => previous.width === width && previous.height === height
          ? previous : { width, height });
      });
    };
    const observer = new ResizeObserver(measure);
    observer.observe(element);
    measure();
    return () => {
      cancelAnimationFrame(frame);
      observer.disconnect();
    };
  }, [device]);

  if (device === "desktop") {
    return (
      <div
        data-fit-stage={category + "-" + variant + "-desktop"}
        data-expanded={String(expanded)}
        className="h-full w-full overflow-hidden bg-[#07192c]"
      >
        <RichDemoScene category={category} variant={variant} step={step} playing={playing} expanded={expanded} />
      </div>
    );
  }

  const fitted = size.width > 0 && size.height > 0;
  // The same physical bezel and screen geometry is used for all 15 previews.
  const safeMargin = 12;
  const shellScale = fitted
    ? Math.max(0.01, Math.min(1, (size.width - safeMargin) / PHONE.width, (size.height - safeMargin) / PHONE.height))
    : 1;

  return (
    <div
      ref={stage}
      data-fit-stage={category + "-" + variant + "-mobile"}
      data-expanded={String(expanded)}
      data-shell-scale={shellScale.toFixed(3)}
      className="relative h-full w-full overflow-hidden bg-[radial-gradient(ellipse_at_center,#12324d_0%,#061629_70%)]"
      role="region"
      aria-label="Prévia ilustrativa na visão mobile"
    >
      <div className="absolute inset-0 flex items-center justify-center">
        <div
          className="relative shrink-0"
          style={{
            width: PHONE.width * shellScale,
            height: PHONE.height * shellScale,
          }}
        >
          <div
            className="absolute left-0 top-0"
            style={{
              width: PHONE.width,
              height: PHONE.height,
              transform: `scale(${shellScale})`,
              transformOrigin: "top left",
            }}
          >
        <div className="pointer-events-none absolute inset-0 rounded-[68px] border-[8px] border-[#7c8b9f] bg-[linear-gradient(125deg,#1d293a,#5f6f86_40%,#172334)] shadow-[0_30px_70px_rgba(0,0,0,.62),0_0_0_2px_#101a29]" aria-hidden="true" />
        <div className="pointer-events-none absolute -left-[4px] top-[165px] h-[58px] w-[5px] rounded-l-lg bg-[#8290a3]" aria-hidden="true" />
        <div className="pointer-events-none absolute -right-[4px] top-[210px] h-[92px] w-[5px] rounded-r-lg bg-[#8290a3]" aria-hidden="true" />
        <div className="absolute inset-[14px] overflow-hidden rounded-[54px] border-[3px] border-[#050a12] bg-[#061324]">
          <div className="absolute inset-x-[5px] bottom-[13px] top-[46px] overflow-hidden rounded-b-[34px] bg-[#07192c]">
            <RichDemoScene category={category} variant={variant} step={step} playing={playing} device="mobile" />
          </div>
          <div className="pointer-events-none absolute left-1/2 top-[12px] z-20 h-[32px] w-[136px] -translate-x-1/2 rounded-full bg-[#030509] shadow-[0_2px_7px_rgba(0,0,0,.55)]" aria-hidden="true">
            <span className="absolute right-[13px] top-[11px] h-[10px] w-[10px] rounded-full bg-[#162a43]" />
          </div>
          <div className="pointer-events-none absolute left-[32px] top-[17px] z-10 text-[10px] font-semibold text-white/90" aria-hidden="true">9:41</div>
          <div className="pointer-events-none absolute right-[27px] top-[17px] z-10 text-[11px] text-white/90" aria-hidden="true">● ▰</div>
          <div className="pointer-events-none absolute bottom-[7px] left-1/2 z-20 h-[5px] w-[145px] -translate-x-1/2 rounded-full bg-white/65" aria-hidden="true" />
          </div>
        </div>
      </div>
    </div>
    </div>
  );
}

"use client";

import { useLayoutEffect, useRef, useState } from "react";
import { DemoVisual, type DemoCategory, type DemoDevice } from "./DemoVisuals";

/**
 * A single responsive stage shared by the hero film, desktop lab and iPhone.
 * Scale the REAL rendered demo in both axes; neither clip its bottom nor add
 * an internal scrollbar. All main chart components remain in the mobile DOM.
 */
export function RichDemoScene({
  category, variant, step, playing, device = "desktop",
}: {
  category: DemoCategory;
  variant: number;
  step: number;
  playing: boolean;
  device?: DemoDevice;
}) {
  const viewport = useRef<HTMLDivElement>(null);
  const content = useRef<HTMLDivElement>(null);
  const designWidth = device === "mobile" ? 430 : 1080;
  const [dimensions, setDimensions] = useState({ width: 0, height: 0, contentHeight: 0 });

  useLayoutEffect(() => {
    const frame = viewport.current;
    const art = content.current;
    if (!frame || !art) return;

    let animationFrame = 0;
    const measure = () => {
      cancelAnimationFrame(animationFrame);
      animationFrame = requestAnimationFrame(() => {
        const width = frame.clientWidth;
        const height = frame.clientHeight;
        const contentHeight = Math.max(1, art.scrollHeight, art.offsetHeight);
        setDimensions(previous =>
          previous.width === width &&
          previous.height === height &&
          Math.abs(previous.contentHeight - contentHeight) < 1
            ? previous
            : { width, height, contentHeight }
        );
      });
    };
    const observer = new ResizeObserver(measure);
    observer.observe(frame);
    observer.observe(art);
    measure();
    return () => {
      cancelAnimationFrame(animationFrame);
      observer.disconnect();
    };
  }, [category, variant, device]);

  const measured = dimensions.width > 0 && dimensions.height > 0 && dimensions.contentHeight > 0;
  const margin = device === "mobile" ? 5 : 12;
  const scale = measured
    ? Math.max(0.01, Math.min(
        1,
        (dimensions.width - margin * 2) / designWidth,
        (dimensions.height - margin * 2) / dimensions.contentHeight
      ))
    : 1;

  return (
    <div
      ref={viewport}
      className="relative h-full w-full overflow-hidden bg-[#07192c]"
      data-rich-stage={category + "-" + variant + "-" + device}
      data-rich-scale={scale.toFixed(3)}
      role="region"
      aria-label={"Demonstração " + device + " completa e ajustada proporcionalmente ao quadro"}
    >
      <div
        ref={content}
        className="vx-rich-canvas absolute left-1/2 top-1/2 overflow-visible"
        style={{
          width: designWidth,
          transform: `translate(-50%, -50%) scale(${scale})`,
          transformOrigin: "center center",
        }}
      >
        <DemoVisual
          category={category}
          variant={variant}
          device={device}
          step={step}
          playing={playing}
        />
      </div>
    </div>
  );
}

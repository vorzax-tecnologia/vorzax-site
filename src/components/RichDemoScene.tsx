"use client";

import { useLayoutEffect, useRef, useState } from "react";
import { DemoVisual, type DemoCategory, type DemoDevice } from "./DemoVisuals";

/**
 * Proportional, two-axis fitting with a real-size layout sizer.
 * The React demo always exists in the DOM and retains its original charts.
 * The sizer takes the exact SCALED dimensions, so flex centering never uses
 * the unscaled box and the bottom of the demo is never clipped.
 */
export function RichDemoScene({
  category,
  variant,
  step,
  playing,
  device = "desktop",
}: {
  category: DemoCategory;
  variant: number;
  step: number;
  playing: boolean;
  device?: DemoDevice;
}) {
  const viewport = useRef<HTMLDivElement>(null);
  const artwork = useRef<HTMLDivElement>(null);
  const designWidth = device === "mobile" ? 402 : 1080;
  const [metrics, setMetrics] = useState({
    viewportWidth: 0,
    viewportHeight: 0,
    contentWidth: designWidth,
    contentHeight: 1,
  });

  useLayoutEffect(() => {
    const stage = viewport.current;
    const content = artwork.current;
    if (!stage || !content) return;

    let raf = 0;
    const measure = () => {
      const viewportWidth = stage.clientWidth;
      const viewportHeight = stage.clientHeight;
      const contentWidth = Math.max(designWidth, content.scrollWidth);
      const contentHeight = Math.max(1, content.scrollHeight, content.offsetHeight);

      setMetrics(previous =>
        previous.viewportWidth === viewportWidth &&
        previous.viewportHeight === viewportHeight &&
        previous.contentWidth === contentWidth &&
        previous.contentHeight === contentHeight
          ? previous
          : { viewportWidth, viewportHeight, contentWidth, contentHeight }
      );
    };

    // Measure synchronously on mount, then after size/font/image changes.
    measure();
    const observer = new ResizeObserver(() => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(measure);
    });
    observer.observe(stage);
    observer.observe(content);
    if (document.fonts?.ready) {
      void document.fonts.ready.then(() => {
        if (stage.isConnected) measure();
      });
    }
    return () => {
      cancelAnimationFrame(raf);
      observer.disconnect();
    };
  }, [category, variant, device, designWidth]);

  const gap = device === "mobile" ? 2 : 8;
  const hasSpace = metrics.viewportWidth > gap * 2 && metrics.viewportHeight > gap * 2;
  const fitted = hasSpace && metrics.contentHeight > 1;
  const scale = fitted
    ? Math.min(
        1,
        (metrics.viewportWidth - gap * 2) / metrics.contentWidth,
        (metrics.viewportHeight - gap * 2) / metrics.contentHeight
      )
    : 1;

  return (
    <div
      ref={viewport}
      className="relative h-full w-full overflow-hidden bg-[#07192c]"
      data-rich-stage={category + "-" + variant + "-" + device}
      data-rich-scale={scale.toFixed(3)}
      role="region"
      aria-label={"Demonstração " + device + " completa, ajustada ao quadro"}
    >
      <div className="absolute inset-0 flex items-center justify-center overflow-hidden">
        <div
          className="relative shrink-0"
          style={{
            width: fitted ? metrics.contentWidth * scale : designWidth,
            height: fitted ? metrics.contentHeight * scale : "auto",
          }}
        >
          <div
            ref={artwork}
            data-vx-device={device}
            className="vx-rich-canvas absolute left-0 top-0 overflow-visible"
            style={{
              width: designWidth,
              transform: `scale(${scale})`,
              transformOrigin: "top left",
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
      </div>
    </div>
  );
}

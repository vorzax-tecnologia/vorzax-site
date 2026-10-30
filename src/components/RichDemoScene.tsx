"use client";

import { useLayoutEffect, useRef, useState } from "react";
import { DemoVisual, type DemoCategory, type DemoDevice } from "./DemoVisuals";

/**
 * Desktop / film: fit the entire demonstration into the fixed cinematic frame.
 * iPhone: every demonstration fills the SAME physical screen from just below
 * the Dynamic Island to the home indicator. Fit to WIDTH only; long content
 * scrolls within the phone at a readable, consistent size instead of shrinking
 * into a tiny centered page. No scrolling or geometry changes to the desktop.
 */
const mobileBackground: Record<DemoCategory, string[]> = {
  sites: ["#061627", "#f8f7f2", "#e9e3d8"],
  automacao: ["#071b2b", "#091d2c", "#071b2b"],
  bi: ["#ecf2f9", "#071d25", "#fcfaf6"],
  sistemas: ["#091a2d", "#081c30", "#0a2035"],
  ia: ["#071827", "#071827", "#071827"],
};

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
  const mobile = device === "mobile";
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
      const contentWidth = Math.max(designWidth, content.scrollWidth, content.offsetWidth);
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

  // All mobile screens use the same width-based ratio, never a per-demo
  // height-based ratio. Desktop maintains the previous two-axis fit.
  const gap = mobile ? 0 : 8;
  const measured = metrics.viewportWidth > gap * 2 &&
    metrics.viewportHeight > gap * 2 && metrics.contentHeight > 1;
  const scale = measured
    ? mobile
      ? metrics.viewportWidth / metrics.contentWidth
      : Math.min(
          1,
          (metrics.viewportWidth - gap * 2) / metrics.contentWidth,
          (metrics.viewportHeight - gap * 2) / metrics.contentHeight
        )
    : 1;

  const visibleWidth = measured ? metrics.contentWidth * scale : designWidth;
  const visibleHeight = measured ? metrics.contentHeight * scale : 1;
  const background = mobileBackground[category][variant] ?? "#07192c";

  return (
    <div
      ref={viewport}
      className={
        mobile
          ? "relative h-full w-full overflow-x-hidden overflow-y-auto overscroll-contain"
          : "relative h-full w-full overflow-hidden bg-[#07192c]"
      }
      style={mobile ? { backgroundColor: background, scrollbarWidth: "none" } : undefined}
      data-rich-stage={category + "-" + variant + "-" + device}
      data-rich-scale={scale.toFixed(3)}
      data-mobile-screen={mobile ? "uniform-full-bleed" : undefined}
      role="region"
      aria-label={
        mobile
          ? "Demonstração mobile em tela inteira, com rolagem interna quando necessária"
          : "Demonstração desktop completa, ajustada ao quadro"
      }
      tabIndex={mobile ? 0 : undefined}
    >
      <div
        className={
          mobile
            ? "relative w-full"
            : "absolute inset-0 flex items-center justify-center overflow-hidden"
        }
        style={mobile ? {
          height: Math.max(metrics.viewportHeight, visibleHeight),
          minHeight: "100%",
          backgroundColor: background,
        } : undefined}
      >
        <div
          className="relative shrink-0"
          style={{
            width: visibleWidth,
            height: measured ? visibleHeight : 1,
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

"use client";

import { useLayoutEffect, useRef, useState, type CSSProperties } from "react";
import { DemoVisual, type DemoCategory, type DemoDevice } from "./DemoVisuals";

/** A fixed design canvas keeps every preview identical across host viewports.
 * Only a uniform transform is applied: no stretching, cropping or inner scroll.
 * ResizeObserver also refits the canvas after demo interactions change its height.
 */
const mobileBackground: Record<DemoCategory, string[]> = {
  sites: ["#061627", "#f5f3ec", "#e9e3d8"],
  automacao: ["#071b2b", "#f3f8f9", "#171b27"],
  bi: ["#f1f6fc", "#081b32", "#f1f6fc"],
  sistemas: ["#f2f6fc", "#f2f6fc", "#f2f6fc"],
  ia: ["#071827", "#f1f7f8", "#101627"],
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
  const mobile = device === "mobile";
  const designWidth = mobile ? 402 : 1280;
  const designHeight = mobile ? 850 : 620;
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

  const measured = metrics.viewportWidth > 0 && metrics.viewportHeight > 0 && metrics.contentHeight > 1;
  const scale = measured
    ? Math.min(metrics.viewportWidth / metrics.contentWidth, metrics.viewportHeight / metrics.contentHeight)
    : 1;
  const visibleWidth = metrics.contentWidth * scale;
  const visibleHeight = metrics.contentHeight * scale;
  const background = !mobile && category === "bi" && variant === 0
    ? "#081b32"
    : mobileBackground[category][variant] ?? "#07192c";

  return (
    <div
      ref={viewport}
      className="relative h-full w-full overflow-hidden"
      style={{ backgroundColor: background, "--vx-demo-min-height": `${designHeight}px` } as CSSProperties}
      data-rich-stage={category + "-" + variant + "-" + device}
      data-rich-scale={scale.toFixed(3)}
      data-mobile-screen={mobile ? "uniform-contained" : undefined}
      data-desktop-screen={!mobile ? "uniform-proportional-stage" : undefined}
      data-rich-scale-x={scale.toFixed(3)}
      data-rich-scale-y={scale.toFixed(3)}
      role="region"
      aria-label={
        mobile
          ? "Demonstração mobile completa, ajustada ao quadro"
          : "Demonstração desktop completa, ajustada ao quadro"
      }
    >
      <div
        className="absolute inset-0 flex items-center justify-center overflow-hidden"
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

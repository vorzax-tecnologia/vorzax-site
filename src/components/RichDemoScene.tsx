"use client";

import { useLayoutEffect, useRef, useState, type CSSProperties } from "react";
import { DemoVisual, type DemoCategory, type DemoDevice } from "./DemoVisuals";

/**
 * Desktop / film: fit the entire demonstration into the fixed cinematic frame.
 * iPhone: every demonstration fills the SAME physical screen from just below
 * the Dynamic Island to the home indicator. Fit to WIDTH only; long content
 * scrolls within the phone at a readable, consistent size instead of shrinking
 * into a tiny centered page. No scrolling or geometry changes to the desktop.
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
  nativeWorkspace = false,
}: {
  category: DemoCategory;
  variant: number;
  step: number;
  playing: boolean;
  device?: DemoDevice;
  nativeWorkspace?: boolean;
}) {
  const viewport = useRef<HTMLDivElement>(null);
  const artwork = useRef<HTMLDivElement>(null);
  const mobile = device === "mobile";
  // A versão cinematográfica continua com ajuste proporcional, mas sem
  // escalas X/Y independentes: isso deformava fontes e gráficos.
  // O laboratório de BI e Sistemas usa tamanho natural responsivo (abaixo).
  const desktopWorkspace = !mobile && (category === "bi" || category === "sistemas");
  const designWidth = mobile ? 402 : 1080;
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

  // Nunca distorcer o desenho para preencher o quadro. No laboratório, BI
  // e Sistemas não são escalados; seus painéis se adaptam ao contêiner.
  const gap = 0;
  const measured = metrics.viewportWidth > gap * 2 &&
    metrics.viewportHeight > gap * 2 && metrics.contentHeight > 1;
  const scale = measured
    ? mobile
      ? metrics.viewportWidth / metrics.contentWidth
      : Math.min(
          1.08,
          (metrics.viewportWidth - gap * 2) / metrics.contentWidth,
          (metrics.viewportHeight - gap * 2) / metrics.contentHeight
        )
    : 1;

  const visibleWidth = measured ? metrics.contentWidth * scale : designWidth;
  const visibleHeight = measured ? metrics.contentHeight * scale : 1;
  const background = mobileBackground[category][variant] ?? "#07192c";
  // In design pixels: fill the entire iPhone screen even when an example is short.
  const mobileContentHeight = Math.ceil(metrics.viewportHeight / Math.max(0.01, scale));

  // BI e Sistemas no laboratório: renderização nativa e fontes nítidas em
  // qualquer monitor. A área tem rolagem própria quando não cabe no palco.
  // O filme e as outras demos mantêm o enquadramento cinematográfico original.
  if (nativeWorkspace && desktopWorkspace) {
    return (
      <div
        ref={viewport}
        className="vx-lab-workspace h-full w-full overflow-x-hidden overflow-y-auto overscroll-contain"
        style={{ backgroundColor: background, containerType: "inline-size", containerName: "vx-lab-workspace" }}
        data-rich-stage={category + "-" + variant + "-desktop"}
        data-desktop-screen="native-responsive"
        role="region"
        aria-label="Demonstração desktop responsiva; role dentro do quadro para explorar o painel"
        tabIndex={0}
      >
        <div ref={artwork} data-vx-device="desktop" className="vx-rich-canvas vx-lab-workspace-canvas min-h-full w-full">
          <DemoVisual category={category} variant={variant} device="desktop" step={step} playing={playing}/>
        </div>
      </div>
    );
  }

  return (
    <div
      ref={viewport}
      className={
        mobile
          ? "relative h-full w-full overflow-x-hidden overflow-y-auto overscroll-contain"
          : "relative h-full w-full overflow-hidden"
      }
      style={mobile ? {
        backgroundColor: background,
        scrollbarWidth: "none",
        "--vx-mobile-content-min-height": `${mobileContentHeight}px`,
      } as CSSProperties : { backgroundColor: background }}
      data-rich-stage={category + "-" + variant + "-" + device}
      data-rich-scale={scale.toFixed(3)}
      data-mobile-screen={mobile ? "uniform-full-bleed" : undefined}
      data-desktop-screen={!mobile ? "uniform-single-stage" : undefined}
      data-rich-scale-x={scale.toFixed(3)}
      data-rich-scale-y={scale.toFixed(3)}
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

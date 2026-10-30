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
  expanded = false,
}: {
  category: DemoCategory;
  variant: number;
  step: number;
  playing: boolean;
  device?: DemoDevice;
  expanded?: boolean;
}) {
  const viewport = useRef<HTMLDivElement>(null);
  const artwork = useRef<HTMLDivElement>(null);
  const mobile = device === "mobile";
  // BI e Sistemas usam uma base desktop mais larga, com proporção de
  // aplicação corporativa, para aproveitar o palco sem miniaturas centrais.
  // Sites, automações, IA e toda a visão mobile mantêm a base anterior.
  const desktopWorkspace = !mobile && (category === "bi" || category === "sistemas");
  const designWidth = mobile ? 402 : desktopWorkspace ? 1500 : 1080;
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

  // Mobile permanece com ajuste por largura e rolagem interna. As telas de
  // BI e Sistemas no desktop ocupam a área total em ambos os eixos; como o
  // conteúdo é medido, nenhuma linha é cortada nem há faixas laterais.
  // Uma base desktop ampla reduz a diferença entre os dois fatores de escala.
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

  const fillDesktop = measured && desktopWorkspace &&
    metrics.viewportWidth / metrics.viewportHeight >= 1.55;
  const scaleX = fillDesktop
    ? metrics.viewportWidth / metrics.contentWidth
    : scale;
  const scaleY = fillDesktop
    ? metrics.viewportHeight / metrics.contentHeight
    : scale;
  const visibleWidth = measured ? metrics.contentWidth * scaleX : designWidth;
  const visibleHeight = measured ? metrics.contentHeight * scaleY : 1;
  const background = mobileBackground[category][variant] ?? "#07192c";
  // In design pixels: fill the entire iPhone screen even when an example is short.
  const mobileContentHeight = Math.ceil(metrics.viewportHeight / Math.max(0.01, scale));

  // Apenas para "Ver maior" em desktop: interface completa em pixels
  // naturais, sem zoom/scale. É possível rolar e interagir sem cortes.
  if (expanded && !mobile) {
    return <div ref={viewport} data-desktop-screen="expanded-native" className="h-full w-full overflow-auto overscroll-contain" role="region" aria-label="Sistema demonstrativo ampliado e interativo" tabIndex={0} style={{backgroundColor:background}}>
      <div ref={artwork} data-vx-device="desktop" className="vx-rich-canvas min-h-full w-full">
        <DemoVisual category={category} variant={variant} device="desktop" step={step} playing={playing}/>
      </div>
    </div>;
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
      data-desktop-screen={!mobile ? (fillDesktop ? "full-bleed-workspace" : "uniform-single-stage") : undefined}
      data-rich-scale-x={scaleX.toFixed(3)}
      data-rich-scale-y={scaleY.toFixed(3)}
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
              transform: `scale(${scaleX}, ${scaleY})`,
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

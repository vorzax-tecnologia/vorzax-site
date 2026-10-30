"use client";

import { DemoVisual, type DemoCategory } from "./DemoVisuals";

/**
 * Render the genuine interactive examples at the available responsive width.
 * Do not hide the scene behind a transform calculated from ResizeObserver:
 * when a parent height is temporarily zero, that path left the film and
 * laboratory with an apparently empty navy rectangle.
 *
 * The laboratory is readable and can scroll INSIDE the single outer frame.
 * The film uses this same content; its non-interactive viewport clips any
 * excess vertically instead of rendering a blank canvas.
 */
export function RichDemoScene({
  category, variant, step, playing,
}: {
  category: DemoCategory;
  variant: number;
  step: number;
  playing: boolean;
}) {
  return (
    <div
      className="relative h-full w-full overflow-hidden bg-[#07192c]"
      data-rich-stage={category + "-" + variant}
      role="region"
      aria-label="Demonstração interativa de solução Vorzax"
    >
      <div className="vx-rich-canvas h-full w-full overflow-x-hidden overflow-y-auto overscroll-contain">
        <DemoVisual
          category={category}
          variant={variant}
          device="desktop"
          step={step}
          playing={playing}
        />
      </div>
    </div>
  );
}

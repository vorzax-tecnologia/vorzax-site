"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { demoCatalog, type DemoCategory, type DemoDevice } from "./DemoVisuals";
import { FitDemoStage } from "./FitDemoStage";
import { useMobileReel } from "./useMobileReel";

const categories: { id: DemoCategory; name: string; short: string }[] = [
  { id: "sites", name: "Sites", short: "Sites" },
  { id: "automacao", name: "Automações", short: "Automações" },
  { id: "bi", name: "Dashboards e BI", short: "BI / Dados" },
  { id: "sistemas", name: "Sistemas sob medida", short: "Sistemas" },
  { id: "ia", name: "Conceitos de IA", short: "IA" },
];

function selection(isSelected: boolean) {
  return isSelected
    ? "border-[#69c7ff] bg-[#123c5c] text-white shadow-[inset_0_0_0_1px_rgba(105,199,255,.12)]"
    : "border-[#29445e] bg-[#091c2f] text-[#a9c4dc] hover:border-[#488bad] hover:bg-[#102b45]";
}

export function TechnologyInMotion() {
  const [category, setCategory] = useState<DemoCategory>("sites");
  const [variant, setVariant] = useState(0);
  const mobileViewport = useMobileReel();
  const [deviceOverride, setDeviceOverride] = useState<DemoDevice | null>(null);
  const device: DemoDevice = deviceOverride ?? (mobileViewport ? "mobile" : "desktop");
  const [playing, setPlaying] = useState(true);
  const [step, setStep] = useState(0);
  const [expanded, setExpanded] = useState(false);
  const [visible, setVisible] = useState(false);
  const [stageHeight, setStageHeight] = useState<number | null>(null);

  const sectionRef = useRef<HTMLElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const expandRef = useRef<HTMLButtonElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);

  // Medimos somente a largura do palco e a janela. Nunca o conteúdo das demos:
  // isso evita que uma categoria altere a altura de todas as demais.
  useLayoutEffect(() => {
    const stage = stageRef.current;
    if (!stage) return;
    let frame = 0;
    const measure = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const viewportHeight = window.visualViewport?.height ?? window.innerHeight;
        const chrome = Math.max(0, (sectionRef.current?.offsetHeight ?? 0) - stage.offsetHeight);
        const width = stage.clientWidth;
        const ideal = width * (device === "mobile" ? 988 / 468 : 680 / 1280);
        const limit = window.innerWidth < 640
          ? Math.max(360, viewportHeight - 135)
          : window.innerWidth >= 1024
            ? Math.max(300, viewportHeight - chrome - 36)
            : Math.max(350, viewportHeight - 225);
        const result = Math.max(280, Math.min(ideal, limit));
        setStageHeight(previous => previous !== null && Math.abs(previous - result) < 1 ? previous : result);
      });
    };
    const observer = new ResizeObserver(measure);
    observer.observe(stage);
    if (sectionRef.current) observer.observe(sectionRef.current);
    measure();
    window.addEventListener("resize", measure);
    window.visualViewport?.addEventListener("resize", measure);
    return () => {
      cancelAnimationFrame(frame);
      observer.disconnect();
      window.removeEventListener("resize", measure);
      window.visualViewport?.removeEventListener("resize", measure);
    };
  }, [device]);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;
    const observer = new IntersectionObserver(([entry]) => setVisible(entry.isIntersecting), { threshold: 0.1 });
    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!visible || !playing || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const interval = window.setInterval(() => setStep(previous => (previous + 1) % 4), 3200);
    return () => window.clearInterval(interval);
  }, [visible, playing, category, variant]);

  useEffect(() => {
    const handle = (event: Event) => {
      const detail = (event as CustomEvent<{ slug?: DemoCategory; example?: number }>).detail;
      if (!detail?.slug || !(detail.slug in demoCatalog)) return;
      setCategory(detail.slug);
      setVariant(typeof detail.example === "number" && detail.example >= 0 && detail.example < 3 ? detail.example : 0);
      setStep(0);
      sectionRef.current?.scrollIntoView({ block: "start", behavior: "instant" });
    };
    window.addEventListener("vorzax:demo", handle);
    return () => window.removeEventListener("vorzax:demo", handle);
  }, []);

  const positionPhone = () => {
    if (window.innerWidth >= 640) return;
    requestAnimationFrame(() => stageRef.current?.scrollIntoView({ block: "end", behavior: "instant" }));
  };

  const selectCategory = (next: DemoCategory) => {
    setCategory(next);
    setVariant(0);
    setStep(0);
    positionPhone();
  };
  const selectVariant = (next: number) => {
    setVariant(next);
    setStep(0);
    positionPhone();
  };
  const selectDevice = (next: DemoDevice) => {
    setDeviceOverride(next);
    positionPhone();
  };

  useEffect(() => {
    if (!expanded) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const trigger = expandRef.current;
    closeRef.current?.focus();
    const keydown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        setExpanded(false);
      }
      if (event.key !== "Tab") return;
      const dialog = document.querySelector<HTMLElement>('[data-vx-expanded-dialog="true"]');
      const buttons = dialog?.querySelectorAll<HTMLButtonElement>("button:not([disabled])");
      if (!buttons?.length) return;
      if (event.shiftKey && document.activeElement === buttons[0]) {
        event.preventDefault();
        buttons[buttons.length - 1].focus();
      } else if (!event.shiftKey && document.activeElement === buttons[buttons.length - 1]) {
        event.preventDefault();
        buttons[0].focus();
      }
    };
    window.addEventListener("keydown", keydown);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", keydown);
      trigger?.focus();
    };
  }, [expanded]);

  const selected = demoCatalog[category].examples[variant];

  return (
    <section
      ref={sectionRef}
      id="tecnologia-em-acao"
      aria-labelledby="vx-showcase-title"
      className="relative scroll-mt-16 border-y border-[#173a57] bg-[#030d1c] py-2 text-white sm:py-3 lg:scroll-mt-0"
    >
      <div className="mx-auto w-full max-w-[1700px] px-3 sm:px-5 lg:px-6">
        <div className="flex items-center justify-between gap-3">
          <div className="min-w-0">
            <p className="hidden text-[9px] font-bold uppercase tracking-[.19em] text-[#82cfff]">
              VORZAX / LABORATÓRIO INTERATIVO
            </p>
            <h2 id="vx-showcase-title" className="text-[20px] font-bold leading-tight tracking-[-.035em] sm:text-[21px]">
              Soluções <span className="text-[#6acbff]">em demonstração.</span>
            </h2>
          </div>
          <span className="hidden rounded-full border border-[#294f6d] bg-[#09233a] px-3 py-1.5 text-[11px] font-semibold text-[#a5d8f7]">
            15 EXEMPLOS INTERATIVOS
          </span>
        </div>

        <div className="sticky top-[68px] z-30 mt-2 grid grid-cols-2 gap-2 border-y border-[#102b45] bg-[#030d1c]/95 py-2 backdrop-blur-xl sm:top-[72px] lg:static lg:grid-cols-1 lg:items-center lg:gap-1 lg:border-0 lg:bg-transparent lg:py-0">
          <label className="min-w-0 rounded-lg border border-[#325878] bg-[#0b2942] px-2 py-1 lg:hidden">
            <span className="block text-[9px] font-semibold uppercase tracking-wide text-[#79c6f4]">Categoria</span>
            <select
              aria-label="Selecionar categoria das demonstrações"
              value={category}
              onChange={event => selectCategory(event.target.value as DemoCategory)}
              className="h-6 w-full min-w-0 bg-transparent text-[12px] font-semibold text-white outline-none"
            >
              {categories.map(item => (
                <option key={item.id} value={item.id} className="bg-[#0b2942]">{item.short}</option>
              ))}
            </select>
          </label>
          <label className="min-w-0 rounded-lg border border-[#325878] bg-[#0b2942] px-2 py-1 lg:hidden">
            <span className="block text-[9px] font-semibold uppercase tracking-wide text-[#79c6f4]">Demonstração</span>
            <select
              aria-label="Escolher demonstração"
              value={variant}
              onChange={event => selectVariant(Number(event.target.value))}
              className="h-6 w-full min-w-0 bg-transparent text-[12px] font-semibold text-white outline-none"
            >
              {demoCatalog[category].examples.map((item, index) => (
                <option key={item.name} value={index} className="bg-[#0b2942]">{item.name}</option>
              ))}
            </select>
          </label>
          <nav aria-label="Categorias das demonstrações" className="hidden min-w-0 grid-cols-5 gap-1.5 lg:grid">
            {categories.map((item, index) => (
              <button
                key={item.id}
                type="button"
                aria-pressed={category === item.id}
                onClick={() => selectCategory(item.id)}
                className={"flex h-10 min-w-0 items-center justify-center gap-1 rounded-lg border px-1.5 text-[11px] font-semibold transition-colors " + selection(category === item.id)}
              >
                <span className="font-mono text-[#72cafc]">0{index + 1}</span>
                {item.short}
              </button>
            ))}
          </nav>
          <div
            data-vx-lab-selector
            role="group"
            aria-label="Escolher exemplo de solução"
            className="hidden min-w-0 grid-cols-3 gap-1.5"
          >
            {demoCatalog[category].examples.map((item, index) => (
              <button
                key={item.name}
                type="button"
                aria-pressed={variant === index}
                onClick={() => selectVariant(index)}
                className={"flex h-10 min-w-0 items-center justify-center gap-1 rounded-lg border px-2 text-[11px] font-semibold transition-colors " + selection(variant === index)}
              >
                <span className="font-mono text-[10px] text-[#7ac7f8]">0{index + 1}</span>
                <span className="truncate">{item.name}</span>
              </button>
            ))}
          </div>

        </div>

        <div data-vx-lab-grid className="min-w-0">
          <div className="mt-1.5 overflow-hidden rounded-xl border border-[#37617e] bg-[#07192b] shadow-[0_18px_70px_rgba(0,0,0,.28)]">
            <div data-vx-lab-panel-top className="flex min-h-11 flex-wrap items-center justify-between gap-2 border-b border-[#294d68] bg-[#0a2339] px-2 py-1.5 sm:px-3">
              <select aria-label="Escolher exemplo no desktop" value={variant} onChange={event => selectVariant(Number(event.target.value))} className="hidden h-8 w-[min(32vw,330px)] shrink-0 rounded-md border border-[#4d86a9] bg-[#0f314d] px-2 text-[12px] font-semibold text-white outline-none lg:block">{demoCatalog[category].examples.map((item, index) => <option key={item.name} value={index} className="bg-[#0a263d]">{`0${index+1} · ${item.name}`}</option>)}</select>
              <div data-vx-lab-label className="min-w-0 flex-1 lg:hidden">
                <h3 className="truncate text-[13px] font-bold text-white sm:text-[14px]">{selected.name}</h3>
                <p className="hidden truncate text-[11px] text-[#9dbcd4] sm:block">{selected.subtitle}</p>
              </div>
              <div className="flex shrink-0 items-center gap-1.5">
                <div role="group" aria-label="Visualizar demonstração em" className="flex rounded-md border border-[#386b8b] bg-[#051628] p-0.5">
                  <button
                    type="button"
                    aria-label="Visão desktop"
                    aria-pressed={device === "desktop"}
                    onClick={() => selectDevice("desktop")}
                    className={"rounded px-2 py-1.5 text-[11px] font-semibold " + (device === "desktop" ? "bg-[#1b78bd] text-white" : "text-[#a6c7dd]")}
                  >Desktop</button>
                  <button
                    type="button"
                    aria-label="Visão mobile"
                    aria-pressed={device === "mobile"}
                    onClick={() => selectDevice("mobile")}
                    className={"rounded px-2 py-1.5 text-[11px] font-semibold " + (device === "mobile" ? "bg-[#1b78bd] text-white" : "text-[#a6c7dd]")}
                  >Mobile</button>
                </div>
                <button
                  type="button"
                  aria-label={playing ? "Pausar" : "Reproduzir"}
                  aria-pressed={!playing}
                  onClick={() => setPlaying(previous => !previous)}
                  className="inline-flex h-8 w-8 items-center justify-center gap-1 rounded-md border border-[#37617d] bg-[#0f314a] text-[13px] text-[#caeaff] sm:w-auto sm:px-2"
                >
                  <span aria-hidden="true">{playing ? "Ⅱ" : "▶"}</span>
                  <span className="ml-1 hidden text-[11px] font-medium sm:inline">{playing ? "Pausar" : "Reproduzir"}</span>
                </button>
                <button
                  ref={expandRef}
                  type="button"
                  aria-label="Ampliar demonstração para leitura"
                  onClick={() => setExpanded(true)}
                  className="inline-flex h-8 w-8 items-center justify-center gap-1 rounded-md border border-[#4c99c9] bg-[#123d5e] text-[15px] text-[#def4ff] sm:w-auto sm:px-3"
                >
                  <span aria-hidden="true">⛶</span>
                  <span className="ml-1 hidden text-[11px] font-semibold sm:inline">Ampliar</span>
                </button>
              </div>
            </div>
            <div
              ref={stageRef}
              data-vx-lab-stage
              data-vx-stage-height={stageHeight ?? "auto"}
              data-device={device}
              style={stageHeight === null ? undefined : { height: stageHeight }}
              className="vx-lab-single-frame aspect-[1280/680] w-full scroll-mb-3 overflow-hidden bg-[#071725]"
            >
              <FitDemoStage
                key={category + "-" + variant + "-" + device}
                category={category}
                variant={variant}
                device={device}
                step={step}
                playing={playing}
              />
            </div>
            <div data-vx-lab-caption className="flex h-7 items-center justify-between gap-3 border-t border-[#23425b] bg-[#091c2f] px-3">
              <span className="truncate text-[10px] text-[#a9c4d8]">{selected.tag}</span>
              <span className="shrink-0 text-[10px] text-[#87a9c2]">Demonstração ilustrativa · 0{variant + 1}/03</span>
            </div>
          </div>
        </div>
      </div>

      {expanded && (
        <div
          data-vx-expanded-dialog="true"
          role="dialog"
          aria-modal="true"
          aria-label="Demonstração ampliada do Laboratório"
          className="fixed inset-0 z-[210] flex flex-col bg-[#020a15] p-2 text-white sm:p-4"
        >
          <div className="mx-auto flex w-full max-w-[1700px] items-center justify-between gap-3 border-b border-[#305873] pb-2">
            <div className="min-w-0">
              <p className="text-[10px] uppercase tracking-[.15em] text-[#77c7fa]">Laboratório Vorzax</p>
              <h3 className="truncate text-[14px] font-semibold sm:text-lg">{selected.name}</h3>
            </div>
            <button
              ref={closeRef}
              autoFocus
              type="button"
              onClick={() => setExpanded(false)}
              className="min-h-10 shrink-0 rounded-lg border border-[#5395bd] bg-[#123852] px-4 text-[12px] font-bold text-white"
            >Fechar ✕</button>
          </div>
          <div className="mx-auto mt-2 min-h-0 w-full max-w-[1700px] flex-1 overflow-hidden rounded-lg bg-[#061626]">
            <FitDemoStage
              key={"expanded-" + category + "-" + variant + "-" + device}
              category={category}
              variant={variant}
              device={device}
              step={step}
              playing={playing}
              expanded
            />
          </div>
          <p className="mt-1 text-center text-[10px] text-[#a0c2d8]">Exemplo ilustrativo, não contém dados reais de clientes.</p>
        </div>
      )}
    </section>
  );
}

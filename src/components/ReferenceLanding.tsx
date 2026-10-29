"use client";

import { useState } from "react";
import { DemoVisual, type DemoCategory } from "./DemoVisuals";
import { MotionFilm } from "@/components/MotionFilm";

const cards = [
  { slug: "sites", number: "01", kicker: "SITES E LANDING PAGES", title: "Sua empresa bem apresentada, em qualquer tela", description: "Sites claros, responsivos e com caminhos diretos para o contato comercial.", img: "/vorzax-reference-service-4.webp", alt: "Exemplo conceitual de site institucional em computador", examples: ["Climatização comercial","Escritório contábil","Arquitetura"] },
  { slug: "automacao", number: "02", kicker: "AUTOMAÇÃO DE PROCESSOS", title: "Menos tarefas manuais. Mais fluidez.", description: "Fluxos para conectar etapas, organizar informações e diminuir retrabalho.", img: "/vorzax-reference-service-2.webp", alt: "Simulação conceitual de processo automatizado entre ferramentas", examples: ["Captação de leads","Agendamento","Cobranças"] },
  { slug: "bi", number: "03", kicker: "DASHBOARDS E BI", title: "Uma visão melhor dos seus indicadores", description: "Painéis ilustrativos para acompanhar informações e apoiar decisões.", img: "/vorzax-reference-service-3.webp", alt: "Dashboard ilustrativo com gráficos e indicadores fictícios", examples: ["BI comercial","BI operacional","BI financeiro"] },
  { slug: "sistemas", number: "04", kicker: "SISTEMAS SOB MEDIDA", title: "Tecnologia que acompanha sua operação", description: "Interfaces para reunir dados, pessoas e atividades em um só lugar.", img: "/vorzax-reference-service-1.webp", alt: "Demonstração conceitual de software de gestão de projetos", examples: ["Ordens de serviço","Estoque","Projetos"] },
];

function selectDemo(slug: string, example = 0) {
  window.dispatchEvent(new CustomEvent("vorzax:demo", { detail: { slug, example } }));
}

/** First-screen video + editorial service gallery. Public brand-safe, concept-only imagery. */
export function ReferenceLanding({ onSiteContact }: { onSiteContact: () => void }) {
  const [selectedExamples, setSelectedExamples] = useState<Record<DemoCategory, number>>({sites:0,automacao:0,bi:0,sistemas:0});
  function previewExample(category: DemoCategory, index: number) {
    setSelectedExamples(current => ({...current,[category]:index}));
    selectDemo(category,index);
  }
  return (
    <section id="inicio" className="vx-home-opening relative isolate overflow-hidden bg-[#030a15]">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-[600px] bg-[radial-gradient(ellipse_60%_80%_at_80%_35%,rgba(10,84,175,.18),transparent_80%)]" aria-hidden="true" />
      <div className="pointer-events-none absolute inset-x-0 top-0 h-[600px] bg-[linear-gradient(100deg,transparent_62%,rgba(25,103,189,.045)_80%,transparent)]" aria-hidden="true" />
      <div className="relative mx-auto w-full max-w-[1680px] px-5 pb-14 pt-8 sm:px-8 sm:pt-12 lg:px-10 lg:pb-20 lg:pt-16 xl:px-16">
        <div className="grid items-center gap-8 pb-10 lg:min-h-[470px] lg:grid-cols-[minmax(0,0.88fr)_minmax(0,1.12fr)] lg:gap-9 lg:pb-14 xl:gap-16">
          <div className="vx-hero-copy order-2 min-w-0 lg:order-1">
            <div className="mb-5 flex items-center gap-3 text-[10px] font-semibold uppercase tracking-[.20em] text-[#4abfff] sm:text-[11px]">
              <span className="h-px w-8 bg-[#25b4ff]" /> DESIGN E TECNOLOGIA PARA NEGÓCIOS
            </div>
            <h1 className="max-w-[720px] text-balance text-[clamp(2.3rem,3.8vw,4.3rem)] font-bold leading-[1.065] tracking-[-.062em] text-white">
              Sua empresa merece um site <span className="vx-hero-highlight text-[#69bcff]">à altura do que entrega.</span>
            </h1>
            <p className="mt-5 max-w-[585px] text-[15px] leading-[1.75] text-[#bac8d9] sm:text-[17px]">
              Criamos sites profissionais para apresentar seus serviços com clareza, valorizar sua marca e facilitar o contato. Também desenvolvemos automações, dashboards e sistemas para necessidades específicas.
            </p>
            <div className="mt-7 flex flex-wrap items-center gap-3">
              <button type="button" onClick={onSiteContact} className="inline-flex min-h-12 items-center justify-center gap-3 rounded-xl bg-[#0766d5] px-6 py-3 text-sm font-semibold text-white shadow-[0_16px_35px_rgba(2,104,241,.21)] transition hover:-translate-y-0.5 hover:bg-[#0757b8] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-cyan-300">
                Quero um site profissional <span aria-hidden="true">↗</span>
              </button>
              <a href="#demonstracoes" className="inline-flex min-h-12 items-center justify-center rounded-xl border border-[#3d739f]/65 bg-[#061321]/75 px-6 py-3 text-sm font-semibold text-white transition hover:border-[#73baff] hover:bg-[#11263c] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-cyan-300">Ver demonstrações</a>
            </div>
            <div className="mt-6 flex flex-wrap items-center gap-x-4 gap-y-3 text-[11px] text-[#94a9be]"><span className="flex items-center gap-2"><span className="h-1.5 w-1.5 rounded-full bg-[#38bdf8]" /> Sites profissionais · Soluções digitais</span><a href="https://wa.me/5531990681495?text=Ol%C3%A1%2C%20quero%20conversar%20sobre%20um%20site%20profissional%20para%20minha%20empresa." target="_blank" rel="noopener noreferrer" className="font-semibold text-[#78caff] underline decoration-[#245b88] underline-offset-4 transition hover:text-white">Prefere conversar direto? WhatsApp ↗</a></div>
          </div>

          <div className="vx-hero-media order-1 min-w-0 lg:order-2">
            <div className="mb-3 flex items-center justify-between gap-2 px-1">
              <span className="text-[10px] font-semibold uppercase tracking-[.19em] text-[#73bff0]">VORZAX / TECNOLOGIA EM MOVIMENTO</span>
              <span className="text-[10px] tracking-[.09em] text-[#768ca6]">FILME CONCEITUAL</span>
            </div>
            <div className="vx-hero-video-frame relative mx-auto w-full overflow-hidden rounded-[19px] border border-[#21496f] bg-[#071426] p-[4px] shadow-[0_24px_80px_rgba(0,0,0,.50),0_0_65px_rgba(0,127,255,.12)] sm:rounded-[25px]">
              <MotionFilm variant="principal" />
            </div>
            <div className="mt-3 flex items-center justify-between gap-3 px-1 text-[10px] text-[#7991a8] sm:text-[11px]">
              <span>Vídeo conceitual com interfaces ilustrativas.</span>
              <span className="hidden shrink-0 font-mono tracking-[.12em] text-[#5e839f] sm:inline">01 — 04</span>
            </div>
          </div>
        </div>

        <div id="demonstracoes" className="relative border-t border-[#193149]/70 pt-9 sm:pt-11">
          <div className="mb-6 flex flex-wrap items-end justify-between gap-4">
            <div>
              <span className="text-[10px] font-semibold uppercase tracking-[.20em] text-[#4dc0fc]">EXPLORE NOSSAS SOLUÇÕES</span>
              <h2 className="mt-2 text-[clamp(1.55rem,2.4vw,2.2rem)] font-semibold tracking-[-.045em] text-white">Explore soluções antes de começar seu projeto.</h2>
            </div>
            <span className="hidden text-[11px] text-[#91a7bd] lg:block">Selecione um card para abrir uma demonstração interativa.</span>
          </div>

          <div role="region" aria-label="Vitrine de soluções — deslize para explorar no celular" className="vx-services-rail flex snap-x snap-mandatory gap-4 overflow-x-auto overscroll-x-contain pb-4 sm:grid sm:grid-cols-2 sm:overflow-visible sm:pb-0 xl:grid-cols-4">
            {cards.map((card) => (
              <article key={card.slug} className={`vx-demo-card group grid h-full w-[min(82vw,345px)] shrink-0 snap-start grid-rows-[auto_auto_1fr_auto_auto] sm:w-auto sm:shrink rounded-[20px] border border-[#1a3c5a] bg-[linear-gradient(154deg,#0b2037_0%,#061426_37%,#04101e_100%)] p-4 shadow-[0_16px_45px_rgba(0,0,0,.16)] transition-[transform,border-color,box-shadow] duration-300 hover:-translate-y-1 hover:border-[#3799ff] hover:shadow-[0_26px_60px_rgba(0,0,0,.26)] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-cyan-300 sm:p-5 ${card.slug === "sites" ? "vx-demo-featured" : ""}`}>
                <div className="flex min-h-9 items-start justify-between gap-3">
                  <span className="pt-1 text-[10px] font-bold leading-[1.4] tracking-[.15em] text-[#43b8fb]">{card.kicker}</span>
                  <a href="#tecnologia-em-acao" onClick={() => selectDemo(card.slug, selectedExamples[card.slug as DemoCategory])} aria-label={"Abrir demonstração selecionada de " + card.kicker} className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-[#112941] text-base text-[#e7f7ff] transition hover:bg-[#116ee6] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-300">↗</a>
                </div>
                <h3 className="mt-4 min-h-[3.85rem] text-[clamp(1.35rem,1.55vw,1.64rem)] font-semibold leading-[1.18] tracking-[-.04em] text-white">{card.title}</h3>
                <p className="mt-2 min-h-[4rem] text-[13px] leading-[1.6] text-[#b1c0d2]">{card.description}</p>
                <div className="mt-4 overflow-hidden rounded-xl border border-[#244360] bg-[#071324] shadow-[0_12px_30px_rgba(0,0,0,.28)]">
                  <div className="relative w-full overflow-hidden">
                    {card.slug === "sites" && <span className="absolute left-3 top-3 z-10 rounded-md border border-sky-300/25 bg-[#06203b]/90 px-2.5 py-1.5 text-[9px] font-bold uppercase tracking-[.14em] text-[#a4dcff] shadow-lg backdrop-blur-sm">Oferta principal</span>}
                    <DemoVisual category={card.slug as DemoCategory} variant={selectedExamples[card.slug as DemoCategory]} compact />
                  </div>
                </div>
                <div className="mt-4 border-t border-white/[.07] pt-3">
                  <p className="mb-2 text-[10px] font-semibold uppercase tracking-[.1em] text-[#93c9ef]">Escolha um dos 3 exemplos</p>
                  <div className="flex flex-wrap gap-2">
                    {card.examples.map((example, i) => <button key={example} type="button" aria-pressed={selectedExamples[card.slug as DemoCategory] === i} onClick={() => previewExample(card.slug as DemoCategory, i)} className={`inline-flex min-h-8 items-center rounded-md border px-2.5 py-1.5 text-[10px] font-medium transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-300 ${selectedExamples[card.slug as DemoCategory] === i ? "border-[#6bbdff] bg-[#144b73] text-white" : "border-[#315c7b] bg-[#0a2842] text-[#d0e9fc] hover:border-[#70caff] hover:bg-[#15517a]"}`}>{example}</button>)}
                  </div>
                  <a href="#tecnologia-em-acao" onClick={() => selectDemo(card.slug, selectedExamples[card.slug as DemoCategory])} className="mt-3 inline-flex min-h-8 items-center gap-2 text-[11px] font-semibold text-[#98d8ff] transition hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-300">Abrir este conceito no laboratório <span aria-hidden="true">↗</span></a>
                </div>
              </article>
            ))}
          </div>
          <p className="mt-3 text-[11px] font-medium text-[#91c8ed] sm:hidden">Deslize para o lado e explore as outras soluções →</p>
          <p className="mt-3 text-[11px] leading-5 text-[#92a7bc]">Exemplos conceituais e dados ilustrativos. Não representam clientes nem projetos contratados.</p>
        </div>
      </div>
    </section>
  );
}

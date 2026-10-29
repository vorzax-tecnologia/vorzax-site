"use client";

import Image from "next/image";
import { MotionFilm } from "@/components/MotionFilm";

const cards = [
  { slug: "sistemas", number: "01", kicker: "SISTEMAS SOB MEDIDA", title: "Soluções feitas para o seu negócio", description: "Plataformas para organizar a operação, reunir informações e simplificar a rotina.", img: "/vorzax-reference-service-1.webp", alt: "Demonstração conceitual de software de gestão de projetos" },
  { slug: "automacao", number: "02", kicker: "AUTOMAÇÃO DE PROCESSOS", title: "Mais eficiência para o seu dia a dia", description: "Etapas conectadas, tarefas automatizadas e informações no caminho certo.", img: "/vorzax-reference-service-2.webp", alt: "Simulação conceitual de processo automatizado entre ferramentas" },
  { slug: "bi", number: "03", kicker: "DASHBOARDS E BI", title: "Dados que geram decisões", description: "Indicadores organizados para entender o negócio e agir com mais clareza.", img: "/vorzax-reference-service-3.webp", alt: "Dashboard ilustrativo com gráficos e indicadores fictícios" },
  { slug: "sites", number: "04", kicker: "SITES E LANDING PAGES", title: "Presença digital que representa sua marca", description: "Sites profissionais, responsivos e preparados para conversas comerciais.", img: "/vorzax-reference-service-4.webp", alt: "Exemplo conceitual de site institucional em computador" },
];

function selectDemo(slug: string) {
  window.dispatchEvent(new CustomEvent("vorzax:demo", { detail: { slug } }));
}

/** First-screen video + editorial service gallery. Public brand-safe, concept-only imagery. */
export function ReferenceLanding({ onSiteContact }: { onSiteContact: () => void }) {
  return (
    <section id="inicio" className="vx-home-opening relative isolate overflow-hidden bg-[#030a15]">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-[600px] bg-[radial-gradient(ellipse_60%_80%_at_80%_35%,rgba(10,84,175,.18),transparent_80%)]" aria-hidden="true" />
      <div className="pointer-events-none absolute inset-x-0 top-0 h-[600px] bg-[linear-gradient(100deg,transparent_62%,rgba(25,103,189,.045)_80%,transparent)]" aria-hidden="true" />
      <div className="relative mx-auto w-full max-w-[1680px] px-5 pb-14 pt-8 sm:px-8 sm:pt-12 lg:px-10 lg:pb-20 lg:pt-16 xl:px-16">
        <div className="grid items-center gap-8 pb-10 lg:min-h-[470px] lg:grid-cols-[minmax(0,0.88fr)_minmax(0,1.12fr)] lg:gap-9 lg:pb-14 xl:gap-16">
          <div className="order-2 min-w-0 lg:order-1">
            <div className="mb-5 flex items-center gap-3 text-[10px] font-semibold uppercase tracking-[.20em] text-[#4abfff] sm:text-[11px]">
              <span className="h-px w-8 bg-[#25b4ff]" /> TECNOLOGIA PARA EMPRESAS
            </div>
            <h1 className="max-w-[700px] text-balance text-[clamp(2.4rem,3.65vw,4rem)] font-bold leading-[1.07] tracking-[-.058em] text-white">
              Soluções tecnológicas para empresas que querem <span className="text-[#2299ff]">evoluir.</span>
            </h1>
            <p className="mt-5 max-w-[585px] text-[15px] leading-[1.75] text-[#bac8d9] sm:text-[17px]">
              Criamos sites institucionais profissionais para apresentar sua empresa com clareza. Também desenvolvemos automações, dashboards, BI e sistemas sob medida para necessidades específicas.
            </p>
            <div className="mt-7 flex flex-wrap items-center gap-3">
              <button type="button" onClick={onSiteContact} className="inline-flex min-h-12 items-center justify-center gap-3 rounded-xl bg-[#0766d5] px-6 py-3 text-sm font-semibold text-white shadow-[0_16px_35px_rgba(2,104,241,.21)] transition hover:-translate-y-0.5 hover:bg-[#0757b8] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-cyan-300">
                Quero um site profissional <span aria-hidden="true">↗</span>
              </button>
              <a href="#demonstracoes" className="inline-flex min-h-12 items-center justify-center rounded-xl border border-[#3d739f]/65 bg-[#061321]/75 px-6 py-3 text-sm font-semibold text-white transition hover:border-[#73baff] hover:bg-[#11263c] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-cyan-300">Ver demonstrações</a>
            </div>
            <div className="mt-6 flex flex-wrap items-center gap-x-4 gap-y-3 text-[11px] text-[#94a9be]"><span className="flex items-center gap-2"><span className="h-1.5 w-1.5 rounded-full bg-[#38bdf8]" /> Sites profissionais · Soluções digitais</span><a href="https://wa.me/5531990681495?text=Ol%C3%A1%2C%20quero%20conversar%20sobre%20um%20site%20profissional%20para%20minha%20empresa." target="_blank" rel="noopener noreferrer" className="font-semibold text-[#78caff] underline decoration-[#245b88] underline-offset-4 transition hover:text-white">Prefere conversar direto? WhatsApp ↗</a></div>
          </div>

          <div className="order-1 min-w-0 lg:order-2">
            <div className="mb-3 flex items-center justify-between gap-2 px-1">
              <span className="text-[10px] font-semibold uppercase tracking-[.19em] text-[#73bff0]">VORZAX / TECNOLOGIA EM MOVIMENTO</span>
              <span className="text-[10px] tracking-[.09em] text-[#768ca6]">FILME CONCEITUAL</span>
            </div>
            <div className="vx-hero-video-frame relative mx-auto w-full overflow-hidden rounded-[19px] border border-[#21496f] bg-[#071426] p-[4px] shadow-[0_24px_80px_rgba(0,0,0,.50),0_0_65px_rgba(0,127,255,.12)] sm:rounded-[25px]">
              <MotionFilm variant="principal" />
            </div>
            <div className="mt-3 flex items-center justify-between gap-3 px-1 text-[10px] text-[#7991a8] sm:text-[11px]">
              <span>Interfaces demonstrativas. Nenhum cliente ou resultado real é representado.</span>
              <span className="hidden shrink-0 font-mono tracking-[.12em] text-[#5e839f] sm:inline">01 — 04</span>
            </div>
          </div>
        </div>

        <div id="demonstracoes" className="relative border-t border-[#193149]/70 pt-9 sm:pt-11">
          <div className="mb-6 flex flex-wrap items-end justify-between gap-4">
            <div>
              <span className="text-[10px] font-semibold uppercase tracking-[.20em] text-[#4dc0fc]">EXPLORE NOSSAS SOLUÇÕES</span>
              <h2 className="mt-2 text-[clamp(1.55rem,2.4vw,2.2rem)] font-semibold tracking-[-.045em] text-white">Tecnologia aplicada a desafios reais.</h2>
            </div>
            <span className="hidden text-[11px] text-[#91a7bd] lg:block">Escolha uma solução para ver a demonstração em ação.</span>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
            {cards.map((card) => (
              <a key={card.slug} href="#tecnologia-em-acao" onClick={() => selectDemo(card.slug)} className="vx-demo-card group grid h-full min-w-0 grid-rows-[auto_auto_1fr_auto_auto] rounded-[20px] border border-[#1a3c5a] bg-[linear-gradient(154deg,#0b2037_0%,#061426_37%,#04101e_100%)] p-4 shadow-[0_16px_45px_rgba(0,0,0,.16)] transition-[transform,border-color,box-shadow] duration-300 hover:-translate-y-1 hover:border-[#3799ff] hover:shadow-[0_26px_60px_rgba(0,0,0,.26)] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-cyan-300 sm:p-5">
                <div className="flex min-h-9 items-start justify-between gap-3">
                  <span className="pt-1 text-[10px] font-bold leading-[1.4] tracking-[.15em] text-[#43b8fb]">{card.kicker}</span>
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-[#112941] text-base text-[#e7f7ff] transition group-hover:bg-[#116ee6]" aria-hidden="true">↗</span>
                </div>
                <h3 className="mt-4 min-h-[3.85rem] text-[clamp(1.35rem,1.55vw,1.64rem)] font-semibold leading-[1.18] tracking-[-.04em] text-white">{card.title}</h3>
                <p className="mt-2 min-h-[4rem] text-[13px] leading-[1.6] text-[#b1c0d2]">{card.description}</p>
                <div className="mt-4 overflow-hidden rounded-xl border border-[#244360] bg-[#071324] shadow-[0_12px_30px_rgba(0,0,0,.28)]">
                  <div className="relative aspect-[1.53] w-full overflow-hidden">
                    <Image src={card.img} alt={card.alt} fill sizes="(max-width: 640px) 92vw, (max-width: 1280px) 45vw, 24vw" className="object-cover object-center brightness-[1.10] contrast-[1.08] transition-transform duration-700 group-hover:scale-[1.045]" />
                  </div>
                </div>
                <div className="mt-4 flex items-center justify-between border-t border-white/[.07] pt-3 text-[11px] font-medium text-[#9cd7ff]">
                  <span>Explorar demonstração</span>
                  <span className="font-mono tracking-[.06em] text-[#6e8ca7]">{card.number} / 04</span>
                </div>
              </a>
            ))}
          </div>
          <p className="mt-6 text-[11px] leading-5 text-[#8395aa]">Demonstrações conceituais. Telas, números e situações são ilustrativos; não representam clientes, projetos entregues ou resultados comprovados.</p>
        </div>
      </div>
    </section>
  );
}

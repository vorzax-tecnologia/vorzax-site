"use client";

import { MotionFilm } from "@/components/MotionFilm";

const WHATSAPP_URL = "https://wa.me/5531990681495?text=Ol%C3%A1%2C%20quero%20conversar%20sobre%20uma%20solu%C3%A7%C3%A3o%20tecnol%C3%B3gica%20para%20minha%20empresa.";

const cards = [
  { slug: "sites", number: "01", kicker: "PRESENÇA DIGITAL", title: "Sites e landing pages", description: "Apresente seus serviços com clareza e facilite o contato de novos clientes.", tags: ["Marca", "Serviços", "Contato"] },
  { slug: "automacao", number: "02", kicker: "EFICIÊNCIA OPERACIONAL", title: "Automação de processos", description: "Conecte etapas e reduza tarefas repetitivas com fluxos sob medida.", tags: ["Entradas", "Regras", "Ações"] },
  { slug: "bi", number: "03", kicker: "INTELIGÊNCIA DE DADOS", title: "Dashboards e BI", description: "Reúna indicadores e acompanhe sua operação com mais clareza.", tags: ["Dados", "Indicadores", "Decisões"] },
  { slug: "sistemas", number: "04", kicker: "SOFTWARE PARA NEGÓCIOS", title: "Sistemas sob medida", description: "Organize informações, equipes e processos em soluções adaptadas.", tags: ["Fluxos", "Equipes", "Gestão"] },
  { slug: "ia", number: "05", kicker: "ASSISTENTES VIRTUAIS", title: "Vorzax IA", description: "Explore atendimento, suporte e apoio operacional em uma interface ilustrativa.", tags: ["Conversas", "Suporte", "IA"] },
] as const;

function selectDemo(slug: string, example = 0) {
  window.dispatchEvent(new CustomEvent("vorzax:demo", { detail: { slug, example } }));
}

/** First-screen video + editorial service gallery. Public brand-safe, concept-only imagery. */
export function ReferenceLanding({ onContact }: { onContact: () => void }) {
  return (
    <section id="inicio" className="vx-home-opening relative isolate overflow-hidden bg-[#030a15]">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-[600px] bg-[radial-gradient(ellipse_60%_80%_at_80%_35%,rgba(10,84,175,.18),transparent_80%)]" aria-hidden="true" />
      <div className="pointer-events-none absolute inset-x-0 top-0 h-[600px] bg-[linear-gradient(100deg,transparent_62%,rgba(25,103,189,.045)_80%,transparent)]" aria-hidden="true" />
      <div className="relative mx-auto w-full max-w-[1780px] px-5 pb-14 pt-8 sm:px-8 sm:pt-12 lg:px-10 lg:pb-20 lg:pt-16 xl:px-16">
        <div className="grid items-center gap-8 pb-10 lg:min-h-[540px] lg:grid-cols-[minmax(0,0.78fr)_minmax(0,1.22fr)] lg:gap-6 lg:pb-14 xl:gap-10">
          <div className="vx-hero-copy order-2 min-w-0 lg:order-1">
            <div className="mb-5 flex items-center gap-3 text-[10px] font-semibold uppercase tracking-[.20em] text-[#4abfff] sm:text-[11px]">
              <span className="h-px w-8 bg-[#25b4ff]" /> TECNOLOGIA PARA EMPRESAS
            </div>
            <h1 className="max-w-[720px] text-balance text-[clamp(2.3rem,3.8vw,4.3rem)] font-bold leading-[1.065] tracking-[-.062em] text-white">
              Tecnologia para empresas <span className="vx-hero-highlight text-[#69bcff]">que querem evoluir.</span>
            </h1>
            <p className="mt-5 max-w-[585px] text-[15px] leading-[1.75] text-[#bac8d9] sm:text-[17px]">
              Unimos presença digital, automação, dados e desenvolvimento de sistemas para criar soluções tecnológicas que ajudam empresas a apresentar, organizar e evoluir seus negócios.
            </p>
            <div className="mt-7 flex flex-wrap items-center gap-3">
              <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-12 items-center justify-center gap-3 rounded-xl bg-[#0766d5] px-6 py-3 text-sm font-semibold text-white shadow-[0_16px_35px_rgba(2,104,241,.21)] transition hover:-translate-y-0.5 hover:bg-[#0757b8] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-cyan-300">
                Conversar sobre meu projeto <span aria-hidden="true">↗</span>
              </a>
              <a href="#tecnologia-em-acao" className="inline-flex min-h-12 items-center justify-center rounded-xl border border-[#3d739f]/65 bg-[#061321]/75 px-6 py-3 text-sm font-semibold text-white transition hover:border-[#73baff] hover:bg-[#11263c] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-cyan-300">Ver demonstrações</a>
            </div>
            <div className="mt-6 flex flex-wrap items-center gap-x-4 gap-y-3 text-[11px] text-[#94a9be]"><span className="flex items-center gap-2"><span className="h-1.5 w-1.5 rounded-full bg-[#38bdf8]" /> Sites · Automações · BI · Sistemas · Vorzax IA</span><button type="button" onClick={onContact} className="font-semibold text-[#78caff] underline decoration-[#245b88] underline-offset-4 transition hover:text-white">Prefere detalhar? Envie sua ideia ↗</button></div>
          </div>

          <div className="vx-hero-media order-1 min-w-0 lg:order-2">
            <div className="mb-3 flex items-center justify-between gap-2 px-1">
              <span className="text-[10px] font-semibold uppercase tracking-[.19em] text-[#73bff0]">VORZAX / TECNOLOGIA EM MOVIMENTO</span>
              <span className="text-[10px] tracking-[.09em] text-[#768ca6]">FILME CONCEITUAL</span>
            </div>
            <div className="vx-hero-video-frame relative mx-auto w-full overflow-hidden rounded-[19px] border border-[#21496f] bg-[#071426] shadow-[0_24px_80px_rgba(0,0,0,.50),0_0_65px_rgba(0,127,255,.12)] sm:rounded-[25px]">
              <MotionFilm variant="principal" />
            </div>
            <div className="mt-3 flex items-center justify-between gap-3 px-1 text-[10px] text-[#7991a8] sm:text-[11px]">
              <span>Apresentação visual das cinco frentes tecnológicas.</span>
              <span className="hidden shrink-0 font-mono tracking-[.12em] text-[#5e839f] sm:inline">01 — 05</span>
            </div>
          </div>
        </div>

        <div id="solucoes" className="relative scroll-mt-24 border-t border-[#193149]/75 pt-8 sm:pt-10">
          <div className="mb-6 flex flex-wrap items-end justify-between gap-3">
            <div>
              <span className="text-[10px] font-semibold uppercase tracking-[.20em] text-[#4dc0fc]">O QUE A VORZAX DESENVOLVE</span>
              <h2 className="mt-2 text-[clamp(1.45rem,2.35vw,2rem)] font-semibold tracking-[-.045em] text-white">Cinco frentes de tecnologia. <span className="text-[#77c7ff]">Uma solução para cada desafio.</span></h2>
            </div>
            <a href="#tecnologia-em-acao" className="inline-flex min-h-10 items-center gap-2 text-xs font-semibold text-[#9edaff] transition hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-300">Explorar o Laboratório <span aria-hidden="true">↗</span></a>
          </div>
          <div role="region" aria-label="Áreas de atuação da Vorzax: deslize para explorar no celular" className="flex snap-x snap-mandatory gap-3 overflow-x-auto overscroll-x-contain pb-2 sm:grid sm:grid-cols-2 sm:overflow-visible sm:pb-0 xl:grid-cols-5">
            {cards.map((card) => (
              <a key={card.slug} href="#tecnologia-em-acao" onClick={() => selectDemo(card.slug)} className={`group relative flex h-full min-h-[210px] w-[min(83vw,330px)] shrink-0 snap-start flex-col overflow-hidden sm:min-h-[215px] sm:w-auto sm:shrink rounded-[18px] border border-[#224565] bg-[linear-gradient(145deg,#0b2037,#061425_80%)] px-5 py-5 transition-[border-color,background-color,transform] duration-300 hover:-translate-y-1 hover:border-[#55aff0] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-cyan-300 ${card.slug==="ia"?"border-[#68559e] bg-[linear-gradient(145deg,#231e3d,#0b172a_85%)] hover:border-[#a78bfa]":""}`}>
                <div className="flex items-center justify-between">
                  <span className="font-mono text-xs font-semibold text-[#6cc9ff]">{card.number} / 05</span>
                  <span aria-hidden="true" className="grid h-9 w-9 place-items-center rounded-xl border border-[#2f5f82] bg-[#102e4b] text-[#b1e3ff] transition group-hover:bg-[#116ee6] group-hover:text-white">↗</span>
                </div>
                <p className="mt-4 text-[9px] font-bold uppercase tracking-[.15em] text-[#69bdf3]">{card.kicker}</p>
                <h3 className="mt-2 text-[20px] font-semibold leading-tight tracking-[-.04em] text-white">{card.title}</h3>
                <p className="mt-3 flex-1 text-[12px] leading-5 text-[#b4c6d8]">{card.description}</p>
                <div className="mt-5 flex flex-wrap gap-2 border-t border-[#244760]/80 pt-4">
                  {card.tags.map((tag) => <span key={tag} className="rounded-md bg-[#12324e] px-2.5 py-1 text-[10px] font-medium text-[#a6d5f2]">{tag}</span>)}
                </div>
              </a>
            ))}
          </div>
          <p className="mt-2 text-[11px] font-medium text-[#91c8ed] sm:hidden">Deslize para conhecer as cinco áreas →</p>
          <p className="mt-3 text-[11px] leading-5 text-[#93a9be]">Conheça as possibilidades aqui. No Laboratório, explore 15 interfaces demonstrativas em desktop e mobile. A Vorzax IA é um conceito ilustrativo, não um assistente ativo.</p>
        </div>
      </div>
    </section>
  );
}

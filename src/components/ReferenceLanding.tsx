"use client";

import Image from "next/image";
import { MotionFilm } from "@/components/MotionFilm";

const cards = [
  {
    slug: "sistemas", number: "01", kicker: "SISTEMAS SOB MEDIDA",
    title: "Soluções feitas para o seu negócio",
    description: "Plataformas para organizar a operação, reunir informações e simplificar a rotina.",
    img: "/vorzax-reference-service-1.webp", alt: "Interface conceitual de gestão de projetos",
  },
  {
    slug: "automacao", number: "02", kicker: "AUTOMAÇÃO DE PROCESSOS",
    title: "Mais eficiência para o seu dia a dia",
    description: "Etapas conectadas, tarefas automatizadas e informações no caminho certo.",
    img: "/vorzax-reference-service-2.webp", alt: "Fluxo conceitual com registro, processamento e notificações",
  },
  {
    slug: "bi", number: "03", kicker: "DASHBOARDS E BI",
    title: "Dados que geram decisões",
    description: "Indicadores organizados para entender o negócio e agir com mais clareza.",
    img: "/vorzax-reference-service-3.webp", alt: "Painel de indicadores ilustrativos e gráficos de BI",
  },
  {
    slug: "sites", number: "04", kicker: "SITES E LANDING PAGES",
    title: "Presença digital que representa sua marca",
    description: "Sites profissionais, responsivos e preparados para conversas comerciais.",
    img: "/vorzax-reference-service-4.webp", alt: "Conceito de site institucional empresarial responsivo",
  },
];

function selectDemo(slug: string) {
  window.dispatchEvent(new CustomEvent("vorzax:demo", { detail: { slug } }));
}

/** Editorial, image-led landing inspired by the concept approved by the founder. */
export function ReferenceLanding({ onContact }: { onContact: () => void }) {
  return <section id="inicio" className="vx-reference relative isolate overflow-hidden bg-[#030912]">
    <div className="vx-reference-photo pointer-events-none absolute right-0 top-0 hidden h-[535px] w-[63%] lg:block" aria-hidden="true">
      <Image src="/vorzax-reference-hero.webp" alt="" fill priority sizes="(max-width: 1024px) 0px, 65vw" className="object-cover object-[center_23%]" />
      <div className="absolute inset-0 bg-gradient-to-r from-[#030912] via-[#030912]/15 to-transparent" />
      <div className="absolute inset-0 bg-gradient-to-t from-[#030912] via-transparent to-[#030912]/5" />
    </div>
    <div className="pointer-events-none absolute inset-x-0 top-[490px] h-60 bg-gradient-to-b from-[#030912] to-transparent" aria-hidden="true" />

    <div className="relative mx-auto w-full max-w-[1680px] px-5 pb-8 pt-10 sm:px-8 lg:px-10 lg:pb-14 lg:pt-16 xl:px-16">
      <div className="relative z-10 flex min-h-[390px] flex-col items-start justify-center pb-7 sm:min-h-[410px] lg:max-w-[665px] lg:pb-12 xl:min-h-[415px]">
        <div className="mb-6 flex items-center gap-3 text-[10px] font-semibold uppercase tracking-[.25em] text-[#55caff] sm:text-xs">
          <span className="h-px w-8 bg-[#22b4ff]" /> TECNOLOGIA PARA EMPRESAS
        </div>
        <h1 className="max-w-[690px] text-balance text-[clamp(2.55rem,3.65vw,4rem)] font-bold leading-[1.055] tracking-[-.063em] text-white">
          <span className="lg:block">Soluções tecnológicas</span>{" "}
          <span className="lg:block">para empresas que</span>{" "}
          <span className="lg:block">querem <span className="text-[#168eff]">evoluir.</span></span>
        </h1>
        <p className="mt-6 max-w-[570px] text-base leading-[1.75] text-[#b6c3d4] sm:text-lg">
          Desenvolvemos sistemas, automações, dashboards e sites para organizar processos, tornar a informação mais clara e ajudar empresas a crescer com estrutura.
        </p>
        <div className="mt-7 flex w-full flex-wrap gap-3">
          <button type="button" onClick={onContact} className="vx-reference-cta inline-flex min-h-12 items-center justify-center gap-3 rounded-xl bg-[#0878f9] px-6 py-3 text-sm font-semibold text-white shadow-[0_14px_40px_rgba(2,105,246,.2)] transition hover:bg-[#2e93ff] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-cyan-300">Conversar sobre meu projeto <span aria-hidden="true">↗</span></button>
          <a href="#tecnologia-em-acao" className="inline-flex min-h-12 items-center justify-center rounded-xl border border-[#3688c5]/60 bg-[#020a13]/70 px-6 py-3 text-sm font-semibold text-white transition hover:border-[#73c4ff] hover:bg-[#102841] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-cyan-300">Conhecer nossas soluções</a>
        </div>
        <div className="mt-7 flex items-center gap-2 text-[11px] text-[#8298b2]"><span className="h-1.5 w-1.5 rounded-full bg-[#43bfff]" /> Tecnologia sob medida • Atendimento empresarial</div>
      </div>

      <div className="relative z-10 mb-5 overflow-hidden rounded-[20px] border border-[#17304b] bg-[#06101d] shadow-[0_25px_55px_rgba(0,0,0,.3)] lg:hidden">
        <div className="relative aspect-[1.9] sm:aspect-[2.3]"><Image src="/vorzax-reference-hero.webp" alt="Conceito de uma interface de gestão no notebook da Vorzax" fill sizes="(max-width: 1024px) 95vw, 0px" className="object-cover" /></div>
        <div className="absolute inset-0 bg-gradient-to-t from-[#030912]/45 to-transparent" aria-hidden="true" />
        <span className="absolute bottom-3 left-4 rounded-full border border-[#55aafa]/25 bg-[#05111c]/75 px-3 py-1.5 text-[10px] font-medium text-[#accbe1] backdrop-blur-md">Interface conceitual · Dados ilustrativos</span>
      </div>

      <div className="relative z-20 grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
        {cards.map(card => <a key={card.slug} href="#tecnologia-em-acao" onClick={() => selectDemo(card.slug)} className="vx-reference-card group relative isolate flex min-h-[410px] flex-col overflow-hidden rounded-[19px] border border-[#1a3550] bg-[#050e1c] p-5 text-left shadow-[0_25px_60px_rgba(0,0,0,.2)] transition-[border-color,transform] duration-300 hover:-translate-y-1.5 hover:border-[#378ee1] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-cyan-300 sm:min-h-[395px] 2xl:min-h-[425px]">
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-[#081728] to-[#050d1b]" aria-hidden="true" />
          <div className="relative z-10 flex items-start justify-between gap-3">
            <span className="text-[10px] font-bold tracking-[.15em] text-[#39b7ff]">{card.kicker}</span>
            <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-[#102238] text-lg text-white transition group-hover:bg-[#0f71dc]" aria-hidden="true">↗</span>
          </div>
          <h2 className="relative z-10 mt-3 max-w-[290px] text-[clamp(1.35rem,1.7vw,1.65rem)] font-semibold leading-[1.16] tracking-[-.04em] text-white">{card.title}</h2>
          <p className="relative z-10 mt-3 max-w-[320px] text-[13px] leading-[1.55] text-[#b0bfd2]">{card.description}</p>
          <div className="relative z-10 mt-auto overflow-hidden rounded-xl border border-[#1a324a] bg-[#081323] pt-1 shadow-[0_15px_40px_rgba(0,0,0,.3)]">
            <div className="relative aspect-[1.55] overflow-hidden">
              <Image src={card.img} alt={card.alt} fill sizes="(max-width: 640px) 95vw, (max-width: 1280px) 48vw, 24vw" className="object-cover object-top opacity-95 transition duration-700 group-hover:scale-[1.055] group-hover:opacity-100" />
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#05101d]/25 to-transparent" aria-hidden="true" />
            </div>
          </div>
          <span className="relative z-10 mt-3 inline-flex items-center justify-between text-[10px] font-medium tracking-[.02em] text-[#8ac9fc]">Explorar demonstração <span className="text-[#617a93]">{card.number} / 04</span></span>
        </a>)}
      </div>
      <div className="relative z-10 mt-6 flex flex-col items-start justify-between gap-3 border-t border-white/[.07] pt-5 sm:flex-row sm:items-center">
        <span className="max-w-2xl text-[11px] leading-5 text-[#7588a0]">Demonstrações conceituais. Interfaces e números são ilustrativos e não representam clientes ou resultados reais.</span>
        <details className="vx-reference-reel w-full max-w-[650px] sm:w-auto">
          <summary className="cursor-pointer text-[12px] font-semibold text-[#8bd7ff] transition hover:text-white">▶ Assistir ao vídeo da Vorzax</summary>
          <div className="mt-3 w-full min-w-[290px] sm:w-[520px]"><MotionFilm /></div>
        </details>
      </div>
    </div>
  </section>;
}

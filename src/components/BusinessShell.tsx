import type { ReactNode } from "react";
import Link from "next/link";
import { BrandLogo } from "@/components/BrandLogo";

export function BusinessShell({ children, active }: {children: ReactNode; active?: "servicos"|"proposta"|"processo"|"seguranca"}) {
  const nav = [
    {href: "/servicos", label: "Serviços", id: "servicos"},
    {href: "/como-trabalhamos", label: "Como trabalhamos", id: "processo"},
    {href: "/seguranca", label: "Segurança e dados", id: "seguranca"},
    {href: "/solicitar-proposta", label: "Solicitar proposta", id: "proposta"}
  ];
  return (
    <div className="min-h-screen bg-[#030c1a] text-white">
      <a href="#conteudo" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-lg focus:bg-[#d7f3ff] focus:px-4 focus:py-3 focus:text-[#04223c]">
        Ir para o conteúdo
      </a>
      <header className="sticky top-0 z-40 border-b border-[#15324d] bg-[#020a16]/90 shadow-[0_12px_35px_rgba(0,0,0,.13)] backdrop-blur-2xl">
        <div className="relative mx-auto flex min-h-[68px] w-full max-w-[1680px] flex-wrap items-center justify-between gap-2 px-5 py-2 sm:min-h-[72px] sm:px-8 lg:px-10 xl:px-16">
          <Link href="/" aria-label="Vorzax Tecnologia, voltar à página inicial" className="inline-flex shrink-0 items-center focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#7bd3ff]">
            <BrandLogo />
          </Link>
          <nav aria-label="Navegação de serviços" className="flex max-w-full flex-wrap items-center gap-x-4 gap-y-2 text-[12px] font-medium text-[#c6d8ea]">
            <Link href="/" aria-label="Voltar ao site principal" className="inline-flex min-h-10 shrink-0 items-center gap-2 rounded-lg border border-[#356181] bg-[#0a2741] px-3 font-semibold text-[#a7dfff] transition hover:border-[#6ac7ff] hover:bg-[#123b5b] hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#7bd3ff]">
              <span aria-hidden="true">←</span> Voltar ao site principal
            </Link>
            {nav.map(item => <Link key={item.href} href={item.href} aria-current={active===item.id?"page":undefined} className={active===item.id?"text-[#8ed8ff] underline underline-offset-4":"transition hover:text-white focus-visible:underline"}>{item.label}</Link>)}
          </nav>
        </div>
      </header>
      <main id="conteudo" className="mx-auto w-full max-w-[1180px] px-5 py-12 sm:px-8 sm:py-16">
        {children}
      </main>
      <footer className="border-t border-[#1b3d59] bg-[#051321]">
        <div className="mx-auto flex max-w-[1180px] flex-wrap items-start justify-between gap-6 px-5 py-9 text-[12px] text-[#9ebbd1] sm:px-8">
          <div>
            <p className="font-semibold text-white">Vorzax Tecnologia</p>
            <p className="mt-2">Atendimento online a partir de Minas Gerais, Brasil.</p>
            <p className="mt-1">Soluções digitais mediante diagnóstico e proposta.</p>
          </div>
          <div className="flex flex-col gap-2">
            <a href="mailto:contato@vorzax.com.br" className="hover:text-white">contato@vorzax.com.br</a>
            <Link href="/privacidade" className="hover:text-white">Política de Privacidade</Link>
            <Link href="/" className="hover:text-white">Página inicial</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}

export function SectionHeading({eyebrow,title,description}:{eyebrow:string;title:string;description?:string}) {
  return <div className="max-w-[920px]">
    <p className="text-[11px] font-bold uppercase tracking-[.19em] text-[#79caff]">{eyebrow}</p>
    <h1 className="mt-4 text-[clamp(2rem,4vw,3.7rem)] font-bold leading-[1.09] tracking-[-.05em] text-white">{title}</h1>
    {description&&<p className="mt-5 max-w-[820px] text-[15px] leading-7 text-[#bfd1e1] sm:text-[17px]">{description}</p>}
  </div>;
}

export function BusinessCard({title,children}:{title:string;children:ReactNode}) {
  return <section className="rounded-[18px] border border-[#2c5374] bg-[linear-gradient(145deg,#0c263d,#071a2c)] p-5 sm:p-7">
    <h2 className="text-xl font-semibold tracking-tight text-white">{title}</h2>
    <div className="mt-4 text-sm leading-7 text-[#bfd1e1]">{children}</div>
  </section>;
}

export function PlainList({items}:{items:string[]}) {
  return <ul className="space-y-3">{items.map(item=><li key={item} className="flex items-start gap-2"><span aria-hidden="true" className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[#69c7ff]"/><span>{item}</span></li>)}</ul>;
}

import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";

export const metadata: Metadata = {
  title: "Política de Privacidade",
  description: "Como a Vorzax trata os dados enviados pelo site.",
  alternates: { canonical: "/privacidade" },
};

export default function PrivacyPage() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-[#030b17] text-white">
      <header className="relative z-10 border-b border-[#1e3c56] bg-[#020a15]/90 backdrop-blur-2xl">
        <div className="mx-auto flex h-[72px] max-w-[1440px] items-center justify-between px-5 sm:px-8 lg:px-10 xl:px-16">
          <Link href="/" aria-label="Vorzax Tecnologia — voltar ao início"><Image src="/vorzax-logo-oficial.png" alt="Vorzax Tecnologia" width={604} height={172} className="h-auto w-[158px] sm:w-[185px]" priority /></Link>
          <Link href="/" className="inline-flex items-center gap-2 rounded-full border border-[#2c5679] bg-[#08243a] px-4 py-2 text-xs font-semibold text-[#91d4ff] transition hover:border-[#49b9ff] hover:text-white">← Voltar ao site</Link>
        </div>
      </header>

      <article className="relative mx-auto max-w-[900px] px-5 py-20 sm:px-8 sm:py-28">
        <p className="vx-eyebrow"><span className="vx-eyebrow-line" /> VORZAX / PRIVACIDADE</p>
        <h1 className="vx-heading mt-6">Política de Privacidade</h1>
        <p className="mt-5 text-sm leading-7 text-[#9ab2c9]">Última atualização: 30 de outubro de 2026</p>

        <div className="mt-12 space-y-4 text-sm leading-7 text-[#b9cce0]">
          <section className="rounded-[18px] border border-[#234562] bg-[#081b2e] p-6 sm:p-8">
            <h2 className="text-xl font-semibold tracking-[-.03em] text-white">1. Quem somos</h2>
            <p className="mt-3">A Vorzax Tecnologia, com atendimento online a partir de Minas Gerais, desenvolve sistemas, automações, dashboards e experiências digitais para empresas. Esta política explica como tratamos os dados enviados pelo site.</p>
          </section>

          <section className="rounded-[18px] border border-[#234562] bg-[#081b2e] p-6 sm:p-8">
            <h2 className="text-xl font-semibold tracking-[-.03em] text-white">2. Dados que recebemos</h2>
            <p className="mt-3">Quando você solicita um diagnóstico, podemos receber nome, telefone, e-mail, empresa, segmento, solução desejada, objetivo e prazo. Também podemos receber dados técnicos básicos necessários para segurança e funcionamento do site.</p>
          </section>

          <section className="rounded-[18px] border border-[#234562] bg-[#081b2e] p-6 sm:p-8">
            <h2 className="text-xl font-semibold tracking-[-.03em] text-white">3. Para que usamos os dados</h2>
            <p className="mt-3">Usamos essas informações para entender sua necessidade, responder ao contato, preparar uma proposta e melhorar o atendimento. Não vendemos seus dados nem usamos as informações para finalidades incompatíveis com o contato solicitado.</p>
          </section>

          <section className="rounded-[18px] border border-[#234562] bg-[#081b2e] p-6 sm:p-8">
            <h2 className="text-xl font-semibold tracking-[-.03em] text-white">4. Compartilhamento e armazenamento</h2>
            <p className="mt-3">Quando você confirma o envio da mensagem no WhatsApp, as informações fornecidas são recebidas para atendimento e seguem as condições de uso dessa plataforma. O formulário de contato deste site não grava automaticamente seus dados em um banco de leads. Podemos manter os registros das conversas necessários ao atendimento, com acesso restrito e pelo tempo adequado à finalidade.</p>
          </section>

          <section className="rounded-[18px] border border-[#234562] bg-[#081b2e] p-6 sm:p-8">
            <h2 className="text-xl font-semibold tracking-[-.03em] text-white">5. Seus direitos</h2>
            <p className="mt-3">Você pode pedir confirmação do tratamento, acesso, correção, eliminação ou esclarecimentos sobre seus dados. Para isso, escreva para <a className="text-sky-300 underline underline-offset-2 hover:text-white" href="mailto:contato@vorzax.com.br">contato@vorzax.com.br</a>.</p>
          </section>

          <section className="rounded-[18px] border border-[#234562] bg-[#081b2e] p-6 sm:p-8">
            <h2 className="text-xl font-semibold tracking-[-.03em] text-white">6. Atualizações</h2>
            <p className="mt-3">Podemos atualizar esta política para refletir mudanças no site, nos serviços ou na legislação. A versão vigente estará sempre disponível nesta página.</p>
          </section>
        </div>

        <div className="mt-10 rounded-[18px] border border-[#275577] bg-[#0a2840] p-6 text-sm text-[#b5cce1]">
          Dúvidas sobre privacidade? <a className="font-semibold text-sky-300 hover:text-white" href="mailto:contato@vorzax.com.br">Fale com a Vorzax</a>.
        </div>
      </article>
    </main>
  );
}

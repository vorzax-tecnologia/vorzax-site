import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Política de Privacidade",
  description: "Como a Vorzax trata os dados enviados pelo site.",
  alternates: { canonical: "/privacidade" },
};

export default function PrivacyPage() {
  return (
    <main className="min-h-screen bg-[#020611] text-white">
      <header className="border-b border-white/10 bg-[#020611]/80 backdrop-blur-xl">
        <div className="mx-auto flex h-20 max-w-4xl items-center justify-between px-6">
          <Link href="/" className="text-lg font-black tracking-[0.18em]">VORZ<span aria-hidden="true">Λ</span>X</Link>
          <Link href="/" className="text-sm text-slate-400 transition hover:text-white">Voltar ao site</Link>
        </div>
      </header>

      <article className="mx-auto max-w-3xl px-6 py-20 sm:py-28">
        <p className="text-xs font-semibold tracking-[0.28em] text-sky-400">PRIVACIDADE</p>
        <h1 className="mt-5 text-4xl font-semibold tracking-[-0.05em] sm:text-5xl">Política de Privacidade</h1>
        <p className="mt-5 leading-7 text-slate-400">Última atualização: 28 de julho de 2026</p>

        <div className="mt-12 space-y-10 text-sm leading-7 text-slate-300">
          <section>
            <h2 className="text-xl font-semibold text-white">1. Quem somos</h2>
            <p className="mt-3">A Vorzax Tecnologia, com atendimento online a partir de Minas Gerais, desenvolve sistemas, automações, dashboards e experiências digitais para empresas. Esta política explica como tratamos os dados enviados pelo site.</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white">2. Dados que recebemos</h2>
            <p className="mt-3">Quando você solicita um diagnóstico, podemos receber nome, telefone, e-mail, empresa, segmento, solução desejada, objetivo e prazo. Também podemos receber dados técnicos básicos necessários para segurança e funcionamento do site.</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white">3. Para que usamos os dados</h2>
            <p className="mt-3">Usamos essas informações para entender sua necessidade, responder ao contato, preparar uma proposta e melhorar o atendimento. Não vendemos seus dados nem usamos as informações para finalidades incompatíveis com o contato solicitado.</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white">4. Compartilhamento e armazenamento</h2>
            <p className="mt-3">Os dados podem ser armazenados em ferramentas de infraestrutura e atendimento utilizadas pela Vorzax, incluindo Supabase e WhatsApp, somente na medida necessária para conduzir o contato. Mantemos controles de acesso compatíveis com a finalidade e buscamos excluir informações quando deixam de ser necessárias.</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white">5. Seus direitos</h2>
            <p className="mt-3">Você pode pedir confirmação do tratamento, acesso, correção, eliminação ou esclarecimentos sobre seus dados. Para isso, escreva para <a className="text-sky-300 underline underline-offset-2 hover:text-white" href="mailto:contato@vorzax.com.br">contato@vorzax.com.br</a>.</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white">6. Atualizações</h2>
            <p className="mt-3">Podemos atualizar esta política para refletir mudanças no site, nos serviços ou na legislação. A versão vigente estará sempre disponível nesta página.</p>
          </section>
        </div>

        <div className="mt-14 rounded-2xl border border-white/10 bg-white/[0.04] p-5 text-sm text-slate-400">
          Dúvidas sobre privacidade? <a className="font-semibold text-sky-300 hover:text-white" href="mailto:contato@vorzax.com.br">Fale com a Vorzax</a>.
        </div>
      </article>
    </main>
  );
}

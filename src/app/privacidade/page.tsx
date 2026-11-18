import type { Metadata } from "next";
import Link from "next/link";
import { BrandLogo } from "@/components/BrandLogo";

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
          <Link href="/" aria-label="Vorzax Tecnologia — voltar ao início"><BrandLogo /></Link>
          <Link href="/" className="inline-flex items-center gap-2 rounded-full border border-[#2c5679] bg-[#08243a] px-4 py-2 text-xs font-semibold text-[#91d4ff] transition hover:border-[#49b9ff] hover:text-white">← Voltar ao site</Link>
        </div>
      </header>

      <article className="relative mx-auto max-w-[900px] px-5 py-20 sm:px-8 sm:py-28">
        <p className="vx-eyebrow"><span className="vx-eyebrow-line" /> VORZAX / PRIVACIDADE</p>
        <h1 className="vx-heading mt-6">Política de Privacidade</h1>
        <p className="mt-5 text-sm leading-7 text-[#9ab2c9]">Última atualização: 17 de novembro de 2026</p>

        <div className="mt-12 space-y-4 text-sm leading-7 text-[#b9cce0]">
          <section className="rounded-[18px] border border-[#234562] bg-[#081b2e] p-6 sm:p-8">
            <h2 className="text-xl font-semibold tracking-[-.03em] text-white">1. Quem somos</h2>
            <p className="mt-3">A Vorzax Tecnologia, com atendimento online a partir de Minas Gerais, desenvolve sistemas, automações, dashboards e experiências digitais para empresas. Para solicitações e direitos do titular, o canal de contato é contato@vorzax.com.br. Esta política refere-se aos dados de visitantes deste site; contratos de clientes com sistemas próprios exigem análise específica.</p>
          </section>

          <section className="rounded-[18px] border border-[#234562] bg-[#081b2e] p-6 sm:p-8">
            <h2 className="text-xl font-semibold tracking-[-.03em] text-white">2. Dados que recebemos</h2>
            <p className="mt-3">Quando você prepara um contato, podem ser incluídos nome, telefone, e-mail, empresa, segmento, serviço desejado, objetivo e prazo. A página de proposta prepara uma mensagem no próprio navegador para seu aplicativo de e-mail. Quando o envio direto estiver habilitado, a solicitação será transmitida ao serviço de e-mail transacional utilizado pela Vorzax, exclusivamente para encaminhar seu contato. Também podem ser tratados dados técnicos mínimos de acesso e funcionamento conforme a infraestrutura de hospedagem.</p>
          </section>

          <section className="rounded-[18px] border border-[#234562] bg-[#081b2e] p-6 sm:p-8">
            <h2 className="text-xl font-semibold tracking-[-.03em] text-white">3. Para que usamos os dados</h2>
            <p className="mt-3">Usamos essas informações para entender sua necessidade, responder ao contato, preparar uma proposta e melhorar o atendimento. Não vendemos seus dados nem usamos as informações para finalidades incompatíveis com o contato solicitado.</p>
          </section>

          <section className="rounded-[18px] border border-[#234562] bg-[#081b2e] p-6 sm:p-8">
            <h2 className="text-xl font-semibold tracking-[-.03em] text-white">4. Compartilhamento e armazenamento</h2>
            <p className="mt-3">Quando você confirma o envio no WhatsApp ou no seu aplicativo de e-mail, as informações seguem o canal escolhido e as regras da respectiva plataforma. Os formulários públicos do site não gravam automaticamente uma base de leads. Quando o envio direto estiver habilitado, o provedor transacional poderá manter registros técnicos de entrega conforme suas políticas e responsabilidades aplicáveis. Podemos conservar registros de conversas e propostas pelo período necessário ao atendimento, às obrigações aplicáveis e à defesa de direitos, observada a necessidade de revisão periódica e os pedidos legais dos titulares. A duração específica depende da finalidade e do contexto contratual.</p>
          </section>

          <section className="rounded-[18px] border border-[#234562] bg-[#081b2e] p-6 sm:p-8">
            <h2 className="text-xl font-semibold tracking-[-.03em] text-white">5. Seus direitos</h2>
            <p className="mt-3">Você pode pedir confirmação do tratamento, acesso, correção, eliminação ou esclarecimentos sobre seus dados. Para isso, escreva para <a className="text-sky-300 underline underline-offset-2 hover:text-white" href="mailto:contato@vorzax.com.br">contato@vorzax.com.br</a>.</p>
          </section>

          <section className="rounded-[18px] border border-[#234562] bg-[#081b2e] p-6 sm:p-8">
            <h2 className="text-xl font-semibold tracking-[-.03em] text-white">6. Canais externos e solicitações</h2>
            <p className="mt-3">Ao usar WhatsApp, e-mail ou Instagram, o visitante também fica sujeito às condições dessas plataformas. Evite enviar senhas, informações de terceiros ou bases internas no primeiro contato. Demandas de acesso, correção ou eliminação de dados podem ser encaminhadas a contato@vorzax.com.br, com verificação de legitimidade quando necessário.</p>
          </section>
          <section className="rounded-[18px] border border-[#234562] bg-[#081b2e] p-6 sm:p-8">
            <h2 className="text-xl font-semibold tracking-[-.03em] text-white">7. Atualizações</h2>
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

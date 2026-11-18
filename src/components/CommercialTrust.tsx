import Link from "next/link";

/**
 * Conversão honesta: apresenta o próximo passo sem fingir que os exemplos
 * demonstrativos são implantações de clientes ou resultados obtidos.
 */
export function ConversionBridge() {
  return <section aria-labelledby="vx-conversao-titulo" className="relative border-t border-[#1d3f5b] bg-[linear-gradient(125deg,#061426_0%,#0b2945_53%,#071929_100%)]">
    <div className="mx-auto grid max-w-[1440px] gap-7 px-5 py-12 sm:px-8 lg:grid-cols-[minmax(0,1.15fr)_minmax(320px,.85fr)] lg:items-center lg:gap-14 lg:px-10 lg:py-16 xl:px-16">
      <div>
        <p className="text-[11px] font-bold uppercase tracking-[.18em] text-[#85d4ff]">DA DEMONSTRAÇÃO AO SEU PROJETO</p>
        <h2 id="vx-conversao-titulo" className="mt-4 max-w-[740px] text-[clamp(1.65rem,2.8vw,2.7rem)] font-semibold leading-[1.13] tracking-[-.045em] text-white">
          Gostou de uma ideia? Vamos avaliar se ela faz sentido para sua empresa.
        </h2>
        <p className="mt-4 max-w-[680px] text-sm leading-7 text-[#b7cbdc] sm:text-base">
          As telas do Laboratório são ilustrativas. Descreva seu desafio, indique a solução de interesse e receba orientação sobre os próximos passos. Prazos e valores dependem do escopo.
        </p>
        <div className="mt-6 flex flex-wrap items-center gap-3">
          <Link href="/solicitar-proposta" className="inline-flex min-h-12 items-center justify-center rounded-xl bg-[#0c71d7] px-6 text-sm font-semibold text-white transition hover:bg-[#1684ee] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#9bdfff]">
            Solicitar avaliação do projeto <span aria-hidden="true" className="ml-2">↗</span>
          </Link>
          <Link href="/como-trabalhamos" className="inline-flex min-h-12 items-center rounded-xl border border-[#4d7a9a] px-5 text-sm font-semibold text-[#b2ddf7] transition hover:border-[#a2dcff] hover:text-white">
            Entender as etapas
          </Link>
        </div>
      </div>
      <div className="grid gap-3 sm:grid-cols-3 lg:grid-cols-1">
        {[
          {no:"01",title:"Você explica",text:"Conte o problema e o contexto, sem precisar definir a tecnologia."},
          {no:"02",title:"Avaliamos juntos",text:"Verificamos requisitos, limites e uma abordagem possível."},
          {no:"03",title:"Você decide",text:"Escopo e condições são apresentados antes da contratação."}
        ].map((step)=><div key={step.no} className="flex gap-4 rounded-xl border border-[#315a78] bg-[#061e33]/90 p-4">
          <span aria-hidden="true" className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-[#103c61] font-mono text-[12px] font-bold text-[#8fd8ff]">{step.no}</span>
          <div><h3 className="text-[14px] font-semibold text-white">{step.title}</h3><p className="mt-1 text-[12px] leading-5 text-[#a9c4d7]">{step.text}</p></div>
        </div>)}
      </div>
    </div>
  </section>;
}

const questions=[
  {question:"Preciso saber exatamente qual sistema quero construir?",answer:"Não. Você pode começar descrevendo a dificuldade atual e o resultado desejado. A definição de tecnologia, funcionalidades e etapas acontece durante a análise de viabilidade e escopo."},
  {question:"Como vocês definem preço e prazo?",answer:"A proposta considera objetivos, quantidade de páginas ou funcionalidades, integrações, conteúdo, revisões e riscos técnicos. Valores e prazos não são prometidos antes da avaliação do projeto."},
  {question:"Os exemplos do Laboratório são projetos já entregues?",answer:"Não. São demonstrações com marcas, dados e fluxos ilustrativos, criadas para explicar possibilidades. Não representam implantação, clientes atendidos ou resultados obtidos."},
  {question:"É possível começar com um projeto menor?",answer:"Sim, podemos avaliar uma primeira entrega com escopo delimitado, como um site institucional, um fluxo de automação ou um painel com indicadores prioritários. A viabilidade é definida em proposta."},
  {question:"Como funcionam mudanças, suporte e propriedade da solução?",answer:"As condições de revisão, entregáveis, suporte, propriedade de código e solicitações fora do escopo precisam ser descritas na proposta e no contrato. Não há suporte contínuo ou SLA presumidos."},
  {question:"Como vocês tratam dados e informações confidenciais?",answer:"No primeiro contato, descreva somente a necessidade. Acesso a dados internos, sistemas, credenciais e informações pessoais requer avaliação de segurança e responsabilidades antes da execução. Consulte a política de privacidade."}
];

export function CommercialFAQ() {
  return <section id="perguntas-frequentes" aria-labelledby="vx-faq-title" className="border-y border-[#203c56] bg-[#040f1d]">
    <div className="mx-auto grid max-w-[1440px] gap-9 px-5 py-14 sm:px-8 lg:grid-cols-[.75fr_1.25fr] lg:gap-16 lg:px-10 lg:py-20 xl:px-16">
      <div>
        <p className="text-[11px] font-bold uppercase tracking-[.18em] text-[#7ad0ff]">TRANSPARÊNCIA ANTES DA CONTRATAÇÃO</p>
        <h2 id="vx-faq-title" className="mt-4 text-[clamp(1.75rem,3vw,2.7rem)] font-semibold leading-[1.13] tracking-[-.045em] text-white">Respostas claras. Sem promessas vagas.</h2>
        <p className="mt-4 text-sm leading-7 text-[#a9c0d4]">Uma boa decisão começa entendendo o que será entregue, como funciona o processo e quais informações são necessárias.</p>
        <Link href="/como-trabalhamos" className="mt-6 inline-flex min-h-11 items-center text-sm font-semibold text-[#92d9ff] underline decoration-[#427a9d] underline-offset-4 hover:text-white">Conheça nosso processo de trabalho <span aria-hidden="true" className="ml-2">↗</span></Link>
      </div>
      <div className="space-y-2">
        {questions.map((item)=><details key={item.question} className="group rounded-xl border border-[#2a4e6d] bg-[#0a2034] px-5 py-4 open:border-[#4e9ac8] open:bg-[#0b2941]">
          <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-[14px] font-semibold leading-6 text-white marker:content-none [&::-webkit-details-marker]:hidden">
            {item.question}
            <span aria-hidden="true" className="grid h-7 w-7 shrink-0 place-items-center rounded-lg bg-[#133956] text-[#9bdcff] transition-transform group-open:rotate-45">+</span>
          </summary>
          <p className="mt-3 border-t border-[#2a4c66] pt-3 text-[13px] leading-7 text-[#b4cfe1]">{item.answer}</p>
        </details>)}
        <p className="pt-3 text-[12px] text-[#8eaec5]">Ainda tem dúvidas? <Link className="font-semibold text-[#8bd7ff] underline underline-offset-4" href="/solicitar-proposta">Conte o que precisa resolver</Link>.</p>
      </div>
    </div>
  </section>;
}

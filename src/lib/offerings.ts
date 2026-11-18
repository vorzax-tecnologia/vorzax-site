/** Descrição comercial, não prova de projetos executados nem contrato firmado. */
export type Offering = {
  slug: string;
  shortTitle: string;
  title: string;
  eyebrow: string;
  headline: string;
  description: string;
  audience: string[];
  deliverables: string[];
  exclusions: string[];
  stages: string[];
  acceptance: string[];
  demonstration: string;
  seo: string;
};
export const offerings: Offering[] = [
  {
    slug: "sites",
    shortTitle: "Sites institucionais",
    title: "Sites e landing pages",
    eyebrow: "PRESENÇA DIGITAL",
    headline: "Uma apresentação clara para o cliente entender e entrar em contato.",
    description: "Criação de páginas institucionais com identidade, conteúdo, navegação responsiva e chamadas para contato. O formato final depende do diagnóstico e da proposta.",
    audience: ["Negócios que precisam apresentar serviços com clareza", "Empresas com site desatualizado ou sem versão mobile adequada", "Operações B2B que dependem de contatos qualificados"],
    deliverables: ["Estrutura de conteúdo e hierarquia das páginas", "Design responsivo para desktop e celular", "Páginas e seções definidas na proposta", "Formas de contato, SEO básico e publicação combinada", "Rodadas de revisão e orientação de uso especificadas em contrato"],
    exclusions: ["Tráfego pago, produção ilimitada de conteúdo e fotografia", "Integrações complexas, sistemas administrativos e comércio eletrônico sem contratação específica", "Alterações recorrentes e hospedagem não previstas no escopo"],
    stages: ["Diagnóstico e briefing", "Proposta de estrutura e conteúdo", "Desenvolvimento e revisão", "Aprovação, publicação e suporte conforme contrato"],
    acceptance: ["Navegação e formulário de contato verificados", "Visualização em tamanhos de tela acordados", "Páginas, conteúdo e revisões entregues conforme proposta"],
    demonstration: "Explore os três modelos fictícios do Laboratório: climatização, contabilidade e arquitetura.",
    seo: "Sites institucionais e landing pages para empresas. Conheça escopo, entregáveis, etapas de desenvolvimento e como solicitar proposta à Vorzax."
  },
  {
    slug: "automacoes",
    shortTitle: "Automações",
    title: "Automação de processos",
    eyebrow: "EFICIÊNCIA OPERACIONAL",
    headline: "Menos tarefas repetitivas e mais rastreabilidade para sua operação.",
    description: "Mapeamento de uma rotina e desenho de um fluxo para reduzir trabalho manual. As integrações são avaliadas conforme sistemas, permissões e condições de acesso do cliente.",
    audience: ["Equipes que repetem lançamentos ou encaminhamentos", "Operações com agendamentos, aprovações ou notificações", "Empresas que precisam organizar a passagem de informação entre etapas"],
    deliverables: ["Mapa do processo escolhido e definição das regras", "Fluxo de automação de escopo delimitado", "Testes com situações previstas e tratamento de exceções", "Instruções de uso e transição operacional"],
    exclusions: ["Acesso garantido a APIs de terceiros e contas sem autorização", "Disparos ilimitados ou contratação de plataformas externas", "Automatização de processos ainda sem regras definidas"],
    stages: ["Mapear processo e exceções", "Validar integrações e acessos", "Desenvolver com dados de teste", "Homologar e ativar conforme plano aprovado"],
    acceptance: ["Cenários de entrada, sucesso e falha validados", "Permissões e responsáveis definidos", "Procedimento de interrupção ou retorno documentado"],
    demonstration: "Explore fluxos ilustrativos de captação de leads, agendamento técnico e avisos financeiros.",
    seo: "Automações de processos para negócios: mapeamento, integração, testes e implantação planejada. Solicite uma análise de viabilidade."
  },
  {
    slug: "dashboards-bi",
    shortTitle: "Dashboards e BI",
    title: "Dashboards e inteligência de dados",
    eyebrow: "CLAREZA DE GESTÃO",
    headline: "Transforme dados disponíveis em indicadores que apoiam decisões.",
    description: "Organização visual de métricas de negócio com fontes de dados e regras de cálculo previamente definidas. Uma demonstração não garante conexão com sistemas de terceiros.",
    audience: ["Gestores que dependem de várias planilhas", "Áreas comerciais e operacionais que querem acompanhar indicadores", "Times que precisam de uma visão mais clara de dados existentes"],
    deliverables: ["Definição dos indicadores, fontes e periodicidade", "Modelo de dados e validações de consistência", "Dashboard responsivo dentro do escopo contratado", "Orientação de uso e documentação das métricas"],
    exclusions: ["Tratamento ilimitado de bases históricas inconsistentes", "Conectores de dados não autorizados ou sujeitos a licenças extras", "Garantia de resultado financeiro por decisão baseada em indicadores"],
    stages: ["Escolher decisões e KPIs prioritários", "Validar fontes e qualidade dos dados", "Construir e revisar painéis", "Homologar cálculos, acessos e atualização"],
    acceptance: ["Cálculos conferidos com amostras de referência", "Filtros, indicadores e acessos testados", "Fontes e periodicidade de atualização descritas"],
    demonstration: "Veja exemplos ilustrativos de indicadores comerciais, operações e financeiro.",
    seo: "Dashboards e BI para empresas: indicadores, fontes de dados, visualização e validação. Entenda o processo para solicitar uma proposta."
  },
  {
    slug: "sistemas-sob-medida",
    shortTitle: "Sistemas sob medida",
    title: "Desenvolvimento de sistemas sob medida",
    eyebrow: "SOFTWARE EMPRESARIAL",
    headline: "Software desenhado para um processo definido, com entregas por etapas.",
    description: "Desenho e desenvolvimento de aplicações conforme requisitos, riscos e prioridades do projeto. Sistemas críticos e dados sensíveis exigem avaliação técnica e contratual específica.",
    audience: ["Operações com regras de negócio que planilhas não resolvem", "Empresas que precisam organizar ordens, estoque ou projetos", "Gestores que desejam validar um módulo antes de ampliar uma plataforma"],
    deliverables: ["Diagnóstico de requisitos e escopo funcional", "Protótipo ou definição de telas e fluxos", "Incrementos implementados e testados", "Documentação, critérios de aceite e responsabilidades de manutenção definidos"],
    exclusions: ["Entrega imediata de plataforma completa sem diagnóstico", "Integração ou migração de dados não acordada", "SLA corporativo, alta disponibilidade e certificações não contratados e não comprovados"],
    stages: ["Descoberta e priorização", "Definição do MVP e critérios de aceite", "Desenvolvimento incremental", "Testes, homologação e transição"],
    acceptance: ["Requisitos aprovados e verificáveis", "Fluxos principais e permissões testados", "Política de dados, manutenção e reversibilidade estabelecidas no contrato"],
    demonstration: "Veja protótipos ilustrativos de ordens de serviço, estoque e gestão de projetos.",
    seo: "Desenvolvimento de sistemas sob medida para empresas. Requisitos, MVP, homologação, segurança proporcional ao risco e proposta técnica."
  }
];
export const offeringBySlug = (slug: string) => offerings.find(item => item.slug === slug);

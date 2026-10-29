import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Arquitetura de plataforma SaaS para empresas",
  description:
    "Roteiro de implementação enterprise para operação, frota, manutenção, pessoas e finanças em uma única base.",
  alternates: { canonical: "/plataforma" },
  openGraph: {
    title: "Plataforma Vorzax | Arquitetura completa para negócio",
    description:
      "Módulos completos, governança, trilhas de implantação e automações para operação de alto desempenho.",
    url: "https://www.vorzax.com.br/plataforma",
  },
};

type ModuleBlueprint = {
  title: string;
  owner: string;
  mvp: string[];
  enterprise: string[];
  dados: string[];
  risco: string[];
};

const architectureLayers = [
  {
    layer: "Core de governança",
    description:
      "Identidade, permissões, trilha de auditoria, dados mestres e regras de segurança para escalar com controle.",
    benefits: [
      "Acesso por função e unidade",
      "Perfis por cargo com aprovação de ações críticas",
      "Log imutável de alterações e auditoria",
      "Multiempresa e separação por tenant",
    ],
  },
  {
    layer: "Domínio operacional",
    description:
      "Processos de atendimento, execução e manutenção transformados em fluxos rastreáveis, do chamado à conclusão.",
    benefits: [
      "Fluxo único de demandas e ordens de serviço",
      "Agenda, prioridade, alocação e janela de disponibilidade",
      "Levantamentos de falha, causa, solução, custo e garantia",
      "Rastreabilidade por ativo, veículo, projeto ou cliente",
    ],
  },
  {
    layer: "Dados e inteligência",
    description:
      "Camada analítica com KPIs acionáveis, fechamento rápido e automação operacional para decisão.",
    benefits: [
      "Indicadores por operação, custo e risco",
      "Alertas por desvio de SLA e SLA vencido",
      "Painéis para diretoria, operação e financeiro",
      "Exportação para BI externo sem travar o core",
    ],
  },
  {
    layer: "Ecossistema",
    description:
      "Integrações com WhatsApp, ERP, notas fiscais, mapas e serviços de terceiros.",
    benefits: [
      "Webhooks de entrada e saída por evento",
      "Importação/Exportação de contratos, ordens e pagamentos",
      "Assinaturas, aprovação digital e versionamento de documentos",
      "APIs padronizadas por módulo",
    ],
  },
] as const;

const modules: ModuleBlueprint[] = [
  {
    title: "Operações",
    owner: "Gestão de demanda e execução",
    mvp: [
      "Atendimento com origem por canal",
      "Chamadas com prioridade e status",
      "Agenda operacional e dashboard diário",
      "Relação com cliente e histórico por chamado",
    ],
    enterprise: [
      "Sequenciamento automático por janela",
      "Roteamento por habilidade e carga",
      "Escalonamento com regras por criticidade",
      "Assinatura digital no encerramento da OS",
    ],
    dados: ["Cliente", "Contato", "Veículo", "Tipo de serviço", "SLA", "Localização"],
    risco: ["Perda de SLA", "Duplicidade de chamada", "Atrasos não rastreados"],
  },
  {
    title: "Frotas",
    owner: "Ativos móveis e custo operacional",
    mvp: [
      "Cadastro de veículo e condutor",
      "Cadastro de documentos essenciais",
      "Odômetro e combustível básico",
      "Histórico de ocorrências mecânicas",
    ],
    enterprise: [
      "Controle de lifecycle de pneus/peças por quilometragem",
      "Rotas com custos reais por viagem",
      "Telemetria e janelas de manutenção preditiva",
      "Integração com apólice, seguradoras e multas",
    ],
    dados: ["VIN", "RENAVAM", "Categoria", "Proprietário", "Seguro", "Km histórico"],
    risco: ["Multas de manutenção", "Custos ocultos de parada", "Exposição documental"],
  },
  {
    title: "Manutenção",
    owner: "Confiabilidade de ativos e disponibilidade",
    mvp: [
      "Solicitação de manutenção por veículo/asset",
      "Ordem de serviço simples com materiais",
      "Histórico de tarefas e conclusão",
      "Checklist inicial e retorno técnico",
    ],
    enterprise: [
      "Plano preventivo com janelas por criticidade",
      "CMMS com MTBF/MTTR e backlog técnico",
      "Causa raiz, impacto em produção e CAPA",
      "Controle de estoques de peças por ordem",
    ],
    dados: ["Ativo", "Falha reportada", "Diagnóstico", "Peça usada", "Horas técnicas", "Custo"],
    risco: ["Downtime não calculado", "Retrabalho por ausência de contexto", "Inconsistência de custos"],
  },
  {
    title: "Pessoas",
    owner: "Equipe, competências e alocação",
    mvp: ["Equipe e funções", "Escalas", "Permissões baseadas em cargo", "Contato de emergência"],
    enterprise: [
      "Competência por tarefa e certificação",
      "Gestão de horas por projeto/ordem",
      "Indicadores de produtividade por colaborador",
      "Base de treinamentos e reciclagem obrigatória",
    ],
    dados: ["Cargo", "Turno", "Habilidades", "Certificações", "Histórico de produtividade"],
    risco: ["Baixa produtividade por distribuição errada", "Não conformidade de competência"],
  },
  {
    title: "Financeiro",
    owner: "Receita, despesas, caixa e margem",
    mvp: ["Receitas e despesas lançadas", "Centro de custo", "Resumo financeiro por período"],
    enterprise: [
      "Contas a receber e pagar com projeção de caixa",
      "Integração fiscal e conciliação",
      "Margem por ordem e por cliente",
      "Fechamento com aprovação de etapa",
    ],
    dados: ["Plano de conta", "Centro de custo", "Forma de pagamento", "Contrato", "NFe"],
    risco: ["Falta de previsibilidade de caixa", "Cobrança atrasada sem visibilidade"],
  },
  {
    title: "Compras & Fornecedores",
    owner: "Suprimentos, contratação e abastecimento",
    mvp: [
      "Solicitação e pedido de compra",
      "Cadastro e qualificação de fornecedores",
      "Cotações e comparação de propostas",
      "Recebimento vinculado ao estoque",
    ],
    enterprise: [
      "Alçadas por valor, categoria e centro de custo",
      "Contratos, lead time e avaliação de desempenho",
      "Compra sugerida por estoque mínimo e demanda",
      "Portal do fornecedor e rastreio de entrega",
    ],
    dados: ["Fornecedor", "Cotação", "Pedido", "Contrato", "Prazo", "Centro de custo"],
    risco: ["Compra sem aprovação", "Ruptura por atraso", "Fornecedor sem homologação"],
  },
  {
    title: "Fiscal & Faturamento",
    owner: "Documentos fiscais, cobrança e conformidade",
    mvp: [
      "Faturamento por serviço, contrato ou ordem",
      "Regras de tributação e retenção",
      "Emissão e acompanhamento de documentos",
      "Integração com contas a receber",
    ],
    enterprise: [
      "Conciliação entre pedido, execução e nota",
      "Gestão de rejeições, cancelamentos e correções",
      "Obrigações e calendário fiscal por empresa",
      "Auditoria de impostos e trilha de alterações",
    ],
    dados: ["Tomador", "Serviço", "Tributo", "Documento", "Município", "Situação"],
    risco: ["Faturamento divergente", "Rejeição fiscal", "Perda de prazo regulatório"],
  },
  {
    title: "Indicadores & BI",
    owner: "Medição de negócio em tempo real",
    mvp: ["KPIs de operação", "Painel de OS", "Painel financeiro básico"],
    enterprise: [
      "Funis comerciais e previsão de receita",
      "Indicadores de risco por ativo e cliente",
      "Corte por unidade, equipe e período",
      "Notificações por thresholds de indicador",
    ],
    dados: ["KPI", "Período", "Dimensão", "Meta", "Responsável", "Fonte"],
    risco: ["Decisão baseada em planilha", "Inconsistência de meta vs execução"],
  },
  {
    title: "Documentos",
    owner: "Comprovantes e evidências",
    mvp: ["Upload por entidade", "Versionamento inicial", "Controle de vencimento"],
    enterprise: [
      "Política de retenção e descarte",
      "Fluxo de aprovação por documento",
      "Assinatura digital e trilha de auditoria",
      "Busca semântica por metadados",
    ],
    dados: ["Tipo de doc", "Entidade", "Vínculo", "Data de validade", "Status"],
    risco: ["Documentação incompleta", "Não conformidade por prazo expirado"],
  },
  {
    title: "Integrações",
    owner: "Conexão com ecossistema",
    mvp: ["Importar e exportar dados", "Webhook básico", "Conectores por endpoint"],
    enterprise: [
      "Integração com WhatsApp, ERP, pagamento e mapa",
      "Retry/backoff e DLQ para falhas",
      "Monitoramento de eventos e assinaturas",
      "Catálogo de APIs versionado",
    ],
    dados: ["Conector", "Evento", "Erro", "Payload", "Tentativas", "Destino"],
    risco: ["Integração instável", "Inconsistência entre sistemas"],
  },
  {
    title: "Motores",
    owner: "Automações e orquestração",
    mvp: ["Regras de negócio simples", "Notificações e lembretes"],
    enterprise: [
      "Workflows com aprovação automática",
      "Eventos programáveis por SLA",
      "Ações condicionais por contexto do módulo",
      "Simulação de cenários antes da execução",
    ],
    dados: ["Evento", "Condição", "Ação", "Execução", "Resultado", "Resultado esperado"],
    risco: ["Automação sem governança", "Loops de notificação repetitiva"],
  },
  {
    title: "CRM",
    owner: "Relacionamento e pipeline comercial",
    mvp: ["Lead, cliente e oportunidade", "Funil inicial", "Anotações de contato"],
    enterprise: [
      "Deduplicação de contatos e unificação de empresa",
      "Proposta associada à OS/ordem",
      "Taxonomia de origem e conversão",
      "Comissões e metas comerciais",
    ],
    dados: ["Lead", "Contato", "Stage", "Valor", "Probabilidade", "Próxima ação"],
    risco: ["Perda de oportunidade por ausência de follow-up", "Dificuldade de prever caixa comercial"],
  },
  {
    title: "Estoque",
    owner: "Controle físico e demanda de peças",
    mvp: ["Cadastro de itens", "Entradas e saídas básicas", "Saldo atual"],
    enterprise: [
      "Custos de lote e lote FIFO/FEFO",
      "Inventário por contador",
      "Reserva para ordem e compra automática",
      "Integração com fornecedores e compra",
    ],
    dados: ["Item", "Local", "Fornecedor", "Saldo", "Custo", "Reserva"],
    risco: ["Falta de peça para serviço", "Excesso de capital imobilizado"],
  },
  {
    title: "Almoxarifado",
    owner: "Localização e circulação interna de materiais",
    mvp: ["Setores por localização", "Movimentação simples", "Inventário cíclico inicial"],
    enterprise: [
      "Transferência entre unidades com trilha",
      "Checklist de entrada/saída e conferência",
      "Plano mínimo de segurança por item crítico",
      "Contenção de perdas e divergência por inventário",
    ],
    dados: ["Local", "Responsável", "Movimento", "Documento base", "Ajuste"],
    risco: ["Perdas internas sem rastreio", "Erros de almoxarifado em picos"],
  },
  {
    title: "Administração",
    owner: "Condução corporativa e governança",
    mvp: ["Unidades, usuários e permissões", "Configurações da empresa"],
    enterprise: [
      "Políticas por contrato e SLA interno",
      "Configuração de módulos por plano e licença",
      "Compliance operacional e LGPD aplicada a dados",
      "Dashboards de maturidade e saúde por unidade",
    ],
    dados: ["Empresa", "Plano", "Função", "Permissões", "Política", "Log"],
    risco: ["Configuração inconsistente", "Escopo sem governança"],
  },
  {
    title: "Auditoria",
    owner: "Risco, conformidade e rastreabilidade",
    mvp: ["Log básico de ações", "Relatório de acessos"],
    enterprise: [
      "Eventos imutáveis por ação e usuário",
      "Revisão periódica de acessos e segregação de funções",
      "Evidências para fiscalização e auditoria",
      "Planos de correção e rastreabilidade de incidente",
    ],
    dados: ["Usuário", "Ação", "Registro", "Resultado", "Justificativa", "Hash de integridade"],
    risco: ["Inconsistência de responsabilidade", "Dificuldade de provar histórico"],
  },
];

const maturityStages = [
  {
    stage: "Fundação",
    target: "0 a 30 dias",
    expected: [
      "Arquitetura multiempresa e autenticação segura",
      "Design system e padrões de navegação",
      "Cadastros mestres e matriz de permissões",
      "Logs, ambientes e observabilidade inicial",
    ],
  },
  {
    stage: "Core",
    target: "31 a 90 dias",
    expected: [
      "Operações, Manutenção e Financeiro conectados",
      "Frota, Estoque e CRM nos fluxos prioritários",
      "Integrações e webhooks essenciais",
      "Dashboards operacionais e gerenciais",
    ],
  },
  {
    stage: "Padrão Enterprise",
    target: "91 a 180 dias",
    expected: [
      "Motores de aprovação e automação robusta",
      "Governança com auditoria, trilha e controles LGPD",
      "KPIs acionáveis por diretoria, operação e financeiro",
      "SLA por contrato, equipe e ativo",
    ],
  },
  {
    stage: "Multiempresa",
    target: "180+ dias",
    expected: [
      "Central de administração com múltiplas unidades",
      "Plano por tenant e gestão de limites",
      "Operações padronizadas com observabilidade total",
      "Expansão para BI externo e integrações avançadas",
    ],
  },
];

const competitiveSignals = [
  {
    label: "SAP",
    points: [
      "Ciclo de vida de ativos ligado a risco, custo e desempenho",
      "Ordens com tempo, peças, medições, anexos e histórico",
      "Finanças com fonte única, controles e fechamento rastreável",
    ],
  },
  {
    label: "TOTVS",
    points: [
      "Cobertura modular de compras, estoque, faturamento e financeiro",
      "Integração entre CRM, RH, fiscal e rotinas operacionais",
      "Adoção gradual por porte, segmento e maturidade da empresa",
    ],
  },
  {
    label: "Engeman",
    points: [
      "Solicitações por QR Code, web e mobile com priorização",
      "Planos preventivos, OS, inspeções e histórico por ativo",
      "MTBF, MTTR, SLA, materiais e execução online ou offline",
    ],
  },
];

const implementationChecklist = [
  "Definir áreas críticas, metas e indicadores de sucesso por 90 dias",
  "Padronizar entidades mestres (empresa, ativo, unidade, usuário, cliente)",
  "Mapear fluxos de risco: atendimento, manutenção, compra, cobrança",
  "Construir alçadas de aprovação para documentos, compras e ordens",
  "Implantar indicadores mínimos de SLA e margem por serviço",
  "Ativar monitoramento de integrações, filas, erros e eventos",
  "Testar permissões, restauração de backup e continuidade operacional",
  "Validar LGPD, retenção de dados, exportação e exclusão por titular",
  "Rodar piloto com 1 equipe, 20 ordens e 1 mês de operação real",
];

function SectionHeader({
  title,
  subtitle,
}: {
  title: string;
  subtitle: string;
}) {
  return (
    <div className="space-y-3">
      <p className="text-[10px] font-semibold tracking-[0.24em] text-sky-400">{title}</p>
      <h2 className="text-3xl font-semibold tracking-[-0.03em] text-white sm:text-4xl">{subtitle}</h2>
    </div>
  );
}

function BenchmarkPillars() {
  return (
    <div className="grid gap-4 md:grid-cols-3">
      {competitiveSignals.map((signal) => (
        <article key={signal.label} className="rounded-3xl border border-white/10 bg-white/[0.035] p-5">
          <p className="text-xs font-semibold text-sky-300">{signal.label}</p>
          <ul className="mt-4 space-y-2 text-sm leading-6 text-slate-300">
            {signal.points.map((point) => (
              <li key={point} className="rounded-2xl border border-white/10 bg-white/[0.02] px-3 py-2">
                {point}
              </li>
            ))}
          </ul>
        </article>
      ))}
    </div>
  );
}

function LayerCard({
  layer,
  description,
  benefits,
}: {
  layer: string;
  description: string;
  benefits: readonly string[];
}) {
  return (
    <article className="rounded-3xl border border-white/10 bg-[#060d18] p-6">
      <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">{layer}</p>
      <p className="mt-4 text-sm leading-7 text-slate-300">{description}</p>
      <div className="mt-4 rounded-2xl border border-sky-400/10 bg-sky-400/[0.04] p-4">
        <p className="text-xs font-semibold text-sky-300">Pilares de entrega</p>
        <ul className="mt-3 space-y-2 text-sm text-slate-200">
          {benefits.map((benefit) => (
            <li key={benefit}>{benefit}</li>
          ))}
        </ul>
      </div>
    </article>
  );
}

function ModuleTable() {
  return (
    <div className="overflow-x-auto rounded-3xl border border-white/10 bg-[#060d18]">
      <table className="w-full min-w-[1320px] text-left text-sm">
        <caption className="sr-only">
          Matriz funcional da plataforma Vorzax com escopo mínimo, recursos enterprise, dados essenciais e riscos controlados.
        </caption>
        <thead className="bg-white/[0.03] text-slate-400">
          <tr>
            <th className="px-5 py-4 font-semibold">Módulo</th>
            <th className="px-5 py-4 font-semibold">Responsável</th>
            <th className="px-5 py-4 font-semibold">MVP</th>
            <th className="px-5 py-4 font-semibold">Enterprise</th>
            <th className="px-5 py-4 font-semibold">Dados essenciais</th>
            <th className="px-5 py-4 font-semibold">Riscos controlados</th>
          </tr>
        </thead>
        <tbody>
          {modules.map((item, index) => (
            <tr
              key={item.title}
              className={`border-t border-white/10 text-slate-200 ${index % 2 === 0 ? "bg-white/[0.015]" : ""}`}
            >
              <td className="px-5 py-5 align-top">
                <p className="font-semibold text-white">{item.title}</p>
              </td>
              <td className="px-5 py-5 align-top text-slate-300">{item.owner}</td>
              <td className="px-5 py-5 align-top">
                <ul className="space-y-2">
                  {item.mvp.map((value) => (
                    <li key={value} className="text-slate-400">
                      {value}
                    </li>
                  ))}
                </ul>
              </td>
              <td className="px-5 py-5 align-top">
                <ul className="space-y-2">
                  {item.enterprise.map((value) => (
                    <li key={value} className="text-slate-300">
                      {value}
                    </li>
                  ))}
                </ul>
              </td>
              <td className="px-5 py-5 align-top">
                <ul className="space-y-2">
                  {item.dados.map((value) => (
                    <li key={value} className="text-slate-400">
                      {value}
                    </li>
                  ))}
                </ul>
              </td>
              <td className="px-5 py-5 align-top">
                <ul className="space-y-2">
                  {item.risco.map((value) => (
                    <li key={value} className="text-amber-100/80">
                      {value}
                    </li>
                  ))}
                </ul>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function RoadmapSection() {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {maturityStages.map((stage) => (
        <article key={stage.stage} className="rounded-3xl border border-white/10 bg-[#060d18] p-5">
          <div className="flex items-center justify-between">
            <p className="text-sm font-semibold text-white">{stage.stage}</p>
            <span className="rounded-full border border-emerald-400/25 bg-emerald-400/10 px-3 py-1 text-[10px] font-semibold text-emerald-300">
              {stage.target}
            </span>
          </div>
          <ul className="mt-4 space-y-2 text-sm text-slate-300">
            {stage.expected.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </article>
      ))}
    </div>
  );
}

function ChecklistSection() {
  return (
    <div className="rounded-3xl border border-white/10 bg-[#070f1a] p-6">
      <p className="text-xs font-semibold tracking-[0.24em] text-sky-400">CHECKLIST PRÉ LANÇAMENTO</p>
      <h3 className="mt-3 text-2xl font-semibold text-white">Risco operacional sob controle antes de ir para produção</h3>
      <ul className="mt-5 grid gap-3 md:grid-cols-2">
        {implementationChecklist.map((item, index) => (
          <li key={item} className="rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-3 text-sm text-slate-200">
            <span className="mr-2 text-sky-300">{index + 1}.</span>
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function Plataforma() {
  return (
    <main className="relative min-h-screen bg-[#02050b] text-white">
      <div className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[760px] bg-[radial-gradient(circle_at_78%_8%,rgba(14,165,233,0.18),transparent_30%),radial-gradient(circle_at_16%_20%,rgba(79,70,229,0.12),transparent_30%),linear-gradient(180deg,#07172d_0%,#02050b_82%)]" />
      <div className="absolute inset-x-0 top-16 -z-10 opacity-30 [background-image:linear-gradient(rgba(125,211,252,0.08)_1px,transparent_1px),linear-gradient(90deg,rgba(125,211,252,0.08)_1px,transparent_1px)] [background-size:56px_56px]" />

      <header className="sticky top-0 z-20 border-b border-white/10 bg-[#02050b]/70 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 sm:px-8 lg:px-10">
          <p className="text-sm font-black tracking-[0.18em] text-sky-300">VORZAX</p>
          <nav aria-label="Navegação da plataforma" className="hidden items-center gap-6 text-xs font-medium text-slate-400 lg:flex">
            <Link href="#arquitetura" className="transition hover:text-white">Arquitetura</Link>
            <Link href="#modulos" className="transition hover:text-white">Módulos</Link>
            <Link href="#roadmap" className="transition hover:text-white">Roadmap</Link>
            <Link href="#implementacao" className="transition hover:text-white">Implantação</Link>
          </nav>
          <Link href="/#contato" className="rounded-full bg-sky-400 px-4 py-2 text-xs font-bold text-[#020611] transition hover:bg-white">
            Solicitar diagnóstico
          </Link>
        </div>
      </header>

      <section className="relative border-b border-white/10">
        <div className="mx-auto grid max-w-7xl gap-10 px-6 py-20 lg:grid-cols-[1.08fr_0.92fr] lg:px-10 lg:py-24">
          <div>
            <p className="text-xs font-semibold tracking-[0.28em] text-sky-400">PLATAFORMA ENTERPRISE VORZAX</p>
            <h1 className="mt-6 text-balance text-5xl font-semibold leading-[0.96] tracking-[-0.07em]">
              Arquitetura de SaaS completa para empresa que precisa crescer sem travar
            </h1>
            <p className="mt-7 max-w-xl leading-8 text-slate-300">
              A plataforma parte de uma base única e escalável, com governança e trilhas de auditoria desde o primeiro acesso. Cada domínio conecta execução, dados, controles e indicadores para a empresa operar sem depender de planilhas isoladas.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a href="#modulos" className="rounded-full bg-white px-6 py-3 text-sm font-bold text-[#020611] transition hover:-translate-y-0.5 hover:bg-sky-300">
                Ver matriz de módulos
              </a>
              <Link href="/#contato" className="rounded-full border border-white/15 px-6 py-3 text-sm font-semibold text-white transition hover:bg-white/[0.08]">
                Marcar diagnóstico técnico
              </Link>
            </div>
            <div className="mt-10 grid grid-cols-3 gap-5 border-t border-white/10 pt-7 text-sm">
              <div>
                <p className="text-3xl font-semibold">{modules.length}</p>
                <p className="mt-1 text-slate-500">módulos e domínios conectados</p>
              </div>
              <div>
                <p className="text-3xl font-semibold">{architectureLayers.length}</p>
                <p className="mt-1 text-slate-500">camadas de arquitetura e governança</p>
              </div>
              <div>
                <p className="text-3xl font-semibold">1</p>
                <p className="mt-1 text-slate-500">fonte operacional de verdade</p>
              </div>
            </div>
          </div>

          <aside className="rounded-[34px] border border-white/10 bg-[#060f1f] p-6">
            <p className="text-xs font-semibold tracking-[0.24em] text-sky-300">PÚBLICO-ALVO</p>
            <p className="mt-4 text-2xl font-semibold leading-tight text-white">Empresas que precisam de software para operação contínua</p>
            <p className="mt-3 text-sm text-slate-400">
              Transportes, serviços técnicos, manutenção, logística e operação de campo, oficinas e empresas de serviços com ativos físicos.
            </p>
            <div className="mt-5 space-y-2">
              {[
                "SLA explícito por contrato e por cliente",
                "Custos por ordem e rentabilidade por ativo",
                "Escalabilidade com controle de risco e compliance",
              ].map((text) => (
                <p key={text} className="rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3 text-sm text-slate-200">
                  {text}
                </p>
              ))}
            </div>
          </aside>
        </div>
      </section>

      <section id="arquitetura" className="mx-auto max-w-7xl px-6 py-24 lg:px-10">
        <SectionHeader
          title="ARQUITETURA"
          subtitle="Camadas que sustentam operação previsível e crescimento real"
        />
        <div className="mt-9 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {architectureLayers.map((layer) => (
            <LayerCard key={layer.layer} {...layer} />
          ))}
        </div>
      </section>

      <section id="modulos" className="border-y border-white/10 bg-[#050a13]">
        <div className="mx-auto max-w-7xl px-6 py-24 lg:px-10">
          <SectionHeader title="MÓDULOS" subtitle="Matriz de módulos por maturidade e governança" />
          <p className="mt-5 max-w-2xl text-sm leading-7 text-slate-400">
            Cada linha mostra escopo mínimo (MVP) e escopo empresarial (Enterprise). O time decide a ordem de implantação por retorno de operação e risco.
          </p>
          <div className="mt-8">
            <ModuleTable />
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-24 lg:px-10">
        <SectionHeader title="COMPETITIVO" subtitle="Benchmark técnico incorporado aos pontos fortes" />
          <p className="mt-5 max-w-2xl text-sm leading-7 text-slate-400">
            O desenho incorpora padrões públicos de ERP e gestão de ativos presentes em SAP, TOTVS e Engeman, adaptados à realidade de pequenas e médias empresas e operações de médio porte.
          </p>
        <div className="mt-8">
          <BenchmarkPillars />
        </div>
      </section>

      <section id="roadmap" className="border-y border-white/10 bg-[#050a13]">
        <div className="mx-auto max-w-7xl px-6 py-24 lg:px-10">
          <SectionHeader title="ROADMAP DE IMPLANTAÇÃO" subtitle="Etapas com metas e critérios objetivos" />
          <p className="mt-5 max-w-3xl text-sm leading-7 text-slate-400">
            Estrutura recomendada para implantação sem rupturas operacionais. A cada fase são validados riscos, qualidade de dado e KPIs antes de avançar.
          </p>
          <div className="mt-8">
            <RoadmapSection />
          </div>
        </div>
      </section>

      <section id="implementacao" className="mx-auto max-w-7xl space-y-8 px-6 py-24 lg:px-10">
        <SectionHeader title="EXECUÇÃO" subtitle="Checklist de entrada em produção segura" />
        <ChecklistSection />
        <div className="rounded-3xl border border-white/10 bg-[#070f1a] p-6">
          <p className="text-sm leading-7 text-slate-300">
            A implantação começa por um diagnóstico de processos e dados. A partir dele, a Vorzax organiza metas por módulo, matriz de responsabilidades, critérios de aceite e janela de entrada em produção para transformar a arquitetura em operação real.
          </p>
          <Link href="/#contato" className="mt-6 inline-flex items-center justify-center rounded-full bg-sky-400 px-6 py-3 text-sm font-bold text-[#020611] transition hover:bg-white">
            Quero iniciar o plano técnico
          </Link>
        </div>
      </section>

      <footer className="border-t border-white/10">
        <div className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-3 px-6 py-8 text-sm text-slate-500 sm:flex-row sm:items-center lg:px-10">
          <span>© 2026 Vorzax Tecnologia</span>
          <div className="flex gap-6">
            <Link href="/" className="transition hover:text-white">Site</Link>
            <Link href="/privacidade" className="transition hover:text-white">Privacidade</Link>
          </div>
        </div>
      </footer>
    </main>
  );
}

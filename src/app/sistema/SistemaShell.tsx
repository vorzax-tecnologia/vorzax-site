"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { createClient } from "@/lib/supabase/client";
import type { FeatureItem, ModuleItem, Row, SystemPayload } from "./types";

const FALLBACK_MODULES: ModuleItem[] = [
  ["operacoes", "Operações", "Operação central"],
  ["frotas", "Frotas", "Veículos e mobilidade"],
  ["manutencao", "Manutenção", "Ativos e confiabilidade"],
  ["pessoas", "Pessoas", "Times e acessos"],
  ["financeiro", "Financeiro", "Fluxo e resultado"],
  ["indicadores", "Indicadores", "Gestão por dados"],
  ["documentos", "Documentos", "Governança documental"],
  ["integracoes", "Integrações", "Ecossistema conectado"],
  ["motores", "Motores", "Regras e automações"],
  ["crm", "CRM", "Relacionamento e vendas"],
  ["estoque", "Estoque", "Materiais e suprimentos"],
  ["almoxarifado", "Almoxarifado", "Movimentação física"],
  ["administracao", "Administração", "Configuração da empresa"],
].map(([module_key, name, caption], sort_order) => ({
  module_key,
  name,
  caption,
  description: null,
  icon: null,
  color: null,
  sort_order,
  status: "disponivel",
}));

const MODULE_META: Record<string, { eyebrow: string; description: string; accent: string }> = {
  operacoes: {
    eyebrow: "Central operacional",
    description: "Atendimentos, ordens, agenda, clientes e equipes em uma visão coordenada.",
    accent: "from-cyan-400 to-blue-500",
  },
  frotas: {
    eyebrow: "Gestão de mobilidade",
    description: "Controle utilização, documentação, condutores, rotas e disponibilidade da frota.",
    accent: "from-blue-400 to-indigo-500",
  },
  manutencao: {
    eyebrow: "Confiabilidade dos ativos",
    description: "Planeje preventivas, trate solicitações e acompanhe custos e indisponibilidade.",
    accent: "from-orange-400 to-amber-500",
  },
  pessoas: {
    eyebrow: "Gestão de pessoas",
    description: "Organize colaboradores, equipes, papéis, permissões e capacidade operacional.",
    accent: "from-violet-400 to-fuchsia-500",
  },
  financeiro: {
    eyebrow: "Controle financeiro",
    description: "Contas, lançamentos, centros de custo e fechamento com rastreabilidade.",
    accent: "from-emerald-400 to-teal-500",
  },
  indicadores: {
    eyebrow: "Inteligência gerencial",
    description: "KPIs, dashboards e relatórios para decisões rápidas e bem fundamentadas.",
    accent: "from-sky-400 to-violet-500",
  },
  documentos: {
    eyebrow: "Governança documental",
    description: "Centralize contratos, documentos, versões, responsáveis e vencimentos.",
    accent: "from-slate-300 to-slate-500",
  },
  integracoes: {
    eyebrow: "Ecossistema conectado",
    description: "Conectores, APIs e logs para integrar a Vorzax ao restante da operação.",
    accent: "from-pink-400 to-rose-500",
  },
  motores: {
    eyebrow: "Automação inteligente",
    description: "Regras, alertas e rotinas automáticas para reduzir trabalho manual e desvios.",
    accent: "from-amber-300 to-orange-500",
  },
  crm: {
    eyebrow: "Crescimento comercial",
    description: "Clientes, oportunidades, atividades e pipeline comercial em um fluxo único.",
    accent: "from-fuchsia-400 to-purple-500",
  },
  estoque: {
    eyebrow: "Gestão de suprimentos",
    description: "Saldos, movimentações, níveis mínimos, fornecedores e compras sob controle.",
    accent: "from-lime-400 to-emerald-500",
  },
  almoxarifado: {
    eyebrow: "Operação física",
    description: "Recebimentos, separações, retiradas, transferências e inventários rastreáveis.",
    accent: "from-teal-300 to-cyan-500",
  },
  administracao: {
    eyebrow: "Governança da conta",
    description: "Empresa, unidades, usuários, permissões, integrações e auditoria.",
    accent: "from-slate-300 to-blue-400",
  },
};

const DEFAULT_FEATURES: Record<string, string[]> = {
  operacoes: ["Visão geral", "Atendimento", "Ordens", "Agenda e rotas", "Clientes", "Equipe e ativos"],
  frotas: ["Visão geral", "Veículos", "Condutores", "Rotas", "Utilização", "Documentos", "Inspeções"],
  manutencao: ["Visão geral", "Solicitações", "Preventiva", "Inspeções", "Ordens", "Histórico", "Paradas", "Fornecedores"],
  pessoas: ["Visão geral", "Pessoas", "Equipes", "Permissões"],
  financeiro: ["Visão geral", "A receber", "A pagar", "Lançamentos", "Centros de custo", "Fechamento"],
  indicadores: ["Visão geral", "Dashboards", "KPIs", "Relatórios", "Exportações"],
  documentos: ["Visão geral", "Biblioteca", "Contratos", "Validades"],
  integracoes: ["Visão geral", "Conectores", "API", "Logs"],
  motores: ["Visão geral", "Regras", "Alertas", "Automações"],
  crm: ["Visão geral", "Leads", "Clientes", "Oportunidades", "Atividades", "Pipeline"],
  estoque: ["Visão geral", "Itens", "Saldos", "Movimentações", "Mínimos", "Fornecedores", "Compras"],
  almoxarifado: ["Visão geral", "Locais", "Recebimento", "Separação", "Retiradas", "Transferências", "Inventário"],
  administracao: ["Visão geral", "Empresa", "Unidades", "Usuários", "Permissões", "Integrações", "Auditoria"],
};

function text(row: Row, key: string, fallback = "—") {
  const value = row[key];
  return value === null || value === undefined || value === "" ? fallback : String(value);
}

function number(row: Row, key: string) {
  const value = Number(row[key] ?? 0);
  return Number.isFinite(value) ? value : 0;
}

function money(value: unknown) {
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
    maximumFractionDigits: 0,
  }).format(Number(value ?? 0));
}

function date(value: unknown) {
  if (!value) return "Sem data";
  const parsed = new Date(String(value));
  return Number.isNaN(parsed.getTime())
    ? String(value)
    : new Intl.DateTimeFormat("pt-BR", { day: "2-digit", month: "short" }).format(parsed);
}

function initials(value: string) {
  return value
    .split(/\s+/)
    .slice(0, 2)
    .map((part) => part[0])
    .join("")
    .toUpperCase();
}

function Icon({ name, className = "h-5 w-5" }: { name: string; className?: string }) {
  const paths: Record<string, React.ReactNode> = {
    operacoes: <><path d="M4 5h16v14H4z" /><path d="M4 10h16M9 10v9" /></>,
    frotas: <><path d="m5 16-1 2m15-2 1 2M5 16h14l-1-7H6l-1 7Z" /><circle cx="8" cy="16" r="1" /><circle cx="16" cy="16" r="1" /></>,
    manutencao: <><path d="m14 7 3-3 3 3-3 3M4 20l8-8" /><path d="M6 4a4 4 0 0 0 5 5" /></>,
    pessoas: <><circle cx="9" cy="8" r="3" /><path d="M3 20c0-4 2-6 6-6s6 2 6 6M16 5a3 3 0 0 1 0 6m1 3c2.6.4 4 2.4 4 6" /></>,
    financeiro: <><circle cx="12" cy="12" r="9" /><path d="M15 8.5c-.7-.7-1.6-1-3-1-1.7 0-3 .8-3 2s1 1.8 3 2.3c2 .5 3 1.1 3 2.3 0 1.3-1.3 2.2-3 2.2-1.5 0-2.7-.5-3.5-1.3M12 5v14" /></>,
    indicadores: <><path d="M4 19V9m5 10V5m5 14v-7m5 7V3" /></>,
    documentos: <><path d="M6 3h8l4 4v14H6z" /><path d="M14 3v5h5M9 13h6m-6 4h6" /></>,
    integracoes: <><path d="M8 12h8M6 7H4a3 3 0 0 0 0 6h2m12-6h2a3 3 0 0 1 0 6h-2" /><circle cx="8" cy="12" r="2" /><circle cx="16" cy="12" r="2" /></>,
    motores: <><path d="M12 3v3m0 12v3M3 12h3m12 0h3M5.6 5.6l2.1 2.1m8.6 8.6 2.1 2.1M18.4 5.6l-2.1 2.1m-8.6 8.6-2.1 2.1" /><circle cx="12" cy="12" r="4" /></>,
    crm: <><path d="M4 19V5h16v14z" /><path d="m7 14 3-3 2 2 5-5" /></>,
    estoque: <><path d="m4 8 8-4 8 4-8 4-8-4Z" /><path d="m4 8v8l8 4 8-4V8m-8 4v8" /></>,
    almoxarifado: <><path d="M3 21V8l9-5 9 5v13M7 21v-8h10v8M7 17h10" /></>,
    administracao: <><circle cx="12" cy="12" r="3" /><path d="M19.4 15a1.7 1.7 0 0 0 .3 1.9l.1.1-2.8 2.8-.1-.1a1.7 1.7 0 0 0-1.9-.3 1.7 1.7 0 0 0-1 1.6v.2h-4V21a1.7 1.7 0 0 0-1-1.6 1.7 1.7 0 0 0-1.9.3l-.1.1L4.2 17l.1-.1a1.7 1.7 0 0 0 .3-1.9A1.7 1.7 0 0 0 3 14H2.8v-4H3a1.7 1.7 0 0 0 1.6-1 1.7 1.7 0 0 0-.3-1.9L4.2 7 7 4.2l.1.1a1.7 1.7 0 0 0 1.9.3A1.7 1.7 0 0 0 10 3v-.2h4V3a1.7 1.7 0 0 0 1 1.6 1.7 1.7 0 0 0 1.9-.3l.1-.1L19.8 7l-.1.1a1.7 1.7 0 0 0-.3 1.9 1.7 1.7 0 0 0 1.6 1h.2v4H21a1.7 1.7 0 0 0-1.6 1Z" /></>,
    search: <><circle cx="11" cy="11" r="7" /><path d="m20 20-4-4" /></>,
    bell: <><path d="M18 8a6 6 0 0 0-12 0c0 7-3 7-3 9h18c0-2-3-2-3-9M10 21h4" /></>,
    menu: <path d="M4 7h16M4 12h16M4 17h16" />,
    close: <path d="m6 6 12 12M18 6 6 18" />,
    plus: <path d="M12 5v14M5 12h14" />,
    chevron: <path d="m9 18 6-6-6-6" />,
    logout: <><path d="M10 17l5-5-5-5m5 5H3" /><path d="M14 4h6v16h-6" /></>,
  };
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
      {paths[name] ?? paths.operacoes}
    </svg>
  );
}

function Status({ value }: { value: string }) {
  const normalized = value.toLowerCase();
  const style =
    /conclu|pago|ativo|aprov|aberto/.test(normalized)
      ? "border-emerald-400/20 bg-emerald-400/10 text-emerald-300"
      : /atras|cancel|crít|crit|rejeit/.test(normalized)
        ? "border-rose-400/20 bg-rose-400/10 text-rose-300"
        : "border-amber-400/20 bg-amber-400/10 text-amber-200";
  return <span className={`inline-flex rounded-full border px-2 py-1 text-[10px] font-semibold uppercase tracking-wide ${style}`}>{value || "Pendente"}</span>;
}

function Card({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return <section className={`rounded-2xl border border-white/[.07] bg-[#0b1220]/80 shadow-[0_18px_55px_rgba(0,0,0,.16)] ${className}`}>{children}</section>;
}

function MetricCard({ label, value, detail, tone }: { label: string; value: string; detail: string; tone: string }) {
  return (
    <Card className="group overflow-hidden p-5">
      <div className={`mb-5 h-1 w-11 rounded-full bg-gradient-to-r ${tone}`} />
      <p className="text-xs font-medium uppercase tracking-[.12em] text-slate-500">{label}</p>
      <p className="mt-2 text-3xl font-semibold tracking-[-.04em] text-white">{value}</p>
      <p className="mt-2 text-xs text-slate-500">{detail}</p>
    </Card>
  );
}

function EmptyState({ label }: { label: string }) {
  return (
    <div className="grid min-h-52 place-items-center p-8 text-center">
      <div>
        <div className="mx-auto grid h-11 w-11 place-items-center rounded-xl border border-white/10 bg-white/[.03] text-slate-500">
          <Icon name="indicadores" />
        </div>
        <p className="mt-4 text-sm font-medium text-slate-300">Nenhum registro em {label}</p>
        <p className="mt-1 text-xs leading-5 text-slate-600">Os novos dados aparecerão aqui automaticamente.</p>
      </div>
    </div>
  );
}

function DataTable({ columns, rows, empty }: { columns: { label: string; render: (row: Row) => React.ReactNode }[]; rows: Row[]; empty: string }) {
  if (!rows.length) return <EmptyState label={empty} />;
  return (
    <div className="overflow-x-auto">
      <table className="w-full min-w-[650px] text-left">
        <thead>
          <tr className="border-b border-white/[.06] text-[10px] uppercase tracking-[.14em] text-slate-600">
            {columns.map((column) => <th key={column.label} className="px-5 py-4 font-semibold">{column.label}</th>)}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, index) => (
            <tr key={String(row.id ?? index)} className="border-b border-white/[.045] text-sm last:border-0 hover:bg-white/[.025]">
              {columns.map((column) => <td key={column.label} className="px-5 py-4 text-slate-300">{column.render(row)}</td>)}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function ModuleContent({ moduleKey, payload }: { moduleKey: string; payload: SystemPayload }) {
  const { data } = payload;
  if (moduleKey === "operacoes") {
    return (
      <div className="grid gap-5 xl:grid-cols-[1.45fr_.75fr]">
        <Card>
          <Header title="Atendimentos recentes" caption="Conversas e solicitações recebidas em todos os canais" />
          <DataTable empty="atendimentos" rows={data.conversations} columns={[
            { label: "Contato", render: (r) => <div><p className="font-medium text-white">{text(r, "contact_name")}</p><p className="mt-1 text-xs text-slate-600">{text(r, "channel", "Canal não informado")}</p></div> },
            { label: "Assunto", render: (r) => text(r, "subject") },
            { label: "Região", render: (r) => text(r, "region") },
            { label: "Status", render: (r) => <Status value={text(r, "status", "Aberto")} /> },
            { label: "Atualização", render: (r) => date(r.updated_at) },
          ]} />
        </Card>
        <AlertPanel alerts={data.alerts} />
      </div>
    );
  }

  if (moduleKey === "manutencao") {
    return (
      <Card>
        <Header title="Ordens de manutenção" caption="Prioridades, ativos, custos e execução" />
        <DataTable empty="ordens de manutenção" rows={data.workOrders} columns={[
          { label: "Ordem", render: (r) => <div><p className="font-medium text-white">{text(r, "order_number", `#${text(r, "id")}`)}</p><p className="mt-1 text-xs text-slate-600">{text(r, "title")}</p></div> },
          { label: "Ativo", render: (r) => text(r, "asset") },
          { label: "Prioridade", render: (r) => <Status value={text(r, "priority", "Normal")} /> },
          { label: "Status", render: (r) => text(r, "status") },
          { label: "Programada", render: (r) => date(r.scheduled_for) },
          { label: "Custo", render: (r) => money(r.actual_cost ?? r.cost) },
        ]} />
      </Card>
    );
  }

  if (moduleKey === "crm") {
    return (
      <div className="grid gap-5 xl:grid-cols-2">
        <Card>
          <Header title="Oportunidades" caption="Pipeline comercial por estágio" />
          <DataTable empty="oportunidades" rows={data.opportunities} columns={[
            { label: "Oportunidade", render: (r) => <span className="font-medium text-white">{text(r, "title")}</span> },
            { label: "Etapa", render: (r) => <Status value={text(r, "stage", "Nova")} /> },
            { label: "Valor", render: (r) => money(r.amount) },
            { label: "Fechamento", render: (r) => date(r.expected_close_date) },
          ]} />
        </Card>
        <Card>
          <Header title="Carteira de clientes" caption="Relacionamentos ativos e potencial de receita" />
          <DataTable empty="clientes" rows={data.customers} columns={[
            { label: "Cliente", render: (r) => <div><p className="font-medium text-white">{text(r, "trade_name", text(r, "name"))}</p><p className="mt-1 text-xs text-slate-600">{text(r, "segment", "Sem segmento")}</p></div> },
            { label: "Cidade", render: (r) => text(r, "city") },
            { label: "Contrato", render: (r) => <Status value={text(r, "contract_status", text(r, "status", "Ativo"))} /> },
          ]} />
        </Card>
      </div>
    );
  }

  if (moduleKey === "financeiro") {
    return (
      <Card>
        <Header title="Movimentação financeira" caption="Receitas, despesas e vencimentos mais recentes" />
        <DataTable empty="lançamentos financeiros" rows={data.financialEntries} columns={[
          { label: "Descrição", render: (r) => <div><p className="font-medium text-white">{text(r, "description")}</p><p className="mt-1 text-xs text-slate-600">{text(r, "category", "Sem categoria")}</p></div> },
          { label: "Tipo", render: (r) => text(r, "entry_type") },
          { label: "Centro de custo", render: (r) => text(r, "cost_center") },
          { label: "Vencimento", render: (r) => date(r.due_date) },
          { label: "Status", render: (r) => <Status value={text(r, "status", "Pendente")} /> },
          { label: "Valor", render: (r) => <span className="font-medium text-white">{money(r.amount)}</span> },
        ]} />
      </Card>
    );
  }

  if (moduleKey === "frotas") {
    return (
      <Card>
        <Header title="Frota ativa" caption="Disponibilidade e leitura operacional dos veículos" />
        <DataTable empty="veículos" rows={data.vehicles} columns={[
          { label: "Veículo", render: (r) => <div><p className="font-medium text-white">{text(r, "plate")}</p><p className="mt-1 text-xs text-slate-600">{text(r, "model")}</p></div> },
          { label: "Categoria", render: (r) => text(r, "category") },
          { label: "Ano", render: (r) => text(r, "year") },
          { label: "Odômetro", render: (r) => `${number(r, "odometer").toLocaleString("pt-BR")} km` },
          { label: "Status", render: (r) => <Status value={text(r, "status", "Ativo")} /> },
        ]} />
      </Card>
    );
  }

  if (moduleKey === "estoque" || moduleKey === "almoxarifado") {
    return (
      <div className="grid gap-5 xl:grid-cols-[1.35fr_.65fr]">
        <Card>
          <Header title="Posição de estoque" caption="Saldo, custo e ponto de reposição" />
          <DataTable empty="itens de estoque" rows={data.inventoryItems} columns={[
            { label: "Item", render: (r) => <div><p className="font-medium text-white">{text(r, "name")}</p><p className="mt-1 text-xs text-slate-600">{text(r, "sku")}</p></div> },
            { label: "Categoria", render: (r) => text(r, "category") },
            { label: "Saldo", render: (r) => <span className={number(r, "quantity") <= number(r, "minimum_quantity") ? "font-semibold text-amber-300" : "text-white"}>{number(r, "quantity")} {text(r, "unit", "un")}</span> },
            { label: "Mínimo", render: (r) => `${number(r, "minimum_quantity")} ${text(r, "unit", "un")}` },
            { label: "Custo unitário", render: (r) => money(r.unit_cost) },
          ]} />
        </Card>
        <Card>
          <Header title="Compras em andamento" caption="Pedidos e aprovações" />
          <div className="space-y-2 px-5 pb-5">
            {data.purchaseOrders.length ? data.purchaseOrders.slice(0, 6).map((row, index) => (
              <div key={String(row.id ?? index)} className="rounded-xl border border-white/[.06] bg-white/[.025] p-4">
                <div className="flex items-center justify-between gap-3">
                  <p className="text-sm font-medium text-white">{text(row, "order_number", `Pedido #${text(row, "id")}`)}</p>
                  <Status value={text(row, "status", "Pendente")} />
                </div>
                <div className="mt-3 flex justify-between text-xs text-slate-500"><span>{date(row.expected_date)}</span><span>{money(row.total)}</span></div>
              </div>
            )) : <EmptyState label="pedidos de compra" />}
          </div>
        </Card>
      </div>
    );
  }

  const features = DEFAULT_FEATURES[moduleKey] ?? ["Visão geral", "Processos", "Relatórios"];
  return (
    <div className="grid gap-5 lg:grid-cols-3">
      {features.slice(1).map((feature, index) => (
        <Card key={feature} className="p-5">
          <div className="flex items-start justify-between gap-4">
            <div className="grid h-10 w-10 place-items-center rounded-xl bg-white/[.04] text-cyan-300">
              <Icon name={moduleKey} />
            </div>
            <span className="rounded-full bg-white/[.04] px-2 py-1 text-[10px] text-slate-500">FLUXO {String(index + 1).padStart(2, "0")}</span>
          </div>
          <h3 className="mt-5 font-semibold text-white">{feature}</h3>
          <p className="mt-2 text-sm leading-6 text-slate-500">
            Acompanhe responsáveis, status, prazos e histórico deste processo.
          </p>
          <button className="mt-5 inline-flex items-center gap-2 text-xs font-semibold text-cyan-300 hover:text-cyan-200">
            Acessar processo <Icon name="chevron" className="h-3.5 w-3.5" />
          </button>
        </Card>
      ))}
    </div>
  );
}

function Header({ title, caption }: { title: string; caption: string }) {
  return (
    <div className="flex items-start justify-between gap-4 border-b border-white/[.06] px-5 py-5">
      <div>
        <h3 className="font-semibold text-white">{title}</h3>
        <p className="mt-1 text-xs text-slate-500">{caption}</p>
      </div>
      <button aria-label={`Opções de ${title}`} className="rounded-lg px-2 text-lg text-slate-600 hover:bg-white/[.04] hover:text-white">•••</button>
    </div>
  );
}

function AlertPanel({ alerts }: { alerts: Row[] }) {
  return (
    <Card>
      <Header title="Central de alertas" caption="Itens que exigem atenção" />
      <div className="space-y-1 p-3">
        {alerts.length ? alerts.slice(0, 6).map((row, index) => (
          <div key={String(row.id ?? index)} className="flex gap-3 rounded-xl p-3 hover:bg-white/[.03]">
            <span className={`mt-1 h-2 w-2 shrink-0 rounded-full ${/crit|high|alta/i.test(text(row, "severity")) ? "bg-rose-400 shadow-[0_0_12px_#fb7185]" : "bg-amber-300"}`} />
            <div className="min-w-0">
              <p className="truncate text-sm font-medium text-slate-200">{text(row, "title")}</p>
              <p className="mt-1 line-clamp-2 text-xs leading-5 text-slate-600">{text(row, "description")}</p>
            </div>
          </div>
        )) : <EmptyState label="alertas" />}
      </div>
    </Card>
  );
}

export default function SistemaShell({ payload }: { payload: SystemPayload }) {
  const modules = payload.modules.length ? payload.modules : FALLBACK_MODULES;
  const [activeModule, setActiveModule] = useState(modules[0]?.module_key ?? "operacoes");
  const [activeFeature, setActiveFeature] = useState("overview");
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [profileOpen, setProfileOpen] = useState(false);

  const currentModule = modules.find((module) => module.module_key === activeModule) ?? modules[0];
  const meta = MODULE_META[activeModule] ?? MODULE_META.operacoes;
  const dbFeatures = payload.features.filter((feature) => feature.module_key === activeModule);
  const features: FeatureItem[] = dbFeatures.length
    ? dbFeatures
    : (DEFAULT_FEATURES[activeModule] ?? ["Visão geral"]).map((name, index) => ({
        module_key: activeModule,
        feature_key: index === 0 ? "overview" : name.toLowerCase().replaceAll(" ", "_"),
        name,
        description: null,
        icon: null,
        sort_order: index,
      }));

  const metrics = useMemo(() => {
    const { data } = payload;
    const financeTotal = data.financialEntries.reduce((sum, row) => sum + number(row, "amount"), 0);
    const stockAlerts = data.inventoryItems.filter((row) => number(row, "quantity") <= number(row, "minimum_quantity")).length;
    const opportunityTotal = data.opportunities.reduce((sum, row) => sum + number(row, "amount"), 0);
    const map: Record<string, [string, string, string][]> = {
      operacoes: [
        ["Atendimentos", String(data.conversations.length), "janela de atividade recente"],
        ["Ordens abertas", String(data.workOrders.filter((r) => !/conclu|cancel/i.test(text(r, "status"))).length), "demandas em execução"],
        ["Agenda", String(data.appointments.length), "compromissos programados"],
        ["Alertas", String(data.alerts.filter((r) => !/resol/i.test(text(r, "status"))).length), "pendências monitoradas"],
      ],
      manutencao: [
        ["Ordens", String(data.workOrders.length), "ordens recentes"],
        ["Solicitações", String(data.maintenanceRequests.length), "pedidos em acompanhamento"],
        ["Custo realizado", money(data.workOrders.reduce((s, r) => s + number(r, "actual_cost"), 0)), "na amostra atual"],
        ["Indisponibilidade", `${data.workOrders.reduce((s, r) => s + number(r, "downtime_hours"), 0)}h`, "horas registradas"],
      ],
      crm: [
        ["Clientes", String(data.customers.length), "carteira recente"],
        ["Oportunidades", String(data.opportunities.length), "negócios no pipeline"],
        ["Pipeline", money(opportunityTotal), "valor potencial"],
        ["Conversão média", `${data.opportunities.length ? Math.round(data.opportunities.reduce((s, r) => s + number(r, "probability"), 0) / data.opportunities.length) : 0}%`, "probabilidade registrada"],
      ],
      financeiro: [
        ["Lançamentos", String(data.financialEntries.length), "janela atual"],
        ["Movimentado", money(financeTotal), "valor registrado"],
        ["Pendências", String(data.financialEntries.filter((r) => !/pago|conclu/i.test(text(r, "status"))).length), "aguardando liquidação"],
        ["Centros de custo", String(new Set(data.financialEntries.map((r) => r.cost_center).filter(Boolean)).size), "áreas com movimento"],
      ],
      frotas: [
        ["Veículos", String(data.vehicles.length), "itens monitorados"],
        ["Disponíveis", String(data.vehicles.filter((r) => /ativo|dispon/i.test(text(r, "status"))).length), "prontos para operar"],
        ["Em manutenção", String(data.vehicles.filter((r) => /manut/i.test(text(r, "status"))).length), "indisponíveis"],
        ["Odômetro", `${data.vehicles.reduce((s, r) => s + number(r, "odometer"), 0).toLocaleString("pt-BR")} km`, "leitura consolidada"],
      ],
      estoque: [
        ["Itens", String(data.inventoryItems.length), "SKUs monitorados"],
        ["Abaixo do mínimo", String(stockAlerts), "necessitam reposição"],
        ["Valor em estoque", money(data.inventoryItems.reduce((s, r) => s + number(r, "quantity") * number(r, "unit_cost"), 0)), "custo estimado"],
        ["Compras", String(data.purchaseOrders.length), "pedidos recentes"],
      ],
    };
    return map[activeModule] ?? [
      ["Processos ativos", String(features.length - 1), "frentes configuradas"],
      ["Pendências", String(payload.data.alerts.length), "alertas relacionados"],
      ["Cobertura", "100%", "estrutura disponível"],
      ["Atualização", "Agora", "dados sincronizados"],
    ];
  }, [activeModule, features.length, payload]);

  const searchResults = useMemo(() => {
    const term = search.trim().toLowerCase();
    if (!term) return modules;
    return modules.filter((module) =>
      `${module.name} ${module.caption ?? ""} ${module.description ?? ""}`.toLowerCase().includes(term),
    );
  }, [modules, search]);

  async function signOut() {
    await createClient().auth.signOut();
    window.location.assign("/sistema/login");
  }

  function chooseModule(moduleKey: string) {
    setActiveModule(moduleKey);
    setActiveFeature("overview");
    setDrawerOpen(false);
    setSearchOpen(false);
  }

  return (
    <main className="min-h-screen bg-[#050914] text-white">
      <div className="pointer-events-none fixed inset-0 bg-[radial-gradient(circle_at_74%_0%,rgba(14,165,233,.07),transparent_27%)]" />

      {drawerOpen && <button aria-label="Fechar menu" onClick={() => setDrawerOpen(false)} className="fixed inset-0 z-40 bg-black/65 backdrop-blur-sm lg:hidden" />}
      <aside className={`fixed inset-y-0 left-0 z-50 flex w-[276px] flex-col border-r border-white/[.065] bg-[#080d18]/95 backdrop-blur-xl transition-transform lg:translate-x-0 ${drawerOpen ? "translate-x-0" : "-translate-x-full"}`}>
        <div className="flex h-[76px] items-center justify-between border-b border-white/[.06] px-5">
          <Link href="/" className="flex items-center gap-3">
            <div className="grid h-9 w-9 place-items-center rounded-xl bg-gradient-to-br from-cyan-400 to-blue-600 shadow-lg shadow-blue-500/20">
              <span className="text-lg font-black italic">V</span>
            </div>
            <div><p className="font-semibold tracking-tight">Vorzax</p><p className="text-[9px] font-semibold uppercase tracking-[.22em] text-cyan-300">Business OS</p></div>
          </Link>
          <button onClick={() => setDrawerOpen(false)} className="text-slate-500 lg:hidden"><Icon name="close" /></button>
        </div>

        <div className="border-b border-white/[.06] p-4">
          <button onClick={() => setSearchOpen(true)} className="flex h-10 w-full items-center gap-3 rounded-xl border border-white/[.07] bg-white/[.025] px-3 text-left text-xs text-slate-500 hover:border-white/15 hover:text-slate-300">
            <Icon name="search" className="h-4 w-4" /><span className="flex-1">Buscar módulo...</span><kbd className="rounded border border-white/10 px-1.5 py-0.5 text-[9px]">⌘ K</kbd>
          </button>
        </div>

        <nav className="flex-1 overflow-y-auto px-3 py-4">
          <p className="px-3 pb-2 text-[9px] font-bold uppercase tracking-[.18em] text-slate-700">Plataforma</p>
          <div className="space-y-1">
            {modules.map((module) => {
              const active = module.module_key === activeModule;
              return (
                <button key={module.module_key} onClick={() => chooseModule(module.module_key)} className={`group flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left transition ${active ? "bg-gradient-to-r from-cyan-500/15 to-blue-500/5 text-white ring-1 ring-cyan-400/15" : "text-slate-500 hover:bg-white/[.035] hover:text-slate-200"}`}>
                  <span className={`grid h-8 w-8 shrink-0 place-items-center rounded-lg ${active ? "bg-cyan-400/10 text-cyan-300" : "bg-white/[.025] text-slate-600 group-hover:text-slate-400"}`}><Icon name={module.module_key} className="h-[17px] w-[17px]" /></span>
                  <span className="min-w-0 flex-1"><span className="block truncate text-[13px] font-medium">{module.name}</span><span className="block truncate text-[10px] text-slate-700">{module.caption}</span></span>
                  {active && <span className="h-1.5 w-1.5 rounded-full bg-cyan-300 shadow-[0_0_10px_#67e8f9]" />}
                </button>
              );
            })}
          </div>
        </nav>

        <div className="border-t border-white/[.06] p-3">
          <button onClick={() => setProfileOpen((value) => !value)} className="flex w-full items-center gap-3 rounded-xl p-2 text-left hover:bg-white/[.035]">
            <span className="grid h-9 w-9 place-items-center rounded-xl bg-gradient-to-br from-slate-700 to-slate-900 text-xs font-bold text-slate-200">{initials(payload.user.name)}</span>
            <span className="min-w-0 flex-1"><span className="block truncate text-xs font-medium text-slate-200">{payload.user.name}</span><span className="block truncate text-[10px] text-slate-600">{payload.organization.role}</span></span>
            <span className="text-slate-700">•••</span>
          </button>
          {profileOpen && (
            <div className="mb-2 mt-2 rounded-xl border border-white/[.07] bg-[#0c1322] p-2">
              {payload.isPlatformAdmin && <Link href="/central" className="flex items-center gap-2 rounded-lg px-3 py-2 text-xs text-slate-300 hover:bg-white/[.04]"><Icon name="administracao" className="h-4 w-4" /> Central administrativa</Link>}
              <button onClick={signOut} className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-xs text-rose-300 hover:bg-rose-400/10"><Icon name="logout" className="h-4 w-4" /> Sair da conta</button>
            </div>
          )}
        </div>
      </aside>

      <div className="relative lg:pl-[276px]">
        <header className="sticky top-0 z-30 flex h-[76px] items-center justify-between border-b border-white/[.06] bg-[#050914]/85 px-4 backdrop-blur-xl sm:px-6 lg:px-8">
          <div className="flex min-w-0 items-center gap-3">
            <button onClick={() => setDrawerOpen(true)} className="grid h-10 w-10 place-items-center rounded-xl border border-white/10 text-slate-400 lg:hidden"><Icon name="menu" /></button>
            <div className="min-w-0">
              <p className="truncate text-sm font-semibold text-white">{payload.organization.name}</p>
              <div className="mt-1 flex items-center gap-1.5 text-[10px] text-slate-600"><span className="h-1.5 w-1.5 rounded-full bg-emerald-400" /> Ambiente operacional</div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button onClick={() => setSearchOpen(true)} className="hidden h-9 items-center gap-2 rounded-xl border border-white/[.07] bg-white/[.025] px-3 text-xs text-slate-500 hover:text-white sm:flex"><Icon name="search" className="h-4 w-4" /> Buscar</button>
            <button aria-label="Notificações" className="relative grid h-9 w-9 place-items-center rounded-xl border border-white/[.07] bg-white/[.025] text-slate-500 hover:text-white"><Icon name="bell" className="h-[18px] w-[18px]" />{payload.data.alerts.length > 0 && <span className="absolute right-2 top-2 h-1.5 w-1.5 rounded-full bg-rose-400 ring-2 ring-[#050914]" />}</button>
            <button className="hidden h-9 items-center gap-2 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 px-4 text-xs font-semibold shadow-lg shadow-blue-600/15 hover:brightness-110 sm:flex"><Icon name="plus" className="h-4 w-4" /> Nova ação</button>
          </div>
        </header>

        <div className="mx-auto max-w-[1600px] px-4 py-6 sm:px-6 lg:px-8 lg:py-8">
          <div className="flex flex-col justify-between gap-5 xl:flex-row xl:items-end">
            <div>
              <div className="flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[.18em] text-cyan-400"><span className={`h-1.5 w-8 rounded-full bg-gradient-to-r ${meta.accent}`} /> {meta.eyebrow}</div>
              <h1 className="mt-3 text-3xl font-semibold tracking-[-.035em] text-white sm:text-4xl">{currentModule?.name}</h1>
              <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-500">{currentModule?.description || meta.description}</p>
            </div>
            <div className="flex items-center gap-2 text-xs text-slate-600"><span>Atualizado agora</span><button className="rounded-lg border border-white/[.07] px-3 py-2 text-slate-400 hover:text-white">Atualizar</button></div>
          </div>

          <div className="mt-7 flex gap-1 overflow-x-auto border-b border-white/[.06] pb-px">
            {features.map((feature) => (
              <button key={feature.feature_key} onClick={() => setActiveFeature(feature.feature_key)} className={`relative shrink-0 px-3 pb-3 text-xs font-medium transition ${activeFeature === feature.feature_key ? "text-cyan-300" : "text-slate-600 hover:text-slate-300"}`}>
                {feature.name}
                {activeFeature === feature.feature_key && <span className="absolute inset-x-2 bottom-0 h-px bg-cyan-300 shadow-[0_0_8px_#67e8f9]" />}
              </button>
            ))}
          </div>

          <div className="mt-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            {metrics.map(([label, value, detail], index) => <MetricCard key={label} label={label} value={value} detail={detail} tone={[meta.accent, "from-violet-400 to-fuchsia-500", "from-emerald-400 to-teal-500", "from-amber-300 to-orange-500"][index]} />)}
          </div>

          <div className="mt-5">
            <ModuleContent moduleKey={activeModule} payload={payload} />
          </div>
        </div>
      </div>

      {searchOpen && (
        <div className="fixed inset-0 z-[80] flex justify-center bg-black/70 px-4 pt-[10vh] backdrop-blur-sm" onMouseDown={() => setSearchOpen(false)}>
          <div onMouseDown={(event) => event.stopPropagation()} className="h-fit w-full max-w-xl overflow-hidden rounded-2xl border border-white/10 bg-[#0b1220] shadow-2xl shadow-black/60">
            <div className="flex items-center gap-3 border-b border-white/[.07] px-4"><Icon name="search" className="h-5 w-5 text-slate-500" /><input autoFocus value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Buscar módulo ou processo..." className="h-14 flex-1 bg-transparent text-sm text-white outline-none placeholder:text-slate-600" /><button onClick={() => setSearchOpen(false)} className="rounded-md border border-white/10 px-2 py-1 text-[10px] text-slate-500">ESC</button></div>
            <div className="max-h-[55vh] overflow-y-auto p-2">
              {searchResults.map((module) => <button key={module.module_key} onClick={() => chooseModule(module.module_key)} className="flex w-full items-center gap-3 rounded-xl p-3 text-left hover:bg-white/[.04]"><span className="grid h-9 w-9 place-items-center rounded-xl bg-white/[.035] text-cyan-300"><Icon name={module.module_key} className="h-4 w-4" /></span><span className="flex-1"><span className="block text-sm font-medium text-slate-200">{module.name}</span><span className="mt-1 block text-xs text-slate-600">{module.caption}</span></span><Icon name="chevron" className="h-4 w-4 text-slate-700" /></button>)}
              {!searchResults.length && <EmptyState label="resultados" />}
            </div>
          </div>
        </div>
      )}
    </main>
  );
}

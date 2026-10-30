"use client";

import { useMemo, useState, useTransition } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { reviewModuleRequest } from "./actions";

export type CentralRow = Record<string, unknown>;
export type CentralPayload = {
  admin: { id: string; name: string; role: string };
  organizations: CentralRow[];
  memberships: CentralRow[];
  organizationModules: CentralRow[];
  requests: CentralRow[];
  catalog: CentralRow[];
  auditLogs: CentralRow[];
};

function value(row: CentralRow, key: string, fallback = "—") {
  const result = row[key];
  return result === null || result === undefined || result === "" ? fallback : String(result);
}

function date(valueToFormat: unknown, withTime = false) {
  if (!valueToFormat) return "—";
  const parsed = new Date(String(valueToFormat));
  if (Number.isNaN(parsed.getTime())) return String(valueToFormat);
  return new Intl.DateTimeFormat("pt-BR", {
    day: "2-digit",
    month: "short",
    ...(withTime ? { hour: "2-digit", minute: "2-digit" } : {}),
  }).format(parsed);
}

function Icon({ name, className = "h-5 w-5" }: { name: string; className?: string }) {
  const paths: Record<string, React.ReactNode> = {
    overview: <><path d="M4 4h6v6H4zM14 4h6v6h-6zM4 14h6v6H4zM14 14h6v6h-6z" /></>,
    companies: <><path d="M4 21V6l8-3 8 3v15M8 9h2m4 0h2M8 13h2m4 0h2M8 17h2m4 0h2" /></>,
    modules: <><path d="m4 7 8-4 8 4-8 4-8-4Z" /><path d="m4 12 8 4 8-4M4 17l8 4 8-4" /></>,
    requests: <><path d="M5 4h14v16H5z" /><path d="M8 9h8M8 13h5" /></>,
    audit: <><path d="M12 3 4 6v6c0 5 3.5 8 8 9 4.5-1 8-4 8-9V6l-8-3Z" /><path d="m9 12 2 2 4-4" /></>,
    search: <><circle cx="11" cy="11" r="7" /><path d="m20 20-4-4" /></>,
    bell: <><path d="M18 8a6 6 0 0 0-12 0c0 7-3 7-3 9h18c0-2-3-2-3-9M10 21h4" /></>,
    plus: <path d="M12 5v14M5 12h14" />,
    logout: <><path d="M10 17l5-5-5-5m5 5H3" /><path d="M14 4h6v16h-6" /></>,
    arrow: <path d="m9 18 6-6-6-6" />,
  };
  return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">{paths[name] ?? paths.overview}</svg>;
}

function Status({ status }: { status: string }) {
  const normalized = status.toLowerCase();
  const style = /active|ativo|approved|aprovado/.test(normalized)
    ? "bg-emerald-400/10 text-emerald-300 border-emerald-400/20"
    : /blocked|suspended|rejected|inativo|cancel/.test(normalized)
      ? "bg-rose-400/10 text-rose-300 border-rose-400/20"
      : "bg-amber-400/10 text-amber-200 border-amber-400/20";
  const labels: Record<string, string> = {
    active: "Ativo", pending: "Pendente", approved: "Aprovado", rejected: "Recusado",
    suspended: "Suspenso", onboarding: "Implantação", available: "Disponível",
  };
  return <span className={`inline-flex rounded-full border px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wide ${style}`}>{labels[normalized] ?? status}</span>;
}

function Panel({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return <section className={`rounded-2xl border border-white/[.07] bg-[#0b1220]/80 shadow-[0_18px_50px_rgba(0,0,0,.14)] ${className}`}>{children}</section>;
}

function SectionHeader({ title, subtitle, action }: { title: string; subtitle: string; action?: React.ReactNode }) {
  return <div className="flex items-start justify-between gap-4 border-b border-white/[.06] px-5 py-5"><div><h2 className="font-semibold text-white">{title}</h2><p className="mt-1 text-xs text-slate-500">{subtitle}</p></div>{action}</div>;
}

export default function CentralShell({ payload }: { payload: CentralPayload }) {
  const router = useRouter();
  const [active, setActive] = useState("overview");
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [feedback, setFeedback] = useState("");
  const [isPending, startTransition] = useTransition();

  const membersByOrg = useMemo(() => {
    const map = new Map<string, number>();
    payload.memberships.forEach((member) => {
      const id = value(member, "organization_id", "");
      map.set(id, (map.get(id) ?? 0) + 1);
    });
    return map;
  }, [payload.memberships]);

  const modulesByOrg = useMemo(() => {
    const map = new Map<string, number>();
    payload.organizationModules.forEach((item) => {
      if (!/active|ativo/i.test(value(item, "status", "active"))) return;
      const id = value(item, "organization_id", "");
      map.set(id, (map.get(id) ?? 0) + 1);
    });
    return map;
  }, [payload.organizationModules]);

  const filteredOrganizations = useMemo(() => {
    const term = search.toLowerCase().trim();
    return payload.organizations.filter((organization) => {
      const matchesSearch = !term || `${value(organization, "name")} ${value(organization, "trade_name")} ${value(organization, "document")} ${value(organization, "city")}`.toLowerCase().includes(term);
      const status = value(organization, "status", "active").toLowerCase();
      return matchesSearch && (statusFilter === "all" || status === statusFilter);
    });
  }, [payload.organizations, search, statusFilter]);

  const orgName = (id: unknown) => {
    const organization = payload.organizations.find((item) => item.id === id);
    return organization ? value(organization, "trade_name", value(organization, "name")) : "Organização";
  };
  const moduleName = (key: unknown) => {
    const catalogItem = payload.catalog.find((item) => item.module_key === key);
    return catalogItem ? value(catalogItem, "name") : String(key ?? "Módulo");
  };

  const pendingRequests = payload.requests.filter((request) => value(request, "status", "pending") === "pending");
  const activeOrganizations = payload.organizations.filter((organization) => /active|ativo/.test(value(organization, "status", "active").toLowerCase())).length;
  const averageModules = payload.organizations.length
    ? (payload.organizationModules.length / payload.organizations.length).toFixed(1)
    : "0";

  async function signOut() {
    await createClient().auth.signOut();
    window.location.assign("/sistema/login");
  }

  function review(request: CentralRow, decision: "approved" | "rejected") {
    setFeedback("");
    startTransition(async () => {
      const result = await reviewModuleRequest({
        requestId: value(request, "id", ""),
        organizationId: value(request, "organization_id", ""),
        moduleKey: value(request, "module_key", ""),
        decision,
      });
      setFeedback(result.message);
      if (result.ok) router.refresh();
    });
  }

  const nav = [
    ["overview", "Visão geral"],
    ["companies", "Empresas"],
    ["modules", "Módulos"],
    ["requests", "Solicitações"],
    ["audit", "Auditoria"],
  ];

  return (
    <main className="min-h-screen bg-[#050914] text-white">
      <div className="fixed inset-0 pointer-events-none bg-[radial-gradient(circle_at_80%_0%,rgba(37,99,235,.08),transparent_28%)]" />
      <aside className="fixed inset-y-0 left-0 z-40 hidden w-[252px] flex-col border-r border-white/[.065] bg-[#080d18]/95 lg:flex">
        <div className="flex h-[76px] items-center border-b border-white/[.06] px-5">
          <Link href="/" className="flex items-center gap-3">
            <div className="grid h-9 w-9 place-items-center rounded-xl bg-gradient-to-br from-blue-400 to-indigo-600 font-black italic shadow-lg shadow-blue-500/20">V</div>
            <div><p className="font-semibold">Vorzax</p><p className="text-[9px] font-semibold uppercase tracking-[.2em] text-blue-300">Control Center</p></div>
          </Link>
        </div>
        <div className="p-3 pt-5">
          <p className="px-3 pb-3 text-[9px] font-bold uppercase tracking-[.18em] text-slate-700">Administração</p>
          <nav className="space-y-1">
            {nav.map(([key, label]) => <button key={key} onClick={() => setActive(key)} className={`flex w-full items-center gap-3 rounded-xl px-3 py-3 text-left text-sm transition ${active === key ? "bg-blue-500/10 text-white ring-1 ring-blue-400/15" : "text-slate-500 hover:bg-white/[.035] hover:text-slate-200"}`}><Icon name={key} className={`h-[18px] w-[18px] ${active === key ? "text-blue-300" : ""}`} /><span className="flex-1">{label}</span>{key === "requests" && pendingRequests.length > 0 && <span className="grid h-5 min-w-5 place-items-center rounded-full bg-amber-400/15 px-1.5 text-[10px] font-bold text-amber-200">{pendingRequests.length}</span>}</button>)}
          </nav>
        </div>
        <div className="mt-auto border-t border-white/[.06] p-3">
          <Link href="/sistema" className="flex items-center gap-3 rounded-xl px-3 py-3 text-sm text-slate-500 hover:bg-white/[.035] hover:text-white"><Icon name="arrow" className="h-4 w-4 rotate-180" /> Voltar ao sistema</Link>
          <button onClick={signOut} className="flex w-full items-center gap-3 rounded-xl px-3 py-3 text-sm text-slate-500 hover:bg-rose-400/10 hover:text-rose-300"><Icon name="logout" className="h-4 w-4" /> Sair</button>
        </div>
      </aside>

      <div className="relative lg:pl-[252px]">
        <header className="sticky top-0 z-30 flex h-[76px] items-center justify-between border-b border-white/[.06] bg-[#050914]/85 px-4 backdrop-blur-xl sm:px-6 lg:px-8">
          <div><p className="text-sm font-semibold">Central administrativa</p><p className="mt-1 text-[10px] text-slate-600">Gestão da plataforma e dos clientes</p></div>
          <div className="flex items-center gap-2">
            <Link href="/sistema" className="rounded-xl border border-white/[.07] px-3 py-2 text-xs text-slate-400 hover:text-white lg:hidden">Sistema</Link>
            <button className="relative grid h-9 w-9 place-items-center rounded-xl border border-white/[.07] bg-white/[.025] text-slate-500"><Icon name="bell" className="h-4 w-4" />{pendingRequests.length > 0 && <span className="absolute right-2 top-2 h-1.5 w-1.5 rounded-full bg-amber-300" />}</button>
            <div className="ml-1 hidden items-center gap-3 border-l border-white/[.07] pl-4 sm:flex"><div className="text-right"><p className="text-xs font-medium">{payload.admin.name}</p><p className="mt-1 text-[9px] uppercase tracking-wider text-slate-600">{payload.admin.role}</p></div><span className="grid h-9 w-9 place-items-center rounded-xl bg-gradient-to-br from-blue-500 to-indigo-700 text-xs font-bold">{payload.admin.name.slice(0, 2).toUpperCase()}</span></div>
          </div>
        </header>

        <div className="mx-auto max-w-[1550px] px-4 py-7 sm:px-6 lg:px-8">
          <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
            <div><p className="text-[10px] font-semibold uppercase tracking-[.18em] text-blue-300">Vorzax Platform</p><h1 className="mt-2 text-3xl font-semibold tracking-[-.035em]">{nav.find(([key]) => key === active)?.[1]}</h1><p className="mt-2 text-sm text-slate-500">Visão consolidada da operação SaaS e das empresas atendidas.</p></div>
            <button className="inline-flex h-10 items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-blue-500 to-indigo-600 px-4 text-xs font-semibold shadow-lg shadow-blue-600/15"><Icon name="plus" className="h-4 w-4" /> Nova empresa</button>
          </div>

          {(active === "overview" || active === "companies") && (
            <>
              <div className="mt-7 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
                {[
                  ["Empresas ativas", String(activeOrganizations), `${payload.organizations.length} cadastradas`, "from-blue-400 to-indigo-500"],
                  ["Usuários", String(payload.memberships.length), "membros vinculados", "from-cyan-400 to-blue-500"],
                  ["Módulos por empresa", averageModules, "média de ativações", "from-violet-400 to-fuchsia-500"],
                  ["Solicitações", String(pendingRequests.length), "aguardando decisão", "from-amber-300 to-orange-500"],
                ].map(([label, main, detail, accent]) => <Panel key={label} className="p-5"><div className={`h-1 w-10 rounded-full bg-gradient-to-r ${accent}`} /><p className="mt-5 text-[10px] font-semibold uppercase tracking-[.14em] text-slate-600">{label}</p><p className="mt-2 text-3xl font-semibold tracking-[-.04em]">{main}</p><p className="mt-2 text-xs text-slate-600">{detail}</p></Panel>)}
              </div>

              <Panel className="mt-5 overflow-hidden">
                <SectionHeader title="Empresas da plataforma" subtitle="Clientes, estágio, usuários e cobertura de módulos" action={<div className="hidden gap-2 md:flex"><div className="flex h-9 items-center gap-2 rounded-xl border border-white/[.07] bg-white/[.02] px-3"><Icon name="search" className="h-4 w-4 text-slate-600" /><input value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Buscar empresa..." className="w-44 bg-transparent text-xs outline-none placeholder:text-slate-700" /></div><select value={statusFilter} onChange={(event) => setStatusFilter(event.target.value)} className="rounded-xl border border-white/[.07] bg-[#0b1220] px-3 text-xs text-slate-400 outline-none"><option value="all">Todos os status</option><option value="active">Ativas</option><option value="onboarding">Implantação</option><option value="suspended">Suspensas</option></select></div>} />
                {filteredOrganizations.length ? <div className="overflow-x-auto"><table className="w-full min-w-[820px] text-left"><thead><tr className="border-b border-white/[.06] text-[10px] uppercase tracking-[.14em] text-slate-700"><th className="px-5 py-4">Empresa</th><th className="px-5 py-4">Segmento</th><th className="px-5 py-4">Localização</th><th className="px-5 py-4">Usuários</th><th className="px-5 py-4">Módulos</th><th className="px-5 py-4">Status</th><th className="px-5 py-4">Entrada</th></tr></thead><tbody>{filteredOrganizations.map((organization) => { const id = value(organization, "id", ""); return <tr key={id} className="border-b border-white/[.045] text-sm last:border-0 hover:bg-white/[.025]"><td className="px-5 py-4"><div className="flex items-center gap-3"><span className="grid h-9 w-9 place-items-center rounded-xl bg-gradient-to-br from-slate-700 to-slate-900 text-xs font-bold text-slate-300">{value(organization, "trade_name", value(organization, "name")).slice(0, 2).toUpperCase()}</span><div><p className="font-medium text-white">{value(organization, "trade_name", value(organization, "name"))}</p><p className="mt-1 text-xs text-slate-700">{value(organization, "document")}</p></div></div></td><td className="px-5 py-4 text-slate-400">{value(organization, "industry")}</td><td className="px-5 py-4 text-slate-400">{[value(organization, "city", ""), value(organization, "state", "")].filter(Boolean).join(" / ") || "—"}</td><td className="px-5 py-4 text-slate-300">{membersByOrg.get(id) ?? 0}</td><td className="px-5 py-4"><span className="font-medium text-blue-300">{modulesByOrg.get(id) ?? 0}</span><span className="text-slate-700">/{payload.catalog.length}</span></td><td className="px-5 py-4"><Status status={value(organization, "status", "active")} /></td><td className="px-5 py-4 text-xs text-slate-600">{date(organization.created_at)}</td></tr>; })}</tbody></table></div> : <div className="grid min-h-56 place-items-center text-center"><div><p className="text-sm font-medium text-slate-300">Nenhuma empresa encontrada</p><p className="mt-2 text-xs text-slate-600">Ajuste a busca ou os filtros selecionados.</p></div></div>}
              </Panel>
            </>
          )}

          {(active === "overview" || active === "requests") && (
            <Panel className="mt-5 overflow-hidden">
              <SectionHeader title="Solicitações de módulos" subtitle="Pedidos de expansão enviados pelas empresas" action={feedback ? <span className="text-xs text-emerald-300">{feedback}</span> : undefined} />
              {payload.requests.length ? <div className="divide-y divide-white/[.05]">{payload.requests.slice(0, active === "overview" ? 5 : 50).map((request) => { const pending = value(request, "status", "pending") === "pending"; return <div key={value(request, "id")} className="flex flex-col gap-4 px-5 py-4 md:flex-row md:items-center"><span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-blue-400/10 text-blue-300"><Icon name="modules" className="h-4 w-4" /></span><div className="min-w-0 flex-1"><p className="text-sm font-medium text-white">{orgName(request.organization_id)}</p><p className="mt-1 text-xs text-slate-600">Solicitou <span className="text-slate-300">{moduleName(request.module_key)}</span> · {date(request.created_at, true)}</p>{request.message ? <p className="mt-2 line-clamp-1 text-xs italic text-slate-500">“{value(request, "message")}”</p> : null}</div><div className="flex items-center gap-2">{pending ? <><button disabled={isPending} onClick={() => review(request, "rejected")} className="rounded-lg border border-white/[.08] px-3 py-2 text-xs text-slate-400 hover:border-rose-400/20 hover:text-rose-300 disabled:opacity-50">Recusar</button><button disabled={isPending} onClick={() => review(request, "approved")} className="rounded-lg bg-emerald-500/15 px-3 py-2 text-xs font-semibold text-emerald-300 ring-1 ring-emerald-400/20 hover:bg-emerald-500/20 disabled:opacity-50">{isPending ? "Processando..." : "Aprovar"}</button></> : <Status status={value(request, "status")} />}</div></div>; })}</div> : <div className="grid min-h-48 place-items-center"><p className="text-sm text-slate-600">Nenhuma solicitação registrada.</p></div>}
            </Panel>
          )}

          {active === "modules" && (
            <div className="mt-7 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
              {payload.catalog.map((module, index) => {
                const activeCount = payload.organizationModules.filter((item) => item.module_key === module.module_key && /active|ativo/.test(value(item, "status", "active"))).length;
                const coverage = payload.organizations.length ? Math.round((activeCount / payload.organizations.length) * 100) : 0;
                return <Panel key={value(module, "module_key")} className="p-5"><div className="flex items-start justify-between"><span className="grid h-11 w-11 place-items-center rounded-xl bg-gradient-to-br from-blue-500/20 to-indigo-500/10 text-sm font-bold text-blue-300">{String(index + 1).padStart(2, "0")}</span><Status status={String(module.active === false ? "suspended" : "active")} /></div><h2 className="mt-5 font-semibold">{value(module, "name")}</h2><p className="mt-2 text-xs text-slate-600">{activeCount} empresas com este módulo ativo</p><div className="mt-5 h-1.5 overflow-hidden rounded-full bg-white/[.05]"><div className="h-full rounded-full bg-gradient-to-r from-blue-400 to-indigo-500" style={{ width: `${Math.min(coverage, 100)}%` }} /></div><div className="mt-2 flex justify-between text-[10px] text-slate-700"><span>Cobertura</span><span>{coverage}%</span></div></Panel>;
              })}
            </div>
          )}

          {active === "audit" && (
            <Panel className="mt-7 overflow-hidden">
              <SectionHeader title="Trilha de auditoria" subtitle="Alterações registradas na plataforma" />
              <div className="divide-y divide-white/[.05]">{payload.auditLogs.length ? payload.auditLogs.map((log) => <div key={value(log, "id")} className="flex gap-4 px-5 py-4"><span className="mt-1 h-2 w-2 shrink-0 rounded-full bg-blue-400 shadow-[0_0_10px_#60a5fa]" /><div className="min-w-0 flex-1"><div className="flex flex-wrap items-center gap-2"><p className="text-sm font-medium text-slate-200">{value(log, "action")}</p><span className="rounded bg-white/[.04] px-2 py-0.5 font-mono text-[10px] text-slate-500">{value(log, "table_name")}</span></div><p className="mt-1 text-xs text-slate-600">{orgName(log.organization_id)} · registro {value(log, "record_id")}</p></div><time className="shrink-0 text-xs text-slate-700">{date(log.created_at, true)}</time></div>) : <div className="grid min-h-52 place-items-center text-sm text-slate-600">Nenhum evento de auditoria.</div>}</div>
            </Panel>
          )}
        </div>
      </div>
    </main>
  );
}

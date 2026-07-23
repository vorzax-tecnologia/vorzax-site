"use client";

import { useEffect, useState, type ChangeEvent, type FormEvent } from "react";
const WHATSAPP_URL =
  "https://wa.me/5531990681495?text=Ol%C3%A1%2C%20vim%20pelo%20site%20da%20Vorzax%20e%20gostaria%20de%20solicitar%20um%20diagn%C3%B3stico%20gratuito.";

const INSTAGRAM_URL = "https://www.instagram.com/vorzaxoficial/";
const services = [
  {
    number: "01",
    title: "Sistemas sob medida",
    description:
      "Plataformas web criadas para organizar operações, eliminar retrabalho e acompanhar o crescimento da empresa.",
    result: "Mais controle da operação",
  },
  {
    number: "02",
    title: "Automação de processos",
    description:
      "Conectamos tarefas, dados e ferramentas para reduzir atividades manuais e acelerar o trabalho da equipe.",
    result: "Menos tempo desperdiçado",
  },
  {
    number: "03",
    title: "Dashboards e BI",
    description:
      "Transformamos dados empresariais em indicadores claros para decisões mais rápidas e bem fundamentadas.",
    result: "Decisões com dados",
  },
  {
    number: "04",
    title: "Sites e landing pages",
    description:
      "Experiências digitais rápidas, profissionais e orientadas a gerar autoridade, contatos e oportunidades.",
    result: "Presença que vende",
  },
];

const sectors = [
  "Transportadoras",
  "Oficinas e manutenção",
  "Prestadores de serviços",
  "Comércio e distribuição",
  "Pequenas e médias empresas",
  "Operações administrativas",
];

const process = [
  {
    step: "01",
    title: "Diagnóstico",
    description:
      "Entendemos o problema, o processo atual e o resultado que sua empresa precisa alcançar.",
  },
  {
    step: "02",
    title: "Estratégia",
    description:
      "Definimos a solução, as prioridades e um plano de execução claro antes de desenvolver.",
  },
  {
    step: "03",
    title: "Construção",
    description:
      "Criamos a experiência, desenvolvemos a tecnologia e validamos cada etapa com você.",
  },
  {
    step: "04",
    title: "Evolução",
    description:
      "Entregamos, acompanhamos o uso e evoluímos a solução conforme a operação cresce.",
  },
];

const projects = [
  {
    tag: "GESTÃO DE FROTAS",
    title: "FleetControl",
    description:
      "Conceito de plataforma para veículos, custos, abastecimentos, documentos e manutenção preventiva.",
    type: "fleet",
  },
  {
    tag: "GESTÃO DE SERVIÇOS",
    title: "ServiceFlow",
    description:
      "Conceito de sistema para ordens de serviço, equipes, clientes, agenda e acompanhamento de execução.",
    type: "service",
  },
  {
    tag: "INTELIGÊNCIA DE NEGÓCIO",
    title: "Business Vision",
    description:
      "Conceito de dashboard executivo para consolidar resultados financeiros, comerciais e operacionais.",
    type: "bi",
  },
];

function Logo() {
  return (
    <div className="flex items-center gap-3">
      <svg
        viewBox="0 0 64 64"
        className="h-10 w-10 shrink-0"
        aria-label="Símbolo Vorzax"
      >
        <defs>
          <linearGradient id="vorzax-gradient" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#10d6ff" />
            <stop offset="50%" stopColor="#1687ff" />
            <stop offset="100%" stopColor="#3345ff" />
          </linearGradient>
        </defs>
        <path d="M7 12h13l13 22-8 14L7 12Z" fill="url(#vorzax-gradient)" />
        <path d="M57 12H43L25 42l8 10 24-40Z" fill="url(#vorzax-gradient)" />
        <path d="M45 29h12L39 58l-7-10 13-19Z" fill="#1259e8" opacity="0.92" />
      </svg>

      <div>
        <div className="text-xl font-black tracking-[0.18em] text-white">
          VORZAX
        </div>
        <div className="text-[9px] font-semibold tracking-[0.4em] text-sky-400">
          TECNOLOGIA
        </div>
      </div>
    </div>
  );
}

function ArrowIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="h-4 w-4"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      aria-hidden="true"
    >
      <path d="M5 12h14" />
      <path d="m13 6 6 6-6 6" />
    </svg>
  );
}

function CheckIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="h-4 w-4"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      aria-hidden="true"
    >
      <path d="m5 12 4 4L19 6" />
    </svg>
  );
}

function WhatsAppIcon() {
  return (
    <svg viewBox="0 0 32 32" className="h-6 w-6" fill="currentColor" aria-hidden="true">
      <path d="M16.05 3C8.87 3 3.03 8.74 3.03 15.79c0 2.25.6 4.44 1.73 6.37L3 28.62l6.66-1.72a13.1 13.1 0 0 0 6.38 1.63h.01c7.18 0 13.02-5.74 13.02-12.79C29.07 8.74 23.23 3 16.05 3Zm0 23.37h-.01a10.9 10.9 0 0 1-5.54-1.49l-.4-.24-3.95 1.02 1.05-3.78-.26-.39a10.5 10.5 0 0 1-1.68-5.7c0-5.86 4.84-10.63 10.79-10.63 5.95 0 10.79 4.77 10.79 10.63 0 5.86-4.84 10.58-10.79 10.58Zm5.92-7.92c-.32-.16-1.92-.93-2.22-1.04-.3-.1-.51-.16-.73.16-.21.31-.84 1.04-1.03 1.25-.19.21-.38.23-.7.08-.32-.16-1.36-.49-2.59-1.57-.96-.84-1.6-1.88-1.79-2.19-.19-.31-.02-.48.14-.63.15-.14.32-.36.49-.54.16-.18.21-.31.32-.52.11-.21.05-.39-.03-.55-.08-.16-.73-1.73-1-2.37-.26-.63-.53-.54-.73-.55h-.62c-.22 0-.57.08-.87.39-.3.31-1.14 1.1-1.14 2.68s1.17 3.11 1.33 3.32c.16.21 2.3 3.46 5.57 4.85.78.33 1.38.53 1.86.68.78.24 1.49.21 2.05.13.63-.09 1.92-.77 2.19-1.51.27-.73.27-1.36.19-1.49-.08-.13-.3-.21-.62-.37Z" />
    </svg>
  );
}

function ProjectVisual({ type }: { type: string }) {
  if (type === "fleet") {
    return (
      <div className="relative h-full rounded-2xl border border-white/10 bg-[#081526] p-4 shadow-2xl transition duration-500 group-hover:-translate-y-2 group-hover:rotate-[-1deg]">
        <div className="mb-4 flex items-center justify-between">
          <div className="flex gap-1.5">
            <span className="h-2 w-2 rounded-full bg-slate-600" />
            <span className="h-2 w-2 rounded-full bg-slate-600" />
            <span className="h-2 w-2 rounded-full bg-sky-400" />
          </div>
          <span className="text-[9px] tracking-[0.2em] text-slate-500">FROTA</span>
        </div>

        <div className="grid grid-cols-[0.8fr_1.2fr] gap-3">
          <div className="space-y-2">
            {["Visão geral", "Veículos", "Manutenção", "Custos"].map((item, index) => (
              <div
                key={item}
                className={`rounded-lg border px-3 py-2 text-[9px] ${
                  index === 0
                    ? "border-sky-400/30 bg-sky-400/10 text-sky-300"
                    : "border-white/8 bg-white/[0.03] text-slate-500"
                }`}
              >
                {item}
              </div>
            ))}
          </div>

          <div className="space-y-2">
            {["VAN-2048", "TRK-1092", "UTIL-3381"].map((vehicle, index) => (
              <div key={vehicle} className="rounded-xl border border-white/10 bg-white/[0.04] p-3">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-semibold text-slate-300">{vehicle}</span>
                  <span className={`h-2 w-2 rounded-full ${index === 1 ? "bg-amber-400" : "bg-emerald-400"}`} />
                </div>
                <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-slate-800">
                  <div className="h-full rounded-full bg-gradient-to-r from-blue-600 to-sky-400" style={{ width: `${82 - index * 17}%` }} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (type === "service") {
    return (
      <div className="relative h-full rounded-2xl border border-white/10 bg-[#081526] p-4 shadow-2xl transition duration-500 group-hover:-translate-y-2 group-hover:rotate-[1deg]">
        <div className="mb-4 flex items-center justify-between">
          <div className="flex gap-1.5">
            <span className="h-2 w-2 rounded-full bg-slate-600" />
            <span className="h-2 w-2 rounded-full bg-slate-600" />
            <span className="h-2 w-2 rounded-full bg-sky-400" />
          </div>
          <span className="text-[9px] tracking-[0.2em] text-slate-500">SERVIÇOS</span>
        </div>

        <div className="grid grid-cols-4 gap-2 text-center text-[8px] text-slate-500">
          {["08:00", "10:00", "13:00", "15:00"].map((time) => (
            <div key={time}>{time}</div>
          ))}
        </div>

        <div className="mt-3 space-y-2">
          {[
            ["OS #1842", "Manutenção preventiva", "Em execução"],
            ["OS #1843", "Instalação técnica", "Agendado"],
            ["OS #1844", "Vistoria operacional", "Concluído"],
          ].map(([order, title, status], index) => (
            <div key={order} className="grid grid-cols-[0.7fr_1.4fr_0.8fr] items-center gap-2 rounded-xl border border-white/10 bg-white/[0.04] px-3 py-3">
              <span className="text-[9px] font-semibold text-sky-300">{order}</span>
              <span className="text-[9px] text-slate-400">{title}</span>
              <span className={`rounded-full px-2 py-1 text-center text-[8px] ${index === 0 ? "bg-sky-400/10 text-sky-300" : index === 1 ? "bg-amber-400/10 text-amber-300" : "bg-emerald-400/10 text-emerald-300"}`}>
                {status}
              </span>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="relative h-full rounded-2xl border border-white/10 bg-[#081526] p-4 shadow-2xl transition duration-500 group-hover:-translate-y-2 group-hover:rotate-[-1deg]">
      <div className="mb-4 flex items-center justify-between">
        <div className="flex gap-1.5">
          <span className="h-2 w-2 rounded-full bg-slate-600" />
          <span className="h-2 w-2 rounded-full bg-slate-600" />
          <span className="h-2 w-2 rounded-full bg-sky-400" />
        </div>
        <span className="text-[9px] tracking-[0.2em] text-slate-500">BI EXECUTIVO</span>
      </div>

      <div className="grid grid-cols-3 gap-2">
        {["Receita", "Margem", "Conversão"].map((label, index) => (
          <div key={label} className="rounded-xl border border-white/10 bg-white/[0.04] p-3">
            <p className="text-[8px] text-slate-500">{label}</p>
            <p className="mt-2 text-sm font-semibold text-white">{["R$ 84k", "31%", "18,7%"][index]}</p>
          </div>
        ))}
      </div>

      <div className="mt-3 rounded-xl border border-white/10 bg-white/[0.04] p-3">
        <div className="flex h-24 items-end gap-2">
          {[35, 48, 43, 66, 58, 79, 72, 92].map((height, index) => (
            <div key={index} className="flex-1 rounded-t bg-gradient-to-t from-blue-700 to-sky-400" style={{ height: `${height}%` }} />
          ))}
        </div>
      </div>
    </div>
  );
}

type DiagnosticFormData = {
  nome: string;
  telefone: string;
  email: string;
  empresa: string;
  segmento: string;
  tipo_solucao: string;
  objetivo: string;
  prazo: string;
};

const initialDiagnosticForm: DiagnosticFormData = {
  nome: "",
  telefone: "",
  email: "",
  empresa: "",
  segmento: "",
  tipo_solucao: "",
  objetivo: "",
  prazo: "",
};

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [whatsappOpen, setWhatsappOpen] = useState(false);
  const [diagnosticOpen, setDiagnosticOpen] = useState(false);
  const [diagnosticData, setDiagnosticData] = useState<DiagnosticFormData>(initialDiagnosticForm);
  const [diagnosticStatus, setDiagnosticStatus] = useState<"idle" | "sending" | "success" | "error">("idle");
  const [diagnosticError, setDiagnosticError] = useState("");
  const [diagnosticWhatsappUrl, setDiagnosticWhatsappUrl] = useState(WHATSAPP_URL);

  const openDiagnostic = () => {
    setWhatsappOpen(false);
    setDiagnosticStatus("idle");
    setDiagnosticError("");
    setDiagnosticWhatsappUrl(WHATSAPP_URL);
    setDiagnosticOpen(true);
  };

  const closeDiagnostic = () => {
    if (diagnosticStatus === "sending") return;
    setDiagnosticOpen(false);
  };

  useEffect(() => {
    if (!diagnosticOpen) return;

    const previousOverflow = document.body.style.overflow;
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape" && diagnosticStatus !== "sending") {
        setDiagnosticOpen(false);
      }
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [diagnosticOpen, diagnosticStatus]);

  const handleDiagnosticChange = (
    event: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = event.target;
    setDiagnosticData((current) => ({ ...current, [name]: value }));
  };

  const handleDiagnosticSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setDiagnosticStatus("sending");
    setDiagnosticError("");

    try {
      const message = [
        "Olá! Vim pelo site da Vorzax e preenchi o diagnóstico.",
        "",
        "*NOVO DIAGNÓSTICO VORZAX*",
        `*Nome:* ${diagnosticData.nome.trim()}`,
        `*WhatsApp:* ${diagnosticData.telefone.trim()}`,
        `*E-mail:* ${diagnosticData.email.trim() || "Não informado"}`,
        `*Empresa:* ${diagnosticData.empresa.trim()}`,
        `*Segmento:* ${diagnosticData.segmento}`,
        `*Solução desejada:* ${diagnosticData.tipo_solucao}`,
        `*Objetivo ou dificuldade:* ${diagnosticData.objetivo.trim()}`,
        `*Prazo desejado:* ${diagnosticData.prazo || "Ainda não definido"}`,
        "",
        "Mensagem gerada pelo formulário de diagnóstico do site da Vorzax.",
      ].join("\n");

      const whatsappUrl = `https://wa.me/5531990681495?text=${encodeURIComponent(message)}`;
      setDiagnosticWhatsappUrl(whatsappUrl);

      const whatsappWindow = window.open(whatsappUrl, "_blank");

      if (whatsappWindow) {
        whatsappWindow.opener = null;
        setDiagnosticStatus("success");
        setDiagnosticData(initialDiagnosticForm);
        return;
      }

      window.location.assign(whatsappUrl);
    } catch (error) {
      console.error("Erro ao abrir o WhatsApp:", error);
      setDiagnosticStatus("error");
      setDiagnosticError(
        "Não foi possível abrir o WhatsApp agora. Verifique sua conexão e tente novamente."
      );
    }
  };

  return (
    <main className="relative isolate min-h-screen overflow-hidden bg-[#020611] text-white">
      {diagnosticOpen && (
        <div
          className="fixed inset-0 isolate flex items-center justify-center p-4 sm:p-6 pointer-events-auto"
          style={{ position: "fixed", inset: 0, zIndex: 999999 }}
        >
          <button
            type="button"
            aria-label="Fechar diagnóstico"
            onClick={closeDiagnostic}
            className="absolute inset-0 z-0 bg-black/75 backdrop-blur-sm"
            style={{ position: "absolute", inset: 0, zIndex: 0 }}
          />

          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="diagnostico-titulo"
            aria-describedby="diagnostico-descricao"
            className="relative z-10 max-h-[92vh] w-full max-w-2xl overflow-y-auto rounded-[28px] border border-white/10 bg-[#07101f] shadow-2xl shadow-black/60"
            style={{ position: "relative", zIndex: 1 }}
          >
            <div className="sticky top-0 z-10 flex items-start justify-between gap-5 border-b border-white/10 bg-[#07101f]/95 px-6 py-5 backdrop-blur-xl sm:px-8">
              <div>
                <p className="text-[10px] font-semibold tracking-[0.22em] text-sky-400">
                  DIAGNÓSTICO VORZAX
                </p>
                <h2 id="diagnostico-titulo" className="mt-2 text-2xl font-semibold tracking-tight sm:text-3xl">
                  Vamos entender sua operação.
                </h2>
                <p id="diagnostico-descricao" className="mt-2 max-w-xl text-sm leading-6 text-slate-400">
                  Responda algumas perguntas. Com isso, avaliamos o melhor caminho para seu projeto.
                </p>
              </div>

              <button
                type="button"
                aria-label="Fechar diagnóstico"
                onClick={closeDiagnostic}
                className="shrink-0 text-2xl leading-none text-slate-500 transition hover:text-white"
              >
                ×
              </button>
            </div>

            {diagnosticStatus === "success" ? (
              <div className="px-6 py-12 text-center sm:px-8">
                <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-emerald-400/10 text-2xl text-emerald-400">
                  ✓
                </div>
                <h3 className="mt-6 text-2xl font-semibold">Diagnóstico pronto para envio.</h3>
                <p className="mx-auto mt-3 max-w-md text-sm leading-6 text-slate-400">
                  Suas respostas foram organizadas e o WhatsApp foi aberto. Para concluir, envie a mensagem para a Vorzax.
                </p>
                <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
                  <a
                    href={diagnosticWhatsappUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center justify-center gap-2 rounded-xl bg-emerald-500 px-5 py-3 text-sm font-bold text-white transition hover:bg-emerald-400"
                  >
                    Abrir WhatsApp novamente
                    <ArrowIcon />
                  </a>
                  <button
                    type="button"
                    onClick={closeDiagnostic}
                    className="rounded-xl border border-white/10 px-5 py-3 text-sm font-semibold text-slate-300 transition hover:border-white/20 hover:text-white"
                  >
                    Fechar
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleDiagnosticSubmit} className="space-y-5 px-6 py-6 sm:px-8 sm:py-8">
                <div className="grid gap-5 sm:grid-cols-2">
                  <label className="block">
                    <span className="text-xs font-semibold text-slate-300">Seu nome *</span>
                    <input
                      name="nome"
                      value={diagnosticData.nome}
                      onChange={handleDiagnosticChange}
                      required
                      autoComplete="name"
                      placeholder="Como podemos chamar você?"
                      className="mt-2 w-full rounded-xl border border-white/10 bg-white/[0.04] px-4 py-3 text-sm text-white outline-none transition placeholder:text-slate-600 focus:border-sky-400/60 focus:bg-white/[0.06]"
                    />
                  </label>

                  <label className="block">
                    <span className="text-xs font-semibold text-slate-300">WhatsApp *</span>
                    <input
                      name="telefone"
                      value={diagnosticData.telefone}
                      onChange={handleDiagnosticChange}
                      required
                      autoComplete="tel"
                      placeholder="(31) 99999-9999"
                      className="mt-2 w-full rounded-xl border border-white/10 bg-white/[0.04] px-4 py-3 text-sm text-white outline-none transition placeholder:text-slate-600 focus:border-sky-400/60 focus:bg-white/[0.06]"
                    />
                  </label>

                  <label className="block">
                    <span className="text-xs font-semibold text-slate-300">E-mail <span className="font-normal text-slate-500">(opcional)</span></span>
                    <input
                      name="email"
                      type="email"
                      value={diagnosticData.email}
                      onChange={handleDiagnosticChange}
                      autoComplete="email"
                      placeholder="voce@empresa.com.br"
                      className="mt-2 w-full rounded-xl border border-white/10 bg-white/[0.04] px-4 py-3 text-sm text-white outline-none transition placeholder:text-slate-600 focus:border-sky-400/60 focus:bg-white/[0.06]"
                    />
                  </label>

                  <label className="block">
                    <span className="text-xs font-semibold text-slate-300">Empresa *</span>
                    <input
                      name="empresa"
                      value={diagnosticData.empresa}
                      onChange={handleDiagnosticChange}
                      required
                      autoComplete="organization"
                      placeholder="Nome da empresa"
                      className="mt-2 w-full rounded-xl border border-white/10 bg-white/[0.04] px-4 py-3 text-sm text-white outline-none transition placeholder:text-slate-600 focus:border-sky-400/60 focus:bg-white/[0.06]"
                    />
                  </label>
                </div>

                <div className="grid gap-5 sm:grid-cols-2">
                  <label className="block">
                    <span className="text-xs font-semibold text-slate-300">Segmento da empresa *</span>
                    <select
                      name="segmento"
                      value={diagnosticData.segmento}
                      onChange={handleDiagnosticChange}
                      required
                      className="mt-2 w-full rounded-xl border border-white/10 bg-[#0b1729] px-4 py-3 text-sm text-white outline-none transition focus:border-sky-400/60"
                    >
                      <option value="">Selecione uma opção</option>
                      <option>Transportes e logística</option>
                      <option>Serviços técnicos e manutenção</option>
                      <option>Comércio e distribuição</option>
                      <option>Indústria e manufatura</option>
                      <option>Construção civil e engenharia</option>
                      <option>Tecnologia, software e telecomunicações</option>
                      <option>Saúde e clínicas</option>
                      <option>Educação e cursos</option>
                      <option>Serviços profissionais</option>
                      <option>Financeiro e seguros</option>
                      <option>Imobiliário</option>
                      <option>Agronegócio</option>
                      <option>Alimentação, hotelaria e turismo</option>
                      <option>Energia e serviços essenciais</option>
                      <option>Outro segmento</option>
                    </select>
                  </label>

                  <label className="block">
                    <span className="text-xs font-semibold text-slate-300">O que você quer desenvolver? *</span>
                    <select
                      name="tipo_solucao"
                      value={diagnosticData.tipo_solucao}
                      onChange={handleDiagnosticChange}
                      required
                      className="mt-2 w-full rounded-xl border border-white/10 bg-[#0b1729] px-4 py-3 text-sm text-white outline-none transition focus:border-sky-400/60"
                    >
                      <option value="">Selecione uma opção</option>
                      <option>Site institucional</option>
                      <option>Landing page</option>
                      <option>Sistema sob medida</option>
                      <option>CRM</option>
                      <option>Plataforma empresarial</option>
                      <option>Automação de processos</option>
                      <option>Dashboard e BI</option>
                      <option>Ainda não sei; preciso de orientação</option>
                    </select>
                  </label>
                </div>

                <label className="block">
                  <span className="text-xs font-semibold text-slate-300">Qual é o principal objetivo ou dificuldade? *</span>
                  <textarea
                    name="objetivo"
                    value={diagnosticData.objetivo}
                    onChange={handleDiagnosticChange}
                    required
                    rows={4}
                    placeholder="Conte brevemente o que precisa melhorar ou construir."
                    className="mt-2 w-full resize-y rounded-xl border border-white/10 bg-white/[0.04] px-4 py-3 text-sm leading-6 text-white outline-none transition placeholder:text-slate-600 focus:border-sky-400/60 focus:bg-white/[0.06]"
                  />
                </label>

                <label className="block">
                  <span className="text-xs font-semibold text-slate-300">Existe um prazo desejado? <span className="font-normal text-slate-500">(opcional)</span></span>
                  <select
                    name="prazo"
                    value={diagnosticData.prazo}
                    onChange={handleDiagnosticChange}
                    className="mt-2 w-full rounded-xl border border-white/10 bg-[#0b1729] px-4 py-3 text-sm text-white outline-none transition focus:border-sky-400/60"
                  >
                    <option value="">Ainda não definido</option>
                    <option>Até 30 dias</option>
                    <option>De 1 a 3 meses</option>
                    <option>Mais de 3 meses</option>
                  </select>
                </label>

                {diagnosticStatus === "error" && (
                  <p className="rounded-xl border border-red-400/20 bg-red-400/10 px-4 py-3 text-sm leading-6 text-red-200">
                    {diagnosticError}
                  </p>
                )}

                <div className="flex flex-col-reverse gap-3 border-t border-white/10 pt-5 sm:flex-row sm:items-center sm:justify-between">
                  <p className="text-xs leading-5 text-slate-500">Seus dados serão usados somente para analisar seu pedido e entrar em contato sobre este diagnóstico.</p>
                  <button
                    type="submit"
                    disabled={diagnosticStatus === "sending"}
                    className="inline-flex items-center justify-center gap-2 rounded-xl bg-sky-400 px-5 py-3 text-sm font-bold text-[#020611] transition hover:bg-white disabled:cursor-wait disabled:opacity-60"
                  >
                    {diagnosticStatus === "sending" ? "Enviando..." : "Enviar diagnóstico"}
                    {diagnosticStatus !== "sending" && <ArrowIcon />}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}

      <div className="fixed bottom-5 right-4 z-50 flex flex-col items-end gap-3 sm:right-6">
  {whatsappOpen && (
    <div className="w-[min(340px,calc(100vw-2rem))] overflow-hidden rounded-2xl border border-white/10 bg-[#07101f]/95 shadow-2xl shadow-black/40 backdrop-blur-xl">
      <div className="flex items-start justify-between gap-4 border-b border-white/10 px-5 py-4">
        <div>
          <p className="text-sm font-semibold text-white">Olá! 👋</p>
          <p className="mt-1 text-xs leading-5 text-slate-400">
            Como podemos ajudar sua empresa?
          </p>
        </div>

        <button
          type="button"
          aria-label="Fechar conversa"
          onClick={() => setWhatsappOpen(false)}
          className="text-xl leading-none text-slate-500 transition hover:text-white"
        >
          ×
        </button>
      </div>

      <div className="px-5 py-4">
        <p className="text-xs leading-5 text-slate-400">
          Fale com a Vorzax e solicite um diagnóstico gratuito.
        </p>

        <button
          type="button"
          onClick={openDiagnostic}
          className="mt-4 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-sky-400 px-4 py-3 text-sm font-bold text-[#020611] transition hover:bg-white"
        >
          Preencher diagnóstico
          <ArrowIcon />
        </button>

        <a
          href={WHATSAPP_URL}
          target="_blank"
          rel="noreferrer"
          className="mt-2 inline-flex w-full items-center justify-center gap-2 rounded-xl border border-emerald-400/30 bg-emerald-500/10 px-4 py-3 text-sm font-bold text-emerald-300 transition hover:bg-emerald-500 hover:text-white"
        >
          Abrir WhatsApp
          <ArrowIcon />
        </a>
      </div>
    </div>
  )}

  <button
    type="button"
    aria-label={whatsappOpen ? "Fechar WhatsApp" : "Abrir WhatsApp"}
    aria-expanded={whatsappOpen}
    onClick={() => setWhatsappOpen((open) => !open)}
    className="flex h-12 w-12 items-center justify-center rounded-full bg-emerald-500 text-white shadow-[0_18px_50px_rgba(16,185,129,0.35)] transition hover:-translate-y-1 hover:bg-emerald-400 sm:h-14 sm:w-14"
  >
    <WhatsAppIcon />
  </button>
</div>

      <header className="sticky top-0 z-40 border-b border-white/10 bg-[#020611]/78 backdrop-blur-2xl">
        <div className="relative mx-auto flex h-20 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-10">
          <a href="#inicio" aria-label="Vorzax - início" onClick={() => setMenuOpen(false)}>
            <Logo />
          </a>

          <nav className="hidden items-center gap-8 text-sm text-slate-300 lg:flex">
            <a className="transition hover:text-white" href="#inicio">Início</a>
            <a className="transition hover:text-white" href="#solucoes">Soluções</a>
            <a className="transition hover:text-white" href="#sobre">Sobre</a>
            <a className="transition hover:text-white" href="#portfolio">Portfólio</a>
            <a className="transition hover:text-white" href="#contato">Contato</a>
          </nav>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={openDiagnostic}
              className="hidden rounded-full border border-sky-400/30 bg-sky-400/10 px-5 py-3 text-sm font-semibold text-sky-300 transition hover:border-sky-300 hover:bg-sky-400 hover:text-[#020611] sm:inline-flex"
            >
              Solicitar orçamento
            </button>

            <button
              type="button"
              onClick={openDiagnostic}
              className="inline-flex rounded-full border border-sky-400/30 bg-sky-400/10 px-3 py-2.5 text-xs font-semibold text-sky-300 transition hover:border-sky-300 hover:bg-sky-400 hover:text-[#020611] sm:hidden"
            >
              Orçamento
            </button>

            <button
              type="button"
              aria-label={menuOpen ? "Fechar menu" : "Abrir menu"}
              aria-expanded={menuOpen}
              aria-controls="menu-mobile"
              onClick={() => setMenuOpen((open) => !open)}
              className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-white/[0.04] text-white transition hover:border-white/20 hover:bg-white/[0.08] lg:hidden"
            >
              <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
                {menuOpen ? (
                  <>
                    <path d="M6 6l12 12" />
                    <path d="M18 6 6 18" />
                  </>
                ) : (
                  <>
                    <path d="M4 7h16" />
                    <path d="M4 12h16" />
                    <path d="M4 17h16" />
                  </>
                )}
              </svg>
            </button>
          </div>

          {menuOpen && (
            <div
              id="menu-mobile"
              className="absolute left-4 right-4 top-[72px] z-50 overflow-hidden rounded-2xl border border-white/10 bg-[#07101f]/98 p-2 shadow-2xl shadow-black/50 backdrop-blur-2xl sm:left-auto sm:right-6 sm:w-72 lg:hidden"
            >
              {[
                ["Início", "#inicio"],
                ["Soluções", "#solucoes"],
                ["Sobre", "#sobre"],
                ["Portfólio", "#portfolio"],
                ["Contato", "#contato"],
              ].map(([label, href]) => (
                <a
                  key={href}
                  href={href}
                  onClick={() => setMenuOpen(false)}
                  className="flex items-center justify-between rounded-xl px-4 py-3.5 text-sm font-medium text-slate-300 transition hover:bg-white/[0.06] hover:text-white"
                >
                  {label}
                  <ArrowIcon />
                </a>
              ))}

              <a
                href={WHATSAPP_URL}
                target="_blank"
                rel="noreferrer"
                onClick={() => setMenuOpen(false)}
                className="mt-2 flex items-center justify-center gap-2 rounded-xl bg-sky-400 px-4 py-3.5 text-sm font-bold text-[#020611] transition hover:bg-white"
              >
                Falar com a Vorzax
                <ArrowIcon />
              </a>
            </div>
          )}
        </div>
      </header>

      <section id="inicio" className="relative isolate min-h-[820px] overflow-hidden">
        <div className="hero-grid absolute inset-0 -z-30" />
        <div className="hero-dots absolute inset-0 -z-20 opacity-70" />
        <div className="absolute left-[-180px] top-[-180px] -z-20 h-[560px] w-[560px] rounded-full bg-blue-600/18 blur-[130px]" />
        <div className="absolute right-[-100px] top-[150px] -z-20 h-[520px] w-[520px] rounded-full bg-cyan-500/12 blur-[140px]" />
        <div className="absolute left-[40%] top-[10%] -z-20 h-[420px] w-[420px] rounded-full bg-indigo-600/10 blur-[150px]" />

        <div className="mx-auto grid min-h-[820px] max-w-7xl items-center gap-16 px-6 py-24 lg:grid-cols-[1.05fr_0.95fr] lg:px-10">
          <div className="relative z-10">
            <div className="mb-7 inline-flex items-center gap-3 rounded-full border border-white/10 bg-white/[0.05] px-4 py-2 text-xs font-semibold tracking-[0.18em] text-sky-300 backdrop-blur-xl">
              <span className="h-2 w-2 rounded-full bg-sky-400 shadow-[0_0_18px_#38bdf8]" />
              TECNOLOGIA PARA EMPRESAS
            </div>

            <h1 className="max-w-4xl text-balance text-5xl font-semibold leading-[1.01] tracking-[-0.058em] text-white sm:text-6xl lg:text-[82px]">
              Tecnologia que
              <span className="block bg-gradient-to-r from-sky-300 via-blue-400 to-indigo-400 bg-clip-text text-transparent">
                transforma operações.
              </span>
            </h1>

            <p className="mt-8 max-w-2xl text-lg leading-8 text-slate-400">
              Criamos sistemas, automações e experiências digitais para reduzir
              retrabalho, aumentar o controle e preparar sua empresa para crescer.
            </p>

            <div className="mt-10 flex flex-col gap-4 sm:flex-row">
              <button
                type="button"
                onClick={openDiagnostic}
                className="inline-flex items-center justify-center gap-3 rounded-full bg-white px-7 py-4 text-sm font-bold text-[#020611] transition hover:-translate-y-0.5 hover:bg-sky-300"
              >
                Começar um projeto
                <ArrowIcon />
              </button>

              <a
                href="#solucoes"
                className="inline-flex items-center justify-center rounded-full border border-white/15 bg-white/[0.04] px-7 py-4 text-sm font-semibold text-white backdrop-blur transition hover:border-white/30 hover:bg-white/[0.08]"
              >
                Conhecer soluções
              </a>
            </div>

            <div className="mt-16 grid max-w-xl grid-cols-3 gap-6 border-t border-white/10 pt-7">
              <div>
                <strong className="block text-2xl font-semibold">100%</strong>
                <span className="mt-1 block text-xs text-slate-500">Sob medida</span>
              </div>
              <div>
                <strong className="block text-2xl font-semibold">B2B</strong>
                <span className="mt-1 block text-xs text-slate-500">Foco empresarial</span>
              </div>
              <div>
                <strong className="block text-2xl font-semibold">360°</strong>
                <span className="mt-1 block text-xs text-slate-500">Visão do processo</span>
              </div>
            </div>
          </div>

          <div className="relative mx-auto w-full max-w-[580px] animate-float-soft">
            <div className="absolute -inset-10 rounded-full bg-blue-600/10 blur-[90px]" />

            <div className="relative overflow-hidden rounded-[34px] border border-white/12 bg-gradient-to-b from-white/[0.11] to-white/[0.025] p-3 shadow-2xl shadow-blue-950/50">
              <div className="rounded-[26px] border border-white/10 bg-[#07101f]/95 p-6 backdrop-blur-xl">
                <div className="mb-6 flex items-start justify-between gap-4">
                  <div>
                    <div className="mb-3 inline-flex items-center gap-2 rounded-full bg-sky-400/10 px-3 py-1 text-[9px] tracking-[0.18em] text-sky-300">
                      DEMONSTRAÇÃO DE PAINEL
                    </div>
                    <h2 className="text-xl font-semibold">Central de resultados</h2>
                    <p className="mt-1 text-xs text-slate-500">Dados ilustrativos</p>
                  </div>

                  <div className="flex gap-2 pt-1">
                    <span className="h-2.5 w-2.5 rounded-full bg-slate-700" />
                    <span className="h-2.5 w-2.5 rounded-full bg-slate-700" />
                    <span className="h-2.5 w-2.5 rounded-full bg-sky-400" />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-4">
                    <span className="text-xs text-slate-500">Eficiência operacional</span>
                    <strong className="mt-3 block text-3xl">94,8%</strong>
                    <span className="mt-2 block text-xs text-emerald-400">+12,4% no período</span>
                  </div>

                  <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-4">
                    <span className="text-xs text-slate-500">Processos monitorados</span>
                    <strong className="mt-3 block text-3xl">38</strong>
                    <span className="mt-2 block text-xs text-sky-400">7 novos fluxos</span>
                  </div>
                </div>

                <div className="mt-3 rounded-2xl border border-white/10 bg-white/[0.04] p-5">
                  <div className="mb-8 flex items-center justify-between">
                    <div>
                      <p className="text-xs text-slate-500">Evolução de performance</p>
                      <p className="mt-1 text-lg font-semibold">Crescimento contínuo</p>
                    </div>
                    <span className="rounded-full bg-emerald-400/10 px-3 py-1 text-xs text-emerald-400">+28,6%</span>
                  </div>

                  <div className="flex h-36 items-end gap-3">
                    {[34, 45, 40, 61, 55, 74, 68, 88, 80, 96].map((height, index) => (
                      <div
                        key={index}
                        className="flex-1 rounded-t-md bg-gradient-to-t from-blue-700 to-sky-400 opacity-85"
                        style={{ height: `${height}%` }}
                      />
                    ))}
                  </div>
                </div>

                <div className="mt-3 grid grid-cols-3 gap-3">
                  {["Financeiro", "Operações", "Comercial"].map((item) => (
                    <div key={item} className="rounded-xl border border-white/10 bg-white/[0.03] px-3 py-3 text-center text-xs text-slate-400">
                      {item}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="absolute -bottom-8 -left-8 hidden rounded-2xl border border-white/10 bg-[#07101f]/90 p-4 shadow-xl backdrop-blur-xl sm:block">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-400/10">
                  <span className="h-2.5 w-2.5 rounded-full bg-emerald-400 shadow-[0_0_14px_#34d399]" />
                </div>
                <div>
                  <p className="text-xs text-slate-500">Status da operação</p>
                  <p className="mt-1 text-sm font-semibold">Exemplo de status</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="relative border-y border-white/10 bg-white/[0.02]">
        <div className="mx-auto max-w-7xl px-6 py-7 lg:px-10">
          <div className="flex flex-wrap items-center justify-center gap-x-10 gap-y-4 text-xs font-semibold tracking-[0.16em] text-slate-500">
            <span className="text-sky-400">SOLUÇÕES PARA</span>
            {sectors.map((sector) => (
              <span key={sector}>{sector.toUpperCase()}</span>
            ))}
          </div>
        </div>
      </section>

      <section id="solucoes" className="relative">
        <div className="mx-auto max-w-7xl px-6 py-28 lg:px-10">
          <div className="grid gap-12 lg:grid-cols-[0.75fr_1.25fr]">
            <div>
              <p className="text-xs font-semibold tracking-[0.25em] text-sky-400">NOSSAS SOLUÇÕES</p>
              <h2 className="mt-5 max-w-lg text-balance text-4xl font-semibold leading-tight tracking-[-0.04em] sm:text-5xl">
                Tecnologia criada para resolver problemas reais.
              </h2>
              <p className="mt-6 max-w-lg leading-7 text-slate-400">
                Entendemos sua operação antes de propor qualquer ferramenta. O resultado é uma solução mais simples de usar, mais útil e alinhada ao negócio.
              </p>

              <button
                type="button"
                onClick={openDiagnostic}
                className="mt-8 inline-flex items-center gap-3 text-sm font-semibold text-white transition hover:text-sky-300"
              >
                Solicitar diagnóstico gratuito
                <ArrowIcon />
              </button>
            </div>

            <div className="grid gap-px overflow-hidden rounded-3xl border border-white/10 bg-white/10 sm:grid-cols-2">
              {services.map((service) => (
                <article key={service.number} className="group bg-[#050b16] p-8 transition duration-300 hover:bg-[#091427]">
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-xs text-sky-400">{service.number}</span>
                    <span className="text-slate-600 transition group-hover:translate-x-1 group-hover:text-sky-400">
                      <ArrowIcon />
                    </span>
                  </div>
                  <h3 className="mt-12 text-xl font-semibold">{service.title}</h3>
                  <p className="mt-4 text-sm leading-6 text-slate-500">{service.description}</p>
                  <div className="mt-6 flex items-center gap-2 text-xs text-slate-400">
                    <span className="text-emerald-400"><CheckIcon /></span>
                    {service.result}
                  </div>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section id="sobre" className="relative border-y border-white/10 bg-white/[0.02]">
        <div className="mx-auto grid max-w-7xl items-center gap-14 px-6 py-28 lg:grid-cols-[0.95fr_1.05fr] lg:px-10">
          <div className="relative overflow-hidden rounded-[34px] border border-white/10 bg-[#06101f] p-7">
            <div className="absolute right-[-80px] top-[-80px] h-56 w-56 rounded-full bg-sky-500/15 blur-[80px]" />
            <div className="relative">
              <p className="text-xs font-semibold tracking-[0.25em] text-sky-400">VISÃO VORZAX</p>
              <h3 className="mt-5 text-3xl font-semibold tracking-[-0.035em]">Estratégia, design e tecnologia trabalhando juntos.</h3>

              <div className="mt-10 grid gap-3 sm:grid-cols-2">
                {[
                  ["Clareza", "Soluções fáceis de entender e operar."],
                  ["Eficiência", "Menos retrabalho e mais produtividade."],
                  ["Escala", "Estrutura preparada para acompanhar o crescimento."],
                  ["Resultado", "Tecnologia ligada a objetivos reais do negócio."],
                ].map(([title, description]) => (
                  <div key={title} className="rounded-2xl border border-white/10 bg-white/[0.04] p-5">
                    <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-sky-400/10 text-sky-300">
                      <CheckIcon />
                    </div>
                    <h4 className="mt-5 font-semibold">{title}</h4>
                    <p className="mt-2 text-sm leading-6 text-slate-500">{description}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div>
            <p className="text-xs font-semibold tracking-[0.25em] text-sky-400">SOBRE A VORZAX</p>
            <h2 className="mt-5 text-balance text-4xl font-semibold leading-tight tracking-[-0.04em] sm:text-5xl">
              Uma empresa de tecnologia construída para entender empresas.
            </h2>
            <p className="mt-6 leading-7 text-slate-400">
              A Vorzax é uma empresa brasileira de tecnologia focada em digitalização empresarial, automação e desenvolvimento de soluções inteligentes. Nosso objetivo é transformar processos complexos em operações mais organizadas, produtivas e preparadas para crescer.
            </p>
            <p className="mt-4 leading-7 text-slate-400">
              Além dos serviços digitais, estamos desenvolvendo nossa própria plataforma de gestão empresarial, com foco em operações, frotas e manutenção.
            </p>

            <div className="mt-8 space-y-3">
              {["Atendimento próximo e consultivo", "Soluções personalizadas para cada operação", "Construção por etapas, com validação contínua"].map((item) => (
                <div key={item} className="flex items-center gap-3 text-sm text-slate-300">
                  <span className="flex h-7 w-7 items-center justify-center rounded-full bg-emerald-400/10 text-emerald-400">
                    <CheckIcon />
                  </span>
                  {item}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section id="processo" className="relative">
        <div className="mx-auto max-w-7xl px-6 py-28 lg:px-10">
          <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <div>
              <p className="text-xs font-semibold tracking-[0.25em] text-sky-400">COMO TRABALHAMOS</p>
              <h2 className="mt-5 max-w-3xl text-balance text-4xl font-semibold tracking-[-0.04em] sm:text-5xl">
                Da ideia ao resultado, com um processo claro.
              </h2>
            </div>
            <p className="max-w-md text-sm leading-6 text-slate-500">
              Cada etapa reduz incertezas, evita retrabalho e mantém o projeto alinhado ao que realmente importa para sua empresa.
            </p>
          </div>

          <div className="mt-14 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {process.map((item) => (
              <article key={item.step} className="group rounded-[26px] border border-white/10 bg-white/[0.035] p-7 transition hover:-translate-y-1 hover:border-sky-400/25 hover:bg-white/[0.055]">
                <span className="font-mono text-xs text-sky-400">{item.step}</span>
                <h3 className="mt-10 text-xl font-semibold">{item.title}</h3>
                <p className="mt-4 text-sm leading-6 text-slate-500">{item.description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="portfolio" className="relative border-y border-white/10 bg-white/[0.02]">
        <div className="mx-auto max-w-7xl px-6 py-28 lg:px-10">
          <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <div>
              <p className="text-xs font-semibold tracking-[0.25em] text-sky-400">PORTFÓLIO CONCEITUAL</p>
              <h2 className="mt-5 text-balance text-4xl font-semibold tracking-[-0.04em] sm:text-5xl">Soluções pensadas para crescer.</h2>
            </div>
            <p className="max-w-md text-sm leading-6 text-slate-500">
              Projetos demonstrativos que apresentam nossa visão de produto, experiência e capacidade de execução. Não representam clientes reais.
            </p>
          </div>

          <div className="mt-14 grid gap-5 lg:grid-cols-3">
            {projects.map((project, index) => (
              <article key={project.title} className="group overflow-hidden rounded-[28px] border border-white/10 bg-white/[0.035]">
                <div className="relative h-72 overflow-hidden border-b border-white/10 bg-[#06101f] p-6">
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_25%,rgba(14,165,233,0.2),transparent_40%)]" />
                  <ProjectVisual type={project.type} />
                  <span className="absolute bottom-4 right-5 font-mono text-xs text-slate-600">0{index + 1}</span>
                </div>

                <div className="p-7">
                  <p className="text-[10px] font-semibold tracking-[0.2em] text-sky-400">{project.tag}</p>
                  <h3 className="mt-3 text-2xl font-semibold">{project.title}</h3>
                  <p className="mt-4 text-sm leading-6 text-slate-500">{project.description}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="contato" className="relative overflow-hidden">
        <div className="absolute left-1/2 top-1/2 -z-10 h-[500px] w-[800px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-blue-600/10 blur-[150px]" />
        <div className="mx-auto max-w-7xl px-6 py-28 lg:px-10">
          <div className="overflow-hidden rounded-[38px] border border-white/10 bg-gradient-to-br from-[#07182f] via-[#07101f] to-[#020611] px-7 py-16 text-center sm:px-12 lg:px-16 lg:py-20">
            <p className="text-xs font-semibold tracking-[0.25em] text-sky-400">VAMOS CONVERSAR</p>
            <h2 className="mx-auto mt-6 max-w-4xl text-balance text-4xl font-semibold leading-tight tracking-[-0.05em] sm:text-6xl">
              Sua empresa está pronta para operar em outro nível?
            </h2>
            <p className="mx-auto mt-6 max-w-2xl leading-7 text-slate-400">
              Conte o que está travando sua operação. Vamos analisar o cenário e mostrar um caminho tecnológico possível, sem compromisso.
            </p>

            <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <button
                type="button"
                onClick={openDiagnostic}
                className="inline-flex items-center justify-center gap-3 rounded-full bg-sky-400 px-8 py-4 text-sm font-bold text-[#020611] transition hover:-translate-y-0.5 hover:bg-white"
              >
                Solicitar diagnóstico gratuito
                <ArrowIcon />
              </button>
              <span className="text-xs text-slate-500">Resposta pelo WhatsApp</span>
            </div>
          </div>
        </div>
      </section>

      <footer className="relative border-t border-white/10">
        <div className="mx-auto grid max-w-7xl gap-10 px-6 py-12 sm:grid-cols-2 lg:grid-cols-[1.2fr_0.8fr_0.8fr] lg:px-10">
          <div>
            <Logo />
            <p className="mt-5 max-w-sm text-sm leading-6 text-slate-500">
              Tecnologia inteligente para empresas que querem organizar processos, ganhar produtividade e crescer com controle.
            </p>
          </div>

          <div>
            <p className="text-xs font-semibold tracking-[0.18em] text-slate-400">NAVEGAÇÃO</p>
            <div className="mt-5 space-y-3 text-sm text-slate-500">
              <a className="block transition hover:text-white" href="#inicio">Início</a>
              <a className="block transition hover:text-white" href="#solucoes">Soluções</a>
              <a className="block transition hover:text-white" href="#sobre">Sobre</a>
              <a className="block transition hover:text-white" href="#portfolio">Portfólio</a>
            </div>
          </div>

          <div>
            <p className="text-xs font-semibold tracking-[0.18em] text-slate-400">CONTATO</p>
            <div className="mt-5 space-y-3 text-sm text-slate-500">
              <a className="block transition hover:text-white" href={WHATSAPP_URL} target="_blank" rel="noreferrer">WhatsApp</a>
              <a
  className="block transition hover:text-white"
  href={INSTAGRAM_URL}
  target="_blank"
  rel="noreferrer"
>
  Instagram
</a><span className="block">Minas Gerais, Brasil</span>
              <span className="block">Atendimento online</span>
            </div>
          </div>
        </div>

        <div className="border-t border-white/10">
          <div className="mx-auto flex max-w-7xl flex-col gap-3 px-6 py-6 text-xs text-slate-600 sm:flex-row sm:items-center sm:justify-between lg:px-10">
            <p>© 2026 Vorzax Tecnologia. Todos os direitos reservados.</p>
            <p>Site institucional • Portfólio conceitual</p>
          </div>
        </div>
      </footer>
    </main>
  );
}
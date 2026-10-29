"use client";

import Link from "next/link";
import Image from "next/image";
import { ReferenceLanding } from "@/components/ReferenceLanding";
import { VideoIntro } from "@/components/VideoIntro";
import { TechnologyInMotion } from "@/components/TechnologyInMotion";
import {
  useEffect,
  useRef,
  useState,
  type ChangeEvent,
  type FormEvent,
} from "react";
import { getSupabaseClient } from "../lib/supabase";
const WHATSAPP_URL =
  "https://wa.me/5531990681495?text=Ol%C3%A1%2C%20vim%20pelo%20site%20da%20Vorzax%20e%20gostaria%20de%20conversar%20sobre%20um%20projeto.";

const INSTAGRAM_URL = "https://www.instagram.com/vorzaxoficial/";
const CONTACT_EMAIL = "contato@vorzax.com.br";
const EMAIL_URL = `mailto:${CONTACT_EMAIL}`;
const CONTACT_PHONE = "(31) 99068-1495";
const services = [
  {
    number: "01",
    slug: "sites",
    title: "Sites profissionais",
    description:
      "Sites institucionais e landing pages para apresentar sua empresa, explicar serviços e facilitar o primeiro contato.",
    result: "Presença digital clara e responsiva",
  },
  {
    number: "02",
    slug: "automacao",
    title: "Automação de processos",
    description:
      "Automações pontuais para conectar etapas, reduzir tarefas repetitivas e organizar informações importantes.",
    result: "Rotinas com menos tarefas manuais",
  },
  {
    number: "03",
    slug: "bi",
    title: "Dashboards e BI",
    description:
      "Painéis visuais para reunir indicadores e facilitar o acompanhamento dos dados da empresa.",
    result: "Informações mais fáceis de acompanhar",
  },
  {
    number: "04",
    slug: "sistemas",
    title: "Sistemas sob medida",
    description:
      "Soluções desenvolvidas conforme a necessidade do negócio, para centralizar dados e fluxos de trabalho.",
    result: "Tecnologia adaptada à operação",
  },
];

const process = [
  {
    step: "01",
    title: "Você apresenta sua necessidade",
    description:
      "Conte qual desafio você deseja resolver: presença digital, processos, indicadores ou operação. Vamos avaliar o escopo mais adequado.",
  },
  {
    step: "02",
    title: "Planejamos a solução",
    description:
      "Avaliamos a necessidade e apresentamos uma proposta com escopo, etapas e condições adequadas ao projeto.",
  },
  {
    step: "03",
    title: "Desenvolvemos por etapas",
    description:
      "Após a aprovação e a contratação, executamos o projeto conforme o escopo e as validações combinadas.",
  },
];

function Logo() {
  // Original mark supplied by Vorzax. Never redraw as text or a generated symbol.
  return <Image src="/vorzax-logo-header.webp" alt="Vorzax Tecnologia" width={539} height={165} className="h-auto w-[174px] sm:w-[193px]" priority />;
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

function MailIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="m4 7 8 6 8-6" />
    </svg>
  );
}

function InstagramIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.4" cy="6.6" r="1" fill="currentColor" stroke="none" />
    </svg>
  );
}

function LocationIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
      <path d="M20 10c0 5-8 11-8 11S4 15 4 10a8 8 0 1 1 16 0Z" />
      <circle cx="12" cy="10" r="2.5" />
    </svg>
  );
}

function OnlineIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
      <circle cx="12" cy="12" r="9" />
      <path d="M3 12h18M12 3c2.5 2.5 3.8 5.5 3.8 9S14.5 18.5 12 21c-2.5-2.5-3.8-5.5-3.8-9S9.5 5.5 12 3Z" />
    </svg>
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
  const [footerVisible, setFooterVisible] = useState(false);
  const [diagnosticOpen, setDiagnosticOpen] = useState(false);
  const [diagnosticData, setDiagnosticData] = useState<DiagnosticFormData>(initialDiagnosticForm);
  const [privacyAccepted, setPrivacyAccepted] = useState(false);
  const [website, setWebsite] = useState("");
  const [diagnosticStatus, setDiagnosticStatus] = useState<"idle" | "sending" | "error">("idle");
  const [diagnosticError, setDiagnosticError] = useState("");
  const diagnosticDialogRef = useRef<HTMLDivElement>(null);
  const diagnosticFirstFieldRef = useRef<HTMLInputElement>(null);
  const previousFocusRef = useRef<HTMLElement | null>(null);

  const openDiagnostic = () => {
    previousFocusRef.current = document.activeElement as HTMLElement | null;
    setWhatsappOpen(false);
    setDiagnosticStatus("idle");
    setDiagnosticError("");
    setPrivacyAccepted(false);
    setWebsite("");
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
        return;
      }

      if (event.key !== "Tab") return;

      const focusable = diagnosticDialogRef.current?.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled])'
      );
      if (!focusable?.length) return;

      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKeyDown);
    window.setTimeout(() => diagnosticFirstFieldRef.current?.focus(), 0);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [diagnosticOpen, diagnosticStatus]);

  useEffect(() => {
    if (diagnosticOpen || !previousFocusRef.current) return;
    previousFocusRef.current.focus();
    previousFocusRef.current = null;
  }, [diagnosticOpen]);


  useEffect(() => {
    const elements = Array.from(document.querySelectorAll<HTMLElement>("[data-reveal]"));
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (reducedMotion) {
      elements.forEach((element) => element.setAttribute("data-visible", "true"));
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.setAttribute("data-visible", "true");
          observer.unobserve(entry.target);
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -8% 0px" }
    );

    elements.forEach((element) => observer.observe(element));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const footer = document.querySelector("footer");
    if (!footer) return;

    const observer = new IntersectionObserver(
      ([entry]) => setFooterVisible(entry.isIntersecting),
      { threshold: 0.08 }
    );

    observer.observe(footer);
    return () => observer.disconnect();
  }, []);

  const handleDiagnosticChange = (
    event: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = event.target;
    setDiagnosticData((current) => ({ ...current, [name]: value }));
    if (diagnosticStatus === "error") {
      setDiagnosticStatus("idle");
      setDiagnosticError("");
    }
  };

  const handleDiagnosticSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const nome = diagnosticData.nome.trim();
    const telefone = diagnosticData.telefone.trim();
    const empresa = diagnosticData.empresa.trim();
    const objetivo = diagnosticData.objetivo.trim();

    if (!privacyAccepted) {
      setDiagnosticStatus("error");
      setDiagnosticError("Confirme a Política de Privacidade para continuar.");
      return;
    }

    if (!nome || !telefone || !empresa || !diagnosticData.segmento || !diagnosticData.tipo_solucao) {
      setDiagnosticStatus("error");
      setDiagnosticError("Preencha os campos obrigatórios para enviar.");
      return;
    }

    if (objetivo.length < 20) {
      setDiagnosticStatus("error");
      setDiagnosticError("Descreva seu objetivo com mais detalhes (no mínimo 20 caracteres).");
      return;
    }

    if (website) {
      setDiagnosticStatus("idle");
      setDiagnosticOpen(false);
      return;
    }

    setDiagnosticStatus("sending");
    setDiagnosticError("");

    const mensagem = [
      "Olá, Vorzax! Compartilhei informações sobre um projeto pelo site.",
      "",
      "*FALE SOBRE SEU PROJETO*",
      `Nome: ${nome}`,
      `WhatsApp: ${telefone}`,
      diagnosticData.email.trim() ? `E-mail: ${diagnosticData.email.trim()}` : null,
      `Empresa: ${empresa}`,
      `Segmento: ${diagnosticData.segmento}`,
      `Solução desejada: ${diagnosticData.tipo_solucao}`,
      `Objetivo ou dificuldade: ${objetivo}`,
      `Prazo: ${diagnosticData.prazo || "Ainda não definido"}`,
    ]
      .filter(Boolean)
      .join("\n");

    const whatsappUrl = `https://wa.me/5531990681495?text=${encodeURIComponent(mensagem)}`;
    const whatsappWindow = window.open("about:blank", "_blank");

    // O contato não deve aguardar a resposta do banco para abrir o WhatsApp.
    if (whatsappWindow) {
      whatsappWindow.opener = null;
      whatsappWindow.location.replace(whatsappUrl);
    } else {
      window.location.assign(whatsappUrl);
    }

    setDiagnosticData(initialDiagnosticForm);
    setDiagnosticStatus("idle");
    setDiagnosticOpen(false);

    try {
      const supabase = getSupabaseClient();
      if (supabase) {
        const { error } = await supabase.from("atendimentos").insert({
          nome,
          telefone,
          email: diagnosticData.email.trim() || null,
          empresa,
          segmento: diagnosticData.segmento,
          tipo_solucao: diagnosticData.tipo_solucao,
          objetivo,
          prazo: diagnosticData.prazo || null,
          origem: "site",
          status: "novo",
          observacoes: "Lead recebido pelo formulário de contato sobre projetos e encaminhado ao WhatsApp.",
          proximo_passo: "Aguardar mensagem do cliente no WhatsApp",
        });

        if (error) {
          console.warn("Não foi possível registrar o diagnóstico no Supabase:", error);
        }
      } else {
        console.warn("Supabase não configurado; o diagnóstico seguirá apenas pelo WhatsApp.");
      }
    } catch (error) {
      console.warn("Não foi possível registrar o diagnóstico no Supabase:", error);
    }

  };

  return (
    <main className="vx-institutional relative isolate min-h-screen overflow-hidden bg-[#020611] text-white">
      <VideoIntro />
      <style>{`
        [data-reveal] {
          /* Keep the page usable even when the browser blocks client-side JS. */
          opacity: 1;
          transform: none;
          transition: opacity 650ms cubic-bezier(.2,.7,.2,1), transform 650ms cubic-bezier(.2,.7,.2,1);
        }
        [data-reveal][data-visible="true"] { opacity: 1; transform: none; }
        .contact-icon { transition: transform 300ms ease, box-shadow 300ms ease, background-color 300ms ease; }
        .contact-card:hover .contact-icon { transform: translateY(-3px) scale(1.05); }
        .metric-bar { transform-origin: bottom; animation: bar-rise 900ms cubic-bezier(.2,.7,.2,1) both; }
        .hero-orbit { animation: orbit-soft 13s linear infinite; }
        .hero-glow { animation: glow-pulse 5s ease-in-out infinite; }
        @keyframes bar-rise { from { transform: scaleY(.08); opacity: .25; } to { transform: scaleY(1); opacity: .85; } }
        @keyframes orbit-soft { to { transform: rotate(360deg); } }
        @keyframes glow-pulse { 0%, 100% { opacity: .55; transform: scale(1); } 50% { opacity: .9; transform: scale(1.08); } }
        @media (prefers-reduced-motion: reduce) {
          [data-reveal], [data-reveal="left"], [data-reveal="right"], [data-reveal="scale"] { opacity: 1; transform: none; transition: none; }
          .metric-bar, .hero-orbit, .hero-glow { animation: none; }
        }
      `}</style>
      {diagnosticOpen && (
        <div
          className="fixed inset-0 isolate flex items-center justify-center p-4 sm:p-6 pointer-events-auto"
          style={{ position: "fixed", inset: 0, zIndex: 999999 }}
        >
          <button
            type="button"
            aria-label="Fechar formulário de contato"
            onClick={closeDiagnostic}
            className="absolute inset-0 z-0 bg-black/75 backdrop-blur-sm"
            style={{ position: "absolute", inset: 0, zIndex: 0 }}
          />

          <div
            ref={diagnosticDialogRef}
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
                  FALE SOBRE SEU PROJETO
                </p>
                <h2 id="diagnostico-titulo" className="mt-2 text-2xl font-semibold tracking-tight sm:text-3xl">
                  Conte o que deseja desenvolver.
                </h2>
                <p id="diagnostico-descricao" className="mt-2 max-w-xl text-sm leading-6 text-slate-400">
                  Compartilhe sua necessidade para avaliarmos como a Vorzax pode ajudar.
                </p>
              </div>

              <button
                type="button"
                aria-label="Fechar formulário de contato"
                onClick={closeDiagnostic}
                className="shrink-0 text-2xl leading-none text-slate-500 transition hover:text-white"
              >
                ×
              </button>
            </div>

            <form onSubmit={handleDiagnosticSubmit} className="space-y-5 px-6 py-6 sm:px-8 sm:py-8">
              <div className="grid gap-5 sm:grid-cols-2">
                <label className="block">
                  <span className="text-xs font-semibold text-slate-300">Seu nome *</span>
                  <input
                    name="nome"
                    ref={diagnosticFirstFieldRef}
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
                    <option>Comércio, varejo e distribuição</option>
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
                  minLength={20}
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

              <div aria-hidden="true" className="absolute -left-[10000px] h-px w-px overflow-hidden">
                <label>
                  Não preencher este campo
                  <input
                    tabIndex={-1}
                    autoComplete="off"
                    value={website}
                    onChange={(event) => setWebsite(event.target.value)}
                  />
                </label>
              </div>

              <label className="flex items-start gap-3 text-xs leading-5 text-slate-500">
                <input
                  type="checkbox"
                  required
                  checked={privacyAccepted}
                  onChange={(event) => setPrivacyAccepted(event.target.checked)}
                  className="mt-1 h-4 w-4 shrink-0 accent-sky-400"
                />
                <span>
                  Concordo com o uso dos meus dados para contato, conforme a{" "}
                  <Link
                    className="text-sky-300 underline decoration-sky-400/40 underline-offset-2 hover:text-white"
                    href="/privacidade"
                    target="_blank"
                    rel="noreferrer"
                  >
                    Política de Privacidade
                  </Link>
                  .
                </span>
              </label>

              {diagnosticStatus === "error" && (
                <p className="rounded-xl border border-red-400/20 bg-red-400/10 px-4 py-3 text-sm leading-6 text-red-200">
                  {diagnosticError}
                </p>
              )}

              <div className="flex flex-col-reverse gap-3 border-t border-white/10 pt-5 sm:flex-row sm:items-center sm:justify-between">
                <p className="text-xs leading-5 text-slate-500">O WhatsApp abrirá com uma mensagem pronta: revise e confirme o envio no aplicativo. O site poderá registrar seus dados para atendimento.</p>
                <button
                  type="submit"
                  disabled={diagnosticStatus === "sending"}
                  className="inline-flex items-center justify-center gap-2 rounded-xl bg-sky-400 px-5 py-3 text-sm font-bold text-[#020611] transition hover:bg-white disabled:cursor-wait disabled:opacity-60"
                >
                  {diagnosticStatus === "sending" ? "Preparando..." : "Enviar pelo WhatsApp"}
                  {diagnosticStatus !== "sending" && <ArrowIcon />}
                </button>
              </div>
            </form>
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
          Converse com a Vorzax sobre sistemas, automações, BI, sites e outras soluções digitais.
        </p>

        <button
          type="button"
          onClick={openDiagnostic}
          className="mt-4 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-sky-400 px-4 py-3 text-sm font-bold text-[#020611] transition hover:bg-white"
        >
          Contar sobre meu projeto
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
    aria-label={whatsappOpen ? (footerVisible ? "Fechar opções do WhatsApp" : "Fale conosco — fechar opções") : footerVisible ? "Abrir WhatsApp" : "Fale conosco pelo WhatsApp"}
    aria-expanded={whatsappOpen}
    onClick={() => setWhatsappOpen((open) => !open)}
    className={`flex h-12 items-center justify-center gap-2 rounded-full bg-emerald-700 text-white shadow-[0_18px_50px_rgba(4,120,87,0.35)] transition-all duration-300 hover:-translate-y-1 hover:bg-emerald-600 sm:h-14 ${
      footerVisible ? "w-12 px-0 sm:w-14 sm:px-0" : "px-3 sm:px-5"
    }`}
  >
    <WhatsAppIcon />
    {!footerVisible && <span className="hidden text-sm font-bold sm:inline">Fale conosco</span>}
  </button>
</div>

      <header className="sticky top-0 z-40 border-b border-[#15324d] bg-[#020a16]/90 shadow-[0_12px_35px_rgba(0,0,0,.13)] backdrop-blur-2xl">
        <div className="relative mx-auto flex h-[68px] max-w-[1680px] items-center justify-between px-5 sm:h-[72px] sm:px-8 lg:px-10 xl:px-16">
          <a href="#inicio" aria-label="Vorzax - início" onClick={() => setMenuOpen(false)}>
            <Logo />
          </a>

          <nav className="hidden items-center gap-5 text-[12px] font-medium text-[#b6c5d5] xl:flex xl:gap-7">
            <a className="transition hover:text-white" href="#inicio">Início</a>
            <a className="transition hover:text-white" href="#solucoes">Soluções</a>
            <a className="transition hover:text-white" href="#processo">Como funciona</a>
            <a className="transition hover:text-white" href="#tecnologia-em-acao">Demonstrações</a>
            <a className="transition hover:text-white" href="#sobre">Sobre</a>
            <a className="transition hover:text-white" href="#contato">Contato</a>
            <Link className="transition hover:text-sky-300" href="/plataforma">Plataforma</Link>
          </nav>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={openDiagnostic}
              className="hidden rounded-full border border-[#156995] bg-[#06243b] px-5 py-2.5 text-xs font-semibold text-[#85d7ff] transition hover:border-[#35b9f9] hover:bg-[#103f65] hover:text-white sm:inline-flex"
            >
              Solicitar orçamento
            </button>

            <button
              type="button"
              onClick={openDiagnostic}
              className="inline-flex rounded-full border border-[#156995] bg-[#06243b] px-3 py-2.5 text-xs font-semibold text-[#85d7ff] transition hover:border-[#35b9f9] hover:bg-[#103f65] hover:text-white sm:hidden"
            >
              Orçamento
            </button>

            <button
              type="button"
              aria-label={menuOpen ? "Fechar menu" : "Abrir menu"}
              aria-expanded={menuOpen}
              aria-controls="menu-mobile"
              onClick={() => setMenuOpen((open) => !open)}
              className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-white/[0.04] text-white transition hover:border-white/20 hover:bg-white/[0.08] xl:hidden"
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
              className="absolute left-4 right-4 top-[68px] z-50 overflow-hidden rounded-2xl border border-[#245072] bg-[#071a2d]/98 p-2 shadow-2xl shadow-black/50 backdrop-blur-2xl sm:left-auto sm:right-6 sm:top-[72px] sm:w-72 xl:hidden"
            >
              {[
                ["Início", "#inicio"],
                ["Soluções", "#solucoes"],
                ["Como funciona", "#processo"],
                ["Demonstrações", "#tecnologia-em-acao"],
                ["Sobre", "#sobre"],
                ["Contato", "#contato"],
                ["Plataforma", "/plataforma"],
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

      <ReferenceLanding onContact={openDiagnostic} />


      <section id="solucoes" className="vx-section relative overflow-hidden border-b border-[#173451]">
        <div className="pointer-events-none absolute -left-44 top-20 h-[450px] w-[450px] rounded-full bg-[#0e72ce]/10 blur-[115px]" aria-hidden="true" />
        <div className="relative mx-auto grid max-w-[1440px] gap-12 px-5 py-16 sm:px-8 lg:grid-cols-[.82fr_1.18fr] lg:gap-20 lg:px-10 lg:py-24 xl:px-16">
          <div data-reveal>
            <p className="vx-eyebrow"><span className="vx-eyebrow-line" /> O QUE DESENVOLVEMOS</p>
            <h2 className="vx-heading mt-5 max-w-xl">Presença, processos, dados e sistemas. <span className="vx-gradient-text">Tudo conectado ao seu negócio.</span></h2>
            <p className="mt-6 max-w-lg text-sm leading-7 text-[#a6b8ce] sm:text-base">Atuamos em quatro frentes complementares: sites e landing pages, automações, dashboards e BI, e sistemas sob medida. Cada solução é planejada a partir da necessidade real da empresa.</p>
            <button type="button" onClick={openDiagnostic} className="mt-8 inline-flex min-h-12 items-center gap-3 border-b border-[#4388b7] text-sm font-semibold text-[#b9e5ff] transition hover:gap-5 hover:text-white">Discutir minha necessidade <ArrowIcon /></button>
            <div className="vx-solution-aside relative mt-9 hidden overflow-hidden rounded-[20px] border border-[#1d456b] bg-[#07192e] p-6 lg:block">
              <div className="flex items-center justify-between"><span className="text-[10px] font-semibold uppercase tracking-[.2em] text-[#7ebbe7]">NOSSO PONTO DE PARTIDA</span><span className="h-2 w-2 rounded-full bg-[#279fff] shadow-[0_0_16px_#279fff]" /></div>
              <div className="mt-8 grid grid-cols-4 gap-2">
                {["MARCA","SERVIÇOS","CONTATO","WEB"].map((word,index) => <div key={word} className="flex min-h-20 flex-col justify-between rounded-xl border border-[#27527b] bg-[#0c2844] p-2"><span className="text-[9px] font-mono text-[#68bdf9]">0{index+1}</span><span className="text-[9px] font-semibold tracking-[.04em] text-white">{word}</span></div>)}
              </div>
              <p className="mt-5 text-xs text-[#89a5bd]">Quatro competências. Uma mesma direção: tecnologia aplicada com clareza.</p>
            </div>
          </div>
          <div className="flex flex-col gap-3" data-reveal>
            {services.map((service) => (
              <a key={service.title} href="#tecnologia-em-acao" onClick={() => window.dispatchEvent(new CustomEvent("vorzax:demo", { detail: { slug: service.slug } }))} className={`vx-solution-row group grid gap-4 rounded-[20px] border border-[#244562] bg-[#081827] p-5 transition focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-cyan-300 sm:grid-cols-[54px_1fr_auto] sm:gap-5 sm:p-6`}>
                <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-[#2b628f] bg-[#103154] font-mono text-sm font-semibold text-[#76caff]">{service.number}</div>
                <div>
                  <h3 className="text-xl font-semibold leading-tight tracking-[-.035em] text-white sm:text-[22px]">{service.title}</h3>
                  <p className="mt-2 max-w-lg text-sm leading-6 text-[#9cb0c6]">{service.description}</p>
                  <div className="mt-4 flex items-center gap-2 text-xs text-[#8ed0fb]"><CheckIcon />{service.result}</div>
                </div>
                <span className="hidden h-10 w-10 items-center justify-center rounded-xl border border-[#315b7b] text-[#8fd2ff] transition group-hover:translate-x-1 group-hover:border-[#3ab6ff] group-hover:bg-[#0d3b65] sm:flex"><ArrowIcon /></span>
              </a>
            ))}
            <p className="mt-3 text-[11px] leading-5 text-[#91a7bb]">Selecione uma solução para visualizar sua demonstração interativa. Todas as interfaces são conceituais.</p>
          </div>
        </div>
      </section>

      <TechnologyInMotion />

      <section id="processo" className="vx-section vx-process-section relative overflow-hidden border-t border-[#173451]">
        <div className="vx-section-mesh pointer-events-none absolute inset-0" aria-hidden="true" />
        <div className="relative mx-auto max-w-[1440px] px-5 py-16 sm:px-8 lg:px-10 lg:py-24 xl:px-16">
          <div className="flex flex-col justify-between gap-7 lg:flex-row lg:items-end">
            <div className="max-w-3xl" data-reveal>
              <p className="vx-eyebrow"><span className="vx-eyebrow-line" /> COMO FUNCIONA / 01—03</p>
              <h2 className="vx-heading mt-5 max-w-3xl">Um processo objetivo. <span className="vx-gradient-text">Do primeiro contato à entrega.</span></h2>
            </div>
            <p className="max-w-md text-sm leading-7 text-[#a4b7ca] sm:text-base">Uma conversa inicial, uma proposta definida e a execução por etapas. Sem complexidade desnecessária.</p>
          </div>
          <div className="relative mt-12 grid gap-4 lg:grid-cols-3 lg:gap-5">
            <div className="pointer-events-none absolute left-[10%] right-[10%] top-[30px] hidden border-t border-dashed border-[#2e79af]/70 lg:block" aria-hidden="true" />
            {process.map((item) => (
              <article key={item.step} className="vx-process-card group relative flex flex-col overflow-hidden rounded-[22px] border border-[#234864] bg-[#08182a] px-6 pb-7 pt-6 sm:p-8" data-reveal>
                <div className="relative flex items-center justify-between">
                  <span className="flex h-12 w-12 items-center justify-center rounded-[13px] border border-[#2e6491] bg-[#0e3458] font-mono text-base font-semibold text-[#6fceff] shadow-[0_0_26px_rgba(20,116,218,.12)]">{item.step}</span>
                  <span className="font-mono text-[10px] tracking-[.16em] text-[#6a8ba8]">FASE {item.step} / 03</span>
                </div>
                <div className="mt-9 h-[3px] w-11 rounded-full bg-[#178cf4] transition-all duration-500 group-hover:w-20" />
                <h3 className="mt-5 max-w-xs text-[22px] font-semibold leading-[1.2] tracking-[-.04em] text-white">{item.title}</h3>
                <p className="mt-4 max-w-sm text-sm leading-7 text-[#9eb3c9]">{item.description}</p>
                <div className="mt-auto pt-9 text-[10px] font-semibold uppercase tracking-[.15em] text-[#529ed4]">PROCESSO VORZAX</div>
              </article>
            ))}
          </div>
          <div className="mt-9 flex flex-col justify-between gap-5 border-t border-[#173450] pt-7 sm:flex-row sm:items-center">
            <p className="max-w-lg text-xs leading-6 text-[#849ab2]">Cada proposta é definida de acordo com o projeto. Escopo, prazos e condições são alinhados antes do desenvolvimento.</p>
            <button type="button" onClick={openDiagnostic} className="vx-primary-button inline-flex min-h-12 shrink-0 items-center justify-center gap-3 rounded-xl px-6 py-3 text-sm font-semibold text-white">Falar sobre meu projeto <ArrowIcon /></button>
          </div>
        </div>
      </section>




      <section id="sobre" className="vx-section relative overflow-hidden border-b border-[#173450] bg-[#040e1b]">
        <div className="pointer-events-none absolute right-[-180px] top-[-150px] h-[580px] w-[580px] rounded-full bg-[#125baf]/10 blur-[140px]" aria-hidden="true" />
        <div className="relative mx-auto grid max-w-[1440px] items-center gap-12 px-5 py-16 sm:px-8 lg:grid-cols-[1.03fr_.97fr] lg:gap-20 lg:px-10 lg:py-24 xl:px-16">
          <div className="vx-capability-panel relative flex min-h-[450px] flex-col justify-between overflow-hidden rounded-[24px] border border-[#245277] bg-[radial-gradient(circle_at_70%_45%,#10395d_0%,#071b30_45%,#061324_100%)] p-7 shadow-[0_30px_80px_rgba(0,0,0,.2)] sm:p-10" data-reveal>
            <div className="vx-section-mesh pointer-events-none absolute inset-0 opacity-30" aria-hidden="true"/>
            <div className="pointer-events-none absolute -right-28 top-12 h-[330px] w-[330px] rounded-full border border-[#327bab]/25 shadow-[0_0_90px_rgba(14,135,242,.12)]" aria-hidden="true"/>
            <div className="pointer-events-none absolute -right-12 top-28 h-[215px] w-[215px] rounded-full border border-[#53b6ec]/25" aria-hidden="true"/>
            <div className="pointer-events-none absolute right-16 top-52 h-3 w-3 rounded-full bg-[#59c9ff] shadow-[0_0_25px_#3bb6fa]" aria-hidden="true"/>
            <div className="relative flex flex-wrap items-center justify-between gap-4">
              <span className="vx-eyebrow">VORZAX / NOSSA VISÃO</span>
              <span className="rounded-full border border-[#30658c] bg-[#0b304d]/70 px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[.13em] text-[#afddf8]">Tecnologia com propósito</span>
            </div>
            <div className="relative my-10 max-w-[460px]">
              <h3 className="text-[clamp(2.1rem,4vw,3.7rem)] font-semibold leading-[1.08] tracking-[-.06em] text-white">
                Menos ruído.<br/><span className="text-[#77c6f8]">Mais direção.</span>
              </h3>
              <p className="mt-6 max-w-sm text-sm leading-7 text-[#b1c8dd]">O projeto certo começa entendendo o problema. Depois, cada escolha de design e tecnologia precisa fazer sentido para o negócio.</p>
            </div>
            <div className="relative flex flex-wrap gap-x-5 gap-y-3 border-t border-[#315576] pt-6 text-[11px] font-semibold uppercase tracking-[.1em] text-[#8bc6ed]">
              <span>Estratégia</span><span>Design</span><span>Tecnologia</span>
            </div>
          </div>
          <div data-reveal>
            <p className="vx-eyebrow"><span className="vx-eyebrow-line" /> SOBRE A VORZAX</p>
            <h2 className="vx-heading mt-5 max-w-xl">Tecnologia com visão de negócio, <span className="vx-gradient-text">sem complicar o essencial.</span></h2>
            <p className="mt-6 max-w-xl text-sm leading-7 text-[#a6b9cf] sm:text-base">A Vorzax é uma empresa brasileira de tecnologia em desenvolvimento, dedicada a criar soluções digitais para negócios. Nosso trabalho reúne planejamento, desenvolvimento e atenção à experiência de quem vai usar a tecnologia.</p>
            <p className="mt-4 max-w-xl text-sm leading-7 text-[#a6b9cf]">Trabalhamos com sistemas sob medida, automações, dashboards e sites profissionais, avaliando cada demanda para propor um escopo adequado. Também desenvolvemos conceitos de produtos próprios, ainda não apresentados como soluções entregues a clientes.</p>
            <div className="mt-8 space-y-4 border-t border-[#24435f] pt-7">
              {["Contato direto e alinhamento de expectativas", "Propostas com escopo e etapas definidos", "Design, performance e experiência de uso"].map((item) => (
                <div key={item} className="flex items-start gap-3 text-sm text-[#c8d8e7]">
                  <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-lg bg-[#103957] text-[#74d3ff]"><CheckIcon /></span>{item}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section id="contato" className="relative overflow-hidden bg-[#030b17]">
        <div className="pointer-events-none absolute left-1/2 top-1/2 h-[550px] w-[850px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#0563bb]/10 blur-[150px]" aria-hidden="true" />
        <div className="relative mx-auto max-w-[1440px] px-5 py-20 sm:px-8 lg:px-10 lg:py-28 xl:px-16">
          <div className="vx-contact-panel relative grid overflow-hidden rounded-[24px] border border-[#28608b] bg-[#081b31] lg:grid-cols-[1.07fr_.93fr]" data-reveal>
            <div className="relative z-10 flex flex-col items-start px-6 py-11 sm:px-10 sm:py-14 lg:px-12 lg:py-16">
              <p className="vx-eyebrow"><span className="vx-eyebrow-line" /> SEU PRÓXIMO PROJETO</p>
              <h2 className="vx-heading mt-6 max-w-[650px]">O próximo passo da sua empresa <span className="vx-gradient-text">pode começar aqui.</span></h2>
              <p className="mt-6 max-w-xl text-sm leading-7 text-[#b0c3d6] sm:text-base">Conte o que você precisa desenvolver ou melhorar. Vamos entender a demanda e avaliar uma proposta adequada ao seu momento.</p>
              <button type="button" onClick={openDiagnostic} className="vx-primary-button mt-9 inline-flex min-h-12 items-center justify-center gap-3 rounded-xl px-6 py-3 text-sm font-semibold text-white">Conversar sobre meu projeto <ArrowIcon /></button>
              <p className="mt-5 text-xs text-[#83a1bd]">Primeiro contato sem compromisso de contratação.</p>
            </div>
            <div className="relative z-10 border-t border-[#275071] bg-[#07182b]/85 p-5 sm:p-8 lg:border-l lg:border-t-0 lg:p-10">
              <div className="rounded-[18px] border border-[#2a5476] bg-[#081f36] p-5 sm:p-7">
                <div className="flex items-center justify-between border-b border-[#284d6b] pb-5"><span className="text-[10px] font-bold uppercase tracking-[.17em] text-[#88d4ff]">VORZAX / CONTATO</span><span className="flex items-center gap-2 text-[10px] text-[#9ab9d2]"><span className="h-1.5 w-1.5 rounded-full bg-[#3ed3ff]"/>CANAIS DIRETOS</span></div>
                <h3 className="mt-6 text-[22px] font-semibold tracking-[-.04em] text-white">Vamos entender sua necessidade.</h3>
                <p className="mt-2 text-sm leading-6 text-[#97b1c7]">Escolha por onde prefere iniciar a conversa.</p>
                <div className="mt-7 grid gap-3">
                  <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" className="vx-contact-method group flex min-w-0 items-center gap-4 rounded-[13px] border border-[#2a536d] bg-[#0c2b3d] p-4 transition">
                    <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#0d5945] text-[#a5ffe1]"><WhatsAppIcon /></span>
                    <span className="min-w-0 flex-1"><span className="block text-[10px] font-bold uppercase tracking-[.13em] text-[#8abed3]">WHATSAPP</span><span className="mt-1 block text-sm font-semibold text-white">{CONTACT_PHONE}</span></span>
                    <span className="text-[#a8dff6] transition group-hover:translate-x-1"><ArrowIcon /></span>
                  </a>
                  <a href={EMAIL_URL} className="vx-contact-method group flex min-w-0 items-center gap-4 rounded-[13px] border border-[#2a536d] bg-[#0c2b3d] p-4 transition">
                    <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#123d67] text-[#92d4ff]"><MailIcon /></span>
                    <span className="min-w-0 flex-1"><span className="block text-[10px] font-bold uppercase tracking-[.13em] text-[#8abed3]">E-MAIL</span><span className="mt-1 block break-all text-sm font-semibold text-white">{CONTACT_EMAIL}</span></span>
                    <span className="text-[#a8dff6] transition group-hover:translate-x-1"><ArrowIcon /></span>
                  </a>
                </div>
                <div className="mt-6 flex items-start gap-2 border-t border-[#254a66] pt-5 text-[11px] leading-5 text-[#84a3bb]"><CheckIcon /> Envie sua demanda; a proposta é definida após entender o escopo.</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <footer className="relative border-t border-[#163a55] bg-[#030a14]">
        <div className="mx-auto grid max-w-[1440px] gap-10 px-5 py-14 sm:grid-cols-2 sm:px-8 lg:grid-cols-[1.2fr_0.8fr_0.8fr] lg:px-10 xl:px-16">
          <div data-reveal="left">
            <Logo />
            <p className="mt-5 max-w-sm text-sm leading-6 text-slate-500">
              Sites profissionais, automações e soluções digitais para empresas.
            </p>
          </div>

          <div data-reveal style={{ transitionDelay: "100ms" }}>
            <p className="text-xs font-semibold tracking-[0.18em] text-slate-400">NAVEGAÇÃO</p>
            <div className="mt-5 space-y-3 text-sm text-slate-500">
              <a className="block transition hover:text-white" href="#inicio">Início</a>
              <a className="block transition hover:text-white" href="#solucoes">Soluções</a>
              <a className="block transition hover:text-white" href="#sobre">Sobre</a>
              <button type="button" onClick={() => window.dispatchEvent(new Event("vorzax:replay-intro"))} className="block text-left text-[#9bd5fa] transition hover:text-white">Rever apresentação ↗</button>
              <Link className="block transition hover:text-sky-300" href="/plataforma">Plataforma</Link>
            </div>
          </div>

          <div data-reveal="right" style={{ transitionDelay: "180ms" }}>
            <p className="text-xs font-semibold tracking-[0.18em] text-slate-400">CONTATO</p>
            <div className="mt-5 space-y-3 text-sm text-slate-500">
              <a className="group flex items-center gap-3 transition hover:text-white" href={EMAIL_URL}>
                <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-sky-400/10 text-sky-300 transition group-hover:bg-sky-400 group-hover:text-[#020611]"><MailIcon /></span>
                <span>{CONTACT_EMAIL}</span>
              </a>
              <a className="group flex items-center gap-3 transition hover:text-white" href={WHATSAPP_URL} target="_blank" rel="noreferrer">
                <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-400/10 text-emerald-300 transition group-hover:bg-emerald-500 group-hover:text-white"><WhatsAppIcon /></span>
                <span>{CONTACT_PHONE}</span>
              </a>
              <a className="group flex items-center gap-3 transition hover:text-white" href={INSTAGRAM_URL} target="_blank" rel="noreferrer">
                <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-fuchsia-400/10 text-fuchsia-300 transition group-hover:bg-fuchsia-500 group-hover:text-white"><InstagramIcon /></span>
                <span>@vorzaxoficial</span>
              </a>
              <span className="flex items-center gap-3">
                <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-white/[0.05] text-slate-400"><LocationIcon /></span>
                <span>Minas Gerais, Brasil</span>
              </span>
              <span className="flex items-center gap-3">
                <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-white/[0.05] text-slate-400"><OnlineIcon /></span>
                <span>Atendimento online</span>
              </span>
            </div>
          </div>
        </div>

        <div className="border-t border-white/10">
          <div className="mx-auto flex max-w-[1440px] flex-col gap-3 px-5 py-6 text-xs text-[#6f859c] sm:flex-row sm:items-center sm:justify-between sm:px-8 lg:px-10 xl:px-16">
            <p>© 2026 Vorzax Tecnologia. Todos os direitos reservados.</p>
            <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
              <span>Tecnologia para empresas • Conceitos ilustrativos</span>
              <Link className="transition hover:text-slate-300" href="/privacidade">Privacidade</Link>
            </div>
          </div>
        </div>
      </footer>
    </main>
  );
}

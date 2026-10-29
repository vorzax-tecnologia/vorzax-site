"use client";

import { FormEvent, useState } from "react";
import Link from "next/link";
import { createClient } from "@/lib/supabase/client";
import { safeLoginDestination } from "@/lib/security/safe-redirect";

function Logo() {
  return (
    <div className="flex items-center gap-3">
      <div className="grid h-11 w-11 place-items-center rounded-2xl bg-gradient-to-br from-cyan-400 to-blue-600 shadow-[0_12px_40px_rgba(14,165,233,.35)]">
        <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" aria-hidden="true">
          <path d="M5 5h5l2 4 2-4h5l-7 14L5 5Z" fill="white" />
        </svg>
      </div>
      <div>
        <p className="text-lg font-semibold tracking-tight text-white">Vorzax</p>
        <p className="text-[10px] font-semibold uppercase tracking-[.28em] text-cyan-300">Business OS</p>
      </div>
    </div>
  );
}

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    setError("");

    const { error: signInError } = await createClient().auth.signInWithPassword({
      email: email.trim(),
      password,
    });

    if (signInError) {
      setError(
        signInError.message === "Invalid login credentials"
          ? "E-mail ou senha incorretos."
          : "Não foi possível entrar agora. Tente novamente.",
      );
      setLoading(false);
      return;
    }

    const next = new URLSearchParams(window.location.search).get("next");
    window.location.assign(safeLoginDestination(next));
  }

  return (
    <main className="relative min-h-screen overflow-hidden bg-[#030712] text-white">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_15%,rgba(14,165,233,.18),transparent_30%),radial-gradient(circle_at_85%_80%,rgba(37,99,235,.17),transparent_30%)]" />
      <div className="absolute inset-0 opacity-25 [background-image:linear-gradient(rgba(148,163,184,.07)_1px,transparent_1px),linear-gradient(90deg,rgba(148,163,184,.07)_1px,transparent_1px)] [background-size:44px_44px]" />

      <section className="relative mx-auto grid min-h-screen max-w-7xl lg:grid-cols-[1.08fr_.92fr]">
        <div className="hidden flex-col justify-between px-12 py-10 lg:flex xl:px-20 xl:py-14">
          <Logo />
          <div className="max-w-xl">
            <span className="inline-flex rounded-full border border-cyan-400/20 bg-cyan-400/10 px-3 py-1 text-xs font-medium text-cyan-200">
              Plataforma integrada de gestão
            </span>
            <h1 className="mt-7 text-5xl font-semibold leading-[1.08] tracking-[-.045em]">
              Toda a operação da sua empresa,
              <span className="block bg-gradient-to-r from-cyan-300 to-blue-400 bg-clip-text text-transparent">
                em um só lugar.
              </span>
            </h1>
            <p className="mt-6 max-w-lg text-lg leading-8 text-slate-400">
              Processos, manutenção, vendas, finanças e inteligência conectados
              em uma plataforma preparada para crescer com o seu negócio.
            </p>
            <div className="mt-10 grid grid-cols-3 gap-4">
              {[
                ["13", "módulos integrados"],
                ["360°", "visão da operação"],
                ["24/7", "dados disponíveis"],
              ].map(([value, label]) => (
                <div key={label} className="border-l border-white/10 pl-4">
                  <p className="text-2xl font-semibold text-white">{value}</p>
                  <p className="mt-1 text-xs leading-5 text-slate-500">{label}</p>
                </div>
              ))}
            </div>
          </div>
          <p className="text-xs text-slate-600">© 2026 Vorzax Tecnologia. Ambiente seguro.</p>
        </div>

        <div className="flex items-center justify-center border-white/5 bg-white/[.025] px-5 py-10 backdrop-blur-sm lg:border-l">
          <div className="w-full max-w-md">
            <div className="mb-10 lg:hidden">
              <Logo />
            </div>
            <div className="rounded-[28px] border border-white/10 bg-[#0b1220]/85 p-6 shadow-2xl shadow-black/40 backdrop-blur-xl sm:p-9">
              <div>
                <p className="text-sm font-medium text-cyan-300">Bem-vindo de volta</p>
                <h2 className="mt-2 text-3xl font-semibold tracking-tight">Acesse sua conta</h2>
                <p className="mt-3 text-sm leading-6 text-slate-400">
                  Use as credenciais cadastradas pela sua organização.
                </p>
              </div>

              <form onSubmit={handleSubmit} className="mt-8 space-y-5">
                <label className="block">
                  <span className="mb-2 block text-sm font-medium text-slate-300">E-mail</span>
                  <input
                    required
                    type="email"
                    autoComplete="email"
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}
                    placeholder="nome@empresa.com.br"
                    className="h-12 w-full rounded-xl border border-white/10 bg-white/[.04] px-4 text-sm text-white outline-none transition placeholder:text-slate-600 focus:border-cyan-400/60 focus:ring-4 focus:ring-cyan-400/10"
                  />
                </label>
                <label className="block">
                  <span className="mb-2 block text-sm font-medium text-slate-300">Senha</span>
                  <div className="relative">
                    <input
                      required
                      minLength={6}
                      type={showPassword ? "text" : "password"}
                      autoComplete="current-password"
                      value={password}
                      onChange={(event) => setPassword(event.target.value)}
                      placeholder="••••••••"
                      className="h-12 w-full rounded-xl border border-white/10 bg-white/[.04] px-4 pr-16 text-sm text-white outline-none transition placeholder:text-slate-600 focus:border-cyan-400/60 focus:ring-4 focus:ring-cyan-400/10"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword((value) => !value)}
                      className="absolute inset-y-0 right-3 text-xs font-medium text-slate-400 hover:text-white"
                    >
                      {showPassword ? "Ocultar" : "Mostrar"}
                    </button>
                  </div>
                </label>

                {error && (
                  <p role="alert" className="rounded-xl border border-rose-400/20 bg-rose-400/10 px-4 py-3 text-sm text-rose-200">
                    {error}
                  </p>
                )}

                <button
                  type="submit"
                  disabled={loading}
                  className="flex h-12 w-full items-center justify-center rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 text-sm font-semibold text-white shadow-lg shadow-blue-600/20 transition hover:brightness-110 disabled:cursor-wait disabled:opacity-65"
                >
                  {loading ? "Entrando..." : "Entrar na plataforma"}
                </button>
              </form>

              <div className="mt-7 flex items-center justify-between border-t border-white/10 pt-6 text-xs text-slate-500">
                <span>Conexão protegida</span>
                <Link href="/" className="font-medium text-slate-300 hover:text-cyan-300">
                  Voltar ao site
                </Link>
              </div>
            </div>
            <p className="mt-5 text-center text-xs text-slate-600">
              Problemas com o acesso? Fale com o administrador da sua empresa.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}

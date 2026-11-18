"use client";

import Link from "next/link";
import { useState, type FormEvent } from "react";
import { BusinessShell, SectionHeading } from "@/components/BusinessShell";
import { offerings } from "@/lib/offerings";

export function ProposalForm({ initialService = "" }: { initialService?: string }) {
  const [service,setService]=useState(initialService);
  const [name,setName]=useState("");
  const [company,setCompany]=useState("");
  const [email,setEmail]=useState("");
  const [objective,setObjective]=useState("");
  const [deadline,setDeadline]=useState("");
  const [consent,setConsent]=useState(false);
  const [prepared,setPrepared]=useState(false);
  const [copyStatus,setCopyStatus]=useState("");

  const serviceName=offerings.find(x=>x.slug===service)?.title??"Avaliação inicial do projeto";
  const text=[
    "Olá, Vorzax Tecnologia.",
    "",
    "Gostaria de solicitar uma proposta técnica ou conversa de avaliação.",
    "Nome: "+name,
    "Empresa: "+(company||"Não informada"),
    "E-mail para resposta: "+email,
    "Serviço: "+serviceName,
    "Problema ou objetivo: "+objective,
    "Prazo desejado: "+(deadline||"A definir"),
    "",
    "Aguardo orientações para os próximos passos."
  ].join("\n");
  const mailto="mailto:contato@vorzax.com.br?subject="+encodeURIComponent("Solicitação de proposta técnica - "+(company||name||"novo contato"))+"&body="+encodeURIComponent(text);

  function submit(e:FormEvent<HTMLFormElement>){
    e.preventDefault();
    if(!consent||!name.trim()||!email.trim()||objective.trim().length<12)return;
    setPrepared(true);
    setCopyStatus("");
  }
  async function copy(){
    try{
      await navigator.clipboard.writeText(text);
      setCopyStatus("Texto copiado. Cole no seu e-mail e envie para contato@vorzax.com.br.");
    }catch{
      setCopyStatus("Não foi possível copiar automaticamente. Selecione o texto abaixo e copie.");
    }
  }

  return <BusinessShell active="proposta">
    <SectionHeading eyebrow="VORZAX / CONTATO CORPORATIVO" title="Solicitar proposta técnica." description="Descreva a demanda e prepare um e-mail para a Vorzax. Esta página não transmite dados automaticamente nem cria um protocolo. Você confirma o envio no seu aplicativo de e-mail."/>
    <div className="mt-8 grid gap-6 lg:grid-cols-[1.35fr_.65fr]">
      <div className="rounded-2xl border border-[#315f7e] bg-[#0a253b] p-5 sm:p-8">
        {!prepared ? <form onSubmit={submit} className="space-y-5" aria-label="Preparar solicitação de proposta">
          <div className="grid gap-4 sm:grid-cols-2">
            <label className="text-sm font-semibold text-white">Seu nome <span aria-hidden="true">*</span>
              <input required maxLength={90} autoComplete="name" value={name} onChange={e=>setName(e.target.value)} className="mt-2 min-h-12 w-full rounded-lg border border-[#557996] bg-[#071827] px-3 text-white outline-none focus:border-[#78cdff]"/></label>
            <label className="text-sm font-semibold text-white">E-mail para resposta <span aria-hidden="true">*</span>
              <input required type="email" maxLength={140} autoComplete="email" value={email} onChange={e=>setEmail(e.target.value)} className="mt-2 min-h-12 w-full rounded-lg border border-[#557996] bg-[#071827] px-3 text-white outline-none focus:border-[#78cdff]"/></label>
          </div>
          <label className="block text-sm font-semibold text-white">Empresa <span className="font-normal text-[#a9c7df]">(opcional)</span>
            <input maxLength={110} autoComplete="organization" value={company} onChange={e=>setCompany(e.target.value)} className="mt-2 min-h-12 w-full rounded-lg border border-[#557996] bg-[#071827] px-3 text-white outline-none focus:border-[#78cdff]"/></label>
          <label className="block text-sm font-semibold text-white">Serviço desejado
            <select value={service} onChange={e=>setService(e.target.value)} className="mt-2 min-h-12 w-full rounded-lg border border-[#557996] bg-[#071827] px-3 text-white outline-none focus:border-[#78cdff]">
              <option value="">Preciso de orientação</option>
              {offerings.map(x=><option key={x.slug} value={x.slug}>{x.title}</option>)}
            </select></label>
          <label className="block text-sm font-semibold text-white">Problema, necessidade ou resultado esperado <span aria-hidden="true">*</span>
            <textarea required minLength={12} maxLength={1100} rows={5} value={objective} onChange={e=>setObjective(e.target.value)} placeholder="Ex.: organizar solicitações de manutenção e acompanhar os atendimentos por status" className="mt-2 block w-full rounded-lg border border-[#557996] bg-[#071827] px-3 py-3 text-white placeholder:text-[#7c9db6] outline-none focus:border-[#78cdff]"/></label>
          <label className="block text-sm font-semibold text-white">Prazo desejado <span className="font-normal text-[#a9c7df]">(opcional)</span>
            <input maxLength={100} value={deadline} onChange={e=>setDeadline(e.target.value)} placeholder="Ex.: próximo trimestre" className="mt-2 min-h-12 w-full rounded-lg border border-[#557996] bg-[#071827] px-3 text-white placeholder:text-[#7c9db6] outline-none focus:border-[#78cdff]"/></label>
          <label className="flex items-start gap-3 text-[12px] leading-6 text-[#c2d6e6]"><input type="checkbox" required checked={consent} onChange={e=>setConsent(e.target.checked)} className="mt-1.5 h-4 w-4 accent-[#3ca6e9]"/><span>Entendi que os dados serão incluídos no e-mail que eu decidir enviar e li a <Link className="font-semibold text-[#8dd8ff] underline" href="/privacidade">Política de Privacidade</Link>.</span></label>
          <button type="submit" className="min-h-12 rounded-lg bg-[#1478ca] px-6 text-sm font-semibold text-white transition hover:bg-[#248fe2]">Preparar e-mail de proposta →</button>
        </form> : <div aria-live="polite">
          <h2 className="text-2xl font-semibold text-white">Sua mensagem está preparada.</h2>
          <p className="mt-3 text-sm leading-7 text-[#bad4e8]">Nenhum dado foi enviado por este site. Clique para abrir seu e-mail e <strong className="text-white">confirme o envio</strong>. Se seu navegador não abrir o aplicativo, copie o conteúdo e envie manualmente.</p>
          <div className="mt-6 flex flex-wrap gap-3">
            <a href={mailto} className="inline-flex min-h-12 items-center rounded-lg bg-[#1478ca] px-5 text-sm font-semibold text-white hover:bg-[#238cda]">Abrir aplicativo de e-mail →</a>
            <button type="button" onClick={copy} className="min-h-12 rounded-lg border border-[#70add2] px-5 text-sm font-semibold text-[#c7e8ff] hover:bg-[#153f5a]">Copiar mensagem</button>
            <button type="button" onClick={()=>setPrepared(false)} className="min-h-12 px-3 text-sm font-semibold text-[#94cbed] underline">Editar dados</button>
          </div>
          {copyStatus&&<p className="mt-3 text-sm text-[#9ad4f5]" role="status">{copyStatus}</p>}
          <pre className="mt-6 whitespace-pre-wrap break-words rounded-lg border border-[#315b76] bg-[#041827] p-4 text-[12px] leading-6 text-[#bed9eb]">{text}</pre>
          <p className="mt-4 text-sm text-[#a6c8df]">Destinatário: <a href="mailto:contato@vorzax.com.br" className="font-semibold underline">contato@vorzax.com.br</a></p>
        </div>}
      </div>
      <aside className="space-y-4">
        <div className="rounded-xl border border-[#2f5977] bg-[#09253b] p-5 text-sm leading-7 text-[#bbd4e6]">
          <h2 className="text-lg font-semibold text-white">O que enviar?</h2>
          <p className="mt-2">O problema e o resultado esperado são suficientes para iniciar a conversa. Não envie credenciais, arquivos internos ou dados pessoais de terceiros neste primeiro contato.</p>
        </div>
        <div className="rounded-xl border border-[#2f5977] bg-[#09253b] p-5 text-sm leading-7 text-[#bbd4e6]">
          <h2 className="text-lg font-semibold text-white">Próximo passo</h2>
          <p className="mt-2">Depois de receber sua mensagem, a Vorzax poderá avaliar o contexto, solicitar informações adicionais e preparar uma proposta. Prazo, preço e condições dependem do escopo.</p>
          <p className="mt-3">Prefere outro canal? <a className="text-[#9bdeff] underline" href="https://wa.me/5531990681495" target="_blank" rel="noopener noreferrer">Conversar no WhatsApp</a>.</p>
        </div>
      </aside>
    </div>
  </BusinessShell>;
}

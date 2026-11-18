"use client";

import Link from "next/link";
import { useEffect, useRef, useState, type FormEvent } from "react";
import { BusinessShell, SectionHeading } from "@/components/BusinessShell";
import { offerings } from "@/lib/offerings";

type DeliveryMode="checking"|"manual"|"direct";
type ProposalResponse={ok?:boolean;code?:string;message?:string};

export function ProposalForm({ initialService = "" }: { initialService?: string }) {
  const [service,setService]=useState(initialService);
  const [name,setName]=useState("");
  const [company,setCompany]=useState("");
  const [email,setEmail]=useState("");
  const [objective,setObjective]=useState("");
  const [deadline,setDeadline]=useState("");
  const [website,setWebsite]=useState("");
  const [consent,setConsent]=useState(false);
  const [prepared,setPrepared]=useState(false);
  const [delivered,setDelivered]=useState(false);
  const [sending,setSending]=useState(false);
  const [delivery,setDelivery]=useState<DeliveryMode>("checking");
  const [error,setError]=useState("");
  const [copyStatus,setCopyStatus]=useState("");
  const [hydrated,setHydrated]=useState(false);
  const submitting=useRef(false);

  useEffect(()=>{
    const frame=requestAnimationFrame(()=>setHydrated(true));
    const controller=new AbortController();
    fetch("/api/contato",{cache:"no-store",signal:controller.signal})
      .then(async r=>r.ok?await r.json():{direct:false})
      .then(result=>{if(!controller.signal.aborted)setDelivery(result.direct===true?"direct":"manual");})
      .catch(()=>{if(!controller.signal.aborted)setDelivery("manual");});
    return ()=>{cancelAnimationFrame(frame);controller.abort();};
  },[]);

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
  const whatsapp="https://wa.me/5531990681495?text="+encodeURIComponent(text);
  const quickWhatsapp="https://wa.me/5531990681495?text="+encodeURIComponent("Olá, Vorzax! Vim do site e quero avaliar uma solução de "+serviceName.toLowerCase()+". Podemos conversar?");

  async function submit(e:FormEvent<HTMLFormElement>){
    e.preventDefault();
    if(!consent||name.trim().length<2||!email.trim()||objective.trim().length<12||submitting.current)return;
    setError("");setCopyStatus("");
    if(delivery!=="direct"){setPrepared(true);return;}
    submitting.current=true;
    setSending(true);
    try{
      const response=await fetch("/api/contato",{
        method:"POST",
        headers:{"Content-Type":"application/json"},
        body:JSON.stringify({name,email,company,service:serviceName,objective,deadline,consent,website}),
      });
      const result=(await response.json()) as ProposalResponse;
      if(response.ok&&result.ok===true){
        setDelivered(true);
        setPrepared(false);
      }else{
        setPrepared(true);
        setError(result.code==="rate_limited"
          ?"Há muitas tentativas recentes. Utilize o envio pelo aplicativo de e-mail."
          :"O envio automático não foi confirmado. Você pode concluir pelo seu e-mail sem perder os dados.");
      }
    }catch{
      setPrepared(true);
      setError("Não conseguimos confirmar o envio. Use a opção de e-mail abaixo.");
    }finally{
      submitting.current=false;
      setSending(false);
    }
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
    <SectionHeading
      eyebrow="VORZAX / CONTATO CORPORATIVO"
      title="Seu próximo projeto começa com uma conversa."
      description="Conte o que precisa resolver. Você escolhe como encaminhar sua solicitação, e nós avaliamos o escopo antes de apresentar uma proposta."
    />
    <div className="mt-8 grid gap-6 lg:grid-cols-[1.35fr_.65fr]">
      <div className="rounded-2xl border border-[#315f7e] bg-[#0a253b] p-5 sm:p-8">
        {delivered ? <div role="status" aria-live="polite" className="rounded-xl border border-[#287b9c] bg-[#103a50] p-5">
          <h2 className="text-2xl font-semibold text-white">Solicitação encaminhada.</h2>
          <p className="mt-3 text-sm leading-7 text-[#c7dfed]">O serviço de e-mail aceitou sua solicitação para entrega à Vorzax. Confira sua caixa de entrada para eventuais respostas. O recebimento final depende da entrega pelo provedor.</p>
          <button type="button" onClick={()=>{setDelivered(false);setPrepared(false);}} className="mt-5 min-h-11 rounded-lg border border-[#4a92b7] px-4 text-sm font-semibold text-[#c1e8ff]">Enviar outra solicitação</button>
        </div> : !prepared ? <form onSubmit={submit} data-vx-proposal-hydrated={hydrated?"true":"false"} className="space-y-4" aria-label="Preparar solicitação de proposta">
          <div className="grid gap-4 sm:grid-cols-2">
            <label className="text-sm font-semibold text-white">Seu nome <span aria-hidden="true">*</span>
              <input required minLength={2} maxLength={90} autoComplete="name" value={name} onChange={e=>setName(e.target.value)} className="mt-2 min-h-12 w-full rounded-lg border border-[#557996] bg-[#071827] px-3 text-white outline-none focus:border-[#78cdff]"/></label>
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
            <textarea required minLength={12} maxLength={1100} rows={4} value={objective} onChange={e=>setObjective(e.target.value)} placeholder="Ex.: organizar solicitações de manutenção e acompanhar os atendimentos por status" className="mt-2 block w-full rounded-lg border border-[#557996] bg-[#071827] px-3 py-3 text-white placeholder:text-[#7c9db6] outline-none focus:border-[#78cdff]"/></label>
          <label className="block text-sm font-semibold text-white">Prazo desejado <span className="font-normal text-[#a9c7df]">(opcional)</span>
            <input maxLength={100} value={deadline} onChange={e=>setDeadline(e.target.value)} placeholder="Ex.: próximo trimestre" className="mt-2 min-h-12 w-full rounded-lg border border-[#557996] bg-[#071827] px-3 text-white placeholder:text-[#7c9db6] outline-none focus:border-[#78cdff]"/></label>
          <div className="absolute -left-[10000px] h-px w-px overflow-hidden" aria-hidden="true">
            <label>Não preencher <input name="website" tabIndex={-1} autoComplete="off" value={website} onChange={e=>setWebsite(e.target.value)} /></label>
          </div>
          <label className="flex items-start gap-3 text-[12px] leading-6 text-[#c2d6e6]"><input type="checkbox" required checked={consent} onChange={e=>setConsent(e.target.checked)} className="mt-1.5 h-4 w-4 accent-[#3ca6e9]"/><span>Li a <Link className="font-semibold text-[#8dd8ff] underline" href="/privacidade">Política de Privacidade</Link> e concordo com o envio dos dados informados para atendimento desta solicitação.</span></label>
          <button type="submit" disabled={sending} className="min-h-12 w-full rounded-lg bg-[#1478ca] px-6 text-sm font-semibold text-white transition hover:bg-[#248fe2] disabled:cursor-wait disabled:opacity-60 sm:w-auto">
            {sending?"Enviando solicitação...":delivery==="direct"?"Enviar solicitação de proposta →":"Preparar mensagem de contato →"}
          </button>
          <p className="text-[11px] leading-5 text-[#95b7cf]">{delivery==="direct"
            ?"Envio direto protegido ao e-mail da Vorzax; uma confirmação será exibida após o provedor aceitar o pedido."
            :"Escolha entre WhatsApp e e-mail na próxima etapa. Nada será enviado sem sua confirmação."}</p>
        </form> : <div aria-live="polite">
          <h2 className="text-2xl font-semibold text-white">Sua mensagem está preparada.</h2>
          {error&&<p role="alert" className="mt-4 rounded-lg border border-[#ad6d48] bg-[#40271e] px-4 py-3 text-sm text-[#f9ddc9]">{error}</p>}
          <p className="mt-3 text-sm leading-7 text-[#bad4e8]">Seu briefing está pronto, mas <strong className="text-white">ainda não foi enviado</strong>. Escolha o canal para abrir a conversa e confirme o envio no aplicativo selecionado.</p>
          <div className="mt-6 flex flex-wrap gap-3">
            <a href={whatsapp} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-12 items-center rounded-lg bg-[#086e56] px-5 text-sm font-semibold text-white hover:bg-[#0c8668]">Continuar no WhatsApp ↗</a>
            <a href={mailto} className="inline-flex min-h-12 items-center rounded-lg border border-[#70add2] px-5 text-sm font-semibold text-[#cae8ff] hover:bg-[#153f5a]">Abrir aplicativo de e-mail ↗</a>
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
          <p className="mt-2">O problema e o resultado esperado são suficientes para iniciar a conversa. Evite credenciais, arquivos internos ou dados pessoais de terceiros.</p>
        </div>
        <div className="rounded-xl border border-[#2f5977] bg-[#09253b] p-5 text-sm leading-7 text-[#bbd4e6]">
          <h2 className="text-lg font-semibold text-white">Próximo passo</h2>
          <p className="mt-2">Após receber a solicitação, a Vorzax poderá avaliar o contexto, pedir informações adicionais e elaborar uma proposta. Prazos, preço e condições dependem do escopo.</p>
          <a href={quickWhatsapp} target="_blank" rel="noopener noreferrer" className="mt-5 inline-flex min-h-11 w-full items-center justify-center rounded-lg border border-[#247d72] bg-[#0b3b39] px-4 text-[13px] font-semibold text-[#b9f7e4] transition hover:bg-[#11554c]">Iniciar conversa rápida pelo WhatsApp ↗</a>
          <p className="mt-2 text-[11px] leading-5 text-[#9ebed2]">Atalho sem formulário. Sua mensagem só será enviada após confirmar no WhatsApp.</p>
        </div>
      </aside>
    </div>
  </BusinessShell>;
}

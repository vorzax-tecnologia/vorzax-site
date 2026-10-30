"use client";

import { useState } from "react";
import Image from "next/image";

type Device = "desktop" | "mobile";
export type VisualProps = { variant: number; device: Device; compact?: boolean; step?: number; playing?: boolean };


/**
 * The 3 illustrative photos normally live in /public and are installed by
 * predev / prebuild. Switching branches while next dev stays running skips
 * predev, so the local asset may return 404; fall back to the matching
 * original Unsplash photo without showing an empty color placeholder.
 */
function SitePhoto({
  local,
  remote,
  shade,
}: {
  local: string;
  remote: string;
  shade: string;
}) {
  const [source, setSource] = useState(local);
  return (
    <>
      <Image
        src={source}
        alt=""
        fill
        unoptimized
        sizes="(max-width: 640px) 402px, 960px"
        className="pointer-events-none absolute inset-0 h-full w-full object-cover"
        onError={() => {
          if (source === local) setSource(remote);
        }}
      />
      <div
        className="pointer-events-none absolute inset-0"
        aria-hidden="true"
        style={{ background: shade }}
      />
    </>
  );
}

export function DemoFrame({ children, device, compact = false, dark = true, title = "preview" }: { children: React.ReactNode; device: Device; compact?: boolean; dark?: boolean; title?: string }) {
  const mobile = device === "mobile" && !compact;
  return <div className={`mx-auto overflow-hidden border shadow-[0_18px_50px_rgba(0,0,0,.26)] ${mobile ? "w-full max-w-[340px] rounded-[28px] border-[7px] border-[#233b53]" : "w-full rounded-[14px] border-[5px] border-[#263e56]"} ${dark ? "bg-[#091728] text-white" : "bg-[#f8f9fa] text-[#182638]"}`}>
    <div className={`flex h-9 items-center gap-2 border-b px-3 ${dark ? "border-[#263e57] bg-[#10243b]" : "border-[#e4e8ec] bg-[#f1f3f6]"}`}>
      <span className="flex shrink-0 gap-1"><i className="h-[6px] w-[6px] rounded-full bg-[#f1807d]"/><i className="h-[6px] w-[6px] rounded-full bg-[#f5c36e]"/><i className="h-[6px] w-[6px] rounded-full bg-[#72d4ad]"/></span>
      <span className={`mx-auto min-w-0 max-w-[240px] flex-1 truncate rounded-md px-3 py-1 text-center text-[9px] ${dark ? "bg-[#091626] text-[#a9bfd4]" : "bg-[#e7ebef] text-[#53677b]"}`}>{title} · conceito ilustrativo</span>
      <span className="text-[9px] opacity-60">{mobile ? "M" : "D"}</span>
    </div>
    {children}
  </div>;
}

function HvacSite({mobile}:{mobile:boolean}) {
 const [service,setService]=useState(0);
 const [contact,setContact]=useState(false);
 const [submitted,setSubmitted]=useState(false);
 const [form,setForm]=useState({responsavel:"",empresa:"",servico:"Manutenção preventiva"});
 const scopes=[
  {name:"Instalação de sistemas",detail:"Vistoria técnica, dimensionamento e instalação de split, multi-split e VRF em espaços comerciais."},
  {name:"Manutenção preventiva",detail:"Inspeções, higienização, revisão de componentes e programação de visitas técnicas."},
  {name:"Projetos de climatização",detail:"Levantamento dos ambientes, análise de carga térmica e estudo de alternativas técnicas."}
 ];
 return <div className="relative min-h-[475px] bg-[#061627] text-white">
  <header className="flex items-center justify-between border-b border-[#1d415d] px-6 py-4"><strong className="text-[19px] font-black tracking-[-.05em]"><span className="mr-2 text-[#3bcbfd]">✳</span>CLIMA<span className="text-[#3bcbfd]">FORTE</span></strong>{mobile?<span className="text-lg">☰</span>:<nav className="flex gap-5 text-[11px] font-medium text-[#bed3e4]"><span>Serviços</span><span>Áreas atendidas</span><span>Sobre</span><button type="button" onClick={()=>setContact(true)} className="font-bold text-[#61d2ff]">Orçamento ↗</button></nav>}</header>
  <div className="grid gap-4 px-6 py-7 sm:px-8" style={{gridTemplateColumns:mobile?"1fr":"1.02fr .98fr"}}>
   <div className="flex flex-col justify-center"><p className="text-[10px] font-bold uppercase tracking-[.18em] text-[#54d5ff]">CLIMATIZAÇÃO PARA EMPRESAS</p><h4 className="mt-4 max-w-[500px] text-[clamp(28px,3.6vw,45px)] font-bold leading-[1.05] tracking-[-.06em]">Sua operação no clima certo.</h4><p className="mt-4 max-w-[430px] text-[13px] leading-6 text-[#bad1e1]">Instalação, projetos e manutenção preventiva de ar-condicionado para lojas, escritórios e operações comerciais.</p><div className="mt-5 flex flex-wrap gap-2"><button type="button" onClick={()=>setContact(true)} className="rounded-lg bg-[#087fc1] px-5 py-3 text-[12px] font-bold text-white transition hover:bg-[#1499de]">Solicitar orçamento ↗</button><button type="button" onClick={()=>setService(v=>(v+1)%3)} className="rounded-lg border border-[#32617a] px-4 py-3 text-[11px] text-[#b7d4e4]">Explorar serviços</button></div><p aria-live="polite" className="mt-4 min-h-10 max-w-[440px] text-[12px] leading-5 text-[#a6d8ec]">{submitted?"Solicitação de exemplo preparada. Nenhum contato foi enviado.":scopes[service].detail}</p></div>
   <div className="relative min-h-[290px] overflow-hidden rounded-[12px] bg-[#15334b]" role="img" aria-label="Imagem conceitual de ambientes comerciais climatizados" ><SitePhoto local="/demo-hvac-workspace.webp" remote="https://images.unsplash.com/photo-1497366216548-37526070297c?w=960&h=720&fit=crop&fm=webp&q=77" shade="linear-gradient(180deg,rgba(2,14,27,.02) 15%,rgba(2,14,27,.78) 100%)"/><span className="absolute right-4 top-4 rounded-full bg-[#0a2d43]/85 px-3 py-2 text-[10px] font-semibold text-[#d8f4ff]">CLIMATIZAÇÃO COMERCIAL</span><div className="absolute inset-x-5 bottom-5"><p className="text-[10px] font-bold tracking-[.15em] text-[#8fe0ff]">INSTALAÇÃO · MANUTENÇÃO · PROJETOS</p><p className="mt-2 max-w-[330px] text-[19px] font-semibold leading-6">Soluções para manter ambientes empresariais funcionando.</p></div></div>
  </div>
  <section className="grid gap-3 px-6 pb-6 sm:px-8" style={{gridTemplateColumns:mobile?"1fr":"repeat(3,minmax(0,1fr))"}} aria-label="Serviços demonstrativos">{scopes.map((item,i)=><button key={item.name} type="button" aria-pressed={service===i} onClick={()=>setService(i)} className="rounded-xl border p-4 text-left transition-colors" style={{borderColor:service===i?"#47a8df":"#285272",background:service===i?"#144367":"#0c2b44"}}><span className="text-[10px] font-bold text-[#58cef5]">0{i+1} / SERVIÇO</span><p className="mt-2 text-[14px] font-bold">{item.name}</p><p className="mt-2 text-[11px] leading-4 text-[#bed7e9]">{item.detail}</p></button>)}</section>
  {contact&&<div className="absolute inset-0 z-20 flex items-center justify-center bg-[#04121f]/95 p-5" role="dialog" aria-modal="true" aria-label="Formulário de orçamento demonstrativo"><form onSubmit={e=>{e.preventDefault();setSubmitted(true);setContact(false)}} className="w-full max-w-[560px] rounded-xl border border-[#3e89b2] bg-[#0b2941] p-6 shadow-2xl"><div className="flex items-start justify-between gap-4"><div><p className="text-[10px] font-bold tracking-[.14em] text-[#7cdbff]">SIMULAÇÃO DE ATENDIMENTO</p><h5 className="mt-2 text-[23px] font-bold">Solicitar orçamento</h5><p className="mt-2 text-[12px] leading-5 text-[#c6dbe8]">Preencha uma solicitação de exemplo. Nenhum dado será enviado ou armazenado.</p></div><button type="button" onClick={()=>setContact(false)} className="rounded-lg border border-white/20 px-3 py-2 text-sm" aria-label="Fechar formulário">✕</button></div><div className="mt-5 grid gap-3 sm:grid-cols-2"><label className="text-[11px] text-[#cae7f7]">Responsável<input required maxLength={60} value={form.responsavel} onChange={e=>setForm(v=>({...v,responsavel:e.target.value}))} className="mt-2 block w-full rounded-lg border border-[#406b88] bg-[#061e32] px-3 py-3 text-[13px] text-white" placeholder="Seu nome"/></label><label className="text-[11px] text-[#cae7f7]">Empresa<input required maxLength={60} value={form.empresa} onChange={e=>setForm(v=>({...v,empresa:e.target.value}))} className="mt-2 block w-full rounded-lg border border-[#406b88] bg-[#061e32] px-3 py-3 text-[13px] text-white" placeholder="Nome da empresa"/></label></div><label className="mt-4 block text-[11px] text-[#cae7f7]">Serviço desejado<select value={form.servico} onChange={e=>setForm(v=>({...v,servico:e.target.value}))} className="mt-2 block w-full rounded-lg border border-[#406b88] bg-[#061e32] px-3 py-3 text-[13px] text-white">{scopes.map(x=><option key={x.name}>{x.name}</option>)}</select></label><button type="submit" className="mt-5 w-full rounded-lg bg-[#087cbd] px-4 py-3 text-[13px] font-bold text-white">Pré-visualizar solicitação ↗</button></form></div>}
 </div>;
}

function AccountingSite({ mobile }: { mobile:boolean }) {
 const [selected,setSelected]=useState(0);
 const [contactOpen,setContactOpen]=useState(false);
 const specialties=[
  ["01","Contabilidade empresarial","Organização fiscal e acompanhamento da rotina empresarial."],
  ["02","Planejamento tributário","Análise de regimes e oportunidades para uma gestão mais clara."],
  ["03","Gestão de folha","Processos de pessoal, obrigações e acompanhamento mensal."]
 ];
 return <div className="relative min-h-[475px] bg-[#f5f3ec] text-[#243d35]">
  <div className="flex items-center justify-between border-b border-[#d5dbd1] px-5 py-5"><strong className="font-serif text-[22px] tracking-[-.04em]"><span className="mr-1 text-[#2a8974]">◈</span>norte<span className="font-sans text-[10px] font-semibold uppercase tracking-[.2em]"> contábil</span></strong><div className="flex gap-5 text-[10px]">{mobile ? <button type="button" onClick={()=>setContactOpen(true)} aria-label="Abrir contato demonstrativo">☰</button> : <><button type="button" onClick={()=>setSelected(0)}>Especialidades</button><button type="button" onClick={()=>setSelected(1)}>Nosso escritório</button><button type="button" onClick={()=>setContactOpen(true)} className="text-[#287762]">Conversar ↗</button></>}</div></div>
  <div className={`grid gap-5 px-5 pb-7 pt-8 sm:px-8 sm:pt-10 ${mobile?"grid-cols-1":"grid-cols-[1.04fr_.96fr]"}`}>
    <div className="flex flex-col justify-center">
      <div className="w-fit rounded-full border border-[#b9cfc0] bg-[#e5efe8] px-4 py-2 text-[10px] font-semibold uppercase tracking-[.11em] text-[#287762]">CONTABILIDADE CONSULTIVA</div>
      <h4 className="mt-5 max-w-[460px] font-serif text-[clamp(27px,3.5vw,44px)] leading-[1.09] tracking-[-.04em]">Boas decisões começam com <em className="font-normal text-[#287762]">clareza.</em></h4>
      <p className="mt-4 max-w-[440px] text-xs leading-6 text-[#58685e]">Contabilidade e orientação empresarial para quem valoriza organização, transparência e proximidade.</p>
      <button type="button" onClick={()=>setContactOpen(true)} className="mt-6 inline-flex w-fit rounded-full bg-[#226f59] px-5 py-3 text-[11px] font-semibold text-white">Fale com um especialista ↗</button>
    </div>
    <div className="relative min-h-[260px] overflow-hidden rounded-[14px] border border-[#d3d9d1] bg-[#e6ebe6]"
      role="img" aria-label="Fotografia ilustrativa de documentos e mesa de trabalho administrativo"
      ><SitePhoto local="/demo-accounting-workspace.webp" remote="https://images.unsplash.com/photo-1554224154-22dec7ec8818?w=960&h=720&fit=crop&fm=webp&q=77" shade="linear-gradient(180deg,rgba(8,42,33,.02),rgba(8,42,33,.52))"/>
      <div className="absolute bottom-4 left-4 right-4 rounded-xl border border-white/20 bg-[#163f33]/85 p-4 text-white backdrop-blur-sm">
        <p className="text-[9px] font-semibold uppercase tracking-[.15em] text-[#b4e2cc]">ATENDIMENTO EMPRESARIAL</p>
        <p className="mt-2 text-sm font-semibold">Organização financeira e atenção aos detalhes.</p>
      </div>
    </div>
  </div>
  <div className="mx-5 border-t border-[#d0d9cf] py-5 text-center sm:mx-8"><p className="mb-4 text-[10px] font-bold uppercase tracking-[.15em] text-[#536a59]">ATENDIMENTO POR ESPECIALIDADE</p><div className={`grid gap-3 ${mobile ? "grid-cols-1":"grid-cols-3"}`}>{specialties.map(([n,x],i)=><button type="button" key={n} onClick={()=>setSelected(i)} aria-pressed={selected===i} className={`min-h-[90px] rounded-xl border p-4 text-left transition-colors ${selected===i?"border-[#28826c] bg-[#e2eee5]":"border-[#d4ddd3] bg-white/90 hover:border-[#7cac9e]"}`}><span className="text-[10px] text-[#29836b]">{n} / ESPECIALIDADE</span><p className="mt-3 font-serif text-[15px] leading-5">{x}</p></button>)}</div><p aria-live="polite" className="mt-2 text-left text-[11px] text-[#48695b]">{specialties[selected][2]}</p></div>
 {contactOpen&&<div role="dialog" aria-modal="true" aria-label="Contato demonstrativo contábil" className="absolute inset-0 z-20 flex items-center justify-center bg-[#143b30]/90 p-4"><div className="w-full max-w-[410px] rounded-xl bg-[#f6f4ec] p-6 shadow-xl"><h5 className="font-serif text-xl font-bold">Vamos conversar?</h5><p className="mt-3 text-sm leading-6">Demonstração de contato de um escritório contábil. Nenhuma mensagem é enviada.</p><button type="button" onClick={()=>setContactOpen(false)} className="mt-4 rounded-lg bg-[#226f59] px-4 py-2 text-sm font-semibold text-white">Voltar ao site</button></div></div>}
 </div>;
}

function ArchitectureSite({ mobile }: { mobile:boolean }) {
 return <div className="min-h-[475px] bg-[#e9e3d8] text-[#262825]">
   <div className="flex items-center justify-between border-b border-[#b7b2a8] px-5 py-4"><strong className="font-serif text-[23px] italic tracking-[-.055em]">linha<span className="font-sans text-xs not-italic"> / atelier</span></strong><span className="text-[10px] uppercase tracking-[.15em]">{mobile ? "Menu +" : "Projetos　 Estúdio　 Contato"}</span></div>
   <div className={`grid gap-3 p-4 sm:p-6 ${mobile ? "grid-cols-1" : "grid-cols-[1.35fr_.65fr]"}`}>
     <div className="relative min-h-[325px] overflow-hidden rounded-[2px] bg-[#373e38]"
       role="img" aria-label="Fotografia ilustrativa de residência contemporânea com arquitetura autoral"
       ><SitePhoto local="/demo-architecture-residence.webp" remote="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=960&h=720&fit=crop&fm=webp&q=79" shade="linear-gradient(180deg,rgba(12,18,14,.05),rgba(12,18,14,.65))"/>
       <div className="absolute left-5 top-5 rounded-sm border border-white/35 bg-[#141b17]/50 px-3 py-2 text-[10px] uppercase tracking-[.13em] text-white backdrop-blur-sm">PORTFÓLIO / 01</div>
       <div className="absolute bottom-5 left-5 right-5 flex items-end justify-between gap-3">
         <div><span className="text-[10px] font-semibold tracking-[.14em] text-[#e5ddd2]">PROJETO RESIDENCIAL</span><p className="mt-2 font-serif text-[25px] leading-7 text-white">Essência e arquitetura.</p></div>
         <span className="text-xl text-white">↗</span>
       </div>
     </div>
     <div className="flex flex-col justify-between bg-[#d5ccbf] p-5"><div><span className="text-[10px] uppercase tracking-[.2em] text-[#554739]">ARQUITETURA AUTORAL</span><h4 className="mt-5 font-serif text-[clamp(25px,3vw,40px)] leading-[1.1] tracking-[-.04em]">Espaços que contam histórias.</h4><p className="mt-4 text-xs leading-6 text-[#50483f]">Interiores, arquitetura e experiências que refletem uma identidade.</p></div><span className="mt-5 w-fit border-b border-[#3c3831] pb-1 text-xs font-semibold">Explorar projetos ↗</span></div>
   </div>
   <div className="flex flex-wrap justify-between gap-3 px-6 pb-5 text-[10px] uppercase tracking-[.15em] text-[#544a40]"><span>RESIDENCIAL</span><span>COMERCIAL</span><span>INTERIORES</span><span>PROJETOS CONCEITUAIS</span></div>
 </div>;
}

export function SiteDemo({variant,device,compact=false}: VisualProps) {
 const mobile=device==="mobile"&&!compact;
 return <DemoFrame device={device} compact={compact} dark={variant===0} title={["climaforte.com.br","nortecontabil.com.br","linha-atelier.com.br"][variant]}>
 {variant===0?<HvacSite mobile={mobile}/>:variant===1?<AccountingSite mobile={mobile}/>:<ArchitectureSite mobile={mobile}/>}
 </DemoFrame>;
}

"use client";

type Device = "desktop" | "mobile";
export type VisualProps = { variant: number; device: Device; compact?: boolean; step?: number; playing?: boolean };

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

function HvacSite({ mobile }: { mobile:boolean }) {
  return <div className="min-h-[475px] bg-[#061627] text-white">
    <div className="flex items-center justify-between border-b border-[#1d415d] px-5 py-4">
      <strong className="text-[17px] font-black tracking-[-.04em]"><span className="mr-2 text-[#3bcbfd]">✳</span>CLIMA<span className="text-[#3bcbfd]">FORTE</span></strong>
      {mobile ? <span className="rounded-md border border-[#356580] px-2 py-1 text-sm">☰</span> : <div className="flex gap-5 text-[10px] font-medium text-[#bed3e4]"><span>Serviços</span><span>Segmentos</span><span>Atendimento</span><span className="text-[#61d2ff]">Orçamento ↗</span></div>}
    </div>
    <div className={`grid ${mobile ? "grid-cols-1" : "grid-cols-[1.08fr_.92fr]"} gap-3 px-5 py-7 sm:px-8`}>
      <div className="flex flex-col justify-center">
        <p className="text-[10px] font-bold uppercase tracking-[.2em] text-[#54d5ff]">ENGENHARIA DE CLIMATIZAÇÃO</p>
        <h4 className="mt-4 max-w-[450px] text-[clamp(23px,3.6vw,42px)] font-bold leading-[1.09] tracking-[-.06em]">Sua operação no clima certo.</h4>
        <p className="mt-4 max-w-[390px] text-xs leading-6 text-[#bad1e1]">Instalação e manutenção de ar-condicionado para estabelecimentos comerciais.</p>
        <div className="mt-5 flex flex-wrap gap-2"><span className="rounded-lg bg-[#075f9b] px-4 py-2.5 text-[10px] font-bold text-white">Solicitar orçamento ↗</span><span className="rounded-lg border border-[#32617a] px-4 py-2.5 text-[10px] text-[#b7d4e4]">Nossos serviços</span></div>
      </div>
      <div className="relative min-h-[265px] overflow-hidden rounded-[16px] border border-[#3c7495]/60 bg-[#15334b] shadow-[0_18px_45px_rgba(0,0,0,.28)]"
        role="img" aria-label="Fotografia ilustrativa de espaço corporativo com instalações técnicas aparentes"
        style={{backgroundImage:'linear-gradient(180deg,rgba(2,14,27,.02) 15%,rgba(2,14,27,.75) 100%),url("https://images.unsplash.com/photo-1497366216548-37526070297c?w=960&h=720&fit=crop&auto=format&q=78")',backgroundSize:'cover',backgroundPosition:'center'}}>
        <div className="absolute right-4 top-4 rounded-full border border-white/30 bg-[#0a2d43]/75 px-3 py-2 text-[9px] font-semibold tracking-[.08em] text-white backdrop-blur-sm">CLIMATIZAÇÃO COMERCIAL</div>
        <div className="absolute inset-x-5 bottom-5 flex items-end justify-between gap-4">
          <div><span className="text-[9px] font-bold uppercase tracking-[.17em] text-[#8fe0ff]">AMBIENTES COMERCIAIS</span><p className="mt-2 max-w-[240px] text-base font-semibold leading-5 text-white">Instalações pensadas para o seu negócio.</p></div>
          <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-white/50 bg-white/15 text-white">↗</span>
        </div>
      </div>
    </div>
    <div className={`grid ${mobile ? "grid-cols-1" : "grid-cols-3"} gap-2 px-5 pb-6 sm:px-8`}>{["Instalação planejada","Manutenção preventiva","Projetos comerciais"].map((x,i)=><div key={x} className="rounded-xl border border-[#285272] bg-[#0c2b44] p-4"><span className="text-[#58cef5]">0{i+1} ─</span><p className="mt-3 text-xs font-bold">{x}</p><p className="mt-1 text-[10px] text-[#a6c1d5]">Saiba mais ↗</p></div>)}</div>
  </div>;
}

function AccountingSite({ mobile }: { mobile:boolean }) {
 return <div className="min-h-[475px] bg-[#f5f3ec] text-[#243d35]">
  <div className="flex items-center justify-between border-b border-[#d5dbd1] px-5 py-5"><strong className="font-serif text-[22px] tracking-[-.04em]"><span className="mr-1 text-[#2a8974]">◈</span>norte<span className="font-sans text-[10px] font-semibold uppercase tracking-[.2em]"> contábil</span></strong><div className="flex gap-5 text-[10px]">{mobile ? <span>☰</span> : <><span>Especialidades</span><span>Nosso escritório</span><span className="text-[#287762]">Conversar ↗</span></>}</div></div>
  <div className={`grid gap-5 px-5 pb-7 pt-8 sm:px-8 sm:pt-10 ${mobile?"grid-cols-1":"grid-cols-[1.04fr_.96fr]"}`}>
    <div className="flex flex-col justify-center">
      <div className="w-fit rounded-full border border-[#b9cfc0] bg-[#e5efe8] px-4 py-2 text-[10px] font-semibold uppercase tracking-[.11em] text-[#287762]">CONTABILIDADE CONSULTIVA</div>
      <h4 className="mt-5 max-w-[460px] font-serif text-[clamp(27px,3.5vw,44px)] leading-[1.09] tracking-[-.04em]">Boas decisões começam com <em className="font-normal text-[#287762]">clareza.</em></h4>
      <p className="mt-4 max-w-[440px] text-xs leading-6 text-[#58685e]">Contabilidade e orientação empresarial para quem valoriza organização, transparência e proximidade.</p>
      <span className="mt-6 inline-flex w-fit rounded-full bg-[#226f59] px-5 py-3 text-[11px] font-semibold text-white">Fale com um especialista ↗</span>
    </div>
    <div className="relative min-h-[260px] overflow-hidden rounded-[14px] border border-[#d3d9d1] bg-[#e6ebe6]"
      role="img" aria-label="Fotografia ilustrativa de documentos e mesa de trabalho administrativo"
      style={{backgroundImage:'linear-gradient(180deg,rgba(8,42,33,.02),rgba(8,42,33,.52)),url("https://images.unsplash.com/photo-1554224154-22dec7ec8818?w=960&h=720&fit=crop&auto=format&q=78")',backgroundSize:'cover',backgroundPosition:'center'}}>
      <div className="absolute bottom-4 left-4 right-4 rounded-xl border border-white/20 bg-[#163f33]/85 p-4 text-white backdrop-blur-sm">
        <p className="text-[9px] font-semibold uppercase tracking-[.15em] text-[#b4e2cc]">ATENDIMENTO EMPRESARIAL</p>
        <p className="mt-2 text-sm font-semibold">Organização financeira e atenção aos detalhes.</p>
      </div>
    </div>
  </div>
  <div className="mx-5 border-t border-[#d0d9cf] py-5 text-center sm:mx-8"><p className="mb-4 text-[10px] font-bold uppercase tracking-[.15em] text-[#536a59]">ATENDIMENTO POR ESPECIALIDADE</p><div className={`grid gap-3 ${mobile ? "grid-cols-1":"grid-cols-3"}`}>{[["01","Contabilidade empresarial"],["02","Planejamento tributário"],["03","Gestão de folha"]].map(([n,x])=><div key={n} className="min-h-[90px] rounded-xl border border-[#d4ddd3] bg-white/90 p-4 text-left"><span className="text-[10px] text-[#29836b]">{n} / ESPECIALIDADE</span><p className="mt-3 font-serif text-[15px] leading-5">{x}</p></div>)}</div></div>
 </div>;
}

function ArchitectureSite({ mobile }: { mobile:boolean }) {
 return <div className="min-h-[475px] bg-[#e9e3d8] text-[#262825]">
   <div className="flex items-center justify-between border-b border-[#b7b2a8] px-5 py-4"><strong className="font-serif text-[23px] italic tracking-[-.055em]">linha<span className="font-sans text-xs not-italic"> / atelier</span></strong><span className="text-[10px] uppercase tracking-[.15em]">{mobile ? "Menu +" : "Projetos　 Estúdio　 Contato"}</span></div>
   <div className={`grid gap-3 p-4 sm:p-6 ${mobile ? "grid-cols-1" : "grid-cols-[1.35fr_.65fr]"}`}>
     <div className="relative min-h-[325px] overflow-hidden rounded-[2px] bg-[#373e38]"
       role="img" aria-label="Fotografia ilustrativa de residência contemporânea com arquitetura autoral"
       style={{backgroundImage:'linear-gradient(180deg,rgba(12,18,14,.05),rgba(12,18,14,.65)),url("https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=960&h=720&fit=crop&auto=format&q=80")',backgroundSize:'cover',backgroundPosition:'center'}}>
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

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
        <div className="mt-5 flex flex-wrap gap-2"><span className="rounded-lg bg-[#0084cf] px-4 py-2.5 text-[10px] font-bold text-white">Solicitar orçamento ↗</span><span className="rounded-lg border border-[#32617a] px-4 py-2.5 text-[10px] text-[#b7d4e4]">Nossos serviços</span></div>
      </div>
      <div className="relative min-h-[225px] overflow-hidden rounded-[16px] bg-[radial-gradient(circle_at_63%_45%,#246b94,#0e3453_55%,#08243d)]">
        <div className="absolute -right-10 -top-12 h-48 w-48 rounded-full border-[20px] border-[#4db8dd]/15"/>
        <div className="absolute inset-x-8 top-9 flex items-center justify-center rounded-2xl border border-[#6fc8e6]/30 bg-[#d8ecf1]/95 p-6 shadow-[0_20px_45px_rgba(0,0,0,.3)]">
          <div className="relative grid h-32 w-32 place-items-center rounded-full border-[10px] border-[#a4b9c3] bg-[#f1f5f4] shadow-inner"><div className="h-20 w-20 rounded-full border-[17px] border-dashed border-[#7895a4]"/><div className="absolute h-5 w-5 rounded-full bg-[#47677b]"/></div>
        </div>
        <span className="absolute bottom-4 left-5 rounded-md border border-[#76cce5]/30 bg-[#061c30]/90 px-3 py-2 text-[10px] font-bold text-[#a6e5fa]">COMERCIAL • PMOC • MANUTENÇÃO</span>
      </div>
    </div>
    <div className={`grid ${mobile ? "grid-cols-1" : "grid-cols-3"} gap-2 px-5 pb-6 sm:px-8`}>{["Instalação planejada","Manutenção preventiva","Projetos comerciais"].map((x,i)=><div key={x} className="rounded-xl border border-[#285272] bg-[#0c2b44] p-4"><span className="text-[#58cef5]">0{i+1} ─</span><p className="mt-3 text-xs font-bold">{x}</p><p className="mt-1 text-[10px] text-[#a6c1d5]">Saiba mais ↗</p></div>)}</div>
  </div>;
}

function AccountingSite({ mobile }: { mobile:boolean }) {
 return <div className="min-h-[475px] bg-[#f5f3ec] text-[#243d35]">
  <div className="flex items-center justify-between border-b border-[#d5dbd1] px-5 py-5"><strong className="font-serif text-[22px] tracking-[-.04em]"><span className="mr-1 text-[#2a8974]">◈</span>norte<span className="font-sans text-[10px] font-semibold uppercase tracking-[.2em]"> contábil</span></strong><div className="flex gap-5 text-[10px]">{mobile ? <span>☰</span> : <><span>Especialidades</span><span>Nosso escritório</span><span className="text-[#287762]">Conversar ↗</span></>}</div></div>
  <div className="mx-auto max-w-[690px] px-6 pb-7 pt-10 text-center"><div className="mx-auto w-fit rounded-full border border-[#b9cfc0] bg-[#e5efe8] px-4 py-2 text-[10px] font-semibold uppercase tracking-[.12em] text-[#287762]">CONTABILIDADE CONSULTIVA</div><h4 className="mx-auto mt-5 max-w-[570px] font-serif text-[clamp(26px,3.8vw,46px)] leading-[1.08] tracking-[-.04em]">Boas decisões começam com <em className="font-normal text-[#287762]">clareza.</em></h4><p className="mx-auto mt-4 max-w-[460px] text-xs leading-6 text-[#58685e]">Uma contabilidade próxima da sua empresa, com atenção à gestão, ao fiscal e ao crescimento.</p><div className="mx-auto mt-5 inline-flex rounded-full bg-[#226f59] px-6 py-3 text-[11px] font-semibold text-white">Agendar uma conversa ↗</div></div>
  <div className="mx-5 border-t border-[#d0d9cf] py-5 text-center sm:mx-8"><p className="mb-4 text-[10px] font-bold uppercase tracking-[.15em] text-[#77877e]">ATENDIMENTO POR ESPECIALIDADE</p><div className={`grid gap-3 ${mobile ? "grid-cols-1":"grid-cols-3"}`}>{[["01","Contabilidade empresarial"],["02","Planejamento tributário"],["03","Gestão de folha"]].map(([n,x])=><div key={n} className="min-h-[90px] rounded-xl border border-[#d4ddd3] bg-white/90 p-4 text-left"><span className="text-[10px] text-[#29836b]">{n} / ESPECIALIDADE</span><p className="mt-3 font-serif text-[15px] leading-5">{x}</p></div>)}</div></div>
 </div>;
}

function ArchitectureSite({ mobile }: { mobile:boolean }) {
 return <div className="min-h-[475px] bg-[#e9e3d8] text-[#262825]">
   <div className="flex items-center justify-between border-b border-[#b7b2a8] px-5 py-4"><strong className="font-serif text-[23px] italic tracking-[-.055em]">linha<span className="font-sans text-xs not-italic"> / atelier</span></strong><span className="text-[10px] uppercase tracking-[.15em]">{mobile ? "Menu +" : "Projetos　 Estúdio　 Contato"}</span></div>
   <div className={`grid gap-3 p-4 sm:p-6 ${mobile ? "grid-cols-1" : "grid-cols-[1.35fr_.65fr]"}`}>
     <div className="relative min-h-[275px] overflow-hidden bg-[#3a3b36]">
       <div className="absolute inset-0 bg-[linear-gradient(120deg,#252a27_12%,#8c8372_60%,#342f2a_100%)]"/>
       <div className="absolute bottom-0 left-[14%] top-[16%] w-[58%] -skew-x-[10deg] bg-[#c6bca9] shadow-[23px_0_0_#6b6a61]"/>
       <div className="absolute bottom-[17%] left-[27%] h-[37%] w-[25%] bg-[#393d38] shadow-[45px_0_0_#979382]"/>
       <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-[#151916]/85 to-transparent"/>
       <span className="absolute bottom-5 left-5 text-[10px] font-semibold uppercase tracking-[.23em] text-white">FORMAS / LUZ / ESPAÇO</span>
     </div>
     <div className="flex flex-col justify-between bg-[#d5ccbf] p-5"><div><span className="text-[10px] uppercase tracking-[.2em] text-[#796b5e]">ARQUITETURA AUTORAL</span><h4 className="mt-5 font-serif text-[clamp(25px,3vw,40px)] leading-[1.1] tracking-[-.04em]">Espaços que contam histórias.</h4><p className="mt-4 text-xs leading-6 text-[#6e655c]">Interiores, arquitetura e experiências que refletem uma identidade.</p></div><span className="mt-5 w-fit border-b border-[#3c3831] pb-1 text-xs font-semibold">Explorar projetos ↗</span></div>
   </div>
   <div className="flex flex-wrap justify-between gap-3 px-6 pb-5 text-[10px] uppercase tracking-[.15em] text-[#6e655b]"><span>RESIDENCIAL</span><span>COMERCIAL</span><span>INTERIORES</span><span>PROJETOS CONCEITUAIS</span></div>
 </div>;
}

export function SiteDemo({variant,device,compact=false}: VisualProps) {
 const mobile=device==="mobile"&&!compact;
 return <DemoFrame device={device} compact={compact} dark={variant===0} title={["climaforte.com.br","nortecontabil.com.br","linha-atelier.com.br"][variant]}>
 {variant===0?<HvacSite mobile={mobile}/>:variant===1?<AccountingSite mobile={mobile}/>:<ArchitectureSite mobile={mobile}/>}
 </DemoFrame>;
}

"use client";

import { useState } from "react";
import type { DemoCategory } from "./DemoVisuals";
import "./DemoStagePreview.css";

type Props = { category: DemoCategory; variant: number; step?: number; playing?: boolean };

const palettes = ["#177cdb", "#42b9ef", "#8fd6fb", "#315a85"];

function Line({ values, labels }: { values: number[]; labels?: string[] }) {
  const low = Math.min(...values) - 5;
  const high = Math.max(...values) + 6;
  const pt = (value: number, index: number) => `${20+(index*460)/(values.length-1)},${128-((value-low)/(high-low))*103}`;
  const poly = values.map(pt).join(" ");
  return <div className="vxsp-chart" aria-label="Evolução ilustrativa dos indicadores">
    <svg viewBox="0 0 500 150" preserveAspectRatio="none" role="img" aria-label="Gráfico de evolução do período">
      {[30,67,104,137].map(y=><line key={y} x1="18" x2="480" y1={y} y2={y} stroke="currentColor" opacity=".12" strokeDasharray="5 6"/>) }
      <polyline points={poly} fill="none" stroke="#40b9f8" strokeWidth="3" vectorEffect="non-scaling-stroke" strokeLinejoin="round" strokeLinecap="round"/>
      {values.map((v,i)=><circle key={i} cx={20+(i*460)/(values.length-1)} cy={128-((v-low)/(high-low))*103} r="4" stroke="#a1e0ff" strokeWidth="2" fill="#117ad1" vectorEffect="non-scaling-stroke"/>)}
    </svg>
    <div className="vxsp-chart-labels">{(labels || ["Seg","Ter","Qua","Qui","Sex","Sáb","Dom"]).map((l,i)=><span key={i}>{l}</span>)}</div>
  </div>;
}
function Bars({ values, labels }: { values: number[]; labels: string[] }) {
  const max=Math.max(...values,1);
  return <div className="vxsp-bars">{values.map((v,i)=><div key={labels[i]} className="vxsp-bar-col"><b>{v}</b><div className="vxsp-bar" style={{height:`${Math.max(10,(v/max)*79)}%`,background:palettes[i%palettes.length]}}/><small>{labels[i]}</small></div>)}</div>;
}
function MiniRows({rows,selected,onSelect}:{rows:[string,string][];selected:number;onSelect:(n:number)=>void}){
 return <div className="vxsp-rows">{rows.map(([a,b],i)=><button key={a} type="button" onClick={()=>onSelect(i)} aria-pressed={selected===i} className={'vxsp-row '+(selected===i?'vxsp-row-selected':'')}><span>{a}</span><b>{b}</b></button>)}</div>;
}
function Kpis({items}:{items:[string,string,string?][]}){
 return <div className="vxsp-kpis">{items.map(([label,value,hint],i)=><div key={i} className="vxsp-kpi"><span>{label}</span><strong>{value}</strong>{hint&&<small>{hint}</small>}</div>)}</div>;
}
function Panel({title,children,aside,className=""}:{title:string;children:React.ReactNode;aside?:string;className?:string}){
 return <section className={'vxsp-panel '+className}><div className="vxsp-panel-h"><strong>{title}</strong>{aside&&<small>{aside}</small>}</div><div className="vxsp-panel-c">{children}</div></section>;
}
function Header({eyebrow,title,action,light=false}:{eyebrow:string;title:string;action?:React.ReactNode;light?:boolean}){
 return <header className={'vxsp-header '+(light?'vxsp-header-light':'')}><div className="vxsp-brand"><span className="vxsp-emblem">V</span><div><strong>VORZAX</strong><small>{eyebrow}</small></div></div><h3>{title}</h3>{action&&<div className="vxsp-head-action">{action}</div>}</header>;
}
function Options({items,value,onChange}:{items:string[];value:number;onChange:(n:number)=>void}){
 return <div className="vxsp-options" role="group" aria-label="Alterar visão da demonstração">{items.map((item,i)=><button type="button" key={item} aria-pressed={value===i} onClick={()=>onChange(i)} className={value===i?'is-selected':''}>{item}</button>)}</div>;
}
function Progress({items}:{items:[string,number][]}){
 return <div className="vxsp-progress-list">{items.map(([label,val],i)=><div className="vxsp-progress" key={label}><div><span>{label}</span><b>{val}%</b></div><div className="vxsp-progress-track"><i style={{width:`${val}%`,background:palettes[i%palettes.length]}}/></div></div>)}</div>;
}
function SitePreview({variant}:{variant:number}){
 const [selected,setSelected]=useState(0);const [contact,setContact]=useState(false);
 const brand=["CLIMAFORTE","norte contábil","linha / atelier"][variant];
 const headings=["Sua operação no clima certo.","Boas decisões começam com clareza.","Espaços que contam histórias."];
 const details=["Instalação, projetos e manutenção de climatização comercial.","Contabilidade consultiva para empresas organizadas.","Arquitetura e interiores com identidade autoral."];
 const labels=variant===0?["Instalação","Manutenção","Projetos"]:variant===1?["Contabilidade","Tributário","Folha"]:["Residencial","Comercial","Interiores"];
 const images=["/demo-hvac-workspace.webp","/demo-accounting-workspace.webp","/demo-architecture-residence.webp"];
 return <div className={'vxsp-site vxsp-site-'+variant}>
  <div className="vxsp-site-header"><strong>{brand}</strong><nav>{labels.map((s,i)=><button type="button" key={s} onClick={()=>setSelected(i)} className={selected===i?'current':''}>{s}</button>)}</nav><button type="button" onClick={()=>setContact(!contact)} className="vxsp-primary">{contact?'Fechar':'Contato ↗'}</button></div>
  <div className="vxsp-site-grid"><div className="vxsp-site-copy"><small>{variant===0?'CLIMATIZAÇÃO PARA EMPRESAS':variant===1?'CONTABILIDADE EMPRESARIAL':'PORTFÓLIO DE ARQUITETURA'}</small><h3>{headings[variant]}</h3><p>{details[variant]}</p><button type="button" onClick={()=>setSelected((selected+1)%3)} className="vxsp-primary">Explorar {labels[selected]} ↗</button></div><div className="vxsp-site-photo" style={{backgroundImage:`linear-gradient(0deg,rgba(5,22,37,.62),transparent 63%),url('${images[variant]}')`}}><div><small>PROJETO ILUSTRATIVO</small><strong>{labels[selected]} · {brand}</strong></div></div></div>
  <div className="vxsp-site-services">{labels.map((s,i)=><button type="button" key={s} onClick={()=>setSelected(i)} aria-pressed={selected===i}><small>0{i+1} / SERVIÇO</small><strong>{s}</strong><span>{i===selected?'Selecionado ✓':'Explorar →'}</span></button>)}</div>
  {contact&&<div className="vxsp-site-overlay" role="dialog" aria-label="Contato demonstrativo"><div><strong>Entre em contato</strong><p>Exemplo interativo. Nenhuma mensagem será enviada.</p><button type="button" onClick={()=>setContact(false)}>Voltar à demonstração</button></div></div>}
 </div>;
}
function AutomationPreview({variant}:{variant:number}){
 const [selected,setSelected]=useState(1);const [done,setDone]=useState(false);
 const names=["Captação e qualificação","Agenda de visitas técnicas","Cobranças e notificações"];
 const phases=variant===0?["Novo contato","Qualificação","Proposta","Negociação"]:variant===1?["Solicitação","Equipe","Horário","Confirmação"]:["Fatura","Prazo","Aviso","Pagamento"];
 const rows: [string,string][]=variant===0?[["Contato comercial","Qualificado"],["Solicitação pelo site","Novo lead"],["Indicação empresarial","Em análise"]]:variant===1?[["Seg · 08:00","Equipe Alfa"],["Qua · 09:30","Equipe Beta"],["Sex · 14:00","Equipe Gama"]]:[["FAT-1024 · Empresa A","Em aberto"],["FAT-1025 · Empresa B","Aviso enviado"],["FAT-1026 · Empresa C","Programado"]];
 return <div className="vxsp-app vxsp-app-dark"><Header eyebrow="AUTOMAÇÃO / DEMONSTRAÇÃO" title={names[variant]} action={<button type="button" className="vxsp-primary" onClick={()=>setDone(!done)}>{done?'Reiniciar':'Executar fluxo ▶'}</button>}/><div className="vxsp-body"><Kpis items={variant===0?[["Contatos","27","Entradas"],["Qualificados","18","Triagem"],["Propostas","6","Em análise"],["Etapas","4","Automação"]]:variant===1?[["Visitas","24"],["Agendadas","16"],["Disponíveis","8"],["Equipes","3"]]:[["Faturas","42"],["Avisos","18"],["Em dia","27"],["Pendentes","15"]]}/><div className="vxsp-main"><Panel title="Etapas do processo" aside="Clique para navegar"><div className="vxsp-stages">{phases.map((p,i)=><button type="button" onClick={()=>setSelected(i)} key={p} aria-pressed={selected===i} className={selected===i?'is-selected':''}><b>0{i+1}</b><span>{p}</span></button>)}</div><div className="vxsp-context">{done?'Fluxo concluído nesta simulação.':`Etapa atual: ${phases[selected]}`}</div></Panel><Panel title={variant===1?'Agenda das equipes':'Registros recentes'} aside="Simulação"><MiniRows rows={rows} selected={selected%3} onSelect={setSelected}/></Panel></div><div className="vxsp-footer"><span>ENTRADA</span><i/><span>VALIDAÇÃO</span><i/><span>AÇÃO</span><i/><span>REGISTRO</span><strong>{done?'Concluído ✓':'Fluxo ativo'}</strong></div></div></div>;
}
function BIPreview({variant}:{variant:number}){
 const [period,setPeriod]=useState(1);const [selected,setSelected]=useState(0);
 const isFinance=variant===2;
 const kpis: [string,string,string?][]=variant===0?[["Leads recebidos","312"],["Oportunidades","124"],["Conversão","6,1%"],["Pipeline","R$ 148 mil"]]:variant===1?[["Dentro do SLA","94%"],["Ordens ativas","38"],["Concluídas","126"],["Equipes em campo","08"]]:[["Receitas","R$ 82 mil"],["Custos","R$ 53 mil"],["Resultado","R$ 29 mil"],["Margem","35,4%"]];
 const periods=variant===1?["Todas","Norte","Sul"]:variant===2?["Trimestre","Semestre","Anual"]:["7 dias","30 dias","90 dias"];
 const rows: [string,string][]=variant===0?[["Orgânico","42%"],["Indicação","29%"],["Campanhas","18%"],["Direto","11%"]]:variant===1?[["Equipe Norte","78%"],["Equipe Centro","91%"],["Equipe Sul","64%"],["Equipe Leste","72%"]]:[["Equipe","39%"],["Operação","27%"],["Serviços","21%"],["Outros","13%"]];
 return <div className={'vxsp-app '+(isFinance?'vxsp-app-light':'vxsp-app-dark')}><Header eyebrow="BUSINESS INTELLIGENCE" title={["Radar comercial","Painel de operações","Mapa financeiro"][variant]} light={isFinance} action={<Options items={periods} value={period} onChange={setPeriod}/>}/><div className="vxsp-body"><Kpis items={kpis}/><div className="vxsp-main"><Panel title={variant===0?'Evolução de oportunidades':variant===1?'Atendimentos por período':'Receita e custos'} aside={periods[period]}>{isFinance?<Bars values={[42,48,37,58,64,82]} labels={["Mai","Jun","Jul","Ago","Set","Out"]}/>:<Line values={variant===0?[22,32,28,46,41,60,66]:[18,24,20,31,28,35,32]}/>}</Panel><Panel title={variant===0?'Mix de aquisição':variant===1?'Capacidade das equipes':'Distribuição de despesas'} aside="Indicadores"><Progress items={rows.map(([name,n])=>[name,parseInt(n,10)])}/></Panel></div><div className="vxsp-bottom"><Panel title={variant===0?'Funil comercial':variant===1?'Monitor de demanda':'Projeção de caixa'}><div className="vxsp-mini-bars">{(variant===0?[100,72,51,29,18]:variant===1?[55,70,45,82,64]:[40,52,56,68,73]).map((n,i)=><button type="button" aria-pressed={selected===i} key={i} onClick={()=>setSelected(i)}><span style={{height:`${n}%`,background:palettes[i%palettes.length]}}/><small>{variant===0?["Visitas","Contatos","Leads","Propostas","Vendas"][i]:variant===1?["Seg","Ter","Qua","Qui","Sex"][i]:["Nov","Dez","Jan","Fev","Mar"][i]}</small></button>)}</div></Panel><Panel title={variant===0?'Canais comerciais':variant===1?'Acompanhamento': 'Rentabilidade'}><MiniRows rows={rows.slice(0,3)} selected={selected%3} onSelect={setSelected}/></Panel></div></div></div>;
}
function SystemsPreview({variant}:{variant:number}){
 const [tab,setTab]=useState(0),[selected,setSelected]=useState(0),[changed,setChanged]=useState(0);
 const names=["Ordens de serviço","Gestão de estoque","Gestão de projetos"];
 const navs=variant===0?["Visão geral","Ordens","Agenda"]:variant===1?["Visão geral","Produtos","Movimentações"]:["Visão geral","Tarefas","Prazos"];
 const rows: [string,string][]=variant===0?[["OS-1042 · Empresa Horizonte","Em execução"],["OS-1043 · Comercial Exemplo","Agendada"],["OS-1044 · Unidade Centro","Aberta"]]:variant===1?[["SKU-021 · Cabo elétrico","128 un."],["SKU-033 · Filtro técnico","32 un."],["SKU-048 · Equipamento","06 un."]]:[["Portal B2B","Em andamento"],["Painel gerencial","Planejado"],["Integração comercial","Em revisão"]];
 const primary=variant===0?"Nova OS":variant===1?"Movimentar":"Nova tarefa";
 return <div className="vxsp-app vxsp-app-light vxsp-systems"><aside className="vxsp-sidebar"><strong>VORZAX</strong><small>{["OS","STOCK","PROJECTS"][variant]} / DEMO</small><nav>{navs.map((n,i)=><button type="button" key={n} aria-pressed={tab===i} onClick={()=>setTab(i)}>{n}</button>)}</nav><small className="vxsp-sidebar-foot">AMBIENTE DEMO</small></aside><div className="vxsp-workspace"><header className="vxsp-workspace-head"><div><small>SISTEMA / CONCEITO INTERATIVO</small><h3>{names[variant]}</h3></div><button type="button" className="vxsp-primary" onClick={()=>setChanged(n=>n+1)}>+ {primary}</button></header><div className="vxsp-workspace-body"><Kpis items={variant===0?[["Total de ordens",String(5+changed)],["Em execução","1"],["Agendadas","1"],["Concluídas","1"]]:variant===1?[["Produtos","38"],["Alertas","05"],["Entradas",String(16+changed)],["Saídas","09"]]:[["Tarefas",String(6+changed)],["Em andamento","2"],["Em revisão","1"],["Concluídas","1"]]}/><div className="vxsp-main"><Panel title={variant===0?'Atendimentos por dia':variant===1?'Movimentação semanal':'Evolução das entregas'} aside="Últimos 7 dias"><Line values={variant===0?[12,18,15,23,19,27,24]:variant===1?[8,14,12,21,18,23,26]:[6,11,9,16,15,22,28]}/></Panel><Panel title={variant===0?'Distribuição das ordens':variant===1?'Categorias de estoque':'Status das tarefas'}><Progress items={variant===0?[["Abertas",40],["Agendadas",25],["Em execução",25],["Concluídas",10]]:variant===1?[["Disponível",72],["Em reposição",18],["Crítico",10]]:[["Planejado",35],["Em execução",42],["Revisão",23]]}/></Panel></div><div className="vxsp-bottom"><Panel title={navs[tab] ==="Visão geral"?"Registros recentes":navs[tab]} aside="Selecione para detalhar"><MiniRows rows={rows} selected={selected} onSelect={setSelected}/></Panel><Panel title="Detalhes do registro"><div className="vxsp-detail"><strong>{rows[selected][0]}</strong><p>Estado: {rows[selected][1]}</p><button type="button" onClick={()=>setChanged(n=>n+1)}>Atualizar registro →</button></div></Panel></div></div></div></div>;
}
function AIPreview({variant}:{variant:number}){
 const [selected,setSelected]=useState(0),[sent,setSent]=useState(false);
 const title=["Atendimento comercial assistido","Central de conhecimento","Assistente de operações"][variant];
 const choices=variant===0?["Quero um orçamento","Conhecer serviços","Falar com a equipe"]:variant===1?["Acesso e login","Acompanhar pedido","Falar com suporte"]:["Resumir solicitações","Preparar OS","Consultar prioridades"];
 return <div className="vxsp-app vxsp-app-dark"><Header eyebrow="VORZAX IA · SIMULAÇÃO" title={title} action={<span className="vxsp-chip">● AMBIENTE DEMO</span>}/><div className="vxsp-body"><Kpis items={variant===0?[["Conversas","128"],["Respostas","96%"],["Leads","23"],["Etapas","4"]]:variant===1?[["Artigos","14"],["Tópicos","03"],["Resoluções","84%"],["Filas","03"]]:[["Solicitações","38"],["Resumos","12"],["Rascunhos","06"],["Etapas","03"]]}/><div className="vxsp-main"><Panel title={variant===0?'Assistente Vorzax':variant===1?'Base de conhecimento':'Copiloto operacional'} aside="Interativo"><div className="vxsp-chat"><div className="vxsp-bubble">{variant===0?'Olá! Como posso ajudar sua empresa hoje?':variant===1?'Escolha uma dúvida para consultar a resposta.':'Qual processo deseja organizar hoje?'}</div><div className="vxsp-bubble reply">{sent?`Solicitação de exemplo: ${choices[selected]}. Nenhuma ação externa foi executada.`:variant===0?'Posso reunir as informações e orientar o próximo passo.':variant===1?'Respostas ilustrativas disponíveis para consulta.':'Posso gerar um rascunho para revisão humana.'}</div></div></Panel><Panel title={variant===0?'Qualificação comercial':variant===1?'Dúvidas frequentes':'Ações sugeridas'}><div className="vxsp-ai-buttons">{choices.map((ch,i)=><button key={ch} type="button" aria-pressed={selected===i} onClick={()=>{setSelected(i);setSent(false)}}>{ch}</button>)}</div></Panel></div><div className="vxsp-footer"><span>RESPOSTA DEMONSTRATIVA</span><strong>{choices[selected]}</strong><button type="button" onClick={()=>setSent(!sent)}>{sent?'Limpar':'Simular resposta →'}</button></div></div></div>;
}
export function DemoStagePreview({category,variant}:{category:DemoCategory;variant:number;step?:number;playing?:boolean}) {
 return <div className="vxsp-root" data-stage-kind={category} data-stage-example={variant} aria-label={`Demonstração interativa de ${category}, exemplo ${variant+1}`}>
   {category==="sites"?<SitePreview key={variant} variant={variant}/>:
    category==="automacao"?<AutomationPreview key={variant} variant={variant}/>:
    category==="bi"?<BIPreview key={variant} variant={variant}/>:
    category==="sistemas"?<SystemsPreview key={variant} variant={variant}/>:
    <AIPreview key={variant} variant={variant}/>}
 </div>;
}
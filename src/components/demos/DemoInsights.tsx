"use client";

type ChartTone = "blue" | "teal" | "amber" | "violet" | "indigo";
const palette:Record<ChartTone,{fill:string;light:string;grid:string}>={
  blue:{fill:"#1b9be4",light:"#6fd4ff",grid:"#32628b"},
  teal:{fill:"#1db8aa",light:"#7de8d5",grid:"#336d71"},
  amber:{fill:"#e6a052",light:"#ffd597",grid:"#796145"},
  violet:{fill:"#9872ee",light:"#d2baff",grid:"#6c5a8c"},
  indigo:{fill:"#577ee8",light:"#abc6ff",grid:"#526eae"},
};

export function TrendPlot({values,tone="blue",labels=["Seg","Ter","Qua","Qui","Sex","Sáb","Dom"],height=92}:{values:number[];tone?:ChartTone;labels?:string[];height?:number}) {
  const p=palette[tone], max=Math.max(...values,1), min=Math.min(...values,0),range=Math.max(max-min,1);
  const points=values.map((value,i)=>({x:14+i*(292/Math.max(values.length-1,1)),y:104-((value-min)/range)*80}));
  const poly=points.map(v=>`${v.x},${v.y}`).join(" ");
  const area=poly+` ${points.at(-1)?.x},113 ${points[0]?.x},113`;
  return <div className="w-full">
    <svg viewBox="0 0 320 125" width="100%" height={height} role="img" aria-label={"Gráfico demonstrativo de tendência com "+values.length+" períodos"} preserveAspectRatio="none" className="block overflow-visible">
      {[26,65,104].map(y=><line key={y} x1="10" x2="310" y1={y} y2={y} stroke={p.grid} opacity=".33" strokeDasharray="4 5"/>)}
      <polygon points={area} fill={p.fill} opacity=".13"/>
      <polyline className="vx-demo-line" points={poly} fill="none" stroke={p.fill} strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round"/>
      {points.map((point,i)=><circle key={i} cx={point.x} cy={point.y} r="3.4" fill={p.light} stroke={p.fill} strokeWidth="1.5"/>)}
    </svg>
    <div className="mt-1 flex justify-between gap-1 text-[10px] opacity-80">{labels.slice(0,values.length).map(x=><span key={x}>{x}</span>)}</div>
  </div>;
}

export function MiniColumns({values,labels,tone="blue",height=84}:{values:number[];labels:string[];tone?:ChartTone;height?:number}) {
 const p=palette[tone],max=Math.max(...values,1);
 return <div className="flex w-full items-end justify-between gap-2" style={{height:height+22}} role="img" aria-label={"Gráfico demonstrativo: "+labels.map((v,i)=>v+": "+values[i]).join(", ")}>
  {values.map((v,i)=><div key={i} className="flex h-full min-w-0 flex-1 flex-col justify-end text-center">
    <span className="mb-1 text-[10px] font-semibold" style={{color:p.light}}>{v}</span>
    <div className="mx-auto w-full max-w-10 rounded-t-md" style={{height:Math.max(7,v/max*height),background:`linear-gradient(180deg,${p.light},${p.fill})`}}/>
    <span className="mt-1 truncate text-[10px] opacity-80">{labels[i]}</span>
  </div>)}
 </div>;
}

export function SegmentedMeter({segments,tone="blue"}:{segments:{label:string;value:number}[];tone?:ChartTone}){
 const p=palette[tone],sum=Math.max(1,segments.reduce((n,x)=>n+x.value,0));
 return <div className="w-full">
   <div className="flex h-3.5 w-full overflow-hidden rounded-full bg-[#345067]/30">
    {segments.map((x,i)=><div key={x.label} style={{width:(x.value/sum*100)+"%",background:i%3===0?p.fill:i%3===1?p.light:p.grid}} title={x.label+" "+x.value}/>)}
   </div>
   <div className="mt-2 flex flex-wrap justify-between gap-2 text-[11px]">{segments.map(x=><span key={x.label}><strong>{x.value}</strong> {x.label}</span>)}</div>
 </div>;
}

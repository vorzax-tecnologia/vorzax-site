import { NextRequest, NextResponse } from "next/server";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

// Proteção adicional local à instância: o provedor de e-mail possui seus
// próprios limites. Antes de volume alto, configurar rate limit distribuído.
const recent = new Map<string,{start:number,count:number}>();
const MAX_ATTEMPTS=4;
const WINDOW_MS=15*60*1000;
const EMAIL=/^[^\s@]{1,64}@[^\s@]{1,190}\.[^\s@]{2,40}$/;

function configured() {
  return Boolean(process.env.RESEND_API_KEY?.trim() &&
    process.env.CONTACT_FROM_EMAIL?.trim() &&
    process.env.CONTACT_FORM_ENABLED==="true");
}

function payloadError(value:Record<string,unknown>):string|null {
  const required=["name","email","objective","service","company","deadline","website","consent"];
  if(Object.keys(value).some(k=>!required.includes(k)))return "Campos inesperados.";
  if(typeof value.name!=="string"||value.name.trim().length<2||value.name.length>90)return "Nome inválido.";
  if(typeof value.email!=="string"||!EMAIL.test(value.email)||value.email.length>140)return "E-mail inválido.";
  if(typeof value.objective!=="string"||value.objective.trim().length<12||value.objective.length>1100)return "Descreva a necessidade com mais detalhes.";
  for(const [key,max] of [["service",80],["company",110],["deadline",100]] as const) {
    if(typeof value[key]!=="string"||value[key].length>max)return "Dados inválidos.";
  }
  if(value.consent!==true)return "Confirme a política de privacidade.";
  if(typeof value.website!=="string")return "Dados inválidos.";
  return null;
}

const noStore={"Cache-Control":"no-store"};
function respond(body:Record<string,unknown>,status=200){
  return NextResponse.json(body,{status,headers:noStore});
}

export async function GET() {
  return respond({direct:configured()});
}

export async function POST(request:NextRequest) {
  if(!configured())return respond({ok:false,code:"unavailable"},503);
  const origin=request.headers.get("origin");
  if(!origin||origin!==request.nextUrl.origin)return respond({ok:false,code:"invalid_origin"},403);
  if(!request.headers.get("content-type")?.startsWith("application/json"))return respond({ok:false,code:"invalid_content_type"},415);
  const bytes=await request.text();
  if(bytes.length>6500)return respond({ok:false,code:"too_large"},413);
  let body:Record<string,unknown>;
  try{
    const data:unknown=JSON.parse(bytes);
    if(!data||Array.isArray(data)||typeof data!=="object")throw Error("invalid");
    body=data as Record<string,unknown>;
  }catch{return respond({ok:false,code:"invalid_json"},400);}
  // Campo deliberadamente invisível aos clientes humanos.
  if(body.website)return respond({ok:false,code:"blocked"},400);
  const error=payloadError(body);
  if(error)return respond({ok:false,code:"validation",message:error},400);

  const ip=(request.headers.get("x-forwarded-for")||"unknown").split(",")[0].trim().slice(0,60);
  const now=Date.now();
  if(recent.size>1000)for(const [key,entry] of recent)if(now-entry.start>WINDOW_MS)recent.delete(key);
  const rate=recent.get(ip);
  if(rate&&now-rate.start<WINDOW_MS&&rate.count>=MAX_ATTEMPTS)return respond({ok:false,code:"rate_limited"},429);
  if(!rate||now-rate.start>=WINDOW_MS)recent.set(ip,{start:now,count:1});
  else rate.count++;

  const safe=(x:unknown)=>String(x||"").trim();
  const text=[
    "Solicitação de proposta técnica — Vorzax",
    "Nome: "+safe(body.name),
    "E-mail: "+safe(body.email),
    "Empresa: "+(safe(body.company)||"Não informada"),
    "Serviço: "+(safe(body.service)||"Preciso de orientação"),
    "Prazo: "+(safe(body.deadline)||"A definir"),
    "",
    "Objetivo:",
    safe(body.objective),
    "",
    "Mensagem enviada voluntariamente pelo formulário do site."
  ].join("\n");
  try {
    const response=await fetch("https://api.resend.com/emails",{
      method:"POST",
      headers:{"Authorization":"Bearer "+process.env.RESEND_API_KEY,"Content-Type":"application/json"},
      body:JSON.stringify({
        from:process.env.CONTACT_FROM_EMAIL,
        to:["contato@vorzax.com.br"],
        reply_to:safe(body.email),
        subject:"Vorzax | Solicitação de proposta técnica",
        text
      }),
      signal:AbortSignal.timeout(11000)
    });
    if(!response.ok){console.error("Contato: provedor recusou envio",response.status);return respond({ok:false,code:"delivery_error"},502);}
    const result:unknown=await response.json();
    if(!result||typeof result!=="object"||typeof (result as {id?:unknown}).id!=="string")return respond({ok:false,code:"delivery_error"},502);
    return respond({ok:true,code:"accepted"});
  }catch(e){
    console.error("Contato: serviço temporariamente indisponível",e instanceof Error?e.name:"unknown");
    return respond({ok:false,code:"delivery_error"},502);
  }
}

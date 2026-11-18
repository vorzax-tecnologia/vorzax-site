/* eslint-disable @typescript-eslint/no-require-imports -- QA Playwright para GitHub Actions */
const {chromium}=require("playwright");
const fs=require("node:fs");
const path=require("node:path");
const BASE="http://127.0.0.1:3000";
const OUT=path.resolve("qa-results");
fs.mkdirSync(OUT,{recursive:true});
function ensure(condition,explanation){if(!condition)throw Error(explanation);}
(async()=>{
 const browser=await chromium.launch({headless:true,args:["--no-sandbox"]});
 try{
  for(const [device,width,height] of [["mobile",390,844],["desktop",1440,900]]){
   const page=await browser.newPage({viewport:{width,height},reducedMotion:"reduce"});
   const errors=[];
   page.on("pageerror",e=>errors.push(e.message));
   let r=await page.goto(BASE,{waitUntil:"domcontentloaded",timeout:90000});
   ensure(r?.status()===200,"Home indisponível");
   const section=page.locator("#perguntas-frequentes");
   const q=section.locator("summary").first();
   await q.click();
   ensure(await q.evaluate(e=>e.parentElement?.open===true),"Pergunta comercial não abre");
   ensure(await section.getByText(/Você pode começar descrevendo a dificuldade atual/).isVisible(),"Resposta não aparece");
   const cta=page.locator("#inicio").getByRole("link",{name:/Solicitar avaliação do meu projeto/});
   await cta.click();
   await page.waitForURL("**/solicitar-proposta");
   const form=page.getByRole("form",{name:"Preparar solicitação de proposta"});
   await page.waitForFunction(()=>document.querySelector('form[aria-label="Preparar solicitação de proposta"]')?.getAttribute("data-vx-proposal-hydrated")==="true");
   ensure(await form.isVisible(),"Formulário comercial ausente");
   const health=await page.request.get(BASE+"/api/contato");
   ensure(health.status()===200,"Status de e-mail indisponível");
   const mode=await health.json();
   if(mode.direct===true){
     console.log("FUNIL",device,"serviço transacional ativo; teste de envio externo ignorado");
   }else{
     await form.getByLabel(/Seu nome/).fill("Pessoa de teste comercial");
     await form.getByLabel(/E-mail para resposta/).fill("contato@example.com");
     await form.getByLabel(/Problema, necessidade/).fill("Quero um site institucional para apresentar meus serviços com clareza.");
     await form.getByRole("checkbox").check();
     await form.getByRole("button",{name:/Preparar mensagem de contato/}).click();
     const whatsapp=await page.getByRole("link",{name:/Continuar no WhatsApp/}).getAttribute("href");
     ensure(whatsapp?.startsWith("https://wa.me/5531990681495?text="),"WhatsApp comercial não foi preparado");
     const text=decodeURIComponent(whatsapp.split("?text=")[1]);
     ensure(text.includes("Pessoa de teste comercial")&&text.includes("site institucional"),"O briefing não está completo");
     ensure(await page.getByText(/ainda não foi enviado/).isVisible(),"A etapa final não informa a necessidade de envio manual");
     await page.screenshot({path:path.join(OUT,"funil-"+device+"-preparado.png")});
   }
   ensure(!errors.length,"Exceções no funil "+device+": "+errors.join("; "));
   console.log("QA FUNIL",device,"OK, sem enviar mensagem real");
   await page.close();
  }
 }finally{await browser.close();}
})().catch(e=>{console.error("QA FUNIL FALHOU",e);process.exitCode=1});

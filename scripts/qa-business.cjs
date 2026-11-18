/* eslint-disable @typescript-eslint/no-require-imports -- QA executado em CommonJS. */
const { chromium } = require("playwright");
const fs = require("node:fs");
const path = require("node:path");
const BASE = "http://127.0.0.1:3000";
const OUT = path.resolve("qa-results");
fs.mkdirSync(OUT,{recursive:true});
function ensure(ok,msg){if(!ok)throw Error(msg)}
const routes=[
 "/servicos","/servicos/sites","/servicos/automacoes","/servicos/dashboards-bi","/servicos/sistemas-sob-medida",
 "/como-trabalhamos","/seguranca","/solicitar-proposta"
];
(async()=>{
 const browser=await chromium.launch({headless:true,args:["--no-sandbox"]});
 try {
   for(const [viewportName,width,height] of [["desktop",1440,900],["mobile",390,844]]){
    const page=await browser.newPage({viewport:{width,height}});
    const errors=[];
    page.on("pageerror",e=>errors.push(e.message));
    for(const route of routes){
      const response=await page.goto(BASE+route,{waitUntil:"domcontentloaded",timeout:90000});
      ensure(response&&response.status()===200,route+" retornou HTTP "+response?.status());
      const security=response.headers();
      ensure(security["x-content-type-options"]==="nosniff",route+" sem proteção de tipo MIME");
      ensure(security["x-frame-options"]==="DENY",route+" sem proteção contra enquadramento externo");
      const info=await page.evaluate(()=>{
        const main=document.querySelector("main");
        return {
          title:document.title,
          h1:main?.querySelectorAll("h1").length,
          overflow:document.documentElement.scrollWidth-document.documentElement.clientWidth,
          canonical:document.querySelector('link[rel="canonical"]')?.getAttribute("href"),
          skip:!!document.querySelector('a[href="#conteudo"]')
        };
      });
      ensure(info.h1===1,route+" deve ter um H1");
      ensure(info.overflow<=3,route+" não deve ter rolagem horizontal: "+info.overflow);
      ensure(info.canonical,route+" precisa de canonical");
      ensure(info.skip,route+" precisa de link para pular o menu");
      const header=page.locator("header");
      const logo=header.getByRole("img",{name:"Vorzax Tecnologia"});
      ensure(await logo.count()===1,route+" deve usar a mesma marca da home");
      ensure((await logo.getAttribute("src"))?.includes("vorzax-logo-header.webp"),route+" usa o logotipo incorreto");
      ensure((await logo.getAttribute("class"))?.includes("mix-blend-screen"),
        route+" apresenta fundo escuro do logo em vez de integrar à home");
      const siteLogo=await page.evaluate(()=>{
        const img=document.querySelector('header img[alt="Vorzax Tecnologia"]');
        const hdr=document.querySelector("header");
        return { source:img?.getAttribute("src"), blend:img?getComputedStyle(img).mixBlendMode:null,
          headerBackground:hdr?getComputedStyle(hdr).backgroundColor:null,
          imageWidth:img?.getBoundingClientRect().width };
      });
      ensure(siteLogo.blend==="screen",route+" efeito do logo não está uniforme");
      ensure(Math.abs((siteLogo.imageWidth??0)-(width<640?174:193))<2,
        route+" tamanho do logo difere do padrão da home: "+JSON.stringify(siteLogo));
      const returnLink=header.getByRole("link",{name:"Voltar ao site principal"});
      ensure(await returnLink.count()===1,route+" não exibe volta ao site principal");
      ensure(await returnLink.getAttribute("href")==="/",route+" possui link de retorno inválido");
      ensure(await returnLink.isVisible(),route+" deveria exibir retorno ao site principal no "+viewportName);
      if(["/servicos","/como-trabalhamos","/solicitar-proposta"].includes(route)){
        await page.screenshot({path:path.join(OUT,"corporativo-"+viewportName+"-"+route.substring(1).replaceAll("/","-")+".png")});
      }
      console.log("QA BUSINESS",viewportName,route,"OK");
    }
    await page.goto(BASE+"/solicitar-proposta?servico=sites",{waitUntil:"domcontentloaded"});
    const form=page.getByRole("form",{name:"Preparar solicitação de proposta"});
    await page.waitForFunction(()=>document.querySelector('form[aria-label="Preparar solicitação de proposta"]')?.getAttribute("data-vx-proposal-hydrated")==="true",{timeout:12000});
    await form.getByLabel(/Seu nome/).fill("Pessoa de exemplo");
    await form.getByLabel(/E-mail para resposta/).fill("comprador@example.com");
    await form.getByLabel(/Problema, necessidade/).fill("Precisamos apresentar nossos serviços com clareza.");
    await form.getByRole("checkbox").check();
    await form.getByRole("button",{name:/Preparar e-mail/}).click();
    await page.getByRole("heading",{name:/Sua mensagem está preparada/}).waitFor();
    const mail=await page.getByRole("link",{name:/Abrir aplicativo de e-mail/}).getAttribute("href");
    ensure(mail?.startsWith("mailto:contato@vorzax.com.br?"),"Não preparou e-mail para contato corporativo");
    ensure(mail.includes("Sites%20e%20landing"),"Serviço da URL não foi preservado");
    ensure((await page.getByText("Nenhum dado foi enviado por este site.").count())===0
        || await page.getByRole("heading",{name:/Sua mensagem está preparada/}).isVisible(),
        "Confirmação enganosa");
    ensure(errors.length===0,"Erros JS em "+viewportName+": "+errors.join("; "));
    console.log("QA PROPOSAL",viewportName,"OK");
    await page.close();
   }
 }finally{await browser.close()}
})().catch(e=>{console.error("QA BUSINESS FAILED",e);process.exitCode=1});

/* eslint-disable @typescript-eslint/no-require-imports -- Acessibilidade no CI/CommonJS. */
const { chromium } = require("playwright");
const AxeBuilder = require("@axe-core/playwright").default;
const fs=require("node:fs");
const path=require("node:path");
const base="http://127.0.0.1:3000";
const out=path.resolve("qa-results");
fs.mkdirSync(out,{recursive:true});
const routes=["/","/servicos","/servicos/sites","/servicos/automacoes","/servicos/dashboards-bi","/servicos/sistemas-sob-medida","/solicitar-proposta","/como-trabalhamos","/seguranca","/privacidade"];
(async()=>{
 const browser=await chromium.launch({headless:true,args:["--no-sandbox"]});
 const summary=[];
 let critical=0;
 try{
   for(const [device,width,height] of [["desktop",1440,900],["mobile",390,844]]){
     const page=await browser.newPage({viewport:{width,height},reducedMotion:"reduce"});
     for(const route of routes){
       const response=await page.goto(base+route,{waitUntil:"domcontentloaded",timeout:90000});
       if(!response||response.status()!==200)throw Error("A11y rota indisponível "+route);
       const violations=(await new AxeBuilder({page}).withTags(["wcag2a","wcag2aa","wcag21a","wcag21aa","wcag22aa"]).analyze()).violations;
       const findings=violations.map(v=>({rule:v.id,impact:v.impact,description:v.help,count:v.nodes.length,selectors:v.nodes.slice(0,4).map(n=>n.target)}));
       const errors=findings.filter(f=>f.impact==="critical");
       critical+=errors.reduce((sum,v)=>sum+v.count,0);
       summary.push({device,route,findings});
       console.log("A11Y",device,route,"violations",findings.length,"critical",errors.length);
     }
     await page.close();
   }
 }finally{await browser.close();}
 fs.writeFileSync(path.join(out,"acessibilidade-axe.json"),JSON.stringify({date:new Date().toISOString(),summary},null,2));
 console.log("A11Y CRITICAL",critical,"(demais violações constam no relatório; testes automáticos não constituem conformidade WCAG)");
 if(critical)process.exitCode=1;
})().catch(e=>{console.error("A11Y FAILED",e);process.exitCode=1});

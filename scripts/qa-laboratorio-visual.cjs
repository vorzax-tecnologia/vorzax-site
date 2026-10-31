const { chromium } = require("playwright");
const fs = require("node:fs");
const path = require("node:path");
const sizes=[[1280,720],[1366,768],[1536,864],[1920,1080]];
const categories=["Sites","Automações","Dashboards e BI","Sistemas sob medida","Vorzax IA"];
const output=path.resolve("qa-results");
fs.mkdirSync(output,{recursive:true});
(async()=>{
 const browser=await chromium.launch({headless:true,args:["--no-sandbox"]});
 const results=[];
 try {
  for(const [width,height] of sizes){
   const page=await browser.newPage({viewport:{width,height}});
   await page.goto("http://127.0.0.1:3000/",{waitUntil:"domcontentloaded",timeout:90000});
   await page.evaluate(()=>document.getElementById("tecnologia-em-acao").scrollIntoView({block:"start",behavior:"instant"}));
   const nav=page.getByRole("navigation",{name:"Categorias das demonstrações"});
   const choices=page.getByRole("group",{name:"Escolher exemplo de solução"});
   await page.waitForTimeout(450);
   for(let ci=0;ci<categories.length;ci++){
    await nav.getByRole("button").nth(ci).click();
    for(let vi=0;vi<3;vi++){
     await choices.getByRole("button").nth(vi).click();
     await page.waitForTimeout(200);
     const m=await page.evaluate(()=>{
      const frame=document.querySelector("[data-vx-stage-height]");
      const canvas=frame?.querySelector(".vx-rich-canvas");
      const controls=document.querySelector('[role="group"][aria-label="Visualizar demonstração em"]');
      const scene=frame?.querySelector("[data-rich-stage]");
      if(!frame||!canvas||!controls)return {error:"element missing"};
      function rect(el){const r=el.getBoundingClientRect();return {x:r.x,y:r.y,width:r.width,height:r.height,left:r.left,right:r.right,top:r.top,bottom:r.bottom}}
      return {frame:rect(frame),canvas:rect(canvas),controls:rect(controls),scale:scene?.dataset.richScale,
       pageWidth:document.documentElement.scrollWidth,viewportWidth:document.documentElement.clientWidth,viewportHeight:innerHeight};
     });
     const fit=m.frame&&m.canvas&&m.canvas.left>=m.frame.left-6&&m.canvas.right<=m.frame.right+6&&m.canvas.top>=m.frame.top-6&&m.canvas.bottom<=m.frame.bottom+6;
     const horizontal=m.pageWidth<=m.viewportWidth+5;
     const controlsVisible=!!m.controls&&m.controls.bottom<=m.viewportHeight+16;
     results.push({width,height,category:categories[ci],variant:vi+1,fit:!!fit,horizontal,controlsVisible,...m});
     if(vi===0 || (ci===3&&vi===2))
      await page.screenshot({path:path.join(output,width+"x"+height+"-"+ci+"-"+vi+".png")});
     console.log("QA",width,height,categories[ci],vi+1,"fit",fit,"horiz",horizontal,"controls",controlsVisible);
    }
   }
   await page.close();
  }
 } finally {
  fs.writeFileSync(path.join(output,"measurements.json"),JSON.stringify(results,null,2));
  await browser.close();
 }
 const failures=results.filter(x=>!x.fit||!x.horizontal||!x.controlsVisible);
 console.log("QA TOTAL",results.length,"FAILURES",failures.length);
 if(failures.length){console.error(JSON.stringify(failures.map(x=>({width:x.width,height:x.height,category:x.category,variant:x.variant,fit:x.fit,horizontal:x.horizontal,controlsVisible:x.controlsVisible,frame:x.frame,controls:x.controls})),null,2));process.exitCode=1}
})().catch(e=>{console.error(e);process.exitCode=1});

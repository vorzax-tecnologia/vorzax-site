/* eslint-disable @typescript-eslint/no-require-imports -- Relatorio do CI */
const fs=require("node:fs");
const path=require("node:path");
const folder=path.resolve("qa-results");
const metrics=["largest-contentful-paint","cumulative-layout-shift","total-blocking-time","speed-index"];
const scores=[];
for(const device of ["mobile","desktop"]){
  const file=path.join(folder,"lighthouse-home-"+device+".json");
  const lhr=JSON.parse(fs.readFileSync(file,"utf8"));
  const summary={
    device,
    url:lhr.finalDisplayedUrl,
    environment:"Next.js build de producao em runner GitHub Actions; nao sao dados reais de usuarios",
    scores:Object.fromEntries(["performance","accessibility","best-practices","seo"].map(k=>[k,Math.round(100*(lhr.categories[k]?.score??0))])),
    metrics:Object.fromEntries(metrics.map(k=>[k,{displayValue:lhr.audits[k]?.displayValue??null,numericValue:lhr.audits[k]?.numericValue??null}])),
    opportunities:Object.values(lhr.audits).filter(a=>a.details?.type==="opportunity"&&a.numericValue>0).sort((a,b)=>b.numericValue-a.numericValue).slice(0,8).map(a=>({id:a.id,title:a.title,displayValue:a.displayValue}))
  };
  scores.push(summary);
  console.log("LIGHTHOUSE",device,JSON.stringify(summary.scores),"LCP",summary.metrics["largest-contentful-paint"].displayValue,"CLS",summary.metrics["cumulative-layout-shift"].displayValue);
}
fs.writeFileSync(path.join(folder,"lighthouse-summary.json"),JSON.stringify(scores,null,2));
const md=[
  "# Lighthouse — Vorzax Tecnologia",
  "",
  "Resultados laboratoriais no build de producao executado dentro do runner GitHub Actions. Nao sao metricas de usuarios reais, nem da infraestrutura Vercel.",
  "",
  "| Formato | Performance | Acessibilidade | Boas praticas | SEO | LCP | CLS |",
  "|---|---:|---:|---:|---:|---|---|",
  ...scores.map(s=>"| "+s.device+" | "+s.scores.performance+" | "+s.scores.accessibility+" | "+s.scores["best-practices"]+" | "+s.scores.seo+" | "+s.metrics["largest-contentful-paint"].displayValue+" | "+s.metrics["cumulative-layout-shift"].displayValue+" |"),
  "",
  "## Maiores oportunidades",
  ...scores.flatMap(s=>["","### "+s.device,...s.opportunities.map(o=>"- "+o.title+" ("+(o.displayValue||o.id)+")")]),
  "",
  "Metas de referencia de campo: LCP ≤ 2,5 s, INP ≤ 200 ms, CLS ≤ 0,1 no percentil 75. Lighthouse nao mede INP de campo."
].join("\n");
fs.writeFileSync(path.join(folder,"lighthouse-summary.md"),md);

/* eslint-disable @typescript-eslint/no-require-imports -- Testes de CI executados em CommonJS. */
// Testes não destrutivos: nenhuma mensagem é enviada nem dados reais são modificados.
const { chromium } = require("playwright");
const fs = require("node:fs");
const path = require("node:path");

const BASE = "http://127.0.0.1:3000";
const OUT = path.resolve("qa-results");
fs.mkdirSync(OUT, { recursive: true });

function ensure(condition, message) {
  if (!condition) throw new Error(message);
}

(async () => {
  const browser = await chromium.launch({ headless: true, args: ["--no-sandbox"] });
  try {
    for (const [device, width, height] of [
      ["mobile", 390, 844],
      ["desktop", 1440, 900],
    ]) {
      const page = await browser.newPage({ viewport: { width, height } });
      const exceptions = [];
      page.on("pageerror", error => exceptions.push(error.message));

      const response = await page.goto(BASE, { waitUntil: "domcontentloaded", timeout: 90000 });
      ensure(response && response.status() === 200, `Home: HTTP inesperado em ${device}`);

      const result = await page.evaluate(() => {
        const headline = document.querySelector("#inicio h1");
        const media = document.querySelector("#inicio .vx-hero-media");
        const toBox = node => {
          const r = node?.getBoundingClientRect();
          return r && { top: r.top, bottom: r.bottom, left: r.left, right: r.right };
        };
        const anchors = Array.from(document.querySelectorAll('a[href^="#"]'))
          .map(a => a.getAttribute("href")).filter(h => h && h !== "#");
        const missingAnchors = anchors.filter(h => !document.getElementById(h.slice(1)));
        return {
          headline: toBox(headline),
          media: toBox(media),
          overflow: document.documentElement.scrollWidth - document.documentElement.clientWidth,
          missingAnchors,
          title: document.title,
        };
      });

      ensure(result.headline, `Headline ausente em ${device}`);
      ensure(result.media, `Filme ausente em ${device}`);
      ensure(result.overflow <= 3, `Rolagem horizontal indevida em ${device}: ${result.overflow}px`);
      ensure(result.missingAnchors.length === 0, `Âncoras sem destino: ${result.missingAnchors.join(", ")}`);

      if (device === "mobile") {
        ensure(result.headline.top < result.media.top, "No celular, vídeo está antes da proposta de valor");
        ensure(result.headline.top < height * 0.75, "Proposta de valor não aparece na primeira tela");
      }

      await page.screenshot({ path: path.join(OUT, `home-${device}.png`) });

      const contact = page.getByRole("button", { name: /Prefere detalhar/ });
      await contact.click();
      const dialog = page.getByRole("dialog", { name: /Conte o que deseja desenvolver/ });
      await dialog.waitFor({ state: "visible" });
      const fields = await dialog.evaluate(node =>
        Object.fromEntries(["nome", "telefone", "empresa", "segmento", "tipo_solucao", "objetivo"].map(name => {
          const field = node.querySelector(`[name="${name}"]`);
          return [name, field?.required ?? null];
        }))
      );
      ensure(fields.nome && fields.telefone && fields.objetivo, "Campos de contato essenciais devem ser obrigatórios");
      ensure(!fields.empresa && !fields.segmento && !fields.tipo_solucao, "Campos de qualificação devem ser opcionais");
      await dialog.getByRole("button", { name: "Fechar formulário de contato" }).first().click();
      await dialog.waitFor({ state: "hidden" });
      ensure(exceptions.length === 0, `Erro JavaScript em ${device}: ${exceptions.join("; ")}`);
      console.log("QA HOME", device, "OK", JSON.stringify(result));
      await page.close();
    }

    const page = await browser.newPage();
    for (const route of ["/plataforma", "/privacidade", "/sitemap.xml", "/robots.txt"]) {
      const response = await page.goto(BASE + route, { waitUntil: "domcontentloaded", timeout: 90000 });
      ensure(response && response.status() === 200, `HTTP ${response?.status()} em ${route}`);
      console.log("QA ROUTE", route, response.status());
    }
    await page.close();
  } finally {
    await browser.close();
  }
})().catch(error => {
  console.error("QA HOME FAILED", error);
  process.exitCode = 1;
});

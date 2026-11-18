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
      // O logo do filme tem sua própria largura de exibição e não deve
      // fazer o celular baixar a versão grande de 1080px.
      if (device==="mobile") {
        const oversizedLogo=await page.evaluate(() =>
          performance.getEntriesByType("resource").some(resource =>
            resource.name.includes("vorzax-logo-clean.png") &&
            /(?:\?|&)w=1080(?:&|$)/.test(resource.name)
          ));
        ensure(!oversizedLogo,"Logo do filme requer largura excessiva no celular");
      }
      ensure(await page.getByText("Minas Gerais, Brasil",{exact:true}).count()>=1,
        "A localização Minas Gerais, Brasil deve permanecer na página inicial");
      ensure(await page.locator("header img[alt=\"Vorzax Tecnologia\"]").count()===1,"Marca deve aparecer no cabeçalho");
      ensure(result.media, `Demonstração principal ausente em ${device}`);
      ensure(await page.getByRole("heading",{name:/Respostas claras. Sem promessas vagas./}).count()===1,"FAQ comercial ausente");
      ensure(await page.getByRole("heading",{name:/Gostou de uma ideia/}).count()===1,"Ponte de conversão ausente");
      ensure(await page.locator("#inicio").getByRole("link",{name:/Solicitar avaliação do meu projeto/}).count()===1,
        "CTA principal da home precisa apontar para avaliação de projeto");
      ensure(await page.locator("#inicio").getByRole("link",{name:/Solicitar avaliação do meu projeto/}).getAttribute("href")==="/solicitar-proposta",
        "CTA comercial principal com destino incorreto");
      ensure(result.overflow <= 3, `Rolagem horizontal indevida em ${device}: ${result.overflow}px`);
      ensure(result.missingAnchors.length === 0, `Âncoras sem destino: ${result.missingAnchors.join(", ")}`);

      if (device === "mobile") {
        ensure(result.headline.top < result.media.top, "No celular, vídeo está antes da proposta de valor");
        ensure(result.headline.top < height * 0.75, "Proposta de valor não aparece na primeira tela");
      }

      // O filme original deve continuar rodando suas cinco demonstrações,
      // sempre contidas na caixa sem distorções ou alternância de dispositivo.
      const hero = page.locator("#inicio .vx-brand-reel");
      ensure(await hero.count() === 1, `Filme da Vorzax ausente em ${device}`);
      ensure(await page.locator("#inicio [data-vx-hero-demo]").count() === 0,
        "A demonstração estática da revisão anterior ainda aparece no hero");
      ensure(await hero.getByRole("button", { name: /Desktop|Mobile/i }).count() === 0,
        "O filme superior não deve oferecer troca de dispositivo");

      await hero.scrollIntoViewIfNeeded();
      for (let scene = 1; scene <= 5; scene++) {
        await page.waitForFunction(
          sceneIndex => document.querySelector("#inicio .vx-brand-reel")?.getAttribute("data-reel-scene") === String(sceneIndex),
          scene,
          { timeout: 24000 }
        );
        const fit = await hero.evaluate(element => {
          const screen = element.querySelector("[data-reel-preview]");
          const viewport = screen?.querySelector("[data-rich-stage]");
          const content = viewport?.querySelector(".vx-rich-canvas");
          if (!screen || !viewport || !content) return { ok: false, reason: "Cena sem demonstração" };
          const outer = viewport.getBoundingClientRect();
          const inner = content.getBoundingClientRect();
          return {
            ok: inner.left >= outer.left - 3 && inner.right <= outer.right + 3 &&
              inner.top >= outer.top - 3 && inner.bottom <= outer.bottom + 3,
            scaleX: viewport.getAttribute("data-rich-scale-x"),
            scaleY: viewport.getAttribute("data-rich-scale-y"),
          };
        });
        ensure(fit.ok && fit.scaleX === fit.scaleY,
          `Enquadramento incorreto no filme ${device}, cena ${scene}: ${JSON.stringify(fit)}`);
        await hero.screenshot({ path: path.join(OUT, `filme-${device}-cena-${scene}.png`) });
      }

      // No Laboratório, os rótulos visíveis solicitados são Desktop e Mobile.
      const lab = page.locator("#tecnologia-em-acao");
      await lab.scrollIntoViewIfNeeded();
      const deviceControls = lab.getByRole("group", { name: "Visualizar demonstração em" });
      ensure(await deviceControls.getByRole("button", { name: "Visão desktop" }).innerText() === "Desktop",
        `Rótulo Desktop incorreto em ${device}`);
      ensure(await deviceControls.getByRole("button", { name: "Visão mobile" }).innerText() === "Mobile",
        `Rótulo Mobile incorreto em ${device}`);

      await page.screenshot({ path: path.join(OUT, `home-${device}.png`) });

      const contact = page.getByRole("button", { name: /Enviar briefing pelo WhatsApp/ });
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

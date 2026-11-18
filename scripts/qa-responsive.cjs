/* eslint-disable @typescript-eslint/no-require-imports -- QA de navegador executada no GitHub Actions. */
const { chromium } = require("playwright");
const fs = require("node:fs");
const path = require("node:path");

const BASE = "http://127.0.0.1:3000";
const OUT = path.resolve("qa-results");
fs.mkdirSync(OUT, { recursive: true });

const viewports = [
  [320, 700], [360, 740], [390, 844], [430, 932],
  [768, 1024], [1024, 768], [1366, 768], [1440, 900],
  [1920, 1080], [2560, 1440],
];
const routes = [
  "/", "/servicos", "/solicitar-proposta", "/como-trabalhamos",
  "/servicos/sites", "/servicos/automacoes",
  "/servicos/dashboards-bi", "/servicos/sistemas-sob-medida",
];
const measurements = [];
const failures = [];

function expect(ok, message, data) {
  if (!ok) failures.push({ message, ...data });
}

(async () => {
  const browser = await chromium.launch({
    headless: true, args: ["--no-sandbox"],
  });
  try {
    for (const [width, height] of viewports) {
      const context = await browser.newContext({
        viewport: { width, height },
        reducedMotion: "reduce",
        deviceScaleFactor: 1,
      });
      const page = await context.newPage();
      const errors = [];
      page.on("pageerror", error => errors.push(error.message));

      // Nas larguras intermediárias, as quatro páginas técnicas já são
      // validadas pelo teste corporativo. Aqui priorizamos os extremos.
      const selectedRoutes = width <= 430 || width >= 1920
        ? routes
        : routes.slice(0, 4);

      for (const route of selectedRoutes) {
        const response = await page.goto(BASE + route, {
          waitUntil: "domcontentloaded", timeout: 90000,
        });
        expect(response && response.status() === 200, "Página indisponível", {
          width, route, status: response?.status(),
        });
        if (!response || response.status() !== 200) continue;
        await page.evaluate(async () => { await document.fonts.ready; });
        const result = await page.evaluate(() => {
          const box = element => {
            if (!element) return null;
            const r = element.getBoundingClientRect();
            return {
              left: r.left, right: r.right, top: r.top, bottom: r.bottom,
              width: r.width, height: r.height,
            };
          };
          const visible = element => {
            const style = getComputedStyle(element);
            const r = element.getBoundingClientRect();
            return style.display !== "none" && style.visibility !== "hidden"
              && r.width > 0 && r.height > 0;
          };
          const header = document.querySelector("header");
          const headerOverflow = Array.from(header?.querySelectorAll("a, button") ?? [])
            .filter(visible)
            .map(element => ({ label: element.getAttribute("aria-label") || element.textContent?.trim().slice(0, 45), ...box(element) }))
            .filter(r => r.left < -2 || r.right > innerWidth + 2);
          const main = document.querySelector("main");
          const h1 = routeIsHome()
            ? document.querySelector("#inicio h1")
            : main?.querySelector("h1");
          function routeIsHome() { return location.pathname === "/"; }
          const hero = document.querySelector("#inicio > div.relative.mx-auto");
          const shellSelectors = [
            "header > div.relative.mx-auto",
            "#inicio > div.relative.mx-auto",
            "#processo > div.relative.mx-auto",
            "#sobre > div.relative.mx-auto",
            "#contato > div.relative.mx-auto",
            "footer > div.mx-auto",
          ];
          const shells = shellSelectors
            .map(selector => ({ selector, rect: box(document.querySelector(selector)) }))
            .filter(item => item.rect);
          return {
            width: innerWidth,
            scrollWidth: document.documentElement.scrollWidth,
            bodyScrollWidth: document.body.scrollWidth,
            headerOverflow,
            headerLogo: box(header?.querySelector('img[alt="Vorzax Tecnologia"]')),
            header: box(header),
            h1: box(h1),
            hero: box(hero),
            heroMedia: box(document.querySelector("#inicio .vx-hero-media")),
            businessReturn: box(header?.querySelector('a[aria-label="Voltar ao site principal"]')),
            menuButton: box(header?.querySelector('button[aria-label="Abrir menu"]')),
            shells,
          };
        });
        measurements.push({ width, height, route, ...result });
        const info = { width, height, route };
        expect(result.scrollWidth <= width + 3 && result.bodyScrollWidth <= width + 3,
          "Rolagem horizontal fora dos limites da tela", { ...info, documentWidth: result.scrollWidth, bodyWidth: result.bodyScrollWidth });
        expect(result.headerOverflow.length === 0, "Controles do cabeçalho saindo da tela",
          { ...info, elements: result.headerOverflow });
        expect(result.h1 && result.h1.left >= -2 && result.h1.right <= width + 2,
          "Título principal cortado na lateral", { ...info, h1: result.h1 });
        expect(result.headerLogo && result.headerLogo.left >= -2 && result.headerLogo.right <= width + 2,
          "Logotipo desalinhado", { ...info, logo: result.headerLogo });
        if (route === "/") {
          expect(result.heroMedia && result.heroMedia.left >= -2 && result.heroMedia.right <= width + 2,
            "Filme principal fora da área disponível", { ...info, heroMedia: result.heroMedia });
          expect(result.shells.length === 6,
            "Faltam estruturas de alinhamento da página inicial", { ...info, shells: result.shells });
          if (result.shells.length === 6) {
            const reference = result.shells[0].rect;
            for (const item of result.shells.slice(1)) {
              expect(Math.abs(item.rect.left - reference.left) <= 2 &&
                Math.abs(item.rect.right - reference.right) <= 2,
              "Seções com alinhamentos horizontais diferentes",
              { ...info, selector: item.selector, shell: item.rect, headerShell: reference });
            }
          }
          if (width < 375) {
            expect(!Array.from(document.querySelectorAll("header a")).some(a =>
              a.textContent.trim() === "Proposta" && a.getBoundingClientRect().width > 0),
              "Botão secundário sobrepondo o menu no celular compacto", info);
          }
        } else {
          expect(result.businessReturn && result.businessReturn.left >= -2 && result.businessReturn.right <= width + 2,
            "Botão de retorno fora da tela", { ...info, back: result.businessReturn });
        }
        if ([320, 390, 768, 1440, 1920, 2560].includes(width) &&
          (route === "/" || ((width === 320 || width === 768 || width === 1920) &&
          (route === "/servicos" || route === "/solicitar-proposta")))) {
          await page.screenshot({ path: path.join(OUT, "responsivo-" + width + "-" +
            (route === "/" ? "home" : route.slice(1)) + ".png"), fullPage: false });
        }
        console.log("QA RESPONSIVE", width, height, route,
          "scroll", result.scrollWidth, "headerIssues", result.headerOverflow.length);
      }
      if (width < 768) {
        await page.goto(BASE, { waitUntil: "domcontentloaded" });
        const menu = page.getByRole("button", { name: "Abrir menu" });
        await menu.click();
        const navigation = page.locator("#menu-mobile");
        await navigation.waitFor({ state: "visible" });
        const rect = await navigation.boundingBox();
        expect(!!rect && rect.x >= -2 && rect.x + rect.width <= width + 2,
          "Menu mobile cortado ou fora de alinhamento", { width, rect });
        expect(await navigation.getByRole("link", { name: "Proposta técnica" }).count() === 1,
          "Proposta inacessível pelo menu mobile", { width });
      }
      expect(errors.length === 0, "Erro JavaScript no navegador",
        { width, errors });
      await context.close();
    }
  } finally {
    fs.writeFileSync(path.join(OUT, "responsive-measurements.json"),
      JSON.stringify({ measurements, failures }, null, 2));
    await browser.close();
  }
  console.log("QA RESPONSIVE TOTAL", measurements.length, "FAILURES", failures.length);
  if (failures.length) {
    console.error("QA RESPONSIVE FAILURES", JSON.stringify(failures, null, 2));
    process.exitCode = 1;
  }
})().catch(error => {
  console.error("QA RESPONSIVE ERROR", error);
  process.exitCode = 1;
});

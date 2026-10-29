import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";

export const runtime = "nodejs";

export const alt = "Vorzax Tecnologia — Sites profissionais, automação e soluções digitais";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OpenGraphImage() {
  // Reutiliza a marca oficial, sem criar outro símbolo para redes sociais.
  const logo = await readFile(join(process.cwd(), "public", "vorzax-logo-oficial.png"));
  const logoSrc = `data:image/png;base64,${logo.toString("base64")}`;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "68px 76px",
          background: "linear-gradient(130deg, #04111f 0%, #061b31 55%, #020713 100%)",
          color: "#ffffff",
          fontFamily: "Arial, sans-serif",
        }}
      >
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <img src={logoSrc} width={318} height={91} alt="Vorzax Tecnologia" style={{ objectFit: "contain" }} />
          <div style={{ display: "flex", border: "1px solid #285578", color: "#88d4ff", fontSize: 16, padding: "12px 20px", borderRadius: 26 }}>
            TECNOLOGIA PARA EMPRESAS
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "26px" }}>
          <div style={{ width: "84px", height: "4px", background: "#289bfb", display: "flex" }} />
          <div style={{ fontSize: 65, fontWeight: 750, letterSpacing: "-0.055em", lineHeight: 1.05, maxWidth: 1020 }}>
            Sites profissionais e tecnologia para sua empresa evoluir.
          </div>
          <div style={{ fontSize: 24, lineHeight: 1.35, color: "#a8bed2", display: "flex" }}>
            Sites • Automações • Dashboards e BI • Sistemas
          </div>
        </div>

        <div style={{ display: "flex", justifyContent: "space-between", borderTop: "1px solid #204462", paddingTop: 25, color: "#8ecfff", fontSize: 19 }}>
          <span>www.vorzax.com.br</span>
          <span>Minas Gerais · Atendimento online</span>
        </div>
      </div>
    ),
    size
  );
}

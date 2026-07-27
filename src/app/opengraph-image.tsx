import { ImageResponse } from "next/og";

export const alt =
  "Vorzax Tecnologia — Sistemas, Automações, Dashboards e Sites";
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "72px",
          background:
            "radial-gradient(circle at 78% 18%, #0c4a6e 0%, #071327 30%, #020611 72%)",
          color: "#ffffff",
          fontFamily: "Arial, sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "22px",
          }}
        >
          <div
            style={{
              width: "84px",
              height: "84px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              borderRadius: "22px",
              background: "linear-gradient(135deg, #10d6ff, #3345ff)",
              color: "#020611",
              fontSize: "52px",
              fontWeight: 900,
            }}
          >
            V
          </div>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <div
              style={{
                fontSize: "38px",
                fontWeight: 800,
                letterSpacing: "0.14em",
              }}
            >
              VORZAX
            </div>
            <div
              style={{
                fontSize: "17px",
                color: "#38bdf8",
                letterSpacing: "0.3em",
                fontWeight: 700,
              }}
            >
              TECNOLOGIA
            </div>
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "26px" }}>
          <div
            style={{
              maxWidth: "970px",
              fontSize: "68px",
              lineHeight: 1.06,
              fontWeight: 850,
              letterSpacing: "-0.045em",
            }}
          >
            Tecnologia que organiza processos e faz sua empresa trabalhar melhor.
          </div>
          <div
            style={{
              fontSize: "27px",
              color: "#a7b4c8",
              lineHeight: 1.35,
            }}
          >
            Sistemas sob medida • Automações • Dashboards • Sites
          </div>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            fontSize: "20px",
            color: "#7dd3fc",
          }}
        >
          <span>vorzax.com.br</span>
          <span>Minas Gerais • Atendimento em todo o Brasil</span>
        </div>
      </div>
    ),
    size
  );
}

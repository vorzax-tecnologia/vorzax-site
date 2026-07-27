import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Vorzax Tecnologia",
    short_name: "Vorzax",
    description:
      "Sistemas sob medida, automações, dashboards e sites para empresas.",
    start_url: "/",
    display: "standalone",
    background_color: "#020611",
    theme_color: "#020611",
    lang: "pt-BR",
    icons: [
      {
        src: "/icon.svg",
        sizes: "any",
        type: "image/svg+xml",
      },
      {
        src: "/logo-vorzax.png",
        sizes: "512x512",
        type: "image/png",
      },
    ],
  };
}

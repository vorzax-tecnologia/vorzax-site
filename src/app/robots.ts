import type { MetadataRoute } from "next";

// Evita que URLs temporárias de homologação apareçam nos buscadores.
const isProduction = process.env.VERCEL_ENV === "production";

export default function robots(): MetadataRoute.Robots {
  if (!isProduction) {
    return { rules: { userAgent: "*", disallow: "/" } };
  }

  return {
    rules: { userAgent: "*", allow: "/" },
    sitemap: "https://www.vorzax.com.br/sitemap.xml",
    host: "https://www.vorzax.com.br",
  };
}

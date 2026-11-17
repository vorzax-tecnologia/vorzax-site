import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: "https://www.vorzax.com.br",
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: "https://www.vorzax.com.br/plataforma",
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: "https://www.vorzax.com.br/privacidade",
      changeFrequency: "yearly",
      priority: 0.2,
    },
  ];
}

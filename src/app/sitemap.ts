import type { MetadataRoute } from "next";
import { offerings } from "@/lib/offerings";

const root="https://www.vorzax.com.br";
export default function sitemap():MetadataRoute.Sitemap {
  const paths=[
    {path:"/",priority:1,changeFrequency:"weekly" as const},
    {path:"/servicos",priority:0.9,changeFrequency:"monthly" as const},
    {path:"/como-trabalhamos",priority:0.7,changeFrequency:"monthly" as const},
    {path:"/solicitar-proposta",priority:0.8,changeFrequency:"monthly" as const},
    {path:"/seguranca",priority:0.5,changeFrequency:"monthly" as const},
    {path:"/plataforma",priority:0.6,changeFrequency:"monthly" as const},
    {path:"/privacidade",priority:0.3,changeFrequency:"yearly" as const},
  ];
  return [
    ...paths.map(p=>({url:root+(p.path==="/"?"/":p.path),priority:p.priority,changeFrequency:p.changeFrequency})),
    ...offerings.map(x=>({url:root+"/servicos/"+x.slug,priority:0.85,changeFrequency:"monthly" as const}))
  ];
}

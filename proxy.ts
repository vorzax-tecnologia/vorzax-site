import type { NextRequest } from "next/server";
import { updateSession } from "@/lib/supabase/proxy";

export async function proxy(request: NextRequest) {
  return updateSession(request);
}

// Sessões Supabase são necessárias apenas nas áreas privadas.
// Páginas públicas permanecem disponíveis mesmo se a autenticação oscilar.
export const config = {
  matcher: ["/sistema/:path*", "/central/:path*"],
};

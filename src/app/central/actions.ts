"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";

const UUID = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

export async function reviewModuleRequest(input: {
  requestId: string;
  organizationId: string;
  moduleKey: string;
  decision: "approved" | "rejected";
}) {
  if (
    !UUID.test(input.requestId) ||
    !UUID.test(input.organizationId) ||
    !/^[a-z0-9_]{2,40}$/.test(input.moduleKey)
  ) {
    return { ok: false, message: "Solicitação inválida." };
  }

  const supabase = await createClient();
  const { data: claimData } = await supabase.auth.getClaims();
  const userId =
    typeof claimData?.claims?.sub === "string" ? claimData.claims.sub : null;
  if (!userId) return { ok: false, message: "Sessão expirada." };

  const { data: admin } = await supabase
    .from("platform_admins")
    .select("active")
    .eq("user_id", userId)
    .eq("active", true)
    .maybeSingle();
  if (!admin) return { ok: false, message: "Acesso administrativo necessário." };

  if (input.decision === "approved") {
    const { error: moduleError } = await supabase
      .from("organization_modules")
      .upsert(
        {
          organization_id: input.organizationId,
          module_key: input.moduleKey,
          status: "active",
          purchased_at: new Date().toISOString(),
        },
        { onConflict: "organization_id,module_key" },
      );
    if (moduleError) return { ok: false, message: "Não foi possível ativar o módulo." };
  }

  const { error } = await supabase
    .from("module_requests")
    .update({
      status: input.decision,
      reviewed_by: userId,
      reviewed_at: new Date().toISOString(),
    })
    .eq("id", input.requestId)
    .eq("status", "pending");

  if (error) return { ok: false, message: "Não foi possível revisar a solicitação." };
  revalidatePath("/central");
  revalidatePath("/sistema");
  return {
    ok: true,
    message:
      input.decision === "approved"
        ? "Módulo ativado com sucesso."
        : "Solicitação recusada.",
  };
}

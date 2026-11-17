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
    !/^[a-z0-9_]{2,40}$/.test(input.moduleKey) ||
    (input.decision !== "approved" && input.decision !== "rejected")
  ) {
    return { ok: false, message: "Solicitação inválida." };
  }

  const supabase = await createClient();
  const { data: claimData } = await supabase.auth.getClaims();
  const userId = typeof claimData?.claims?.sub === "string" ? claimData.claims.sub : null;
  if (!userId) return { ok: false, message: "Sessão expirada." };

  const { data: admin, error: adminError } = await supabase
    .from("platform_admins")
    .select("active")
    .eq("user_id", userId)
    .eq("active", true)
    .maybeSingle();
  if (adminError || !admin) {
    return { ok: false, message: "Acesso administrativo necessário." };
  }

  // Confirma que a solicitação pertence à organização e ao módulo informados.
  const { data: request, error: requestError } = await supabase
    .from("module_requests")
    .select("id")
    .eq("id", input.requestId)
    .eq("organization_id", input.organizationId)
    .eq("module_key", input.moduleKey)
    .eq("status", "pending")
    .maybeSingle();

  if (requestError || !request) {
    return { ok: false, message: "Solicitação não encontrada ou já revisada." };
  }

  // Reserva a solicitação: só a atualização efetiva de uma linha pendente autoriza a ativação.
  const { data: reviewed, error: reviewError } = await supabase
    .from("module_requests")
    .update({
      status: input.decision,
      reviewed_by: userId,
      reviewed_at: new Date().toISOString(),
    })
    .eq("id", input.requestId)
    .eq("organization_id", input.organizationId)
    .eq("module_key", input.moduleKey)
    .eq("status", "pending")
    .select("id")
    .maybeSingle();

  if (reviewError || !reviewed) {
    return { ok: false, message: "Não foi possível revisar esta solicitação." };
  }

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

    if (moduleError) {
      // Compensação quando a ativação falha. Atomicidade completa exigirá RPC transacional.
      const { data: reverted, error: revertError } = await supabase
        .from("module_requests")
        .update({ status: "pending", reviewed_by: null, reviewed_at: null })
        .eq("id", input.requestId)
        .eq("status", "approved")
        .eq("reviewed_by", userId)
        .select("id")
        .maybeSingle();

      return {
        ok: false,
        message: revertError || !reverted
          ? "A ativação falhou e exige conferência manual na Central."
          : "A ativação falhou; a solicitação voltou para pendente.",
      };
    }
  }

  revalidatePath("/central");
  revalidatePath("/sistema");
  return {
    ok: true,
    message: input.decision === "approved"
      ? "Módulo ativado com sucesso."
      : "Solicitação recusada.",
  };
}

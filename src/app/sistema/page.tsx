import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import SistemaShell from "./SistemaShell";
import type { FeatureItem, ModuleItem, Row, SystemPayload } from "./types";

export const dynamic = "force-dynamic";

type QueryResult = { data: Row[] | null };

export default async function SistemaPage() {
  const supabase = await createClient();
  const { data: claimData } = await supabase.auth.getClaims();
  const claims = claimData?.claims;
  const userId = typeof claims?.sub === "string" ? claims.sub : null;

  if (!userId) redirect("/sistema/login");

  const [{ data: profile }, { data: memberships }, { data: platformAdmin }] =
    await Promise.all([
      supabase
        .from("profiles")
        .select("full_name, active_organization_id")
        .eq("id", userId)
        .maybeSingle(),
      supabase
        .from("organization_members")
        .select("organization_id, role, permissions")
        .eq("user_id", userId)
        .limit(1),
      supabase
        .from("platform_admins")
        .select("role, active")
        .eq("user_id", userId)
        .eq("active", true)
        .maybeSingle(),
    ]);

  const firstMembership = memberships?.[0];
  const organizationId =
    profile?.active_organization_id ?? firstMembership?.organization_id ?? null;

  const [{ data: organization }, { data: catalog }, { data: features }, { data: entitlements }] =
    await Promise.all([
      organizationId
        ? supabase
            .from("organizations")
            .select("id, name, trade_name, status")
            .eq("id", organizationId)
            .maybeSingle()
        : Promise.resolve({ data: null }),
      supabase
        .from("module_catalog")
        .select("module_key, name, caption, description, icon, color, sort_order")
        .eq("active", true)
        .order("sort_order"),
      supabase
        .from("module_features")
        .select("module_key, feature_key, name, description, icon, sort_order")
        .eq("active", true)
        .order("sort_order"),
      organizationId
        ? supabase
            .from("organization_modules")
            .select("module_key, status")
            .eq("organization_id", organizationId)
        : Promise.resolve({ data: [] }),
    ]);

  const entitlementMap = new Map(
    (entitlements ?? []).map((item) => [item.module_key, item.status]),
  );
  const modules = ((catalog ?? []) as ModuleItem[]).map((module) => ({
    ...module,
    status: entitlementMap.get(module.module_key) ?? "disponivel",
  }));

  async function list(
    table: string,
    orderColumn: string,
    limit = 8,
  ): Promise<Row[]> {
    if (!organizationId) return [];
    const result = (await supabase
      .from(table)
      .select("*")
      .eq("organization_id", organizationId)
      .order(orderColumn, { ascending: false })
      .limit(limit)) as QueryResult;
    return result.data ?? [];
  }

  const [
    conversations,
    appointments,
    workOrders,
    maintenanceRequests,
    vehicles,
    customers,
    opportunities,
    financialEntries,
    inventoryItems,
    purchaseOrders,
    alerts,
  ] = await Promise.all([
    list("service_conversations", "updated_at"),
    list("service_appointments", "starts_at"),
    list("work_orders", "updated_at", 10),
    list("maintenance_requests", "requested_at"),
    list("vehicles", "updated_at"),
    list("crm_customers", "updated_at"),
    list("crm_opportunities", "updated_at"),
    list("financial_entries", "due_date", 12),
    list("inventory_items", "updated_at"),
    list("purchase_orders", "created_at"),
    list("alerts", "created_at"),
  ]);

  const email =
    typeof claims?.email === "string" ? claims.email : "usuario@empresa.com.br";
  const payload: SystemPayload = {
    user: {
      id: userId,
      email,
      name: profile?.full_name || email.split("@")[0],
    },
    organization: {
      id: organizationId,
      name: organization?.trade_name || organization?.name || "Vorzax",
      role: firstMembership?.role || platformAdmin?.role || "Usuário",
    },
    isPlatformAdmin: Boolean(platformAdmin),
    modules,
    features: (features ?? []) as FeatureItem[],
    data: {
      conversations,
      appointments,
      workOrders,
      maintenanceRequests,
      vehicles,
      customers,
      opportunities,
      financialEntries,
      inventoryItems,
      purchaseOrders,
      alerts,
    },
  };

  return <SistemaShell payload={payload} />;
}

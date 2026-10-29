import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import CentralShell, { type CentralPayload, type CentralRow } from "./CentralShell";

export const dynamic = "force-dynamic";

export default async function CentralPage() {
  const supabase = await createClient();
  const { data: claimData } = await supabase.auth.getClaims();
  const claims = claimData?.claims;
  const userId = typeof claims?.sub === "string" ? claims.sub : null;
  if (!userId) redirect("/sistema/login?next=/central");

  const [{ data: admin }, { data: profile }] = await Promise.all([
    supabase
      .from("platform_admins")
      .select("role, active")
      .eq("user_id", userId)
      .eq("active", true)
      .maybeSingle(),
    supabase.from("profiles").select("full_name").eq("id", userId).maybeSingle(),
  ]);
  if (!admin) redirect("/sistema");

  const [
    { data: organizations },
    { data: memberships },
    { data: organizationModules },
    { data: requests },
    { data: catalog },
    { data: auditLogs },
  ] = await Promise.all([
    supabase
      .from("organizations")
      .select("*")
      .order("created_at", { ascending: false })
      .limit(100),
    supabase.from("organization_members").select("organization_id, user_id, role"),
    supabase.from("organization_modules").select("organization_id, module_key, status, expires_at"),
    supabase
      .from("module_requests")
      .select("*")
      .order("created_at", { ascending: false })
      .limit(50),
    supabase
      .from("module_catalog")
      .select("module_key, name, active, sort_order")
      .order("sort_order"),
    supabase
      .from("audit_logs")
      .select("*")
      .order("created_at", { ascending: false })
      .limit(40),
  ]);

  const payload: CentralPayload = {
    admin: {
      id: userId,
      name: profile?.full_name || String(claims?.email ?? "Administrador"),
      role: admin.role,
    },
    organizations: (organizations ?? []) as CentralRow[],
    memberships: (memberships ?? []) as CentralRow[],
    organizationModules: (organizationModules ?? []) as CentralRow[],
    requests: (requests ?? []) as CentralRow[],
    catalog: (catalog ?? []) as CentralRow[],
    auditLogs: (auditLogs ?? []) as CentralRow[],
  };

  return <CentralShell payload={payload} />;
}

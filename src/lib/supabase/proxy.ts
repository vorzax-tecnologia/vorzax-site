import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";
import { getSupabaseConfig } from "./config";
import { safeLoginDestination } from "@/lib/security/safe-redirect";

export async function updateSession(request: NextRequest) {
  let response = NextResponse.next({ request });
  const { url, publishableKey } = getSupabaseConfig();

  const supabase = createServerClient(url, publishableKey, {
    cookies: {
      getAll: () => request.cookies.getAll(),
      setAll(cookiesToSet) {
        cookiesToSet.forEach(({ name, value }) =>
          request.cookies.set(name, value),
        );
        response = NextResponse.next({ request });
        cookiesToSet.forEach(({ name, value, options }) =>
          response.cookies.set(name, value, options),
        );
      },
    },
  });

  const { data } = await supabase.auth.getClaims();
  const isAuthenticated = Boolean(data?.claims?.sub);
  const isProtected =
    request.nextUrl.pathname.startsWith("/sistema") ||
    request.nextUrl.pathname.startsWith("/central");
  const isLogin = request.nextUrl.pathname === "/sistema/login";

  if (isProtected && !isAuthenticated && !isLogin) {
    const urlToLogin = request.nextUrl.clone();
    urlToLogin.pathname = "/sistema/login";
    urlToLogin.searchParams.set(
      "next",
      `${request.nextUrl.pathname}${request.nextUrl.search}`,
    );
    return NextResponse.redirect(urlToLogin);
  }

  if (isAuthenticated && isLogin) {
    const destination = safeLoginDestination(request.nextUrl.searchParams.get("next"));
    return NextResponse.redirect(new URL(destination, request.url));
  }

  return response;
}

/** Accept only local routes used after Vorzax authentication. */
export function safeLoginDestination(value: string | null | undefined): string {
  const fallback = "/sistema";
  if (!value || value.includes("\\")) return fallback;

  const isAllowed = (path: string) => /^\/(sistema|central)(?:[/?#]|$)/.test(path);
  if (!isAllowed(value)) return fallback;

  try {
    const base = "https://vorzax.internal.invalid";
    const target = new URL(value, base);
    const resolved = `${target.pathname}${target.search}${target.hash}`;
    if (target.origin !== base || !isAllowed(resolved)) return fallback;
    return resolved;
  } catch {
    return fallback;
  }
}

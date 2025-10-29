export function normalizeRedirectParam(value: string | null | undefined) {
  if (!value) return undefined;
  try {
    const decoded = decodeURIComponent(value);
    return decoded.startsWith("/") ? decoded : undefined;
  } catch {
    return undefined;
  }
}

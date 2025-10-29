import { NextRequest, NextResponse } from "next/server";

import getRoutes from "@/routes";
import { normalizeRedirectParam } from "@/utils/redirect";

export function GET(req: NextRequest) {
  const { searchParams, origin } = req.nextUrl;
  const token = searchParams.get("token") ?? undefined;
  const redirect = normalizeRedirectParam(searchParams.get("redirect"));

  const callbackUrl = new URL(getRoutes().auth.googleCallback.path(), origin);
  if (token) callbackUrl.searchParams.set("token", token);
  if (redirect) callbackUrl.searchParams.set("redirect", redirect);

  return NextResponse.redirect(callbackUrl);
}

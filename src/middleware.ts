import { NextRequest, NextResponse } from "next/server";
import settings from "./config/settings";
import { MeDocument, type MeQuery } from "./graphql/__generated__/hooks";
import { decodeTokenEdge, isTokenExpiredEdge } from "./lib/jwt-edge";
import getRoutes from "./routes";
import { makeServerApolloClient } from "./services/apollo/rscClient";

const PUBLIC_ROUTES = [
  getRoutes().auth.login.path(),
  getRoutes().auth.forgotPassword.path(),
  getRoutes().auth.googleCallback.path(),
];

const isPublicRoute = (p: string) => PUBLIC_ROUTES.includes(p);

const validateToken = async (token: string | undefined) => {
  if (!token) return { valid: false, expired: false };
  if (isTokenExpiredEdge(token)) return { valid: false, expired: true };
  try {
    const decoded = decodeTokenEdge(token);
    if (!decoded) return { valid: false, expired: false };
    const client = makeServerApolloClient(token);
    const { data } = await client.query<MeQuery>({
      query: MeDocument,
      errorPolicy: "none",
      context: { fetchOptions: { timeout: 5000 } },
    });
    return { valid: !!data?.me?.id, expired: false };
  } catch {
    return { valid: false, expired: false };
  }
};

const clearCookies = (res: NextResponse) => {
  res.cookies.delete(settings.tokenKey);
  res.cookies.delete(settings.refreshTokenKey);
};

export default async function middleware(req: NextRequest) {
  const { pathname, search } = req.nextUrl;
  const token = req.cookies.get(settings.tokenKey)?.value;

  if (!token) {
    if (isPublicRoute(pathname)) return NextResponse.next();
    const url = new URL(getRoutes().auth.login.path(), req.nextUrl);
    if (pathname !== getRoutes().auth.login.path()) {
      url.searchParams.set("redirect", `${pathname}${search}`);
    }
    return NextResponse.redirect(url);
  }

  const { valid, expired } = await validateToken(token);
  if (!valid) {
    const url = new URL(getRoutes().auth.login.path(), req.nextUrl);
    url.searchParams.set("reason", expired ? "expired" : "invalid");
    const res = NextResponse.redirect(url);
    clearCookies(res);
    return res;
  }

  if (isPublicRoute(pathname)) {
    return NextResponse.redirect(new URL(getRoutes().home.path(), req.nextUrl));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt|.*\\.png$).*)",
  ],
};

import { NextResponse, type NextRequest } from "next/server";

const locales = ["en", "ml"];

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  if (locales.some((l) => pathname === `/${l}` || pathname.startsWith(`/${l}/`))) return;
  const preferred = request.headers.get("accept-language")?.toLowerCase().startsWith("ml") ? "ml" : "en";
  request.nextUrl.pathname = `/${preferred}${pathname === "/" ? "" : pathname}`;
  return NextResponse.redirect(request.nextUrl);
}

export const config = {
  matcher: ["/((?!_next|icon.svg|.*\\..*).*)"],
};

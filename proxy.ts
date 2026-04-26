import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

import { DEFAULT_LOCALE, isSupportedLocale } from "@/lib/i18n/config";

const PUBLIC_FILE = /\.(.*)$/;

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (pathname === "/favicon.ico") {
    const redirectedUrl = request.nextUrl.clone();
    redirectedUrl.pathname = "/logo/covid-19.png";
    return NextResponse.redirect(redirectedUrl);
  }

  if (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/api") ||
    PUBLIC_FILE.test(pathname)
  ) {
    return NextResponse.next();
  }

  const segments = pathname.split("/").filter(Boolean);
  const firstSegment = segments[0];

  if (firstSegment && isSupportedLocale(firstSegment)) {
    return NextResponse.next();
  }

  const redirectedUrl = request.nextUrl.clone();
  redirectedUrl.pathname = `/${DEFAULT_LOCALE}${pathname}`;

  return NextResponse.redirect(redirectedUrl);
}

export const config = {
  matcher: ["/((?!_next/static|_next/image).*)"],
};

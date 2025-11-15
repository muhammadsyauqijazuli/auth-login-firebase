import { NextResponse, type NextRequest } from "next/server";

export function middleware(req: NextRequest) {
  const res = NextResponse.next();
  res.headers.set("Cross-Origin-Opener-Policy", "same-origin-allow-popups");
  res.headers.set("Cross-Origin-Embedder-Policy", "unsafe-none");
  res.headers.set("Origin-Agent-Cluster", "?0");
  return res;
}

export const config = {
  matcher: "/:path*",
};

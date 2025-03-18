import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// Middleware untuk mengecek sesi pengguna
export function middleware(req: NextRequest) {
  const token = req.cookies.get("token")?.value;
  const role = req.cookies.get("role")?.value;
  const url = req.nextUrl.pathname;

  if (!token || !role) {
    if (url.startsWith("/admin")) return NextResponse.redirect(new URL("/loginadmin", req.url));
    if (url.startsWith("/students")) return NextResponse.redirect(new URL("/loginstudents", req.url));
    if (url.startsWith("/parents")) return NextResponse.redirect(new URL("/loginparents", req.url));
    return NextResponse.redirect(new URL("/", req.url));
  }

  // Proteksi berdasarkan role
  if (url.startsWith("/admin") && role !== "ADMIN") return NextResponse.redirect(new URL("/admin", req.url));
  if (url.startsWith("/students") && role !== "STUDENT") return NextResponse.redirect(new URL("/students", req.url));
  if (url.startsWith("/parents") && role !== "ORANGTUA") return NextResponse.redirect(new URL("/parents", req.url));

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*", "/students/:path*", "/parents/:path*"],
};

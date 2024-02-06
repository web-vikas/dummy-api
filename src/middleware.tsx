import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function middleware(request: NextRequest) {
  if (request.nextUrl.pathname === "/") {
    // Skip redirect logic for the home page
    return;
  }

  const token = request.cookies.get("user-token")?.value;
  if (!token) {
    // Redirect to absolute URL using request.nextUrl.origin
    return NextResponse.redirect(new URL("/", request.nextUrl.origin));
  }
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the following:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - /login (Login page)
     */
    "/((?!api|_next/static|_next/image|favicon.ico|login).*)",
  ],
};

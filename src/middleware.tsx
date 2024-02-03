import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import isAuthorized from "./lib/auth";

export async function middleware(request: NextRequest) {
  if (await isAuthorized())
    return NextResponse.redirect(new URL("/dashboard", request.url));
}

export const config = {
  matcher: "/",
};

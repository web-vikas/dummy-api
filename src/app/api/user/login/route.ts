import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const response = NextResponse.json({
    message: "Login Success",
    status: true,
  });

  response.cookies.set("user-id", "65c0817a2e77b8292edafb40", {
    httpOnly: true,
    secure: true,
    sameSite: true,
  });

  return response;
}

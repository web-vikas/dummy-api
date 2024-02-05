import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest, { params }: any) {
  const { user, project, endpoint } =  params;

  console.log(req.nextUrl.pathname);

  return NextResponse.json({ data: { user, project, endpoint } });
}

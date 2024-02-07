import { connect } from "@/config/db";
import { Find } from "@/helper/mongoose";
import EndpointModel from "@/models/end-points";
import { NextRequest, NextResponse } from "next/server";
connect();
export async function GET(req: NextRequest, { params }: any) {
  const { user } = params;
  const projects = await Find({
    model: EndpointModel,
    where: { projectId: "65c0e3e402474905fcd02f50" },
    select: "EndpointName method",
  });

  return NextResponse.json(projects);
}

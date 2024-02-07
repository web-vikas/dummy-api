import { connect } from "@/config/db";
import { Find } from "@/helper/mongoose";
import ProjectModel from "@/models/projects";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
connect();
export async function GET(req: NextRequest, { params }: any) {
  
  const projects = await Find({
    model: ProjectModel,
    where: { userId: "65c0817a2e77b8292edafb40" },
    select: "projectName",
  });
  return NextResponse.json(projects);
}

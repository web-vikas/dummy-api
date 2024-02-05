import { Aggregate, FindOne, HandleError } from "@/helper/mongoose";
import EndpointModel from "@/models/end-points";
import ProjectModel from "@/models/projects";
import UserModel from "@/models/users";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest, { params }: any) {
  const { user, project, endpoint } = params;

  const data = await FindOne({
    model: UserModel,
    where: {
      userName: user,
    },
  });

  if (!data) {
    return HandleError("Such User Doesn't Exist !");
  }

  const data1 = await FindOne({
    model: ProjectModel,
    where: {
      projectUrl: project,
    },
  });
  if (!data1) {
    return HandleError("Such Project Doesn't Exist !");
  }

  const data2 = await FindOne({
    model: EndpointModel,
    where: {
      endpointUrl: endpoint,
    },
  });

  if (!data2) {
    return HandleError("Such Endpoint Doesn't Exist !");
  }

  return NextResponse.json({ data2 });
}

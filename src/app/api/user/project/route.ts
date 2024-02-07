import { connect } from "@/config/db";
import {
  Find,
  FindOne,
  HandleError,
  HandleServerError,
  HandleSuccess,
  Insert,
} from "@/helper/mongoose";
import { NextRequest, NextResponse } from "next/server";
import ProjectModel from "@/models/projects";
import { isValidUser } from "@/helper/isValidUser";
connect();

export async function GET(req: NextRequest) {
  const token = req.headers.get("authorization") || "";
  const isValid = await isValidUser(token);

  if (!isValid) {
    return NextResponse.json({ message: "UnAuthorized" }, { status: 401 });
  }
  const projects = await Find({
    model: ProjectModel,
    where: { userId: isValid._id },
    select: "projectName",
  });

  return NextResponse.json(projects, { status: 200 });
}

export async function POST(req: NextRequest) {
  try {
    const bodyData = await req.json();
    const { userId, projectName, projectUrl } = bodyData;

    const existingProject = await FindOne({
      model: ProjectModel,
      where: { userId, projectUrl },
    });

    if (existingProject) {
      return HandleError("Project already exist !");
    }

    const insertData = await Insert({
      model: ProjectModel,
      data: {
        projectName,
        projectUrl,
        userId,
      },
    });
    if (!insertData) return HandleError("Failed to insert");
    return HandleSuccess(insertData);
  } catch (error) {
    HandleServerError(req, error);
  }
}

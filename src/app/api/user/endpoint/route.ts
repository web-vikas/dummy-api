import { connect } from "@/config/db";
import {
  FindAndUpdate,
  FindOne,
  HandleError,
  HandleServerError,
  HandleSuccess,
  Insert,
} from "@/helper/mongoose";
import { NextRequest, NextResponse } from "next/server";
import EndpointModel from "@/models/end-points";
import ProjectModel from "@/models/projects";
connect();

export async function POST(req: NextRequest) {
  try {
    const bodyData = await req.json();
    const { userId, projectId, EndpointName, endpointUrl, method, fields } =
      bodyData;

    const existingProject = await FindOne({
      model: ProjectModel,
      where: { _id: projectId },
    });

    if (!existingProject) {
      return HandleError("Project not found");
    }

    const existingEndpoint = await FindOne({
      model: EndpointModel,
      where: { projectId: projectId, endpointUrl: endpointUrl },
    });

    if (existingEndpoint) {
      return HandleError("Endpoint already exist !");
    }

    const insertData = await Insert({
      model: EndpointModel,
      data: {
        userId,
        projectId,
        EndpointName,
        endpointUrl,
        method,
        fields,
      },
    });
    if (!insertData) return HandleError("Failed to insert");

    const existingFields = existingProject.endpoints || [];

    existingFields.push({
      id: insertData._id,
      endpoint: endpointUrl,
    });

    const updateProject = await FindAndUpdate({
      model: ProjectModel,
      where: { _id: projectId },
      update: {
        endpoints: existingFields,
      },
    });

    if (!updateProject) return HandleError("Failed to Update");

    return HandleSuccess(insertData);
  } catch (error) {
    HandleServerError(req, error);
  }
}

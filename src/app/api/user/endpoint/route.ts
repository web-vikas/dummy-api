import { connect } from "@/config/db";
import {
  HandleError,
  HandleServerError,
  HandleSuccess,
  Insert,
} from "@/helper/mongoose";
import { NextRequest, NextResponse } from "next/server";
import EndpointModel from "@/models/end-points";
connect();

export async function GET(req: NextRequest) {
  console.log(req.nextUrl.pathname);

  return NextResponse.json({ data: "hello" });
}

export async function POST(req: NextRequest) {
  try {
    const bodyData = await req.json();
    const userId = "65c0817a2e77b8292edafb40";
    const { projectId, EndpointName, method, fields } = bodyData;
    const insertData = await Insert({
      model: EndpointModel,
      data: {
        userId,
        projectId,
        EndpointName,
        method,
        fields,
      },
    });
    if (!insertData) return HandleError("Failed to insert");
    return HandleSuccess(insertData);
  } catch (error) {
    HandleServerError(req, error);
  }
}

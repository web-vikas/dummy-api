import { connect } from "@/config/db";
import {
  HandleError,
  HandleServerError,
  HandleSuccess,
  Insert,
} from "@/helper/mongoose";
import { NextRequest, NextResponse } from "next/server";
import EmailModel from "@/models/email";
connect();

export async function GET(req: NextRequest) {

  return NextResponse.json({ data: "hello" });
}

export async function POST(req: NextRequest) {
  try {
    const bodyData = await req.json();
    const { email } = bodyData;
    const insertData = await Insert({
      model: EmailModel,
      data: {
        email,
      },
    });
    if (!insertData) return HandleError("Failed to insert");
    return HandleSuccess(insertData);
  } catch (error) {
    HandleServerError(req, error);
  }
}

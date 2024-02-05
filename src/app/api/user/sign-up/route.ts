import { connect } from "@/config/db";
import {
  HandleError,
  HandleServerError,
  HandleSuccess,
  Insert,
} from "@/helper/mongoose";
import { NextRequest, NextResponse } from "next/server";
import UserModel from "@/models/users";
connect();

export async function GET(req: NextRequest) {
  console.log(req.nextUrl.pathname);

  return NextResponse.json({ data: "hello" });
}

export async function POST(req: NextRequest) {
  try {
    const bodyData = await req.json();
    const { userName, email } = bodyData;
    const insertData = await Insert({
      model: UserModel,
      data: {
        userName,
        email,
      },
    });
    if (!insertData) return HandleError("Failed to insert");
    return HandleSuccess(insertData);
  } catch (error) {
    HandleServerError(req, error);
  }
}

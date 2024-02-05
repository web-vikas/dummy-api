import { connect } from "@/config/db";
import {
  HandleError,
  HandleServerError,
  HandleSuccess,
  Insert,
} from "@/helper/mongoose";
import { NextRequest, NextResponse } from "next/server";
import PhoneModel from "@/models/phone";
connect();

export async function GET(req: NextRequest) {
  console.log(req.nextUrl.pathname);

  return NextResponse.json({ data: "hello" });
}

export async function POST(req: NextRequest) {
  try {
    const bodyData = await req.json();
    const { countryCode, phoneNumber } = bodyData;
    const insertData = await Insert({
      model: PhoneModel,
      data: {
        countryCode,
        phoneNumber,
      },
    });
    if (!insertData) return HandleError("Failed to insert the name");
    return HandleSuccess(insertData);
  } catch (error) {
    HandleServerError(req, error);
  }
}

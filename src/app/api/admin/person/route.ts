import { connect } from "@/config/db";
import {
  HandleError,
  HandleServerError,
  HandleSuccess,
  Insert,
} from "@/helper/mongoose";
import { NextRequest, NextResponse } from "next/server";
import PersonModel from "@/models/persons";
connect();

export async function GET(req: NextRequest) {

  return NextResponse.json({ data: "hello" });
}

export async function POST(req: NextRequest) {
  try {
    const bodyData = await req.json();
    const { firstName, LastName, fullName, age, gender, job } = bodyData;
    const insertData = await Insert({
      model: PersonModel,
      data: {
        firstName,
        LastName,
        fullName,
        age,
        gender,
        job,
      },
    });
    if (!insertData) return HandleError("Failed to insert the name");
    return HandleSuccess(insertData);
  } catch (error) {
    HandleServerError(req, error);
  }
}

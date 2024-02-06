import { connect } from "@/config/db";
import {
  FindOne,
  HandleError,
  HandleServerError,
  HandleSuccess,
} from "@/helper/mongoose";
import UserModel from "@/models/users";
import { NextRequest } from "next/server";

connect();

export async function POST(req: NextRequest) {
  try {
    const bodyData = await req.json();
    const { userName } = bodyData;

    const existingUser = await FindOne({
      model: UserModel,
      where: { email: userName },
    });

    if (!existingUser) {
      return HandleError({ status: false, message: "User Not Found !" });
    }
    return HandleSuccess({ status: true, message: "User Found." });
  } catch (error) {
    HandleServerError(req, error);
  }
}

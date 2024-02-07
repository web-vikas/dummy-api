import { connect } from "@/config/db";
import jwt from "jsonwebtoken";
import {
  FindAndUpdate,
  FindOne,
  GeneratePassword,
  HandleError,
  HandleServerError,
  HandleSuccess,
} from "@/helper/mongoose";
import UserModel from "@/models/users";
import { NextApiResponse } from "next";
import { NextRequest, NextResponse } from "next/server";

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
    const access_token = jwt.sign(
      { id: existingUser._id, email: existingUser.email },
      "test",
      {
        expiresIn: 86400,
      }
    );

    let updated = await FindAndUpdate({
      model: UserModel,
      where: { _id: existingUser._id },
      update: {
        $set: {
          accessToken: access_token,
        },
      },
    });

    if (!updated) return HandleError("Failed to generate access token.");

    const res = HandleSuccess({
      status: true,
      message: "Login Success.",
    });

    res.cookies.set("user-token", access_token, {
      httpOnly: true,
    });
    return res;
  } catch (error) {
    HandleServerError(req, error);
  }
}

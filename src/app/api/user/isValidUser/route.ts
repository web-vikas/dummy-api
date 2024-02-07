import { connect } from "@/config/db";
import {
  FindOne,
  HandleError,
  HandleServerError,
  HandleSuccess,
  IsExists,
} from "@/helper/mongoose";
import UserModel from "@/models/users";
import jwt from "jsonwebtoken";
import { NextRequest } from "next/server";

connect();

export async function POST(req: NextRequest) {
  try {
    const bodyData = await req.json();
    const { token } = bodyData;
    jwt.verify(token, "test", async (err: any, user: any) => {
      if (err) return HandleError({ status: false, message: "Unauthorized !" });
      const isUserExists = await IsExists({
        model: UserModel,
        where: { _id: user.id, accessToken: token },
      });

      if (!isUserExists)
        return HandleError({ status: false, message: "Unauthorized !" });
    });
    return HandleSuccess({ status: true, message: "Authorized." });
  } catch (error) {
    HandleServerError(req, error);
  }
}

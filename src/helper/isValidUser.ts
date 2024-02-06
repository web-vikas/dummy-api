import { connect } from "@/config/db";
import { IsExists, IsExistsOne } from "@/helper/mongoose";
import UserModel from "@/models/users";
import jwt from "jsonwebtoken";

export async function isValidUser(token: string) {
  connect();
  try {
    if (token == "") return false;
    const user: any = jwt.verify(token, "test");
    const isUserExists = await IsExistsOne({
      model: UserModel,
      where: { _id: user.id, accessToken: token },
    });
    return isUserExists;
  } catch (error) {
    return false;
  }
}

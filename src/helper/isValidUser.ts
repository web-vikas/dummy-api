import { connect } from "@/config/db";
import { IsExistsOne } from "@/helper/mongoose";
import UserModel from "@/models/users";
import jwt from "jsonwebtoken";

export async function isValidUser(token: string) {
  connect();
  try {
    if (token == "") return null;
    const user: any = jwt.verify(token, "test");
    const isUserExists = await IsExistsOne({
      model: UserModel,
      where: { _id: user.id, accessToken: token },
    });
    console.log('== >',isUserExists.userName);

    return isUserExists;
  } catch (error) {
    return null;
  }
}

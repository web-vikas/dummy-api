"use server";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";
import { FindAndUpdate, FindOne } from "@/helper/mongoose";
import UserModel from "@/models/users";
import bcrypt from "bcrypt";
import { connect } from "@/config/db";
connect();

export const userLogin = async (formData: FormData) => {
  try {
    const email = formData.get("email");
    const password = formData.get("password")?.toString();
    if (!email) {
      return {
        error: "Please Enter email",
      };
    }
    if (!password) {
      return {
        error: "Please Enter Password",
      };
    }
    const existingUser = await FindOne({
      model: UserModel,
      where: { email: email },
    });

    if (!existingUser) {
      return {
        error: "User Not Exist !",
      };
    }
    console.log(existingUser);

    const isPasswordCorrect = await bcrypt.compare(
      password,
      existingUser.password
    );

    if (!isPasswordCorrect)
      return {
        error: "Password Incorrect !",
      };

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

    if (!updated)
      return {
        error: "Failed to update !",
      };
    cookies().set("user-token", access_token);
    cookies().set("user-info", existingUser.userName);
    return {
      message: `Welcome ,${existingUser.userName}`,
    };
  } catch (error) {
    console.error(error);
    return {
      error: "Something Went Wrong !",
    };
  }
};

export const userLogout = async () => {
  try {
    cookies().delete("user-token");
    cookies().delete("user-info");
    return {
      message: `Logout Success`,
    };
  } catch (error) {
    console.error(error);
    return {
      error: "Something Went Wrong !",
    };
  }
};

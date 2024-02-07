"use server";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { cookies } from "next/headers";
import {
  FindAndUpdate,
  FindOne,
  GeneratePassword,
  Insert,
} from "@/helper/mongoose";
import UserModel from "@/models/users";
import { connect } from "@/config/db";
connect();

export const userRegister = async (formData: FormData) => {
  try {
    const email = formData.get("email");
    const username = formData.get("username");
    const name = formData.get("name");
    const password = formData.get("password")?.toString() || "";

    if (!password || password.length > 5) {
      return {
        error: "invalid password !",
      };
    }
    const password_hash = await bcrypt.hash(password, 16);
    let existingUser = await FindOne({
      model: UserModel,
      where: { email: email },
    });

    if (existingUser) {
      return {
        error: "Email Exist !",
      };
    }
    existingUser = await FindOne({
      model: UserModel,
      where: { userName: username },
    });

    if (existingUser) {
      return {
        error: "Username Exist !",
      };
    }

    const insertData = await Insert({
      model: UserModel,
      data: {
        userName: username,
        name: name,
        email,
        password: password_hash,
        apiToken: GeneratePassword(10),
      },
    });
    if (!insertData) {
      return {
        error: "Failed to Insert !",
      };
    }
    const access_token = jwt.sign(
      { id: insertData._id, email: email },
      "test",
      {
        expiresIn: 86400,
      }
    );

    let updated = await FindAndUpdate({
      model: UserModel,
      where: { _id: insertData._id },
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
    cookies().set("user-info", updated.userName);
    return {
      message: `Welcome ,${updated.name}`,
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

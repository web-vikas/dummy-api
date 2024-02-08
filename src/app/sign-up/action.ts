"use server";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { cookies } from "next/headers";
import { z } from "zod";
import {
  FindAndUpdate,
  FindOne,
  GeneratePassword,
  Insert,
} from "@/helper/mongoose";
import UserModel from "@/models/users";
import { connect } from "@/config/db";
connect();
const usernameRegex = /^[a-zA-Z0-9_]+$/;
const passwordRegex = /^[a-zA-Z0-9!@#$%^&*()_+=[\]{};':"\\|,.<>/?]+$/; 
export const userRegister = async (formData: FormData) => {
  const formDataSchema = z.object({
    email: z.string().email({ message: "Invalid Email!" }),
    username: z
      .string()
      .min(6, { message: "Username must be at least 6 characters long!" })
      .regex(usernameRegex, {
        message: "Username must contain only letters, digits, and underscores.",
      }),
    name: z.string({
      required_error: "Name is required",
      invalid_type_error: "Name field is required!",
    }),
    password: z
      .string()
      .min(8, { message: "Password must be at least 8 characters long!" })
      .regex(passwordRegex, {
        message:
          "Password must contain only letters, digits, and special characters.",
      }),
  });
  const email = formData.get("email");
  const username = formData.get("username");
  const name = formData.get("name");
  const password = formData.get("password")?.toString() || "";
  try {
    formDataSchema.parse({
      email: email as string,
      username: username as string,
      name: name as string,
      password: password as string,
    });
  } catch (error: any) {
    console.log(error.errors[0]);
    return {
      error: error.errors[0].message,
    };
  }

  try {
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

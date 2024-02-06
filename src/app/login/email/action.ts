"use server";
import axios from "axios";

export const isUserExist = async (username: string) => {
  const response = await axios.post(
    `http://localhost:3000/api/user/isUserExist`,
    { userName: username }
  );
  return response.data;
};

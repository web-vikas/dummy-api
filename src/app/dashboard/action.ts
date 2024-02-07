"use server";

import { isValidUser } from "@/helper/isValidUser";
import { Find, FindOne, Insert } from "@/helper/mongoose";
import ProjectModel from "@/models/projects";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";
export async function fetchProjects() {
  try {
    const token = cookies().get("user-token")?.value || "";
    const isValid = await isValidUser(token);
  
    if (!isValid) {
      return {
        error: "UnAuthorized !",
      };
    }
    const projects = await Find({
      model: ProjectModel,
      where: { userId: isValid._id },
      select: "projectName projectUrl",
    });

    if (!projects || projects.length == 0) {
      return {
        error: "0 Project Founds !",
      };
    }

    return {
      data: projects,
      user: isValid.userName,
      message: "Success ",
    };
  } catch (error: any) {
    return {
      error: "Something Went Wrong !",
    };
  }
}

export async function addProject(formData: FormData) {
  try {
    const projectName = formData.get("projectName");
    if (!projectName || projectName.toString.length > 3) {
      return {
        error: "Invalid Project Name !",
      };
    }
    const projectUrl =
      projectName && projectName.toString().toLowerCase().replaceAll(" ", "-");
    const token = cookies().get("user-token")?.value || "";
    const isValid = await isValidUser(token);
    if (!isValid) {
      return {
        error: "UnAuthorized !",
      };
    }

    const existingProject = await FindOne({
      model: ProjectModel,
      where: { userId: isValid._id, projectUrl },
    });

    if (existingProject) {
      return {
        error: "Project already exist !",
      };
    }

    const insertData = await Insert({
      model: ProjectModel,
      data: {
        projectName,
        projectUrl,
        userId: isValid._id,
      },
    });
    if (!insertData)
      return {
        error: "Failed to insert",
      };
    revalidatePath("/dashboard");
    return {
      message: projectName + " Added Successfully",
    };
  } catch (error: any) {
    return {
      error: "Something Went Wrong !",
    };
  }
}

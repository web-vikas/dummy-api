"use server";

import { connect } from "@/config/db";
import { isValidUser } from "@/helper/isValidUser";
import { Find, FindAndUpdate, FindOne, Insert } from "@/helper/mongoose";
import EndpointModel from "@/models/end-points";
import ProjectModel from "@/models/projects";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";
connect();

export async function fetchEndPoints(project: string) {
  try {
    const token = cookies().get("user-token")?.value || "";
    const isValid = await isValidUser(token);
    if (!isValid) {
      return {
        error: "UnAuthorized !",
      };
    }
    const endpoints = await FindOne({
      model: ProjectModel,
      where: { projectUrl: project },
      select: "endpoints",
    });

    if (!endpoints || endpoints.endpoints.length == 0) {
      return {
        user: isValid.userName,
        error: "0 Endpoint Founds !",
      };
    }
    return {
      data: endpoints,
      user: isValid.userName,
      message: "Success ",
    };
  } catch (error: any) {
    return {
      error: "Something Went Wrong !",
    };
  }
}

export async function addEndpoint({ name, method, newData, project }: any) {
  try {
    if (!project || project.toString.length > 3) {
      return {
        error: "Invalid Project Name !",
      };
    }
    const endpointUrl = name.toLowerCase().replaceAll(" ", "-");
    const token = cookies().get("user-token")?.value || "";
    const isValid = await isValidUser(token);

    if (!isValid) {
      return {
        error: "UnAuthorized !",
      };
    }

    const existingProject = await FindOne({
      model: ProjectModel,
      where: { userId: isValid._id, projectUrl: project },
    });

    const existEndpoint = existingProject.endpoints;

    const test = existEndpoint.some((endpoint: any) =>
      endpoint.endpoint.includes(endpointUrl)
    );

    if (test) {
      return {
        error: "Endpoint Already Exist ",
      };
    }

    const insertData = await Insert({
      model: EndpointModel,
      data: {
        userId: isValid._id,
        projectId: existingProject._id,
        EndpointName: name,
        endpointUrl: endpointUrl,
        method,
        fields: newData,
      },
    });
    if (!insertData)
      return {
        error: "Failed to insert",
      };

    existEndpoint.push({
      id: insertData._id,
      endpoint: endpointUrl,
      method: method,
    });

    const updateProject = await FindAndUpdate({
      model: ProjectModel,
      where: { _id: existingProject._id },
      update: {
        endpoints: existEndpoint,
      },
    });

    if (!updateProject)
      return {
        error: "Failed to Update",
      };

    revalidatePath(`/${isValid.userName}/${project}`);

    return {
      message: `Added Successfully`,
    };
  } catch (error: any) {
    return {
      error: "Something Went Wrong !",
    };
  }
}

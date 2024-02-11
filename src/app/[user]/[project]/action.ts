"use server";

import { connect } from "@/config/db";
import { isValidUser } from "@/helper/isValidUser";
import {
  Aggregate,
  Find,
  FindAndUpdate,
  FindOne,
  Insert,
} from "@/helper/mongoose";
import EndpointModel from "@/models/end-points";
import ProjectModel from "@/models/projects";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";
import { z } from "zod";
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
    let endpoints = await Aggregate({
      model: ProjectModel,
      data: [
        [
          {
            $match: {
              userId: isValid._id,
              projectUrl: project,
            },
          },
          {
            $lookup: {
              from: "endpoints",
              localField: "_id",
              foreignField: "projectId",
              as: "data",
            },
          },
          {
            $project: {
              data: 1,
            },
          },
        ],
      ],
    });
    endpoints = endpoints[0].data;

    if (!endpoints || endpoints.length == 0) {
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
  const newDataSchema = z.object({
    name: z.string().min(4, { message: "Invalid Endpoint Name !" }),
    method: z.string({ required_error: "Invalid Method !" }),
  });
  console.log(newData);

  const data = {
    name,
    method,
  };
  try {
    newDataSchema.parse(data);
  } catch (error: any) {
    return {
      error: error.errors[0].message,
    };
  }

  try {
    if (!newData || newData.length == 0) {
      return {
        error: "Please Add Some Fields.",
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

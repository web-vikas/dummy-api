"use server";

import ProjectInfoItem, {
  ProjectInfoProps,
} from "@/components/list/project-info";
import axios from "axios";
import { cookies } from "next/headers";
export async function fetchProjects() {
  try {
    const token = cookies().get("user-token")?.value;

    const response = await axios.get("http://localhost:3000/api/user/project", {
      headers: {
        Authorization: `${token}`,
      },
    });

    if (response.data.length == 0) {
      return <h1>No Project.</h1>;
    }
    return response.data.map((item: ProjectInfoProps) => (
      <ProjectInfoItem
        key={item._id}
        _id={item._id}
        projectName={item.projectName}
      />
    ));
  } catch (error: any) {
    if (error.response && error.response.status === 401) {
      // Handle 401 Unauthorized error
      console.error("Unauthorized: Please log in again");
      // redirect the user to the login page
    } else {
      console.error("An error occurred:", error.message);
    }
    return null;
  }
}

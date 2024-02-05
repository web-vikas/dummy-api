"use server";

import ProjectInfoItem, {
  ProjectInfoProps,
} from "@/components/list/project-info";
import axios from "axios";

export const fetchProjects = async () => {
  const response = await axios.get(`http://localhost:3000/api/web-vikas`);
  return response.data.map((item: ProjectInfoProps, index: number) => (
    <ProjectInfoItem
      key={item._id}
      _id={item._id}
      projectName={item.projectName}
    />
  ));
};

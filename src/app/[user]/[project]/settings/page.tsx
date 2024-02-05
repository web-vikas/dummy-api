import ProjectNav from "@/components/project-nav";
import React from "react";

const page = ({ params }: any) => {
  const { user, project } = params;

  return (
    <div>
      <ProjectNav user={user} project={project} />
      Settings
    </div>
  );
};

export default page;

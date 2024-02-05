import ProjectNav from "@/components/project-nav";
import React from "react";

const page = ({ params }: any) => {
  const { user, project } = params;
  return (
    <>
      <ProjectNav user={user} project={project} />
      <h1>Logs</h1>
    </>
  );
};

export default page;

import ProjectNav from "@/components/project-nav";
import EndPointItem from "@/components/list/endpoint-info";
import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import { PlusCircledIcon } from "@radix-ui/react-icons";
import { fetchEndpoints } from "./action";

const page = async ({ params }: any) => {
  const { user, project } = params;
  const data = await fetchEndpoints();
  return (
    <div className="max-w-screen-xl mx-auto">
      <ProjectNav user={user} project={project} />
      <div className="flex justify-end mt-3">
        <Link
          href={"/web-vikas/project/new-endpoint"}
          className={buttonVariants()}
        >
          <PlusCircledIcon className="mr-3" />
          New Endpoint
        </Link>
      </div>
      <div className="my-4">{data}</div>
    </div>
  );
};

export default page;

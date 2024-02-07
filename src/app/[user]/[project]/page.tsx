import ProjectNav from "@/components/project-nav";
import EndPointItem, {
  EndpointInfoProps,
} from "@/components/list/endpoint-info";
import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import { PlusCircledIcon } from "@radix-ui/react-icons";
import { fetchEndPoints } from "./action";

const page = async ({ params }: any) => {
  const { project } = params;
  const data = await fetchEndPoints(project);
  return (
    <div className="max-w-screen-xl mx-auto">
      <ProjectNav user={"user"} project={project} />
      <div className="flex justify-end mt-3">
        <Link
          href={`/${data.user}/${project}/new-endpoint`}
          className={buttonVariants()}
        >
          <PlusCircledIcon className="mr-3" />
          New Endpoint
        </Link>
      </div>
      <div className="my-4">
        {!data.error ? (
          data?.data.endpoints?.map((item: EndpointInfoProps, i: number) => (
            <EndPointItem
              key={i}
              _id={item._id}
              endpoint={item.endpoint}
              method={item.method}
              project={project}
              user={data.user}
            />
          ))
        ) : (
          <h1>{data.error}</h1>
        )}
      </div>
    </div>
  );
};

export default page;

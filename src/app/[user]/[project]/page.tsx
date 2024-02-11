import ProjectNav from "@/components/project-nav";
import EndPointItem, {
  EndpointInfoProps,
} from "@/components/list/endpoint-info";
import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import { PlusCircledIcon } from "@radix-ui/react-icons";
import { fetchEndPoints } from "./action";

const EndPoints = async ({ params }: any) => {
  const { project } = params;
  const data = await fetchEndPoints(project);
  return (
    <div className="max-w-screen-xl mx-auto">
      <div className="flex justify-between mt-3 px-3 items-center">
        <h1 className="font-bold text-xl ">Endpoints</h1>
        <Link
          href={`/${data.user}/${project}/new-endpoint`}
          className={buttonVariants()}
        >
          <PlusCircledIcon className="mr-3" />
          New Endpoint
        </Link>
      </div>
      <div className="my-4 max-sm:p-5 max-sm:text-xs">
        {!data.error ? (
          data?.data?.map((item: EndpointInfoProps, i: number) => (
            <EndPointItem
              key={i}
              _id={item._id}
              endpointUrl={item.endpointUrl}
              EndpointName={item.EndpointName}
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

export default EndPoints;

import { Label } from "@/components/ui/label";
import { MagnifyingGlassIcon } from "@radix-ui/react-icons";
import { NewProjectModal } from "./new-project";
import { fetchProjects } from "./action";
import ProjectInfoItem, {
  ProjectInfoProps,
} from "@/components/list/project-info";

const Dashboard = async () => {
  const data = await fetchProjects();
  return (
    <>
      <div className="mt-5 max-w-screen-xl mx-auto max-sm:p-5 ">
        <div className="flex items-center gap-3 mb-3 ">
          <div className="flex border-2 rounded-md items-center my-2 p-2 py-1.5 w-full focus-within:dark:border-white/60 focus-within:border-black/60">
            <Label htmlFor="search">
              <MagnifyingGlassIcon className="h-6 w-6 mr-3 opacity-75" />
            </Label>
            <input
              placeholder="Search Project"
              id="search"
              className="outline-none border-none bg-transparent w-full placeholder:dark:opacity-75"
            />
          </div>
          <>
            <NewProjectModal />
          </>
        </div>
        {!data.error ? (
          data?.data?.map((item: ProjectInfoProps) => (
            <ProjectInfoItem
              key={item._id}
              _id={item._id}
              projectName={item.projectName}
              projectUrl={item.projectUrl}
              user={data.user}
              createdAt={item.createdAt}
            />
          ))
        ) : (
          <h1>{data.error}</h1>
        )}
      </div>
    </>
  );
};

export default Dashboard;

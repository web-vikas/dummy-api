import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  DotsHorizontalIcon,
  ExternalLinkIcon,
  GlobeIcon,
  StarIcon,
  TargetIcon,
  TrashIcon,
} from "@radix-ui/react-icons";
import Image from "next/image";
import Link from "next/link";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cookies } from "next/headers";
import { isValidUser } from "@/helper/isValidUser";
import ProjectModel from "@/models/projects";
import { Delete } from "@/helper/mongoose";
import { revalidatePath } from "next/cache";
import mongoose from "mongoose";
import EndpointModel from "@/models/end-points";
export interface ProjectInfoProps {
  _id: string;
  projectName: string;
  projectUrl: string;
  user?: string;
  createdAt: string;
}
const ProjectInfoItem = ({
  _id,
  projectName,
  projectUrl,
  user,
  createdAt,
}: ProjectInfoProps) => {
  const deleteProject = async () => {
    "use server";
    const token = cookies().get("user-token")?.value || "";
    const isValid = await isValidUser(token);
    if (!isValid) {
      return;
    }
    let del = await Delete({
      model: ProjectModel,
      where: { _id },
    });

    del = await Delete({
      model: EndpointModel,
      where: {
        projectId: new mongoose.Types.ObjectId(_id),
      },
    });
    revalidatePath("/dashboard");
  };

  return (
    <>
      <Card className="rounded-sm p-2 flex items-center justify-between mb-3">
        <div className="flex items-center gap-4">
          <div>
            <GlobeIcon className="h-8 w-8" />
          </div>
          <div className="flex flex-col">
            <Link href={`/${user}/${projectUrl}`} className="hover:underline">
              <h2>{projectName}</h2>
            </Link>
            <p className="font-extralight inline-flex items-center gap-2 hover:underline opacity-70 text-sm">
              Created At :{new Date(createdAt).toDateString()}
            </p>
          </div>
        </div>
        <div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="icon">
                <DotsHorizontalIcon />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56">
              <DropdownMenuItem>
                <form action={deleteProject} className="w-full">
                  <Button
                    variant="destructive"
                    className="w-full rounded-sm flex justify-between"
                  >
                    Delete Project
                    <TrashIcon />
                  </Button>
                </form>
              </DropdownMenuItem>
              {/* <DropdownMenuItem>View Logs</DropdownMenuItem> */}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </Card>
    </>
  );
};

export default ProjectInfoItem;

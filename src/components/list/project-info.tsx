import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  DotsHorizontalIcon,
  ExternalLinkIcon, StarIcon
} from "@radix-ui/react-icons";
import Image from "next/image";
import Link from "next/link";
import {
  DropdownMenu,
  DropdownMenuContent, DropdownMenuItem, DropdownMenuShortcut, DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
export interface ProjectInfoProps {
  _id: string;
  projectName: string;
}
const ProjectInfoItem = ({ _id, projectName }: ProjectInfoProps) => {
  return (
    <>
      <Card className="rounded-sm p-2 flex items-center justify-between mb-3">
        <div className="flex items-center gap-4">
          <div>
            <Image height={30} width={30} alt="project-logo" src="/next.svg" />
          </div>
          <div className="flex flex-col">
            <Link
              href={`/web-vikas/${projectName
                .toLowerCase()
                .replaceAll(" ", "-")}`}
              className="hover:underline"
            >
              <h2>{projectName}</h2>
            </Link>
            <Link href="/" className=" text-sm opacity-70">
              <p className="font-extralight inline-flex items-center gap-2 hover:underline">
                fake-api.com/username/
                {projectName.toLowerCase().replaceAll(" ", "-")}
                <ExternalLinkIcon />
              </p>
            </Link>
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
                Add to Favorite
                <DropdownMenuShortcut>
                  <StarIcon />
                </DropdownMenuShortcut>
              </DropdownMenuItem>
              <DropdownMenuItem>View Logs</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </Card>
    </>
  );
};

export default ProjectInfoItem;

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  DotsHorizontalIcon,
  ExternalLinkIcon,
  GlobeIcon,
  StarIcon,
  TargetIcon,
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
export interface ProjectInfoProps {
  _id: string;
  projectName: string;
  projectUrl: string;
  user?: string;
  endpoints: any;
  createdAt:string;
}
const ProjectInfoItem = ({
  _id,
  projectName,
  projectUrl,
  user,
  endpoints,
  createdAt
}: ProjectInfoProps) => {
  return (
    <>
      <Card className="rounded-sm p-2 flex items-center justify-between mb-3">
        <div className="flex items-center gap-4">
          <div>
            <GlobeIcon className="h-8 w-8"/>
          </div>
          <div className="flex flex-col">
            <Link href={`/${user}/${projectUrl}`} className="hover:underline">
              <h2>{projectName}</h2>
            </Link>
            <p className="font-extralight inline-flex items-center gap-2 hover:underline opacity-70 text-sm">
              Total Endpoint : {endpoints} | Created At : {new Date(createdAt).toDateString()}
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

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  ClipboardCopyIcon,
  DotsHorizontalIcon,
  StarIcon,
} from "@radix-ui/react-icons";
import Image from "next/image";
import Link from "next/link";

export interface EndpointInfoProps {
  _id: string;
  endpoint: string;
  method: string;
  user: string;
  project?: string;
}

const EndPointItem = ({
  endpoint,
  method,
  user,
  project,
}: EndpointInfoProps) => {
  return (
    <Card className="rounded-sm p-2 flex items-center justify-between mb-3">
      <div className="flex items-center gap-4">
        <div>
          <Image height={30} width={30} alt="project-logo" src="/next.svg" />
        </div>
        <div className="flex flex-col">
          <Link
            href={`/api/${user}/${project}/${endpoint}`}
            className=" text-xl  hover:underline"
            target="_blank"
          >
            <h2>{endpoint}</h2>
          </Link>
          <div className="flex items-center gap-2">
            <p className="font-extralight inline-flex items-center gap-2">
              {user}/{project}/{endpoint}
            </p>

            <ClipboardCopyIcon />
            <Button size={"sm"} className="h-5 p-1 ml-3">
              {method}
            </Button>
          </div>
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
            <DropdownMenuItem>
              Copy to Clipboard
              <DropdownMenuShortcut>
                <ClipboardCopyIcon />
              </DropdownMenuShortcut>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </Card>
  );
};

export default EndPointItem;

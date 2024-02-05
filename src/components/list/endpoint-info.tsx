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
  _id?: string;
  EndpointName: string;
  method: string;
}

const EndPointItem = ({ EndpointName, method }: EndpointInfoProps) => {
  return (
    <Card className="rounded-sm p-2 flex items-center justify-between mb-3">
      <div className="flex items-center gap-4">
        <div>
          <Image height={30} width={30} alt="project-logo" src="/next.svg" />
        </div>
        <div className="flex flex-col">
          <Link href="/" className="hover:underline">
            <h2>{EndpointName}</h2>
          </Link>
          <Link
            href="/"
            className=" text-sm opacity-70 flex gap-2 items-center"
          >
            <p className="font-extralight inline-flex items-center gap-2 hover:underline">
              fake-api.com/user/
              {EndpointName.toLowerCase().replaceAll(" ", "-")}
            </p>
            <ClipboardCopyIcon />
            <Button size={"sm"} className="h-5 p-1 ml-3">
              {method}
            </Button>
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

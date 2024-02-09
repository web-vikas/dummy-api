import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { isValidUser } from "@/helper/isValidUser";
import { Delete } from "@/helper/mongoose";
import EndpointModel from "@/models/end-points";
import {
  ClipboardCopyIcon,
  DotsHorizontalIcon,
  StarIcon,
  TrashIcon,
} from "@radix-ui/react-icons";
import mongoose from "mongoose";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";
import Image from "next/image";
import Link from "next/link";
import CopyButton from "../CopyButton";

export interface EndpointInfoProps {
  _id: string;
  endpointUrl: string;
  EndpointName: string;
  method: string;
  user: string;
  project?: string;
}

const EndPointItem = ({
  _id,
  endpointUrl,
  EndpointName,
  method,
  user,
  project,
}: EndpointInfoProps) => {
  const deleteEndpoint = async () => {
    "use server";
    const token = cookies().get("user-token")?.value || "";
    const isValid = await isValidUser(token);
    if (!isValid) {
      return;
    }
    await Delete({
      model: EndpointModel,
      where: {
        _id,
      },
    });
    revalidatePath("/" + user + "/" + project);
  };
  return (
    <Card className="rounded-sm p-2 flex items-center justify-between mb-3">
      <div className="flex items-center gap-4">
        <div>
          <Image height={30} width={30} alt="project-logo" src="/next.svg" />
        </div>
        <div className="flex flex-col">
          <Link
            href={`/api/${user}/${project}/${endpointUrl}`}
            className=" text-xl  hover:underline"
            target="_blank"
          >
            <h2>{EndpointName}</h2>
          </Link>
          <div className="flex items-center gap-2">
            <p className="font-extralight inline-flex items-center gap-2">
              {user}/{project}/{endpointUrl}
            </p>
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
            {/* <DropdownMenuItem>
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
            </DropdownMenuItem> */}
            <DropdownMenuItem>
              <form action={deleteEndpoint} className="w-full">
                <Button
                  variant="destructive"
                  className="w-full rounded-sm flex justify-between"
                >
                  Delete Project
                  <TrashIcon />
                </Button>
              </form>
            </DropdownMenuItem>
            <DropdownMenuItem className="flex justify-between px-4">
              Copy URL
              <CopyButton links={`/api/${user}/${project}/${endpointUrl}`} />
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </Card>
  );
};

export default EndPointItem;

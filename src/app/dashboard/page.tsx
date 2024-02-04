import { Button, buttonVariants } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import {
  DotFilledIcon,
  DotsHorizontalIcon,
  ExternalLinkIcon,
  MagnifyingGlassIcon,
  PlusCircledIcon,
  StarIcon,
} from "@radix-ui/react-icons";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
const page = () => {
  return (
    <div className="mt-5 max-w-screen-xl mx-auto">
      <div className="flex items-center gap-3 mb-3">
        <div className="flex border-2 rounded-md items-center my-2 p-2 py-1.5 w-full">
          <Label htmlFor="search">
            <MagnifyingGlassIcon className="h-6 w-6 mr-3 opacity-75" />
          </Label>
          <input
            placeholder="Search Project"
            id="search"
            className="outline-none border-none bg-transparent w-full placeholder:opacity-75"
          />
        </div>
        <Button>
          <PlusCircledIcon className="mr-2 h-4 w-4" /> New Project
        </Button>
      </div>
      <ProjectInfoItem />
    </div>
  );
};

export default page;

const ProjectInfoItem = () => {
  return (
    <>
      <Card className="rounded-sm p-2 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div>
            <Image height={30} width={30} alt="project-logo" src="/next.svg" />
          </div>
          <div className="flex flex-col">
            <Link href="/" className="hover:underline">
              <h2>home-automation</h2>
            </Link>
            <Link href="/" className=" text-sm opacity-70">
              <p className="font-extralight inline-flex items-center gap-2 hover:underline">
                home-automation-one.vercel.app <ExternalLinkIcon />
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

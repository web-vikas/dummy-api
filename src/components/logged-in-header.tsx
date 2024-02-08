import ThemeSwitch from "@/components/control/theme-switch";
import { HamburgerMenuIcon, TargetIcon } from "@radix-ui/react-icons";
import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { NavigationMenuDemo } from "./control/navigation";
import { LogoutForm } from "./logout";
import { Button } from "./ui/button";

const UserHeader = ({ name }: any) => {
  return (
    <header className="flex justify-between p-3 items-center border-b">
      <div className="flex items-center gap-2">
        <Link className="flex justify-center items-center gap-2" href="/">
          <TargetIcon className="h-9 w-9" />
          <h1 className="font-extrabold text-xl">fake/api</h1>
        </Link>
      </div>
      <div>
        {/* {!name && (
          <Button size="icon" className="md:hidden">
            <HamburgerMenuIcon />
          </Button>
        )} */}
        <div className="flex justify-center gap-3">
          {name ? (
            <DropdownMenu>
              <DropdownMenuTrigger>
                <Avatar className="h-8 w-8">
                  <AvatarImage src="https://github.com/shadcn.png" />
                  <AvatarFallback>{name[0]}</AvatarFallback>
                </Avatar>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <Link href="/dashboard" className="hover:underline">
                    Dashboard
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Link href="/dashboard/token" className="hover:underline">
                    My Token
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <LogoutForm />
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <NavigationMenuDemo />
          )}
        </div>
      </div>
    </header>
  );
};

export default UserHeader;

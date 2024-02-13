"use client";
import {
  DesktopIcon,
  MoonIcon,
  SunIcon,
  TargetIcon,
} from "@radix-ui/react-icons";
import { Button } from "./ui/button";
import { useTheme } from "next-themes";
import Link from "next/link";

import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList
} from "@/components/ui/navigation-menu";

const Footer = () => {
  const { setTheme } = useTheme();

  return (
    <footer className="mx-auto max-w-screen-xl mt-8 p-2">
      <div className="flex  justify-between">
        <div className="flex items-center">
          <TargetIcon className="h-7 w-7" />
          <p className="ms-2">© dmy-api</p>
        </div>
        <div>
          <Button size="icon" variant="ghost" onClick={() => setTheme("light")}>
            <SunIcon />
          </Button>
          <Button size="icon" variant="ghost" onClick={() => setTheme("dark")}>
            <MoonIcon />
          </Button>
          <Button
            size="icon"
            variant="ghost"
            onClick={() => setTheme("system")}
          >
            <DesktopIcon />
          </Button>
        </div>
      </div>
      <div className="mt-5 flex justify-center">
        <NavigationMenu>
          <NavigationMenuList className="gap-6 justify-center">
            <NavigationMenuItem>
              <Link href="/docs" legacyBehavior passHref>
                <NavigationMenuLink>Home</NavigationMenuLink>
              </Link>
            </NavigationMenuItem>
            <NavigationMenuItem>
            
              <Link href="/login" legacyBehavior passHref>
                <NavigationMenuLink>Login</NavigationMenuLink>
              </Link>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <Link href="/sign-up" legacyBehavior passHref>
                <NavigationMenuLink>Sign Up</NavigationMenuLink>
              </Link>
              
            </NavigationMenuItem>
            <Link href={"/guide"} className="mr-2">
            Guide
          </Link>
          </NavigationMenuList>
        </NavigationMenu>
      </div>
    </footer>
  );
};

export default Footer;

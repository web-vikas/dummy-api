"use client";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
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
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";

const Footer = () => {
  const { setTheme } = useTheme();

  return (
    <footer className="mx-auto max-w-screen-xl mt-8">
      <div className="flex  justify-between">
        <div className="flex items-center">
          <TargetIcon className="h-8 w-8" />
          <p className="ms-2">© 2024 Vikas Patel</p>
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
      <div className="mt-5">
        <NavigationMenu>
          <NavigationMenuList className="gap-6">
            <NavigationMenuItem>
              <Link href="/docs" legacyBehavior passHref>
                <NavigationMenuLink >
                  Documentation
                </NavigationMenuLink>
              </Link>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <Link href="/" legacyBehavior passHref>
                <NavigationMenuLink >
                  Home
                </NavigationMenuLink>
              </Link>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <Link href="/login" legacyBehavior passHref>
                <NavigationMenuLink >
                Help
                </NavigationMenuLink>
              </Link>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <Link href="/login" legacyBehavior passHref>
                <NavigationMenuLink >
                Contact Sales
                </NavigationMenuLink>
              </Link>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <Link href="/login" legacyBehavior passHref>
                <NavigationMenuLink >
                Blog
                </NavigationMenuLink>
              </Link>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
      </div>
    </footer>
  );
};

export default Footer;

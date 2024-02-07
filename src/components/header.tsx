import ThemeSwitch from "@/components/control/theme-switch";
import { NavigationMenuDemo } from "./control/navigation";
import { TargetIcon } from "@radix-ui/react-icons";
import Link from "next/link";
import { Button } from "./ui/button";

const Header = (user: any) => {
  return (
    <header className="flex justify-between p-3 items-center border-b">
      <Link className="flex justify-center items-center gap-2" href="/">
        <TargetIcon className="h-6 w-6" />
        <h1 className="font-extrabold text-xl">fake/api</h1>
      </Link>
      <div className="flex justify-center gap-3">
        {!user ? <NavigationMenuDemo /> : <Button>Logout</Button>}
        <ThemeSwitch />
      </div>
    </header>
  );
};

export default Header;

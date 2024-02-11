import { Button, buttonVariants } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  EnvelopeClosedIcon,
  GitHubLogoIcon,
  LinkedInLogoIcon,
} from "@radix-ui/react-icons";
import Link from "next/link";
import React from "react";

const LoginPage = () => {
  return (
    <div className="">
      <div className="mt-11 md:mt-20 mx-auto max-w-96 max-[400px]:p-4">
        <h1 className="text-3xl max-sm:text-2xl font-extrabold mb-6 text-center">
          Login into Fake / Api
        </h1>
        <div className="flex flex-col gap-3">
          <Button
            className="font-medium p-6 text-md"
            variant="secondary"
            disabled
          >
            <GitHubLogoIcon className="mr-2 h-5 w-5" /> GitHub (coming soon)
          </Button>
          <Button
            className="font-medium p-6 text-md"
            variant="linkedIn"
            disabled
          >
            <LinkedInLogoIcon className="mr-2 h-5 w-5" /> LinkedIn (coming soon)
          </Button>
          <Separator className="my-5" />
          <Link
            href="/login/email"
            className={`${buttonVariants({ variant: "outline" })} !p-6`}
          >
            <EnvelopeClosedIcon className="mr-3 h-5 w-5" /> Login With Email
          </Link>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;

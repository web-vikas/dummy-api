"use client";

import { Label } from "@/components/ui/label";
import { userRegister } from "./action";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { redirect } from "next/navigation";
import FormSubmitBtn from "@/components/FormSubmitBtn";

export const SignUpForm = () => {
  const handelClientAction = async (formData: FormData) => {
    const res = await userRegister(formData);
    if (res?.error) {
      toast.error(res.error);
    } else {
      toast.success(res.message);
      redirect("/dashboard");
    }
  };

  return (
    <form action={handelClientAction} className="mx-auto max-w-screen-sm ">
      <div className="flex flex-col gap-3 mb-3">
        <Label htmlFor="email">Email</Label>
        <Input id="email" placeholder="email@gmail.com" name="email" />
        <Label htmlFor="name">Name</Label>
        <Input id="name" placeholder="john" name="name" />
        <Label htmlFor="username">Username</Label>
        <Input id="username" placeholder="john" name="username" />
      </div>
      <div className="mb-3 flex flex-col gap-3">
        <Label htmlFor="password">Password</Label>
        <Input
          id="password"
          type="password"
          placeholder="********"
          name="password"
        />
      </div>
      <FormSubmitBtn className="font-semibold">Join</FormSubmitBtn>
    </form>
  );
};

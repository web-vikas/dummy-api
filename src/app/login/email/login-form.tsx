"use client";

import { Label } from "@/components/ui/label";
import { userLogin } from "./action";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { useFormStatus } from "react-dom";

export const LoginForm = () => {
  const { pending } = useFormStatus();
  const router = useRouter();

  const handelClientAction = async (formData: FormData) => {
    try {
      const res = await userLogin(formData);
      if (res?.error) {
        toast.error(res.error);
      } else {
        toast.success(res.message);
        router.push("/dashboard");
      }
    } catch (error) {
      console.error("Error occurred:", error);
    }
  };

  return (
    <form className="mx-4" action={handelClientAction}>
      <div className="flex flex-col gap-3 mb-3">
        <Label htmlFor="email">Email</Label>
        <Input id="email" placeholder="email@gmail.com" name="email" />
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
      <Button disabled={pending} >
        Login
      </Button>
    </form>
  );
};

"use client";

import { Label } from "@/components/ui/label";
import { userLogin } from "./action";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

export const LoginForm = async () => {
  const router = useRouter();
  const handelClientAction = async (formData: FormData) => {
    const res = await userLogin(formData);
    
    if (res?.error) {
      toast.error(res.error);
    } else {
      toast.success(res.message);
      router.push("/dashboard");
    }
  };

  return (
    <form action={handelClientAction} className="mx-4">
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
      <Button>Login</Button>
    </form>
  );
};

"use client";
import { Label } from "@/components/ui/label";
import { userLogin } from "./action";
import { Input } from "@/components/ui/input";

import { toast } from "sonner";
import { useRouter } from "next/navigation";
import FormSubmitBtn from "@/components/FormSubmitBtn";

export const LoginForm = () => {
  const router = useRouter();

  const handelClientAction = async (formData: FormData) => {
    try {
      const res = await userLogin(formData);
      if (res?.error) {
        return toast.error(res.error);
      }
      toast.success(res.message);
      router.push("/dashboard");
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
      <FormSubmitBtn className="font-semibold">Login</FormSubmitBtn>
    </form>
  );
};

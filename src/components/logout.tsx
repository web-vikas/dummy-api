"use client";
import { toast } from "sonner";
import { userLogout } from "@/app/login/email/action";
import { redirect } from "next/navigation";

export const LogoutForm = () => {
  const handelClientAction = async () => {
    const res = await userLogout();
    if (res?.error) {
      toast.error(res.error);
    }
    toast.success(res.message);
    redirect("/");
  };

  return (
    <form action={handelClientAction}>
      <button>Logout</button>
    </form>
  );
};

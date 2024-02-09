"use client";
import { toast } from "sonner";
import { userLogout } from "@/app/login/email/action";
import { useRouter } from "next/navigation";

export default function LogoutForm() {
  const router = useRouter();
  const handelClientAction = async () => {
    const res = await userLogout();
    if (res?.error) {
      toast.error(res.error);
    }
    toast.success(res.message);
    router.push("/");
  };

  return (
    <form action={handelClientAction}>
      <button>Logout</button>
    </form>
  );
}

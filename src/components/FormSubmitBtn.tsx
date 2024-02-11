"use client";

import { ComponentProps, ReactNode } from "react";
import { Button } from "@/components/ui/button";
import { useFormStatus } from "react-dom";
import { Loader2 } from "lucide-react";

type FormSubmitBtn = {
  children: ReactNode;
  className?: string;
} & ComponentProps<"button">;

export default function FormSubmitBtn({ children, className }: FormSubmitBtn) {
  const { pending } = useFormStatus();
  // const pending = true;

  return (
    <Button type="submit" disabled={pending} className={`${className} w-[110px]`}>

      {pending ? (
        <Loader2
          className={`animate-spin w-6 h-6 font-bold mr-3`}
          strokeWidth={"3"}
        />
      ) : null} {children}
    </Button>
  );
}

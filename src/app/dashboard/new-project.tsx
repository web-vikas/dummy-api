"use client";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { PlusCircledIcon, PlusIcon } from "@radix-ui/react-icons";
import { addProject } from "./action";
import { toast } from "sonner";
import FormSubmitBtn from "@/components/FormSubmitBtn";
import { DialogClose } from "@radix-ui/react-dialog";

export function NewProjectModal() {
  const handelClientAction = async (formData: FormData) => {
    const res = await addProject(formData);
    if (res?.error) {
      toast.error(res.error);
    } else {
      toast.success(res.message);
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">
          <PlusCircledIcon className="md:mr-3" />
          <span className="hidden md:block">New Project</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <form action={handelClientAction}>
          <DialogHeader>
            <DialogTitle>Add Project</DialogTitle>
            <DialogDescription>Add New Project</DialogDescription>
          </DialogHeader>
          <div className="flex flex-col gap-3 my-3">
            <Label htmlFor="name">Name</Label>
            <Input id="name" name="projectName" />
          </div>
          <DialogFooter>
            <DialogClose>
              <FormSubmitBtn className="font-semibold">Add</FormSubmitBtn>
            </DialogClose>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

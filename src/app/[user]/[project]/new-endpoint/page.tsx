"use client";
import { Input } from "@/components/ui/input";
import React, { useState } from "react";
import { addEndpoint } from "../action";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { PlusCircledIcon, TrashIcon } from "@radix-ui/react-icons";
import { Separator } from "@/components/ui/separator";

const Page = ({ params }: any) => {
  interface Field {
    fieldName: string;
    type: string;
  }
  interface OriginalFormat {
    fieldName: string;
    type: string;
  }

  interface NewFormat {
    [fieldName: string]: string;
  }

  const router = useRouter();
  const { user, project } = params;
  const [fields, setFields] = useState<Field[]>([]);
  const [name, setName] = useState("");
  const [method, setMethod] = useState(String);

  function convertToNewFormat(data: OriginalFormat[]): NewFormat[] {
    const newArray: NewFormat[] = [];
    data.forEach((item) => {
      const newObj: NewFormat = {};
      newObj[item.fieldName] = item.type;
      newArray.push(newObj);
    });
    return newArray;
  }

  const handelSubmit = async () => {
    const newData: NewFormat[] = convertToNewFormat(fields);
    const res = await addEndpoint({ name, method, newData, project });
    if (res?.error) {
      toast.error(res.error);
    } else {
      toast.success(res.message);
      router.push(`/${user}/${project}`);
    }
  };

  const handleChange = (
    index: number,
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = event.target;
    const newFields = [...fields];
    newFields[index][name as keyof Field] = value;
    setFields(newFields);
  };

  const handleAddField = () => {
    setFields([...fields, { fieldName: "", type: "" }]);
  };

  const handleRemoveField = (index: number) => {
    const newFields = [...fields];
    newFields.splice(index, 1);
    setFields(newFields);
  };

  return (
    <div className="flex flex-col gap-3 mt-11  mx-auto max-w-7xl max-sm:p-5">
      <div className="flex gap-2 w-full">
        <div className="flex-1">
          <Label htmlFor="end">Endpoint Name</Label>
          <Input
            name="endpointName"
            id="end"
            placeholder="Example - Get Data"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="flex-1">
          <Label>Request Method</Label>
          <Select value={method} onValueChange={(e) => setMethod(e)}>
            <SelectTrigger>
              <SelectValue placeholder="Select Method" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="GET">GET</SelectItem>
              <SelectItem value="POST">POST</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      <>
        <Separator className="my-3" />
        <div className="flex justify-between items-center">
          <Label className="font-extrabold text-xl">Add Fields</Label>
          <Button onClick={handleAddField}>
            <PlusCircledIcon className="mr-3" />
            Add Field
          </Button>
        </div>
      </>
      {fields.map((field, index) => (
        <div key={index} className="flex items-center gap-2">
          <div className=" flex-1">
            <Label htmlFor={"f" + index}>Field Name</Label>
            <Input
              type="text"
              name="fieldName"
              placeholder="Example - Name"
              value={field.fieldName}
              onChange={(e) => handleChange(index, e)}
              id={"f" + index}
            />
          </div>
          <div className="flex flex-col flex-1 gap-2">
            <Label>Value Type</Label>
            <select
              name="type"
              value={field.type}
              onChange={(e) => handleChange(index, e)}
              className="px-2 py-1.5 rounded-md bg-primary-foreground border"
            >
              <option value="">Select Value Type</option>
              <option value="person.gender">Gender</option>
              <option value="person.prefix">Prefix</option>
              <option value="person.firstName">First Name</option>
              <option value="person.middleName">Middle Name</option>
              <option value="person.lastName">Last Name</option>
              <option value="person.fullName">Full Name</option>
              <option value="person.jobTitle">Job Title</option>
              <option value="person.bio">Bio</option>
              <option value="person.zodiacSign">Zodiac Sign</option>
              <option value="person.phone">Phone</option>
              <option value="person.avatar">Avatar</option>
              <option value="person.email">Email</option>
              <option value="address.state">State</option>
              <option value="address.zipCode">Zip Code</option>
              <option value="address.country">Country</option>
              <option value="address.streetAddress">Street Address</option>
              <option value="address.city">City</option>
            </select>
          </div>
          <div>
            <Button
              size={"icon"}
              variant={"destructive"}
              onClick={() => handleRemoveField(index)}
              className="mt-6"
            >
              <TrashIcon />
            </Button>
          </div>
        </div>
      ))}
      <div className="">
        <Button onClick={handelSubmit} variant="secondary">
          Submit
        </Button>
      </div>
    </div>
  );
};

export default Page;

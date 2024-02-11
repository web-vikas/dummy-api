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

const dataOptions = [
  { value: "person.avatar", label: "Avatar" },
  { value: "finance.amount", label: "Amount" },
  { value: "finance.accountType", label: "Account Type" },
  { value: "finance.accountNumber", label: "Account Number" },
  { value: "person.bio", label: "Bio" },
  { value: "finance.bitcoinAddress", label: "Bitcoin Address" },
  { value: "finance.creditCardCVV", label: "Credit Card CVV" },
  { value: "finance.creditCardIssuer", label: "Credit Card Issuer" },
  { value: "finance.creditCardNumber", label: "Credit Card Number" },
  { value: "finance.currencyCode", label: "Currency Code" },
  { value: "finance.currencyName", label: "Currency Name" },
  { value: "finance.currencySymbol", label: "Currency Symbol" },
  { value: "address.city", label: "City" },
  { value: "address.country", label: "Country" },
  { value: "finance.date", label: "Date" },
  { value: "person.email", label: "Email" },
  { value: "person.firstName", label: "First Name" },
  { value: "person.fullName", label: "Full Name" },
  { value: "person.gender", label: "Gender" },
  { value: "person.jobTitle", label: "Job Title" },
  { value: "person.lastName", label: "Last Name" },
  { value: "person.middleName", label: "Middle Name" },
  { value: "finance.maskedNumber", label: "Masked Number" },
  { value: "person.prefix", label: "Prefix" },
  { value: "finance.pin", label: "Pin" },
  { value: "person.phone", label: "Phone" },
  { value: "finance.routingNumber", label: "Routing Number" },
  { value: "address.state", label: "State" },
  { value: "address.streetAddress", label: "Street Address" },
  { value: "finance.transactionType", label: "Transaction Type" },
  { value: "finance.transactionDescription", label: "Transaction Description" },
  { value: "address.zipCode", label: "Zip Code" },
];

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
              {dataOptions.map((option, optionIndex) => (
                <option key={optionIndex} value={option.value}>
                  {option.label}
                </option>
              ))}
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

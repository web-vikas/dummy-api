"use client";
import { Input } from "@/components/ui/input";
import React, { useState } from "react";
import { addEndpoint } from "../action";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

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
const page: React.FC = ({ params }: any) => {
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
    <div className="flex flex-col gap-3">
      <input
        name="endpointName"
        placeholder="endpointName"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <select
        name="method"
        value={method}
        onChange={(e) => setMethod(e.target.value)}
      >
        <option value="">Select Value Type</option>
        <option value="POST">POST</option>
        <option value="GET">GET</option>
      </select>
      {fields.map((field, index) => (
        <div key={index}>
          <Input
            type="text"
            name="fieldName"
            placeholder="field"
            value={field.fieldName}
            onChange={(e) => handleChange(index, e)}
          />

          <select
            name="type"
            value={field.type}
            onChange={(e) => handleChange(index, e)}
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
          <button onClick={() => handleRemoveField(index)}>Remove</button>
        </div>
      ))}
      <button onClick={handleAddField}>Add Field</button>
      <button onClick={handelSubmit}>Submit</button>
    </div>
  );
};

export default page;

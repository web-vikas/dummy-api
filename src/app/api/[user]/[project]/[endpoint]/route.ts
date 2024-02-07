import { connect } from "@/config/db";
import { getAddressInfo, getPersonInfo } from "@/helper/faker";
import { Aggregate, FindOne, HandleError } from "@/helper/mongoose";
import EndpointModel from "@/models/end-points";
import ProjectModel from "@/models/projects";
import UserModel from "@/models/users";
import { NextRequest, NextResponse } from "next/server";

connect();

function checkEndpointExistence(endpoint: string) {
  return FindOne({
    model: EndpointModel,
    where: {
      endpointUrl: endpoint,
    },
  });
}

function processFields(fields: any) {
  const variableSources: { [key: string]: any } = {
    person: getPersonInfo(),
    address: getAddressInfo(),
    // Add more variables as needed
  };

  const result: Record<string, any> = {};

  fields.forEach((field: any) => {
    const fieldName = Object.keys(field)[0];
    const propertyPath = field[fieldName].split(".");
    let value: any;

    const variableName = propertyPath[0];
    const variableSource = variableSources[variableName] as any;

    if (variableSource) {
      value = variableSource;
    }

    for (let i = 1; i < propertyPath.length && value !== undefined; i++) {
      value = value[propertyPath[i]];
    }

    result[fieldName] = value;
  });

  return result;
}

export async function GET(req: NextRequest, { params }: any) {
  const { endpoint } = params;

  const data = await checkEndpointExistence(endpoint);
  if (!data) {
    return HandleError("Such Endpoint Doesn't Exist !");
  }
  if (data.method !== "GET") return HandleError("Invalid Method !");

  const result = processFields(data.fields);

  return NextResponse.json({ result });
}

export async function POST(req: NextRequest, { params }: any) {
  const { endpoint } = params;

  const data = await checkEndpointExistence(endpoint);
  if (!data) {
    return HandleError("Such Endpoint Doesn't Exist !");
  }
  if (data.method !== "POST") return HandleError("Invalid Method !");

  const result = processFields(data.fields);

  return NextResponse.json({ result });
}

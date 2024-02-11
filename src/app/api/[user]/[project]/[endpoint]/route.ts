import { connect } from "@/config/db";
import { getAddressInfo, getFinanceInfo, getPersonInfo } from "@/helper/faker";
import { FindOne, HandleError } from "@/helper/mongoose";
import EndpointModel from "@/models/end-points";
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

const isValidToken = async (token: string) => {
  const data = await FindOne({
    model: UserModel,
    where: { apiToken: token },
  });
  return data;
};

function processFields(fields: any) {
  const variableSources: { [key: string]: any } = {
    person: getPersonInfo(),
    address: getAddressInfo(),
    finance: getFinanceInfo(),
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
  const limit = Number(req.nextUrl.searchParams.get("limit")) || 1;
  const token = req.nextUrl.searchParams.get("token") || null;
  if (!token) return HandleError({ error: "Token Please !" });
  const valid = await isValidToken(token);
  if (!valid) return HandleError({ error: "Invalid Token !" });

  const data = await checkEndpointExistence(endpoint);
  if (!data) {
    return HandleError({ error: "Such Endpoint Doesn't Exist !" });
  }
  if (data.method !== "GET") return HandleError({ error: "Invalid Method !" });

  const results = [];
  for (let i = 0; i < limit; i++) {
    const result = processFields(data.fields);
    results.push(result);
  }

  return NextResponse.json({ results });
}

export async function POST(req: NextRequest, { params }: any) {
  try {
    let parsedData;
    try {
      const bodyData = await req.text();
      parsedData = JSON.parse(bodyData);
    } catch (parseError) {
      return HandleError({ error: "Invalid Body format!" });
    }
    const { endpoint } = params;
    let { limit, token } = parsedData;
    limit = Number(limit) || 1;
    if (!token) return HandleError({ error: "Token Please !" });
    const valid = await isValidToken(token);
    if (!valid) return HandleError({ error: "Invalid Token !" });
    const data = await checkEndpointExistence(endpoint);
    if (!data) {
      return HandleError("Such Endpoint Doesn't Exist !");
    }
    if (data.method !== "POST") return HandleError("Invalid Method !");

    const results = [];
    for (let i = 0; i < limit; i++) {
      const result = processFields(data.fields);
      results.push(result);
    }

    return NextResponse.json({ results });
  } catch (error) {
    console.log(error);
    NextResponse.json({ error: "Token Please !" });
  }
}

import { Document, Model, Types } from "mongoose";
import { NextRequest, NextResponse } from "next/server";

interface InsertOptions<T extends Document> {
  model: any;
  data: Record<string, any>;
}

interface InsertManyOptions<T extends Document> {
  model: Model<T>;
  data: Record<string, any>[];
}

const Insert = async <T extends Document>({
  model,
  data,
}: InsertOptions<T>): Promise<T | false> => {
  try {
    const inserted = await new model(data).save();
    return inserted;
  } catch (e) {
    console.error(e);
    return false;
  }
};

const InsertMany = async <T extends Document>({
  model,
  data,
}: InsertManyOptions<T>): Promise<T[] | false> => {
  try {
    const inserted = await model.insertMany(data as any);
    return inserted;
  } catch (e) {
    console.error(e);
    return false;
  }
};

const HandleSuccess = (data: any) => {
  return NextResponse.json({ data }, { status: 200 });
};

const HandleError = (message: String) => {
  return NextResponse.json({ message }, { status: 202 });
};

const HandleServerError = (req: NextRequest, err: any) => {
  const errLog = {
    method: req.method,
    url: req.nextUrl.pathname,
    // params: req.nextUrl.,
    // query: req.query,
    post: req.body,
    error: err,
  };
  console.log(errLog);
  return NextResponse.json({ data: "Internal Server Error" }, { status: 500 });
};

export { Insert, InsertMany, HandleSuccess, HandleError, HandleServerError };

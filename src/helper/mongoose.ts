import { Document, Model, Types, QueryWithHelpers } from "mongoose";
import { NextRequest, NextResponse } from "next/server";

interface InsertOptions<T extends Document> {
  model: any;
  data: Record<string, any>;
}

interface InsertManyOptions<T extends Document> {
  model: Model<T>;
  data: Record<string, any>[];
}

interface FindOptions<T> {
  model: Model<T>;
  where: any;
  projection?: Record<string, any>;
  select?: string | null;
  sort?: string | null;
  limit?: number | null;
  skip?: number | null;
  populate?: string | null;
  populateField?: string | null;
}
const IsExists = async ({ model, where = {}, select = {} }: any) => {
  try {
    let query = model.find(where);
    if (select) query.select(select);
    let doc = await query.lean().exec();
    if (doc.length > 0) return doc;
    else return false;
  } catch (e) {
    console.log(e);
    return false;
  }
};

const IsExistsOne = async ({ model, where = {}, select = {} }: any) => {
  try {
    let query = model.findOne(where);
    if (select) query.select(select);
    let doc = await query.lean().exec();
    if (doc) return doc;
    else return false;
  } catch (e) {
    console.log(e);
    return false;
  }
};

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

const Find = async <T extends Document>({
  model,
  where,
  projection = {},
  select = null,
  sort = null,
  limit = null,
  skip = null,
  populate = null,
  populateField = null,
}: FindOptions<T>): Promise<T[] | false> => {
  try {
    const query: QueryWithHelpers<T[], T> = model.find(where, projection);

    if (select) query.select(select);
    if (sort) query.sort(sort);
    if (skip) query.skip(skip);
    if (limit) query.limit(limit);

    if (populate && populateField) {
      query.populate(populate, populateField);
    } else if (populate) {
      query.populate(populate);
    }

    const docs: any = await query.lean().exec();
    return docs;
  } catch (e) {
    console.error(e);
    return false;
  }
};

const FindOne = async ({
  model,
  where = null,
  select = null,
  populate = null,
  populateField = null,
}: any) => {
  try {
    let query = model.findOne(where);
    if (select) query.select(select);
    if (populate && populateField) query.populate(populate, populateField);
    else if (populate) query.populate(populate);
    let doc = await query.lean().exec();
    if (doc) return doc;
    else return false;
  } catch (e) {
    return false;
  }
};

const FindAndUpdate = async ({ model, where = {}, update = {} }: any) => {
  try {
    let query = model.findOneAndUpdate(where, update, { new: true });
    let doc = await query.exec();
    if (doc) return doc;
    else return false;
  } catch (e) {
    console.log(e);
    return false;
  }
};

const Aggregate = async ({ model, data }: any) => {
  try {
    let query = model.aggregate(data);
    let doc = await query.exec();
    if (doc) return doc;
    else return false;
  } catch (e) {
    console.log(e);
    return false;
  }
};

const HandleSuccess = (data: any) => {
  return NextResponse.json(data, { status: 200 });
};

const HandleError = (message: any) => {
  return NextResponse.json(message, { status: 202 });
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

const GeneratePassword = (length = 8) => {
  let result = "";
  let characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let charactersLength = characters.length;
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
};
export {
  Aggregate,
  Find,
  FindAndUpdate,
  FindOne,
  GeneratePassword,
  HandleError,
  HandleServerError,
  HandleSuccess,
  IsExists,
  IsExistsOne,
  Insert,
  InsertMany,
};

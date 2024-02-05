import mongoose from "mongoose";
const Schema = mongoose.Schema;
const PersonsSchema = new Schema(
  {
    firstName: { type: String, required: [true, "Please provide first name"] },
    LastName: { type: String, default: "" },
    fullName: { type: String, required: [true, "Please provide full name"] },
    age: { type: Number, required: [true, "Please provide age"] },
    gender: { type: String, required: [true, "Please provide gender"] },
    job: { type: String, required: [true, "Please provide job"] },
  },
  { timestamps: true }
);

const PersonModel =
  mongoose.models.persons || mongoose.model("persons", PersonsSchema);
export default PersonModel;

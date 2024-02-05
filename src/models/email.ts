import mongoose from "mongoose";
const Schema = mongoose.Schema;
const EmailSchema = new Schema(
  {
    email: {
      type: String,
      required: [true, "Please provide an email"],
      unique: true,
    },
  },
  { timestamps: true }
);

const EmailModel =
  mongoose.models.emails || mongoose.model("emails", EmailSchema);
export default EmailModel;

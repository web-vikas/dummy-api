import mongoose from "mongoose";
const Schema = mongoose.Schema;
const PhonesSchema = new Schema(
  {
    countryCode: {
      type: String,
      required: [true, "Please provide country code"],
    },
    phoneNumber: { type: String, required: [true, "Please provide number"] },
  },
  { timestamps: true }
);

const PhoneModel =
  mongoose.models.phones || mongoose.model("phones", PhonesSchema);
export default PhoneModel;

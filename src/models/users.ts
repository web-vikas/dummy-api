import mongoose from "mongoose";
const Schema = mongoose.Schema;
const userSchema = new Schema(
  {
    userName: {
      type: String,
      required: [true, "Please provide an username"],
      unique: true,
    },
    email: {
      type: String,
      required: [true, "Please provide an email"],
      unique: true,
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
    isDisabled: {
      type: Boolean,
      default: false,
    },
    accessToken: {
      type: String,
    },
  },
  { timestamps: true }
);

const UserModel = mongoose.models.users || mongoose.model("users", userSchema);
export default UserModel;

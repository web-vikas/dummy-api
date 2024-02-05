import mongoose from "mongoose";
const Schema = mongoose.Schema;
const EndpointsSchema = new Schema(
  {
    projectId: { type: Schema.Types.ObjectId, ref: "projects", required: true },
    EndpointName: { type: String, required: true },
    fields: { type: Array },
  },
  { timestamps: true }
);

const EndpointModel =
  mongoose.models.endpoints || mongoose.model("endpoints", EndpointsSchema);
export default EndpointModel;

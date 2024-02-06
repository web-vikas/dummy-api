import mongoose from "mongoose";
const Schema = mongoose.Schema;
const EndpointsSchema = new Schema(
  {
    userId: { type: Schema.Types.ObjectId, ref: "users", required: true },
    projectId: { type: Schema.Types.ObjectId, ref: "projects", required: true },
    EndpointName: { type: String, required: true },
    endpointUrl: { type: String, required: true },
    method: { type: String, required: true },
    fields: { type: Array, required: true },
  },
  { timestamps: true }
);

const EndpointModel =
  mongoose.models.endpoints || mongoose.model("endpoints", EndpointsSchema);
export default EndpointModel;

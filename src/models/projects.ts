import mongoose from "mongoose";
const Schema = mongoose.Schema;
const ProjectsSchema = new Schema(
  {
    userId: { type: Schema.Types.ObjectId, ref: "users", required: true },
    projectName: { type: String, required: true },
    endpoints: { type: Array },
  },
  { timestamps: true }
);

const ProjectModel = mongoose.model("projects", ProjectsSchema);
module.exports = ProjectModel;

import mongoose from "mongoose";
const Schema = mongoose.Schema;
const ProjectsSchema = new Schema(
  {
    userId: { type: Schema.Types.ObjectId, ref: "users", required: true },
    projectName: { type: String, required: true},
    projectUrl: { type: String, required: true },
    endpoints: { type: Array },
  },
  { timestamps: true }
);

const ProjectModel =
  mongoose.models.projects || mongoose.model("projects", ProjectsSchema);
export default ProjectModel;

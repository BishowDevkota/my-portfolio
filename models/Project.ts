import { Schema, model, models, type InferSchemaType } from "mongoose";

const projectSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
      trim: true,
    },
    techStack: {
      type: [String],
      required: true,
      default: [],
    },
    githubLink: {
      type: String,
      required: true,
      trim: true,
    },
    liveLink: {
      type: String,
      required: true,
      trim: true,
    },
    imagePath: {
      type: String,
      required: true,
      trim: true,
    },
    isFeatured: {
      type: Boolean,
      default: false,
      index: true,
    },
  },
  {
    timestamps: true,
  }
);

export type ProjectDocument = InferSchemaType<typeof projectSchema>;

if (models.Project && !models.Project.schema.path("isFeatured")) {
  delete models.Project;
}

const Project = models.Project || model("Project", projectSchema);
export default Project;

import { Schema, model, models, type InferSchemaType } from "mongoose";

const blogSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    slug: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
    },
    content: {
      type: String,
      required: true,
    },
    excerpt: {
      type: String,
      required: true,
      trim: true,
      maxlength: 240,
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

export type BlogDocument = InferSchemaType<typeof blogSchema>;

if (models.Blog && !models.Blog.schema.path("isFeatured")) {
  delete models.Blog;
}

const Blog = models.Blog || model("Blog", blogSchema);
export default Blog;

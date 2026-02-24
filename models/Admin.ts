import { Schema, model, models, type InferSchemaType } from "mongoose";

const adminSchema = new Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
      minlength: 8,
    },
    role: {
      type: String,
      required: true,
      default: "admin",
    },
  },
  {
    timestamps: true,
  }
);

export type AdminDocument = InferSchemaType<typeof adminSchema>;

const Admin = models.Admin || model("Admin", adminSchema);
export default Admin;

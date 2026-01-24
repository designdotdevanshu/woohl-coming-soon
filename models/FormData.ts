import mongoose, { Schema } from "mongoose";
import { FormDataDocument } from "@/types/FormData";

const FormDataSchema = new Schema<FormDataDocument>(
  {
    businessName: {
      type: String,
      required: true,
    },
    personName: {
      type: String,
      required: true,
    },
    designation: {
      type: String,
      required: true,
    },
    otherDesignation: {
      type: String,
    },
    phoneEmail: {
      type: String,
      required: true,
    },
    website: {
      type: String,
    },
    productCategories: {
      type: String,
    },
    instagramHandle: {
      type: String,
    },
    city: {
      type: String,
      required: true,
    },
    state: {
      type: String,
      required: true,
    },
  },
  { timestamps: true },
);

export default mongoose.models.FormData || mongoose.model<FormDataDocument>("FormData", FormDataSchema);

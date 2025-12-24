import mongoose, { Schema } from "mongoose";
import { EarlyAccessSignupDocument } from "@/types/EarlyAccessSignup";

const EarlyAccessSignupSchema = new Schema<EarlyAccessSignupDocument>(
  {
    email: {
      type: String,
      required: true,
      unique: true,
    },
    // Attribution fields
    ref: {
      type: String,
      default: null,
      index: true,
      maxlength: 255,
    },
    utm_source: {
      type: String,
      default: null,
      index: true,
      maxlength: 255,
    },
    utm_medium: {
      type: String,
      default: null,
      maxlength: 255,
    },
    utm_campaign: {
      type: String,
      default: null,
      maxlength: 255,
    },
    utm_term: {
      type: String,
      default: null,
      maxlength: 255,
    },
    utm_content: {
      type: String,
      default: null,
      maxlength: 255,
    },
  },
  { timestamps: true },
);

export default mongoose.models.EarlyAccessSignup ||
  mongoose.model<EarlyAccessSignupDocument>(
    "EarlyAccessSignup",
    EarlyAccessSignupSchema,
  );

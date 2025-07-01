import mongoose, { Schema } from "mongoose";
import { EarlyAccessSignupDocument } from "@/types/EarlyAccessSignup";

const EarlyAccessSignupSchema = new Schema<EarlyAccessSignupDocument>(
  {
    email: {
      type: String,
      required: true,
      unique: true,
    },
  },
  { timestamps: true },
);

export default mongoose.models.EarlyAccessSignup || mongoose.model<EarlyAccessSignupDocument>("EarlyAccessSignup", EarlyAccessSignupSchema);

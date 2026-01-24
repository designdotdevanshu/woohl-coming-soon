import mongoose, { Schema } from "mongoose";
import { CustomerDataDocument } from "@/types/CustomerData";

const CustomerDataSchema = new Schema<CustomerDataDocument>(
  {
    name: {
      type: String,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    city: {
      type: String,
    },
    interests: {
      type: [String],
      default: [],
    },
  },
  { timestamps: true }
);

export default mongoose.models.CustomerData ||
  mongoose.model<CustomerDataDocument>("CustomerData", CustomerDataSchema);

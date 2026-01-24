import mongoose, { Schema } from "mongoose";
import { NewsletterDocument } from "@/types/newsletter";

const NewsletterSchema = new Schema<NewsletterDocument>(
  {
    email: {
      type: String,
      required: true,
      unique: true,
    },
  },
  { timestamps: true },
);

export default mongoose.models.Newsletter || mongoose.model<NewsletterDocument>("Newsletter", NewsletterSchema);

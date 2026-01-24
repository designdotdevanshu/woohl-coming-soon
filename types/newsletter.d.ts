import { type Document } from "mongoose";

export type NewsletterDataType = {
  email: string;
};

export type NewsletterDocument = NewsletterDataType & Document;

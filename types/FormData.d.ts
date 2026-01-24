import { Document } from "mongoose";

/**
 * Base form input (as submitted by user)
 */
export type FormDataType = {
  businessName: string;
  personName: string;
  designation: string;
  otherDesignation?: string;
  phoneEmail: string;
  website?: string;
  productCategories?: string;
  instagramHandle?: string;
  city: string;
  state: string;
};

/**
 * Document stored in the database (with MongoDB _id)
 */
export type FormDataDocument = FormDataType & Document;

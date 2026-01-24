import { type Document } from "mongoose";

/**
 * Base customer waitlist form input (as submitted by user)
 */
export type CustomerDataType = {
  name?: string;
  email: string;
  city?: string;
  interests: string[];
};

/**
 * Document stored in the database (with MongoDB _id)
 */
export type CustomerDataDocument = CustomerDataType & Document;

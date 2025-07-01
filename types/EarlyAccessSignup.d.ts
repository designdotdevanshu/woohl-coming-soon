import { type Document } from "mongoose";

export type EarlyAccessSignupDataType = {
  email: string;
};

export type EarlyAccessSignupDocument = EarlyAccessSignupDataType & Document;

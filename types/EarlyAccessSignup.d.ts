import { type Document } from "mongoose";

export type ApiResponse = {
  success: boolean;
  message: string;
};

export type EarlyAccessSignupDataType = {
  email: string;
};

export type EarlyAccessSignupDocument = EarlyAccessSignupDataType & Document;

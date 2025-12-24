import { type Document } from "mongoose";

export type ApiResponse = {
  success: boolean;
  message: string;
};

export type AttributionFields = {
  ref?: string | null;
  utm_source?: string | null;
  utm_medium?: string | null;
  utm_campaign?: string | null;
  utm_term?: string | null;
  utm_content?: string | null;
};

export type EarlyAccessSignupDataType = {
  email: string;
} & AttributionFields;

export type EarlyAccessSignupModel = EarlyAccessSignupDataType & {
  _id: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
};

export type EarlyAccessSignupDocument = EarlyAccessSignupDataType & Document;

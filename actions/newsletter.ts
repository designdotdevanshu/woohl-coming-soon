"use server";

import { connectToDatabase } from "@/lib/mongodb";
import EarlyAccessSignup from "@/models/Newsletter";
import { EarlyAccessSignupDataType } from "@/types/EarlyAccessSignup";

export async function subscribeToEarlyAccess(data: EarlyAccessSignupDataType) {
  if (!data || !data.email) {
    return { success: false, message: "Invalid data provided." };
  }

  try {
    await connectToDatabase();

    const existing = await EarlyAccessSignup.findOne({ email: data.email });
    if (existing) {
      return { success: true, message: "Email already subscribed." };
    }

    const entry = new EarlyAccessSignup(data);
    await entry.save();

    return { success: true, message: "Subscribed successfully." };
  } catch (error) {
    console.error("EarlyAccessSignup subscription failed:", error);
    return { success: false, message: "Subscription failed. Try again later." };
  }
}

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

export async function getFormData() {
  try {
    await connectToDatabase();
    return await EarlyAccessSignup.find();
  } catch (error) {
    console.error("Error fetching form data:", error);
    return [];
  }
}

/**
 * Retrieves the total count of form entries from the database.
 *
 * @returns {Promise<number>} - The total number of form entries. Returns 0 in case of an error.
 */
export async function getFormEntriesCount(): Promise<number> {
  try {
    await connectToDatabase();
    return await EarlyAccessSignup.countDocuments();
  } catch (error) {
    console.error("Error fetching form entries count:", error);
    return 0;
  }
}

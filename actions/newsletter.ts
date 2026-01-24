"use server";

import { connectToDatabase } from "@/lib/mongodb";
import Newsletter from "@/models/Newsletter";
import { NewsletterDataType } from "@/types/newsletter";

export async function subscribeToNewsletter(data: NewsletterDataType) {
  try {
    await connectToDatabase();

    const existing = await Newsletter.findOne({ email: data.email });
    if (existing) {
      return { success: false, message: "Email already subscribed." };
    }

    const entry = new Newsletter(data);
    await entry.save();

    return { success: true, message: "Subscribed successfully." };
  } catch (error) {
    console.error("Newsletter subscription failed:", error);
    return { success: false, message: "Subscription failed. Try again later." };
  }
}
